package com.daan.controller.basisDict;

import java.lang.reflect.UndeclaredThrowableException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.daan.domain.DataGrid;
import com.daan.exception.FkException;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.Message;
import com.daan.dto.CtrDictCodesDto;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
* @ClassName: CtrDictCodesController 
* @Description: TODO(基础字典) 
* @author zengxiaowang
* @date 2015年12月4日 上午10:19:44 
*
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRDICTCODES)
public class CtrDictCodesController extends CommonComponentController {

	/**
	 * 
	* @Title: ctrDictCodesMain 
	* @Description: TODO(基础字典-初始界面Controller) 
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrDictCodesMain(Integer typeKey, HttpServletRequest request) {
		// user == null, redirect login page
		if (this.getAdminLoginUser(request) == null) {
			return new ModelAndView(Constant.JSP_LOGIN);
		}
		if (typeKey == null) {
			return null;
		}
		// 基础字典-初始界面Controller.根据不同字典类型typeKey返回到具体字典类型页面
		// typeKey 序号:根据 业务表CODE编码对应该的编号
		Page<CtrDictCodes> page = new Page<CtrDictCodes>(Constant.PAGE_NUMBER);
		HashMap<String, String> modelUrl = Constant.CTRDICTCODES_MODULE_MAP.get(typeKey);
		ModelAndView mv = new ModelAndView(modelUrl.get("main"));
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		mv.addObject("page", page);
		mv.addObject("typeKey", typeKey);
		return mv;
	}

	/**
	 * 
	* @Title: ctrDictCodesPageList 
	* @Description: TODO(基础字典列表) 
	* @param @param dto
	* @param @param page
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_PAGELIST, method = RequestMethod.POST)
	public void ctrDictCodesPageList(CtrDictCodesDto dto, Page<CtrDictCodes> page, HttpServletRequest request, HttpServletResponse response) {
		if (dto == null){
			return ;
		}
		HashMap<String, String> modelUrl = Constant.CTRDICTCODES_MODULE_MAP.get(dto.getTypeKey());
		try {
			Map<String, String> params = new HashMap<String, String>();
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_PAGELIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("@@@"));
			resultPage = resultString.substring(resultString.indexOf("@@@") + 3, resultString.length());
			List<CtrDictCodes> list = (List<CtrDictCodes>) JsonUtil.jsonToDtos(resultList, CtrDictCodes.class);
			page = (Page<CtrDictCodes>) JsonUtil.jsonToDto(resultPage, Page.class, null);

			DataGrid dataGrid = new DataGrid(page.getTotalCount(),list);
			//dataGrid.setTotal(page.getTotalCount());
			//dataGrid.setRows(list);
			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	/**
	 * 
	* @Title: ctrDictCodesInfo 
	* @Description: TODO(明细页面) 
	* @param @param typeKey
	* @param @param id
	* @param @param opType
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_INFO, method = RequestMethod.POST)
	public ModelAndView ctrDictCodesInfo(Integer typeKey, String id, String opType, HttpServletRequest request) {
		if (typeKey == null || StringUtils.isEmpty(opType)) {
			return null;
		}
		ModelAndView mv = new ModelAndView();
		mv.addObject("typeKey", typeKey);
		mv.addObject("opType", opType);
		HashMap<String, String> modelMap = Constant.CTRDICTCODES_MODULE_MAP.get(typeKey);
		String message = Message.MSG_SERVICE_EXCEP;
		if ("add".equals(opType)) { // 新增跳转
			try {
				mv.setViewName(modelMap.get("add"));
				HashMap<String, String> codeNoParams = new HashMap<String, String>();
				codeNoParams.put("code", String.valueOf(typeKey));
				//根据字典类型获取编码
				String getCodeUrl = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_GETCODENO);
				String codeNo = HttpUtil.postResponseString(getCodeUrl, codeNoParams, this.getAdminLoginUser(request));
				mv.addObject("codeNo", codeNo);
				//根据字典类型查找最大顺序号
				String getOrderUrl = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_MAXDISPLAYORDER);
				Map<String, String> getCodeParams = new HashMap<String, String>();
				getCodeParams.put("tableName", Constant.TABLENAME_CTRDICTCODES);
				String conditionStr = " and type_key =" + typeKey;
				getCodeParams.put("conditionStr", conditionStr);
				String displayOrder = HttpUtil.postResponseString(getOrderUrl, getCodeParams, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
			} catch (Exception e) {
				message = Message.MSG_SERVICE_EXCEP;
				logger.error(e.getMessage(), e);
			}
		} else if ("edit".equals(opType)) { // 修改跳转
			mv.setViewName(modelMap.get("add"));
		} else if ("view".equals(opType)) { // 查看跳转
			mv.setViewName(modelMap.get("add"));
		}
		try {
//			if (StringUtils.isNotEmpty(id)) {
//				Map<String, String> params = new HashMap<String, String>();
//				params.put("id", id);
//				mv.addObject("opType", opType);
//				// 查找Info
//				String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_INFO);
//				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
//				CtrDictCodes ctrDictCodes = (CtrDictCodes) JsonUtil.jsonToDto(message, CtrDictCodes.class, null);
//				mv.addObject("entity", ctrDictCodes);
//			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return mv;
	}
	
	/**
	 * 
	* @Title: ctrDictCodesAdd 
	* @Description: TODO(新增基础字典信息) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesAdd(@ModelAttribute CtrDictCodes ctrDictCodes, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrDictCodes == null){
			return message;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrDictCodes));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrDictCodesEdit 
	* @Description: TODO(基础字典修改) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesEdit(@ModelAttribute CtrDictCodes ctrDictCodes, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrDictCodes == null){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrDictCodes));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			params.clear();
			//查出INFO修改列表信息
			params.put("id", String.valueOf(ctrDictCodes.getId()));
			url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrDictCodes entity = (CtrDictCodes) JsonUtil.jsonToDto(message, CtrDictCodes.class, null);
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrDictCodesDisableOrEnable 
	* @Description: TODO(基础字典-启用/停用) 
	* @param @param id
	* @param @param operatioType
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesDisableOrEnable(String id, String operatioType, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("operatioType", operatioType);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_DIDABLEORENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: checkNameExisted 
	* @Description: TODO(基础类型-新增同名验证) 
	* @param @param ctrDictCodes
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNameExisted(String id, Integer typeKey, String name, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(typeKey == null || StringUtils.isEmpty(name)){
			return message;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("typeKey", String.valueOf(typeKey));
			params.put("name", name);
			String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrDictCodesDelete 
	* @Description: TODO(基础字典删除信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesDelete(String id, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(id)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrDictCodesDeleteBatch 
	* @Description: TODO(批量删除) 
	* @param @param ids
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesDeleteBatch(String ids, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(ids)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_CTRDICTCODES_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (FkException fke) {
			return fke.getMessage();
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
}

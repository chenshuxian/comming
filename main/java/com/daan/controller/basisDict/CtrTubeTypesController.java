package com.daan.controller.basisDict;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.daan.domain.Constant;
import com.daan.domain.CtrTubeTypes;
import com.daan.domain.DataGrid;
import com.daan.domain.Message;
import com.daan.dto.CtrDictCodesDto;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
* @ClassName: CtrTubeTypesController 
* @Description: TODO(试管类型) 
* @author zengxiaowang
* @date 2015年12月4日 上午10:19:44 
*
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRTUBETYPES)
public class CtrTubeTypesController extends CommonComponentController {

	/**
	 * 
	* @Title: ctrTubeTypesMain 
	* @Description: TODO(试管类型-初始界面Controller) 
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrTubeTypesMain(HttpServletRequest request) {
		Page<CtrTubeTypes> page = new Page<CtrTubeTypes>(Constant.PAGE_NUMBER);
		ModelAndView mv = new ModelAndView(Constant.DEMO_CTRTUBETYPES_MAIN);
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		mv.addObject("page", page);
		return mv;
	}

	/**
	 * 
	* @Title: ctrTubeTypesPageList 
	* @Description: TODO(试管类型列表) 
	* @param @param dto
	* @param @param page
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@SuppressWarnings({ "unchecked" })
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_PAGELIST, method = RequestMethod.POST)
	public void ctrTubeTypesPageList(CtrDictCodesDto dto, Page<CtrTubeTypes> page, HttpServletRequest request,HttpServletResponse response) {
		if (dto == null){
			this.printJsonData("Null",response);
		}
		ModelAndView mv = new ModelAndView(Constant.DEMO_CTRTUBETYPES_PAGELIST);
		try {
			Map<String, String> params = new HashMap<String, String>();
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_PAGELIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("|"));
			resultPage = resultString.substring(resultString.indexOf("|") + 1, resultString.length());
			List<CtrTubeTypes> list = (List<CtrTubeTypes>) JsonUtil.jsonToDtos(resultList, CtrTubeTypes.class);
			page = (Page<CtrTubeTypes>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			
			
			DataGrid dataGrid = new DataGrid(page.getTotalCount(),list);
			//dataGrid.setTotal(page.getTotalCount());
			//dataGrid.setRows(list);						

			this.printJsonData(JsonUtil.DtoTojson(dataGrid),response);
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		
	}
	/*
	public ModelAndView ctrTubeTypesPageList(CtrDictCodesDto dto, Page<CtrTubeTypes> page, HttpServletRequest request) {
		if (dto == null){
			return null;
		}
		ModelAndView mv = new ModelAndView(Constant.DEMO_CTRTUBETYPES_PAGELIST);
		try {
			Map<String, String> params = new HashMap<String, String>();
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_PAGELIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("|"));
			resultPage = resultString.substring(resultString.indexOf("|") + 1, resultString.length());
			List<CtrTubeTypes> list = (List<CtrTubeTypes>) JsonUtil.jsonToDtos(resultList, CtrTubeTypes.class);
			page = (Page<CtrTubeTypes>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			mv.addObject("resultList", list);
			mv.addObject("page", page);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return mv;
		
	}*/

	
	/**
	 * 
	* @Title: ctrTubeTypesInfo 
	* @Description: TODO(试管类型明细页面) 
	* @param @param id
	* @param @param opType
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_INFO, method = RequestMethod.POST)
	public ModelAndView ctrTubeTypesInfo(String id, String opType, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		String message = Message.MSG_SERVICE_EXCEP;
		mv.addObject("opType", opType);
		mv.setViewName(Constant.DEMO_CTRTUBETYPES_ADD);
		if ("add".equals(opType)) { // 新增跳转
			try {
				//mv.setViewName(Constant.DEMO_CTRTUBETYPES_ADD);
				HashMap<String, String> codeNoParams = new HashMap<String, String>();
				codeNoParams.put("code", String.valueOf(Constant.MODULEID_CTRTUBETYPES));
				String getCodeUrl = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_GETCODENO);
				String codeNo = HttpUtil.postResponseString(getCodeUrl, codeNoParams, this.getAdminLoginUser(request));
				mv.addObject("codeNo", codeNo);
				// 查找最大顺序号
				String getOrderUrl = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_MAXDISPLAYORDER);
				Map<String, String> getCodeParams = new HashMap<String, String>();
				getCodeParams.put("tableName", Constant.TABLENAME_CTRTUBETYPES);
				//getCodeParams.put("conditionStr", conditionStr);
				String displayOrder = HttpUtil.postResponseString(getOrderUrl, getCodeParams, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
			} catch (Exception e) {
				message = Message.MSG_SERVICE_EXCEP;
				logger.error(e.getMessage(), e);
			}
		} /*else if ("edit".equals(opType)) { // 修改跳转
			//mv.setViewName(Constant.DEMO_CTRTUBETYPES_EDIT);
			//mv.setViewName(Constant.DEMO_CTRTUBETYPES_ADD);
		} else if ("view".equals(opType)) { // 查看跳转
			//mv.setViewName(Constant.DEMO_CTRTUBETYPES_ADD);
			//mv.setViewName(Constant.DEMO_CTRTUBETYPES_VIEW);
		}*/
		try {
			if (StringUtils.isNotEmpty(id)) {
				Map<String, String> params = new HashMap<String, String>();
				params.put("id", id);
				//2016/01/08 update by jacky
				//mv.addObject("opType", opType);
				// 查找Info
				String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CtrTubeTypes ctrTubeTypes = (CtrTubeTypes) JsonUtil.jsonToDto(message, CtrTubeTypes.class, null);
				mv.addObject("entity", ctrTubeTypes);
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return mv;
	}
	
	/**
	 * 
	* @Title: ctrTubeTypesAdd 
	* @Description: TODO(新增试管类型信息) 
	* @param @param ctrTubeTypes
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesAdd(@ModelAttribute CtrTubeTypes ctrTubeTypes, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrTubeTypes == null){
			return message;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrTubeTypes));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrTubeTypesEdit 
	* @Description: TODO(试管类型修改) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesEdit(@ModelAttribute CtrTubeTypes ctrTubeTypes, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrTubeTypes == null){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrTubeTypes));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			params.clear();
			params.put("id", String.valueOf(ctrTubeTypes.getId()));
			url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrTubeTypes entity = (CtrTubeTypes) JsonUtil.jsonToDto(message, CtrTubeTypes.class, null);
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrTubeTypesDisableOrEnable 
	* @Description: TODO(试管类型-启用/停用) 
	* @param @param id
	* @param @param operatioType
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesDisableOrEnable(String id, String operatioType, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("operatioType", operatioType);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_DIDABLEORENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: checkNameExisted 
	* @Description: TODO(试管类型-新增同名验证) 
	* @param @param ctrDictCodes
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNameExisted(String id, String name, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(name)){
			return message;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("name", name);
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrTubeTypesDelete 
	* @Description: TODO(试管类型删除信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesDelete(String id, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(id)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_DELETE);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrTubeTypesDeleteBatch 
	* @Description: TODO(试管类型批量删除) 
	* @param @param ids
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesDeleteBatch(String ids, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(ids)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRTUBETYPES, Constant.RMM_CTRTUBETYPES_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
}

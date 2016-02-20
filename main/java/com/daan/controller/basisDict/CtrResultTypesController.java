package com.daan.controller.basisDict;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.daan.domain.DataGrid;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.daan.domain.Constant;
import com.daan.domain.CtrResultTypes;
import com.daan.domain.Message;
import com.daan.dto.CtrResultTypesDto;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
* @ClassName: CtrResultTypesController 
* @Description: TODO(结果类型) 
* @author zengxiaowang
* @date 2015年12月4日 上午10:19:44 
*
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRRESULTTYPES)
public class CtrResultTypesController extends CommonComponentController {

	/**
	 * 
	* @Title: ctrResultTypesMain 
	* @Description: TODO(结果类型-初始界面Controller) 
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrResultTypesMain(HttpServletRequest request) {
		Page<CtrResultTypes> page = new Page<CtrResultTypes>(Constant.PAGE_NUMBER-5);
		ModelAndView mv = new ModelAndView(Constant.DEMO_CTRRESULTTYPES_MAIN);   
		mv.addObject("page", page);
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		return mv;
	}

	/**
	 * 
	* @Title: ctrResultTypesPageList 
	* @Description: TODO(结果类型列表) 
	* @param @param dto
	* @param @param page
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_PAGELIST, method = RequestMethod.POST)
	public void ctrResultTypesPageList(CtrResultTypesDto dto, HttpServletRequest request, HttpServletResponse response) {
		if (dto == null){
			return;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_PAGELIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrResultTypes> list = (List<CtrResultTypes>) JsonUtil.jsonToDtos(resultString, CtrResultTypes.class);
			DataGrid dataGrid = new DataGrid(Long.parseLong(list.size() + ""), list);
			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	/**
	 * 
	* @Title: ctrResultTypesInfo 
	* @Description: TODO(结果类型明细页面) 
	* @param @param typeKey
	* @param @param id
	* @param @param opType
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_INFO, method = RequestMethod.POST)
	public ModelAndView ctrResultTypesInfo(String id, String opType, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		String message = Message.MSG_SERVICE_EXCEP;
		mv.addObject("opType", opType);
		if ("add".equals(opType)) { // 新增跳转
			try {
				mv.setViewName(Constant.DEMO_CTRRESULTTYPES_ADD);
				HashMap<String, String> codeNoParams = new HashMap<String, String>();
				codeNoParams.put("code", String.valueOf(Constant.MODULEID_CTRRESULTTYPES));
				String getCodeUrl = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_GETCODENO);
				String codeNo = HttpUtil.postResponseString(getCodeUrl, codeNoParams, this.getAdminLoginUser(request));
				mv.addObject("codeNo", codeNo);
				// 查找最大顺序号
				String getOrderUrl = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_MAXDISPLAYORDER);
				Map<String, String> getCodeParams = new HashMap<String, String>();
				getCodeParams.put("tableName", Constant.TABLENAME_CTRRESULTTYPES);
				//getCodeParams.put("conditionStr", conditionStr);
				String displayOrder = HttpUtil.postResponseString(getOrderUrl, getCodeParams, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
			} catch (Exception e) {
				message = Message.MSG_SERVICE_EXCEP;
				logger.error(e.getMessage(), e);
			}
		} else if ("edit".equals(opType)) { // 修改跳转
//			mv.setViewName(Constant.DEMO_CTRRESULTTYPES_EDIT);
			mv.setViewName(Constant.DEMO_CTRRESULTTYPES_ADD);
		} else if ("view".equals(opType)) {
//			mv.setViewName(Constant.DEMO_CTRRESULTTYPES_VIEW);
			mv.setViewName(Constant.DEMO_CTRRESULTTYPES_ADD);
		}
		try {
			if (StringUtils.isNotEmpty(id)) {
				Map<String, String> params = new HashMap<String, String>();
				params.put("id", id);
				mv.addObject("opType", opType);
				// 查找Info
				String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CtrResultTypes ctrTubeTypes = (CtrResultTypes) JsonUtil.jsonToDto(message, CtrResultTypes.class, null);
				mv.addObject("entity", ctrTubeTypes);
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		
		return mv;
	}
	
	/**
	 * 
	* @Title: ctrResultTypesAdd 
	* @Description: TODO(新增结果类型信息) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesAdd(@ModelAttribute CtrResultTypes ctrResultTypes, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrResultTypes == null){
			return message;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrResultTypes));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrResultTypesEdit 
	* @Description: TODO(结果类型修改) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesEdit(@ModelAttribute CtrResultTypes ctrResultTypes, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrResultTypes == null){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrResultTypes));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			params.clear();
			params.put("id", String.valueOf(ctrResultTypes.getId()));
			url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrResultTypes entity = (CtrResultTypes) JsonUtil.jsonToDto(message, CtrResultTypes.class, null);
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrResultTypesDisableOrEnable 
	* @Description: TODO(结果类型-启用/停用) 
	* @param @param id
	* @param @param operatioType
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesDisableOrEnable(String id, String operatioType, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("operatioType", operatioType);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_DIDABLEORENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: checkNameExisted 
	* @Description: TODO(结果类型-新增同名验证) 
	* @param @param id
	* @param @param name
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_IFEXISTED, method = RequestMethod.POST)
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
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrResultTypesDelete 
	* @Description: TODO(结果类型删除信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesDelete(String id, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(id)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_DELETE);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrResultTypesDeleteBatch 
	* @Description: TODO(结果类型批量删除) 
	* @param @param ids
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesDeleteBatch(String ids, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(ids)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
}

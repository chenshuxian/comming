package com.daan.controller.org;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.daan.domain.DataGrid;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.CenterOrg;
import com.daan.domain.Constant;
import com.daan.domain.Message;
import com.daan.dto.CenterOrgQueryDto;
import com.daan.enums.OrgType;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.Page;

/**
 * 
 * @ClassName: RegionalManagementController 
 * @Description: TODO(区域管理机构维护控制器) 
 * @author zhangliping
 * @date 2015年12月28日 上午10:45:26
 */
@Controller
@RequestMapping(value= Constant.RMC_CENTERORG_MANAGEMENT)
public class RegionalManagementController extends CommonComponentController{
	
	/**
	 * 
	 * @Title: regionalManagementMain 
	 * @Description: TODO(初始化页面) 
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_MAIN, method = RequestMethod.GET)
	public ModelAndView regionalManagementMain(String orgTypeId,HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_MAIN + ", " + Constant.INPUT_PARAMS + "orgTypeId:" + orgTypeId);
		if (StringUtils.isEmpty(orgTypeId)) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_MAIN + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		Page<CenterOrg> page = new Page<CenterOrg>(Constant.CENTERORG_PAGE_NUMBER);
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/org/regionalManagement/regionalManagementMain.jsp");
		mv.addObject("page", page);
		mv.addObject("orgTypeId", orgTypeId);
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_MAIN + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	 * @Title: regionalManagementPageList 
	 * @Description: TODO(管理机构列表) 
	 * @param dto
	 * @param page
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST, method = RequestMethod.POST)
	public void regionalManagementPageList(CenterOrgQueryDto dto, Page<CenterOrg> page, HttpServletRequest request, HttpServletResponse response) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST + ", " + Constant.INPUT_PARAMS + "CenterOrgQueryDto:" + JsonUtil.DtoTojson(dto) + "," + "Page<CenterOrg>: " + JsonUtil.DtoTojson(page));
		if (dto == null || page == null) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST + "," + Constant.RETURN_VALUE + null);
			return;
		}
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/org/regionalManagement/regionalManagementList.jsp");
		Map<String, String> params = new HashMap<String, String>();
		try {
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("@@@"));
			resultPage = resultString.substring(resultString.indexOf("@@@") + 3, resultString.length());
			List<CenterOrg> list = (List<CenterOrg>) JsonUtil.jsonToDtos(resultList, CenterOrg.class);
			page = (Page<CenterOrg>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			DataGrid dataGrid = new DataGrid(page.getTotalCount(), list);

			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
//			mv.addObject("resultList", list);
//			mv.addObject("page", page);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
//		return mv;
	}
	
	/**
	 * 
	 * @Title: relatedList 
	 * @Description: TODO(查找关联的机构列表) 
	 * @param parentId
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_RELATED_LIST, method = RequestMethod.POST)
	public void relatedList(String parentId, HttpServletRequest request, HttpServletResponse response){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_RELATED_LIST + ", " + Constant.INPUT_PARAMS + "parentId:" + parentId );
		if(StringUtils.isEmpty(parentId)){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_RELATED_LIST + "," + Constant.RETURN_VALUE + null);
			return;
		}
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/org/regionalManagement/relatedRegionalList.jsp");
//		mv.addObject("parentId", parentId);
		Map<String, String> params = new HashMap<String, String>();
		params.put("parentId", parentId);//父ID
		String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_RELATED_LIST);
		String resultString = "";// 结果返回字符串
		List<CenterOrg> list = null; //组合包含的项目的集合
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			//判断调用Service返回的结果
			if(StringUtils.isNotEmpty(resultString)){
				list = (List<CenterOrg>) JsonUtil.jsonToDtos(resultString, CenterOrg.class);
			}
//			mv.addObject("relatedList",list);
			DataGrid dataGrid = new DataGrid(Long.parseLong((list != null ? list.size() : 0) + ""), list);

			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_RELATED_LIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_RELATED_LIST + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
//		return mv;
	}
	
	/**
	 * 
	 * @Title: regionalManagementInfo 
	 * @Description: TODO(明细页面) 
	 * @param orgTypeId
	 * @param id
	 * @param opType
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_INFO, method = RequestMethod.POST)
	public ModelAndView regionalManagementInfo(Integer orgTypeId, String id, String opType, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_INFO + ", " + Constant.INPUT_PARAMS + "orgTypeId:" + orgTypeId + "," + "id: " + id + "," + "opType:" + opType);
//		if (orgTypeId == null || StringUtils.isEmpty(id)) {
		if (orgTypeId == null) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_INFO + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		ModelAndView mv = new ModelAndView();
		mv.addObject("orgTypeId", orgTypeId);
		mv.addObject("opType", opType);
		String message = Message.MSG_SERVICE_EXCEP;
		if ("add".equals(opType)) { // 新增跳转
			HashMap<String, String> codeNoParams = new HashMap<String, String>();
			try {
				mv.setViewName("/WEB-INF/jsp/org/regionalManagement/regionalManagementAdd.jsp");
				codeNoParams.put("code", String.valueOf(orgTypeId));//modelMap.get("code")
				String getCodeUrl = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_GETCODENO);
				String codeNo = HttpUtil.postResponseString(getCodeUrl, codeNoParams, this.getAdminLoginUser(request));
				mv.addObject("codeNo", codeNo);
				// 查找最大顺序号
				String getOrderUrl = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_MAXDISPLAYORDER);
				Map<String, String> getCodeParams = new HashMap<String, String>();
				getCodeParams.put("tableName", Constant.TABLENAME_CTRORGS);
				int orgType = OrgType.all.ordinal() ; 
				if(orgTypeId == Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS){
					orgType = OrgType.medicalInstitutions.ordinal();//医疗机构
				}else {
					orgType = OrgType.independentLaboratory.ordinal();//独立实验室
				}
				String conditionStr = " and org_type_id =" + orgType;
				getCodeParams.put("conditionStr", conditionStr);
				String displayOrder = HttpUtil.postResponseString(getOrderUrl, getCodeParams, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
			} catch (Exception e) {
				message = Message.MSG_SERVICE_EXCEP;
				logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_INFO + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(codeNoParams) + "," + Constant.EXCEPTION + e.getMessage(), e);
			}
		} else if ("edit".equals(opType)) { // 修改跳转
//			mv.setViewName("/WEB-INF/jsp/org/regionalManagement/regionalManagementEdit.jsp");
			mv.setViewName("/WEB-INF/jsp/org/regionalManagement/regionalManagementAdd.jsp");
		} else if ("view".equals(opType)) { // 查看跳转
//			mv.setViewName("/WEB-INF/jsp/org/regionalManagement/regionalManagementView.jsp");
			mv.setViewName("/WEB-INF/jsp/org/regionalManagement/regionalManagementAdd.jsp");
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			if (StringUtils.isNotEmpty(id)) {
				params.put("id", id);

				// 查找Info
				String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CenterOrg centerOrg = (CenterOrg) JsonUtil.jsonToDto(message, CenterOrg.class, null);
				mv.addObject("entity", centerOrg);
			}
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_INFO + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_INFO + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	 * @Title: addRelatedRegionalShow 
	 * @Description: TODO(显示添加添加机构页面) 
	 * @param testItemId
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_ADD_CENTERORG_SHOW, method = RequestMethod.POST)
	public ModelAndView addRelatedRegionalShow(String parentId, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_ADD_CENTERORG_SHOW + ", " + Constant.INPUT_PARAMS + "parentId:" + parentId );
		if(StringUtils.isEmpty(parentId)){
			logger.info(Constant.METHOD + Constant.RMM_ADD_CENTERORG_SHOW + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/org/regionalManagement/addRelatedRegionalShow.jsp");
		mv.addObject("parentId", parentId);
		logger.info(Constant.METHOD + Constant.RMM_ADD_CENTERORG_SHOW + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDisableOrEnable 
	 * @Description: TODO(机构-启用/停用) 
	 * @param id
	 * @param operatioType
	 * @param request
	 * @return String
	 * @throws
	 */
	@Transactional
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDisableOrEnable(String id, String operatioType, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "operatioType:" + operatioType);
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("id", id);
			params.put("operatioType", operatioType);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: containRegionalList 
	 * @Description: TODO(包含的机构) 
	 * @param parentId
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CONTAIN_REGIONAL_LIST, method = RequestMethod.POST)
	public void containRegionalList(String parentId, HttpServletRequest request, HttpServletResponse response){
		logger.info(Constant.METHOD + Constant.RMM_CONTAIN_REGIONAL_LIST + ", " + Constant.INPUT_PARAMS + "parentId:" + parentId );
		if(StringUtils.isEmpty(parentId)){
			logger.info(Constant.METHOD + Constant.RMM_CONTAIN_REGIONAL_LIST + "," + Constant.RETURN_VALUE + null);
			return;
		}
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/org/regionalManagement/containRegionalList.jsp");
		Map<String, String> params = new HashMap<String, String>();
		params.put("parentId", parentId);//父ID
		String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_RELATED_LIST);
		String resultString = "";// 结果返回字符串
		List<CenterOrg> list = null; //机构包含的项目的集合
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			//判断调用Service返回的结果
			if(StringUtils.isNotEmpty(resultString)){
				list = (List<CenterOrg>) JsonUtil.jsonToDtos(resultString, CenterOrg.class);
			}
//			mv.addObject("containList",list);
			DataGrid dataGrid = new DataGrid(Long.parseLong((list != null ? list.size() : 0) +""), list);
			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CONTAIN_REGIONAL_LIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CONTAIN_REGIONAL_LIST + ", " + Constant.INPUT_PARAMS + JsonUtil.objectToJson(mv));
//		return mv;
	}
	
	/**
	 * 
	 * @Title: noContainRegionalMain 
	 * @Description: TODO(未包含的项目Main页面) 
	 * @param testItemId
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_NO_CONTAIN_REGIONAL_MAIN, method = RequestMethod.POST)
	public ModelAndView noContainRegionalMain(String parentId, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_MAIN + ", " + Constant.INPUT_PARAMS + "parentId:" + parentId );
		if(StringUtils.isEmpty(parentId)){
			logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_MAIN + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/org/regionalManagement/noContainRegionalMain.jsp");
		mv.addObject("parentId", parentId);
		logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_MAIN + ", " + Constant.INPUT_PARAMS + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	 * @Title: noContainRegionalList 
	 * @Description: TODO(机构未包含的项目) 
	 * @param dto
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_NO_CONTAIN_REGIONAL_LIST, method = RequestMethod.POST)
	public void noContainRegionalList(CenterOrgQueryDto dto, HttpServletRequest request, HttpServletResponse response){
		logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_LIST + ", " + Constant.INPUT_PARAMS + "CenterOrgQueryDto:" + JsonUtil.DtoTojson(dto));
		if (dto == null){
			logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_LIST + "," + Constant.RETURN_VALUE + null);
			return;
		}
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/org/regionalManagement/noContainRegionalList.jsp");
		Map<String, String> params = new HashMap<String, String>();
		params.put("JsonDto", JsonUtil.DtoTojson(dto));
		String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_NO_CONTAIN_REGIONAL_LIST);
		String resultString = ""; //结果json字符串
		List<CenterOrg> notContainList = null; //机构未包含的项目
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			if(resultString != null){
				notContainList = (List<CenterOrg>) JsonUtil.jsonToDtos(resultString, CenterOrg.class);
			}
//			mv.addObject("notContainList",notContainList);
			DataGrid dataGrid = new DataGrid(Long.parseLong((notContainList != null ? notContainList.size() : 0) + ""), notContainList);
			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_LIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_LIST + ", " + Constant.INPUT_PARAMS + JsonUtil.objectToJson(mv));
//		return mv;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDelItemBatch 
	 * @Description: TODO(批量删除关联的机构) 
	 * @param ids
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDelItemBatch(String ids,String parentId , HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH + "," + Constant.INPUT_PARAMS + "ids:" + ids + "," + "parentId:" + parentId );
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtil.isEmpty(ids) || StringUtil.isEmpty(parentId) ){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH + "," + Constant.INPUT_PARAMS + message );
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("ids", ids);
			params.put("parentId", parentId);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH + "," + Constant.INPUT_PARAMS + message );
		return message;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDeleteBatch 
	 * @Description: TODO(批量删除行政机构) 
	 * @param ids
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDeleteBatch(String ids, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH + "," + Constant.INPUT_PARAMS + "ids:" + ids );
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtil.isEmpty(ids)){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH + "," + Constant.INPUT_PARAMS + message );
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH + "," + Constant.INPUT_PARAMS + message );
		return message;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDelete 
	 * @Description: TODO(删除行政机构) 
	 * @param id
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDelete(String id, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE + "," + Constant.INPUT_PARAMS + "id:" + id );
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtil.isEmpty(id)){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE + "," + Constant.INPUT_PARAMS + message );
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE + "," + Constant.INPUT_PARAMS + message );
		return message;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDelItem 
	 * @Description: TODO(删除关联的机构) 
	 * @param id
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDelItem(String id, String parentId, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM + "," + Constant.INPUT_PARAMS + "id:" + id + "," + "parentId:" + parentId );
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtil.isEmpty(id) || StringUtil.isEmpty(parentId)){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM + "," + Constant.INPUT_PARAMS + message );
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("id", id);
			params.put("parentId", parentId);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM + "," + Constant.INPUT_PARAMS + message );
		return message;
	}
	
	/**
	 * 
	 * @Title: regionalManagementIfExisted 
	 * @Description: TODO(同名验证) 
	 * @param centerOrg
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementIfExisted(@ModelAttribute CenterOrg centerOrg, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + "centerOrg:" + JsonUtil.DtoTojson(centerOrg));
		String message = Message.MSG_SERVICE_EXCEP;
		if(centerOrg == null){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try{
			params.put("dtoJson", JsonUtil.DtoTojson(centerOrg));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: regionalManagementAdd 
	 * @Description: TODO(新增) 
	 * @param centerOrg
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementAdd(@ModelAttribute CenterOrg centerOrg, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD + "," + Constant.INPUT_PARAMS + "centerOrg:" + JsonUtil.DtoTojson(centerOrg));
		String message = Message.MSG_SERVICE_EXCEP;
		if(centerOrg == null){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD + "," + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try{
			params.put("dtoJson", JsonUtil.DtoTojson(centerOrg));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: regionalManagementEdit 
	 * @Description: TODO(修改) 
	 * @param centerOrg
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementEdit(@ModelAttribute CenterOrg centerOrg, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_EDIT + "," + Constant.INPUT_PARAMS + "centerOrg:" + JsonUtil.DtoTojson(centerOrg));
		String message = Message.MSG_SERVICE_EXCEP;
		if(centerOrg == null){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_EDIT + "," + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try{
			params.put("dtoJson", JsonUtil.DtoTojson(centerOrg));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			params.clear();
			params.put("id", centerOrg.getId()+"");
			url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CenterOrg entity = (CenterOrg) JsonUtil.jsonToDto(message, CenterOrg.class, null);
			entity.setIdString(entity.getId()+"");
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		}catch(Exception e){
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_EDIT + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_EDIT + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: regionalManagementItemAddBatch
	 * @Description: 添加项目确认
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementItemAddBatch(String parentId, String addTestItemIds, 
			String delTestItemIds, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH + ", " + Constant.INPUT_PARAMS + "parentId:" + parentId + "," + "addTestItemIds:" + addTestItemIds+ "," + "delTestItemIds:" + delTestItemIds );
		if (StringUtils.isEmpty(parentId)) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH + ", " + Constant.INPUT_PARAMS + null);
			return null;
		}
		String message = "";
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("parentId", parentId);
			params.put("addTestItemIds", addTestItemIds);
			params.put("delTestItemIds", delTestItemIds);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG_MANAGEMENT, Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			message = Message.MSG_SERVICE_EXCEP;
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
}

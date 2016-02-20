package com.daan.controller.org;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.daan.domain.CtrRegions;
import com.daan.domain.DataGrid;
import com.daan.domain.Message;
import com.daan.dto.CenterOrgQueryDto;
import com.daan.enums.OrgType;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.Page;

/**
 * @ClassName: CenterOrgController 
 * @Description: TODO(医疗机构维护控制器) 
 * @author zhangliping
 * @date 2015年12月7日 下午1:20:37
 */
@Controller
@RequestMapping(value = Constant.RMC_CENTERORG)
public class CenterOrgController extends CommonComponentController {
		
	/**
	 * 
	 * @Title: centerOrgMain 
	 * @Description: TODO(中心机构单位-初始界面Controller) 
	 * @param typeKey
	 * @param request
	 * @return ModelAndView 返回类型 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MAIN, method = RequestMethod.GET)
	public ModelAndView centerOrgMain(String orgTypeId, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MAIN + ", " + Constant.INPUT_PARAMS + "orgTypeId:" + orgTypeId);
		if (StringUtils.isEmpty(orgTypeId)) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MAIN + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		// 中心机构单位-初始界面Controller.根据不同字典类型orgTypeId返回到具体页面
		// orgTypeId 序号:根据 业务表CODE编码对应该的编号
		Page<CenterOrg> page = new Page<CenterOrg>(Constant.PAGE_NUMBER);
		HashMap<String, String> modelUrl = Constant.CENTERORG_MODULE_MAP.get(Integer.parseInt(orgTypeId));
		ModelAndView mv = new ModelAndView(modelUrl.get("main"));   
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		mv.addObject("page", page);
		mv.addObject("orgTypeId", orgTypeId);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MAIN + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	 * @Title: centerOrgPageList 
	 * @Description: TODO(这里用一句话描述这个方法的作用) 
	 * @param dto
	 * @param page
	 * @param request
	 * @return ModelAndView 返回类型 
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_PAGE_LIST, method = RequestMethod.POST)
	public void centerOrgPageList(CenterOrgQueryDto dto, Page<CenterOrg> page, HttpServletRequest request,HttpServletResponse response) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + ", " + Constant.INPUT_PARAMS + "CenterOrgQueryDto:" + JsonUtil.DtoTojson(dto) + "," + "Page<CenterOrg>: " + JsonUtil.DtoTojson(page));
		if (dto == null || page == null ){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + "," + Constant.RETURN_VALUE + null);
			//return null;
		}
		HashMap<String, String> modelUrl = Constant.CENTERORG_MODULE_MAP.get(dto.getOrgTypeId());
		//ModelAndView mv = new ModelAndView(modelUrl.get("list"));
		Map<String, String> params = new HashMap<String, String>();
		try {
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_PAGE_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("@@@"));
			resultPage = resultString.substring(resultString.indexOf("@@@") + 3, resultString.length());
			List<CenterOrg> list = (List<CenterOrg>) JsonUtil.jsonToDtos(resultList, CenterOrg.class);
			page = (Page<CenterOrg>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			
			DataGrid dataGrid = new DataGrid(page.getTotalCount(),list);					

			this.printJsonData(JsonUtil.DtoTojson(dataGrid),response);
			
			//mv.addObject("resultList", list);
			//mv.addObject("page", page);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		//logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		//return mv;
	}
	
	/**
	 * 
	 * @Title: orgPopUpInfoList 
	 * @Description: TODO(机构弹出框) 
	 * @param dto
	 * @param page
	 * @param request
	 * @return ModelAndView 返回类型 
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_POPUPINFOLIST, method = RequestMethod.POST)
	public ModelAndView orgPopUpInfoList(CenterOrgQueryDto dto, Page<CenterOrg> page, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_POPUPINFOLIST + ", " + Constant.INPUT_PARAMS + "CenterOrgQueryDto:" + JsonUtil.DtoTojson(dto) + "," + "Page<CenterOrg>: " + JsonUtil.DtoTojson(page));
		if (dto == null || page == null){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_POPUPINFOLIST + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		Map<String, String> params = new HashMap<String, String>();
		ModelAndView mv = new ModelAndView(Constant.MODULE_CENTERORG_POPUPINFOLIST);
		try {
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_PAGE_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("@@@"));
			resultPage = resultString.substring(resultString.indexOf("@@@") + 3, resultString.length());
			List<CenterOrg> list = (List<CenterOrg>) JsonUtil.jsonToDtos(resultList, CenterOrg.class);
			page = (Page<CenterOrg>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			mv.addObject("resultList", list);
			mv.addObject("page", page);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_POPUPINFOLIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_POPUPINFOLIST + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	 * @Title: centerOrgInfo 
	 * @Description: TODO(明细页面) 
	 * @param orgTypeId
	 * @param id
	 * @param opType
	 * @param request
	 * @return ModelAndView 返回类型 
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_INFO, method = RequestMethod.POST)
	public ModelAndView centerOrgInfo(Integer orgTypeId, String id, String opType, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_INFO + ", " + Constant.INPUT_PARAMS + "orgTypeId:" + orgTypeId + "," + "id: " + id + "," + "opType:" + opType);
		if (orgTypeId == null) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_INFO + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		ModelAndView mv = new ModelAndView();
		mv.addObject("orgTypeId", orgTypeId);
		HashMap<String, String> modelMap = Constant.CENTERORG_MODULE_MAP.get(orgTypeId);
		String message = Message.MSG_SERVICE_EXCEP;
		if ("add".equals(opType)) { // 新增跳转
			HashMap<String, String> codeNoParams = new HashMap<String, String>();
			try {
				mv.setViewName(modelMap.get("add"));
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
				logger.error(Constant.METHOD + Constant.RMM_CENTERORG_INFO + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(codeNoParams) + "," + Constant.EXCEPTION + e.getMessage(), e);
			}
		} else if ("edit".equals(opType)) { // 修改跳转
			mv.setViewName(modelMap.get("add"));
		} else if ("view".equals(opType)) { // 查看跳转
			mv.setViewName(modelMap.get("add"));
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			//if (StringUtils.isNotEmpty(id)) {
				params.put("id", id);
				mv.addObject("opType", opType);
				// 查找Info
				String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CenterOrg centerOrg = (CenterOrg) JsonUtil.jsonToDto(message, CenterOrg.class, null);
				mv.addObject("entity", centerOrg);
				//查找地区名称
				url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_INFO_RTLIST);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				List<CtrRegions> list = (List<CtrRegions>) JsonUtil.jsonToDtos(message, CtrRegions.class);
				mv.addObject("rtList", list);
			//}
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_INFO + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_INFO + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	 * @Title: centerOrgDisableOrEnable 
	 * @Description: TODO(中心机构单位-启用/停用) 
	 * @param id
	 * @param operatioType
	 * @param request
	 * @return String 返回类型
	 * @throws
	 */
	@Transactional
	@RequestMapping(value = Constant.RMM_CENTERORG_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgDisableOrEnable(String id, String operatioType, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "operatioType:" + operatioType);
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("id", id);
			params.put("operatioType", operatioType);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_DIDABLEORENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_DIDABLEORENABLE + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: checkNameExisted 
	 * @Description: TODO(同名验证) 
	 * @param centerOrg
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_NAME_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNameExisted(@ModelAttribute CenterOrg centerOrg, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + "centerOrg:" + JsonUtil.DtoTojson(centerOrg));
		String message = Message.MSG_SERVICE_EXCEP;
		if(centerOrg == null){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try{
			params.put("dtoJson", JsonUtil.DtoTojson(centerOrg));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_NAME_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: checkNacaoIdExisted 
	 * @Description: TODO(检查是否同卫生机构代码) 
	 * @param id
	 * @param typeKey
	 * @param name
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_NACAOID_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNacaoIdExisted(String id, Integer orgTypeId, String nacaoId, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + "," + Constant.INPUT_PARAMS + "id:" + id + "," + "orgTypeId:" + orgTypeId + "," + "nacaoId:" + nacaoId);
		String message = Message.MSG_SERVICE_EXCEP;
		if(orgTypeId == null || StringUtils.isEmpty(nacaoId)){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + "," + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try{
			params.put("id", id);
			params.put("orgTypeId", String.valueOf(orgTypeId));
			params.put("nacaoId", nacaoId);
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_NACAOID_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			//logger.error(e.getMessage() , e);
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: centerOrgAdd 
	 * @Description: TODO(新增) 
	 * @param ctrInstruments
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgAdd(@ModelAttribute CenterOrg centerOrg, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_ADD + "," + Constant.INPUT_PARAMS + "centerOrg:" + JsonUtil.DtoTojson(centerOrg));
		String message = Message.MSG_SERVICE_EXCEP;
		if(centerOrg == null){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_ADD + "," + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try{
			params.put("dtoJson", JsonUtil.DtoTojson(centerOrg));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_ADD + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_ADD + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: centerOrgEdit 
	 * @Description: TODO(修改) 
	 * @param centerOrg
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgEdit(@ModelAttribute CenterOrg centerOrg, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_EDIT + "," + Constant.INPUT_PARAMS + "centerOrg:" + JsonUtil.DtoTojson(centerOrg));
		String message = Message.MSG_SERVICE_EXCEP;
		if(centerOrg == null){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_EDIT + "," + Constant.INPUT_PARAMS + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try{
			params.put("dtoJson", JsonUtil.DtoTojson(centerOrg));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			params.clear();
			params.put("id", centerOrg.getId()+"");
			url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CenterOrg entity = (CenterOrg) JsonUtil.jsonToDto(message, CenterOrg.class, null);
			entity.setIdString(entity.getId()+"");
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		}catch(Exception e){
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_EDIT + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_EDIT + "," + Constant.INPUT_PARAMS + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: centerOrgDelete 
	 * @Description: TODO(删除) 
	 * @param id
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgDelete(String id, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE + "," + Constant.INPUT_PARAMS + "id:" + id );
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtil.isEmpty(id)){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE + "," + Constant.INPUT_PARAMS + message );
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_DELETE + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE + "," + Constant.INPUT_PARAMS + message );
		return message;
	}
	
	/**
	 * 
	 * @Title: centerOrgDeleteBatch 
	 * @Description: TODO(批量删除) 
	 * @param ids
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgDeleteBatch(String ids, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE_BATCH + "," + Constant.INPUT_PARAMS + "ids:" + ids );
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtil.isEmpty(ids)){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE_BATCH + "," + Constant.INPUT_PARAMS + message );
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		try {
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_DELETE_BATCH + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE_BATCH + "," + Constant.INPUT_PARAMS + message );
		return message;
	}
}

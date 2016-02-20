package com.daan.controller.pm;


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
import com.daan.domain.CentreMicrobeItem;
import com.daan.domain.Message;
import com.daan.dto.CentreMicrobeItemDto;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
* @ClassName: CentreMicrobeItemController 
* @Description: TODO(中心微生物字典) 
* @author liuguilin
* @date 2015年12月4日 上午10:19:44 
*
 */
@Controller
@RequestMapping(value = Constant.RMC_CENTREMICROBEITEM)
public class CentreMicrobeItemController extends CommonComponentController {

	/**
	 * 
	* @Title: CentreMicrobeItemMain 
	* @Description: TODO(中心微生物字典-初始界面Controller) 
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMC_CENTREMICROBEITEM_MAIN, method = RequestMethod.GET)
	public ModelAndView centreMicrobeItemMain(Integer itemTypeId, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMC_CENTREMICROBEITEM_MAIN + ", " + Constant.INPUT_PARAMS + "itemTypeId:" + itemTypeId);
		if (itemTypeId == null) { 
			logger.info(Constant.METHOD + Constant.RMC_CENTREMICROBEITEM_MAIN + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		// 中心微生物字典-初始界面Controller.根据不同字典类型itemTypeId返回到具体字典类型页面
		// itemTypeId 序号:根据 业务表CODE编码对应该的编号
		Page<CentreMicrobeItem> page = new Page<CentreMicrobeItem>(Constant.PAGE_NUMBER);
		HashMap<String, String> modelUrl = Constant.CENTREMICROBEITEM_MODULE_MAP.get(itemTypeId);
		ModelAndView mv = new ModelAndView(modelUrl.get("main"));   
		mv.addObject("page", page);
		mv.addObject("itemTypeId", itemTypeId);
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		logger.info(Constant.METHOD + Constant.RMC_CENTREMICROBEITEM_MAIN + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}

	/**
	 * 
	* @Title: CentreMicrobeItemPageList 
	* @Description: TODO(中心微生物字典列表) 
	* @param @param dto
	* @param @param page
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST, method = RequestMethod.POST)
	public void getCentreMicrobeitemsPageList(CentreMicrobeItemDto dto, Page<CentreMicrobeItem> page, HttpServletRequest request, HttpServletResponse response) {
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST + ", " + Constant.INPUT_PARAMS + "CentreMicrobeItemDto:" + JsonUtil.DtoTojson(dto) + "Page<CentreMicrobeItem>: " + JsonUtil.DtoTojson(page));
		if (dto == null){
			logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST + "," + Constant.RETURN_VALUE + null);
			return;
		}
		HashMap<String, String> modelUrl = Constant.CENTREMICROBEITEM_MODULE_MAP.get(dto.getItemTypeId());
		ModelAndView mv = new ModelAndView(modelUrl.get("list"));
		Map<String, String> params = new HashMap<String, String>();
		dto.setPage(JsonUtil.DtoTojson(page));
		params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
		String resultString = null;
		String resultList = null; // 结果List json
		String resultPage = null; // 分页page json
		String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST);
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("|"));
			resultPage = resultString.substring(resultString.indexOf("|") + 1, resultString.length());
			List<CentreMicrobeItem> list = (List<CentreMicrobeItem>) JsonUtil.jsonToDtos(resultList, CentreMicrobeItem.class);
			page = (Page<CentreMicrobeItem>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			mv.addObject("resultList", list);
			mv.addObject("page", page);
			DataGrid dataGrid = new DataGrid(page.getTotalCount(), list);
			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
//		return mv;
	}
	
	/**
	 * 
	* @Title: CentreMicrobeItemInfo 
	* @Description: TODO(明细页面) 
	* @param @param itemTypeId
	* @param @param id
	* @param @param opType
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID, method = RequestMethod.POST)
	public ModelAndView getCentreMicrobeitemDetailById(Integer itemTypeId, String id, String opType, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID + ", " + Constant.INPUT_PARAMS + "itemTypeId:" + itemTypeId + "id: " + id + "opType:" + opType);
		if (itemTypeId == null) {
			logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID + "," + Constant.RETURN_VALUE + null);
			return null;
		}
		ModelAndView mv = new ModelAndView();
		mv.addObject("itemTypeId", itemTypeId);
		mv.addObject("opType", opType);
		HashMap<String, String> modelMap = Constant.CENTREMICROBEITEM_MODULE_MAP.get(itemTypeId);
		String message = Message.MSG_SERVICE_EXCEP;
		if ("add".equals(opType)) { // 新增跳转
			mv.setViewName(modelMap.get("add"));
			HashMap<String, String> codeNoParams = new HashMap<String, String>();
			codeNoParams.put("code", String.valueOf(itemTypeId));//modelMap.get("code")
			String getCodeUrl = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_GETCODENO);
			try {
				String codeNo = HttpUtil.postResponseString(getCodeUrl, codeNoParams, this.getAdminLoginUser(request));
				mv.addObject("codeNo", codeNo);
			} catch (Exception e) {
				message = Message.MSG_SERVICE_EXCEP;
				logger.error(Constant.METHOD + Constant.RMM_GETCODENO + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(codeNoParams) + "," + Constant.EXCEPTION + e.getMessage(), e);
			}
			// 查找最大顺序号
			String getOrderUrl = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_MAXDISPLAYORDER);
			Map<String, String> getCodeParams = new HashMap<String, String>();
			getCodeParams.put("tableName", Constant.TABLENAME_CENTREMICROBEITEM);
			String conditionStr = " and item_type_id =" + itemTypeId;
			getCodeParams.put("conditionStr", conditionStr);
			String displayOrder;
			try {
				displayOrder = HttpUtil.postResponseString(getOrderUrl, getCodeParams, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
			} catch (Exception e) {
				message = Message.MSG_SERVICE_EXCEP;
				logger.error(Constant.METHOD + Constant.RMM_MAXDISPLAYORDER + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(getCodeParams) + "," + Constant.EXCEPTION + e.getMessage(), e);
			}
		} else if ("edit".equals(opType)) { // 修改跳转
//			mv.setViewName(modelMap.get("edit"));
			mv.setViewName(modelMap.get("add"));
		} else if ("view".equals(opType)) { // 查看跳转
//			mv.setViewName(modelMap.get("view"));
			mv.setViewName(modelMap.get("add"));
		}
		if (StringUtils.isNotEmpty(id)) {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);

			// 查找Info
			String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID);
			try {
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CentreMicrobeItem CentreMicrobeItem = (CentreMicrobeItem) JsonUtil.jsonToDto(message, CentreMicrobeItem.class, null);
				mv.addObject("entity", CentreMicrobeItem);
			} catch (Exception e) {
				logger.error(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 
	* @Title: CentreMicrobeItemAdd 
	* @Description: TODO(新增基础字典信息) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_ADD_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String addCentreMicrobeitem(@ModelAttribute CentreMicrobeItem centreMicrobeItem, HttpServletRequest request){
		//记录传入参数
		logger.info(Constant.METHOD + Constant.RMM_ADD_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + "centreMicrobeItem:" + JsonUtil.DtoTojson(centreMicrobeItem));
		String message = Message.MSG_SERVICE_EXCEP;
		if (centreMicrobeItem == null) {
			//记录返回值
			logger.info(Constant.METHOD + Constant.RMM_ADD_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("dtoJson", JsonUtil.DtoTojson(centreMicrobeItem)); 
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_ADD_CENTREMICROBEITEM);
		try {
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		} catch (Exception e) {
			//记录异常信息
			logger.error(Constant.METHOD + Constant.RMM_ADD_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		//记录返回值
		logger.info(Constant.METHOD + Constant.RMM_ADD_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
		return message;
	}
	
	/**
	 * 
	* @Title: CentreMicrobeItemEdit 
	* @Description: TODO(中心微生物字典修改) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_MODIFY_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String modifyCentreMicrobeitem(@ModelAttribute CentreMicrobeItem centreMicrobeItem, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + "centreMicrobeItem:" + JsonUtil.DtoTojson(centreMicrobeItem));
		String message = Message.MSG_SERVICE_EXCEP;
		if(centreMicrobeItem == null){
			logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("dtoJson", JsonUtil.DtoTojson(centreMicrobeItem));
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_MODIFY_CENTREMICROBEITEM);
		try {
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		params.clear();
		params.put("id", String.valueOf(centreMicrobeItem.getId()));
		url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID);
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CentreMicrobeItem entity = (CentreMicrobeItem) JsonUtil.jsonToDto(message, CentreMicrobeItem.class, null);
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
		return message;
	}
	
	/**
	 * 
	* @Title: CentreMicrobeItemDisableOrEnable 
	* @Description: TODO(基础字典-启用/停用) 
	* @param @param id
	* @param @param operatioType
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String disableOrEnableCentreMicrobeitem(String id, String operatioType, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + "id:" + id + "operatioType:" + operatioType);
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("id", id);
		params.put("operationType", operatioType);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM);
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
		return message;
	}
	
	/**
	 * 
	* @Title: checkNameExisted 
	* @Description: TODO(中心微生物字典-新增同名验证) 
	* @param @param CentreMicrobeItem
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST, method = RequestMethod.POST)
	@ResponseBody
	public String checkIfCentreMicrobeitemNameExist(String id, Integer itemTypeId, String name, HttpServletRequest request){
		logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + "," + Constant.INPUT_PARAMS + "id:" + id + "itemTypeId:" + itemTypeId + "name:" + name);
		String message = Message.MSG_SERVICE_EXCEP;
		if(itemTypeId == null || StringUtils.isEmpty(name)){
			logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + "," + Constant.RETURN_VALUE + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("id", id);
		params.put("itemTypeId", String.valueOf(itemTypeId));
		params.put("name", name);
		String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST);
		try{
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + "," + Constant.RETURN_VALUE + message);
		return message;
	}
	
	/**
	 * 
	* @Title: CentreMicrobeItemDelete 
	* @Description: TODO(中心微生物字典删除信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_DELETE_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String deleteCentreMicrobeitem(String id, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_DELETE_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + "id:" + id);
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(id)){
			logger.info(Constant.METHOD + Constant.RMM_DELETE_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("id", id);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_DELETE_CENTREMICROBEITEM);
		try {
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_DELETE_CENTREMICROBEITEM + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_DELETE_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + message);
		return message;
	}
	
	/**
	 * 
	* @Title: CentreMicrobeItemDeleteBatch 
	* @Description: TODO(批量删除) 
	* @param @param ids
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS, method = RequestMethod.POST)
	@ResponseBody
	public String batchDeleteCentreMicrobeitems(String ids, HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS + "," + Constant.INPUT_PARAMS + "ids:" + ids);
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(ids)){
			logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS + "," + Constant.RETURN_VALUE + message);
			return message;
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("ids", ids);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_CENTREMICROBEITEM, Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS);
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS + "," + Constant.RETURN_VALUE + message);
		return message;
	}
	
}


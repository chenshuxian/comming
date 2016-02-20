package com.daan.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.daan.dao.CentreMicrobeItemDao;
import com.daan.domain.CentreMicrobeItem;
import com.daan.domain.Constant;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CentreMicrobeItemDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
 * @ClassName: CentreMicrobeItemService
 * @Description: 中心微生物字典表相关service，处理细菌字典和抗生素字典相关业务。
 * @author liujiawei
 * @date 2015年12月10日 下午6:59:57
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CENTREMICROBEITEM)
public class CentreMicrobeItemService extends AbstractService {

	@Autowired
	private CentreMicrobeItemDao centreMicrobeItemDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: getCentremicrobeitemDetail
	 * @Description: 通过id查找单条记录
	 * @param id
	 * @param request
	 * @return JSON格式的单个Centremicrobeitem
	 * @author liujiawei
	 * @date 2015年12月11日 上午10:51:18
	 */
	@RequestMapping(value = Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID, method = RequestMethod.POST)
	@ResponseBody
	public String getCentremicrobeitemDetailById(@RequestParam(value = "id", required = true) String id, HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID + ", " + Constant.INPUT_PARAMS + "id:" + id);
		if (StringUtils.isEmpty(id)) {
			this.throwParamIsNullException(Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID);
		}
		// 通过id查找单条记录
		CentreMicrobeItem centreMicrobeItem = centreMicrobeItemDao.getCentreMicrobeitemDetailById(id);
		String centreMicrobeItemJson = JsonUtil.DtoTojson(centreMicrobeItem);
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID + "," + Constant.RETURN_VALUE + centreMicrobeItemJson);
		return centreMicrobeItemJson;
	}

	/**
	 * 
	 * @Title: getCentremicrobeitemsPageList
	 * @Description: 获取中心微生物字典列表
	 * @param queryDtoJson Json格式的查询条件Dto
	 * @param request
	 * @return String
	 * @author liujiawei
	 * @throws Exception 
	 * @date 2015年12月11日 下午3:52:56
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST, method = RequestMethod.POST)
	@ResponseBody
	public String getCentremicrobeitemsPageList(@RequestParam(value = "queryDtoJson", required = true) String queryDtoJson, HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST + ", " + Constant.INPUT_PARAMS + "queryDtoJson:" + queryDtoJson);
		if (StringUtils.isEmpty(queryDtoJson)) {
			this.throwParamIsNullException(Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST);
		}
		Map<String, Object> params = new HashMap<String, Object>();
		CentreMicrobeItemDto dto = (CentreMicrobeItemDto) JsonUtil.jsonToDto(queryDtoJson, CentreMicrobeItemDto.class, null);
		Page<CentreMicrobeItem> page = (Page<CentreMicrobeItem>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		// 查询条件Dto
		params.put("queryDto", dto);
		// 分页page对象
		params.put("page", page);
		// 获取当前查询条件下的记录数
		int rowCount = this.centreMicrobeItemDao.countCentreMicrobeItemByConditions(params);
		page.setTotalCount(rowCount);
		List<CentreMicrobeItem> list = centreMicrobeItemDao.getCentreMicrobeitemsPageListByConditions(params);
		String listAndPageJson =  JsonUtil.DtosTojson(list) + "|" + JsonUtil.DtoTojson(page);
		logger.info(Constant.METHOD + Constant.RMM_GET_CENTREMICROBEITEMS_PAGELIST + "," + Constant.RETURN_VALUE + listAndPageJson);
		return listAndPageJson;
	}

	/**
	 * 
	 * @Title: addCentremicrobeitem
	 * @Description: 添加中心微生物字典
	 * @param dtoJson
	 * @param userJson
	 * @return String
	 * @author liujiawei
	 * @date 2015年12月11日 下午3:54:20
	 */
	@RequestMapping(value = Constant.RMM_ADD_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String addCentremicrobeitem(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		// 记录传入参数
		logger.info(Constant.METHOD + Constant.RMM_ADD_CENTREMICROBEITEM + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			//抛出异常并记录异常信息
			this.throwParamIsNullException(Constant.RMM_ADD_CENTREMICROBEITEM);
		}
		CentreMicrobeItem centreMicrobeItem = (CentreMicrobeItem) JsonUtil.jsonToDto(dtoJson, CentreMicrobeItem.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		centreMicrobeItem.setId(IDCreater.nextId());
		centreMicrobeItem.setStatus(IsAbleEnum.disable.ordinal());// 新增默认为停用状态
		centreMicrobeItem.setTimeVersion(new Date());
		// 保存CentreMicrobeItem
		int result = centreMicrobeItemDao.addCentreMicrobeItem(centreMicrobeItem);
		// 保存日志到日志表
		saveLog(user, Constant.OPERATION_ADD, centreMicrobeItem, null);
		if (result == 1) {
			// 记录返回值
			logger.info(Constant.METHOD + Constant.RMM_ADD_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
			return Message.MSG_SAVE_SUCC;
		}
		// 记录返回值
		logger.info(Constant.METHOD + Constant.RMM_ADD_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_FAIL);
		return Message.MSG_SAVE_FAIL;
	}

	/**
	 * 
	 * @Title: modifyCentreMicrobeItem
	 * @Description: 修改中心微生物字典
	 * @param dtoJson
	 * @param userJson
	 * @throws Exception
	 * @author liujiawei
	 * @date 2015年12月11日 下午3:54:47
	 */
	@RequestMapping(value = Constant.RMM_MODIFY_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String modifyCentreMicrobeItem(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			this.throwParamIsNullException(Constant.RMM_MODIFY_CENTREMICROBEITEM);
		}
		CentreMicrobeItem centreMicrobeItem = (CentreMicrobeItem) JsonUtil.jsonToDto(dtoJson, CentreMicrobeItem.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CentreMicrobeItem oldCentreMicrobeItem = centreMicrobeItemDao.getCentreMicrobeitemDetailById(String.valueOf(centreMicrobeItem.getId()));
		if (oldCentreMicrobeItem.getStatus() == IsAbleEnum.disable.ordinal()) {
			// 状态为停用时方可修改
			int result = centreMicrobeItemDao.modifyCentreMicrobeItem(centreMicrobeItem);
			// 保存日志
			saveLog(user, Constant.OPERATION_EDIT, centreMicrobeItem, oldCentreMicrobeItem);
			if (result == 1) {
				logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
				return Message.MSG_SAVE_SUCC;
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_FAIL);
		return Message.MSG_SAVE_FAIL;
	}

	/**
	 * 
	 * @Title: deleteCentremicrobeitem
	 * @Description: 删除中心微生物字典
	 * @param id
	 * @param userJson
	 * @throws Exception
	 * @author liujiawei
	 * @date 2015年12月11日 下午3:55:02
	 */
	@RequestMapping(value = Constant.RMM_DELETE_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String deleteCentremicrobeitem(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_DELETE_CENTREMICROBEITEM + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)) {
			this.throwParamIsNullException(Constant.RMM_DELETE_CENTREMICROBEITEM);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CentreMicrobeItem centreMicrobeItem = centreMicrobeItemDao.getCentreMicrobeitemDetailById(id);
		if (centreMicrobeItem.getStatus() == IsAbleEnum.disable.ordinal()) {
			// 状态为停用时方可删除
			int result = centreMicrobeItemDao.deleteCentreMicrobeitem(id);
			// 保存日志
			saveLog(user, Constant.OPERATION_DETELE, centreMicrobeItem, null);
			if (result <= 0) {
				logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_DEL_FAIL3);
				return Message.MSG_DEL_FAIL3;
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_MODIFY_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;

	}

	/**
	 * 
	 * @Title: batchDeleteCentremicrobeitems
	 * @Description: 批量删除中心微生物字典
	 * @param ids
	 * @param userJson
	 * @throws Exception
	 * @author liujiawei
	 * @date 2015年12月11日 下午3:55:19
	 */
	@RequestMapping(value = Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS, method = RequestMethod.POST)
	@ResponseBody
	public String batchDeleteCentremicrobeitems(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS + ", " + Constant.INPUT_PARAMS + "ids:" + ids + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)) {
			this.throwParamIsNullException(Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CentreMicrobeItem centreMicrobeItem = centreMicrobeItemDao.getCentreMicrobeitemDetailById(id);
					if (centreMicrobeItem.getStatus() == IsAbleEnum.disable.ordinal()) {
						// 状态为停用时方可删除
						int result = centreMicrobeItemDao.deleteCentreMicrobeitem(id);
						// 保存日志
						saveLog(user, Constant.OPERATION_DETELE, centreMicrobeItem, null);
						if (result <= 0) {
							logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS + "," + Constant.RETURN_VALUE + Message.MSG_DEL_FAIL3);
							return Message.MSG_DEL_FAIL3;
						}
					}
				}
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_CENTREMICROBEITEMS + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;
	}

	/**
	 * 
	 * @Title: disableOrEnableCentremicrobeitem
	 * @Description: 停用或启用中心微生物字典
	 * @param id
	 * @param operatiomType
	 * @param userJson
	 * @throws Exception
	 * @author liujiawei
	 * @date 2015年12月11日 下午3:55:41
	 */
	@RequestMapping(value = Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String disableOrEnableCentremicrobeitem(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operationType", required = true) String operationType, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "operationType:" + operationType + "," +"userJson:" + userJson);
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operationType)) {
			this.throwParamIsNullException(Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Integer status = 0;
		if ("Enable".equals(operationType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operationType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		CentreMicrobeItem oldCentreMicrobeItem = centreMicrobeItemDao.getCentreMicrobeitemDetailById(id);
		CentreMicrobeItem centreMicrobeItem = (CentreMicrobeItem) oldCentreMicrobeItem.clone();
		centreMicrobeItem.setStatus(status);
		int result = centreMicrobeItemDao.modifyCentreMicrobeItem(centreMicrobeItem);
		// 保存日志
		saveLog(user, Constant.OPERATION_EDIT, centreMicrobeItem, oldCentreMicrobeItem);
		if (result == 1) {
			logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
			return Message.MSG_SAVE_SUCC;
		}
		logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_FAIL);
		return Message.MSG_SAVE_FAIL;
	}

	/**
	 * 
	 * @Title: checkIfCentremicrobeitemNameExist
	 * @Description: 检查中心微生物字典名字是否存在
	 * @param id
	 * @param itemTypeId
	 * @param name
	 * @throws Exception
	 * @author liujiawei
	 * @date 2015年12月11日 下午3:56:04
	 */
	@RequestMapping(value = Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST, method = RequestMethod.POST)
	@ResponseBody
	public String checkIfCentremicrobeitemNameExist(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "itemTypeId", required = true) String itemTypeId, @RequestParam(value = "name", required = true) String name) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "itemTypeId:" + itemTypeId + "," +"name:" + name);
		if (StringUtils.isEmpty(itemTypeId) || StringUtils.isEmpty(name)) {
			this.throwParamIsNullException(Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST);
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("name", name);
		params.put("itemTypeId", itemTypeId);
		List<CentreMicrobeItem> centreMicrobeItemList = centreMicrobeItemDao.getCentreMicrobeItemsByName(params);
		if (centreMicrobeItemList.size() <= 0) {
			// 若size <= 0，说明不存在重复名字。
			logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + "," + Constant.RETURN_VALUE + "");
			return "";
		}
		// 预设为修改场景，若id为空，则为新增场景。
		boolean isModify = true;
		if (StringUtils.isEmpty(id)) {
			// 为新增场景
			isModify = false;
		}
		for (CentreMicrobeItem centreMicrobeItem : centreMicrobeItemList) {
			if (name.equals(centreMicrobeItem.getName())) {
				/*
				 * 上述条件成立时，存在三种可能: 可能一：新增场景，输入名字已存在，需提示名称已重复
				 * 可能二：修改场景，输入名字已存在且当前修改记录的id不等于当前遍历id，需提示名称已重复
				 * 可能三：修改场景，输入名字已存在且当前修改记录的id等于当前遍历id，不需要提示名称已重复
				 */
				if (!(isModify && id.equals(String.valueOf(centreMicrobeItem.getId())))) {
					// 非可能三，需提示名称已重复
					logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + "," + Constant.RETURN_VALUE + Message.MSG_CONFIRM_1);
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST + "," + Constant.RETURN_VALUE + "");
		return "";
	}

	/**
	 * 
	 * @Title: saveLog
	 * @Description: service中保存日志公用方法
	 * @param user 必须
	 * @param operationType  必须,取自Constant的OPERATION_ADD，OPERATION_EDIT 或 OPERATION_DETELE
	 * @param centreMicrobeItem  必须
	 * @param oldCentreMicrobeItem  仅修改操作时传入
	 * @return boolean
	 * @throws Exception
	 * @author liujiawei
	 * @date 2015年12月12日 下午1:59:57
	 */
	private boolean saveLog(User user, String operationType, CentreMicrobeItem centreMicrobeItem, CentreMicrobeItem oldCentreMicrobeItem) throws Exception {
		logger.info(Constant.METHOD + "saveLog" + ", " + Constant.INPUT_PARAMS + "user:" + JsonUtil.DtoTojson(user) + "," + "operationType:" + operationType + "," + "centreMicrobeItem:" + JsonUtil.DtoTojson(centreMicrobeItem) + "oldCentreMicrobeItem:" + JsonUtil.DtoTojson(oldCentreMicrobeItem));
		if (StringUtils.isEmpty(operationType) || centreMicrobeItem == null) {
			this.throwParamIsNullException("saveLog");
		}
		Integer itemTypeId = centreMicrobeItem.getItemTypeId();
		if (itemTypeId == null) {
			this.throwParamIsNullException("saveLog");
		}
		HashMap<String, String> model = Constant.CENTREMICROBEITEM_MODULE_MAP.get(itemTypeId);
		if (model == null) {
			this.throwParamIsNullException("saveLog");
		}
		IDictLogger op = null;
		if (Constant.OPERATION_ADD.equals(operationType)) {
			// 记录新增操作
			op = DictLogsFactory.CreateAddNewLogger();
		} else if (Constant.OPERATION_EDIT.equals(operationType)) {
			if (oldCentreMicrobeItem == null) {
				this.throwParamIsNullException("saveLog");
			}
			// 记录修改操作
			op = DictLogsFactory.CreateEditLogger(oldCentreMicrobeItem);
		} else if (Constant.OPERATION_DETELE.equals(operationType)) {
			// 记录删除操作
			op = DictLogsFactory.CreateDeleteLogger();
		} else {
			// 若非新增、修改、删除操作，抛出异常
			Exception e = new Exception("saveLog: optionType error !");
			logger.error(Constant.EXCEPTION + e.getMessage(), e);
			throw e;
		}
		op.AddChangedObject(centreMicrobeItem);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(itemTypeId);
		log.setModuleName(model.get("module"));
		log.setFunctionDesc(operationType + "-" + log.getModuleName());
		int result = this.dictLogsService.createDictLogs(log);
		if (result > 0) {
			logger.info(Constant.METHOD + "saveLog"+ "," + Constant.RETURN_VALUE + "true");
			return true;
		}
		logger.info(Constant.METHOD + "saveLog"+ "," + Constant.RETURN_VALUE + "false");
		return false;
	}


}

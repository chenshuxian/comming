package com.daan.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daan.domain.Constant;
import com.daan.domain.DictLogs;
import com.daan.domain.InstrumentBox;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.InstrumentBoxDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
 * @ClassName: InstrumentBoxService 
 * @Description: 客户盒子登记相关service
 * @author liujiawei
 * @date 2015年12月30日 下午2:23:40
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_INSTRUMENTBOX)
public class InstrumentBoxService extends AbstractService{
	
//	@Autowired
//	private InstrumentBoxDao instrumentBoxDao;
//	@Autowired
//	private DictLogsService dictLogsService;
//
//	/**
//	 *
//	 * @Title: getInstrumentBoxDetailById
//	 * @Description: 通过id查找单条记录
//	 * @param id
//	 * @return String
//	 * @throws Exception
//	 * @author liujiawei
//	 * @date 2015年12月30日 下午2:38:24
//	 */
//	@RequestMapping(value = Constant.RMM_GET_INSTRUMENTBOX_DETAIL_BY_ID, method = RequestMethod.POST)
//	public String getInstrumentBoxDetailById(String id) throws Exception {
//		logger.info(Constant.METHOD + Constant.RMM_GET_INSTRUMENTBOX_DETAIL_BY_ID + ", " + Constant.INPUT_PARAMS + "id:" + id);
//		if (StringUtils.isEmpty(id)) {
//			this.throwParamIsNullException(Constant.RMM_GET_INSTRUMENTBOX_DETAIL_BY_ID);
//		}
//		// 通过id查找单条记录
//		InstrumentBox instrumentBox = instrumentBoxDao.getInstrumentBoxDetailById(id);
//		String instrumentBoxJson = JsonUtil.DtoTojson(instrumentBox);
//		logger.info(Constant.METHOD + Constant.RMM_GET_INSTRUMENTBOX_DETAIL_BY_ID + "," + Constant.RETURN_VALUE + instrumentBoxJson);
//		return instrumentBoxJson;
//	}
//
//	/**
//	 *
//	 * @Title: getInstrumentBoxPageList
//	 * @Description: 查询InstrumentBox列表
//	 * @param queryDtoJson 查询条件
//	 * @param request
//	 * @throws Exception String
//	 * @author liujiawei
//	 * @date 2016年1月5日 上午10:10:53
//	 */
//	@SuppressWarnings("unchecked")
//	@RequestMapping(value = Constant.RMM_GET_INSTRUMENTBOX_PAGELIST, method = RequestMethod.POST)
//	@ResponseBody
//	public String getInstrumentBoxPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson, HttpServletRequest request) throws Exception {
//		logger.info(Constant.METHOD + Constant.RMM_GET_INSTRUMENTBOX_PAGELIST + ", " + Constant.INPUT_PARAMS + "queryDtoJson:" + queryDtoJson);
//		if (StringUtils.isEmpty(queryDtoJson)) {
//			this.throwParamIsNullException(Constant.RMM_GET_INSTRUMENTBOX_PAGELIST);
//		}
//		Map<String, Object> params = new HashMap<String, Object>();
//		InstrumentBoxDto dto = (InstrumentBoxDto) JsonUtil.jsonToDto(queryDtoJson, InstrumentBoxDto.class, null);
//		Page<InstrumentBox> page = (Page<InstrumentBox>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
//		// 查询条件Dto
//		params.put("queryDto", dto);
//		// 分页page对象
//		params.put("page", page);
//		// 获取当前查询条件下的记录数
//		int rowCount = instrumentBoxDao.countInstrumentBoxByConditions(params);
//		page.setTotalCount(rowCount);
//		List<InstrumentBox> list = instrumentBoxDao.getInstrumentBoxPageListByConditions(params);
//		String listAndPageJson =  JsonUtil.DtosTojson(list) + "|" + JsonUtil.DtoTojson(page);
//		logger.info(Constant.METHOD + Constant.RMM_GET_INSTRUMENTBOX_PAGELIST + "," + Constant.RETURN_VALUE + listAndPageJson);
//		return listAndPageJson;
//	}
//
//	/**
//	 *
//	 * @Title: addInstrumentBox
//	 * @Description: 新增InstrumentBox
//	 * @param dtoJson InstrumentBox的Json对象
//	 * @param userJson
//	 * @throws Exception String
//	 * @author liujiawei
//	 * @date 2016年1月5日 上午10:13:08
//	 */
//	@RequestMapping(value = Constant.RMM_ADD_INSTRUMENTBOX, method = RequestMethod.POST)
//	@ResponseBody
//	public String addInstrumentBox(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
//		// 记录传入参数
//		logger.info(Constant.METHOD + Constant.RMM_ADD_INSTRUMENTBOX + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
//		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
//			//抛出异常并记录异常信息
//			this.throwParamIsNullException(Constant.RMM_ADD_INSTRUMENTBOX);
//		}
//		InstrumentBox instrumentBox = (InstrumentBox) JsonUtil.jsonToDto(dtoJson, InstrumentBox.class, null);
//		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
//		instrumentBox.setId(IDCreater.nextId());
//		instrumentBox.setStatus(IsAbleEnum.disable.ordinal());// 新增默认为停用状态
//		instrumentBox.setTimeVersion(new Date());
//		// 保存CentreMicrobeItem
//		int result = instrumentBoxDao.addInstrumentBox(instrumentBox);
//		// 保存日志到日志表
//		saveLog(user, Constant.OPERATION_ADD, instrumentBox, null);
//		if (result == 1) {
//			// 记录返回值
//			logger.info(Constant.METHOD + Constant.RMM_ADD_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
//			return Message.MSG_SAVE_SUCC;
//		}
//		// 记录返回值
//		logger.info(Constant.METHOD + Constant.RMM_ADD_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_FAIL);
//		return Message.MSG_SAVE_FAIL;
//	}
//
//	/**
//	 *
//	 * @Title: modifyInstrumentBox
//	 * @Description: 修改InstrumentBox
//	 * @param dtoJson InstrumentBox的Json对象
//	 * @param userJson
//	 * @throws Exception String
//	 * @author liujiawei
//	 * @date 2016年1月5日 上午10:14:04
//	 */
//	@RequestMapping(value = Constant.RMM_MODIFY_INSTRUMENTBOX, method = RequestMethod.POST)
//	@ResponseBody
//	public String modifyInstrumentBox(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
//		logger.info(Constant.METHOD + Constant.RMM_MODIFY_INSTRUMENTBOX + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
//		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
//			this.throwParamIsNullException(Constant.RMM_MODIFY_INSTRUMENTBOX);
//		}
//		InstrumentBox instrumentBox = (InstrumentBox) JsonUtil.jsonToDto(dtoJson, InstrumentBox.class, null);
//		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
//		InstrumentBox oldInstrumentBox = instrumentBoxDao.getInstrumentBoxDetailById(String.valueOf(instrumentBox.getId()));
//		if (oldInstrumentBox.getStatus() == IsAbleEnum.disable.ordinal()) {
//			// 状态为停用时方可修改
//			int result = instrumentBoxDao.modifyInstrumentBox(instrumentBox);
//			// 保存日志
//			saveLog(user, Constant.OPERATION_EDIT, instrumentBox, oldInstrumentBox);
//			if (result == 1) {
//				logger.info(Constant.METHOD + Constant.RMM_MODIFY_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
//				return Message.MSG_SAVE_SUCC;
//			}
//		}
//		logger.info(Constant.METHOD + Constant.RMM_MODIFY_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_FAIL);
//		return Message.MSG_SAVE_FAIL;
//	}
//
//	/**
//	 *
//	 * @Title: deleteInstrumentBox
//	 * @Description: 删除InstrumentBox
//	 * @param id
//	 * @param userJson
//	 * @throws Exception String
//	 * @author liujiawei
//	 * @date 2016年1月5日 上午10:14:52
//	 */
//	@RequestMapping(value = Constant.RMM_DELETE_INSTRUMENTBOX, method = RequestMethod.POST)
//	@ResponseBody
//	public String deleteInstrumentBox(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
//		logger.info(Constant.METHOD + Constant.RMM_DELETE_INSTRUMENTBOX + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "userJson:" + userJson);
//		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)) {
//			this.throwParamIsNullException(Constant.RMM_DELETE_INSTRUMENTBOX);
//		}
//		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
//		InstrumentBox instrumentBox = instrumentBoxDao.getInstrumentBoxDetailById(id);
//		if (instrumentBox.getStatus() == IsAbleEnum.disable.ordinal()) {
//			// 状态为停用时方可删除
//			int result = instrumentBoxDao.deleteInstrumentBox(id);
//			// 保存日志
//			saveLog(user, Constant.OPERATION_DETELE, instrumentBox, null);
//			if (result <= 0) {
//				logger.info(Constant.METHOD + Constant.RMM_DELETE_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_DEL_FAIL3);
//				return Message.MSG_DEL_FAIL3;
//			}
//		}
//		logger.info(Constant.METHOD + Constant.RMM_DELETE_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
//		return Message.MSG_DEL_SUCC;
//
//	}
//
//	/**
//	 *
//	 * @Title: batchDeleteInstrumentBox
//	 * @Description: 批量删除InstrumentBox
//	 * @param ids 要删除的所有InstrumentBox的id
//	 * @param userJson
//	 * @throws Exception String
//	 * @author liujiawei
//	 * @date 2016年1月5日 上午10:15:26
//	 */
//	@RequestMapping(value = Constant.RMM_BATCH_DELETE_INSTRUMENTBOX, method = RequestMethod.POST)
//	@ResponseBody
//	public String batchDeleteInstrumentBox(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
//		logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_INSTRUMENTBOX + ", " + Constant.INPUT_PARAMS + "ids:" + ids + "," + "userJson:" + userJson);
//		if (StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)) {
//			this.throwParamIsNullException(Constant.RMM_BATCH_DELETE_INSTRUMENTBOX);
//		}
//		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
//		if (StringUtils.isNotEmpty(ids)) {
//			String[] idArray = ids.split(",");
//			for (String id : idArray) {
//				if (StringUtils.isNotEmpty(id)) {
//					InstrumentBox instrumentBox = instrumentBoxDao.getInstrumentBoxDetailById(id);
//					if (instrumentBox.getStatus() == IsAbleEnum.disable.ordinal()) {
//						// 状态为停用时方可删除
//						int result = instrumentBoxDao.deleteInstrumentBox(id);
//						// 保存日志
//						saveLog(user, Constant.OPERATION_DETELE, instrumentBox, null);
//						if (result <= 0) {
//							logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_DEL_FAIL3);
//							return Message.MSG_DEL_FAIL3;
//						}
//					}
//				}
//			}
//		}
//		logger.info(Constant.METHOD + Constant.RMM_BATCH_DELETE_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
//		return Message.MSG_DEL_SUCC;
//	}
//
//	/**
//	 *
//	 * @Title: disableOrEnableInstrumentBox
//	 * @Description: 启用或禁用InstrumentBox
//	 * @param id
//	 * @param operationType
//	 * @param userJson
//	 * @throws Exception String
//	 * @author liujiawei
//	 * @date 2016年1月5日 上午10:16:36
//	 */
//	@RequestMapping(value = Constant.RMM_DISABLE_OR_ENABLE_INSTRUMENTBOX, method = RequestMethod.POST)
//	@ResponseBody
//	public String disableOrEnableInstrumentBox(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operationType", required = true) String operationType, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
//		logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_INSTRUMENTBOX + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "operationType:" + operationType + "," +"userJson:" + userJson);
//		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operationType)) {
//			this.throwParamIsNullException(Constant.RMM_DISABLE_OR_ENABLE_INSTRUMENTBOX);
//		}
//		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
//		Integer status = 0;
//		if ("Enable".equals(operationType)) {
//			status = IsAbleEnum.enable.ordinal();
//		} else if ("Disable".equals(operationType)) {
//			status = IsAbleEnum.disable.ordinal();
//		}
//		InstrumentBox oldInstrumentBox = instrumentBoxDao.getInstrumentBoxDetailById(id);
//		InstrumentBox instrumentBox = (InstrumentBox) oldInstrumentBox.clone();
//		instrumentBox.setStatus(status);
//		int result = instrumentBoxDao.modifyInstrumentBox(instrumentBox);
//		// 保存日志
//		saveLog(user, Constant.OPERATION_EDIT, instrumentBox, oldInstrumentBox);
//		if (result == 1) {
//			logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
//			return Message.MSG_SAVE_SUCC;
//		}
//		logger.info(Constant.METHOD + Constant.RMM_DISABLE_OR_ENABLE_INSTRUMENTBOX + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_FAIL);
//		return Message.MSG_SAVE_FAIL;
//	}
//
//	/**
//	 *
//	 * @Title: checkIfInstrumentBoxExist
//	 * @Description: 根据boxBarCode判断InstrumentBox是否存在
//	 * @param boxBarCode
//	 * @throws Exception String
//	 * @author liujiawei
//	 * @date 2016年1月5日 上午10:17:03
//	 */
//	@RequestMapping(value = Constant.RMM_CHECK_IF_INSTRUMENTBOX_EXIST, method = RequestMethod.POST)
//	@ResponseBody
//	public String checkIfInstrumentBoxExist(@RequestParam(value = "boxBarCode", required = true) String boxBarCode) throws Exception {
//		logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_INSTRUMENTBOX_EXIST + ", " + Constant.INPUT_PARAMS + "boxBarCode:" + boxBarCode);
//		if (StringUtils.isEmpty(boxBarCode)) {
//			this.throwParamIsNullException(Constant.RMM_CHECK_IF_INSTRUMENTBOX_EXIST);
//		}
//		int result = instrumentBoxDao.checkIfInstrumentBoxExist(boxBarCode);
//		logger.info(Constant.METHOD + Constant.RMM_CHECK_IF_INSTRUMENTBOX_EXIST + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
//		if(result>0) {
//			return "exist";
//		}
//		return "";
//	}
//
//
//	/**
//	 *
//	 * @Title: saveLog
//	 * @Description: service中保存日志公用方法
//	 * @param user 必须
//	 * @param operationType  必须,取自Constant的OPERATION_ADD，OPERATION_EDIT 或 OPERATION_DETELE
//	 * @param instrumentBox  必须
//	 * @param oldInstrumentBox  仅修改操作时传入
//	 * @return boolean
//	 * @throws Exception
//	 * @author liujiawei
//	 * @date 2015年12月30日 下午2:23:40
//	 */
//	private boolean saveLog(User user, String operationType, InstrumentBox instrumentBox, InstrumentBox oldInstrumentBox) throws Exception {
//		logger.info(Constant.METHOD + "saveLog" + ", " + Constant.INPUT_PARAMS + "user:" + JsonUtil.DtoTojson(user) + "," + "operationType:" + operationType + "," + "instrumentBox:" + JsonUtil.DtoTojson(instrumentBox) + "oldInstrumentBox:" + JsonUtil.DtoTojson(oldInstrumentBox));
//		if (StringUtils.isEmpty(operationType) || instrumentBox == null) {
//			this.throwParamIsNullException("saveLog");
//		}
//		IDictLogger op = null;
//		if (Constant.OPERATION_ADD.equals(operationType)) {
//			// 记录新增操作
//			op = DictLogsFactory.CreateAddNewLogger();
//		} else if (Constant.OPERATION_EDIT.equals(operationType)) {
//			if (oldInstrumentBox == null) {
//				this.throwParamIsNullException("saveLog");
//			}
//			// 记录修改操作
//			op = DictLogsFactory.CreateEditLogger(oldInstrumentBox);
//		} else if (Constant.OPERATION_DETELE.equals(operationType)) {
//			// 记录删除操作
//			op = DictLogsFactory.CreateDeleteLogger();
//		} else {
//			// 若非新增、修改、删除操作，抛出异常
//			Exception e = new Exception("saveLog: optionType error !");
//			logger.error(Constant.EXCEPTION + e.getMessage(), e);
//			throw e;
//		}
//		op.AddChangedObject(instrumentBox);
//		DictLogs log = op.ToDictLog(user);
//		log.setModuleName(Constant.MODULE_INSTRUMENTBOX);
//		log.setModuleId(Constant.MODULEID_INSTRUMENTBOX);
//		log.setFunctionDesc(operationType + "-" + log.getModuleName());
//		int result = this.dictLogsService.createDictLogs(log);
//		if (result > 0) {
//			logger.info(Constant.METHOD + "saveLog"+ "," + Constant.RETURN_VALUE + "true");
//			return true;
//		}
//		logger.info(Constant.METHOD + "saveLog"+ "," + Constant.RETURN_VALUE + "false");
//		return false;
//	}
}

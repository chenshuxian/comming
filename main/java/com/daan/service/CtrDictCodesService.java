package com.daan.service;

import java.lang.reflect.UndeclaredThrowableException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import com.daan.exception.FkException;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.exceptions.PersistenceException;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.daan.dao.CtrDictCodesDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrDictCodesDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
* @ClassName: CtrDictCodesService
* @Description: TODO(字典信息Service) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:52:56 
*
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRDICTCODES)
public class CtrDictCodesService extends AbstractService{
	
	@Autowired
	private CtrDictCodesDao ctrdictCodesDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	* @Title: ctrDictCodesPageList 
	* @Description: TODO(基础信息数据详细列表) 
	* @param @param queryDtoJson
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_PAGELIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,	HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(queryDtoJson)) {
			throw new Exception("ctrDictCodesPageList: params Is Null!"); 
		}
		Map<String, Object> map = new HashMap<String, Object>();
		CtrDictCodesDto dto = (CtrDictCodesDto) JsonUtil.jsonToDto(queryDtoJson, CtrDictCodesDto.class, null);
		Page<CtrDictCodes> page = (Page<CtrDictCodes>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); // 分页page对象
		Integer rowCount = this.ctrdictCodesDao.queryCountByConditions(map);// 总记录数
		page.setTotalCount(rowCount);
		List<CtrDictCodes> list = ctrdictCodesDao.queryPageListByConditions(map);
		return JsonUtil.DtosTojson(list) + "@@@" + JsonUtil.DtoTojson(page);
	}

	/**
	 * 
	* @Title: ctrDictCodesInfo 
	* @Description: TODO(查询基础信息列表信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesInfo(@RequestParam(value = "id", required = true) String id, HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(id)) {
			throw new Exception("ctrDictCodesInfo: params Is Null!"); 
		}
		CtrDictCodes entity = ctrdictCodesDao.findById(id);
		return JsonUtil.DtoTojson(entity);
	}

	/**
	 * 
	* @Title: ctrDistCodesAdd 
	* @Description: TODO(新增基础字典信息) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDistCodesAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			throw new Exception("ctrDistCodesAdd: params Is Null!");
		}
		CtrDictCodes ctrDictCode = (CtrDictCodes) JsonUtil.jsonToDto(dtoJson, CtrDictCodes.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		ctrDictCode.setId(IDCreater.nextId());
		ctrDictCode.setStatus(IsAbleEnum.disable.ordinal());// 改为枚举类 ,新增默认为停用状态
		ctrDictCode.setTimeVersion(new Date());
		ctrdictCodesDao.addCtrDictCodes(ctrDictCode);
		int typeKey = ctrDictCode.getTypeKey();
		HashMap<String, String> model = Constant.CTRDICTCODES_MODULE_MAP.get(typeKey);
		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(ctrDictCode);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(typeKey);
		log.setModuleName(model.get("module"));
		log.setFunctionDesc(Constant.OPERATION_ADD + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: ctrDictCodesEdit 
	* @Description: TODO(基础字典信息修改) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)){
			throw new Exception("ctrDictCodesEdit: params Is Null!"); 
		}
		CtrDictCodes ctrDictCode = (CtrDictCodes) JsonUtil.jsonToDto(dtoJson, CtrDictCodes.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrDictCodes oldCtrDictCode = ctrdictCodesDao.findById(String.valueOf(ctrDictCode.getId()));
		ctrdictCodesDao.modifyCtrDictCodes(ctrDictCode);
		int typeKey = ctrDictCode.getTypeKey();
		HashMap<String, String> model = Constant.CTRDICTCODES_MODULE_MAP.get(typeKey);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrDictCode);
		op.AddChangedObject(ctrDictCode);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(typeKey);
		log.setModuleName(model.get("module"));
		log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
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
	public String ctrDictCodesDisableOrEnable(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operatioType", required = true) String operatioType, 
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operatioType)){
			throw new Exception("ctrInstrumentsEnable: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// operatioType: Enable 启用 Disable 停用
		Integer status = 0;
		if ("Enable".equals(operatioType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operatioType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		CtrDictCodes oldEntity = ctrdictCodesDao.findById(id);
		CtrDictCodes ctrDictCodes =	(CtrDictCodes) oldEntity.clone();
		ctrDictCodes.setStatus(status);
		ctrdictCodesDao.modifyCtrDictCodes(ctrDictCodes);
		int typeKey = oldEntity.getTypeKey();
		HashMap<String, String> model = Constant.CTRDICTCODES_MODULE_MAP.get(typeKey);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(ctrDictCodes);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(typeKey);
		log.setModuleName(model.get("module"));
		log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	* @Title: chkNameExisted 
	* @Description: TODO(检查系统内是否有同名数据) 
	* @param @param dtoJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String chkNameExisted(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "typeKey", required = true) String typeKey, @RequestParam(value = "name", required = true) String name) throws Exception {
		if (StringUtils.isEmpty(typeKey) || StringUtils.isEmpty(name)) {
			throw new Exception("chkNameExisted: params Is Null!");
		}
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("name", name);
		params.put("typeKey", typeKey);
		List<CtrDictCodes> list = ctrdictCodesDao.findListByConditions(params);
		if(StringUtils.isEmpty(id)){
			// 新增
			for(CtrDictCodes entity : list){
				if(name.equals(entity.getName())){
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(CtrDictCodes entity : list){
				if(name.equals(entity.getName()) && !id.equals(String.valueOf(entity.getId()))){
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		return "";
	}

	/**
	 * 
	* @Title: ctrDictCodesDelete 
	* @Description: TODO(删除基础字典信息) 
	* @param @param id
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesDelete(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)){
			throw new Exception("ctrDictCodesDelete: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrDictCodes entity = ctrdictCodesDao.findById(id);
		try {
			ctrdictCodesDao.deleteById(id);
		} catch (MyBatisSystemException mse) {
			return getProcessMessage(mse.getCause());
		}

		int typeKey = entity.getTypeKey();
		HashMap<String, String> model = Constant.CTRDICTCODES_MODULE_MAP.get(typeKey);
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(typeKey);
		log.setModuleName(model.get("module"));
		log.setFunctionDesc(Constant.OPERATION_DETELE + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: ctrDictCodesDeleteBatch 
	* @Description: TODO(批量删除) 
	* @param @param ids
	* @param @param userJson
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRDICTCODES_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrDictCodesDeleteBatch(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)){
			throw new Exception("ctrDictCodesDeleteBatch: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CtrDictCodes entity = ctrdictCodesDao.findById(id);
					try {
						ctrdictCodesDao.deleteById(id);
					} catch (MyBatisSystemException mse) {
						return getProcessMessage(mse.getCause());
					}
					int typeKey = entity.getTypeKey();
					HashMap<String, String> model = Constant.CTRDICTCODES_MODULE_MAP.get(typeKey);
					// 添加日志（删除）
					IDictLogger op = DictLogsFactory.CreateDeleteLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					log.setModuleId(typeKey);
					log.setModuleName(model.get("module"));
					log.setFunctionDesc(Constant.OPERATION_DETELE + "-" + log.getModuleName());
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		return Message.MSG_SAVE_SUCC;
	}
}

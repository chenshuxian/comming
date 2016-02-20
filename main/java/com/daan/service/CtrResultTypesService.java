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

import com.daan.dao.CtrResultTypeDetailDao;
import com.daan.dao.CtrResultTypesDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrResultTypes;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrResultTypesDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;

/**
* @ClassName: CtrResultTypesService
* @Description: TODO(结果类型Service) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:52:56 
*
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRRESULTTYPES)
public class CtrResultTypesService extends AbstractService{
	
	@Autowired
	private CtrResultTypesDao ctrResultTypesDao;
	@Autowired
	private CtrResultTypeDetailDao ctrResultTypeDetailDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	* @Title: CtrResultTypesPageList 
	* @Description: TODO(结果类型数据详细列表) 
	* @param @param queryDtoJson
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_PAGELIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson, HttpServletRequest request) throws Exception {
//		if (StringUtils.isEmpty(queryDtoJson)) {
//			throw new Exception("ctrResultTypesPageList: params Is Null!"); 
//		}
		Map<String, Object> map = new HashMap<String, Object>();
		CtrResultTypesDto dto = (CtrResultTypesDto) JsonUtil.jsonToDto(queryDtoJson, CtrResultTypesDto.class, null);
//		Page<CtrResultTypes> page = (Page<CtrResultTypes>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
//		map.put("page", page); // 分页page对象
//		Integer rowCount = this.ctrResultTypesDao.queryCountByConditions(map);// 总记录数
//		page.setTotalCount(rowCount);
		List<CtrResultTypes> list = ctrResultTypesDao.queryPageListByConditions(map);
		return JsonUtil.DtosTojson(list) ;//+ "|" + JsonUtil.DtoTojson(page);
	}

	/**
	 * 
	* @Title: CtrResultTypesInfo 
	* @Description: TODO(结果类型信息列表信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesInfo(@RequestParam(value = "id", required = true) String id, HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(id)) {
			throw new Exception("ctrResultTypesInfo: params Is Null!"); 
		}
		CtrResultTypes entity = ctrResultTypesDao.findById(id);
		return JsonUtil.DtoTojson(entity);
	}
	
	/**
	 * 
	* @Title: CtrResultTypesAdd 
	* @Description: TODO(新增结果类型信息) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			throw new Exception("ctrResultTypesAdd: params Is Null!");
		}
		CtrResultTypes ctrResultTypes = (CtrResultTypes) JsonUtil.jsonToDto(dtoJson, CtrResultTypes.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		ctrResultTypes.setId(IDCreater.nextId());
		ctrResultTypes.setStatus(IsAbleEnum.disable.ordinal());// 改为枚举类 ,新增默认为停用状态
		ctrResultTypes.setTimeVersion(new Date());
		ctrResultTypesDao.addCtrResultTypes(ctrResultTypes);
		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(ctrResultTypes);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: CtrResultTypesEdit 
	* @Description: TODO(结果类型信息修改) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)){
			throw new Exception("CtrResultTypesEdit: params Is Null!"); 
		}
		CtrResultTypes ctrResultTypes = (CtrResultTypes) JsonUtil.jsonToDto(dtoJson, CtrResultTypes.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrResultTypes oldCtrDictCode = ctrResultTypesDao.findById(String.valueOf(ctrResultTypes.getId()));
		ctrResultTypesDao.modifyCtrResultTypes(ctrResultTypes);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrDictCode);
		op.AddChangedObject(ctrResultTypes);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: CtrResultTypesDisableOrEnable 
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
	public String ctrResultTypesDisableOrEnable(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operatioType", required = true) String operatioType, 
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operatioType)){
			throw new Exception("CtrResultTypesDisableOrEnable: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// operatioType: Enable 启用 Disable 停用
		Integer status = 0;
		if ("Enable".equals(operatioType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operatioType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		CtrResultTypes oldEntity = ctrResultTypesDao.findById(id);
		CtrResultTypes ctrResultTypes =	(CtrResultTypes) oldEntity.clone();
		ctrResultTypes.setStatus(status);
		ctrResultTypesDao.modifyCtrResultTypes(ctrResultTypes);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(ctrResultTypes);
		DictLogs log = op.ToDictLog(user);
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
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String chkNameExisted(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "name", required = true) String name) throws Exception {
		if (StringUtils.isEmpty(name)) {
			throw new Exception("chkNameExisted: params Is Null!");
		}
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("name", name);
		List<CtrResultTypes> list = ctrResultTypesDao.findListByConditions(params);
		if(StringUtils.isEmpty(id)){
			// 新增
			for(CtrResultTypes entity : list){
				if(name.equals(entity.getName())){
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(CtrResultTypes entity : list){
				if(name.equals(entity.getName()) && !id.equals(String.valueOf(entity.getId()))){
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		return "";
	}

	/**
	 * 
	* @Title: ctrResultTypesDelete 
	* @Description: TODO(删除结果类型信息) 
	* @param @param id
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesDelete(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)){
			throw new Exception("CtrResultTypesDelete: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrResultTypes entity = ctrResultTypesDao.findById(id);
		ctrResultTypesDao.deleteById(id);
		//删除结果描述
		ctrResultTypeDetailDao.deleteByTypeId(id);
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: CtrResultTypesDeleteBatch 
	* @Description: TODO(批量删除) 
	* @param @param ids
	* @param @param userJson
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypesDeleteBatch(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)){
			throw new Exception("CtrResultTypesDeleteBatch: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CtrResultTypes entity = ctrResultTypesDao.findById(id);
					ctrResultTypesDao.deleteById(id);
					//删除结果描述
					ctrResultTypeDetailDao.deleteByTypeId(id);
					// 添加日志（删除）
					IDictLogger op = DictLogsFactory.CreateDeleteLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		return Message.MSG_SAVE_SUCC;
	}
	

	/**
	 * 
	 * @Title: queryByStatus 
	 * @Description: TODO(根据状态查询) 
	 * @param status
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPES_QUERYBYSTATUS, method = RequestMethod.POST)
	@ResponseBody
	public String queryByStatus(@RequestParam(value = "status", required = true)String status){
		List<CtrResultTypes> list = ctrResultTypesDao.queryByStatus(status);
		return JsonUtil.DtosTojson(list);
	}
}

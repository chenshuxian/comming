package com.daan.service;

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

import com.daan.dao.CenterOrgDao;
import com.daan.dao.CtrRegionsDao;
import com.daan.domain.CenterOrg;
import com.daan.domain.Constant;
import com.daan.domain.CtrRegions;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CenterOrgQueryDto;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.OrgType;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.CodingCreater;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * @ClassName: CenterOrgService 
 * @Description: TODO(实验室或机构SERVICE) 
 * @author zhangliping
 * @date 2015年12月7日 下午2:35:54
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CENTERORG)
public class CenterOrgService extends AbstractService {
	@Autowired
	private CenterOrgDao centerOrgDao;
	@Autowired
	private CtrRegionsDao ctrRegionsDao;
	@Autowired
	private DictLogsService dictLogsService;
	/**
	 * @Title: centerOrgPageList 
	 * @Description: TODO(查询中心机构单位列表) 
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + ", " + Constant.INPUT_PARAMS + "queryDtoJson:" + queryDtoJson);
		if (StringUtils.isEmpty(queryDtoJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_PAGE_LIST);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		CenterOrgQueryDto dto = (CenterOrgQueryDto) JsonUtil.jsonToDto(queryDtoJson,CenterOrgQueryDto.class, null);
		Page<CenterOrg> page = (Page<CenterOrg>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		if (dto.getOrgTypeId() != Constant.CtrInstrBoxsConstant.MODULEID_ID) {
			if (dto.getOrgTypeId() == Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS) {
				dto.setOrgType(OrgType.medicalInstitutions.ordinal());
			} else {
				dto.setOrgType(OrgType.independentLaboratory.ordinal());
			}
		}
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); // 分页page对象
		Integer rowCount = this.centerOrgDao.queryCountByConditions(map);// 总记录数
		page.setTotalCount(rowCount);
		List<CenterOrg> list = centerOrgDao.queryPageListByConditions(map);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + "," + Constant.RETURN_VALUE + JsonUtil.DtosTojson(list) + "@@@" + JsonUtil.DtoTojson(page));
		return JsonUtil.DtosTojson(list) + "@@@" + JsonUtil.DtoTojson(page);
	}
	
	/** 
	 * @Title: centerOrgUserList 
	 * @Description: TODO(查询用户对应的中心机构) 
	 * @param queryDtoJson
	 * @param request
	 * @return String
	* @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_USER_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgUserList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_USER_LIST + ", " + Constant.INPUT_PARAMS + "queryDtoJson:" + queryDtoJson);
		if (StringUtils.isEmpty(queryDtoJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_USER_LIST);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		CenterOrgQueryDto dto = (CenterOrgQueryDto) JsonUtil.jsonToDto(queryDtoJson,CenterOrgQueryDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<CenterOrg> list = centerOrgDao.queryListByUser(map);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_USER_LIST + ", " + Constant.INPUT_PARAMS + JsonUtil.DtosTojson(list));
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * @throws Exception 
	 * @Title: centerOrgInfo 
	 * @Description: TODO(查询中心机构单位信息) 
	 * @param id
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_INFO + ", " + Constant.INPUT_PARAMS + "id:" + id);
		if (StringUtils.isEmpty(id)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_INFO);
		}
		CenterOrg entity = centerOrgDao.findById(id);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_INFO + ", " + Constant.INPUT_PARAMS + JsonUtil.DtoTojson(entity));
		return JsonUtil.DtoTojson(entity);
	}
	
	/**
	 * 
	 * @Title: centerOrgInfoRtList 
	 * @Description: TODO(查询地区名称列表) 
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_INFO_RTLIST, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgInfoRtList(HttpServletRequest request) {
		List<CtrRegions> list = ctrRegionsDao.getAllRegionNameList();
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_INFO_RTLIST + ", " + Constant.INPUT_PARAMS + JsonUtil.DtosTojson(list));
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: centerOrgDisableOrEnable 
	 * @Description: TODO(启用/停用) 
	 * @param id
	 * @param operatioType
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgDisableOrEnable(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operatioType", required = true) String operatioType, 
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "operatioType:" + operatioType + "," + "userJson:" + userJson);
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operatioType)){
			this.throwParamIsNullException(Constant.RMM_CENTERORG_DIDABLEORENABLE);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// operatioType: Enable 启用 Disable 停用
		Integer status = 0;
		if ("Enable".equals(operatioType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operatioType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		CenterOrg oldEntity = centerOrgDao.findById(id);
		CenterOrg centerOrg =	(CenterOrg) oldEntity.clone();
		centerOrg.setStatus(status);
		centerOrgDao.updateCenterOrg(centerOrg);
		int orgTypeId = oldEntity.getOrgTypeId();
		//HashMap<String, String> model = Constant.CENTERORG_MODULE_MAP.get(orgTypeId);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(centerOrg);
		DictLogs log = op.ToDictLog(user);
		if(orgTypeId == OrgType.independentLaboratory.ordinal()){
			log.setModuleId(Constant.MODULEID_CENTERORG_INDEPENDENTLABORATORY);
			log.setModuleName(Constant.MODULE_CENTERORG_INDEPENDENTLABORATORY);
		}else if(orgTypeId == OrgType.medicalInstitutions.ordinal()){
			log.setModuleId(Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS);
			log.setModuleName(Constant.MODULE_CENTERORG_MEDICALINSTITUTIONS);
		}
		//log.setModuleId(orgTypeId);
		//log.setModuleName(model.get("module"));
		log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DIDABLEORENABLE + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
		return Message.MSG_SAVE_SUCC;
	}
	
	/** 
	 * @Title: chkNameExisted 
	 * @Description: TODO(检查系统内是否有同名数据) 
	 * @param dtoJson
	 * @return String
	  * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_NAME_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String chkNameExisted(@RequestParam(value = "dtoJson", required = true) String dtoJson) throws Exception{
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson );
		if (StringUtils.isEmpty(dtoJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_NAME_IFEXISTED);
		}
		CenterOrg dto = (CenterOrg) JsonUtil.jsonToDto(dtoJson, CenterOrg.class, null);
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("name", dto.getName());
		int orgType = OrgType.all.ordinal() ; 
		//params.put("orgTypeId", String.valueOf(dto.getOrgTypeId()));
		if(dto.getOrgTypeId() == Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS){
			orgType = OrgType.medicalInstitutions.ordinal();//医疗机构
		}else {
			orgType = OrgType.independentLaboratory.ordinal();//独立实验室
		}
		params.put("orgType", String.valueOf(orgType));
		List<CenterOrg> list = centerOrgDao.findListByConditions(params);
		if(dto.getId() == null || dto.getId().longValue()==0){
			// 新增
			for(CenterOrg entity : list){
				if(dto.getName().equals(entity.getName())){
					logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + Message.MSG_CONFIRM_1 );
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(CenterOrg entity : list){
				if(dto.getName().equals(entity.getName()) && !dto.getId().equals(entity.getId())){
					logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + Message.MSG_CONFIRM_1 );
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + "" );
		return "";
	}
	
	/**
	 * 
	 * @Title: checkNacaoIdExisted 
	 * @Description: TODO(检查是否同卫生机构代码) 
	 * @param id
	 * @param orgTypeId
	 * @param nacaoId
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_NACAOID_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNacaoIdExisted(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "orgTypeId", required = true) Integer orgTypeId, @RequestParam(value = "nacaoId", required = true) String nacaoId) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "orgTypeId:" + orgTypeId + "," +"nacaoId:" + nacaoId);
		if (orgTypeId == null || StringUtils.isEmpty(nacaoId)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_NACAOID_IFEXISTED);
		}
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("nacaoId", nacaoId);
		//params.put("orgTypeId", orgTypeId);
		int orgType = OrgType.all.ordinal() ; 
		if(orgTypeId == Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS){
			orgType = OrgType.medicalInstitutions.ordinal();//医疗机构
		}else {
			orgType = OrgType.independentLaboratory.ordinal();//独立实验室
		}
		params.put("orgType", String.valueOf(orgType));
		List<CenterOrg> list = centerOrgDao.findListByConditions(params);
		if(StringUtils.isEmpty(id)){
			// 新增
			for(CenterOrg entity : list){
				if(nacaoId.equals(entity.getNacaoId())){
					logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + ", " + Constant.INPUT_PARAMS + Message.MSG_CONFIRM_2);
					return Message.MSG_CONFIRM_2;
				}
			}
		} else {
			// 修改
			for(CenterOrg entity : list){
				if(nacaoId.equals(entity.getNacaoId()) && !id.equals(String.valueOf(entity.getId()))){
					logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + ", " + Constant.INPUT_PARAMS + Message.MSG_CONFIRM_2);
					return Message.MSG_CONFIRM_2;
				}
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_NACAOID_IFEXISTED + ", " + Constant.INPUT_PARAMS + "");
		return "";
	}
	
	/**
	 * 
	 * @Title: centerOrgAdd 
	 * @Description: TODO(新增) 
	 * @param dtoJson
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_ADD + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			//抛出异常并记录异常信息
			this.throwParamIsNullException(Constant.RMM_CENTERORG_ADD);
		}
		CenterOrg dto = (CenterOrg) JsonUtil.jsonToDto(dtoJson, CenterOrg.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		long id = IDCreater.nextId();
		dto.setId(id);
		int orgTypeId = dto.getOrgTypeId();
		dto.setCodeNo(CodingCreater.createOreder(orgTypeId));
		dto.setStatus(IsAbleEnum.disable.ordinal());//改为枚举类 ,新增默认为停用状态
		int orgType = OrgType.all.ordinal();
		if(orgTypeId == Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS){
				orgType = OrgType.medicalInstitutions.ordinal();//医疗机构
		}else{
				orgType = OrgType.independentLaboratory.ordinal();//独立实验室
		}
		dto.setOrgTypeId(orgType);
		centerOrgDao.insertCenterOrg(dto);
		HashMap<String, String> model = Constant.CENTERORG_MODULE_MAP.get(orgTypeId);
		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(orgTypeId);
		log.setModuleName(model.get("module"));
//		if(orgTypeId == OrgType.independentLaboratory.ordinal()){
//			log.setModuleId(Constant.MODULEID_CENTERORG_INDEPENDENTLABORATORY);
//			log.setModuleName(Constant.MODULE_CENTERORG_INDEPENDENTLABORATORY);
//		}else if(orgTypeId == OrgType.medicalInstitutions.ordinal()){
//			log.setModuleId(Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS);
//			log.setModuleName(Constant.MODULE_CENTERORG_MEDICALINSTITUTIONS);
//		}
		log.setFunctionDesc(Constant.OPERATION_ADD + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_ADD + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: centerOrgEdit 
	 * @Description: TODO(修改) 
	 * @param dtoJson
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_EDIT + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_EDIT);
		}
		CenterOrg dto = (CenterOrg) JsonUtil.jsonToDto(dtoJson, CenterOrg.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CenterOrg entity = centerOrgDao.findById(dto.getId() + "");
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		centerOrgDao.updateCenterOrg(dto);
		int orgTypeId = dto.getOrgTypeId();
		HashMap<String, String> model = Constant.CENTERORG_MODULE_MAP.get(orgTypeId);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(orgTypeId);
		log.setModuleName(model.get("module"));
//		if(orgTypeId == OrgType.independentLaboratory.ordinal()){
//			log.setModuleId(Constant.MODULEID_CENTERORG_INDEPENDENTLABORATORY);
//			log.setModuleName(Constant.MODULE_CENTERORG_INDEPENDENTLABORATORY);
//		}else if(orgTypeId == OrgType.medicalInstitutions.ordinal()){
//			log.setModuleId(Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS);
//			log.setModuleName(Constant.MODULE_CENTERORG_MEDICALINSTITUTIONS);
//		}
		log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_EDIT + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: centerOrgDelete 
	 * @Description: TODO(删除) 
	 * @param id
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgDelete(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_DELETE);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CenterOrg entity = centerOrgDao.findById(id);
		if(entity == null){
			//数据不存在
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE + "," + Constant.RETURN_VALUE + Message.MSG_NOT_EXISTED);
			return Message.MSG_NOT_EXISTED;
		}
		//仅有状态为“停用”时，数据方可删除
//		if(entity.getStatus()==null || entity.getStatus().intValue()==IsAbleEnum.enable.ordinal()){
//			return Message.MSG_DEL_FAIL4;
//		}
		centerOrgDao.deleteById(id);
		int orgTypeId = entity.getOrgTypeId();
		//HashMap<String, String> model = Constant.CENTERORG_MODULE_MAP.get(orgTypeId);
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		//log.setModuleId(orgTypeId);
		//log.setModuleName(model.get("module"));
		if(orgTypeId == OrgType.independentLaboratory.ordinal()){
			log.setModuleId(Constant.MODULEID_CENTERORG_INDEPENDENTLABORATORY);
			log.setModuleName(Constant.MODULE_CENTERORG_INDEPENDENTLABORATORY);
		}else if(orgTypeId == OrgType.medicalInstitutions.ordinal()){
			log.setModuleId(Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS);
			log.setModuleName(Constant.MODULE_CENTERORG_MEDICALINSTITUTIONS);
		}
		log.setFunctionDesc(Constant.OPERATION_DETELE + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * 
	 * @Title: centerOrgDeleteBatch 
	 * @Description: TODO(批量删除) 
	 * @param ids
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String centerOrgDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE_BATCH + ", " + Constant.INPUT_PARAMS + "ids:" + ids + "," + "userJson:" + userJson);
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)){ 
			this.throwParamIsNullException(Constant.RMM_CENTERORG_DELETE_BATCH);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CenterOrg entity = centerOrgDao.findById(id);
					centerOrgDao.deleteById(id);
				int orgTypeId = entity.getOrgTypeId();
				//HashMap<String, String> model = Constant.CENTERORG_MODULE_MAP.get(orgTypeId);
				// 添加日志（删除）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(entity);
				DictLogs log = op.ToDictLog(user);
				//log.setModuleId(orgTypeId);
				//.setModuleName(model.get("module"));
				if(orgTypeId == OrgType.independentLaboratory.ordinal()){
					log.setModuleId(Constant.MODULEID_CENTERORG_INDEPENDENTLABORATORY);
					log.setModuleName(Constant.MODULE_CENTERORG_INDEPENDENTLABORATORY);
				}else if(orgTypeId == OrgType.medicalInstitutions.ordinal()){
					log.setModuleId(Constant.MODULEID_CENTERORG_MEDICALINSTITUTIONS);
					log.setModuleName(Constant.MODULE_CENTERORG_MEDICALINSTITUTIONS);
				}
				log.setFunctionDesc(Constant.OPERATION_DETELE + "-" + log.getModuleName());
				this.dictLogsService.createDictLogs(log);
			 }
		  }
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_DELETE_BATCH + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;
	}
}

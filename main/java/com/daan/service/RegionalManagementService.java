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

import com.daan.dao.CenterOrgRelationsDao;
import com.daan.dao.CtrRegionsDao;
import com.daan.domain.CenterOrg;
import com.daan.domain.CenterOrgRelations;
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
 * 
 * @ClassName: RegionalManagementService 
 * @Description: TODO(区域管理机构维护service) 
 * @author zhangliping
 * @date 2015年12月28日 下午2:46:12
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CENTERORG_MANAGEMENT)
public class RegionalManagementService extends AbstractService{
	@Autowired
	private CenterOrgRelationsDao centerOrgRelationsDao;
	@Autowired
	private CtrRegionsDao ctrRegionsDao;
	@Autowired
	private DictLogsService dictLogsService;
	/**
	 * 
	 * @Title: regionalManagementPageList 
	 * @Description: TODO(查询中心机构单位列表) 
	 * @param queryDtoJson
	 * @param request
	 * @return String
	  * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST + ", " + Constant.INPUT_PARAMS + "queryDtoJson:" + queryDtoJson);
		if (StringUtils.isEmpty(queryDtoJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		CenterOrgQueryDto dto = (CenterOrgQueryDto) JsonUtil.jsonToDto(queryDtoJson,CenterOrgQueryDto.class, null);
		Page<CenterOrg> page = (Page<CenterOrg>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		if(dto.getOrgTypeId() == Constant.MODULEID_CENTERORGRELATIONS){
			dto.setOrgType(OrgType.regionalManagement.ordinal());
		}
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); // 分页page对象
		Integer rowCount = centerOrgRelationsDao.queryCountByConditions(map);// 总记录数
		page.setTotalCount(rowCount);
		List<CenterOrg> list = centerOrgRelationsDao.queryPageListByConditions(map);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_PAGE_LIST + "," + Constant.RETURN_VALUE + JsonUtil.DtosTojson(list) + "@@@" + JsonUtil.DtoTojson(page));
		return JsonUtil.DtosTojson(list) + "@@@" + JsonUtil.DtoTojson(page);
	}
	
	/**
	 * 
	 * @Title: relatedList 
	 * @Description: TODO(查找关联的机构列表) 
	 * @param parentId
	 * @return String
	  * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_RELATED_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String relatedList(@RequestParam(value = "parentId", required = true) String parentId) throws Exception{
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_RELATED_LIST + ", " + Constant.INPUT_PARAMS + "parentId:" + parentId);
		if (StringUtils.isEmpty(parentId)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_RELATED_LIST);
		}
		List<CenterOrg> list = centerOrgRelationsDao.findByParentId(parentId);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_RELATED_LIST + ", " + JsonUtil.DtosTojson(list));
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: regionalManagementInfo 
	 * @Description: TODO(查询中心机构单位信息) 
	 * @param id
	 * @param request
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_INFO + ", " + Constant.INPUT_PARAMS + "id:" + id);
		if (StringUtils.isEmpty(id)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_INFO);
		}
		CenterOrg entity = centerOrgRelationsDao.findById(id);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_INFO + ", " + Constant.INPUT_PARAMS + JsonUtil.DtoTojson(entity));
		return JsonUtil.DtoTojson(entity);
	}
	
	/**
	 * 
	 * @Title: regionalManagementDisableOrEnable 
	 * @Description: TODO(启用/停用) 
	 * @param id
	 * @param operatioType
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDisableOrEnable(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operatioType", required = true) String operatioType, 
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "operatioType:" + operatioType + "," + "userJson:" + userJson);
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operatioType)){
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// operatioType: Enable 启用 Disable 停用
		Integer status = 0;
		if ("Enable".equals(operatioType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operatioType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		CenterOrg oldEntity = centerOrgRelationsDao.findById(id);
		CenterOrg centerOrg =	(CenterOrg) oldEntity.clone();
		centerOrg.setStatus(status);
		centerOrgRelationsDao.updateCenterOrg(centerOrg);
		//int orgTypeId = oldEntity.getOrgTypeId();
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(centerOrg);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
		log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
		log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: notContainList 
	 * @Description: TODO(机构未包含的项目) 
	 * @param testItemId
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_NO_CONTAIN_REGIONAL_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String noContainRegionalList(@RequestParam(value = "JsonDto", required = true) String JsonDto) throws Exception{
		logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_LIST + ", " + Constant.INPUT_PARAMS + "JsonDto:" + JsonDto );
		if (StringUtils.isEmpty(JsonDto)) {
			this.throwParamIsNullException(Constant.RMM_NO_CONTAIN_REGIONAL_LIST);
		}
		CenterOrgQueryDto dto = (CenterOrgQueryDto) JsonUtil.jsonToDto(JsonDto, CenterOrgQueryDto.class, null);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto);
		List<CenterOrg> centerOrg = centerOrgRelationsDao.queryNoContainRegionalList(map);
		logger.info(Constant.METHOD + Constant.RMM_NO_CONTAIN_REGIONAL_LIST + ", " + Constant.INPUT_PARAMS + JsonUtil.DtosTojson(centerOrg) );
		return JsonUtil.DtosTojson(centerOrg);
	}
	
	/**
	 * 
	 * @Title: regionalManagementDelItemBatch 
	 * @Description: TODO(批量删除关联的机构) 
	 * @param ids
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDelItemBatch(@RequestParam(value = "ids", required = true) String ids,@RequestParam(value = "parentId", required = true) String parentId,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH + ", " + Constant.INPUT_PARAMS + "ids:" + ids + "," + "userJson:" + userJson+ ","+ "parentId:" + parentId );
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(parentId)){
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CenterOrgQueryDto dto = new CenterOrgQueryDto();
					Map<String, Object> map = new HashMap<String, Object>();
					dto.setParentId(parentId);
					dto.setChildId(id);
					map.put("queryDto", dto);
					CenterOrg entity = centerOrgRelationsDao.findById(id);
					CenterOrg entity2 = centerOrgRelationsDao.findById(parentId);
					centerOrgRelationsDao.deleteByRelatedId(map);
					//centerOrgRelationsDao.deleteById(id);
				// 添加日志（删除）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(entity);
				DictLogs log = op.ToDictLog(user);
				log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
				log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
				if(entity2 != null){
					log.setSummary("[" + entity2.getCodeNo() + "]" + entity2.getName());
				}
				if(entity != null){
					log.setDescription("删除关联机构为：[" + entity.getCodeNo() + "]" + entity.getName());
				}
				log.setFunctionDesc(Constant.OPERATION_DETELE + "关联机构" + "-" + Constant.MODULE_CENTERORGRELATIONS);
				this.dictLogsService.createDictLogs(log);
			 }
		  }
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDeleteBatch 
	 * @Description: TODO(批量删除行政机构) 
	 * @param ids
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH + ", " + Constant.INPUT_PARAMS + "ids:" + ids + "," + "userJson:" + userJson);
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)){
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CenterOrg entity = centerOrgRelationsDao.findById(id);
					centerOrgRelationsDao.deleteByParentId(id);//删除关联关系
					centerOrgRelationsDao.deleteById(id);//删除行政机构
				// 添加日志（删除行政机构）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(entity);
				DictLogs log = op.ToDictLog(user);
				log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
				log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
				log.setFunctionDesc(Constant.OPERATION_DETELE + "-" + log.getModuleName());
				this.dictLogsService.createDictLogs(log);
			 }
		  }
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_BATCH + "," + Constant.RETURN_VALUE + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDelete 
	 * @Description: TODO(删除行政机构) 
	 * @param id
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDelete(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_DELETE);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CenterOrg entity = centerOrgRelationsDao.findById(id);
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		centerOrgRelationsDao.deleteByParentId(id);
		centerOrgRelationsDao.deleteById(id);
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
		log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
		log.setFunctionDesc(Constant.OPERATION_DETELE + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE + ", " + Constant.INPUT_PARAMS + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * 
	 * @Title: regionalManagementDelItem 
	 * @Description: TODO(删除关联的机构) 
	 * @param id
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementDelItem(@RequestParam(value = "id", required = true) String id,@RequestParam(value = "parentId", required = true) String parentId,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM + ", " + Constant.INPUT_PARAMS + "id:" + id + "," + "userJson:" + userJson+ "," + "parentId:" + parentId);
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(parentId)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CenterOrg entity = centerOrgRelationsDao.findById(id);
		CenterOrg entity2 = centerOrgRelationsDao.findById(parentId);
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		CenterOrgQueryDto dto = new CenterOrgQueryDto();
		Map<String, Object> map = new HashMap<String, Object>();
		dto.setParentId(parentId);
		dto.setChildId(id);
		map.put("queryDto", dto);
		centerOrgRelationsDao.deleteByRelatedId(map);
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
		log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
		if(entity2 != null){
			log.setSummary("[" + entity2.getCodeNo() + "]" + entity2.getName());
		}
		if(entity != null){
			log.setDescription("删除关联机构为：[" + entity.getCodeNo() + "]" + entity.getName());
		}
		log.setFunctionDesc(Constant.OPERATION_DETELE + "关联机构" + "-" + Constant.MODULE_CENTERORGRELATIONS);
		//log.setFunctionDesc(Constant.OPERATION_DETELE + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_DELETE_ITEM + ", " + Constant.INPUT_PARAMS + Message.MSG_DEL_SUCC);
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * 
	 * @Title: centerOrgInfoRtList 
	 * @Description: TODO(查询地区名称列表) 
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_REGION_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String regionList(HttpServletRequest request) {
		List<CtrRegions> list = ctrRegionsDao.getAllRegionNameList();
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_REGION_LIST + ", " + Constant.INPUT_PARAMS + JsonUtil.DtosTojson(list));
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: regionalManagementIfExisted 
	 * @Description: TODO(检查系统内是否有同名数据) 
	 * @param dtoJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementIfExisted(@RequestParam(value = "dtoJson", required = true) String dtoJson) throws Exception{
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson );
		if (StringUtils.isEmpty(dtoJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED);
		}
		CenterOrg dto = (CenterOrg) JsonUtil.jsonToDto(dtoJson, CenterOrg.class, null);
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("name", dto.getName());
		//params.put("orgTypeId", String.valueOf(dto.getOrgTypeId()));
		int orgType = OrgType.all.ordinal() ; 
		if(dto.getOrgTypeId() == Constant.MODULEID_CENTERORGRELATIONS){
			orgType = OrgType.regionalManagement.ordinal();
		}
		params.put("orgType", String.valueOf(orgType));
		List<CenterOrg> list = centerOrgRelationsDao.findListByConditions(params);
		if(dto.getId() == null || dto.getId().longValue()==0){
			// 新增
			for(CenterOrg entity : list){
				if(dto.getName().equals(entity.getName())){
					logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + Message.MSG_CONFIRM_1 );
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(CenterOrg entity : list){
				if(dto.getName().equals(entity.getName()) && !dto.getId().equals(entity.getId())){
					logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + Message.MSG_CONFIRM_1 );
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED + ", " + Constant.INPUT_PARAMS + "" );
		return "";
	}
	
	/**
	 * 
	 * @Title: regionalManagementAdd 
	 * @Description: TODO(新增) 
	 * @param dtoJson
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			//抛出异常并记录异常信息
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_ADD);
		}
		CenterOrg dto = (CenterOrg) JsonUtil.jsonToDto(dtoJson, CenterOrg.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		long id = IDCreater.nextId();
		dto.setId(id);
		int orgTypeId = dto.getOrgTypeId();
		dto.setCodeNo(CodingCreater.createOreder(orgTypeId));
		dto.setStatus(IsAbleEnum.disable.ordinal());//改为枚举类 ,新增默认为停用状态
		int orgType = OrgType.all.ordinal();
		if(orgTypeId == Constant.MODULEID_CENTERORGRELATIONS){
				orgType = OrgType.regionalManagement.ordinal();//医疗机构
		}
		dto.setOrgTypeId(orgType);
		centerOrgRelationsDao.insertCenterOrg(dto);
		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
		log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
		log.setFunctionDesc(Constant.OPERATION_ADD + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: regionalManagementEdit 
	 * @Description: TODO(修改) 
	 * @param dtoJson
	 * @param userJson
	 * @return
	 * @throws Exception String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_EDIT + ", " + Constant.INPUT_PARAMS + "dtoJson:" + dtoJson + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_EDIT);
		}
		CenterOrg dto = (CenterOrg) JsonUtil.jsonToDto(dtoJson, CenterOrg.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CenterOrg entity = centerOrgRelationsDao.findById(dto.getId() + "");
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		centerOrgRelationsDao.updateCenterOrg(dto);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
		log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
		log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
		this.dictLogsService.createDictLogs(log);
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_EDIT + ", " + Constant.INPUT_PARAMS + Message.MSG_SAVE_SUCC);
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: regionalManagementItemAddBatch
	 * @Description: 批量新增和删除项目
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String regionalManagementItemAddBatch(
			@RequestParam(value = "parentId", required = true) String parentId,
			@RequestParam(value = "addTestItemIds", required = true) String addTestItemIds,
			@RequestParam(value = "delTestItemIds", required = true) String delTestItemIds,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH + ", " + Constant.INPUT_PARAMS + "parentId:" + parentId + "," + "addTestItemIds:" + addTestItemIds+ "," + "delTestItemIds:" + delTestItemIds + "," + "userJson:" + userJson);
		if (StringUtils.isEmpty(parentId) || StringUtils.isEmpty(userJson) || (StringUtils.isEmpty(addTestItemIds) && StringUtils.isEmpty(delTestItemIds))) {
			this.throwParamIsNullException(Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH);
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CenterOrg centerOrg = centerOrgRelationsDao.findById(parentId);
		// 新增项目
		if (StringUtils.isNotEmpty(addTestItemIds)) {
			String[] idArray = addTestItemIds.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					CenterOrgRelations centerOrgRelations = new CenterOrgRelations();
					centerOrgRelations.setId(IDCreater.nextId());
					centerOrgRelations.setParentId(Long.valueOf(parentId));
					centerOrgRelations.setChildId(Long.valueOf(id));
					centerOrgRelationsDao.insertCenterOrgRelations(centerOrgRelations);
					// 添加日志（添加）
					CenterOrg entity = centerOrgRelationsDao.findById(id);
					IDictLogger op = DictLogsFactory.CreateAddNewLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
					log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
					if(centerOrg != null){
						log.setSummary("[" + centerOrg.getCodeNo() + "]" + centerOrg.getName());
					}
					if(entity != null){
						log.setDescription("[" + entity.getCodeNo() + "]" + entity.getName());
					}
					log.setFunctionDesc(Constant.OPERATION_ADD + "关联机构" + "-" + log.getModuleName());
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		
		// 删除项目
		if (StringUtils.isNotEmpty(delTestItemIds)) {
			String[] idArray = delTestItemIds.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					// 查找要删除项目
					CenterOrgQueryDto dto = new CenterOrgQueryDto();
					Map<String, Object> map = new HashMap<String, Object>();
					dto.setParentId(parentId);
					dto.setChildId(id);
					map.put("queryDto", dto);
					centerOrgRelationsDao.deleteByRelatedId(map);
					// 添加日志（删除）
					CenterOrg entity = centerOrgRelationsDao.findById(id);
					IDictLogger op = DictLogsFactory.CreateDeleteLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					log.setModuleId(Constant.MODULEID_CENTERORGRELATIONS);
					log.setModuleName(Constant.MODULE_CENTERORGRELATIONS);
					if(centerOrg != null){
						log.setSummary("[" + centerOrg.getCodeNo() + "]" + centerOrg.getName());
					}
					if(entity != null){					
						log.setDescription("[" + entity.getCodeNo() + "]" + entity.getName());
					}
					log.setFunctionDesc(Constant.OPERATION_DETELE + "关联机构" + "-" + log.getModuleName());
					this.dictLogsService.createDictLogs(log);					
				}
			}
		}
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_MANAGEMENT_ADD_BATCH + "," + Constant.RETURN_VALUE + Message.MSG_SAVE_SUCC);
		return Message.MSG_SAVE_SUCC;
	}
}

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

import com.daan.dao.InstrumentsDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrReportTemplates;
import com.daan.domain.CtrTubeTypes;
import com.daan.domain.DictLogs;
import com.daan.domain.InstrItems;
import com.daan.domain.InstrMics;
import com.daan.domain.InstrParams;
import com.daan.domain.InstrRefranges;
import com.daan.domain.Instruments;
import com.daan.domain.Message;
import com.daan.domain.Orgs;
import com.daan.domain.User;
import com.daan.dto.InstrumentsDto;
import com.daan.dto.OrgsDto;
import com.daan.enums.AppTypeEnum;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.ReportTypeEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.CodingCreater;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * @ClassName: InstrumentsService
 * @Description: TODO(客户仪器信息SERVICE)
 * @author xiaobing
 * @date 2015年12月10日 下午20:06:01
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_INSTRUMENTS)
public class InstrumentsService extends AbstractService {
	
	@Autowired
	private InstrumentsDao instrumentsDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: InstrumentsList
	 * @Description: 查询客户仪器列表
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		InstrumentsDto dto = (InstrumentsDto) JsonUtil.jsonToDto(queryDtoJson,
				InstrumentsDto.class, null);
		Page<Instruments> page = (Page<Instruments>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); 	  // 分页page对象

		Integer rowCount = this.instrumentsDao.queryCountByInstruments(map);// 总记录数
		page.setTotalCount(rowCount);
		List<Instruments> list = instrumentsDao.queryPageListByConditions(map);
		
		return JsonUtil.DtosTojson(list) + "|" + JsonUtil.DtoTojson(page);
	}

	/**
	 * 
	 * @Title: InstrumentsInfo
	 * @Description: 查询客户仪器信息信息
	 * @param id
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) {
		Instruments entity = instrumentsDao.findById(id);
		
		return JsonUtil.DtoTojson(entity);
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsParamsInfo
	 * @Description: 查询中心仪器通讯参数信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_PARAMS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsParamsInfo(@RequestParam(value = "instrumentId", required = true) String instrumentId,
			HttpServletRequest request) {
		InstrParams entity = instrumentsDao.findParamsById(instrumentId);
		return JsonUtil.DtoTojson(entity);
	}

	/**
	 * 
	 * @Title: instrumentsInfoStList
	 * @Description: 查询报告模板列表
	 * @param typeKey
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INFO_STLIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInfoStList(@RequestParam(value = "typeKey", required = true) String typeKey, HttpServletRequest request) {
		List<CtrReportTemplates> list = instrumentsDao.getAllReportTemplates(typeKey);
		
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: instrumentsInstrItemsList
	 * @Description: 查询仪器对应项目LIST
	 * @param instrumentId
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INSTRITEMS_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInstrItemsList(@RequestParam(value = "instrumentId", required = true) String instrumentId, HttpServletRequest request) {
		List<InstrItems> list = instrumentsDao.getInstrItemsListById(instrumentId);
		
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: instrumentsInstrMicsList
	 * @Description: 查询仪器对应细菌或抗生素LIST
	 * @param instrumentId
	 * @param itemTypeId
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INSTRMICS_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInstrMicsList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson
			, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		InstrumentsDto dto = (InstrumentsDto) JsonUtil.jsonToDto(queryDtoJson,
				InstrumentsDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<InstrItems> list = instrumentsDao.getInstrMicsListById(map);
		
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: instrumentsInfoBoList
	 * @Description: 查询盒子条码列表
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INFO_BOLIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInfoBoList(HttpServletRequest request) {
		List<InstrParams> list = instrumentsDao.getAllInstrBoxsList();
		
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: instrumentsInfoInList
	 * @Description: 查询虚拟仪器列表
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INFO_INLIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInfoInList(HttpServletRequest request) {
		List<Instruments> list = instrumentsDao.getAllInstrumentsList();
		
		return JsonUtil.DtosTojson(list);
	}

	/**
	 * 检查系统内是否有同名数据
	 * 
	 * @param dtoJson
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsIfExisted(@RequestParam(value = "dtoJson", required = true) String dtoJson){
		Instruments dto = (Instruments) JsonUtil.jsonToDto(dtoJson, Instruments.class, null);
		
		List<Instruments> list = instrumentsDao.findByName(dto.getName());
		if(dto.getId() == null || dto.getId().longValue()==0){
			// 新增
			for(Instruments entity : list){
				if(dto.getName().equals(entity.getName())){
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(Instruments entity : list){
				if(dto.getName().equals(entity.getName()) && !dto.getId().equals(entity.getId())){
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		
		return "";
	}
	
	/**
	 * 
	 * @Title: instrumentsAdd
	 * @Description: 新增客户仪器信息
	 * @param dtoJson
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Instruments dto = (Instruments) JsonUtil.jsonToDto(dtoJson, Instruments.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		// 新增客户仪器信息
		Long id = IDCreater.nextId();
		dto.setId(id);
		dto.setAppId(Long.parseLong(AppTypeEnum.kmAppId.getIndex().toString())); // 系统id(确认写死为康明系统)
		dto.setCodeNo(CodingCreater.createOreder(Constant.CODE_INSTRUMENTS));
		dto.setStatus(IsAbleEnum.disable.ordinal()); // 新增状态默认为停用
		instrumentsDao.insertInstruments(dto);
		
		// 新增仪器通讯参数信息
		InstrParams instrParams = new InstrParams();
		instrParams.setInstrumentId(id); // 仪器ID
		instrParams.setAppId(dto.getAppId()); 
		instrParams.setOrgId(dto.getOrgId());
		instrumentsDao.insertInstrParams(instrParams);

		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: instrumentsCopy
	 * @Description: 批量复制添加
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_COPY, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCopy(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "orgsId", required = true) String orgsId,
			@RequestParam(value = "displayOrder", required = true) Integer displayOrder,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		if (StringUtils.isNotEmpty(ids)) {
			
			Map<String, String> map = new HashMap<String, String>();
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					map.put(id, id);
				}
			}
					
			// 依次复制新增
			for (String key : map.keySet()) {
				Instruments instruments = instrumentsDao.findById(map.get(key));
				if(instruments == null){
					// 数据不存在
					return Message.MSG_NOT_EXISTED;
				}
				
				// 1、新增客户仪器信息
				Long copyId = IDCreater.nextId();
				Long rptTemplate = Long.parseLong(ReportTypeEnum.reportDefault.getIndex().toString());
				instruments.setId(copyId);
				instruments.setOrgId(Long.parseLong(orgsId));
				instruments.setStatus(IsAbleEnum.disable.ordinal());
				instruments.setDisplayOrder(displayOrder);
				instruments.setCodeNo(CodingCreater.createOreder(Constant.CODE_INSTRUMENTS));
				instruments.setReportHeader(null);
				instruments.setRptTemplateId(rptTemplate);  
				instruments.setRptTemplate2Id(rptTemplate);
				instrumentsDao.insertInstruments(instruments);
				
				// 2、新增通讯参数信息
				InstrParams instrParams = instrumentsDao.findParamsById(map.get(key));
				if(instrParams != null){ 	
					instrParams.setInstrumentId(copyId);
					instrParams.setOrgId(Long.parseLong(orgsId));
					instrumentsDao.insertInstrAllParams(instrParams);
				}
				
				// 3、新增项目关系信息
				List<InstrItems> itemsList = instrumentsDao.findInstrItemsById(map.get(key));
				if(itemsList != null && itemsList.size()>0){
					for (InstrItems instrItems : itemsList) {
						instrItems.setId(IDCreater.nextId());
						instrItems.setInstrumentId(copyId);
						instrItems.setOrgId(Long.parseLong(orgsId));
						instrumentsDao.insertInstrAllItems(instrItems);
					}
				}
				
				// 4、新增细菌，抗生素信息
				List<InstrMics> micsList = instrumentsDao.findInstrMicsById(map.get(key));
				if(micsList != null && micsList.size()>0){
					for (InstrMics instrMics : micsList) {
						instrMics.setId(IDCreater.nextId());
						instrMics.setInstrumentId(copyId);
						instrMics.setOrgId(Long.parseLong(orgsId));
						instrumentsDao.insertInstrAllMics(instrMics);
					}
				}
				
				// 5、新增参考范围信息
				List<InstrRefranges> refrangesList = instrumentsDao.findInstrRefrangesById(map.get(key));
				if(refrangesList != null && refrangesList.size()>0){
					for (InstrRefranges instrRefranges : refrangesList) {
						instrRefranges.setId(IDCreater.nextId());
						instrRefranges.setInstrumentId(copyId);
						instrRefranges.setOrgId(Long.parseLong(orgsId));
						instrumentsDao.insertIRefranges(instrRefranges);
					}
				}
				
				// 添加日志（添加）
				IDictLogger op = DictLogsFactory.CreateAddNewLogger();
				op.AddChangedObject(instruments);
				DictLogs log = op.ToDictLog(user);
				this.dictLogsService.createDictLogs(log);
			}
		}
		
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: instrumentsEdit
	 * @Description: 修改客户仪器
	 * @param dtoJson
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Instruments dto = (Instruments) JsonUtil.jsonToDto(dtoJson, Instruments.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		Instruments entity = instrumentsDao.findById(dto.getId() + "");
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		instrumentsDao.updateInstruments(dto);

		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsEdit
	 * @Description: 修改中心仪器
	 * @param
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_PRAMS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsParamsEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		InstrParams dto = (InstrParams) JsonUtil.jsonToDto(dtoJson, InstrParams.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		InstrParams entity = instrumentsDao.findParamsById(dto.getInstrumentId() + "");
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		instrumentsDao.updateInstrumentsParams(dto);

		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: instrumentsEnable
	 * @Description: 客户仪器信息 --启用
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_ENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsEnable(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		Instruments entity = instrumentsDao.findById(id);
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		instrumentsDao.enableById(id);

		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		entity.setStatus(IsAbleEnum.enable.ordinal());
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);

		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	* @Title: ctrTubeTypesDisableOrEnable 
	* @Description: TODO(试管类型-启用/停用) 
	* @param @param id
	* @param @param operatioType
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String InstrumentsDisableOrEnable(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operatioType", required = true) String operatioType, 
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operatioType)){
			throw new Exception("InstrumentsDisableOrEnable: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// operatioType: Enable 启用 Disable 停用
		Integer status = 0;
		if ("Enable".equals(operatioType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operatioType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		Instruments oldEntity = instrumentsDao.findById(id);
		Instruments Instruments = (Instruments)oldEntity.clone();
		Instruments.setStatus(status);
		instrumentsDao.modifyInstruments(Instruments);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(Instruments);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: instrumentsDisable
	 * @Description: 客户仪器信息 --停用
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_DISABLE, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsDisable(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		Instruments entity = instrumentsDao.findById(id);
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		instrumentsDao.disableById(id);

		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		entity.setStatus(IsAbleEnum.disable.ordinal());
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: instrumentsDelete
	 * @Description: 删除客户仪器信息
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsDelete(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		Instruments entity = instrumentsDao.findById(id);
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}

		// 仅有状态为“停用”时，数据方可删除
//		if(entity.getStatus()==null || entity.getStatus().intValue() == IsAbleEnum.enable.ordinal()){
//			return Message.MSG_DEL_FAIL4;
//		}
		
		// 1、删仪客户仪器信息
		instrumentsDao.deleteById(id);
				
		// 2、删除通讯参数信息
		instrumentsDao.deleteParamsById(id);
		
		// 3、删除仪器关联项目
		instrumentsDao.deleteInstrItemsById(id);
		
		// 4、删除微生物的细菌、抗生素仪器通道信息
		instrumentsDao.deleteInstrMicsById(id);
		
		// 5、删除本地仪器常规项目参考值对应信息
		instrumentsDao.delInstrRefrangesById(id);
		
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_DEL_SUCC;
	}

	/**
	 * 
	 * @Title: instrumentsDeleteBatch
	 * @Description: 批量删除客户仪器信息
	 * @param ids
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
			User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			
			// 检查状态，是否可删除
			Map<String, Instruments> map = new HashMap<String, Instruments>();
			String[] idArray = ids.split(",");
			int i = 0;
			for (String id : idArray) {
				i++;
				if (StringUtils.isNotBlank(id)) {
					Instruments entity = instrumentsDao.findById(id);
					
					if(entity != null){
						// 仅有状态为“停用”时，数据方可删除
//						if(entity.getStatus()==null || entity.getStatus().intValue() == IsAbleEnum.enable.ordinal()){
//							return Message.MSG_DEL_FAIL5.replace("#", i+"");
//						}
						map.put(id, entity);
					}
				}
			}
			
			// 依次删除
			for (String key : map.keySet()) {
				// 1、删除仪器参数信息
				instrumentsDao.deleteParamsById(map.get(key).getId()+"");
				
				// 2、先删仪器信息
				instrumentsDao.deleteById(map.get(key).getId()+"");
				
				// 3、删除仪器关联项目
				instrumentsDao.deleteInstrItemsById(map.get(key).getId()+"");
				
				// 4、删除微生物的细菌、抗生素仪器通道信息
				instrumentsDao.deleteInstrMicsById(map.get(key).getId()+"");
				
				// 5、删除本地仪器常规项目参考值对应信息
				instrumentsDao.delInstrRefrangesById(map.get(key).getId()+"");
				
				// 添加日志（删除）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(map.get(key));
				DictLogs log = op.ToDictLog(user);
				this.dictLogsService.createDictLogs(log);
			}
		}
		
		return Message.MSG_DEL_SUCC;
	}
	
	/* START 机构单位  */
	/**
	 * 
	 * @Title: centerOrgPageList 
	 * @Description: TODO(查询机构单位列表) 
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_IORGS_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String iorgsPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		OrgsDto dto = (OrgsDto) JsonUtil.jsonToDto(queryDtoJson, OrgsDto.class, null);
		Page<Orgs> page = (Page<Orgs>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page);    // 分页page对象

		Integer rowCount = instrumentsDao.queryCountByIOrgs(map); // 总记录数
		page.setTotalCount(rowCount);
		List<Orgs> list = instrumentsDao.queryListByIOrgs(map);
		return JsonUtil.DtosTojson(list) + "|" + JsonUtil.DtoTojson(page);
	}
	/* END 机构单位  */
	
}

package com.daan.service;

import java.util.ArrayList;
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

import com.daan.dao.InstrMicsDao;
import com.daan.dao.InstrumentsItemDao;
import com.daan.dao.LocDictCodesDao;
import com.daan.dao.LocalInstrumentsDao;
import com.daan.dao.MicsItemsDao;
import com.daan.dao.TestItemsDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrInstrumentsItems;
import com.daan.domain.CtrInstrumentsMics;
import com.daan.domain.DictLogs;
import com.daan.domain.InstrBoxs;
import com.daan.domain.InstrParams;
import com.daan.domain.Instruments;
import com.daan.domain.InstrumentsItems;
import com.daan.domain.InstrumentsMics;
import com.daan.domain.LocDictCodes;
import com.daan.domain.Message;
import com.daan.domain.MicsItems;
import com.daan.domain.ReportTemplates;
import com.daan.domain.TestItems;
import com.daan.domain.User;
import com.daan.enums.StatusEnum;
import com.daan.enums.TypeKeyEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.DateUtil;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.DataGrid;

/**
 * @ClassName: InstrumentsService
 * @Description: 仪器SERVICE
 * @author zhoujie
 * @date 2016年01月12日
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_LOCAL_INSTRUMENTS)
public class LocalInstrumentsService extends AbstractService {

	@Autowired
	private LocalInstrumentsDao instrumentsDao;
	@Autowired
	private LocDictCodesDao locdictCodesDao;
	@Autowired
	private TestItemsDao testItemsDao;
	@Autowired
	private MicsItemsDao micsItemsDao;
	@Autowired
	private InstrumentsItemDao instrumentsItemDao;
	@Autowired
	private InstrMicsDao instrMicsDao;
	
	@Autowired
	private DictLogsService dictLogsService;
	
	/**
	 * 
	 * @Title: instrumentsPageList
	 * @Description: 查询仪器列表
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsPageList(@RequestParam(value = "dataGrid", required = true) String dataGrid,
			HttpServletRequest request) {
		Map<String, Object> mapParam = new HashMap<String, Object>();
		DataGrid<Instruments> dGrid = (DataGrid<Instruments>) JsonUtil.jsonToDto(dataGrid, DataGrid.class, null);
		mapParam.put("queryDto", dGrid); // 设置查询参数
		Integer rowCount = instrumentsDao.queryCountByConditions(mapParam); // 获取总记录数
		List<Instruments> list = instrumentsDao.queryPageListByConditions(mapParam); // 获取分页列表数据
		dGrid.setTotal(rowCount);
		dGrid.setRows(list);
		return JsonUtil.objectToJson(dGrid);
	}
	
	/**
	 * 
	 * @Title: instrumentsRtList
	 * @Description: 查询报告模板列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_RT_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsRtList(@RequestParam(value = "status", required = true) String status, 
				@RequestParam(value = "userJson", required = true) String userJson, HttpServletRequest request) {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Map<String, String> params = new HashMap<String, String>();
		params.put("status", status);
		if(user != null){
			params.put("orgId", user.getOrgId()+"");
			params.put("appId", user.getSysId()+"");
		}
		List<ReportTemplates> list = instrumentsDao.getRtListByConditions(params);
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: instrumentsBbList
	 * @Description: 查询盒子条码列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_BB_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsBbList(@RequestParam(value = "status", required = true) String status, 
				@RequestParam(value = "userJson", required = true) String userJson, HttpServletRequest request) {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Map<String, String> params = new HashMap<String, String>();
		params.put("status", status);
		if(user != null){
			params.put("orgId", user.getOrgId()+"");
			params.put("appId", user.getSysId()+"");
		}
		List<InstrBoxs> list = instrumentsDao.getBbListByConditions(params);
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: instrumentsViList
	 * @Description: 查询虚拟仪器列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_VI_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsViList(@RequestParam(value = "status", required = true) String status, 
				@RequestParam(value = "userJson", required = true) String userJson, HttpServletRequest request) {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Map<String, String> params = new HashMap<String, String>();
		params.put("status", status);
		if(user != null){
			params.put("orgId", user.getOrgId()+"");
			params.put("appId", user.getSysId()+"");
		}
		List<Instruments> list = instrumentsDao.getViListByConditions(params);
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: instrumentsInfo
	 * @Description: 查询仪器信息
	 * @param id
	 * @param request
	 * @return jsonString
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) {
		Instruments entity = instrumentsDao.findById(id);
		return JsonUtil.repairJson(JsonUtil.DtoTojson(entity), entity);
	}
	
	/**
	 * 检查系统内是否有同名数据
	 * 
	 * @param dtoJson
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsIfExisted(@RequestParam(value = "dtoJson", required = true) String dtoJson, 
				@RequestParam(value = "userJson", required = true) String userJson){
		Instruments dto = (Instruments) JsonUtil.jsonToDto(dtoJson, Instruments.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("name", dto.getName());
		if(user != null){
			params.put("orgId", user.getOrgId()+"");
			params.put("appId", user.getSysId()+"");
		}
		
		List<Instruments> list = instrumentsDao.queryListByConditions(params);
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
	 * @Title: userAdd
	 * @Description: 新增用户
	 * @param dtoJson
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String instrumrentsAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Instruments instruments = (Instruments) JsonUtil.jsonToDto(dtoJson, Instruments.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		instruments.setId(IDCreater.nextId());
		instruments.setStatus(StatusEnum.disabled.ordinal()); // 新增状态默认为不可用
		if(instruments.getTypeId()==null){
			instruments.setTypeId(0);//默认常规
		}
		if(StringUtils.isNotEmpty(instruments.getPurchaseDateString())){
			instruments.setPurchaseDate(DateUtil.getDate(instruments.getPurchaseDateString()));
		}
		if(StringUtils.isNotEmpty(instruments.getInstallDateString())){
			instruments.setInstallDate(DateUtil.getDate(instruments.getInstallDateString()));
		}
		
		if(user != null){
			instruments.setAppId(user.getSysId());
//			instruments.setOrgId(user.getOrgId());
		}
		//新增仪器
		instrumentsDao.insertInstruments(instruments);
		
		InstrParams instrParams = new InstrParams();
		instrParams.setInstrumentId(instruments.getId());
		instrParams.setTransferMode(0);//默认无通信
		if(user != null){
			instrParams.setAppId(user.getSysId());
			instrParams.setOrgId(user.getOrgId());
		}
		//新增仪器通讯参数
		instrumentsDao.insertInstrParams(instrParams);
		
		// 添加仪器日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(instruments);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		// 添加仪器参数日志（添加）
		IDictLogger op2 = DictLogsFactory.CreateAddNewLogger();
		op2.AddChangedObject(instrParams);
		DictLogs log2 = op2.ToDictLog(user);
		this.dictLogsService.createDictLogs(log2);
		
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: instrumentsEdit
	 * 
	 * @Description: 编辑仪器
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
		Instruments old = instrumentsDao.findById(dto.getId() + "");
		if(old == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		if(StringUtils.isNotEmpty(dto.getPurchaseDateString())){
			dto.setPurchaseDate(DateUtil.getDate(dto.getPurchaseDateString()));
		}
		if(StringUtils.isNotEmpty(dto.getInstallDateString())){
			dto.setInstallDate(DateUtil.getDate(dto.getInstallDateString()));
		}
		if(dto.getTypeId()==null){
			dto.setTypeId(0);//默认常规
		}
		instrumentsDao.updateInstruments(dto);
		
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(old);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC_INFO;
	}
	
	/**
	 * 
	 * @Title: instrumentsStatusUpdate
	 * @Description: 启用或者停用状态
	 * @param id
	 * @param status
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_UPDATESTATUS, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsStatusUpdate(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "status", required = true) Integer status,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Map<String, String> mapParam = new HashMap<String, String>();
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Instruments entity = instrumentsDao.findById(id); // 旧数据
		Instruments newEntity = null; // 新数据
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		mapParam.put("id", id);
		mapParam.put("status", status+"");
		instrumentsDao.updateStatus(mapParam);
		newEntity = (Instruments) entity;
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		newEntity.setStatus(status);
		op.AddChangedObject(newEntity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return status.intValue()==StatusEnum.enable.getIndex().intValue() ? Message.MSG_DISABLED_SUCC:Message.MSG_ENABLE_SUCC;
	}
	
	/**
	 * 
	 * @Title: instrumentsDelete
	 * @Description: 删除/选中删除仪器信息
	 * @param ids
	 * @param userJson
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsDelete(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if(StringUtil.isEmpty(ids)){
			return Message.MSG_DEL_FAIL3;
		}
		
		// 检查状态，是否可删除
		Map<String, Instruments> map = new HashMap<String, Instruments>();
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					Instruments entity = instrumentsDao.findById(id);
					if(entity == null){
						// 数据不存在
						return Message.MSG_NOT_EXISTED;
					} else {
						map.put(id, entity);
					}
				}
			}
			
			// 依次删除
			for (String key : map.keySet()) {
				// 删除通讯参数
				instrumentsDao.deleteParamsById(map.get(key).getId()+"");	
				
				// 删除仪器
				instrumentsDao.deleteById(map.get(key).getId()+"");	
				
				// 添加日志（删除通讯参数）TODO
//				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
//				op.AddChangedObject(map.get(key));
//				DictLogs log = op.ToDictLog(user);
//				this.dictLogsService.createDictLogs(log);
				
				// 添加日志（删除）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(map.get(key));
				DictLogs log = op.ToDictLog(user);
				this.dictLogsService.createDictLogs(log);
			}
		}
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * 
	 * @Title: instrParamsInfo
	 * @Description: 仪器通讯参数明细查询
	 * @param id
	 * @param request
	 * @return jsonString
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_PARAMS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String instrParamsInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) {
		InstrParams entity = instrumentsDao.findParamsById(id);
		return JsonUtil.repairJson(JsonUtil.DtoTojson(entity), entity);
	}
	
	/**
	 * 
	 * @Title: instrParamsEdit
	 * 
	 * @Description: 编辑仪器通讯参数
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_PARAMS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String instrParamsEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		InstrParams dto = (InstrParams) JsonUtil.jsonToDto(dtoJson, InstrParams.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		InstrParams old = instrumentsDao.findParamsById(dto.getInstrumentId() + "");
		if(old == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		instrumentsDao.updateInstrParams(dto);
		
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(old);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC_INFO;
	}
	
	/**
	 * 
	 * @Title: instrumentsCtrPageList
	 * @Description: 查询中心仪器列表
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCtrPageList(@RequestParam(value = "dataGrid", required = true) String dataGrid,
			HttpServletRequest request) {
		Map<String, Object> mapParam = new HashMap<String, Object>();
		DataGrid<CtrInstruments> dGrid = (DataGrid<CtrInstruments>) JsonUtil.jsonToDto(dataGrid, DataGrid.class, null);
		mapParam.put("queryDto", dGrid); // 设置查询参数
		Integer rowCount = instrumentsDao.queryCtrCountByConditions(mapParam); // 获取总记录数
		List<CtrInstruments> list = instrumentsDao.queryCtrPageListByConditions(mapParam); // 获取分页列表数据
		dGrid.setTotal(rowCount);
		dGrid.setRows(list);
		return JsonUtil.objectToJson(dGrid);
	}
	
	/**
	 * 
	 * @Title: instrumentsCtrItemList
	 * @Description: 查询中心仪器项目列表
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_ITEM_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCtrItemList(@RequestParam(value = "dataGrid", required = true) String dataGrid,
			HttpServletRequest request) {
		DataGrid<CtrInstrumentsItems> dGrid = (DataGrid<CtrInstrumentsItems>) JsonUtil.jsonToDto(dataGrid, DataGrid.class, null);
		List<CtrInstrumentsItems> list = instrumentsDao.queryCtrItemListById(dGrid.getSearchStr()); // 获取分页列表数据
		dGrid.setRows(list);
		return JsonUtil.objectToJson(dGrid);
	}
	
	/**
	 * 
	 * @Title: instrumentsCtrGermList
	 * @Description: 查询中心仪器细菌列表
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_GERM_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCtrGermList(@RequestParam(value = "dataGrid", required = true) String dataGrid,
			HttpServletRequest request) {
		DataGrid<CtrInstrumentsMics> dGrid = (DataGrid<CtrInstrumentsMics>) JsonUtil.jsonToDto(dataGrid, DataGrid.class, null);
		List<CtrInstrumentsMics> list = instrumentsDao.queryCtrMicsListById(dGrid.getSearchStr()); // 获取分页列表数据
		
		List<CtrInstrumentsMics> retList = new ArrayList<CtrInstrumentsMics>();
		for(CtrInstrumentsMics item : list){
			if(item.getItemTypeId().intValue() == 1){ // 细菌
				retList.add(item);
			}
		}
		dGrid.setRows(retList);
		return JsonUtil.objectToJson(dGrid);
	}
	
	/**
	 * 
	 * @Title: instrumentsCtrAntiList
	 * @Description: 查询中心仪器抗生素列表
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_ANTI_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCtrAntiList(@RequestParam(value = "dataGrid", required = true) String dataGrid,
			HttpServletRequest request) {
		DataGrid<CtrInstrumentsMics> dGrid = (DataGrid<CtrInstrumentsMics>) JsonUtil.jsonToDto(dataGrid, DataGrid.class, null);
		List<CtrInstrumentsMics> list = instrumentsDao.queryCtrMicsListById(dGrid.getSearchStr()); // 获取分页列表数据

		List<CtrInstrumentsMics> retList = new ArrayList<CtrInstrumentsMics>();
		for(CtrInstrumentsMics item : list){
			if(item.getItemTypeId().intValue() == 2){ // 抗生素
				retList.add(item);
			}
		}
		dGrid.setRows(retList);
		return JsonUtil.objectToJson(dGrid);
	}
	
	/**
	 * 
	 * @Title: instrumentsCtrAdd
	 * @Description: 从仪器库添加
	 * @param ids
	 * @param userJson
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCtrAdd(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson,String orgId) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if(user == null){
			return Message.MSG_PARAMS_NULL;
		}
		
		
		
		// 检查状态，是否可删除
		if (StringUtils.isNotEmpty(ids)) {
			
			/*
			 * 1. 准备活动：将本机构内所有需要的字典数据查询出来
			 * 
			 * 	  Key:code, Value:id
			 */
			// 1.1 标本类型
			Map<String, Long> sampleTypeMap = new HashMap<String, Long>();
			HashMap<String, String> sampleTypeParams = new HashMap<String, String>();
			sampleTypeParams.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());
			sampleTypeParams.put("orgId", orgId);
			sampleTypeParams.put("appId", user.getSysId()+"");
			List<LocDictCodes> sampleTypeList = locdictCodesDao.findListByConditions(sampleTypeParams);
			for(LocDictCodes item : sampleTypeList){
				sampleTypeMap.put(item.getCodeNo(), item.getId());
			}
			
			// 1.2 检验方法
			Map<String, Long> testMethodMap = new HashMap<String, Long>();
			HashMap<String, String> testMethodParams = new HashMap<String, String>();
			testMethodParams.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());
			testMethodParams.put("orgId", orgId);
			testMethodParams.put("appId", user.getSysId()+"");
			List<LocDictCodes> testMethodList = locdictCodesDao.findListByConditions(testMethodParams);
			for(LocDictCodes item : testMethodList){
				testMethodMap.put(item.getCodeNo(), item.getId());
			}
			
			// 1.3 检验项目
			Map<String, Long> testItemMap = new HashMap<String, Long>();
			HashMap<String, String> testItemParams = new HashMap<String, String>();
			testItemParams.put("orgId", orgId);
			testItemParams.put("appId", user.getSysId()+"");
			List<TestItems> testItemList = testItemsDao.queryTestItemsList(testItemParams);
			for(TestItems item : testItemList){
				testItemMap.put(item.getCodeNo(), item.getId());
			}
			
			// 1.3 微生物
			Map<String, Long> micsItemMap = new HashMap<String, Long>();
			HashMap<String, String> micsItemParams = new HashMap<String, String>();
			micsItemParams.put("orgId", orgId);
			micsItemParams.put("appId", user.getSysId()+"");
			List<MicsItems> micsItemList = micsItemsDao.queryMicsItemsList(micsItemParams);
			for(MicsItems item : micsItemList){
				micsItemMap.put(item.getCodeNo(), item.getId());
			}
			
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					
					// 查找中心仪器Object
					CtrInstruments ctrInstruments = instrumentsDao.findCtrById(id);
				
					/*
					 * 2. 复制中心仪器报告模板
					 */
					long locReportTemplatesId = IDCreater.nextId();
					Map<String, String> reportTemplatesParams = new HashMap<String, String>();
					reportTemplatesParams.put("locId", locReportTemplatesId+"");
					reportTemplatesParams.put("orgId", orgId);
					reportTemplatesParams.put("appId", user.getSysId()+"");
					reportTemplatesParams.put("ctrId", ctrInstruments.getReportTemplateId()+"");
					instrumentsDao.copy2LocReportTemplates(reportTemplatesParams);
					
					/*
					 * 3. 复制中心仪器
					 */
					// 增加仪器前，检查仪器的标本类型在本地字典库是否存在
					if(!sampleTypeMap.containsKey(ctrInstruments.getSampleTypeCodeNo())){
						// 检验方法不存在，新增检验方法字典
						long locDictCodesId = IDCreater.nextId();
						Map<String, String> dictCodesParams = new HashMap<String, String>();
						dictCodesParams.put("locId", locDictCodesId+"");
						dictCodesParams.put("ctrId", ctrInstruments.getSampleTypeId()+"");
						dictCodesParams.put("orgId", orgId);
						dictCodesParams.put("appId", user.getSysId()+"");
						instrumentsDao.copy2LocDictCodes(dictCodesParams);
						sampleTypeMap.put(ctrInstruments.getSampleTypeCodeNo(), locDictCodesId);
					}
					
					long locInstrumentsId = IDCreater.nextId();
					Map<String, String> instrumentParams = new HashMap<String, String>();
					instrumentParams.put("locId", locInstrumentsId+"");
					instrumentParams.put("ctrId", id);
					instrumentParams.put("orgId", orgId);
					instrumentParams.put("appId", user.getSysId()+"");
					instrumentParams.put("sampleTypeId", sampleTypeMap.get(ctrInstruments.getSampleTypeCodeNo())+"");
					instrumentParams.put("rptTemplateId", locReportTemplatesId+"");
					instrumentsDao.copy2LocInstruments(instrumentParams);
					
					/*
					 * 4. 复制中心仪器通讯参数
					 */
					instrumentsDao.copy2LocInstrParams(instrumentParams);

					/*
					 * 5. 复制仪器项目
					 */
					// 查找中心仪器项目
					List<CtrInstrumentsItems> ctrInstrumentsItemsList = instrumentsDao.queryCtrItemListById(id);
					for(CtrInstrumentsItems item : ctrInstrumentsItemsList){
						// 检查项目是否在本地存在
						if(!testItemMap.containsKey(item.getItemCodeNo())){
							// 项目不存在，则先增加项目
							// 增加项目前，检查项目的检验方法和标本类型在本地字典库是否存在
							
							if(!sampleTypeMap.containsKey(item.getItemSampleTypeCodeNo())){
								// 检验方法不存在，新增检验方法字典
								long locDictCodesId = IDCreater.nextId();
								Map<String, String> dictCodesParams = new HashMap<String, String>();
								dictCodesParams.put("locId", locDictCodesId+"");
								dictCodesParams.put("ctrId", item.getItemSampleTypeId()+"");
								dictCodesParams.put("orgId", orgId);
								dictCodesParams.put("appId", user.getSysId()+"");
								instrumentsDao.copy2LocDictCodes(dictCodesParams);
								sampleTypeMap.put(item.getItemSampleTypeCodeNo(), locDictCodesId);
							}
							if(!testMethodMap.containsKey(item.getItemTestMethodCodeNo())){
								// 检验方法不存在，新增检验方法字典
								long locDictCodesId = IDCreater.nextId();
								Map<String, String> dictCodesParams = new HashMap<String, String>();
								dictCodesParams.put("locId", locDictCodesId+"");
								dictCodesParams.put("ctrId", item.getItemTestMethodId()+"");
								dictCodesParams.put("orgId", orgId);
								dictCodesParams.put("appId", user.getSysId()+"");
								instrumentsDao.copy2LocDictCodes(dictCodesParams);
								testMethodMap.put(item.getItemTestMethodCodeNo(), locDictCodesId);
							}
							
							// 增加项目
							long locTestItemsId = IDCreater.nextId();
							Map<String, String> testItemsParams = new HashMap<String, String>();
							testItemsParams.put("locId", locTestItemsId+"");
							testItemsParams.put("ctrId", id);
							testItemsParams.put("orgId", orgId);
							testItemsParams.put("appId", user.getSysId()+"");
							testItemsParams.put("sampleTypeId", sampleTypeMap.get(item.getItemSampleTypeCodeNo())+"");
							testItemsParams.put("testMethodId", testMethodMap.get(item.getItemTestMethodCodeNo())+"");
							instrumentsDao.copy2LocTestItems(testItemsParams);
							testItemMap.put(item.getItemCodeNo(), locTestItemsId);
						}
						
						// 复制项目关联信息
						InstrumentsItems instrItems = new InstrumentsItems();
						instrItems.setId(IDCreater.nextId());
						instrItems.setAppId(user.getOrgId());
						instrItems.setOrgId(Long.parseLong(orgId));
						instrItems.setInstrumentId(Long.valueOf(id));
						instrItems.setTestItemId(testItemMap.get(item.getItemCodeNo()));
						instrItems.setChannelCode(item.getChannelCode());
						instrItems.setFactor(item.getFactor());
						instrItems.setUnit(item.getUnit());
						instrItems.setPrintOrder(item.getPrintOrder());
						instrumentsItemDao.insertInstrumentsItem(instrItems);
						
						// 复制项目参考值
						long locInstrRefrangesId = IDCreater.nextId();
						Map<String, String> instrRefrangesParams = new HashMap<String, String>();
						instrRefrangesParams.put("locId", locInstrRefrangesId+"");
						instrRefrangesParams.put("ctrInstrumentsId", id);
						instrRefrangesParams.put("ctrTestItemId", item.getTestItemId()+"");
						instrRefrangesParams.put("sampleTypeId", sampleTypeMap.get(item.getItemSampleTypeCodeNo())+"");
						instrRefrangesParams.put("orgId", orgId);
						instrRefrangesParams.put("appId", user.getSysId()+"");
						instrumentsDao.copy2LocInstrRefranges(instrRefrangesParams);
					}
					
					/*
					 * 6. 复制仪器微生物
					 */
					// 查找中心仪器微生物
					List<CtrInstrumentsMics> ctrInstrumentsMicsList = instrumentsDao.queryCtrMicsListById(id);
					for(CtrInstrumentsMics item : ctrInstrumentsMicsList){
						// 检查微生物是否在本地存在
						if(!micsItemMap.containsKey(item.getMicsCodeNo())){
							// 微生物不存在，则先增加微生物
							long locMicsItemsId = IDCreater.nextId();
							Map<String, String> mcisItemsParams = new HashMap<String, String>();
							mcisItemsParams.put("locId", locMicsItemsId+"");
							mcisItemsParams.put("ctrId", id);
							mcisItemsParams.put("orgId", orgId);
							instrumentsDao.copy2LocTestItems(mcisItemsParams);
							micsItemMap.put(item.getMicsCodeNo(), locMicsItemsId);
						}
						
						//复制项目关联信息
						InstrumentsMics instrMics = new InstrumentsMics();
						instrMics.setId(IDCreater.nextId());
						instrMics.setAppId(user.getOrgId());
						instrMics.setOrgId(Long.parseLong(orgId));
						instrMics.setInstrumentId(Long.valueOf(id));
						instrMics.setMicsItemId(micsItemMap.get(item.getMicsCodeNo()));
						instrMics.setItemTypeId(item.getItemTypeId());
						instrMics.setChannelCode(item.getChannelCode());
						instrMics.setPrintOrder(item.getPrintOrder());
						instrMicsDao.insertInstrumentsMics(instrMics);
					}
				}
			}
		}
		
		return Message.MSG_SAVE_SUCC;
	}
}

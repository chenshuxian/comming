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

import com.daan.dao.CtrDictCodesDao;
import com.daan.dao.CtrInstrumentsDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrInstrumentsParams;
import com.daan.domain.CtrReportTemplates;
import com.daan.domain.DictLogs;
import com.daan.domain.Instruments;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrInstrumentsQueryDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * @ClassName: CtrInstrumentsService
 * @Description: 中心仪器SERVICE
 * @author zhoujie
 * @date 2015年11月26日 下午20:06:01
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRINSTRUMENTS)
public class CtrInstrumentsService extends AbstractService {
	@Autowired
	private CtrInstrumentsDao ctrInstrumentsDao;
	@Autowired
	private CtrDictCodesDao ctrDictCodesDao;
	
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: CtrInstrumentsList
	 * @Description: 查询中心仪器列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrInstrumentsQueryDto dto = (CtrInstrumentsQueryDto) JsonUtil.jsonToDto(queryDtoJson,
				CtrInstrumentsQueryDto.class, null);
		if("2".equals(dto.getStatus())){
			dto.setStatus(null);
		}
		Page<CtrInstruments> page = (Page<CtrInstruments>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); // 分页page对象

		Integer rowCount = this.ctrInstrumentsDao.queryCountByConditions(map);// 总记录数
		page.setTotalCount(rowCount);
		List<CtrInstruments> list = ctrInstrumentsDao.queryPageListByConditions(map);
		return JsonUtil.DtosTojson(list) + "|" + JsonUtil.DtoTojson(page);
	}

	/**
	 * 
	 * @Title: CtrInstrumentsInfo
	 * @Description: 查询中心仪器信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) {
		CtrInstruments entity = ctrInstrumentsDao.findById(id);
		return JsonUtil.DtoTojson(entity);
	}

	/**
	 * 
	 * @Title: ctrInstrumentsParamsInfo
	 * @Description: 查询中心仪器通讯参数信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_PARAMS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsParamsInfo(@RequestParam(value = "instrumentId", required = true) String instrumentId,
			HttpServletRequest request) {
		CtrInstrumentsParams entity = ctrInstrumentsDao.findParamsById(instrumentId);
		return JsonUtil.repairJson(JsonUtil.DtoTojson(entity), entity);
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsInfoRtList
	 * @Description: 查询中心报告模板列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_INFO_RTLIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsInfoRtList(HttpServletRequest request) {
		List<CtrReportTemplates> list = ctrInstrumentsDao.getAllReportTemplatesList();
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 检查系统内是否有同名数据
	 * 
	 * @param dtoJson
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String chkNameExisted(@RequestParam(value = "dtoJson", required = true) String dtoJson){
		CtrInstruments dto = (CtrInstruments) JsonUtil.jsonToDto(dtoJson, CtrInstruments.class, null);
		
		List<CtrInstruments> list = ctrInstrumentsDao.findByName(dto.getName());
		if(dto.getId() == null || dto.getId().longValue()==0){
			// 新增
			for(CtrInstruments entity : list){
				if(dto.getName().equals(entity.getName())){
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(CtrInstruments entity : list){
				if(dto.getName().equals(entity.getName()) && !dto.getId().equals(entity.getId())){
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		
		return "";
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsAdd
	 * @Description: 新增中心仪器
	 * @param
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrInstruments dto = (CtrInstruments) JsonUtil.jsonToDto(dtoJson, CtrInstruments.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		long id = IDCreater.nextId();
		
		// 中心仪器
		dto.setId(id);
		//codeNo修改成在页面传过来
//		dto.setCodeNo(CodingCreater.createOreder(Constant.MODULEID_CTRINSTRUMENTS));
		dto.setStatus(IsAbleEnum.disable.ordinal());
		ctrInstrumentsDao.insertCtrInstruments(dto);
		
		// 中心仪器通讯参数
		CtrInstrumentsParams dto2 = new CtrInstrumentsParams();
		dto2.setInstrumentId(id);
		dto2.setIsRespond(new Integer(0));
		dto2.setIsDtr(new Integer(0));
		dto2.setIsRts(new Integer(0));
		ctrInstrumentsDao.insertCtrInstrumentsParams(dto2);

		// 添加日志（添加）
		CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(dto.getSampleTypeId()+"");
		if(ctrDictCodes != null){
			dto.setSampleTypeName(ctrDictCodes.getName());
		}
		CtrReportTemplates ctrReportTemplates = ctrInstrumentsDao.getReportTemplatesById(dto.getReportTemplateId()+"");
		if(ctrReportTemplates != null){
			dto.setReportTemplateName(ctrReportTemplates.getName());
		}
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		if(dto != null){
			log.setSummary("[" + dto.getCodeNo() + "]" + dto.getName());
		}
		this.dictLogsService.createDictLogs(log);
		
		// 添加日志（添加）（通讯参数）
		IDictLogger op2 = DictLogsFactory.CreateAddNewLogger();
		dto2.setInstrumentName(dto.getName());
		dto2.setCodeNo(dto.getCodeNo());
		op2.AddChangedObject(dto2);
		DictLogs log2 = op2.ToDictLog(user);
		if(dto2 != null){
			log2.setSummary("[" + dto.getCodeNo() + "]" + dto.getName());
		}
		this.dictLogsService.createDictLogs(log2);
		
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
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrInstruments dto = (CtrInstruments) JsonUtil.jsonToDto(dtoJson, CtrInstruments.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrInstruments entity = ctrInstrumentsDao.findById(dto.getId() + "");
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		ctrInstrumentsDao.updateCtrInstruments(dto);

		// 添加日志（修改）
		CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(entity.getSampleTypeId()+"");
		CtrDictCodes ctrDictCodes2 = ctrDictCodesDao.findById(dto.getSampleTypeId()+"");
		if(ctrDictCodes != null){
			entity.setSampleTypeName(ctrDictCodes.getName());
		}
		if(ctrDictCodes2 != null){
			dto.setSampleTypeName(ctrDictCodes2.getName());
		}
		CtrReportTemplates ctrReportTemplates = ctrInstrumentsDao.getReportTemplatesById(entity.getReportTemplateId()+"");
		CtrReportTemplates ctrReportTemplates2 = ctrInstrumentsDao.getReportTemplatesById(dto.getReportTemplateId()+"");
		if(ctrReportTemplates != null){
			entity.setReportTemplateName(ctrReportTemplates.getName());
		}
		if(ctrReportTemplates2 != null){
			dto.setReportTemplateName(ctrReportTemplates2.getName());
		}
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		dto.setCodeNo(entity.getCodeNo());
		dto.setStatus(entity.getStatus());
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		log.setSummary("[" + entity.getCodeNo() + "]" + entity.getName());
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
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_PRAMS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsParamsEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrInstrumentsParams dto = (CtrInstrumentsParams) JsonUtil.jsonToDto(dtoJson, CtrInstrumentsParams.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrInstrumentsParams entity = ctrInstrumentsDao.findParamsById(dto.getInstrumentId() + "");
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		ctrInstrumentsDao.updateCtrInstrumentsParams(dto);

		// 添加日志（修改）
		CtrInstruments instrument = ctrInstrumentsDao.findById(entity.getInstrumentId()+"");
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		if(instrument != null){
			log.setSummary("[" + instrument.getCodeNo() + "]" + instrument.getName());
		}
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsEnable
	 * @Description: 中心仪器信息 --启用
	 * @param id
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_ENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsEnable(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrInstruments entity = ctrInstrumentsDao.findById(id);
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		ctrInstrumentsDao.enableById(id);

		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		CtrInstruments updateObj = (CtrInstruments)entity.clone();
		updateObj.setStatus(IsAbleEnum.enable.ordinal());
		op.AddChangedObject(updateObj);
		DictLogs log = op.ToDictLog(user);
		log.setSummary("[" + entity.getCodeNo() + "]" + entity.getName());
		this.dictLogsService.createDictLogs(log);

		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: CtrInstrumentsDisable
	 * @Description: 中心仪器信息 --停用
	 * @param id
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DISABLE, method = RequestMethod.POST)
	@ResponseBody
	public String CtrInstrumentsDisable(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrInstruments entity = ctrInstrumentsDao.findById(id);
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		ctrInstrumentsDao.disableById(id);

		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		CtrInstruments updateObj = (CtrInstruments)entity.clone();
		updateObj.setStatus(IsAbleEnum.disable.ordinal());
		op.AddChangedObject(updateObj);
		DictLogs log = op.ToDictLog(user);
		log.setSummary("[" + entity.getCodeNo() + "]" + entity.getName());
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
		CtrInstruments oldEntity = ctrInstrumentsDao.findById(id);
		CtrInstruments CtrInstruments = (CtrInstruments)oldEntity.clone();
		CtrInstruments.setStatus(status);
		ctrInstrumentsDao.modifyInstruments(CtrInstruments);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(CtrInstruments);
		DictLogs log = op.ToDictLog(user);
//		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}


	/**
	 * 
	 * @Title: CtrInstrumentsDelete
	 * @Description: 删除中心仪器信息
	 * @param id
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsDelete(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrInstruments entity = ctrInstrumentsDao.findById(id);
		CtrInstrumentsParams entity2 = ctrInstrumentsDao.findParamsById(id);
		if(entity == null){
			//数据不存在
			return Message.MSG_NOT_EXISTED;
		}

		//仅有状态为“停用”时，数据方可删除
		if(entity.getStatus()==null || entity.getStatus().intValue()==IsAbleEnum.enable.ordinal()){
			return Message.MSG_DEL_FAIL4;
		}
		
		ctrInstrumentsDao.deleteById(id);
		ctrInstrumentsDao.deleteParamsById(id);

		// 添加日志（删除）
//		CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(entity.getSampleTypeId()+"");
//		if(ctrDictCodes != null){
//			entity.setSampleTypeName(ctrDictCodes.getName());
//		}
//		CtrReportTemplates ctrReportTemplates = ctrInstrumentsDao.getReportTemplatesById(entity.getReportTemplateId()+"");
//		if(ctrReportTemplates != null){
//			entity.setReportTemplateName(ctrReportTemplates.getName());
//		}
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		log.setSummary("[" + entity.getCodeNo() + "]" + entity.getName());
		this.dictLogsService.createDictLogs(log);

		// 添加日志（删除）（通讯参数）
		IDictLogger op2 = DictLogsFactory.CreateDeleteLogger();
		op2.AddChangedObject(entity2);
		DictLogs log2 = op2.ToDictLog(user);
		log2.setSummary("[" + entity.getCodeNo() + "]" + entity.getName());
		this.dictLogsService.createDictLogs(log2);
		
		return Message.MSG_DEL_SUCC;
	}

	/**
	 * 
	 * @Title: CtrInstrumentsDeleteBatch
	 * @Description: 批量删除中心仪器信息
	 * @param ids
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
			User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			
			//检查状态，是否可删除
			Map<String, CtrInstruments> map = new HashMap<String, CtrInstruments>();
			String[] idArray = ids.split(",");
			int i=0;
			for (String id : idArray) {
				i++;
				if (StringUtils.isNotBlank(id)) {
					CtrInstruments entity = ctrInstrumentsDao.findById(id);
					
					if(entity != null){
						//仅有状态为“停用”时，数据方可删除
						if(entity.getStatus()==null || entity.getStatus().intValue()==IsAbleEnum.enable.ordinal()){
							return Message.MSG_DEL_FAIL5.replace("#", i+"");
						}
						map.put(id, entity);
					}
				}
			}
			
			// 依次删除
			for (String key : map.keySet()) {
				ctrInstrumentsDao.deleteById(map.get(key).getId()+"");
				ctrInstrumentsDao.deleteParamsById(map.get(key).getId()+"");
				
				// 添加日志（删除）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(map.get(key));
				DictLogs log = op.ToDictLog(user);
				if(map.get(key)!= null){
					log.setSummary("[" + map.get(key).getCodeNo() + "]" + map.get(key).getName());
				}
				this.dictLogsService.createDictLogs(log);
			}
		}
		
		return Message.MSG_DEL_SUCC;
	}
}

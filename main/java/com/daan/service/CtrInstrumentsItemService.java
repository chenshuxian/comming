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
import com.daan.dao.CtrInstrumentsItemDao;
import com.daan.dao.TestItemDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrInstrumentsItems;
import com.daan.domain.CtrInstrumentsRefranges;
import com.daan.domain.CtrTestItems;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrInstrumentsItemDto;
import com.daan.dto.CtrInstrumentsItemQueryDto;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;

/**
 * @ClassName: CtrInstrumentsItemService
 * @Description: 中心仪器项目对照SERVICE
 * @author zhoujie
 * @date 2015年12月14日 上午00:26:09
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRINSTRUMENTSITEM)
public class CtrInstrumentsItemService extends AbstractService {
	@Autowired
	private CtrInstrumentsItemDao ctrInstrumentsItemDao;
	@Autowired
	private CtrInstrumentsDao ctrInstrumentsDao;
	@Autowired
	private TestItemDao testItemDao;
	@Autowired
	private CtrDictCodesDao ctrDictCodesDao;
	
	@Autowired
	private DictLogsService dictLogsService;
	
	/**
	 * 
	 * @Title: ctrInstrumentsItemList
	 * @Description: 查询中心仪器项目对照列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsItemList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrInstrumentsItemQueryDto dto = (CtrInstrumentsItemQueryDto) JsonUtil.jsonToDto(queryDtoJson,
				CtrInstrumentsItemQueryDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<CtrInstrumentsItemDto> list = ctrInstrumentsItemDao.queryListByConditions(map);
		return JsonUtil.DtosTojson(list);
	}

	/**
	 * 
	 * @Title: ctrInstrumentsItemRegrangeList
	 * @Description: 查询参考值列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsItemRegrangeList(
			@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrInstrumentsItemQueryDto dto = (CtrInstrumentsItemQueryDto) JsonUtil.jsonToDto(queryDtoJson,
				CtrInstrumentsItemQueryDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<CtrInstrumentsRefranges> list = ctrInstrumentsItemDao.queryRefListByConditions(map);
		return JsonUtil.DtosTojson(list);
	}

	/**
	 * 
	 * @Title: ctrInstrumentsRefrangeInfo
	 * @Description: 查询参考值信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsRefrangeInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) {
		CtrInstrumentsRefranges entity = ctrInstrumentsItemDao.findRefrangesById(id);
		return JsonUtil.DtoTojson(entity);
	}

	/**
	 * 
	 * @Title: ctrInstrumentsItemSave
	 * @Description: 修改项目对照
	 * @param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_SAVE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsItemSave(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrInstrumentsItemDto dto = (CtrInstrumentsItemDto) JsonUtil.jsonToDto(dtoJson, CtrInstrumentsItemDto.class,
				null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		// 查询整个列表
		Map<String, CtrInstrumentsItems> itemMap = new HashMap<String, CtrInstrumentsItems>();
		List<String> ids = dto.getTxtId();
		if (!ids.isEmpty()) {
			List<CtrInstrumentsItems> list = ctrInstrumentsItemDao.findByIds(ids);
			for (CtrInstrumentsItems item : list) {
				itemMap.put(item.getId() + "", item);
			}
		}

		// 逐个检查是否有修改
		List<String> channelCodeList = dto.getTxtChannelCode();
		List<String> factorList = dto.getTxtFactor();
		List<String> printOrderList = dto.getTxtPrintOrder();
		List<String> unitList = dto.getTxtUnit();
		for (int i = 0; i < dto.getTxtId().size(); i++) {
			CtrInstrumentsItems updateObj = itemMap.get(ids.get(i));
			if (!checkEqual(updateObj.getChannelCode(), channelCodeList.get(i))
					|| !checkEqual(updateObj.getFactor(), factorList.get(i))
					|| !checkEqual(updateObj.getPrintOrder(), printOrderList.get(i))
					|| !checkEqual(updateObj.getUnit(), unitList.get(i))) {
				CtrInstrumentsItems entity = new CtrInstrumentsItems();
				entity.setId(updateObj.getId());
				entity.setChannelCode(channelCodeList.get(i));
				entity.setFactor(factorList.get(i));
				entity.setUnit(unitList.get(i));
				entity.setPrintOrder(Integer.parseInt(printOrderList.get(i)));
				entity.setInstrumentId(updateObj.getInstrumentId());
				entity.setTestItemId(updateObj.getTestItemId());
				ctrInstrumentsItemDao.updateCtrInstrumentsItem(entity);

				// 添加日志（修改）
				CtrInstruments instrument = ctrInstrumentsDao.findById(entity.getInstrumentId()+"");
				CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(entity.getTestItemId());
				entity.setInstrumentName(instrument.getName());
				entity.setCodeNo(instrument.getCodeNo());
				entity.setTestItemName(ctrTestItems.getName());
				updateObj.setTestItemName(ctrTestItems.getName());
				updateObj.setInstrumentName(instrument.getName());
				updateObj.setCodeNo(instrument.getCodeNo());
				IDictLogger op = DictLogsFactory.CreateEditLogger(updateObj);
				op.AddChangedObject(entity);
				DictLogs log = op.ToDictLog(user);
				if(entity != null){
					log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
				}
				this.dictLogsService.createDictLogs(log);
			}
		}

		return Message.MSG_SAVE_SUCC_INFO;
	}

	/**
	 * 检查两个对象内容是否相等
	 * 
	 * @param o1
	 * @param o2
	 * @return
	 */
	private boolean checkEqual(Object o1, Object o2) {
		if (o1 == o2) {
			return true;
		}

		if (o1 == null && o2 != null) {
			if ("".equals(o2.toString())) {
				return true;
			} else {
				return false;
			}
		}

		if (o2 == null && o1 != null) {
			if ("".equals(o1.toString())) {
				return true;
			} else {
				return false;
			}
		}

		if (o1.toString().equals(o2.toString())) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 检查系统内是否有同名数据
	 * 
	 * @param dtoJson
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_IFOVERLAP, method = RequestMethod.POST)
	@ResponseBody
	public String checkAgeOverlap(@RequestParam(value = "dtoJson", required = true) String dtoJson) {
		CtrInstrumentsRefranges dto = (CtrInstrumentsRefranges) JsonUtil.jsonToDto(dtoJson,
				CtrInstrumentsRefranges.class, null);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto);

		List<CtrInstrumentsRefranges> list = ctrInstrumentsItemDao.queryRefListByConditions(map);
		if (!list.isEmpty()) {
			// TODO:
			return Message.ERR;
		}
		return "";
	}

	/**
	 * 
	 * @Title: ctrInstrumentsRefrangesAdd
	 * @Description: 新增参考值
	 * @param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsRefrangesAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrInstrumentsRefranges dto = (CtrInstrumentsRefranges) JsonUtil.jsonToDto(dtoJson,
				CtrInstrumentsRefranges.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		long id = IDCreater.nextId();

		// 参考值
		dto.setId(id);
		ctrInstrumentsItemDao.insertCtrInstrumentsRefranges(dto);

		// 添加日志（添加）
		CtrInstruments instrument = ctrInstrumentsDao.findById(dto.getInstrumentId()+"");
		CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(dto.getTestItemId());
		CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(dto.getSampleTypeId()+"");
		dto.setTestItemName(ctrTestItems.getName());
		dto.setSampleTypeName(ctrDictCodes.getName());
		dto.setInstrumentName(instrument.getName());
		dto.setCodeNo(instrument.getCodeNo());
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		log.setFunctionDesc(Constant.OPERATION_ADD + "-中心仪器项目对照[参考值]");
		log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_ITEM);
		if(dto != null){
			log.setSummary("[" + dto.getCodeNo() + "]" + dto.getInstrumentName());
		}
		this.dictLogsService.createDictLogs(log);

		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: ctrInstrumentsRefrangesEdit
	 * @Description: 修改参考值
	 * @param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsRefrangesEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrInstrumentsRefranges dto = (CtrInstrumentsRefranges) JsonUtil.jsonToDto(dtoJson,
				CtrInstrumentsRefranges.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrInstrumentsRefranges entity = ctrInstrumentsItemDao.findRefrangesById(dto.getId() + "");
		if (entity == null) {
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}

		ctrInstrumentsItemDao.updateCtrInstrumentsRefranges(dto);

		// 添加日志（修改）
		CtrInstruments instrument = ctrInstrumentsDao.findById(dto.getInstrumentId()+"");
		CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(dto.getTestItemId());
		CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(dto.getSampleTypeId()+"");
		dto.setSampleTypeName(ctrDictCodes.getName());
		dto.setTestItemName(ctrTestItems.getName());
		dto.setInstrumentName(instrument.getName());
		dto.setCodeNo(instrument.getCodeNo());
		entity.setSampleTypeName(ctrDictCodes.getName());
		entity.setTestItemName(ctrTestItems.getName());
		entity.setInstrumentName(instrument.getName());
		entity.setCodeNo(instrument.getCodeNo());
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		dto.setEnRefText(entity.getEnRefText());
		dto.setEnRefRemark(entity.getEnRefRemark());
		dto.setTestItemName(ctrTestItems.getName());
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		log.setFunctionDesc(Constant.OPERATION_EDIT + "-中心仪器项目对照[参考值]");
		log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_ITEM);
		if(dto != null){
			log.setSummary("[" + dto.getCodeNo() + "]" + dto.getInstrumentName());
		}
		this.dictLogsService.createDictLogs(log);

		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: ctrInstrumentsItemRefrangeDelete
	 * @Description: 删除参考值
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsItemRefrangeDelete(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrInstrumentsRefranges entity = ctrInstrumentsItemDao.findRefrangesById(id);
		if (entity == null) {
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}

		ctrInstrumentsItemDao.deleteRefrangesById(id);

		// 添加日志（删除）
		CtrInstruments instrument = ctrInstrumentsDao.findById(entity.getInstrumentId()+"");
		CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(entity.getTestItemId());
		CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(entity.getSampleTypeId()+"");
		entity.setSampleTypeName(ctrDictCodes.getName());
		entity.setTestItemName(ctrTestItems.getName());
		entity.setInstrumentName(instrument.getName());
		entity.setCodeNo(instrument.getCodeNo());
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		log.setFunctionDesc(Constant.OPERATION_DETELE + "-中心仪器项目对照[参考值]");
		log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_ITEM);
		if(entity != null){
			log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
		}
		this.dictLogsService.createDictLogs(log);

		return Message.MSG_DEL_SUCC;
	}

	/**
	 * 
	 * @Title: ctrInstrumentsRegrangeDeleteBatch
	 * @Description: 批量删除参考值
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsRegrangeDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {

			// 依次删除
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					CtrInstrumentsRefranges entity = ctrInstrumentsItemDao.findRefrangesById(id);

					// 依次删除
					if (entity != null) {
						ctrInstrumentsItemDao.deleteRefrangesById(id);

						// 添加日志（删除）
						CtrInstruments instrument = ctrInstrumentsDao.findById(entity.getInstrumentId()+"");
						CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(entity.getTestItemId());
						CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(entity.getSampleTypeId()+"");
						entity.setSampleTypeName(ctrDictCodes.getName());
						entity.setTestItemName(ctrTestItems.getName());
						entity.setInstrumentName(instrument.getName());
						entity.setCodeNo(instrument.getCodeNo());
						IDictLogger op = DictLogsFactory.CreateDeleteLogger();
						op.AddChangedObject(entity);
						DictLogs log = op.ToDictLog(user);
						log.setFunctionDesc(Constant.OPERATION_DETELE + "-中心仪器项目对照[参考值]");
						log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_ITEM);
						if(entity != null){
							log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
						}
						this.dictLogsService.createDictLogs(log);
					}
				}
			}
		}

		return Message.MSG_DEL_SUCC;
	}

	/**
	 * 
	 * @Title: ctrInstrumentsItemDeleteBatch
	 * @Description: 批量删除项目
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsItemDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {

			// 依次删除
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					CtrInstrumentsItems entity = ctrInstrumentsItemDao.findById(id);

					// 依次删除
					if (entity != null) {
						// 查询关联的参考值
						Map<String, Object> map = new HashMap<String, Object>();
						CtrInstrumentsItemQueryDto dto = new CtrInstrumentsItemQueryDto();
						dto.setInstrumentId(entity.getInstrumentId() + "");
						dto.setTestItemId(entity.getTestItemId() + "");
						map.put("queryDto", dto);
						List<CtrInstrumentsRefranges> refList = ctrInstrumentsItemDao.queryRefListByConditions(map);

						// 删除项目对照
						ctrInstrumentsItemDao.deleteById(id);

						// 添加日志（删除）
						CtrInstruments instrument = ctrInstrumentsDao.findById(entity.getInstrumentId()+"");
						CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(entity.getTestItemId());
						entity.setTestItemName(ctrTestItems.getName());
						entity.setInstrumentName(instrument.getName());
						entity.setCodeNo(instrument.getCodeNo());
						IDictLogger op = DictLogsFactory.CreateDeleteLogger();
						op.AddChangedObject(entity);
						DictLogs log = op.ToDictLog(user);
						if(entity != null){
							log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
						}
						this.dictLogsService.createDictLogs(log);

						// 删除参考值
						for (CtrInstrumentsRefranges ref : refList) {
							ctrInstrumentsItemDao.deleteRefrangesById(ref.getId() + "");

							// 添加日志（删除）
							CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(ref.getSampleTypeId()+"");
							ref.setSampleTypeName(ctrDictCodes.getName());
							ref.setTestItemName(ctrTestItems.getName());
							ref.setInstrumentName(instrument.getName());
							ref.setCodeNo(instrument.getCodeNo());
							IDictLogger op2 = DictLogsFactory.CreateDeleteLogger();
							op2.AddChangedObject(ref);
							DictLogs log2 = op2.ToDictLog(user);
							if(ref != null){
								log2.setSummary("[" + ref.getCodeNo() + "]" + ref.getInstrumentName());
							}
							this.dictLogsService.createDictLogs(log2);
						}
					}
				}
			}
		}

		return Message.MSG_DEL_SUCC;
	}

	/**
	 * 
	 * @Title: containList
	 * @Description: 查询已包含项目列表
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_LEFT, method = RequestMethod.POST)
	@ResponseBody
	public String containList(@RequestParam(value = "instrumentId", required = true) String instrumentId,
			HttpServletRequest request) {
		List<CtrTestItems> list = ctrInstrumentsItemDao.queryContainItemByInstrumentId(instrumentId);
		return JsonUtil.DtosTojson(list);
	}

	/**
	 * 
	 * @Title: unContainList
	 * @Description: 查询未包含项目列表
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_RIGHT_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String unContainList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrInstrumentsItemQueryDto dto = (CtrInstrumentsItemQueryDto) JsonUtil.jsonToDto(queryDtoJson,
				CtrInstrumentsItemQueryDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<CtrTestItems> list = ctrInstrumentsItemDao.queryUnContainItemByConditions(map);
		return JsonUtil.DtosTojson(list);
	}

	/**
	 * 
	 * @param log2 
	 * @Title: ctrInstrumentsItemAddBatch
	 * @Description: 批量新增和删除项目
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsItemAddBatch(
			@RequestParam(value = "instrumentId", required = true) String instrumentId,
			@RequestParam(value = "addTestItemIds", required = true) String addTestItemIds,
			@RequestParam(value = "delTestItemIds", required = true) String delTestItemIds,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		CtrInstruments instrument = ctrInstrumentsDao.findById(instrumentId);
		
		// 新增项目
		if (StringUtils.isNotEmpty(addTestItemIds)) {
			String[] idArray = addTestItemIds.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					CtrInstrumentsItems entity = new CtrInstrumentsItems();
					entity.setId(IDCreater.nextId());
					entity.setInstrumentId(Long.valueOf(instrumentId));
					entity.setTestItemId(Long.valueOf(id));
					ctrInstrumentsItemDao.insertCtrInstrumentsItem(entity);
					
					// 添加日志（添加）
					CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(entity.getTestItemId());
					entity.setTestItemName(ctrTestItems.getName());
					entity.setInstrumentName(instrument.getName());
					entity.setCodeNo(instrument.getCodeNo());
					IDictLogger op = DictLogsFactory.CreateAddNewLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					if(entity != null){
						log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
					}
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
					Map<String, Object> map = new HashMap<String, Object>();
					CtrInstrumentsItemQueryDto dto = new CtrInstrumentsItemQueryDto();
					dto.setTestItemId(id);
					dto.setInstrumentId(instrumentId);
					map.put("queryDto", dto);
					List<CtrInstrumentsItemDto> list = ctrInstrumentsItemDao.queryListByConditions(map);
					
					for(CtrInstrumentsItemDto ctrInstrumentsItemDto : list){
						CtrInstrumentsItems entity = ctrInstrumentsItemDao.findById(ctrInstrumentsItemDto.getId());
						// 删除
						if (entity != null) {
							// 查询关联的参考值
							List<CtrInstrumentsRefranges> refList = ctrInstrumentsItemDao.queryRefListByConditions(map);

							// 删除项目对照
							ctrInstrumentsItemDao.deleteById(entity.getId()+"");

							// 添加日志（删除）
							CtrTestItems ctrTestItems = testItemDao.queryTestItemToID(entity.getTestItemId());
							entity.setTestItemName(ctrTestItems.getName());
							entity.setInstrumentName(instrument.getName());
							entity.setCodeNo(instrument.getCodeNo());
							IDictLogger op = DictLogsFactory.CreateDeleteLogger();
							op.AddChangedObject(entity);
							DictLogs log = op.ToDictLog(user);
							if(entity != null){
								log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
							}
							this.dictLogsService.createDictLogs(log);

							// 删除参考值
							for (CtrInstrumentsRefranges ref : refList) {
								ctrInstrumentsItemDao.deleteRefrangesById(ref.getId() + "");

								// 添加日志（删除）
								CtrDictCodes ctrDictCodes = ctrDictCodesDao.findById(ref.getSampleTypeId()+"");
								ref.setSampleTypeName(ctrDictCodes.getName());
								ref.setTestItemName(ctrTestItems.getName());
								ref.setInstrumentName(instrument.getName());
								ref.setCodeNo(instrument.getCodeNo());
								IDictLogger op2 = DictLogsFactory.CreateDeleteLogger();
								op2.AddChangedObject(ref);
								DictLogs log2 = op2.ToDictLog(user);
								if(ref != null){
									log2.setSummary("[" + ref.getCodeNo() + "]" + ref.getInstrumentName());
								}
								this.dictLogsService.createDictLogs(log2);
							}
						}
					}
				}
			}
		}
		
		
		
		
		return Message.MSG_SAVE_SUCC;
	}

}

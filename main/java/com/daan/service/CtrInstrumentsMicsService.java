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

import com.daan.dao.CentreMicrobeItemDao;
import com.daan.dao.CtrInstrumentsDao;
import com.daan.dao.CtrInstrumentsMicsDao;
import com.daan.domain.CentreMicrobeItem;
import com.daan.domain.Constant;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrInstrumentsMics;
import com.daan.domain.CtrMicsItems;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrInstrumentsMicsDto;
import com.daan.dto.CtrInstrumentsMicsQueryDto;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;

/**
 * @ClassName: CtrInstrumentsMicsService
 * @Description: 中心仪器微生物对照SERVICE
 * @author zhoujie
 * @date 2015年12月16日 上午00:26:09
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRINSTRUMENTSMICS)
public class CtrInstrumentsMicsService extends AbstractService {
	@Autowired
	private CtrInstrumentsMicsDao ctrInstrumentsMicsDao;
	@Autowired
	private CtrInstrumentsDao ctrInstrumentsDao;
	@Autowired
	private CentreMicrobeItemDao centreMicrobeItemDao;
	
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: ctrInstrumentsMicsList
	 * @Description: 查询中心仪器微生物对照列表
	 * @param
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsMicsList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrInstrumentsMicsQueryDto dto = (CtrInstrumentsMicsQueryDto) JsonUtil.jsonToDto(queryDtoJson,
				CtrInstrumentsMicsQueryDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<CtrInstrumentsMicsDto> list = ctrInstrumentsMicsDao.queryListByConditions(map);
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsMicsSave
	 * @Description: 修改微生物对照
	 * @param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_SAVE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsMicsSave(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrInstrumentsMicsDto dto = (CtrInstrumentsMicsDto) JsonUtil.jsonToDto(dtoJson, CtrInstrumentsMicsDto.class,
				null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		List<String> idList = null;
		List<String> channelCodeList = null;
		List<String> printOrderList = null;
		if("1".equals(dto.getItemTypeId())){
			// 细菌
			idList = dto.getTxtIdGerm();
			channelCodeList = dto.getTxtChannelCodeGerm();
			printOrderList = dto.getTxtPrintOrderGerm();
		} else if("2".equals(dto.getItemTypeId())){
			// 抗生素
			idList = dto.getTxtIdAnti();
			channelCodeList = dto.getTxtChannelCodeAnti();
			printOrderList = dto.getTxtPrintOrderAnti();
		}
		
		// 查询整个列表
		Map<String, CtrInstrumentsMics> itemMap = new HashMap<String, CtrInstrumentsMics>();
		if (!idList.isEmpty()) {
			List<CtrInstrumentsMics> list = ctrInstrumentsMicsDao.findByIds(idList);
			for (CtrInstrumentsMics item : list) {
				itemMap.put(item.getId() + "", item);
			}
		}
		
		// 逐个检查是否有修改
		for (int i = 0; i < idList.size(); i++) {
			CtrInstrumentsMics entity = itemMap.get(idList.get(i));
			if (!checkEqual(entity.getChannelCode(), channelCodeList.get(i))
					|| !checkEqual(entity.getPrintOrder(), printOrderList.get(i))) {
				CtrInstrumentsMics updateObj = new CtrInstrumentsMics();
				updateObj.setId(entity.getId());
				updateObj.setChannelCode(channelCodeList.get(i));
				updateObj.setPrintOrder(Integer.parseInt(printOrderList.get(i)));
				updateObj.setInstrumentId(entity.getInstrumentId());
				updateObj.setMicItemId(entity.getMicItemId());
				updateObj.setItemTypeId(entity.getItemTypeId());
				ctrInstrumentsMicsDao.updateCtrInstrumentsMics(updateObj);

				// 添加日志（修改）
				CtrInstruments instrument = ctrInstrumentsDao.findById(entity.getInstrumentId()+"");
				CentreMicrobeItem mics = centreMicrobeItemDao.getCentreMicrobeitemDetailById(entity.getMicItemId()+"");
				updateObj.setInstrumentName(instrument.getName());
				updateObj.setCodeNo(instrument.getCodeNo());
				updateObj.setMicItemName(mics.getName());
				entity.setInstrumentName(instrument.getName());
				entity.setCodeNo(instrument.getCodeNo());
				entity.setMicItemName(mics.getName());
				IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
				op.AddChangedObject(updateObj);
				DictLogs log = op.ToDictLog(user);
				if(entity.getItemTypeId() != null && entity.getItemTypeId().intValue()==1){
					log.setFunctionDesc(Constant.OPERATION_EDIT + "-中心仪器细菌对照");
				} else {
					log.setFunctionDesc(Constant.OPERATION_EDIT + "-中心仪器抗生素对照");
				}
				log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_MICS);
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
	 * 
	 * @Title: ctrInstrumentsMicsDeleteBatch
	 * @Description: 批量删除微生物
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsMicsDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {

			// 依次删除
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					CtrInstrumentsMics entity = ctrInstrumentsMicsDao.findById(id);

					// 依次删除
					if (entity != null) {
						// 删除项目对照
						ctrInstrumentsMicsDao.deleteById(id);

						// 添加日志（删除）
						CtrInstruments instrument = ctrInstrumentsDao.findById(entity.getInstrumentId()+"");
						CentreMicrobeItem mics = centreMicrobeItemDao.getCentreMicrobeitemDetailById(entity.getMicItemId()+"");
						entity.setMicItemName(mics.getName());
						entity.setInstrumentName(instrument.getName());
						entity.setCodeNo(instrument.getCodeNo());
						IDictLogger op = DictLogsFactory.CreateDeleteLogger();
						op.AddChangedObject(entity);
						DictLogs log = op.ToDictLog(user);
						if(entity.getItemTypeId() != null && entity.getItemTypeId().intValue()==1){
							log.setFunctionDesc(Constant.OPERATION_DETELE + "-中心仪器细菌对照");
						} else {
							log.setFunctionDesc(Constant.OPERATION_DETELE + "-中心仪器抗生素对照");
						}
						log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_MICS);
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
	 * @Title: containList
	 * @Description: 查询已包含微生物列表
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_LEFT, method = RequestMethod.POST)
	@ResponseBody
	public String containList(@RequestParam(value = "instrumentId", required = true) String instrumentId,
			@RequestParam(value = "itemTypeId", required = true) String itemTypeId, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrInstrumentsMicsQueryDto dto = new CtrInstrumentsMicsQueryDto();
		dto.setInstrumentId(instrumentId);
		dto.setItemTypeId(itemTypeId);
		map.put("queryDto", dto); // 查询条件Dto
		List<CtrMicsItems> list = ctrInstrumentsMicsDao.queryContainByConditions(map);
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: unContainList
	 * @Description: 查询未包含细菌列表
	 * @param id
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_RIGHT_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String unContainList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrInstrumentsMicsQueryDto dto = (CtrInstrumentsMicsQueryDto) JsonUtil.jsonToDto(queryDtoJson,
				CtrInstrumentsMicsQueryDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<CtrMicsItems> list = ctrInstrumentsMicsDao.queryUnContainByConditions(map);
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsMicsAddBatch
	 * @Description: 批量新增和删除微生物
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsMicsAddBatch(
			@RequestParam(value = "instrumentId", required = true) String instrumentId,
			@RequestParam(value = "itemTypeId", required = true) String itemTypeId,
			@RequestParam(value = "addMicsIds", required = true) String addMicsIds,
			@RequestParam(value = "delMicsIds", required = true) String delMicsIds,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		CtrInstruments instrument = ctrInstrumentsDao.findById(instrumentId);
		
		// 新增项目
		if (StringUtils.isNotEmpty(addMicsIds)) {
			String[] idArray = addMicsIds.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					CtrInstrumentsMics entity = new CtrInstrumentsMics();
					entity.setId(IDCreater.nextId());
					entity.setInstrumentId(Long.valueOf(instrumentId));
					entity.setMicItemId(Long.valueOf(id));
					entity.setItemTypeId(Integer.valueOf(itemTypeId));
					ctrInstrumentsMicsDao.insertCtrInstrumentsMics(entity);
					
					// 添加日志（添加）
					entity.setInstrumentName(instrument.getName());
					entity.setCodeNo(instrument.getCodeNo());
					CentreMicrobeItem mics = centreMicrobeItemDao.getCentreMicrobeitemDetailById(entity.getMicItemId()+"");
					entity.setMicItemName(mics.getName());
					IDictLogger op = DictLogsFactory.CreateAddNewLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					if(entity.getItemTypeId() != null && entity.getItemTypeId().intValue()==1){
						log.setFunctionDesc(Constant.OPERATION_ADD + "-中心仪器细菌对照");
					} else {
						log.setFunctionDesc(Constant.OPERATION_ADD + "-中心仪器抗生素对照");
					}
					log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_MICS);
					if(entity != null){
						log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
					}
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		
		// 删除项目
		if (StringUtils.isNotEmpty(delMicsIds)) {
			String[] idArray = delMicsIds.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotBlank(id)) {
					// 查找要删除项目
					Map<String, Object> map = new HashMap<String, Object>();
					CtrInstrumentsMicsQueryDto dto = new CtrInstrumentsMicsQueryDto();
					dto.setMicItemId(id);
					dto.setInstrumentId(instrumentId);
					map.put("queryDto", dto);
					List<CtrInstrumentsMicsDto> list = ctrInstrumentsMicsDao.queryListByConditions(map);
					
					for(CtrInstrumentsMicsDto ctrInstrumentsMicsDto : list){
						CtrInstrumentsMics entity = ctrInstrumentsMicsDao.findById(ctrInstrumentsMicsDto.getId());
						// 删除
						if (entity != null) {
							// 删除项目对照
							ctrInstrumentsMicsDao.deleteById(entity.getId()+"");
	
							// 添加日志（删除）
							entity.setInstrumentName(instrument.getName());
							entity.setCodeNo(instrument.getCodeNo());
							CentreMicrobeItem mics = centreMicrobeItemDao.getCentreMicrobeitemDetailById(entity.getMicItemId()+"");
							entity.setMicItemName(mics.getName());
							IDictLogger op = DictLogsFactory.CreateDeleteLogger();
							op.AddChangedObject(entity);
							DictLogs log = op.ToDictLog(user);
							if(entity.getItemTypeId() != null && entity.getItemTypeId().intValue()==1){
								log.setFunctionDesc(Constant.OPERATION_DETELE + "-中心仪器细菌对照");
							} else {
								log.setFunctionDesc(Constant.OPERATION_DETELE + "-中心仪器抗生素对照");
							}
							log.setModuleId(Constant.MODULEID_CTRINSTRUMENTS_MICS);
							if(entity != null){
								log.setSummary("[" + entity.getCodeNo() + "]" + entity.getInstrumentName());
							}
							this.dictLogsService.createDictLogs(log);
						}
					}
				}
			}
		}
		
		return Message.MSG_SAVE_SUCC;
	}

}

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
import com.daan.dao.InstrMicsDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.DictLogs;
import com.daan.domain.InstrMics;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.InstrMicsDto;
import com.daan.dto.InstrMicsQueryDto;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;

/**
* @ClassName: InstrMicsService
* @Description: TODO(微生物的细菌、抗生素仪器通道Service) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:52:56 
*
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_INSTRMICS)
public class InstrMicsService extends AbstractService {
	
	@Autowired
	private InstrMicsDao instrMicsDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	* @Title: instrMicsPageList 
	* @Description: TODO(微生物的细菌、抗生素仪器通道详细列表) 
	* @param @param queryDtoJson
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_INSTRMICS_PAGELIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrMicsPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson, HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(queryDtoJson)) {
			throw new Exception("instrMicsPageList: params Is Null!"); 
		}
		Map<String, Object> map = new HashMap<String, Object>();
		InstrMicsQueryDto dto = (InstrMicsQueryDto) JsonUtil.jsonToDto(queryDtoJson, InstrMicsQueryDto.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		List<InstrMicsDto> list = instrMicsDao.queryPageListByConditions(map);
		return JsonUtil.DtosTojson(list);
	}

	/**
	 * 
	* @Title: queryInstrMicsNoAddItems 
	* @Description: TODO(查询微生物的细菌、抗生素仪器通道列表信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_INSTRMICS_NOTADDITEMS, method = RequestMethod.POST)
	@ResponseBody
	public String queryInstrMicsNoAddItems(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson, HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(queryDtoJson)) {
			throw new Exception("queryInstrMicsNoAddItems: params Is Null!"); 
		}
		Map<String, Object> map = new HashMap<String, Object>();
		InstrMicsQueryDto dto = (InstrMicsQueryDto) JsonUtil.jsonToDto(queryDtoJson, InstrMicsQueryDto.class, null);
		map.put("queryDto", dto);
		List<InstrMicsDto> list = instrMicsDao.queryInstrMicsNoAddItems(map);
		return JsonUtil.DtosTojson(list) ;//+ "|" + JsonUtil.DtoTojson(list2);
	}

	/**
	 * 
	* @Title: instrMicsAdd 
	* @Description: TODO(新增基础字典信息) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_INSTRMICS_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String instrMicsAdd(@RequestParam(value = "removeInstrMicsJson", required = true) String removeInstrMicsJson, @RequestParam(value = "addInstrMicsJson", required = true) String addInstrMicsJson, 
			  @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// 是否有删除项目-removeItemIds
		if (StringUtils.isNotBlank(removeInstrMicsJson)) {
			List<InstrMics> instrMicsList = (List<InstrMics>) JsonUtil.jsonToDtos(removeInstrMicsJson, InstrMics.class);
			for (InstrMics findInstrMics : instrMicsList) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("queryDto", findInstrMics);
				List<InstrMics> list = instrMicsDao.queryInstrMicsyConditions(params);
				if (list != null && list.size() > 0) {
					InstrMics instrMics = list.get(0);
					instrMicsDao.deleteById(String.valueOf(instrMics.getId()));
					// 添加日志（添加）
					IDictLogger op = DictLogsFactory.CreateAddNewLogger();
					op.AddChangedObject(instrMics);
					DictLogs log = op.ToDictLog(user);
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		//是否有新增项目-addItemIds
		if (StringUtils.isNotBlank(addInstrMicsJson)) {
			List<InstrMics> addInstrMicsList = (List<InstrMics>) JsonUtil.jsonToDtos(addInstrMicsJson, InstrMics.class);
			int i = 0;
			Integer maxPrintOrder = 0;
			for (InstrMics addInstrMics : addInstrMicsList) {
				// 项目是否已添加；如已添加不再进行新增
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("queryDto", addInstrMics);
				List<InstrMics> list = instrMicsDao.queryInstrMicsyConditions(params);
				if (list == null || list.size() == 0) {
					if (i == 0) {
						Map<String, Object> map = new HashMap<String, Object>();
						map.put("queryDto", addInstrMics);
						// 获取最大打印号
						maxPrintOrder = instrMicsDao.getMaxPrintOrder(map);
						maxPrintOrder = maxPrintOrder == null ? 0 : maxPrintOrder;
					}
					Integer maxOrder = Integer.valueOf(Constant.MAX_ORDER);
					maxPrintOrder = maxPrintOrder >= maxOrder ? maxOrder : maxPrintOrder + 1;
					addInstrMics.setId(IDCreater.nextId());
					addInstrMics.setPrintOrder(maxPrintOrder);
					addInstrMics.setAppId(Long.valueOf("111"));//
					instrMicsDao.addInstrMics(addInstrMics);

					// 添加日志（添加）
					IDictLogger op = DictLogsFactory.CreateAddNewLogger();
					op.AddChangedObject(addInstrMics);
					DictLogs log = op.ToDictLog(user);
					this.dictLogsService.createDictLogs(log);
					i++;
				}
			}
		}
		return Message.MSG_SAVE_SUCC;
	}


	/**
	 * 
	* @Title: instrMicsEide 
	* @Description: TODO(基础字典信息修改) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_INSTRMICS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String instrMicsEide(@RequestParam(value = "saveJson", required = true) String saveJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(saveJson) || StringUtils.isEmpty(userJson)){
			throw new Exception("instrMicsEide: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		List<InstrMics> eideInstrMicsList = (List<InstrMics>) JsonUtil.jsonToDtos(saveJson, InstrMics.class);
		for(InstrMics instrMics : eideInstrMicsList){
			InstrMics oldInstrMics = instrMicsDao.findById(String.valueOf(instrMics.getId()));
			instrMics.setAppId(oldInstrMics.getAppId());
			instrMics.setInstrumentId(oldInstrMics.getInstrumentId());
			instrMics.setItemTypeId(oldInstrMics.getItemTypeId());
			instrMics.setMicItemId(oldInstrMics.getMicItemId());
			instrMics.setOrgId(oldInstrMics.getOrgId());
			instrMicsDao.modifyInstrMics(instrMics);
			// 添加日志（添加）
			IDictLogger op = DictLogsFactory.CreateEditLogger(oldInstrMics);
			op.AddChangedObject(instrMics);
			DictLogs log = op.ToDictLog(user);
			this.dictLogsService.createDictLogs(log);
				
		}
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	* @Title: checkChannelCodeExisted 
	* @Description: TODO(同一仪器通道码重复验证) 
	* @param @param id
	* @param @param instrumentId
	* @param @param channelCode
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_INSTRMICS_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkChannelCodeExisted(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson) throws Exception {
		if (StringUtils.isEmpty(queryDtoJson)) {
			throw new Exception("checkChannelCodeExisted: params Is Null!");
		}
		InstrMics dto = (InstrMics) JsonUtil.jsonToDto(queryDtoJson, InstrMics.class, null);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("queryDto", dto);
		List<InstrMics> list = instrMicsDao.queryInstrMicsyConditions(params);
		if (list != null && list.size() >0 ) {
			return Message.MSG_CONFIRM_3;
		}
		return "";
	}
	
	/**
	 * 
	* @Title: instrMicsDeleteBatch 
	* @Description: TODO(批量删除) 
	* @param @param ids
	* @param @param userJson
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_INSTRMICS_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String instrMicsDeleteBatch(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)){
			throw new Exception("instrmicsDeleteBatch: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					InstrMics entity = instrMicsDao.findById(id);
					instrMicsDao.deleteById(id);
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
}

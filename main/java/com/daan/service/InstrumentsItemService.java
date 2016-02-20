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

import com.daan.dao.InstrumentsItemDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrReportTemplates;
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
import com.daan.util.StringUtil;
import com.daan.utils.Page;

/**
 * 
 * @ClassName: InstrumentsItemService 
 * @Description: TODO(客户仪器项目对照SERVICE) 
 * @author xieruiyun
 * @date 2015年12月17日 上午10:03:04
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_INSTRUMENTS_ITEM)
public class InstrumentsItemService extends AbstractService {
	
	@Autowired
	private InstrumentsItemDao instrumentsItemDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: instrumentsItemList 
	 * @Description: TODO(查询仪器包含的项目) 
	 * @param dtoJson 查询条件
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTSITEM_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsItemList(@RequestParam(value = "dtoJson", required = false)String dtoJson) {
		//查询条件Dto
		InstrumentsDto dto = (InstrumentsDto) JsonUtil.jsonToDto(dtoJson, InstrumentsDto.class, null);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto);
		//查询出InstrItems的集合
		List<InstrItems> instrumentsList = instrumentsItemDao.queryInstrumentsItemList(map);
		return JsonUtil.DtosTojson(instrumentsList);
	}
	
	/**
	 * 
	 * @Title: queryInstrumentsItemNotContainList 
	 * @Description: TODO(查询仪器未包含的项目) 
	 * @param dtoJson
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_ITEM_NOT_CONTAINLIST, method = RequestMethod.POST)
	@ResponseBody
	public String queryInstrumentsItemNotContainList(@RequestParam(value = "dtoJson", required = false)String dtoJson){
		//查询条件Dto
		InstrumentsDto dto = (InstrumentsDto) JsonUtil.jsonToDto(dtoJson, InstrumentsDto.class, null);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto);
		//查询出InstrItems的集合
		List<InstrItems> instrumentsList = instrumentsItemDao.queryInstrumentsItemNotContainList(map);
		return JsonUtil.DtosTojson(instrumentsList);
	}
	
	/**
	 * @throws Exception 
	 * @Title: addOrRemoveInstrumentsItem 
	 * @Description: TODO(添加删除仪器项目) 
	 * @param removeInstrItemJson
	 * @param addInstrItemJson
	 * @param userJson
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_ITEM_ADD_OR_REMOVE, method = RequestMethod.POST)
	@ResponseBody
	public String addOrRemoveInstrumentsItem(@RequestParam(value = "removeInstrItemJson", required = false) String removeInstrItemJson,
			@RequestParam(value = "addInstrItemJson", required = false) String addInstrItemJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception{
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		//需要删除的数据
		if(StringUtil.isNotBlank(removeInstrItemJson)){
			//需要删除仪器集合
			List<InstrItems> instrItemsLists = (List<InstrItems>) JsonUtil.jsonToDtos(removeInstrItemJson, InstrItems.class);
			//循环删除
			for(InstrItems instrItems : instrItemsLists){
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("queryDto", instrItems);
				//查询仪器对应的项目
				List<InstrItems> list = instrumentsItemDao.queryInstrItemConditions(params);
				if(list != null && list.size() > 0){
					InstrItems instrItem = list.get(0);
					//删除仪器对应项目关系
					instrumentsItemDao.deleteInstrItem(String.valueOf(instrItem.getId()));
					//添加日志
					IDictLogger op = DictLogsFactory.CreateAddNewLogger();
					op.AddChangedObject(instrItem);
					DictLogs log = op.ToDictLog(user);
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		return Message.MSG_SAVE_SUCC;
	}
	
}

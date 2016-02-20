package com.daan.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daan.dao.CtrInstrumentsDao;
import com.daan.dao.TestItemDao;
import com.daan.dao.TestItemGroupDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrTestGroupDetails;
import com.daan.domain.CtrTestItems;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.QueryDto;
import com.daan.enums.TestType;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;

/**
 * 
 * @ClassName: TestItemGroupService 
 * @Description: TODO(组合项目service) 
 * @author xieruiyun
 * @date 2015年12月8日 下午7:35:38
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_TESTITEM_GROUP)
public class TestItemGroupService extends AbstractService {
	
	@Autowired
	private TestItemGroupDao testItemGroupDao;
	@Autowired
	private DictLogsService dictLogsService;
	@Autowired
	private CtrInstrumentsDao ctrInstrumentsDao;
	@Autowired
	private TestItemDao testItemDao;
	/**
	 * 
	 * @Title: queryTestItem 
	 * @Description: TODO(根据项目ID查询出详细信息) 
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_QUERY_TESTITEM_GROUP, method = RequestMethod.POST)
	@ResponseBody
	public String queryTestItemGroup(@RequestParam(value = "testItemId", required = true) String testItemId){
		//检验项目信息
		long id = StringUtils.isEmpty(testItemId)? 0 : Long.valueOf(testItemId);
		CtrTestItems testItem = new CtrTestItems();
		testItem.setId(id);
		testItem.setItemTypeId(TestType.group.ordinal());
		testItem = testItemGroupDao.queryTestItemGroup(testItem);
		if(testItem != null){
			testItem.setIdString(testItem.getId() + "");
		}
		return JsonUtil.DtoTojson(testItem);
	}
	
	/**
	 * 
	 * @Title: queryTestItemGroupList 
	 * @Description: TODO(查询出全部的组合) 
	 * @param JsonQueryDto
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_TESTITEM_GROUP_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String queryTestItemGroupList(@RequestParam(value = "JsonQueryDto", required = true) String JsonQueryDto){
		QueryDto dto = (QueryDto) JsonUtil.jsonToDto(JsonQueryDto, QueryDto.class,null);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto); //查询条件Dto
	    //填充projects数据
	    List<CtrTestItems> ctrTestItems = testItemGroupDao.queryTestItemGroupList(map);
	    return JsonUtil.DtosTojson(ctrTestItems);
	}
	
	/**
	 * 
	 * @Title: singleItemList 
	 * @Description: TODO(组合项目包含的项目) 
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_SINGLEITEM_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String singleItemList(@RequestParam(value = "testItemId", required = true) String testItemId){
		List<CtrTestItems> ctrTestItems = testItemGroupDao.querySingleItemList(testItemId);
		return JsonUtil.DtosTojson(ctrTestItems);
	}
	
	/**
	 * 
	 * @Title: notContainList 
	 * @Description: TODO(组合未包含的项目) 
	 * @param testItemId
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_NOT_CONTAINLIST, method = RequestMethod.POST)
	@ResponseBody
	public String notContainList(@RequestParam(value = "JsonDto", required = true) String JsonDto){
		QueryDto dto = (QueryDto) JsonUtil.jsonToDto(JsonDto, QueryDto.class, null);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto);
		List<CtrTestItems> ctrTestItems = testItemGroupDao.querySingleItemNotContainList(map);
		return JsonUtil.DtosTojson(ctrTestItems);
	}
	
	/**
	 * @throws Exception 
	 * @Title: addOrRemoveItem 
	 * @Description: TODO(添加或者删除组合中的项目) 
	 * @param removeItemID 要删除项目的ID
	 * @param addItemID 要添加项目的ID
	 * @param userJson User 对象
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_ADD_OR_REMOVE_ITEM)
	@ResponseBody
	public String addOrRemoveItem(@RequestParam(value = "removeItemID", required = true) String removeItemID, 
			@RequestParam(value = "addItemID", required = true) String addItemID,
			@RequestParam(value = "groupItemID", required = true) String groupItemID,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception{
		//userJSON串转换成User对象
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		//查询组合是否已经保存到了关系表中，如果没有就要添加进去
		//int groupIDCount = testItemGroupDao.fingTestGroupDetailIdCount(groupItemID);
		//removeItemIDs 需要删除项目ID数组，根据 “,”截取
		String [] removeItemIDs = null;
		if(removeItemID != null && removeItemID != ""){
			removeItemID = removeItemID.substring(0, removeItemID.length()-1);
			removeItemIDs = removeItemID.split(",");
		}
		//addItemIDs 需要添加项目的ID数组，根据 “,”截取
		String [] addItemIDs = null;
		if(addItemID != null && addItemID != ""){
			addItemID = addItemID.substring(0, addItemID.length()-1);
			addItemIDs = addItemID.split(",");
		}
		/*CtrTestGroupDetails testGroupDetail = null;
		Long id = IDCreater.nextId();
		groupIDCount等于0就要把组合也插入进去
		if(groupIDCount == 0){
			testGroupDetail = new CtrTestGroupDetails();
			testGroupDetail.setId(id);
			testGroupDetail.setItemType(TestType.group.ordinal());
			testGroupDetail.setTestGorupId(Long.parseLong(groupItemID));
			testGroupDetail.setTestItemId(Long.parseLong(groupItemID));
			testGroupDetail.setLeftValue(1);
			testGroupDetail.setRightValue(2);
			//写入组合中间表数据
			testItemGroupDao.insrtTestGroupDetail(testGroupDetail);
			//添加删除
			this.addOrRemoveMethods(removeItemIDs, addItemIDs, groupItemID);
		}else{
			//添加删除
			this.addOrRemoveMethods(removeItemIDs, addItemIDs, groupItemID);
		}*/
		//添加删除
		this.addOrRemoveMethods(removeItemIDs, addItemIDs, groupItemID, user);
		return Message.MSG_SAVE_SUCC;
	} 
	
	/**
	 * @throws Exception 
	 * @Title: addOrRemoveMethods 
	 * @Description: TODO(添加删除组合关系) 
	 * @param removeItemIDs 需要删除项目的数组
	 * @param addItemIDs 需要添加的项目数组
	 * @param groupItemID 组合Idvoid
	 * @param user 对象
	 * @throws
	 */
	private void addOrRemoveMethods(String[] removeItemIDs, String[] addItemIDs, String groupItemID, User user) throws Exception{
		CtrTestGroupDetails testGroupDetail = null;
		//循环删除
		if(removeItemIDs != null){
			for(String testId : removeItemIDs){
				//删除组合与单项的关系
				QueryDto dto = new QueryDto();
				Map<String, Object> map = new HashMap<String, Object>();
				dto.setGroupID(Long.parseLong(groupItemID));
				dto.setTestitemId(Long.parseLong(testId));
				map.put("queryDto", dto);
				//查询出删除前的旧数据
				CtrTestGroupDetails ctrTestGroupDetails = testItemGroupDao.queryTestGroupDetail(map);
				//删除数据
				testItemGroupDao.deleteTestGroupDetails(map);
				//根据项目ID查询出组合项目的详细信息
				CtrTestItems ti = testItemDao.queryTestItemToID(Long.parseLong(groupItemID));
				//添加删除日志
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(ctrTestGroupDetails);
				DictLogs log = op.ToDictLog(user);
				log.setFunctionDesc(Constant.OPERATION_DETELE + "-组合项目-检验项目");
				if(ti != null){
					log.setSummary("[" + ti.getCodeNo() + "]" + ti.getName());
				}
				//手动判断删除项目的类型
				this.dictLogsService.createDictLogs(log);
			}
		}
		//循环添加
		if(addItemIDs != null){
			for(String testId : addItemIDs){
				//获取主键ID
				Long id = IDCreater.nextId();
				testGroupDetail = new CtrTestGroupDetails();
				testGroupDetail.setId(id);
				testGroupDetail.setItemType(TestType.single.ordinal());
				testGroupDetail.setTestGroupId(Long.parseLong(groupItemID));
				testGroupDetail.setTestItemId(Long.parseLong(testId));
				testGroupDetail.setLeftValue(0);
				testGroupDetail.setRightValue(0);
				//根据项目ID查询出检验项目的详细信息
				CtrTestItems ti = testItemDao.queryTestItemToID(Long.parseLong(testId));
				// 查询出组合的详细信息
				ti.setId(Long.parseLong(groupItemID));
				ti.setItemTypeId(2);
				CtrTestItems ctrTestGroupDetails = testItemGroupDao.queryTestItemGroup(ti);
				//写入组合中间表数据
				testItemGroupDao.insrtTestGroupDetail(testGroupDetail);
				testGroupDetail.setCodeNo(ti.getCodeNo());
				testGroupDetail.setTestItemName(ti.getName());
				//添加添加日志
				IDictLogger op = DictLogsFactory.CreateAddNewLogger();
				op.AddChangedObject(testGroupDetail);
				DictLogs log = op.ToDictLog(user);
				log.setFunctionDesc(Constant.OPERATION_ADD + "-组合项目-检验项目");
				log.setModuleId(Constant.MODULEID_GROUP_TESTITEM);
				if(ctrTestGroupDetails != null){
					log.setSummary("[" + ctrTestGroupDetails.getCodeNo() + "]" + ctrTestGroupDetails.getName());
				}
				//手动判断删除项目的类型
				this.dictLogsService.createDictLogs(log);
			}
		}
	}
	
	/**
	 * @throws Exception 
	 * @Title: delSingleItem 
	 * @Description: TODO(删除组合包含的项目) 
	 * @param testItemid 组合包含的项目ID
	 * @param groupItemid 组合ID
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELETE_SINGLEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String delSingleItem(@RequestParam(value = "testItemid", required = true) String testItemid, 
			@RequestParam(value = "groupItemid", required = true) String groupItemid,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception{
		//userJSON串转换成User对象
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		//删除组合与单项的关系
		QueryDto dto = new QueryDto();
		Map<String, Object> map = new HashMap<String, Object>();
		dto.setGroupID(Long.parseLong(groupItemid));
		dto.setTestitemId(Long.parseLong(testItemid));
		map.put("queryDto", dto);
		//查询出删除前的旧数据
		CtrTestGroupDetails ctrTestGroupDetails = testItemGroupDao.queryTestGroupDetail(map);
		//删除数据
		testItemGroupDao.deleteTestGroupDetails(map);
		CtrTestItems ti = testItemDao.queryTestItemToID(Long.parseLong(groupItemid));
		//添加删除日志
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(ctrTestGroupDetails);
		DictLogs log = op.ToDictLog(user);
		log.setFunctionDesc(Constant.OPERATION_DETELE + "-组合项目-检验项目");
		if(ti != null){
			log.setSummary("[" + ti.getCodeNo() + "]" + ti.getName());
		}
		//手动判断删除项目的类型
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * @throws Exception 
	 * @Title: delSingleItemBatch 
	 * @Description: TODO(批量删除组合中的项目) 
	 * @param testItemid
	 * @param groupItemid
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELETE_SINGLEITEM_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String delSingleItemBatch(@RequestParam(value = "testItemid", required = true) String testItemid, 
			@RequestParam(value = "groupItemid", required = true) String groupItemid,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception{
		//userJSON串转换成User对象
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		String [] testItemids = null;
		if(testItemid != null && testItemid != ""){
			//截取项目ID
//			testItemid = testItemid.substring(0, testItemid.length()-1);
			testItemids = testItemid.split(",");
		}
		//循环删除
		if(testItemids != null){
			for(String testId : testItemids){
				//删除组合与单项的关系
				QueryDto dto = new QueryDto();
				Map<String, Object> map = new HashMap<String, Object>();
				dto.setGroupID(Long.parseLong(groupItemid));
				dto.setTestitemId(Long.parseLong(testId));
				map.put("queryDto", dto);
				//查询出删除前的旧数据
				CtrTestGroupDetails ctrTestGroupDetails = testItemGroupDao.queryTestGroupDetail(map);
				//删除数据
				testItemGroupDao.deleteTestGroupDetails(map);
				CtrTestItems ti = testItemDao.queryTestItemToID(Long.parseLong(groupItemid));
				
			
				//添加删除日志
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(ctrTestGroupDetails);
				DictLogs log = op.ToDictLog(user);
				log.setFunctionDesc(Constant.OPERATION_DETELE + "-组合项目-检验项目");
				if(ti != null){
					log.setSummary("[" + ti.getCodeNo() + "]" + ti.getName());
				}
				//删除项目日志
				this.dictLogsService.createDictLogs(log);
			}
		}
		return Message.MSG_DEL_SUCC;
	}
	
	/**
	 * 
	 * @Title: queryByStatus 
	 * @Description: TODO(根据状态查询) 
	 * @param status
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_QUERY_BY_STATUS, method = RequestMethod.POST)
	@ResponseBody
	public String queryByStatus(@RequestParam(value = "status", required = true)String status){
		List<CtrInstruments> list = ctrInstrumentsDao.queryByStatus(status);
		return JsonUtil.DtosTojson(list);
	}
}

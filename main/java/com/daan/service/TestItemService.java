package com.daan.service;

import java.io.IOException;
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

import com.daan.dao.TestItemDao;
import com.daan.dao.TestItemGroupDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrItemProperties;
import com.daan.domain.CtrTestItems;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CrtTestItemDto;
import com.daan.dto.QueryDto;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.TestType;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.DataGrid;
import com.daan.utils.Page;

/**
 * 
 * @ClassName: TestItemServiceImpl 
 * @Description: TODO(检测项目service) 
 * @author xieruiyun
 * @date 2015年11月25日 上午10:33:20
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_TESTITEM)
public class TestItemService extends AbstractService {
	
	@Autowired
	private TestItemDao testItemDao;
	@Autowired
	private DictLogsService dictLogsService;
	@Autowired
	private TestItemGroupDao testItemGroupDao;
	/**
	 * 
	 * @Title: findByTestItemSex 
	 * @Description: TODO(查询基础字典) 
	 * @return String
	 * @param typeKey 字典类型
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_FINFBYDICTCODE, method = RequestMethod.GET)
	@ResponseBody
	public String findByDictCode(@RequestParam(value = "typeKey", required = true) String typeKey) {
		//Map<String, Object> map = new HashMap<String, Object>();
		//map.put("typeKey", typeKey);
		List<CtrDictCodes> list = testItemDao.findByDictCode(typeKey);
		return JsonUtil.DtosTojson(list);
	}
	
	/**
	 * 
	 * @Title: pageQueryTestItems 
	 * @Description: TODO(查询检测项目信息) 
	 * @param searchStr
	 * @param status
	 * @param disciplineId
	 * @param orderType
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_PAGEQUERYTESTITEMS, method = RequestMethod.POST)
	@ResponseBody
	public String pageQueryTestItems(QueryDto dto) {
		Map<String, Object> map = new HashMap<String, Object>();
		//把 page的json 格式转换为对象
		Page<CrtTestItemDto> page = (Page<CrtTestItemDto>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); //查询条件Dto
		map.put("page", page); //分页page对象
		Integer rowCount = this.testItemDao.queryTestItemCountForPage(map);//总记录数
		List<CtrTestItems> list = testItemDao.pageQueryTestItems(map);	
		DataGrid<CtrTestItems> dGrid = new DataGrid<CtrTestItems>();
		dGrid.setTotal(rowCount);
//		dGrid.setPages(1);
//		dGrid.setPageSize(10);	
		dGrid.setRows(list);		
		return JsonUtil.objectToJson(dGrid);
	}
	
	/**
	 * @throws Exception 
	 * @Title: insertTestItemAndItemProperties 
	 * @Description: TODO(新增检验项目信息) 
	 * @param dto
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_SAVEOREDITTESTITEM, method = RequestMethod.POST)
	@ResponseBody
	public String saveOrEditTestItem(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception{
			CrtTestItemDto dto = (CrtTestItemDto) JsonUtil.jsonToDto(dtoJson, CrtTestItemDto.class,null);
			User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
			//判断数据是否为空
			if(dto != null){
				CtrTestItems testItem = null;
				CtrItemProperties pro = null;
				//生成主键CrtTestItem表ID，CrtItemProperties的外键
				long testItemID = 0;
				//dto中的ID为空就是新增的数据反之为修改数据
				//修改数据
				if((Long.toString(dto.getId()) != null || !Long.toString(dto.getId()).equals("")) && dto.getId() > 0 && dto.getId()!=0){
					testItemID = dto.getId();
					CtrTestItems oldCtrTestItems = testItemDao.queryTestItemToID(testItemID); //旧数据
					//1、修改主表CrtTestItem表
				    testItem = this.assemblyTestItem(dto, testItemID);
					testItemDao.updateTestItem(testItem);
					//2、修改从表CrtItemProperties表
					pro = this.assemblyItemProperties(dto, testItemID);
					testItemDao.updateItemProperties(pro);
					//添加日志（修改）
					IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrTestItems);
					op.AddChangedObject(testItem);
					DictLogs log = op.ToDictLog(user);
					//自定义日志，添加组合套餐单项都是保存在CtrTestItems表中
					if(dto.getItemTypeId() == 1){
						testItem.setItemTypeName(TestType.single.getText());
					}else if(dto.getItemTypeId() == 2){
						log.setFunctionDesc(Constant.OPERATION_EDIT + "-组合项目");
						log.setModuleId(Constant.MODULEID_GROUP_TESTITEM);
						testItem.setItemTypeName(TestType.group.getText());
					}else if(dto.getItemTypeId() == 3){
						log.setFunctionDesc(Constant.OPERATION_EDIT + "-套餐项目");
						testItem.setItemTypeName(TestType.set.getText());
					}
					
					this.dictLogsService.createDictLogs(log);
				//保存数据
				}else{
					testItemID = IDCreater.nextId();
					//1、先插入主表CrtTestItem表
					testItem = this.assemblyTestItem(dto, testItemID);
					testItemDao.insertTestItem(testItem);
					//2、再插入从表CrtItemProperties表
					pro = this.assemblyItemProperties(dto, testItemID);
					testItemDao.insertItemProperties(pro);
					//添加日志（添加）
					IDictLogger op = DictLogsFactory.CreateAddNewLogger();
					op.AddChangedObject(testItem);
					DictLogs log = op.ToDictLog(user);
					if(dto.getItemTypeId() == 1){
						testItem.setItemTypeName(TestType.single.getText());
					}else if(dto.getItemTypeId() == 2){
						log.setFunctionDesc(Constant.OPERATION_ADD + "-组合项目");
						log.setModuleId(Constant.MODULEID_GROUP_TESTITEM);
						testItem.setItemTypeName(TestType.group.getText());
					}else if(dto.getItemTypeId() == 3){
						log.setFunctionDesc(Constant.OPERATION_ADD + "-套餐项目");
						testItem.setItemTypeName(TestType.set.getText());
					}
					this.dictLogsService.createDictLogs(log);
				}
			}
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: queryTestItem 
	 * @Description: TODO(根据检验项目ID查询出详细信息) 
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_QUERY_TESTITEM_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String queryTestItemToID(@RequestParam(value = "testItemId", required = true) String testItemId){
		//检验项目信息
		long id = StringUtils.isEmpty(testItemId)? 0 : Long.valueOf(testItemId);
		CtrTestItems testItemDto = testItemDao.queryTestItemToID(id);
		if(testItemDto != null){
			testItemDto.setIdString(testItemDto.getId() + "");
		}
		return JsonUtil.DtoTojson(testItemDto);
	}
	
	/**
	 * @throws Exception 
	 * 
	 * @Title: deleteTestItme 
	 * @Description: TODO(删除项目) 
	 * @param testItemId
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELETETESTIEM, method = RequestMethod.POST)
	public void deleteTestItem(@RequestParam(value = "testItemId", required = true) String testItemId,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception{
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if(testItemId != null){
			String[] ids = testItemId.split(",");
			for(String id : ids){
				CtrTestItems testitem = testItemDao.queryTestItemToID(Long.valueOf(id));
				//判断是否是删除组合项目，如果是就要删除组合所关联的所有单项关系
				if(testitem.getItemTypeId() != 1){
					//删除组合项目对应关系
					testItemGroupDao.deleteTestGroup(Long.valueOf(id));
				}
				//删除组合项目明细表
				testItemDao.deleteItemProperties(Long.valueOf(id));
				//删除组合项目表
				testItemDao.deleteTestItme(Long.valueOf(id));
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(testitem);
				DictLogs log = op.ToDictLog(user);
				//手动判断删除项目的类型
				if(testitem.getItemTypeId() == 1){
					testitem.setItemTypeName(TestType.single.getText());
				}else if(testitem.getItemTypeId() == 2){
					log.setFunctionDesc(Constant.OPERATION_DETELE + "-组合项目");
					log.setModuleId(Constant.MODULEID_GROUP_TESTITEM);
					testitem.setItemTypeName(TestType.group.getText());
				}else if(testitem.getItemTypeId() == 3){
					log.setFunctionDesc(Constant.OPERATION_DETELE + "-套餐项目");
					testitem.setItemTypeName(TestType.set.getText());
				}
				this.dictLogsService.createDictLogs(log);
			}
		}
		
	}
	
	/**
	 * @throws Exception 
	 * @Title: modifyStatus 
	 * @Description: TODO(启用停用检验项目) 
	 * @param testItemId
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_MODIFY_TESTITEM_STATUS, method = RequestMethod.POST)
	@ResponseBody
	public String modifyTestItemStatus(@RequestParam(value = "testItemId", required = true) String testItemId,
			@RequestParam(value = "type", required = true) String type, @RequestParam(value = "userJson", required = true) String userJson) throws Exception{
		long id = testItemId == null ? 0 : Long.valueOf(testItemId);
		CtrTestItems newTestItem = new CtrTestItems();//新数据
		CtrTestItems oldTestItem = new CtrTestItems();//旧数据
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		newTestItem.setId(id);
		oldTestItem = testItemDao.queryTestItemToID(Long.valueOf(id));//旧数据
		newTestItem = (CtrTestItems) oldTestItem.clone();
		String msg = "";
		//判断是停用还是启用 1 启用  0停用
		if(type != null && type.equals("1")){
			//添加日志比对
			oldTestItem.setStatus(IsAbleEnum.disable.ordinal());
			IDictLogger op = DictLogsFactory.CreateEditLogger(oldTestItem);
			newTestItem.setStatus(IsAbleEnum.enable.ordinal());
			op.AddChangedObject(newTestItem);
			DictLogs log = op.ToDictLog(user);
			//手动判断修改项目的类型 1 单项 2 组合 3 套餐
			if(oldTestItem.getItemTypeId() == 1){
				oldTestItem.setItemTypeName(TestType.single.getText());
			}else if(oldTestItem.getItemTypeId() == 2){
				log.setFunctionDesc(Constant.OPERATION_EDIT + "-组合项目");
				log.setModuleId(Constant.MODULEID_GROUP_TESTITEM);
				oldTestItem.setItemTypeName(TestType.group.getText());
			}else if(oldTestItem.getItemTypeId() == 3){
				log.setFunctionDesc(Constant.OPERATION_EDIT + "-套餐项目");
				oldTestItem.setItemTypeName(TestType.set.getText());
			}
			this.dictLogsService.createDictLogs(log);
			msg = Message.MSG_TESTITEM_STATUS_USING;
		}else{
			oldTestItem.setStatus(IsAbleEnum.enable.ordinal());
			IDictLogger op = DictLogsFactory.CreateEditLogger(oldTestItem);
			newTestItem.setStatus(IsAbleEnum.disable.ordinal());
			op.AddChangedObject(newTestItem);
			DictLogs log = op.ToDictLog(user);
			//手动判断修改项目的类型
			if(oldTestItem.getItemTypeId() == 1){
				oldTestItem.setItemTypeName(TestType.single.getText());
			}else if(oldTestItem.getItemTypeId() == 2){
				log.setFunctionDesc(Constant.OPERATION_EDIT + "-组合项目");
				log.setModuleId(Constant.MODULEID_GROUP_TESTITEM);
				oldTestItem.setItemTypeName(TestType.group.getText());
			}else if(oldTestItem.getItemTypeId() == 3){
				log.setFunctionDesc(Constant.OPERATION_EDIT + "-套餐项目");
				oldTestItem.setItemTypeName(TestType.set.getText());
			}
			this.dictLogsService.createDictLogs(log);
			msg = Message.MSG_TESTITEM_STATUS_DISAVLE;
		}
		testItemDao.modifyTestItemStatus(newTestItem);
		return msg;
	}
	
	/**
	 * 
	 * @Title: findCount 
	 * @Description: TODO(验证唯一性) 
	 * @param testItemId
	 * @param type
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_FIND_COUNT, method = RequestMethod.POST)
	@ResponseBody
	public String findCount(@RequestParam(value = "codeNo", required = true) String codeNo,
			@RequestParam(value = "testName", required = true) String testName){
		CrtTestItemDto ctiDto = new CrtTestItemDto();
		ctiDto.setCodeNo(codeNo);
		ctiDto.setName(testName);
		int count = this.testItemDao.findCount(ctiDto);
		return Message.DATA + String.valueOf(count);
	}
	
	/**
	 * @throws IOException 
	 * @throws UnsupportedEncodingException 
	 * @Title: exportTestItemExcel 
	 * @Description: TODO(查询导出数据) 
	 * @param dto void
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_EXPORT_TESTITEM_EXCEL, method = RequestMethod.POST)
	@ResponseBody
	public String exportTestItemExcel(@RequestParam(value = "dtoJson", required = true) String dtoJson) throws IOException{
		QueryDto dto = (QueryDto) JsonUtil.jsonToDto(dtoJson, QueryDto.class,null);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto); //查询条件Dto
	    //填充projects数据
	    List<CtrTestItems> ctrTestItems = testItemDao.queryTestItem(map);
	    return JsonUtil.DtosTojson(ctrTestItems);
	}
	
	/**
	 * @Title: assemblyTestItem 
	 * @Description: TODO(组装CtrTestItems) 
	 * @return String
	 * @throws
	 */
	private CtrTestItems assemblyTestItem(CrtTestItemDto dto,long testItemID){
		CtrTestItems testItem = new CtrTestItems();
		testItem.setId(testItemID);
		testItem.setItemTypeId(dto.getItemTypeId());
		testItem.setCodeNo(dto.getCodeNo());
		testItem.setName(dto.getName());
		testItem.setEnName(dto.getEnName());
		testItem.setEnShortName(dto.getEnShortName());
		testItem.setSexId(dto.getSexId());
		testItem.setTestMethodId(dto.getTestMethodId());
		testItem.setSampleTypeId(dto.getSampleTypeId());
		testItem.setDisplayOrder(dto.getDisplayOrder());
		testItem.setDisciplineName(dto.getDisciplineName());
		testItem.setTestMethodName(dto.getTestMethodName());
		testItem.setSampleTypeName(dto.getSampleTypeName());
		testItem.setUnit(dto.getUnit());
		testItem.setMemo(dto.getMemo());
		testItem.setStatus(dto.getStatus());
		testItem.setResultPrecision(dto.getResultPrecision());
		testItem.setFastCode(dto.getFastCode());
		testItem.setStdCode(dto.getStdCode());
		testItem.setResultTypeName(dto.getResultTypeName());
		testItem.setRefMethod(dto.getRefMethod());
		if(dto.getItemTypeId() == 1){
			testItem.setItemTypeName(TestType.single.getText());
		}else if(dto.getItemTypeId() == 2){
			testItem.setItemTypeName(TestType.group.getText());
			testItem.setIsIndividualStat(dto.getIsIndividualStat());
		}else if(dto.getItemTypeId() == 3){
			testItem.setItemTypeName(TestType.set.getText());
			testItem.setIsIndividualStat(dto.getIsIndividualStat());
		}
		return testItem;
	}

	/**
	 * @Title: assemblyTestItem 
	 * @Description: TODO(组装CtrItemProperties) 
	 * @return String
	 * @throws
	 */
	private CtrItemProperties assemblyItemProperties(CrtTestItemDto dto,long testItemID){
		CtrItemProperties properties = new CtrItemProperties();
		properties.setTestItemId(testItemID);
		properties.setDisciplineId(dto.getDisciplineId());
		properties.setRefMethod(dto.getRefMethod());
		properties.setUnit(dto.getUnit());
		properties.setResultTypeId(dto.getResultTypeId());
		properties.setFastCode(dto.getFastCode());
		properties.setResultPrecision(dto.getResultPrecision());
		properties.setStdCode(dto.getStdCode());
		properties.setIsFreeze(dto.getIsFreeze());
		return properties;
	}

}

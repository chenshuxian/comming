package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.ItemProperties;
import com.daan.domain.TestItems;
import com.daan.dto.TestItemsDto;

/**
 * 
 * @ClassName: TestItemsDao 
 * @Description: TODO(本地项目库-检测项目Dao接口) 
 * @author zhangliping
 * @date 2016年1月11日 上午11:11:46
 */
public interface TestItemsDao {
	
	/**
	 * 
	 * @Title: queryTestItemCountForPage 
	 * @Description: TODO(分页的总行数) 
	 * @param map
	 * @return int
	 * @throws
	 */
	public int queryTestItemsCountForPage(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: pageQueryTestItems 
	 * @Description: TODO(查询项目信息) 
	 * @param map
	 * @return List<TestItems>
	 * @throws
	 */
	public List<TestItemsDto> pageQueryTestItems(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryTestItemsByStatus 
	 * @Description: TODO(查询可用的项目) 
	 * @param status
	 * @return List<TestItemsDto>
	 * @throws
	 */
	public List<TestItemsDto> queryTestItemsByStatus(String status);
	
	/**
	 * 
	 * @Title: queryTestItemsIfExist 
	 * @Description: TODO(判断是否有相同的本地项目数据) 
	 * @param map
	 * @return List<TestItems>
	 * @throws
	 */
	public List<TestItems> queryTestItemsIfExist(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryCtrTestItems 
	 * @Description: TODO(查询中心检测项目) 
	 * @param map
	 * @return List<TestItemsDto>
	 * @throws
	 */
	public List<TestItemsDto> queryCtrTestItems(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryRelatedInstruments 
	 * @Description: TODO(查询关联仪器List) 
	 * @param map
	 * @return List<TestItemsDto>
	 * @throws
	 */
	public List<TestItemsDto> queryRelatedInstruments(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryTestItemByID 
	 * @Description: TODO(这里用一句话描述这个方法的作用) 
	 * @param id
	 * @return TestItems
	 * @throws
	 */
	public TestItemsDto queryTestItemByID(long id);
	
	/**
	 * 
	 * @Title: insertTestItem 
	 * @Description: TODO(插入检测项目记录最基本的项目内容) 
	 * @param cti
	 * @return int
	 * @throws
	 */
	public int insertTestItems(TestItems cti);
	
	/**
	 * 
	 * @Title: insertItemProperties 
	 * @Description: TODO(新增中心项目扩展属性表 — 记录项目、套餐、组合其他的非开单属性) 
	 * @param cp
	 * @return int
	 * @throws
	 */
	public int insertItemProperties(ItemProperties cp);
	
	/**
	 * 
	 * @Title: deleteTestItem 
	 * @Description: TODO(删除TestItme) 
	 * @param id
	 * @return int
	 * @throws
	 */
	public int deleteTestItem(long id);
	
	/**
	 * 
	 * @Title: deleteItemProperties 
	 * @Description: TODO(删除ItemProperties) 
	 * @param id
	 * @return int
	 * @throws
	 */
	public int deleteItemProperties(long id);
	
	/**
	 * 启用或者停用状态
	 * @param map
	 * @return
	 */
	public void updateTestItemsStatus(Map<String, String> map); 
	
	/**
	 * 
	 * @Title: updateTestItem 
	 * @Description: TODO(修改检测项目记录最基本的项目内容) 
	 * @param cti
	 * @return int
	 * @throws
	 */
	public int updateTestItem(TestItems cti);
	
	/**
	 * 
	 * @Title: updateItemProperties 
	 * @Description: TODO(修改中心项目扩展属性表 — 记录项目、套餐、组合其他的非开单属性) 
	 * @param cp
	 * @return int
	 * @throws
	 */
	public int updateItemProperties(ItemProperties cp);
	
	/**
	 * 
	 * @Title: queryTestItemsList 
	 * @Description: 根据组织查询检验项目列表
	 * @param map
	 * @return List<TestItems>
	 * @throws
	 */
	public List<TestItems> queryTestItemsList(Map<String, String> map);
	
	/**
	 * 
	 * @Title: queryCtrTestItemsPageCount 
	 * @Description: TODO(查询中心字典库项目的页数) 
	 * @param map
	 * @return int
	 * @throws
	 */
	public int queryCtrTestItemsPageCount(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryCtrTestItemsPage 
	 * @Description: TODO(查询中心字典库的可用项目) 
	 * @param map
	 * @return List<TestItemsDto>
	 * @throws
	 */
	public List<TestItemsDto> queryCtrTestItemsPage(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: updateFormulaDescribe 
	 * @Description: TODO(更新项目的计算公式)  void
	 * @throws
	 */
	public void updateFormulaDescribe(Map<String, Object> map);
	
}

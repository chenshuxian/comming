package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrItemProperties;
import com.daan.domain.CtrTestItems;
import com.daan.dto.CrtTestItemDto;

public interface TestItemDao {

	/**
	 * @Title: findByTestItemSex 
	 * @Description: TODO(查询可用项目性别) 
	 * @return List<Bictionary>
	 * @throws
	 */
	public List<CtrDictCodes> findByDictCode(String typeKey);
	
	/**
	 * 
	 * @Title: insertTestItem 
	 * @Description: TODO(插入检测项目记录最基本的项目内容) 
	 * @param cti
	 * @return int
	 * @throws
	 */
	public int insertTestItem(CtrTestItems cti);
	
	/**
	 * 
	 * @Title: insertItemProperties 
	 * @Description: TODO(新增中心项目扩展属性表 — 记录项目、套餐、组合其他的非开单属性) 
	 * @param cp
	 * @return int
	 * @throws
	 */
	public int insertItemProperties(CtrItemProperties cp);
	
	/**
	 * 
	 * @Title: updateTestItem 
	 * @Description: TODO(修改检测项目记录最基本的项目内容) 
	 * @param cti
	 * @return int
	 * @throws
	 */
	public int updateTestItem(CtrTestItems cti);
	
	/**
	 * 
	 * @Title: updateItemProperties 
	 * @Description: TODO(修改中心项目扩展属性表 — 记录项目、套餐、组合其他的非开单属性) 
	 * @param cp
	 * @return int
	 * @throws
	 */
	public int updateItemProperties(CtrItemProperties cp);
	
	/**
	 * 
	 * @Title: pageQueryTestItems 
	 * @Description: TODO(查询项目信息) 
	 * @param map
	 * @return List<CtrTestItems>
	 * @throws
	 */
	public List<CtrTestItems> pageQueryTestItems(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryTestItemCountForPage 
	 * @Description: TODO(分页的总行数) 
	 * @param map
	 * @return int
	 * @throws
	 */
	public int queryTestItemCountForPage(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryTestItem 
	 * @Description: TODO(根据检验项目的ID查询详细信息) 
	 * @param id
	 * @return CrtTestItemDto
	 * @throws
	 */
	public CtrTestItems queryTestItemToID(long id);
	
	/**
	 * 
	 * @Title: deleteTestItme 
	 * @Description: TODO(删除TestItme) 
	 * @param id
	 * @return int
	 * @throws
	 */
	public int deleteTestItme(long id);
	
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
	 * 
	 * @Title: modifyTestItemStatus 
	 * @Description: TODO(启用停用检验项目) 
	 * @param cti
	 * @return int
	 * @throws
	 */
	public int modifyTestItemStatus(CtrTestItems cti);
	
	/**
	 * 
	 * @Title: findCount 
	 * @Description: TODO(字段唯一性) 
	 * @param cti
	 * @return int
	 * @throws
	 */
	public int findCount(CrtTestItemDto ctiDto);
	
	/**
	 * 
	 * @Title: findTestItemStatus 
	 * @Description: TODO(查询项目的状态0 启用 1停用) 
	 * @param id
	 * @return int
	 * @throws
	 */
	public int findTestItemStatus(long id);
	
	/**
	 *  
	 * @Title: queryTestItem 
	 * @Description: TODO(查询项目信息) 
	 * @param map
	 * @return List<CrtTestItemDto>
	 * @throws
	 */
	public List<CtrTestItems> queryTestItem(Map<String, Object> map);
}

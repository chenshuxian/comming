package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrTestGroupDetails;
import com.daan.domain.CtrTestItems;
import com.daan.dto.QueryDto;

/**
 * 
 * @ClassName: TestItemGroupDao 
 * @Description: TODO(组合项目DAO) 
 * @author xieruiyun
 * @date 2015年12月8日 下午5:46:02
 */
public interface TestItemGroupDao {
	
	/**
	 * 
	 * @Title: queryTestItem 
	 * @Description: TODO(根据检验项目的ID查询详细信息) 
	 * @param id
	 * @return CrtTestItemDto
	 * @throws
	 */
	public CtrTestItems queryTestItemGroup(CtrTestItems cti);
	
	/**
	 * 
	 * @Title: queryTestItemGroupList 
	 * @Description: TODO(查询出全部的组合项目) 
	 * @param map
	 * @return List<CtrTestItems>
	 * @throws
	 */
	public List<CtrTestItems> queryTestItemGroupList(Map<String,Object> map);
	
	/**
	 * 
	 * @Title: querySingleItemList 
	 * @Description: TODO(查询组合包含的项目) 
	 * @param testItemId
	 * @return List<CtrTestItems>
	 * @throws
	 */
	public List<CtrTestItems> querySingleItemList(String testItemId);
	
	/**
	 * 
	 * @Title: querySingleItemNotContainList 
	 * @Description: TODO(查询组合未包含的项目) 
	 * @param map
	 * @return List<CtrTestItems>
	 * @throws
	 */
	public List<CtrTestItems> querySingleItemNotContainList(Map<String,Object> map);
	
	/**
	 * 
	 * @Title: fingTestGroupDetailIdCount 
	 * @Description: TODO(检查组合是否已经保存到了ctr_test_group_details表中) 
	 * @param testItemId
	 * @return int
	 * @throws
	 */
	public int fingTestGroupDetailIdCount(String testItemId);
	
	/**
	 * 
	 * @Title: insrtTestGroupDetail 
	 * @Description: TODO(insert ctr_test_group_details) 
	 * @param ctgd void
	 * @throws
	 */
	public void insrtTestGroupDetail(CtrTestGroupDetails ctgd);
	
	/**
	 * 
	 * @Title: deleteTestGroupDetails 
	 * @Description: TODO(删除组合与单项的关系) 
	 * @param groupId 组合Id
	 * @param itemId void 单项Id
	 * @throws
	 */
	public void deleteTestGroupDetails(Map<String,Object> map);
	
	/**
	 * 
	 * @Title: queryTestGroupDetail 
	 * @Description: TODO(查询组合明细表(套餐明细也保存在此表中)) 
	 * @param groupId
	 * @param testItemId
	 * @return CtrTestGroupDetails
	 * @throws
	 */
	public CtrTestGroupDetails queryTestGroupDetail(Map<String,Object> map);
	
	/**
	 * 
	 * @Title: deleteTestGroup 
	 * @Description: TODO(删除组合项目后，组合所对应的单项关系也一一删除) 
	 * @param groupID void
	 * @throws
	 */
	public void deleteTestGroup(long groupID);
}

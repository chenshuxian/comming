package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.MicsItems;

/**
 * 
 * @ClassName: TestItemsDao 
 * @Description: 本地微生物Dao
 * @author zhoujie
 * @date 2016年01月16日
 */
public interface MicsItemsDao {
	
	/**
	 * 
	 * @Title: queryTestItemsList 
	 * 
	 * @Description: 根据组织机构查询微生物列表
	 * @param map
	 * @return List<TestItems>
	 * @throws
	 */
	public List<MicsItems> queryMicsItemsList(Map<String, String> map);
}

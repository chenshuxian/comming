package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.daan.domain.CentreMicrobeItem;
import com.daan.domain.CtrDictCodes;

/**
 * 
 * @ClassName: CentreMicrobeItemDao 
 * @Description: 中心微生物字典表Dao
 * @author liujiawei
 * @date 2015年12月10日 下午7:40:49
 */
public interface CentreMicrobeItemDao {
	
	/**
	 * 
	 * @Title: getCentreMicrobeitemDetailById 
	 * @Description: 通过id查找单条记录
	 * @param id 
	 * @return CentreMicrobeItem
	 * @author liujiawei
	 * @date 2015年12月15日 上午10:55:19
	 */
	public CentreMicrobeItem getCentreMicrobeitemDetailById(String id);
	
	/**
	 * 
	 * @Title: addCentreMicrobeItem 
	 * @Description: 添加一条中心微生物字典记录
	 * @param centreMicrobeItem
	 * @return int
	 * @author liujiawei
	 * @date 2015年12月15日 上午10:57:24
	 */
	public int addCentreMicrobeItem(CentreMicrobeItem centreMicrobeItem);
	
	/**
	 * 
	 * @Title: modifyCentreMicrobeItem 
	 * @Description: 修改一条中心微生物字典记录
	 * @param centreMicrobeItem
	 * @return int
	 * @author liujiawei
	 * @date 2015年12月15日 上午10:58:15
	 */
	public int modifyCentreMicrobeItem(CentreMicrobeItem centreMicrobeItem);
	
	/**
	 * 
	 * @Title: deleteCentreMicrobeitem 
	 * @Description: 修改一条中心微生物字典记录
	 * @param id
	 * @return int
	 * @author liujiawei
	 * @date 2015年12月15日 上午11:07:11
	 */
	public int deleteCentreMicrobeitem(String id);
	
	/**
	 * 
	 * @Title: getCentreMicrobeItemsByName 
	 * @Description: 通过名字查找记录
	 * @param params 传入name和itemTypeId
	 * @return List<CentreMicrobeItem>
	 * @author liujiawei
	 * @date 2015年12月15日 上午11:11:40
	 */
	public List<CentreMicrobeItem> getCentreMicrobeItemsByName(Map<String, String> params); 
	
	/**
	 * 
	 * @Title: countCentreMicrobeItemByConditions 
	 * @Description: 统计当前条件下记录条数
	 * @param params 传入queryDto对象和page对象
	 * @return int
	 * @author liujiawei
	 * @date 2015年12月15日 上午11:13:48
	 */
	public int countCentreMicrobeItemByConditions(Map<String, Object> params); 

	/**
	 * 
	 * @Title: getCentreMicrobeitemsPageListByConditions 
	 * @Description: 根据条件获取记录集合
	 * @param params 传入queryDto对象和page对象
	 * @return List<CentreMicrobeItem>
	 * @author liujiawei
	 * @date 2015年12月15日 上午11:14:39
	 */
	public List<CentreMicrobeItem> getCentreMicrobeitemsPageListByConditions(Map<String, Object> params); 
}

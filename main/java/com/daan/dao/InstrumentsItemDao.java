package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.InstrItems;
import com.daan.domain.InstrumentsItems;
/**
 * 
 * @ClassName: InstrumentsItemDao 
 * @Description: TODO(客户仪器对DAO) 
 * @author xieruiyun
 * @date 2015年12月16日 下午7:08:34
 */
public interface InstrumentsItemDao {
	
	/**
	 * 
	 * @Title: queryInstrumentsItemList 
	 * @Description: TODO(查询仪器包含的项目) 
	 * @param map
	 * @return List<InstrItems>
	 * @throws
	 */
	public List<InstrItems> queryInstrumentsItemList(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryInstrumentsItemNotContainList 
	 * @Description: TODO(查询仪器未包含的项目) 
	 * @param map
	 * @return List<InstrItems>
	 * @throws
	 */
	public List<InstrItems> queryInstrumentsItemNotContainList(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: queryInstrItemConditions 
	 * @Description: TODO(根据项目ID，机构ID，仪器ID查询出仪器对应项目信息) 
	 * @param map
	 * @return List<InstrItems>
	 * @throws
	 */
	public List<InstrItems> queryInstrItemConditions(Map<String, Object> map);
	
	/**
	 * 
	 * @Title: deleteInstrItem 
	 * @Description: TODO(根据ID删除仪器对应项目关系) 
	 * @param Id void
	 * @throws
	 */
	public void deleteInstrItem(String Id);
	
	/**
	 * 新增项目对照
	 * @return
	 */
	public void insertInstrumentsItem(InstrumentsItems dto); 
	
}

package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrInstrumentsItems;
import com.daan.domain.CtrInstrumentsRefranges;
import com.daan.domain.CtrTestItems;
import com.daan.dto.CtrInstrumentsItemDto;

/**
 * @ClassName: CtrInstrumentsItemDao 
 * @Description: 中心仪器项目对照dao
 * @author zhoujie
 * @date 2015年12月14日 上午00:30:26
 */
public interface CtrInstrumentsItemDao {

	/**
	 * 根据条件查找记录
	 * 
	 * @param map
	 * @return
	 */
	public List<CtrInstrumentsItemDto> queryListByConditions(Map<String, Object> map);
	
	/**
	 * 根据条件查找记录
	 * 
	 * @param map
	 * @return
	 */
	public List<CtrInstrumentsRefranges> queryRefListByConditions(Map<String, Object> map);
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public CtrInstrumentsRefranges findRefrangesById(String id); 
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public CtrInstrumentsItems findById(String id); 
	
	/**
	 * 根据id集合查询列表
	 * 
	 * @param ids
	 * @return
	 */
	public List<CtrInstrumentsItems> findByIds(List<String> ids);
	
	/**
	 * 删除项目对照
	 * @return
	 */
	public void deleteById(String id); 
	
	/**
	 * 新增项目对照
	 * @return
	 */
	public void insertCtrInstrumentsItem(CtrInstrumentsItems dto); 
	
	
	/**
	 * 修改项目对照表
	 * @return
	 */
	public void updateCtrInstrumentsItem(CtrInstrumentsItems dto); 
	
	/**
	 * 新增参考值
	 * @return
	 */
	public void insertCtrInstrumentsRefranges(CtrInstrumentsRefranges dto); 
	
	/**
	 * 修改参考值
	 * @return
	 */
	public void updateCtrInstrumentsRefranges(CtrInstrumentsRefranges dto); 
	
	/**
	 * 删除参考值
	 * @return
	 */
	public void deleteRefrangesById(String id); 
	
	/**
	 * 根据仪器id，查询已包含项目列表
	 * 
	 * @param ids
	 * @return
	 */
	public List<CtrTestItems> queryContainItemByInstrumentId(String id); 
	
	/**
	 * 根据仪器id，查询未包含项目列表
	 * 
	 * @param ids
	 * @return
	 */
	public List<CtrTestItems> queryUnContainItemByConditions(Map<String, Object> map);
}

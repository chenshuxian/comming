package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrInstrumentsMics;
import com.daan.domain.CtrMicsItems;
import com.daan.dto.CtrInstrumentsMicsDto;

/**
 * @ClassName: CtrInstrumentsMicsDao 
 * @Description: 中心仪器微生物对照dao
 * @author zhoujie
 * @date 2015年12月16日 上午00:30:26
 */
public interface CtrInstrumentsMicsDao {

	/**
	 * 根据条件查找记录
	 * 
	 * @param map
	 * @return
	 */
	public List<CtrInstrumentsMicsDto> queryListByConditions(Map<String, Object> map);
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public CtrInstrumentsMics findById(String id); 
	
	/**
	 * 根据id集合查询列表
	 * 
	 * @param ids
	 * @return
	 */
	public List<CtrInstrumentsMics> findByIds(List<String> ids);
	
	/**
	 * 删除微生物对照
	 * @return
	 */
	public void deleteById(String id); 
	
	/**
	 * 新增微生物对照
	 * @return
	 */
	public void insertCtrInstrumentsMics(CtrInstrumentsMics dto); 
	
	
	/**
	 * 修改微生物对照表
	 * @return
	 */
	public void updateCtrInstrumentsMics(CtrInstrumentsMics dto); 
		
	/**
	 * 根据仪器id，查询已包含微生物列表
	 * 
	 * @param ids
	 * @return
	 */
	public List<CtrMicsItems> queryContainByConditions(Map<String, Object> map);
		
	/**
	 * 根据仪器id，查询未包含微生物列表
	 * 
	 * @param ids
	 * @return
	 */
	public List<CtrMicsItems> queryUnContainByConditions(Map<String, Object> map);
	
}

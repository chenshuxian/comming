package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrInstrumentsParams;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrReportTemplates;
import com.daan.domain.Instruments;
/**
 * @ClassName: CtrInstrumentsDao 
 * @Description: TODO(中心仪器dao) 
 * @author zhoujie
 * @date 2015年11月26日 下午20:06:01
 */
public interface CtrInstrumentsDao {

	/**
	 * 根据条件查找中心仪器列表条数
	 * @param dto
	 * @return
	 */
	public Integer queryCountByConditions(Map<String, Object> map); 
	
	/**
	 * 根据条件查找中心仪器列表
	 * @param dto
	 * @return
	 */
	public List<CtrInstruments> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public CtrInstruments findById(String id); 
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public CtrInstrumentsParams findParamsById(String instrumentId); 
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public List<CtrInstruments> findByName(String name); 
	
	
	/**
	 * 查找中心报告模板列表
	 * @return
	 */
	public List<CtrReportTemplates> getAllReportTemplatesList(); 
	/**
	 * 查找中心报告模板
	 * @return
	 */
	public CtrReportTemplates getReportTemplatesById(String id); 
	
		
	/**
	 * 新增中心仪器
	 * @return
	 */
	public void insertCtrInstruments(CtrInstruments dto); 
	
	/**
	 * 新增中心仪器通讯参数
	 * @return
	 */
	public void insertCtrInstrumentsParams(CtrInstrumentsParams dto); 
	
	/**
	 * 修改中心仪器
	 * @return
	 */
	public void updateCtrInstruments(CtrInstruments dto); 
	
	/**
	 * 修改中心仪器通讯参数
	 * @return
	 */
	public void updateCtrInstrumentsParams(CtrInstrumentsParams dto); 
	
	/**
	 * 启用中心仪器
	 * @return
	 */
	public void enableById(String id); 
	
	/**
	 * 停用中心仪器
	 * @return
	 */
	public void disableById(String id); 
	
	/**
	 * 删除中心仪器
	 * @return
	 */
	public void deleteById(String id); 
	
	/**
	 * 删除中心仪器通讯参数
	 * @return
	 */
	public void deleteParamsById(String instrumentId); 
	
	/**
	 * 
	 * @Title: queryByStatus 
	 * @Description: TODO(根据状态查询) 
	 * @param status
	 * @return List<CtrInstruments>
	 * @throws
	 */
	public List<CtrInstruments> queryByStatus(String status);
	

	/**
	 * 
	* @Title: modifyCtrTubeTypes 
	* @Description: TODO(修改) 
	* @param @param CtrTubeTypes
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyInstruments(CtrInstruments CtrInstruments);
	
}

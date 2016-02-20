package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrInstrumentsItems;
import com.daan.domain.CtrInstrumentsMics;
import com.daan.domain.CtrInstrumentsRefranges;
import com.daan.domain.InstrBoxs;
import com.daan.domain.InstrParams;
import com.daan.domain.Instruments;
import com.daan.domain.ReportTemplates;

public interface LocalInstrumentsDao {

	/**
	 * 根据条件查找仪器列表条数
	 * 
	 * @param map
	 * @return Integer
	 */
	public Integer queryCountByConditions(Map<String, Object> map);

	/**
	 * 根据条件查找仪器列表
	 * 
	 * @param map
	 * @return List<Instruments>
	 */
	public List<Instruments> queryPageListByConditions(Map<String, Object> map);

	/**
	 * 查找报告模板列表
	 * @return
	 */
	public List<ReportTemplates> getRtListByConditions(Map<String, String> map);
	
	/**
	 * 查找盒子条码列表
	 * @return
	 */
	public List<InstrBoxs> getBbListByConditions(Map<String, String> map);
	
	/**
	 * 查找虚拟仪器列表
	 * @return
	 */
	public List<Instruments> getViListByConditions(Map<String, String> map);
	
	/**
	 * 根据条件查找记录
	 * @param id
	 * @return
	 */
	public List<Instruments> queryListByConditions(Map<String, String> map);
	
	/**
	 * 根据id查找记录
	 * @param id
	 * @return
	 */
	public Instruments findById(String id);
	
	/**
	 * 新增仪器信息
	 * @return
	 */
	public void insertInstruments(Instruments dto); 
	
	/**
	 * 新增仪器通讯参数
	 * @return
	 */
	public void insertInstrParams(InstrParams dto); 
	
	/**
	 * 修改仪器信息
	 * @return
	 */
	public void updateInstruments(Instruments dto); 
	
	/**
	 * 修改仪器通讯参数
	 * @return
	 */
	public void updateInstrParams(InstrParams dto); 
	
	/**
	 * 修改仪器状态
	 * @return
	 */
	public void updateStatus(Map<String, String> map);
	
	/**
	 * 根据id删除记录
	 * @param id
	 * @return
	 */
	public void deleteById(String id);
	
	/**
	 * 根据id删除通讯参数记录
	 * @param id
	 * @return
	 */
	public void deleteParamsById(String instrumentId);
	
	/**
	 * 根据id查找通讯参数记录
	 * @param id
	 * @return
	 */
	public InstrParams findParamsById(String instrumentId);


	/*
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 * -------------- 以下是中心仪器库SQL --------------------
	 */
	
	/**
	 * 根据条件查找仪器列表条数
	 * 
	 * @param map
	 * @return Integer
	 */
	public Integer queryCtrCountByConditions(Map<String, Object> map);

	/**
	 * 根据条件查找仪器列表
	 * 
	 * @param map
	 * @return List<CtrInstruments>
	 */
	public List<CtrInstruments> queryCtrPageListByConditions(Map<String, Object> map);

	/**
	 * 根据id查找中心仪器
	 * @param id
	 * @return
	 */
	public CtrInstruments findCtrById(String id);
	
	/**
	 * 根据中心仪器ID查找仪器项目列表
	 * 
	 * @param map
	 * @return List<CtrInstrumentsItems>
	 */
	public List<CtrInstrumentsItems> queryCtrItemListById(String instrumentId);

	/**
	 * 根据中心仪器ID查找仪器抗生素列表
	 * 
	 * @param map
	 * @return List<CtrInstrumentsMics>
	 */
	public List<CtrInstrumentsMics> queryCtrMicsListById(String instrumentId);

	
	
	/**
	 * 复制到本地仪器报告模板
	 * 
	 * @param map
	 */
	public void copy2LocReportTemplates(Map<String, String> map);
	/**
	 * 复制到本地仪器
	 * 
	 * @param map
	 */
	public void copy2LocInstruments(Map<String, String> map);
	/**
	 * 复制到本地仪器参数
	 * 
	 * @param map
	 */
	public void copy2LocInstrParams(Map<String, String> map);
	/**
	 * 复制到本地基础字典
	 * 
	 * @param map
	 */
	public void copy2LocDictCodes(Map<String, String> map);
	/**
	 * 复制到本地项目
	 * 
	 * @param map
	 */
	public void copy2LocTestItems(Map<String, String> map);
	/**
	 * 复制到本地微生物
	 * 
	 * @param map
	 */
	public void copy2LocMicsItems(Map<String, String> map);
	/**
	 * 复制到本地项目参考值
	 * 
	 * @param map
	 */
	public void copy2LocInstrRefranges(Map<String, String> map);
}

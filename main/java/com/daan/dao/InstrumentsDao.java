package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrReportTemplates;
import com.daan.domain.CtrTubeTypes;
import com.daan.domain.InstrItems;
import com.daan.domain.InstrMics;
import com.daan.domain.InstrParams;
import com.daan.domain.InstrRefranges;
import com.daan.domain.Instruments;
import com.daan.domain.Orgs;
/**
 * @ClassName: InstrumentsDao 
 * @DescriptioCtrLoinco) 
 * @author xiaobing
 * @date 2015年12月07日 下午20:06:01
 */
public interface InstrumentsDao {
	
	/**
	 * 根据条件查找客户仪器信息列表条数
	 * @param dto
	 * @return Integer
	 */
	public Integer queryCountByInstruments(Map<String, Object> map); 
	
	/**
	 * 根据条件查找客户仪器信息列表
	 * @param dto
	 * @return List<Instruments>
	 */
	public List<Instruments> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return Instruments
	 */
	public Instruments findById(String id); 
	
	/**
	 * 根据ID查找仪器参数记录
	 * @param id
	 * @return
	 */
	public InstrParams findParamsById(String instrumentId); 
	
	/**
	 * 根据ID查找仪器关联项目记录
	 * @param id
	 * @return
	 */
	public List<InstrItems> findInstrItemsById(String instrumentId); 
	
	/**
	 * 根据ID查找微生物的细菌、抗生素仪器通道记录
	 * @param id
	 * @return
	 */
	public List<InstrMics> findInstrMicsById(String instrumentId); 
	
	/**
	 * 根据ID查找本地仪器常规项目参考值对应记录
	 * @param id
	 * @return
	 */
	public List<InstrRefranges> findInstrRefrangesById(String instrumentId); 
	
	/**
	 * 根据name查找记录
	 * @param name
	 * @return List<Instruments>
	 */
	public List<Instruments> findByName(String name); 
	
	/**
	 * 查找模板类型
	 * @param typeKey
	 * @return List<CtrDictCodes>
	 */
	public List<CtrReportTemplates> getAllReportTemplates(String typeKey); 
	
	/**
	 * 查找盒子条码LIST
	 * @param 
	 * @return List<InstrParams>
	 */
	public List<InstrParams> getAllInstrBoxsList(); 
	
	/**
	 * 查询仪器对应项目LIST
	 * @param 
	 * @return List<InstrItems>
	 */
	public List<InstrItems> getInstrItemsListById(String instrumentId); 
	
	/**
	 * 查询仪器对应细菌或抗生素LIST
	 * @param 
	 * @return List<InstrMics>
	 */
	public List<InstrItems> getInstrMicsListById(Map<String, Object> map); 
	
	/**
	 * 查找虚拟仪器LIST
	 * @param 
	 * @return List<CtrDictCodes>
	 */
	public List<Instruments> getAllInstrumentsList(); 
	
	/**
	 * 新增客户仪器信息
	 * @param dto
	 * @return 
	 */
	public void insertInstruments(Instruments dto); 
	
	/**
	 * 新增仪器通讯参参数
	 * @return
	 */
	public void insertInstrParams(InstrParams dto); 
	
	/**
	 * 复制新增仪器通讯参参数
	 * @return
	 */
	public void insertInstrAllParams(InstrParams dto); 
	
	/**
	 * 复制新增仪器关联项目
	 * @return
	 */
	public void insertInstrAllItems(InstrItems dto); 
	
	/**
	 * 复制新增微生物的细菌、抗生素仪器通道
	 * @return
	 */
	public void insertInstrAllMics(InstrMics dto); 
	
	/**
	 * 复制新增本地仪器常规项目参考值对应
	 * @return
	 */
	public void insertIRefranges(InstrRefranges dto); 
	
	/**
	 * 修改客户仪器信息
	 * @return
	 */
	public void updateInstruments(Instruments dto); 
	
	/**
	 * 修改中心仪器通讯参数
	 * @return
	 */
	public void updateInstrumentsParams(InstrParams dto); 
	
	/**
	 * 启用客户仪器信息
	 * @return
	 */
	public void enableById(String id); 
	
	/**
	 * 停用客户仪器信息
	 * @return
	 */
	public void disableById(String id); 
	
	/**
	 * 删除客户仪器信息
	 * @return
	 */
	public void deleteById(String id); 
	
	/**
	 * 删除仪器参数信息
	 * @return
	 */
	public void deleteParamsById(String id); 
	
	/**
	 * 删除仪器关联项目信息
	 * @return
	 */
	public void deleteInstrItemsById(String id); 
	
	/**
	 * 删除微生物的细菌、抗生素仪器通道信息
	 * @return
	 */
	public void deleteInstrMicsById(String id); 
	
	/**
	 * 删除本地仪器常规项目参考值对应信息 
	 * @return
	 */
	public void delInstrRefrangesById(String id); 
	
	
	/* START 机构单位  */
	/**  
	 * 根据条件查找机构单位信息列表条数
	 * @param dto
	 * @return Integer
	 */
	public Integer queryCountByIOrgs(Map<String, Object> map); 
	
	/**
	 * 根据条件查找机构单位信息列表
	 * @param dto
	 * @return List<Instruments>
	 */
	public List<Orgs> queryListByIOrgs(Map<String, Object> map); 
	
	/**
	 * 根据ID机构单位
	 * @param id
	 * @return Orgs
	 */
	public Orgs findIOrgsById(String id); 
	
	/**
	 * 
	* @Title: modifyCtrTubeTypes 
	* @Description: TODO(修改) 
	* @param @param CtrTubeTypes
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyInstruments(Instruments Instruments);
	/* END 机构单位 */
}

package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.daan.domain.InstrMics;
import com.daan.domain.InstrumentsMics;
import com.daan.dto.InstrMicsDto;

/**
 * 
* @ClassName: InstrMicsDao 
* @Description: TODO(微生物的细菌、抗生素仪器通道Dao) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:18:58 
*
 */
public interface InstrMicsDao {
	
	/**
	 * 
	* @Title: queryInstrMicsItemsInfo 
	* @Description: TODO(细菌、抗生素项目明细) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<InstrMicsDto>    返回类型 
	* @throws
	 */
	public List<InstrMicsDto> queryInstrMicsItemsInfo (Map<String, Object> map); 
	
	/**
	 * 
	* @Title: queryInstrMicsNoAddItems 
	* @Description: TODO(细菌、抗生素项目明细) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<InstrMicsDto>    返回类型 
	* @throws
	 */
	public List<InstrMicsDto> queryInstrMicsNoAddItems (Map<String, Object> map); 

	/**
	 * 
	* @Title: queryGermPageListByConditions 
	* @Description: TODO(根据条件查找细茵信息) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<InstrMics>    返回类型 
	* @throws
	 */
	public List<InstrMicsDto> queryPageListByConditions(Map<String, Object> map);
	
	/**
	 * 
	* @Title: queryInstrMicsyConditions 
	* @Description: TODO(根据条件查找细茵信息) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<InstrMics>    返回类型 
	* @throws
	 */
	public List<InstrMics> queryInstrMicsyConditions(Map<String, Object> map); 
	
	/**
	 * 
	* @Title: queryAntiPageListByConditions 
	* @Description: TODO(根据条件查找抗生素信息) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<InstrMics>    返回类型 
	* @throws
	 */
	//public List<InstrMics> queryAntiPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 
	* @Title: findById 
	* @Description: TODO(根据ID查找记录) 
	* @param @param id
	* @param @return    设定文件 
	* @return InstrMics    返回类型 
	* @throws
	 */
	public InstrMics findById(String id); 
	
	/**
	 * 
	* @Title: findListByConditions
	* @Description: TODO(根据条件查找记录) 
	* @param @param name
	* @param @return    设定文件 
	* @return List<InstrMics>  返回类型 
	* @throws
	 */
	public List<InstrMics> findListByConditions(HashMap<String, String> params); 
	
	/**
	 * 
	* @Title: addInstrMics 
	* @Description: TODO(添加细菌信息) 
	* @param @param InstrMics
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int addInstrMics(InstrMics InstrMics);
	
	/**
	 * 
	* @Title: modifyInstrMics 
	* @Description: TODO(修改) 
	* @param @param InstrMics
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyInstrMics(InstrMics instrMics);
	
	/**
	 * 
	* @Title: deleteById 
	* @Description: TODO(根据ID删除) 
	* @param @param id
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int deleteById(String id);
	
	/**
	 * 
	* @Title: deleteByConditions 
	* @Description: TODO(根据条件删除) 
	* @param @param params
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	//public int deleteByConditions(Map<String, String> params);
	
	/**
	 * 
	* @Title: getMaxPrintOrder 
	* @Description: TODO(获取最大打印号) 
	* @param @param map
	* @param @return    设定文件 
	* @return Integer    返回类型 
	* @throws
	 */
	public Integer getMaxPrintOrder(Map<String, Object> map);
	/**
	 * 新增项目对照
	 * @return
	 */
	public void insertInstrumentsMics(InstrumentsMics dto); 
}

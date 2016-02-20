package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.daan.domain.LocDictCodes;

/**
 * 
 * @ClassName: LocDictCodesDao
 * @Description: TODO(本地基础字典表-Dao)
 * @author xialing
 * @date 2016年01月11日
 *
 */
public interface LocDictCodesDao {
	
	/**
	 * 
	* @Title: queryCountByConditions 
	* @Description: TODO(根据条件查找基础字典信息条数) 
	* @param @param map
	* @param @return    设定文件 
	* @return Integer    返回类型 
	* @throws
	 */
	public Integer queryCountByConditions(Map<String, Object> map); 

	/**
	 * 
	* @Title: queryPageListByConditions 
	* @Description: TODO(根据条件查找基础字典信息) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<LocDictCodes>    返回类型 
	* @throws
	 */
	public List<LocDictCodes> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 
	* @Title: findById 
	* @Description: TODO(根据ID查找记录) 
	* @param @param id
	* @param @return    设定文件 
	* @return LocDictCodes    返回类型 
	* @throws
	 */
	public LocDictCodes findById(String id); 
	
	/**
	 * 
	 * @Title: findCtrDataById 
	 * @Description: TODO(根据ID值查找中心字典库的编码，以及名称等信息) 
	 * @param id
	 * @return LocDictCodes
	 * @throws
	 */
	public LocDictCodes findCtrDataById(long id); 
	
	/**
	 * 
	 * @Title: findLocDictId 
	 * @Description: TODO(根据中心字典库编码、中文名称名称查找本地字典库的id值) 
	 * @param params
	 * @return Long
	 * @throws
	 */
	public Long findLocDictId(Map<String, Object> params); 
	
	/**
	 * 
	* @Title: findListByConditions
	* @Description: TODO(根据名称查找记录-没用到) 
	* @param @param name
	* @param @return    设定文件 
	* @return List<LocDictCodes>  返回类型 
	* @throws
	 */
	public List<LocDictCodes> findListByConditions(HashMap<String, String> params); 
	
	/**
	 * 
	* @Title: findListByCheckConditions
	* @Description: TODO(根据中心字典库编码、中文名称名称查找本地字典库是否已存在记录) 
	* @param @param name
	* @param @return    设定文件 
	* @return List<LocDictCodes>  返回类型 
	* @throws
	 */
	public List<LocDictCodes> findListByCheckConditions(HashMap<String, String> params); 
	
	/**
	 * 
	* @Title: queryCountByConditions 
	* @Description: TODO(根据条件查找基础字典信息条数) 
	* @param @param map
	* @param @return    设定文件 
	* @return Integer    返回类型 
	* @throws
	 */
	public Integer addQueryCountByConditions(Map<String, Object> map); 
	/**
	 * 
	* @Title: addQueryPageListByConditions 
	* @Description: TODO(新增根据条件查找中心基础字典信息) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<LocDictCodes>    返回类型 
	* @throws
	 */
	public List<LocDictCodes> addQueryPageListByConditions(Map<String, Object> map); 
	/**
	 * 
	* @Title: addLocDictCodes 
	* @Description: TODO(添加字典信息) 
	* @param LocDictCodes
	* @param 设定文件 
	* @return String    返回类型 
	* @throws
	 */
	public void addLocDictCodes(LocDictCodes dc);
	
	/**
	 * 
	* @Title: modifyLocDictCodes 
	* @Description: TODO(修改) 
	* @param @param LocDictCodes
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyLocDictCodes(LocDictCodes LocDictCodes);
	
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
	* @Title: findByCtrId 
	* @Description: TODO(根据ID查找中心库记录) 
	* @param @param id
	* @param @return    设定文件 
	* @return LocDictCodes    返回类型 
	* @throws
	 */
	public LocDictCodes findByCtrId(String id); 
	
	/**
	 * 
	* @Title: findAllTreatType
	* @Description: TODO(查找所有可用的就诊类型) 
	* @author lijintao
	* @date 2016年01月14日
	* @return HospDepartments    返回类型 
	* 
	 */
	public List<LocDictCodes> findAllTreatType();

}

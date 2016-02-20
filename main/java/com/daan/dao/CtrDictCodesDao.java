package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.daan.domain.CtrDictCodes;

/**
 * 
* @ClassName: CtrDictCodesDao 
* @Description: TODO(基础字典表Dao) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:18:58 
*
 */
public interface CtrDictCodesDao {
	
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
	* @return List<CtrDictCodes>    返回类型 
	* @throws
	 */
	public List<CtrDictCodes> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 
	* @Title: findById 
	* @Description: TODO(根据ID查找记录) 
	* @param @param id
	* @param @return    设定文件 
	* @return CtrDictCodes    返回类型 
	* @throws
	 */
	public CtrDictCodes findById(String id); 
	
	/**
	 * 
	* @Title: findListByConditions
	* @Description: TODO(根据名称查找记录) 
	* @param @param name
	* @param @return    设定文件 
	* @return List<CtrDictCodes>  返回类型 
	* @throws
	 */
	public List<CtrDictCodes> findListByConditions(HashMap<String, String> params); 
	
	/**
	 * 
	* @Title: addCtrDictCodes 
	* @Description: TODO(添加字典信息) 
	* @param @param CtrDictCodes
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int addCtrDictCodes(CtrDictCodes CtrDictCodes);
	
	/**
	 * 
	* @Title: modifyCtrDictCodes 
	* @Description: TODO(修改) 
	* @param @param CtrDictCodes
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyCtrDictCodes(CtrDictCodes CtrDictCodes);
	
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
	
}

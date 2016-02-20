package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.daan.domain.CtrTubeTypes;

/**
 * 
* @ClassName: CtrTubeTypesDao 
* @Description: TODO(试管类型Dao) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:18:58 
*
 */
public interface CtrTubeTypesDao {
	
	/**
	 * 
	* @Title: queryCountByConditions 
	* @Description: TODO(根据条件查找试管类型信息条数) 
	* @param @param map
	* @param @return    设定文件 
	* @return Integer    返回类型 
	* @throws
	 */
	public Integer queryCountByConditions(Map<String, Object> map); 

	/**
	 * 
	* @Title: queryPageListByConditions 
	* @Description: TODO(根据条件查找试管类型信息) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<CtrTubeTypes>    返回类型 
	* @throws
	 */
	public List<CtrTubeTypes> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 
	* @Title: findById 
	* @Description: TODO(根据ID查找记录) 
	* @param @param id
	* @param @return    设定文件 
	* @return CtrTubeTypes    返回类型 
	* @throws
	 */
	public CtrTubeTypes findById(String id); 
	
	/**
	 * 
	* @Title: findListByConditions
	* @Description: TODO(根据名称查找记录) 
	* @param @param name
	* @param @return    设定文件 
	* @return List<CtrTubeTypes>  返回类型 
	* @throws
	 */
	public List<CtrTubeTypes> findListByConditions(HashMap<String, String> params); 
	
	/**
	 * 
	* @Title: addCtrTubeTypes 
	* @Description: TODO(添加试管类型信息) 
	* @param @param CtrTubeTypes
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int addCtrTubeTypes(CtrTubeTypes ctrTubeType);
	
	/**
	 * 
	* @Title: modifyCtrTubeTypes 
	* @Description: TODO(修改) 
	* @param @param CtrTubeTypes
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyCtrTubeTypes(CtrTubeTypes ctrTubeType);
	
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

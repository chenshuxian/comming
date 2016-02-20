package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.daan.domain.CtrResultTypes;

/**
 * 
* @ClassName: CtrResultTypeDao 
* @Description: TODO(结果类型Dao) 
* @author zengxiaowang
* @date 2015年11月25日 上午10:14:18 
*
 */
public interface CtrResultTypesDao {
	

	/**
	 * 
	* @Title: queryCountByConditions 
	* @Description: TODO(根据条件查找结果类型信息条数) 
	* @param @param map
	* @param @return    设定文件 
	* @return Integer    返回类型 
	* @throws
	 */
	public Integer queryCountByConditions(Map<String, Object> map); 

	/**
	 * 
	* @Title: queryPageListByConditions 
	* @Description: TODO(根据条件查找结果类型信息) 
	* @param @param map
	* @param @return    设定文件 
	* @return List<CtrResultTypes>    返回类型 
	* @throws
	 */
	public List<CtrResultTypes> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 
	* @Title: findById 
	* @Description: TODO(根据ID查找记录) 
	* @param @param id
	* @param @return    设定文件 
	* @return CtrResultTypes    返回类型 
	* @throws
	 */
	public CtrResultTypes findById(String id); 
	
	/**
	 * 
	* @Title: findListByConditions
	* @Description: TODO(根据名称查找记录) 
	* @param @param params
	* @param @return    设定文件 
	* @return List<CtrResultTypes>  返回类型 
	* @throws
	 */
	public List<CtrResultTypes> findListByConditions(HashMap<String, String> params); 
	
	/**
	 * 
	* @Title: addCtrResultTypes 
	* @Description: TODO(添加结果类型信息) 
	* @param @param ctrResultType
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int addCtrResultTypes(CtrResultTypes ctrResultType);
	
	/**
	 * 
	* @Title: modifyCtrResultTypes 
	* @Description: TODO(修改) 
	* @param @param ctrResultType
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyCtrResultTypes(CtrResultTypes ctrResultType);
	
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
	 * @Title: queryByStatus 
	 * @Description: TODO(根据状态查询) 
	 * @param status
	 * @return List<CtrResultTypes>
	 * @throws
	 */
	public List<CtrResultTypes> queryByStatus(String status);
}

package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.daan.domain.CtrResultTypeDetail;

/**
 * 
* @ClassName: CtrResultTypeDetailDao 
* @Description: TODO(结果类型描述Dao) 
* @author zengxiaowang
* @date 2015年11月25日 上午10:14:18 
*
 */
public interface CtrResultTypeDetailDao {
	

	/**
	 * 
	* @Title: queryCountByConditions 
	* @Description: TODO(根据条件查找结果类型描述信息条数) 
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
	public List<CtrResultTypeDetail> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 
	* @Title: findById 
	* @Description: TODO(根据ID查找记录) 
	* @param @param id
	* @param @return    设定文件 
	* @return CtrResultTypes    返回类型 
	* @throws
	 */
	public CtrResultTypeDetail findById(String id); 
	
	/**
	 * 
	* @Title: findListByConditions
	* @Description: TODO(根据条件查找记录) 
	* @param @param name
	* @param @return    设定文件 
	* @return List<CtrResultTypeDetail>  返回类型 
	* @throws
	 */
	public List<CtrResultTypeDetail> findListByConditions(HashMap<String, String> params); 
	
	/**
	 * 
	* @Title: addCtrResultTypeDetail 
	* @Description: TODO(添加结果类型描述信息) 
	* @param @param ctrResultTypeDetail
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int addCtrResultTypeDetail(CtrResultTypeDetail ctrResultTypeDetail);
	
	/**
	 * 
	* @Title: modifyCtrResultTypeDetail 
	* @Description: TODO(修改) 
	* @param @param ctrResultTypeDetail
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int modifyCtrResultTypeDetail(CtrResultTypeDetail ctrResultTypeDetail);
	
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
	* @Title: deleteByTypeId 
	* @Description: TODO(根据类型ID删除) 
	* @param @param id
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int deleteByTypeId(String id);
}

package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrRegions;
/**
 * @ClassName: CtrRegionsDao 
 * @Description: TODO(地区dao) 
 * @author Wumingjava
 * @date 2015年11月26日 上午11:47:26
 */
public interface CtrRegionsDao {
	/**
	 * 根据ID查找
	 * @param id
	 * @return
	 */
	public CtrRegions findById(Long id);
	/**
	 * 根据ctrRegions属性查询相关信息
	 * @param id
	 * @return
	 */
	public List<CtrRegions> findByProperty(CtrRegions ctrRegions);
	/**
	 * 根据name属性查询相关信息
	 * @param id
	 * @return
	 */
	public List<CtrRegions> findCtrRegionsByName(String name);
	/**
	 * 根据ID查找下面的子记录
	 * @param id
	 * @return
	 */
	public List<CtrRegions> findByIdReturnSon(String id);
	/**
	 * 根据ID查找下面的子记录
	 * @param id
	 * @return
	 */
	public List<CtrRegions> findByTierReturnSon(CtrRegions ctrRegions);
	/**
	 * 添加地区
	 * @param ctrRegions
	 * @return
	 */
	public int insertCtrRegions(CtrRegions ctrRegions);
	/**
	 * 更新左值不更新本身
	 * @param left
	 * @return
	 */
	public int updateCtrRegionsLeftNotSelf(Map<String,Object>map);
	/**
	 * 更新左值
	 * @param left
	 * @return
	 */
	public int updateCtrRegionsLeft(Map<String,Object>map);
	/**
	 * 更新右
	 * @param right
	 * @return
	 */
	public int updateCtrRegionsRight(Map<String,Object>map);
	/**
	 * 更新子树成负值
	 * @param right
	 * @return
	 */
	public int updateCtrRegionsToNe(Map<String,Object>map);
	/**
	 * 更新子树的左右值，层级
	 * @param right
	 * @return
	 */
	public int updateChildLRT(Map<String,Object>map);
	/**
	 * 修改地区
	 * @param ctrRegions
	 * @return
	 */
	public int updateCtrRegions(CtrRegions ctrRegions);
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	public void deleteById(Long id);
	/**
	 * 查找地区名称列表
	 * @return
	 */
	public List<CtrRegions> getAllRegionNameList();
}

package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.daan.domain.CenterOrg;
import com.daan.domain.CenterOrgRelations;

/**
 * 
 * @ClassName: CenterOrgRelationsDao 
 * @Description: TODO(区域管理机构维护关系dao类) 
 * @author zhangliping
 * @date 2015年12月28日 下午2:48:37
 */
public interface CenterOrgRelationsDao {
	/**
	 * 根据条件查找机构列表条数
	 * @param dto
	 * @return
	 */
	public Integer queryCountByConditions(Map<String, Object> map); 
	
	/**
	 * 根据条件查找机构列表
	 * @param dto
	 * @return
	 */
	public List<CenterOrg> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 根据父ID查询关联的机构的详细信息
	 * @param parentId
	 * @return
	 */
	public List<CenterOrg> findByParentId(String parentId);
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public CenterOrg findById(String id);
	
	/**
	 * 修改机构单位
	 * @return
	 */
	public void updateCenterOrg(CenterOrg dto);
	
	/**
	 * 
	 * @Title: queryNoContainRegionalList 
	 * @Description: TODO(查询机构未包含的项目) 
	 * @param map
	 * @return List<CenterOrg>
	 * @throws
	 */
	public List<CenterOrg> queryNoContainRegionalList(Map<String,Object> map);
	
	/**
	 * 删除中心机构单位
	 * @return
	 */
	public void deleteById(String id); 
	
	/**
	 * 根据父ID删除行政机构关系关联表记录
	 * @return
	 */
	public void deleteByParentId(String id); 
	
	/**
	 * 根据父ID以及子节点ID删除行政机构关系关联表记录
	 * @return
	 */
	public void deleteByRelatedId(Map<String,Object> map); 
	
	/**
	 * 根据条件查找记录
	 * @param name
	 * @return
	 */
	public List<CenterOrg> findListByConditions(HashMap<String, String> params); 
	
	/**
	 * 新增中心机构单位
	 * @return
	 */
	public void insertCenterOrg(CenterOrg dto); 
	
	/**
	 * 新增项目对照
	 * @return
	 */
	public void insertCenterOrgRelations(CenterOrgRelations dto); 
}

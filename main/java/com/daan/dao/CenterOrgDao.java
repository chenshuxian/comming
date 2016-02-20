package com.daan.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.daan.domain.CenterOrg;

/**
 * @ClassName: CenterOrgDao 
 * @Description: TODO(实验室或机构DAO) 
 * @author zhangliping
 * @date 2015年12月7日 下午2:44:36
 */
public interface CenterOrgDao {
	/**
	 * 根据条件查找实验室或机构列表条数
	 * @param dto
	 * @return
	 */
	public Integer queryCountByConditions(Map<String, Object> map); 
	
	/**
	 * 根据条件查找实验室或机构列表
	 * @param dto
	 * @return
	 */
	public List<CenterOrg> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 根据用户查找实验室或机构列表
	 * @param dto
	 * @return
	 */
	public List<CenterOrg> queryListByUser(Map<String, Object> map);
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return
	 */
	public CenterOrg findById(String id);
	
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
	 * 修改中心机构单位
	 * @return
	 */
	public void updateCenterOrg(CenterOrg dto);
	
	/**
	 * 删除
	 * @return
	 */
	public void deleteById(String id); 
}

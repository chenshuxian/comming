package com.daan.dao.auth;

import com.daan.domain.User;
import com.daan.domain.Users;

import java.util.List;
import java.util.Map;

public interface UserDao {
	/**
	 * 根据条件查找用户，用户名和密码
	 * @param map
	 * @return
	 */
	public List<User> findByUserNameAndPwd(Map<String, String> map);
	
	/**
	 * 根据条件查找用户列表条数
	 * @param map
	 * @return Integer
	 */
	public Integer queryCountByUser(Map<String, Object> map); 
	
	/**
	 * 根据条件查找用户列表
	 * @param map
	 * @return List<User>
	 */
	public List<Users> queryPageListByUser(Map<String, Object> map); 
	
	/**
	 * 根据ID查找用户记录
	 * @param id
	 * @return User
	 */
	public Users findByUserId(String id); 
	
	/**
	 * 根据账号查找用户记录
	 * @param userNo
	 * @return User
	 */
	public List<Users> findByUserNo(String userNo); 
	
	/**
	 * 根据用户名查找用户记录
	 * @param userName
	 * @return User
	 */
	public List<Users> findByUserName(String userName); 
	
	/**
	 * 新增用户
	 * @param users
	 * @return
	 */
	public void insertUsers(Users users); 
	
	/**
	 * 
	 * @Title: updateUserSysAndOrg 
	 * @Description: TODO(插入用户默认登录系统和默认登录机构) 
	 * @param map
	 * @return int
	 * @throws
	 */
	public int updateUserSysAndOrg(Map<String, Object> map);
	
	/**
	 * 删除用户信息
	 * @param id
	 * @return
	 */
	public void deleteUserById(String id); 
	
	/**
	 * 重置密码
	 * @param map
	 * @return
	 */
	public void updateUserPwd(Map<String, String> map); 
	
	/**
	 * 修改用户信息
	 * @param users
	 * @return
	 */
	public void updateUsers(Users users); 
	
	/**
	 * 启用或者停用状态
	 * @param map
	 * @return
	 */
	public void updateUserStatus(Map<String, String> map); 

	/**
	 * 
	 * @Title: updatePassword 
	 * @Description: TODO(修改或设置密码) 
	 * @param map
	 * @return int
	 * @throws
	 */
	public int updatePassword(Map<String, String> map);
}

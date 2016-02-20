package com.daan.dao.auth;


import com.daan.domain.User;
import com.daan.domain.auth.AuthUsers;
import com.daan.domain.auth.UserProfiles;
import com.daan.dto.auth.UserGroupDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface AuthUsersDao {
    public List<AuthUsers> doPageList(HashMap map);

    public Integer doPageCount(HashMap map);

    public AuthUsers doView(HashMap map);

    public int doUpdate(AuthUsers record);

    public int doAdd(AuthUsers record);

    public int doDelete(HashMap map);
    public int doAddDefault(UserProfiles map);


    public List<UserGroupDto> getUserGroupByUserId(HashMap map);
    public int doAddNotNull(AuthUsers record);


    public int doUpdateUserNo(AuthUsers record);
    public int resetPassword(AuthUsers record);


    public int doChangeStatus(AuthUsers record);

    public int delUserGroupByUserId(HashMap map);
    public int addUserGroup(HashMap map);


    
    public List<AuthUsers> findByUserNameAndPwd(Map<String, String> map);
    
    /**
	 * 
	 * @Title: updatePassword 
	 * @Description: TODO(修改或设置密码) 
	 * @param map
	 * @return int
	 * @throws
	 */
	public int updatePassword(Map<String, String> map);
	
	/**
	 * 
	 * @Title: updateUserSysAndOrg 
	 * @Description: TODO(插入用户默认登录系统和默认登录机构) 
	 * @param map
	 * @return int
	 * @throws
	 */
	public int updateUserSysAndOrg(Map<String, Object> map);
    
    
}
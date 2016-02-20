package com.daan.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * @author zj
 * 
 */
@LogModule(moduleName=Constant.MODULE_USER,entityName="用户")
public class User implements Serializable {

	private static final long serialVersionUID = 522889572773714584L;

	//[主键id] — 基础代码表关键字id, 使用 【系统id规则】
	private String id;

	//[用户账号] — 用户登录的账号
	private String userNo;

	//[用户名] — 用户名称，显示的名称。
	private String userName;

	//[手机号码] — 用户的手机号码，用于发送短信。
	private String mobile;

	//[email地址] — 用户email地址用于发送通知类的邮件。
	private String email;

	//[密码] — 用户密码，32位md5加密
	private String password;

	//[首次登录] — 如果用户被置为首次登录，需要强制用户进行更改密码。
	private Integer isFirstSignin;

	//[状态] — 停用标志，1 —使用, 0 — 停用
	private Integer status;

	//[备注] — 备注内容
	private String memo;

	//[时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。
	private Date timeVersion;

	//[顺序号] — 显示用的顺序号
	private Integer displayOrder;

	private String propertyName;

	private String propertyValue;

	private String funcCodeString;

	private String serviceFuncString;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserNo() {
		return userNo;
	}

	public void setUserNo(String userNo) {
		this.userNo = userNo == null ? null : userNo.trim();
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName == null ? null : userName.trim();
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile == null ? null : mobile.trim();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email == null ? null : email.trim();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password == null ? null : password.trim();
	}

	public Integer getIsFirstSignin() {
		return isFirstSignin;
	}

	public void setIsFirstSignin(Integer isFirstSignin) {
		this.isFirstSignin = isFirstSignin;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo == null ? null : memo.trim();
	}

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getPropertyValue() {
		return propertyValue;
	}

	public void setPropertyValue(String propertyValue) {
		this.propertyValue = propertyValue;
	}

	public String getFuncCodeString() {
		return funcCodeString;
	}

	public void setFuncCodeString(String funcCodeString) {
		this.funcCodeString = funcCodeString;
	}

	public String getServiceFuncString() {
		return serviceFuncString;
	}

	public void setServiceFuncString(String serviceFuncString) {
		this.serviceFuncString = serviceFuncString;
	}

//	private Long id;
//	private String userName;
//	private String name;
//	private String password;
//	private Boolean active;
//	private String rolesString; //角色串，用逗号分隔
	private Long orgId;			//登录之后属于职能
	private String orgName;		//登录之后属于职能

	private Long sysId; 		   // 登录之后属于职能，默认登录系统id
	private String sysName;        // 登录之后属于职能，默认登录系统名字
	@Log(name="默认登录系统id")
	public Long getSysId() {
		return sysId;
	}

	public void setSysId(Long sysId) {
		this.sysId = sysId;
	}
	@Log(name="默认登录系统")
	public String getSysName() {
		return sysName;
	}

	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
//
//
//	private List<String> rights = new ArrayList<String>();// 所有权限集合
//
//	public User() {
//	}
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//
//	@Log(name="账号",order=10)
//	public String getUserName() {
//		return userName;
//	}
//
//	public void setUserName(String userName) {
//		this.userName = userName;
//	}
//
//	@Log(name="显示名称",order=20)
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//
//	@Log(name="是否可用",order=30)
//	public Boolean getActive() {
//		return active;
//	}
//
//	public void setActive(Boolean active) {
//		this.active = active;
//	}
//
//
//	/**
//	 * 框架提供的权限接口
//	 */
//	public List<String> getRights() {
//		return this.rights;
//	}
//
//	public void setRights(List<String> rights) {
//		this.rights = rights;
//	}
//
//	public boolean hasAnyRights(String right) {
//		if ("admin".equals(this.getUserName())) {
//			return true;
//		}
//		return rights.contains(right);
//	}
//
//	public String getRolesString() {
//		return rolesString;
//	}
//
//	public void setRolesString(String rolesString) {
//		this.rolesString = rolesString;
//	}
//
	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
}

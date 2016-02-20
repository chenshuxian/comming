package com.daan.domain;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

import java.io.Serializable;

/**
 * @ClassName: Users
 * @Description: [用户表] — 记录用户登录信息
 * @author xiaobing
 * @date 2016年1月08日 上午11:06:01
 */
@LogModule(entityName = Constant.ENTITY_USERS, moduleName = Constant.MODULE_USERS, moduleId= Constant.CODE_USERS)
public class Users implements Serializable {

	private static final long serialVersionUID = 522889571173714584L;
	
	private Long id;			   // ID
	private String idString; 	   // 避免前台页面中，JSON对象对long数据类型的精度丢失
	private String userName;	   // 用户名
	private String password;	   // 密码
	private String userNo; 		   // 用户账号	
	private Integer displayOrder;  // 顺序号 
	private String memo;		   // 备注
	private Integer status;		   // 状态
	private Integer isFirstSignin; // 首次登录
	private String mobile;		   // 手机号码
	private String email;		   // email地址
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIdString() {
		return idString;
	}
	public void setIdString(String idString) {
		this.idString = idString;
	}
	@Log(name="用户名", order = 2, isSummary = true)
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Log(name="用户账号", order=1, isSummary = true)
	public String getUserNo() {
		return userNo;
	}
	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	@Log(name="备注")
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	@Log(name = "状态", valueFormat = Constant.STATUS_FORMAT)
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getIsFirstSignin() {
		return isFirstSignin;
	}
	public void setIsFirstSignin(Integer isFirstSignin) {
		this.isFirstSignin = isFirstSignin;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}

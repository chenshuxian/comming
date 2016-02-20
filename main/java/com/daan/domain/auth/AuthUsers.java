package com.daan.domain.auth;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

public class AuthUsers implements Serializable {

    private static final long serialVersionUID = 5723334759007228108L;

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

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    private String orgId;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    private String appId;

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
}
package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 
* @ClassName: DictLogs 
* @Description: TODO(字典更改日志表) 
* @author zengxiaowang
* @date 2015年11月24日 上午11:14:03 
*
 */

public class DictLogs  implements Serializable{
	
	private static final long serialVersionUID = 5304618864250025215L;
	
	/** 
	* @Fields id : TODO(主键) 
	*/
	private Long id;
	
	/** 
	* @Fields orgId : TODO(主键) 
	*/
	private Long orgId;
	
	/** 
	* @Fields orgName : TODO(主键) 
	*/
	private String orgName;

	/** 
	* @Fields userId : TODO(操作员id) 
	*/
	private String userId;
	
	/** 
	* @Fields userName : TODO(用户名称) 
	*/
	private String userName;
	
	/** 
	* @Fields operateTime : TODO(操作时间) 
	*/
	private Date operateTime;
	
	/** 
	* @Fields moduleId : TODO(模块id) 
	*/
	private Integer moduleId;
	
	/** 
	* @Fields moduleName : TODO(模块名称) 
	*/
	private String moduleName;
	
	/** 
	* @Fields functionDesc : TODO(操作类型) 
	*/
	private String functionDesc;
	
	/** 
	* @Fields summary : TODO(操作项目) 
	*/
	private String summary;
	
	/** 
	* @Fields description : TODO(操作内容) 
	*/
	private String description;
	
	/** 
	* @Fields timeVersion : TODO(时间版本) 
	*/
	private Date timeVersion;

	/**
	 * @Fields appId : TODO(系统id)
	 */
	private String appId;

	public DictLogs() {
		// TODO Auto-generated constructor stub
	}
	public DictLogs(User user) {
		this.userId = user.getId();
		this.userName = user.getUserName();
		this.orgId = user.getOrgId();
		this.orgName = user.getOrgName();
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Date getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}

	public Integer getModuleId() {
		return moduleId;
	}

	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getFunctionDesc() {
		return functionDesc;
	}

	public void setFunctionDesc(String functionDesc) {
		this.functionDesc = functionDesc;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

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

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}
}
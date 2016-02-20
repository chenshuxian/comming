package com.daan.dto;

/**
 * 
 * @ClassName: DictLogsQueryDto
 * @Description: TODO(字典更改日志Dto)
 * @author zhangliping
 * @date 2015年12月10日 下午6:08:31
 */
public class DictLogsQueryDto implements Cloneable {
	private String id;// 主键id
	private String orgId;// 机构、实验室id
	private String orgName;// 实验室名称
	private String userId;// 操作员id
	private String userName;// 用户名称
	private String operateTime;// 操作时间
	private String moduleId;// 模块id
	private String functionDesc;// 操作类型
	private String summary;// 操作项目
	private String description;// 操作内容
	private String timeVersion;// 时间版本
	private String page;// 分页
	private String startDate;// 开始时间
	private String endDate;// 结束时间
	private String moduleName;// 模块名称
	private String isMain;//0：初次进入日志页面，不加载数据
	private String userNo;;//用户账号

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
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

	public String getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(String operateTime) {
		this.operateTime = operateTime;
	}

	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
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

	public String getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(String timeVersion) {
		this.timeVersion = timeVersion;
	}

	public String getIsMain() {
		return isMain;
	}

	public void setIsMain(String isMain) {
		this.isMain = isMain;
	}

	public String getUserNo() {
		return userNo;
	}

	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}

}

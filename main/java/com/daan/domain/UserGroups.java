package com.daan.domain;

import java.util.Date;

import com.daan.logBean.LogModule;
/**
 * [权限组表] — 保存权限组信息，及权限组所对应的权限值。
 * @author Wumingjava
 */
@LogModule(entityName = Constant.ENTITY_USERGROUPS, moduleName = Constant.MODULE_USERGROUPS,moduleId=Constant.MODULEID_USERGROUPS)
public class UserGroups implements Cloneable {
	private static final long serialVersionUID = 522889572773714584L;
	/**主键id*/
	private Long id;
	private String idStr;
	/**实验室、机构id*/
	private Long orgId;
	private String orgIdStr;
	private String orgName;
	/**系统id*/
	private Long appId;
	private String appIdStr;
	private String appName;
	/**编码*/
	private String codeNo;
	/**中文名称*/
	private String name;
	/**备注*/
	private String memo;
	/**顺序号*/
	private int displayOrder;
	/**状态标识， 0— 停用，1— 可用。 */
	private Integer status;
	/**时间版本*/
	private Date timeVersion;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
		this.idStr = String.valueOf(id);
	}
	public Long getOrgId() {
		return orgId;
	}
	public String getIdStr() {
		return idStr;
	}
	public void setIdStr(String idStr) {
		this.idStr = idStr;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
		this.orgIdStr = String.valueOf(orgId);
	}
	public String getOrgIdStr() {
		return orgIdStr;
	}
	public void setOrgIdStr(String orgIdStr) {
		this.orgIdStr = orgIdStr;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
		this.appIdStr = String.valueOf(appId);
	}
	public String getAppIdStr() {
		return appIdStr;
	}
	public void setAppIdStr(String appIdStr) {
		this.appIdStr = appIdStr;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getCodeNo() {
		return codeNo;
	}
	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		UserGroups userGroups = (UserGroups) super.clone();
		return userGroups;
	}
}

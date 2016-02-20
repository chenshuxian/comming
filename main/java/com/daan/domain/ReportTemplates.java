package com.daan.domain;

import java.util.Date;

/**
 * @ClassName: ReportTemplates
 * @Description: 报告模板表
 * @author zhoujie
 * @date 2016年01月12日
 */
public class ReportTemplates {

	private Long id;
	private Long appId;
	private Long orgId;
	private String name;
	private Integer status;
	private Date timeVersion;

	public ReportTemplates() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

}

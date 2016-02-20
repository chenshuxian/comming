package com.daan.domain;

import java.util.Date;

import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrInstruments
 * @Description: TODO([中心报告模板表])
 * @author zhoujie
 * @date 2015年12月01日 下午23:39:52
 */
@LogModule(moduleName = Constant.MODULE_CTRREPORT_TEMPLATES, entityName = "中心报告模板")
public class CtrReportTemplates {

	private Long id;
	private String name;
	private Integer status;
	private Date timeVersion;

	public CtrReportTemplates() {
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

}

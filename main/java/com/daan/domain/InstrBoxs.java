package com.daan.domain;

import java.util.Date;

/**
 * @ClassName: InstrBoxs
 * @Description: 仪器盒子等级表
 * @author zhoujie
 * @date 2016年01月14日
 */
public class InstrBoxs {

	private Long id;
	private Long appId;
	private Long orgId;
	private String codeNo;
	private String boxBarcode;
	private String boxIp;
	private Integer displayOrder;
	private String memo;
	private Integer status;
	private Date timeVersion;

	public InstrBoxs() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}

	public String getBoxBarcode() {
		return boxBarcode;
	}

	public void setBoxBarcode(String boxBarcode) {
		this.boxBarcode = boxBarcode;
	}

	public String getBoxIp() {
		return boxIp;
	}

	public void setBoxIp(String boxIp) {
		this.boxIp = boxIp;
	}

	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

}

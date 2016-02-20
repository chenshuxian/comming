package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;

public class InstrumentBox  implements Serializable, Cloneable{
	
	private static final long serialVersionUID = -7695151888643224723L;
	
	//主键id
	private Long id;
	//系统id
	private Long appId;
	//机构id
	private Long orgId;
	//盒子编码
	private String codeNo;
	//盒子条码号
	private String boxBarCode;
	//盒子IP
	private String boxIP;
	//顺序号
	private Integer displayOrder;
	//备注
	private String memo;
	//状态
	private Integer status;
	//[时间版本] —  当新增、修改都需要把当前服务器时间写入此字段，用于同步数据用。
	private Date timeVersion;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	@Log(name = "编码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}
	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	@Log(name = "盒子条码", order = 2, isSummary = true)
	public String getBoxBarCode() {
		return boxBarCode;
	}
	public void setBoxBarCode(String boxBarCode) {
		this.boxBarCode = boxBarCode;
	}
	public String getBoxIP() {
		return boxIP;
	}
	public void setBoxIP(String boxIP) {
		this.boxIP = boxIP;
	}
	@Log(name = "顺序号")
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	@Log(name = "备注")
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
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		InstrumentBox instrumentBox = (InstrumentBox) super.clone();
		return instrumentBox;
	}
	
}

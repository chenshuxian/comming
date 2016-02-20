package com.daan.dto;

import java.util.List;

/**
 * 
 * @ClassName: InstrMics
 * @Description: TODO(微生物的细菌、抗生素仪器通道DTO)
 * @author zengxiaowang
 * @date 2015年12月8日 下午4:14:12
 *
 */
public class InstrMicsDto {

	/**
	 * @Fields id : TODO(主键)
	 */
	private String id;
	/**
	 * @Fields appId : TODO(系统id)
	 */
	private String appId;
	/**
	 * @Fields orgId : TODO(实验室id)
	 */
	private String orgId;
	/**
	 * @Fields orgId : TODO(实验室名称)
	 */
	private String orgName;
	/**
	 * @Fields instrumentId : TODO(仪器id)
	 */
	private String instrumentId;
	/**
	 * @Fields instrumentName : TODO(仪器名称)
	 */
	private String instrumentName;
	/**
	 * @Fields itemTypeId : TODO(微生物项目分类)
	 */
	private Integer itemTypeId;
	/**
	 * @Fields channelCode : TODO(通道码)
	 */
	private String channelCode;
	/**
	 * @Fields micItemId : TODO(微生物项目id)
	 */
	private String micItemId;
	/**
	 * @Fields micItemId : TODO(微生物项目编码)
	 */
	private String micItemCode;
	/**
	 * @Fields micItemId : TODO(微生物项目名称)
	 */
	private String micItemName;
	/**
	 * @Fields micItemId : TODO(微生物项目英文简称)
	 */
	private String enShortName;
	/**
	 * @Fields printOrder : TODO(打印次序)
	 */
	private Integer printOrder;

	public InstrMicsDto() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getInstrumentName() {
		return instrumentName;
	}

	public void setInstrumentName(String instrumentName) {
		this.instrumentName = instrumentName;
	}

	public String getMicItemCode() {
		return micItemCode;
	}

	public void setMicItemCode(String micItemCode) {
		this.micItemCode = micItemCode;
	}

	public String getMicItemName() {
		return micItemName;
	}

	public void setMicItemName(String micItemName) {
		this.micItemName = micItemName;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(String instrumentId) {
		this.instrumentId = instrumentId;
	}

	public Integer getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}

	public String getChannelCode() {
		return channelCode;
	}

	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}

	public String getMicItemId() {
		return micItemId;
	}

	public void setMicItemId(String micItemId) {
		this.micItemId = micItemId;
	}

	public Integer getPrintOrder() {
		return printOrder;
	}

	public void setPrintOrder(Integer printOrder) {
		this.printOrder = printOrder;
	}
	public String getEnShortName() {
		return enShortName;
	}
	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}
}

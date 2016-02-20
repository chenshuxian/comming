package com.daan.domain;

import com.daan.logBean.LogModule;

/**
 * @ClassName: InstrumentsItems
 * @Description: [仪器关联项目表]
 * @author zhoujie
 * @date 2016年01月16日
 */
@LogModule(moduleName = Constant.MODULE_INSTRUMENTSITEM, entityName = Constant.ENTITY_INSTRUMENTSITEM, moduleId = Constant.MODULEID_CTRINSTRUMENTS_ITEM)
public class InstrumentsItems {

	private Long id; // ID
	private Long appId; // appId
	private Long orgId; // orgId
	private Long instrumentId; // 仪器id
	private Long testItemId; // 项目的ID
	private String channelCode;// 通道码
	private String factor;// 转换系数
	private String unit;// 项目单位
	private Integer printOrder;// 打印顺序

	public InstrumentsItems() {
	}

	public String getChannelCode() {
		return channelCode;
	}

	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}

	public String getFactor() {
		return factor;
	}

	public void setFactor(String factor) {
		this.factor = factor;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Integer getPrintOrder() {
		return printOrder;
	}

	public void setPrintOrder(Integer printOrder) {
		this.printOrder = printOrder;
	}

	public Long getTestItemId() {
		return testItemId;
	}

	public void setTestItemId(Long testItemId) {
		this.testItemId = testItemId;
	}

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

	public Long getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}

}

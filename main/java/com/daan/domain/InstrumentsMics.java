package com.daan.domain;

import com.daan.logBean.LogModule;

/**
 * @ClassName: InstrumentsItems
 * @Description: [仪器关联微生物表]
 * @author zhoujie
 * @date 2016年01月16日
 */
@LogModule(moduleName = Constant.MODULE_INSTRUMENTSMICS, entityName = Constant.ENTITY_INSTRUMENTSMICS, moduleId = Constant.MODULEID_CTRINSTRUMENTS_MICS)
public class InstrumentsMics {

	private Long id; // ID
	private Long appId; // appId
	private Long orgId; // orgId
	private Long instrumentId; // 仪器id
	private Long micsItemId; // 微生物的ID
	private Integer itemTypeId; // 微生物分类
	private String channelCode;// 通道码
	private Integer printOrder;// 打印顺序

	public InstrumentsMics() {
	}

	public String getChannelCode() {
		return channelCode;
	}

	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}

	public Integer getPrintOrder() {
		return printOrder;
	}

	public void setPrintOrder(Integer printOrder) {
		this.printOrder = printOrder;
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

	public Long getMicsItemId() {
		return micsItemId;
	}

	public void setMicsItemId(Long micsItemId) {
		this.micsItemId = micsItemId;
	}

	public Integer getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}

}

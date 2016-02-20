package com.daan.domain;

import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrInstrumentsMics
 * @Description: [中心仪器关联微生物表]
 * @author zhoujie
 * @date 2015年12月16日 下午20:06:01
 */
@LogModule(moduleName = Constant.MODULE_CTRINSTRUMENTS_MICS, entityName = Constant.ENTITY_CTRINSTRUMENTS_MICS, moduleId = Constant.MODULEID_CTRINSTRUMENTS_MICS)
public class CtrInstrumentsMics {

	private Long id;// 主键
	private Long instrumentId; // 仪器id
	private Integer itemTypeId; // 项目分类:1 — 细菌 ， 2— 抗生素
	private Long micItemId; // 微生物项目id
	private String micItemName; // 微生物项目名称
	private String channelCode;// 通道码
	private Integer printOrder;// 打印顺序
	private Date timeVersion;// 时间版本

	private String instrumentName;//仪器名称
	private String codeNo;//编码
	
	
	private String micsCodeNo;// 项目编码
	private String micsName;// 项目名称
	
	public CtrInstrumentsMics() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}

	@Log(name = "项目分类")
	public Integer getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}

	public Long getMicItemId() {
		return micItemId;
	}

	public void setMicItemId(Long micItemId) {
		this.micItemId = micItemId;
	}

	@Log(name = "通道码")
	public String getChannelCode() {
		return channelCode;
	}

	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}

	@Log(name = "打印顺序")
	public Integer getPrintOrder() {
		return printOrder;
	}

	public void setPrintOrder(Integer printOrder) {
		this.printOrder = printOrder;
	}

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

	@Log(name = "仪器名称", order = 2, isSummary = true)
	public String getInstrumentName() {
		return instrumentName;
	}

	public void setInstrumentName(String instrumentName) {
		this.instrumentName = instrumentName;
	}

	@Log(name = "仪器代码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}

	@Log(name = "微生物名称")
	public String getMicItemName() {
		return micItemName;
	}

	public void setMicItemName(String micItemName) {
		this.micItemName = micItemName;
	}

	public String getMicsCodeNo() {
		return micsCodeNo;
	}

	public void setMicsCodeNo(String micsCodeNo) {
		this.micsCodeNo = micsCodeNo;
	}

	public String getMicsName() {
		return micsName;
	}

	public void setMicsName(String micsName) {
		this.micsName = micsName;
	}
	
}

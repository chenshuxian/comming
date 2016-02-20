package com.daan.domain;

import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrInstrumentsItems
 * @Description: [中心仪器关联项目表]
 * @author zhoujie
 * @date 2015年11月26日 下午20:06:01
 */
@LogModule(moduleName = Constant.MODULE_CTRINSTRUMENTS_ITEM, entityName = Constant.ENTITY_CTRINSTRUMENTS_ITEM, moduleId = Constant.MODULEID_CTRINSTRUMENTS_ITEM)
public class CtrInstrumentsItems {

	private Long id;// 主键
	private Long instrumentId; // 仪器id
	private String channelCode;// 通道码
	private String factor;// 转换系数
	private String unit;// 项目单位
	private Integer printOrder;// 打印顺序
	private Long testItemId;// 项目id
	private String testItemName;// 项目名称
	private Date timeVersion;// 时间版本

	private String instrumentName;//仪器名称
	private String codeNo;//编码
	private String itemCodeNo;// 项目的编码
	
	
	
	
	
	private String itemName;// 项目的名称
	private String itemEnShortName;// 项目的英文简称
	private String itemSampleTypeName;// 项目的默认标本类型
	private String itemSampleTypeId; // 项目的标本类型ID
	private String itemSampleTypeCodeNo; // 项目的标本类型code
	private String itemTestMethodId; // 项目的检验方法ID
	private String itemTestMethodCodeNo; // 项目的检验方法code
	
	public CtrInstrumentsItems() {
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

	@Log(name = "转换系数")
	public String getFactor() {
		return factor;
	}
	
	public void setFactor(String factor) {
		this.factor = factor;
	}

	@Log(name = "通道码")
	public String getChannelCode() {
		return channelCode;
	}

	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}

	@Log(name = "项目单位")
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	@Log(name = "打印顺序")
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

	@Log(name = "项目名称")
	public String getTestItemName() {
		return testItemName;
	}

	public void setTestItemName(String testItemName) {
		this.testItemName = testItemName;
	}

	public String getItemCodeNo() {
		return itemCodeNo;
	}

	public void setItemCodeNo(String itemCodeNo) {
		this.itemCodeNo = itemCodeNo;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemEnShortName() {
		return itemEnShortName;
	}

	public void setItemEnShortName(String itemEnShortName) {
		this.itemEnShortName = itemEnShortName;
	}

	public String getItemSampleTypeName() {
		return itemSampleTypeName;
	}

	public void setItemSampleTypeName(String itemSampleTypeName) {
		this.itemSampleTypeName = itemSampleTypeName;
	}

	public String getItemSampleTypeId() {
		return itemSampleTypeId;
	}

	public void setItemSampleTypeId(String itemSampleTypeId) {
		this.itemSampleTypeId = itemSampleTypeId;
	}

	public String getItemSampleTypeCodeNo() {
		return itemSampleTypeCodeNo;
	}

	public void setItemSampleTypeCodeNo(String itemSampleTypeCodeNo) {
		this.itemSampleTypeCodeNo = itemSampleTypeCodeNo;
	}

	public String getItemTestMethodId() {
		return itemTestMethodId;
	}

	public void setItemTestMethodId(String itemTestMethodId) {
		this.itemTestMethodId = itemTestMethodId;
	}

	public String getItemTestMethodCodeNo() {
		return itemTestMethodCodeNo;
	}

	public void setItemTestMethodCodeNo(String itemTestMethodCodeNo) {
		this.itemTestMethodCodeNo = itemTestMethodCodeNo;
	}
	

}

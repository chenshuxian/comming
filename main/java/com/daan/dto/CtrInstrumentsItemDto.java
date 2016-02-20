package com.daan.dto;

import java.util.List;

public class CtrInstrumentsItemDto implements Cloneable {
	private String id;
	private String instrumentId; // 仪器ID
	private String testItemId; // 项目ID
	private String codeNo; // 项目编码
	private String name;// 项目名称
	private String enShortName;// 英文简称
	private String channelCode;// 通道码
	private String factor;// 转换系数
	private String printOrder;// 打印次序
	private String unit;// 单位
	private String sampleTypeId; // 标本类型ID
	private String sampleTypeName; // 标本类型名称

	private List<String> txtId; //List
	private List<String> txtChannelCode; //通道码List
	private List<String> txtFactor; //转换系数List
	private List<String> txtPrintOrder; //打印次序List
	private List<String> txtUnit; //单位List
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(String instrumentId) {
		this.instrumentId = instrumentId;
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

	public String getEnShortName() {
		return enShortName;
	}

	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
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

	public String getPrintOrder() {
		return printOrder;
	}

	public void setPrintOrder(String printOrder) {
		this.printOrder = printOrder;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(String sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}

	public String getSampleTypeName() {
		return sampleTypeName;
	}

	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}

	public String getTestItemId() {
		return testItemId;
	}

	public void setTestItemId(String testItemId) {
		this.testItemId = testItemId;
	}

	public List<String> getTxtChannelCode() {
		return txtChannelCode;
	}

	public void setTxtChannelCode(List<String> txtChannelCode) {
		this.txtChannelCode = txtChannelCode;
	}

	public List<String> getTxtFactor() {
		return txtFactor;
	}

	public void setTxtFactor(List<String> txtFactor) {
		this.txtFactor = txtFactor;
	}

	public List<String> getTxtPrintOrder() {
		return txtPrintOrder;
	}

	public void setTxtPrintOrder(List<String> txtPrintOrder) {
		this.txtPrintOrder = txtPrintOrder;
	}

	public List<String> getTxtUnit() {
		return txtUnit;
	}

	public void setTxtUnit(List<String> txtUnit) {
		this.txtUnit = txtUnit;
	}

	public List<String> getTxtId() {
		return txtId;
	}

	public void setTxtId(List<String> txtId) {
		this.txtId = txtId;
	}

}

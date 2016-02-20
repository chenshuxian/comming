package com.daan.dto;

import java.util.List;

public class CtrInstrumentsMicsDto implements Cloneable {
	private String id;
	private String idString;
	private String instrumentId; // 仪器ID
	private String itemTypeId; // 项目分类:1 — 细菌 ， 2— 抗生素
	private String micItemId; // 微生物ID
	private String codeNo; // 项目编码
	private String name;// 项目名称
	private String enShortName;// 英文简称
	private String channelCode;// 通道码
	private String printOrder;// 打印次序

	private List<String> txtIdGerm; //List （细菌）
	private List<String> txtChannelCodeGerm; //通道码List（细菌）
	private List<String> txtPrintOrderGerm; //打印次序List（细菌）
	private List<String> txtIdAnti; //List（抗生素）
	private List<String> txtChannelCodeAnti; //通道码List（抗生素）
	private List<String> txtPrintOrderAnti; //打印次序List（抗生素）
	
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

	public String getPrintOrder() {
		return printOrder;
	}

	public void setPrintOrder(String printOrder) {
		this.printOrder = printOrder;
	}
	
	public List<String> getTxtIdGerm() {
		return txtIdGerm;
	}

	public void setTxtIdGerm(List<String> txtIdGerm) {
		this.txtIdGerm = txtIdGerm;
	}

	public List<String> getTxtChannelCodeGerm() {
		return txtChannelCodeGerm;
	}

	public void setTxtChannelCodeGerm(List<String> txtChannelCodeGerm) {
		this.txtChannelCodeGerm = txtChannelCodeGerm;
	}

	public List<String> getTxtPrintOrderGerm() {
		return txtPrintOrderGerm;
	}

	public void setTxtPrintOrderGerm(List<String> txtPrintOrderGerm) {
		this.txtPrintOrderGerm = txtPrintOrderGerm;
	}

	public List<String> getTxtIdAnti() {
		return txtIdAnti;
	}

	public void setTxtIdAnti(List<String> txtIdAnti) {
		this.txtIdAnti = txtIdAnti;
	}

	public List<String> getTxtChannelCodeAnti() {
		return txtChannelCodeAnti;
	}

	public void setTxtChannelCodeAnti(List<String> txtChannelCodeAnti) {
		this.txtChannelCodeAnti = txtChannelCodeAnti;
	}

	public List<String> getTxtPrintOrderAnti() {
		return txtPrintOrderAnti;
	}

	public void setTxtPrintOrderAnti(List<String> txtPrintOrderAnti) {
		this.txtPrintOrderAnti = txtPrintOrderAnti;
	}

	public String getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(String itemTypeId) {
		this.itemTypeId = itemTypeId;
	}

	public String getMicItemId() {
		return micItemId;
	}

	public void setMicItemId(String micItemId) {
		this.micItemId = micItemId;
	}

	public String getIdString() {
		return id;
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}

	
	
}

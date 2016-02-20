package com.daan.dto;

public class CtrInstrumentsMicsQueryDto implements Cloneable {
	private String instrumentId;
	private String itemTypeId; // 项目分类:1 — 细菌 ， 2— 抗生素
	private String micItemId;
	private String germSearchStr;// 主页面，细菌列表的搜索条件
	private String addGermSearchStr;// 添加细菌页面，搜索条件
	private String antiSearchStr;// 主页面，抗生素列表的搜索条件
	private String addAntiSearchStr;// 添加抗生素页面，搜索条件
	private String init; // 是否第一次进入未包含微生物列表页面。

	public String getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(String instrumentId) {
		this.instrumentId = instrumentId;
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

	public String getGermSearchStr() {
		return germSearchStr;
	}

	public void setGermSearchStr(String germSearchStr) {
		this.germSearchStr = germSearchStr;
	}

	public String getAddGermSearchStr() {
		return addGermSearchStr;
	}

	public void setAddGermSearchStr(String addGermSearchStr) {
		this.addGermSearchStr = addGermSearchStr;
	}

	public String getAntiSearchStr() {
		return antiSearchStr;
	}

	public void setAntiSearchStr(String antiSearchStr) {
		this.antiSearchStr = antiSearchStr;
	}

	public String getAddAntiSearchStr() {
		return addAntiSearchStr;
	}

	public void setAddAntiSearchStr(String addAntiSearchStr) {
		this.addAntiSearchStr = addAntiSearchStr;
	}

	public String getInit() {
		return init;
	}

	public void setInit(String init) {
		this.init = init;
	}

}

package com.daan.dto;

public class CtrInstrumentsItemQueryDto implements Cloneable {
	private String instrumentId;
	private String testItemId;
	private String sampleTypeId;
	private String sexId;
	private String ageUnitId;
	private String itemSearchStr;// 主页面，项目列表的搜索条件
	private String addItemSearchStr;// 添加项目页面，搜索条件
	private String testMethodId; //添加项目页面，搜索条件（检验方法）
	private String init; // 是否第一次进入未包含项目列表页面。
	
	public String getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(String instrumentId) {
		this.instrumentId = instrumentId;
	}

	public String getItemSearchStr() {
		return itemSearchStr;
	}

	public void setItemSearchStr(String itemSearchStr) {
		this.itemSearchStr = itemSearchStr;
	}

	public String getTestItemId() {
		return testItemId;
	}

	public void setTestItemId(String testItemId) {
		this.testItemId = testItemId;
	}

	public String getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(String sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}

	public String getSexId() {
		return sexId;
	}

	public void setSexId(String sexId) {
		this.sexId = sexId;
	}

	public String getAgeUnitId() {
		return ageUnitId;
	}

	public void setAgeUnitId(String ageUnitId) {
		this.ageUnitId = ageUnitId;
	}

	public String getAddItemSearchStr() {
		return addItemSearchStr;
	}

	public void setAddItemSearchStr(String addItemSearchStr) {
		this.addItemSearchStr = addItemSearchStr;
	}

	public String getTestMethodId() {
		return testMethodId;
	}

	public void setTestMethodId(String testMethodId) {
		this.testMethodId = testMethodId;
	}

	public String getInit() {
		return init;
	}

	public void setInit(String init) {
		this.init = init;
	}

}

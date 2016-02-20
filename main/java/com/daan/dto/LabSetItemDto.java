package com.daan.dto;

public class LabSetItemDto {
	private Integer id;
	private Integer labSet;
	private String  labSetName;
	private Integer labGroup;
	private String  labGroupName;
	private String  labGroupEnName;
	private Integer labTestItem;
	private String  labTestItemName;
	private String  uniqueCode;
	private String  enName;
	private String  testMethodName;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getLabSet() {
		return labSet;
	}
	public void setLabSet(Integer labSet) {
		this.labSet = labSet;
	}
	public String getLabSetName() {
		return labSetName;
	}
	public void setLabSetName(String labSetName) {
		this.labSetName = labSetName;
	}
	public Integer getLabGroup() {
		return labGroup;
	}
	public void setLabGroup(Integer labGroup) {
		this.labGroup = labGroup;
	}
	public String getLabGroupName() {
		return labGroupName;
	}
	public void setLabGroupName(String labGroupName) {
		this.labGroupName = labGroupName;
	}
	public String getLabGroupEnName() {
		return labGroupEnName;
	}
	public void setLabGroupEnName(String labGroupEnName) {
		this.labGroupEnName = labGroupEnName;
	}
	public Integer getLabTestItem() {
		return labTestItem;
	}
	public void setLabTestItem(Integer labTestItem) {
		this.labTestItem = labTestItem;
	}
	public String getLabTestItemName() {
		return labTestItemName;
	}
	public void setLabTestItemName(String labTestItemName) {
		this.labTestItemName = labTestItemName;
	}
	public String getUniqueCode() {
		return uniqueCode;
	}
	public void setUniqueCode(String uniqueCode) {
		this.uniqueCode = uniqueCode;
	}
	public String getEnName() {
		return enName;
	}
	public void setEnName(String enName) {
		this.enName = enName;
	}
	public String getTestMethodName() {
		return testMethodName;
	}
	public void setTestMethodName(String testMethodName) {
		this.testMethodName = testMethodName;
	}
	
}

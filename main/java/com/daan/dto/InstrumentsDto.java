package com.daan.dto;

/**
 * 
 * @ClassName: InstrumentsDto 
 * @Description: TODO(客户仪器信息DTO) 
 * @author xiaobing
 * @date 2015年12月10日 上午11:36:14
 */
public class InstrumentsDto implements Cloneable {

	private String searchStr;
	private String frontClassName;
	private String status;
	private String sort;
	private String page;		 // 分页
	private String pageNo;	
	private String orgsId;		 // 机构ID
	private String instrumentId; // 仪器ID
	private String testMethodId; //检验方法ID
	private String itemTypeId;   // 项目分类:1 — 细菌 ， 2— 抗生素     
	private String testItemId;   //检验项目ID
	
	public String getSearchStr() {
		return searchStr;
	}

	public void setSearchStr(String searchStr) {
		this.searchStr = searchStr;
	}

	public String getFrontClassName() {
		return frontClassName;
	}

	public void setFrontClassName(String frontClassName) {
		this.frontClassName = frontClassName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getOrgsId() {
		return orgsId;
	}

	public void setOrgsId(String orgsId) {
		this.orgsId = orgsId;
	}

	public String getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(String instrumentId) {
		this.instrumentId = instrumentId;
	}

	public String getTestMethodId() {
		return testMethodId;
	}

	public void setTestMethodId(String testMethodId) {
		this.testMethodId = testMethodId;
	}

	public String getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(String itemTypeId) {
		this.itemTypeId = itemTypeId;
	}

	public String getTestItemId() {
		return testItemId;
	}

	public void setTestItemId(String testItemId) {
		this.testItemId = testItemId;
	}
}

package com.daan.dto;

public class InstrumentBoxDto {

	//搜索内容
	private String searchStr;
	
	//状态：全部、可用、停用。
	private String status;
	
	//排序：按顺序号升序、按名称升序、按录入顺序降序
	private String sort;
	
	//分页
	private String page;
	
	//机构
	private Integer orgId;

	public String getSearchStr() {
		return searchStr;
	}

	public void setSearchStr(String searchStr) {
		this.searchStr = searchStr;
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

	public Integer getOrgId() {
		return orgId;
	}

	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	
	
}

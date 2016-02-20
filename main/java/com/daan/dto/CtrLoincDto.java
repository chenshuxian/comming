package com.daan.dto;
/**
 * 
 * @ClassName: CtrLoincDto 
 * @Description: TODO(LOINC编码表DTO) 
 * @author xiaobing
 * @date 2015年12月07日 上午11:36:14
 */
public class CtrLoincDto implements Cloneable {

	private String searchStr;
	private String frontClassName;
	private String status;
	private String sort;
	private String page;//分页
	private String pageNo;
	
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
}

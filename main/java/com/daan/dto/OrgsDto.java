package com.daan.dto;
/**
 * 
 * @ClassName: OrgsDto 
 * @Description: TODO(机构单位信息DTO) 
 * @author xiaobing
 * @date 2015年12月10日 上午11:36:14
 */
public class OrgsDto implements Cloneable {

	private String searchStr;
	private String frontClassName;
	private String status;
	private String sort;
	private String page; //分页
	private String pageNo;
	private String orgId;
	
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

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
}

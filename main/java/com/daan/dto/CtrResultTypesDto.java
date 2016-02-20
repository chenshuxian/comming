package com.daan.dto;

/**
 * 
* @ClassName: CtrResultTypesDto 
* @Description: TODO(结果类型-DTO) 
* @author zengxiaowang
* @date 2015年12月7日 上午9:29:43 
*
 */
public class CtrResultTypesDto {
	
	private String searchStr;
	private String frontClassName;
	private String status;
	private String sort;
	private String page;// 分页

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
}

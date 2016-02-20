package com.daan.dto;

/**
 * 
 * @ClassName: CentreMicrobeItem 
 * @Description: 中心微生物字典表Dto
 * @author liujiawei
 * @date 2015年12月10日 下午7:51:50
 */
public class CentreMicrobeItemDto{
	
	private String searchStr;
	private String frontClassName;
	private String status;
	private String sort;
	private String page;
	private Integer itemTypeId;
	
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
	
	public Integer getItemTypeId() {
		return itemTypeId;
	}
	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}
	
}

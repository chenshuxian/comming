package com.daan.dto;

/**
 * @ClassName: CenterOrgQueryDto
 * @Description: TODO(实验室、机构Dto)
 * @author zhangliping
 * @date 2015年12月7日 下午2:24:55
 */
public class CenterOrgQueryDto implements Cloneable {
	private String searchStr;// 检索的内容
	private String status;// 状态
	private String sort;// 排序
	private String page;// 分页
	private Integer orgTypeId;// 编码表中对应的类型
	private Integer orgType;// 数据库表中对应的类型
	private String parentId;//父ID
	private String childId;//子ID
	private String regionId;//地区ID
	private String orgTypeFlag;//是否检测机构：独立实验室和医疗机构，客户仪器信息下拉数据源
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

	public Integer getOrgTypeId() {
		return orgTypeId;
	}

	public void setOrgTypeId(Integer orgTypeId) {
		this.orgTypeId = orgTypeId;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	public String getChildId() {
		return childId;
	}

	public void setChildId(String childId) {
		this.childId = childId;
	}

	public Integer getOrgType() {
		return orgType;
	}

	public void setOrgType(Integer orgType) {
		this.orgType = orgType;
	}

	public String getOrgTypeFlag() {
		return orgTypeFlag;
	}

	public void setOrgTypeFlag(String orgTypeFlag) {
		this.orgTypeFlag = orgTypeFlag;
	}

}

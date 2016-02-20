package com.daan.dto;

/**
 * 
 * @ClassName: InstrMicsDto
 * @Description: TODO(微生物的细菌、抗生素仪器通道-DTO)
 * @author zengxiaowang
 * @date 2015年12月7日 上午9:29:43
 *
 */
public class InstrMicsQueryDto {
	/**
	 * @Fields searchStr : TODO(搜索框值)
	 */
	private String searchStr;
	/**
	 * @Fields orgId : TODO(机构ID)
	 */
	private String orgId;
	/**
	 * @Fields sort : TODO(排序)
	 */
	private String sort;
	/**
	 * @Fields page : TODO(分页)
	 */
	private String page;
	/**
	 * @Fields typeKey : TODO(字典类型)
	 */
	private Integer itemTypeId;
	/**
	 * @Fields typeKey : TODO(字典类型)
	 */
	private String instrumentId;

	public String getSearchStr() {
		return searchStr;
	}

	public void setSearchStr(String searchStr) {
		this.searchStr = searchStr;
	}

	public String getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(String instrumentId) {
		this.instrumentId = instrumentId;
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

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
}

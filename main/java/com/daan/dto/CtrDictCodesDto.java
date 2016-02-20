package com.daan.dto;

/**
 * 
* @ClassName: CtrDictCodesDto 
* @Description: TODO(基础字典-DTO) 
* @author zengxiaowang
* @date 2015年12月7日 上午9:29:43 
*
 */
public class CtrDictCodesDto {
	/** 
	* @Fields searchStr : TODO(搜索框值) 
	*/
	private String searchStr;
	/** 
	* @Fields status : TODO(状态) 
	*/
	private String status;
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
	private Integer typeKey;

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
	
	public Integer getTypeKey() {
		return typeKey;
	}

	public void setTypeKey(Integer typeKey) {
		this.typeKey = typeKey;
	}
}

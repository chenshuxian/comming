package com.daan.dto;

/**
 * 
* @ClassName: CtrDictCodesDto 
* @Description: TODO(试管类型-DTO) 
* @author zengxiaowang
* @date 2015年12月7日 上午9:29:43 
*
 */
public class CtrTubeTypesDto {
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
}

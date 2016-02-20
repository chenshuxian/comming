package com.daan.dto;

/**
 * 
* @ClassName: CtrResultTypesDto 
* @Description: TODO(结果类型-DTO) 
* @author zengxiaowang
* @date 2015年12月7日 上午9:29:43 
*
 */
public class CtrResultTypeDetailDto {
	/** 
	* @Fields searchStr : TODO(搜索框值) 
	*/
	private String searchStr;
	/** 
	* @Fields typeId : TODO(结果类型ID) 
	*/
	private String typeId;
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

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
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

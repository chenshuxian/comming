package com.daan.utils;

import java.util.List;

/**
 * DataGrid分页
 * @author xiaobing
 *
 * @param <T>
 */
public class DataGrid <T>{
	
    private int total;	  	  	 			// 显示的总数
    private List<T> rows; 	  	 			// 行数据 
    private int page = 1;	  	 			// DataGrid 当前页数, 默认为第1页
	private int pageSize = 10;	 			// DataGrid 每页显示的条数，默认显示10条数据
	private int startIndex ;  	 			// 分页条件
	private String searchStr; 	 			// 搜索条件
	private String searchStatus; 			// 状态	
	private String searchSort;	 			// 排序
	private String searchFrontClassName;	// 前台通讯类
	private int typeKey;	  	 			// 本地字典类型
	private String areaType;	 			// 添加区域用户搜索条件
	
	private String orgId;
	private String appId;
	
	private Long org_Id;
	private Long app_Id;
	
	private String beginTime;		 //开始时间
	private String endTime;		 //结束时间
	private String moduleId;	 //模块名称
	private int itemTypeId;	  	 // 本地微生物字典类型
	private int micTypeId;      // 微生物字典类型
	private Long groupsId;        //组合ID
	
	public Long getGroupsId() {
		return groupsId;
	}

	public void setGroupsId(Long groupsId) {
		this.groupsId = groupsId;
	}

	public int getMicTypeId() {
		return micTypeId;
	}

	public void setMicTypeId(int micTypeId) {
		this.micTypeId = micTypeId;
	}

	private String resultTypeId;	//结果类型ID
 
    public DataGrid(){
    	 
    }
    
    public DataGrid(int total, List<T> rows) {
        this.total = total;
        this.rows = rows;
    }
 
    public List<T> getRows() {
        return rows;
    }
 
    public void setRows(List<T> list) {
        this.rows = list;
    }
 
    public int getTotal() {
        return total;
    }
 
    public void setTotal(int total) {
        this.total = total;
    }

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getStartIndex() {
		startIndex = (this.page - 1) * pageSize;
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public String getSearchStr() {
		return searchStr;
	}

	public void setSearchStr(String searchStr) {
		this.searchStr = searchStr;
	}

	public String getSearchStatus() {
		return searchStatus;
	}

	public void setSearchStatus(String searchStatus) {
		this.searchStatus = searchStatus;
	}

	public String getSearchSort() {
		return searchSort;
	}

	public void setSearchSort(String searchSort) {
		this.searchSort = searchSort;
	}

	public String getSearchFrontClassName() {
		return searchFrontClassName;
	}

	public void setSearchFrontClassName(String searchFrontClassName) {
		this.searchFrontClassName = searchFrontClassName;
	}

	public int getTypeKey() {
		return typeKey;
	}

	public void setTypeKey(int typeKey) {
		this.typeKey = typeKey;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public Long getOrg_Id() {
		return org_Id;
	}

	public void setOrg_Id(Long org_Id) {
		this.org_Id = org_Id;
	}

	public Long getApp_Id() {
		return app_Id;
	}

	public void setApp_Id(Long app_Id) {
		this.app_Id = app_Id;
	}
	
	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}

	public int getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(int itemTypeId) {
		this.itemTypeId = itemTypeId;
	}

	public String getResultTypeId() {
		return resultTypeId;
	}

	public void setResultTypeId(String resultTypeId) {
		this.resultTypeId = resultTypeId;
	}

	public String getAreaType() {
		return areaType;
	}

	public void setAreaType(String areaType) {
		this.areaType = areaType;
	}
}

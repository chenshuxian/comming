package com.daan.dto;

public class QueryDto implements Cloneable {
	private String typeCode;
	private String searchStr;
	private String searchGroupStr;//组合项目中添加项目时的搜索字段
	private String status;
	private String orderField;
	private String orderType;
	private Integer salesRegionId;//销售区域ID
	private String salesAreaName;//销售区域名字
	private Integer laboratoryId;//实验室ID
	private String laboratoryName;//实验室名字
	private Integer admAreaId;//行政区域id
	private Long testitemId;//测试项目ID
	private Long groupID;	//组合ID
	private String groupName;	//组合名
	private Integer contractId;//合同ID
	private Integer setID;		//套餐ID
	private String setName;		//套餐名
	private Integer userId;	//用户ID
	private String moduleName;
	private Integer roleId;	//用户ID
	private String testItemFlag;
	private String startDate;
	private String endDate;
	private String uniqueCode;
	private Integer disciplineId;//医学专业组ID
	private String page;
	private Long instrumentId; //仪器id
	
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public Integer getDisciplineId() {
		return disciplineId;
	}
	public void setDisciplineId(Integer disciplineId) {
		this.disciplineId = disciplineId;
	}
	public String getTypeCode() {
		return typeCode;
	}
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}
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
	public String getOrderField() {
		return orderField;
	}
	public void setOrderField(String orderField) {
		this.orderField = orderField;
	}
	public String getOrderType() {
		return orderType;
	}
	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}
	public Integer getSalesRegionId() {
		return salesRegionId;
	}
	public void setSalesRegionId(Integer salesRegionId) {
		this.salesRegionId = salesRegionId;
	}
	public Integer getLaboratoryId() {
		return laboratoryId;
	}
	public void setLaboratoryId(Integer laboratoryId) {
		this.laboratoryId = laboratoryId;
	}
	public Integer getAdmAreaId() {
		return admAreaId;
	}
	public void setAdmAreaId(Integer admAreaId) {
		this.admAreaId = admAreaId;
	}
	public Long getTestitemId() {
		return testitemId;
	}
	public void setTestitemId(Long testitemId) {
		this.testitemId = testitemId;
	}
	public Long getGroupID() {
		return groupID;
	}
	public void setGroupID(Long groupID) {
		this.groupID = groupID;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public Integer getContractId() {
		return contractId;
	}
	public void setContractId(Integer contractId) {
		this.contractId = contractId;
	}
	public Integer getSetID() {
		return setID;
	}
	public void setSetID(Integer setID) {
		this.setID = setID;
	}
	public String getSetName() {
		return setName;
	}
	public void setSetName(String setName) {
		this.setName = setName;
	}
	public String getSalesAreaName() {
		return salesAreaName;
	}
	public void setSalesAreaName(String salesAreaName) {
		this.salesAreaName = salesAreaName;
	}
	public String getLaboratoryName() {
		return laboratoryName;
	}
	public void setLaboratoryName(String laboratoryName) {
		this.laboratoryName = laboratoryName;
	}
	public String getTestItemFlag() {
		return testItemFlag;
	}
	public void setTestItemFlag(String testItemFlag) {
		this.testItemFlag = testItemFlag;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public Long getInstrumentId() {
		return instrumentId;
	}
	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}
	public String getSearchGroupStr() {
		return searchGroupStr;
	}
	public void setSearchGroupStr(String searchGroupStr) {
		this.searchGroupStr = searchGroupStr;
	}
	
	@Override
	public QueryDto clone() throws CloneNotSupportedException{
		return (QueryDto)super.clone();
	}
	public String getUniqueCode() {
		return uniqueCode;
	}
	public void setUniqueCode(String uniqueCode) {
		this.uniqueCode = uniqueCode;
	}
}

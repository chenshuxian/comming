package com.daan.domain;

import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: CtrTestGroupDetails 
 * @Description: TODO(组合项目明细) 
 * @author xieruiyun
 * @date 2015年12月8日 下午4:21:54
 */
@LogModule(moduleName = Constant.MODULE_GROUP_TESTITEM, entityName = Constant.ENTITY_GROUP_TESTITEM, moduleId = Constant.MODULEID_GROUP_TESTITEM )
public class CtrTestGroupDetails {
	
	private String idString; //
	private Long id; // '[主键id] — 使用 【系统id规则】',
	private Long testGroupId; //'[组合、套餐id] — 外键，如果明细对应一个套餐则此处是该套餐的id。',
	private Long testItemId; // '[项目id] — 套餐、组合对应的项目id ,一个套餐包含多个组合，如果是一个套餐这里就会保存组合的id. 如果是组合这里保存项目id，套餐保存的内容要详细到项目。',
	private Integer itemType;// '[项目类型] —  1— 项目， 2— 组合,一个套餐下面可以包含多个组合.',
	private Integer leftValue;// '[左值] —  标记树的子孙节点的左边的值。',
	private Integer rightValue;// '[右值] — 标记树的子孙节点的右边的值。',
	private Date timeVersion; // 时间版本
	private String testItemName;//项目名称
	private String codeNo;//编码
	
	public String getIdString() {
		return idString;
	}
	public void setIdString(String idString) {
		this.idString = idString;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getTestGroupId() {
		return testGroupId;
	}
	public void setTestGroupId(Long testGroupId) {
		this.testGroupId = testGroupId;
	}
	public Long getTestItemId() {
		return testItemId;
	}
	public void setTestItemId(Long testItemId) {
		this.testItemId = testItemId;
	}
	public Integer getItemType() {
		return itemType;
	}
	public void setItemType(Integer itemType) {
		this.itemType = itemType;
	}
	public Integer getLeftValue() {
		return leftValue;
	}
	public void setLeftValue(Integer leftValue) {
		this.leftValue = leftValue;
	}
	public Integer getRightValue() {
		return rightValue;
	}
	public void setRightValue(Integer rightValue) {
		this.rightValue = rightValue;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	@Log(name = "项目名称", order = 2, isSummary = true)
	public String getTestItemName() {
		return testItemName;
	}
	public void setTestItemName(String testItemName) {
		this.testItemName = testItemName;
	}
	@Log(name = "达安标准码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}
	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}

}

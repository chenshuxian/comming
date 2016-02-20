package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrLoinc
 * @Description: TODO([LOINC编码对应表] - 检验项目与LOINC编码的对应关系表， 有这个对应表可以使得标本中检验项目能找到LOINC编码。
 * 检验项目对应LOINC 是通过 一下六个属性（受检成份 component_id,受检属性 property_id, 检验方法 test_method_id,样本标识 type_of_scale_id,
 * 时间特性 time_aspect_id,标本类型 sample_type_id）分别进行对照而得出LOINC编码。)
 * @author xiaobing
 * @date 2015年12月07日 上午11:06:01
 */
@LogModule(entityName = Constant.ENTITY_CTRLOINC, moduleName = Constant.MODULE_CTRLOINC, moduleId=Constant.CODE_CTRLOINC)
public class CtrLoinc implements Cloneable{
	
	private Long id;		   		// LOINC编码主键
	private String idString; 		// 避免前台页面中，JSON对象对long数据类型的精度丢失
	private String codeNo;     		// LOINC编码
	private Long componentId;  		// 受检成份ID
	private String componentName;  	// 受检成份
	private Long testPropertyId;	// 受检属性ID
	private String testPropertyName;// 受检属性
	private Long testMethodId;		// 检验方法ID
	private String testMethodName;	// 检验方法
	private Long typeOfScaleId;		// 样本标识ID
	private String typeOfScaleName; // 样本标识
	private Long timeAspectId;		// 时间特性ID
	private String timeAspectName;	// 时间特性
	private Long sampleTypeId;		// 标本类型ID
	private String sampleTypeName;	// 标本类型
	private String fastCode;		// 助记符
	private Integer displayOrder;   // 顺序号
	private String memo;			// 备注
	private Integer status; 		// 状态(停用标志，0 —使用, 1 — 停用)
	private Date timeVersion;		// 时间版本 
	
	public CtrLoinc(){
	}
	
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
	
	@Log(name="LOINC编码", order=1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	
	public Long getComponentId() {
		return componentId;
	}

	public void setComponentId(Long componentId) {
		this.componentId = componentId;
	}
	
	public Long getTestPropertyId() {
		return testPropertyId;
	}

	public void setTestPropertyId(Long testPropertyId) {
		this.testPropertyId = testPropertyId;
	}
	
	public Long getTestMethodId() {
		return testMethodId;
	}
	
	public void setTestMethodId(Long testMethodId) {
		this.testMethodId = testMethodId;
	}
	
	public Long getTypeOfScaleId() {
		return typeOfScaleId;
	}

	public void setTypeOfScaleId(Long typeOfScaleId) {
		this.typeOfScaleId = typeOfScaleId;
	}
	
	public Long getTimeAspectId() {
		return timeAspectId;
	}

	public void setTimeAspectId(Long timeAspectId) {
		this.timeAspectId = timeAspectId;
	}
	
	public Long getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(Long sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}
	
	@Log(name="助记符")
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}
	
	@Log(name="顺序号")
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	
	@Log(name="备注")
	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	@Log(name = "状态", valueFormat = Constant.STATUS_FORMAT)
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	
	@Log(name="受检成份")
	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}
	
	@Log(name="受检属性")
	public String getTestPropertyName() {
		return testPropertyName;
	}

	public void setTestPropertyName(String testPropertyName) {
		this.testPropertyName = testPropertyName;
	}
	
	@Log(name="检验方法")
	public String getTestMethodName() {
		return testMethodName;
	}

	public void setTestMethodName(String testMethodName) {
		this.testMethodName = testMethodName;
	}
	
	@Log(name="样本标识")
	public String getTypeOfScaleName() {
		return typeOfScaleName;
	}

	public void setTypeOfScaleName(String typeOfScaleName) {
		this.typeOfScaleName = typeOfScaleName;
	}
	
	@Log(name="时间特性")
	public String getTimeAspectName() {
		return timeAspectName;
	}

	public void setTimeAspectName(String timeAspectName) {
		this.timeAspectName = timeAspectName;
	}
	
	@Log(name="标本类型")
	public String getSampleTypeName() {
		return sampleTypeName;
	}

	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}
	
	public Object clone() throws CloneNotSupportedException {
		CtrLoinc ctrLoinc = (CtrLoinc) super.clone();
		return ctrLoinc;
	}
	
	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}

	public String getComponentIdString() {
		return this.componentId == null ? "" : this.componentId.toString();
	}

	public String getTestPropertyIdString() {
		return this.testPropertyId == null ? "" : this.testPropertyId.toString();
	}

	public String getTestMethodIdString() {
		return this.testMethodId == null ? "" : this.testMethodId.toString();
	}

	public String getTypeOfScaleIdString() {
		return this.typeOfScaleId == null ? "" : this.typeOfScaleId.toString();
	}

	public String getSampleTypeIdString() {
		return this.sampleTypeId == null ? "" : this.sampleTypeId.toString();
	}

	public String getTimeAspectIdString() {
		return this.timeAspectId == null ? "" : this.timeAspectId.toString();
	}

}

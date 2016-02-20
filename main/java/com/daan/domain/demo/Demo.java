package com.daan.domain.demo;

import com.daan.domain.BaseEntity;
import com.daan.domain.Constant;
import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

@LogModule(moduleName=Constant.MODULE_LOINCDICT,entityName="Loinc编码")
public class Demo extends BaseEntity {
	private static final long serialVersionUID = 5503612483583467473L;
	
	private String code;//编码
	private String testedElement;
	private String testedProperties;
	private String testMethod;
	private String specimenMark;
	private String timeProperties;
	private String specimenType;
	
	private String testedElementName;
	private String testedPropertiesName;
	private String testMethodName;
	private String specimenMarkName;
	private String timePropertiesName;
	private String specimenTypeName;
	
	private String remark;
	private Boolean active;//是否可用
	


	@Log(name="编码",order=1)
	public String getCode() {
		return code;
	}




	public void setCode(String code) {
		this.code = code;
	}



	@Log(name="名称",order=2)
	public String getTestedElement() {
		return testedElement;
	}




	public void setTestedElement(String testedElement) {
		this.testedElement = testedElement;
	}



	@Log(name="getTestedProperties",order=3)
	public String getTestedProperties() {
		return testedProperties;
	}




	public void setTestedProperties(String testedProperties) {
		this.testedProperties = testedProperties;
	}



	@Log(name="getTestMethod",order=4)
	public String getTestMethod() {
		return testMethod;
	}




	public void setTestMethod(String testMethod) {
		this.testMethod = testMethod;
	}



	@Log(name="getSpecimenMark",order=5)
	public String getSpecimenMark() {
		return specimenMark;
	}




	public void setSpecimenMark(String specimenMark) {
		this.specimenMark = specimenMark;
	}



	@Log(name="getTimeProperties",order=6)
	public String getTimeProperties() {
		return timeProperties;
	}




	public void setTimeProperties(String timeProperties) {
		this.timeProperties = timeProperties;
	}



	@Log(name="getSpecimenType",order=6)
	public String getSpecimenType() {
		return specimenType;
	}




	public void setSpecimenType(String specimenType) {
		this.specimenType = specimenType;
	}



	@Log(name="getTestedElementName",order=6)
	public String getTestedElementName() {
		return testedElementName;
	}




	public void setTestedElementName(String testedElementName) {
		this.testedElementName = testedElementName;
	}



	@Log(name="getTestedPropertiesName",order=6)
	public String getTestedPropertiesName() {
		return testedPropertiesName;
	}




	public void setTestedPropertiesName(String testedPropertiesName) {
		this.testedPropertiesName = testedPropertiesName;
	}



	@Log(name="testMethodName",order=6)
	public String getTestMethodName() {
		return testMethodName;
	}


	public void setTestMethodName(String testMethodName) {
		this.testMethodName = testMethodName;
	}



	@Log(name="getSpecimenMarkName",order=6)
	public String getSpecimenMarkName() {
		return specimenMarkName;
	}




	public void setSpecimenMarkName(String specimenMarkName) {
		this.specimenMarkName = specimenMarkName;
	}



	@Log(name="getTimePropertiesName",order=6)
	public String getTimePropertiesName() {
		return timePropertiesName;
	}




	public void setTimePropertiesName(String timePropertiesName) {
		this.timePropertiesName = timePropertiesName;
	}



	@Log(name="getSpecimenTypeName",order=6)
	public String getSpecimenTypeName() {
		return specimenTypeName;
	}




	public void setSpecimenTypeName(String specimenTypeName) {
		this.specimenTypeName = specimenTypeName;
	}



	@Log(name="getRemark",order=6)
	public String getRemark() {
		return remark;
	}



	
	public void setRemark(String remark) {
		this.remark = remark;
	}



	@Log(name="getActive",order=6)
	public Boolean getActive() {
		return active;
	}




	public void setActive(Boolean active) {
		this.active = active;
	}




}

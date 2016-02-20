package com.daan.enums;

public enum OrgType implements BasisEnum {
	all("不限"),
	independentLaboratory("独立实验室"),
	medicalInstitutions("医疗机构"),
	regionalManagement("行政管理机构");


	OrgType(String text){
		this.text=text;
	}
	private String text;
	public String getName(){
		return this.name();		
	}
	public String getText(){
		return this.text;
	}

}

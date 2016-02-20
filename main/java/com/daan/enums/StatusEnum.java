package com.daan.enums;

public enum StatusEnum implements BasisEnum {
	
	all(-1, "全部"),
	enable(1, "启用"),
	disabled(0, "停用");
	
	private String text;
	private Integer index;
	
	private StatusEnum(Integer index, String text){
		this.index=index;
		this.text=text;
	}
	
	public String getName(){
		return this.name();		
	}
	
	public String getText(){
		return this.text;
	}
	
	public Integer getIndex(){
		return this.index;
	}
}
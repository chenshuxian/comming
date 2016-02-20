package com.daan.enums;

public enum TestType implements BasisEnum{
	
	all("不限"),
	single("单项"),
	group("组合"),
	set("套餐");
	
	TestType(String text){
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

package com.daan.enums;
public enum SortEnum implements BasisEnum{
	
	orderNo(0, "按顺序号升序"),
	orderName(1, "按名称升序"),
	orderEntry(2, "按录入顺序降序");

	private String text;
	private Integer index;
	
	private SortEnum(Integer index, String text){
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
package com.daan.enums;

/**
 * 中心仪器属性：排序
 * 
 * @author zhoujie
 *
 */
public enum InstrumentsSortEnum implements BasisEnum {

	seqnoAsc("按顺序号升序"), 
	nameAsc("按仪器名称升序"), 
	createTimeDesc("按录入顺序降序");

	InstrumentsSortEnum(String text) {
		this.text = text;
	}

	private String text;

	public String getName() {
		return this.name();
	}

	public String getText() {
		return this.text;
	}
}
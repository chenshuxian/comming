package com.daan.enums;

/**
 * 仪器类型
 * 
 * @author zhoujie
 *
 */
public enum InstrumentType implements BasisEnum {

	normal("常规"), 
	mic("微生物"), 
	textReport("文字报告"), 
	elisa("酶标");

	InstrumentType(String text) {
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
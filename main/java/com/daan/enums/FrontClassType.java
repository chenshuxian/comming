package com.daan.enums;

/**
 * 中心仪器属性：前台通讯类
 * 
 * @author zhoujie
 *
 */
public enum FrontClassType implements BasisEnum {

	blank("类名为空"), 
	notBlank("类名不为空");

	FrontClassType(String text) {
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
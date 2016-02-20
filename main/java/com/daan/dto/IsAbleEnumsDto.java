package com.daan.dto;

/**
 * 是否可能的枚举类
 * @author Wumingjava 2015-11-24
 */
public class IsAbleEnumsDto {
	/**
	 * 序号
	 */
	private int index;
	/**
	 * 名称
	 */
	private String name;
	/**
	 * 标签
	 */
	private String text;

	public IsAbleEnumsDto() {

	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}

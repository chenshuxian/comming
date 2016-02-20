package com.daan.enums;

/**
 * 仪器参数属性：停止位
 * 
 * @author zhoujie
 *
 */
public enum StopBitType implements BasisEnum {

	v1("1"),
	v2("2"), 
	v3("3");

	StopBitType(String text) {
		this.text = text;
	}

	private String text;

	public String getName() {
		return this.name();
	}

	public String getText() {
		return this.text;
	}

	public static StopBitType valueByOrdinal(Integer ordinal) {
		StopBitType[] enums = StopBitType.values();
		for (StopBitType type : enums) {
			if (type.ordinal() == ordinal) {
				return type;
			}
		}
		return null;
	}
	
	public static String getTextByOrdinal(Integer ordinal) {
		StopBitType[] enums = StopBitType.values();
		for (StopBitType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
package com.daan.enums;

/**
 * 仪器参数属性：数据位
 * 
 * @author zhoujie
 *
 */
public enum DataBitType implements BasisEnum {

	v1("1"),
	v2("2"), 
	v3("3"), 
	v4("4"), 
	v5("5"), 
	v6("6"), 
	v7("7"),
	v8("8");

	DataBitType(String text) {
		this.text = text;
	}

	private String text;

	public String getName() {
		return this.name();
	}

	public String getText() {
		return this.text;
	}

	public static DataBitType valueByOrdinal(Integer ordinal) {
		DataBitType[] enums = DataBitType.values();
		for (DataBitType type : enums) {
			if (type.ordinal() == ordinal) {
				return type;
			}
		}
		return null;
	}
	
	public static String getTextByOrdinal(Integer ordinal) {
		DataBitType[] enums = DataBitType.values();
		for (DataBitType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
package com.daan.enums;

/**
 * 中心仪器参数属性：通讯协议
 * 
 * @author zhoujie
 *
 */
public enum BaudRateType implements BasisEnum {

	blank("1200"),
	v2400("2400"), 
	v4800("4800"), 
	v9600("9600"), 
	v19200("19200"), 
	v38400("38400"), 
	v115200("115200");

	BaudRateType(String text) {
		this.text = text;
	}

	private String text;

	public String getName() {
		return this.name();
	}

	public String getText() {
		return this.text;
	}

	public static BaudRateType valueByOrdinal(Integer ordinal) {
		BaudRateType[] enums = BaudRateType.values();
		for (BaudRateType type : enums) {
			if (type.ordinal() == ordinal) {
				return type;
			}
		}
		return null;
	}
	
	public static String getTextByOrdinal(Integer ordinal) {
		BaudRateType[] enums = BaudRateType.values();
		for (BaudRateType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
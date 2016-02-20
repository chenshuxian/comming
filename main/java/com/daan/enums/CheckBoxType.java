package com.daan.enums;

/**
 * 中心仪器参数属性：checkbox状态
 * 
 * @author zhoujie
 *
 */
public enum CheckBoxType implements BasisEnum {

	no("否"),
	yes("是"),;

	CheckBoxType(String text) {
		this.text = text;
	}

	private String text;

	public String getName() {
		return this.name();
	}

	public String getText() {
		return this.text;
	}

	public static String getTextByOrdinal(Integer ordinal) {
		if(ordinal == null){
			return null;
		}
		
		CheckBoxType[] enums = CheckBoxType.values();
		for (CheckBoxType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
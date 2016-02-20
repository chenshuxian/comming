package com.daan.enums;

/**
 * 中心仪器项目参数值属性：年龄单位
 * 
 * @author zhoujie
 *
 */
public enum AgeUnitType implements BasisEnum {

	blank(""),
	year("岁"), 
	month("月"), 
	week("周"), 
	day("天"), 
	hour("小时"), 
	detail("详细年龄");

	AgeUnitType(String text) {
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
		
		AgeUnitType[] enums = AgeUnitType.values();
		for (AgeUnitType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
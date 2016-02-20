package com.daan.enums;

/**
 * 中心仪器参数属性：通讯协议
 * 
 * @author zhoujie
 *
 */
public enum ParityBitType implements BasisEnum {

	none("无校验"),
	odd("奇校验"), 
	even("偶校验");

	ParityBitType(String text) {
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
		
		ParityBitType[] enums = ParityBitType.values();
		for (ParityBitType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
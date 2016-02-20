package com.daan.enums;

/**
 * 中心仪器属性：仪器类型
 * 
 * @author zhoujie
 *
 */
public enum CtrInstrumentsType implements BasisEnum {

	normal("常规"), 
	mics("微生物"), 
	txtReport("文字报告"), 
	label("酶标");

	CtrInstrumentsType(String text) {
		this.text = text;
	}

	private String text;

	public String getName() {
		return this.name();
	}

	public String getText() {
		return this.text;
	}

	public static CtrInstrumentsType valueByOrdinal(Integer ordinal) {
		CtrInstrumentsType[] enums = CtrInstrumentsType.values();
		for (CtrInstrumentsType type : enums) {
			if (type.ordinal() == ordinal) {
				return type;
			}
		}
		return null;
	}
	
	public static String getTextByOrdinal(Integer ordinal) {
		CtrInstrumentsType[] enums = CtrInstrumentsType.values();
		if(null!=ordinal){
			for (CtrInstrumentsType type : enums) {
				if (type.ordinal() == ordinal) {
					return type.getText();
				}
			}
		}
		
		return null;
	}
}
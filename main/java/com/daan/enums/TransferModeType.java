package com.daan.enums;

/**
 * 中心仪器参数属性：通信模式
 * 
 * @author zhoujie
 *
 */
public enum TransferModeType implements BasisEnum {

	none("无通信"),
	oneway("单向"), 
	twoway_nocheck("双向（无校验位）"), 
	twoway_check("双向（带校验位）"), 
	other("其它");

	TransferModeType(String text) {
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
		
		TransferModeType[] enums = TransferModeType.values();
		for (TransferModeType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
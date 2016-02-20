package com.daan.enums;

/**
 * 仪器参数属性：通讯协议
 * 
 * @author zhoujie
 *
 */
public enum ProtocolType implements BasisEnum {

	xonxof("XonXof"), 
	rts_ots("RTS or OTS"), 
	asts("ASTS");

	ProtocolType(String text) {
		this.text = text;
	}

	private String text;
	private Integer index;

	public String getName() {
		return this.name();
	}

	public String getText() {
		return this.text;
	}
	
	public Integer getIndex(){
		return this.ordinal()+1;
	}

	public static String getTextByOrdinal(Integer ordinal) {
		if(ordinal == null){
			return null;
		}
		
		ProtocolType[] enums = ProtocolType.values();
		for (ProtocolType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
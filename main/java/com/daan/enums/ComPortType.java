package com.daan.enums;

/**
 * 仪器参数属性：端口
 * 
 * @author zhoujie
 *
 */
public enum ComPortType implements BasisEnum {

	com1("COM1"), 
	com2("COM2"), 
	com3("COM3"), 
	com4("COM4"), 
	com5("COM5"), 
	com6("COM6"), 
	com7("COM7"), 
	com8("COM8"), 
	com9("COM9"), 
	com10("COM10");

	ComPortType(String text) {
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
		
		ComPortType[] enums = ComPortType.values();
		for (ComPortType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
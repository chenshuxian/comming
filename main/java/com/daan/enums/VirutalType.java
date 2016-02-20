package com.daan.enums;

/**
 * 仪器参数属性：虚拟仪器方式
 * 
 * @author zhoujie
 *
 */
public enum VirutalType implements BasisEnum {

	forward("正向"),
	reverse("反向");

	VirutalType(String text) {
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
		
		VirutalType[] enums = VirutalType.values();
		for (VirutalType type : enums) {
			if (type.ordinal() == ordinal) {
				return type.getText();
			}
		}
		return null;
	}
}
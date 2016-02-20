package com.daan.enums;
public enum IsAbleEnum implements BasisEnum{
	
	disable("停用"),
	enable("可用"),
	all("全部");

	IsAbleEnum(String text){
		this.text=text;
	}
	private String text;
	public String getName(){
		return this.name();		
	}
	public String getText(){
		return this.text;
	}
	
	private int value = 0;

    private IsAbleEnum(int value) {    //必须是private的，否则编译错误
        this.value = value;
    }

    public static String valueOf(int value) {  //从int到enum的转换函数
        switch (value) {
        case 0:
            return disable.text;
        case 1:
            return enable.text;
        default:
            return "";
        }
    }

    public int value() {
        return this.value;
    }
}
package com.daan.enums;
public enum IsNo implements BasisEnum{
	
	is("是"),
	no("否");

	IsNo(String text){
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

    private IsNo(int value) {    //必须是private的，否则编译错误
        this.value = value;
    }

    public static String valueOf(int value) {  //从int到enum的转换函数
        switch (value) {
        case 0:
            return is.text;
        case 1:
            return no.text;
        default:
            return "";
        }
    }

    public int value() {
        return this.value;
    }
}
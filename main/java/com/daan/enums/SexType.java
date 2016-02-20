package com.daan.enums;

public enum SexType implements BasisEnum{
	
	empty(""),
	male("男"),
	female("女"),
	both("不限");
	
	SexType(String text){
		this.text=text;
	}
	private String text;
	public String getName(){
		return this.name();	
	}
	public String getText(){
		return this.text;
	}
	
	public int getIndex() {
		return this.ordinal();
	}
	public SexType valueByOrdinal(Integer ordinal){
		SexType[] sexs=SexType.values();
		for(SexType sex:sexs){
			if(sex.ordinal()==ordinal){
				return sex;
			}
		}
		return null;
	}
	
	private int value = 0;

    private SexType(int value) {    //必须是private的，否则编译错误
        this.value = value;
    }

    public static String valueOf(int value) {  //从int到enum的转换函数
        switch (value) {
        case 0:
            return empty.text;
        case 1:
            return male.text;
        case 2:
            return female.text;
        default:
            return both.text;
        }
    }

    public int value() {
        return this.value;
    }
}

package com.daan.enums;
public enum IsIndividualStat implements BasisEnum{
	
	groupStatistical("按组合统计"),
	singleStatistical("按单项统计");

	IsIndividualStat(String text){
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

    private IsIndividualStat(int value) {    //必须是private的，否则编译错误
        this.value = value;
    }

    public static String valueOf(int value) {  //从int到enum的转换函数
        switch (value) {
        case 0:
            return groupStatistical.text;
        case 1:
            return singleStatistical.text;
        default:
            return "";
        }
    }

    public int value() {
        return this.value;
    }
}
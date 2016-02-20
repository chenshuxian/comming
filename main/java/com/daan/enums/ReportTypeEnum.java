package com.daan.enums;

import org.springframework.stereotype.Controller;

/**
 * @ClassName: ReportTypeEnum
 * @Description: TODO(报告类型枚举类)
 * @author xiaobing
 * @date 2015年12月14日 下午15:00:00
 */
@Controller
public enum ReportTypeEnum implements BasisEnum{
	
	reportDefault(0, "无"), 
	reportSingle(1, "单列"),
	reportBoth(2, "双列"); 
	
	private String text;
	private Integer index;
	
	private ReportTypeEnum(Integer index, String text){
		this.index=index;
		this.text=text;
	}
	
	public String getName(){
		return this.name();		
	}
	
	public String getText(){
		return this.text;
	}
	
	public Integer getIndex(){
		return this.index;
	}
}
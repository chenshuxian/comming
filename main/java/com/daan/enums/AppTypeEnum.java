package com.daan.enums;

import org.springframework.stereotype.Controller;

/**
 * @ClassName: AppTypeEnum
 * @Description: TODO(系统ID枚举类)
 * @author xiaobing
 * @date 2015年12月14日 下午15:00:00
 */
@Controller
public enum AppTypeEnum implements BasisEnum{
	
	kmAppId(1, "康明系统"); // 1是数据库查询结果值
	
	private String text;
	private Integer index;
	
	private AppTypeEnum(Integer index, String text){
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
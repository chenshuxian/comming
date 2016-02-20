package com.daan.enums;

import org.springframework.stereotype.Controller;

/**
 * @ClassName: TypeKeyEnum
 * @Description: TODO(LOINC编码分类代码)
 * @author xiaobing
 * @date 2015年12月09日 下午15:00:00
 */
@Controller
public enum TypeKeyEnum implements BasisEnum{
	
	sampleType(1, "标本类型"),
	testMethod(2, "检验方法"),
	discipline(3, "医学专业组"),
	component(5, "受检成份"),
	property(6, "受检属性"),
	typeOfScale(7, "样本标识"),
	timeAspect(8, "时间特征"),
	unit(11,"结果单位");
	
	private String text;
	private Integer index;
	
	private TypeKeyEnum(Integer index, String text){
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
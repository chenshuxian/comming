package com.daan.logBean;

import java.lang.reflect.Method;

/**
 * 
 * @ClassName: ClassPropertyMetaData
 * @Description: TODO(类-属性映射Dto)
 * @author zengxiaowang
 * @date 2015年12月1日 下午5:37:08
 *
 */
public class ClassPropertyMetaData {

	/**
	 * 获取属性值的方法名
	 */
	private String methodName;

	/**
	 * 获取属性值的方法
	 */
	private Method method;

	/**
	 * 属性的标题字典， 用于写日志，或显示表格
	 */
	private String propertyCaption;

	/**
	 * 顺序号，字段的显示顺序
	 */
	private int sortOrder;

	/**
	 * 查询关联表内容-指向表
	 */
	private String assoTable;

	/**
	 * 关联表-查询字段
	 */
	private String field;

	/**
	 * 关联表-查询字段中文说明
	 */
	private String fieldName;
	
	/**
	 * 时间格式输出
	 */
	private String valueFormat;
	
	/**
	 * 是否是关键描述
	 */
	private boolean isSummary;
	
	/**
	 * 动态字段-共公表根据字段中属性展示  下标0-存放字段get方法名，下标1开始存放属性值
	 */
	private String dynamicField[];

	public boolean isSummary() {
		return isSummary;
	}

	public void setSummary(boolean isSummary) {
		this.isSummary = isSummary;
	}

	public String getValueFormat() {
		return valueFormat;
	}

	public void setValueFormat(String valueFormat) {
		this.valueFormat = valueFormat;
	}

	public String getAssoTable() {
		return assoTable;
	}

	public void setAssoTable(String assoTable) {
		this.assoTable = assoTable;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getPropertyCaption() {
		return propertyCaption;
	}

	public void setPropertyCaption(String propertyCaption) {
		this.propertyCaption = propertyCaption;
	}

	public int getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Method getMethod() {
		return method;
	}

	public void setMethod(Method method) {
		this.method = method;
	}
	
	public String[] getDynamicField() {
		return dynamicField;
	}

	public void setDynamicField(String[] dynamicField) {
		this.dynamicField = dynamicField;
	}
}
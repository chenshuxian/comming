package com.daan.logBean;

import java.util.Collection;

public class ClassMetaData {
	private String className; //类权限定称
	private Class<?> clazz;	  //类
	private String entityName; //实体名称
	private String moduleName; //此类对应模块名称
	private Integer moduleId;   // 此类对应模块ID
	private Collection<ClassPropertyMetaData> propertyMethods;//类对应属性字段列表
	
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public Class<?> getClazz() {
		return clazz;
	}
	public void setClazz(Class<?> clazz) {
		this.clazz = clazz;
	}
	public String getEntityName() {
		return entityName;
	}
	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public Integer getModuleId() {
		return moduleId;
	}
	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}
	public Collection<ClassPropertyMetaData> getPropertyMethods() {
		return propertyMethods;
	}
	public void setPropertyMethods(Collection<ClassPropertyMetaData> propertyMethods) {
		this.propertyMethods = propertyMethods;
	}
	
}
package com.daan.xml.bean;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * @Author subanmiao
 * @Date 2015/12/14
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "fkTable")
public class FkTable implements Serializable {

	private String tableName;
	private String field;
	private String refTableName;
	private String refField;

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getRefTableName() {
		return refTableName;
	}

	public void setRefTableName(String refTableName) {
		this.refTableName = refTableName;
	}

	public String getRefField() {
		return refField;
	}

	public void setRefField(String refField) {
		this.refField = refField;
	}

}

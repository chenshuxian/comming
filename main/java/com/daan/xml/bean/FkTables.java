package com.daan.xml.bean;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author subanmiao
 * @Date 2015/12/14
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "fkTables")
public class FkTables implements Serializable {

	@XmlElement(name = "fkTable", type = FkTable.class)
	private List<FkTable> fkTables = new ArrayList<FkTable>();

	public List<FkTable> getFkTables() {
		return fkTables;
	}

	public void setFkTables(List<FkTable> fkTables) {
		this.fkTables = fkTables;
	}
	
}

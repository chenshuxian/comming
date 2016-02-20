package com.daan.dto;

import java.io.Serializable;

public class ImportTableDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1511296311086682389L;

	private String func_code;
	private String table_name;
	private String description;
	private String tmp_tablename;

	public String getFunc_code() {
		return func_code;
	}

	public void setFunc_code(String func_code) {
		this.func_code = func_code;
	}

	public String getTable_name() {
		return table_name;
	}

	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTmp_tablename() {
		return tmp_tablename;
	}

	public void setTmp_tablename(String tmp_tablename) {
		this.tmp_tablename = tmp_tablename;
	}

}

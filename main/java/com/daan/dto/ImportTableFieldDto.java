package com.daan.dto;

import java.io.Serializable;

public class ImportTableFieldDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3484308683063156678L;

	private String func_code;
	private String field_name;
	private String field_titile;
	private String ref_field_name;
	private String link_table;
	private String link_field_id;
	private String link_field_name;
	private String link_where;
	private String date_type;
	private String value_format;
	private int field_length;
	private boolean allow_null;
	private boolean key_field;
	private int col_index;

	public String getFunc_code() {
		return func_code;
	}

	public void setFunc_code(String func_code) {
		this.func_code = func_code;
	}

	public String getField_name() {
		return field_name;
	}

	public void setField_name(String field_name) {
		this.field_name = field_name;
	}

	public String getField_titile() {
		return field_titile;
	}

	public void setField_titile(String field_titile) {
		this.field_titile = field_titile;
	}

	public String getRef_field_name() {
		return ref_field_name;
	}

	public void setRef_field_name(String ref_field_name) {
		this.ref_field_name = ref_field_name;
	}

	public String getLink_table() {
		return link_table;
	}

	public void setLink_table(String link_table) {
		this.link_table = link_table;
	}

	public String getLink_field_id() {
		return link_field_id;
	}

	public void setLink_field_id(String link_field_id) {
		this.link_field_id = link_field_id;
	}

	public String getLink_field_name() {
		return link_field_name;
	}

	public void setLink_field_name(String link_field_name) {
		this.link_field_name = link_field_name;
	}

	public String getLink_where() {
		return link_where;
	}

	public void setLink_where(String link_where) {
		this.link_where = link_where;
	}

	public String getDate_type() {
		return date_type;
	}

	public void setDate_type(String date_type) {
		this.date_type = date_type;
	}

	public String getValue_format() {
		return value_format;
	}

	public void setValue_format(String value_format) {
		this.value_format = value_format;
	}

	public int getField_length() {
		return field_length;
	}

	public void setField_length(int field_length) {
		this.field_length = field_length;
	}

	public boolean isAllow_null() {
		return allow_null;
	}

	public void setAllow_null(boolean allow_null) {
		this.allow_null = allow_null;
	}

	public boolean isKey_field() {
		return key_field;
	}

	public void setKey_field(boolean key_field) {
		this.key_field = key_field;
	}

	public int getCol_index() {
		return col_index;
	}

	public void setCol_index(int col_index) {
		this.col_index = col_index;
	}

}

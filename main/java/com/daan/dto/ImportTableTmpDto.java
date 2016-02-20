package com.daan.dto;

import java.io.Serializable;

public class ImportTableTmpDto implements Serializable {

	private int row_id;
	private int can_import;
	private String import_msg;

	public int getRow_id() {
		return row_id;
	}

	public void setRow_id(int row_id) {
		this.row_id = row_id;
	}

	public int getCan_import() {
		return can_import;
	}

	public void setCan_import(int can_import) {
		this.can_import = can_import;
	}

	public String getImport_msg() {
		return import_msg;
	}

	public void setImport_msg(String import_msg) {
		this.import_msg = import_msg;
	}

}

package com.daan.mysql.handler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

public class StringArrayTypeHandler implements TypeHandler<String[]> {

	public String[] getResult(ResultSet rs, String columnName)
			throws SQLException {
		String columnValue = rs.getString(columnName);
		return this.getStringArray(columnValue);
	}

	public String[] getResult(ResultSet rs, int columnIndex)
			throws SQLException {
		String columnValue = rs.getString(columnIndex);
		return this.getStringArray(columnValue);
	}

	public String[] getResult(CallableStatement cs, int columnIndex)
			throws SQLException {
		// TODO Auto-generated method stub
		String columnValue = cs.getString(columnIndex);
		return this.getStringArray(columnValue);
	}

	public void setParameter(PreparedStatement ps, int i, String[] parameter,
			JdbcType jdbcType) throws SQLException {
		if (parameter == null)
			ps.setNull(i, Types.VARCHAR);
		else {
			StringBuffer result = new StringBuffer();
			for (String value : parameter)
				result.append(value).append(",");
			result.deleteCharAt(result.length() - 1);
			ps.setString(i, result.toString());
		}
	}

	private String[] getStringArray(String columnValue) {
		if (columnValue == null)
			return null;
		return columnValue.split(",");
	}
}

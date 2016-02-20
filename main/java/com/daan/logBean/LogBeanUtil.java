package com.daan.logBean;

import java.text.SimpleDateFormat;
import java.util.Date;
import com.daan.domain.Constant;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.IsNo;
import com.daan.enums.SexType;

public class LogBeanUtil {
	public static String logBean2String(Object obj, String valueFormat) {
		if (obj == null) {
			return "";
		}
		if (obj instanceof String) {
			return obj.toString();
		} else if (obj instanceof Date) {
			if (valueFormat == null || "".equals(valueFormat)) {
				valueFormat = "yyyy-MM-dd HH:mm:ss";
			}
			String value = "";
			try {
				SimpleDateFormat format = new SimpleDateFormat(valueFormat);
				value = format.format(obj);
			} catch (Exception e) {
			}

			return value;
		} else if (obj instanceof Boolean) {
			return Boolean.TRUE.equals(obj) ? "是" : "否";
		} else if (obj instanceof Integer && valueFormat.equals(Constant.STATUS_FORMAT)) {
			String status = IsAbleEnum.valueOf(Integer.valueOf(obj.toString()));
			return status;
		} else if (obj instanceof Integer && valueFormat.equals(Constant.YESORNOSTATUS_FORMAT)) {
			String yesOrNostatus = IsNo.valueOf(Integer.valueOf(obj.toString()));
			return yesOrNostatus;
		} else if (obj instanceof Integer && valueFormat.equals(Constant.SEXTYPE_FORMAT)) {
			String sex = SexType.valueOf(Integer.valueOf(obj.toString()));
			return sex;
		} 
		else {
			return obj.toString();
		}
	}

	/**
	 * 判断两个字段是否发生改变
	 * 
	 * @param sr
	 * @param ds
	 * @return boolean
	 */
	public static boolean isChanged(String sr, String ds) {
		sr = sr == null ? "" : sr;
		ds = ds == null ? "" : ds;
		return !sr.equals(ds);
	}
}

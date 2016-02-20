package com.daan.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

public class DateUtil2 {

	private static DateFormat df1 = new SimpleDateFormat("yyyyMMddHHmmss");
	private static DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static DateFormat df3 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	private static DateFormat df4 = new SimpleDateFormat("yyyy-MM-dd");
	private static DateFormat df5 = new SimpleDateFormat("yyyy/MM/dd");
	private static DateFormat df6 = new SimpleDateFormat("yyyyMMdd");

	static int[] DAYS = { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

	/**
	 * 验证年月日时分秒是否合理。
	 * 
	 * @param date
	 *            yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public static boolean checkItems(String date) {
		try {
			if (StringUtils.isEmpty(date) || date.length() < 8)
				return false;

			date = date.replaceAll("/", "").replaceAll("-", "").replaceAll(":", "").replaceAll(" ", "");
			if (date.length() != 8 && date.length() != 14) {
				return false;
			}

			int year = Integer.parseInt(date.substring(0, 4));
			if (year <= 0)
				return false;
			int month = Integer.parseInt(date.substring(4, 6));
			if (month <= 0 || month > 12)
				return false;
			int day = Integer.parseInt(date.substring(6, 8));
			if (day <= 0 || day > DAYS[month])
				return false;
			if (month == 2 && day == 29 && !isGregorianLeapYear(year)) {
				return false;
			}
			if (date.length() > 8) {
				int hour = Integer.parseInt(date.substring(8, 10));
				if (hour < 0 || hour > 23)
					return false;
				int minute = Integer.parseInt(date.substring(10, 12));
				if (minute < 0 || minute > 59)
					return false;
				int second = Integer.parseInt(date.substring(12, 14));
				if (second < 0 || second > 59)
					return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static final boolean isGregorianLeapYear(int year) {
		return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
	}

	public static Date vailDate(String str) {
		Date date = null;
		if (!checkItems(str)) {
			return null;
		}

		if (str.length() == 8) {
			// yyyyMMdd
			try {
				return df6.parse(str);
			} catch (ParseException e) {
				return null;
			}
		}

		if (str.length() == 10) {
			// yyyy-MM-dd OR yyyy/MM/dd
			try {
				if (str.indexOf("-") >= 0) {
					return df4.parse(str);
				} else if (str.indexOf("/") >= 0) {
					return df5.parse(str);
				} else {
					return null;
				}
			} catch (ParseException e) {
				return null;
			}
		}

		if (str.length() == 14) {
			// yyyyMMddHHmmss
			try {
				return df1.parse(str);
			} catch (ParseException e) {
				return null;
			}
		}

		if (str.length() == 19) {
			// yyyy-MM-dd HH:mm:ss OR yyyy/MM/dd HH:mm:ss
			try {
				if (str.indexOf("-") >= 0) {
					return df2.parse(str);
				} else if (str.indexOf("/") >= 0) {
					return df3.parse(str);
				} else {
					return null;
				}
			} catch (ParseException e) {
				return null;
			}
		}

		return date;
	}

	public static void main(String[] args) {
		System.out.println(checkWsDate("21040229010101"));
	}

	/**
	 * 验证ws接口的版本时间，固定格式为yyyyMMddHHmmss
	 */
	public static boolean checkWsDate(String date){
		if(StringUtils.isNotEmpty(date)){
			if(date.length() != 14){
				return false;
			}
			return checkItems(date);
		}
		return true;
	}
	
}

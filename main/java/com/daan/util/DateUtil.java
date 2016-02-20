package com.daan.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

/**
 * 日期操作工具
 * 
 * @author wistronITS
 *
 */
public class DateUtil {
	private static final Logger log=Logger.getLogger(DateUtil.class);
	private Date startDate = new Date(new Date().getTime());
	private Date endDate = new Date(new Date().getTime());

	/**
	 * Generates a time stamp
	 * yyyymmddhhmmss
	 * @return String
	 */
	public static String generateTimeStamp() {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmSS");
		return format.format(new Date());
	}
	
	/**
	 * 格式化日期yyyy-MM-dd 
	 * @param dt
	 * @return String
	 */
	public static String formatDate(Date dt) {
		return formatDate(dt, "yyyy-MM-dd");

	}
	
	public static String formatDate2(Date dt) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(dt);
	}
	/**
	 * 格式化日期
	 * @param value date
	 * @param pattern default"yyyy-MM-dd"
	 * @return date string
	 */
	public static String formatDate(java.util.Date value,String pattern){
		String pat="yyyy-MM-dd";
		if(pattern!=null){
			pat=pattern;
		}
		String result="";
		if(value!=null) {
		    SimpleDateFormat htmlDf = new SimpleDateFormat(pat);
		    result=htmlDf.format(value).toString();
		}
		return result;
	}

	/**
	 * 格式化日期yy-MMM-dd
	 * 
	 * @param dt
	 * @return String
	 */
	public static String formatDateMonthString(Date dt) {

		if (dt == null)
			return null;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MMM-dd");
		return format.format(dt);

	}

	/**
	 * @param date
	 * @return Date
	 * @throws Exception
	 */
	public static Date getDate(String date){
		DateFormat myDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		try {
			return myDateFormat.parse(date);
		} catch (ParseException e) {
			log.debug("试图将"+date+"转换成yyyy-MM-dd格式的日期类型，转换失败！",e);
			return null;
		}
	}
	public static Date getDateAll(String date){
		DateFormat myDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			return myDateFormat.parse(date);
		} catch (ParseException e) {
			log.debug("试图将"+date+"转换成yyyy-MM-dd格式的日期类型，转换失败！",e);
			return null;
		}
	}

	
	public static Date getDateTime(String dateTime, String pattern){
		if(StringUtils.isEmpty(pattern)){
			pattern = "yyyy-MM-dd";
		}
		if(StringUtils.isEmpty(dateTime)){
			return null;
		}
		DateFormat myDateFormat = new SimpleDateFormat(pattern);
		try {
			return myDateFormat.parse(dateTime);
		} catch (ParseException e) {
			log.debug("试图将"+dateTime+"转换成"+pattern+"格式的日期类型，转换失败！",e);
			return null;
		}
	}
	
	/**
	 * @param days
	 * @return Date
	 */
	public static Date addDaysToCurrentDate(int days) {
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.add(Calendar.DATE, days);
		return c.getTime();

	}

	/**
	 * 获得时间
	 * @return Date
	 */
	public static Date getDate() {

		return new Date(new Date().getTime());

	}

	/**
	 * 获得当前时间
	 * @return Date
	 */
	public static String getPresentDate() {

		Date dt = new Date();

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(new Date(dt.getTime()));
	}

	/**
	 * 获得年
	 * @return String
	 */
	public static String getPresentYear() {

		Date dt = new Date();

		SimpleDateFormat format = new SimpleDateFormat("yyyy");
		return format.format(new Date(dt.getTime()));
	}

	/**
	 * 获得小时数
	 * @return String
	 */
	public static int getHours(String year, String month, String day) {
		int ret = 0;
		
		try {
			if(StringUtils.isNotBlank(year)){
				ret += Integer.parseInt(year)*360*24;
			}
			
			if(StringUtils.isNotBlank(month)){
				ret += Integer.parseInt(month)*30*24;
			}
			
			if(StringUtils.isNotBlank(day)){
				ret += Integer.parseInt(day)*24;
			}
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
		
		return ret;
	}
	
	public Date getEndDate() {
		return endDate;
	}

	public Date getStartDate() {
		return startDate;
	}
	
	/**
	 * 判断字符日期能否正确转换为给定的日期格式
	 * @param dateTime
	 * @param pattern
	 * @return
	 */
	public static boolean isDate(String dateTime, String pattern) {
		if(StringUtils.isEmpty(pattern)){
			pattern = "yyyy-MM-dd";
		}
		if(StringUtils.isEmpty(dateTime)){
			return false;
		}
		DateFormat myDateFormat = new SimpleDateFormat(pattern);
		try {
			myDateFormat.parse(dateTime);
		} catch (ParseException e) {
			log.debug("试图将"+dateTime+"转换成"+pattern+"格式的日期类型，转换失败！",e);
			return false;
		}
		return true;
	}
	
	/**
	 * @param days
	 * @return Date
	 */
	public static Date addToCurrentDate(int field, int amount) {
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.add(field, amount);
		return c.getTime();

	}
	
	// 获取当前月第一天
	public static String getFistdayOfMonth() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.add(Calendar.MONTH, 0);
		c.set(Calendar.DAY_OF_MONTH, 1);
		return sdf.format(c.getTime());
	}

	// 获取当前月最后一天
	public static String getLastdayOfMonth() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
		return sdf.format(c.getTime());
	}
	
	// 获取当月份25日
	public static String getCurrent25Date(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		Calendar c = Calendar.getInstance();
		int day = c.get(Calendar.DAY_OF_MONTH);
		if(day > 25){
			c.add(Calendar.MONTH, 1);
		}
		return sdf.format(c.getTime())+"-25";
	}
	
	// 获取上月份26日
	public static String getPrevious26Date(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		Calendar c = Calendar.getInstance();
		int day = c.get(Calendar.DAY_OF_MONTH);
		if(day <= 25){
			c.add(Calendar.MONTH, -1);
		}
		return sdf.format(c.getTime())+"-26";
	}

	public static String getTimeByCalendar(){
		String week [] = {"日","一","二","三","四","五","六","七"};
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);//获取年份
		int month=cal.get(Calendar.MONTH)+1;//获取月份
		int day=cal.get(Calendar.DATE);//获取日
		int hour=cal.get(Calendar.HOUR);//小时
		int minute=cal.get(Calendar.MINUTE);//分
		int second=cal.get(Calendar.SECOND);//秒
		int WeekOfYear = cal.get(Calendar.DAY_OF_WEEK);//一周的第几天
		return year+"年"+
				(month<10?("0"+month):month)+"月"+
				(day<10?("0"+day):day)+"日      "+
				(hour<10?("0"+hour):hour)+"时"+
				(minute<10?("0"+minute):minute)+"分"+
				" 星期"+week[WeekOfYear-1];
	}
	
	public static void main(String[] args) {
		//System.out.println(getHours("1","2","3"));
//		Calendar c = Calendar.getInstance();
//		c.setTime(new Date());
//		c.add(Calendar.HOUR_OF_DAY, 8);
		System.out.println(getPrevious26Date());
	}

}

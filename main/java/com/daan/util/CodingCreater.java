package com.daan.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
/**
 * @ClassName: CodingCreater 
 * @Description: TODO(编码的生成器) 
 * @author Wumingjava
 * @date 2015年11月26日 上午11:48:57
 */
public class CodingCreater {
	/**
	 * 随机数位数
	 */
	private final static int RANDOM_BIT = 5;
	/**
	 * @Title: createOreder 
	 * @Description: TODO(生成编码) 
	 * @param tableCode 业务表编号在Constant常量进行定义
	 * @return String生成的编码
	 */
	public static String createOreder(int tableCode){
		StringBuffer oreder = new StringBuffer();
		oreder.append(supplementZero(String.valueOf(tableCode),2));
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("SSS");
		String millisecond = sdf.format(date);
		oreder.append(millisecond);
		int ran = new Random().nextInt(100000);
		oreder.append(supplementZero(String.valueOf(ran),RANDOM_BIT));
		return oreder.toString();
	}
	/**
	 * 向number前面补充0
	 * @param number
	 * @param bit
	 * @return
	 */
	private static String supplementZero(String number, int bit) {
		if (null != number && !"".equals(number)) {
			if (number.length() != bit) {
				int numL = number.length();
				for (; numL < bit; numL++) {
					number = "0" + number;
				}
			}
		}
		return number;
	}
}

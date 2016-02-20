package com.daan.util;

import java.io.Reader;
import java.sql.Clob;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 字符串工具类
 * 
 * @author wistronITS
 *
 */
public class StringUtil {

	/**
	 * 根据传入的字符串生成字符串集合
	 * @param val
	 * @return List<String>
	 */
	@SuppressWarnings("unchecked")
	public static List<String> stringToList(String val) {
        if (val != null) {
            String[] list = val.split("[ ]*,[ ]*");
            return Arrays.asList(list);
        } else {
            return Collections.EMPTY_LIST;
        }
    }
	
	/**
     * 转换对象为字符串,如果对象为空，返回为""
     *
     * @param obj Object
     * @return String
     */
    public static String nvl(Object obj) {
        if (obj == null) {
            return "";
        }
        if (obj instanceof String) {
            return (String) obj;
        }
        return obj.toString();
    }
    
    /**
     * 检查字符串是否不为空
     *
     * @param str a string to check
     * @return true if the string is not empty
     */
    public static boolean isNotBlank(String str) {
        if (!nvl(str).trim().equals("")) {
            return true;
        }
        return false;
    }
 // 当前年月日,20090818格式 
    public static String getCurrentFormatDate(){     
    	       Date date = new Date(System.currentTimeMillis());     
           SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");     
    	       String currentDate =  dateFormat.format(date);     
    	       StringBuffer buf = new StringBuffer("");     
    	        buf.append(currentDate.substring(0, 4)).append(     
    	              currentDate.substring(5, 7)).append(     
    	               currentDate.substring(8, 10));     
    	      return buf.toString();     
    	}     

    /**
     * 检查字符串是否为空
     *
     * @param str a string to check
     * @return true if the string is empty
     */
    public static boolean isBlank(String str) {
        return !isNotBlank(str);
    }
    
    public static boolean toBooleanValue(String str){
    	if ("1".equals(str)) {
    		return true;
    	}
    	if ("yes".equals(str)) {
    		return true;
    	}
    	if ("true".equals(str)) {
    		return true;
    	}
    	
    	return false;
    }
	/**
	 * 判断两个字段是否发生改变
	 * @param sr
	 * @param ds
	 * @return boolean
	 */
	public static boolean isChanged(String sr, String ds){
		sr = (sr == null ? "" : sr);
		ds = (ds == null ? "" : ds);
		return !sr.equals(ds);
	}
	
	/**
	 * 判断两个日期按某格式格式化后是否发生改变
	 * @param src
	 * @param dst
	 * @param format
	 * @return
	 */
	public static boolean isChanged(Date src, Date dst, String format){
		
		if (format == null || "".equals(format.trim())) {
			format = "yyyy-MM-dd";
		}
		SimpleDateFormat dataFormat = new SimpleDateFormat(format);
		String sr = (src == null ? "" : dataFormat.format(src));
		String ds = (dst == null ? "" : dataFormat.format(dst));
		
		return !sr.equals(ds);
	}
	
	/**
	 * 判断两个整数是否发生改变(null变为0被认为有变化)
	 * @param src
	 * @param dst
	 * @return
	 */
	public static boolean isChanged(Integer src, Integer dst){
		
		String sr = (src == null ? "" : src.toString());
		String ds = (dst == null ? "" : dst.toString());
		
		return !sr.equals(ds);
	}
	
	public static boolean isValidDate(String dateStr, String format){
		if (format == null || "".equals(format.trim())) {
			format = "yyyy-MM-dd";
		}
		SimpleDateFormat dataFormat = new SimpleDateFormat(format);
		try{  
            Date date = (Date)dataFormat.parse(dateStr);
            return dateStr.equals(dataFormat.format(date));
        }catch(Exception e){  
            return false;  
        }  
	}
	
	public static String getInSQLStr(String joinType, String fieldName, String[] barCodeArr) {
		List<List<String>> list = new ArrayList<List<String>>();
		StringBuffer sb = new StringBuffer("  " + joinType + " (");
		int i = 0;
		List<String> list1 = new ArrayList<String>();
		for (String barcode : barCodeArr) {
			i++;
			list1.add(barcode);
			if (i % 100 == 0) {
				list.add(list1);
				list1 = new ArrayList<String>();
			}
		}
		int some = (barCodeArr.length) % 100;
		if (some > 0) {
			list1 = new ArrayList<String>();
			for (int k = barCodeArr.length - some; k < barCodeArr.length; k++) {
				list1.add(barCodeArr[k]);
			}
			list.add(list1);
		}
		int j = 0;
		for (List<String> list2 : list) {
			j++;
			if (j == 1) {
				sb.append(fieldName + " in(");
				for (String id : list2) {
					sb.append("'" + id + "',");
				}
				sb.deleteCharAt(sb.length() - 1);
				sb.append(")");
			} else {
				sb.append(" or " + fieldName + " in(");
				for (String id : list2) {
					sb.append("'" + id + "',");
				}
				sb.deleteCharAt(sb.length() - 1);
				sb.append(")");
			}

		}
		sb.append(")");
		return sb.toString();
	}
	
	/**
	 * 将Clob转成String ,静态方法
	 * @param clob 字段
	 * @return 内容字串，如果出现错误，返回 null
	 */
	public static String clobToString(Clob clob) {
		if (clob == null)
			return null;
		StringBuffer sb = new StringBuffer();
		Reader clobStream = null;
		try {
			clobStream = clob.getCharacterStream();
			char[] b = new char[60000];// 每次获取60K
			int i = 0;
			while ((i = clobStream.read(b)) != -1) {
				sb.append(b, 0, i);
			}
		} catch (Exception ex) {
			sb = null;
		} finally {
			try {
				if (clobStream != null) {
					clobStream.close();
				}
			} catch (Exception e) {
			}
		}
		if (sb == null)
			return null;
		else
			return sb.toString();
	}
	
	/**
     * 判断是否是空字符串 null和"" 都返回 true
     * 
     * @author Robin Chang
     * @param s
     * @return
     */
    public static boolean isEmpty(String s) {
        if (s != null && !s.equals("")) {
            return false;
        }
        return true;
    }
    
    /**
     * 判断对象是否为空
     * 
     * @param str
     * @return
     */
    public static boolean isNotEmpty(Object str) {
        boolean flag = true;
        if (str != null && !str.equals("")) {
            if (str.toString().length() > 0) {
                flag = true;
            }
        } else {
            flag = false;
        }
        return flag;
    }
}

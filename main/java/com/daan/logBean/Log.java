package com.daan.logBean;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.crypto.hash.Hash;

/**
 * 
* @ClassName: Log 
* @Description: TODO(日志注解) 
* @author zengxiaowang
* @date 2015年12月1日 下午5:32:27 
*
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
	/**
	 * 
	* @Title: name 
	* @Description: TODO(字段描述) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	public String name() default "ID";
	
	/**
	 * 
	* @Title: isSummary 
	* @Description: TODO(操作项目) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	public boolean isSummary() default false;
	
	/**
	 * 
	* @Title: order 
	* @Description: TODO(字段排序号) 
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int	order() default 9999;
	
	/**
	 * 
	* @Title: assoTable 
	* @Description: TODO(查询关联表内容-指向表) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	public String assoTable() default "";
	
	/**
	 * 
	* @Title: field 
	* @Description: TODO(关联表-查询字段) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	public String field() default "";
	
	/**
	 * 
	* @Title: fieldName 
	* @Description: TODO(关联表-查询字段中文说明) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	public String fieldName() default "";
	
	/**
	 * 
	* @Title: fieldName 
	* @Description: TODO(状态等转换) 
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	public String valueFormat() default "";

	/**
	 * 
	* @Title: dynamicField 
	* @Description: TODO(动态字段-共公表根据字段中属性展示) 
	* 下标0-存放字段get方法名，下标1开始存放属性值
	* @param @return    设定文件 
	* @return String[]    返回类型 
	* @throws
	 */
	public String[] dynamicField() default "";
}

package com.daan.logBean;

import com.daan.domain.DictLogs;
import com.daan.domain.User;

/**
 * 
* @ClassName: IDictLogger 
* @Description: TODO(新建日志信息:对比做出修改内容) 
* @author zengxiaowang
* @date 2015年11月24日 下午8:47:28 
*
 */
public interface IDictLogger {

	/**
	 * 
	* @Title: AddChangedObject 
	* @Description: TODO(添加转换对象) 
	* @param @param changedobject 转换的对象
	* @param @param user    用户
	* @return void    返回类型 
	* @throws
	 */
	public void AddChangedObject(Object changedobject);
	
	/**
	 * 
	* @Title: ToDictLog 
	* @Description: TODO(创建日志对象) 
	* @param @return    设定文件 
	* @return DictLogs  日志对象
	* @throws
	 */
	public DictLogs ToDictLog(User user) throws Exception;

}
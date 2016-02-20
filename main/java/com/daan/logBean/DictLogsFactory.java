package com.daan.logBean;

/**
 * 
* @ClassName: DictLogsFactory 
* @Description: TODO(深复制（克隆）需写日志的副本,根据方法内部实例化实现的对象。) 
* @author zengxiaowang
* @date 2015年11月24日 下午1:21:38 
*
 */
public class DictLogsFactory {
	
	/**
	 * 
	* <p>Title: 日志生成工厂</p> 
	* <p>Description: </p>
	 */
	private DictLogsFactory() {
		
	}
	
	/**
	 * 
	* @Title: CreateAddNewLogger 
	* @Description: TODO(新增操作创建日志) 
	* @param @return    设定文件 
	* @return IDictLogger    返回类型 
	* @throws
	 */
	public static IDictLogger CreateAddNewLogger() {
		return new AddDictLogger();
	}

	/**
	 * 
	* @Title: CreateEditLogger 
	* @Description: TODO(修改操作添加日志) 
	* @param @param sourceobject
	* @param @return    设定文件 
	* @return IDictLogger    返回类型 
	* @throws
	 */
	public static IDictLogger CreateEditLogger(Object sourceobject) {
		return new EditDictLogger(sourceobject);
	}
	
	/**
	 * 
	* @Title: CreateDeleteLogger 
	* @Description: TODO(删除操作添加日志) 
	* @param @return    设定文件 
	* @return IDictLogger    返回类型 
	* @throws
	 */
	public static IDictLogger CreateDeleteLogger() {
		return new DeleteDictLogger();
	}

}
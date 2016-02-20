package com.daan.service;

import com.daan.domain.DictLogs;

/**
 * 
* @ClassName: DictLogsService 
* @Description: TODO(日志信息service) 
* @author zengxiaowang
* @date 2015年11月24日 上午11:16:07 
*
 */
public interface DictLogsService {
	
	/**
	 * 
	* @Title: createDictLogs 
	* @Description: TODO(新增日志信息) 
	* @param @param log
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int createDictLogs(DictLogs log);

}

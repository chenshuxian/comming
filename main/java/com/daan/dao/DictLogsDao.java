package com.daan.dao;


import java.util.List;
import java.util.Map;

import com.daan.domain.DictLogs;
import com.daan.dto.DictLogsQueryDto;

/**
 * 
* @ClassName: DictLogsDao 
* @Description: TODO(日志Dao) 
* @author zengxiaowang
* @date 2015年11月24日 上午11:41:25 
*
 */
public interface DictLogsDao {
	
	/**
	 * 
	* @Title: createDictLogs 
	* @Description: TODO(新增日志信息) 
	* @param @param log
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	public int addDictLogs(DictLogs log);
	
	/**
	 * 根据条件查找日志条数
	 * @param dto
	 * @return
	 */
	public Integer queryCountByConditions(Map<String, Object> map); 
	
	/**
	 * 根据条件查找日志列表
	 * @param dto
	 * @return
	 */
	public List<DictLogsQueryDto> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 根据条件查找日志列表
	 * @param dto
	 * @return
	 */
	public List<DictLogsQueryDto> queryDictLogs(Map<String, Object> map); 
}

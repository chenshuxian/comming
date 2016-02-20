package com.daan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.daan.dao.DictLogsDao;
import com.daan.domain.DictLogs;
import com.daan.service.DictLogsService;

/**
 * 
* @ClassName: DictLogsServiceImpl 
* @Description: TODO(日志serviceimpl) 
* @author zengxiaowang
* @date 2015年11月24日 上午11:25:43 
*
 */
@Service
public class DictLogsServiceImpl implements DictLogsService {
	
	@Autowired
	private DictLogsDao dictLogsDao;
	
	/**
	 * 
	* @Title: createDictLogs 
	* @Description: TODO(新增日志信息) 
	* @param @param log
	* @param @return    设定文件 
	* @return int    返回类型 
	* @throws
	 */
	@Override
	public int createDictLogs(DictLogs log) {
		if(log == null) {
			return 0;
		}
		return this.dictLogsDao.addDictLogs(log);
	}

}

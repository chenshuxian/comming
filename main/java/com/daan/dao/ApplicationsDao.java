package com.daan.dao;


import java.util.List;
import java.util.Map;

import com.daan.domain.Applications;

/**
 * 
* @ClassName: ApplicationsDao 
* @Description: TODO(系统信息设置) 
* @author 吴明明
* @date 2015年11月24日 上午11:41:25 
*
 */
public interface ApplicationsDao {
	/**
	 * 根据条件查找日志列表
	 * @param dto
	 * @return
	 */
	public List<Applications> findApplications(Map<String, Object> map); 
}

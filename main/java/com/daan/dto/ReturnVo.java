package com.daan.dto;

import java.util.List;

/** 
 * @ClassName: ReturnVo 
 * @Description: TODO(服务端返回的对象) 
 * @author ggw01
 * @date 2015年11月19日 下午4:58:07 
 */
public class ReturnVo {
	String error;//该请求返回的信息是否异常
	List<?> businessList;//返回的业务对象集合，比如单个Dto或者多个dto
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public List<?> getBusinessList() {
		return businessList;
	}
	public void setBusinessList(List<?> businessList) {
		this.businessList = businessList;
	}
	
	
}

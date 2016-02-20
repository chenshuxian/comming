package com.daan.logBean;

/**
 * 
* @ClassName: SelfDefineException 
* @Description: TODO(自定义异常) 
* @author zengxiaowang
* @date 2015年11月30日 上午10:47:33 
*
 */
public class SelfDefineException extends Exception {
	private static final long serialVersionUID = -4344177789487901585L;
	String message; // 定义String类型变量

	public SelfDefineException(String ErrorMessagr) { // 父类方法   
	        message = ErrorMessagr;  
	}

	public String getMessage() { // 覆盖getMessage()方法
		return message;
	}
}

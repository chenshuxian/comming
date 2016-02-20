package com.daan.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.daan.exception.FkException;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daan.dao.CommonDao;
import com.daan.domain.Constant;
import com.daan.domain.Message;
import com.daan.util.CodingCreater;
/**
 * @ClassName: AbstractService 
 * @Description: TODO(Service父类用于写一些公共方法) 
 * @author Wumingjava
 * @date 2015年12月11日 上午10:48:27
 */
public abstract class AbstractService {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    protected HttpServletRequest request;
    protected HttpServletResponse response;
	@Autowired
	private CommonDao commonDao;
    /**
     * @Title: getCodeNo
     * @Description: TODO(获取业务表的编码) 
     * @param code 业务表的编号
     * @return String 业务表的编码
     * @throws
     */
	@RequestMapping(value = Constant.RMM_GETCODENO, method = RequestMethod.POST)
	@ResponseBody
	public String getCodeNo(@RequestParam(value = "code", required = true)String code,HttpServletRequest request) {
		return CodingCreater.createOreder(Integer.parseInt(code));
	}
	/**
	 * @Title: setResAndResp 
	 * @Description: TODO(用于解决serice向前端传值出现乱码的问题) 
	 * @param request
	 * @param response void
	 * @throws
	 */
	@ModelAttribute
    public void setResAndResp(HttpServletRequest request,HttpServletResponse response){
    	this.request=request;
    	this.response=response;
    	response.setHeader("Content-type", "text/html;charset=UTF-8"); 
    }
	/**
	 * @Title: getMaxDisplayOrder 
	 * @Description: 获取最大顺序号 
	 * @param code 业务表的编号
	 * @return String 业务表的编码
	 *  @throws
	 */
	@RequestMapping(value = Constant.RMM_MAXDISPLAYORDER, method = RequestMethod.POST)
	@ResponseBody
	public String getMaxDisplayOrder(String tableName, String conditionStr) {
		String displayOrder = "";
		try {
			Map<String, String> map = new HashMap<String, String>();
			map.put("tableName", tableName);
			map.put("conditionStr", conditionStr);
			displayOrder = commonDao.getMaxDisplayOrder(map) + "";
		} catch (Exception e) {
			logger.error(Message.MSG_NOT_MAXORDER);
			logger.error(e.getMessage(), e);
		}

		if (StringUtils.isNotEmpty(displayOrder) && !displayOrder.toLowerCase().equals("null")) {
			if (displayOrder.equals(Constant.MAX_ORDER)) {
				return displayOrder;
			} else {
				int ret = Integer.parseInt(displayOrder) + 1;
				return ret + "";
			}
		} else {
			displayOrder = "1";
		}

		return displayOrder;
	}
	
	/**
	 * 
	 * @Title: throwParamIsNullException 
	 * @Description: 抛出参数为空异常并记录日志方法
	 * @param methodName 当前方法名称
	 * @throws Exception 
	 * @author liujiawei
	 * @date 2015年12月22日 上午10:23:10
	 */
	public void throwParamIsNullException(String methodName) throws Exception{
		String message = Constant.METHOD + methodName + Constant.PARAMS_IS_NULL;
		Exception e = new Exception(message);
		logger.error(Constant.EXCEPTION + e.getMessage(), e);
		throw e;
	}

	/**
	 * 获取异常处理返回的信息
	 * 因mybatis拦截器有关联数据抛出的异常总被MyBatisSystemException嵌套，
	 * 重新解析到FkException，再返回对应信息 :(
	 * @param t
	 * @return
	 */
	public String getProcessMessage(Throwable t) {
		if (t != null) {
			boolean flag = true;
			while (flag) {
				if (t instanceof FkException) {
					return Message.MSG_DEL_FAIL2;
				} else {
					if (t.getCause() == null) {
						flag = false;
					} else {
						t = t.getCause();
					}
				}
			}
		}
		return Message.MSG_DEL_FAIL3;
	}
	
}

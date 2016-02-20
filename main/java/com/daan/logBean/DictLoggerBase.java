package com.daan.logBean;

import com.daan.domain.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.daan.domain.DictLogs;
import com.daan.domain.User;
import com.daan.util.IDCreater;

/**
 * 
* @ClassName: DictLoggerBase 
* @Description: TODO(操作-新增日志-父类) 
* @author zengxiaowang
* @date 2015年11月24日 下午8:49:33 
*
 */
public class DictLoggerBase implements IDictLogger {
	
	/**
	 * 日志
	 */
	protected Logger logger = LoggerFactory.getLogger(getClass());
	
	/**
	 * 转换后对象
	 */
	private Object fromObj = null;
	
	/**
	 * 转换对象
	 */
	private Object toObj = null;
	

	/**
	 * 转换后对象
	 */
	private String summary = "";
	
	public DictLoggerBase(Object fromObj) {
		this.fromObj = fromObj;
	}

	public DictLoggerBase() {

	}

	private ClassMetaData GetMetaDataObject() throws ClassNotFoundException {
		if (toObj == null) {
			logger.error("toObj is null!");
			throw new ClassNotFoundException("toObj is null!");
		}
		return ClassMetaDataHelper.GetInstance().GetMetaData(toObj.getClass());
	}
	
	/**
	 * 
	* @Title: AddChangedObject 
	* @Description: TODO(添加转换对象) 
	* @param @param changedobject 转换的对象
	* @param @param user    用户
	* @return void    返回类型 
	* @throws
	 */
	@Override
	public void AddChangedObject(Object changedobject) {
		// TODO 添加转换对象
		this.toObj = changedobject;
	}
	
	/**
	 * 
	* @Title: ToDictLog 
	* @Description: TODO(创建日志对象) 
	* @param @return    设定文件 
	* @return DictLogs  日志对象
	* @throws
	 */
	@Override
	public DictLogs ToDictLog(User user) throws SelfDefineException {
		// TODO 开始创建日志对象
		ClassMetaData meta = null;
		try {
			meta = this.GetMetaDataObject();
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage(), e);
			throw new SelfDefineException(e.getMessage());
		}
		if (meta != null) {
			DictLogs log = new DictLogs(user);
			log.setId(IDCreater.nextId());
			log.setAppId(Constant.OrgAppId.CTR_APP_ID);
			//log.setOperateTime(new Date());
			log.setModuleId(meta.getModuleId());
			log.setModuleName(meta.getModuleName());
			//log.setTimeVersion(new Date());
			log.setDescription(getDictContent(meta));
			log.setSummary(this.getSummary());
			if (this instanceof EditDictLogger) {
				log.setFunctionDesc("修改-"+ meta.getModuleName());
			} else if (this instanceof AddDictLogger) {
				log.setFunctionDesc("新增-"+ meta.getModuleName());
			} else if (this instanceof DeleteDictLogger) {
				log.setFunctionDesc("删除-"+ meta.getModuleName());
			}
			return log;
		} else {
			logger.error("meta is null，create log error!");
			throw new SelfDefineException("meta is null，create log error!");
		}
	}
	
	public String getDictContent(ClassMetaData meta) throws SelfDefineException {
		return "";
	}
	
	public Object getFromObj() {
		return fromObj;
	}

	public void setFromObj(Object fromObj) {
		this.fromObj = fromObj;
	}
	
	public Object getToObj() {
		return toObj;
	}

	public void setToObj(Object toObj) {
		this.toObj = toObj;
	}
	
	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}
}
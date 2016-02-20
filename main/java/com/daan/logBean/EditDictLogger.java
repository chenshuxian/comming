package com.daan.logBean;

import java.lang.reflect.Method;
import java.util.Collection;

/**
 * 
* @ClassName: EditDictLogger 
* @Description: TODO(修改操作创建日志信息) 
* @author zengxiaowang
* @date 2015年11月24日 下午9:07:16 
*
 */
public class EditDictLogger extends DictLoggerBase {

	/**
	 * 
	* <p>Title: EditDictLogger</p> 
	* <p>Description: 修改操作创建日志信息</p> 
	* @param fromObj
	 */
	public EditDictLogger(Object fromObj) {
		super(fromObj);
	}
	
	/**
	 * 
	* @Title: getDictContent 
	* @Description: TODO(反射取值对比变化信息) 
	* @param @ClassMetaData 反射对象
	* @return String   变化信息
	* @throws
	 */
	@Override
	public String getDictContent(ClassMetaData meta) throws SelfDefineException {
		if (meta == null || meta.getPropertyMethods() == null) {
			logger.error("ClassMetaData is null!");  
			throw new SelfDefineException("ClassMetaData is null!");
		}
		Class<?> clazz = meta.getClazz();
		if (clazz == null) {
			logger.error("get Class is null!");
			throw new SelfDefineException("get Class is null!");
		}
		StringBuilder sb = new StringBuilder("");
		/*String id = "";
		try {
			// 获取ID值
			Method getMethod = clazz.getMethod("getId", new Class[] {});
			id = String.valueOf(getMethod.invoke(this.getToObj(), new Object[] {}));
		} catch (Exception e) {
			id = "";
		}
		if (id != null) {
			sb.append("修改记录号为 [" + id + "] 的 " + ((meta.getEntityName() == null || "".equals(meta.getEntityName())) ? meta.getModuleName() : meta.getEntityName()) + " ;  ");
		} else {
			sb.append("修改：" + ((meta.getEntityName() == null || "".equals(meta.getEntityName())) ? meta.getModuleName() : meta.getEntityName()) + " ;  ");
		}*/
		Collection<ClassPropertyMetaData> properties = meta.getPropertyMethods();
		StringBuilder summary = new StringBuilder("");
		for (ClassPropertyMetaData property : properties) {
			String methodName = property.getMethodName();
			try {
				// 反射对比信息是否变更
				Method getMethod = clazz.getMethod(methodName, new Class[] {});
				Object newValue = getMethod.invoke(this.getToObj(), new Object[] {});
				Object oldValue = getMethod.invoke(this.getFromObj(), new Object[] {});
				String str_newValue = LogBeanUtil.logBean2String(newValue, property.getValueFormat());
				String str_oldValue = LogBeanUtil.logBean2String(oldValue, property.getValueFormat());
				
				if (LogBeanUtil.isChanged(str_oldValue, str_newValue)) {
					sb.append(property.getPropertyCaption());
					sb.append(":由[");
					sb.append(str_oldValue);
					sb.append("]更改为[");
					sb.append(str_newValue);
					sb.append("];  ");
				}
				//操作项目
				if(property.isSummary()){
					boolean isCode = "编码".equals(property.getPropertyCaption()) ? true : false;
					if(isCode){
						summary.append("[");
					}
					summary.append(str_oldValue);
					if(isCode){
						summary.append("]");
					}
				}
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				throw new SelfDefineException(e.getMessage());
			}
		}
		super.setSummary(summary.toString());
		return sb.toString();
	}
}
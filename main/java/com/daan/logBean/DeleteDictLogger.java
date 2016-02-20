package com.daan.logBean;

import java.lang.reflect.Method;
import java.util.Collection;


/**
 * 
* @ClassName: DeleteDictLogger 
* @Description: TODO(删除操作添加日志信息) 
* @author zengxiaowang
* @date 2015年11月24日 下午8:58:58 
*
 */
public class DeleteDictLogger extends DictLoggerBase {
	
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
		if(id != null){
			sb.append("删除记录号为 [" + id + "] 的 " + ((meta.getEntityName() == null || "".equals(meta.getEntityName())) ? meta.getModuleName() : meta.getEntityName()) + " ;  ");
		}else{
			sb.append("删除：" + ((meta.getEntityName() == null || "".equals(meta.getEntityName())) ? meta.getModuleName() : meta.getEntityName()) + " ;  ");
		}*/
		Collection<ClassPropertyMetaData> properties = meta.getPropertyMethods();
		StringBuilder summary = new StringBuilder("");
		for (ClassPropertyMetaData property : properties) {
			String methodName = property.getMethodName();
			circle: 
			try {
				// 查询是否有条件控制显示
				String[] dynamicField = property.getDynamicField();
				if (dynamicField != null && dynamicField.length > 1) {
					String field = dynamicField[0];
					// 获取控制字段的值
					Method getFieldMethod = clazz.getMethod(field, new Class[] {});
					Object fieldValue = getFieldMethod.invoke(this.getToObj(), new Object[] {});
					String fieldVal = String.valueOf(fieldValue);
					// 对比是否在条件范围内
					for (int i = 1; i < dynamicField.length; i++) {
						String dynamicVal = dynamicField[i];
						if (fieldVal.equals(dynamicVal)) {
							// 在条件内不添加到日志中
							break circle;
						}
					}
				}
				// 反射对比信息是否变更
				Method getMethod = clazz.getMethod(methodName, new Class[] {});
				Object value = getMethod.invoke(this.getToObj(), new Object[] {});
				String str_Value = LogBeanUtil.logBean2String(value, property.getValueFormat());
				sb.append(property.getPropertyCaption());
				sb.append(":[");
				sb.append(str_Value);
				sb.append("];  ");
				//操作项目
				if(property.isSummary()){
					boolean isCode = "编码".equals(property.getPropertyCaption()) ? true : false;
					if(isCode){
						summary.append("[");
					}
					summary.append(str_Value);
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
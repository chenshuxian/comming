package com.daan.logBean;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 类元数据读取对象， 用于读取类的元数据， 此类是单件模式， 只有一个副本， 这些此类中会有一个集合存储元数据列表， 元数据只会读取一次，读取完成后就会被缓存起来，除非重新初始化此对象。
 */
public class ClassMetaDataHelper {
	private static final ClassMetaDataHelper instance = new ClassMetaDataHelper();
	
	private static Map<Class<?>,ClassMetaData> map=new HashMap<Class<?>,ClassMetaData>();
	/**
	 * 读取类的元数据，方法。
	 * @param toObj
	 * @throws ClassNotFoundException 
	 */
	public ClassMetaData GetMetaData(Class<?> toObj) throws ClassNotFoundException {
		if(toObj==null){
			return null;
		}
		if(!map.containsKey(toObj)){
			this.addMetaData(toObj);
		}
		return map.get(toObj);
	}

	/**
	 * 
	 * @param classnamepath
	 * @throws ClassNotFoundException 
	 */
	private ClassMetaData GetMetaFromCache(String classnamepath) throws ClassNotFoundException {
		if(classnamepath==null){
			return null;
		}
		Class<?> c=Class.forName(classnamepath);
		return this.GetMetaData(c);
	}

	/**
	 * 
	 * @param classobject
	 * @throws ClassNotFoundException 
	 */
	private ClassMetaData LoadMetaData(Class<?> classobject) throws ClassNotFoundException {
		return GetMetaData(classobject);
	}

	private ClassMetaDataHelper() {
		
	}

	public static ClassMetaDataHelper GetInstance() {
		return instance;
	}

	private void addMetaData(Class<?> classobject) {
		// TODO Auto-generated method stub
		if(classobject==null){
			return;
		}
		ClassMetaData meta=new ClassMetaData();
		meta.setClassName(classobject.getName());
		meta.setClazz(classobject);
		LogModule logModule=classobject.getAnnotation(LogModule.class);
		if(logModule!=null){
			meta.setEntityName(logModule.entityName());
			meta.setModuleId(logModule.moduleId());
			meta.setModuleName(logModule.moduleName());
		}
		this.addPropertyMetaData(meta,classobject);
		map.put(classobject, meta);
	}
	
	private ClassMetaData addPropertyMetaData(ClassMetaData meta, Class<?> classobject){
		if(classobject==null){
			return null;
		}
		if(meta==null){
			meta=new ClassMetaData();
			meta.setClassName(classobject.getName());
		}
		List<ClassPropertyMetaData> classProperties=new ArrayList<ClassPropertyMetaData>();
		Method[] methods=classobject.getMethods();
		filterMethods(methods,classProperties);
		//排序
		Collections.sort(classProperties, new Comparator<ClassPropertyMetaData>(){

			@Override
			public int compare(ClassPropertyMetaData o1,
					ClassPropertyMetaData o2) {
				// TODO Auto-generated method stub
				int ret=0;
				if(o1==null||o2==null){
					ret=0;
				}else{
					int o1_dis=o1.getSortOrder();
					int o2_dis=o2.getSortOrder();
					ret = o1_dis-o2_dis;
				}
				return ret;
			}
			
		});
		meta.setPropertyMethods(classProperties);
		return meta;
	}
	
	/**
	 * 需要记录日志的字段
	 * @param fields
	 * @param fieldMap
	 */
	private void filterMethods(Method[] methods, Collection<ClassPropertyMetaData> classProperties){
		for(Method method : methods) {
			Log log = method.getAnnotation(Log.class);
    		if(log != null){
    			String methodName = method.getName();
    			
    			ClassPropertyMetaData proData=new ClassPropertyMetaData();
    			proData.setMethodName(methodName);
    			//proData.setLogAdded(log.add());
    			//proData.setLogDelete(log.delete());
    			//proData.setLogModify(log.update());
    			proData.setPropertyCaption(log.name());
    			proData.setSortOrder(log.order());
    			proData.setValueFormat(log.valueFormat());
    			proData.setAssoTable(log.assoTable());
    			proData.setField(log.field());
    			proData.setFieldName(log.fieldName());
    			proData.setSummary(log.isSummary());
    			proData.setDynamicField(log.dynamicField());
    			classProperties.add(proData);
    		}
		}
	}
	
}
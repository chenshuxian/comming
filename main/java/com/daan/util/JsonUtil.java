package com.daan.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;

import com.daan.domain.User;


/**
 * @ClassName: JsonUtil
 * @Description: TODO(用于将json字符串转化为对象工具类)
 * @author ggw01
 * @date 2015年11月17日 下午4:18:34
 */
public class JsonUtil {

	/**
	 * @Title: jsonToDtos
	 * @Description: TODO(将json字符串转化为一个集合)
	 * @param json
	 * @param dtoClass
	 * @return List<?>
	 * @throws
	 */
	public static List<?> jsonToDtos(String json,Class dtoClass){
		JSONArray jArray=JSONArray.fromObject(json);
		return JSONArray.toList(jArray , dtoClass);

	}

	/**
	 * @Title: jsonToDto
	 * @Description: TODO(将json转化为dto)
	 * @param json
	 * @param dtoClass
	 * @param classMap<key,Class> key:该dto的集合属性名；Class：该集合属性的元素类型的class
	 * classMap.put("users", User.class);
	 *  classMap.put("demos", Demo.class);
	 * @return Object
	 * @throws
	 */
	public static Object jsonToDto(String json,Class dtoClass,Map<String, Class> classMap){
		JSONObject jsonObj=JSONObject.fromObject(json);
		if(classMap!=null&&classMap.size()>0){
			return JSONObject.toBean(jsonObj, dtoClass, classMap);
		}

		return JSONObject.toBean(jsonObj, dtoClass);

	}
	/**
	 * @Title: DtoTojson
	 * @Description: TODO(单个对象转化为json字符串)
	 * @param dto
	 * @return String
	 * @throws
	 */
	public static String DtoTojson(Object dto){
//    JsonConfig jsonConfig = new JsonConfig();
//    jsonConfig.registerDefaultValueProcessor(Long.class, new DefaultValueProcessor(){
//		@Override
//		public Object getDefaultValue(Class arg0) {
//			return null;
//		}
//    });
//    jsonConfig.registerDefaultValueProcessor(Integer.class, new DefaultValueProcessor(){
//		@Override
//		public Object getDefaultValue(Class arg0) {
//			return null;
//		}
//    });
		JSONObject jsonObj=JSONObject.fromObject(dto);
		return jsonObj.toString();

	}
	/**
	 * @Title: DtosTojson
	 * @Description: TODO(多个元素对象组转化为json字符串)
	 * @param dtos
	 * @return String
	 * @throws
	 */
	public static String DtosTojson(List<?> dtos){
		JSONArray jsonObjs=JSONArray.fromObject(dtos);
		return jsonObjs.toString();

	}

	/**
	 * 修复DtoTojson方法，避免空值被转成0
	 *
	 * @param json
	 * @param obj
	 * @return
	 */
	public static String repairJson(String json, Object obj) {
		try{
			Field[] field = obj.getClass().getDeclaredFields();
			for(Field f : field){
				String type = f.getGenericType().toString();
				if(type.equals("class java.lang.Integer")){
					// 整形、需要纠正json翻译错误。
					String name = f.getName();
					Method method = obj.getClass().getMethod("get"+name.substring(0,1).toUpperCase()+name.substring(1));
					Integer value = (Integer)method.invoke(obj);

					if(value==null){
						// 如果为空，则修复json串
						String regex = "\""+name+"\":0,";
						String replacement = "\""+name+"\":\"\",";
						json = json.replaceAll(regex, replacement);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}

	/**
	 *
	 * @Title: objectToJson
	 * @Description: 将Object转换为json
	 * @param Object
	 * @return String
	 * @author liujiawei
	 * @date 2015年12月21日 上午11:09:37
	 */
	public static String objectToJson(Object object){
		JSONObject jsonObj=JSONObject.fromObject(object);
		return jsonObj.toString();
	}

	/**
	 * 将Json转换成Map
	 * @param object
	 * @return
	 */
	public static HashMap<String, String> jsonToMap(Object object) {
		HashMap<String, String> data = new HashMap<String, String>();
		// 将json字符串转换成jsonObject
		JSONObject jsonObject = JSONObject.fromObject(object);
		Iterator it = jsonObject.keys();
		// 遍历jsonObject数据，添加到Map对象
		while (it.hasNext()) {
			String key = String.valueOf(it.next());
			String value = String.valueOf(jsonObject.get(key));
			data.put(key, value);
		}
		return data;
	}
	
	 /**
     * 将object数据转换成String
     * @param object
     * @return
     */
	public static String arrayToJson(Object[]object) {
		JSONArray jsonarray = JSONArray.fromObject(object);
		return jsonarray.toString();
	}

	public static void main(String[] args) {
		User user=new User();
		user.setUserName("123456789");
//		user.setName("列宁");
		String ss=DtoTojson(user);
		System.out.println(ss);

	}

}

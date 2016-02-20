package com.daan.util;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 配置文件读取
 * 
 * @author GGW
 *
 */
public class PropertiesUtil {

	private static Logger logger = LoggerFactory.getLogger(PropertiesUtil.class);
	
	public static Map<String, ResourceBundle> properties = new HashMap<String, ResourceBundle>();
	//初始化所有属性文件
	static{
		ResourceBundle resourceBundle = ResourceBundle.getBundle("property/comming");		
		properties.put("comming", resourceBundle);
	}
	
	/**
	 * 将文件读取到Map中
	 * @param name
	 * @return
	 */
	private static ResourceBundle load(String name){
		ResourceBundle resourceBundle = properties.get(name);
		try {
			if(resourceBundle == null){
				resourceBundle = ResourceBundle.getBundle(name);
				properties.put(name, resourceBundle);
			}
		} catch (Exception e) {
			logger.warn("the file " + name +".properties was not found");
		}
		return resourceBundle;
	}
	
	public static void main(String args[]){
		PropertiesUtil.load("property/config");
	}

	/**
	 * 根据完整的限定类名和属性的名称获取配置的属性值
	 * @param propertyName
	 * @param key
	 * @return String
	 */
	public static String get(String propertyName, String key) {
		return load(propertyName).getString(key);
		
	}
	
	/**
	 * 获取默认配置文件中的属性值
	 * @param key
	 * @return String
	 */
	public static String get(String key) {
		return load("resources").getString(key);
		
	}
}

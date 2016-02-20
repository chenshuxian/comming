package com.daan.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.daan.domain.User;
import com.daan.shiro.Constants;
import com.daan.shiro.codec.HmacSHA256Utils;



/** 
 * @ClassName: HttpUtil 
 * @Description: TODO(http请求发起工具类) 
 * @author ggw01
 * @date 2015年11月17日 下午10:15:54 
 */
public class HttpUtil {
	
	private static RestTemplate restTemplate = new RestTemplate();
	
	/** 
	 * @Title: getResponseString 
	 * @Description: TODO(get方式发起http请求) 
	 * @param url
	 * @param params
	 * @return String
	 * @throws 
	 */
	public static String getResponseString(String url,Map<String,String> params) throws Exception{
		MultiValueMap<String, String> mapParams = new LinkedMultiValueMap<String, String>();
		if(params==null){
			params=new HashMap<String,String>();
		}
		String httpUrl = UriComponentsBuilder.fromHttpUrl(url).queryParams(mapParams).build().toUriString();
        ResponseEntity responseEntity = restTemplate.getForEntity(httpUrl, String.class);
        return (String) responseEntity.getBody();
		
	}
	
	/** 
	 * @Title: getResponseString 
	 * @Description: TODO(get方式发起http请求) 
	 * @param url
	 * @param params
	 * @return String
	 * @throws 
	 */
	public static String getResponseString(String url,Map<String,String> params,User user) throws Exception{
		MultiValueMap<String, String> mapParams = new LinkedMultiValueMap<String, String>();
		if(params==null){
			params=new HashMap<String,String>();
		}
		params.put(Constants.PARAM_USERID, user.getId()+"");
		params.put(Constants.PARAM_USERNAME, user.getUserName());
		params.put(Constants.PARAM_DIGEST, HmacSHA256Utils.digest(user.getPassword(), params));
		if(null!=params){
			for(String key:params.keySet()){
				mapParams.add(key, params.get(key));
			}
		}
		String httpUrl = UriComponentsBuilder.fromHttpUrl(url).queryParams(mapParams).build().toUriString();
        ResponseEntity responseEntity = restTemplate.getForEntity(httpUrl, String.class);
        return (String) responseEntity.getBody();
		
	}
	/** 
	 * @Title: postResponseString 
	 * @Description: TODO(post方式发起http请求) 
	 * @param url
	 * @param params
	 * @return String
	 * @throws 
	 */
	public static String postResponseString(String url,Map<String,String> params,User user) throws Exception{
		MultiValueMap<String, String> mapParams = new LinkedMultiValueMap<String, String>();
		if(params==null){
			params=new HashMap<String,String>();
		}
		params.put(Constants.PARAM_USERNAME, user.getUserName());
		params.put(Constants.PARAM_DIGEST, HmacSHA256Utils.digest(user.getPassword(), params));
		if(null!=params){
			for(String key:params.keySet()){
				mapParams.add(key, params.get(key));
			}
		}
		String httpUrl = UriComponentsBuilder.fromHttpUrl(url).build().toUriString();
		ResponseEntity responseEntity = restTemplate.postForEntity(url, mapParams, String.class);	
        return (String) responseEntity.getBody();
		
	}
	public static void main(String[] args) {


	}

}

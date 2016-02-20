package com.daan.shiro.codec;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;

/**
 * <p>User: 
 * <p>Date:
 * <p>Version: 1.0
 */
public class HmacSHA256Utils {

    public static String digest(String key, String content) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            byte[] secretByte = key.getBytes("utf-8");
            byte[] dataBytes = content.getBytes("utf-8");

            SecretKey secret = new SecretKeySpec(secretByte, "HMACSHA256");
            mac.init(secret);

            byte[] doFinal = mac.doFinal(dataBytes);
            byte[] hexB = new Hex().encode(doFinal);
            return new String(hexB, "utf-8");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String digest(String key, Map<String, ?> map) {
        StringBuilder s = new StringBuilder();
        if(null==map){
        	map=new HashMap();
        }
        /*begin--将hashmap按key进行排序--*/             
        List<String> mList = new ArrayList<String>(map.keySet());
        Collections.sort(mList);
        //System.out.println(mList);
        Map<String, Object> smap = new HashMap<String, Object>();
        for(String skey :mList){
        	smap.put(skey, map.get(skey));
        }
        /*end--将hashmap按key进行排序--*/
        
        for(Object values : smap.values()) {
            if(values instanceof String[]) {
                for(String value : (String[])values) {
                    s.append(value);
                }
            } else if(values instanceof List) {
                for(String value : (List<String>)values) {
                    s.append(value);
                }
            } else {
                s.append(values);
            }
        }
        return digest(key, s.toString());
    }

}

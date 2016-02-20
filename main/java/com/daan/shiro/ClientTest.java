package com.daan.shiro;

import java.util.Random;

import org.springframework.web.client.RestTemplate;

public class ClientTest {
	private static RestTemplate restTemplate = new RestTemplate();
	
	public static void main(String[] args){

		Random r = new Random();
        System.out.println(r.nextInt(2)+1);
        
        //Assert.assertEquals("hello"+username, responseEntity.getBody());
        //Assert.assertEquals("hello" + param11 + param12 + param2, responseEntity.getBody());
    
	}
}

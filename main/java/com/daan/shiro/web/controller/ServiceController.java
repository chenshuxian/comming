package com.daan.shiro.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>User:
 * <p>Date:
 * <p>Version: 1.0
 */
@RestController
public class ServiceController {

    @RequestMapping("/hello")
    public String hello1(String[] param1, String param2) {
        //return "hello" + param1[0] + param1[1] + param2;
    	return "hello";
    }
}

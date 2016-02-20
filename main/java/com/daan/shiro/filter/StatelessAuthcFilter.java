package com.daan.shiro.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

import com.daan.datasource.DBContextHolder;
import com.daan.shiro.Constants;
import com.daan.shiro.realm.StatelessToken;

/**
 * <p>User: 
 * <p>Date: 
 * <p>Version: 1.0
 */
public class StatelessAuthcFilter extends AccessControlFilter {

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        return false;
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
//    	HttpServletRequest req = (HttpServletRequest) request;  
//    	String url=req.getRequestURI();
//        //1、客户端生成的消息摘要
//        String clientDigest = request.getParameter(Constants.PARAM_DIGEST);
//        if(url.indexOf("service/home/login")>=0){
//        	return true;
//        }
//        //2、客户端传入的用户身份
//        String username = request.getParameter(Constants.PARAM_USERNAME);
//        String userid = request.getParameter(Constants.PARAM_USERID);
//        //3、客户端请求的参数列表
//        Map<String, String[]> params = new HashMap<String, String[]>(request.getParameterMap());
//        params.remove(Constants.PARAM_DIGEST);
//
//        //4、生成无状态Token
//        StatelessToken token = new StatelessToken(username, params, clientDigest);
//
//        try {
//            //5、委托给Realm进行登录
//            Subject sub=getSubject(request, response);
//            sub.login(token);
////    		Random r = new Random();
////    		int i=r.nextInt(3);
////    		DBContextHolder.setDBType(i+"");
//        } catch (Exception e) {
//            e.printStackTrace();
//            onLoginFail(response); //6、登录失败
//            return false;
//        }
  /*  	HttpServletRequest req = (HttpServletRequest) request;  
    	String url=req.getRequestURI();
        //1、客户端生成的消息摘要
        String clientDigest = request.getParameter(Constants.PARAM_DIGEST);
        if(url.indexOf("service/home/login")>=0){
        	return true;
        }
        //2、客户端传入的用户身份
        String username = request.getParameter(Constants.PARAM_USERNAME);
        String userid = request.getParameter(Constants.PARAM_USERID);
        //3、客户端请求的参数列表
        Map<String, String[]> params = new HashMap<String, String[]>(request.getParameterMap());
        params.remove(Constants.PARAM_DIGEST);

        //4、生成无状态Token
        StatelessToken token = new StatelessToken(username, params, clientDigest);

        try {
            //5、委托给Realm进行登录
            Subject sub=getSubject(request, response);
            sub.login(token);
//    		Random r = new Random();
//    		int i=r.nextInt(3);
//    		DBContextHolder.setDBType(i+"");
        } catch (Exception e) {
            e.printStackTrace();
            onLoginFail(response); //6、登录失败
            return false;
        }*/
        return true;
    }

    //登录失败时默认返回401状态码
    private void onLoginFail(ServletResponse response) throws IOException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        httpResponse.getWriter().write("MSG|401");
    }
}

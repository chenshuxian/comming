package com.daan.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.DispatcherServlet;

public class UserDispatcherServlet extends DispatcherServlet {

	@Override
	protected void noHandlerFound(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.sendRedirect(request.getContextPath()+"/index.jsp");
	}
	
}

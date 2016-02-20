package com.daan.controller.interceptor;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.User;

public class LoginInterceptor implements HandlerInterceptor {
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
		logger.info("LoginInterceptor Pre-handle");

		if (request.getServletPath().endsWith("home") || request.getServletPath().endsWith("login")) {
			return true;
		}
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute(Constant.SESSION_KEY);
		if (user == null) {
			String requestType = request.getHeader("x-requested-with");
			if ("XMLHttpRequest".equals(requestType)) {
				String contentType = "application/octet-stream";
				ServletOutputStream out = response.getOutputStream();
				response.setContentType(contentType);

				response.setHeader("sessionstatus", "timeout");
				// out.print("parent.location.href='"+request.getContextPath()
				// +"/login.action'");
				out.print("<script>");
				out.print("parent.location.href='" + request.getContextPath() + "/home'");
				out.print("</script>");

				out.flush();
			} else {
				response.sendRedirect(request.getContextPath() + "/home");
			}
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object arg2, ModelAndView arg3)
			throws Exception {
		// logger.info("Post-handle");
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object arg2, Exception arg3)
			throws Exception {
		// logger.info("After completion handle");
	}

}

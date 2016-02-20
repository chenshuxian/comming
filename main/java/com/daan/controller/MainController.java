package com.daan.controller;

import javax.servlet.http.HttpServletRequest;

import com.daan.util.DateUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.User;
import com.daan.util.CommonComponentController;

/**
 * @author xp
 * 
 */
@Controller
public class MainController extends CommonComponentController {

	@SuppressWarnings("unused")
	private User user;

	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public ModelAndView DCmain(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName(Constant.JSP_LOGIN);
		user = getAdminLoginUser(request);
		if(user!=null){
			//获取首次登录默认值，isFirstSignin为1时为首次登录需设置密码，
			int isFirstSignin = user.getIsFirstSignin()==null?0:user.getIsFirstSignin();
			if(isFirstSignin==1){
				mv.setViewName(Constant.JSP_SETPASSWORD);
			}else{
				mv.addObject("userName", user.getUserName());
				mv.addObject("orgName", user.getOrgName());
				mv.addObject("loginTime", DateUtil.getTimeByCalendar());
				mv.setViewName(Constant.JSP_MAIN);
			}
		}
		return mv;
	}
}

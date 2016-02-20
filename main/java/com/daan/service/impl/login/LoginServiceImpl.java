package com.daan.service.impl.login;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.dao.auth.UserDao;
import com.daan.domain.Constant;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.ReturnVo;
import com.daan.util.JsonUtil;

@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE+Constant.RMC_HOME)
public class LoginServiceImpl {
	@Autowired
	private UserDao userDao;
	@RequestMapping(value = Constant.RMM_LOGIN, method = RequestMethod.POST)
	@ResponseBody
	@Deprecated
	public String login(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "userName", required = true) String userName,
			@RequestParam(value = "password", required = true) String password) {
		Map<String,String>map = new HashMap<String, String>();
		map.put("userName", userName);
		map.put("pwd", password);
		List<User> list = userDao.findByUserNameAndPwd(map);
		ReturnVo returnVo = new ReturnVo();
		if(list==null||list.size()==0){
			returnVo.setError(Message.MSG_LOGIN_FAIL);
		}else{
			returnVo.setBusinessList(list);
		}
		return JsonUtil.DtoTojson(returnVo);
	}

	// 后台管理退出
	@RequestMapping(value = Constant.RMM_LOGOUT, method = RequestMethod.GET)
	@Deprecated
	public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 清除session
		request.getSession().removeAttribute(Constant.SESSION_KEY);
		ModelAndView mv = new ModelAndView();
		mv.setViewName(Constant.JSP_LOGIN);
		return mv;
	}
}

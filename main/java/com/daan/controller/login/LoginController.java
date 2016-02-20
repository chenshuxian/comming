package com.daan.controller.login;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.daan.util.HttpUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.ReturnVo;
import com.daan.util.CommonComponentController;
import com.daan.util.EncodeUtils;
import com.daan.util.JsonUtil;

@Controller
@RequestMapping(value = Constant.RMC_HOME)
public class LoginController extends CommonComponentController {

    @RequestMapping(value = {"/loginMain", "/", ""})
    public ModelAndView loginMain() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName(Constant.JSP_LOGIN);
        return mv;
    }

    @RequestMapping(value = Constant.RMM_LOGIN, method = RequestMethod.POST)
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response, String user_name, String password, boolean rememberMe) {
        ModelAndView mv = new ModelAndView();
        User user = new User();
        mv.addObject("userName", user_name);
        mv.addObject("password", password);

        if (request.getSession() == null) {
            mv.setViewName(Constant.JSP_LOGIN);
            return mv;
        }

        Map<String, String> parms = new HashMap<String, String>();
        parms.put("userNo", user_name);
        parms.put("password", EncodeUtils.md5(password));
        parms.put("type", EncodeUtils.md5(password));
        user.setUserNo(user_name);
        user.setPassword(password);
        String resultString = null;
        try {

            // 登录到用户管理service
//            String url = Constant.userServiceURL(Constant.RMC_HOME, Constant.RMM_LOGIN);
//            resultString = HttpUtil.postResponseString(url, parms, user);

            // 临时用户,u:Admin,p:123456
			resultString = validateUser(user);

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            try {
                //防恶意登陆
                Thread.sleep(2000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
            mv.addObject(Message.ERRORMSG, Message.MSG_SERVICE_EXCEP);
            mv.setViewName(Constant.JSP_LOGIN);
            return mv;
        }
        Map<String, Class> classMap = new HashMap<String, Class>();
        classMap.put("businessList", User.class);
        ReturnVo returnVo = (ReturnVo) JsonUtil.jsonToDto(resultString, ReturnVo.class, classMap);
        String error = returnVo.getError();
        List<User> list = (List<User>) returnVo.getBusinessList();
        if (StringUtils.isNotEmpty(error)) {
            try {
                //防恶意登陆
                Thread.sleep(2000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
            mv.addObject(Message.ERRORMSG, Message.MSG_LOGIN_FAIL);
            mv.setViewName(Constant.JSP_LOGIN);
            return mv;
        }
        // 临时用户
		user = list.iterator().next();
//		//目前还没有选择职能的功能
		user.setOrgId((long) 11111111);
		user.setOrgName("广州");


        //远程
//        user = getAppUser(list);
//        if (user == null) {
//            mv.addObject(Message.ERRORMSG, Message.MSG_LOGIN_FAIL1);
//            mv.setViewName(Constant.JSP_LOGIN);
//            return mv;
//        }

        request.getSession().setAttribute(Constant.SESSION_KEY, user);
        ModelAndView redirectmv = new ModelAndView();
        redirectmv.setViewName(Constant.REDIRECT_MAIN);
        return redirectmv;
    }

    /**
     * 根据默认系统与默认机构选择相应用户
     *
     * @param list
     * @return
     */
    private User getAppUser(List<User> list) {
        for (User user : list) {
            if (Constant.SYS_PROPERTYNAME.equals(user.getPropertyName())) {
                HashMap<String, String> pvMap = new HashMap<String, String>();
                String getPropertyValue = user.getPropertyValue();
                if (getPropertyValue != null && !"".equals(getPropertyValue)) {
                    String[] pvs = getPropertyValue.split(",");
                    for (String pv : pvs) {
                        String[] arrayPv = pv.split(":");
                        pvMap.put(arrayPv[0], arrayPv[1]);
                    }
                }
                String defaultApp = pvMap.get(Constant.SYS_DEFAULT_APP);
                String defaultOrg = pvMap.get(Constant.SYS_DEFAULT_ORG);
                boolean isNotNull = defaultApp != null && defaultOrg != null;
                boolean isEquals = false;
                if (defaultApp != null && defaultOrg != null) {
                    isEquals = defaultApp.equals(user.getSysId().toString()) && defaultOrg.equals(user.getOrgId().toString());
                }
                if (isNotNull && isEquals) {
                    return user;
                }
            }
        }
        return null;
    }

    private String validateUser(User user) {
        List<User> list = new ArrayList<User>();
        if ("Admin".equals(user.getUserNo()) && "123456".equals(user.getPassword())) {
            user.setId("1029384756");
            list.add(user);
        }
        ReturnVo returnVo = new ReturnVo();
        if (list == null || list.size() == 0) {
            returnVo.setError(Message.MSG_LOGIN_FAIL);
        } else {
            returnVo.setBusinessList(list);
        }
        return JsonUtil.DtoTojson(returnVo);
    }

    @RequestMapping(value = Constant.RMM_LEFT, method = RequestMethod.GET)
    public ModelAndView left(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName(Constant.JSP_LEFT);
        return mv;
    }

    // 后台管理退出
    @RequestMapping(value = Constant.RMM_LOGOUT, method = RequestMethod.GET)
    public ModelAndView logout(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        // 清除session
        request.getSession().removeAttribute(Constant.SESSION_KEY);
        ModelAndView mv = new ModelAndView();
        mv.setViewName(Constant.JSP_LOGIN);
        return mv;
    }
}

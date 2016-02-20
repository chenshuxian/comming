package com.daan.controller.auth;

import com.daan.domain.Applications;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.DataGrid;
import com.daan.domain.Message;
import com.daan.domain.Org;
import com.daan.domain.User;
import com.daan.domain.auth.AuthUsers;
import com.daan.dto.auth.UserGroupDto;
import com.daan.enums.StatusEnum;
import com.daan.util.CommonComponentController;
import com.daan.util.EncodeUtils;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author reach lins
 * @Description: TODO(用户管理)
 * @date 2016年1月15日 上午10:19:44
 */
@Controller
@RequestMapping(value = Constant.AuthUserConstant.RMC_HEAD)
public class AuthUsersController extends CommonComponentController {


    @RequestMapping(value = Constant.CommonURI.RMM_INIT, method = RequestMethod.GET)
    public ModelAndView doInit(Integer typeKey, HttpServletRequest request) {
        // user == null, redirect login page
        if (this.getAdminLoginUser(request) == null) {
            return new ModelAndView(Constant.JSP_LOGIN);
        }

        Page<AuthUsers> page = new Page<AuthUsers>(Constant.PAGE_NUMBER);
        ModelAndView mv = new ModelAndView(Constant.AuthUserConstant.JSP_HEAD + Constant.CommonURI.JSP_MAIN);
        mv.addObject("isAbleList", isAbleEnumsDtoList());
        mv.addObject("page", page);
        return mv;
    }


    @SuppressWarnings("unchecked")
    @RequestMapping(value = Constant.CommonURI.RMM_SEARCH, method = RequestMethod.POST)
    public void doPage(HttpServletRequest request, HttpServletResponse response) {
        if (request.getParameter("page") == null) {
            return;
        }
        try {
            //==========组装调用服务需要的参数==========
            Map params = new HashMap();
            params.put("page", request.getParameter("page"));
            params.put("searchStr", request.getParameter("searchStr"));
            params.put("sort", request.getParameter("sort"));
            params.put("status", request.getParameter("status"));
            params.put("rows", request.getParameter("rows"));
            params.put("appId", Constant.OrgAppId.CTR_APP_ID);
            params.put("orgId", Constant.OrgAppId.CTR_ORG_ID);

//            if(request.getParameter("myPage") != null){//自定义到第几页
//                params.put("page", request.getParameter("myPage"));
//            }

            String resultString = null;

            //===============调用服务层方法======================
            String url = Constant.USER_URI + Constant.AuthUserConstant.RMS_HEAD + Constant.CommonURI.RMM_SEARCH;
            resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
            HashMap result = (HashMap) JsonUtil.jsonToDto(resultString, HashMap.class, null);
            List<AuthUsers> authUsersList = (List<AuthUsers>) JsonUtil.jsonToDtos(result.get("data").toString(), AuthUsers.class);
            DataGrid dataGrid = new DataGrid(Long.parseLong(result.get("rowCount").toString()), authUsersList);
            this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    @RequestMapping(value = Constant.CommonURI.RMM_VIEW, method = RequestMethod.POST)
    public ModelAndView doView(HttpServletRequest request, HttpServletResponse response) {
        String action = request.getParameter("action");
        ModelAndView mv = new ModelAndView(Constant.AuthUserConstant.JSP_HEAD + Constant.CommonURI.JSP_VIEW);
        
        try {
            //==========组装调用服务需要的参数==========
            Map params = new HashMap();
            params.put("id", request.getParameter("id"));
            params.put("action", request.getParameter("action"));
            String resultString = null;
            //===============调用服务层方法======================
            AuthUsers item = new AuthUsers();
            if (action.equals("add")) {//new
            } else if (action.equals("update") | action.equals("view")){
                String url = Constant.USER_URI + Constant.AuthUserConstant.RMS_HEAD + Constant.CommonURI.RMM_VIEW;
                resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
                item = (AuthUsers) JsonUtil.jsonToDto(resultString, AuthUsers.class, null);
                mv.addObject("item", item);
            }else if (action.equals("userGroup")){
                mv = new ModelAndView(Constant.AuthUserConstant.JSP_HEAD + Constant.AuthUserConstant.JSP_USER_GROUP);
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return mv;
    }
    
    //===========================add by jacky======================================//
    
    @RequestMapping(value = Constant.CommonURI.RMM_INITUPDATE, method = RequestMethod.GET)
    public ModelAndView doInitUpdate(Integer typeKey, HttpServletRequest request) {
        // user == null, redirect login page
        if (this.getAdminLoginUser(request) == null) {
            return new ModelAndView(Constant.JSP_LOGIN);
        }

        ModelAndView mv = new ModelAndView(Constant.AuthUserConstant.JSP_HEAD + Constant.CommonURI.JSP_UPDATEMAIN);
        return mv;
    }
    
    
    @RequestMapping(value = Constant.CommonURI.RMM_UPDATEPW, method = RequestMethod.POST)
    public void doUpdatePW(HttpServletRequest request, HttpServletResponse response) {
 
        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");
        String message = Message.MSG_SERVICE_EXCEP;
        User user =this.getAdminLoginUser(request);
 
        
        try {
            //==========组装调用服务需要的参数==========
            Map params = new HashMap();
            params.put("userJson", JsonUtil.DtoTojson(user));
            params.put("oldPassword", EncodeUtils.md5(oldPassword));
            params.put("newPassword", EncodeUtils.md5(newPassword));
            
            if (StringUtils.isEmpty(oldPassword) || StringUtils.isEmpty(newPassword)) {
    			this.printTextData(message, response);
    			return;
    		}
          
            String url = Constant.USER_URI + Constant.AuthUserConstant.RMS_HEAD + Constant.CommonURI.RMM_UPDATEPW;
            message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
          
            
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        
        this.printTextData(message, response);
        
    }
    
    /**
	 * 个人信息界面
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.CommonURI.RMM_USERINFO, method = RequestMethod.GET)
	public ModelAndView doUserInfo(HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.CommonURI.RMM_USERINFO + ", " + Constant.INPUT_PARAMS + "null");
		User user = this.getAdminLoginUser(request);
		Map<String, String> params = new HashMap<String, String>(); 
		params.put("status", String.valueOf(StatusEnum.enable.getIndex()));
		params.put("userId", String.valueOf(user.getId()));
		params.put("queryDtoJson","{page:'1'}");
		String applicationsURL = Constant.userServiceURL(Constant.ENTITY_DOCTORS, Constant.ENTITY_LOCRESULTTYPES);
		String centerOrgURL = Constant.userServiceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_USER_LIST);
		String applicationsString = null;
		String centerOrgString =null;
		try {
			applicationsString = HttpUtil.postResponseString(applicationsURL, params, this.getAdminLoginUser(request));
			centerOrgString = HttpUtil.postResponseString(centerOrgURL, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Applications> applicationsList = (List<Applications>) JsonUtil.jsonToDtos(applicationsString, Applications.class);
		List<Org> centerorgList = (List<Org>) JsonUtil.jsonToDtos(centerOrgString, Org.class);
		ModelAndView mv = new ModelAndView(Constant.AuthUserConstant.JSP_HEAD + Constant.CommonURI.JSP_USERINFO);
		mv.addObject("applications", applicationsList);
		mv.addObject("centerorg", centerorgList);
		mv.addObject("user", user);
		logger.info(Constant.METHOD + Constant.CommonURI.RMM_USERINFO + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 保存默认信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.CommonURI.RMM_SAVEUSERINFO, method = RequestMethod.POST)
	public void doSaveUserInfo(Long loginSysId,Long loginOrgId,String loginOrgName,String loginSysName ,HttpServletRequest request,HttpServletResponse response) {
		logger.info(Constant.METHOD +  Constant.CommonURI.RMM_SAVEUSERINFO + ", " + Constant.INPUT_PARAMS + "loginSysId:" + loginSysId+ ",loginOrgId:" + loginOrgId+ ",loginOrgName:" + loginOrgName+ ",loginSysName:" + loginSysName);
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(loginOrgName) || StringUtils.isEmpty(loginSysName)) {
			this.printTextData(message, response);
			return;
		}
		// 设置最新的user的信息，
		Map<String, String> params = new HashMap<String, String>();
		User user =this.getAdminLoginUser(request);
		params.put("oldUserJson", JsonUtil.DtoTojson(user));
		user.setOrgId(loginOrgId);
		user.setOrgName(loginOrgName);
		user.setSysId(loginSysId);
		user.setSysName(loginSysName);	
		try {
			params.put("userJson", JsonUtil.DtoTojson(user));
			String url = Constant.USER_URI + Constant.AuthUserConstant.RMS_HEAD + Constant.CommonURI.RMM_SAVEUSERINFO; // Constant.userServiceURL(Constant.RMC_USER, Constant.RMM_SAVEUSERMESSAGE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD +  Constant.CommonURI.RMM_SAVEUSERINFO + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);

		}
		// 把最新的user信息存在session上
		request.getSession().setAttribute(Constant.SESSION_KEY, user);
		logger.info(Constant.METHOD +  Constant.CommonURI.RMM_SAVEUSERINFO + "," + Constant.RETURN_VALUE + message);
		this.printTextData(message, response);
	}
	
    
  //===========================add by jacky  END======================================//


    @RequestMapping(value = Constant.CommonURI.RMM_UPDATE, method = RequestMethod.POST)
    @ResponseBody
    public String doUpdate(@ModelAttribute AuthUsers authUsers, HttpServletRequest request) {
        String message = Message.MSG_SERVICE_EXCEP;
        String action = request.getParameter("action");
        if (authUsers == null) {
            return message;
        }
        try {
            Map<String, String> params = new HashMap<String, String>();
            authUsers.setOrgId(Constant.OrgAppId.CTR_ORG_ID);
            authUsers.setAppId(Constant.OrgAppId.CTR_APP_ID);
            params.put("dtoJson", JsonUtil.DtoTojson(authUsers));
            params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
            params.put("action", request.getParameter("action"));
            if (action.equals("resetPassword")) {}
            String url = Constant.USER_URI + Constant.AuthUserConstant.RMS_HEAD + Constant.CommonURI.RMM_UPDATE;
            HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
            if (action.equals("resetPassword")) {
                message = Message.SUCC + "密码重置已为"+Constant.RESET_PWD;
            } else {
                message = Message.DATA + JsonUtil.DtoTojson(authUsers);
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return message;
    }

    @RequestMapping(value = Constant.CommonURI.RMM_EXCUTE, method = RequestMethod.POST)
    @ResponseBody
    public String doExcute(HttpServletRequest request) {
        String message = Message.MSG_SERVICE_EXCEP;
        String action = request.getParameter("action");
        Map params = new HashMap();
        params.put("id", request.getParameter("id"));
        params.put("action", request.getParameter("action"));
        String url = Constant.USER_URI + Constant.AuthUserConstant.RMS_HEAD + Constant.CommonURI.RMM_EXCUTE;
        try {
            if(action.equals("getUserGroupData"))
            {
                params.put("appId", Constant.OrgAppId.CTR_APP_ID);
                params.put("orgId", Constant.OrgAppId.CTR_ORG_ID);
                String strResult = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
                List<UserGroupDto> item = (List<UserGroupDto>)  JsonUtil.jsonToDtos(strResult,UserGroupDto.class);
                message = strResult;
            }else  if(action.equals("saveUserGroup"))  {
                params.put("userId", request.getParameter("userId"));
                params.put("groupIds", request.getParameter("groupIds"));
                HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
                message = Message.SUCC+"保存成功";
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return message;
    }

    @RequestMapping(value = Constant.CommonURI.RMM_DELETE, method = RequestMethod.POST)
    @ResponseBody
    public String doDel(HttpServletRequest request) {
        String message = Message.MSG_SERVICE_EXCEP;
        if (request.getParameter("id") == null) {
            return message;
        }
        try {
            Map params = new HashMap();
            params.put("id", request.getParameter("id"));
            String url = Constant.USER_URI + Constant.AuthUserConstant.RMS_HEAD + Constant.CommonURI.RMM_DELETE;
            HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
            message = Message.SUCC+"删除成功";
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return message;
    }
    
    

}

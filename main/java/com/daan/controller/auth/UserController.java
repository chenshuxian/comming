package com.daan.controller.auth;

import com.daan.domain.*;
import com.daan.enums.StatusEnum;
import com.daan.util.*;
import com.daan.utils.DataGrid;
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
 * 用户控制器
 * @author xiaobing
 */
@Controller
@RequestMapping(value = Constant.RMC_USER)
public class UserController extends CommonComponentController {
	
	/**
	 * 用户管理界面
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_USERMAIN, method = RequestMethod.GET)
	public ModelAndView userMain(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView(Constant.JSP_USERMIAN);
		return mv;
	}
	
	/**
	 * 用户管理列表数据加载
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_LIST, method = RequestMethod.POST)
	public void userList(DataGrid dataGrid, HttpServletRequest request, HttpServletResponse response) {
		String pageSize = request.getParameter("rows"); 	  	// 获取页面每页显示条数
		try {
			String resultString = null;	// 返回的joson字符串
			Map<String, String> params = new HashMap<String, String>();
			if(StringUtil.isNotEmpty(pageSize)){
				dataGrid.setPageSize(Integer.parseInt(pageSize));
			}
			params.put("dataGrid", JsonUtil.DtoTojson(dataGrid));
			String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USERMAIN);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response); 
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}
	
	/**
	 * 
	 * @Title: getMaxDisplayOrder
	 * @Description: TODO(根据业务表获取最大顺序号) 
	 * @return String 
	 */
	@RequestMapping(value = Constant.RMM_MAXDISPLAYORDER, method = RequestMethod.POST)
	@ResponseBody
	public String getMaxDisplayOrder(HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_MAXDISPLAYORDER);
		params.put("tableName", Constant.TABLENAME_USERS);
		String displayOrder = null;
		try {
			displayOrder = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return displayOrder;
	}
	
	/**
	 * 
	 * @Title: usersInfo
	 * @Description: TODO(初始化查看页面) 
	 * @param id
	 * @param request
	 * @return String 
	 */
	@RequestMapping(value = Constant.RMM_USER_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String usersInfo(String id, HttpServletRequest request) {
		if(StringUtil.isEmpty(id)){
			return Message.MSG_PARAMS_NULL;
		}
		String resultString = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			// 查找Info
			if(StringUtils.isNotEmpty(id)){
				String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USER_INFO);
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			}
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			return Message.MSG_SERVICE_EXCEP;
		}
		return resultString;
	}
	
	/**
	 * 同名验证
	 * @param users
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_USER_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String userIfExisted(@ModelAttribute Users users, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(users));
			String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USER_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 新增用户
	 * @param users
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_USER_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String usersAdd(@ModelAttribute Users users, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(users));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USER_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 编辑用户
	 * @param users
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_USER_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String userEdit(@ModelAttribute Users users, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(users));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USER_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC_INFO;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: userResetPwd
	 * @Description: 重置密码
	 * @param  id
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_USER_RESETPWD, method = RequestMethod.POST)
	@ResponseBody
	public String userResetPwd(String id, HttpServletRequest request) {
		if(StringUtil.isEmpty(id)){
			return Message.MSG_PARAMS_NULL;
		}
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USER_RESETPWD);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: userStatusUpdate
	 * @Description: 启用、停用状态
	 * @param  id
	 * @param  status
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_USER_UPDATESTATUS, method = RequestMethod.POST)
	@ResponseBody
	public String userStatusUpdate(String id, String status, HttpServletRequest request) {
		if(StringUtil.isEmpty(id) && StringUtil.isEmpty(status)){
			return Message.MSG_PARAMS_NULL;
		}
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("status", status);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USER_UPDATESTATUS);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: usersDelete
	 * @Description: 删除用户信息
	 * @param  id
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_USER_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String usersDelete(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_USER, Constant.RMM_USER_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}		
		return message;
	}
	
	/**
	 * 保存默认信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_SAVEUSERMESSAGE, method = RequestMethod.POST)
	public void saveUserMessage(Long loginSysId,Long loginOrgId,String loginOrgName,String loginSysName ,HttpServletRequest request,HttpServletResponse response) {
		logger.info(Constant.METHOD + Constant.RMM_SAVEUSERMESSAGE + ", " + Constant.INPUT_PARAMS + "loginSysId:" + loginSysId+ ",loginOrgId:" + loginOrgId+ ",loginOrgName:" + loginOrgName+ ",loginSysName:" + loginSysName);
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
			String url = Constant.userServiceURL(Constant.RMC_USER, Constant.RMM_SAVEUSERMESSAGE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_SAVEUSERMESSAGE + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);

		}
		// 把最新的user信息存在session上
		request.getSession().setAttribute(Constant.SESSION_KEY, user);
		logger.info(Constant.METHOD + Constant.RMM_SAVEUSERMESSAGE + "," + Constant.RETURN_VALUE + message);
		this.printTextData(message, response);
	}
	
	/**
	 * 个人信息界面
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_USERINFOMESSAGE, method = RequestMethod.GET)
	public ModelAndView userInfoMessage(HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_USERINFOMESSAGE + ", " + Constant.INPUT_PARAMS + "null");
		User user = this.getAdminLoginUser(request);
		Map<String, String> params = new HashMap<String, String>();
		params.put("status", String.valueOf(StatusEnum.enable.getIndex()));
		params.put("userId", String.valueOf(user.getId()));
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
		ModelAndView mv = new ModelAndView(Constant.JSP_USERINFO);
		mv.addObject("applications", applicationsList);
		mv.addObject("centerorg", centerorgList);
		mv.addObject("user", user);
		logger.info(Constant.METHOD + Constant.RMM_USERINFOMESSAGE + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		return mv;
	}
	
	/**
	 * 设置密码界面
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_SETPASSWORD, method = RequestMethod.POST)
	public ModelAndView setPassWord(String password,HttpServletRequest request) {
		logger.info(Constant.METHOD + Constant.RMM_SETPASSWORD + ", " + Constant.INPUT_PARAMS + "password:" + password);
		//设置密码后跳转到登录页面
		ModelAndView mv = new ModelAndView();
		mv.setViewName(Constant.JSP_LOGIN);
		String message = Message.MSG_SERVICE_EXCEP;
		Map<String, String> params = new HashMap<String, String>();
		User user =this.getAdminLoginUser(request);
		try {
			params.put("userJson", JsonUtil.DtoTojson(user));
			params.put("password", EncodeUtils.md5(password));
			String url = Constant.userServiceURL(Constant.RMC_USER, Constant.RMM_SETPASSWORD);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error(Constant.METHOD + Constant.RMM_SETPASSWORD + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
			e.printStackTrace();
		}
		mv.addObject("message", message);
		logger.info(Constant.METHOD + Constant.RMM_SETPASSWORD + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		mv.setViewName(Constant.REDIRECT_MAIN);
		return mv;
	}

	/**
	 * 修改密码界面
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_UPDATEPASSWORD, method = RequestMethod.GET)
	public ModelAndView updatePassWord(HttpServletRequest request) {
		Page<DictLogs> page = new Page<DictLogs>(Constant.PAGE_NUMBER);
		ModelAndView mv = new ModelAndView(Constant.JSP_UPDATEPASSWORD);
		mv.addObject("page", page);
		return mv;
	}

	/**
	 * 保存修改密码
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_SAVEUPDATEPASSWORD, method = RequestMethod.POST)
	public void saveUpdatePassWord(String oldPassword,String newPassword ,HttpServletRequest request,HttpServletResponse response) {
		logger.info(Constant.METHOD + Constant.RMM_SAVEUPDATEPASSWORD + ", " + Constant.INPUT_PARAMS + "oldPassword:" + oldPassword+",newPassword:"+newPassword);
		String message = Message.MSG_SERVICE_EXCEP;
		//判断参数为空
		if (StringUtils.isEmpty(oldPassword) || StringUtils.isEmpty(newPassword)) {
			this.printTextData(message, response);
			return;
		}
		Map<String, String> params = new HashMap<String, String>();
		User user =this.getAdminLoginUser(request);
		try {
			params.put("userJson", JsonUtil.DtoTojson(user));
			params.put("oldPassword", EncodeUtils.md5(oldPassword));
			params.put("newPassword", EncodeUtils.md5(newPassword));
			String url = Constant.userServiceURL(Constant.RMC_USER, Constant.RMM_SAVEUPDATEPASSWORD);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error(Constant.METHOD + Constant.RMM_SAVEUPDATEPASSWORD + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
			e.printStackTrace();
		}
		logger.info(Constant.METHOD + Constant.RMM_SAVEUPDATEPASSWORD + "," + Constant.RETURN_VALUE + message);
		this.printTextData(message, response);
	}
}

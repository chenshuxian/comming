package com.daan.controller.auth;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.domain.UserGroups;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.DataGrid;

/**
 * @ClassName: UserGroupsController 
 * @Description: TODO(地区控制器) 
 * @author Wumingjava
 * @date 2015年11月26日 上午11:43:18
 */
@Controller
@RequestMapping(value = Constant.RMC_USERGROUPS)
public class UserGroupsController extends CommonComponentController {
	
	/**
	 * @Title: userGroupsMain 
	 * @Description: TODO(进入角色管理页面) 
	 * @return ModelAndView
	 */
	@RequestMapping(value = Constant.RMM_USERGROUPSMAIN)
	public ModelAndView userGroupsMain() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName(Constant.JSP_USERGROUPSMAIN);
		return mv;
	}
	
	/**获取编码号和最大顺序号
	 * @Title: getCodeNo 
	 * @Description: 
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_GETCODENO , method = RequestMethod.POST)
	@ResponseBody
	public String getCodeNo(HttpServletRequest request) {
		Map<String, String> data = new HashMap<String, String>();
		try{
			User user = this.getAdminLoginUser(request);
			
			HashMap<String, String> params = new HashMap<String, String>();
			params.put("code", String.valueOf(Constant.MODULEID_USERGROUPS));
			//根据字典类型获取编码
			String getCodeUrl = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_GETCODENO);
			String codeNo = HttpUtil.postResponseString(getCodeUrl, params, this.getAdminLoginUser(request));
			data.put("code", codeNo);
			//获取最大顺序号
			if(user != null){
				params.put("conditionStr", " and app_id="+user.getSysId()+" and org_id="+user.getOrgId());
			}
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_MAXDISPLAYORDER);
			params.put("tableName", Constant.TABLENAME_USERGROUPS);
			String displayOrder = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			data.put("displayOrder", displayOrder);
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			return Message.MSG_SERVICE_EXCEP;
		}
		return Message.DATA+JsonUtil.objectToJson(data);
	}
	
	/**
	 * @Title: 角色列表 
	 * @Description:
	 * @param id
	 * @param tier
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_LOADUSERGROUPS, method = RequestMethod.POST)
	@ResponseBody
	public void loadUserGroups(DataGrid dataGrid, HttpServletRequest request, HttpServletResponse response) {
		String pageSize = request.getParameter("rows");	  	// 获取页面每页显示条数
		try {
			String resultString = null;	// 返回的joson字符串
			Map<String, String> params = new HashMap<String, String>();
			if(StringUtil.isNotEmpty(pageSize)){
				dataGrid.setPageSize(Integer.parseInt(pageSize));
			}
			User user = this.getAdminLoginUser(request);
			dataGrid.setOrg_Id(user.getOrgId());
			dataGrid.setApp_Id(user.getSysId());
			params.put("dataGrid", JsonUtil.DtoTojson(dataGrid));
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_LOADUSERGROUPS);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response); 
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}
	
	/**
	 * 新增角色
	 * @param dto
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_SAVEUSERGROUPS , method = RequestMethod.POST)
	@ResponseBody
	public String saveUserGroups(UserGroups dto,HttpServletRequest request) {
		String message = "";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("userGroupsJson", JsonUtil.DtoTojson(dto));
			User user = this.getAdminLoginUser(request);
			params.put("userJson", JsonUtil.DtoTojson(user));
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_SAVEUSERGROUPS);
			message = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			return Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	
	/**
	 * 
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_USERGROUPSIFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String userGroupsIfExisted(String name, HttpServletRequest request){
		String message="";
		if(StringUtil.isEmpty(name)){
			return Message.MSG_PARAMS_NULL;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("name", name);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_USERGROUPSIFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	/**
	 * 删除角色信息
	 * @Title: deleteUserGroups
	 * @Description: 
	 * @param  id
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_DELETEUSERGROUPS, method = RequestMethod.POST)
	@ResponseBody
	public String deleteUserGroups(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_DELETEUSERGROUPS);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}		
		return message;
	}
	
	/**
	 * 修改角色
	 * @param UsersGroups
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_EDITUSERGROUPS, method = RequestMethod.POST)
	@ResponseBody
	public String editUserGroups(@ModelAttribute UserGroups userGroups, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(userGroups));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_EDITUSERGROUPS);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC_INFO;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 启用和停用的相互切换
	 * @param id
	 * @param status
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_UPDATESTATUSUERGROUPS, method = RequestMethod.POST)
	@ResponseBody
	public String updateStatusUserGroups(String id, String status, HttpServletRequest request) {
		if(StringUtil.isEmpty(id) && StringUtil.isEmpty(status)){
			return Message.MSG_PARAMS_NULL;
		}
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("status", status);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_UPDATESTATUSUERGROUPS);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * @Title: 加载权限
	 * @Description:
	 * @param id
	 * @param tier
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_LOADROLEPERMISSION, method = RequestMethod.POST)
	@ResponseBody
	public void loadRolePermission(String userGroupsId,HttpServletRequest request, HttpServletResponse response) {
		User user = this.getAdminLoginUser(request);
		Map<String, String> params = new HashMap<String, String>();
		params.put("appId", String.valueOf(user.getSysId()));
		params.put("userGroupsId", userGroupsId);
		try {
			String resultString = null;	// 返回的joson字符串
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_LOADROLEPERMISSION);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response); 
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}
	/**
	 * @Title: 加载权限
	 * @Description:
	 * @param id
	 * @param tier
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_SAVEROLEPERMISSION, method = RequestMethod.POST)
	@ResponseBody
	public String saveRolePermission(String userGroupsId,String userGroupsName,String userGroupsCodeNo,HttpServletRequest request, HttpServletResponse response) {
		String[] nodeIds = request.getParameterValues("nodeIds[]");
		User user = this.getAdminLoginUser(request);
		Map<String, String> params = new HashMap<String, String>();
		params.put("nodeIds", JsonUtil.arrayToJson(nodeIds));
		params.put("userGroupsId", userGroupsId);
		params.put("userGroupsName", userGroupsName);
		params.put("userGroupsCodeNo", userGroupsCodeNo);
		params.put("userJson", JsonUtil.DtoTojson(user));
		try {
			String resultString = null;	// 返回的joson字符串
			String url = Constant.userServiceURL(Constant.RMC_USERGROUPS, Constant.RMM_SAVEROLEPERMISSION);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			return resultString; 
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			return Message.MSG_SAVE_FAIL;
		}
	}
}

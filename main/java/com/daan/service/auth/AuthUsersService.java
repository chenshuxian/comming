package com.daan.service.auth;

import com.daan.dao.CtrDictCodesDao;
import com.daan.dao.auth.AuthUsersDao;
import com.daan.domain.*;
import com.daan.domain.auth.AuthUsers;
import com.daan.domain.auth.UserProfiles;
import com.daan.dto.CtrDictCodesDto;
import com.daan.dto.auth.UserGroupDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.EncodeUtils;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author reach lin
 * @ClassName: AuthUsersService
 * @Description: TODO(用户管理Service)
 */
@Controller
@Transactional
@RequestMapping(value = Constant.AuthUserConstant.RMS_HEAD)
public class AuthUsersService extends AbstractService {


    @Autowired
    private DictLogsService dictLogsService;
    @Autowired
    private AuthUsersDao authUsersDao;

    /**
     * @param @param  queryDtoJson
     * @param @param  request
     * @param @return 设定文件
     * @return String    返回类型
     * @throws
     * @Title: ctrDictCodesPageList
     * @Description: TODO(基础信息数据详细列表)
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value = Constant.CommonURI.RMM_SEARCH, method = RequestMethod.POST)
    @ResponseBody
    public String doPage(HttpServletRequest request) throws Exception {
        if (request.getParameter("page") == null) {
            throw new Exception("AuthUsersService.page: params Is Null!");
        }
        HashMap mapSearchParam = new HashMap();
        mapSearchParam.put("searchStr", request.getParameter("searchStr"));
        mapSearchParam.put("sort", request.getParameter("sort"));
        mapSearchParam.put("status", request.getParameter("status"));
        Page<Object> pageParam = new Page<Object>();
        mapSearchParam.put("page", pageParam);
        pageParam.setRows(Integer.parseInt(request.getParameter("rows")));
        pageParam.setPage(Integer.parseInt(request.getParameter("page")));

        Integer rowCount = this.authUsersDao.doPageCount(mapSearchParam);// 总记录数
        pageParam.setTotalCount(rowCount);

        List<AuthUsers> dataList = authUsersDao.doPageList(mapSearchParam);
        HashMap result = new HashMap();
        result.put("rowCount", rowCount);
        result.put("data", JsonUtil.DtosTojson(dataList));
        return JsonUtil.DtoTojson(result);
    }

    @SuppressWarnings("unchecked")
    @RequestMapping(value = Constant.CommonURI.RMM_VIEW, method = RequestMethod.POST)
    @ResponseBody
    public String doView(HttpServletRequest request) throws Exception {
        String action = request.getParameter("action");
        if (action.equals("update") | action.equals("view")) {
            HashMap mapSearchParam = new HashMap();
            mapSearchParam.put("id", request.getParameter("id"));
            AuthUsers item = authUsersDao.doView(mapSearchParam);
            return JsonUtil.DtoTojson(item);
        }

        throw new Exception("非法调用");
    }


    @RequestMapping(value = Constant.CommonURI.RMM_UPDATE, method = RequestMethod.POST)
    @ResponseBody
    public String doUpdate(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
        if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
            throw new Exception("AuthUsersService: params Is Null!");
        }
        String action = request.getParameter("action");
        AuthUsers authUsers = (AuthUsers) JsonUtil.jsonToDto(dtoJson, AuthUsers.class, null);
        User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
        AuthUsers oldItem = new AuthUsers();
        HashMap param = new HashMap();
        IDictLogger op = DictLogsFactory.CreateAddNewLogger();
        if (action.equals("add")) {
            authUsers.setId(String.valueOf(IDCreater.nextId()));
            authUsersDao.doAdd(authUsers);
            op.AddChangedObject(authUsers);
            UserProfiles up = new UserProfiles();
            up.setId(String.valueOf(IDCreater.nextId()));
            up.setPropertyName("ctr");
            up.setUserId(user.getId().toString());
            String upv = " {\"default_org\":%s,\"default_app\":%s}";
            up.setPropertyValue(String.format(upv, authUsers.getOrgId(), authUsers.getAppId()));
            authUsersDao.doAddDefault(up);

        } else if (action.equals("update")) {
            param.put("id", String.valueOf(authUsers.getId()));
            oldItem = authUsersDao.doView(param);
            authUsersDao.doUpdateUserNo(authUsers);
            op = DictLogsFactory.CreateEditLogger(oldItem);
            op.AddChangedObject(oldItem);
        } else if (action.equals("changeStatus")) {
            param.put("id", String.valueOf(authUsers.getId()));
            if (authUsers.getStatus().equals(1)) {
                authUsers.setStatus(0);
            } else if (authUsers.getStatus().equals(0)) {
                authUsers.setStatus(1);
            }
            oldItem = authUsersDao.doView(param);
            authUsersDao.doChangeStatus(authUsers);
            op = DictLogsFactory.CreateEditLogger(oldItem);
            op.AddChangedObject(oldItem);
        } else if (action.equals("resetPassword")) {
            param.put("id", String.valueOf(authUsers.getId()));
            authUsers.setPassword(EncodeUtils.md5("111111"));
            oldItem = authUsersDao.doView(param);
            authUsersDao.resetPassword(authUsers);
            op = DictLogsFactory.CreateEditLogger(oldItem);
            op.AddChangedObject(oldItem);
        }

        DictLogs log = op.ToDictLog(user);
        log.setModuleId(Constant.MODULEID_AUTHUSERS);
        log.setModuleName(Constant.MODULEID_AUTHUSERS_NAME);
        this.dictLogsService.createDictLogs(log);
        return Message.MSG_SAVE_SUCC;
    }

    @RequestMapping(value = Constant.CommonURI.RMM_DELETE, method = RequestMethod.POST)
    @ResponseBody
    public String doDel(HttpServletRequest request) throws Exception {
        if (request.getParameter("id") == null) {
            throw new Exception("AuthUsersService.id: params Is Null!");
        }
        HashMap mapSearchParam = new HashMap();
        mapSearchParam.put("id", request.getParameter("id"));
        authUsersDao.doDelete(mapSearchParam);
        return "";
    }

    
    /**
	 * 
	 * @Title: setPassword
	 * @Description: 设置用户密码
	 * @param oldPassword
	 * @param request
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.CommonURI.RMM_UPDATEPW, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String doUpdatePW(@RequestParam(value = "oldPassword", required = true) String oldPassword,String newPassword,String userJson,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.CommonURI.RMM_UPDATEPW + ", " + Constant.INPUT_PARAMS + "oldPassword:" + oldPassword+",newPassword:"+newPassword,",userJson"+userJson);
		String message = Message.MSG_SERVICE_EXCEP;
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		String userNo = user.getUserNo();
		if(StringUtils.isEmpty(oldPassword)||StringUtils.isEmpty(userNo)||StringUtils.isEmpty(newPassword)){
			this.throwParamIsNullException(Constant.CommonURI.RMM_UPDATEPW);
			return message;
		}
		//封装对应的用户名和密码；
		Map<String,String> maps = new HashMap<String,String>();
		maps.put("userName", userNo);
		maps.put("pwd", oldPassword);
		maps.put("newPassword", newPassword);
		List<AuthUsers> list = authUsersDao.findByUserNameAndPwd(maps);
		if(list==null||list.size()==0){
			message= Message.MSG_LOGIN_FAIL;
		}else{
			authUsersDao.updatePassword(maps);
			//记录操作日志；
			IDictLogger op = DictLogsFactory.CreateAddNewLogger();
			op.AddChangedObject(user);
			DictLogs log;
			try {
				log = op.ToDictLog(user);
				log.setModuleName(Constant.CommonURI.RMM_UPDATEPW);
				log.setFunctionDesc(log.getModuleName());
				log.setDescription("修改密码成功");
				this.dictLogsService.createDictLogs(log);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		
			message = Message.MSG_SAVE_SUCC;
		}	
		logger.info(Constant.METHOD + Constant.CommonURI.RMM_UPDATEPW + "," + Constant.RETURN_VALUE + message);
		return message;
	}
	
	/**
	 * 
	 * @Title: saveUserMessage
	 * @Description: 保存个人信息
	 * @param userJson
	 * @param request
	 * @return String
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.CommonURI.RMM_SAVEUSERINFO, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String doSaveUserInfo(@RequestParam(value = "userJson", required = false) String userJson,String oldUserJson,
			HttpServletRequest request) throws Exception{
		logger.info(Constant.METHOD + Constant.CommonURI.RMM_SAVEUSERINFO + ", " + Constant.INPUT_PARAMS + "userJson:" + userJson+",oldUserJson"+oldUserJson);
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(userJson)){
			this.throwParamIsNullException(Constant.CommonURI.RMM_SAVEUSERINFO);
			return message;
		}
		Map<String, Object> map = new HashMap<String, Object>();	
		//封装对应的默认机构和默认系统为property_value
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		User oldUser =(User) JsonUtil.jsonToDto(oldUserJson, User.class, null);
		map.put("default_org", user.getOrgId());
		map.put("default_app", user.getSysId());
		String property_value = JsonUtil.objectToJson(map);
		//再次封装profiles对应的数据
		Map<String, Object> mapProfiles = new HashMap<String, Object>();
		mapProfiles.put("user_id", user.getId());
		mapProfiles.put("property_name",user.getSysName());
		mapProfiles.put("property_value",property_value);
		authUsersDao.updateUserSysAndOrg(mapProfiles);
		//记录操作日志；
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldUser);
		op.AddChangedObject(user);
		DictLogs log;
		try {
			log = op.ToDictLog(user);
			log.setModuleName(Constant.CommonURI.RMM_SAVEUSERINFO);
			log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
			this.dictLogsService.createDictLogs(log);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		message = Message.MSG_SAVE_SUCC;
		logger.info(Constant.METHOD + Constant.CommonURI.RMM_SAVEUSERINFO + "," + Constant.RETURN_VALUE + message);
		return message;
	}




    @RequestMapping(value = Constant.CommonURI.RMM_EXCUTE, method = RequestMethod.POST)
    @ResponseBody
    public String doExcute(HttpServletRequest request) throws Exception {
        String action = request.getParameter("action");
        if (action.equals("getUserGroupData")) {
            HashMap mapSearchParam = new HashMap();
            mapSearchParam.put("userId", request.getParameter("id"));
            List<UserGroupDto> items = authUsersDao.getUserGroupByUserId(mapSearchParam);
            return JsonUtil.DtosTojson(items);
        }else  if(action.equals("saveUserGroup"))  {
            HashMap params = new HashMap();
            String userId = request.getParameter("userId");
            params.put("userId",userId);
            Object[] groupIds = request.getParameterValues("groupIds");
            JSONArray jsonArray = JSONArray.fromObject(request.getParameterValues("groupIds"));
            groupIds  = jsonArray.toArray();
            authUsersDao.delUserGroupByUserId(params);
            for(Object groupid :((JSONArray) groupIds[0]).toArray()){
                params.put("groupId",groupid.toString());
                params.put("id", IDCreater.nextId());
                authUsersDao.addUserGroup(params);
            }
            return "";
        }
        throw new Exception("非法调用");
    }



}

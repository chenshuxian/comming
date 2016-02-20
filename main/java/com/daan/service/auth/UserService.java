package com.daan.service.auth;

import com.daan.dao.auth.UserDao;
import com.daan.domain.*;
import com.daan.enums.StatusEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.EncodeUtils;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.DataGrid;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: UserService
 * @Description: TODO(用户SERVICE)
 * @author xiaobing
 * @date 2015年12月07日 下午20:06:01
 */
@Controller
@RequestMapping(value = Constant.SERVICE + Constant.RMC_USER)
public class UserService extends AbstractService {
	
	@Autowired
	private UserDao userDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: userPageList
	 * @Description: 查询用户管理列表
	 * @param dataGrid
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_USERMAIN, method = RequestMethod.POST)
	@ResponseBody
	public String userPageList(@RequestParam(value = "dataGrid", required = true) String dataGrid, HttpServletRequest request) {
		Map<String, Object> mapParam = new HashMap<String, Object>();
		DataGrid<Users> dGrid = (DataGrid<Users>) JsonUtil.jsonToDto(dataGrid, DataGrid.class, null);
		mapParam.put("queryDto", dGrid); // 设置查询参数
		Integer rowCount = userDao.queryCountByUser(mapParam); // 获取总记录数
		List<Users> list = userDao.queryPageListByUser(mapParam); // 获取分页列表数据
		dGrid.setTotal(rowCount);
		dGrid.setRows(list);
		return JsonUtil.objectToJson(dGrid);
	}
	
	/**
	 * 
	 * @Title: usersInfo
	 * @Description: 查询用户信息
	 * @param id
	 * @param request
	 * @return jsonString
	 */
	@RequestMapping(value = Constant.RMM_USER_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String usersInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) {
		Users entity = userDao.findByUserId(id);
		return JsonUtil.DtoTojson(entity);
	}
	
	/**
	 * 
	 * @Title: userAdd
	 * @Description: 新增用户
	 * @param dtoJson
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_USER_ADD, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String usersAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Users dto = (Users) JsonUtil.jsonToDto(dtoJson, Users.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		dto.setId(IDCreater.nextId());
		dto.setStatus(StatusEnum.disabled.getIndex()); // 新增状态默认为停用
		dto.setPassword(EncodeUtils.md5(Constant.RESET_PWD)); // 默认密码
		userDao.insertUsers(dto);
		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 检查系统内是否有同名数据
	 * 
	 * @param dtoJson
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_USER_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String userIfExisted(@RequestParam(value = "dtoJson", required = true) String dtoJson){
		Users dto = (Users) JsonUtil.jsonToDto(dtoJson, Users.class, null);
		List<Users> list = userDao.findByUserNo(dto.getUserNo());
		if(dto.getId() == null || dto.getId().longValue() == 0){
			// 新增
			for(Users entity : list){
				if(dto.getUserNo().equals(entity.getUserNo())){
					return Message.MSG_USER_CONFIRM_NO;
				}
			}
		} else {
			// 修改
			for(Users entity : list){
				if(dto.getUserNo().equals(entity.getUserNo()) && !dto.getId().equals(entity.getId())){
					return Message.MSG_USER_CONFIRM_NO;
				}
			}
		}
		list = userDao.findByUserName(dto.getUserName());
		if(dto.getId() == null || dto.getId().longValue() == 0){
			// 新增
			for(Users entity : list){
				if(dto.getUserName().equals(entity.getUserName())){
					return Message.MSG_USER_CONFIRM_NAME;
				}
			}
		} else {
			// 修改
			for(Users entity : list){
				if(dto.getUserName().equals(entity.getUserName()) && !dto.getId().equals(entity.getId())){
					return Message.MSG_USER_CONFIRM_NAME;
				}
			}
		}
		return "";
	}
	
	/**
	 * 
	 * @Title: userEdit
	 * @Description: 编辑用户
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_USER_EDIT, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String userEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Users dto = (Users) JsonUtil.jsonToDto(dtoJson, Users.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Users oldUser = userDao.findByUserId(dto.getId() + "");
		if(oldUser == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		userDao.updateUsers(dto);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldUser);
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC_INFO;
	}
	
	/**
	 * 
	 * @Title: userResetPwd
	 * @Description: 重置密码
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_USER_RESETPWD, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String userResetPwd(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Map<String, String> mapParam = new HashMap<String, String>();
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Users entity = userDao.findByUserId(id); // 旧数据
		Users newEntity = null; // 新数据
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		mapParam.put("id", id);
		mapParam.put("password", EncodeUtils.md5(Constant.RESET_PWD));
		userDao.updateUserPwd(mapParam);
		newEntity = (Users) entity;
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		newEntity.setPassword(EncodeUtils.md5(Constant.RESET_PWD));
		op.AddChangedObject(newEntity);
		DictLogs log = op.ToDictLog(user);
		log.setModuleId(Constant.CODE_USERS);		
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_RESETPWD_SUCC;
	}
	
	/**
	 * 
	 * @Title: userStatusUpdate
	 * @Description: 启用或者停用状态
	 * @param id
	 * @param status
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_USER_UPDATESTATUS, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String userStatusUpdate(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "status", required = true) Integer status,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		Map<String, String> mapParam = new HashMap<String, String>();
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		Users entity = userDao.findByUserId(id); // 旧数据
		Users newEntity = null; // 新数据
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		mapParam.put("id", id);
		mapParam.put("status", status+"");
		userDao.updateUserStatus(mapParam);
		newEntity = (Users) entity;
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		newEntity.setStatus(status);
		op.AddChangedObject(newEntity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return status == StatusEnum.disabled.getIndex() ? Message.MSG_ENABLE_SUCC: Message.MSG_DISABLED_SUCC;
	}
	
	/**
	 * 
	 * @Title: userDelete
	 * @Description: 删除/选中删除用户信息
	 * @param id
	 * @param userJson
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_USER_DELETE, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String userDelete(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if(StringUtil.isEmpty(id)){
			return Message.MSG_DEL_FAIL3;
		}
		// 检查状态，是否可删除
		Map<String, Users> map = new HashMap<String, Users>();
		Users entity = null;
		String[] idArray = id.split(",");
		for (String uid : idArray) {
			if (StringUtils.isNotBlank(id)) {
				entity = userDao.findByUserId(uid);
				if(entity == null){
					// 数据不存在
					return Message.MSG_NOT_EXISTED;
				}
				// 仅有状态为“停用”时，数据方可删除
				if(entity.getStatus() == null || entity.getStatus().intValue() == StatusEnum.enable.getIndex()){
					return Message.MSG_DEL_FAIL4;
				}
				map.put(uid, entity);
			}
			// 依次删除
			for (String key : map.keySet()) {
				// 执行删除
				userDao.deleteUserById(key);	
				
				// 添加日志（删除）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(entity);
				DictLogs log = op.ToDictLog(user);
				this.dictLogsService.createDictLogs(log);
			}
		}
		return Message.MSG_DEL_SUCC;
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
	@RequestMapping(value = Constant.RMM_SAVEUSERMESSAGE, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String saveUserMessage(@RequestParam(value = "userJson", required = false) String userJson,String oldUserJson,
			HttpServletRequest request) throws Exception{
		logger.info(Constant.METHOD + Constant.RMM_SAVEUSERMESSAGE + ", " + Constant.INPUT_PARAMS + "userJson:" + userJson+",oldUserJson"+oldUserJson);
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(userJson)){
			this.throwParamIsNullException(Constant.RMM_SAVEUSERMESSAGE);
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
		userDao.updateUserSysAndOrg(mapProfiles);
		//记录操作日志；
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldUser);
		op.AddChangedObject(user);
		DictLogs log;
		try {
			log = op.ToDictLog(user);
			log.setModuleName(Constant.MODULE_USERMESSAGE);
			log.setFunctionDesc(Constant.OPERATION_EDIT + "-" + log.getModuleName());
			this.dictLogsService.createDictLogs(log);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		message = Message.MSG_SAVE_SUCC;
		logger.info(Constant.METHOD + Constant.RMM_SAVEUSERMESSAGE + "," + Constant.RETURN_VALUE + message);
		return message;
	}

	/**
	 * 
	 * @Title: setPassword
	 * @Description: 设置用户密码
	 * @param password
	 * @param request
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_SETPASSWORD, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String setPassword(@RequestParam(value = "password", required = true) String password,String userJson,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_SETPASSWORD + ", " + Constant.INPUT_PARAMS + "password:" + password);
		String message = Message.MSG_SERVICE_EXCEP;
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		String userNo = user.getUserNo();
		String pwd = user.getPassword();
		if(StringUtils.isEmpty(password)||StringUtils.isEmpty(userNo)){
			this.throwParamIsNullException(Constant.RMM_SETPASSWORD);
			return message;
		}
		//封装对应的用户名和密码；
		Map<String,String> maps = new HashMap<String,String>();
		maps.put("userNo", userNo);
		maps.put("pwd", pwd);
		maps.put("newPassword", password);
		userDao.updatePassword(maps);
		//记录操作日志；
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(user);
		DictLogs log;
		try {
			log = op.ToDictLog(user);
			log.setModuleName(Constant.MODULE_SETPASSWORD);
			log.setFunctionDesc(log.getModuleName());
			log.setDescription("设置密码成功");
			this.dictLogsService.createDictLogs(log);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		message = Message.MSG_SAVE_SUCC;
		logger.info(Constant.METHOD + Constant.RMM_SETPASSWORD + "," + Constant.RETURN_VALUE + message);
		return message;
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
	@RequestMapping(value = Constant.RMM_SAVEUPDATEPASSWORD, method = RequestMethod.POST)
	@ResponseBody
	@Transactional
	public String saveUpdatePassWord(@RequestParam(value = "oldPassword", required = true) String oldPassword,String newPassword,String userJson,
			HttpServletRequest request) throws Exception {
		logger.info(Constant.METHOD + Constant.RMM_SAVEUPDATEPASSWORD + ", " + Constant.INPUT_PARAMS + "oldPassword:" + oldPassword+",newPassword:"+newPassword,",userJson"+userJson);
		String message = Message.MSG_SERVICE_EXCEP;
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		String userNo = user.getUserNo();
		if(StringUtils.isEmpty(oldPassword)||StringUtils.isEmpty(userNo)||StringUtils.isEmpty(newPassword)){
			this.throwParamIsNullException(Constant.RMM_SAVEUPDATEPASSWORD);
			return message;
		}
		//封装对应的用户名和密码；
		Map<String,String> maps = new HashMap<String,String>();
		maps.put("userNo", userNo);
		maps.put("pwd", oldPassword);
		maps.put("newPassword", newPassword);
		List<User> list = userDao.findByUserNameAndPwd(maps);
		if(list==null||list.size()==0){
			message= Message.MSG_LOGIN_FAIL;
		}else{
			userDao.updatePassword(maps);
			//记录操作日志；
			IDictLogger op = DictLogsFactory.CreateAddNewLogger();
			op.AddChangedObject(user);
			DictLogs log;
			try {
				log = op.ToDictLog(user);
				log.setModuleName(Constant.MODULE_UPDATEPASSWORD);
				log.setFunctionDesc(log.getModuleName());
				log.setDescription("修改密码成功");
				this.dictLogsService.createDictLogs(log);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		
			message = Message.MSG_SAVE_SUCC;
		}	
		logger.info(Constant.METHOD + Constant.RMM_SAVEUPDATEPASSWORD + "," + Constant.RETURN_VALUE + message);
		return message;
	}
}

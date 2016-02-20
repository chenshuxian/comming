package com.daan.domain;
/**
 * 
 * @ClassName: Message 
 * @Description: TODO(消息前缀+"|"+消息内容) 
 * @author Wumingjava
 * @date 2015年11月26日 上午11:14:20
 */
public class Message {
	public final static String INFO = "info|";
	public final static String ERR = "err|";
	public final static String DATA = "data|";
	//用于登录显示异常信息
	public final static String ERRORMSG = "errorMSG";
	/**主要是用于页面中特殊的提示*/
	public final static String SUCC = "succ|";
	public final static String CONFIRM = "confirm|";
	public final static String MSG_SAVE_SUCC_INFO = INFO+"保存成功！";
	public final static String MSG_SAVE_SUCC = SUCC+"保存成功！";
	public final static String MSG_SAVE_FAIL = ERR+"保存失败！";
	public final static String MSG_SAVE_FAIL3 = ERR+"当前选中记录状态为可用，不允许修改！";
	public final static String MSG_USER_CONFIRM_NO = INFO+"用户账号已经存在，请重新输入！";
	public final static String MSG_USER_CONFIRM_NAME = CONFIRM+"用户名重复，是否继续?";
	public final static String MSG_ENABLE_SUCC = INFO+"启用成功！";
	public final static String MSG_DISABLED_SUCC = INFO+"停用成功！";
	public final static String MSG_RESETPWD_SUCC = INFO+"重置成功！";
	public final static String MSG_RESETPWD_FAIL = INFO+"重置失败！";
	
	public final static String MSG_DEL_FAIL = ERR+"删除失败，还存在有子记录！";
	public final static String MSG_DEL_FAIL2 = ERR+"删除失败，请先取消其他业务数据关联！";
	public final static String MSG_DEL_FAIL3 = ERR+"删除失败！";
	public final static String MSG_DEL_FAIL4 = ERR+"当前选中记录状态为可用，不允许删除！";
	public final static String MSG_DEL_FAIL5 = ERR+"第#条记录状态为可用，不允许删除！";
	public final static String MSG_DEL_SUCC = SUCC+"删除成功！";
	public final static String MSG_DEL_SUCC1 = DATA+"删除成功！";//被解析后，还有再进行处理的。
	
	public final static String MSG_NOT_EXISTED = ERR+"该数据不存在！";
	public final static String MSG_NOT_MAXORDER = "无法获取最大顺序号！";
	
	public final static String MSG_CONFIRM_1 = CONFIRM+"中文名称重复，是否继续?";
	public final static String MSG_CONFIRM_2 = CONFIRM+"卫生机构代码已重复，是否继续？";
	public final static String MSG_CONFIRM_3 = ERR+"当前通道码已存在不允许重复！";
	public final static String MSG_CONFIRM_4 = ERR+"盒子条码已存在不允许重复！";
	public final static String MSG_CONFIRM_5 = ERR+"盒子IP已存在不允许重复！";
	
	public final static String MSG_PARAMS_NULL = INFO+"传入参数的为空！";
	public final static String MSG_SERVICE_EXCEP = ERR+"操作失败,请刷新页面！";
	public final static String MSG_FIND_NULL = INFO+"查询没有数据！";
	public final static String MSG_GETRESULT_FAIL = ERR+"未获取到数据！";
	public final static String MSG_TESTITEM_STATUS_DISAVLE = INFO + "项目已停用";
	public final static String MSG_TESTITEM_STATUS_USING = INFO + "项目已启用";
	public final static String MSG_ERR_FAIL = ERR + "操作失败";
	public final static String MSG_LOGIN_FAIL = ERR + "账号或密码错误!";
	public final static String MSG_LOGIN_FAIL1 = ERR + "该用户机构与系统权限维护有误，请联系系统管理员!";


}

$(document).ready(function () { 
	var checkedOrgId = $("#ui_loginOrgId").val();
	var checkedSysId = $("#ui_loginSysId").val();
	$("#ui_loginOrganization input[type='radio'][value=\'"+checkedOrgId+"\']").attr("checked","checked");
	$("#ui_loginSystem input[type='radio'][value=\'"+checkedSysId+"\']").attr("checked","checked");
});
var ui_message ={
ui_submitOrg:function(){
	var orgId=$('input:radio[name="org"]:checked').val();
	var orgName = $("#orgTr_" + orgId).children('td').eq(2).html();
	$("#ui_loginOrgId").val(orgId);
	$("#ui_loginOrgName").val(orgName)
	$('.pop').hide();
},

ui_submitSys:function(){
	var sysId=$('input:radio[name="system"]:checked').val();
	var sysName = $("#sysTr_" + sysId).children('td').eq(2).html();
	$("#ui_loginSysId").val(sysId);
	$("#ui_loginSysName").val(sysName);
	$('.pop').hide();
},

ui_submitPhone:function(){
	$('.pop').hide();
	showMessage("成功绑定手机号");
},

ui_submit:function(){
	var loginSysId=$("#ui_loginSysId").val();
	var loginOrgId=$("#ui_loginOrgId").val();
	var loginSysName=$("#ui_loginSysName").val();
	var loginOrgName=$("#ui_loginOrgName").val();
	showConfirm('是否确定提交？',function(){
		$.ajax({
			url : ctx + "/sys/user/saveUserMessage",
			type : "POST",
			data : {loginSysId : loginSysId, loginOrgId : loginOrgId,loginSysName:loginSysName,loginOrgName:loginOrgName},
			success : function(data) {
				ui_message.resolutionData(data);
			},
			error : function() {
			}
		});
	});
	
},
/**
 * @param msg Ajax返回的信息
 */
resolutionData:function(msg){
	if(msg!=""&&msg!=null){
		var err=msg.indexOf("err|");
		var info=msg.indexOf("info|");
		var data=msg.indexOf("data|");
		var succ=msg.indexOf("succ|");
		if(err==0){
			showMessage(msg.substring(4));
			return ;
		}
		if(info==0){
			showMessage(msg.substring(5),"提示信息");
			return ;
		}
		if(data==0){
			 return msg.substring(5);
		}
		if(succ==0){
			showMessage(msg.substring(5));
			return ;
		}
	}else{
		showMessage("获取数据异常！");
	}
},
setPassword:function(){
	var password = $("#password").val();
	var rePassword = $("#rePassword").val();
	if(password==null||password==""){
		showMessage("请输入密码");
		return;
	}
	if(rePassword==null||rePassword==""){
		showMessage("请输入确认密码");
		return;
	}
	if(password!=rePassword){
		showMessage("两次密码不一致，请重新输入！");
		return;
	}
	$.ajax({
			url : ctx + "/sys/user/setPassWord",
			type : "POST",
			data : {password : password, rePassword : rePassword},
			success : function(data) {
				window.history.back(-1);
			},
			error : function() {
			}
		});
},
updatePassword:function(){
	var oldPassword = $("#up_oldPassword").val();
	var newPassword = $("#up_newPassword").val();
	var reNewPassword = $("#up_reNewPassword").val();
	if(oldPassword==null||oldPassword==""){
		showMessage("请输入旧密码");
		ui_message.clearUpdatePassword();
		return;
	}
	if(newPassword==null||newPassword==""){
		showMessage("请输入密码");
		ui_message.clearUpdatePassword();
		return;
	}
	if(reNewPassword==null||reNewPassword==""){
		showMessage("请输入确认密码");
		ui_message.clearUpdatePassword();
		return;
	}
	if(newPassword!=reNewPassword){
		showMessage("两次新密码不一致，请重新输入！");
		ui_message.clearUpdatePassword();
		return;
	}
	$.ajax({
			url : ctx + "/sys/user/saveUpdatePassWord",
			type : "POST",
			data : {oldPassword : oldPassword, newPassword : newPassword},
			success : function(data) {
				ui_message.clearUpdatePassword();
				ui_message.resolutionData(data);
			},
			error : function() {
			}
		});
},
clearUpdatePassword:function(){
	$("#up_oldPassword").val("");
	$("#up_newPassword").val("");
	$("#up_reNewPassword").val("");
}
}

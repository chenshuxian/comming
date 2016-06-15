/**
 * Created by Administrator on 2016/5/23.
 */
/*$(function(){
		$('#imgCaptcha').click(function(){
			$(this).attr("src",'${ctx}/home/captcha?c='+new Date());
		});
	});*/

var getPassword = (function($){

	var getPassword = {

		getCode: function() {


			var mobile = $("#mobile").val(),
				GP = $("#getPassCode"),
				startTime = Math.round(new Date().getTime()/1000);

			localStorage.setItem(mobile,startTime);
				//second = localStorage.getItem("msgSecondCB");

			//console.log(second);

			time(GP,180);

			$.ajax({
				type: "POST",
				url: ctx + "/home/getPasscode",
				data: {
					mobile: mobile
				},
				success:function(data){
					resolutionData(data);
				}
			});
		},

		secondSubmit: function() {
			var
				mobile =  $("#mobile").val(),
				passcode =  $("#passcode").val(),
				params = {
					url: ctx + "/home/getPassword_second",
					data: {
						mobile: mobile,
						passcode: passcode
					},
					nextPage: ctx + "/home/getPassword_third",
					changeBlock: $("#changeBlock"),
					callback: function() {
						$(".items:eq(2)").addClass("active");
					}
				};
			server(params);
		},

		thirdSubmit: function() {

			var
				newPW =  $("#newPW").val(),
				checkPW =  $("#checkPW").val(),
				reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[!@#$%^&_])|(?=.*?[A-Za-z])(?=.*?[!@#$%^&_]))[\dA-Za-z!@#$%^&_]{6,20}$/,
				params = {
					url: ctx + "/home/getPassword_third",
					data: {
						password1: newPW,
						password2: checkPW
					},
					nextPage: ctx + "/home/getPassword_four",
					changeBlock: $("main"),
					callback: function() {

					}
				};

			if(!reg.test(newPW)){
				showMessage("密码需由6-20个，字母、数字的组合");
				return;
			}

			if(newPW != checkPW){
				showMessage("密码不匹配");
				return;
			}


			server(params);
		}
	};

	var time = function(_this,wait) {

		if (wait <= 0) {
			$("#getPassCode").removeAttr("disabled");
			$("#getPassCode").html('免费获取验证码');
			//wait = 180;
		} else {
			$("#getPassCode").attr('disabled','disabled');
			$("#getPassCode").html("重新发送(" + wait + ")");
			wait--;
			setTimeout(function() {
					time(_this,wait)
					//localStorage.setItem('msgSecondCB',wait);
				},
				1000)
		}
	}


	var resolutionData = function(msg) {
		if (msg != "" && msg != null) {
			var err = msg.indexOf("err|");
			var info = msg.indexOf("info|");
			var data = msg.indexOf("data|");
			var succ = msg.indexOf("succ|");
			if (err == 0) {
				showMessage(msg.substring(4));
				$("#editBtn").attr("disabled", false);
				return false;
			}
			if (info == 0) {
				var mess = msg.substring(5);
				if (mess.indexOf("成功") != -1) {
					$.messager.show({
						title: '提示',
						msg: msg.substring(5),
						timeout: 2000,
						showType: 'slide'
					});
				} else {
					showMessage(mess, "提示信息");
				}

			}
			if (data == 0) {
				return msg.substring(5);
			}
			if (succ == 0) {
				return true;
			}
			return true;
		} else {
			// showMessage("获取数据异常！");
			return true;
		}

		return true;
	},

	showMessage = function(msg, callback) {
		// $.messager.alert("提示",msg);
		if (callback) {
			jAlert(msg, '提示', callback);
		} else {
			jAlert(msg, '提示');
		}
	};

	function server(params) {

		$.ajax({
			type: "POST",
			url: params.url,
			data: params.data,
			success:function(data){
				var next = resolutionData(data);
				if(next) {
					params.changeBlock.load(params.nextPage,function() {
						params.callback();
					});
				}
			}
		});
	};

	var jAlert = function(message, title, callback) {
			$.alerts.alert(message, title, callback);
		};

	$(function(){
		//验证码改变
		$('#imgCaptcha,#changeCaptcha').on("click",function(){
			$("#imgCaptcha").attr("src",ctx + '/home/captcha?c='+new Date());
		});


		$("#firstSubmit").on("click",function(){
			var
				mobile =  $("#mobile").val(),
				passcode =  $("#passcode").val(),
				GP = $("#getPassCode"),
				startTime = localStorage.getItem(mobile),
				enterTime = Math.round(new Date().getTime()/1000),
				limitTime = enterTime - startTime,
				second = 180 - limitTime,
				params = {
					url: ctx + "/home/getPassword",
					data: {
						mobile: mobile,
						passcode: passcode
					},
					nextPage: ctx + "/home/getPassword_second",
					changeBlock: $("#changeBlock"),
					callback: function() {
						$(".items:eq(1)").addClass("active");
						console.log(second);
						time(GP,second);
					}
				},
				reg = /^(?:13\d|14\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;

			if	(!reg.test(mobile)) {
				//$("#errorMsg").html('*请输入正确的手机号码！');
				showMessage("请输入正确的手机号码!");
				return false;
			}

			server(params);
		});


	});

	return getPassword;

}(jQuery));

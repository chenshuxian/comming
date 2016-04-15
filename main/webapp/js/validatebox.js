/*
 * 2016/1/25
 * easyui validatebox Module
 * 作者: chenshuxian
 */  
var validate;

validate = (function($,BM){
		
	//var validate = {};
	//var _init = function(){

	//验证清单建立
	$.extend($.fn.validatebox.defaults.rules,{
		symbol:{
			validator: function(value){
				var reg = /[<>|$]/;
		        return !reg.test(value);
			},
			message: "本次输入中有特殊字符，请重新输入!"
		},
		authUser:{
			validator: function(value){
				var reg = /^(?!(?:\d*$))[A-Za-z0-9_]{4,20}$/;
		        return reg.test(value);
			},
			message: "4-20位，可由数字、字母和下划线组成，最少包含一位字母，字母不区分大小写!"
		},
		compareDate:{
			validator: function(value,param){	
				//console.log($(param[0]).datetimebox('getValue'));
		        return _dateCompare($(param[0]).datetimebox('getValue'),value);
			},
			message: "开始日期需小于结束日期！"
		},
		digits: {
			validator: function (value) {

				return /^([0-9])+\d*$/i.test(value);
			},
			message: "请输入数字"
		},
		blank: {
			validator: function (value) {
				return trim(value) != '';
			},
			message: "不能只输入空格！"
		},
		ipFormat: {
			validator: function (value) {
				var reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
				return reg.test(value);
			},
			message: "请输入正确的IP地址"
		},
		password:{
			validator: function(value){
				var reg = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
		        return reg.test(value);
			},
			message: "6-20个字符，字母、数字和符号的组合!"
		},
		equalTo:{
			validator: function(value,param){
				return $(param[0]).val() == value;
			},
			message: "字段不匹配"
		},
		numAndLetters: {
			validator: function (value) {
				var reg = /^[A-Za-z0-9]+$/;
				return reg.test(value);
			},
			message: "数字、字母的组合"
		},
		//下拉是选单验证
		selectValueRequired: {
			validator: function(value,param){
				//console.info($(param[0]).find("option:contains('"+value+"')").val());
				return $(param[0]).find("option:contains('"+value+"')").val() != '';
			},
			message: '下拉选框不可为空.'
		},
		english: {
			validator: function (value) {
				var reg = /^[A-Za-z]+$/;
				return reg.test(value);
			},
			message: "只能有字母"
		},
		upperCase: {
			validator: function (value) {
				var reg = /^[A-Z]+$/;
				return reg.test(value);
			},
			message: "只能为大写字母"
		},
		upperNum: {
			validator: function (value) {
				var reg = /^[A-Z|0-9]+$/;
				return reg.test(value);
			},
			message: "只能为大写字母和数字，请重新输入"
		},
		comboxtree: {
			validator: function (value,param) {
				var selVal = $("input[name=" + param[0] + "]").val();
				return parseInt(selVal) > 0;
			},
			message: "不可以空，请选择"
		},
		compareValue: {
			validator: function (value,param) {
				var selVal = $("input[name=" + param[0] + "]").val();
				console.log(value);
				console.log(selVal);

				return value > parseInt(selVal);
			},
			message: "超始年龄要小于结束年龄"
		},
		space: {
			validator: function (value) {
				var space = true;

				if($.trim(value) == "")
					space = false;

				return space;
			},
			message: "不可为空"
		}

	});

	
	var _default = function () {
		$("input [type='text']").validatebox({
    		validType:  'symbol'
    	});
	};
	
	//日期格式转换
	var _DateToUnix = function(string) {
		
        var f = string.split(' ', 2);
        var d = (f[0] ? f[0] : '').split('-', 3);
        var t = (f[1] ? f[1] : '').split(':', 2);
        return (new Date(
                parseInt(d[0], 10) || null,
                (parseInt(d[1], 10) || 1) - 1,
                parseInt(d[2], 10) || null,
                parseInt(t[0], 10) || null,
                parseInt(t[1], 10) || null,
                parseInt(t[2], 10) || null
                )).getTime() / 1000;
        
    };

	
    $.extend(BM,{
    	
    	dateCompare : function(startdate,enddate) {
    		
    		//var arr = startdate.split("-");
    		var starttimes = _DateToUnix(startdate);
    		var endtimes = _DateToUnix(enddate);
    	
            //console.log(starttimes +" "+endtimes);
            if (starttimes > endtimes) {
            	//$("#logQSearchBtn").attr('disabled','disabled');
            	BM.showMessage('开始日期需小于结束日期!');
                return false;
            }
            //$("#logQSearchBtn").removeAttr('disabled');
    	    return true;
    		    
    	},
    	validateBox : function() {

        	//中文名长度
        	$("input[name='name']").validatebox({
				required:true,
				validType:  ['symbol','length[0,35]','space'],
				missingMessage: "中文名称不可为空！"
			});
			$("input[name='name']").attr('maxlength','35');

			$("input[name='shortName']").validatebox({
				validType:  ['symbol','length[0,15]']
			});
			$("input[name='shortName']").attr('maxlength','15');
        	//英文名长度
        	$("input[name='enShortName']").validatebox({
        		validType:  ['symbol','length[0,20]']
        	});
        	$("input[name='enShortName']").attr('maxlength','20');
        	//英文名长度
        	$("input[name='enName']").validatebox({
        		validType:  ['symbol','length[0,55]']
        	});
        	$("input[name='enName']").attr('maxlength','55');
        	//whonetCode长度
        	$("input[name='whonetCode']").validatebox({
        		validType:  ['symbol','length[0,15]']
        	});
        	$("input[name='whonetCode']").attr('maxlength','15');
			//fastCode长度
			$("input[name='fastCode']").validatebox({
				validType:  ['symbol','length[0,9]']
			});
			$("input[name='fastCode']").attr('maxlength','9');
        	//displayOrder长度
        	$("input[name='displayOrder']").validatebox({
				validType:  ['digits','length[0,6]']
			});
			$("input[name='displayOrder']").attr('maxlength','6');
        	//memo长度
        	$("textarea").validatebox({
        		validType: ['symbol','length[0,150]']
        	});
        	$("textarea").attr('maxlength','150');
    		//盒子条码
    		$("input[name='box_barcode']").validatebox({
    			validType:  ['symbol','length[0,20]', 'digits']
    		});
    		$("input[name='box_barcode']").attr('maxlength','20');
    		//盒子IP
    		$("input[name='box_ip']").validatebox({
    			validType:  ['symbol','length[0,15]', 'ipFormat']
    		});
    		$("input[name='box_ip']").attr('maxlength','15');

    		//中心仪器
    		$("input[name='model']").validatebox({
    			validType:  ['symbol','length[0,20]']
    		});
    		$("input[name='model']").attr('maxlength','20');

    		$("input[name='producer']").validatebox({
    			validType:  ['symbol','length[0,30]']
    		});
    		$("input[name='producer']").attr('maxlength','30');
			$("#webUrl").validatebox({
				required:true,
				validType:  ['symbol','length[0,50]','space'],
				missingMessage: "网站名称为空，请重新输入！"
			});
			$("#telephone").validatebox({
				required:true,
				validType:  ['symbol','digits','space'],
				missingMessage: "联系电话为空，请重新输入！"
			});
			$("#editResultValue").validatebox({
				required:true,
				validType:  ['symbol','space'],
				missingMessage: "结果描述为空，请重新输入！"
			});
			//地址
			$("#address").validatebox({
				validType:  ['symbol','length[0,200]']
			});
			$("#address").attr('maxlength','200');

			$("#enAddress").validatebox({
				validType:  ['symbol','length[0,200]']
			});
			$("#enAddress").attr('maxlength','200');
			//连络人
			$("#contacts").validatebox({
				validType:  ['symbol','length[0,20]']
			});
			$("#contacts").attr('maxlength','20');
			//传真
			$("#fax").validatebox({
				validType:  ['symbol','length[0,30]']
			});
			$("#fax").attr('maxlength','30');
			//备注
			$("#memo").validatebox({
				validType:  ['symbol','length[0,50]']
			});
			$("#memo").attr('maxlength','50');


        },
        getAuth : function(obj) {
        	
        	switch(obj){
        	
    			case "AuthUsers" :
    				return authUser(); 
    				break;
    			case "UpdatePw" :
    				return updatePW(); 
    				break;
    			case "Inst" :	//中心仪器信息
    				return _default(); 
    				break;
    			default:
    				return validateBox();
    				break;
    			
    		}
        	
        	//_beforeSubmit();
        	
        },
        updatePW : function() {
        	
        	$("#up_newPassword").validatebox({
        		validType: 'password'
        	});
        	
        	$("#up_reNewPassword").validatebox({
        		validType: 'equalTo["#up_newPassword"]'
        	});
        	   	
        }
        
    	
    });

	return BM;


}(jQuery,BasicModule));

//$(function(){
//	validate.init();
//});

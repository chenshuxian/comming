/*
 * 2016/1/25
 * easyui validatebox Module
 * 作者: chenshuxian
 */  
var validate;

validate = (function($,BM){
		
	//var validate = {};
	//var _init = function(){

	var _stopStr = "(此选择已被停用)";

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
				//var reg = /^(?!(?:\d*$))[A-Za-z0-9_]{4,20}$/;
				var reg = /^[A-Za-z0-9_]{1,14}$/;
				return reg.test(value);
			},
			message: "长6-20字符，可由数字、字母和下划线组成，字母不区分大小写!"
		},
		//客户帐号创建
		customer:{
			validator: function(value){
				//var reg = /^(?!(?:\d*$))[A-Za-z0-9_]{4,20}$/;
				value = value.toLowerCase();
				//var reg = /^(?!.*?(?:admin|administrator)).*([A-Za-z]+[0-9_]*)$/;
				//var reg = /^[^admin\x22A-Za-z0-9_]{6,20}$/;
				var reg = /^(?!.*admin)/;

				return reg.test(value);

			},
			message: "不能包含admin"
		},
		account:{
			validator: function(value){
				//var reg = /^(?!(?:\d*$))[A-Za-z0-9_]{4,20}$/;
				value = value.toLowerCase();
				var reg = /^(?!(?:[\d_]*$))[A-Za-z0-9_]{4,20}$/;

				return reg.test(value);

			},
			message: "长4-20字符，可由数字、字母和下划线组成，字母不区分大小写!"
		},
		compareDate:{
			validator: function(value,param){	
				//console.log($(param[0]).datetimebox('getValue'));
		        return _dateCompare($(param[0]).datetimebox('getValue'),value);s
			},
			message: "开始日期需小于结束日期！"
		},
		digits: {
			validator: function (value) {

				return /^([0-9])+\d*$/i.test(value);
			},
			message: "请输入数字"
		},
		telephone: {
			validator: function (value) {
				return /^[\d\s\-]+$/.test(value);
			},
			message: "可输入数字,-,空格"
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
				//var reg = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
				var reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[!@#$%^&_])|(?=.*?[A-Za-z])(?=.*?[!@#$%^&_]))[\dA-Za-z!@#$%^&_]{6,20}$/;
				//var reg = /^[!@#$%^&_]*[\dA-Za-z]+$/;
				return reg.test(value);
			},
			message: "6-20个字符，字母、数字的组合!"
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

				if ($.trim(value) == ""){
					space = false;
				}

				return space;
			},
			message: "不可为空"
		},
		//中心信息项目对照数字验证，取到小数点第二位
		numberTwo:{
			validator: function (value) {
				var reg = /^[0-9]+(.[0-9]{1,2})?$/;
				return reg.test(value);
			},
			message: "只能为数字，小数点取到第二位"
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
				validType:  ['symbol','length[0,30]','space'],
				missingMessage: "中文名称不可为空！"
			});
			$("input[name='name']").attr('maxlength','30');

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
				validType:  ['symbol','telephone','space'],
				missingMessage: "联系电话为空，请重新输入！"
			});
			$("#editResultValue").validatebox({
				required:true,
				validType:  ['symbol','space'],
				missingMessage: "结果描述为空，请重新输入！"
			});
			$("#editResultValue").attr('maxlength','100');
			//地址
			$("#address").validatebox({
				validType:  ['symbol','length[0,35]']
			});
			$("#address").attr('maxlength','35');

			$("#enAddress").validatebox({
				validType:  ['symbol','length[0,120]']
			});
			$("#enAddress").attr('maxlength','120');
			//连络人
			$("#contacts").validatebox({
				validType:  ['symbol','length[0,20]']
			});
			$("#contacts").attr('maxlength','20');
			//传真
			$("#fax").validatebox({
				validType:  ['symbol','length[0,25]']
			});
			$("#fax").attr('maxlength','25');
			//备注
			$("textarea").validatebox({
				validType:  ['symbol','length[0,150]']
			});
			$("textarea").attr('maxlength','150');

			//备注
			$("#memo").validatebox({
				validType:  ['symbol','length[0,150]']
			});
			$("#memo").attr('maxlength','150');


        },

        updatePW : function() {
        	
        	$("#up_newPassword").validatebox({
        		validType: 'password'
        	});
			$("#up_newPassword").attr('maxlength','20');

        	$("#up_reNewPassword").validatebox({
        		validType: 'equalTo["#up_newPassword"]'
        	});
			$("#up_reNewPassword").attr('maxlength','20');
        },

		//进行comboGrid 验证
		comboGrid: function(obj,msg,parentId,req) {
			var
				comboText = obj.getText(),
				require = true;

			if(req == 0 && comboText == "") {
				require = false
			}


			if (require) {	//必填
				if (comboText == "") {
					BM.showMessage(msg +"数据为空,，请从下拉列表中添加！",function(){
						$("#" + parentId + "input:text").select();
					});
					return true;
				}
				if(!obj.checkValue(false) && obj.comboEditText != comboText){
					BM.showMessage(msg +"数据不存在,，请从下拉列表中添加！",function(){
						$("#" + parentId + "input:text").select();
					});
					return true;
				}
			}

		},

		/*comboGrid 编辑时进行验证
		当编辑打开始进行栏位值验证
		如为空代表已被停用，但是需要可以进行存储
		若进来后有做修正动作时，且值有更动时，就需进行重新验证。
		运用于 editCallBack 中
		*/
		comboGridEdit: function(obj,inputName,id) {

			var comboText = obj.getText(),
				setText = comboText + _stopStr;

			//已被停用
			if(!obj.checkValue(false) && comboText != "") {
				obj.setText(setText);
				$("input[name='" + inputName + "']").val(id);
				obj.comboEditText = setText;
			}

		}
        
    	
    });

	return BM;


}(jQuery,BasicModule));

var theme = "energyblue";

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") -> 2013-05-26 22:05:05.999 
 */
Date.prototype.format = function(fmt) {
	var o = {
		//月份
		"M+" : this.getMonth() + 1,
		//日
		"d+" : this.getDate(),
		//小时
		"h+" : this.getHours(),
		//分
		"m+" : this.getMinutes(),
		//秒
		"s+" : this.getSeconds(),
		//季度
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		//毫秒
		"S" : this.getMilliseconds()	
	};
	
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o){
		if (new RegExp("(" + k + ")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]):(("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};

function objectClick(obj, href){
	obj.load(href);
}

/**
 * 替换字符串
 * @param str
 * @param oldStr
 * @param newStr
 * @returns
 */
function replaceAll(str, oldStr, newStr){
	 var reg=new RegExp(oldStr,"g"); //创建正则RegExp对象
	 return str.replace(reg,newStr);
}

function replaceAll2(str, oldStr, newStr){
	var reg = new RegExp(oldStr.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
	return str.replace(reg,newStr);

}

/**
 * 检验下拉框必填
 * @param objs
 * @param msgs
 * @returns {Boolean}
 */
function checkComboMustSelect(objs,msgs){
	for(var i=0;i<objs.length;i++){
		if(objs[i].getSelectedValue()==null || objs[i].getSelectedValue()==""){
			objs[i].setComboText("");
			objs[i].openSelect();
			jAlert(msgs[i] + "不能为空，请重新输入！","提示信息");
			return false;
		}
	}
	return true;				
}

/**
 * 检验下拉框必填
 * @param ids
 * @param msgs
 * @returns {Boolean}
 */
function checkSelectMustSelect(ids,msgs){
	for(var i=0;i<ids.length;i++){
		var id = "#" + ids[i];
		var selValue = $(id).find('option:selected').val();
		if(selValue=="" || selValue=="-1"){
			$(id).focus();
			jAlert(msgs[i] + "必须选择！","提示信息");
			return false;
		}
	}
	return true;				
}

/**
 * 检核字段不能为空
 * @param ids
 * @param msgs
 * @returns {Boolean}
 */
function checkTextNotNull(ids,msgs){
	for(var i=0;i<ids.length;i++){
		var id = "#" + ids[i];
		if(trim($(id).val())==""){
			$(id).select();
			jAlert(msgs[i] + "不能为空，请重新输入！","提示信息");
			return false;
		}
	}
	return true;				
}

 /**
  * 检核字段不能为空
  * @param ids
  * @param msgs
  * @returns {Boolean}
  */
 function checkTextNotNull2(ids,msgs){
 	for(var i=0;i<ids.length;i++){
 		var id = "#" + ids[i];
 		if(trim($(id).val())==""){
 			$(id).select();
 			jAlert(msgs[i] + "不能为空，请重新输入！","提示信息");
 			return false;
 		}
 	}
 	return true;				
 }
/**
 * 校验所有输入域是否含有特殊符号
 * 所要过滤的符号写入正则表达式中，注意，一些符号要用'\'转义.
 * 试例：if(checkAllTextValid(document.forms[0]))
 * fadeInMessage("表单中所有文本框通过校验！");
 * @param form
 * @returns {Boolean}
 */
function checkAllTextValid(form) {
	//记录不含引号的文本框数量
	var check = true;
	var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>\/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
	for ( var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type == "text") {
			if(pattern.test(form.elements[i].value)){
				form.elements[i].select();
				check = false;
				jAlert("文本框中不能含有特殊字符，请检查输入！","提示信息");
				break;
			}
		}		
	}
	return check;
}

/**
 * 匹配中文 数字 字母 下划线
 * @param str
 * @returns {Boolean}
 */
function checkInput(str) {
	var pattern = /^[\w\u4e00-\u9fa5]+$/gi;
	if (pattern.test(str)) {
		return false;
	}
	return true;
}
/**
 * 匹配数字 字母
 * @param str
 * @returns {Boolean}
 */
function checkInput2(str) {
	var pattern = /^[0-9a-zA-Z]+$/;
//	var pattern = /^[A-Za-z]+$/;
	if (pattern.test(str)) {
		return false;
	}
	return true;
}

/**
 * 去除特殊字符
 * @param s
 * @returns {String}
 */
function stripScript(s) {
	var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
	var rs = "";
	for ( var i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, '');
	}
	return rs;
}

//验证是否存在汉字和全角符号
function isChinese(msg){
	if ((/[^\x00-\xff]/g.test(msg))){
		return true;
	}else{
		return false;
	}
}

/**
 * 生成GUID
 * @returns {String}
 */
function guidGenerator() {
	var guid = "";
	for ( var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	return guid;
}

/**
 * String函数之LTrim(),用于清除字符串开头的空格\换行符\回车等
 * @param str
 * @returns
 */
function ltrim(str) {
	var pattern = new RegExp("^[\\s]+","gi");
	return str.replace(pattern,"");
}

/**
 * String函数之RTrim(),用于清除字符串结尾的空格\换行符\回车等
 * @param str
 * @returns
 */
function rtrim(str) {
	var pattern = new RegExp("[\\s]+$","gi");
	return str.replace(pattern,"");
}

/**
 * String函数之Trim(),用于清除字符串开头和结尾部分的空格\换行符\回车等
 * @param str
 * @returns
 */
function trim(str) {
	return rtrim(ltrim(str));
}

/**
 * 检验电子邮箱地址的合法性
 * @param str
 * @returns
 */
function checkEmail(str){
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return reg.test(str);
}



/**
 * 批量验证手机号格式
 * @param ids 表单ID
 * @param msg 弹出消息
 */
function checkPhones(ids, msg){
	for(var i=0;i<ids.length;i++){
		var val = $("#" + ids[i]).val();
		if(val != ""){
			if(!checkPhone(val)){
				$("#" + ids[i]).select();
				jAlert(msg[i] + " 格式错误！","提示信息");
				return false;
			}
		}
	}
	return true;
}

/**
 * 批量验证电话格式
 * 匹配格式：
 * 11位手机号码
 * 3-4位区号，7-8位直播号码，1－4位分机号
 * 如：12345678901、1234-12345678-1234
 * @param str
 */
function checkTelOrMobiles(ids, msg){
	var endMsg = " 格式错误！"
		       + "\n正确格式："
		       + "\n13988888888;"
		       + "\n020-88888888/02088888888;"
		       + "\n0755-7777777/07557777777;"
		       + "\n0755-88888888/075500000000;"
		       + "\n020-88888888-0000/020888888880000;";
	for(var i=0;i<ids.length;i++){
		var val = $("#" + ids[i]).val();
		if(val != ""){
			if(!checkTelOrMobile(val)){ 
				jAlert(msg[i] + endMsg,"提示信息");
				$("#" + ids[i]).select();
				return false;
			}
		}
	}
	return true;
}

/**
 * 检验手机号的合法性
 * @param str
 * @returns
 */
function checkPhone(str){
	if(str.length > 20){
		return false;
	}
	
	var reg = /^\d+(\d|-)*\d$/;
	return reg.test(str);
}

/**
 * 验证字符串
 * @param reg 正则表达式
 * @param str 待验证字符串
 * @returns 符合则返回true
 */
function checkTelOrMobile(str){
	var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
	return reg.test(str);
}
/**
 * 检验邮政编码的合法性
 * @param str
 * @returns
 */
function checkPostCode(str){
	if(str.length > 6){
		return false;
	}
	
	var reg = /^[0-9]{6}$/;
	return reg.test(str);
}

/**
 * 计算两个日期的间隔天数
 * @param startDate 开始日 yyyy-MM-dd格式
 * @param endDate 结束日 yyyy-MM-dd格式
 * @returns
 */
function computationDays(startDate, endDate) {  
	var dateArray, sDate, eDate;
	dateArray = startDate.split("-");
	//转换为dd-MM-yyyy格式  
	sDate = new Date(dateArray[1] + '-' + dateArray[2] + '-' + dateArray[0]); 
	dateArray = endDate.split("-");
	eDate = new Date(dateArray[1] + '-' + dateArray[2] + '-' + dateArray[0]);
	//把相差的毫秒数转换为天数
	return parseInt(Math.abs(sDate - eDate)/1000/60/60/24);   
}

/**
 * 批量验证数值，3位整数，2位小数
 * @param str
 * @returns
 */
function check2Scales(ids, msgs){
	for(var i=0;i<ids.length;i++){
		var val = $("#" + ids[i]).val();
		if(val != ""){
			if(!check2Scale(val)){ 
				jAlert(msgs[i] + " 必须为数字，且整数位不超过3位，小数位不超过2位！","提示信息");
				$("#" + ids[i]).select();
				return false;
			}
		}
	}
	return true;
}

/**
 * 验证数值，3位整数，2位小数
 * @param str
 * @returns
 */
function check2Scale(str){
	var reg = /^(?:(?:[1-9]\d{0,2}(?:\.\d{1,2})?)|(?:[0]\.\d{1,2}))$/;
	return reg.test(str);
}

/**
 * 批量验证是否为整数
 * @param ids
 * @param msgs
 * @returns
 */
function checkIntegers(ids, msgs){
	for(var i=0;i<ids.length;i++){
		var val = $("#" + ids[i]).val();
		if(val != ""){
			if(!checkInteger(val)){ 
				jAlert(msgs[i] + "必须为整数！","提示信息");
				$("#" + ids[i]).select();
				return false;
			}
		}
	}
	return true;
}

/**
 * 验证是否为整数
 * @param str
 */
function checkInteger(str){
	var reg = /^[0-9]\d*$/;
	return reg.test(trim(str));
}

/**
 * 批量验证是否为整数且在范围之内
 * @param ids 但验证表单ID
 * @param msgs 表单名
 * @param min 最小值
 * @param max 最大值
 * @returns {Boolean}
 */
function checkIntegerAndRanges(ids, msgs, min, max){
	for(var i=0;i<ids.length;i++){
		var val = $("#" + ids[i]).val();
		if(val != ""){
			if(!checkIntegerAndRange(val, min, max)){ 
				jAlert(msgs[i] + "必须为整数，且必须在"+ min +"~" + max + "之间！","提示信息");
				$("#" + ids[i]).select();
				return false;
			}
		}
	}
	return true;
}

/**
 * 验证是否为整数且在范围之内
 * @param inte 待验证数据
 * @param min 最小值
 * @param max 最大值
 * @returns
 */
function checkIntegerAndRange(inte, min, max){
	var result = checkInteger(inte);
	if(result){
		if(inte<min || inte>max){
			result = false;
		}
	}
	return result;
}

//字符串是否为空
function isEmpty(str){
 	if (str == null || str.trim()== "") {
 		return true;
 	} else {
 		return false;
 	}
 }

//判断String类型日期(YYYY-MM-DD YYYY/MM/DD)
function isDate(str){
	var r = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
	if( r == null ) {
		r = str.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
		if(r == null ) {
			return false;
		}
	}
	var d = new Date(r[1], r[2]-1, r[3]);
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3]);
}

//判断String类型日期 (YYYY-MM-DD HH24:MI 或者 YYYY/MM/DD HH24:MI)
function isDateTime(str) {
	var r = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})$/);
 	if( r == null ) {
 		r = str.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2})$/);
 		if(r == null ) {
 			return false;
 		}
 		return false;
 	}
 	var d = new Date(r[1], r[2]-1, r[3], r[4], r[5]); 
 	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3] 
 				&& d.getHours() == r[4] && d.getMinutes() == r[5]);
 }
 
//判断String类型日期 (YYYY-MM-DD HH24:MI:SS 或者 YYYY/MM/DD HH24:MI:SS)
function isDateTimeFull(str) {
	var r = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
	if( r == null ) {
		r = str.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
		if(r == null ) {
			return false;
		}
		return false;
	}
	var d = new Date(r[1], r[2]-1, r[3], r[4], r[5], r[6]);
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3] 
				&& d.getHours() == r[4] && d.getMinutes() == r[5] && d.getSeconds() == r[6]);
}

/**
 * 检查日期格式(YYYY-MM-DD HH24:MI 或者 YYYY/MM/DD HH24:MI)，如果格式错误则清空表单
 * @param id 表单ID
 */
function checkDateTimeFormat(id){
	var value = $("#" + id).val();
	if(!isDateTime(value)){
		 $("#" + id).val("");
	}
}

/**
 * 检查日期格式(YYYY-MM-DD YYYY/MM/DD)，如果格式错误则清空表单
 * @param id 表单ID
 */
function checkDateFormat(id){
	var value = $("#" + id).val();
	if(!isDate(value)){
		 $("#" + id).val("");
	}
}

/**
 * 检查母条码号格式
 * @param id
 * @param msg
 * @returns {Boolean}
 */
function checkBarCode(id,msg){
	var val = $("#" + id).val();
	if(val != ""){
		if(!checkMotherBar(val)){ 
			jAlert(msg + "必须为12位数字且末两位必须为0！","提示信息");
			$("#" + id).select();
			return false;
		}
	}
	return true;
}

//上一个方法，如果条码为11位或12位但结尾只有一个0也可以通过
function checkBarCodeNew(id, msg){
	var val = $("#" + id).val();
	if(val != ""){
		if(!(/^[0-9]{10}00$/.test(val))){ 
			jAlert(msg + "必须为12位数字且末两位必须为0！","提示信息");
			$("#" + id).select();
			return false;
		}
	}
	return true;
}
/**
 * 检查母条码格式
 * @param str
 * @returns
 */
function checkMotherBar(str){
	var reg = /^[0-9]{10}00?$/;
	return reg.test(str);
}

function checkResourceBar(str){
	if(trim(str)==""){
		return false;
	}
	var reg = /^[0-9]{9}?$/;
	return reg.test(trim(str));
}

/**
 * 验证条码号(数字，长度为12)
 * @param str
 * @returns
 */
function checkBar(str){
	var reg = /^[0-9]{12}?$/;
	return reg.test(trim(str));
}

/**
 * 验证试管架号(数字，长度为5)
 * @param str
 * @returns
 */
function checkRackCode(str){
	var reg = /^[0-9]{5}?$/;
	return reg.test(trim(str));
}

/**
 * 
 * @param fBar
 * @param sBar
 * @returns {Boolean}
 */
function checkTwoBar(fBar, sBar){
	if(fBar == ""){
		return false;
	}
	if(fBar != sBar){
		return false;
	}
	return true;
}

function getYestoday(date){       
	var yesterday_milliseconds=date.getTime()-1000*60*60*24;        
	var yesterday = new Date();        
	yesterday.setTime(yesterday_milliseconds);        
	var strYear = yesterday.getFullYear();     
	var strDay = yesterday.getDate();     
	var strMonth = yesterday.getMonth()+1;   
	if(strMonth<10)     
	{     
		strMonth="0"+strMonth;     
	}     
	datastr = strYear+"-"+strMonth+"-"+strDay;   
	return datastr;   
} 

/**
 * 实数
 */
function validateDouble(sDouble){
  //var re = /^\d+(?=\.{0,1}\d+$|$)/;
  var re = /^[0-9]+(\.[0-9]+)?$/;
  return re.test(sDouble);
}

 function replaceStr(str){
	 if (typeof(str)!=='string') return str;
		str = str.replace(/'/g, '\\\'');
		str = str.replace(/"/g, '\\"');
		return str;
 }
 
 function replaceHtml(str){
	 if (typeof(str)!=='string') return str;
		str = str.replace(/&/g, "&amp;");
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&apos;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
		return str;
 }

 /**
  * 验证是否是正整数
  * @param str
  * @returns
  */
 function checkPositiveInteger(str){
	 var reg = /^[1-9]*[1-9][0-9]*$/;
	 return reg.test(str);
 }
 
//form序列化之前清除文本框空格
 function formTextTrim(form){
 	var formData = jQuery("form input:text");
 	if(form !=null && form!=""){
 		formData = jQuery("#"+form+" input:text");
 	}
 	formData.each(function(){
 		if(jQuery(this).val() !=null){
 			jQuery(this).val(trim(jQuery(this).val()));
 		}
 	});
 }
 //form表单是否有过变更
 function formIsDirty(formName) {
	var from1 = document.forms[formName];
	for (var i = 0; i < from1.elements.length; i++) {
		var element = from1.elements[i];
		var type = element.type;
		if (type == "checkbox" || type == "radio") {
			if (element.checked != element.defaultChecked) {
				return true;
			}
		} else if (type == "hidden" || type == "password" || type == "text"
				|| type == "textarea") {
			if (element.value != element.defaultValue) {
				return true;
			}
		} else if (type == "select-one" || type == "select-multiple") {
			for (var j = 0; j < element.options.length; j++) {
				if (element.options[j].selected != element.options[j].defaultSelected) {
					return true;
				}
			}
		}
	}
	return false;
}
 
 /*   
  * MAP对象，实现MAP功能   
  *   
  * 接口：   
  * size()     获取MAP元素个数   
  * isEmpty()    判断MAP是否为空   
  * clear()     删除MAP所有元素   
  * put(key, value)   向MAP中增加元素（key, value)    
  * remove(key)    删除指定KEY的元素，成功返回True，失败返回False   
  * get(key)    获取指定KEY的元素值VALUE，失败返回NULL   
  * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL   
  * containsKey(key)  判断MAP中是否含有指定KEY的元素   
  * containsValue(value) 判断MAP中是否含有指定VALUE的元素   
  * values()    获取MAP中所有VALUE的数组（ARRAY）   
  * keys()     获取MAP中所有KEY的数组（ARRAY）   
  *   
  * 例子：   
  * var map = new Map();   
  *   
  * map.put("key", "value");   
  * var val = map.get("key")   
  * ……   
  *   
  */     
 function Map() {     
     this.elements = new Array();     
        
     //获取MAP元素个数     
     this.size = function() {     
         return this.elements.length;     
     }     
        
     //判断MAP是否为空     
     this.isEmpty = function() {     
         return(this.elements.length < 1);     
     }     
        
     //删除MAP所有元素     
     this.clear = function() {     
         this.elements = new Array();     
     }     
        
     //向MAP中增加元素（key, value)      
     this.put = function(_key, _value) {     
         this.elements.push( {     
             key : _key,     
             value : _value     
         });     
     }     
        
     //删除指定KEY的元素，成功返回True，失败返回False     
     this.remove = function(_key) {     
         var bln = false;     
         try{     
             for(i = 0; i < this.elements.length; i++) {     
                 if(this.elements[i].key == _key) {     
                     this.elements.splice(i, 1);     
                     return true;     
                 }     
             }     
         } catch(e) {     
             bln = false;     
         }     
         return bln;     
     }     
        
     //获取指定KEY的元素值VALUE，失败返回NULL     
     this.get = function(_key) {     
         try{     
             for(i = 0; i < this.elements.length; i++) {     
                 if(this.elements[i].key == _key) {     
                     return this.elements[i].value;     
                 }     
             }     
         } catch(e) {     
             return null;     
         }     
     }     
        
     //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
     this.element = function(_index) {     
         if(_index < 0 || _index >= this.elements.length) {     
             return null;     
         }     
         return this.elements[_index];     
     }     
        
     //判断MAP中是否含有指定KEY的元素     
     this.containsKey = function(_key) {     
         varbln = false;     
         try{     
             for(i = 0; i < this.elements.length; i++) {     
                 if(this.elements[i].key == _key) {     
                     bln = true;     
                 }     
             }     
         } catch(e) {     
             bln = false;     
         }     
         return bln;     
     }     
        
     //判断MAP中是否含有指定VALUE的元素     
     this.containsValue = function(_value) {     
         var bln = false;     
         try{     
             for(i = 0; i < this.elements.length; i++) {     
                 if(this.elements[i].value == _value) {     
                     bln = true;     
                 }     
             }     
         } catch(e) {     
             bln = false;     
         }     
         return bln;     
     }     
        
     //获取MAP中所有VALUE的数组（ARRAY）     
     this.values = function() {     
         var arr = new Array();     
         for(i = 0; i < this.elements.length; i++) {     
             arr.push(this.elements[i].value);     
         }     
         return arr;     
     }     
        
     //获取MAP中所有KEY的数组（ARRAY）     
     this.keys = function() {     
         var arr = new Array();     
         for(i = 0; i < this.elements.length; i++) {     
             arr.push(this.elements[i].key);     
         }     
         return arr;     
     }     
 } 
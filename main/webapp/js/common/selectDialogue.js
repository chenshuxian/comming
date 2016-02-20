/*
 * @param funcType  	对话框对应的功能ID
 * @param searchStr 	查找字符串
 * @param objectId	 	输入框控件ID
 * @param retObjectId  	返回控件ID
 * @param fn		  	回调函数，如果没有则传入null
 * @param id  			其他条件，比如科室对话框时，该参数是客户ID
 */
function openSelectWin(btnName,funcType,searchStr,objectId,retObjectId,fn,conditions){
	//var url = ctx + "/selectDialogue/main?funcType=" + funcType 
	//		+ "&searchStr=" + $("#"+objectId+" ").val() + "&objectId=" + objectId + "&retObjectId=" + retObjectId + "&time="+new Date().getTime();
	var url = ctx + "/selectDialogue/main?funcType=" + funcType 
			+ "&searchStr=&objectId=" + objectId + "&retObjectId=" + retObjectId + "&callback=" + fn;
	if(funcType == 'location'){
		url += "&customerId=" + conditions;
	}
	if(funcType == 'labTestitem'){
		url += "&laboratoryId=" + conditions;
	}
	if(funcType == 'labTestitem2'){
		url += "&laboratoryId=" + conditions;
	}
	if(funcType == 'dictionary'){
		url += "&typeCode=" + conditions;
	}
	//客户维护-新增页面  此条件只针对于此页面有效
	if(funcType == 'admArea'){
		url += "&typeCode=" + conditions;
	}
	url += "&time="+new Date().getTime();
	//$("#" + btnName + "").removeAttr("data-remote");
	//$("#" + btnName + "").attr("data-target", url);
	//$("#" + btnName + "").attr("data-remote", url);
	
	//alert($("#" + btnName + "").attr("data-remote"));
	$("#" + btnName + "").attr("data-remote", url);
	
	//$("#myChooseModal").target(url);
	
	
	
	//$("#" + btnName + "").scojs_modal({remote: url});
}

$("#myChooseModal").on("hidden.bs.modal", function() {
    $(this).removeData("bs.modal");
});
/**
* @ClassName: ctrResultTypes.js
* @Description: TODO(结果类型-JS) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:52:56 
*
 */
// 控制重复提交
var canStore = true;
var g_status = 1; //状态是否是可用   0-停用    1-启用
// 关闭窗口
function closeWin() {
	$(".oy").remove();
	$(".xinxi").hide();
}

// 查询结果类型List
function pageQuery() {
//	var pageNo = $("#pageNo").val();
//	var pageSize = $("#pageSize").val();
//	if (pageNo == 'undefined' || pageNo == null) {
//		pageNo = 1;
//	}
//	if (pageSize == 'undefined' || pageSize == null) {
//		pageSize = 5;
//	}
	var searchStr = $("#searchStr").val().trim();
	var status = $("#status").val();
	var sort = $("#sort").val();
	var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesPageList";
	$("#infoPageDiv").load(url, {searchStr : searchStr, status : status, sort : sort}, function() {
		$("#infoPageDiv").show();
		var rowsize = document.getElementById('listTable').getElementsByTagName('tr').length;
		var typeId = $('#typeId').val();
		if (typeId == 'undefined' || typeId == null) {
			typeId = $('#listTable tr:eq(1) td:nth-child(8)').html();
		}
		/*if (rowsize > 1 && typeId > 0){
			pageQuery2(typeId, 0); //0 - 按序号排序 
			return;
		} else {
			pageQuery2(typeId, 0);
		}*/
		if (rowsize > 1 && typeId > 0){
			pageQuery2(typeId, 0); //0 - 按序号排序 
			return;
		} else {
			pageQuery2('@@@', 0);	//TODO 暂时传入一个无法查询导的数据
		}
	});
}

//查询结果描述List
function pageQuery2(typeId, sort) {
	if (typeId == 'undefined' || typeId == null) {
	    typeId = $('#typeId').val();
	}
	$(".cur2").removeClass("cur2");
	$("#tr_"+typeId).addClass("cur2");
//	var pageNo = $("#pageNo_2").val();
//	var pageSize = $("#pageSize").val();
//	if (pageNo == 'undefined' || pageNo == null) {
//		pageNo = 1;
//	}
//	if (pageSize == 'undefined' || pageSize == null) {
//		pageSize = 5;
//	}
	//var searchStr = $("#searchStr").val().trim();
	//var typeId = $("#typeId").val();
	//var sort = $("#sort").val();			 
	var url = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailPageList";
	$("#detailInfoPageDiv").load(url, { typeId : typeId, sort : sort}, function() {
		$("#detailInfoPageDiv").show();
		$("#typeId").val(typeId);
	});
}

// 结果类型进入明细页面
function showInfo(id, opType, status) {
	if (opType == "edit" && status == 1){
		showMessage('当前选中记录已启用，不允许修改！ ');
		return;
	}
	var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesInfo";
	$("#infoViewDiv").load(url, {id : id, opType : opType}, function() {
		$("body").append("<div class='oy'></div>")
		$("#infoViewDiv").show();
	});
}

//结果描述进入明细页面
function detailShowInfo(id, opType) {
	var typeId = $("#typeId").val();
	var url = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailInfo";
	$("#detailInfoViewDiv").load(url, {id : id, typeId : typeId, opType : opType}, function() {
		$("body").append("<div class='oy'></div>")
		$("#detailInfoViewDiv").show();
	});
}

// 全选、反选
function selectAll() {
	var chk = $("input[id='selectAllBox']").is(':checked');
	if (chk == true) {
		// 全选
		$("input[id='checkItem']").each(function() {
			$(this).prop("checked", true);
		});
	} else {
		// 反选
		$("input[id='checkItem']").each(function() {
			$(this).prop("checked", !$(this).prop("checked"));
		});
	}
}

// 启用Or停用
function disableOrEnable(id, index, operatioType) {
	if (id == '' || operatioType == '') {
		showMessage('请选择操作记录!');
		return;
	}
	var confirmMeg = "";
	if(operatioType == 'Disable'){
		confirmMeg = "是否停用当前记录？";
	}
	if(operatioType == 'Enable'){
		confirmMeg = "是否启用当前记录？";
	}
	showConfirm(confirmMeg,function(){
		$.ajax({
			url : ctx + "/basisDict/ctrResultTypes/ctrResultTypesDisableOrEnable",
			type : "POST",
			data : {id : id, operatioType : operatioType},
			success : function(data) {
				resolutionData(data);
				pageQuery();// 刷新list
			},
			error : function() {
			}
		});
	});
}

// 结果类型新增校验
function addResultType() {
	//防止重复提交
    if(!canStore){
 		return false;
    }
	formTextTrim("addForm");
	if(!validateSave()){
		return;
	}
	var name = $("#name").val().trim();
	// 检查是否同名
	$.ajax({		  
		url : ctx + "/basisDict/ctrResultTypes/checkNameExisted",
		type : "POST",
		data : {name : name},
		success : function(data) {
			if(data.indexOf("confirm|") == 0){
				// 有同名
				showConfirm(data.substring(8), function() {
					// 确认继续
					add();
				});
			} else {
				// 无同名，确认继续
				add();
			}
		},
		error : function() {
		}
	});
}
//结果类型新增
function add(){
	canStore = false;
	var dataString = $("#addForm").serialize();
	$.ajax({
		url : ctx + "/basisDict/ctrResultTypes/ctrResultTypesAdd",
		type : "POST",
		data : dataString,
		success : function(data) {
			canStore = true;
			resolutionData(data);
			closeWin();
			$("#sort  option[value=2] ").attr("selected",true)  //新增后排序默认为按按录入顺序降序
			$("#status option:first ").attr("selected",true); //新增后状态默认为全部
			$("#searchStr").val("");
			pageQuery();// 刷新list
		},
		error : function() {
			canStore = true;
		}
	});
}

// 结果类型修改校验
function updateResultType() {
	//防止重复提交
    if(!canStore){
 		return false;
    }
    //是否有过变更
    if(!formIsDirty("editForm")){
    	closeWin();
    	return false;
    }
	formTextTrim("editForm");
	if(!validateSave()){
		return;
	}
	// 检查是否同名
	var id = $("#id").val();
	var name = $("#name").val().trim();
	// 检查是否同名
	$.ajax({
		url : ctx + "/basisDict/ctrResultTypes/checkNameExisted",
		type : "POST",
		data : {id : id, name : name},
		success : function(data) {
			//resolutionData(data);
			if(data.indexOf("confirm|") == 0){
				// 有同名
				showConfirm(data.substring(8), function() {
					// 确认继续
					update();
				});
			} else {
				// 无同名，确认继续
				update();
			}
		},
		error : function() {
		}
	});
}
// 结果描述修改
function update(){
	canStore = false;
	var dataString = $("#editForm").serialize();
	var id = $("#id").val();
	$.ajax({
		url : ctx + "/basisDict/ctrResultTypes/ctrResultTypesEide",
		type : "POST",
		data : dataString,
		success : function(data) {
			canStore = true;
			closeWin();
			//pageQuery();// 刷新list
			var ret = resolutionData(data);
			closeWin();
			//刷新该行记录
			var jsonObj = eval('(' + ret + ')');
			//赋值
			$("#tr_"+id).children('td').eq(2).html(replaceHtml(jsonObj.name));
			$("#tr_"+id).children('td').eq(3).html(replaceHtml(jsonObj.displayOrder));
		},
		error : function() {
			canStore = true;
		}
	});
}
//结果描述新增校
function addResultTypeDetail() {
	//防止重复提交
    if(!canStore){
 		return false;
    }
	formTextTrim("addDetailForm");
	if(!validateDetailSave()){
		return;
	}
	var name = $("#resultValue").val().trim();
	var typeId = $("#typeId").val()
	// 检查是否同名
	$.ajax({		  
		url : ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
		type : "POST",
		data : {name : name, typeId : typeId},
		success : function(data) {
			if(data.indexOf("confirm|") == 0){
				// 有同名
				showConfirm("结果描述重复，是否继续？", function() {
					// 确认继续
					addDetail();
				});
			} else {
				// 无同名，确认继续
				addDetail();
			}
		},
		error : function() {
		}
	});
}
//结果描述新增
function addDetail(){
	canStore = false;
	var dataString = $("#addDetailForm").serialize();
	var tyepId = $("#typeId").val();
	$.ajax({
		url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailAdd",
		type : "POST",
		data : dataString,
		success : function(data) {
			canStore = true;
			resolutionData(data);
			closeWin();
			//$("#sort  option[value=2] ").attr("selected",true)  //新增后排序默认为按按录入顺序降序
			pageQuery2(tyepId, 2);// 刷新list --2-新增后按录入排序降序
		},
		error : function() {
			canStore = true;
		}
	});
}

//结果描述修改校验
function updateResultTypeDetail() {
	//防止重复提交
    if(!canStore){
 		return false;
    }
    //是否有过变更
    if(!formIsDirty("editDetailForm")){
    	closeWin();
    	return false;
    }
	formTextTrim("editDetailForm");
	if(!validateDetailSave()){
		return;
	}
	// 检查是否同名
	var id = $("#id").val();
	var name = $("#resultValue").val().trim();
	var typeId = $("#typeId").val();
	// 检查是否同名
	$.ajax({
		url : ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
		type : "POST",
		data : {id : id, name : name, typeId : typeId},
		success : function(data) {
			//resolutionData(data);
			if(data.indexOf("confirm|") == 0){
				// 有同名
				showConfirm("结果描述重复，是否继续？", function() {
					// 确认继续
					updateDetail();
				});
			} else {
				// 无同名，确认继续
				updateDetail();
			}
		},
		error : function() {
		}
	});
}
// 结果描述修改
function updateDetail(){
	canStore = false;
	var dataString = $("#editDetailForm").serialize();
	var id = $("#id").val();
	$.ajax({
		url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailEide",
		type : "POST",
		data : dataString,
		success : function(data) {
			canStore = true;
			closeWin();
			//pageQuery();// 刷新list
			var ret = resolutionData(data);
			closeWin();
			//刷新该行记录
			var jsonObj = eval('(' + ret + ')');
			//赋值
			$("#tr_"+id).children('td').eq(1).html(replaceHtml(jsonObj.resultValue));
			$("#tr_"+id).children('td').eq(2).html(replaceHtml(jsonObj.displayOrder));
			$("#tr_"+id).children('td').eq(3).html(replaceHtml(jsonObj.fastCode));
		},
		error : function() {
			canStore = true;
		}
	});
}

/**
 * 验证结果类型保存的必填条件
 * return 
 */
function validateSave(){
	var name = $("#name").val().trim();	
	if(name == ''){
		showMessage('中文名称为空，请重新输入！',function(){
			$("#name").focus();
		});
		return false;
	}
	var displayOrderId = "displayOrder";
	if(validateDisplayOrder(displayOrderId)){
		return false; 
	}
	
	return true;
}

/**
 * 验证结果描述保存的必填条件
 * return 
 */
function validateDetailSave(){
	var resultValue = $("#resultValue").val().trim();
	var displayOrderId = "displayOrder";
	if(resultValue == ''){
		showMessage('结果描述为空，请重新输入！',function(){
			$("#resultValue").focus();
		});
		return false;
	}
	if(validateDisplayOrder(displayOrderId)){
		return false; 
	}
	return true;
}

// 结果类型删除
function deleteResultType(id) {
	var status = $("#tr_"+id).children('td').eq(6).html();
	if (status == g_status){
		showMessage('当前选中记录已启用，不允许删除！');
		return;
	}
	showConfirm('是否删除当前记录？',function(){
		$.ajax({								   
			url : ctx + "/basisDict/ctrResultTypes/ctrResultTypesDelete",
			type : "POST",
			data : {
				id : id
			},
			success : function(data) {
				resolutionData(data);
				pageQuery();// 刷新list
			},
			error : function() {
			}
		});
	});
}

// 结果类型批量删除
function deleteResultTypeBatch() {
	var ids = "";
	var isNotDeleteCodes = "";
	//var i = 0;
	$("a[id='checkItem']").each(function(){
		//i++;
		if($(this).attr("class") == 'yes'){
			var checkId = $(this).attr("value");
			var status = $("#tr_"+checkId).children('td').eq(6).html();
			if (status != g_status) {  //非启用状态可进行删除
				ids += checkId+",";
			} else {				  //启用状态的条码记录下来做提示
				isNotDeleteCodes += "["+$("#tr_"+checkId).children('td').eq(2).html() + "]、";   
				//isNotDeleteCodes += i + ",";
			}
		}
	});
	if (isNotDeleteCodes != "" || isNotDeleteCodes.length > 0) {
		showMessage("名称" + isNotDeleteCodes.substring(0, isNotDeleteCodes.length - 1) + '启用状态，不允许删除!');
		return false;
	}
	if (ids == '') {
		showMessage('请选择要删除的数据!');
		return false;
	}
	showConfirm('是否删除所选中的记录？',function(){
		$.ajax({
			url : ctx + "/basisDict/ctrResultTypes/ctrResultTypesDeleteBatch",
			type : "POST",
			data : {
				ids : ids
			},
			success : function(data) {
				resolutionData(data);
				pageQuery();// 刷新list
			},
			error : function() {
			}
		});
	});
}

// 结果描述删除
function deleteResultTypeDetail(id) {
	var resultTypeId = $('#typeId').val();
	var status = $("#tr_"+resultTypeId).children('td').eq(6).html();
	if (status == g_status){
		showMessage('当前选中记录已启用，不允许删除！');
		return;
	}
	showConfirm('是否删除当前记录？',function(){
		$.ajax({								   
			url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDelete",
			type : "POST",
			data : {
				id : id
			},
			success : function(data) {
				resolutionData(data);
				//pageQuery();// 刷新list
				var typeId = $("#typeId").val();
				pageQuery2(typeId, 0);// 刷新list
			},
			error : function() {
			}
		});
	});
}

// 结果描述批量删除
function deleteResultTypeDetailBatch() {
	var resultTypeId = $('#typeId').val();
	var status = $("#tr_"+resultTypeId).children('td').eq(6).html();
	if (status == g_status){
		showMessage('当前选中记录已启用，不允许删除！');
		return;
	}
	var ids = "";
	$("a[id='checkDetailItem']").each(function(){
		if($(this).attr("class") == 'yes'){
			var checkId = $(this).attr("value");
			var status = $("#tr_"+checkId).children('td').eq(6).html();
			if (status != g_status) {  //非启用状态可进行删除
				ids += checkId+",";
			}
		}
	});
	if (ids == '') {
		showMessage('请选择要删除的数据!');
		return false;
	}
	showConfirm('是否删除所选中的记录？',function(){
		$.ajax({
			url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDeleteBatch",
			type : "POST",
			data : {
				ids : ids
			},
			success : function(data) {
				resolutionData(data);
				var typeId = $("#typeId").val();
				pageQuery2(typeId, 0);// 刷新list
			},
			error : function() {
			}
		});
	});
}

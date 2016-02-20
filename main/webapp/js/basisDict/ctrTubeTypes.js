/**
* @ClassName: ctrTubeTypes.js
* @Description: TODO(试管类型-JS) 
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


function pageQuery() {
	var pageNo = $("#pageNo").val();
	var pageSize = $("#pageSize").val();
	if (pageNo == 'undefined' || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 10;
	}
	var searchStr = $("#searchStr").val().trim();
	var status = $("#status").val();
	var sort = $("#sort").val();
	var url = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesPageList";
	$("#infoPageDiv").load(url, {pageNo : pageNo, pageSize : pageSize, searchStr : searchStr, status : status, sort : sort}, function() {
		$("#infoPageDiv").show();
		/*var rowsize = document.getElementById('listTable').getElementsByTagName('tr').length;
		if (rowsize == 1){
			showMessage('未查询到数据！');
			return;
		}*/
	});
}

// 进入明细页面
function showInfo(id, opType, status) {
	if (opType == "edit" && status == 1){
		showMessage('当前选中记录已启用，不允许修改！');
		return;
	}
	var url = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesInfo";
	$("#infoViewDiv").load(url, {id : id, opType : opType}, function() {
		$("body").append("<div class='oy'></div>")
		$("#infoViewDiv").show();
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
			url : ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDisableOrEnable",
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

// 新增
function addTubeType() {
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
		url : ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
		type : "POST",
		data : {name : name},
		success : function(data) {
			//resolutionData(data);
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

function add(){
	canStore = false;
	var dataString = $("#addForm").serialize();
	$.ajax({
		url : ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesAdd",
		type : "POST",
		data : dataString,
		success : function(data) {
			canStore = true;
			resolutionData(data);
			closeWin();
			$("#sort  option[value=2] ").attr("selected",true); //新增后排序默认为按按录入顺序降序
			$("#status  option:first ").attr("selected",true)  //新增后状态默认为全部
			$("#searchStr").val("");
			pageQuery();// 刷新list
		},
		error : function() {
			canStore = true;
		}
	});
}

// 修改
function updateTubeType() {
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
		url : ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
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

function update(){
	canStore = false;
	var dataString = $("#editForm").serialize();
	var id = $("#id").val();
	$.ajax({
		url : ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesEide",
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
			//$("#tr_"+id).children('td').eq(1).html(replaceHtml(jsonObj.codeNo));
			$("#tr_"+id).children('td').eq(2).html(replaceHtml(jsonObj.name));
			$("#tr_"+id).children('td').eq(3).html(replaceHtml(jsonObj.enShortName));
			$("#tr_"+id).children('td').eq(4).html(replaceHtml(jsonObj.enName));
			$("#tr_"+id).children('td').eq(5).html(replaceHtml(jsonObj.fastCode));
			$("#tr_"+id).children('td').eq(6).html(replaceHtml(jsonObj.displayOrder));
			$("#tr_"+id).children('td').eq(7).html(replaceHtml(jsonObj.memo));
		},
		error : function() {
			canStore = true;
		}
	});
}

/**
 * 验证保存的必填条件
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

// 删除
function deleteTubeType(id) {
	var status = $("#tr_"+id).children('td').eq(10).html();
	if (status == g_status){
		showMessage('当前选中记录已启用，不允许删除！');
		return;
	}
	showConfirm('是否删除当前记录？',function(){
		$.ajax({
			url : ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDelete",
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

// 批量删除
function deleteTubeTypeBatch() {
	var ids = "";
	var isNotDeleteCodes = "";
	//var i = 0;
	$("a[id='checkItem']").each(function() {
		//i++;
		if ($(this).attr("class") == 'yes') {
			var checkId = $(this).attr("value");
			var status = $("#tr_" + checkId).children('td').eq(10).html();
			if (status != g_status) { // 非启用状态可进行删除
				ids += checkId + ",";
			} else { // 启用状态的条码记录下来做提示
				isNotDeleteCodes +=  "["+$("#tr_"+checkId).children('td').eq(2).html() + "]、";
				//isNotDeleteCodes += i + ",";
			}
		}
	});
	if (isNotDeleteCodes != "" || isNotDeleteCodes.length > 0) {
		showConfirm("名称" + isNotDeleteCodes.substring(0, isNotDeleteCodes.length - 1) + '启用状态，不允许删除!');
		return false;
	}
	if (ids == '') {
		showMessage('请选择要删除的数据!');
		return false;
	}
	showConfirm('是否删除所选中的记录？', function() {
		$.ajax({
			url : ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDeleteBatch",
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
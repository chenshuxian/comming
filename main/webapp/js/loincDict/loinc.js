var canStore = true;   // 控制重复提交
var g_status = 1; 	   // 状态是否是可用   0-停用    1-启用

// 关闭窗口
function closeWin(){
    $(".oy").remove();
    $(".xinxi").hide();
}

// 查询List
function pageQuery(type){
	var pageNo =$("#pageNo").val();
	var pageSize = $("#pageSize").val();
	if(pageNo == 'undefined' || pageNo == null){
		pageNo = 1;
	}
	if(pageSize == 'undefined' || pageSize == null){
		pageSize = 10;
	}
	
	if(type=='add'){
		//新增的场合，需要清空条件，且排序改为按录入顺序倒序
		$("#searchStr").val("");
		$("#frontClassName").val("");
		$("#status").val("");
		$("#sort").val("2");
	}
	
	formTextTrim("rslForm");
	var searchStr = $("#searchStr").val().trim();
	var status = $("#status").val();
	var sort = $("#sort").val();
	var url = ctx + "/ctrLoinc/ctrLoincPageList";
	$("#infoPageDiv").load(url, {pageNo : pageNo, pageSize : pageSize, searchStr : searchStr, status : status, sort : sort}, function() {
		$("#infoPageDiv").show();
		var rowsize = document.getElementById('listTable').getElementsByTagName('tr').length;
		if (rowsize == 1){
			showMessage('未查询到数据！');
			return;
		}
	});
}

// 进入明细页面
function showInfo(id, opType){
	var url = '';
	var data = '';
	
	if(opType == 'edit'){
		// 修改
		// 检查是否可修改
		var status = $("#tr_"+id).children('td').eq(13).html();
		if (status == g_status){
			showMessage('当前选中记录状态为可用，不允许修改！');
			return;
		}
		
		$.ajax({
			"url" : ctx + "/ctrLoinc/ctrLoincIfEdit",
			"type" : "GET",
			data:"id="+id,
			"success" : function(data) {
				resolutionData(data);
				if(data.indexOf("err|") != 0){
					// 检查通过
					url = ctx + "/ctrLoinc/ctrLoincInfo";
					data = "id="+id+"&opType="+opType;
					$("#infoViewDiv").load(url,data,function(){
						$("body").append("<div class='oy'></div>")
						$("#infoViewDiv").show();
					});
				}
			},
			"error" : function() {
			}
		});
		
	} else {
		// 查看、新增
		url = ctx + "/ctrLoinc/ctrLoincInfo";
		data = "id="+id+"&opType="+opType;
		$("#infoViewDiv").load(url,data,function(){
			$("body").append("<div class='oy'></div>")
			$("#infoViewDiv").show();
		});
	}

}

//全选、反选
function selectAll(){
	var chk = $("input[id='selectAllBox']").is(':checked');

	if(chk == true){
		// 全选
		$("input[id='checkItem']").each(function(){
			$(this).prop("checked", true);
		});
	} else {
		// 反选
		$("input[id='checkItem']").each(function(){
			$(this).prop("checked", !$(this).prop("checked"));
		});
	}
	
}

// 启用
function enableIt(id, index){
	showConfirm('是否启用当前记录？',function(){
		$.ajax({
			"url" : ctx + "/ctrLoinc/ctrLoincEnable",
			"type" : "GET",
			data:"id="+id,
			"success" : function(data) {
				resolutionData(data);
				pageQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

// 停用
function disableIt(id, index){
	showConfirm('是否停用当前记录？',function(){
		$.ajax({
			"url" : ctx + "/ctrLoinc/ctrLoincDisable",
			"type" : "GET",
			data:"id="+id,
			"success" : function(data) {
				resolutionData(data);
				pageQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

/**
 * 验证保存的必填条件
 * return 
 */
function validateSave(){
	var componentId = componentGrid.getValue();
	var testPropertyId = testPropertyGrid.getValue();
	var testMethodId = testMethodGrid.getValue();
	var typeOfScaleId = typeOfScaleGrid.getValue();
	var timeAspectId = timeAspectGrid.getValue();
	var sampleTypeId = sampleTypeGrid.getValue();
	
	if(componentId == ""){
		showMessage("受检成份为空,请重新输入!",function(){
		});
		return false;
	}
	
	if(testPropertyId == ""){
		showMessage("受检属性为空,请重新输入!",function(){
		});
		return false;
	}
	
	if(testMethodId == ""){
		showMessage("检验方法为空,请重新输入!",function(){
		});
		return false;
	}
	
	if(typeOfScaleId == ""){
		showMessage("样本标识为空,请重新输入!",function(){
		});
		return false;
	}
	
	if(timeAspectId == ""){
		showMessage("时间特性为空,请重新输入!",function(){
		});
		return false;
	}
	
	if(sampleTypeId == ""){
		showMessage("标本类型为空,请重新输入!",function(){
		});
		return false;
	}
	
	var displayOrderId = "displayOrder";
	if(validateDisplayOrder(displayOrderId)){
		return false; 
	}
	return true;
}

// 检查是否为正整数
function isPositiveInteger(obj)
{
    var reg = /^[1-9][\d]*$/;
    return reg.test(obj);
}

// 检查是否为空
function isEmptyObject(obj){
	if(obj == 'undefined' || obj == null){
		return true;
	}
	return false;
}

// 新增
function addIt(){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    
	formTextTrim("addForm");
	if(!validateSave()){
		return;
	}
	
	// 检查是否同名
	$.ajax({
		"url" : ctx + "/ctrLoinc/ctrLoincIfExisted",
		"type" : "POST",
		data:$("#addForm").serialize(),
		"success" : function(data) {
			//resolutionData(data);
			if(data.indexOf("confirm|") == 0){
				// 有同名
				showConfirm(data.substring(8),function(){
					// 确认继续
					add();
				});
			} else {
				// 无同名，确认继续
				add();
			}
		},
		"error" : function() {
		}
	});
}

function add(){
	canStore = false;
	var params = $("#addForm").serialize();
	params += "&componentName="+componentGrid.getText()+
			  "&testPropertyName="+testPropertyGrid.getText()+
			  "&testMethodName="+testMethodGrid.getText()+
			  "&typeOfScaleName="+typeOfScaleGrid.getText()+
			  "&timeAspectName="+timeAspectGrid.getText()+
			  "&sampleTypeName="+sampleTypeGrid.getText();
	$.ajax({
		"url" : ctx + "/ctrLoinc/ctrLoincAdd",
		"type" : "POST",
		data: params,
		"success" : function(data) {
			canStore = true;
			resolutionData(data);
			closeWin();
			pageQuery('add');//刷新list
		},
		"error" : function() {
			canStore = true;
		}
	});
}

// 修改
function updateIt(row){
	// 防止重复提交
    if(!canStore){
 		return false;
    }
    
    // 是否有过变更
    if(!formIsDirty("editForm")){
    	closeWin();
    	return false;
    }
    
	formTextTrim("editForm");
	
	if(!validateSave()){
		return;
	}
	
	// 检查是否同名
	$.ajax({
		"url" : ctx + "/ctrLoinc/ctrLoincIfExisted",
		"type" : "POST",
		data:$("#editForm").serialize(),
		"success" : function(data) {
			//resolutionData(data);
			if(data.indexOf("confirm|") == 0){
				// 有同名
				showConfirm(data.substring(8),function(){
					// 确认继续
					update();
				});
			} else {
				// 无同名，确认继续
				update();
			}
		},
		"error" : function() {
		}
	});
}

function update(){
	canStore = false;
	var params = $("#editForm").serialize();
	params += "&componentName="+componentGrid.getText()+
			  "&testPropertyName="+testPropertyGrid.getText()+
			  "&testMethodName="+testMethodGrid.getText()+
			  "&typeOfScaleName="+typeOfScaleGrid.getText()+
			  "&timeAspectName="+timeAspectGrid.getText()+
			  "&sampleTypeName="+sampleTypeGrid.getText();
	$.ajax({
		"url" : ctx + "/ctrLoinc/ctrLoincEdit",
		"type" : "POST",
		data: params,
		"success" : function(data) {
			canStore = true;
			var ret = resolutionData(data);
			closeWin();
			
			//刷新该行记录
			var jsonObj = eval('(' + ret + ')');
			//赋值
			$("#tr_"+jsonObj.idString).children('td').eq(2).html(replaceHtml(jsonObj.componentName));
			$("#tr_"+jsonObj.idString).children('td').eq(3).html(replaceHtml(jsonObj.testPropertyName));
			$("#tr_"+jsonObj.idString).children('td').eq(4).html(replaceHtml(jsonObj.testMethodName));
			$("#tr_"+jsonObj.idString).children('td').eq(5).html(replaceHtml(jsonObj.typeOfScaleName));
			$("#tr_"+jsonObj.idString).children('td').eq(6).html(replaceHtml(jsonObj.timeAspectName));
			$("#tr_"+jsonObj.idString).children('td').eq(7).html(replaceHtml(jsonObj.sampleTypeName));
			$("#tr_"+jsonObj.idString).children('td').eq(8).html(replaceHtml(jsonObj.fastCode));
			$("#tr_"+jsonObj.idString).children('td').eq(9).html(replaceHtml(jsonObj.displayOrder));
			$("#tr_"+jsonObj.idString).children('td').eq(10).html(replaceHtml(jsonObj.memo));
		},
		"error" : function() {
			canStore = true;
		}
	});
}

// 删除
function deleteIt(id){
	var status = $("#tr_"+id).children('td').eq(13).html();
	if (status == g_status){
		showMessage('当前选中记录状态为可用，不允许删除！');
		return;
	}
	
	showConfirm('是否删除当前记录？',function(){
		$.ajax({
			"url" : ctx + "/ctrLoinc/ctrLoincDelete",
			"type" : "POST",
			data: {id:id},
			"success" : function(data) {
				resolutionData(data);
				pageQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

// 批量删除
function deleteBatch(){
	var ids = "";
	var isNotDeleteCodes = "";
		
	$("a[id='checkItem']").each(function(){
		if ($(this).attr("class") == 'yes') {
			var checkId = $(this).attr("value");
			var status = $("#tr_" + checkId).children('td').eq(13).html();
			if (status != g_status) { // 非启用状态可进行删除
				ids += checkId + ",";
			} else { // 启用状态的条码记录下来做提示
				isNotDeleteCodes += "【"+$("#tr_"+checkId).children('td').eq(14).html() + "】、";
				//isNotDeleteCodes += i + ",";
			}
		}
	});
	
	if (isNotDeleteCodes != "" || isNotDeleteCodes.length > 0) {
		showMessage("编码" + isNotDeleteCodes.substring(0, isNotDeleteCodes.length - 1) + '启用状态，不允许删除!');
		return false;
	}
	
	if(ids == ''){
		showMessage("请选择要删除的数据！");
		return false;
	}
	
	showConfirm('是否删除所选中的记录？',function(){
		$.ajax({
			"url" : ctx + "/ctrLoinc/ctrLoincDeleteBatch",
			"type" : "GET",
			data:"ids="+ids,
			"success" : function(data) {
				resolutionData(data);
				pageQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}
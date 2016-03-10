var canStore = true;   // 控制重复提交
var g_status = 1; 	   // 状态是否是可用   0-停用    1-启用

// 关闭窗口
function closeWin(type){
	if(type == 'refurbish'){
		pageQuery('add');
	}
    $(".oy").remove();
    $(".xinxi").hide();
}

// 打开仪器选择界面
function getAllOrgsInfo(){
	var pageNo = $("#pageNo_OrgPopUp").val();
	var pageSize = $("#pageSize").val();
	if (typeof (pageNo) == undefined || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 5;
	}
	var searchStr = "";
	var status = 1;
	var sort = "";
	var orgTypeId = 40;
	var url = ctx + "/instruments/iorgsPageList";
	$("#orgInfoViewDiv").load(url, {
		searchStr : searchStr,
		pageNo : pageNo,
		pageSize : pageSize,
		status : status,
		orgTypeId : orgTypeId,
		sort : sort
	}, function() {
		$("#orgInfoViewDiv").show();
	});
}

// 打开仪器选择界面
function searchOrgsInfo(){
	var pageNo = $("#pageNo_OrgPopUp").val();
	var pageSize = $("#pageSize").val();
	if (typeof (pageNo) == undefined || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 5;
	}
	var searchStr = $("#searchOrgStr").val().trim();
	var status = 1;
	var sort = "";
	var orgTypeId = 40;
	var url = ctx + "/instruments/iorgsPageList";
	$("#orgInfoViewDiv").load(url, {
		searchStr : searchStr,
		pageNo : pageNo,
		pageSize : pageSize,
		status : status,
		orgTypeId : orgTypeId,
		sort : sort
	}, function() {
		$("#orgInfoViewDiv").show();
	});
	
}

// 查询List
function pageQuery(type){
	var orgsId = $("#orgsId").val();
	if(type == 'query' && orgsId == '0'){
		showMessage("请选择机构！");
		$("#orgsId").focus();
		return false;
	}
	var pageNo = $("#pageNo").val();
	var pageSize = $("#pageSize").val();
	if(pageNo == 'undefined' || pageNo == null){
		pageNo = 1;
	}
	if(pageSize == 'undefined' || pageSize == null){
		pageSize = 10;
	}
	
	if(type=='add'){
		// 新增的场合，需要清空条件，且排序改为按录入顺序倒序
		$("#searchStr").val("");
		$("#frontClassName").val("");
		$("#status").val("");
		$("#sort").val("2");
	}
	
	formTextTrim("rslForm");
	var searchStr = $("#searchStr").val().trim();
	var status = $("#status").val();
	var sort = $("#sort").val();
	var frontClassName = $("#frontClassName").val();
	var url = ctx + "/instruments/instrumentsPageList";
	$("#infoPageDiv").load(url, {orgsId : orgsId, pageNo : pageNo, pageSize : pageSize, searchStr : searchStr, status : status, sort : sort, frontClassName : frontClassName}, function() {
		$("#infoPageDiv").show();
	});
}

// 从仪器库添加
function baseMain(){
	var orgsId = $("#orgsId").val();
	if(orgsId == '0'){
		showMessage("请选择机构！");
		$("#orgsId").focus();
		return false;
	}
	var url = ctx + "/instruments/instrumentsBaseMain";
	var searchStr = "";  // 搜索输入框的值
	$("#instrumentsBaseMain").load(url, {searchStr:searchStr}, function() {
		$("body").append("<div class='oy'></div>");
		$("#instrumentsBaseMain").show();
		$("#instrumentsBaseMain").height(650);
		$("#instrumentsBaseMain").width(1200);
	});
}

// 从仪器库查询
function baseQuery(type){
	var pageNo = $("#pageNo_3").val();
	var pageSize = $("#pageSize").val();
	if(pageNo == 'undefined' || pageNo == null){
		pageNo = 1;
	}
	if(pageSize == 'undefined' || pageSize == null){
		pageSize = 10;
	}
	
	formTextTrim("baseForm");
	
	var searchStr = "";
	var sort = "2";
	var frontClassName = $("#baseFrontClassName").val();
	var url = ctx + "/instruments/instrumentsBaseList";
	$("#baseInfoViewDiv").load(url, {pageNo : pageNo, pageSize : pageSize, searchStr : searchStr, sort : sort, frontClassName : frontClassName}, function() {
		$("#baseInfoViewDiv").show();
		$("#baseList").find('tr:eq(1)').click();
	});
}

// 从仪器库添加确认
function inserSelRecord(){
	canStore = false;
	
	var ids = "";
	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
		
	$("a[id='checkInstr']").each(function(){
		if($(this).attr("class") == 'yes'){
			ids += $(this).attr("value")+",";
			ids2 += $(this).attr("value")+",";
		} else {
			ids2 += " ,";
		}
	});
	
	if(ids == ''){
		showMessage("请选择要添加的仪器信息！");
		return false;
	}
	
	var orgsId = $("#orgsId").val();
	$.ajax({
		"url" : ctx + "/instruments/instrumentsCopy",
		"type" : "POST",
		data:{"ids":ids2,"orgsId":orgsId},
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

// 选择机构查询
function searchBaseInfo(){
	var pageNo = $("#pageNo_3").val();
	var pageSize = $("#pageSize").val();
	if(pageNo == 'undefined' || pageNo == null){
		pageNo = 1;
	}
	if(pageSize == 'undefined' || pageSize == null){
		pageSize = 10;
	}
	
	formTextTrim("baseForm");
	
	var searchStr = $("#searchBaseStr").val().trim();
	var sort = "2";
	var frontClassName = $("#baseFrontClassName").val();
	var url = ctx + "/instruments/instrumentsBaseList";
	$("#baseInfoViewDiv").load(url, {pageNo : pageNo, pageSize : pageSize, searchStr : searchStr, sort : sort, frontClassName : frontClassName}, function() {
		$("#baseInfoViewDiv").show();
	});
}

// 点击第一行数据
function changeTr(instrumentId){
	var url = ctx + "/instruments/instrumentsInstrItemsList";
	$("#itemsViewDiv").load(url,{instrumentId:instrumentId});
	$("#itemsViewDiv").show();
	
	url = ctx + "/instruments/instrumentsInstrMicsList";
	var itemTypeId = "1"; // 细菌类型
	$("#bacteriaViewDiv").load(url,{instrumentId:instrumentId,itemTypeId:itemTypeId});
	$("#bacteriaViewDiv").show();
	
	url = ctx + "/instruments/instrumentsInstrAticList";
	var itemTypeId = "2"; // 抗生素类型
	$("#antibioticViewDiv").load(url,{instrumentId:instrumentId,itemTypeId:itemTypeId});
	$("#antibioticViewDiv").show();
	
	var fcValue = $("#oldFClassId").val();
	var cValue = $("#oldClassId").val();
	$("#nfClassNameId").val(fcValue);
	$("#nclassNameId").val(cValue);
}

// 进入明细页面
function showInfo(id, opType){
	var url = '';
	var data = '';
	if(opType == 'edit'){
		// 修改
		// 检查是否可修改
		var status = $("#tr_"+id).children('td').eq(11).html();
//		if (status == g_status){
//			showMessage('当前选中记录状态为可用，不允许修改！');
//			return;
//		}
		$.ajax({
			"url" : ctx + "/instruments/instrumentsIfEdit",
			"type" : "GET",
			data:"id="+id,
			"success" : function(data) {
				resolutionData(data);
				if(data.indexOf("err|") != 0){
					// 检查通过
					url = ctx + "/instruments/instrumentsInfo";
					data = "id="+id+"&opType="+opType;
					$("#infoViewDiv").load(url,data,function(){
						$("body").append("<div class='oy'></div>")
						$("#infoViewDiv").height(300);
						$("#infoViewDiv").show();
					});
				}
			},
			"error" : function() {
			}
		});
		
	} else {
		var orgsId = $("#orgsId").val();
		if(orgsId == '0' && opType == 'add'){
			showMessage("请选择机构！");
			$("#orgsId").focus();
			return false;
		}
		
		// 查看、新增
		url = ctx + "/instruments/instrumentsInfo";
		data = "id="+id+"&opType="+opType;
		$("#infoViewDiv").load(url,data,function(){
			$("body").append("<div class='oy'></div>")
			$("#infoViewDiv").height(300);
			$("#infoViewDiv").show();
			$("#orgId").val($("#orgsId").val());
		});
	}

}

// 显示组合添加项目页面
function addSingleItmeShow(){
	var testItemid = "11";
	$("#addSingleItme").load(ctx + "/pm/testItemGroup/addSingleItemShow",{testItemid:testItemid},function(){
		$("#addSingleItme").show();
		$("body").append("<div class='oy'></div>")
	    $("#addSingleItmeShow").show();
	});
}

// 全选、反选
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
			"url" : ctx + "/instruments/instrumentsEnable",
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
			"url" : ctx + "/instruments/instrumentsDisable",
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
	var name = $.trim($("#name").val());
	var rptTemplateId = $.trim($("#rptTemplateId option:selected").val());
	var typeId = $.trim($("#typeId option:selected").val());
	var displayOrder = $.trim($("#displayOrder").val());
	
	if(name == ""){
		showMessage("仪器名称必填，请重新输入！");
		$("#name").focus();
		return false;
	}
	if(typeId == ""){
		showMessage("请选择仪器类型!",function(){
		});
		return false;
	}
	
	if(rptTemplateId == ""){
		showMessage("请选择单列报告模板!",function(){
		});
		return false;
	}
	
	if(isNaN(displayOrder)){
		showMessage("顺序号必须为数字，请重新输入！");
		$("#displayOrder").focus();
		return false;
	}
	
	if(displayOrder != "" && displayOrder != "0"){
		if(!isPositiveInteger(displayOrder) ){
			showMessage("顺序号必须为正整数，请重新输入！");
			$("#displayOrder").focus();
			return false;
		}
	}
	
	return true;
}

/**
 * 验证通讯参数保存的必填条件
 * return 
 */
function validateParamsSave(){
	var serverIp = $.trim($("#serverIp").val());
	var port = $.trim($("#port").val());
	var intervals = $.trim($("#intervals").val());
	
	if(serverIp != ""){
		if(!checkServerIp(serverIp)){
			showMessage("主机IP格式不正确，请重新输入！");
			$("#serverIp").focus();
			return false;
		}
	}
	
	if(isNaN(port)){
		showMessage("端口必须为数字，请重新输入！");
		$("#port").focus();
		return false;
	}
	
	if(port != "" && port != "0"){
		if(!isPositiveInteger(port) ){
			showMessage("端口必须为正整数，请重新输入！");
			$("#port").focus();
			return false;
		}
	}
	
	if(isNaN(intervals)){
		showMessage("解析时间间隔必须为数字，请重新输入！");
		$("#intervals").focus();
		return false;
	}
	
	if(intervals != "" && intervals != "0"){
		if(!isPositiveInteger(intervals) ){
			showMessage("解析时间间隔必须为正整数，请重新输入！");
			$("#intervals").focus();
			return false;
		}
	}
	
	return true;
}

// 检查是否为正整数
function isPositiveInteger(obj){
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

// 检查主机ip格式
function checkServerIp(serverIp){
	  var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/   
	  return reg.test(serverIp);  
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
		"url" : ctx + "/instruments/instrumentsIfExisted",
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

// 确认新增
function add(){
	canStore = false;
	$.ajax({
		"url" : ctx + "/instruments/instrumentsAdd",
		"type" : "POST",
		data:$("#addForm").serialize(),
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

// 复制添加
function copyAdd(ids){
	canStore = false;
	var orgsId = $("#orgsId").val();
	showConfirm('是否复制添加当前记录？',function(){
		$.ajax({
			"url" : ctx + "/instruments/instrumentsCopy",
			"type" : "POST",
			data:{"ids":ids,"orgsId":orgsId},
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
	});
}

// 修改
function updateIt(row){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    
	formTextTrim("editForm");
	if(!validateSave()){
		return;
	}
	
	// 检查是否同名
	$.ajax({
		"url" : ctx + "/instruments/instrumentsIfExisted",
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

// 确认修改
function update(){
	canStore = false;
	$.ajax({
		"url" : ctx + "/instruments/instrumentsEdit",
		"type" : "POST",
		data:$("#editForm").serialize(),
		"success" : function(data) {
			canStore = true;
			var ret = resolutionData(data);
			closeWin();
			
			// 刷新该行记录
			var jsonObj = eval('(' + ret + ')');
			// 赋值
			$("#tr_"+jsonObj.idString).children('td').eq(2).html(replaceHtml(jsonObj.name));
			$("#tr_"+jsonObj.idString).children('td').eq(3).html(replaceHtml(jsonObj.model));
			$("#tr_"+jsonObj.idString).children('td').eq(4).html(replaceHtml(jsonObj.reportHeader));
			$("#tr_"+jsonObj.idString).children('td').eq(5).html(replaceHtml(jsonObj.rptTemplatenName));
			$("#tr_"+jsonObj.idString).children('td').eq(6).html(replaceHtml(jsonObj.rptTemplate2Name));
			if(jsonObj.typeId==0){
				$("#tr_"+jsonObj.idString).children('td').eq(7).html('常规');
			} else if(jsonObj.typeId==1){
				$("#tr_"+jsonObj.idString).children('td').eq(7).html('微生物');
			} else if(jsonObj.typeId==2){
				$("#tr_"+jsonObj.idString).children('td').eq(7).html('文字报告');
			} else if(jsonObj.typeId==3){
				$("#tr_"+jsonObj.idString).children('td').eq(7).html('酶标');
			}
		},
		"error" : function() {
			canStore = true;
		}
	});
}

// 进入通讯参数修改页面
function showParamsInfo(id){
	var url = '';
	var data = '';
	// 修改
	// 检查是否可修改
	$.ajax({
		"url" : ctx + "/instruments/instrumentsIfEdit",
		"type" : "GET",
		data:"id="+id,
		"success" : function(data) {
			resolutionData(data);
			if(data.indexOf("err|") != 0){
				// 检查通过
				url = ctx + "/instruments/instrumentsParamsInfo";
				data = "instrumentId="+id;
				$("#infoViewDiv").load(url,data,function(){
					$("body").append("<div class='oy'></div>")
					$("#infoViewDiv").height(540);
					$("#infoViewDiv").show();
				});
			}
		},
		"error" : function() {
		}
	});
}

// 修改通讯参数
function updateParams(){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    
	formTextTrim("editForm");
	// 输入验证
	if(!validateParamsSave()){
		return;
	}
	
	// 需要回应
	if($("#isRespondCheck").attr("class")=="chk_not"){
		$("#isRespond").val(0);
	} else {
		$("#isRespond").val(1);
	}
	// 需要DTR
	if($("#isDtrCheck").attr("class")=="chk_not"){
		$("#isDtr").val(0);
	} else {
		$("#isDtr").val(1);
	}
	// 需要CTS
	if($("#isRtsCheck").attr("class")=="chk_not"){
		$("#isRts").val(0);
	} else {
		$("#isRts").val(1);
	}
	
	// 检查是否同名
	canStore = false;
	$.ajax({
		"url" : ctx + "/instruments/instrumentsParamsEdit",
		"type" : "POST",
		data:$("#editForm").serialize(),
		"success" : function(data) {
			canStore = true;
			closeWin();
		},
		"error" : function() {
			canStore = true;
		}
	});
}

// 删除
function deleteIt(id){
	var status = $("#tr_"+id).children('td').eq(11).html();
//	if (status == g_status){
//		showMessage('当前选中记录状态为可用，不允许删除！');
//		return;
//	}
	
	showConfirm('是否删除当前记录？',function(){
		$.ajax({
			"url" : ctx + "/instruments/instrumentsDelete",
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
	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
		
	$("a[id='checkItem']").each(function(){
		if($(this).attr("class") == 'yes'){
			ids += $(this).attr("value")+",";
			ids2 += $(this).attr("value")+",";
		} else {
			ids2 += " ,";
		}
	});
	
	if(ids == ''){
		showMessage("请选择要删除的客户仪器信息！");
		return false;
	}
	
	showConfirm('是否删除所选中的记录？',function(){
		$.ajax({
			"url" : ctx + "/instruments/instrumentsDeleteBatch",
			"type" : "GET",
			data:"ids="+ids2,
			"success" : function(data) {
				resolutionData(data);
				pageQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

// 通讯参数页面，修改“需要回应”
function changeStatus(obj){
	var cla=$("#"+obj).attr("class");
    if(cla=="chk_not"){
        $("#"+obj).removeClass("chk_not").addClass("chk_yes");
    }else{
        $("#"+obj).removeClass("chk_yes").addClass("chk_not");
    }
}

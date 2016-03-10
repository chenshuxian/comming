var canStore = true;//防止重复提交
var addTestItemIds = "";
var delTestItemIds = "";
var count = 0;//统计字段在数据库是否存在
var addMap = {};// 存放添加项目的map addMpa[key] = value;
var removeMap = {};//存放移除的项目map removeMap[key] = value;
var g_status = 1; // 状态是否是可用 0-停用 1-启用

//关闭窗口
function closeWin() {
	$(".oy").remove();
	$(".xinxi").empty();
	$(".xinxi").hide();
}
//搜索
function search() {
	$("#pageNo").val(1);
	pageQuery();
}

//搜索数据
function pageQuery(type){
	//分页
	var pageNo = $("#pageNo").val();
	var pageSize = $("#pageSize").val();
	if (pageNo == 'undefined' || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 5;
	}
	if (type == 'add') {
		// 新增的场合，需要清空条件，且排序改为按录入顺序倒序
		$("#searchStr").val("");
		$("#status").val("");
		$("#sort").val("2");
	}
	//查询信息
	var searchStr = $("#searchStr").val().trim();
	$("#searchStr").val(searchStr);
	var status = $("#status").val();
	var orgTypeId = $("#orgTypeId").val();
	var sort = $("#sort").val();
	var url = ctx + "/org/regionalManagement/regionalManagementPageList";
	$("#managementList").load(url, {
		pageNo : pageNo,
		pageSize : pageSize,
		searchStr : searchStr,
		status : status,
		orgTypeId : orgTypeId,
		sort : sort
	}, function() {
		$("#infoPageDiv").show();
		$("#manageList").find('tr:eq(1)').click();
		$("#managementList").show();
		//机构列表行数
		var centerOrgNumber = $("#centerOrgNumber").val();
		if(centerOrgNumber == 0){
			//关联的机构列表
			$("#relatedList").load(ctx + "/org/regionalManagement/relatedList",{parentId:0});
			$("#relatedList").show();
		}
	});
}

//添加项目页面中的搜索功能
function notContainSearch(){
	var parentId = $("#parentId").val();
	var regionId = $("#regionId").val();//地区名称
	var searchRegionalStr = $("#searchRegionalStr").val().trim();//添加项目的搜索框
	$("#searchRegionalStr").val(searchRegionalStr);
	
	//机构项目列表
	$("#notContainListDiv").load(ctx + "/org/regionalManagement/noContainRegionalList",{parentId:parentId,regionId:regionId,searchStr:searchRegionalStr},function(){
		// 显示条数
		var itemRowsNum = $("#notContainList tr").length - 1;
		$("#notContainListNumber").text(itemRowsNum);
	});
}

/**
 *  选择某行的机构查询组合所包含的项目
 *  项目ID
 */
function changeTr(id){
	//highlight("manageList",id);
	//关联的机构列表
	if(id == null || id == ''){
		return ;
	}
	$("#relatedList").load(ctx + "/org/regionalManagement/relatedList",{parentId:id});
	$("#relatedList").show();
}

//进入明细页面
function showInfo(id, opType, status) {
	if (opType == "edit" && status == g_status) {
		showMessage('当前选中记录已启用，不允许修改！');
		return;
	}
	var orgTypeId = $("#orgTypeId").val();
	var url = ctx + "/org/regionalManagement/regionalManagementInfo";
	$("#infoViewDiv").load(url, {
		id : id,
		opType : opType,
		orgTypeId : orgTypeId
	}, function() {
		$("body").append("<div class='oy'></div>")
		$("#infoViewDiv").show();
	});
}

//显示机构添加关联机构页面
function addRelatedRegionalShow(){
	//父ID
	var parentId = $("#parentId").val();
	//机构列表行数
	var centerOrgNumber = $("#centerOrgNumber").val();
	if(parentId == "" || centerOrgNumber == 0){
		showMessage("请选择需要添加关联的机构！");
		return;
	}
	//当前选择组合停用启用状态
	var status = $("#tr_" + parentId).children('td').eq(8).html();
	if(status == g_status){
		showMessage("当前选中机构已启用，不允许关联其他机构！");
		return;
	}
	$("#addRelatedRegional").load(ctx + "/org/regionalManagement/addRelatedRegionalShow",{parentId:parentId},function(){
		$("#addRelatedRegional").show();
		$("body").append("<div class='oy'></div>")
	    $("#addRelatedRegionalShow").show();
	});
}

//启用Or停用
function disableOrEnable(id, index, operatioType) {
	if (id == '' || operatioType == '') {
		showMessage('请选择操作记录!');
		return;
	}
	var confirmMeg = "";
	if (operatioType == 'Disable') {
		confirmMeg = "是否停用当前记录？";
	}
	if (operatioType == 'Enable') {
		confirmMeg = "是否启用当前记录？";
	}
	showConfirm(confirmMeg, function() {
		$.ajax({
			url : ctx + "/org/regionalManagement/regionalManagementDisableOrEnable",
			type : "POST",
			data : {
				id : id,
				operatioType : operatioType
			},
			success : function(data) {
				if(operatioType == 'Disable'){
					$("#disavle_" + id).hide();
					$("#using_" + id).show();
					$("#tr_" + id).children('td').eq(8).html("0");
				}else{
					$("#using_" + id).hide();
					$("#disavle_" + id).show();
					$("#tr_" + id).children('td').eq(8).html("1");
				}
			},
			error : function() {
			}
		});
	});
}

//批量删除行政机构
function deleteBatch() {
	var ids = "";
	var ids2 = "";// 没有被选中的记录，将空格传到后台，以便获取行号
	var isNotDeleteCodes = "";
	$("a[id='checkItem']").each(function() {
				if ($(this).attr("class") == 'yes') {
					var checkId = $(this).attr("value");
					var status = $("#tr_" + checkId).children('td').eq(8).html();
					if (status != g_status) { // 非启用状态可进行删除
						ids += checkId + ",";
						ids2 += checkId + ",";
					} else {
						isNotDeleteCodes += "【"+$("#tr_"+checkId).children('td').eq(2).html() + "】、";// 启用状态的条码记录下来做提示
					}
				} else {
					ids2 += " ,";
				}
			});
	if (isNotDeleteCodes != "" || isNotDeleteCodes.length > 0) {
		showMessage("名称" + isNotDeleteCodes.substring(0, isNotDeleteCodes.length - 1) + '启用状态，不允许删除!');
		return false;
	}
	if (ids == '') {
		showMessage("请选择要删除的数据！");
		return false;
	}
	showConfirm('是否删除所选中的记录？', function() {
		$.ajax({
			"url" : ctx + "/org/regionalManagement/regionalManagementDeleteBatch",
			"type" : "POST",
			data : {
				ids : ids
			},
			"success" : function(data) {
				resolutionData(data);
				pageQuery();// 刷新list
			},
			"error" : function() {
			}
		});
	});
}

//批量删除关联的机构
function delItemBatch(){
	var ids = "";
	var ids2 = "";// 没有被选中的记录，将空格传到后台，以便获取行号
	var isNotDeleteCodes = "";
	var parentId = $("#parentId").val();//父ID
	$("a[id='checkItem']").each(
			function() {
				if ($(this).attr("class") == 'yes') {
					var checkId = $(this).attr("value");
					var status = $("#tr_" + checkId).children('td').eq(8).html();
					if (status != g_status) { // 非启用状态可进行删除
						ids += checkId + ",";
						ids2 += checkId + ",";
					} else {
						isNotDeleteCodes += "【"+$("#tr_"+checkId).children('td').eq(2).html() + "】、";// 启用状态的条码记录下来做提示
					}
				} else {
					ids2 += " ,";
				}
			});
	if (isNotDeleteCodes != "" || isNotDeleteCodes.length > 0) {
		showMessage("名称" + isNotDeleteCodes.substring(0, isNotDeleteCodes.length - 1) + '启用状态，不允许删除!');
		return false;
	}
	if (ids == '') {
		showMessage("请选择要删除的数据！");
		return false;
	}
	showConfirm('是否删除所选中的记录？', function() {
		$.ajax({
			"url" : ctx + "/org/regionalManagement/regionalManagementDelItemBatch",
			"type" : "POST",
			data : {
				ids : ids,
				parentId : parentId
			},
			"success" : function(data) {
				resolutionData(data);
				//pageQuery();// 刷新list
				changeTr(parentId)//刷新机构包含项目list
			},
			"error" : function() {
			}
		});
	});
}

//删除行政机构
function deleteIt(id) {
	var status = $("#tr_" + id).children('td').eq(8).html();
	if (status == g_status){
		showMessage('当前选中记录已启用，不允许删除！');
		return;
	}
	showConfirm('是否删除当前记录？', function() {
		$.ajax({
			"url" : ctx + "/org/regionalManagement/regionalManagementDelete",
			"type" : "GET",
			data : "id=" + id,
			"success" : function(data) {
				//resolutionData(data);
				pageQuery();// 刷新list
			},
			"error" : function() {
			}
		});
	});
}

//删除关联的机构
function delItem(id){
	var parentId = $("#parentId").val();//父ID
	var status = $("#tr_" + id).children('td').eq(8).html();
	if (status == g_status){
		showMessage('当前选中记录已启用，不允许删除！');
		return;
	}
	showConfirm('是否删除当前记录？', function() {
		$.ajax({
			"url" : ctx + "/org/regionalManagement/regionalManagementDelItem",
			"type" : "POST",
			data : {id:id,parentId:parentId},
			"success" : function(data) {
				//resolutionData(data);
				//pageQuery();// 刷新list
				changeTr(parentId)//刷新机构包含项目list
			},
			"error" : function() {
			}
		});
	});
}

//新增
function addIt() {
	// 防止重复提交
	if (!canStore) {
		return false;
	}
	// form序列化之前清除文本框空格
	formTextTrim("addForm");
	var orgTypeId = $("#orgTypeId").val();
	if (!validateSave()) {
		return;
	}
	// 检查是否同名
	$.ajax({
		"url" : ctx + "/org/regionalManagement/regionalManagementIfExisted",
		"type" : "POST",
		data : $("#addForm").serialize(),
		"success" : function(data) {
			// resolutionData(data);
			if (data.indexOf("confirm|") == 0) {
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
		"error" : function() {
		}
	});
}

//新增
function add() {
	canStore = false;
	$.ajax({
		"url" : ctx + "/org/regionalManagement/regionalManagementAdd",
		"type" : "POST",
		data : $("#addForm").serialize(),
		"success" : function(data) {
			canStore = true;
			resolutionData(data);
			closeWin();
			pageQuery('add');// 刷新list
		},
		"error" : function() {
			canStore = true;
		}
	});
}

//修改
function updateIt(row) {
	// 防止重复提交
	if (!canStore) {
		return false;
	}
	//表单是否有过变更
    if(!formIsDirty("editForm")){
    	closeWin();
    	return false;
    }
	formTextTrim("editForm");
	var orgTypeId = $("#orgTypeId").val();
	if (!validateSave()) {
		return;
	}
	// 检查是否同名
	$.ajax({
		"url" : ctx + "/org/regionalManagement/regionalManagementIfExisted",
		"type" : "POST",
		data : $("#editForm").serialize(),
		"success" : function(data) {
			// resolutionData(data);
			if (data.indexOf("confirm|") == 0) {
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
		"error" : function() {
		}
	});
}

//修改函数
function update() {
	canStore = false;
	$.ajax({
		"url" : ctx + "/org/regionalManagement/regionalManagementEdit",
		"type" : "POST",
		data : $("#editForm").serialize(),
		"success" : function(data) {
			canStore = true;
			var ret = resolutionData(data);
			closeWin();
			// 刷新该行记录
			var jsonObj = eval('(' + ret + ')');
			// 赋值
				$("#tr_" + jsonObj.idString).children('td').eq(2).html(
						replaceHtml(jsonObj.name));
				$("#tr_" + jsonObj.idString).children('td').eq(3).html(
						replaceHtml(jsonObj.address));
				$("#tr_" + jsonObj.idString).children('td').eq(4).html(
						replaceHtml(jsonObj.contacts));
				$("#tr_" + jsonObj.idString).children('td').eq(5).html(
						replaceHtml(jsonObj.telephone));
		},
		"error" : function() {
			canStore = true;
		}
	});
}


//添加项目页面，添加项目
function addTestItem(){
	var i = 0;
	$("#unContainListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;
			// 获取要添加的项目ID
			var trId = $(this).attr("id");
			addTestItemIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen3\"><a id=\"checkItem_contain\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#containListTable tr:first").after(newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan3> a").removeClass("yes").addClass("not");
			$(".quan4> a").removeClass("yes").addClass("not");
		}
	});
	
	if(i == 0){
		showMessage("请选择要添加的项目！",function(){
			return;
		});
	}
}

//添加项目页面，删除项目
function delTestItem(){
	var i = 0;
	$("#containListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;
			// 获取要删除的项目ID
			var trId = $(this).attr("id");
			delTestItemIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen4\"><a id=\"checkItem_unContain\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#unContainListTable tr:first").after(newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan3> a").removeClass("yes").addClass("not");
			$(".quan4> a").removeClass("yes").addClass("not");
		}
	});
	
	if(i == 0){
		showMessage("请选择要移除的项目！",function(){
			return;
		});
	}
}

//添加项目页面，点击确定
function addConfirm(){
	if((addTestItemIds!=null && addTestItemIds!='')
		|| (delTestItemIds!=null && delTestItemIds!='')){
		// 提交
		var parentId = $("#parentId").val();//父ID
		var data = "parentId="+parentId+"&addTestItemIds="+addTestItemIds+"&delTestItemIds="+delTestItemIds;
		$.ajax({
			"url" : ctx + "/org/regionalManagement/regionalManagementItemAddBatch",
			"type" : "GET",
			data:data,
			"success" : function(data) {
				closeWin();
				//刷新list
				//pageQuery();
				changeTr(parentId)//刷新机构包含项目list
			},
			"error" : function() {
			}
		});
	} else {
		closeWin();
	}
}


//验证保存的必填条件
function validateSave() {
	var name = $("#name").val();
	if (name == '') {
		showMessage('中文名称为空，请重新输入！', function() {
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

//显示地区名称树结构
function showRegionDiv() {
	initTree("", "1");
	var top = $("#regionName").position().top;
	var left = $("#regionName").position().left;
	$("#showRegionDiv").css("top", top + 32).css("left", left);
	$("#showRegionDiv").show();
}
var setting = {
	view : {
		selectedMulti : false,
		showLine : false,
		showIcon : false
	},
	edit : {
		enable : true,
		showRemoveBtn : false,
		showRenameBtn : false
	},
	data : {
		simpleData : {
			enable : true
		}

	},
	async : {
		enable : true,
		url : ctx + "/ctrRegions/loadCtrRegionsTree",
		autoParam : [ "id" ],
		otherParam : {
			"otherParam" : "zTreeAsyncTest"
		},
		dataFilter : filter
	},
	callback : {
		onClick : onClick,
		beforeClick : zTreeBeforeClick
	}
};
function onClick(event, treeId, treeNode, clickFlag) {
	// 1. 当选择“中国”节点时，“添加同级节点”和“修改”按钮为不可用。
	$("#regionId").val(treeNode.id);
	$("#regionName").val(treeNode.name);
	$("#showRegionDiv").hide();
	return;
}
function filter(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for (var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace('', '');
	}
	return childNodes;
}
function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
};
function beforeDrag(treeId, treeNodes) {
	return false;
}
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
	$("#deleteTip").html("中文名称：" + treeNode.name);
	$("#addchild").attr("disabled", false);
	$("#addbro").attr("disabled", false);
	$("#btn_delete").attr("disabled", false);
	if (treeNode.pId == null || treeNode.pId == '0') {
		$("#addbro").attr("disabled", true);
		$("#btn_delete").attr("disabled", true);
	}
}

// 拖拽
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
	return false;
}

//初始化树
function initTree() {
	$.ajax({
		type : "POST",
		url : ctx + "/ctrRegions/initCtrRegionsTree",
		dataType : "text",
		success : function(data) {
			data = resolutionData(data);
			var dtos = eval('(' + data + ')');
			if (dtos == '') {
				$("#rootExistDiv").hide();
				$("#rootNotExistDiv").show();
			} else {
				$("#rootExistDiv").show();
				$("#rootNotExistDiv").hide();
			}
			zNodes = new Array();
			for (var i = 0; i < dtos.length; i++) {
				if ("" == dtos[i].parentId || null == dtos[i].parentId
						|| "0" == dtos[i].parentId) {
					zNodes.push({
						id : dtos[i].id,
						pId : dtos[i].parentId,
						name : dtos[i].cnName,
						open : true,
						isParent : dtos[i].isParent
					});
				} else {
					zNodes.push({
						id : dtos[i].id,
						pId : dtos[i].parentId,
						name : dtos[i].cnName,
						isParent : dtos[i].isParent
					});
				}

			}
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		}
	});
}
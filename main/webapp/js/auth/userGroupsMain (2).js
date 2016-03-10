/**
 * 角色管理
 * @ClassName: userGroupsMain.js
 * @Description:
 * @author Oujie
 * @date 2016年1月13日
 */
var userGroupsMain = {
	canStore : true, // 控制重复提交
	sort : "0", // 默认按顺序号升序
	searchStr : null, // 搜索内容
	status : null, // 搜索状态
	g_status : 1, // 显示列表的状态
	optType : null, // 操作类型（0新增、1编辑）
	currentIndex : null, // 当前选中行
	roleManagerList : null, // 角色管理列表

	// 加载数据
	loadUserGroups : function() {
		//加载是权限判断依据
		var statusAuthrized = $("#rm_statusAuthrized").val()!="true"?false:true; //状态权限
		var offerAuthrized = $("#rm_offerAuthrized").val()!="true"?false:true; //授权权限
		var editAuthrized = $("#rm_editAuthrized").val()!="true"?false:true; //编辑权限
		var deleteAuthrized = $("#rm_deleteAuthrized").val()!="true"?false:true; //删除权限
		//列表加载
		userGroupsMain.roleManagerList = $("#rm_roleManagerList");
		userGroupsMain.roleManagerList.datagrid({
			url : ctx + "/sys/userGroups/loadUserGroups",
			method : "post",
			height : getTableHeight("rm_main-content-header"),
			fitColumns : true,
			fit : false,
			checkOnSelect : false,
			queryParams : {
				searchStr : userGroupsMain.searchStr, //文本搜索排序条件
				searchStatus : userGroupsMain.status, //状态搜索条件
				searchSort : userGroupsMain.sort, //升降排序条件
			},
			columns : [ [
			        {field : "ck",checkbox : true,width : 30},
					{title : "编码",field : "codeNo",width : 80},
					{title : "名称",field : "name",flex : 1,width : 60},
					{title : "备注",field : "memo",width : 150},
					{title : "顺序号",field : "displayOrder",width : 50,align : "center"},
					{title : "状态",field : "status",formatter : function(value, row, index) {
							//状态权限
							if(statusAuthrized){
								var returnStr = '<div class="status-switch help-tips"><input type="checkbox" name="status" onclick="userGroupsMain.modifyStatus('+ index + ');"/><i></i><span class="help-tips-content">停用</span></div>';
	                            if (value == '1') {
	                                returnStr = '<div class="status-switch help-tips"><input type="checkbox" name="status" checked="checked" onclick="userGroupsMain.modifyStatus('+ index + ');"/><i></i><span class="help-tips-content">启用</span></div>';
	                            }
							}else{
    							returnStr = "停用";
    							if (value == "1") {
    								returnStr = "开启";
    							}
    						}
							return returnStr;
						}
					},
					{title : "操作",field : "opt",width : 60,align : "center",
						formatter : function(value, row, index) {
							var str = "";
							//授权权限
							if(offerAuthrized){
								str += '<span class="help-tips"><a class="icon icon-user J_ShowPop J_DataRest" data-show="rm_rolePermissionManager" onclick="userGroupsMain.authorization(' + index + ',this)"></a><i class="help-tips-content">授权</i></span>';
							}
							//编辑权限
							if(editAuthrized){
								str += '<span class="help-tips"><a class="icon icon-edit J_ShowPop" data-show="roleManagerAdd" onclick="userGroupsMain.showuserGroupsAddPop('+index+',1)"></a><i class="help-tips-content">编辑</i></span>';
							}
							//删除权限
							if(deleteAuthrized){
	                            str += '<span class="help-tips danger-tips"><a class="icon icon-trash" onclick="userGroupsMain.deleteRow(' + index + ',this)"></a><i class="help-tips-content">删除</i></span>';
							}
                            return str;
						}
					} ] ],
			autoRowHeight : true,
			pagination : true,
		})
	},
	
	//授权按钮
	authorization : function (index,obj){
		var row = userGroupsMain.roleManagerList.datagrid("getData").rows[index];
		var status = row.status;

		/*if (status == 0) {
			showMessage("当前选中记录状态为可用，不允许修改！");
			return;
		}*/
		// 使用 'loadFilter' 创建树形菜单（Tree）
		$("#rm_rolePermissionManagerData").tree({
			url : ctx+"/sys/userGroups/loadRolePermission?userGroupsId="+row.idStr,
			method:"post",
			animate:true,
			checkbox:true,
			lines:true,
			loadFilter : function(rows) {
				$("#rm_userGroupsId").val(row.idStr);
				$("#rm_userGroupsName").val(row.name);
				$("#rm_userGroupsCodeNo").val(row.codeNo);
				dialog($(".J_DataRest").attr("data-show"), {
					width : 480
				});
				return userGroupsMain.convert(rows);
			}
		});
	},
	//授权提交
	submitRolePermission : function (){
		var nodes = $("#rm_rolePermissionManagerData").tree("getChecked");
		if(nodes==null||nodes.length==0){
			showMessage("请勾选需要进行设置的权限！");
			return ;
		}
		var nodeIds = [];
		for (var i = 0; i < nodes.length; i++) {
			nodeIds.push(nodes[i].id);
		}
		var userGroupsId = $("#rm_userGroupsId").val();
		var userGroupsName = $("#rm_userGroupsName").val();
		var userGroupsCodeNo = $("#rm_userGroupsCodeNo").val();
		// 弹出查询界面
		$.ajax({
			url : ctx + "/sys/userGroups/saveRolePermission",
			type : "post",
			data :{"nodeIds[]":nodeIds,userGroupsId:userGroupsId,userGroupsName:userGroupsName,userGroupsCodeNo:userGroupsCodeNo},
			traditional: true,
			success : function(data) {
				resolutionData(data);
			},
			error : function(data) {
				resolutionData(data);
			}
		});
		$("#rm_rolePermission").parents(".pop").hide();
	},
	//树的生成
	convert : function convert(rows) {//解析后台返回的数据方法
		function exists(rows, parentId) {
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].id == parentId)
					return true;
			}
			return false;
		}
		var nodes = [];
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (!exists(rows, row.parentId)) {
				nodes.push({
					id : row.id,
					text : row.name
				});
			}
		}
		var toDo = [];
		for (var i = 0; i < nodes.length; i++) {
			toDo.push(nodes[i]);
		}
		while (toDo.length) {
			var node = toDo.shift(); 
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (row.parentId == node.id) {
					var checked = true;
					if(row.authGroupFunction==undefined||row.authGroupFunction==""){
						checked = false;
					}
					var child = {id : row.id,text : row.name,checked : checked};
					if (node.children) {
						node.children.push(child);
					} else {
						node.children = [ child ];
					}
					toDo.push(child);
				}
			}
		}
		return nodes;
	},
	// 搜索
	search : function() {
		userGroupsMain.searchStr = $("#rm_searchStr").val();
		userGroupsMain.loadUserGroups();
	},

	// 点击添加和编辑时--弹出框
	showuserGroupsAddPop : function(index, optValue) {
		$("#rm_addForm")[0].reset();
		userGroupsMain.optType = optValue; // 标记操作类型，0--添加，1---编辑，提交时验证
		userGroupsMain.currentIndex = index;
		// 弹出查询界面
		if(optValue==0){ //添加
			$.ajax({
				url : ctx + "/sys/userGroups/getCodeNo",
				type : "post",
				async : false,
				success : function(data) {
					data = resolutionData(data);
					if (data == null) {
						return;
					}
					var jsonObj = eval("(" + data + ")");
					$("#rm_code").html(jsonObj.code);
					$("#rm_code_ht").val(jsonObj.code);
					displayOrder = jsonObj.displayOrder;
					$("#rm_displayOrder").val(jsonObj.displayOrder);
				},
				error : function(data) {
					resolutionData(data);
				}
			});
		}
		//编辑把信息显示出来
		if (optValue == 1) {
			var rowData = userGroupsMain.roleManagerList.datagrid("getData").rows[index];
			var id = rowData.idStr;
			var status = rowData.status;

			$("#rm_id").val(rowData.idStr);
			$("#rm_code").html(rowData.codeNo);
			$("#rm_code_ht").val(rowData.codeNo);
			$("#rm_name").val(rowData.name);
			$("#rm_displayOrder").val(rowData.displayOrder);
			$("#rm_memo").val(rowData.memo);
		}
		dialog($("#rm_J_ShowPop").attr("data-show"), {width : 480});
		$("#rm_name").focus();
	},

	// 提交表单是新增还是编辑
	submitIt : function(obj) {
		// 防止重复提交
		if (!userGroupsMain.canStore) {
			return;
		}
		// 验证提交信息
		if (!userGroupsMain.validateSave()) {
			return;
		}
		//新增判断名称是否同名
		if (userGroupsMain.optType == 0) {
			var name = $("#rm_name").val();
			$.ajax({
				url : ctx + "/sys/userGroups/userGroupsIfExisted",
				type : "post",
				data : {
					name : name
				},
				success : function(data) {
					var ckOnly = data.indexOf("名称重复"); // 名称校验
					if (ckOnly != -1) {
						if (data.indexOf("confirm|") == 0) {
							// 同名确认是否继续提交
							showConfirm(data.substring(8), function() {
								userGroupsMain.add();
							});
						} else {
							userGroupsMain.add();
						}
					}else{
						userGroupsMain.add();
					}
				}
			});
		}else{//编辑
			userGroupsMain.edit();
		}
	},
	
	// 编辑
	edit : function() {
		userGroupsMain.canStore = false;
		formTextTrim("rm_addForm");
		$.ajax({
			url : ctx + "/sys/userGroups/editUserGroups",
			type : "post",
			data : $("#rm_addForm").serialize(),
			success : function(data) {
				userGroupsMain.canStore = true;
				$("#rm_submitPop").parents(".pop").hide();
				bodyScroll();
				// 刷新列
				userGroupsMain.roleManagerList.datagrid("updateRow", {
					index : userGroupsMain.currentIndex,
					row : {
						codeNo : $("#rm_codeNo").val(),
						name : $("#rm_name").val(),
						displayOrder: $("#rm_displayOrder").val() == "" ? 0 : $("#rm_displayOrder").val(),
						memo : $("#rm_memo").val()
					}
				});
			},
			error : function(data) {
				userGroupsMain.canStore = true;
				resolutionData(data);
			}
		});
	},
	
	// 增加角色
	add : function(obj) {
		userGroupsMain.canStore = false;
		formTextTrim("rm_addForm");
		
		$.ajax({
			url : ctx + "/sys/userGroups/saveUserGroups",
			type : "post",
			data : $("#rm_addForm").serialize(),
			success : function(data) {
				//提交按钮
				userGroupsMain.canStore = true;
				//隐藏弹出框
				$("#rm_submitPop").parents(".pop").hide();
				//添加完成返回页面设置
				$("#rm_searchStr").val("");
				$("#rm_searchStr").focus();
				userGroupsMain.searchStr = ""; // 搜索内容
				userGroupsMain.status = -1;
				$("#rm_statusSel").html("全部"); //状态
			    $("#rm_j_status > li.selected").removeClass("selected");
				$("#rm_j_status li:first").addClass("selected");
				userGroupsMain.sort = 2; //排序
				$("#rm_sortSel").html("按录入顺序降序");
			    $("#rm_j_sort > li.selected").removeClass("selected");
			    $("#rm_j_sort li:last").addClass("selected");
				userGroupsMain.loadUserGroups();
			},
			error : function() {
				userGroupsMain.canStore = true;
				resolutionData(data);
			}
		});
	},

	// 验证提交信息
	validateSave : function() {
		var name = trim($("#rm_name").val());
		var displayOrder = $("#rm_displayOrder").val();
		
		if (name == "") {
			showMessage("名称为空,请重新输入!");
			$("#rm_name").focus();
			return;
		}
		if(isNaN(displayOrder)){
			showMessage("顺序号必须为数字，请重新输入！");
			$("#rm_displayOrder").focus();
			return;
		}
		if (validateDisplayOrder("rm_displayOrder")) {
			return;
		}
		return true;
	},

	// 选中删除
	checkedDelRow : function() {
		var checkedItems = userGroupsMain.roleManagerList.datagrid("getChecked");
		var ids = [];
		var userGroupsNames = [];
		
		$.each(checkedItems, function(index, item) {
			if (item.status == userGroupsMain.g_status) {
				userGroupsNames.push(item.name);
			} else {
				ids.push(item.idStr);
			}
		});
		if (userGroupsNames != "" || userGroupsNames.length > 0) {
			showMessage("用户名称:" + userGroupsNames.join(",") + "启用状态，不允许删除!");
			return false;
		}
		if (ids == "") {
			showMessage("请选择要删除的数据！");
			return false;
		}
		
		showConfirm("是否删除当前选中记录？", function() {
			$.ajax({
				url : ctx + "/sys/userGroups/deleteUserGroups",
				type : "post",
				data : {
					id : ids.join(",")
				},
				success : function(data) {
					resolutionData(data);
					// 刷新datagrid
					userGroupsMain.roleManagerList.datagrid("reload");
				},
				error : function(data) {
					resolutionData(data);
				}
			});
		});
	},
	
	// 删除行信息
	deleteRow : function(index) {
		var rowData = userGroupsMain.roleManagerList.datagrid("getData").rows[index];
		var id = rowData.idStr;
		var status = rowData.status;

		if (status == userGroupsMain.g_status) {
			showMessage("当前选中记录状态为可用，不允许删除！");
			return;
		}

		showConfirm("是否删除当前记录？", function() {
			$.ajax({
				url : ctx + "/sys/userGroups/deleteUserGroups",
				type : "post",
				data : {
					id : id
				},
				success : function(data) {
					resolutionData(data);
					// 从页面中删除
					userGroupsMain.roleManagerList.datagrid("reload");
				},
				error : function(data) {
					resolutionData(data);
				}
			});
		});
	},
	
	// 启用、停用状态
	modifyStatus : function(index) {
		var rowData = userGroupsMain.roleManagerList.datagrid("getData").rows[index];
		var id = rowData.idStr;
		var status = rowData.status;
		var newStatus = 0; // 默认为停用
		if (status == 0) { // 当前状态为停用的时候，修改为启用，刷新数据用到
			message = "是否启用当前记录？";
			newStatus = 1;
		}
		if (status == 1) {
			message = "是否停用当前记录？";
		}
		showConfirm(message,function(){
			$.ajax({
				url : ctx + "/sys/userGroups/updateStatusUserGroups",
				type : "post",
				data : {
					id : id,
					status : newStatus
				},
				success : function(data) {
					resolutionData(data);
					userGroupsMain.roleManagerList.datagrid("updateRow", {
						index : index,
						row : {
							status : newStatus
						}
					});
				},
				error : function(data) {
					resolutionData(data);
				}
			});
		});
		userGroupsMain.roleManagerList.datagrid("updateRow",{ index: index, row: { status: status}});
	},

}


// 初始化用户管理列表
$(function() {
	userGroupsMain.loadUserGroups();
	$("#rm_searchStr").focus();
	// 搜索框进行回车搜索
	//preventSubFrom("#rm_searchStr");
	//enterEvent("#rm_searchStr",userGroupsMain.search);
	
	//状态查询
	$(document).on("click", "#rm_j_status > li", function() {
		// 变化样式
		$("#rm_j_status > li.selected").removeClass("selected");
		$(this).addClass("selected");
		$("#rm_statusSel").html($(this).text());
		userGroupsMain.status = $(this).val();
		// 触发查询
		userGroupsMain.loadUserGroups();
	});

	// 排序查询
	$(document).on("click", "#rm_j_sort > li", function() {
		// 变化样式
		$("#rm_j_sort > li.selected").removeClass("selected");
		$(this).addClass("selected");
		$("#rm_sortSel").html($(this).text());
		userGroupsMain.sort = $(this).val();
		// 触发查询
		userGroupsMain.loadUserGroups();
	});
});


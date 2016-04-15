/**
 * 角色管理
 * Created by chenshuxian
 * data 2016/4/8.
 */
var UserGroupsMain  = (function($){

	/* START render basicModule */
	UserGroupsMain  = Object.create(BasicModule);
	/* END render basicModule */
	var
		_preId = CB.PREID.RM,
		_tableList =  $("#" + _preId + "List"),
		_hideCols = [],	            //要穩藏的欄位
		_data = UserGroupsMain .searchObj(_preId),    //取得初始grid时所需要的server 参数
		_module = "UserGroupsMain",                  //模组名称，于grid 建立时使用
		_focusId = "name",                  //新增、修改页面打开时focus的对象id
		_popArea = 480,                         //新增、修改页面开启时初始大小
		_existUrl = ctx + "/sys/userGroups/userGroupsIfExisted",
		_updateUrl = ctx + "/sys/userGroups/editUserGroups",                  //修改url
		_addUrl = ctx + "/sys/userGroups/saveUserGroups",                      //新增url
		_delUrl = ctx + "/sys/userGroups/deleteUserGroups",                   //删除url
		_delBatUrl = ctx + "/sys/userGroups/deleteUserGroups", //改变状态的url
		_changeStatusUrl = ctx + "/sys/userGroups/updateStatusUserGroups", //改变状态的url
		_InfoUrl = ctx + "/sys/userGroups/userGroupsInfo",                    //新增、修改、view 页面打开时所对映后台调用url
		_pageListUrl = ctx + "/sys/userGroups/loadUserGroups",            //datagrid 取得资料的url
		

	/* START dataGrid 生成*/
		_dgParams = {
			url:_pageListUrl,
			data:_data,
			module:_module,
			hideCols:_hideCols,
			tableList:_tableList,
			preId:_preId
		},

		_gridObj = dataGridM.init(_dgParams),                   //取得 datagrid 物件参数
	// render dataGrid
		_dataGrid = _tableList.datagrid(_gridObj);


	$.extend(UserGroupsMain ,{

		preId:_preId,
		module:_module,
		//设定pop弹出框的大小
		popArea: _popArea,
		focusId: _focusId,
		tableList:_tableList,
		/*START url 定義*/
		updateUrl: _updateUrl,
		addUrl: _addUrl,
		delUrl: _delUrl,
		changeStatusUrl: _changeStatusUrl,
		InfoUrl: _InfoUrl,
		pageListUrl: _pageListUrl,
		delBatUrl: _delBatUrl,
		existUrl: _existUrl,
		checkStatus:false,
		/*END url 定義*/
		dataGrid:_dataGrid,
		statusAuthrized: $("#rmstatusAuthrized").val()!="true"?false:true,//状态权限
		offerAuthrized: $("#rmofferAuthrized").val()!="true"?false:true, //授权权限
		editAuthrized: $("#rmeditAuthrized").val()!="true"?false:true, //编辑权限
		deleteAuthrized: $("#rmdeleteAuthrized").val()!="true"?false:true, //删除权限

		searchObj: function(preId) {
			return {
				searchStr: $.trim($("#" + preId + "SearchStr").val()),
				searchStatus: $("#" + preId + "Status").val(),
				searchSort: $("#" + preId + "Sort").val()
			};
		},

		editCallBack: function() {

			var rowData = BasicModule.rowData;
			//console.log(UserGroupsMain .rowData);
			$("#InfoForm").form("load", {
				name: rowData.name,
				displayOrder: rowData.displayOrder,
				memo: rowData.memo,
				id: rowData.idStr,
				opType: 'update'
			});

			newcommonjs.oldName = rowData.name;

		},

		changeStatusEx: function(index,rowData) {
			var
				type = rowData.status.toString(),params;

			if(type == "1")
				type = "0";
			else
				type = "1";

				params = {
					data:{
						id: rowData.stringId,
						status:type
					}
				};

			this.changeStatus(index,rowData,params);
		},

		authorization: function(rowData){

			var
				status = rowData.status,
				id = rowData.stringId;

			if (status) {
				BM.showMessage("当前选中记录状态为可用，不允许授权！");
				return;
			}

			var params = {
				data: {opType: "auth"},
				callback: function () {
					// 使用 'loadFilter' 创建树形菜单（Tree）
					$("#rolePermissionManagerData").tree({
						url : ctx + "/sys/userGroups/loadRolePermission?userGroupsId=" + id,
						method:CB.METHOD,
						animate:true,
						checkbox:true,
						lines:true,
						loadFilter : function(rows) {
							$("#userGroupsId").val(rowData.idStr);
							$("#userGroupsName").val(rowData.name);
							$("#userGroupsCodeNo").val(rowData.codeNo);
							return UserGroupsMain.convert(rows);
						}
					});
				}
			};

			this.commonPop(params);

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

		//授权提交
		submitRolePermission : function (){
			var nodes = $("#rolePermissionManagerData").tree("getChecked");
			if(nodes==null||nodes.length==0){
				BM.showMessage("请勾选需要进行设置的权限！");
				return ;
			}
			var nodeIds = [];
			for (var i = 0; i < nodes.length; i++) {
				nodeIds.push(nodes[i].id);
			}
			var userGroupsId = $("#userGroupsId").val();
			var userGroupsName = $("#userGroupsName").val();
			var userGroupsCodeNo = $("#userGroupsCodeNo").val();
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
			$("#"+ CB.POPDIV).hide();
		}


	});

	return UserGroupsMain ;

}(jQuery));

$(function(){
	var _preId = UserGroupsMain.preId;
	UserGroupsMain .init();
	$("#" + _preId + "DeleteBatch").unbind();
	// deleteBatch
	$("#" + _preId + "DeleteBatch").on("click",function() {

		var id = UserGroupsMain.getIds(UserGroupsMain.dataGrid),
			params = {
				data: {id: id.join(",")}
			};

		UserGroupsMain.deleteBatch(params);
	});
});
///**
// * 角色管理
// * @ClassName: UserGroupsMain .js
// * @Description:
// * @author Oujie
// * @date 2016年1月13日
// */
//var UserGroupsMain  = {
//	canStore : true, // 控制重复提交
//	sort : "0", // 默认按顺序号升序
//	searchStr : null, // 搜索内容
//	status : null, // 搜索状态
//	g_status : 1, // 显示列表的状态
//	optType : null, // 操作类型（0新增、1编辑）
//	currentIndex : null, // 当前选中行
//	roleManagerList : null, // 角色管理列表
//
//	// 加载数据
//	loadUserGroups : function() {
//		//加载是权限判断依据
//		var statusAuthrized = $("#rm_statusAuthrized").val()!="true"?false:true; //状态权限
//		var offerAuthrized = $("#rm_offerAuthrized").val()!="true"?false:true; //授权权限
//		var editAuthrized = $("#rm_editAuthrized").val()!="true"?false:true; //编辑权限
//		var deleteAuthrized = $("#rm_deleteAuthrized").val()!="true"?false:true; //删除权限
//		//列表加载
//		UserGroupsMain .roleManagerList = $("#rm_roleManagerList");
//		UserGroupsMain .roleManagerList.datagrid({
//			url : ctx + "/sys/userGroups/loadUserGroups",
//			method : "post",
//			height : getTableHeight("rm_main-content-header"),
//			fitColumns : true,
//			fit : false,
//			checkOnSelect : false,
//			queryParams : {
//				searchStr : UserGroupsMain .searchStr, //文本搜索排序条件
//				searchStatus : UserGroupsMain .status, //状态搜索条件
//				searchSort : UserGroupsMain .sort //升降排序条件
//			},
//			columns : [ [
//			        {field : "ck",checkbox : true,width : 30},
//					{title : "编码",field : "codeNo",width : 80},
//					{title : "名称",field : "name",flex : 1,width : 60},
//					{title : "备注",field : "memo",width : 150},
//					{title : "顺序号",field : "displayOrder",width : 50,align : "center"},
//					{title : "状态",field : "status",formatter : function(value, row, index) {
//							//状态权限
//							if(statusAuthrized){
//								var returnStr = '<div class="status-switch help-tips"><input type="checkbox" name="status" onclick="UserGroupsMain .modifyStatus('+ index + ');"/><i></i><span class="help-tips-content">停用</span></div>';
//	                            if (value == '1') {
//	                                returnStr = '<div class="status-switch help-tips"><input type="checkbox" name="status" checked="checked" onclick="UserGroupsMain .modifyStatus('+ index + ');"/><i></i><span class="help-tips-content">启用</span></div>';
//	                            }
//							}else{
//    							returnStr = "停用";
//    							if (value == "1") {
//    								returnStr = "开启";
//    							}
//    						}
//							return returnStr;
//						}
//					},
//					{title : "操作",field : "opt",width : 60,align : "center",
//						formatter : function(value, row, index) {
//							var str = "";
//							//授权权限
//							if(offerAuthrized){
//								str += '<span class="help-tips"><a class="icon icon-user J_ShowPop J_DataRest" data-show="rm_rolePermissionManager" onclick="UserGroupsMain .authorization(' + index + ',this)"></a><i class="help-tips-content">授权</i></span>';
//							}
//							//编辑权限
//							if(editAuthrized){
//								str += '<span class="help-tips"><a class="icon icon-edit J_ShowPop" data-show="roleManagerAdd" onclick="UserGroupsMain .showuserGroupsAddPop('+index+',1)"></a><i class="help-tips-content">编辑</i></span>';
//							}
//							//删除权限
//							if(deleteAuthrized){
//	                            str += '<span class="help-tips danger-tips"><a class="icon icon-trash" onclick="UserGroupsMain .deleteRow(' + index + ',this)"></a><i class="help-tips-content">删除</i></span>';
//							}
//                            return str;
//						}
//					} ] ],
//			autoRowHeight : true,
//			pagination : true
//		})
//	},
//
//	//授权按钮
//	authorization : function (index,obj){
//		var row = UserGroupsMain .roleManagerList.datagrid("getData").rows[index];
//		var status = row.status;
//		console.log(status)
//		if (status == UserGroupsMain .g_status) {
//			showMessage("当前选中记录状态为可用，不允许授权！");
//			return;
//		}else{
//			// 使用 'loadFilter' 创建树形菜单（Tree）
//			$("#rm_rolePermissionManagerData").tree({
//				url : ctx+"/sys/userGroups/loadRolePermission?userGroupsId="+row.idStr,
//				method:"post",
//				animate:true,
//				checkbox:true,
//				lines:true,
//				loadFilter : function(rows) {
//					$("#rm_userGroupsId").val(row.idStr);
//					$("#rm_userGroupsName").val(row.name);
//					$("#rm_userGroupsCodeNo").val(row.codeNo);
//					dialog($(".J_DataRest").attr("data-show"), {
//						width : 480
//					});
//					return UserGroupsMain .convert(rows);
//				}
//			});
//		}
//
//	},
//	//授权提交
//	submitRolePermission : function (){
//		var nodes = $("#rm_rolePermissionManagerData").tree("getChecked");
//		if(nodes==null||nodes.length==0){
//			showMessage("请勾选需要进行设置的权限！");
//			return ;
//		}
//		var nodeIds = [];
//		for (var i = 0; i < nodes.length; i++) {
//			nodeIds.push(nodes[i].id);
//		}
//		var userGroupsId = $("#rm_userGroupsId").val();
//		var userGroupsName = $("#rm_userGroupsName").val();
//		var userGroupsCodeNo = $("#rm_userGroupsCodeNo").val();
//		// 弹出查询界面
//		$.ajax({
//			url : ctx + "/sys/userGroups/saveRolePermission",
//			type : "post",
//			data :{"nodeIds[]":nodeIds,userGroupsId:userGroupsId,userGroupsName:userGroupsName,userGroupsCodeNo:userGroupsCodeNo},
//			traditional: true,
//			success : function(data) {
//				resolutionData(data);
//			},
//			error : function(data) {
//				resolutionData(data);
//			}
//		});
//		$("#rm_rolePermission").parents(".pop").hide();
//	},
//	//树的生成
//	convert : function convert(rows) {//解析后台返回的数据方法
//		function exists(rows, parentId) {
//			for (var i = 0; i < rows.length; i++) {
//				if (rows[i].id == parentId)
//					return true;
//			}
//			return false;
//		}
//		var nodes = [];
//		for (var i = 0; i < rows.length; i++) {
//			var row = rows[i];
//			if (!exists(rows, row.parentId)) {
//				nodes.push({
//					id : row.id,
//					text : row.name
//				});
//			}
//		}
//		var toDo = [];
//		for (var i = 0; i < nodes.length; i++) {
//			toDo.push(nodes[i]);
//		}
//		while (toDo.length) {
//			var node = toDo.shift();
//			for (var i = 0; i < rows.length; i++) {
//				var row = rows[i];
//				if (row.parentId == node.id) {
//					var checked = true;
//					if(row.authGroupFunction==undefined||row.authGroupFunction==""){
//						checked = false;
//					}
//					var child = {id : row.id,text : row.name,checked : checked};
//					if (node.children) {
//						node.children.push(child);
//					} else {
//						node.children = [ child ];
//					}
//					toDo.push(child);
//				}
//			}
//		}
//		return nodes;
//	},
//	// 搜索
//	search : function() {
//		UserGroupsMain .searchStr = $("#rm_searchStr").val();
//		UserGroupsMain .loadUserGroups();
//	},
//
//	// 点击添加和编辑时--弹出框
//	showuserGroupsAddPop : function(index, optValue) {
//		if(optValue == '1'){
//			var row = UserGroupsMain .roleManagerList.datagrid("getData").rows[index];
//			var status = row.status;
//			if (status == UserGroupsMain .g_status) {
//				showMessage("当前选中记录状态为可用，不允许修改！");
//				return;
//			}
//		}
//
//
//		$("#rm_addForm")[0].reset();
//		UserGroupsMain .optType = optValue; // 标记操作类型，0--添加，1---编辑，提交时验证
//		UserGroupsMain .currentIndex = index;
//		// 弹出查询界面
//		if(optValue==0){ //添加
//			$.ajax({
//				url : ctx + "/sys/userGroups/getCodeNo",
//				type : "post",
//				async : false,
//				success : function(data) {
//					data = resolutionData(data);
//					if (data == null) {
//						return;
//					}
//					var jsonObj = eval("(" + data + ")");
//					$("#rm_code").html(jsonObj.code);
//					$("#rm_code_ht").val(jsonObj.code);
//					displayOrder = jsonObj.displayOrder;
//					$("#rm_displayOrder").val(jsonObj.displayOrder);
//				},
//				error : function(data) {
//					resolutionData(data);
//				}
//			});
//		}
//		//编辑把信息显示出来
//		if (optValue == 1) {
//			var rowData = UserGroupsMain .roleManagerList.datagrid("getData").rows[index];
//			var id = rowData.idStr;
//			var status = rowData.status;
//
//			$("#rm_id").val(rowData.idStr);
//			$("#rm_code").html(rowData.codeNo);
//			$("#rm_code_ht").val(rowData.codeNo);
//			$("#rm_name").val(rowData.name);
//			$("#rm_displayOrder").val(rowData.displayOrder);
//			$("#rm_memo").val(rowData.memo);
//		}
//		dialog($("#rm_J_ShowPop").attr("data-show"), {width : 480});
//		$("#rm_name").focus();
//		$("input[name='name']").validatebox({
//            validType: 'blank',
//            required:true,
//            message: "角色名称不可为空"
//        });
//        $("input[name='name']").attr('maxlength','25');
//
//        //displayOrder长度
//        $("input[name='displayOrder']").validatebox({
//            validType:  ['digits','length[0,6]']
//        });
//        $("input[name='displayOrder']").attr('maxlength','6');
//
//        //备注
//        $("#rm_memo").validatebox({
//            validType:  ['symbol','length[0,50]']
//        });
//        $("#rm_memo").attr('maxlength','50');
//	},
//
//	// 提交表单是新增还是编辑
//	submitIt : function(obj) {
//		// 防止重复提交
//		if (!UserGroupsMain .canStore) {
//			return;
//		}
//		// 验证提交信息
//		/*if (!UserGroupsMain .validateBox()) {
//			return;
//		}*/
//		//新增判断名称是否同名
//		if (UserGroupsMain .optType == 0) {
//			var name = $("#rm_name").val();
//			$.ajax({
//				url : ctx + "/sys/userGroups/userGroupsIfExisted",
//				type : "post",
//				data : {
//					name : name
//				},
//				success : function(data) {
//					var ckOnly = data.indexOf("名称重复"); // 名称校验
//					if (ckOnly != -1) {
//						if (data.indexOf("confirm|") == 0) {
//							// 同名确认是否继续提交
//							showConfirm(data.substring(8), function() {
//								UserGroupsMain .add();
//							});
//						} else {
//							UserGroupsMain .add();
//						}
//					}else{
//						UserGroupsMain .add();
//					}
//				}
//			});
//		}else{//编辑
//			UserGroupsMain .edit();
//		}
//	},
//
//	// 编辑
//	edit : function() {
//		UserGroupsMain .canStore = false;
//		formTextTrim("rm_addForm");
//		$.ajax({
//			url : ctx + "/sys/userGroups/editUserGroups",
//			type : "post",
//			data : $("#rm_addForm").serialize(),
//			success : function(data) {
//				UserGroupsMain .canStore = true;
//				$("#rm_submitPop").parents(".pop").hide();
//				bodyScroll();
//				// 刷新列
//				UserGroupsMain .roleManagerList.datagrid("updateRow", {
//					index : UserGroupsMain .currentIndex,
//					row : {
//						codeNo : $("#rm_codeNo").val(),
//						name : $("#rm_name").val(),
//						displayOrder: $("#rm_displayOrder").val() == "" ? 0 : $("#rm_displayOrder").val(),
//						memo : $("#rm_memo").val()
//					}
//				});
//			},
//			error : function(data) {
//				UserGroupsMain .canStore = true;
//				resolutionData(data);
//			}
//		});
//	},
//
//	// 增加角色
//	add : function(obj) {
//		UserGroupsMain .canStore = false;
//		formTextTrim("rm_addForm");
//
//		$.ajax({
//			url : ctx + "/sys/userGroups/saveUserGroups",
//			type : "post",
//			data : $("#rm_addForm").serialize(),
//			success : function(data) {
//				//提交按钮
//				UserGroupsMain .canStore = true;
//				//隐藏弹出框
//				$("#rm_submitPop").parents(".pop").hide();
//				//添加完成返回页面设置
//				$("#rm_searchStr").val("");
//				$("#rm_searchStr").focus();
//				UserGroupsMain .searchStr = ""; // 搜索内容
//				UserGroupsMain .status = -1;
//				$("#rm_statusSel").html("全部"); //状态
//			    $("#rm_j_status > li.selected").removeClass("selected");
//				$("#rm_j_status li:first").addClass("selected");
//				UserGroupsMain .sort = 2; //排序
//				$("#rm_sortSel").html("按录入顺序降序");
//			    $("#rm_j_sort > li.selected").removeClass("selected");
//			    $("#rm_j_sort li:last").addClass("selected");
//				UserGroupsMain .loadUserGroups();
//			},
//			error : function() {
//				UserGroupsMain .canStore = true;
//				resolutionData(data);
//			}
//		});
//	},
//
//	// 验证提交信息
////	validateSave : function() {
////		var name = trim($("#rm_name").val());
////		var displayOrder = $("#rm_displayOrder").val();
////
////		if (name == "") {
////			showMessage("名称为空,请重新输入!");
////			$("#rm_name").focus();
////			return;
////		}
////		if(isNaN(displayOrder)){
////			showMessage("顺序号必须为数字，请重新输入！");
////			$("#rm_displayOrder").focus();
////			return;
////		}
////		if (validateDisplayOrder("rm_displayOrder")) {
////			return;
////		}
////		return true;
////	},
//
//
//
//	// 选中删除
//	checkedDelRow : function() {
//		var checkedItems = UserGroupsMain .roleManagerList.datagrid("getChecked");
//		var ids = [];
//		var userGroupsNames = [];
//
//		$.each(checkedItems, function(index, item) {
//			if (item.status == UserGroupsMain .g_status) {
//				userGroupsNames.push(item.name);
//			} else {
//				ids.push(item.idStr);
//			}
//		});
//		if (userGroupsNames != "" || userGroupsNames.length > 0) {
//			showMessage("用户名称:" + userGroupsNames.join(",") + "启用状态，不允许删除!");
//			return false;
//		}
//		if (ids == "") {
//			showMessage("请选择要删除的数据！");
//			return false;
//		}
//
//		showConfirm("是否删除当前选中记录？", function() {
//			$.ajax({
//				url : ctx + "/sys/userGroups/deleteUserGroups",
//				type : "post",
//				data : {
//					id : ids.join(",")
//				},
//				success : function(data) {
//					resolutionData(data);
//					// 刷新datagrid
//					UserGroupsMain .roleManagerList.datagrid("reload");
//				},
//				error : function(data) {
//					resolutionData(data);
//				}
//			});
//		});
//	},
//
//	// 删除行信息
//	deleteRow : function(index) {
//		var rowData = UserGroupsMain .roleManagerList.datagrid("getData").rows[index];
//		var id = rowData.idStr;
//		var status = rowData.status;
//
//		if (status == UserGroupsMain .g_status) {
//			showMessage("当前选中记录状态为可用，不允许删除！");
//			return;
//		}
//
//		showConfirm("是否删除当前记录？", function() {
//			$.ajax({
//				url : ctx + "/sys/userGroups/deleteUserGroups",
//				type : "post",
//				data : {
//					id : id
//				},
//				success : function(data) {
//					resolutionData(data);
//					// 从页面中删除
//					UserGroupsMain .roleManagerList.datagrid("reload");
//				},
//				error : function(data) {
//					resolutionData(data);
//				}
//			});
//		});
//	},
//
//	// 启用、停用状态
//	modifyStatus : function(index) {
//		var rowData = UserGroupsMain .roleManagerList.datagrid("getData").rows[index];
//		var id = rowData.idStr;
//		var status = rowData.status;
//		var newStatus = 0; // 默认为停用
//		if (status == 0) { // 当前状态为停用的时候，修改为启用，刷新数据用到
//			message = "是否启用当前记录？";
//			newStatus = 1;
//		}
//		if (status == 1) {
//			message = "是否停用当前记录？";
//		}
//		showConfirm(message,function(){
//			$.ajax({
//				url : ctx + "/sys/userGroups/updateStatusUserGroups",
//				type : "post",
//				data : {
//					id : id,
//					status : newStatus
//				},
//				success : function(data) {
//					resolutionData(data);
//					UserGroupsMain .roleManagerList.datagrid("updateRow", {
//						index : index,
//						row : {
//							status : newStatus
//						}
//					});
//				},
//				error : function(data) {
//					resolutionData(data);
//				}
//			});
//		});
//		UserGroupsMain .roleManagerList.datagrid("updateRow",{ index: index, row: { status: status}});
//	}
//
//}
//
//
//// 初始化用户管理列表
//$(function() {
//	UserGroupsMain .loadUserGroups();
//	$("#rm_searchStr").focus();
//	// 搜索框进行回车搜索
//	//preventSubFrom("#rm_searchStr");
//	//enterEvent("#rm_searchStr",UserGroupsMain .search);
//
//	//状态查询
//	$(document).on("click", "#rm_j_status > li", function() {
//		// 变化样式
//		$("#rm_j_status > li.selected").removeClass("selected");
//		$(this).addClass("selected");
//		$("#rm_statusSel").html($(this).text());
//		UserGroupsMain .status = $(this).val();
//		// 触发查询
//		UserGroupsMain .loadUserGroups();
//	});
//
//	// 排序查询
//	$(document).on("click", "#rm_j_sort > li", function() {
//		// 变化样式
//		$("#rm_j_sort > li.selected").removeClass("selected");
//		$(this).addClass("selected");
//		$("#rm_sortSel").html($(this).text());
//		UserGroupsMain .sort = $(this).val();
//		// 触发查询
//		UserGroupsMain .loadUserGroups();
//	});
//});
//

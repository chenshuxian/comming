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
		searchHold: CB.SEARCHHOLDER.ROLE,

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
			$("#spanEditCodeNo").html(rowData.codeNo);

			newcommonjs.oldName = rowData.name;

		},

		showCallBack: function() {

			var rowData = BasicModule.rowData;
			$("#InfoForm").form("load", {
				name: rowData.name,
				displayOrder: rowData.displayOrder,
				memo: rowData.memo
			});
			$("#spanEditCodeNo").html(rowData.codeNo);
			$("form input").attr("readonly","readonly");
			$("form textarea").attr("readonly","readonly");
			$("#editBtn").hide();

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

			//console.log("授权:" + status);
			if (status != 0) {
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



			var nodes = [] ,father = [],
				treeLen = rows.length,
				fi,fi2;


			//寻找所有父节点id
			for ( fi = 0; fi < treeLen; fi++ ) {
				//儿子
				for ( fi2 = 0; fi2 < treeLen; fi2++ ) {
					if ( rows[fi].id == rows[fi2].parentId ){
						father[rows[fi].id]  = 1;
						//father += rows[fi].id + ",";
					}
				}

			}

			//console.log(father);

			//root
			for (var i = 0; i < treeLen; i++) {
				var row = rows[i];
				if (!exists(rows, row.parentId)) {
					nodes.push({
						id : row.id,
						text : row.name
					});
				}
			}

			var toDo = [],
				Len = nodes.length;

			for (var i = 0; i < Len; i++) {
				//console.log(nodes[i]);
				toDo.push(nodes[i]);
			}


			while (toDo.length) {
				//console.log(toDo);
				var node = toDo.shift(),
					checked;
				//console.log(node.id);
				for (var i = 0; i < treeLen; i++) {
					var row = rows[i];

					if (row.parentId == node.id) {
						//console.log(row.name);
						if ( row.authGroupFunction==undefined || row.authGroupFunction=="" || father[row.id] == 1){
							checked = false;
						} else {
							//console.log(row.name);
							checked = true;
						}

						var child = {id : row.id,text : row.name,checked : checked};

						if (node.children) {
							node.children.push(child);
						} else {
							node.children = [ child ];
						}
						//console.log(child);
						toDo.push(child);
					}
				}
			}

			return nodes;

		},

		//授权提交
		submitRolePermission : function (){
			var nodes = $("#rolePermissionManagerData").tree("getChecked",['checked','indeterminate']);

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

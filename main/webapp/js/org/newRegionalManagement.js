/**
 * 区域管理机构js
 * Created by subanmiao on 2016/1/21.
 */
var RegionalManagement = (function($){

	/* START render basicModule */
	RegionalManagement = Object.create(CenterOrg);
	/* END render basicModule */

	var
		_preId = CB.PREID.RMM,
		_tableList =  $("#" + _preId + "List"),
		_tableList2 = $("#" + _preId + "RelatedList"),
		_orgTypeId = $("#" + _preId + "orgTypeId").val(),
		_exParams = {orgTypeId: _orgTypeId},
		_hideCols = ["nacaoId","regionName","fastCode","displayOrder"],	//要穩藏的欄位
		_data = RegionalManagement.searchObj(_preId),
		_focusId = "editName",
		// URL SETTING
		_delBatUrl = ctx + "/org/regionalManagement/regionalManagementDeleteBatch",
		_existUrl = ctx + "/org/regionalManagement/regionalManagementIfExisted",
		_updateUrl = ctx + "/org/regionalManagement/regionalManagementEdit",
		_addUrl = ctx + "/org/regionalManagement/regionalManagementAdd",
		_delUrl = ctx + "/org/regionalManagement/regionalManagementDelete",
		_changeStatusUrl = ctx + "/org/regionalManagement/regionalManagementDisableOrEnable",
		_InfoUrl = ctx + "/org/regionalManagement/regionalManagementInfo",
		_pageListUrl = ctx + "/org/regionalManagement/regionalManagementPageList",

		_InfoUrl2 = ctx + "/org/regionalManagement/addRelatedRegionalShow",
		_addDelBatUrl2 = ctx + "/org/regionalManagement/regionalManagementItemAddBatch",
		_pageListUrl2 = ctx + "/org/regionalManagement/relatedList",

		_module = "RegionalManagement",
		_popArea = 800,
		_dataGrid,

		/******************* first dataGrid *********************/
		_dgParams = {
			url:_pageListUrl,
			data:_data,
			module:_module,
			hideCols:_hideCols,
			tableList:_tableList,
			preId:_preId
		},

		_gridObj = dataGridM.init(_dgParams);
		_gridObj.height = ($(window).height() < 810) ? 240 : 300;
		_gridObj.onLoadSuccess = function (data) {

			var rows = RegionalManagement.dataGrid.datagrid("getRows");

			if (_hideCols) {
				$.each(_hideCols, function (k, v) {
					_tableList.datagrid('hideColumn', v);
				})
			}

			if (data.total == 0) {
				//RegionalManagement.resultDescDataGrid.datagrid('loadData', {total: 0, rows: []});//清空下方DateGrid
				////添加一个新数据行，提示无数据
				//ResultType.resultTypeDataGrid.datagrid('appendRow', { noData: '<div style="text-align:center;color:red">未查询到数据！</div>' }).datagrid('mergeCells', { index: 0, field: 'noData', colspan: columns.length })
				////隐藏分页导航条
				//ResultType.resultTypeDataGrid.closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
			} else {
				//ResultType.resultTypeDataGrid.closest('div.datagrid-wrap').find('div.datagrid-pager').show();
				RegionalManagement.parentId = rows[0].stringId;
				BasicModule.parentStatus = rows[0].status;
				_loadRelatedDataGrid(RegionalManagement.parentId);
			}

		};
		_gridObj.onClickRow = function (index, row) {
			// 刷新结果描述表
			RegionalManagement.reloadRelateList(row);
		};
		_gridObj.onCheck = function (index, row) {
			RegionalManagement.reloadRelateList(row);
		};

		_dataGrid = _tableList.datagrid(_gridObj);

		/******************* first dataGrid end ****************/

	///* 状态搜索 */
	//$("." + _preId + "-status-selector li").on("click", function () {
	//	$("#" + _preId + "StatusSpan").html($(this).html());
	//	$("." + _preId + "-status-selector li.selected").removeClass("selected");
	//	var flg = $(this).is('.selected');
	//	$(this).addClass(function () {
	//		return flg ? '' : 'selected';
	//	})
    //
	//	var statusVal = $(this).attr("el-value");
	//	$("#" + _preId + "Status").val(statusVal);
    //
	//	RegionalManagement.searchGrid();
	//});
    //
	///* 排序 */
	//$("." + _preId + "-sort-selector li").on("click", function () {
	//	$("#" + _preId + "SortSpan").html($(this).html());
	//	$("." + _preId + "-sort-selector li.selected").removeClass("selected");
	//	var flg = $(this).is('.selected');
	//	$(this).addClass(function () {
	//		return flg ? '' : 'selected';
	//	})
    //
	//	var sortVal = $(this).attr("el-value");
	//	$("#" + _preId + "Sort").val(sortVal);
    //
	//	RegionalManagement.searchGrid();
	//});
    //
	///* search Btn */
	//$("#" + _preId + "SearchBtn").on("click",function() {
	//	RegionalManagement.searchGrid();
	//});

	/*Start add 相关参数设定  */
	//$("#" + _preId + "Add").on("click",function() {
	//	RegionalManagement.addPop();
	//});
    //
	//// deleteBatch
	//$("#" + _preId + "DeleteBatch").on("click",function() {
	//	RegionalManagement.deleteBetch();
	//});

	/!* 关联机构新增 *!/
	$("#" + _preId + "AddRelated").click(function () {

		if (RegionalManagement.parentStatus == 1) {
			showMessage("当前选中机构已启用，不允许关联其他机构！");
			return;
		}
		RegionalManagement.currentEvent = "addRegional";

		var
			params = {
				url: _InfoUrl2,
				data: {parentId: RegionalManagement.parentId},
				callback: function(){
					RegionalManagement.addTestItemIds = [];
					RegionalManagement.delTestItemIds = [];
					RegionalManagement.loadContainList();
					RegionalManagement.loadNoContainList();
					RegionalManagement.initTree();
				}
			};

		RegionalManagement.addPop(params);

	});

	/!* 关联机构批量删除 *!/
	$("#" + _preId + "DeleteRelatedBatch").click(function () {

		var checkedItems = RegionalManagement.dataGrid2.datagrid("getChecked"),
			ids = [];

		if (checkedItems.length == 0) {
			showMessage('请选择要删除的数据!');
			return false;
		}

		$.each(checkedItems, function (index, item) {
				ids.push(item.stringId);
		});
		var
			data = {
				parentId: RegionalManagement.parentId,
				addTestItemIds: RegionalManagement.addTestItemIds.join(","),
				delTestItemIds: ids.join(",")
			},
			params = {
				dataGrid : RegionalManagement.dataGrid2,
				url: RegionalManagement.addDelBatUrl,
				data: data
			};

		RegionalManagement.deleteBatch(params);


	});

	$(window).on('resize', function () {
		var width = RegionalManagement.tableList.parents('.tabs-panels').width() - 40;
		RegionalManagement.tableList.datagrid('resize', {
			width: width
		});
		RegionalManagement.tableList2.datagrid('resize', {
			width: width
		});
	});

	_loadRelatedDataGrid = function(parentId){

		var
			relatedParams = {parentId: parentId},
			module = "RegionalManagement2",

			_dgParams = {
				url: _pageListUrl2,
				data: relatedParams,
				module: module,
				hideCols: _hideCols,
				tableList: _tableList2,
				preId: _preId,
				isSecond: true
			},

			_gridObj = dataGridM.init(_dgParams);

		_gridObj.pagination = false;
		_gridObj.onLoadSuccess = function (data) {
			var columns = RegionalManagement.dataGrid2.datagrid('getColumnFields');

			if (data.total == 0) {

			} else {

			}
		};
		RegionalManagement.dataGrid2 = _tableList2.datagrid(_gridObj);

	}




	$.extend(RegionalManagement, {

			preId: _preId,
			module:_module,
			tableList: _tableList,
			tableLIst2: _tableList2,
			popArea: _popArea,
			dataGrid: _dataGrid,
			initPopHeight: ($(window).height() < 700) ? 400 : 400,
			addParams: RegionalManagement.getAddParams(_exParams),
			exParams:_exParams,
			orgTypeId:_orgTypeId,
			parentId: undefined,
			//parentStatus: undefined,
			focusId: _focusId,
			/*START url 定義*/
			delBatUrl: _delBatUrl,
			existUrl: _existUrl,
			updateUrl: _updateUrl,
			addUrl: _addUrl,
			delUrl: _delUrl,
			changeStatusUrl: _changeStatusUrl,
			InfoUrl: _InfoUrl,
			pageListUrl: _pageListUrl,
			addDelBatUrl: _addDelBatUrl2,
			addTestItemIds: [],
			delTestItemIds: [],

			deleteRelated: function(index,rowData) {

				RegionalManagement.delTestItemIds.push(rowData.stringId);
				var
					data = {
						parentId: RegionalManagement.parentId,
						addTestItemIds: RegionalManagement.addTestItemIds.join(","),
						delTestItemIds: RegionalManagement.delTestItemIds.join(",")
					},
					params = {
						url: this.addDelBatUrl,
						dataGrid: this.dataGrid2,
						data: data
					};

				if(RegionalManagement.parentStatus == 1) {
					showMessage("当前选中机构已启用，不允许删除!");
					return;
				}

				this.deleteRow(index,rowData,params);
				
			},

			deleteRelatedAjax: function(data,callback) {

				$.ajax({
					"url": RegionalManagement.addDelBatUrl,
					"type": "POST",
					data: data,
					"success": function (data) {
						if (data.indexOf("succ") > -1) {
							RegionalManagement.dataGrid2.datagrid('reload');
							if (callback) {
								callback();
							}
						}
					},
					"error": function () {
					}
				});

			},

			loadContainList: function () {
				$("#addCheckProjectLeft").datagrid({

					url: ctx + "/org/regionalManagement/containRegionalList",
					method: 'POST',
					queryParams: {parentId: RegionalManagement.parentId},
					height: this.initPopHeight,
					fitColumns: true,
					striped: true,
					fit: false,
					columns: [
						[{
							field: "ck",
							checkbox: true,
							width: 30
						}, {
							title: "编码",
							field: 'codeNo',
							width: 50
						}, {
							title: "中文名称",
							field: 'name',
							flex: 1,
							width: 50
						}, {
							title: "地区",
							field: 'regionName',
							width: 50
						}]
					],
					autoRowHeight: false,
					pagination: false,
					onLoadSuccess: function (data) {
						$("#containSize").html(data.total);
					}
				});
			},

			loadNoContainList: function() {

				$("#addCheckProjectRight").datagrid({

					url: ctx + "/org/regionalManagement/noContainRegionalList",
					method: 'POST',
					queryParams: {parentId: RegionalManagement.parentId, regionId:-1},
					height: this.initPopHeight,
					fitColumns: true,
					striped: true,
					fit: false,
					columns: [
						[{
							field: "ck",
							checkbox: true,
							width: 30
						}, {
							title: "编码",
							field: 'codeNo',
							width: 50
						}, {
							title: "中文名称",
							field: 'name',
							flex: 1,
							width: 50
						}, {
							title: "地区",
							field: 'regionName',
							width: 50
						}]
					],
					autoRowHeight: false,
					pagination: true,
					onLoadSuccess: function() {
						var p = $("#addCheckProjectRight").datagrid('getPager');

						p.pagination({
							showPageList: false,
							showRefresh: false
						});
					}
				});
			},

			changeRelatedStatus: function(index, rowData) {

				var
					params ={
						dataGrid: this.dataGrid2
					};

				this.changeStatus(index,rowData,params);


			},

			showRelatedDialog: function (rowData) {
				//var url = ctx + "/org/regionalManagement/regionalManagementInfo";
				//var data = {orgTypeId: this.orgTypeId, id: '', opType: 'view'};
				newcommonjs.newshowDictCodeEditDialog(data, function () {
					$("#InfoForm").form("load", {
						name: rowData.name,
						shortName: rowData.shortName,
						enName: rowData.enName,
						enShortName: rowData.enShortName,
						address: rowData.address,
						enAddress: rowData.enAddress,
						contacts: rowData.contacts,
						telephone: rowData.telephone,
						fax: rowData.fax,
						fastCode: rowData.fastCode,
						displayOrder: rowData.displayOrder,
						memo: rowData.memo
					});
					$("form input").attr("readonly", "readonly");
					$("form textarea").attr("readonly", "readonly");
					$("#editBtn").hide();
					$("#spanEditCodeNo").html(rowData.codeNo);
				}, url, 800);
			},


			reloadRelateList: function (row) {

				this.parentId = row.stringId;
				BasicModule.parentStatus = row.status;
				RegionalManagement.dataGrid2.datagrid('reload', {
					parentId: row.stringId
				});

			},

			initTree: function(){

				var obj = EasyTree.getInit();
				var click = {

					onClick:function(node){
						$("#regionId").val(node.id);
						$("#regionName").val(node.text);

						$("#addCheckProjectRight").datagrid("reload", {
							parentId: RegionalManagement.parentId,
							regionId: $("#regionId").val(),
							searchStr: $.trim($("#relatedSearchStr").val()),
							status: 1
						})
						return;
					}

				};
				$.extend(obj,click);	//自定义click方法
				$("#regionName").combotree(obj);

			},

			editCallBack: function() {

				var rowData = BasicModule.rowData;

				$("#InfoForm").form("load", {
					name: rowData.name,
					shortName: rowData.shortName,
					enName: rowData.enName,
					enShortName: rowData.enShortName,
					address: rowData.address,
					enAddress: rowData.enAddress,
					contacts: rowData.contacts,
					telephone: rowData.telephone,
					fax: rowData.fax,
					fastCode: rowData.fastCode,
					displayOrder: rowData.displayOrder,
					memo: rowData.memo
				});
				$("#spanEditCodeNo").html(rowData.codeNo);
			},

			showCallBack: function() {

				var rowData = BasicModule.rowData;

				$("#InfoForm").form("load", {
					name: rowData.name,
					shortName: rowData.shortName,
					enName: rowData.enName,
					enShortName: rowData.enShortName,
					address: rowData.address,
					enAddress: rowData.enAddress,
					contacts: rowData.contacts,
					telephone: rowData.telephone,
					fax: rowData.fax,
					fastCode: rowData.fastCode,
					displayOrder: rowData.displayOrder,
					memo: rowData.memo
				});
				$("form input").attr("readonly", "readonly");
				$("form textarea").attr("readonly", "readonly");
				$("#editBtn").hide();
				$("#spanEditCodeNo").html(rowData.codeNo);

			}

	});

	return RegionalManagement;


}(jQuery));

$(function(){
	RegionalManagement.init();
});
/*
var RegionalManagement = {
	preId: $("#regionalManagementPreId").val(),
	orgTypeId: $("#orgTypeId").val(),
	parentId: undefined,
	parentStatus: undefined,
	initPopHeight: ($(window).height() < 700) ? 400 : 400,
	addTestItemIds: [],
	delTestItemIds: [],
	init: function () {
		// 管理机构列表
		newcommonjs.pageInit(this.preId);
		this.managementList = $("#" + this.preId + "ManagementList");
		var managementUrl = ctx + "/org/regionalManagement/regionalManagementPageList";
		var params = this.searchObj();
		var managementGridObj = newcommonjs.createGridObj(managementUrl, 'POST', params);
		managementGridObj.height = ($(window).height() < 810) ? 240 : 300;
		managementGridObj.columns = [[
			{field: "ck", checkbox: true, width: 30},
			{
				title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
				var rowData = JSON.stringify(row);
				return "<a onclick='RegionalManagement.showRegionalDialog(" + rowData + ")'>" + value + "</a>";
			}
			},
			{title: "中文名称", field: 'name', flex: 1, width: 60},
			{title: "中文地址", field: 'address', flex: 1, width: 200},
			{title: "联系人", field: 'contacts', flex: 1, width: 60},
			{title: "联系电话", field: 'telephone', flex: 1, width: 60},
			{
				title: "状态", field: 'status', formatter: function (value, row, index) {
				var rowData = JSON.stringify(row);
				var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='RegionalManagement.changeRegionalStatus(" + index + "," + rowData + ")' /><i></i></div>";
				if (value == '1') {
					returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='RegionalManagement.changeRegionalStatus(" + index + "," + rowData + ")' /><i></i></div>";
				}
				return returnStr;
			}
			},
			{
				title: "操作", field: 'opt', width: 60, align: 'center',
				formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					str += "<a class='icon icon-edit' onclick='RegionalManagement.editRegionalRow(" + rowData + ")'></a>";
					str += "<a class=\"icon icon-trash\" onclick='RegionalManagement.deleteRegional(" + index + "," + rowData + ")'></a>";
					return str;
				}
			}]];
		managementGridObj.view =
			$.extend({}, $.fn.datagrid.defaults.view, {
				onAfterRender: function () {
					switch (RegionalManagement.currentEvent) {
						case "addRegional":
							newcommonjs.setSearchConditions(RegionalManagement.preId, "", 2, 2);
							RegionalManagement.currentEvent = undefined;
							break;
					}
				}
			});
		managementGridObj.onLoadSuccess = function (data) {
			var rows = RegionalManagement.managementDataGrid.datagrid("getRows");
			//var columns = ResultType.resultTypeDataGrid.datagrid('getColumnFields');
			if (data.total == 0) {
				//RegionalManagement.resultDescDataGrid.datagrid('loadData', {total: 0, rows: []});//清空下方DateGrid
				////添加一个新数据行，提示无数据
				//ResultType.resultTypeDataGrid.datagrid('appendRow', { noData: '<div style="text-align:center;color:red">未查询到数据！</div>' }).datagrid('mergeCells', { index: 0, field: 'noData', colspan: columns.length })
				////隐藏分页导航条
				//ResultType.resultTypeDataGrid.closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
			} else {
				//ResultType.resultTypeDataGrid.closest('div.datagrid-wrap').find('div.datagrid-pager').show();
				RegionalManagement.parentId = rows[0].stringId;
				RegionalManagement.parentStatus = rows[0].status;
				RegionalManagement.loadRelatedDataGrid(RegionalManagement.parentId);
			}

		};
		managementGridObj.onClickRow = function (index, row) {
			// 刷新结果描述表
			RegionalManagement.reloadRelateList(row);
		};
		managementGridObj.onCheck = function (index, row) {
			RegionalManagement.reloadRelateList(row);
		}
		this.managementDataGrid = this.managementList.datagrid(managementGridObj);

		/!* 关键词搜索 *!/
		$("#" + this.preId + "SearchBtn").click(function () {
			RegionalManagement.managementDataGrid.datagrid('load', RegionalManagement.searchObj());
		});

		/!* 状态搜索 *!/
		$("." + this.preId + "-status-selector").on("click", "li", function () {
			$("#" + RegionalManagement.preId + "StatusSpan").html($(this).html());
			$("." + RegionalManagement.preId + "-status-selector li.selected").removeClass("selected");
			var flg = $(this).is('.selected');
			$(this).addClass(function () {
				return flg ? '' : 'selected';
			});

			var statusVal = $(this).attr("el-value");
			$("#" + RegionalManagement.preId + "Status").val(statusVal);

			RegionalManagement.managementDataGrid.datagrid('load', RegionalManagement.searchObj());
		});

		/!* 排序 *!/
		$("." + this.preId + "-sort-selector").on("click", "li", function () {
			$("#" + RegionalManagement.preId + "SortSpan").html($(this).html());
			$("." + RegionalManagement.preId + "-sort-selector li.selected").removeClass("selected");
			var flg = $(this).is('.selected');
			$(this).addClass(function () {
				return flg ? '' : 'selected';
			})

			var sortVal = $(this).attr("el-value");
			$("#" + RegionalManagement.preId + "Sort").val(sortVal);

			RegionalManagement.managementDataGrid.datagrid('load', RegionalManagement.searchObj());
		});

		/!* 管理机构批量删除 *!/
		$("#" + this.preId + "DeleteRegionalBatch").click(function () {
			var url = ctx + "/org/regionalManagement/regionalManagementDeleteBatch";
			newcommonjs.deleteBatch(RegionalManagement.managementDataGrid, url, "POST");
		});

		/!* 管理机构新增 *!/
		$("#" + this.preId + "AddRegional").click(function () {
			RegionalManagement.currentEvent = "addRegional";
			var url = ctx + "/org/regionalManagement/regionalManagementInfo";
			var data = {orgTypeId: RegionalManagement.orgTypeId, id: '', opType: 'add'};
			newcommonjs.newshowDictCodeEditDialog(data, function () {
				$("#editName").focus();
			}, url, 800);
		});

		/!* 关联机构新增 *!/
		$("#" + this.preId + "AddRelated").click(function () {
			if (RegionalManagement.parentStatus == true) {
				showMessage("当前选中机构已启用，不允许关联其他机构！");
				return;
			}
			RegionalManagement.currentEvent = "addRegional";
			var url = ctx + "/org/regionalManagement/addRelatedRegionalShow";
			var data = {parentId: RegionalManagement.parentId};
			newcommonjs.newshowDictCodeEditDialog(data, function () {
				RegionalManagement.addTestItemIds = [];
				RegionalManagement.delTestItemIds = [];
				RegionalManagement.loadContainList();
				RegionalManagement.loadNoContainList();
				RegionalManagement.initTree();
			}, url, 800);
		});

		/!* 关联机构批量删除 *!/
		$("#" + this.preId + "DeleteRelatedBatch").click(function () {
			var checkedItems = RegionalManagement.relatedDataGrid.datagrid("getChecked");
			if (checkedItems.length == 0) {
				showMessage('请选择要删除的数据!');
				return false;
			}

			var names = [];
			var ids = [];
			$.each(checkedItems, function (index, item) {
				if (item.status == true) {
					names.push(item.name);
				} else {
					ids.push(item.stringId);
				}
			});
			if (names.length > 0) {
				showMessage("名称" + newcommonjs.getItemsMsg(names) + "启用状态，不允许删除!");
				return false;
			}
			$.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
				if (r) {
					var data = "parentId=" + RegionalManagement.parentId + "&addTestItemIds=" + RegionalManagement.addTestItemIds.join(",") + "&delTestItemIds=" + ids.join(",");
					RegionalManagement.deleteRelatedAjax(data, function () { });
				}
			});
		});

		$(window).on('resize', function () {
			var width = RegionalManagement.managementList.parents('.tabs-panels').width() - 40;
			RegionalManagement.managementList.datagrid('resize', {
				width: width
			});
			RegionalManagement.relatedList.datagrid('resize', {
				width: width
			});
		});
	},

	deleteRelatedAjax: function (data, callback) {
		$.ajax({
			"url": ctx + "/org/regionalManagement/regionalManagementItemAddBatch",
			"type": "POST",
			data: data,
			"success": function (data) {
				if (data.indexOf("succ") > -1) {
					RegionalManagement.relatedDataGrid.datagrid('reload');
					if (callback) {
						callback();
					}
				}
			},
			"error": function () {
			}
		});
	},

	deleteRelated: function (index, rowData) {
		if (rowData.status == true) {
			showMessage('当前选中记录已启用，不允许删除！');
			return;
		}
		$.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
			if (r) {
				RegionalManagement.delTestItemIds.push(rowData.stringId);
				var data = "parentId=" + RegionalManagement.parentId + "&addTestItemIds=" + RegionalManagement.addTestItemIds.join(",") + "&delTestItemIds=" + RegionalManagement.delTestItemIds.join(",");
				RegionalManagement.deleteRelatedAjax(data, function () {
				});
			}
		});
	},

	loadContainList: function () {
		$("#addCheckProjectLeft").datagrid({
			url: ctx + "/org/regionalManagement/containRegionalList",
			method: 'POST',
			queryParams: {parentId: RegionalManagement.parentId},
			height: this.initPopHeight,
			fitColumns: true,
			striped: true,
			fit: false,
			columns: [
				[{
					field: "ck",
					checkbox: true,
					width: 30
				}, {
					title: "编码",
					field: 'codeNo',
					width: 50
				}, {
					title: "中文名称",
					field: 'name',
					flex: 1,
					width: 50
				}, {
					title: "地区",
					field: 'regionName',
					width: 50
				}]
			],
			autoRowHeight: false,
			pagination: false,
			onLoadSuccess: function (data) {
				$("#containSize").html(data.total);
			}
		});
	},

	loadNoContainList: function () {
		$("#addCheckProjectRight").datagrid({
			url: ctx + "/org/regionalManagement/noContainRegionalList",
			method: 'POST',
			queryParams: {parentId: RegionalManagement.parentId},
			height: this.initPopHeight,
			fitColumns: true,
			striped: true,
			fit: false,
			columns: [
				[{
					field: "ck",
					checkbox: true,
					width: 30
				}, {
					title: "编码",
					field: 'codeNo',
					width: 50
				}, {
					title: "中文名称",
					field: 'name',
					flex: 1,
					width: 50
				}, {
					title: "地区",
					field: 'regionName',
					width: 50
				}]
			],
			autoRowHeight: false,
			pagination: false
		});
	},

	editRegionalRow: function (rowData) {
		var url = ctx + "/org/regionalManagement/regionalManagementInfo";
		var data = {orgTypeId: RegionalManagement.orgTypeId, id: rowData.stringId, opType: 'edit'};
		newcommonjs.newshowDictCodeEditDialog(data, function () {
			$("#InfoForm").form("load", {
				name: rowData.name,
				shortName: rowData.shortName,
				enName: rowData.enName,
				enShortName: rowData.enShortName,
				address: rowData.address,
				enAddress: rowData.enAddress,
				contacts: rowData.contacts,
				telephone: rowData.telephone,
				fax: rowData.fax,
				fastCode: rowData.fastCode,
				displayOrder: rowData.displayOrder,
				memo: rowData.memo
			});
			$("#spanEditCodeNo").html(rowData.codeNo);
			$("#editName").focus();
		}, url, 800);
	},

	editRegional: function (opType, orgTypeId) {
		var existUrl = ctx + "/org/regionalManagement/regionalManagementIfExisted";
		var dataGrid = RegionalManagement.managementDataGrid;
		var data = $("#InfoForm").serialize();
		if (opType == "add") {
			this.addRegional(existUrl, dataGrid, data);
		} else if (opType == "edit") {
			this.updateRegional(existUrl, dataGrid, data);
		}
	},

	addRegional: function(existUrl, dataGrid, data) {
		newcommonjs.newaddDictCode(existUrl, "", "POST", dataGrid, data, function (data) {
			if (data.indexOf("confirm|") == 0) {
				showConfirm(data.substring(8), function() {
					// 确认继续
					RegionalManagement.addR();
				});
			} else {
				RegionalManagement.addR();
			}
		}, this.validateSave());
	},

	addR: function () {
		var addUrl = ctx + "/org/regionalManagement/regionalManagementAdd";
		var reloadData = RegionalManagement.searchObj();
		reloadData.sort = 2;
		reloadData.searchStr = "";
		reloadData.status = "";
		newcommonjs.newadd(addUrl, "POST", RegionalManagement.managementDataGrid, reloadData);
	},

	updateRegional: function(existUrl, dataGrid, data) {
		newcommonjs.newupdateDictCode(existUrl, "", "POST", dataGrid, data, function (data) {
			if (data.indexOf("confirm|") == 0) {
				showConfirm(data.substring(8), function() {
					// 确认继续
					RegionalManagement.updateR();
				});
			} else {
				RegionalManagement.updateR();
			}
		},this.validateSave());
	},

	updateR: function () {
		var url = ctx + "/org/regionalManagement/regionalManagementEdit";
		newcommonjs.update(url, "POST", RegionalManagement.managementDataGrid);
	},

	changeRegionalStatus: function (index, rowData) {
		var url = ctx + "/org/regionalManagement/regionalManagementDisableOrEnable";
		newcommonjs.changeStatus(index, rowData, RegionalManagement.managementDataGrid, url, "POST");
	},

	changeRelatedStatus: function (index, rowData) {
		var url = ctx + "/org/regionalManagement/regionalManagementDisableOrEnable";
		newcommonjs.changeStatus(index, rowData, RegionalManagement.relatedDataGrid, url, "POST");
	},

	deleteRegional: function (index, rowData) {
		var url = ctx + "/org/regionalManagement/regionalManagementDelete";
		var dataGrid = RegionalManagement.managementDataGrid;
		newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
	},

	showRegionalDialog: function (rowData) {
		var url = ctx + "/org/regionalManagement/regionalManagementInfo";
		var data = {orgTypeId: this.orgTypeId, id: '', opType: 'view'};
		newcommonjs.newshowDictCodeEditDialog(data, function () {
			$("#InfoForm").form("load", {
				name: rowData.name,
				shortName: rowData.shortName,
				enName: rowData.enName,
				enShortName: rowData.enShortName,
				address: rowData.address,
				enAddress: rowData.enAddress,
				contacts: rowData.contacts,
				telephone: rowData.telephone,
				fax: rowData.fax,
				fastCode: rowData.fastCode,
				displayOrder: rowData.displayOrder,
				memo: rowData.memo
			});
			$("form input").attr("readonly", "readonly");
			$("form textarea").attr("readonly", "readonly");
			$("#editBtn").hide();
			$("#spanEditCodeNo").html(rowData.codeNo);
		}, url, 800);
	},

	reloadRelateList: function (row) {
		this.parentId = row.stringId;
		this.parentStatus = row.status;
		RegionalManagement.relatedDataGrid.datagrid('reload', {
			parentId: row.stringId
		});
	},

	loadRelatedDataGrid: function (parentId){
		this.relatedList = $("#" + this.preId + "RelatedList");
		var relatedUrl = ctx + "/org/regionalManagement/relatedList";
		var relatedParams = {parentId: parentId};
		var relatedGridObj = newcommonjs.createGridObj(relatedUrl, 'POST', relatedParams);
		relatedGridObj.pagination = false;
		relatedGridObj.columns = [[
			{field: "ck", checkbox: true, width: 30},
			{
				title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
				var rowData = JSON.stringify(row);
				return "<a onclick='RegionalManagement.showRelatedDialog(" + rowData + ")'>" + value + "</a>";
			}
			},
			{title: "中文名称", field: 'name', flex: 1, width: 60},
			{title: "中文地址", field: 'address', flex: 1, width: 200},
			{title: "联系人", field: 'contacts', flex: 1, width: 60},
			{title: "联系电话", field: 'telephone', flex: 1, width: 60},
			{
				title: "状态", field: 'status', formatter: function (value, row, index) {
				var rowData = JSON.stringify(row);
				var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='RegionalManagement.changeRelatedStatus(" + index + "," + rowData + ")' /><i></i></div>";
				if (value == '1') {
					returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='RegionalManagement.changeRelatedStatus(" + index + "," + rowData + ")' /><i></i></div>";
				}
				return returnStr;
			}
			},
			{
				title: "操作", field: 'opt', width: 60, align: 'center',
				formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					str += "<a class=\"icon icon-trash\" onclick='RegionalManagement.deleteRelated(" + index + "," + rowData + ")'></a>";
					return str;
				}
			}]];
		relatedGridObj.view =
			$.extend({}, $.fn.datagrid.defaults.view, {
				onAfterRender: function () {
					switch (RegionalManagement.currentEvent) {
						case "add":
							//newcommonjs.setSearchConditions(RegionalManagement.preId, "", 2, 2);
							//RegionalManagement.currentEvent = undefined;
							break;
					}
				}
			});
		relatedGridObj.onLoadSuccess = function (data) {
			var columns = RegionalManagement.relatedDataGrid.datagrid('getColumnFields');
			if (data.total == 0) {
				//添加一个新数据行，提示无数据
				//ResultType.resultDescDataGrid.datagrid('appendRow', { ck: '<div style="text-align:center;color:red">未查询到数据！</div>' })
				//    .datagrid('mergeCells', { index: 0, field: 'ck', colspan: 5, type: 'footer' });
				//隐藏分页导航条
				//$(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
			} else {
				//$(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
				//this.typeId = rows[0].stringId;
				//ResultType.loadResultDescDataGrid(this.typeId);
			}
		};
		RegionalManagement.relatedDataGrid = RegionalManagement.relatedList.datagrid(relatedGridObj);
	},

	showRelatedDialog: function (rowData) {
		var url = ctx + "/org/regionalManagement/regionalManagementInfo";
		var data = {orgTypeId: this.orgTypeId, id: '', opType: 'view'};
		newcommonjs.newshowDictCodeEditDialog(data, function () {
			$("#InfoForm").form("load", {
				name: rowData.name,
				shortName: rowData.shortName,
				enName: rowData.enName,
				enShortName: rowData.enShortName,
				address: rowData.address,
				enAddress: rowData.enAddress,
				contacts: rowData.contacts,
				telephone: rowData.telephone,
				fax: rowData.fax,
				fastCode: rowData.fastCode,
				displayOrder: rowData.displayOrder,
				memo: rowData.memo
			});
			$("form input").attr("readonly", "readonly");
			$("form textarea").attr("readonly", "readonly");
			$("#editBtn").hide();
			$("#spanEditCodeNo").html(rowData.codeNo);
		}, url, 800);
	},

	searchObj: function () {
		return {
			searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
			status: $("#" + this.preId + "Status").val(),
			sort: $("#" + this.preId + "Sort").val(),
			orgTypeId: RegionalManagement.orgTypeId
		};
	},

	validateSave: function () {
		var name = $("#editName").val();
		if (name == '') {
			showMessage('中文名称为空，请重新输入！', function() {
				$("#editName").focus();
			});
			return false;
		}
		var displayOrderId = "editDisplayOrder";
		if(validateDisplayOrder(displayOrderId)){
			return false;
		}
		return true;
	},

	initTree: function(){

		var obj = EasyTree.getInit();
		var click = {

			onClick:function(node){
				$("#regionId").val(node.id);
				$("#regionName").val(node.text);

				$("#addCheckProjectRight").datagrid("reload", {
					parentId: RegionalManagement.parentId,
						regionId: $("#regionId").val(),
					searchStr: $.trim($("#relatedSearchStr").val())
				})
				return;
			}

		};
		$.extend(obj,click);	//自定义click方法
		$("#regionName").combotree(obj);

	}
};

$(function () {
	RegionalManagement.init();
});*/

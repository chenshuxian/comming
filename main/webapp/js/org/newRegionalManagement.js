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
		_tableList2 = $("#" + _preId + "List2"),
		_orgTypeId = $("#" + _preId + "orgTypeId").val(),
		_exParams = {orgTypeId: _orgTypeId},
		_hideCols = ["regionName","fastCode","nacaoId"],	//要穩藏的欄位
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
		_regUrl = ctx + "/org/regionalManagement/noContainRegionalList",

		_module = "RegionalManagement",
		_popArea = 800,
		_dataGrid,
		//_height =($(window).height() < 810) ? 240 : 300;
		_height = CB.HEIGHT + 5,

		/******************* first dataGrid *********************/
		_dgParams = {
			url:_pageListUrl,
			data:_data,
			module:_module,
			hideCols:_hideCols,
			tableList:_tableList,
			preId:_preId,
			height:_height
		},

		_gridObj = dataGridM.init(_dgParams);
		_gridObj.onLoadSuccess = function (data) {

			var rows = RegionalManagement.dataGrid.datagrid("getRows");

			if (_hideCols) {
				$.each(_hideCols, function (k, v) {
					_tableList.datagrid('hideColumn', v);
				})
			}

			if (data.total == 0) {
				RegionalManagement.add2 = true;			//断判关联表是否可以添加
				_loadRelatedDataGrid("0");
			} else {
				//ResultType.resultTypeDataGrid.closest('div.datagrid-wrap').find('div.datagrid-pager').show();
				RegionalManagement.add2 = false;
				RegionalManagement.parentId = rows[0].stringId;
				BasicModule.parentStatus = rows[0].status;
				dataGridM.firstRow.call(this);
				_loadRelatedDataGrid(RegionalManagement.parentId);
			}

			dataGridM.loadSuccess(this);


		};
		_gridObj.onClickRow = function (index, row) {
			// 刷新结果描述表
			dataGridM.clickRow.call(this, index,row);
			RegionalManagement.reloadRelateList(row);
		};
		_gridObj.onCheck = function (index, row) {
			RegionalManagement.reloadRelateList(row);
		};


		_dataGrid = _tableList.datagrid(_gridObj);

		/******************* first dataGrid end ****************/


	/!* 关联机构新增 *!/
	$("#" + _preId + "AddRelated").click(function () {

		if(RegionalManagement.add2){
			BM.showMessage("请选择区域机构!");
			return;
		}
		console.log(RegionalManagement.parentId);
		if(RegionalManagement.parentStatus == 1 && RegionalManagement.parentId != '10000') {
			BM.showMessage("当前选中区域机构已启用，不允许关联其他机构！");
			return;
		}
		RegionalManagement.currentEvent = "addRegional";

		var
			params = {
				url: _InfoUrl2,
				data: {parentId: RegionalManagement.parentId},
				popArea:900,
				callback: function(){
					$.ajax({
						"type": "POST",
						"url": _regUrl,
						"data": {parentId:"", regionId:"",pageNo:0},
						success: function (data) {
							RegionalManagement.rightArr = [];
							RegionalManagement.rightArr = data.rows;
						}
					});
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

		//if(RegionalManagement.parentStatus == 1) {
		//	BM.showMessage("当前选中区域机构已启用，不允许删除其他机构！");
		//	return;
		//}

		var checkedItems = RegionalManagement.dataGrid2.datagrid("getChecked"),
			ids = [];

		if (checkedItems.length == 0) {
			BM.showMessage('请选择要删除的数据!');
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
				height: _height,
				isSecond: true
			},

			_gridObj = dataGridM.init(_dgParams);

		_gridObj.pagination = false;
		_gridObj.onLoadSuccess = function (data) {
			//var columns = RegionalManagement.dataGrid2.datagrid('getColumnFields');
			//var rows = RegionalManagement.dataGrid.datagrid('getChecked');

			if (data.total == 0) {
				RegionalManagement.haveSon = false;
			} else {
				RegionalManagement.haveSon = true;
			}

			dataGridM.loadSuccess(this);
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
			searchHold: CB.SEARCHHOLDER.AREAMANAGEMENT,

			validateSave: function() {
				return true;
			},

			validateBox : function() {

				//中文名长度
				$("input[name='name']").validatebox({
					required:true,
					validType:  ['symbol','length[0,30]','space'],
					missingMessage: "中文名称不可为空！"
				});
				$("input[name='name']").attr('maxlength','30');

				$("input[name='shortName']").validatebox({
					validType:  ['symbol','length[0,15]']
				});
				$("input[name='shortName']").attr('maxlength','15');
				//英文名长度
				$("input[name='enShortName']").validatebox({
					validType:  ['symbol','length[0,20]']
				});
				$("input[name='enShortName']").attr('maxlength','20');
				//英文名长度
				$("input[name='enName']").validatebox({
					validType:  ['symbol','length[0,55]']
				});
				$("input[name='enName']").attr('maxlength','55');

				//fastCode长度
				$("input[name='fastCode']").validatebox({
					validType:  ['symbol','length[0,9]']
				});
				$("input[name='fastCode']").attr('maxlength','9');
				//displayOrder长度
				$("input[name='displayOrder']").validatebox({
					validType:  ['digits','length[0,6]']
				});
				$("input[name='displayOrder']").attr('maxlength','6');
				//memo长度
				$("textarea").validatebox({
					validType: ['symbol','length[0,150]']
				});
				$("textarea").attr('maxlength','150');

				//地址
				$("#address").validatebox({
					validType:  ['symbol','length[0,35]']
				});
				$("#address").attr('maxlength','35');

				$("#enAddress").validatebox({
					validType:  ['symbol','length[0,120]']
				});
				$("#enAddress").attr('maxlength','120');
				//连络人
				$("#contacts").validatebox({
					validType:  ['symbol','length[0,20]']
				});
				$("#contacts").attr('maxlength','20');
				//传真
				$("#fax").validatebox({
					validType:  ['symbol','length[0,25]']
				});
				$("#fax").attr('maxlength','25');
				//备注
				$("#memo").validatebox({
					validType:  ['symbol','length[0,150]']
				});
				$("#memo").attr('maxlength','150');

				//电话
				$("#telephone").validatebox({
					validType:  ['symbol','length[0,20]']
				});
				$("#telephone").attr('maxlength','20');


			},

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

				//if(RegionalManagement.parentStatus == 1) {
				//	BM.showMessage("当前选中区域机构已启用，不允许删除!");
				//	return;
				//}

				this.deleteRow(index,rowData,params);
				
			},

			deleteRelatedAjax: function(data,callback) {

				$.ajax({
					"url": RegionalManagement.addDelBatUrl,
					"type": "POST",
					data: data,
					"success": function (data) {
						//BM.resolutionData(data);
						if (BM.resolutionData(data)) {
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

					url: _regUrl,
					method: 'POST',
					queryParams: {parentId:RegionalManagement.parentId, regionId: -1},
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
					onLoadSuccess: function(data) {

					}
				});
			},

			changeStatusEx: function(index,rowData) {

				var params = {
					logParent: true
				};
				this.changeStatus(index,rowData,params);

			},

			changeRelatedStatus: function(index, rowData) {

				//if(RegionalManagement.parentStatus == 1) {
				//	BM.showMessage("当前选中区域机构已启用，不允许修改状态！");
				//	this.dataGrid2.datagrid('refreshRow', index);
				//	return;
				//}

				var
					params ={
						dataGrid: this.dataGrid2
					};

				this.changeStatus(index,rowData,params);


			},

			deleteRowEx: function(index,rowData){

				if(RegionalManagement.haveSon){
					BM.showMessage('当前选中记录有关联机构，不允许删除！');
					return;
				}

				this.deleteRow(index,rowData);

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
					height:30,
					onClick:function(node){
						$("#regionId").val(node.id);
						$("#regionName").val(node.text);
						var queryItem = ["regionName"],
							searchStr = [$("#relatedSearchStr").val(),node.text];
						BM.localQuery(RegionalManagement.rightArr,searchStr,queryItem,true);

						//$("#addCheckProjectRight").datagrid("reload", {
						//	parentId: RegionalManagement.parentId,
						//	regionId: $("#regionId").val(),
						//	searchStr: $.trim($("#relatedSearchStr").val()),
						//	status: 1
						//})
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
					memo: rowData.memo,
					id: rowData.stringId
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
	var _preId = RegionalManagement.preId;
	RegionalManagement.init();
	 //deleteBatch
	$("#" + _preId + "DeleteBatch").unbind();
	$("#" + _preId + "DeleteBatch").on("click",function() {

		if(RegionalManagement.haveSon){
			BM.showMessage('当前选中记录有关联机构，不允许删除！');
			return;
		}
		RegionalManagement.deleteBatch();
	});
});

/**
 * 中心仪器信息
 * Created by chenshuxian on 2016/03/24
 */

var Instruments = (function($){

	/* START render basicModule */
	Instruments = Object.create(BasicModule);
	Instruments.searchObj = function(preId) {

		return {
			searchStr: $.trim($("#" + preId + "SearchStr").val()),
			searchStatus: $("#" + preId + "Status").val(),
			searchSort: $("#" + preId + "Sort").val(),
			searchFrontClassName: $("#" + preId + "frontClass").val(),
			orgId: typeof Instruments.orgId == "undefined" ? -1 : Instruments.orgId
		};

	}

	var
		_preId = CB.PREID.II,
		_tableList =  $("#" + _preId + "List"),
		_hideCols = [],	//要穩藏的欄位
		_data = Instruments.searchObj(_preId),
		_module = "Instruments",
		_focusId = "editName",
		_popArea = 480,
		_delBatUrl = ctx + "/local_inst/instruments/instrumentsDelete",
		_updateUrl = ctx + "/local_inst/instruments/instrumentsEdit",
		_addUrl = ctx + "/local_inst/instruments/instrumentsAdd",
		_existUrl = ctx + "/local_inst/instruments/instrumentsIfExisted",
		_pageListUrl = ctx + "/local_inst/instruments/instrumentsList",
		_instCtrUrl =  ctx + "/local_inst/instruments/instrumentsCtrList",
		_instCtrItemUrl =  ctx + "/local_inst/instruments/instrumentsCtrItemList",
		_instCtrGermUrl =  ctx + "/local_inst/instruments/instrumentsCtrGermList",
		_instCtrAntiUrl =  ctx + "/local_inst/instruments/instrumentsCtrAntiList",
		_selectOrgUrl = ctx + "/local_inst/instruments/selectOrg",
		_instAddShUrl = ctx + "/local_inst/instruments/instAdd",
		_instAddUrl = ctx + "/local_inst/instruments/instrumentsCtrAdd",
		_InfoUrl = ctx + "/local_inst/instruments/instrumentsAddPage",
		_changeStatusUrl =  ctx + "/local_inst/instruments/instrumentsStatusUpdate",
		_paramsInfoUrl = ctx + "/local_inst/instruments/paramsInfo",
		_paramsEditUrl = ctx + "/local_inst/instruments/instrParamsEdit",
		_orgTypeId = 50,
		_showAuthrized = $("#iishowAuthrized").val()!="true"?false:true,
		_statusAuthrized = $("#iistatusAuthrized").val()!="true"?false:true,
		_editAuthrized = $("#iieditAuthrized").val()!="true"?false:true,
		_deleteAuthrized = $("#iideleteAuthrized").val()!="true"?false:true,
		_copyAddAuthrized = $("#iicopyAddAuthrized").val()!="true"?false:true,
		_settingAuthrized = $("#iisettingAuthrized").val()!="true"?false:true,

	/* START dataGrid 生成*/
		_dgParams = {
			url:_pageListUrl,
			data:_data,
			module:_module,
			hideCols:_hideCols,
			tableList:_tableList,
			preId:_preId
		};

		var
			_gridObj = dataGridM.init(_dgParams),
			// render dataGrid
			_dataGrid = _tableList.datagrid(_gridObj),

			//仪器库添加右边DG控制
			//若TYPEID = 1 才显示细菌和抗生素DG
			_instRightControl = function(typeId,params) {

				console.log("typeId:"+typeId);
				if(typeId == 1){
					$("#instCtrGermList").parents(".vertical-space").show();
					$("#instCtrAntiList").parents(".vertical-space").show();
					$("#instCtrGermList").datagrid("reload",params);
					$("#instCtrAntiList").datagrid("reload",params);
				}else{
					$("#instCtrGermList").parents(".vertical-space").hide();
					$("#instCtrAntiList").parents(".vertical-space").hide();
				}
			},

			//仪器库添加左DG
			_instCtrList = function() {

				$("#instCtrList").datagrid({
					url: _instCtrUrl,
					method: 'POST',
					height: 400,
					fitColumns: true,
					striped: true,
					fit: false,
					checkOnSelect: false,
					selectOnCheck: true,
					columns: [[
						{field : "ck", checkbox : true, width : 30},
						{title : "编码", field: 'codeNo', width : 60},
						{title : "仪器名称", field : 'name', width : 60},
						{title : "仪器型号", field : 'model', width : 60}
					]],
					autoRowHeight: true,
					pagination : true,
					pageSize : 20,
					onLoadSuccess: function(){
						var rowData = $(this).datagrid('getData').rows[0],
							params;
							params = {searchStr: rowData.stringId};
							Instruments.searchStrId = params;

						$("#frontClassName").val(rowData.frontClassName);
						$("#className").val(rowData.className);
						//reload DG1,2,3
						_instRightControl(rowData.typeId,params);
						$("#instCtrItemList").datagrid("reload",params);

						dataGridM.loadSuccess(this);

					},
					onClickRow: function(index,row) {
						dataGridM.clickRow.call(this, index,row);
						var params = {
							searchStr: row.stringId
						}

						$("#frontClassName").val(row.frontClassName);
						$("#className").val(row.className);
						_instRightControl(row.typeId,params);
						$("#instCtrItemList").datagrid("reload",params);
						//$("#instCtrGermList").datagrid("reload",params);
						//$("#instCtrAntiList").datagrid("reload",params);
					}
				});

			},
			//仪器库添加右DG1
			_instCtrItemList = function() {

				$("#instCtrItemList").datagrid({
					url: _instCtrItemUrl,
					method: 'POST',
					height:150,
					fitColumns: true,
					striped: true,
					fit: false,
					columns: [[
						{title : "达安标准码", field: 'itemCodeNo', width : 80},
						{title : "项目名称", field : 'itemName', width : 80},
						{title : "英文简称", field : 'itemEnShortName', width : 80},
						{title : "通道码", field : 'channelCode', width : 80},
						{title : "单位", field : 'unit', width : 80},
						{title : "默认标本类型", field : 'itemSampleTypeName', width : 80}
					]],
					autoRowHeight: true
				});

			},
			//仪器库添加右DG2
			_instCtrGermList = function() {

				$("#instCtrGermList").datagrid({
					url: _instCtrGermUrl,
					method: 'POST',
					height:150,
					fitColumns: true,
					striped: true,
					fit: false,
					columns: [[
						{title : "编码", field: 'micsCodeNo', width : 120},
						{title : "细菌名称", field : 'micsName', width : 120},
						{title : "通道码", field : 'channelCode', width : 120}
					]],
					autoRowHeight: true
				});

			},
			//仪器库添加右DG3
			_instCtrAntiList = function() {

				$("#instCtrAntiList").datagrid({
					url: _instCtrAntiUrl,
					method: 'POST',
					height:150,
					fitColumns: true,
					striped: true,
					fit: false,
					columns: [[
						{title : "编码", field: 'micsCodeNo', width : 120},
						{title : "抗生素名称", field : 'micsName', width : 120},
						{title : "通道码", field : 'channelCode', width : 120}
					]],
					autoRowHeight: true
				});

			},

			_checkOrg = function() {
				if(!Instruments.orgId){
					BM.showMessage("请先选择机构");
					return false;
				}
				return true;
			}

	//从仪器库添加
	$("#" + _preId + "Add2").on("click",function() {

		if(_checkOrg()) {

			var params = {
				url: _instAddShUrl,
				callback: function () {
					_instCtrList();
					_instCtrItemList();
					_instCtrGermList();
					_instCtrAntiList();
				},
				popArea: 900,
				focusId: "searchStr"
			};
			Instruments.commonPop(params);

		}
	})



	// 前台通讯类
	$("." + _preId + "-frontClass-selector li").on("click", function () {
		if(_checkOrg()) {

			$("#" + _preId + "frontClassSpan").html($(this).html());
			$("." + _preId + "-frontClass-selector li.selected").removeClass("selected");
			var flg = $(this).is('.selected');
			$(this).addClass(function () {
				return flg ? '' : 'selected';
			})

			var val = $(this).attr("el-value");
			$("#" + _preId + "frontClass").val(val);

			Instruments.searchGrid();

		}
	});

	/* 选择机构 */
	$("#" + _preId + "SelectOrg").click(function () {
		var
			url = _selectOrgUrl,
			callback = function () {
				Instruments.tempOrgId = Instruments.orgId;
				Instruments.tempOrgName = Instruments.orgName;
				//$("#" + Instruments.preId + "OrgSearchStr").focus();
				$("#" + Instruments.preId + "OrgList").datagrid({
					url: ctx + "/local_inst/instruments/centerOrgPageList",
					method: 'POST',
					queryParams: "",
					height: ($(window).height() < 700) ? 400 : 400,
					fitColumns : true,
					striped : true,
					checkOnSelect : false,
					onClickCell: function(index, field){

						var rows = $("#" + _preId + "OrgList").datagrid("getData").rows[index];
							Instruments.orgId = rows.stringId;
							Instruments.orgName = rows.name;

						$("#"+Instruments.preId+"OrgPop input[type='radio']:eq("+index+")").attr("checked",true);
						//$("input[type='radio']:eq(" + index + ")").click();
					},
					columns:
						[
							[
								{
									field : 'idString',
									width: 10,
									formatter : function(value, row, index) {
										return "<input type='radio' datagrid-row-index='"+index+"' name='instrument'>";
									}
								},
								{title: "编码", field: 'codeNo', width: 50},
								{title: "中文名称", field: 'name', flex: 1, width: 50},
								{title: "地区", field: 'regionName', width: 50}
							]
						],
					autoRowHeight: false,
					pagination: true
				});
			},
			params = {
				url: url,
				callback: callback,
				popArea: 600,
				focusId: _preId + "OrgSearchStr"
			};

		Instruments.commonPop(params);

	});


	$.extend(Instruments,{

		preId:_preId,
		module:_module,
		//设定pop弹出框的大小
		popArea: _popArea,
		focusId: _focusId,
		tableList:_tableList,
		/*START url 定義*/
		delBatUrl: _delBatUrl,
		updateUrl: _updateUrl,
		addUrl: _addUrl,
		existUrl: _existUrl,
		instAddUrl: _instAddUrl,
		delUrl: _delBatUrl,
		changeStatusUrl: _changeStatusUrl,
		InfoUrl: _InfoUrl,
		pageListUrl: _pageListUrl,
		/*END url 定義*/
		dataGrid:_dataGrid,
		orgId: undefined,
		orgTypeId: _orgTypeId,
		showAuthrized: _showAuthrized,
		statusAuthrized: _statusAuthrized,
		editAuthrized: _editAuthrized,
		deleteAuthrized: _deleteAuthrized,
		copyAddAuthrized: _copyAddAuthrized,
		settingAuthrized: _settingAuthrized,
		addreload:{
			searchStr: $.trim($("#" + _preId + "SearchStr").val()),
			searchStatus: $("#" + _preId + "Status").val(),
			searchSort: 2,
			searchFrontClassName: $("#" + _preId + "frontClass").val(),
			orgId: typeof Instruments.orgId == "undefined" ? -1 : Instruments.orgId
		},
		updatereload: {
			searchStr: $.trim($("#" + _preId + "SearchStr").val()),
			searchStatus: $("#" + _preId + "Status").val(),
			searchSort: $("#" + _preId + "Sort").val(),
			searchFrontClassName: $("#" + _preId + "frontClass").val(),
			orgId: typeof Instruments.orgId == "undefined" ? -1 : Instruments.orgId
		},


		validateSave: function() {
			return true;
		},

		validateBox: function() {

			$("input[name='name']").validatebox({
				required:true,
				validType:  ['symbol','length[0,30]','space'],
				missingMessage: "仪器名称为空，请重新输入！"
			});
			$("input[name='name']").attr('maxlength','30');
			$("#model").validatebox({
				required:true,
				validType:  ['symbol','length[0,50]','space'],
				missingMessage: "仪器型号为空，请重新输入！"
			});
			$("#model").attr('maxlength','50');
			$("#typeId").validatebox({
				required:true,
				validType: 'selectValueRequired["#typeId"]',
				missingMessage: "仪器类型为空，请重新输入！"
			});

		},

		deleteRowEx: function(index,rowData) {

			var params = {
				data: {ids:rowData.stringId},
				url: _delBatUrl
			};

			Instruments.deleteRow(index,rowData,params);
		},

		changeStatusEx: function(index,rowData){

			var
				data = {
					id: rowData.stringId,
					status: rowData.status
				},
				params = {
					data: data
				};

			this.changeStatus(index,rowData,params);

		},

		editCallBack: function() {

			var rowData = BasicModule.rowData;

			$("#InfoForm").form("load", {
				name: rowData.name,
				id: rowData.stringId,
				model: rowData.model,
				codeNo: rowData.codeNo,
				opType: 'edit'
			});
			$("#typeId").val(rowData.typeId);
			$("#spanEditCodeNo").html(rowData.codeNo);

		},

		copyCallBack: function() {
			var rowData = BasicModule.rowData;
			$("#InfoForm").form("load", {
				name: rowData.name,
				id: rowData.stringId,
				model: rowData.model,
				codeNo: rowData.codeNo,
				opType: 'copy'
			});
			$("#typeId").val(rowData.typeId);
			$("#orgId").val(Instruments.orgId);
			$("#spanEditCodeNo").html(rowData.codeNo);
		},

		showCallBack: function() {


		},

		addCallBack: function() {
			$("#orgId").val(Instruments.orgId);
		},

		showParamsInfo: function(rowData){

			var params ={
				url: _paramsInfoUrl,
				data: {id:rowData.stringId},
				popArea: 720,
				callback: function() {
					$("#comPort").val($("#comPort").data('val'));
					$("#transferMode").val($("#transferMode").data('val'));
					$("#protocol").val($("#protocol").data('val'));
					$("#baudRate").val($("#baudRate").data('val'));
					$("#dataBit").val($("#dataBit").data('val'));
					$("#stopBit").val($("#stopBit").data('val'));
					$("#parityBit").val($("#parityBit").data('val'));
					$("#boxBarcode").val($("#boxBarcode").data('val'));

					// 需要回应
					if ($("#isRespond").val() == '1') {
						$("#isRespondCheck").attr("checked", 'true');
					}
					// DTR
					if ($("#isDtr").val() == '1') {
						$("#isDtrCheck").attr("checked", 'true');
					}
					// RTS
					if ($("#isRts").val() == '1') {
						$("#isRtsCheck").attr("checked", 'true');
					}

					$("form input").attr("readonly","readonly");
					$("select").attr("disabled","disabled");
					$("#editBtn").hide();
				}
			}

			Instruments.commonPop(params);
		},

		//通讯设定
		editParamsInfo: function(rowData) {
			var status = rowData.status;
		if (status == true) {
			BM.showMessage("当前选中记录已启用，不允许编辑通讯参数!");
			return;
		}
			var params ={
				url: _paramsInfoUrl,
				data: {id:rowData.stringId},
				popArea: 720,
				callback: function() {
					$("#comPort").val($("#comPort").data('val'));
					$("#transferMode").val($("#transferMode").data('val'));
					$("#protocol").val($("#protocol").data('val'));
					$("#baudRate").val($("#baudRate").data('val'));
					$("#dataBit").val($("#dataBit").data('val'));
					$("#stopBit").val($("#stopBit").data('val'));
					$("#parityBit").val($("#parityBit").data('val'));
					$("#boxBarcode").val($("#boxBarcode").data('val'));

					// 需要回应
					if ($("#isRespond").val() == '1') {
						$("#isRespondCheck").attr("checked", 'true');
					}
					// DTR
					if ($("#isDtr").val() == '1') {
						$("#isDtrCheck").attr("checked", 'true');
					}
					// RTS
					if ($("#isRts").val() == '1') {
						$("#isRtsCheck").attr("checked", 'true');
					}
				}
			}

			Instruments.commonPop(params);

		},

		updateParams: function() {
			//防止重复提交
			$("#editBtn").attr("disabled", true);

			formTextTrim("InfoForm");
			$("#isRespond").val(0);
			$("#isDtr").val(0);
			$("#isRts").val(0);

			$("input[name='checkboxInst']:checked").each(function(){
				//alert(this.value);
				$("#"+ this.value).val(1);
			});

			// 修改
			$.ajax({
				url: _paramsEditUrl,
				type: "POST",
				data:$("#InfoForm").serialize(),
				success: function(data) {
					resolutionData(data);
					$("#ctrDictInfoModal").hide();
				}
			});
		}

	});


	return Instruments;

}(jQuery));

$(function(){
	var _preId = CB.PREID.II;
	Instruments.init();

	$("#" + _preId + "Add").unbind();
	$("#" + _preId + "Add").on("click",function() {
		//未选择机构
		if(!Instruments.orgId){
			BM.showMessage("请选择机构");
			return;
		}
		Instruments.addPop();
	});
});
//var ii_canStore = true;    			// 控制重复提交
//var ii_g_status = 1;  	   			// 状态是否是可用   0-停用    1-启用
//var ii_sort = "0";		   			// 默认按顺序号升序
//var ii_searchStr;		   			// 搜索内容
//var ii_status = "";		   			// 搜索状态
//var ii_FrontClassName="";			//前台通信类
//var ii_mechanismName="";			//机构名称
//var ii_optType;			   			// 操作类型（0新增、1编辑、2复制新增）
//var ii_currentIndex;	   			// 当前选中行
//var ii_instrumentsList;    			// 仪器列表的datagrid
//var ii_instrumentsCtrList;  		// （从仪器库添加）仪器列表的datagrid
//var ii_instrumentsCtrItemList;  	// （从仪器库添加）仪器项目列表的datagrid
//var ii_instrumentsCtrGermList;  	// （从仪器库添加）仪器细菌列表的datagrid
//var ii_instrumentsCtrAntiList;  	// （从仪器库添加）仪器抗生素列表的datagrid
//var ii_mechanismSelectList;//机构选择列表
//var ii_addFromCTR_searchStr = "";		// （从仪器库添加）仪器列表的搜索条件：搜索内容
//var ii_addFromCTR_frontClassName = "";	// （从仪器库添加）仪器列表的搜索条件：前台通讯类
//var showAuthrized;   // 通讯参数查看权限
//var statusAuthrized;   // 状态启用停用权限
//var editAuthrized;    // 编辑权限
//var deleteAuthrized;  // 删除权限
//var copyAddAuthrized;  // 复制添加权限
//var settingAuthrized;  // 通讯设置权限
//
//$(function() {
//	ii_instrumentsList = $('#ii_instrumentTable');
//	ii_instrumentsCtrList = $('#ii_instrumentCtrTable');
//	ii_instrumentsCtrItemList = $('#ii_instrumentCtrItemTable');
//	ii_instrumentsCtrGermList = $('#ii_instrumentCtrGermTable');
//	ii_instrumentsCtrAntiList = $('#ii_instrumentCtrAntiTable');
//	ii_mechanismSelectList= $('#ii_mechanismSelectList');
//	showAuthrized = $("#ii_showAuthrized").val()!="true"?false:true;
//	statusAuthrized = $("#ii_statusAuthrized").val()!="true"?false:true;
//	editAuthrized = $("#ii_editAuthrized").val()!="true"?false:true;
//	deleteAuthrized = $("#ii_deleteAuthrized").val()!="true"?false:true;
//	copyAddAuthrized = $("#ii_copyAddAuthrized").val()!="true"?false:true;
//	settingAuthrized = $("#ii_settingAuthrized").val()!="true"?false:true;
//	ii_instrumentsList.datagrid(ii_instrumentsListOpts);
//	ii_instrumentsCtrListOpts.onClickCell=ii_addFromCTR_onClickCell;//绑定onclick事件
//	ii_instrumentsCtrList.datagrid(ii_instrumentsCtrListOpts);
//	ii_instrumentsCtrItemList.datagrid(ii_instrumentsCtrItemListOpts);
//	ii_instrumentsCtrGermList.datagrid(ii_instrumentsCtrGermListOpts);
//	ii_instrumentsCtrAntiList.datagrid(ii_instrumentsCtrAntiListOpts);
//	//绑定机构选择列表开始
//    $(document).on('click', '.J_mechanismList', function() {
//    	ii_mechanismSelectList.datagrid(ii_mechanismSelectListOpt).pagination(ii_defaultPageOpt);
//	});
//    //绑定机构选择列表事件结束
//    //从中心库添加点击事件
//    $(document).on('click', '.J_InstrumentAddFromCTR', ii_showAddFromCtrPop);
//    //添加点击事件
//
//  //  $(document).on('click', '#ii_j_showInstrumentsPop', ii_showInstrumentsPop);
//
//
//	// 中心仪器列表加载完成后选中第一行
//	ii_instrumentsCtrList.datagrid({onLoadSuccess : function(data){
//		if (ii_instrumentsCtrList.datagrid("getData").total > 0) { //如果有数据，选中第一行
//			ii_addFromCTR_onClickCell(0);
//		}
//	}});
//
//	// Main页面初始化查询
////	ii_Search();
//});
//
//
//$(window).on('resize', function() {
//	ii_tableAutoWidth();
//});
//
////自适应表格
//function ii_tableAutoWidth() {
//	var width = ii_instrumentsList.parents('.tabs-panels').width() - 40;
//	ii_instrumentsList.datagrid('resize', {
//		width : width
//	});
//}
//
////搜索仪器列表
//function ii_Search(){
//	ii_searchStr = $("#ii_searchStr").val(); // 设置搜索内容
//	ii_loadInstrumentsList();
//}
//
//// 仪器列表
//function ii_loadInstrumentsList() {
//	var opts = ii_instrumentsList.datagrid("options");
//	opts.url = ctx + "/local_inst/instruments/instrumentsList";
//	opts.pagination=true;
//	var queryParmas = opts.queryParams;
//	queryParmas.searchStr = ii_searchStr;
//	queryParmas.searchSort = ii_sort;
//	queryParmas.searchStatus = ii_status;
//	queryParmas.orgId=$("#ii_mechanismId").val();
//	queryParmas.searchFrontClassName=ii_FrontClassName;
//	ii_instrumentsList.datagrid(opts);
//}
//
//// main页面状态查询
//$(document).on('click', '#ii_j_status > li', function() {
//	// 变化样式
//	$("#ii_j_status > li.selected").removeClass("selected");
//	$(this).addClass("selected");
//	ii_status = $(this).val();
//	// 触发查询
//	ii_loadInstrumentsList();
//});
//
//// main页面排序查询
//$(document).on('click', '#ii_j_sort > li', function() {
//	// 变化样式
//	$("#ii_j_sort > li.selected").removeClass("selected");
//	$(this).addClass("selected");
//	ii_sort = $(this).val();
//	// 触发查询
//	ii_loadInstrumentsList();
//});
////main页面前台通讯类查询
//$(document).on('click', '#ii_j_searchFrontClassName > li', function() {
//	// 变化样式
//	$("#ii_j_searchFrontClassName > li.selected").removeClass("selected");
//	$(this).addClass("selected");
//	ii_FrontClassName = $(this).val();
//	// 触发查询
//	ii_loadInstrumentsList();
//});
//
//// 关闭仪器查看、新增、修改、复制新增页面
//function ii_closeInstrumentsPop(){
//	//先清空页面数据
//	ii_clearInstrumentsInfo();
//	//关掉
//	$("#ii_instrumentInfo").hide();
//	return false;
//}
//
//// clear all
//function ii_clearInstrumentsInfo(){
//	$("#ii_instrumentsForm")[0].reset();
//	$("#ii_id").val("");
//	$("#ii_codeNo").val("");
//	$("#ii_span_codeNo").html("");
//	$("#ii_name").val("");
//	$("#ii_model").val("");
//	$("#ii_labGroupId").combobox('setValue', '');
//	$("#ii_fastCode").val("");
//	$("#ii_sampleTypeId").combobox('setValue', '');
//	$("#ii_reportHeader").val("");
//	$("#ii_rptTemplateId").combobox('setValue', '');
//	$("#ii_rptTemplate2Id").combobox('setValue', '');
//	$("#ii_producer").val("");
//	$("#ii_provider").val("");
//	$("#ii_purchaseDate").datebox('setValue', '');
//	$("#ii_installDate").datebox('setValue', '');
//	$("#ii_maintainer").val("");
//	$("#ii_maintainTel").val("");
//	$("#ii_displayOrder").val("");
//	$("#ii_typeId").combobox('setValue', '');
//}
//
//// 验证保存的必填条件
//function ii_validateInstrumentsSave(){
//	var name = $("#ii_name").val();
//	var model = $("#ii_model").val();
//	var ii_typeId = $("#ii_typeId").combobox('getValue');
////	var sampleTypeId = $("#ii_sampleTypeId").combobox('getValue');
////	var rptTemplateId = $("#ii_rptTemplateId").combobox('getValue');
////	var purchaseDate = $("#ii_purchaseDate").datebox("getValue");
////	var installDate = $("#ii_installDate").datebox("getValue");
//
//	if(name == ""){
//		showMessage("仪器名称为空,请重新输入!");
//		$("#ii_name").focus();
//		return false;
//	}
//	if(model == ""){
//		showMessage("仪器型号为空,请重新输入!");
//		$("#ii_model").focus();
//		return false;
//	}
//	if(ii_typeId == ""){
//		showMessage("仪器类型为空,请重新输入!");
//		$("#ii_typeId").focus();
//		return false;
//	}
//	/*if(sampleTypeId == ""){
//		showMessage("默认标本类型为空,请重新输入!");
//		$("#ii_sampleTypeId").focus();
//		return false;
//	}
//	if(rptTemplateId == ""){
//		showMessage("单列报告模板为空,请重新输入!");
//		$("#ii_rptTemplateId").focus();
//		return false;
//	}
//	if(purchaseDate != "" && !isDate(purchaseDate)){
//		showMessage("购买日期不合法,请重新输入!");
//		$("#ii_purchaseDate").focus();
//		return false;
//	}
//	if(installDate != "" && !isDate(installDate)){
//		showMessage("安装日期不合法,请重新输入!");
//		$("#ii_installDate").focus();
//		return false;
//	}*/
////	if(validateDisplayOrder("ii_displayOrder")){
////		return false;
////	}
//	return true;
//}
//
//// 新增、编辑弹出框(index 行号， optValue 操作类型： 0新增 1编辑 2复制添加)
//function ii_showInstrumentsPop(index, optValue) {
//	var orgId=$("#ii_mechanismId").val();
//	if(null==orgId||orgId==""){
//		showMessage("请先选择机构！");
//		return false;
//	}else{
//		$('#ii_instrumentsForm')[0].reset(); // 清空表单内容
//		ii_optType = optValue;   	 // 标记操作类型，提交时验证
//		if(optValue==2){
//			ii_optType = 0; // 复制添加也是新增
//		}
//		ii_currentIndex = index; 	 // 标记当前操作行，刷新时用到
//
//		if(optValue == 0){  // 新增初始化
//			// 获取编号和最大顺序号
//			$.ajax({
//				"url" : ctx + "/local_inst/instruments/instrumentsCodeDisplayorder",
//				"type" : "POST",
//				data:null,
//				"success" : function(data) {
//					var ckData = data.indexOf("err");
//					if(ckData == -1){
//						var jsonObj = eval('(' + data + ')');
//						$("#ii_codeNo").val(jsonObj.codeNo);
//						$("#ii_span_codeNo").html(jsonObj.codeNo);
//						$("#ii_displayOrder").val(jsonObj.displayOrder);
//						$("#ii_name").focus();
//
//						// 弹出新增界面
//						dialog("ii_instrumentInfo", {
//							width : 600
//						});
//					}else{
//						resolutionData(data);
//					}
//				},
//				"error" : function(data) {
//				}
//			});
//		}else{ // 修改初始化
//			var rowData = ii_instrumentsList.datagrid('getData').rows[index];
//			var id = rowData.idString;
//
//			$.ajax({
//				"url" : ctx + "/local_inst/instruments/instrumentsInfo",
//				"type" : "POST",
//				data:{id:id},
//				"success" : function(data) {
//					var ckData = data.indexOf("err");
//					if(ckData == -1){
//						var jsonObj = eval('(' + data + ')');
//
//						if(optValue==2){
//							// 复制添加
//							// 获取编号和最大顺序号
//							$.ajax({
//								"url" : ctx + "/local_inst/instruments/instrumentsCodeDisplayorder",
//								"type" : "POST",
//								data:null,
//								"success" : function(data) {
//									var ckData = data.indexOf("err");
//									if(ckData == -1){
//										var jsonObj = eval('(' + data + ')');
//										$("#ii_id").val('');
//										$("#ii_codeNo").val(jsonObj.codeNo);
//										$("#ii_span_codeNo").html(jsonObj.codeNo);
//										$("#ii_displayOrder").val(jsonObj.displayOrder);
//									}else{
//										resolutionData(data);
//									}
//								},
//								"error" : function(data) {
//								}
//							});
//						} else {
//							$("#ii_id").val(id);
//							$("#ii_codeNo").val(jsonObj.codeNo);
//							$("#ii_span_codeNo").html(jsonObj.codeNo);
//							$("#ii_displayOrder").val(jsonObj.displayOrder);
//						}
//
//						$("#ii_name").val(jsonObj.name);
//						$("#ii_model").val(jsonObj.model);
//						$("#ii_labGroupId").combobox('setValue', '');
//						$("#ii_labGroupId").combobox('setValue', jsonObj.labGroupIdString+'');
//						$("#ii_fastCode").val(jsonObj.fastCode);
//						$("#ii_sampleTypeId").combobox('setValue', '');
//						$("#ii_sampleTypeId").combobox('setValue', jsonObj.sampleTypeId+'');
//						$("#ii_reportHeader").val(jsonObj.reportHeader);
//						$("#ii_rptTemplateId").combobox('setValue', '');
//						$("#ii_rptTemplateId").combobox('setValue', jsonObj.rptTemplateId+'');
//						$("#ii_rptTemplate2Id").combobox('setValue', '');
//						$("#ii_rptTemplate2Id").combobox('setValue', jsonObj.rptTemplate2IdString+'');
//						$("#ii_producer").val(jsonObj.producer);
//						$("#ii_provider").val(jsonObj.provider);
//						$("#ii_purchaseDate").datebox('setValue', '');
//						$("#ii_purchaseDate").datebox('setValue', jsonObj.purchaseDateString+'');
//						$("#ii_installDate").datebox('setValue', '');
//						$("#ii_installDate").datebox('setValue', jsonObj.installDateString+'');
//						$("#ii_maintainer").val(jsonObj.maintainer);
//						$("#ii_maintainTel").val(jsonObj.maintainTel);
//						$("#ii_typeId").combobox('setValue', '');
//						$("#ii_typeId").combobox('setValue', jsonObj.typeId+'');
//						$("#ii_name").focus();
//
//						// 弹出修改界面
//						dialog("ii_instrumentInfo", {
//							width : 600
//						});
//					}else{
//						resolutionData(data);
//					}
//				},
//				"error" : function(data) {
//					resolutionData(data);
//				}
//			});
//		}
//	}
//
//}
//
//// 新增或者编辑
//function ii_submitInstruments(obj){
//	var orgId=$("#ii_mechanismId").val();
//	if(null==orgId||orgId==""){
//		showMessage("请先选择机构！");
//		return false;
//	}
//	// 防止重复提交
//    if(!ii_canStore){
// 		return;
//    }
//
//	// 验证提交信息
//	if(!ii_validateInstrumentsSave()){
//		return;
//	}
//
//	// 去除空格
//	formTextTrim("ii_instrumentsForm");
//
//	$.ajax({
//		"url" : ctx + "/local_inst/instruments/instrumentsIfExisted",
//		"type" : "POST",
//		data:$("#ii_instrumentsForm").serialize(),
//		"success" : function(data) {
//			if(ii_optType == 0){
//				if(data.indexOf("confirm|") == 0){
//					// 有同名
//					showConfirm(data.substring(8),function(){
//						// 确认继续
//						ii_addInstruments();
//					});
//				} else {
//					// 无同名，确认继续
//					ii_addInstruments();
//				}
//			}else{
//				if(data.indexOf("confirm|") == 0){
//					showConfirm(data.substring(8),function(){
//						ii_editInstruments();  // 提交编辑请求
//					});
//				}else{
//					ii_editInstruments();
//				}
//			}
//		},
//		"error" : function(data) {
//			resolutionData(data);
//		}
//	});
//}
//
//// 新增仪器
//function ii_addInstruments(){
//	ii_canStore = false;
//	$("#ii_id").val(""); // 如果是新增需要清除ID值
//	var orgId=$("#ii_mechanismId").val();
//	$.ajax({
//		"url" : ctx + "/local_inst/instruments/instrumentsAdd",
//		"type" : "POST",
//		data:$("#ii_instrumentsForm").serialize()+"&orgId="+orgId,
//		"success" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		    $("#ii_j_instrumentsSubmitPop").parents('.pop').hide();
//		    bodyScroll();
//		    // 刷新datagrid
//		    ii_instrumentsList.datagrid('reload');
//		    ii_closeInstrumentsPop();
//		},
//		"error" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		}
//	});
//}
//
//// 编辑仪器
//function ii_editInstruments(){
//	ii_canStore = false;
////	var orgId=$("#ii_mechanismId").val();
//	$.ajax({
//		"url" : ctx + "/local_inst/instruments/instrumentsEdit",
//		"type" : "POST",
//		data:$("#ii_instrumentsForm").serialize(),
//		"success" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		    $("#ii_j_instrumentsSubmitPop").parents('.pop').hide();
//		    bodyScroll();
//		    ii_instrumentsList.datagrid('reload');
//		    // 刷新列
//		   /* ii_instrumentsList.datagrid('updateRow',
//		    	{ index: ii_currentIndex,
//		    	row: {
//		    		name: $("#ii_name").val(),
//		    		model: $("#ii_model").val(),
//		    		labGroupName: $("#ii_labGroupId").combobox('getText'),
//		    		rptTemplateName: $("#ii_rptTemplateId").combobox('getText'),
//		    		rptTemplate2Name: $("#ii_rptTemplate2Id").combobox('getText')
//		    	}
//		    });*/
//		    ii_closeInstrumentsPop();
//		},
//		"error" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		}
//	});
//}
//
//// 启用、停用状态
//function ii_modifyStatus(index){
//	var rowData = ii_instrumentsList.datagrid('getData').rows[index];
//	var id = rowData.idString;
//	var status= rowData.status;
//	var newStatus = 0; // 默认为停用
//	if(status == 0){   // 当前状态为停用的时候，修改为启用，刷新数据用到
//		newStatus = 1;
//	}
//
//	$.ajax({
//		"url" : ctx + "/local_inst/instruments/instrumentsStatusUpdate",
//		"type" : "POST",
//		data:{id:id, status:status},
//		"success" : function(data) {
//			resolutionData(data);
//			ii_instrumentsList.datagrid('updateRow',{ index: index, row: { status: newStatus} }); // 刷新列
//		},
//		"error" : function(data) {
//			resolutionData(data);
//		}
//	});
//}
//
//// 删除仪器信息
//function ii_deleteInstruments(index) {
//	var rowData = ii_instrumentsList.datagrid('getData').rows[index];
//	var id = rowData.idString;
//	var status = rowData.status;
//
//	showConfirm('是否删除所选中的记录？',function(){
//		$.ajax({
//			"url" : ctx + "/local_inst/instruments/instrumentsDelete",
//			"type" : "POST",
//			data: {ids:id},
//			"success" : function(data) {
//				resolutionData(data);
//				// 刷新datagrid
//			    ii_instrumentsList.datagrid('reload');
//			},
//			"error" : function(data) {
//				resolutionData(data);
//			}
//		});
//	});
//}
//
//// 选中删除
//function ii_checkedDelRow() {
//	var checkedItems = ii_instrumentsList.datagrid('getChecked');
//	var ids = [];
//	var userNames = [];
//
//	$.each(checkedItems, function(index, item){
//		ids.push(item.idString);
//	});
//
//	if(ids == ''){
//		showMessage("请选择要删除的数据！");
//		return false;
//	}
//
//	showConfirm('是否删除所选中的记录？',function(){
//		$.ajax({
//			"url" : ctx + "/local_inst/instruments/instrumentsDelete",
//			"type" : "POST",
//			data: {ids:ids.join(",")},
//			"success" : function(data) {
//				resolutionData(data);
//				// 刷新datagrid
//			    ii_instrumentsList.datagrid('reload');
//			},
//			"error" : function(data) {
//				resolutionData(data);
//			}
//		});
//	});
//}
//
////新增、编辑通讯参数弹出框(index 行号， optValue 操作类型： 0查看 1编辑)
//function ii_showInstrParamsPop(index, optValue) {
//	$('#ii_instrParamsForm')[0].reset(); // 清空表单内容
//
//	var rowData = ii_instrumentsList.datagrid('getData').rows[index];
//	var id = rowData.idString;
//
//	$.ajax({
//		"url" : ctx + "/local_inst/instruments/instrParamsInfo",
//		"type" : "POST",
//		data:{id:id},
//		"success" : function(data) {
//			var ckData = data.indexOf("err");
//			if(ckData == -1){
//				var jsonObj = eval('(' + data + ')');
//				$("#ii_instrumentId").val(id);
//				$("#ii_frontClassName").val(jsonObj.frontClassName);
//				$("#ii_className").val(jsonObj.className);
//				$("#ii_comPort").combobox('setValue', '');
//				$("#ii_comPort").combobox('setValue', jsonObj.comPort+'');
//				$("#ii_transferMode").combobox('setValue', '');
//				$("#ii_transferMode").combobox('setValue', jsonObj.transferMode+'');
//				$("#ii_protocol").combobox('setValue', '');
//				$("#ii_protocol").combobox('setValue', jsonObj.protocol+'');
//				$("#ii_baudRate").combobox('setValue', '');
//				$("#ii_baudRate").combobox('setValue', jsonObj.baudRate+'');
//				$("#ii_dataBit").combobox('setValue', '');
//				$("#ii_dataBit").combobox('setValue', jsonObj.dataBit+'');
//				$("#ii_stopBit").combobox('setValue', '');
//				$("#ii_stopBit").combobox('setValue', jsonObj.stopBit+'');
//				$("#ii_parityBit").combobox('setValue', '');
//				$("#ii_parityBit").combobox('setValue', jsonObj.parityBit+'');
//				$("#ii_endCode").val(jsonObj.endCode);
//				if(jsonObj.isRespond==1){
//					$("#ii_chk_isRespond").attr("checked", true);
//					$("#ii_isRespond").val('1');
//				}else{
//					$("#ii_chk_isRespond").attr("checked", false);
//					$("#ii_isRespond").val('0');
//				}
//				$("#ii_respondingCode").val(jsonObj.respondingCode);
//				$("#ii_respondCode").val(jsonObj.respondCode);
//				$("#ii_serverIp").val(jsonObj.serverIp);
//				$("#ii_port").val(jsonObj.port);
//				$("#ii_intervals").val(jsonObj.intervals);
//				$("#ii_virutalInstrId").combobox('setValue', '');
//				$("#ii_virutalInstrId").combobox('setValue', jsonObj.virutalInstrIdString+'');
//				$("#ii_virutalType").combobox('setValue', '');
//				$("#ii_virutalType").combobox('setValue', jsonObj.virutalType+'');
//				$("#ii_boxBarcode").combobox('setValue', '');
//				$("#ii_boxBarcode").combobox('setValue', jsonObj.boxBarcode+'');
//				if(jsonObj.isDtr==1){
//					$("#ii_chk_isDtr").attr("checked", true);
//					$("#ii_isDtr").val('1');
//				}else{
//					$("#ii_chk_isDtr").attr("checked", false);
//					$("#ii_isDtr").val('0');
//				}
//				if(jsonObj.isRts==1){
//					$("#ii_chk_isRts").attr("checked", true);
//					$("#ii_isRts").val('1');
//				}else{
//					$("#ii_chk_isRts").attr("checked", false);
//					$("#ii_isRts").val('0');
//				}
//
//				if(optValue == 0){
//					// 查看
//					ii_disableInstrParams();
//				}else{
//					// 修改初始化
//					ii_enableInstrParams();
//					$("#ii_frontClassName").focus();
//				}
//
//				// 弹出修改界面
//				dialog($("#ii_j_showInstrParamsPop").attr('data-show'), {
//					width : 600
//				});
//			}else{
//				resolutionData(data);
//			}
//		},
//		"error" : function(data) {
//			resolutionData(data);
//		}
//	});
//}
//
////验证通讯参数保存的必填条件
//function ii_validateInstrParamsSave(){
//	var intervals = $("#ii_intervals").val();
//	var transferMode = $("#ii_transferMode").combobox('getValue');
//	var virutalInstrId = $("#ii_virutalInstrId").combobox('getValue');
//	var virutalType = $("#ii_virutalType").combobox('getValue');
//
//	if(transferMode == ""){
//		showMessage("通信模式为空,请重新输入!");
//		$("#ii_transferMode").focus();
//		return false;
//	}
//	if(intervals != "" && isNaN(intervals)){
//		showMessage("解析间隔时间必须为数字,请重新输入!");
//		$("#ii_intervals").focus();
//		return false;
//	}
//	if(virutalInstrId != "" && virutalType==""){
//		showMessage("虚拟仪器不为空,请选择虚拟仪器方式!");
//		$("#ii_virutalType").focus();
//		return false;
//	}
//	return true;
//}
//
////编辑通讯参数
//function ii_submitInstrParams(obj){
//	// 防止重复提交
//    if(!ii_canStore){
// 		return;
//    }
//
//	// 验证提交信息
//	if(!ii_validateInstrParamsSave()){
//		return;
//	}
//
//	// 去除空格
//	formTextTrim("ii_instrParamsForm");
//
//	// 重新获取匹配checkbox值
//	if($("#ii_chk_isRespond").is(":checked")){
//		$("#ii_isRespond").val("1");
//	}else{
//		$("#ii_isRespond").val("0");
//	}
//	if($("#ii_chk_isDtr").is(":checked")){
//		$("#ii_isDtr").val("1");
//	}else{
//		$("#ii_isDtr").val("0");
//	}
//	if($("#ii_chk_isRts").is(":checked")){
//		$("#ii_isRts").val("1");
//	}else{
//		$("#ii_isRts").val("0");
//	}
//
//	$.ajax({
//		"url" : ctx + "/local_inst/instruments/instrParamsEdit",
//		"type" : "POST",
//		data:$("#ii_instrParamsForm").serialize(),
//		"success" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		    $("#ii_j_instrParamsSubmitPop").parents('.pop').hide();
//		    ii_closeInstrParamsPop();
//		},
//		"error" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		}
//	});
//}
//
////clear all
//function ii_closeInstrParamsPop(){
//	//先清空页面数据
//	ii_clearInstrParamsInfo();
//	//关掉
//	$("#ii_instrParamsInfo").hide();
//	return false;
//}
//function ii_clearInstrParamsInfo(){
//	$("#ii_instrParamsForm")[0].reset();
//	$("#ii_instrumentId").val('');
//	$("#ii_frontClassName").val('');
//	$("#ii_className").val('');
//	$("#ii_comPort").combobox('setValue', '');
//	$("#ii_transferMode").combobox('setValue', '');
//	$("#ii_protocol").combobox('setValue', '');
//	$("#ii_baudRate").combobox('setValue', '');
//	$("#ii_dataBit").combobox('setValue', '');
//	$("#ii_stopBit").combobox('setValue', '');
//	$("#ii_parityBit").combobox('setValue', '');
//	$("#ii_endCode").val('');
//	$("#ii_isRespond").attr("checked", false);
//	$("#ii_respondingCode").val('');
//	$("#ii_respondCode").val('');
//	$("#ii_serverIp").val('');
//	$("#ii_port").val('');
//	$("#ii_intervals").val('');
//	$("#ii_virutalInstrId").combobox('setValue', '');
//	$("#ii_virutalType").combobox('setValue', '');
//	$("#ii_boxBarcode").combobox('setValue', '');
//	$("#ii_isDtr").attr("checked", false);
//	$("#ii_isRts").attr("checked", false);
//}
//
//// disabled
//function ii_disableInstrParams(){
//	$("#ii_frontClassName").attr("disabled",true);
//	$("#ii_className").attr("disabled",true);
//	$("#ii_comPort").combobox('disable');
//	$("#ii_transferMode").combobox('disable');
//	$("#ii_protocol").combobox('disable');
//	$("#ii_baudRate").combobox('disable');
//	$("#ii_dataBit").combobox('disable');
//	$("#ii_stopBit").combobox('disable');
//	$("#ii_parityBit").combobox('disable');
//	$("#ii_endCode").attr("disabled",true);
//	$("#ii_chk_isRespond").attr("disabled",true);
//	$("#ii_respondingCode").attr("disabled",true);
//	$("#ii_respondCode").attr("disabled",true);
//	$("#ii_serverIp").attr("disabled",true);
//	$("#ii_port").attr("disabled",true);
//	$("#ii_intervals").attr("disabled",true);
//	$("#ii_virutalInstrId").combobox('disable');
//	$("#ii_virutalType").combobox('disable');
//	$("#ii_boxBarcode").combobox('disable');
//	$("#ii_chk_isDtr").attr("disabled",true);
//	$("#ii_chk_isRts").attr("disabled",true);
//	$("#ii_j_instrParamsSubmitPop").hide();
//}
//
//// enable
//function ii_enableInstrParams(){
//	$("#ii_frontClassName").attr("disabled",false);
//	$("#ii_className").attr("disabled",false);
//	$("#ii_comPort").combobox('enable');
//	$("#ii_transferMode").combobox('enable');
//	$("#ii_protocol").combobox('enable');
//	$("#ii_baudRate").combobox('enable');
//	$("#ii_dataBit").combobox('enable');
//	$("#ii_stopBit").combobox('enable');
//	$("#ii_parityBit").combobox('enable');
//	$("#ii_endCode").attr("disabled",false);
//	$("#ii_chk_isRespond").attr("disabled",false);
//	$("#ii_respondingCode").attr("disabled",false);
//	$("#ii_respondCode").attr("disabled",false);
//	$("#ii_serverIp").attr("disabled",false);
//	$("#ii_port").attr("disabled",false);
//	$("#ii_intervals").attr("disabled",false);
//	$("#ii_virutalInstrId").combobox('enable');
//	$("#ii_virutalType").combobox('enable');
//	$("#ii_boxBarcode").combobox('enable');
//	$("#ii_chk_isDtr").attr("disabled",false);
//	$("#ii_chk_isRts").attr("disabled",false);
//	$("#ii_j_instrParamsSubmitPop").show();
//}
//
////从仪器库添加弹出框
//function ii_showAddFromCtrPop(){
//	var orgId=$("#ii_mechanismId").val();
//	if(null==orgId||orgId==""){
//		showMessage("请先选择机构！");
//		return false;
//	}else{
//		// 弹出新增界面
//		dialog("ii_addInstrumentsFromCTR", {
//			width : 1000
//		});
//
//		// 查询仪器库列表
//		ii_addFromCTR_Search();
//	}
//
//}
//
////搜索仪器列表
//function ii_addFromCTR_Search(){
//	// Query
//	ii_addFromCTR_searchStr = $("#ii_addFromCTR_searchStr").val(); // 设置搜索内容
//	ii_addFromCTR_frontClassName = $("#ii_addFromCTR_frontClassName").combobox('getValue'); // 设置搜索前台通讯类
//	ii_loadInstrumentsCtrList();
//}
//
//// （从仪器库添加）仪器列表
//function ii_loadInstrumentsCtrList() {
//	var opts = ii_instrumentsCtrList.datagrid("options");
//	opts.url = ctx + "/local_inst/instruments/instrumentsCtrList";
//	var queryParmas = opts.queryParams;
//	queryParmas.searchStr = ii_addFromCTR_searchStr;
//	queryParmas.searchFrontClassName = ii_addFromCTR_frontClassName;
//	ii_instrumentsCtrList.datagrid(opts);
//}
//
//// 点击仪器列表的单元格事件
//function ii_addFromCTR_onClickCell(index) {
//	var rowData = ii_instrumentsCtrList.datagrid('getData').rows[index];
//
//	//触发查询
//	ii_loadInstrumentsCtrItemList(rowData.idString);
//	ii_loadInstrumentsCtrGermList(rowData.idString);
//	ii_loadInstrumentsCtrAntiList(rowData.idString);
//
//	$("#ii_show_addFromCTR_frontClassName").val(rowData.frontClassName);
//	$("#ii_show_addFromCTR_className").val(rowData.className);
//}
//
////（从仪器库添加）仪器项目列表
//function ii_loadInstrumentsCtrItemList(id) {
//	var opts = ii_instrumentsCtrItemList.datagrid("options");
//	opts.url = ctx + "/local_inst/instruments/instrumentsCtrItemList";
//	var queryParmas = opts.queryParams;
//	queryParmas.searchStr = id;
//	ii_instrumentsCtrItemList.datagrid(opts);
//}
////（从仪器库添加）仪器细菌列表
//function ii_loadInstrumentsCtrGermList(id) {
//	var opts = ii_instrumentsCtrGermList.datagrid("options");
//	opts.url = ctx + "/local_inst/instruments/instrumentsCtrGermList";
//	var queryParmas = opts.queryParams;
//	queryParmas.searchStr = id;
//	ii_instrumentsCtrGermList.datagrid(opts);
//}
////（从仪器库添加）仪器抗生素列表
//function ii_loadInstrumentsCtrAntiList(id) {
//	var opts = ii_instrumentsCtrAntiList.datagrid("options");
//	opts.url = ctx + "/local_inst/instruments/instrumentsCtrAntiList";
//	var queryParmas = opts.queryParams;
//	queryParmas.searchStr = id;
//	ii_instrumentsCtrAntiList.datagrid(opts);
//}
//
//// （从仪器库添加）确定按钮
//function ii_addFromCTR_submit(obj){
//	var orgId=$("#ii_mechanismId").val();
//	if(orgId == ''||orgId==null){
//		showMessage("请先选择机构！");
//		return false;
//	}
//	// 防止重复提交
//    if(!ii_canStore){
// 		return;
//    }
//
//    var ids = [];
//
//    var checkedItems = ii_instrumentsCtrList.datagrid('getChecked');
//	$.each(checkedItems, function(index, item){
//		ids.push(item.idString);
//	});
//	if(ids == ''){
//		showMessage("请选择要添加的仪器！");
//		return false;
//	}
//
//	ii_canStore = false;
//	$.ajax({
//		"url" : ctx + "/local_inst/instruments/instrumentsCtrAdd",
//		"type" : "POST",
//		data: {ids:ids.join(","),orgId:orgId},
//		"success" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		    $("#ii_j_addFromCTR_submitPop").parents('.pop').hide();
//		    bodyScroll();
//		    // 刷新datagrid
//		    ii_instrumentsList.datagrid('reload');
//		    ii_closeInstrumentsPop();
//		},
//		"error" : function(data) {
//			ii_canStore = true;
//			resolutionData(data);
//		}
//	});
//}
//function ii_closePop(e){
//	$(e).parents('.pop').hide();
//}
///**.
// * 选择机构页面的“确定”按钮事件
// */
//function ii_mechanismSlt(e){
////	var selectRow = $("#ii_mechanismSelectList input[type='radio']:checked");
//
////	if (selectRow == undefined || selectRow.length <= 0) {
////		showMessage("请先选择一个机构");
////		return;
////	}
////	var index = $(selectRow).attr("datagrid-row-index");
////	var rowData = ii_mechanismSelectList.datagrid('getData').rows[index];
//	var mechanismId = $("#ii_mechanismId").val();
//	var mechanismName = ii_mechanismName;
//	$("#ii_mechanismId").val(mechanismId);
//	$("#ii_mechanismName").text(mechanismName);
//	//关闭窗口
//	ii_closePop(e);
//	//触发查询
//	ii_Search();
//}
//function iir_queryInstruments(){
////	ii_mechanismSelectList.datagrid(ii_mechanismSelectListOpt).pagination(ii_defaultPageOpt);
//
//	var opts = ii_mechanismSelectList.datagrid("options");
//	var queryParmas = opts.queryParams;
//	queryParmas.searchStr = trim($("#ii_mechanismSchStr").val());
//	ii_mechanismSelectList.datagrid(opts);
//}
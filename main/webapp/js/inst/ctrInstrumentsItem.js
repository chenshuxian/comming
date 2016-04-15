/**
 * 中心仪器项目对照
 * Created by chenshuxian
 * 2016/3/22.
 */
var CtrInstrItem = (function($){

	/* START render basicModule */
	CtrInstrItem = Object.create(BasicModule);
	/* END render basicModule */
	var
		_preId = CB.PREID.IRR,
		_tableList =  $("#" + _preId + "List"),
		_tableList2 = $("#" + _preId + "List2"),
		_hideCols = [],	//要穩藏的欄位
		_data = '',
		_module = "CtrInstrItem",
		_focusId = "name",
		_module2 = "CtrInstrItem2",
		_delBatUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemDeleteBatch",
		_delUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeDelete",
		_addUrl =  ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddBatch",
		_editUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeEdit",
		_saveUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemSave",
		_pageListUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemList",
		_existUrl =  ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemIfOverlap",
		_inforUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeInfo",

		_pageListUrl2 = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeList",
		_delBatUrl2 =  ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsRegrangeDeleteBatch",
		_addUrl2 = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd",
		_instrumentUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsList",
		_instrumentsListUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemListMain",
		_optLeftUrl = ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsItemAddLeft',
		_optRightUrl = ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsItemAddRightList',
		_initHeight = CB.HEIGHT,


	/*************** START dataGrid 生成 *********************/

	//第一个 dataGrid
		_dgParams = {
			url:_pageListUrl,
			data:_data,
			module:_module,
			hideCols:_hideCols,
			tableList:_tableList,
			preId:_preId,
			height:_initHeight,
			isSecond:true
		},

		_gridObj = dataGridM.init(_dgParams),

		_upgradeObj = {
			//pagination: false,
			onLoadSuccess: function(){
				var rows = CtrInstrItem.dataGrid.datagrid("getRows"),
					length = rows.length;

				if (length == 0) {
					CtrInstrItem.dataGrid2.datagrid('loadData', {total: 0, rows: []});//清空下方DateGrid
				} else {
					_reloadDG2(rows[0]);
				}

			},
			onClickRow: function(index, row) {
				dataGridM.clickRow.call(this, index,row);
				_reloadDG2(row);
			},
			onCheck: function(index, row) {
				_reloadDG2(row);
			},
			onCellEdit: function(index,field,value){
				//记录最后一个编辑时的index
				CtrInstrItem.frozeCell = index;
				CtrInstrItem.frozeField = field;
			},
			loadFilter: function(data){
				var params = {total:0,rows:[]};
				if(data.rows)
					return data;
				else
					return params;
			}
		};

	_gridObj = $.extend({},_gridObj,_upgradeObj);

	var
		_dataGrid = _tableList.datagrid(_gridObj).datagrid("enableCellEditing"),

		_data2 = {
			testItemId: CtrInstrItem.testItemId,
			instrumentId: CtrInstrItem.instrumentId
		},
		_dgParams2 = {
			url:_pageListUrl2,
			data:_data2,
			module:_module2,
			hideCols:_hideCols,
			tableList:_tableList2,
			preId:_preId,
			height:_initHeight,
			isSecond:true
		},

			//CtrInstrItem dataGrid obj render
		_gridObj2 = dataGridM.init(_dgParams2),

		_upgrade = {
			//pagination: false,
			onLoadSuccess: function(){},
			onCellEdit: function(index,field,value){
				//记录最后一个编辑时的index
				CtrInstrItem.frozeCell = index;
				CtrInstrItem.frozeField = field;
			},
			loadFilter: function(data){
				var params = {total:0,rows:[]};
				if(data.rows)
					return data;
				else
					return params;
			}
		};

	_gridObj2 = CtrInstrItem.getNewParams(_gridObj2,_upgrade);

	CtrInstrItem.dataGrid2 = _tableList2.datagrid(_gridObj2).datagrid("enableCellEditing");

	/*************** END dataGrid 生成 *********************/

	var
		//重新载入 dataGrid2
		_reloadDG2 = function(row) {
			CtrInstrItem.testItemId = row.testItemId;
			CtrInstrItem.exParams =  {
				testItemId: CtrInstrItem.testItemId,
				instrumentId: CtrInstrItem.instrumentId
			};
			CtrInstrItem.dataGrid2.datagrid('reload',CtrInstrItem.exParams);
		},

		//添加检验项目栏位
		_columns = function() {

				var columns = [[
						{field: "idString", checkbox: true, width: 30},
						{title: "达安标准码", field: 'codeNo', width: 50},
						{title: "项目名称", field: 'name', flex: 1, width: 50},
						{title: "英文简称", field: 'enShortName', width: 50},
						{title: "检验方法", field: 'testMethodName', width: 50}
					]];

				return columns;
		},

		//添加检验项目已包含
		_loadContainList = function() {

				CtrInstrItem.leftDG =   $("#addCheckProjectLeft").datagrid({
					url: _optLeftUrl,
					method: CB.METHOD,
					queryParams: {instrumentId: CtrInstrItem.instrumentId},
					height: _initHeight,
					fitColumns: true,
					striped: true,
					checkOnSelect: false,
					fit: false,
					autoRowHeight: false,
					pagination: false,
					columns: _columns(),
					onLoadSuccess: function (data) {
						$("#containSize").html(data.total);
					}
				});
		},

		//添加检验项目未包含
		_loadNoContainList = function() {

				CtrInstrItem.rightDG = $("#addCheckProjectRight").datagrid({
					url: _optRightUrl,
					method: CB.METHOD,
					queryParams: {instrumentId: CtrInstrItem.instrumentId},
					height: _initHeight,
					fitColumns: true,
					striped: true,
					fit: false,
					autoRowHeight: false,
					pagination: false,
					columns: _columns()
				});
		},

		//载入仪器页面
		_loadInsList = function(data) {
			CtrInstrItem.instDG = $("#instrumentSelectList").datagrid({
				url: ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsPageList',
				method: CB.METHOD,
				height: _initHeight,
				queryParams:data,
				fitColumns: true,
				striped: true,
				checkOnSelect: false,
				fit: false,
				columns: [[
					{
						field: 'idString',
						formatter: function (value, row, index) {
							return "<input type='radio' datagrid-row-index='" + index + "' name='instrument'>";
						}
					},
					{title: "编码", field: 'codeNo', width: 80},
					{title: "仪器名称", field: 'name', width: 100},
					{title: "仪器型号", field: 'model', width: 100}
				]],
				onClickCell: function (index, field) {
					var rowData = $("#instrumentSelectList").datagrid('getData').rows[index],
						instrumentId = rowData.idString,
						instrumentName = rowData.name;
					CtrInstrItem.instrumentId = instrumentId;
					//$("#instrumentName").text(instrumentName);
					CtrInstrItem.instrumentName = instrumentName;
					if (field == 'idString') {
						return;
					}
					$("input[type='radio']:eq(" + index + ")").click();
				},
				pagination: true,
				pageNumber: 1,
				pageSize: 10
			});
		},

		//保存修改
		_saveCommon = function(params) {

			var
				data = params.data,
				dataGrid = params.dataGrid,
				formData = [],channelCode = [], channelCodePre,
				flag = true,
				reg = /[<>|$]/;


			if(data.length > 0){
				$.each(data,function(i,item){
					//验证打印次数不可为空
					if(!item.printOrder){
						BM.showMessage("第"+ (i+1) +"行的打印次序为空，请重新输入！");
						dataGrid.datagrid("editCell",{index:i,field:'printOrder'});
						flag = false;
						return;
					}
					////验证仪器通道码不可重覆
					if(item.channelCode){
						if(reg.test(item.channelCode)){
							BM.showMessage("第"+(+i+1)+"行的仪器通道码有特殊符号，请重新输入");
							dataGrid.datagrid("editCell",{index:i,field:'channelCode'});
							flag = false;
							return;
						}
						channelCodePre = channelCode[item.channelCode];
						if(channelCodePre){
							BM.showMessage("第"+(+i+1)+"行的仪器通道码["+item.channelCode+"]有重复，请重新输入");
							dataGrid.datagrid("editCell",{index:i,field:'channelCode'});
							flag = false;
							return;
						}else{
							channelCode[item.channelCode] = item.channelCode;
						}
					}
					//转换系数只能为数字
					//if (item.factor != null && item.factor != '' && (isNaN(item.factor) || item.factor < 0)) {
					if (item.factor != null && item.factor != '' && (isNaN(item.factor) || item.factor < 0)) {
						flag = false;
						BM.showMessage("第"+(+i+1)+"行的转换系数必须为数字，不可为负数，请重新输入！", function() {

						});
						return;
					}
					//单位
					if(reg.test(item.unit)){
						BM.showMessage("第"+(+i+1)+"行的单位有特殊符号，请重新输入");
						dataGrid.datagrid("editCell",{index:i,field:'unit'});
						flag = false;
						return;
					}

					formData.push({name: "txtId", value: item.id});
					formData.push({name: "txtChannelCode", value: item.channelCode});
					formData.push({name: "txtPrintOrder", value: item.printOrder});
					formData.push({name: "txtFactor", value: item.factor});
					formData.push({name: "txtUnit", value: item.unit});

				})
			}else{
				BM.showMessage("没有可保存的数据");
				flag = false;
				return;
			}

			formData.push({name: "instrumentId", value: CtrInstrItem.instrumentId});

			if(flag){
				$.ajax({
					"url" : _saveUrl,
					"type" : "POST",
					data : formData,
					"success" : function(data) {
						resolutionData(data);
						dataGrid.datagrid("reload");
					}
				});
			}


		},

		//日期转换小时
		_dateCount = function() {
			//依年龄单位分别计算
			//1岁、2月、3周、4天、5小时、6
			var ageType = $("#ageUnitId").val(),
				max = parseInt($("#ageMax").val()),
				min = parseInt($("#ageMin").val()),
				ys = parseInt( $("#yearStart").val()),
				ms = parseInt($("#monthStart").val()),
				ds = parseInt($("#dayStart").val()),
				ye = parseInt($("#yearEnd").val()),
				me = parseInt($("#monthEnd").val()),
				de = parseInt($("#dayEnd").val()),
				hour = 24,
				year = 365 * hour,
				month = 30 * hour,
				week = 7 * hour,
				calcAgeMin,calcAgeMax,ageMax,ageMin;

				if(ageType == 6){
					calcAgeMin = ys * year + ms * month + ds * hour;
					calcAgeMax = ye * year + me * month + de * hour;
					ageMin = ys + "/" + ms + "/" + ds;
					ageMax = ye + "/" + me+ "/" + de;
					$("#ageMaxStr").val(ageMax);
					$("#ageMinStr").val(ageMin);
				}else if(ageType == 1){
					calcAgeMax = max * year;
					calcAgeMin = min * year;
				}else if(ageType == 2){
					calcAgeMax = max * month;
					calcAgeMin = min * month;
				}else if(ageType == 3){
					calcAgeMax = max * week;
					calcAgeMin = min * week;
				}else if(ageType == 4){
					calcAgeMax = max * hour;
					calcAgeMin = min * hour;
				}else if(ageType == 5){
					calcAgeMax = max ;
					calcAgeMin = min ;
				}


				$("#calcAgeMax").val(calcAgeMax);

				$("#calcAgeMin").val(calcAgeMin);

		},

		_setDateValue = function(start, end) {
			var
				startArr = start.split("/"),
				endArr = end.split("/");

			$("#yearStart").numberbox('setValue',startArr[0]);
			$("#monthStart").numberbox('setValue',startArr[1]);
			$("#dayStart").numberbox('setValue',startArr[2]);

			$("#yearEnd").numberbox('setValue',endArr[0]);
			$("#monthEnd").numberbox('setValue',endArr[1]);
			$("#dayEnd").numberbox('setValue',endArr[2]);
		};



	$("#" + _preId + "Add2").click(function () {

		if(!CtrInstrItem.instrumentId){
			BM.showMessage("请选择仪器");
			return;
		}

		var
			params = {
				BCB: true
			};

		CtrInstrItem.addPop(params);

	});

	$("#" + _preId + "DeleteBatch2").click(function () {

		var
			params = {
				url: _delBatUrl2,
				dataGrid: CtrInstrItem.dataGrid2
			};

		CtrInstrItem.deleteBatch(params);

	});

	/* 仪器按钮 */
	$("#" + _preId + "instrumentList").click(function () {

		var
			params = {
				url: _instrumentUrl,
				data: {},
				callback: function(){
					var data = "";
					_loadInsList(data);
				},
				// popArea: 720,
				focusId: "instrumentSchStr"
			};

		CtrInstrItem.addPop(params);

	});


	/* 保存修改 */
	$("#" + _preId + "Save").click(function () {

		var
			dataGrid = CtrInstrItem.dataGrid,
			data = dataGrid.datagrid("getRows"),
			params = {
				data: data,
				dataGrid: dataGrid
			};

		//将编辑栏位栋结
		if(CtrInstrItem.frozeCell >= 0 && CtrInstrItem.frozeCell != null) {
			dataGrid.datagrid("endEdit", CtrInstrItem.frozeCell);
		}
		_saveCommon(params);

	});


	$.extend(CtrInstrItem,{

		preId:_preId,
		module:_module,
		parentId: null,
		//设定pop弹出框的大小
		popArea: 580,
		descSort: 0,
		focusId: _focusId,
		tableList:_tableList,
		tableList2:_tableList2,
		/*START url 定義*/
		delBatUrl: _delBatUrl,
		delUrl: _delUrl,
		addUrl: _addUrl,
		updateUrl: _editUrl,
		existUrl: _existUrl,
		pageListUrl: _pageListUrl,
		InfoUrl: _inforUrl,
		instrumentsListUrl:_instrumentsListUrl,

		//dataGrid2 of Url
		pageListUrl2: _pageListUrl2,
		/*END url 定義*/
		dataGrid:_dataGrid,
		instrumentId: null,
		testItemId: null,
		instrumentName: null,
		loadContainList: _loadContainList,
		loadNoContainList: _loadNoContainList,
		frozeCell: null,

		searchObj: function() {
			return {
				searchStr: $.trim($("#instrumentSchStr").val()),
				status: $("#status").val(),
				frontClassName: $("#frontClass").val()
			};
		},

		validateSave: function() {

			var
				totalStart = parseInt($("#calcAgeMin").val()),
				totalEnd =parseInt($("#calcAgeMax").val());

			console.log(totalStart);
			console.log(totalEnd);
			if(totalStart > totalEnd){
				BM.showMessage("结束年龄不可小于起始年龄");
				return false;
			}

			if((!totalStart && totalStart != 0) || (!totalEnd  && totalEnd != 0)){
				BM.showMessage("结束年龄或开始年龄不可为空");
				return false;
			}

			return true;
		},

		validateBox: function() {

			//文字描述
			$("#refText").validatebox({
				validType:  ['symbol']
			});
			//备注
			$("#refRemark").validatebox({
				validType:  ['symbol']
			});

		},

		editRowEx: function(rowData) {
			var
				params = {
					BCB: true
				};

			CtrInstrItem.editRow(rowData,params);
		},

		addCallBack: function() {
			$("#instrumentId").val(CtrInstrItem.instrumentId);
			$("#testItemId").val(CtrInstrItem.testItemId);
		},


		editCallBack: function() {

			var rowData = BasicModule.rowData;

			$("#InfoForm").form("load", {
				id: rowData.stringId,
				ageMin: rowData.ageMin,
				ageMax: rowData.ageMax,
				refHigh: rowData.refHigh,
				refLow: rowData.refLow,
				panicHigh: rowData.panicHigh,
				panicLow: rowData.panicLow,
				alarmHigh: rowData.alarmHigh,
				alarmLow: rowData.alarmLow,
				opType: 'edit'
			});
			$("#sampleTypeId").val(rowData.sampleTypeId);
			$("#yearStart").numberbox('setValue',rowData.ageMin);
			$("#sexId").val(rowData.sexId);
			$("#ageUnitId").val(rowData.ageUnitId);
			$("#refText").val(rowData.refText);
			$("#refRemark").val(rowData.refRemark);
			$("#instrumentId").val(CtrInstrItem.instrumentId);
			$("#testItemId").val(CtrInstrItem.testItemId);
			if(rowData.ageUnitId == 6){
				$("#detail").show();
				$("#noDetail").hide();
				_setDateValue(rowData.ageMin,rowData.ageMax);
			}
			newcommonjs.oldName = rowData.name;
		},

		copyDialogEx: function(rowData) {

			var
				params = {
					BCB: true
				};

			CtrInstrItem.copyDialog(rowData,params);
		},

		copyCallBack: function() {

			var rowData = BasicModule.rowData;

			$("#InfoForm").form("load", {
				ageMin: rowData.ageMin,
				ageMax: rowData.ageMax,
				refHigh: rowData.refHigh,
				refLow: rowData.refLow,
				panicHigh: rowData.panicHigh,
				panicLow: rowData.panicLow,
				alarmHigh: rowData.alarmHigh,
				alarmLow: rowData.alarmLow,
				opType: 'add'
			});
			$("#sampleTypeId").val(rowData.sampleTypeId);
			$("#sexId").val(rowData.sexId);
			$("#ageUnitId").val(rowData.ageUnitId);
			$("#refText").val(rowData.refText);
			$("#refRemark").val(rowData.refRemark);
			$("#instrumentId").val(CtrInstrItem.instrumentId);
			$("#testItemId").val(CtrInstrItem.testItemId);
			if(rowData.ageUnitId == 6){
				$("#detail").show();
				$("#noDetail").hide();
				_setDateValue(rowData.ageMin,rowData.ageMax);
			}
			newcommonjs.oldName = rowData.name;

		},

		beforeSubmit: function() {

			var params,data,ageMax,ageMin;

			//日期时间转换
			_dateCount();
			data = $("#InfoForm").serializeArray();

			//详细年龄进行资料转换
			if($("#ageUnitId").val() == 6){
				$.each(data,function(i,field){
					if(field.name == "ageMax"){
						data[i].value = $("#ageMaxStr").val();
					}

					if(field.name == "ageMin"){
						data[i].value = $("#ageMinStr").val();
					}
				});
			}

			console.log(data);
			params = {
				addUrl:_addUrl2,
				dataGrid: CtrInstrItem.dataGrid2,
				data: data
			}

			this.editDictCode(params);
		},

		addSuccess: function(data) {

			$("#editBtn").attr("disabled", false);
			var err = data.indexOf("err|");
			if (err == 0) {
				BM.showMessage(data.substring(4));
			}else{
				BasicModule.add();
			}


		},

		//仪器页面送出钮触发事件
		popSubmit: function() {

			var
				checkRadio =  $("input[type='radio']:checked"),
				opts1 = CtrInstrItem.dataGrid.datagrid("options");
				opts1.url = CtrInstrItem.pageListUrl,
				opts1.queryParams =
				{
					instrumentId: CtrInstrItem.instrumentId
				};

			if(!checkRadio){
				BM.showMessage("请先选择一个仪器");
				return;
			}
			//修改页面仪器名
			$("#instrumentName").text(CtrInstrItem.instrumentName);
			$("#" + CB.POPDIV).hide();
			//DG1 RELOAD
			CtrInstrItem.dataGrid.datagrid(opts1);
		}
		/*callback function area end*/

	});

	return CtrInstrItem;


}(jQuery));

$(function(){
	var _preId = CB.PREID.IRR;
	CtrInstrItem.init();
	$("#" + _preId + "Add").unbind();
	/* 添加检验项目 */
	$("#" + _preId + "Add").click(function () {

		if(!CtrInstrItem.instrumentId){
			BM.showMessage("请选择仪器");
			return;
		}

		var
			params = {
				url: CtrInstrItem.instrumentsListUrl,
				data: "",
				callback: function(){
					CtrInstrItem.loadContainList();
					CtrInstrItem.loadNoContainList();
				},
				popArea: 720,
				focusId: "searchStr"
			};

		CtrInstrItem.addPop(params);

	});
});
//var iir_canStore = true;
//var iir_addTestItemIds = "";
//var iir_delTestItemIds = "";
//
////加载数据列表相关变量
//var iir_instrumentItemList;
//var iir_instrumentRefrangeList;
//var iir_instrumentSelectList;
//var iir_addInstrumentItemLeft;
//var iir_addInstrumentItemRight;
//var iir_addInstrumentItemBtn;
//var iir_removeInstrumentItemBtn;
//
//$(function() {
//	iir_instrumentItemList = $('#iir_instrumentItemList');
//	iir_instrumentRefrangeList = $('#iir_instrumentRefrangeList');
//	iir_instrumentSelectList = $('#iir_instrumentSelectList');
//	iir_addInstrumentItemLeft = $('#iir_addInstrumentItemLeft');
//	iir_addInstrumentItemRight = $('#iir_addInstrumentItemRight');
//	//绑定前台通讯类、状态单击事件
//	$('#iir_ul_frontClass li').click(function(){
//	    $("#iir_frontClass").html($(this).html());
//	    $("#iir_frontClass").attr("value",$(this).attr("value"));
//	    iir_queryInstruments();
//	});
//	$('#iir_ul_status li').click(function(){
//	    $("#iir_status").html($(this).html());
//	    $("#iir_status").attr("value",$(this).attr("value"));
//	    iir_queryInstruments();
//	});
//	
//	//绑定仪器项目对照列表事件开始
//	iir_instrumentItemListOpt.onClickCell=iir_onClickCell;
//	iir_instrumentItemList.datagrid(iir_instrumentItemListOpt); //绑定仪器项目对照列表事件结束
//	
//	//绑定选中项目参考值列表开始
//    iir_instrumentRefrangeList.datagrid(iir_instrumentRefrangeListOpt); //绑定选中项目参考值列表结束
//	
//    //绑定仪器选择列表开始
//    $(document).on('click', '.J_instrumentList', function() {
////	    iir_instrumentSelectList.datagrid(iir_instrumentSelectListOpt).pagination(iir_defaultPageOpt);
//	    iir_queryInstruments(1);
//	}); //绑定仪器选择列表事件结束
//
//	$(document).on('click', '.J_addInstrumentItem', function (e) {
//		//先检查是否已选仪器
//		var instrumentId = $("#iir_instrumentId").val();
//		if (instrumentId == '') {
//			showMessage("请选择仪器");
//			return;
//		}
//		showPop(e); //弹出窗口
//		
//		var queryParams = iir_addInstrumentItemLeftOpt.queryParams;
//		if (queryParams == undefined) {
//			queryParams = [];
//		}
//		queryParams.instrumentId = instrumentId;
//		iir_addInstrumentItemLeftOpt.queryParams = queryParams;
//		
//		var queryParams2 = iir_addInstrumentItemRightOpt.queryParams;
//		if (queryParams2 == undefined) {
//			queryParams2 = [];
//		}
//		queryParams2.instrumentId = instrumentId;
//		iir_addInstrumentItemRightOpt.queryParams = queryParams2;
//	    iir_addInstrumentItemLeft.datagrid(iir_addInstrumentItemLeftOpt);	    
//	    iir_addInstrumentItemRight.datagrid(iir_addInstrumentItemRightOpt);
//	    
//	    //设置已包含的个数
//	    $("#iir_containItemCount").text(iir_addInstrumentItemLeft.datagrid("getData").total);
//	});
//
//	//仪器项目列表加载完成后选中第一行
//	iir_instrumentItemList.datagrid({onLoadSuccess : function(data){
//		if (iir_instrumentItemList.datagrid("getData").total > 0) { //如果有数据，选中第一行
////			iir_instrumentItemList.datagrid('selectRow', 0);
//			iir_onClickCell(0, "name");
//		}
//	}});
//
//	/**
//	 * 绑定排序下拉列表的点击事件
//	 */
//	$(document).on('click', '.J_instrumentItemOrder > li', function() {
//		//变化样式
//		$(".J_instrumentItemOrder > li.selected").removeClass("selected");
//		$(this).addClass("selected");
//		//触发查询
//		iir_queryInstrumentItems();
//	});
//
//	//绑定项目参考范围添加按钮事件
//	$(document).on('click', '.J_instItemDescAdd', function(e) {
//		//先检查是否已选仪器
//		var instrumentId = $("#iir_instrumentId").val();
//		var testItemId = $("#iir_testItemId").val();
//		if (instrumentId == '') {
//			showMessage("请选择仪器");
//			return;
//		}
//		if (testItemId == '') {
//			showMessage("请选择仪器项目");
//			return;
//		}
//		$("#iir_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
////		$("#iir_instRefAddForm").attr("action", ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
//		showPop(e);
//	});
//	
////	iir_instrumentSelectList.datagrid({ onClickRow:
////	    function () {
////	        //单击行的时候，将单选按钮设置为选中
////	        var id = iir_instrumentSelectList.datagrid("getSelected");
////	        $("input[name='instrument']").each(function () {
////	            if ($(this).val() == id.idString) {
////	                $(this).attr("checked", true);
////	            }
////	        });
////	    }
////	});
//	
//	$("#iir_testMethodId").combobox({onChange: function () {
//		iir_queryTestItems();
//	}});
//});
//
////处理可编辑的单元格
//$.extend($.fn.datagrid.methods, {
//	editCell : function(jq, param) {
//		return jq.each(function() {
//			var opts = $(this).datagrid("options");
//			var fields = $(this).datagrid('getColumnFields', true).concat(
//					$(this).datagrid('getColumnFields'));
//			for (var i = 0; i < fields.length; i++) {
//				var col = $(this).datagrid('getColumnOption', fields[i]);
//				col.editor1 = col.editor;
//				if (fields[i] != param.field) {
//					col.editor = null;
//				}
//			}
//			$(this).datagrid("beginEdit", param.index);
//			
//			for (var i = 0; i < fields.length; i++) {
//				var col = $(this).datagrid('getColumnOption', fields[i]);
//				col.editor = col.editor1;
//			}
//		});
//	}
//});
//
//
//var iir_editIndex = undefined;
//var iir_curIndex = -1;
//function iir_endEditing() {
//	if (iir_editIndex == undefined) {
//		return true
//	}
//	if (iir_instrumentItemList.datagrid('validateRow', iir_editIndex)) {
//		iir_instrumentItemList.datagrid('endEdit', iir_editIndex);
//		iir_editIndex = undefined;
//		return true;
//	} 
//	return false;
//}
//
///**.
// * 点击仪器项目列表的单元格事件
// * @param index
// * @param field
// */
//function iir_onClickCell(index, field) {
//	if (iir_endEditing()) {
//		iir_instrumentItemList.datagrid('selectRow', index).datagrid('editCell', {
//			index : index,
//			field : field
//		});
//		//如果是可编辑的框，获得焦点
//		var editor = iir_instrumentItemList.datagrid('getEditor', {index: index, field: field});
//	    if (editor != null) {
//	    	editor.target.focus();
//	    }
////		if (iir_curIndex != index) { //重复点击当前行，不重新加载（根据情况选择是否加该判断）
//			var rowData = iir_instrumentItemList.datagrid('getData').rows[index];
//			var testItemId = rowData.testItemId;
//			$("#iir_testItemId").val(testItemId);
//			//触发查询
//			iir_queryItemRefrange();
////		}
//		iir_curIndex = index;
//		iir_editIndex = index;
//	}
//}
//
///**.
// * 选择仪器页面的“确定”按钮事件
// */
//function iir_comfirmInstrumentSlt(e){
//	var selectRow = $("#iir_instrumentList input[type='radio']:checked");
//	if (selectRow == undefined || selectRow.length <= 0) {
//		showMessage("请先选择一个仪器");
//		return;
//	}
//	var index = $(selectRow).attr("datagrid-row-index");
//	var rowData = iir_instrumentSelectList.datagrid('getData').rows[index];
//	
//	var instrumentId = rowData.idString;
//	var instrumentName = rowData.name;
//	$("#iir_instrumentId").val(instrumentId);
//	$("#iir_instrumentName").text(instrumentName);
//	//关闭窗口
//	iir_closePop(e);
//	//触发查询
//	iir_queryInstrumentItems();
//	$("#iir_testItemId").val("");
//	//清空项目参考范围列表
//	iir_instrumentRefrangeList.datagrid('loadData', { total: 0, rows: [] });
//}
//
///**.
// * 按条件查询仪器
// */
//function iir_queryInstruments(init){
//	if(init==1){	
//		$("#iir_frontClass").html('全部');
//	    $("#iir_frontClass").attr("value","2");
//	    $("#iir_status").html('全部');
//	    $("#iir_status").attr("value","2");
//	    $("#iir_instrumentSchStr").val('');
//	}
//	var queryParams = iir_instrumentSelectListOpt.queryParams;
//	if (queryParams == undefined) {
//		queryParams = [];
//	}
//	var frontClassName=$("#iir_frontClass").attr("value");
//	var status=$("#iir_status").attr("value");
//	queryParams.searchStr =trim( $("#iir_instrumentSchStr").val());
//	queryParams.frontClassName = frontClassName;
//	queryParams.status = status;
//	iir_instrumentSelectListOpt.queryParams = queryParams;
//	iir_instrumentSelectList.datagrid(iir_instrumentSelectListOpt).pagination(iir_defaultPageOpt);
//}
//
//function iir_queryTestItems(){
//	var opts = iir_addInstrumentItemRight.datagrid("options");
//	var queryParams = opts.queryParams;
//	if (queryParams == undefined) {
//		queryParams = [];
//	}
//	queryParams.addItemSearchStr = $("#iir_itemSchStr").val();
//	queryParams.testMethodId = $('#iir_testMethodId').combobox('getValue');
//	opts.queryParams = queryParams;
//	iir_addInstrumentItemRight.datagrid(opts);
//}
///**.
// * 查询选中仪器下的仪器项目
// */
//function iir_queryInstrumentItems(){
//	//当前选中的仪器
//	var instrumentId = $("#iir_instrumentId").val();
//	if (instrumentId == '') { //没有仪器，不执行查询
//		return;
//	}
//	//获取当前选中排序值
//	var orderBy = $(".J_instrumentItemOrder > li.selected").val();
//	//项目查询条件
//	var itemName = $("#iir_itemName").val();
//	
//	var opts = iir_instrumentItemList.datagrid("options");
//	opts.url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemList";
//	var queryParmas = opts.queryParams;
//	queryParmas.instrumentId = instrumentId;
//	queryParmas.orderBy = orderBy;
//	queryParmas.addItemSearchStr = itemName;
//	
//	iir_instrumentItemList.datagrid(opts);
//}
//
//function iir_queryItemRefrange(){
//
//	//加载当前仪器项目的参考范围
//	var opts = iir_instrumentRefrangeList.datagrid("options");
//	opts.url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeList";
//	//当前选中的仪器
//	var instrumentId = $("#iir_instrumentId").val();
//	if (instrumentId == '') { //没有仪器，不执行查询
//		return;
//	}
//	//当前选中的仪器项目
//	var testItemId = $("#iir_testItemId").val();
//	if (testItemId == '') { //没有仪器项目，不执行查询
//		return;
//	}
//	//获取当前选中排序值
//	var orderBy = $(".J_itemRefrangeOrder > li.selected").val();
//	var queryParams = opts.queryParams;
//	if (queryParams == undefined) {
//		queryParams = [];
//	}
//	queryParams.orderBy = orderBy;
//	queryParams.testItemId = testItemId;
//	queryParams.instrumentId = instrumentId;
//	
//	iir_instrumentRefrangeList.datagrid(opts);
//}
//function iir_editRefrange(index, event){
//	var rowData = iir_instrumentRefrangeList.datagrid("getData").rows[index];
//	var id = rowData.idString;
//	$("#iir_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeEdit");
////	$("#iir_instRefAddForm").attr("action", ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeEdit");
//	iir_findRefrangeInfo(id, true);
//}
//function iir_copyRefrange(index, event){
//	var rowData = iir_instrumentRefrangeList.datagrid("getData").rows[index];
//	var id = rowData.idString;
//	$("#iir_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
////	$("#iir_instRefAddForm").attr("action", ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
//	iir_findRefrangeInfo(id, false);
//}
//function iir_findRefrangeInfo(id, isEdit){
//	
//	//从后台查出最新数据
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeInfo",
//		"type" : "POST",
//		data: {id: id},
//		"success" : function(data) {
//			var entity = data.entity;
//			if(entity.idString == ''){
//				// 有重叠
//				showMessage('数据不存在或已被删除！',function(){
//					//刷新列表
//					iir_queryInstrumentItems();
//				});
//			} else {
//				iir_setRefrangeInfo(entity, isEdit);
//			}
//		},
//		"error" : function() {
//		}
//	});
//}
//function iir_setRefrangeInfo(rowData, isEdit){
//	//打开页面
//	dialog("iir_instrumentRefrangeAdd", {
//        width: 420
//    }, function(){
//    	if (isEdit) {
//    		$("#iir_refrangeId").val(rowData.idString);
//    	}
//    	var sampleTypeId = rowData.sampleTypeId;
//    	if ($('#iir_sampleTypeId').find("option[value='"+sampleTypeId+"']").length == 0) {
//    		$('#iir_sampleTypeId').combobox('setValue', '['+rowData.sampleTypeName+']停用');
//    	} else {
//    		$('#iir_sampleTypeId').combobox('setValue', sampleTypeId+'');
//    	}
//    	var sexId = rowData.sexId;
//    	if ($('#iir_sexId').find("option[value='"+sexId+"']").length == 0) {
//    		$('#iir_sexId').combobox('setValue', '['+rowData.sexName+']停用');
//    	} else {
//    		$('#iir_sexId').combobox('setValue', sexId+'');
//    	}
//    	var ageUnitId = rowData.ageUnitId;
//    	if ($('#iir_ageUnitId').find("option[value='"+ageUnitId+"']").length == 0) {
//    		$('#iir_ageUnitId').combobox('setValue', '['+rowData.ageUnitName+']停用');
//    	} else {
//    		$('#iir_ageUnitId').combobox('setValue', ageUnitId+'');
//    	}
//    	
//    	$('#iir_sexId').combobox('setValues', rowData.sexId+'');
//    	$('#iir_ageUnitId').combobox('setValues', rowData.ageUnitId+'');
//    	$("#iir_ageMin").numberbox('setValue', rowData.ageMin);
//    	$("#iir_ageMax").numberbox('setValue', rowData.ageMax);
//    	
////    	$("#iir_sampleTypeId").val(rowData.sampleTypeId);
////    	$("#iir_sexId").val(rowData.sexId);		
////    	$("#iir_ageUnitId").val(rowData.ageUnitId);
////    	$("#iir_ageMin").val(rowData.ageMin);		
////    	$("#iir_ageMax").val(rowData.ageMax);		
//    	$("#iir_calcAgeMin").val(rowData.calcAgeMin);	
//    	$("#iir_calcAgeMax").val(rowData.calcAgeMax);	
//    	$("#iir_refLow").val(rowData.refLow);		
//    	$("#iir_refHigh").val(rowData.refHigh);	
//    	$("#iir_panicLow").val(rowData.panicLow);	
//    	$("#iir_panicHigh").val(rowData.panicHigh);	
//    	$("#iir_alarmLow").val(rowData.alarmLow);	
//    	$("#iir_alarmHigh").val(rowData.alarmHigh);	
//    	$("#iir_refText").val(rowData.refText);	
//    	$("#iir_refRemark").val(rowData.refRemark);
//    });
//}
///* 删除行 */
//function iir_deleteDescRow(index) {
//	var id = iir_instrumentRefrangeList.datagrid("getData").rows[index].idString;
//
//	//进入后台删除
//	showConfirm('是否删除当前记录？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeDelete",
//			"type" : "GET",
//			data: "id="+id,
//			"success" : function(data) {
//				//从页面中删除
//				resolutionData(data);
//				iir_instrumentRefrangeList.datagrid("deleteRow", index);
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
//function iir_closePop(e){
//	$(e).parents('.pop').hide();
//}
//function iir_closeRefPop(){
//	//先清空页面数据
//	iir_clearRefrangeInfo();
//	//关掉
//	$("#iir_instrumentRefrangeAdd").hide();
//	return false;
//}
//function iir_saveInstDesc(){
//	//防止重复提交
//    if(!iir_canStore){
// 		return false;
//    }
//    
//	formTextTrim("iir_instRefAddForm");
//	//处理掉不可用的数据
//	var sampleTypeId = $('#iir_sampleTypeId').combobox('getValue');
//	//如果下拉框里没有该数据，清空
//	if ($("#iir_sampleTypeId > option[value='"+sampleTypeId+"']").length == 0) {
//		$('#iir_sampleTypeId').combobox('setValue', "");
//	}
//	var ageUnitId = $('#iir_ageUnitId').combobox('getValue');
//	//如果下拉框里没有该数据，清空
//	if ($("#iir_ageUnitId > option[value='"+ageUnitId+"']").length == 0) {
//		$('#iir_ageUnitId').combobox('setValue', "");
//	}
//	var sexId = $('#iir_sexId').combobox('getValue');
//	//如果下拉框里没有该数据，清空
//	if ($("#iir_sexId > option[value='"+sexId+"']").length == 0) {
//		$('#iir_sexId').combobox('setValue', "");
//	}
//	if(!iir_validateRefrangeSave()){
//		iir_canStore = true;
//		return;
//	}
//
//	var instrumentId = $("#iir_instrumentId").val();
//	var testItemId = $("#iir_testItemId").val();
//	var formData = $("#iir_instRefAddForm").serialize() + "&instrumentId="+instrumentId+"&testItemId="+testItemId;
//	
//	// 检查是否年龄段重叠
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemIfOverlap",
//		"type" : "POST",
//		data:formData,
//		"success" : function(data) {
//			if(data.indexOf("err|") == 0){
//				// 有重叠
//				showMessage('相同的样本类型、性别、年龄单位情况下，年龄段范围不可以重叠！',function(){
//					iir_canStore = true;
//					$("#iir_ageMin").focus();
//				});
//			} else {
//				// 无重叠，继续
//				iir_doAddRefrange(formData);
//			}
//		},
//		"error" : function() {
//		}
//	});
//}
//
//function iir_doAddRefrange(formData){
//	var actionUrl = $("#iir_refrangeActionUrl").val();
////	var actionUrl = $("#iir_instRefAddForm").attr("action");
//	if (actionUrl == '') {
//		actionUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd";
//	}
//	iir_canStore = false;
//	$.ajax({
//		url: actionUrl,
//		type: "POST",
//		data:formData,
//		
//		success : function(data) {
//			iir_canStore = true;
//			resolutionData(data);
//			$("#iir_saveInstrumentRefrange").parents('.pop').hide();
//			iir_queryItemRefrange();//刷新list
//			//清空项目参考范围添加页面的数据
//			iir_clearRefrangeInfo();
//		},
//		error : function() {
//			iir_canStore = true;
//		}
//	});
//}
///**
// * 验证保存的必填条件
// * return 
// */
//function iir_validateRefrangeSave(){
//	var ageUnitId = $("#iir_ageUnitId").val();
//	var ageMin = $("#iir_ageMin").val();
//	var ageMax = $("#iir_ageMax").val();
//
//	if(ageMin == ''){
//		showMessage('起始年龄为空，请重新输入！',function(){
//			$("#iir_ageMin").focus();
//		});
//		return false;
//	}
//	if(ageMax == ''){
//		showMessage('结束年龄为空，请重新输入！',function(){
//			$("#iir_ageMax").focus();
//		});
//		return false;
//	}
//	if(ageUnitId!='6' && isNaN(ageMin)){
//		showMessage('年龄单位不是【详细年龄】，起始年龄请输入数字！',function(){
//			$("#iir_ageMin").focus();
//		});
//		return false;
//	}
//	if(ageUnitId!='6' && isNaN(ageMax)){
//		showMessage('年龄单位不是【详细年龄】，结束年龄请输入数字！',function(){
//			$("#iir_ageMax").focus();
//		});
//		return false;
//	}
//	if(ageUnitId!='6' && ageMax>200){
//		showMessage('结束年龄要求小于200，请重新输入！',function(){
//			$("#iir_ageMax").focus();
//		});
//		return false;
//	}
//	
//	return true;
//}
//
//function iir_clearRefrangeInfo(){
//	$("#iir_instRefAddForm")[0].reset();
//	$("#iir_refrangeId").val("");
//	$('#iir_sampleTypeId').combobox('setValue', '');
//	$('#iir_ageUnitId').combobox('setValue', '');
//	$('#iir_sexId').combobox('setValue', '');
//}
//
////批量删除参考值
//function iir_deleteRefrangeBatch(){
//	var ids = "";
//	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
//	
//	var sltedRowDatas = iir_instrumentRefrangeList.datagrid("getChecked");
//	if (sltedRowDatas == undefined || sltedRowDatas.length <= 0) {
//		showMessage("请选择要删除的参考值！");
//		return false;
//	}
//	for (var i in sltedRowDatas) {
//		ids2 += sltedRowDatas[i].idString + ",";
//	}
//	
//	showConfirm('是否删除所选中的参考值？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsRegrangeDeleteBatch",
//			"type" : "GET",
//			data:"ids="+ids2,
//			"success" : function(data) {
//				resolutionData(data);
//				iir_queryItemRefrange();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
////批量删除项目
//function iir_deleteItemBatch(){
//	var ids = "";
//	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
//	
//	var sltedRowDatas = iir_instrumentItemList.datagrid("getChecked");
//	if (sltedRowDatas == undefined || sltedRowDatas.length <= 0) {
//		showMessage("请选择要删除的项目！");
//		return false;
//	}
//	for (var i in sltedRowDatas) {
//		ids2 += sltedRowDatas[i].id + ",";
//	}
//	
//	showConfirm('是否删除所选中的项目？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemDeleteBatch",
//			"type" : "GET",
//			data:"ids="+ids2,
//			"success" : function(data) {
//				resolutionData(data);
//				iir_queryInstrumentItems();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
///*获取数据行*/
//function iir_makeToArray(obj) {
//    return Array.prototype.slice.call(obj);
//}
//
///*左右数据切换*/
//iir_addInstrumentItemBtn = $('#iir_addInstrumentItemBtn');
//iir_removeInstrumentItemBtn = $('#iir_removeInstrumentItemBtn');
////左移按钮事件
//iir_addInstrumentItemBtn.on('click', function () {
//    var addInstrumentItemData = iir_addInstrumentItemRight.datagrid('getChecked');
//
//    if (addInstrumentItemData == undefined || addInstrumentItemData.length <= 0) {
//    	showMessage("请选择要添加的项目！");
//    	return;
//    }
//    iir_makeToArray(addInstrumentItemData).forEach(function (element, index) {
//        var rowIndex = iir_addInstrumentItemRight.datagrid("getRowIndex", element);
//        iir_addInstrumentItemRight.datagrid('deleteRow', rowIndex);
//        iir_addInstrumentItemLeft.datagrid('appendRow', element);
//        var id = element.idString;
//        iir_delTestItemIds = iir_delTestItemIds.replace(id+",", ''); //删除的id中去掉该id
//        iir_addTestItemIds += id + ","; //新增的id中加上该id
//    });
//});
////右移移按钮事件
//iir_removeInstrumentItemBtn.on('click', function () {
//    var removeInstrumentItemData = iir_addInstrumentItemLeft.datagrid('getChecked');
//    if (removeInstrumentItemData == undefined || removeInstrumentItemData.length <= 0) {
//    	showMessage("请选择要移除的项目！");
//    	return;
//    }
//    iir_makeToArray(removeInstrumentItemData).forEach(function (element, index) {
//        var rowIndex = iir_addInstrumentItemLeft.datagrid("getRowIndex", element);
//        iir_addInstrumentItemLeft.datagrid('deleteRow', rowIndex);
//        iir_addInstrumentItemRight.datagrid('appendRow', element);
//        var id = element.idString;
//        iir_addTestItemIds = iir_addTestItemIds.replace(id+",", ''); //新增的id中去掉该id
//        iir_delTestItemIds += id + ","; //删除的id中加上该id
//    });
//});
//
////添加项目页面，点击确定
//function iir_confirmInstrumentItemAdd(e){
//	
//	//iir_addTestItemIds = iir_addTestItemIds.replace(/, /g,''); //删除空的id
//	//iir_delTestItemIds = iir_delTestItemIds.replace(/, /g,''); //删除空的id
//	
//	if((iir_addTestItemIds!=null && iir_addTestItemIds!='')
//		|| (iir_delTestItemIds!=null && iir_delTestItemIds!='')){
//		// 提交
//		
//		var instrumentId = $("#iir_instrumentId").val();
//		var data = "instrumentId="+instrumentId+"&addTestItemIds="+iir_addTestItemIds+"&delTestItemIds="+iir_delTestItemIds;
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddBatch",
//			"type" : "GET",
//			data:data,
//			"success" : function(data) {
//				//清空数据
//				resolutionData(data);
//				iir_addTestItemIds = "";
//				iir_delTestItemIds = "";
//				iir_closePop(e);
//				iir_queryInstrumentItems();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	} else {
//		//清空数据
//		iir_addTestItemIds = "";
//		iir_delTestItemIds = "";
//		iir_closePop(e);
//	}
//}
//
//
//// 保存对照列表
//function iir_saveItemList() {
//	//所有输入框结束编辑
//	iir_endEditing();
//	// 防止重复提交
//	if (!iir_canStore) {
//		return false;
//	}
//
//	// 空表格直接返回
//	var rowData = iir_instrumentItemList.datagrid('getData');
//	if (rowData == undefined || iir_instrumentItemList.datagrid('getData').total == 0) {
//		showMessage("没有可保持的数据");
//		iir_canStore = true;
//		return false;
//	}
//
//	iir_canStore = false;
//	// 去除多余空格
////	formTextTrim("itemListForm");
//
//	//组装数据
//	var rows = rowData.rows;
//	var formData = [];
//	for (var i in rows) {
//		var row = rows[i];
//		var id = row.id;
//		var channelCode = row.channelCode;
//		var factor = row.factor;
//		var printOrder = row.printOrder;
//		var unit = row.unit;
//		formData.push({name: "txtId", value: id});
//		formData.push({name: "txtChannelCode", value: channelCode});
//		formData.push({name: "txtFactor", value: factor});
//		formData.push({name: "txtPrintOrder", value: printOrder});
//		formData.push({name: "txtUnit", value: unit});
//	}
//	var instrumentId = $("#iir_instrumentId").val();
//	formData.push({name: "instrumentId", value: instrumentId});
//	
//	// 栏位校验
//	if (!iir_validateItemSave(rows)) {
//		iir_canStore = true;
//		return;
//	}
//	// 修改
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemSave",
//		"type" : "POST",
//		data : formData,
//		"success" : function(data) {
//			iir_canStore = true;
//		/*	showMessage("保存成功", function(){
//				//刷新列表
//				
//			});*/
//			resolutionData(data);
//			iir_queryInstrumentItems();
////			if (data != null && data != '') {
////				resolutionData(data);
////			}
//		},
//		"error" : function() {
//			iir_canStore = true;
//		}
//	});
//}
//
///**
// * 验证保存的必填条件 return
// */
//function iir_validateItemSave(rows) {
//	var bRet = true;
//
//	// 通道码
//	var channelCodeString = "";
//	for (var i in rows) {
//		var row = rows[i];
//		var instrItemId = row.id;
//		var channelCode = row.channelCode;
//		var factor = row.factor;
//		var printOrder = row.printOrder;
//		var unit = row.unit;
//		
//		if (channelCode != null && channelCode != '') {
//			if (channelCodeString.indexOf(channelCode + "&&$$##") == -1) {
//				channelCodeString += channelCode + "&&$$##";
//			} else {
//				bRet = false;
//				showMessage("第"+(+i+1)+"行的仪器通道码["+channelCode+"]有重复，请重新输入！", function() {
////					$("#" + objId).focus();
//				});
//				return false;
//			}
//		}
//		if (factor != null && factor != '' && isNaN(factor)) {
//			bRet = false;
//			showMessage("第"+(+i+1)+"行的转换系数必须为数字，请重新输入！", function() {
////				$("#" + objId).focus();
//			});
//			return false;
//		}
//		
//		if (printOrder == null || printOrder == '') {
//			bRet = false;
//			showMessage("第"+(+i+1)+"行的打印次序为空，请重新输入！", function() {
////				$("#" + objId).focus();
//			});
//			return false;
//		}
//	}
//
//	return bRet;
//}
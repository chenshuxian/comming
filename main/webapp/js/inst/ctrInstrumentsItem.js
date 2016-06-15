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
		_initHeight2 = _initHeight + 50,


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
					CtrInstrItem.haveRow = true;
					dataGridM.firstRow.call(this);
					_reloadDG2(rows[0]);
				}

				dataGridM.loadSuccess(this);

			},
			onClickRow: function(index, row) {
				dataGridM.clickRow.call(this, index,row);
				CtrInstrItem.haveRow = true;
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
			onLoadSuccess: function(){
				dataGridM.loadSuccess(this);
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
					height: _initHeight2,
					fitColumns: true,
					striped: true,
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
					height: _initHeight2,
					fitColumns: true,
					striped: true,
					fit: false,
					autoRowHeight: false,
					pagination: false,
					columns: _columns(),
					onLoadSuccess: function (data) {
						//console.log(data);
						if(data.rows.source != "local") {
							CtrInstrItem.rightArr = [];
							CtrInstrItem.rightArr = data.rows;
						}

					}

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
				//max = parseInt($("#ageMax").val()),
				//min = parseInt($("#ageMin").val()),
				//ys = parseInt( $("#yearStart").val()),
				//ms = parseInt($("#monthStart").val()),
				//ds = parseInt($("#dayStart").val()),
				//ye = parseInt($("#yearEnd").val()),
				//me = parseInt($("#monthEnd").val()),
				//de = parseInt($("#dayEnd").val()),
				max = +$("#ageMax").val(),
				min = +$("#ageMin").val(),
				ys = +$("#yearStart").val(),
				ms = +$("#monthStart").val(),
				ds = +$("#dayStart").val(),
				ye = +$("#yearEnd").val(),
				me = +$("#monthEnd").val(),
				de = +$("#dayEnd").val(),
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

		if (!CtrInstrItem.instrumentId) {
			BM.showMessage("请选择仪器");
			return;
		}

		if (!CtrInstrItem.haveRow) {
			BM.showMessage("请选择项目表格中资料");
			return;
		}

		var
			params = {
				BCB: true,
				popArea: 500
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

		CtrInstrItem.haveRow = false;

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
			$("#refText").attr("maxlength","150");
			//备注
			$("#refRemark").validatebox({
				validType:  ['symbol']
			});
			$("#refRemark").attr("maxlength","150");

			//所有上下限数字小数验证
			$(".floatNum").validatebox({
				validType: ['numberTwo']
			})

		},

		editRowEx: function(rowData) {
			var
				params = {
					BCB: true,
					popArea: 500
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
					BCB: true,
					popArea: 500
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
				checkRadio =  $("input[type='radio']:checked").length,
				opts1 = CtrInstrItem.dataGrid.datagrid("options");
				opts1.url = CtrInstrItem.pageListUrl,
				opts1.queryParams =
				{
					instrumentId: CtrInstrItem.instrumentId
				};

			//console.log(checkRadio.length);

			if(checkRadio == 0){
				BM.showMessage("请先选择一个仪器");
				return;
			}
			//修改页面仪器名
			$("#irrinstrumentName").text(CtrInstrItem.instrumentName);
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
				popArea: 920,
				focusId: "searchStr"
			};

		CtrInstrItem.addPop(params);

	});
});


/***
 *@ClassName: basicModule.js
 * @Description: TODO(共用模块-JS)
 * @date 2016年01月27日
 * @author 陈书贤
 * @updgradeDate 2016/03/10
 ***/
var BasicModule;

BasicModule = (function($){

		//BM = Object.create(BasicModule);

		var
			BM = BasicModule = {},
			METHOD = CB.METHOD,
			POPDIV = CB.POPDIV,
			_dataStore = {},
			_dataGrid = {},
			_addreload = {
				searchStr:"",
				status:"",
				sort:"2"
			},
			_updatereload = {
				searchStr:"",
				status:"",
				sort:""
			},
			_addUrl,_updateUrl,_exParams,
			_addNewReload,_updateNewReload,

			/* 批量删除
			* params includes
			* new dataGrid
			* new url
			* */

			_deleteBatch= function(params) {

				//console.log("delbatch");

				var
					dataGrid = params.dataGrid,
					url = params.url,
					checkedItems,data,
					names = [],
					ids = [];

				//console.log("deletbatch:"+url);

				checkedItems = dataGrid.datagrid("getChecked");

				if (checkedItems.length == 0) {
					showMessage('请选择要删除的数据!');
					return false;
				}

				$.each(checkedItems, function (index, item) {
					if (item.status == true) {

						if(item.name){
							names.push(item.name);
						}else if(item.componentName){
							names.push(item.componentName);
						}else if(item.box_barcode){
							names.push(item.box_barcode);
						}

					} else {
						ids.push(item.stringId);
					}
				});

				if (names.length > 0) {
					showMessage("名称" + _getItemsMsg(names) + "启用状态，不允许删除!");
					return false;
				}

				data = {ids: ids.join(",")};
				if(params.data){
					data = params.data;
				}

				$.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: data,
							success: function (data) {
								//data = CB.DELSUCC;
								resolutionData(data);
								dataGrid.datagrid('reload');

							},
							error: function () {

							}
						});
					}

				});
			},

			/* 删除行 */
			_deleteRow= function(params) {

				var
					status = params.status,
					url = params.url,
					dataGrid = params.dataGrid,
					data = params.data;

				/*if(params.data){
					data = params.data;
				}*/


				if (status == true) {
					showMessage('当前选中记录已启用，不允许删除！');
					return;
				}
				$.messager.confirm("提示", "你确定要删除吗?", function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: data,
							success: function (data) {
								data = CB.DELSUCC;
								resolutionData(data);
								dataGrid.datagrid('reload');
							},
							error: function () {

							}
						});
					}
				});
			},

			/* 处理返回提示中名称集合 */
			_getItemsMsg= function (items) {

				var itemsMsg = "";
				$.each(items, function (k, v) {
					itemsMsg += "【" + v + "】,";
				});
				return itemsMsg.substring(0, itemsMsg.length - 1);
			},

			/* 启用、停用状态 */
			_changeStatus= function(params) {

				var
					url = params.url,
					dataGrid = params.dataGrid,
					id = params.id,
					val = params.val,
					index = params.index,
					callback = params.callback,
					confirmMeg,operatioType,newVal,data;


				if (id == '' || val == '') {
					showMessage('请选择操作记录!');
					return;
				}

				if (val == '1') {
					confirmMeg = "是否停用当前记录？";
					operatioType = "Disable";
					newVal = '0';
				}
				if (val == '0') {
					confirmMeg = "是否启用当前记录？";
					operatioType = "Enable";
					newVal = '1';
				}

				data = {id: id, operatioType: operatioType};
				if(params.data){
					data = params.data;
				}

				$.messager.confirm("提示", confirmMeg, function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: data,
							success: function (data) {
								resolutionData(data);
								dataGrid.datagrid('updateRow', {
									index: index,
									row: {
										status: newVal
									}
								});
								BasicModule.parentStatus = newVal;
								if(callback){
									callback();
								}

							},
							error: function () {
								dataGrid.datagrid('refreshRow', index);

							}
						});
					} else {
						dataGrid.datagrid('refreshRow', index);
					}
				});

			},

			_dataControl= function(params) {
				//防止重复提交
				//var obj = this;
				_dataStore = params.data;
				_dataGrid = params.dataGrid;
				//_exParams = params.exParams;


				$("#editBtn").attr("disabled", true);
				//是否有过变更
				if (!formIsDirty("InfoForm") && params.opType != "add") {
					$("#"+POPDIV).hide();
					return false;
				}
				formTextTrim("InfoForm");
				if (!params.validate()) {
					$("#editBtn").attr("disabled", false);
					return;
				}
				//console.log("dataControl");

				// 检查是否同名
				if(params.existUrl){

					$.ajax({
						url: params.existUrl,
						type: params.Method,
						data: params.data,
						success: params.callback
					});

				}else{

					if(params.opType == "add")
						BasicModule.add();
					else
						BasicModule.update();
				}

			},

			_commonAjax= function(params) {

				var
					url = params.url,
					rd = params.rd,
					dataGrid = _dataGrid;


				$.ajax({
					url: url,
					type: METHOD,
					data: _dataStore,
					success: function (response) {

						var err = response.indexOf("err|");
						resolutionData(response);
						if(err != 0) {
							dataGrid.datagrid('reload', rd);
							$("#" + POPDIV).hide();
						}

					},
					"error": function () {
						$("#editBtn").attr("disabled", false);
					}
				});
			},

			_beforeSubmit = function(obj,BCB) {

				var successCallback = function(){
					//BCB 新增和編輯頁面submit驗證成功後所呼叫的function
					//一般是呼叫editDictCode
					if(BCB){
						//if(BCB == "resultDescEdit")
							//ResultType.resultDescEdit();
						//else
							//obj.dataUpgrade();
						obj.beforeSubmit();

					}else{
						obj.editDictCode();
					}

				};



				$('form').form({
					onSubmit:function(){
						console.log("onsubmit:"+ $(this).form('validate'));
						return $(this).form('validate');
					},
					success:successCallback
				});
			},


			_Dialog = function(params) {

				var
					data = params.data,
					callbackFun = params.callback,
					url = params.url,
					focusId = params.focusId,
					dialogWidth = params.popArea,
					beforeCB = params.BCB,
					obj = this;

				//console.log("Dialog:"+params.url);

				$("#"+POPDIV).load(url, data, function () {
					dialog(POPDIV, {width: dialogWidth}, callbackFun);
					obj.validateBox();
					_beforeSubmit(obj,beforeCB);
					$("#"+focusId).focus();
				});
			},

			_getType = function(obj,rowData) {

				if(rowData.typeKey){
					obj.typeKey = rowData.typeKey;
				}

				// for centerOrg.js
				if(this.orgTypeId != null){
					obj.orgTypeId = this.orgTypeId;
				}

				// for microorganism.js
				if(this.itemTypeId != null){
					obj.itemTypeId = this.itemTypeId;
				}

				return obj;

			},

			_defaultDialogParams = function(){
				var obj = {
					url: this.InfoUrl,
					focusId: this.focusId,
					callback: this.addCallBack,
					popArea: this.popArea,
					BCB:null
				};
				return obj;
			};


	$.extend(BM,{

		dataGrid: {},
		preId: null,
		module:null,
		parentStatus:null,
		popArea: 480,
		//url: null,
		focusId: null,
		currentEvent: null,
		delBatUrl: null,
		existUrl: null,
		updateUrl: null,
		addUrl: null,
		delUrl: null,
		changeStatusUrl: null,
		InfoUrl: null,
		pageListUrl: null,
		addTestItemIds: [],
		delTestItemIds: [],
		//params:{},
		addParams: {
			id:'',
			opType:'add'
		},
		/*editParams:{
			id:'',
			opType:'edit'
		},
		showParams:{
			id:'',
			opType:'view'
		},
		deleteParams:{},
		addCallBack:{},
		exParams:{},
		addreload: {
			searchStr:"",
			status:"",
			sort:"2"
		},
		updatereload: {
			searchStr:"",
			status:"",
			sort:""
		},*/

		validateSave: function(){
			return true;
		},


		init: function() {

			var tableList = this.tableList,
				obj = this,
				_preId = this.preId;

			newcommonjs.pageInit(_preId);
			$(window).on('resize', function () {
				newcommonjs.tableAuto(tableList);
			});

			/* 状态搜索 */
			$("." + _preId + "-status-selector li").on("click", function () {
				$("#" + _preId + "StatusSpan").html($(this).html());
				$("." + _preId + "-status-selector li.selected").removeClass("selected");
				var flg = $(this).is('.selected');
				$(this).addClass(function () {
					return flg ? '' : 'selected';
				})

				var statusVal = $(this).attr("el-value");
				$("#" + _preId + "Status").val(statusVal);

				obj.searchGrid();
			});

			/* 排序 */
			$("." + _preId + "-sort-selector li").on("click", function () {
				$("#" + _preId + "SortSpan").html($(this).html());
				$("." + _preId + "-sort-selector li.selected").removeClass("selected");
				var flg = $(this).is('.selected');
				$(this).addClass(function () {
					return flg ? '' : 'selected';
				})

				var sortVal = $(this).attr("el-value");
				$("#" + _preId + "Sort").val(sortVal);

				obj.searchGrid();
			});

			/* search Btn */
			$("#" + _preId + "SearchBtn").on("click",function() {
				obj.searchGrid();;
			});


			$("#" + _preId + "Add").on("click", function () {
				obj.addPop();
			});

			// deleteBatch
			$("#" + _preId + "DeleteBatch").on("click",function() {
				obj.deleteBatch();
			});

		},

		//defaultDialogParams: function(){
		//	var obj = {
		//		url: this.InfoUrl,
		//		focusId: this.focusId,
		//		callback: this.addCallBack,
		//		popArea: this.popArea,
		//		BCB:null
		//	};
		//	return obj;
		//},

		// Pop Block Start

		/* 新增 */
		addPop: function(newParams) {

			// update defaultDialogParams
			var
				params = _defaultDialogParams.call(this),
				DDP = this.getNewParams(params,newParams);

			if(!DDP.data)
				DDP.data = this.addParams;

			//设定当前事件状态
			this.currentEvent = "add";
			_Dialog.call(this,DDP);

		},

		/* 编辑 */
		editRow: function(rowData,newParams) {

			//var url = this.InfoUrl;
			var
				editParams,editStatus,DDP,
				params = _defaultDialogParams.call(this);
				params.callback = this.editCallBack;
				DDP = this.getNewParams(params,newParams);

			editParams = {
				id:rowData.stringId,
				opType:"edit"
			};

			editParams = _getType.call(this,editParams,rowData);
			if(!DDP.data)
				DDP.data = editParams;
			//如果是用get的方法則將data設為null
			//if(DDP.isGet){
			//	DDP.data = null;
			//}
			editStatus = rowData.status;
			//console.log("DDP"+DDP.InfoUrl);

			if (editStatus == true) {
				showMessage('当前选中记录已启用，不允许修改！');
				return;
			}

			BM.rowData = rowData;
			this.currentEvent = "edit";
			_Dialog.call(this,DDP);
			//_newshowDictCodeEditDialog.call(this,params);

		},

		/* 弹出详情信息框 */
		showDialog: function(rowData,newParams) {

			var
				DDP,showParams,
				params = _defaultDialogParams.call(this);
				params.callback = this.showCallBack;
				DDP =  this.getNewParams(params,newParams),

				showParams = {
					id:rowData.stringId,
					opType:'view'
				};

			showParams = _getType.call(this,showParams,rowData);

			if(!DDP.data)
				DDP.data = showParams;

			BM.rowData = rowData;
			this.currentEvent = "view";
			_Dialog.call(this,DDP);

		},

		CommonPop: function(newParams){

			var
				params = _defaultDialogParams.call(this),
				DDP =  this.getNewParams(params,newParams);

			_Dialog.call(this,DDP);
		},


		// Pop Block End


		// Data Operation Block

		/* 批量删除 */
		deleteBatch: function(newParams){

			var
				params = {
					url: this.delBatUrl,
					dataGrid: this.dataGrid
				};

			params = this.getNewParams(params,newParams);

			_deleteBatch(params);
		},

		/* 删除行 */
		deleteRow: function(index, rowData,newParams) {
			//var url = this._delUrl;
			var
				params = {
					data :{id: rowData.stringId},
					status: rowData.status,
					url: this.delUrl,
					dataGrid: this.dataGrid
				};

			params = this.getNewParams(params,newParams);

			_deleteRow(params);
		},


		/* 启用、停用状态 */
		changeStatus: function(index, rowData,newParams) {

			var params = {
				url: this.changeStatusUrl,
				dataGrid: this.dataGrid,
				id: rowData.stringId,
				val: rowData.status.toString(),
				index: index,
				callback: this.changeStatusCallBack
			}

			params = this.getNewParams(params,newParams);

			_changeStatus(params);

		},

		// Data Operation Block End

		editDictCode: function(newParams) {

			var
				opType = $("#opType").val(),
				data = $("#InfoForm").serialize(),
				existUrl = this.existUrl,
				validate = this.validateSave,
				dataGrid = this.dataGrid,
				//exParams = this.exParams,

				params ={
					existUrl: existUrl,
					Method: METHOD,
					data: data,
					validate: validate,
					opType: opType,
					dataGrid: dataGrid
					//exParams: exParams
				};

			_updateUrl = this.updateUrl;
			_addUrl = this.addUrl;
			//for add or update success callback reload params
			_addNewReload = $.extend({},_addreload,this.exParams);
			_updateNewReload = $.extend({},_updatereload,this.exParams);
			//console.log(data);

			if(newParams) {

				if (newParams.updateUrl)
					_updateUrl = newParams.updateUrl;

				if (newParams.addUrl)
					_addUrl = newParams.addUrl;

			}

			if(opType == "add"){
				params.callback = this.addSuccess;
			}else{
				params.callback = this.editSuccess;
			}

			//if there is newParams then update oldParams
			params = this.getNewParams(params,newParams);
			//console.log(data);

			_dataControl(params);


		},

		add: function() {

			var
				params = {
					rd: _addNewReload,//$.extend(_addreload,_exParams),
					url: _addUrl
				};

			_commonAjax(params);
		},

		update: function() {

			var
				params = {
					rd: _updateNewReload,//$.extend(_updatereload,_exParams),
					url: _updateUrl
				};

			_commonAjax(params);

		},

		searchGrid: function(newParams) {
			//console.log(this.preId);
			var params ={
				dataGrid: this.dataGrid,
				searchObj: this.searchObj(this.preId)
			};

			if(newParams)
				params = this.getNewParams(params,newParams);

			params.dataGrid.datagrid('load', params.searchObj);

		},

		searchObj: function(preId) {

			return {
				searchStr: $.trim($("#" + preId + "SearchStr").val()),
				status: $("#" + preId + "Status").val(),
				sort: $("#" + preId + "Sort").val()
			};

		},

		// Ajax Callback Block Start

		addSuccess: function(data) {
			//console.log("successcallback");

			$("#editBtn").attr("disable", false);
			if (data.indexOf("confirm|") == 0) {
				// 有同名
				showConfirm(data.substring(8), function () {
					// 确认继续
					BasicModule.add();
					//_add();
				})
			} else {
				// 无同名，确认继续
				BasicModule.add();
				//_add();
			}

		},

		editSuccess: function(data) {
			//console.log("editcallback");

			if (data.indexOf("confirm|") == 0) {
				// 有同名
				showConfirm(data.substring(8), function () {
					// 确认继续
					BasicModule.update();
					//_update();
				});
			} else {
				// 无同名，确认继续
				BasicModule.update();
				//_update();
			}

		},

		editCallBack: function() {

			//write from everyobject

		},

		addCallBack: function() {

			//write from everyobject

		},


		showCallBack: function() {

			////write from everyobject

		},

		changeStatusCallBack: function() {

			////write from everyobject

		},
		beforeSubmit: function() { console.log(this.module + "没有dataUpgrade"); },

		// Ajax Callback Block End

		getAddParams: function(exParams) {

			return $.extend({},this.addParams,exParams);

		},

		/*getType: function(obj,rowData) {

			if(rowData.typeKey){
				obj.typeKey = rowData.typeKey;
			}

			// for centerOrg.js
			if(this.orgTypeId != null){
				obj.orgTypeId = this.orgTypeId;
			}

			return obj;

		},*/
		getNewParams: function(old,newParams) {

			 return $.extend({},old,newParams);

		},

		/* 取得checkbox選中的id */
		getIds: function(dataGrid){

			var _dataGrid = this.dataGrid,
				checkedItems,
				ids = [];

			if(dataGrid)
				_dataGrid = dataGrid;

			checkedItems = _dataGrid.datagrid("getChecked"),

			$.each(checkedItems,function(index,item){
				ids.push(item.stringId);
			});

			return ids;
		},

		submit: function() {

			$('form').submit(function(event){
				//避免重复提交
				console.log("sumbit1");
				event.preventDefault();
			});

		},

		//将右侧的DATA像左侧移的BUTTON
		leftShiftBtn: function() {
			var rightProjectData = $("#addCheckProjectRight").datagrid('getSelections'),
				stringId,rowIndex,rows;
			if(rightProjectData.length > 0) {

				makeToArray(rightProjectData).forEach(function (element, index) {
					rowIndex = $("#addCheckProjectRight").datagrid("getRowIndex", element);
					$("#addCheckProjectRight").datagrid('deleteRow', rowIndex);
					$("#addCheckProjectLeft").datagrid('appendRow', element);
					stringId = element.idString;
					if (element.stringId)
						stringId = element.stringId;
					BasicModule.addTestItemIds.push(stringId);
				});
				rows = $("#addCheckProjectLeft").datagrid("getRows");
				$("#containSize").html(rows.length);
			}else{
				//alert("ring2");
				showMessage('请选择要添加的项目！');
				return;
			}
		},

		//将左侧的DATA像右侧移的BUTTON
		rightShiftBtn: function() {
			var leftProjectData = $("#addCheckProjectLeft").datagrid('getSelections'),
				stringId,rowIndex,rows;
			if(leftProjectData.length > 0) {
				makeToArray(leftProjectData).forEach(function (element, index) {
					rowIndex = $("#addCheckProjectLeft").datagrid("getRowIndex", element);
					$("#addCheckProjectLeft").datagrid('deleteRow', rowIndex);
					$("#addCheckProjectRight").datagrid('appendRow', element);
					stringId = element.idString;
					if (element.stringId)
						stringId = element.stringId;
					BasicModule.delTestItemIds.push(stringId);
				});
				rows = $("#addCheckProjectLeft").datagrid("getRows");
				$("#containSize").html(rows.length);
			}else{
				showMessage('请选择要移除的项目！');
				return;
			}
		}


	});

	return BM;

}(jQuery));

/***
 *@ClassName: basicModule.js
 * @Description: TODO(共用模块-JS)
 * @date 2016年01月27日
 * @author 陈书贤 
 ***/
var BasicModule;

BasicModule = (function($){

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
					checkedItems,
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
						}else{
							names.push(item.componentName);
						}

					} else {
						ids.push(item.stringId);
					}
				});

				if (names.length > 0) {
					showMessage("名称" + _getItemsMsg(names) + "启用状态，不允许删除!");
					return false;
				}

				$.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: {
								ids: ids.join(",")
							},
							success: function (data) {
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
					Params = {id: params.id};

				if (status == true) {
					showMessage('当前选中记录已启用，不允许删除！');
					return;
				}
				$.messager.confirm("提示", "你确定要删除吗?", function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: Params,
							success: function (data) {
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
					confirmMeg,operatioType,newVal;


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
				$.messager.confirm("提示", confirmMeg, function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: {id: id, operatioType: operatioType},
							success: function (data) {
								resolutionData(data);
								dataGrid.datagrid('updateRow', {
									index: index,
									row: {
										status: newVal
									}
								});

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
				$.ajax({
					url: params.existUrl,
					type: params.Method,
					data: params.data,
					success: params.callback,
				});

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

						resolutionData(response);
						dataGrid.datagrid('reload',rd);
						$("#"+POPDIV).hide();

					},
					"error": function () {
						$("#editBtn").attr("disabled", false);

					}
				});
			},

			_beforeSubmit = function (obj,BCB) {

				var successCallback = function(){

					if(BCB){
						if(BCB == "resultDescEdit")
							ResultType.resultDescEdit();

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

			_add = function() {

				var
					params = {
						rd: _addNewReload,//$.extend(_addreload,_exParams),
						url: _addUrl
					};


				_commonAjax(params);
			},

			_update = function() {

				var
					params = {
						rd: _updateNewReload,//$.extend(_updatereload,_exParams),
						url: _updateUrl
					};

				_commonAjax(params);

			},

			_Dialog= function(params) {

				var
					data = params.data,
					callbackFun = params.callback,
					url = params.url,
					focusId = params.focusId,
					dialogWidth = params.popArea,
					beforeCB = params.BCB,
					obj = this;

				console.log("Dialog:"+params.url);

				$("#"+POPDIV).load(url, data, function () {
					dialog(POPDIV, {width: dialogWidth}, callbackFun);
					validate.validateBox();
					_beforeSubmit(obj,beforeCB);
					$("#"+focusId).focus();
				});

			};



	$.extend(BM,{

		dataGrid: {},
		preId: null,
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

			newcommonjs.pageInit(this.preId);
			var tableList = this.tableList;
			$(window).on('resize', function () {
				newcommonjs.tableAuto(tableList);
			});

		},

		defaultDialogParams: function(){
			var obj = {
				url: this.InfoUrl,
				focusId: this.focusId,
				callback: this.addCallBack,
				popArea: this.popArea,
				BCB:null
			};
			return obj;
		},

		// Pop Block Start

		/* 新增 */
		addPop: function(newParams) {

			// update defaultDialogParams
			var
				params = this.defaultDialogParams(),
				DDP = this.getNewParams(params,newParams);

			DDP.data = this.addParams;

			this.currentEvent = "add";
			_Dialog.call(this,DDP);

		},

		/* 编辑 */
		editRow: function(rowData,newParams) {

			//var url = this.InfoUrl;
			var
				editParams,editStatus,DDP,
				params = this.defaultDialogParams();
				params.callback = this.editCallBack;
				DDP = this.getNewParams(params,newParams);

			editParams = {
				id:rowData.stringId,
				opType:"edit"
			};

			editParams = this.getType(editParams,rowData);

			DDP.data = editParams;

			editStatus = rowData.status;
			//console.log("DDP"+DDP.InfoUrl);

			if (editStatus == true) {
				showMessage('当前选中记录已启用，不允许修改！');
				return;
			}

			BM.rowData = rowData;

			_Dialog.call(this,DDP);
			//_newshowDictCodeEditDialog.call(this,params);

		},

		/* 弹出详情信息框 */
		showDialog: function(rowData) {

			var
				params = this.defaultDialogParams(),
				newParams = {callback:this.showCallBack},
				DDP =  this.getNewParams(params,newParams),

				showParams = {
					id:rowData.stringId,
					opType:'view'
				};

			showParams = this.getType(showParams,rowData);

			DDP.data = showParams;

			BM.rowData = rowData;

			_Dialog.call(this,DDP);

		},


		// Pop Block End


		// Data Operation Block

		/* 批量删除 */
		deleteBetch: function(newParams){

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
					id: rowData.stringId,
					status: rowData.status,
					url: this.delUrl,
					dataGrid: this.dataGrid
				};

			params = this.getNewParams(params,newParams);

			_deleteRow(params);
		},


		/* 启用、停用状态 */
		changeStatus: function(index, rowData) {

			var params = {
				url: this.changeStatusUrl,
				dataGrid: this.dataGrid,
				id: rowData.stringId,
				val: rowData.status.toString(),
				index: index
			}

			_changeStatus(params);
		},

		// Data Operation Block End

		editDictCode: function(newParams) {

			_updateUrl = this.updateUrl;
			_addUrl = this.addUrl;
			_addNewReload = $.extend({},_addreload,this.exParams);
			_updateNewReload = $.extend({},_updatereload,this.exParams);

			if(newParams) {

				if (newParams.updateUrl)
					_updateUrl = newParams.updateUrl;

				if (newParams.addUrl)
					_addUrl = newParams.addUrl;

			}

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
					dataGrid: dataGrid,
					//exParams: exParams
				};


			if(opType == "add"){
				params.callback = this.addSuccess;
			}else{
				params.callback = this.editSuccess;
			}

			//if there is newParams then update oldParams
			params = this.getNewParams(params,newParams);
			_dataControl(params);


		},

		searchGrid: function() {
			//console.log(this.preId);
			this.dataGrid.datagrid('load', this.searchObj(this.preId));

		},

		searchObj: function(preId) {

			return {
				searchStr: $.trim($("#" + preId + "SearchStr").val()),
				status: $("#" + preId + "Status").val(),
				sort: $("#" + preId + "Sort").val(),
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
					//BasicModule.add();
					_add();
				})
			} else {
				// 无同名，确认继续
				//BasicModule.add();
				_add();
			}

		},

		editSuccess: function(data) {
			//console.log("editcallback");

			if (data.indexOf("confirm|") == 0) {
				// 有同名
				showConfirm(data.substring(8), function () {
					// 确认继续
					//BasicModule.update();
					_update();
				});
			} else {
				// 无同名，确认继续
				//BasicModule.update();
				_update();
			}

		},

		editCallBack: function() {

			//write from everyobject

		},

		showCallBack: function() {

			////write from everyobject

		},

		// Ajax Callback Block End

		getAddParams: function(exParams) {

			return $.extend({},this.addParams,exParams);

		},

		getType: function(obj,rowData) {

			if(rowData.typeKey){
				obj.typeKey = rowData.typeKey;
			}

			// for centerOrg.js
			if(this.orgTypeId != null){
				obj.orgTypeId = this.orgTypeId;
			}

			return obj;

		},

		getNewParams: function(old,newParams) {

			 return $.extend({},old,newParams);

		},

		submit: function() {

			console.log("submit");
			$('form').submit(function(event){
				//避免重复提交
				console.log("sumbit1");
				event.preventDefault();
			});

		},

	});

	return BM;

}(jQuery));
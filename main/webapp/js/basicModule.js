
/***
 *@ClassName: basicModule.js
 * @Description: TODO(共用模块-JS)
 * @date 2016年01月27日
 * @author 陈书贤
 * @updgradeDate 2016/03/10
 ***/
var BasicModule,BM;

BM = BasicModule = (function($){


		var
			BM = BasicModule = {},
			METHOD = CB.METHOD,
			POPDIV = CB.POPDIV,
			_dataStore = {},
			_dataGrid = {},
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
					BM.showMessage("请选择要删除的数据!");
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
					BM.showMessage("名称" + _getItemsMsg(names) + "启用状态，不允许删除!");
					return false;
				}

				data = {ids: ids.join(",")};
				if(params.data){
					data = params.data;
				}

				$.alerts.confirm("是否删除所选中的记录？","提示", function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: data,
							success: function (data) {
								//data = CB.DELSUCC;
								if(data.indexOf("succ|") == 0){
									data = CB.DELSUCC;
								}
								BM.resolutionData(data);
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
					BM.showMessage("当前选中记录已启用，不允许删除!");
					return;
				}
				//$.messager.confirm("提示", "是否删除当前记录？ ", function (r) {
				$.alerts.confirm( "是否删除当前记录？ ","提示", function (r) {
					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: data,
							success: function (data) {

								if(data.indexOf("succ|") == 0){
									data = CB.DELSUCC;
								}

								BM.resolutionData(data);
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
					logParent = params.logParent,
					confirmMeg,operatioType,newVal,data;


				if (id == '' || val == '') {
					BM.showMessage('请选择操作记录!');
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

				$.alerts.confirm(confirmMeg, "提示",  function (r) {

					if (r) {
						$.ajax({
							url: url,
							type: METHOD,
							data: data,
							success: function (data) {
								BM.resolutionData(data);
								if(data.indexOf("err|") == 0){
									dataGrid.datagrid('refreshRow', index);
									return;
								}
								dataGrid.datagrid('updateRow', {
									index: index,
									row: {
										status: newVal
									}
								});
								//若为父grid需要记录状态时
								if(logParent) {
									BasicModule.parentStatus = newVal;
								}
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


				_dataStore = params.data;
				_dataGrid = params.dataGrid;
				BM.currentEvent = params.opType;
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

				// 检查是否同名
				if(params.existUrl){

					$.ajax({
						url: params.existUrl,
						type: params.Method,
						data: params.data,
						success:function(data){
							var next = BM.resolutionData(data);
							if(next){
								params.callback(data);
							}

						},error: function(data){
							console.log(data);
						}

					});

				}else{


					if(BM.currentEvent == "add"){
						BasicModule.add();
					} else {
						BasicModule.update();
					}

				}

			},

			_commonAjax= function(params) {

				var
					url = params.url,
					rd = params.rd,
					dataGrid = params.dataGrid,
					data = params.data,
					currentEvent = BM.currentEvent,
					dgAction;

				if(currentEvent == "add"){
					dgAction = "load";
				}else{
					dgAction = "reload";
				}

				$.ajax({
					url: url,
					type: METHOD,
					data: data,
					success: function (response) {

						var err = response.indexOf("err|"),
							info = response.indexOf("info|");

						BM.resolutionData(response);

						if(err != 0 && info != 0) {
							dataGrid.datagrid(dgAction, rd);
							$("#" + POPDIV).hide();
						}else{
							$("#editBtn").attr("disabled", false);
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
						obj.beforeSubmit();

					}else{
						obj.editDictCode();
					}

				};


				$('form').form({
					onSubmit:function(){
						var check = $(this).form('validate');
						if (check) {
							return check;
						}else {
							$("#editBtn").attr("disabled",false);
							return check;
						}

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
					//dialogHeight = params.height,
					beforeCB = params.BCB,
					vbFunc = params.vbFunc,
					obj = this;

				//console.log(dialogHeight);


				$("#"+POPDIV).load(url, data, function () {
					dialog(POPDIV, {width: dialogWidth}, callbackFun);
					obj[vbFunc](); //资料验证函数名称
					//$('input').validatebox('disableValidation');
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
					BCB:null,
					vbFunc:"validateBox"
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
		checkStatus:true,
		//params:{},
		addParams: {
			id:'',
			opType:'add'
		},
		addreload: {
			searchStr:"",
			status:"",
			sort:"2"
		},
		updatereload: {
			searchStr:"",
			status:"",
			sort:""
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
				_preId = this.preId,
				searchStr = this.searchHold == undefined ? CB.SEARCHHOLDER.COMMON : this.searchHold;

			//权限验证
			this.checkAuth(_preId);

			//初始时发状态设为undefined;
			//this.currentEvent = undefined;
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
				obj.searchGrid();
			});


			$("#" + _preId + "Add").on("click", function () {
				obj.addPop();
			});

			// deleteBatch
			$("#" + _preId + "DeleteBatch").on("click",function() {
				obj.deleteBatch();
			});

			//设置查询栏中的值
			$("#" + _preId + "SearchStr").attr("placeholder",searchStr);
			//设定 toolTip
			$("#" + _preId + "SearchStr").tooltip({
				content: "<span style='color:#000000'>" + searchStr + "</span>",
				onShow: function() {
					$(this).tooltip('tip').css({
						backgroundColor: '#fff',
						borderColor: '#666'
					});
				}
			});


		},

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
				id: rowData.stringId,
				opType: "edit",
				orgId: this.orgId
			};

			editParams = _getType.call(this,editParams,rowData);
			if(!DDP.data)
				DDP.data = editParams;

			editStatus = rowData.status;
			//console.log("DDP"+DDP.InfoUrl);
			if (this.checkStatus && editStatus == true) {
				BM.showMessage('当前选中记录已启用，不允许修改！');
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
					opType:'view',
					orgId: this.orgId
				};

			showParams = _getType.call(this,showParams,rowData);

			if(!DDP.data)
				DDP.data = showParams;

			BM.rowData = rowData;
			this.currentEvent = "view";
			_Dialog.call(this,DDP);

		},

		/* 弹出详情信息框 */
		copyDialog: function(rowData,newParams) {

			var
				DDP,copyParams,
				params = _defaultDialogParams.call(this);
			params.callback = this.copyCallBack;
			DDP =  this.getNewParams(params,newParams);
			copyParams = {
				id:rowData.stringId,
				opType:'copy'
			};

			copyParams = _getType.call(this,copyParams,rowData);

			if(!DDP.data)
				DDP.data = copyParams;

			BM.rowData = rowData;
			this.currentEvent = "copy";
			_Dialog.call(this,DDP);

		},

		commonPop: function(newParams){
			console.log("check");
			var
				params = _defaultDialogParams.call(this),
				DDP =  this.getNewParams(params,newParams);

			this.currentEvent = "add";

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

			var id = rowData.stringId ? rowData.stringId : rowData.idString,
				params = {
				url: this.changeStatusUrl,
				dataGrid: this.dataGrid,
				id: id,
				val: rowData.status.toString(),
				index: index,
				logParent:false,
				callback: this.changeStatusCallBack
			}

			params = this.getNewParams(params,newParams);

			_changeStatus(params);

		},

		trimFromData: function(data) {

			$.each(data,function(i,item){
				data[i].value = $.trim(item.value);
			});

			return data;
		},

		editDictCode: function(newParams) {

			var
				opType = this.currentEvent,
				//data = $("#InfoForm").serialize(),
				data = $("#InfoForm").serializeArray(),
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
			_addNewReload = $.extend({},this.addreload,this.exParams);
			_updateNewReload = $.extend({},this.searchObj(this.preId),this.exParams);
			//console.log(data);

			if(newParams) {

				if (newParams.updateUrl)
					_updateUrl = newParams.updateUrl;

				if (newParams.addUrl)
					_addUrl = newParams.addUrl;

			}

			if(opType == "add" || opType == "copy"){
				params.callback = this.addSuccess;
			}else{
				params.callback = this.editSuccess;
			}

			//if there is newParams then update oldParams
			params = this.getNewParams(params,newParams);
			//console.log(data);

			//进行form表单前后空白清除
			params.data = this.trimFromData(params.data);

			_dataControl(params);

		},

		add: function() {

			var
				params = {
					rd: _addNewReload,//$.extend(_addreload,_exParams),
					url: _addUrl,
					dataGrid: _dataGrid,
					data: _dataStore
				};

			_commonAjax(params);
		},

		update: function() {

			var
				params = {
					rd: _updateNewReload,//$.extend(_updatereload,_exParams),
					url: _updateUrl,
					dataGrid: _dataGrid,
					data: _dataStore
				};

			_commonAjax(params);

		},

		commonAdd: function(params) {
			_commonAjax(params);
		},

		searchGrid: function(newParams) {
			//console.log(this.preId);

			var
				searchObj =this.searchObj(this.preId),
				params ={
					dataGrid: this.dataGrid,
					searchObj: searchObj
				};

			if (newParams) {
				if(newParams.searchObj.searchStr){
					newParams.searchObj.searchStr = $.trim(newParams.searchObj.searchStr);
				}
			}

			if(newParams)
				params = this.getNewParams(params,newParams);

			if(searchObj.searchStr.indexOf("$") >= 0){
				BM.showMessage("查询字串中不可以有 $ 符号");
			}else{
				params.dataGrid.datagrid('load', params.searchObj);
			}


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
			console.log("successcallback");
			console.log(data);
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
					if(BM.resolutionData(data)){
						BasicModule.add();
					}
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
				if(BM.resolutionData(data)){
					BasicModule.update();
				}
				//_update();
				// 无同名，确认继续
				
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
		copyCallBack: function(){},
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

			checkedItems = _dataGrid.datagrid("getChecked");

			$.each(checkedItems,function(index,item){
				if(item.stringId)
					ids.push(item.stringId);
				else
					ids.push(item.idString);
			});

			return ids;
		},

		submit: function() {
			//$("#editBtn").attr("disabled","disabled");
			$('form').submit(function(event){
				//避免重复提交
				console.log("sumbit1");
				$("#editBtn").attr("disabled", true);
				event.preventDefault();
			});

		},

		//将右侧的DATA像左侧移的BUTTON
		leftShiftBtn: function(localArr) {
			var rightProjectData = $("#addCheckProjectRight").datagrid('getSelections'),
				leftData = $("#addCheckProjectLeft").datagrid('getRows'),
				leftLen = leftData.length,
				localArrLen = localArr.length,
				stringId,rowIndex,rows,rightStringId,leftStringId,addCheck = true;
			if(rightProjectData.length > 0) {

				makeToArray(rightProjectData).forEach(function (element, index) {
					var newrow = {
						index:0,
						row: element
					};

					rowIndex = $("#addCheckProjectRight").datagrid("getRowIndex", element);
					rightStringId = element.idString;
					if (element.stringId) {
						rightStringId = element.stringId;
					}

					if (leftLen > 0) {
						makeToArray(leftData).forEach(function (el,index) {
							if( rightStringId == el.stringId ) {
								BM.showMessage(element.name + "已存在");
								addCheck = false;
							}
						});
					}
					if (addCheck){
						$("#addCheckProjectRight").datagrid('deleteRow', rowIndex);
						$("#addCheckProjectLeft").datagrid('insertRow', newrow);
						if ( BM.addDelCheck(BM.addTestItemIds,rightStringId) ) {
							BasicModule.addTestItemIds.push(rightStringId);
						}

						//BM.addDelCheck(BM.delTestItemIds,rightStringId);
						//本地数资料移除
						BM.removeLocalArr(localArr,rightStringId);

					}

				});
				rows = $("#addCheckProjectLeft").datagrid("getRows");
				$("#containSize").html(rows.length);
			}else{
				//alert("ring2");
				BM.showMessage('请选择要添加的项目！');
				return;
			}
		},

		//将左侧的DATA像右侧移的BUTTON
		rightShiftBtn: function(localArr) {
			var leftProjectData = $("#addCheckProjectLeft").datagrid('getSelections'),
				localArrLen = localArr.length,
				stringId,rowIndex,rows;
			if(leftProjectData.length > 0) {
				(leftProjectData).forEach(function (element, index) {
					var newrow = {
						index:0,
						row: element
					}
					rowIndex = $("#addCheckProjectLeft").datagrid("getRowIndex", element);
					$("#addCheckProjectLeft").datagrid('deleteRow', rowIndex);
					$("#addCheckProjectRight").datagrid('insertRow', newrow);
					stringId = element.idString;
					if (element.stringId)
						stringId = element.stringId;

					//BM.addDelCheck(BM.addTestItemIds,stringId);
					//添加本地数据
					if(BM.addLocalArr(localArr,stringId)){
						localArr.push(element);
					}
					if ( BM.addDelCheck(BM.delTestItemIds,stringId) ) {
						BasicModule.delTestItemIds.push(stringId);
					}

				});
				rows = $("#addCheckProjectLeft").datagrid("getRows");
				$("#containSize").html(rows.length);
			}else{
				BM.showMessage('请选择要移除的项目！');
				return;
			}
		},

		//移除本地资料
		//避免资料已移至左grid，但本地查询时资料还存在
		removeLocalArr: function (localArr,stringId) {
			var len = localArr.length;
			for (var i = 0; i < len; i++) {
				if(localArr[i]){
					if (localArr[i].stringId == stringId) {
						localArr.splice(i,1);
						break;
					}
				}
			}
		},
		//新增本地资料
		//避免资料已移至右grid，但本地查询时资料找不到资料
		addLocalArr: function (localArr,stringId) {
			var len = localArr.length;
			for (var i = 0; i < len; i++) {
				if(localArr[i]){
					if (localArr[i].stringId == stringId) {
						return false;
						break;
					}
				}
			}
			return true;
		},

		//本地资料查询
		localQuery: function (rightArr,searchStr,queryItem,combSearch) {
			var len = rightArr.length,
				queryArr = [],
				qLen = queryItem.length;

			//queryArr["source"] = "local";

			//依查询字串找出所需的资料
			if(combSearch){
				for (var i = 0;  i < len; i++) {
					//console.log("input:" + searchStr[0] + "," + searchStr[1]);
					//console.log(rightArr[i]["codeNo"].indexOf($.trim(searchStr[0])));
					//console.log(rightArr[i]["name"].indexOf($.trim(searchStr[0])));

						if( (rightArr[i]["codeNo"].indexOf($.trim(searchStr[0])) != -1 ||
							rightArr[i]["name"].indexOf($.trim(searchStr[0])) != -1) &&
							rightArr[i]["regionName"].indexOf($.trim(searchStr[1])) != -1){
							queryArr.push(rightArr[i]);
						}

				}

			} else {
				if(searchStr != ""){
					for (var i = 0;  i < len; i++) {
						for (var j = 0; j < qLen; j++){
							if( rightArr[i][queryItem[j]].indexOf($.trim(searchStr)) != -1){
								queryArr.push(rightArr[i]);
								break;
							}
						}
					}
				} else {
					//若为查询语句为空回传所有资料。
					queryArr = rightArr;
				}
			}


			//进行资料过滤，清除在左gird中出现过的资料
			//queryArr = BM.dataFilter(queryArr);
			BM.dataFilter(queryArr);

		},

		dataFilter: function (localArr) {
			var
				leftData = $("#addCheckProjectLeft").datagrid('getRows'),
				leftLen = leftData.length,
				localLen = localArr.length;

			for ( var i = 0; i < leftLen; i++ ) {
				for ( var j = 0; j < localLen; j++) {
					if ( leftData[i].stringId == localArr[j].stringId ) {
						localArr.splice(j,1);
						localLen = localLen - 1;
						break;
					}
				}
			}

			localArr["source"] = "local";

			$("#addCheckProjectRight").datagrid("loadData",localArr);
			//return localArr;

		},
		//进行id确认，id不可以同时在两个array中出现不然会报错。
		//增加时remove del，减少时remove add
		addDelCheck: function (Obj,stringId) {
			var len = Obj.length,
				push = true;
			for (var i = 0; i < len; i++) {
				if ( Obj[i] == stringId ) {
					push = false;
					break
				}
			}
			return push;
		},

		arrayClean: function() {
			////页面关闭按钮,解决 KH-826 BUG
				//console.log("clean");
				BM.addTestItemIds = [];
				BM.delTestItemIds = [];

		},

		//机构选择
		orgSelect: function(_preId, obj) {

			$("#" +_preId + "OrgList").datagrid({

				url: ctx + "/local_inst/instruments/centerOrgPageList",
				method: 'POST',
				queryParams: "",
				height: ($(window).height() < 700) ? 400 : 400,
				fitColumns : true,
				striped : true,
				checkOnSelect : false,

				onClickCell: function(index, field){

					var rows = $("#" + _preId + "OrgList").datagrid("getData").rows[index];
					obj.orgId = rows.stringId;
					obj.orgName = rows.name;

					$("#"+ _preId +"OrgPop input[type='radio']:eq("+index+")").attr("checked",true);
				},
				loadFilter: function (data) {

					// console.log(data);
					var params = {total:0,rows:[]};
					if(data)
						return data;
					else
						return params;

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

		comboboxCreate: function(obj,data,validate) {
			var params = {
				valueField: "id",
				textField: "text",
				height:30,
				data:data
			};
			obj.combobox(params);
			obj.combobox("setValue",obj.data('val'));
		},

		//上传档案
		uploadSave: function() {
			//var data =  $("#InfoForm").serialize();
			var fd = new FormData(),
				id = $("#editId").val(),
				file = $("#upload").get(0).files[0],
				obj = this;

			if(!file){
				BM.showMessage("请选择文件");
				return;
			}

			//console.log(file.size);
			if (file.size > 10485760) {
				BM.showMessage("档案不可超出 10 MB!");
				return;
			}

			fd.append("upload", 1);
			fd.append("file", file);
			fd.append("id",id);
			$.ajax({
				url: this.uploadUrl,
				data: fd,
				type: CB.METHOD,
				processData: false,
				contentType: false,
				success: function(data){
					BM.resolutionData(data);
					obj.dataGrid.datagrid("reload");
					$("#"+CB.POPDIV).hide();
				}
			});
		}


	});

	return BM;

}(jQuery));

//千万不要删，删了会出现kh-913的bug
$(function(){
	$('#site-content').tabs({
		fit: true
	});
});
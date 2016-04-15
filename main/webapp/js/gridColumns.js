/*
 * 2016/1/14
 * easyui column_collect
 * 存放所有grid的栏位
 * 作者: chenshuxian
 */
var ColCollect;

ColCollect = (function($){
	
	//县浮字串提示
	var
		_helpTip = "<span class='help-tips'>",
		_editStr = "<i class='help-tips-content'>编辑</i></span>",
		_delStr = "<i class='help-tips-content'>删除</i></span>",
		_statusStr = "<i class='help-tips-content'>启用</i></span>",
		_statusStrStop = "<i class='help-tips-content'>停用</i></span>",
		_resetStr = "<i class='help-tips-content'>重置密码</i></span>",
		_roleStr = "<i class='help-tips-content'>分配角色</i></span>",
		_instStr = "<i class='help-tips-content'>通讯设置</i></span>",
		_copyStr =  "<i class='help-tips-content'>复制添加</i></span>",
		_resetAdmin = "<i class='help-tips-content'>设置管理员</i></span>",
		_orgInit = "<i class='help-tips-content'>系统初始化</i></span>",
		_uploadStr = "<i class='help-tips-content'>上传档案</i></span>",
		_downloadStr = "<i class='help-tips-content'>下载档案</i></span>";

	//共用的操作区块
	var _operation = function(value, row, index, obj){
		var str = "";
		var rowData = JSON.stringify(row);
		rowData = rowData.replace(/\s/g,"&nbsp;");
		str += _helpTip + "<a class='icon icon-edit' onclick="+ obj +".editRow(" + rowData + ")></a>" + _editStr ;
		str += _helpTip + "<a class=\"icon icon-trash\" onclick="+ obj +".deleteRow(" + index + "," + rowData + ")></a>" + _delStr;
		return str;
	}
	//共用的浏览区块
	var _showDialog = function(value,row,obj){
		var rowData = JSON.stringify(row);
		rowData = rowData.replace(/\s/g,"&nbsp;");
		return "<a onclick="+ obj +".showDialog(" + rowData + ")>" + value + "</a>";
	}

	//共用的状态区块
	var _status = function(value,row,index,obj){
		var rowData = JSON.stringify(row);
		rowData = rowData.replace(/\s/g,"&nbsp;");
		var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange="+ obj +".changeStatus(" + index + "," + rowData + ")><i></i></div>"  + _statusStrStop ;
		if (value == '1') {
			returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange="+ obj +".changeStatus(" + index + "," + rowData + ")><i></i></div>" + _statusStr;
		}
		return _helpTip + returnStr;
	}

	//共用的特殊状态区块
	var _statusEx = function(value,row,index,obj){
		var rowData = JSON.stringify(row);
		rowData = rowData.replace(/\s/g,"&nbsp;");
		var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange="+ obj +".changeStatusEx(" + index + "," + rowData + ")><i></i></div>"  + _statusStrStop ;
		if (value == '1') {
			returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange="+ obj +".changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStr;
		}
		return _helpTip + returnStr;
	}

	//空白栏位取代
	var _replaceBlank = function(str) {
		return str.replace(/\s/g,"&nbsp;");
	}

	//
	var _stringLimit = function(str) {

			if (str.length > CB.COLMAXLEN) {
				return str.substring(0, CB.COLMAXLEN) + "……";
			} else {
				return str;
			}

	}


	var _getCtrTubeType = function(obj){
		
		 var _columns = [[
			                 {field: "ck", checkbox: true, width: 30},
			                 {
			                     title: "编码", field: 'codeNo', formatter: function (value, row) {
			                     	return _showDialog(value,row,obj);
			                     }
			                 },
			                 {title: "中文名称", field: 'name', flex: 1, width: 80},
			                 {title: "英文简称", field: 'enShortName', flex: 1, width: 60},
			                 {title: "英文名称", field: 'enName', flex: 1, width: 70},
			                 {title: "WHONET编码", field: 'whonetCode', flex: 1, width: 60},
			                 {title: "助记符", field: 'fastCode', flex: 1, width: 60},
			                 {title: "顺序号", field: 'displayOrder', flex: 1, width: 30},
			                 {title: "备注", field: 'memo', width: 200, formatter: function(value){ return _stringLimit(value)}},
			                 {
								 title: "状态", field: 'status', formatter: function (value, row, index) {
									return _status(value,row,index,obj);
							 	 }
			                 },
			                 {
			                     title: "操作", field: 'opt', width: 60, align: 'center',
			                     formatter: function(value,row,index) {
									 return _operation(value, row, index, obj);
								 }
			                 }
			                 
			            ]];
		 
		 return _columns;
	}
	
	/***
	 * 醫療机構維護及独立实验室
	 * 区域管理机构维护
	 * date:2016/1/15
	 * author:chenshuxian
	 */
	var _getMedInst = function(obj){
		
		 var _columns = [
			                 {field: "ck", checkbox: true, width: 30},
			                 {
			                     title: "编码", field: 'codeNo', formatter: function (value, row) {
									 return _showDialog(value,row,obj);
			                     }
			                 },
			                 {title: "卫生机构代码", field: 'nacaoId', flex: 1, width: 40},
							 //{title: "网站地址", field: 'webUrl', flex: 1, width: 40},
			                 {title: "所属地区", field: 'regionName', flex: 1, width: 20},
			                 {title: "中文名称", field: 'name', flex: 1, width: 60},
			                 {title: "中文地址", field: 'address', flex: 1, width: 80},
			                 {title: "联系人", field: 'contacts', flex: 1, width: 20},
			                 {title: "联系电话", field: 'telephone', flex: 1, width: 20},
			                 {title: "助记符", field: 'fastCode', flex: 1, width: 20},
			                 {title: "顺序号", field: 'displayOrder', flex: 1, width: 20}
			                 
			 ],
			 status = {
				 title: "状态", field: 'status', formatter: function (value, row, index) {
					return _status(value,row,index,obj);
				 }

			 },
			 status2 ={
				 title: "状态", field: 'status', formatter: function (value, row, index) {
					 return _statusEx(value,row,index,obj);
				 }

			 },
			 operation =  {
				 title: "操作", field: 'opt', width: 60, align: 'center',
				 formatter: function (value, row, index) {
					 return _operation(value, row, index, obj);
				 }
			 },
			 operation2 =  {
				 title: "操作", field: 'opt', width: 60, align: 'center',
				 formatter: function (value, row, index) {
					 var str = "";
					 var rowData = JSON.stringify(row);
					 rowData = rowData.replace(/\s/g,"&nbsp;");
					 str += _helpTip + "<a class='icon icon-edit' onclick="+ obj +".editRow(" + rowData + ")></a>" + _editStr ;
					 str += _helpTip + "<a class=\"icon icon-trash\" onclick="+ obj +".deleteRowEx(" + index + "," + rowData + ")></a>" + _delStr;
					 return str;
				 }
			 };

		if(obj == "RegionalManagement"){
			_columns.push(status2,operation2);
		}else{
			_columns.push(status,operation);
		}

		 
		 return [_columns];
	}
	
	/***
	 * 中心仪器信息
	 * date:2016/1/16
	 * author:chenshuxian
	 */
	var _getInstrument = function(obj){
		
		 var _columns = [[
			                 {field: "ck", checkbox: true, width: 30},
			                 {
			                     title: "编码", field: 'codeNo', formatter: function (value, row) {
									 return _showDialog(value,row,obj);
			                     }
			                 },
			                 {title: "仪器名称", field: 'name', flex: 1, width: 20},
			                 {title: "仪器型号", field: 'model', flex: 1, width: 20},
			                 {title: "单列报告模板", field: 'rep', flex: 1, width: 20},
			                 {title: "默认标本类型", field: 'sampleTypeName', flex: 1, width: 60},
			                 {title: "顺序号", field: 'displayOrder', flex: 1, width: 30},
			                 {title: "仪器类型", field: 'typeName', flex: 1, width: 20},
			                 {
			                	 title: "通讯参数", field: 'stringId', width: 20, align: 'center',
			                	 formatter: function (value, row, index) {
			                         var str = "";
			                         //var rowData = JSON.stringify(row);
			                         str += "<a class='icon icon-edit' onclick=" + obj + ".showParamsInfo('" + value + "')></a>";		                
			                         return str;
			                     }
			                	 
			                 },
			                 {
			                     title: "状态", field: 'status', formatter: function (value, row, index) {
									 return _status(value,row,index,obj);
			                     }
	
			                 },
			 				{
								 title: "操作", field: 'opt', width: 60, align: 'center',
								 formatter: function (value, row, index) {
									 return _operation(value, row, index, obj);
								 }
							 }

			 ]];

		 
		 return _columns;
	}
	
	/***
	 * 中心仪器信息
	 * date:2016/1/16
	 * author:chenshuxian
	 */
	var _getlogQ = function(obj){
		
		 var _columns = [[ 
		                   	  {title : "操作项目",field : "summary",width : 120},
				              {title : "操作类型",field : "functionDesc",width : 70}, 
				              {title : "操作内容",field : "description",width : 450}, 
				              {title : "操作人",field : "userName",width : 60},
				              {title : "操作时间",field : "operateTime",width : 70}			                 
			            ]];
		 
		 return _columns;
	}
	
	
	/***
	 * 客戶盒子
	 * date:2016/1/21
	 * author:chenshuxian
	 */
	var _getBox = function(obj){
		
		 var _columns = [[ 
							{field: "ck", checkbox: true, width: 30},
							{
							    title: "编码", field: 'codeNo', formatter: function (value, row) {
									return _showDialog(value,row,obj);
							    }
							},
							{title: "盒子修码", field: 'boxBarCode', flex: 1, width: 20},
							{title: "盒子IP", field: 'boxIP', flex: 1, width: 20},
							{title: "备注", field: 'memo', flex: 1, width: 20, formatter: function(value){ return _stringLimit(value)}},
							{title: "顺序号", field: 'displayOrder', flex: 1, width: 20},
							{
			                     title: "状态", field: 'status', formatter: function (value, row, index) {
									return _status(value,row,index,obj);
			                     }
	
			                },
							{
			                     title: "操作", field: 'opt', width: 60, align: 'center',
			                     formatter: function (value, row, index) {
									 return _operation(value, row, index, obj);
			                     }
			 				}
			            ]];
		 
		 return _columns;
	}
	
	/***
	 * 客戶盒子搜尋框
	 * date:2016/1/21
	 * author:chenshuxian
	 */
	var _getBoxSub = function(obj){
		
		 var _columns = [[ 
							{title: "编码", field: 'codeNo', flex: 1, width: 20},
							{title: "中文名称", field: 'name', flex: 1, width: 20},
							{title: "所属地区", field: 'regionName', flex: 1, width: 20}
							
			            ]];
		 
		 return _columns;
	}
	
	/***
	 * 用户管理
	 * date:2016/1/21
	 * author:chenshuxian
	 */
	var _getAuthUser = function(obj){
		
		 var _columns = [
		                  {field: "ck", checkbox: true, width: 30},
		                  {
		                      title: "用户帐号", field: 'userNo', width: 80, formatter: function (value, row) {
							  		return _showDialog(value,row,obj);
						  		}
		                  },
		                  {title: "用户名称", field: 'userName', flex: 1, width: 60},
		                  {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
		                  {title: "备注", field: 'memo', width: 400, formatter: function(value){ return _stringLimit(value)}},
		                  {
		                      title: "状态", field: 'status', formatter: function (value, row, index) {
							 	 return _statusEx(value,row,index,obj);
		                 	  }

		                  }
			 ],
			 opt;

		if(obj == "OrgInit2"){
			opt = {
				title: "操作", field: 'opt', width: 60, align: 'center',
					formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					str += _helpTip + "<a class=\"icon icon-lock-b\" onclick=" + obj + ".resetPassword(" + rowData + ")></a>" + _resetStr ;
					return str;
				}
			};
		}else{
			opt = {
				title: "操作", field: 'opt', width: 60, align: 'center',
					formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					str += _helpTip + "<a class='icon icon-edit' onclick=" + obj + ".editRow(" + rowData + ")></a>" + _editStr ;
					str += _helpTip + "<a class=\"icon icon-lock-b\" onclick=" + obj + ".resetPassword(" + index + "," + rowData + ")></a>" + _resetStr ;
					str += "<a class=\"icon icon-user J_ShowPop J_DataRest\" onclick=" + obj + ".showUserGroupDialog(" + index + "," + rowData + ")></a>";
					return str;
				}
			};
		}

		_columns.push(opt);
		 return [_columns];
	}

	/***
	 * resultType
	 * date:2016/2/14
	 * author:chenshuxian
	 */
	var _getResultType = function(obj) {

		var _columns = [[
			{field: "ck", checkbox: true, width: 30},
			{
				title: "编码", field: 'codeNo', formatter: function (value, row) {
				return _showDialog(value,row,obj);
			}
			},
			{title: "中文名称", field: 'name', flex: 1, width: 60},
			{title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
			{
				title: "状态", field: 'status', formatter: function (value, row, index) {
					return _status(value,row,index,obj);
				}
			},
			{
				title: "操作", field: 'opt', width: 60, align: 'center',
				formatter: function (value, row, index) {
					return _operation(value, row, index, obj);
				}
			}
		]];

		return _columns;

	}

	/***
	 * resultType
	 * date:2016/2/14
	 * author:chenshuxian
	 */
	var _getResultType2 = function(obj) {

		var _columns = [[

			{field: "ck", checkbox: true, width: 30},
			{title: "结果描述", field: 'resultValue', flex: 1, width: 60},
			{title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
			{title: "助记符", field: 'fastCode', flex: 1, width: 60},
			{
				title: "操作", field: 'opt', width: 60, align: 'center',
				formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					str += "<a class='icon icon-edit' onclick=ResultType.editResultDesc(" + rowData + ")></a>";
					str += "<a class=\"icon icon-trash\" onclick=ResultType.deleteResultDesc(" + index + "," + rowData + ")></a>";
					return str;
				}
			}
		]];

		return _columns;

	}

	/***
	 * 区域管理机构维护2
	 * date:2016/2/26
	 * author:chenshuxian
	 */
	var _getMedInst2 = function(obj){

		var _columns = [[

			{field: "ck", checkbox: true, width: 30},
			{
				title: "编码", field: 'codeNo', formatter: function (value, row) {
				return _showDialog(value,row,obj);
			}
			},
			{title: "中文名称", field: 'name', flex: 1, width: 60},
			{title: "中文地址", field: 'address', flex: 1, width: 200},
			{title: "联系人", field: 'contacts', flex: 1, width: 60},
			{title: "联系电话", field: 'telephone', flex: 1, width: 60},
			{
				title: "状态", field: 'status', formatter: function (value, row, index) {
				var rowData = JSON.stringify(row);
				rowData = _replaceBlank(rowData);
				var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange=RegionalManagement.changeRelatedStatus(" + index + "," + rowData + ")><i></i></div>" + _statusStrStop;
				if (value == '1') {
					returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange=RegionalManagement.changeRelatedStatus(" + index + "," + rowData + ")><i></i></div>" + _statusStr;
				}
				return _helpTip + returnStr;
			}
			},
			{
				title: "操作", field: 'opt', width: 60, align: 'center',
				formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					str += "<a class=\"icon icon-trash\" onclick=RegionalManagement.deleteRelated(" + index + "," + rowData + ")></a>";
					return str;
				}
			}

		]];

		return _columns;
	}

	/***
	 * LOINC編碼表
	 * date:2016/03/01
	 * author:chenshuxian
	 */
	var _getLoinc = function(obj){

		var _columns = [[

			{field: "ck", checkbox: true, width: 30},
			{
				title: "编码", field: 'codeNo', formatter: function (value, row) {
					return _showDialog(value,row,obj);
				}
			},
			{title: "受检成份", field: 'componentName', flex: 1, width: 60},
			{title: "受检属性", field: 'testPropertyName', flex: 1, width: 60},
			{title: "检验方法", field: 'testMethodName', flex: 1, width: 60},
			{title: "样本标识", field: 'typeOfScaleName', flex: 1, width: 60},
			{title: "时间特征", field: 'timeAspectName', flex: 1, width: 60},
			{title: "标本类型", field: 'sampleTypeName', flex: 1, width: 60},
			{title: "助记符", field: 'fastCode', flex: 1, width: 60},
			{title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
			{
				title: "备注", field: 'memo', width: 200, formatter: function(value){return _stringLimit(value)}
			},
			{
				title: "状态", field: 'status', formatter: function (value, row, index) {
					return _status(value,row,index,obj);
				}

			},
			{
				title: "操作", field: 'opt', width: 60, align: 'center',
				formatter: function (value, row, index) {
					return _operation(value,row,index,obj);
				}
			}
		]];

		return _columns;
	}

	/***
	 * 客户盒子登记
	 * date:2016/03/02
	 * author:chenshuxian
	 */
	var _getCIB = function(obj){

			var _columns = [[
				{field: "ck", checkbox: true, width: 30},
				{
					title: "编码", field: 'code_no',formatter: function (value, row) {
						return _showDialog(value,row,obj);
					}
				},
				{title: "盒子条码", field: 'box_barcode', flex: 1, width: 100},
				{title: "盒子IP", field: 'box_ip', flex: 1, width: 100},
				{title: "顺序号", field: 'display_order', flex: 1, width: 60},
				{title: "备注", field: 'memo', width: 200, formatter: function(value){ return _stringLimit(value)}},
				{
					title: "状态", field: 'status', formatter: function (value, row, index) {
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange=CtrInstrBoxs.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStrStop;
					if (value == '1') {
						returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange=CtrInstrBoxs.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStr;
					}
						return _helpTip + returnStr;
					}

				},
				{
					title: "操作", field: 'opt', width: 60, align: 'center',
					formatter: function (value, row, index) {
						var str = "";
						var rowData = JSON.stringify(row);
						rowData = _replaceBlank(rowData);
						str += "<a class='icon icon-edit' onclick=CtrInstrBoxs.editRow(" + rowData + ")></a>";
						str += "<a class=\"icon icon-trash\" onclick=CtrInstrBoxs.deleteRowEx(" + index + "," + rowData + ")></a>";
						return str;
					}
				}
			]];

			return _columns;

		}

	/***
	 * 检验项目
	 * date:2016/03/08
	 * author:chenshuxian
	 */
	var _getTestItem = function(obj){

		var _columns = [[
			{field : "ck",checkbox : true,width : 30},
			{title : "达安标准码",field : 'codeNo',flex : 1,width : 60},
			{title : "项目名称",field : 'name',flex : 1,width : 60},
			{title : "英文名称",field : 'enName',flex : 1,width : 60},
			{title : "英文简称",field : 'enShortName',flex : 1,width : 60},
			{title : "项目性别",field : 'sexId',flex : 1,width : 60,
				formatter : function(value) {
					var returnStr = '不限';
						if (value == '1') {
							returnStr = '男';
						}
						if (value == '2') {
							returnStr = '女';
						}
							return returnStr;
						}},
			{title : "检验方法",field : 'testMethodName',flex : 1,width : 60},
			{title : "医学专业组",field : 'disciplineName',flex : 1,width : 60},
			{title : "默认标本类型",field : 'sampleTypeName',flex : 1,width : 60},
			{title : "助记符",field : 'fastCode',flex : 1,width : 60},
			{title : "顺序号",field : 'displayOrder',flex : 1,width : 60},
			{
				title: "状态", field: 'status', formatter: function (value, row, index) {
				var rowData = JSON.stringify(row);
				rowData = _replaceBlank(rowData);
				var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='TestItem.changeStatusEx(" + index + "," + rowData + ")'><i></i></div>" + _statusStrStop;
				if (value == '1') {
					returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='TestItem.changeStatusEx(" + index + "," + rowData + ")'><i></i></div>" + _statusStr;
				}
				return _helpTip + returnStr;
			}
			},
			{title : "操作",field : 'opt',width : 60,align : 'center',
				formatter : function(value, row,index) {
					var str = "";
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					str += "<a class='icon icon-edit' onclick='TestItem.editRowEx(" + rowData + ")'></a>";
					str += "<a class=\"icon icon-trash\" onclick='TestItem.deleteRowEx(" + index + "," + rowData + ")'></a>";
					return str;
				}
			}
		]];

		return _columns;

	}

	/***
	 * 组合项目
	 * date:2016/03/11
	 * author:chenshuxian
	 */
	var _getTestItemGroup = function(obj){

		var _columns =[[
			{field: "ck", checkbox: true, width: 30},
			{title: "编码", field: 'codeNo',
				formatter: function (value, row) {
					return _showDialog(value,row,obj);
				}
			},
			{title: "中文名称", field: 'name', width: 80},
			{title: "英文名称", field: 'enShortName', width: 80},
			{title: "英文简称", field: 'enName', width: 80},
			{title: "默认标本类型", field: 'sampleTypeName',width: 80},
			{title: "助记符", field: 'fastCode', width: 80},
			{title: '顺序号', field: 'displayOrder', align: 'center'},
			{title: "状态", field: 'status',
				formatter: function (value,row,index) {
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange=testItemGroupMain.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStrStop;
					if (value == '1') {
						returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange=testItemGroupMain.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStr;
					}
					return _helpTip + returnStr;
				}
			},
			{title: "操作", field: 'opt', width: 50, align: 'center',
				formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					str += "<a class='icon icon-edit' onclick=testItemGroupMain.editRowEx(" + rowData + ")></a>";
					str += "<a class=\"icon icon-trash\" onclick=testItemGroupMain.deleteRowEx(" + index + "," + rowData + ")></a>";
					return str;
				}
			}
		]];

		return _columns;

	}

	/***
	 * 组合项目2
	 * date:2016/03/11
	 * author:chenshuxian
	 */
	var _getTestItemGroup2 = function(obj){

		var _columns = [[
			{field : "ck",checkbox : true,width : 30},
			{title : "达安标准码",field : 'codeNo',flex : 1,width : 60},
			{title : "项目名称",field : 'name',flex : 1,width : 60},
			{title : "英文简称",field : 'enShortName',flex : 1,width : 60},
			{title : "检验方法",field : 'testMethodName',flex : 1,width : 60},
			{title : "医学专业组",field : 'disciplineName',flex : 1,width : 60},
			{title : "默认标本类型",field : 'sampleTypeName',flex : 1,width : 60},
			{title : "操作",field : 'opt',width : 60,align : 'center',
				formatter : function(value, row,index) {
					var str = "";
					var rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					str += "<a class=\"icon icon-trash\" onclick=testItemGroupMain.deleteRowEx2(" + index + "," + rowData + ")></a>";
					return str;
				}
			}
		]];

		return _columns;

	}

	/***
	 * 中心仪器细菌对照
	 * date:2016/03/17
	 * author:chenshuxian
	 */
	var _getCtrInstrMics = function(obj){

		var _columns = [[
				{field : "idString", checkbox : true, width : 30},
				{title : "编码", field : 'codeNo'},
				{title : "细菌名称", field : 'name', flex : 1, width : 50},
				{title : "通道码", field : 'channelCode',  width : 50, editor : 'text'},
				{title : '打印次序', field : 'printOrder',  width : 50, editor :  {
					type:"numberbox",
					options:{
						min:0,
						max:9999
					}
				}}
			]];

		return _columns;

	}

	/***
	 * 中心仪器细菌对照
	 * date:2016/03/17
	 * author:chenshuxian
	 */
	var _getCtrInstrMics2 = function(obj){

		var _columns = [[
			{field : "idString", checkbox : true, width : 30},
			{title : "编码", field : 'codeNo'},
			{title : "抗生素名称", field : 'name', flex : 1, width : 50},
			{title : "通道码", field : 'channelCode',  width : 50, editor : 'text'},
			{title : '打印次序', field : 'printOrder',  width : 50, editor :{
				type:"numberbox",
				options:{
					min:0,
					max:9999
				}
			}}
		]];

		return _columns;

	}

	/***
	 * 中心仪器项目对照
	 * date:2016/03/22
	 * author:chenshuxian
	 */
	var _getCtrInstrItem = function(obj){

		var _columns =[[
				{field : "idString", checkbox : true, width : 30},
				{title : "达安标准码", field : 'codeNo', width : 50},
				{title : "项目名称", field : 'name', flex : 1, width : 50},
				{title : "英文简称", field : 'enShortName', width : 50},
				{title : "通道码", field : 'channelCode', width : 50, editor : 'text'},
				{title : '转换系数', field : 'factor', width : 50, editor : 'text'},
				{title : '打印次序', field : 'printOrder', width : 50, editor :{
					type:"numberbox",
					options:{
						min:0,
						max:9999
					}
				}},
				{title : '单位', field : 'unit', width : 50, editor : 'text'},
				{title : '默认标本类型', field : 'sampleTypeName', width : 50}
			]];

		return _columns;

	}

	/***
	 * 中心仪器项目对照2
	 * date:2016/03/22
	 * author:chenshuxian
	 */
	var _getCtrInstrItem2 = function(obj){

		var _columns = [[
				{field : "idString", checkbox : true, width : 30},
				{title : "标本类型", field : 'sampleTypeName', width : 50},
				{title : "性别", field : 'sexName', flex : 1, width : 50},
				{title : '年龄单位', field : 'ageUnitName', width : 50},
				{title : '起始年龄', field : 'ageMin', width : 50 ,
					formatter: function(value,row,index){
						var strArr = [],str;

						if(value.indexOf("/") >= 0){
							strArr = value.split("/");
							str = strArr[0] + "岁" + strArr[1] + "月" + strArr[2] + "天";
						}else{
							str = value;
						}

						return str;

					}
				},
				{title : '结束年龄', field : 'ageMax', width : 50,
					formatter: function(value,row,index){
						var strArr = [],str;

						if(value.indexOf("/") >= 0){
							strArr = value.split("/");
							str = strArr[0] + "岁" + strArr[1] + "月" + strArr[2] + "天";
						}else{
							str = value;
						}

						return str;

					}
				},
				{title : '参考下限', field : 'refLow', width : 50},
				{title : '参考上限', field : 'refHigh', width : 50},
				{title : '危急下限', field : 'panicLow', width : 50},
				{title : '危急上限', field : 'panicHigh', width : 50},
				{title : '警告上限', field : 'alarmHigh', width : 50},
				{title : '警告下限', field : 'alarmLow', width : 50},
				{
					title : "操作", field : 'opt', width : 50, align : 'center',
					formatter : function(value, row, index) {

						var rowData = JSON.stringify(row),
							str = "";
						rowData = _replaceBlank(rowData);
						str += "<a class='icon icon-edit' onclick=CtrInstrItem.editRowEx(" + rowData + ")></a>";
						str += "<a class=\"icon icon-trash\" onclick=CtrInstrItem.deleteRow(" + index + "," + rowData + ")></a>";
						str += "<a class=\"icon icon-copy\" onclick=CtrInstrItem.copyDialogEx(" + rowData + ")></a>";
						return str;
					}
				}
			]];

		return _columns;

	}

	/***
	 * 客户仪器信息
	 * date:2016/3/24
	 * author:chenshuxian
	 */
	var _getInstrument2 = function(obj){

		var _columns = [[
				{field : "ck", checkbox : true, width : 40},
				{title : "编码", field: 'codeNo'},
				{title : "仪器名称", field : 'name', flex : 1, width : 200},
				{title : "仪器型号", field : 'model', width : 80},
				/*{
					title : '仪器类型', field : 'typeId', width : 120,
					formatter : function(value, row, index) {
						var returnStr="";
						if (value == "0") {
							returnStr = "常规";
						}else if(value == "1"){
							returnStr = "微生物";
						}else if(value == "2"){
							returnStr = "文字报告";
						}else if(value == "3"){
							returnStr = "酶标";
						}
						return returnStr;
					}
				},*/
				{
					title : '通讯参数', field: 'cargument', width : 45,
					formatter: function (value, row, index) {

						var rowData = JSON.stringify(row);
						rowData = _replaceBlank(rowData);
						if (Instruments.showAuthrized) {
							return "<div class='editable-cell'><span class='J_ShowPop sm-size' onclick="+ obj +".showParamsInfo(" + rowData + ")>查看</span></div>";
						} else {
							return "查看";
						}
					}
				},
				{
					title : "状态", field : 'status', width : 45,
					formatter : function(value, row, index) {
						var
							rowData = JSON.stringify(row),
							returnStr ="";
						rowData = _replaceBlank(rowData);
						if (Instruments.statusAuthrized) {
							returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange=Instruments.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStrStop;
							if (value == '1') {
								returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange=Instruments.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStr;
							}
						} else {

							if (value == "1") {
								returnStr = "开启";
							}else{
								returnStr = "停用";
							}
						}
						return _helpTip + returnStr;
					}
				},
				{
					title : "操作", field : 'opt', width : 80, align : 'center',
					formatter : function(value, row, index) {

						var str = "",
							 rowData = JSON.stringify(row);
						rowData = _replaceBlank(rowData);
						if (Instruments.editAuthrized) {
							str += _helpTip + "<a class='icon icon-edit' onclick="+ obj +".editRow(" + rowData + ")></a>" + _editStr ;
						}
						if (Instruments.deleteAuthrized) {
							str += _helpTip + "<a class=\"icon icon-trash\" onclick="+ obj +".deleteRowEx(" + index + "," + rowData + ")></a>" + _delStr;
						}
						if (Instruments.copyAddAuthrized) {
							str += _helpTip + "<a class='icon icon-copy' onclick="+ obj +".copyDialog(" + rowData + ")></a>" + _copyStr;
						}
						if (Instruments.settingAuthrized) {
							str += _helpTip + "<a class=\"icon icon-edit\" onclick="+ obj +".editParamsInfo("  + rowData + ")></a>" + _instStr;
						}
						return str;
					}
				}

		]];


		return _columns;
	}

	/***
	 * 角色管理
	 * date:2016/4/8
	 * author:chenshuxian
	 */
	var _getUserGroupsMain = function(obj){

		var _columns =  [[

			        {field : "ck",checkbox : true,width : 30},
					{title : "编码",field : "codeNo",width : 80},
					{title : "名称",field : "name",flex : 1,width : 60},
					{title : "备注",field : "memo",width : 150, formatter: function(value){ return _stringLimit(value)}},
					{title : "顺序号",field : "displayOrder",width : 50,align : "center"},
					{title : "状态",field : "status",formatter : function(value, row, index) {
						var
							rowData = JSON.stringify(row),
							returnStr ="";
						rowData = _replaceBlank(rowData);
							//状态权限
							if(UserGroupsMain.statusAuthrized){
								returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange=UserGroupsMain.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStrStop;
								if (value == '1') {
									returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange=UserGroupsMain.changeStatusEx(" + index + "," + rowData + ")><i></i></div>" + _statusStr;
								}
							}else{

								if (value == "1") {
									returnStr = "开启";
								}else{
									returnStr = "停用";
								}

    						}
							return  _helpTip + returnStr;
						}
					},
					{title : "操作",field : "opt",width : 60,align : "center",
						formatter : function(value, row, index) {
							var str = "",
								rowData = JSON.stringify(row);

							rowData = _replaceBlank(rowData);
							//授权权限
							if(UserGroupsMain.offerAuthrized){
								str  += _helpTip + "<a class='icon icon-user'  onclick="+ obj +".authorization(" + rowData + ")></a><i class='help-tips-content'>授权</i></span>";
							}
							//编辑权限
							if(UserGroupsMain.editAuthrized){
								str += _helpTip + "<a class='icon icon-edit' onclick="+ obj +".editRow(" + rowData + ")></a>" + _editStr ;
							}
							//删除权限
							if(UserGroupsMain.deleteAuthrized){
								str += _helpTip + "<a class=\"icon icon-trash\" onclick="+ obj +".deleteRow(" + index + "," + rowData + ")></a>" + _delStr;
							}
                            return str;
						}
					}
		]];


		return _columns;
	}

	/***
	 * 机构系统初始化
	 * date:2016/4/13
	 * author:chenshuxian
	 */
	var _getOrgInit = function(obj){

		var _columns =  [[

			{field : "ck",checkbox : true,width : 30},
			{title : "编码",field : "appNo",width : 80},
			{title : "中文名称",field : "appName",flex : 1,width : 60},
			//{title : "顺序号",field : "displayOrder",width : 50,align : "center"},
			//{title : "备注",field : "memo",width : 150, formatter: function(value){ return _stringLimit(value)}},
			{title : "状态",field : "status",formatter : function(value, row, index) {
					return _status(value,row,index,obj);
			}
			},
			{title : "操作",field : "opt",width : 60,align : "center",
				formatter : function(value, row, index) {
					var str = "",
						rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					//授权权限
					str += _helpTip + "<a class='icon icon-user'></a>" + _orgInit;
					str += _helpTip + "<a class='icon icon-user'  onclick="+ obj +".adminSet(" + rowData + ")></a>" + _resetAdmin;
					//str += _helpTip + "<a class='icon icon-trash'  onclick="+ obj +".deleteRow(" + index + "," + rowData + ")></a>" + _delStr;

					return str;
				}
			}
		]];


		return _columns;
	}

	/***
	 * 中心报表模板维护
	 * date:2016/4/14
	 * author:chenshuxian
	 */
	var _getCtrTemplate = function(obj){

		var _columns =  [[

			{field : "ck",checkbox : true,width : 30},
			{
				title: "编码", field: 'codeNo', formatter: function (value, row) {
					return _showDialog(value,row,obj);
				}
			},
			{title : "模板名称",field : "name",width : 80},
			{title : "模板类型",field : "typeKey", formatter: function(value) {
					var str = "报告";

						if(value == 1){
							str = "条码标签";
						}else if(value == 2){
							str = "报表";
						}

					return str;

				}
			},
			{title : "顺序号",field : "displayOrder",width : 50,align : "center"},
			{title : "备注",field : "memo",width : 150, formatter: function(value){ return _stringLimit(value)}},
			{title : "状态",field : "status",formatter : function(value, row, index) {
				return _status(value,row,index,obj);
			}
			},
			{title : "操作",field : "opt",align : "center",
				formatter : function(value, row, index) {
					var str = "",
						rowData = JSON.stringify(row);
					rowData = _replaceBlank(rowData);
					//授权权限
					str += _helpTip + "<a onclick="+ obj +".upload(" + rowData + ")>上传模板</a>" + _uploadStr;
					str += _helpTip + "<a onclick="+ obj +".download(" + rowData + ")>下载模板</a>" + _downloadStr;
					str += _helpTip + "<a class='icon icon-edit'  onclick="+ obj +".editRow(" + rowData + ")></a>" + _editStr;
					str += _helpTip + "<a class='icon icon-trash'  onclick="+ obj +".deleteRow(" + index + "," + rowData + ")></a>" + _delStr;

					return str;
				}
			}
		]];


		return _columns;
	}


	var _getColumns = function(table){

		switch(table){

			case "MED" :
			case "Indenpent" :
			case "RegionalManagement":
				return _getMedInst(table);
				break;
			case "RegionalManagement2":
				return _getMedInst2(table);
				break;
			case "Inst" :
				return _getInstrument(table);
				break;
			case "logQ" :
				return _getlogQ(table);
				break;
			case "Box" :
				return _getBox(table);
				break;
			case "BoxSub" :
				return _getBoxSub(table);
				break;
			case "AuthUsers" :
			case "OrgInit2":
				return _getAuthUser(table);
				break;
			case "ResultType" :
				return _getResultType(table);
				break;
			case "ResultType2" :
				return _getResultType2(table);
				break;
			case "CtrLoinc" :
				return _getLoinc(table);
				break;
			case "TestItem" :
				return _getTestItem(table);
				break;
			case "testItemGroupMain" :
				return _getTestItemGroup(table);
				break;
			case "testItemGroupMain2" :
				return _getTestItemGroup2(table);
				break;
			case "CtrInstrBoxs" :
				return _getCIB(table);
				break;
			case "CtrInstrMics" :
				return _getCtrInstrMics(table);
				break;
			case "CtrInstrMics2" :
				return _getCtrInstrMics2(table);
				break;
			case "CtrInstrItem" :
				return _getCtrInstrItem(table);
				break;
			case "CtrInstrItem2" :
				return _getCtrInstrItem2(table);
				break;
			case "Instruments":
				return _getInstrument2(table);
				break;
			case "UserGroupsMain":
				return _getUserGroupsMain(table);
				break;
			case "OrgInit":
				return _getOrgInit(table);
				break;
			case "CtrTemplate":
			case "CusTemplate":
				return _getCtrTemplate(table);
				break;
			default:
				return _getCtrTubeType(table);
				break;

		}
	}
	
	return{
		getColumns : _getColumns
	};

}(jQuery));


$(function() {
	
});

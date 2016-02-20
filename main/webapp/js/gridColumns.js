/*
 * 2016/1/14
 * easyui column_collect
 * 存放所有grid的栏位
 * 作者: chenshuxian
 */
var ColCollect;

ColCollect = (function($){
	
	//县浮字串提示
	var _helpTip = "<span class='help-tips'>",
		_editStr = "<i class='help-tips-content'>编辑</i></span>",
		_delStr = "<i class='help-tips-content'>删除</i></span>",
		_statusStr = "<i class='help-tips-content'>启用/停用</i></span>",
		_resetStr = "<i class='help-tips-content'>重置密码</i></span>";


	var _getCtrTubeType = function(obj){
		
		 var _columns = [[
			                 {field: "ck", checkbox: true, width: 30},
			                 {
			                     title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
			                     var rowData = JSON.stringify(row);
			                     return "<a onclick='"+ obj +".showDialog(" + rowData + ")'>" + value + "</a>";
			                     }
			                 },
			                 {title: "中文名称", field: 'name', flex: 1, width: 60},
			                 {title: "英文简称", field: 'enShortName', flex: 1, width: 60},
			                 {title: "英文名称", field: 'enName', flex: 1, width: 60},
			                 {title: "WHONET编码", field: 'whonetCode', flex: 1, width: 60},
			                 {title: "助记符", field: 'fastCode', flex: 1, width: 60},
			                 {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
			                 {title: "备注", field: 'memo', width: 200},
			                 {
			                     title: "状态", field: 'status', formatter: function (value, row, index) {
			                     var rowData = JSON.stringify(row);
			                     var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     if (value == '1') {
			                         returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     }
			                     return _helpTip + returnStr + _statusStr;
			                 }
	
			                 },
			                 {
			                     title: "操作", field: 'opt', width: 60, align: 'center',
			                     formatter: function (value, row, index) {
			                         var str = "";
			                         var rowData = JSON.stringify(row);
			                         str += _helpTip + "<a class='icon icon-edit' onclick='"+ obj +".editRow(" + rowData + ")'></a>" + _editStr ;
			                         str += _helpTip + "<a class=\"icon icon-trash\" onclick='"+ obj +".deleteRow(" + index + "," + rowData + ")'></a>" + _delStr;
			                         return str;
			                     }
			                 }
			                 
			            ]];
		 
		 return _columns;
	}
	
	/***
	 * 醫療机構維護及独立实验室
	 * date:2016/1/15
	 * author:chenshuxian
	 */
	var _getMedInst = function(obj){
		
		 var _columns = [[
			                 {field: "ck", checkbox: true, width: 30},
			                 {
			                     title: "编码", field: 'codeNo', width: 40, formatter: function (value, row) {
			                     var rowData = JSON.stringify(row);
			                     return "<a onclick='"+ obj +".showDialog(" + rowData + ")'>" + value + "</a>";
			                     }
			                 },
			                 {title: "卫生机构代码", field: 'nacaoId', flex: 1, width: 20},
			                 {title: "所属地区", field: 'regionName', flex: 1, width: 20},
			                 {title: "中文名称", field: 'name', flex: 1, width: 20},
			                 {title: "中文地址", field: 'address', flex: 1, width: 60},
			                 {title: "联系人", field: 'contacts', flex: 1, width: 20},
			                 {title: "联系电话", field: 'telephone', flex: 1, width: 20},
			                 {title: "助记符", field: 'fastCode', flex: 1, width: 20},
			                 {title: "顺序号", field: 'displayOrder', flex: 1, width: 20},
			                 {
			                     title: "状态", field: 'status', formatter: function (value, row, index) {
			                     var rowData = JSON.stringify(row);
			                     var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     if (value == '1') {
			                         returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     }
			                     return _helpTip + returnStr + _statusStr;
			                 }
	
			                 },
			                 {
			                     title: "操作", field: 'opt', width: 60, align: 'center',
			                     formatter: function (value, row, index) {
			                         var str = "";
			                         var rowData = JSON.stringify(row);
			                         str += _helpTip + "<a class='icon icon-edit' onclick='"+ obj +".editRow(" + rowData + ")'></a>" + _editStr ;
			                         str += _helpTip + "<a class=\"icon icon-trash\" onclick='"+ obj +".deleteRow(" + index + "," + rowData + ")'></a>" + _delStr;
			                         return str;
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
	var _getInstrument = function(obj){
		
		 var _columns = [[
			                 {field: "ck", checkbox: true, width: 30},
			                 {
			                     title: "编码", field: 'codeNo', width: 40, formatter: function (value, row) {
			                     var rowData = JSON.stringify(row);
			                     return "<a onclick='"+ obj +".showDialog(" + rowData + ")'>" + value + "</a>";
			                     }
			                 },
			                 {title: "仪器名称", field: 'name', flex: 1, width: 20},
			                 {title: "仪器型号", field: 'model', flex: 1, width: 20},
			                 {title: "单列报告模板", field: 'rep', flex: 1, width: 20},
			                 {title: "默认标本类型", field: 'sampleTypeName', flex: 1, width: 60},
			                 {title: "顺序号", field: 'displayOrder', flex: 1, width: 20},
			                 {title: "仪器类型", field: 'typeName', flex: 1, width: 20},
			                 {
			                	 title: "通讯参数", field: 'stringId', width: 20, align: 'center',
			                	 formatter: function (value, row, index) {
			                         var str = "";
			                         var rowData = JSON.stringify(row);
			                         str += "<a class='icon icon-edit' onclick=" + obj + ".showParamsInfo('" + value + "')></a>";		                
			                         return str;
			                     }
			                	 
			                 },
			                 {
			                     title: "状态", field: 'status', formatter: function (value, row, index) {
			                     var rowData = JSON.stringify(row);
			                     var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     if (value == '1') {
			                         returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     }
			                     	return _helpTip + returnStr + _statusStr ;
			                     }
	
			                 },			                 
			                 {
			                     title: "操作", field: 'opt', width: 60, align: 'center',
			                     formatter: function (value, row, index) {
			                         var str = "";
			                         var rowData = JSON.stringify(row);
			                         str += _helpTip + "<a class='icon icon-edit' onclick='"+ obj +".editRow(" + rowData + ")'></a>" + _editStr ;
			                         str += _helpTip + "<a class=\"icon icon-trash\" onclick='"+ obj +".deleteRow(" + index + "," + rowData + ")'></a>" + _delStr;
			                         return str;
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
							    title: "编码", field: 'codeNo', width: 40, formatter: function (value, row) {
							    var rowData = JSON.stringify(row);
							    return "<a onclick='"+ obj +".showDialog(" + rowData + ")'>" + value + "</a>";
							    }
							},
							{title: "盒子修码", field: 'boxBarCode', flex: 1, width: 20},
							{title: "盒子IP", field: 'boxIP', flex: 1, width: 20},
							{title: "备注", field: 'memo', flex: 1, width: 20},
							{title: "顺序号", field: 'displayOrder', flex: 1, width: 20},
							{
			                     title: "状态", field: 'status', formatter: function (value, row, index) {
			                     var rowData = JSON.stringify(row);
			                     var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     if (value == '1') {
			                         returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
			                     }
			                     	return _helpTip + returnStr + _statusStr;
			                     }
	
			                 },			                 
			                 {
			                     title: "操作", field: 'opt', width: 60, align: 'center',
			                     formatter: function (value, row, index) {
			                         var str = "";
			                         var rowData = JSON.stringify(row);
			                         str += _helpTip + "<a class='icon icon-edit' onclick='"+ obj +".editRow(" + rowData + ")'></a>" + _editStr ;
			                         str += _helpTip + "<a class=\"icon icon-trash\" onclick='"+ obj +".deleteRow(" + index + "," + rowData + ")'></a>" + _delStr;
			                         return str;
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
		
		 var _columns = [[
		                  {field: "ck", checkbox: true, width: 30},
		                  {
		                      title: "用戶帐号", field: 'userNo', width: 80, formatter: function (value, row) {
		                      var rowData = JSON.stringify(row);
		                      return "<a onclick='" + obj + ".showDialog(" + rowData + ")'>" + value + "</a>";
		                  }
		                  },
		                  {title: "用户名称", field: 'userName', flex: 1, width: 60},
		                  {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
		                  {title: "备注", field: 'memo', width: 400},
		                  {
		                      title: "状态", field: 'status', formatter: function (value, row, index) {
		                      var rowData = JSON.stringify(row);
		                      var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='" + obj + ".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
		                      if (value == '1') {
		                          returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='" + obj + ".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
		                      }
		                      return _helpTip + returnStr + _statusStr;
		                  }

		                  },
		                  {
		                      title: "操作", field: 'opt', width: 60, align: 'center',
		                      formatter: function (value, row, index) {
		                          var str = "";
		                          var rowData = JSON.stringify(row);
		                          str += _helpTip + "<a class='icon icon-edit' onclick='" + obj + ".showEditDialog(" + rowData + ")'></a>" + _editStr ;
		                          str += _helpTip + "<a class=\"icon icon-trash\" onclick='" + obj + ".deleteRow(" + index + "," + rowData + ")'></a>" + _delStr ;
		                          str += _helpTip + "<a class=\"icon icon-lock-b\" onclick='" + obj + ".resetPassword(" + index + "," + rowData + ")'></a>" + _resetStr ;
		                          str += "<a class=\"icon icon-user J_ShowPop J_DataRest\" onclick='" + obj + ".showUserGroupDialog(" + index + "," + rowData + ")'></a>";
		                          return str;
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
	var _getResultType = function(obj) {

		var _columns = [[
			{field: "ck", checkbox: true, width: 30},
			{
				title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
				var rowData = JSON.stringify(row);
				return "<a onclick='obj.showDialog(" + rowData + ")'>" + value + "</a>";
			}
			},
			{title: "中文名称", field: 'name', flex: 1, width: 60},
			{title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
			{
				title: "状态", field: 'status', formatter: function (value, row, index) {
				var rowData = JSON.stringify(row);
				var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='obj.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
				if (value == '1') {
					returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='obj.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
				}
				return returnStr;
			}
			},
			{
				title: "操作", field: 'opt', width: 60, align: 'center',
				formatter: function (value, row, index) {
					var str = "";
					var rowData = JSON.stringify(row);
					str += "<a class='icon icon-edit' onclick='obj.editResultType(" + rowData + ")'></a>";
					str += "<a class=\"icon icon-trash\" onclick='obj.deleteResultType(" + index + "," + rowData + ")'></a>";
					return str;
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
					str += "<a class='icon icon-edit' onclick='ResultType.editResultDesc(" + rowData + ")'></a>";
					str += "<a class=\"icon icon-trash\" onclick='ResultType.deleteResultDesc(" + index + "," + rowData + ")'></a>";
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
				return _getMedInst(table);
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
				return _getAuthUser(table);
				break;
			case "ResultType" :
				return _getResultType(table);
				break;
			case "ResultType2" :
				return _getResultType2(table);
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

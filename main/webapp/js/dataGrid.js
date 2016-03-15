/*
 * 2016/1/12
 * easyui dataGrid Module
 * 作者: chenshuxian
 * 回传一个datagrid obj
 */

var dataGridM;

dataGridM = (function($){
	
	var POST = "POST";
	//var initPopHeight = ($(window).height() < 700) ? 400 : 400;
	
	
	/*取得初始化
	 *return dataGrid init Obj
	 *_url:網址
	 *_data:參數
	 *_module:模塊名
	 *_hideCols:穩藏欄位
	 *_tableList:grid生成對象
	 *_preId:前辍
	 * _height:grid 高度设定
	 * _isSecond:是否为第二个grid ，若只有一个时不给设定，所以值为undefined
	 */
	
	var _initObj = function(params){
		
		 var  _tableList = params.tableList,
			  _url = params.url,
			  _data = params.data,
			  _module = params.module,
			  _preId =params.preId,
			  _hideCols = (params.hideCols == null) ? new Array() : params.hideCols,
			  _height = params.height,
			  _isSecond = params.isSecond,
			  
			  onAfterRender = function() {
				  //
				  if (_module == "ResultType2")
				  	_module = "ResultType";

				  if(!_isSecond) {

					  var obj = eval("(" + _module + ")");

					  switch (obj.currentEvent) {
						  case "add":
							  newcommonjs.setSearchConditions(_preId, "", 2, 2);
							  obj.currentEvent = undefined;
							  break;
					  }

				  }
			  };
		
		 var gridObj = {

	            url: _url,
	            method: POST,
	            queryParams: _data,
	            height: _height,
	            fitColumns: true,
	            fit: false,
	            checkOnSelect: false,
	            selectOnCheck: false,
	            autoRowHeight: false,
	            striped: true,
	            pagination: true,
	            pageNumber: 1,
	            pageSize: 10
		 };
		 
		 
		 gridObj.view = $.extend({}, $.fn.datagrid.defaults.view, {onAfterRender: onAfterRender});

		 //取得欄位
		 gridObj.columns = ColCollect.getColumns(_module);

		 //載入成功後操作事項
		 gridObj.onLoadSuccess = function () {
	            newcommonjs.tableAuto(_tableList);
	            if (_hideCols) {
	                $.each(_hideCols, function (k, v) {
	                	_tableList.datagrid('hideColumn', v);
	                })
	            }
	     };
		 
		 return gridObj;
	}
	
	
	return{
		init:_initObj
	}
	
}(jQuery));

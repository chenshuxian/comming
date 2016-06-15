/*
 * 2016/1/12
 * easyui dataGrid Module
 * 作者: chenshuxian
 */

var dataGridM;

dataGridM = (function($){

	/*取得初始化
	 *return dataGrid init Obj
	 *_url:網址
	 *_data:參數
	 *_module:模塊名
	 *_hideCols:穩藏欄位
	 *_tableList:grid生成對象
	 *_preId:前辍,
	 * _height:grid 高度设定
	 * _isSecond:是否为第二个grid ，若只有一个时不给设定，所以值为undefined
	 */

	var
		_onClickRow = function (index,row) {
			var opt = $(this).datagrid("options");
			var rows1 = opt.finder.getTr(this, "", "allbody", 2);
			if (rows1.length > 0) {
				$(rows1).each(function(){
					var tempIndex = parseInt($(this).attr("datagrid-row-index"));
					if (tempIndex == index) {
						$(this).addClass("datagrid-row-click");
					}
					else {
						$(this).removeClass("datagrid-row-click");
					}
				});
			}
		},
		//將第一列設為選中
		_firstRow = function() {
			var opt = $(this).datagrid("options");
			var rows1 = opt.finder.getTr(this, "", "allbody", 2);
			if (rows1.length > 0) {
				$(rows1).each(function(){
					var tempIndex = parseInt($(this).attr("datagrid-row-index"));
					if (tempIndex == 0) {
						$(this).addClass("datagrid-row-click");
					}
				});
			}
		},

		_hideColumn = function(tableList,hideCols) {

			if (hideCols) {
				$.each(hideCols, function (k, v) {
					tableList.datagrid('hideColumn', v);
				})
			}
		},

		//给两个表点的页面使用
		//因为两个表单页面载入成功时不进行页面的调整
		_loadSuccess = function(obj) {

			var tooltip = $(obj).datagrid('getPanel').find('.easyui-tooltip');
			//有tooltip才执行
			if(tooltip){

				$(obj).datagrid('getPanel').find('.easyui-tooltip').each(function(){
					var value = $(this)[0].getAttribute('data-value');
					$(this).tooltip({
						content: '<span>' + value + '</span>',
						onShow: function() {
							$(this).tooltip('tip').css({
								backgroundColor: '#fff',
								borderColor: '#666'
							});
						}
					});
				});

			}
		},

		_initObj = function(params){

			var
				_tableList = params.tableList,
				_url = params.url,
				_data = params.data,
				_module = params.module,
				_preId =params.preId,
				_hideCols = (params.hideCols == null) ? new Array() : params.hideCols,
				_height = params.height,
				_isSecond = params.isSecond,

				//grid 产生后
				_onAfterRender = function() {

					if (_module == "ResultType2")
						_module = "ResultType";

					//第一个grid 必预执行以下动作
					//新增时将排序设为按录入顺序降序
					if(!_isSecond) {

						//var obj = eval("(" + _module + ")");
						var obj = BM;

						switch (obj.currentEvent) {
							case "add":
								newcommonjs.setSearchConditions(_preId, "", 0, 2);
								obj.currentEvent = undefined;
								break;
						}

					}

				};

			var gridObj = {
				url: _url,
				method: CB.METHOD,
				queryParams: _data,
				height: _height,
				fitColumns: true,
				fit: false,
				checkOnSelect: false,
				selectOnCheck: false,
				autoRowHeight: false,
				striped: true,
				pagination: true,
				scrollbarSize:0,
				pageNumber: 1,
				pageSize: 10
			};


			//复写 datagrid view 方法
			gridObj.view = $.extend({}, $.fn.datagrid.defaults.view, {onAfterRender: _onAfterRender});

			//取得欄位
			gridObj.columns = ColCollect.getColumns(_module);

			//載入成功後操作事項，稳藏不出现的栏位
			gridObj.onLoadSuccess = function (data) {

				if(typeof data != "object"){
					BM.resolutionData(data);
				}

				//进行 tooltip 绑定
				$(this).datagrid('getPanel').find('.easyui-tooltip').each(function(){
					var value = $(this)[0].getAttribute('data-value');
					$(this).tooltip({
						content: '<span>' + value + '</span>',
						onShow: function() {
							$(this).tooltip('tip').css({
								backgroundColor: '#fff',
								borderColor: '#666'
							});
						}
					});
				});
				newcommonjs.tableAuto(_tableList);

				if (_hideCols) {
					$.each(_hideCols, function (k, v) {
						_tableList.datagrid('hideColumn', v);
					})
				}
			};

			 gridObj.loadFilter = function (data) {

					// console.log(data);
					 var params = {total:0,rows:[]};
					 if(data)
						 return data;
					 else
						 return params;

			 };

			//点即栏位时高亮
			gridObj.onClickRow = _onClickRow;

			return gridObj;
		 };

	var dataGridObj = {
		init: _initObj,
		clickRow: _onClickRow,
		hideColumn: _hideColumn,
		loadSuccess: _loadSuccess,
		firstRow: _firstRow
	};
	
	return dataGridObj;
	
}(jQuery));
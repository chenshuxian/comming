/**
 * @ClassName: logQuery.js
 * @Description: TODO(日志查询-JS)
 * @author chenshuxian
 * @date 2016年01月18日 下午4:52:56
 * 
 */
var logQuery = {
		
		preId: "logQ",
		tableList : $("#logQTypeList"),
		urlSearch : ctx + "/sys/logQuery/logQueryPageList",
		urlExpExcel : ctx + "/sys/logQuery/exportLogQueryExcel",
		
		reloadData:{
			moduleId:'99',
			endDate:'',
			startDate:''
		},
		
		
		init: function () {
	    	newcommonjs.pageInit(this.preId);
	        logQuery.tableList = $("#logQTypeList");
	        
	        $("#" + logQuery.preId + "StatusSpan").html("");
	        $("." + logQuery.preId + "-status-selector li.selected").removeClass("selected");
	        
	        var url = logQuery.urlSearch;
	        var POST = "POST";
	        var GET = "GET";
	        //var typeKey =null;
	        var params = logQuery.reloadData;  //如有需要在編寫如上方格式。
	        var coloumns=new Array()
	        //coloumns[0]="whonetCode";	//要穩藏的欄位
	        //alert(logQuery.tableList + ":" + logQuery.pageListUrl);
	        
	        var gridObj = logQuery.createDataGrid(url, params,POST, logQuery.tableList,coloumns);
	        gridObj.view =    
	            $.extend({}, $.fn.datagrid.defaults.view, {
	                onAfterRender: function () {
	                    // 操作成功后刷新dataGrid
	                    switch (logQuery.currentEvent) {
	                        case "add":
	                            newcommonjs.setSearchConditions(logQuery.preId, "", 2, 2);
	                            logQuery.currentEvent = undefined;
	                            break;
	                    }
	                }
	            });

	        
	        //* render DataGrid */
	        this.dataGrid = logQuery.tableList.datagrid(gridObj);

	        /* 关键词搜索 */
	        $("#" + this.preId + "SearchBtn").click(function () {
	        	
	        	var beginTime = $("#logQbeginTime").datetimebox('getValue'),
		    	 	endTime = $("#logQendTime").datetimebox('getValue');
		    	
	        	if(BasicModule.dateCompare(beginTime,endTime)){
	        		newcommonjs.dataGridSearch(logQuery.dataGrid, logQuery.searchObj());
	        	}
	        	
	        });

	        /* 状态搜索 */
	        $("." + this.preId + "-status-selector").on("click", "li", function () {
	        	
	            $("#" + logQuery.preId + "StatusSpan").html($(this).html());
	            $("." + logQuery.preId + "-status-selector li.selected").removeClass("selected");
	            var flg = $(this).is('.selected');
	            $(this).addClass(function () {
	                return flg ? '' : 'selected';
	            })

	            var statusVal = $(this).attr("el-value");
	    
	            $("#logQStatus").val(statusVal);

	            newcommonjs.dataGridSearch(logQuery.dataGrid, logQuery.searchObj());
	        });
    

	        $(window).on('resize', function () {
	            newcommonjs.tableAuto(logQuery.tableList);
	        });
	        
	        $(".easyui-datetimebox").datetimebox({
	        	showSeconds:false
	        });
	        
//	        $("#logQendTime").datetimebox({
//	        	showSeconds:false
//	        });
	        
	       
	    },
	    
	    /* *
	     * 取得所有搜尋欄資訊
	     * 返回obj 格式
	     * */
	    searchObj: function () {	    	
	    	return this.getParams();
	    },
	    
	    /* 创建dataGrid  
	     * url:为pageList
	     * params:可有可无
	     * method: POST OR GET
	     * tableList: main.jsp 中的 呈现dataGrid 的　div
	     * hideColumns:是一个阵列，用来存要稳藏的栏位。
	     * */
	    createDataGrid: function (url, params, method, tableList, hideColumns) {
	    	var gridObj = newcommonjs.createGridObj(url, method, params);
	        gridObj.columns = ColCollect.getColumns("logQ");        
	        gridObj.onLoadSuccess = function () {
	            newcommonjs.tableAuto(tableList);
	            if (hideColumns) {
	                $.each(hideColumns, function (k, v) {
	                    logQuery.dataGrid.datagrid('hideColumn', v);
	                })
	            }
	        };
	        return gridObj;
	    },

		expExcel : function (){
			
			var params = this.getParams();
			window.location.href = logQuery.urlExpExcel + "?moduleId="
			+ params.moduleId + "&endDate=" + params.endDate + "&startDate=" + params.startDate;
			
		},
		
		getParams : function (){
			
			var beginTime = $("#logQbeginTime").datetimebox('getValue');
	    	var endTime = $("#logQendTime").datetimebox('getValue');
	    	var module = $("#logQStatus").val();
	    	
	    	if(logQuery.validateDate(beginTime,endTime)){
	    		showMessage("起始日期和结束日期相差不能超过15天！");
				return ;
	    	}else{
	    		return {
			        	moduleId:module,
						endDate:endTime,
						startDate:beginTime
			    };
	    	}
	    	
			
		},
		

		validateDate : function(startDate, endDate) {
			var endTime = new Date(endDate);
			var startTime = new Date(startDate);
			var between_days = (endTime.getTime() - startTime.getTime())
					/ (1000 * 3600 * 24);
			if (between_days > 15) {
				return true;
			}
			return false;
		}
		
	}
	//初始化
	$(function() {
		logQuery.init();
	});
/*
// 控制重复提交
var canStore = true;

// 关闭窗口
function closeWin() {
	$(".oy").remove();
	$(".xinxi").empty();
	$(".xinxi").hide();
}

//焦点定位在搜索按钮上
$('#searchBtn').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
    	search();
    }
});

// 搜索
function search(isMain) {
	$("#pageNo").val(1);
	pageQuery(isMain);
}

// 日期控件的使用
function dateOnFcusStart(obj) {
	WdatePicker({
		dateFmt : obj
	});
}

// 查询List
function pageQuery(isMain) {
	var pageNo = $("#pageNo").val();
	var pageSize = $("#pageSize").val();
	if (pageNo == 'undefined' || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 10;
	}
	var moduleId = $("#moduleId").val();
	var endDate = $("#endDate").val();
	var startDate = $("#startDate").val();
	if(new Date(endDate).getTime()<new Date(startDate).getTime()){
		showMessage('结束时间不能早于开始时间！', function() {
		});
		return;
	}
	if( !validateDate(endDate, startDate)){
		showMessage('起始日期和结束日期相差不能超过15天！', function() {
		});
		return;
	}else{
		if(isMain !=0 ){
			if(moduleId == null || moduleId == ''){
				showMessage('请选择模块名称！', function() {
					$("#moduleId").focus();
				});
				return ;
			}
		}
	   var url = ctx + "/sys/logQuery/logQueryPageList";
	   $("#infoPageDiv").load(url, {
		  pageNo : pageNo,
		  pageSize : pageSize,
		  moduleId : moduleId,
		  endDate : endDate,
		  startDate : startDate,
		  isMain:isMain
	  }, function() {
		  $("#infoPageDiv").show();
	  });
	}
}

// 导出
function download() {
	var moduleId = $("#moduleId").val(); // 搜索输入框的值
	var endDate = $("#endDate").val();
	var startDate = $("#startDate").val();
	if( !validateDate(endDate, startDate)){
		showMessage('起始日期和结束日期相差不能超过15天！', function() {
		});
		return;
	}else{
	window.location.href = ctx + "/sys/logQuery/exportLogQueryExcel?moduleId="
			+ moduleId + "&endDate=" + endDate + "&startDate=" + startDate;
    }
}

//检验时间
function validateDate(endDate, startDate){
	var endTime = new Date(endDate);
	var startTime = new Date(startDate);
	var between_days = (endTime.getTime() - startTime.getTime()) / (1000 * 3600 * 24);
	if (between_days > 15) {
		return false;
	}
	return true;
}*/
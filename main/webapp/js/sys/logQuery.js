/**
 * @ClassName: logQuery.js
 * @Description: TODO(日志查询-JS)
 * @author chenshuxian
 * @date 2016年06月06日 下午4:52:56
 * 将代码标准化
 */
var logQuery = (function ($) {
    /* START render basicModule */
    logQuery = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.LOGQ,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	            //要穩藏的欄位
        _data = { moduleId: "-1", ednDate:"", startDate:"" },    //取得初始grid时所需要的server 参数
        _module = "logQ",                  //模组名称，于grid 建立时使用
        _pageListUrl = ctx + "/sys/logQuery/logQueryPageList",            //datagrid 取得资料的url
        _excelUrl = ctx + "/sys/logQuery/exportLogQueryExcel",
    /* START dataGrid 生成*/
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),                   //取得 datagrid 物件参数
    // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj);

    $(".easyui-datetimebox").datetimebox({
	        	showSeconds:false
    });

    /* 模块名称 */
    $("." + _preId + "-status-selector").on("click", "li", function () {

        $("#" + _preId + "StatusSpan").html($(this).html());
        $("." + _preId + "-status-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#logQStatus").val(statusVal);

        logQuery.searchGrid();
    });


    var _validateDate = function(startDate, endDate) {
            //将字串-转换为/
            var replaceStr = /-/g;
            var endDate = endDate.replace(replaceStr,"/");
            var startDate = startDate.replace(replaceStr,"/");
			var endTime = new Date(endDate);
			var startTime = new Date(startDate);
			var between_days = (endTime.getTime() - startTime.getTime()) / (1000 * 3600 * 24);
            //console.log("endTime" + endDate);
            //console.log("startTime" + startDate);
            //console.log("between" + between_days);
			if (between_days > 15) {
				return true;
			}
			return false;
        };

    $.extend(logQuery,{

        preId:_preId,
        module:_module,
        tableList:_tableList,
        /*START url 定義*/
        pageListUrl: _pageListUrl,
        excelUrl: _excelUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,
        searchHold: CB.SEARCHHOLDER.LOG,


        searchObj: function () {
            var beginTime = $("#logQbeginTime").datetimebox('getValue');
	    	var endTime = $("#logQendTime").datetimebox('getValue');
	    	var module = $("#logQStatus").val();
			var searchStr = $("#logQSearchStr").val();

	    	if(_validateDate(beginTime,endTime)){
	    		BM.showMessage("起始日期和结束日期相差不能超过15天！");
				return ;
	    	}else{
	    		return {
			        	moduleId: module,
						endDate: endTime,
						startDate: beginTime,
						searchStr: searchStr
			    };
	    	}
        },

        expExcel : function (){

			var params = this.searchObj();
			window.location.href = logQuery.excelUrl + "?moduleId="
			+ params.moduleId + "&endDate=" + params.endDate + "&startDate=" + params.startDate;

		}

        /*callback function area end*/

    });

    return logQuery;
    
}(jQuery));

$(function(){
    var preId = logQuery.preId;
    logQuery.init();

    $("#" + preId + "SearchBtn").unbind();
    $("#" + preId + "SearchBtn").click(function () {

        var beginTime = $("#logQbeginTime").datetimebox('getValue'),
            endTime = $("#logQendTime").datetimebox('getValue');

        if(BasicModule.dateCompare(beginTime,endTime)){
            //newcommonjs.dataGridSearch(logQuery.dataGrid, logQuery.searchObj());
            logQuery.searchGrid();
        }

    });
})
//var logQuery = {
//		
//		preId: "logQ",
//		tableList : $("#logQTypeList"),
//		urlSearch : ctx + "/sys/logQuery/logQueryPageList",
//		urlExpExcel : ctx + "/sys/logQuery/exportLogQueryExcel",
//		
//		reloadData:{
//			moduleId:'99',
//			endDate:'',
//			startDate:''
//		},
//		
//		
//		init: function () {
//	    	//newcommonjs.pageInit(this.preId);
//			$("#" + this.preId + "SearchStr").focus();
//	        logQuery.tableList = $("#logQTypeList");
//	        
//	        //$("#" + logQuery.preId + "StatusSpan").html("");
//	        $("." + logQuery.preId + "-status-selector li.selected").removeClass("selected");
//	        
//	        var url = logQuery.urlSearch;
//	        var POST = "POST";
//	        var GET = "GET";
//	        //var typeKey =null;
//	        var params = logQuery.reloadData;  //如有需要在編寫如上方格式。
//	        var coloumns=new Array()
//	        //coloumns[0]="whonetCode";	//要穩藏的欄位
//	        //alert(logQuery.tableList + ":" + logQuery.pageListUrl);
//	        
//	        var gridObj = logQuery.createDataGrid(url, params,POST, logQuery.tableList,coloumns);
//	        gridObj.view =    
//	            $.extend({}, $.fn.datagrid.defaults.view, {
//	                onAfterRender: function () {
//	                    // 操作成功后刷新dataGrid
//	                    switch (logQuery.currentEvent) {
//	                        case "add":
//	                            newcommonjs.setSearchConditions(logQuery.preId, "", 2, 2);
//	                            logQuery.currentEvent = undefined;
//	                            break;
//	                    }
//	                }
//	            });
//
//	        
//	        //* render DataGrid */
//	        this.dataGrid = logQuery.tableList.datagrid(gridObj);
//
//	        /* 关键词搜索 */
//	        $("#" + this.preId + "SearchBtn").click(function () {
//	        	
//	        	var beginTime = $("#logQbeginTime").datetimebox('getValue'),
//		    	 	endTime = $("#logQendTime").datetimebox('getValue');
//		    	
//	        	if(BasicModule.dateCompare(beginTime,endTime)){
//	        		newcommonjs.dataGridSearch(logQuery.dataGrid, logQuery.searchObj());
//	        	}
//	        	
//	        });
//
//	        /* 模块名称 */
//	        $("." + this.preId + "-status-selector").on("click", "li", function () {
//	        	
//	            $("#" + logQuery.preId + "StatusSpan").html($(this).html());
//	            $("." + logQuery.preId + "-status-selector li.selected").removeClass("selected");
//	            var flg = $(this).is('.selected');
//	            $(this).addClass(function () {
//	                return flg ? '' : 'selected';
//	            })
//
//	            var statusVal = $(this).attr("el-value");
//	    
//	            $("#logQStatusNew").val(statusVal);
//
//	            newcommonjs.dataGridSearch(logQuery.dataGrid, logQuery.searchObj());
//	        });
//    
//
//	        $(window).on('resize', function () {
//	            newcommonjs.tableAuto(logQuery.tableList);
//	        });
//	        
//	        $(".easyui-datetimebox").datetimebox({
//	        	showSeconds:false
//	        });
//
//	       
//	    },
//	    
//	    /* *
//	     * 取得所有搜尋欄資訊
//	     * 返回obj 格式
//	     * */
//	    searchObj: function () {	    	
//	    	return this.getParams();
//	    },
//	    
//	    /* 创建dataGrid  
//	     * url:为pageList
//	     * params:可有可无
//	     * method: POST OR GET
//	     * tableList: main.jsp 中的 呈现dataGrid 的　div
//	     * hideColumns:是一个阵列，用来存要稳藏的栏位。
//	     * */
//	    createDataGrid: function (url, params, method, tableList, hideColumns) {
//	    	var gridObj = newcommonjs.createGridObj(url, method, params);
//	        gridObj.columns = ColCollect.getColumns("logQ");        
//	        gridObj.onLoadSuccess = function () {
//	            newcommonjs.tableAuto(tableList);
//	            if (hideColumns) {
//	                $.each(hideColumns, function (k, v) {
//	                    logQuery.dataGrid.datagrid('hideColumn', v);
//	                })
//	            }
//				dataGridM.loadSuccess(this);
//	        };
//	        return gridObj;
//	    },
//
//		expExcel : function (){
//			
//			var params = this.getParams();
//			window.location.href = logQuery.urlExpExcel + "?moduleId="
//			+ params.moduleId + "&endDate=" + params.endDate + "&startDate=" + params.startDate;
//			
//		},
//		
//		getParams : function (){
//			
//			var beginTime = $("#logQbeginTime").datetimebox('getValue');
//	    	var endTime = $("#logQendTime").datetimebox('getValue');
//	    	var module = $("#logQStatusNew").val();
//			var searchStr = $("#logQSearchStr").val();
//
//	    	if(logQuery.validateDate(beginTime,endTime)){
//	    		BM.showMessage("起始日期和结束日期相差不能超过15天！");
//				return ;
//	    	}else{
//	    		return {
//			        	moduleId: module,
//						endDate: endTime,
//						startDate: beginTime,
//						searchStr: searchStr
//			    };
//	    	}
//	    	
//			
//		},
//		
//
//		validateDate : function(startDate, endDate) {
//			var endTime = new Date(endDate);
//			var startTime = new Date(startDate);
//			var between_days = (endTime.getTime() - startTime.getTime())
//					/ (1000 * 3600 * 24);
//			if (between_days > 15) {
//				return true;
//			}
//			return false;
//		}
//		
//	}
//	//初始化
//	$(function() {
//		logQuery.init();
//	});

/**
 * 标本类型js
 * Created by chenshuxian on 2016/03/02
 * ModuleName 中心仪器信息
 */

var Inst = (function($){

    /* START render basicModule */
    Inst = Object.create(BasicModule);

    var
        _preId = CB.PREID.INS,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	//要穩藏的欄位
        _data = Inst.searchObj(_preId),
        _module = "Inst",
        _focusId = "editName",
        _popArea = 720,
        _delBatUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsDeleteBatch",
        _existUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsIfExisted",
        _updateUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsEdit",
        _updateUrl2 = ctx + "/inst/ctrInstruments/ctrInstrumentsParamsEdit",
        _updateUrlIf = ctx + "/inst/ctrInstruments/ctrInstrumentsIfEdit",
        _addUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsAdd",
        _delUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsDelete",
        _changeStatusUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsDisableOrEnable",
        _InfoUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsInfo",
        _InfoUrl2 = ctx + "/inst/ctrInstruments/ctrInstrumentsParamsInfo",
        _pageListUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsPageList",
        _TestItemUrl = ctx + "/inst/ctrInstruments/getTestItem",

        //默认标本类型Grid
        _sampleTypeParam = {					//下拉Grid参数,所有参数均为必填
            div_id:"sampleTypeDiv", 			//对应表单DIV的id
            grid_id:"gridSampleType", 			//对应数据源Grid的Id
            name:"sampleTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 207, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471]					//锁定Grid，传入数组[top,left]

        },

        //单列报告模板Grid
        _reportTemplateParam = {				//下拉Grid参数,所有参数均为必填
            div_id:"reportTemplateDiv", 		//对应表单DIV的id
            grid_id:"gridReportTemplate", 		//对应数据源Grid的Id
            name:"reportTemplateId",			//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 180, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471]					//锁定Grid，传入数组[top,left]

        },

    /* START dataGrid 生成*/
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
    // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj);

    ///* 状态搜索 */
    //$("." + _preId + "-status-selector li").on("click", function () {
    //    $("#" + _preId + "StatusSpan").html($(this).html());
    //    $("." + _preId + "-status-selector li.selected").removeClass("selected");
    //    var flg = $(this).is('.selected');
    //    $(this).addClass(function () {
    //        return flg ? '' : 'selected';
    //    })
    //
    //    var statusVal = $(this).attr("el-value");
    //    $("#" + _preId + "Status").val(statusVal);
    //
    //    Inst.searchGrid();
    //});
    //
    ///* 排序 */
    //$("." + _preId + "-sort-selector li").on("click", function () {
    //    $("#" + _preId + "SortSpan").html($(this).html());
    //    $("." + _preId + "-sort-selector li.selected").removeClass("selected");
    //    var flg = $(this).is('.selected');
    //    $(this).addClass(function () {
    //        return flg ? '' : 'selected';
    //    })
    //
    //    var sortVal = $(this).attr("el-value");
    //    $("#" + _preId + "Sort").val(sortVal);
    //
    //    Inst.searchGrid();
    //});

    ///* search Btn */
    //$("#" + _preId + "SearchBtn").on("click",function() {
    //    Inst.searchGrid();;
    //});

    /* 前台通讯类 */
    $("." + _preId + "-frontClass-selector").on("click", "li", function () {
        $("#" + _preId + "frontClassSpan").html($(this).html());
        $("." +_preId + "-frontClass-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#" + _preId + "frontClass").val(statusVal);

        Inst.searchGrid();
    });

    /*Start add 相关参数设定  */
    //$("#" + _preId + "Add").on("click",function() {
    //    Inst.addPop();
    //});
    //
    //// deleteBatch
    //$("#" + _preId + "DeleteBatch").on("click",function() {
    //    Inst.deleteBetch();
    //});


    $.extend(Inst,{

        preId:_preId,
        module:_module,
        //设定pop弹出框的大小
        popArea: _popArea,
        focusId: _focusId,
        tableList:_tableList,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        existUrl: _existUrl,
        updateUrl: _updateUrl,
        updateUrl2: _updateUrl2,
        updateUrlIf: _updateUrlIf,
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        InfoUrl2: _InfoUrl2,
        pageListUrl: _pageListUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,


        validateSave: function() {

            var
                name = $("#name").val(),
                model = $("#model").val(),
                producer = $("#producer").val(),
                fastCode = $("#fastCode").val(),
                displayOrder = $("#displayOrder").val(),
                sampleTypeId = sampleTypeGrid.getValue(),
                typeId = $("#typeId").val();

            if(name == ''){
                showMessage('仪器名称为空，请重新输入！',function(){
                    $("#name").focus();
                });
                return false;
            }
            if(model == ''){
                showMessage('仪器型号为空，请重新输入！',function(){
                    $("#model").focus();
                });
                return false;
            }
            if(sampleTypeId == ''){
                showMessage('默认标本类型为空，请重新输入！',function(){
                    //$("#sampleTypeId").focus();
                });
                return false;
            }
            if(validateDisplayOrder("displayOrder")){
                return false;
            }
            if(typeId == ''){
                showMessage('仪器类型为空，请重新输入！',function(){
                    $("#typeId").focus();
                });
                return false;
            }

            return true;
        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(Inst.rowData);
            Inst.sampleTypeGrid = new TextCombo(_sampleTypeParam);
    		reportTemplateGrid = new TextCombo(_reportTemplateParam);

            $("#InfoForm").form("load", {
                /* input's name attr : data */
            	name: rowData.name,
                model: rowData.model,
                producer: rowData.producer,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                typeId: rowData.typeName,
                sampleTypeDiv: rowData.sampleTypeName,
                reportTemplateDiv: rowData.reportTemplateName,
                orgTypeId: Inst.orgTypeId,
                id:rowData.stringId,
                codeNo:rowData.codeNo,
                opType: 'edit'
            });
            $("#typeId").val(rowData.typeId);
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;
            setTimeout(function() {
                //alert(rowData.sampleTypeName);
                Inst.sampleTypeGrid.setValue(rowData.sampleTypeSId, rowData.sampleTypeName);
                reportTemplateGrid.setValue(rowData.reportTemplateSId, rowData.reportTemplateName);
            },500);

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                model: rowData.model,
                producer: rowData.producer,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                typeId: rowData.typeName,
                sampleTypeDiv: rowData.sampleTypeName,
                reportTemplateDiv: rowData.reportTemplateName

            });
            $("#sampleTypeDiv").html(rowData.sampleTypeName);
            $("#typeId").val(rowData.typeId);
            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("select").attr("disabled","disabled");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        },

        addCallBack: function() {
            Inst.sampleTypeGrid = new TextCombo(_sampleTypeParam);
      		reportTemplateGrid = new TextCombo(_reportTemplateParam);
        },

        searchObj: function(preId) {

            return {
                searchStr: $.trim($("#" + preId + "SearchStr").val()),
                status: $("#" + preId + "Status").val(),
                sort: $("#" + preId + "Sort").val(),
                frontClassName: $("#" + preId + "frontClass").val(),
                realtime:1
            };

        },
        /*callback function area end*/

        showParamsInfo: function (id){

            var callbackUpdate = function(data) {
                //alert('showcallback');
                resolutionData(data);
                var callback;
                callback = function () {

                    $("#comPort").val($("#comPort").data('val'));
                    $("#transferMode").val($("#transferMode").data('val'));
                    $("#protocol").val($("#protocol").data('val'));
                    $("#baudRate").val($("#baudRate").data('val'));
                    $("#dataBit").val($("#dataBit").data('val'));
                    $("#stopBit").val($("#stopBit").data('val'));
                    $("#parityBit").val($("#parityBit").data('val'));
                    // 需要回应
                    if ($("#isRespond").val() == '1') {
                        $("#isRespondCheck").attr("checked", 'true');
                    }
                    // DTR
                    if ($("#isDtr").val() == '1') {
                        $("#isDtrCheck").attr("checked", 'true');
                    }
                    // RTS
                    if ($("#isRts").val() == '1') {
                        $("#isRtsCheck").attr("checked", 'true');
                    }

                };

                if(data.indexOf("err|") != 0){
                    //alert('parInfo');
                    //url = Inst.InfoUrl2;
                    //data = {instrumentId:id};
                    var
                        params = {
                            url: Inst.InfoUrl2,
                            data: {instrumentId: id},
                            callback: callback
                        };

                    Inst.CommonPop(params);
                    //newcommonjs.newshowDictCodeEditDialog(data,callback,url,720);
                }
            };

            this.checkIfEdit(callbackUpdate,id);
        },

        checkIfEdit: function(callback,id){

                  $.ajax({
                    "url" : Inst.updateUrlIf,
                    "type" : "POST",
                    data:"id="+id,
                    "success" : callback
                });

        },

        //修改通讯参数
        updateParams: function(){
            //防止重复提交
            $("#editBtn").attr("disabled", true);

            formTextTrim("InfoForm");
            $("#isRespond").val(0);
            $("#isDtr").val(0);
            $("#isRts").val(0);

            $("input[name='checkboxInst']:checked").each(function(){
                //alert(this.value);
                $("#"+ this.value).val(1);
            });

            // 修改
            $.ajax({
                url: Inst.updateUrl2, //ctx + "/inst/ctrInstruments/ctrInstrumentsParamsEdit",
                type: "POST",
                data:$("#InfoForm").serialize(),
                success: function(data) {
                    //resolutionData(data);
                    $("#ctrDictInfoModal").hide();
                }
            });
        }

    });


    return Inst;


}(jQuery));

$(function(){
    Inst.init();
});
//var Inst = {
//		
//    preId: "ins", 
//    /*url 定義*/
//    delBatUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsDeleteBatch",
//    checkUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsIfExisted",
//    updateUrlIf:  ctx + "/inst/ctrInstruments/ctrInstrumentsIfEdit",
//    updateUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsEdit",
//    updateUrl2: ctx + "/inst/ctrInstruments/ctrInstrumentsParamsEdit",
//    addUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsAdd", 
//    delUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsDelete",
//    changeStatusUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsDisableOrEnable",
//    tubeInfoUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsInfo",
//    InfoUrl2: ctx + "/inst/ctrInstruments/ctrInstrumentsParamsInfo",
//    pageListUrl: ctx + "/inst/ctrInstruments/ctrInstrumentsPageList",
//    getTestItemUrl: ctx + "/inst/ctrInstruments/getTestItem",
//    
//	reloadData: {
//	        searchStr: '',
//	        status:'',
//	        sort: '',
//	        frontClassName:'',
//	        realtime: 1	
//    },
//	//默认标本类型Grid
//	sampleTypeParam: {					//下拉Grid参数,所有参数均为必填
//	  	div_id:"sampleTypeDiv", 			//对应表单DIV的id
//	  	grid_id:"gridSampleType", 			//对应数据源Grid的Id
//	  	name:"sampleTypeId",				//在表单中对应的提交name
//	  	columnShow:1,						//将要在文本框中显示的列序号
//	  	width : 207, 					    //Combo的宽度
//	  	clearOff:false,						//是否禁用clear按钮
//	  	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	  	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	  	onEnter:function(){
//	  	}
//	},
//	  
////	//单列报告模板Grid
//	reportTemplateParam: {				//下拉Grid参数,所有参数均为必填
//	  	div_id:"reportTemplateDiv", 		//对应表单DIV的id
//	  	grid_id:"gridReportTemplate", 		//对应数据源Grid的Id
//	  	name:"reportTemplateId",			//在表单中对应的提交name
//	  	columnShow:1,						//将要在文本框中显示的列序号
//	  	width : 180, 					    //Combo的宽度
//	  	clearOff:false,						//是否禁用clear按钮
//	  	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	  	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	  	onEnter:function(){
//	  	}
//	},
//
//	/*reportComboGrid:{
//		delay:500,
//		mode:'local',
//		url: ctx + "/inst/ctrInstruments/getTestItem",
//		idField:'id',
//		textField:'name',
//		columns:[[
//		          {field:'name',title:'名称',width:100,sortable:true}
//		        ]],
//		filter: function(q,row){
//			//console.log(q);
//			var opts = $(this).combogrid('options');
//			//console.log(opts.textField);
//			if(row[opts.textField].indexOf(q) == 0)
//				$(this).combogrid('setValue',row);
//			
//			//$(this).combogrid('')
//			
//			
//		}
//	},*/
//    
//    init: function () {
//    	newcommonjs.pageInit(this.preId);
//        Inst.tableList = $("#" + Inst.preId + "TypeList");
//        
//        var url = Inst.pageListUrl;
//        var POST = "POST";
//        var GET = "GET";
//        //var typeKey =null;
//        var params = Inst.reloadData;  //如有需要在編寫如上方格式。
//        var coloumns=new Array()
//        //coloumns[0]="whonetCode";	//要穩藏的欄位
//        //alert(Inst.tableList + ":" + Inst.pageListUrl);
//        
//        var gridObj = Inst.createDataGrid(url, params,POST, Inst.tableList,coloumns);
//        gridObj.view =    
//            $.extend({}, $.fn.datagrid.defaults.view, {
//                onAfterRender: function () {
//                    // 操作成功后刷新dataGrid
//                    switch (Inst.currentEvent) {
//                        case "add":
//                            newcommonjs.setSearchConditions(Inst.preId, "", 2, 2);
//                            Inst.currentEvent = undefined;
//                            break;
//                    }
//                }
//            });
//
//        
//        //* render DataGrid */
//        this.dataGrid = Inst.tableList.datagrid(gridObj);
//
//        /* 关键词搜索 */
//        $("#" + this.preId + "SearchBtn").click(function () {
//        	newcommonjs.dataGridSearch(Inst.dataGrid, Inst.searchObj());
//        });
//
//        /* 状态搜索 */
//        $("." + this.preId + "-status-selector").on("click", "li", function () {
//            $("#" + Inst.preId + "StatusSpan").html($(this).html());
//            $("." + Inst.preId + "-status-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + Inst.preId + "Status").val(statusVal);
//
//            newcommonjs.dataGridSearch(Inst.dataGrid, Inst.searchObj());
//        });
//        
//        /* 前台通讯类 */
//        $("." + this.preId + "-frontClass-selector").on("click", "li", function () {
//            $("#" + Inst.preId + "frontClassSpan").html($(this).html());
//            $("." + Inst.preId + "-frontClass-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + Inst.preId + "frontClass").val(statusVal);
//
//            newcommonjs.dataGridSearch(Inst.dataGrid, Inst.searchObj());
//        });
//
//        /* 排序 */
//        $("." + this.preId + "-sort-selector").on("click", "li", function () {
//            $("#" + Inst.preId + "SortSpan").html($(this).html());
//            $("." + Inst.preId + "-sort-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var sortVal = $(this).attr("el-value");
//            $("#" + Inst.preId + "Sort").val(sortVal);
//
//            newcommonjs.dataGridSearch(Inst.dataGrid, Inst.searchObj());
//        });
//
//        /* 批量删除 */
//        $("#" + this.preId + "DeleteTypeBatch").click(function () {
//            newcommonjs.deleteBatch(Inst.dataGrid,Inst.delBatUrl,POST);
//        });
//
//        /* 新增 */
//        $("#" + this.preId + "AddType").click(function () {
//        	Inst.currentEvent = "add";
//        	var data = {id:'', opType: 'add', orgTypeId: Inst.orgTypeId};
//        	var url = Inst.tubeInfoUrl; 
//        	
//        	var callback = function(){
//        		sampleTypeGrid = new TextCombo(Inst.sampleTypeParam);
//        		reportTemplateGrid = new TextCombo(Inst.reportTemplateParam);
//        		//$("#reportTemplate").combogrid(Inst.reportComboGrid);
//        		//validate.getAuth("Inst");
//        	};
//        	
//            newcommonjs.newshowDictCodeEditDialog(data,callback,url,720);
//        });
//
//        $(window).on('resize', function () {
//            newcommonjs.tableAuto(Inst.tableList);
//        });
//    },
//
//    /* *
//     * 取得所有搜尋欄資訊
//     * 返回obj 格式
//     * */
//    searchObj: function () {
//    	//console.log($("#" + this.preId + "frontClass").val());
//        return {
//            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
//            status: $("#" + this.preId + "Status").val(),
//            sort: $("#" + this.preId + "Sort").val(),
//            frontClassName: $("#" + this.preId + "frontClass").val(), 
//            realtime: 1
//        };
//    },
//    
//    /* 创建dataGrid  
//     * url:为pageList
//     * typekey:可有可无
//     * params:可有可无
//     * method: POST OR GET
//     * tableList: main.jsp 中的 呈现dataGrid 的　div
//     * hideColumns:是一个阵列，用来存要稳藏的栏位。
//     * */
//    createDataGrid: function (url, params, method, tableList, hideColumns) {
//    	var gridObj = newcommonjs.createGridObj(url, method, params);
//        gridObj.columns = ColCollect.getColumns("Inst");        
//        gridObj.onLoadSuccess = function () {
//            newcommonjs.tableAuto(tableList);
//            if (hideColumns) {
//                $.each(hideColumns, function (k, v) {
//                    Inst.dataGrid.datagrid('hideColumn', v);
//                })
//            }
//        };
//        return gridObj;
//    },
//    
//    /* 启用、停用状态 */
//    changeStatus: function (index, rowData) {
//        var url = this.changeStatusUrl;
//        var dataGrid = this.dataGrid;
//        newcommonjs.changeStatus(index, rowData, dataGrid, url, "POST");
//    },
//    
//    /* 删除行 */
//    deleteRow: function (index, rowData) {
//        var url = this.delUrl;
//        var dataGrid = this.dataGrid;
//        newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
//    },
//    
//    /* 编辑 */
//    editRow: function (rowData) {
//    
//        var id = rowData.stringId;
//        if (rowData.status == true) {
//            showMessage('当前选中记录已启用，不允许修改！');
//            return;
//        }
//        var url = this.tubeInfoUrl;
//        var data = {id:rowData.stringId, opType: 'edit', orgTypeId: this.orgTypeId};
//        
//        var callback = function () {
//        	sampleTypeGrid = new TextCombo(Inst.sampleTypeParam);
//    		reportTemplateGrid = new TextCombo(Inst.reportTemplateParam);
//    		
//            $("#InfoForm").form("load", {
//                /* input's name attr : data */
//            	name: rowData.name,
//                model: rowData.model,
//                producer: rowData.producer,
//                fastCode: rowData.fastCode,
//                displayOrder: rowData.displayOrder,
//                typeId: rowData.typeName,
//                sampleTypeDiv: rowData.sampleTypeName,
//                reportTemplateDiv: rowData.reportTemplateName,
//                orgTypeId: Inst.orgTypeId,
//                id:rowData.stringId,
//                codeNo:rowData.codeNo,
//                opType: 'edit'              
//            });
//            $("#typeId").val(rowData.typeId);
//            $("#spanEditCodeNo").html(rowData.codeNo);
//            newcommonjs.oldName = rowData.name;
//            setTimeout(function(){
//				//alert(rowData.sampleTypeName);
//				sampleTypeGrid.setValue(rowData.sampleTypeSId,rowData.sampleTypeName);  
//				reportTemplateGrid.setValue(rowData.reportTemplateSId,rowData.reportTemplateName);       					
//			},500);
//            
//            //validate.getAuth("Inst");  
//
//        };
//              
//        newcommonjs.newshowDictCodeEditDialog(data,callback, url, 720);
//       
//    },
//    
//    /* 弹出详情信息框 */
//    showDialog: function (rowData) {
//    	
//        var url = this.tubeInfoUrl;
//        var data = {id:rowData.stringId, opType: 'view', orgTypeId: this.orgTypeId};
//       
//        
//        var callback = function () {
//
//            $("#InfoForm").form("load", {
//                /* input's name attr : data */
//                name: rowData.name,
//                model: rowData.model,
//                producer: rowData.producer,
//                fastCode: rowData.fastCode,
//                displayOrder: rowData.displayOrder,
//                typeId: rowData.typeName,
//                sampleTypeDiv: rowData.sampleTypeName,
//                reportTemplateDiv: rowData.reportTemplateName
//                
//            });
//            $("#sampleTypeDiv").html(rowData.sampleTypeName);
//            $("#typeId").val(rowData.typeId);
//            $("form input").attr("readonly","readonly");
//            $("form textarea").attr("readonly","readonly");
//            $("select").attr("disabled","disabled");
//            $("#editBtn").hide();
//            $("#spanEditCodeNo").html(rowData.codeNo);
//        };
//        
//        newcommonjs.newshowDictCodeEditDialog(data,callback, url, 720);
//    },
//    
//    /* 判断新增还是修改 */
//    editDictCode: function (opType, typeKey) {
//        var existUrl = this.checkUrl;
//        var dataGrid = this.dataGrid;
//        var data = $("#InfoForm").serialize();
//        //console.log("before"+data);
//       
//        //for　add callback function
//        var successF = function(data) {
//    		
//			if(data.indexOf("confirm|") == 0){
//				// 有同名
//				resolutionData(data);
//				showConfirm(data.substring(8),function(){
//					newcommonjs.newadd(Inst.addUrl, 'POST', Inst.dataGrid, Inst.reloadData);
//				});
//			} else {
//				
//				newcommonjs.newadd(Inst.addUrl, 'POST', Inst.dataGrid, Inst.reloadData);
//			}
//
//			
//		};
//		
//		//for update callback function
//		var successUp =  function(data) {
//    		//alert(data);
//		
//			if(data.indexOf("confirm|") == 0){
//					
//				showConfirm(data.substring(8),function(){
//					
//					newcommonjs.update(Inst.updateUrl,'POST',Inst.dataGrid);
//				});
//				
//			} else {
//				
//					newcommonjs.update(Inst.updateUrl,'POST',Inst.dataGrid);
//			}
//				
//
//			
//		};
//		var v = this.validateSave();
//        if (opType == "add") {        	
//            var addUrl = this.addUrl;
//            newcommonjs.newaddDictCode(existUrl, addUrl, "POST", dataGrid, data, successF,v);
//        } else if (opType == "edit") {
//        	
//            var updateUrl = this.updateUrl;
//            var id = $("#id").val();
//            var callbackUpdate =  function(data1) {
//				resolutionData(data1);
//				//alert(data);
//				if(data1.indexOf("err|") != 0){
//					//alert('update');
//					newcommonjs.newupdateDictCode(Inst.existUrl, Inst.updateUrl, "GET", Inst.dataGrid, data, successUp,v);
//				}
//			};
//			
//			this.checkIfEdit(callbackUpdate,id);
//            
//        }
//    },
//    
//    
//    
//    validateSave: function() {
//		var name = $("#name").val();
//		var model = $("#model").val();
//		var producer = $("#producer").val();
//		var fastCode = $("#fastCode").val();
//		var displayOrder = $("#displayOrder").val();
//		var sampleTypeId = sampleTypeGrid.getValue();
//		var typeId = $("#typeId").val();
//		
//		if(name == ''){
//			showMessage('仪器名称为空，请重新输入！',function(){
//				$("#name").focus();
//			});
//			return false;
//		}
//		if(model == ''){
//			showMessage('仪器型号为空，请重新输入！',function(){
//				$("#model").focus();
//			});
//			return false;
//		}
//		if(sampleTypeId == ''){
//			showMessage('默认标本类型为空，请重新输入！',function(){
//				//$("#sampleTypeId").focus();
//			});
//			return false;
//		}
//		if(validateDisplayOrder("displayOrder")){
//			return false; 
//		}
//		if(typeId == ''){
//			showMessage('仪器类型为空，请重新输入！',function(){
//				$("#typeId").focus();
//			});
//			return false;
//		}
//		
//		return true;
//    },
//    
//	//进入通讯参数修改页面
//	 showParamsInfo: function (id){
//		 
//	  	var url = '';
//	  	var data = '';
//	  	var callbackUpdate = function(data) {
//	  		//alert('showcallback');
//  			resolutionData(data);
//  			var callback = function(){
//  				//alert('callbak');
//  				$("#comPort").val($("#comPort").data('val'));
//  				$("#transferMode").val($("#transferMode").data('val'));
//  				$("#protocol").val($("#protocol").data('val'));
//  				$("#baudRate").val($("#baudRate").data('val'));
//  				$("#dataBit").val($("#dataBit").data('val'));
//  				$("#stopBit").val($("#stopBit").data('val'));
//  				$("#parityBit").val($("#parityBit").data('val'));
//  				
//  				// 需要回应
//  				if($("#isRespond").val() == '1'){
//  					$("#isRespondCheck").attr("checked",'true'); 
//  				}
//  				// DTR
//  				if($("#isDtr").val() == '1'){
//  					$("#isDtrCheck").attr("checked",'true'); 
//  				}
//  				// RTS
//  				if($("#isRts").val() == '1'){
//  					$("#isRtsCheck").attr("checked",'true'); 
//  				}
//  				
//  			};
//  			if(data.indexOf("err|") != 0){
//  				//alert('parInfo');
//  				url = Inst.InfoUrl2; //ctx + "/inst/ctrInstruments/ctrInstrumentsParamsInfo";
//  				data = {instrumentId:id};
//  				newcommonjs.newshowDictCodeEditDialog(data,callback,url,720);
//  			}
//  		};
//  		
//  		this.checkIfEdit(callbackUpdate,id);
//	 },
//	  
//	  checkIfEdit: function(callback,id){
//			  
//			  $.ajax({
//	  			"url" : Inst.updateUrlIf,
//	  			"type" : "POST",
//	  			data:"id="+id,
//	  			"success" : callback,
//	  			"error" : function() {
//	  			}
//	  		});
//		  
//	  },
//	  
//	//修改通讯参数
//	  updateParams: function(){
//		//防止重复提交
//	    $("#editBtn").attr("disabled", true);
//	    
//		formTextTrim("InfoForm");
//		$("#isRespond").val(0);
//		$("#isDtr").val(0);
//		$("#isRts").val(0);
//		
//		$("input[name='checkboxInst']:checked").each(function(){
//			//alert(this.value);
//			$("#"+ this.value).val(1);
//		});
//				
//		// 修改
//		$.ajax({
//			"url" : Inst.updateUrl2, //ctx + "/inst/ctrInstruments/ctrInstrumentsParamsEdit",
//			"type" : "POST",
//			data:$("#InfoForm").serialize(),
//			"success" : function(data) {
//				//resolutionData(data);
//				$("#ctrDictInfoModal").hide();
//			},
//			"error" : function() {
//			}
//		});
//	}
//
//
//
//  
//
//};
//
//$(function () {
//    Inst.init();
//});
//var canStore = true;
//
//var sampleTypeGrid;//默认标本类型
//var reportTemplateGrid;//单列报告模板
//
////默认标本类型Grid
//var sampleTypeParam = {					//下拉Grid参数,所有参数均为必填
//	div_id:"sampleTypeDiv", 			//对应表单DIV的id
//	grid_id:"gridSampleType", 			//对应数据源Grid的Id
//	name:"sampleTypeId",				//在表单中对应的提交name
//	columnShow:1,						//将要在文本框中显示的列序号
//	width : 180, 					    //Combo的宽度
//	clearOff:false,						//是否禁用clear按钮
//	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	onEnter:function(){
//	}
//};
//
////单列报告模板Grid
//var reportTemplateParam = {				//下拉Grid参数,所有参数均为必填
//	div_id:"reportTemplateDiv", 		//对应表单DIV的id
//	grid_id:"gridReportTemplate", 		//对应数据源Grid的Id
//	name:"reportTemplateId",			//在表单中对应的提交name
//	columnShow:1,						//将要在文本框中显示的列序号
//	width : 180, 					    //Combo的宽度
//	clearOff:false,						//是否禁用clear按钮
//	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	onEnter:function(){
//	}
//};
//
//
//// 关闭窗口
//function closeWin(){
//    $(".oy").remove();
//    $(".xinxi").empty();
//    $(".xinxi").hide();
//}
//
//// 查询List，给翻页使用
//function pageQuery(){
//	var pageNo =$("#pageNo").val();
//	var pageSize = $("#pageSize").val();
//	if(pageNo == 'undefined' || pageNo == null){
//		pageNo = 1;
//	}
//	if(pageSize == 'undefined' || pageSize == null){
//		pageSize = 10;
//	}
//
//	var frontClassName = $("#frontClassName").val();
//	var status = $("#status").val();
//	var sort = $("#sort").val();
//	var url = ctx + "/inst/ctrInstruments/ctrInstrumentsPageList";
//	$("#infoPageDiv").load(url,{frontClassName:frontClassName,status:status,sort:sort,pageNo:pageNo,pageSize:pageSize},function(){
//		$("#infoPageDiv").show();
//	});
//}
//
////查询List， 实时查询数据
//function pageQuery_realtime(type){
//	var pageNo =$("#pageNo").val();
//	var pageSize = $("#pageSize").val();
//	if(pageNo == 'undefined' || pageNo == null){
//		pageNo = 1;
//	}
//	if(pageSize == 'undefined' || pageSize == null){
//		pageSize = 10;
//	}
//	
//	if(type=='add'){
//		//新增的场合，需要清空条件，且排序改为按录入顺序倒序
//		$("#searchStr").val("");
//		$("#frontClassName").val("");
//		$("#status").val("");
//		$("#sort").val("2");
//		pageNo = 1;
//	}
//	
//	if(type=='init'){
//		//初始化、或者简单搜索的时候
//		pageNo = 1;
//	}
//	
//	// 去除空格
//	formTextTrim("rslForm");
//
//	var searchStr = $("#searchStr").val();
//	var frontClassName = $("#frontClassName").val();
//	var status = $("#status").val();
//	var sort = $("#sort").val();
//	var url = ctx + "/inst/ctrInstruments/ctrInstrumentsPageList";
//	$("#infoPageDiv").load(url,{searchStr:searchStr,frontClassName:frontClassName,status:status,sort:sort,pageNo:pageNo,pageSize:pageSize,realtime:1},function(){
//		$("#infoPageDiv").show();
//	});
//}
//
//// 进入明细页面
//function showInfo(id, opType){
//	var url = '';
//	var data = '';
//	
//	if(opType == 'edit'){
//		// 修改
//		// 检查是否可修改
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsIfEdit",
//			"type" : "GET",
//			data:"id="+id,
//			"success" : function(data) {
//				resolutionData(data);
//				if(data.indexOf("err|") != 0){
//					// 检查通过
//					url = ctx + "/inst/ctrInstruments/ctrInstrumentsInfo";
//					data = "id="+id+"&opType="+opType;
//					$("#infoViewDiv").load(url,data,function(){
//						$("body").append("<div class='oy'></div>")
//						$("#infoViewDiv").height(320);
//						$("#infoViewDiv").show();
//					});
//				}
//			},
//			"error" : function() {
//			}
//		});
//		
//	} else {
//		// 查看、新增
//		url = ctx + "/inst/ctrInstruments/ctrInstrumentsInfo";
//		data = "id="+id+"&opType="+opType;
//		$("#infoViewDiv").load(url,data,function(){
//			$("body").append("<div class='oy'></div>")
//			$("#infoViewDiv").height(320);
//			$("#infoViewDiv").show();
//		});
//	}
//
//}
//
////进入通讯参数修改页面
//function showParamsInfo(id){
//	var url = '';
//	var data = '';
//	
//	// 修改
//	// 检查是否可修改
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsIfEdit",
//		"type" : "GET",
//		data:"id="+id,
//		"success" : function(data) {
//			resolutionData(data);
//			if(data.indexOf("err|") != 0){
//				// 检查通过
//				url = ctx + "/inst/ctrInstruments/ctrInstrumentsParamsInfo";
//				data = "instrumentId="+id;
//				$("#infoViewDiv").load(url,data,function(){
//					$("body").append("<div class='oy'></div>")
//					$("#infoViewDiv").height(420);
//					$("#infoViewDiv").show();
//				});
//			}
//		},
//		"error" : function() {
//		}
//	});
//}
//
////全选、反选
//function selectAll(){
//	var chk = $("input[id='selectAllBox']").is(':checked');
//
//	if(chk == true){
//		// 全选
//		$("input[id='checkItem']").each(function(){
//			$(this).prop("checked", true);
//		});
//	} else {
//		// 反选
//		$("input[id='checkItem']").each(function(){
//			$(this).prop("checked", !$(this).prop("checked"));
//		});
//	}
//	
//}
//
//// 启用
//function enableIt(id, index,sampleTypeName){
//	if(sampleTypeName==""||sampleTypeName==null){
//		showMessage('当前选中记录默认标本类型为空，不允许启用！');
//		return;
//	}
//	showConfirm('是否启用当前记录？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsEnable",
//			"type" : "GET",
//			data:"id="+id,
//			"success" : function(data) {
//				resolutionData(data);
//				pageQuery();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
//// 停用
//function disableIt(id, index){
//	showConfirm('是否停用当前记录？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsDisable",
//			"type" : "GET",
//			data:"id="+id,
//			"success" : function(data) {
//				resolutionData(data);
//				pageQuery();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
///**
// * 验证保存的必填条件
// * return 
// */
//function validateSave(){
//	var name = $("#name").val();
//	var model = $("#model").val();
//	var producer = $("#producer").val();
//	var fastCode = $("#fastCode").val();
//	var displayOrder = $("#displayOrder").val();
//	var sampleTypeId = sampleTypeGrid.getValue();
//	var typeId = $("#typeId").val();
//	
//	if(name == ''){
//		showMessage('仪器名称为空，请重新输入！',function(){
//			$("#name").focus();
//		});
//		return false;
//	}
//	if(model == ''){
//		showMessage('仪器型号为空，请重新输入！',function(){
//			$("#model").focus();
//		});
//		return false;
//	}
//	if(sampleTypeId == ''){
//		showMessage('默认标本类型为空，请重新输入！',function(){
//			//$("#sampleTypeId").focus();
//		});
//		return false;
//	}
//	if(validateDisplayOrder("displayOrder")){
//		return false; 
//	}
//	if(typeId == ''){
//		showMessage('仪器类型为空，请重新输入！',function(){
//			$("#typeId").focus();
//		});
//		return false;
//	}
//	
//	return true;
//}
//
//// 新增
//function addIt(){
//	//防止重复提交
//    if(!canStore){
// 		return false;
//    }
//    
//	formTextTrim("addForm");
//	if(!validateSave()){
//		return;
//	}
//	
//	// 检查是否同名
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsIfExisted",
//		"type" : "POST",
//		data:$("#addForm").serialize(),
//		"success" : function(data) {
//			//resolutionData(data);
//			if(data.indexOf("confirm|") == 0){
//				// 有同名
//				showConfirm(data.substring(8),function(){
//					// 确认继续
//					add();
//				});
//			} else {
//				// 无同名，确认继续
//				add();
//			}
//		},
//		"error" : function() {
//		}
//	});
//}
//function add(){
//	canStore = false;
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsAdd",
//		"type" : "POST",
//		data:$("#addForm").serialize(),
//		"success" : function(data) {
//			canStore = true;
//			resolutionData(data);
//			closeWin();
//			pageQuery_realtime('add');//刷新list
//		},
//		"error" : function() {
//			canStore = true;
//		}
//	});
//}
//
//// 修改
//function updateIt(row){
//	//防止重复提交
//    if(!canStore){
// 		return false;
//    }
//    
//	formTextTrim("editForm");
//	if(!validateSave()){
//		return;
//	}
//	
//	// 检查是否同名
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsIfExisted",
//		"type" : "POST",
//		data:$("#editForm").serialize(),
//		"success" : function(data) {
//			//resolutionData(data);
//			if(data.indexOf("confirm|") == 0){
//				// 有同名
//				showConfirm(data.substring(8),function(){
//					// 确认继续
//					update();
//				});
//			} else {
//				// 无同名，确认继续
//				update();
//			}
//		},
//		"error" : function() {
//		}
//	});
//}
//function update(){
//	canStore = false;
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsEdit",
//		"type" : "POST",
//		data:$("#editForm").serialize(),
//		"success" : function(data) {
//			canStore = true;
//			var ret = resolutionData(data);
//			closeWin();
//			
//			//刷新该行记录
//			var jsonObj = eval('(' + ret + ')');
//			//赋值
//			$("#tr_"+jsonObj.idString).children('td').eq(2).html(replaceHtml(jsonObj.name));
//			$("#tr_"+jsonObj.idString).children('td').eq(3).html(replaceHtml(jsonObj.model));
//			$("#tr_"+jsonObj.idString).children('td').eq(4).html("<a href='javascript:void(0)'>"+jsonObj.reportTemplateName+"</a>");
//			$("#tr_"+jsonObj.idString).children('td').eq(5).html(jsonObj.sampleTypeName);
//			$("#tr_"+jsonObj.idString).children('td').eq(6).html(jsonObj.displayOrder);
//			if(jsonObj.typeId==0){
//				$("#tr_"+jsonObj.idString).children('td').eq(7).html('常规');
//			} else if(jsonObj.typeId==1){
//				$("#tr_"+jsonObj.idString).children('td').eq(7).html('微生物');
//			} else if(jsonObj.typeId==2){
//				$("#tr_"+jsonObj.idString).children('td').eq(7).html('文字报告');
//			} else if(jsonObj.typeId==3){
//				$("#tr_"+jsonObj.idString).children('td').eq(7).html('酶标');
//			}
//		},
//		"error" : function() {
//			canStore = true;
//		}
//	});
//}
//
////修改通讯参数
//function updateParams(){
//	//防止重复提交
//    if(!canStore){
// 		return false;
//    }
//    
//	formTextTrim("editForm");
//	
//	// 需要回应
//	if($("#isRespondCheck").attr("class")=="chk_not"){
//		$("#isRespond").val(0);
//	} else {
//		$("#isRespond").val(1);
//	}
//	// 需要回应
//	if($("#isDtrCheck").attr("class")=="chk_not"){
//		$("#isDtr").val(0);
//	} else {
//		$("#isDtr").val(1);
//	}
//	// 需要回应
//	if($("#isRtsCheck").attr("class")=="chk_not"){
//		$("#isRts").val(0);
//	} else {
//		$("#isRts").val(1);
//	}
//	
//	// 修改
//	canStore = false;
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsParamsEdit",
//		"type" : "POST",
//		data:$("#editForm").serialize(),
//		"success" : function(data) {
//			canStore = true;
//			closeWin();
//		},
//		"error" : function() {
//			canStore = true;
//		}
//	});
//}
//
//// 删除
//function deleteIt(id){
//	//判断检验项目是否停用，可用状态不可修改数据 1启用 0停用
//	var status = $("#status_" + id).val();
//	if(status == 1){
//		showMessage("当前选中记录状态为可用，不允许删除！");
//		return;
//	}
//	showConfirm('是否删除当前记录？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsDelete",
//			"type" : "GET",
//			data:"id="+id,
//			"success" : function(data) {
//				resolutionData(data);
//				pageQuery();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
//// 批量删除
//function deleteBatch(){
//	var ids = "";
//	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
//	
//	var i = 0;//标示位提示某行的数据是否也启用使用
//	var flag = false; //当ids为空时且状态勾选有启用的项目时进行判断
//	
//	$("a[id='checkItem']").each(function(){
//		i++;
//		if($(this).attr("class") == 'yes'){
//			//判断选择的数据是否是停用数据
//			var status = $("#status_" + $(this).attr("value")).val();
//			if(status == 1){
//				showMessage("第" + i + "条记录状态为可用，不允许删除！");
//				flag = true;
//				return false;//跳出所有循环；相当于 java中的 break 效果。反之 continue 效果
//			}
//			
//			ids += $(this).attr("value")+",";
//			ids2 += $(this).attr("value")+",";
//		} else {
//			ids2 += " ,";
//		}
//	});
//	if(flag){
//		return;
//	}
//	
//	if(ids == ''){
//		showMessage("请选择要删除的仪器！");
//		return false;
//	}
//	
//	showConfirm('是否删除所选中的记录？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstruments/ctrInstrumentsDeleteBatch",
//			"type" : "GET",
//			data:"ids="+ids2,
//			"success" : function(data) {
//				resolutionData(data);
//				pageQuery();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
//// 通讯参数页面，修改“需要回应”
//function changeStatus(obj){
//	var cla=$("#"+obj).attr("class");
//    if(cla=="chk_not"){
//        $("#"+obj).removeClass("chk_not").addClass("chk_yes");
//    }else{
//        $("#"+obj).removeClass("chk_yes").addClass("chk_not");
//    }
//}
//
//

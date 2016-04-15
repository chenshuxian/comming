/**
 * 标本类型js
 * Created by chenshuxian
 * data 2016/1/8.
 */
var TubeTypes = (function($){

    /* START render basicModule */
    TubeTypes = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.TT,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = ["whonetCode"],	            //要穩藏的欄位
        _data = TubeTypes.searchObj(_preId),    //取得初始grid时所需要的server 参数
        _module = "TubeTypes",                  //模组名称，于grid 建立时使用
        _focusId = "editName",                  //新增、修改页面打开时focus的对象id
        _popArea = 480,                         //新增、修改页面开启时初始大小
        _delBatUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDeleteBatch",           //批次删除的url
        _existUrl = ctx + "/basisDict/ctrTubeTypes/checkNameExisted",                   //查询是否已存在资料url
        _updateUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesEide",                  //修改url
        _addUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesAdd",                      //新增url
        _delUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDelete",                   //删除url
        _changeStatusUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDisableOrEnable", //改变状态的url
        _InfoUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesInfo",                    //新增、修改、view 页面打开时所对映后台调用url
        _pageListUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesPageList",            //datagrid 取得资料的url
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

    $.extend(TubeTypes,{

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
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,


        validateSave: function() {

            var name = $.trim($("#editName").val());
            var displayOrderId = "editDisplayOrder";

            if (name == '') {

                BM.showMessage('中文名称为空，请重新输入！');
                $("#editName").focus();
                return false;

            }
            if (validateDisplayOrder(displayOrderId)) {

                return false;

            }
            return true;
        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(TubeTypes.rowData);
            $("#InfoForm").form("load", {
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                id: rowData.stringId,
                typeKey: rowData.typeKey,
                opType: 'edit'
            });
            $("#editName").focus();
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });

            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        }

        /*callback function area end*/

    });

   return TubeTypes;

}(jQuery));

$(function(){
    TubeTypes.init();
});

///**
// * @ClassName: newctrTubeTypes.js
// * @Description: TODO(基础字典-试管类型-JS)
// * @author chenshuxian
// * @date 2016-01-07
// */
//var tableList;
//var dataGrid;
//$(function() {
//	tableList = $('#ctrTubeTypesList');
//	var url = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesPageList";
//	var params = null;
//	var gridObj = createGridObj(url, 'POST', params);			
//	gridObj.columns = [ [
//							{field : "ck",checkbox : true,width : 30},
//							{
//					            title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
//						            var rowData = JSON.stringify(row);
//						            return "<a onclick='showDialog(" + rowData + ")'>" + value + "</a>";
//					            }
//					        },
//							{title : "中文名称",field : 'name',flex : 1,width : 60},
//							{title : "英文简称",field : 'enShortName',width : 200},
//							{title : "英文名称",field : 'enName',width: 60},
//							{title : "助记符",field : 'fastCode',width: 60},
//							{title : "顺序号",field : 'displayOrder',width: 60},
//							{title : "备注",field : 'memo',width: 60},
//							{title : "状态",field : 'status',formatter : function(value, row, index) {
//								 var returnStr = '<div class="status-switch"><input type="checkbox" name="status" onchange="changeStatus(\'' + index + '\',\'' + row.stringId + '\',\'' + value + '\')" /><i></i></div>';
//						            if (value == '1') {
//						                returnStr = '<div class="status-switch"><input type="checkbox" name="status" checked="checked" onchange="changeStatus(\'' + index + '\',\'' + row.stringId + '\',\'' + value + '\')" /><i></i></div>';
//						            }
//						            return returnStr;
//					
//								
//								}},
//							{title : "操作",field : 'opt',width : 60,align : 'center',
//													formatter : function(value, row,index) {
//														var str = "";
//														var rowData = JSON.stringify(row);
//														str += "<a class='icon icon-edit' onclick='editRow(" + row.stringId + "," + rowData + ")'></a>";
//											            str += '<a class="icon icon-trash" onclick="deleteRow(\'' + index + '\',\'' + row.stringId + '\', \'' + row.status + '\')"></a>';
//											
//														return str;
//													}
//							} ] ];
//	
//	gridObj.onLoadSuccess = function () {
//        tableAuto(tableList);
//    };
//	
//    /* render DataGrid */
//	dataGrid = tableList.datagrid(gridObj);
//	
//	 /* 关键词搜索 */
//    $("#searchBtn").click(function () {
//        dataGrid.datagrid('load', {
//            searchStr: $.trim($("#searchStr").val()),
//            status: $("#status").val(),
//            sort: $("#sort").val()
//        });
//    });
//
//    /* 状态搜索 */
//    $(".status-selector").on("click", "li", function () {
//        $("#statusSpan").html($(this).html());
//        $(".status-selector li.selected").removeClass("selected");
//        var flg = $(this).is('.selected'); //check if it is a specific class
//        $(this).addClass(function () {
//            return flg ? '' : 'selected'; //based on flag return the other class
//        })
//
//        var statusVal = $(this).attr("el-value");
//        $("#status").val(statusVal);
//        dataGrid.datagrid('load', {
//            searchStr: $.trim($("#searchStr").val()),
//            status: $("#status").val(),
//            sort: $("#sort").val()
//        });
//    });
//    
//    /* 排序 */
//    $(".sort-selector").on("click", "li", function () {
//        $("#sortSpan").html($(this).html());
//        $(".sort-selector li.selected").removeClass("selected");
//        var flg = $(this).is('.selected');
//        $(this).addClass(function () {
//            return flg ? '' : 'selected';
//        })
//
//        var sortVal = $(this).attr("el-value");
//        $("#sort").val(sortVal);
//        dataGrid.datagrid('load', {
//            searchStr: $.trim($("#searchStr").val()),
//            status: $("#status").val(),
//            sort: $("#sort").val()
//        });
//    });
//    
//    /* 批量删除 */
//    $('#deleteTubeTypeBatch').click(function () {
//    	      	
//        var checkedItems = $('#ctrTubeTypesList').datagrid('getChecked');
//        if (checkedItems.length == 0) {
//            showMessage('请选择要删除的数据!');
//            return false;
//        }
//
//        var names = [];
//        var ids = [];
//        $.each(checkedItems, function (index, item) {
//            if (item.status == true) {
//                names.push(item.name);
//            } else {
//                ids.push(item.stringId);
//            }
//        });
//        if (names.length > 0) {
//            showMessage("名称【" + names.join(",") + '】启用状态，不允许删除!');
//            return false;
//        }
//
//        $.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
//            if (r) {
//                $.ajax({
//                    url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDeleteBatch",
//                    type: "POST",
//                    data: {
//                    	  ids: ids.join(",")
//                    },
//                    success: function (data) {
//                        showAjaxResult(data);
//                        dataGrid.datagrid('reload');
//                    },
//                    error: function () {
//                    }
//                });
//            }
//
//        });
//    });
//
//    $(window).on('resize', function () {
//        tableAuto(tableList);
//    });
//
//    $("#editInfoTube").click(function () {
//        showAddAndEditDialog('', 'add');
//    });
//			
//
//});
//
///* 弹出详情信息框 */
//function showDialog(rowData) {
//    dialog('ctrTubeTypeInfo', {
//        width: 480
//    }, showTubeTypeCodeInfo(rowData));
//}
//
//function showTubeTypeCodeInfo(rowData) {
//    $('#ctrTubeTypeInfoForm').form('load', {
//        /* input's name attr : data */
//        name: rowData.name,
//        enShortName: rowData.enShortName,
//        enName: rowData.enName,
//        fastCode: rowData.fastCode,
//        displayOrder: rowData.displayOrder,
//        memo: rowData.memo
//    });
//    $("#TubeTypeInfoCodeNo").html(rowData.codeNo);
//}
//
///* 编辑 */
//var oldName;
//function editRow(id, rowData) {
//    if (rowData.status == true) {
//        showMessage('当前选中记录已启用，不允许修改！');
//        return;
//    }
//    showAddAndEditDialog(id, 'edit', function () {
//        $('#ctrTubeTypeInfoEditForm').form('load', {
//            /* input's name attr : data */
//            name: rowData.name,
//            enShortName: rowData.enShortName,
//            enName: rowData.enName,
//            memo: rowData.memo,
//            id: rowData.stringId,
//            fastCode: rowData.fastCode,
//            displayOrder: rowData.displayOrder,
//            opType: 'edit'
//        });
//        $("#TubeTypeInfoCodeNoAdd").html(rowData.codeNo);
//        oldName = rowData.name;
//    });
//
//}
//
///* 弹出新增/编辑框 */
//function showAddAndEditDialog(id, opType, callbackFun) {
//
//    var url = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesInfo";
//    $("#ctrTubeTypeInfoEdit").load(url, {id: id, opType: opType}, function () {
//        dialog('ctrTubeTypeInfoEdit', {
//            width: 480
//        }, callbackFun);
//    });
//}
//
///* 判断新增还是修改 */
//function editTubeCode(opType) {
//    if (opType == "add") {
//        addTubeType();
//    } else if (opType == "edit") {
//        updateTubeType();
//    }
//}
//
///* 修改 */
//function updateTubeType() {
//    //防止重复提交
//    $("#editBtn").attr("disable", true);
//    //是否有过变更
//    if (!formIsDirty("ctrTubeTypeInfoEditForm")) {
//        $('#ctrTubeTypeInfoEdit').hide();
//        return false;
//    }
//    formTextTrim("ctrTubeTypeInfoEditForm");
//    if (!validateSave()) {
//        return;
//    }
//    // 检查是否同名
//    var id = $("#editId").val();
//    var name = $("#editName").val().trim();
//    // 检查是否同名
//    if (oldName != name) {
//        $.ajax({
//            url: ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
//            type: "POST",
//            data: {id: id, name: name},
//            success: function (data) {
//                if (data.indexOf("confirm|") == 0) {
//                    // 有同名
//                    showConfirm(data.substring(8), function () {
//                        // 确认继续
//                        update();
//                    });
//                } else {
//                    // 无同名，确认继续
//                    update();
//                }
//            },
//            error: function () {
//                $("#editBtn").attr("disable", false);
//            }
//        });
//    } else {
//        update();
//    }
//}
//
//function update() {
//    var dataString = $("#ctrTubeTypeInfoEditForm").serialize();
//    var id = $("#id").val();
//    $.ajax({
//        url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesEide",
//        type: "POST",
//        data: dataString,
//        success: function (data) {
//            $("#editBtn").attr("disable", false);
//            resolutionData(data);
//            dataGrid.datagrid('reload');
//            $('#ctrTubeTypeInfoEdit').hide();
//        },
//        "error": function () {
//            $("#editBtn").attr("disable", false);
//        }
//    });
//}
//
//
///* 新增 */
//function addTubeType() {
//    //防止重复提交
//    $("#editBtn").attr("disable", true);
//    formTextTrim("ctrTubeTypeInfoEditForm");
//
//
//    if (!validateSave()) {
//        return;
//    }
//
//    var name = $.trim($("#editName").val());
//    // 检查是否同名
//    $.ajax({
//        url: ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
//        type: "POST",
//        data: {
//            name: name
//        },
//        success: function (data) {
//            // resolutionData(data);
//            if (data.indexOf("confirm|") == 0) {
//                // 有同名
//                $.messager.confirm("提示", data.substring(8), function (r) {
//                    if (r) {
//                        // 确认继续
//                        add();
//                    } else {
//                        $("#editBtn").attr("disable", false);
//                    }
//                });
//            } else {
//                // 无同名，确认继续
//                add();
//            }
//        },
//        error: function () {
//            $("#editBtn").attr("disable", false);
//        }
//    });
//}
//
//
//function add() {
//    var dataString = $("#ctrTubeTypeInfoEditForm").serialize();
//    $.ajax({
//        url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesAdd",
//        type: "POST",
//        data: dataString,
//        success: function (data) {
//            $("#editBtn").attr("disable", false);
//            resolutionData(data);
//            dataGrid.datagrid('reload');
//            $('#ctrTubeTypeInfoEdit').hide();
//        },
//        error: function () {
//            $("#editBtn").attr("disable", false);
//        }
//    });
//}
//
///**
// * 验证保存的必填条件
// * return
// */
//function validateSave() {
//    var name = $.trim($("#editName").val());
//    var displayOrderId = "editDisplayOrder";
//    if (name == '') {
//        showMessage('中文名称为空，请重新输入！');
//        $("#editName").focus();
//        return false;
//    }
//    if (validateDisplayOrder(displayOrderId)) {
//        return false;
//    }
//    return true;
//}
//
///* 删除行 */
//function deleteRow(index, id, status) {
//    if (status == true) {
//        showMessage('当前选中记录已启用，不允许删除！');
//        return;
//    }
//    $.messager.confirm("提示", "你确定要删除吗?", function (r) {
//        if (r) {
//            $.ajax({
//                url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDelete",
//                type: "POST",
//                data: {
//                    id: id
//                },
//                success: function (data) {
//                    showAjaxResult(data);
//                    dataGrid.datagrid('deleteRow', index);
//                },
//                error: function () {
//                }
//            });
//        }
//    });
//}
//
///* 启用、停用状态 */
//function changeStatus(index, id, val) {
//    if (id == '' || val == '') {
//        showMessage('请选择操作记录!');
//        return;
//    }
//    var confirmMeg = "";
//    var operatioType = "";
//    var newVal;
//    if (val == '1') {
//        confirmMeg = "是否停用当前记录？";
//        operatioType = "Disable";
//        newVal = '0';
//    }
//    if (val == '0') {
//        confirmMeg = "是否启用当前记录？";
//        operatioType = "Enable";
//        newVal = '1';
//    }
//    $.messager.confirm("提示", confirmMeg, function (r) {
//        if (r) {
//            $.ajax({
//                url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDisableOrEnable",
//                type: "POST",
//                data: {id: id, operatioType: operatioType},
//                success: function (data) {
//                    showAjaxResult(data);
//                    dataGrid.datagrid('updateRow', {
//                        index: index,
//                        row: {
//                            status: newVal
//                        }
//                    });
//                },
//                error: function () {
//                    dataGrid.datagrid('refreshRow', index);
//                }
//            });
//        } else {
//            dataGrid.datagrid('refreshRow', index);
//        }
//    });
//}
//

///**
// * 标本类型js
// * Created by chenshuxian on 2016/1/8.
// */
//var TubeTypes = {
//		
//    preId: $("#ttPreId").val(), 
//    tableList :  $("#" + TubeTypes.preId + "TypeList"),
//    /*url 定義*/
//    delBatUrl: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDeleteBatch",
//    checkUrl: ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
//    updateUrl: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesEide", 
//    addUrl: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesAdd", 
//    delUrl: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDelete",
//    changeStatusUrl: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDisableOrEnable",
//    tubeInfoUrl: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesInfo",
//    pageListUrl: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesPageList",
//    
//    init: function () {
//    	newcommonjs.pageInit(this.preId);
//        var url = TubeTypes.pageListUrl;
//        var POST = "POST";
//        var GET = "GET";
//        //var typeKey = $("#" + TubeTypes.preId + "TypeKey").val();
//        //var params = {typeKey: typeKey};
//        var typeKey = null;
//        var params = null;  //如有需要在編寫如上方格式。
//        var coloumns=new Array()
//        coloumns[0]="whonetCode";	//要穩藏的欄位
//        
//        var gridObj = TubeTypes.createDataGrid(url, typeKey, params, 'POST', TubeTypes.tableList,coloumns);
////        gridObj.view =    
////            $.extend({}, $.fn.datagrid.defaults.view, {
////                onAfterRender: function () {
////                    // 操作成功后刷新dataGrid
////                    switch (TubeTypes.currentEvent) {
////                        case "add":
////                            newcommonjs.setSearchConditions(TubeTypes.preId, "", -1, 2);
////                            TubeTypes.currentEvent = undefined;
////                            break;
////                    }
////                }
////            });
//
//        
//        //* render DataGrid */
//        this.dataGrid = TubeTypes.tableList.datagrid(gridObj);
//
//        /* 关键词搜索 */
//        $("#" + this.preId + "SearchBtn").click(function () {
//        	newcommonjs.dataGridSearch(TubeTypes.dataGrid, TubeTypes.searchObj());
//        });
//
//        /* 状态搜索 */
//        //$("." + this.preId + "-status-selector").on("click", "li", function () {
//        $("." + this.preId + "-status-selector li").on("click", function () {
//            $("#" + TubeTypes.preId + "StatusSpan").html($(this).html());
//            $("." + TubeTypes.preId + "-status-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + TubeTypes.preId + "Status").val(statusVal);
//
//            newcommonjs.dataGridSearch(TubeTypes.dataGrid, TubeTypes.searchObj());
//        });
//
//        /* 排序 */
//        $("." + this.preId + "-sort-selector").on("click", "li", function () {
//            $("#" + TubeTypes.preId + "SortSpan").html($(this).html());
//            $("." + TubeTypes.preId + "-sort-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var sortVal = $(this).attr("el-value");
//            $("#" + TubeTypes.preId + "Sort").val(sortVal);
//
//            newcommonjs.dataGridSearch(TubeTypes.dataGrid, TubeTypes.searchObj());
//        });
//
//        /* 批量删除 */
//        $("#" + this.preId + "DeleteTypeBatch").click(function () {
//            newcommonjs.deleteBatch(TubeTypes.dataGrid,TubeTypes.delBatUrl,POST);
//        });
//
//        /* 新增 */
//        $("#" + this.preId + "AddType").click(function () {
//          
//        	TubeTypes.currentEvent = "add";
//            newcommonjs.showDictCodeEditDialog('', 'add', null, null, TubeTypes.tubeInfoUrl, 480);
//     
//        });
//
//        $(window).on('resize', function () {
//            newcommonjs.tableAuto(TubeTypes.tableList);
//        });
//    },
//
//    /* *
//     * 取得所有搜尋欄資訊
//     * 返回obj 格式
//     * */
//    searchObj: function () {
//        return {
//            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
//            status: $("#" + this.preId + "Status").val(),
//            sort: $("#" + this.preId + "Sort").val(),
//            typeKey: $("#" + this.preId + "TypeKey").val()
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
////    createDataGrid: function (url, typeKey, params, method, tableList, hideColumns) {
////        var gridObj = newcommonjs.createGridObj(url, method, params);
////        gridObj.columns = newcommonjs.getColumns("TubeTypes");        
////        gridObj.onLoadSuccess = function () {
////            newcommonjs.tableAuto(tableList);
////            if (hideColumns) {
////                $.each(hideColumns, function (k, v) {
////                    TubeTypes.dataGrid.datagrid('hideColumn', v);
////                })
////            }
////        };
////        return gridObj;
////    },
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
//        var id = rowData.stringId;
//        if (rowData.status == true) {
//            showMessage('当前选中记录已启用，不允许修改！');
//            return;
//        }
//        var url = this.tubeInfoUrl;
//        //alert(url);
//        newcommonjs.showDictCodeEditDialog(id, 'edit', rowData.typeKey, function () {
//            $("#InfoForm").form("load", {
//                /* input's name attr : data */
//                name: rowData.name,
//                enShortName: rowData.enShortName,
//                enName: rowData.enName,
//                whonetCode: rowData.whonetCode,
//                fastCode: rowData.fastCode,
//                displayOrder: rowData.displayOrder,
//                memo: rowData.memo,
//                id: rowData.stringId,
//                typeKey: rowData.typeKey,
//                opType: 'edit'
//            });
//            $("#spanEditCodeNo").html(rowData.codeNo);
//           
//            newcommonjs.oldName = rowData.name;
//        }, url, 480);
//    },
//    
//    /* 弹出详情信息框 */
//    showDialog: function (rowData) {
//        var url = this.tubeInfoUrl;
//        newcommonjs.showDictCodeEditDialog('', 'view', rowData.typeKey, function () {
//            $("#InfoForm").form("load", {
//                /* input's name attr : data */
//                name: rowData.name,
//                enShortName: rowData.enShortName,
//                enName: rowData.enName,
//                whonetCode: rowData.whonetCode,
//                fastCode: rowData.fastCode,
//                displayOrder: rowData.displayOrder,
//                memo: rowData.memo
//            });
//            $("form input").attr("readonly","readonly");
//            $("form textarea").attr("readonly","readonly");
//            $("#editBtn").hide();
//            $("#spanEditCodeNo").html(rowData.codeNo);
//        }, url, 480);
//    },
//    
//    /* 判断新增还是修改 */
//    editDictCode: function (opType, typeKey) {
//        var existUrl = this.checkUrl;
//        var dataGrid = this.dataGrid;
//        if (opType == "add") {
//            var addUrl = this.addUrl;
//            newcommonjs.addDictCode(existUrl, addUrl, "POST", "POST", dataGrid);
//        } else if (opType == "edit") {
//            var updateUrl = this.updateUrl;
//            newcommonjs.updateDictCode(existUrl, updateUrl, "POST", "POST", dataGrid);
//        }
//    },
//
//
//  
//
//};
//
//$(function () {
//    TubeTypes.init();
//});
//
/////**
//// * @ClassName: newctrTubeTypes.js
//// * @Description: TODO(基础字典-试管类型-JS)
//// * @author chenshuxian
//// * @date 2016-01-07
//// */
////var tableList;
////var dataGrid;
////$(function() {
////	tableList = $('#ctrTubeTypesList');
////	var url = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesPageList";
////	var params = null;
////	var gridObj = createGridObj(url, 'POST', params);			
////	gridObj.columns = [ [
////							{field : "ck",checkbox : true,width : 30},
////							{
////					            title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
////						            var rowData = JSON.stringify(row);
////						            return "<a onclick='showDialog(" + rowData + ")'>" + value + "</a>";
////					            }
////					        },
////							{title : "中文名称",field : 'name',flex : 1,width : 60},
////							{title : "英文简称",field : 'enShortName',width : 200},
////							{title : "英文名称",field : 'enName',width: 60},
////							{title : "助记符",field : 'fastCode',width: 60},
////							{title : "顺序号",field : 'displayOrder',width: 60},
////							{title : "备注",field : 'memo',width: 60},
////							{title : "状态",field : 'status',formatter : function(value, row, index) {
////								 var returnStr = '<div class="status-switch"><input type="checkbox" name="status" onchange="changeStatus(\'' + index + '\',\'' + row.stringId + '\',\'' + value + '\')" /><i></i></div>';
////						            if (value == '1') {
////						                returnStr = '<div class="status-switch"><input type="checkbox" name="status" checked="checked" onchange="changeStatus(\'' + index + '\',\'' + row.stringId + '\',\'' + value + '\')" /><i></i></div>';
////						            }
////						            return returnStr;
////					
////								
////								}},
////							{title : "操作",field : 'opt',width : 60,align : 'center',
////													formatter : function(value, row,index) {
////														var str = "";
////														var rowData = JSON.stringify(row);
////														str += "<a class='icon icon-edit' onclick='editRow(" + row.stringId + "," + rowData + ")'></a>";
////											            str += '<a class="icon icon-trash" onclick="deleteRow(\'' + index + '\',\'' + row.stringId + '\', \'' + row.status + '\')"></a>';
////											
////														return str;
////													}
////							} ] ];
////	
////	gridObj.onLoadSuccess = function () {
////        tableAuto(tableList);
////    };
////	
////    /* render DataGrid */
////	dataGrid = tableList.datagrid(gridObj);
////	
////	 /* 关键词搜索 */
////    $("#searchBtn").click(function () {
////        dataGrid.datagrid('load', {
////            searchStr: $.trim($("#searchStr").val()),
////            status: $("#status").val(),
////            sort: $("#sort").val()
////        });
////    });
////
////    /* 状态搜索 */
////    $(".status-selector").on("click", "li", function () {
////        $("#statusSpan").html($(this).html());
////        $(".status-selector li.selected").removeClass("selected");
////        var flg = $(this).is('.selected'); //check if it is a specific class
////        $(this).addClass(function () {
////            return flg ? '' : 'selected'; //based on flag return the other class
////        })
////
////        var statusVal = $(this).attr("el-value");
////        $("#status").val(statusVal);
////        dataGrid.datagrid('load', {
////            searchStr: $.trim($("#searchStr").val()),
////            status: $("#status").val(),
////            sort: $("#sort").val()
////        });
////    });
////    
////    /* 排序 */
////    $(".sort-selector").on("click", "li", function () {
////        $("#sortSpan").html($(this).html());
////        $(".sort-selector li.selected").removeClass("selected");
////        var flg = $(this).is('.selected');
////        $(this).addClass(function () {
////            return flg ? '' : 'selected';
////        })
////
////        var sortVal = $(this).attr("el-value");
////        $("#sort").val(sortVal);
////        dataGrid.datagrid('load', {
////            searchStr: $.trim($("#searchStr").val()),
////            status: $("#status").val(),
////            sort: $("#sort").val()
////        });
////    });
////    
////    /* 批量删除 */
////    $('#deleteTubeTypeBatch').click(function () {
////    	      	
////        var checkedItems = $('#ctrTubeTypesList').datagrid('getChecked');
////        if (checkedItems.length == 0) {
////            showMessage('请选择要删除的数据!');
////            return false;
////        }
////
////        var names = [];
////        var ids = [];
////        $.each(checkedItems, function (index, item) {
////            if (item.status == true) {
////                names.push(item.name);
////            } else {
////                ids.push(item.stringId);
////            }
////        });
////        if (names.length > 0) {
////            showMessage("名称【" + names.join(",") + '】启用状态，不允许删除!');
////            return false;
////        }
////
////        $.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
////            if (r) {
////                $.ajax({
////                    url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDeleteBatch",
////                    type: "POST",
////                    data: {
////                    	  ids: ids.join(",")
////                    },
////                    success: function (data) {
////                        showAjaxResult(data);
////                        dataGrid.datagrid('reload');
////                    },
////                    error: function () {
////                    }
////                });
////            }
////
////        });
////    });
////
////    $(window).on('resize', function () {
////        tableAuto(tableList);
////    });
////
////    $("#editInfoTube").click(function () {
////        showAddAndEditDialog('', 'add');
////    });
////			
////
////});
////
/////* 弹出详情信息框 */
////function showDialog(rowData) {
////    dialog('ctrTubeTypeInfo', {
////        width: 480
////    }, showTubeTypeCodeInfo(rowData));
////}
////
////function showTubeTypeCodeInfo(rowData) {
////    $('#ctrTubeTypeInfoForm').form('load', {
////        /* input's name attr : data */
////        name: rowData.name,
////        enShortName: rowData.enShortName,
////        enName: rowData.enName,
////        fastCode: rowData.fastCode,
////        displayOrder: rowData.displayOrder,
////        memo: rowData.memo
////    });
////    $("#TubeTypeInfoCodeNo").html(rowData.codeNo);
////}
////
/////* 编辑 */
////var oldName;
////function editRow(id, rowData) {
////    if (rowData.status == true) {
////        showMessage('当前选中记录已启用，不允许修改！');
////        return;
////    }
////    showAddAndEditDialog(id, 'edit', function () {
////        $('#ctrTubeTypeInfoEditForm').form('load', {
////            /* input's name attr : data */
////            name: rowData.name,
////            enShortName: rowData.enShortName,
////            enName: rowData.enName,
////            memo: rowData.memo,
////            id: rowData.stringId,
////            fastCode: rowData.fastCode,
////            displayOrder: rowData.displayOrder,
////            opType: 'edit'
////        });
////        $("#TubeTypeInfoCodeNoAdd").html(rowData.codeNo);
////        oldName = rowData.name;
////    });
////
////}
////
/////* 弹出新增/编辑框 */
////function showAddAndEditDialog(id, opType, callbackFun) {
////
////    var url = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesInfo";
////    $("#ctrTubeTypeInfoEdit").load(url, {id: id, opType: opType}, function () {
////        dialog('ctrTubeTypeInfoEdit', {
////            width: 480
////        }, callbackFun);
////    });
////}
////
/////* 判断新增还是修改 */
////function editTubeCode(opType) {
////    if (opType == "add") {
////        addTubeType();
////    } else if (opType == "edit") {
////        updateTubeType();
////    }
////}
////
/////* 修改 */
////function updateTubeType() {
////    //防止重复提交
////    $("#editBtn").attr("disable", true);
////    //是否有过变更
////    if (!formIsDirty("ctrTubeTypeInfoEditForm")) {
////        $('#ctrTubeTypeInfoEdit').hide();
////        return false;
////    }
////    formTextTrim("ctrTubeTypeInfoEditForm");
////    if (!validateSave()) {
////        return;
////    }
////    // 检查是否同名
////    var id = $("#editId").val();
////    var name = $("#editName").val().trim();
////    // 检查是否同名
////    if (oldName != name) {
////        $.ajax({
////            url: ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
////            type: "POST",
////            data: {id: id, name: name},
////            success: function (data) {
////                if (data.indexOf("confirm|") == 0) {
////                    // 有同名
////                    showConfirm(data.substring(8), function () {
////                        // 确认继续
////                        update();
////                    });
////                } else {
////                    // 无同名，确认继续
////                    update();
////                }
////            },
////            error: function () {
////                $("#editBtn").attr("disable", false);
////            }
////        });
////    } else {
////        update();
////    }
////}
////
////function update() {
////    var dataString = $("#ctrTubeTypeInfoEditForm").serialize();
////    var id = $("#id").val();
////    $.ajax({
////        url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesEide",
////        type: "POST",
////        data: dataString,
////        success: function (data) {
////            $("#editBtn").attr("disable", false);
////            resolutionData(data);
////            dataGrid.datagrid('reload');
////            $('#ctrTubeTypeInfoEdit').hide();
////        },
////        "error": function () {
////            $("#editBtn").attr("disable", false);
////        }
////    });
////}
////
////
/////* 新增 */
////function addTubeType() {
////    //防止重复提交
////    $("#editBtn").attr("disable", true);
////    formTextTrim("ctrTubeTypeInfoEditForm");
////
////
////    if (!validateSave()) {
////        return;
////    }
////
////    var name = $.trim($("#editName").val());
////    // 检查是否同名
////    $.ajax({
////        url: ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
////        type: "POST",
////        data: {
////            name: name
////        },
////        success: function (data) {
////            // resolutionData(data);
////            if (data.indexOf("confirm|") == 0) {
////                // 有同名
////                $.messager.confirm("提示", data.substring(8), function (r) {
////                    if (r) {
////                        // 确认继续
////                        add();
////                    } else {
////                        $("#editBtn").attr("disable", false);
////                    }
////                });
////            } else {
////                // 无同名，确认继续
////                add();
////            }
////        },
////        error: function () {
////            $("#editBtn").attr("disable", false);
////        }
////    });
////}
////
////
////function add() {
////    var dataString = $("#ctrTubeTypeInfoEditForm").serialize();
////    $.ajax({
////        url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesAdd",
////        type: "POST",
////        data: dataString,
////        success: function (data) {
////            $("#editBtn").attr("disable", false);
////            resolutionData(data);
////            dataGrid.datagrid('reload');
////            $('#ctrTubeTypeInfoEdit').hide();
////        },
////        error: function () {
////            $("#editBtn").attr("disable", false);
////        }
////    });
////}
////
/////**
//// * 验证保存的必填条件
//// * return
//// */
////function validateSave() {
////    var name = $.trim($("#editName").val());
////    var displayOrderId = "editDisplayOrder";
////    if (name == '') {
////        showMessage('中文名称为空，请重新输入！');
////        $("#editName").focus();
////        return false;
////    }
////    if (validateDisplayOrder(displayOrderId)) {
////        return false;
////    }
////    return true;
////}
////
/////* 删除行 */
////function deleteRow(index, id, status) {
////    if (status == true) {
////        showMessage('当前选中记录已启用，不允许删除！');
////        return;
////    }
////    $.messager.confirm("提示", "你确定要删除吗?", function (r) {
////        if (r) {
////            $.ajax({
////                url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDelete",
////                type: "POST",
////                data: {
////                    id: id
////                },
////                success: function (data) {
////                    showAjaxResult(data);
////                    dataGrid.datagrid('deleteRow', index);
////                },
////                error: function () {
////                }
////            });
////        }
////    });
////}
////
/////* 启用、停用状态 */
////function changeStatus(index, id, val) {
////    if (id == '' || val == '') {
////        showMessage('请选择操作记录!');
////        return;
////    }
////    var confirmMeg = "";
////    var operatioType = "";
////    var newVal;
////    if (val == '1') {
////        confirmMeg = "是否停用当前记录？";
////        operatioType = "Disable";
////        newVal = '0';
////    }
////    if (val == '0') {
////        confirmMeg = "是否启用当前记录？";
////        operatioType = "Enable";
////        newVal = '1';
////    }
////    $.messager.confirm("提示", confirmMeg, function (r) {
////        if (r) {
////            $.ajax({
////                url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDisableOrEnable",
////                type: "POST",
////                data: {id: id, operatioType: operatioType},
////                success: function (data) {
////                    showAjaxResult(data);
////                    dataGrid.datagrid('updateRow', {
////                        index: index,
////                        row: {
////                            status: newVal
////                        }
////                    });
////                },
////                error: function () {
////                    dataGrid.datagrid('refreshRow', index);
////                }
////            });
////        } else {
////            dataGrid.datagrid('refreshRow', index);
////        }
////    });
////}
////

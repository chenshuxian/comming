/**
 * 结果类型js
 * Created by subanmiao on 2016/1/11.
 */
var ResultType = (function($){

    /* START render basicModule */
    ResultType = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.RT,
        _tableList =  $("#" + _preId + "List"),
        _tableList2 = $("#" + _preId + "List2"),
        _hideCols = [],	//要穩藏的欄位
        _data = ResultType.searchObj(_preId),
        _pageListUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesPageList",
        _pageListUrl2 = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailPageList",
        _module = "ResultType",
        _module2 = "ResultType2",
    /* START dataGrid 生成*/

        //first dataGrid
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },
        //resultType dataGrid obj render
        _gridObj = dataGridM.init(_dgParams),

        _upgradeObj = {
            pagination: false,

            onLoadSuccess: function(data) {

                var rows = _tableList.datagrid("getRows");

                if (data.total == 0) {
                    _tableList.datagrid('loadData', {total: 0, rows: []});//清空下方DateGrid
                } else {
                    ResultType.typeId = rows[0].stringId;
                    _loadResultDescDataGrid(ResultType.typeId);
                }

            },
            onClickRow: function(index, row) {
                // 刷新结果描述表
                ResultType.reloadResultDesc(row);

            },
            onCheck: function(index, row) {
                ResultType.reloadResultDesc(row);
            }

        },

        _gridObj = $.extend({},_gridObj,_upgradeObj),
        // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj);


    /* 加载结果描述 */
    var _loadResultDescDataGrid= function (typeId) {
        // 结果描述列表
        //this.resultDescTableList = $("#" + this.preId + "ResultDescList");
        //var resultDescUrl = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailPageList";
        var
            _data2 = {typeId: typeId, sort: ResultType.descSort},

            //second dataGrid
            _dgParams2 = {
                url:_pageListUrl2,
                data:_data2,
                module:_module2,
                hideCols:_hideCols,
                tableList:_tableList2,
                preId:_preId
            },

            //resultType dataGrid obj render
            _gridObj2 = dataGridM.init(_dgParams2),

            _upgradeObj2 = {

                pagination: false,

                onLoadSuccess: function(data) {

                    var columns = ResultType.tableList2.datagrid('getColumnFields');

                },
                onClickRow: function(index, row) {
                        // 刷新结果描述表
                    newcommonjs.rowClickStyle(ResultType.resultDescDataGrid, this);

                }

            },
            // render dataGrid
            _gridObj2 = $.extend({},_gridObj2,_upgradeObj2);

        ResultType.dataGrid2 = _tableList2.datagrid(_gridObj2);


    };

    /* 状态搜索 */
    $("." + ResultType.preId + "-status-selector li").on("click", function () {
        $("#" + ResultType.preId + "StatusSpan").html($(this).html());
        $("." + ResultType.preId + "-status-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#" + ResultType.preId + "Status").val(statusVal);

        ResultType.searchGrid();
    });

    /* 排序 */
    $("." + ResultType.preId + "-sort-selector li").on("click", function () {
        $("#" + ResultType.preId + "SortSpan").html($(this).html());
        $("." + ResultType.preId + "-sort-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var sortVal = $(this).attr("el-value");
        $("#" + ResultType.preId + "Sort").val(sortVal);

        ResultType.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        ResultType.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        ResultType.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        ResultType.deleteBetch();
    });

    // delete desc batch
    $("#" + this.preId + "DeleteResultDescBatch").click(function () {

        var params = {
            dataGrid : ResultType.dataGrid2,
            url: ResultType.delBatUrl2
        };

        ResultType.deleteBetch(params);

    });

    /* 结果描述新增 */
    $("#" + this.preId + "AddResultDesc").click(function () {

        var params = {
            callback : function(){$("#editTypeId").val(ResultType.typeId);},
            url : ResultType.InfoUrl2
        };
        ResultType.addPop(params);

    });

    $(window).on('resize', function () {
        //newcommonjs.tableAuto(ResultType.resultTypeTableList);
        var width = ResultType.tableList.parents('.tabs-panels').width() - 40;
        ResultType.tableList.datagrid('resize', {
            width: width
        });
        ResultType.tableList2.datagrid('resize', {
            width: width
        });
    });

    $.extend(ResultType,{

        preId:_preId,
        typeId: null,
        //设定pop弹出框的大小
        popArea: 480,
        descSort: 0,
        focusId: "editName",
        tableList:_tableList,
        tableList2:_tableList2,
        /*START url 定義*/
        delBatUrl: ctx + "/basisDict/ctrResultTypes/ctrResultTypesDeleteBatch",
        existUrl: ctx + "/basisDict/ctrResultTypes/checkNameExisted",
        updateUrl: ctx + "/basisDict/ctrResultTypes/ctrResultTypesEdit",
        addUrl: ctx + "/basisDict/ctrResultTypes/ctrResultTypesAdd",
        delUrl: ctx + "/basisDict/ctrResultTypes/ctrResultTypesDelete",
        changeStatusUrl: ctx + "/basisDict/ctrResultTypes/ctrResultTypesDisableOrEnable",
        InfoUrl: ctx + "/basisDict/ctrResultTypes/ctrResultTypesInfo",
        pageListUrl: _pageListUrl,

        //dataGrid2 of Url
        delBatUrl2: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDeleteBatch",
        existUrl2: ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
        updateUrl2: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailEdit",
        addUrl2: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailAdd",
        delUrl2: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDelete",
        InfoUrl2: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailInfo",
        pageListUrl2: _pageListUrl2,
        /*END url 定義*/
        dataGrid:_dataGrid,
        //dataGrid2:_dataGrid2,

        validateSave: function() {

            var name = $.trim($("#editName").val());
            var displayOrderId = "editDisplayOrder";

            if (name == '') {

                showMessage('中文名称为空，请重新输入！');
                $("#editName").focus();
                return false;

            }
            if (validateDisplayOrder(displayOrderId)) {

                return false;

            }
            return true;
        },

        reloadResultDesc: function(row) {
            this.typeId = row.stringId;
            ResultType.dataGrid2.datagrid('reload', {
                typeId: row.stringId,
                sort: ResultType.descSort
            });
        },

        /* 结果描述判断新增还是修改 */
        resultDescEdit: function (opType) {
            if (opType == "add") {
                this.addResultDesc();
            } else if (opType == "edit") {
                this.updateResultDesc();
            }
        },

        editResultDesc: function (rowData) {
            var id = rowData.stringId;
            var url = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailInfo";
            newcommonjs.showDictCodeEditDialog(id, 'edit', ResultType.typeId, function () {
                $("#InfoForm").form("load", {
                    resultValue: rowData.resultValue,
                    displayOrder: rowData.displayOrder,
                    id: rowData.stringId,
                    fastCode: rowData.fastCode,
                    opType: 'edit',
                    typeId: ResultType.typeId
                });
                ResultType.oldResultValue = rowData.resultValue;
            }, url, 480);
        },

        addResultDesc: function () {
            //防止重复提交
            $("#editBtn").attr("disabled", true);
            formTextTrim("InfoForm");
            if(!this.validateResultDescForm()){
                return;
            }

            var name = $.trim($("#editResultValue").val());
            var typeId = ResultType.typeId;
            // 检查是否同名
            $.ajax({
                url: ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
                type: "POST",
                data : {name : name, typeId : typeId},
                success: function (data) {
                    $("#editBtn").attr("disabled", false);
                    if (data.indexOf("confirm|") == 0) {
                        // 有同名
                        showConfirm(data.substring(8), function () {
                            // 确认继续
                            ResultType.addDesc();
                        })
                    } else {
                        // 无同名，确认继续
                        ResultType.addDesc();
                    }
                },
                error: function () {
                    $("#editBtn").attr("disabled", false);
                }
            });
        },

        addDesc: function () {
            var data = $("#InfoForm").serialize();
            $.ajax({
                url: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailAdd",
                type: "POST",
                data: data,
                success: function (data) {
                    $("#editBtn").attr("disabled", false);
                    resolutionData(data);
                    ResultType.resultDescDataGrid.datagrid('reload', {
                        sort: 2,
                        typeId: ResultType.typeId
                    });
                    $("#ctrDictInfoModal").hide();
                },
                error: function () {
                    $("#editBtn").attr("disabled", false);
                }
            });
        },

        updateResultDesc: function () {
            //防止重复提交
            $("#editBtn").attr("disabled", true);
            formTextTrim("InfoForm");
            if (!this.validateResultDescForm()) {
                return;
            }

            var id = $("#editId").val();
            var resultValue = $.trim($("#editResultValue").val());
            // 检查是否同名
            if (ResultType.oldResultValue != resultValue) {
                $.ajax({
                    url : ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
                    type : "POST",
                    data : {id : id, name : resultValue, typeId : ResultType.typeId},
                    success: function (data) {
                        $("#editBtn").attr("disabled", false);
                        if (data.indexOf("confirm|") == 0) {
                            // 有同名
                            showConfirm(data.substring(8), function () {
                                // 确认继续
                                ResultType.updateDesc();
                            });
                        } else {
                            // 无同名，确认继续
                            ResultType.updateDesc();
                        }
                    },
                    error: function () {
                        $("#editBtn").attr("disabled", false);
                    }
                });
            } else {
                ResultType.updateDesc();
            }
        },

        updateDesc: function () {
            var data = $("#InfoForm").serialize();
            $.ajax({
                url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailEdit",
                type : "POST",
                data: data,
                success: function (data) {
                    $("#editBtn").attr("disabled", false);
                    resolutionData(data);
                    ResultType.resultDescDataGrid.datagrid('reload');
                    $("#ctrDictInfoModal").hide();
                },
                "error": function () {
                    $("#editBtn").attr("disabled", false);
                }
            });
        },

        deleteResultDesc: function (index, rowData) {
            var resultTypeId = ResultType.typeId;
            $.messager.confirm("提示", "是否删除当前记录？", function (r) {
                if (r) {
                    $.ajax({
                        url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDelete",
                        type : "POST",
                        data : {
                            id : rowData.stringId
                        },
                        success : function(data) {
                            resolutionData(data);
                            ResultType.resultDescDataGrid.datagrid('reload');
                        },
                        error : function() {
                        }
                    });
                }
            });
        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(ResultType.rowData);
            $("#InfoForm").form("load", {
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                id: rowData.stringId,
                opType: 'edit',
                codeNo: rowData.codeNo
            });

            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("form input").attr("readonly", "readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        }

        /*callback function area end*/

    });

    return ResultType;


}(jQuery));

$(function(){
    ResultType.init();
});
/*var ResultType = {
    preId: $("#resultTypesMainPreId").val(),
    typeId: undefined,
    descSort: 0,
    init: function () {
        // 结果类型列表
        newcommonjs.pageInit(this.preId);
        this.resultTypeTableList = $("#" + this.preId + "ResultTypeList");
        var resultTypeUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesPageList";
        var params = this.searchObj();
        var resultTypeGridObj = newcommonjs.createGridObj(resultTypeUrl, 'POST', params);
        resultTypeGridObj.pagination = false;
        resultTypeGridObj.columns = [[
            {field: "ck", checkbox: true, width: 30},
            {
                title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
                var rowData = JSON.stringify(row);
                return "<a onclick='ResultType.showDialog(" + rowData + ")'>" + value + "</a>";
            }
            },
            {title: "中文名称", field: 'name', flex: 1, width: 60},
            {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
            {
                title: "状态", field: 'status', formatter: function (value, row, index) {
                var rowData = JSON.stringify(row);
                var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='ResultType.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                if (value == '1') {
                    returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='ResultType.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                }
                return returnStr;
            }
            },
            {
                title: "操作", field: 'opt', width: 60, align: 'center',
                formatter: function (value, row, index) {
                    var str = "";
                    var rowData = JSON.stringify(row);
                    str += "<a class='icon icon-edit' onclick='ResultType.editResultType(" + rowData + ")'></a>";
                    str += "<a class=\"icon icon-trash\" onclick='ResultType.deleteResultType(" + index + "," + rowData + ")'></a>";
                    return str;
                }
            }]];
        resultTypeGridObj.view =
            $.extend({}, $.fn.datagrid.defaults.view, {
                onAfterRender: function () {
                    switch (ResultType.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(ResultType.preId, "", 2, 2);
                            ResultType.currentEvent = undefined;
                            break;
                    }
                }
            });
        resultTypeGridObj.onLoadSuccess = function (data) {
            var rows = ResultType.resultTypeDataGrid.datagrid("getRows");
            //var columns = ResultType.resultTypeDataGrid.datagrid('getColumnFields');
            if (data.total == 0) {
                ResultType.resultDescDataGrid.datagrid('loadData', {total: 0, rows: []});//清空下方DateGrid
                ////添加一个新数据行，提示无数据
                //ResultType.resultTypeDataGrid.datagrid('appendRow', { noData: '<div style="text-align:center;color:red">未查询到数据！</div>' }).datagrid('mergeCells', { index: 0, field: 'noData', colspan: columns.length })
                ////隐藏分页导航条
                //ResultType.resultTypeDataGrid.closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
            } else {
                //ResultType.resultTypeDataGrid.closest('div.datagrid-wrap').find('div.datagrid-pager').show();
                ResultType.typeId = rows[0].stringId;
                ResultType.loadResultDescDataGrid(ResultType.typeId);
            }

        };
        resultTypeGridObj.onClickRow = function (index, row) {
            // 刷新结果描述表
            ResultType.reloadResultDesc(row);

            // 单行高亮
            //newcommonjs.lineHighLight(ResultType.resultTypeDataGrid, this, index);
        };
        resultTypeGridObj.onCheck = function (index, row) {
            ResultType.reloadResultDesc(row);
            //newcommonjs.lineHighLight(ResultType.resultTypeDataGrid, this, index);
        }
        this.resultTypeDataGrid = this.resultTypeTableList.datagrid(resultTypeGridObj);

        /!* 关键词搜索 *!/
        $("#" + this.preId + "SearchBtn").click(function () {
            ResultType.resultTypeDataGrid.datagrid('load', ResultType.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + ResultType.preId + "StatusSpan").html($(this).html());
            $("." + ResultType.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            });

            var statusVal = $(this).attr("el-value");
            $("#" + ResultType.preId + "Status").val(statusVal);

            ResultType.resultTypeDataGrid.datagrid('load', ResultType.searchObj());
        });

        /!* 排序 *!/
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + ResultType.preId + "SortSpan").html($(this).html());
            $("." + ResultType.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + ResultType.preId + "Sort").val(sortVal);

            ResultType.resultTypeDataGrid.datagrid('load', ResultType.searchObj());
        });

        /!* 结果类型批量删除 *!/
        $("#" + this.preId + "DeleteResultTypeBatch").click(function () {
            var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesDeleteBatch";
            newcommonjs.deleteBatch(ResultType.resultTypeDataGrid, url, "POST");
        });

        /!* 结果类型新增 *!/
        $("#" + this.preId + "Add").click(function () {
            ResultType.currentEvent = "add";
            var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', '', function () {
                $("#editName").focus();
            }, url, 480);
        });

        /!* 结果类描述批量删除 *!/
        $("#" + this.preId + "DeleteResultDescBatch").click(function () {
            var checkedItems = ResultType.resultDescDataGrid.datagrid("getChecked");
            if (checkedItems.length == 0) {
                showMessage('请选择要删除的数据!');
                return false;
            }
            var ids = [];
            $.each(checkedItems, function (index, item) {
                ids.push(item.stringId);
            });
            $.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
                if (r) {
                    $.ajax({
                        url: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDeleteBatch",
                        type: "POST",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function (data) {
                            resolutionData(data);
                            ResultType.resultDescDataGrid.datagrid('reload');
                        },
                        error: function () {
                        }
                    });
                }

            });
        });

        /!* 结果描述新增 *!/
        $("#" + this.preId + "AddResultDesc").click(function () {
            ResultType.currentEvent = "add";
            var url = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', '', function () {
                $("#editTypeId").val(ResultType.typeId);
                $("#editResultValue").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            //newcommonjs.tableAuto(ResultType.resultTypeTableList);
            var width = ResultType.resultTypeTableList.parents('.tabs-panels').width() - 40;
            ResultType.resultTypeTableList.datagrid('resize', {
                width: width
            });
            ResultType.resultDescTableList.datagrid('resize', {
                width: width
            });
        });
    },

    changeStatus: function (index, rowData) {
        var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesDisableOrEnable";
        newcommonjs.changeStatus(index, rowData, ResultType.resultTypeDataGrid, url, "POST");
    },

    reloadResultDesc: function (row) {
        this.typeId = row.stringId;
        ResultType.resultDescDataGrid.datagrid('reload', {
            typeId: row.stringId,
            sort: ResultType.descSort
        });
    },

    searchObj: function () {
        return {
            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
            status: $("#" + this.preId + "Status").val(),
            sort: $("#" + this.preId + "Sort").val()
        };
    },

    /!* 弹出详情信息框 *!/
    showDialog: function (rowData) {
        var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesInfo";
        newcommonjs.showDictCodeEditDialog('', 'view', rowData.typeKey, function () {
            $("#InfoForm").form("load", {
                /!* input's name attr : data *!/
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("form input").attr("readonly", "readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);
        }, url, 480);
    },

    /!* 结果类型判断新增还是修改 *!/
    editDictCode: function (opType) {
        var existUrl = ctx + "/basisDict/ctrResultTypes/checkNameExisted";
        var dataGrid = ResultType.resultTypeDataGrid;
        if (opType == "add") {
            var addUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesAdd";
            newcommonjs.addDictCode(existUrl, addUrl, "POST", "POST", dataGrid);
        } else if (opType == "edit") {
            var updateUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesEdit";
            newcommonjs.updateDictCode(existUrl, updateUrl, "POST", "POST", dataGrid);
        }
    },

    /!* 结果描述判断新增还是修改 *!/
    resultDescEdit: function (opType) {
        if (opType == "add") {
            this.addResultDesc();
        } else if (opType == "edit") {
            this.updateResultDesc();
        }
    },

    /!* 编辑 *!/
    editResultType: function (rowData) {
        var id = rowData.stringId;
        if (rowData.status == true) {
            showMessage('当前选中记录已启用，不允许修改！');
            return;
        }
        var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesInfo";
        newcommonjs.showDictCodeEditDialog(id, 'edit', rowData.typeKey, function () {
            $("#InfoForm").form("load", {
                /!* input's name attr : data *!/
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                id: rowData.stringId,
                opType: 'edit',
                codeNo: rowData.codeNo
            });
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;
        }, url, 480);
    },

    /!* 删除行 *!/
    deleteResultType: function (index, rowData) {
        var url = ctx + "/basisDict/ctrResultTypes/ctrResultTypesDelete";
        var dataGrid = ResultType.resultTypeDataGrid;
        newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
    },

    /!* 加载结果描述 *!/
    loadResultDescDataGrid: function (typeId) {
        // 结果描述列表
        this.resultDescTableList = $("#" + this.preId + "ResultDescList");
        var resultDescUrl = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailPageList";
        var resultDescParams = {typeId: typeId, sort: ResultType.descSort};
        var resultDescGridObj = newcommonjs.createGridObj(resultDescUrl, 'POST', resultDescParams);
        resultDescGridObj.pagination = false;
        resultDescGridObj.columns = [[
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
            }]];
        resultDescGridObj.view =
            $.extend({}, $.fn.datagrid.defaults.view, {
                onAfterRender: function () {
                    switch (ResultType.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(ResultType.preId, "", 2, 2);
                            ResultType.currentEvent = undefined;
                            break;
                    }
                }
            });
        resultDescGridObj.onLoadSuccess = function (data) {
            var columns = ResultType.resultDescDataGrid.datagrid('getColumnFields');
            if (data.total == 0) {
                //添加一个新数据行，提示无数据
                //ResultType.resultDescDataGrid.datagrid('appendRow', { ck: '<div style="text-align:center;color:red">未查询到数据！</div>' })
                //    .datagrid('mergeCells', { index: 0, field: 'ck', colspan: 5, type: 'footer' });
                //隐藏分页导航条
                //$(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
            } else {
                //$(this).closest('div.datagrid-wrap').find('div.datagrid-pager').show();
                //this.typeId = rows[0].stringId;
                //ResultType.loadResultDescDataGrid(this.typeId);
            }

        };
        resultDescGridObj.onClickRow = function (index, row) {
            newcommonjs.rowClickStyle(ResultType.resultDescDataGrid, this);
        }
        ResultType.resultDescDataGrid = ResultType.resultDescTableList.datagrid(resultDescGridObj);
    },

    editResultDesc: function (rowData) {
        var id = rowData.stringId;
        var url = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailInfo";
        newcommonjs.showDictCodeEditDialog(id, 'edit', ResultType.typeId, function () {
            $("#InfoForm").form("load", {
                resultValue: rowData.resultValue,
                displayOrder: rowData.displayOrder,
                id: rowData.stringId,
                fastCode: rowData.fastCode,
                opType: 'edit',
                typeId: ResultType.typeId
            });
            ResultType.oldResultValue = rowData.resultValue;
        }, url, 480);
    },

    addResultDesc: function () {
        //防止重复提交
        $("#editBtn").attr("disabled", true);
        formTextTrim("InfoForm");
        if(!this.validateResultDescForm()){
            return;
        }

        var name = $.trim($("#editResultValue").val());
        var typeId = ResultType.typeId;
        // 检查是否同名
        $.ajax({
            url: ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
            type: "POST",
            data : {name : name, typeId : typeId},
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                if (data.indexOf("confirm|") == 0) {
                    // 有同名
                    showConfirm(data.substring(8), function () {
                        // 确认继续
                        ResultType.addDesc();
                    })
                } else {
                    // 无同名，确认继续
                    ResultType.addDesc();
                }
            },
            error: function () {
                $("#editBtn").attr("disabled", false);
            }
        });
    },

    addDesc: function () {
        var data = $("#InfoForm").serialize();
        $.ajax({
            url: ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailAdd",
            type: "POST",
            data: data,
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                resolutionData(data);
                ResultType.resultDescDataGrid.datagrid('reload', {
                    sort: 2,
                    typeId: ResultType.typeId
                });
                $("#ctrDictInfoModal").hide();
            },
            error: function () {
                $("#editBtn").attr("disabled", false);
            }
        });
    },

    updateResultDesc: function () {
        //防止重复提交
        $("#editBtn").attr("disabled", true);
        formTextTrim("InfoForm");
        if (!this.validateResultDescForm()) {
            return;
        }

        var id = $("#editId").val();
        var resultValue = $.trim($("#editResultValue").val());
        // 检查是否同名
        if (ResultType.oldResultValue != resultValue) {
            $.ajax({
                url : ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
                type : "POST",
                data : {id : id, name : resultValue, typeId : ResultType.typeId},
                success: function (data) {
                    $("#editBtn").attr("disabled", false);
                    if (data.indexOf("confirm|") == 0) {
                        // 有同名
                        showConfirm(data.substring(8), function () {
                            // 确认继续
                            ResultType.updateDesc();
                        });
                    } else {
                        // 无同名，确认继续
                        ResultType.updateDesc();
                    }
                },
                error: function () {
                    $("#editBtn").attr("disabled", false);
                }
            });
        } else {
            ResultType.updateDesc();
        }
    },

    updateDesc: function () {
        var data = $("#InfoForm").serialize();
        $.ajax({
            url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailEdit",
            type : "POST",
            data: data,
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                resolutionData(data);
                ResultType.resultDescDataGrid.datagrid('reload');
                $("#ctrDictInfoModal").hide();
            },
            "error": function () {
                $("#editBtn").attr("disabled", false);
            }
        });
    },

    deleteResultDesc: function (index, rowData) {
        var resultTypeId = ResultType.typeId;
        $.messager.confirm("提示", "是否删除当前记录？", function (r) {
            if (r) {
                $.ajax({
                    url : ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDelete",
                    type : "POST",
                    data : {
                        id : rowData.stringId
                    },
                    success : function(data) {
                        resolutionData(data);
                        ResultType.resultDescDataGrid.datagrid('reload');
                    },
                    error : function() {
                    }
                });
            }
        });
    },

    validateResultDescForm: function () {
        var resultValue = $.trim($("#editResultValue").val());
        var displayOrderId = "editDisplayOrder";
        if(resultValue == ''){
            showMessage('结果描述为空，请重新输入！',function(){
                $("#resultValue").focus();
            });
            return false;
        }
        if(validateDisplayOrder(displayOrderId)){
            return false;
        }
        return true;
    }

};

$(function () {
    ResultType.init();
});*/

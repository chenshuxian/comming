/**
 * 客户盒子登记
 * Created by chenshuxian on 2016/03/02
 */

var CtrInstrBoxs = (function($){

    /* START render basicModule */
    CtrInstrBoxs = Object.create(BasicModule);
    CtrInstrBoxs.searchObj = function(preId) {

        return {
            searchStr: $.trim($("#" + preId + "SearchStr").val()),
            status: $("#" + preId + "Status").val(),
            sort: $("#" + preId + "Sort").val(),
            orgId: typeof CtrInstrBoxs.orgId == "undefined" ? -1 : CtrInstrBoxs.orgId
        };

    }

    var
        _preId = CB.PREID.CIB,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	//要穩藏的欄位
        _data = CtrInstrBoxs.searchObj(_preId),
        _module = "CtrInstrBoxs",
        _focusId = "editBoxBarcode",
        _popArea = 480,
        _delBatUrl = ctx + "/inst/ctrinstrboxs/doDelete",
        _updateUrl = ctx + "/inst/ctrinstrboxs/doAdd",
        _addUrl = ctx + "/inst/ctrinstrboxs/doAdd",
        _pageListUrl = ctx + "/inst/ctrinstrboxs/doSearch",
        _InfoUrl = ctx + "/inst/ctrinstrboxs/doView",
        _changeStatusUrl =  ctx + "/inst/ctrinstrboxs/doAdd",
        _orgTypeId = 50,

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

        CtrInstrBoxs.searchGrid();
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

        CtrInstrBoxs.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        CtrInstrBoxs.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        //未选择机构
        if(!CtrInstrBoxs.orgId){
               showMessage("请选择机构");
                return;
        }
        CtrInstrBoxs.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        CtrInstrBoxs.deleteBetch();
    });

    /* 选择机构 */
        $("#" + _preId + "SelectOrg").click(function () {
            var
                url = ctx + "/inst/ctrinstrboxs/doInit?type=selectorg",
                callback = function () {
                    CtrInstrBoxs.tempOrgId = CtrInstrBoxs.orgId;
                    CtrInstrBoxs.tempOrgName = CtrInstrBoxs.orgName;
                    //$("#" + CtrInstrBoxs.preId + "OrgSearchStr").focus();
                    $("#" + CtrInstrBoxs.preId + "OrgList").datagrid({
                        url: ctx + "/org/centerOrg/centerOrgPageList",
                        method: 'POST',
                        queryParams: {orgTypeId: CtrInstrBoxs.orgTypeId, status: "1", sort: "0", searchStr: $("#" + CtrInstrBoxs.preId + "OrgSearchStr").val()},
                        height: ($(window).height() < 700) ? 400 : 400,
                        fitColumns : true,
                        striped : true,
                        checkOnSelect : false,
                        onClickCell: function(index, field){

                            var rows = $("#" + CtrInstrBoxs.preId + "OrgList").datagrid("getRows");
                            if (rows.length >= 0) {
                                CtrInstrBoxs.orgId = rows[index].stringId;
                                CtrInstrBoxs.orgName = rows[index].name;
                            }

                            $("#"+CtrInstrBoxs.preId+"OrgPop input[type='radio']:eq("+index+")").attr("checked",true);
                        },
                        columns:
                            [
                                [
                                    {
                                        field : 'radio',
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
                params = {
                    url: url,
                    callback: callback,
                    popArea: 600,
                    focusId:_preId + "OrgSearchStr"
                };

            CtrInstrBoxs.CommonPop(params);
            //newcommonjs.newshowDictCodeEditDialog(null, , url, 600);
        });


    $.extend(CtrInstrBoxs,{

        preId:_preId,
        //设定pop弹出框的大小
        popArea: _popArea,
        focusId: _focusId,
        tableList:_tableList,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        updateUrl: _updateUrl,
        addUrl: _addUrl,
        delUrl: _delBatUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,
        orgId: undefined,
        orgTypeId: _orgTypeId,


        validateSave: function() {

            var
                name = $.trim($("#editBoxBarcode").val()),
                boxIp = $.trim($("#editBoxIp").val()),
                displayOrderId = "editDisplayOrder";

            if (name == '') {
                showMessage('盒子条码为空，请重新输入！');
                $("#editBoxBarcode").focus();
                return false;
            }

            if (boxIp == '') {
                showMessage('盒子IP为空，请重新输入！');
                $("#editBoxIp").focus();
                return false;
            }

            if (validateDisplayOrder(displayOrderId)) {
                return false;
            }
            return true;

        },

        deleteRowEx: function(index,rowData) {

           var ids = [],params;
            ids.push(rowData.id);
            params = {
                data: {ids: ids.join(",")}
            };
            this.deleteRow(index,rowData,params);

        },

        changeStatusEx: function(index,rowData){

          var
              data = {
                  opType: 'changeStatus',
                  id: rowData.id,
                  status: rowData.status
              },
              params = {
                data: data
              };

          this.changeStatus(index,rowData,params);

        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;

            $("#InfoForm").form("load", {
                box_barcode: rowData.box_barcode,
                box_ip: rowData.box_ip,
                id: rowData.id,
                display_order: rowData.display_order,
                memo: rowData.memo,
                org_id: CtrInstrBoxs.orgId,
                code_no: rowData.code_no,
                status: rowData.status
            });

            $("#spanEditCodeNo").html(rowData.code_no);

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                box_barcode: rowData.box_barcode,
                box_ip: rowData.box_ip,
                id: rowData.id,
                display_order: rowData.display_order,
                memo: rowData.memo,
                org_id: CtrInstrBoxs.orgId,
                code_no: rowData.code_no
            });
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.code_no);
            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");

        },

        addCallBack: function() {
            $("#editOrgId").val(CtrInstrBoxs.orgId);
        }
        /*callback function area end*/


    });


    return CtrInstrBoxs;

}(jQuery));

$(function(){
    CtrInstrBoxs.init();
});
///**
// * Created by reach-pc on 2016/1/25.
// */
//var CtrInstrBoxs = {
//    preId: null,
//    doSearchUrl: null,
//    doViewUrl: null,
//    doUpdateUrl: null,
//    doAddUrl: null,
//    doDelUrl: null,
//    doExcuteUrl: null,
//    dataGrid: null,
//    currentEvent: null,
//    orgTypeId: undefined,
//    orgId: undefined,
//    orgName: undefined,
//    tempOrgId: undefined,
//    tempOrgName: undefined,
//    init: function () {
//        newcommonjs.pageInit(this.preId);
//        this.tableList = $("#" + this.preId + "ResultList");
//        var url = CtrInstrBoxs.doSearchUrl;
//        var params = this.searchObj();
//        params.orgId = -1;
//        var gridObj = CtrInstrBoxs.createDataGrid(url, params, 'POST', this.tableList);
//        gridObj.view =
//            $.extend({}, $.fn.datagrid.defaults.view, {
//                onAfterRender: function () {
//                    // 操作成功后刷新dataGrid
//                    switch (CtrInstrBoxs.currentEvent) {
//                        case "add":
//                            newcommonjs.setSearchConditions(CtrInstrBoxs.preId, "", 2, 2);
//                            CtrInstrBoxs.currentEvent = undefined;
//                            break;
//                    }
//                }
//            });
//
//        /* render DataGrid */
//        CtrInstrBoxs.dataGrid = this.tableList.datagrid(gridObj);
//        CtrInstrBoxs.dataGrid.gridObj = gridObj;
//
//        /* 添加 */
//        $("#" + this.preId + "AddCtrInstrBoxs").click(function () {
//            if (typeof CtrInstrBoxs.orgId == "undefined") {
//                showMessage("请选择机构");
//                return;
//            }
//            var url = ctx + "/inst/ctrinstrboxs/doView?opType=add";
//            newcommonjs.newshowDictCodeEditDialog(null, function () {
//                $("#editBoxBarcode").focus();
//                $("#editOrgId").val(CtrInstrBoxs.orgId);
//            }, url, 480);
//        });
//
//        /* 选择机构 */
//        $("#" + this.preId + "SelectOrg").click(function () {
//            var url = ctx + "/inst/ctrinstrboxs/doInit?type=selectorg";
//            newcommonjs.newshowDictCodeEditDialog(null, function () {
//                CtrInstrBoxs.tempOrgId = CtrInstrBoxs.orgId;
//                CtrInstrBoxs.tempOrgName = CtrInstrBoxs.orgName;
//                $("#" + CtrInstrBoxs.preId + "OrgSearchStr").focus();
//                $("#" + CtrInstrBoxs.preId + "OrgList").datagrid({
//                    url: ctx + "/org/centerOrg/centerOrgPageList",
//                    method: 'POST',
//                    queryParams: {orgTypeId: CtrInstrBoxs.orgTypeId, status: "1", sort: "0", searchStr: $("#" + CtrInstrBoxs.preId + "OrgSearchStr").val()},
//                    height: ($(window).height() < 700) ? 400 : 400,
//                    fitColumns : true,
//                    striped : true,
//                    checkOnSelect : false,
//                    onClickCell: function(index, field){
//
//                        var rows = $("#" + CtrInstrBoxs.preId + "OrgList").datagrid("getRows");
//                        if (rows.length >= 0) {
//                            CtrInstrBoxs.orgId = rows[index].stringId;
//                            CtrInstrBoxs.orgName = rows[index].name;
//                        }
//
//                        $("#"+CtrInstrBoxs.preId+"OrgPop input[type='radio']:eq("+index+")").attr("checked",true);
//                    },
//                    columns: [
//                        [{
//                            field : 'radio',
//                            width: 10,
//                            formatter : function(value, row, index) {
//                                return "<input type='radio' datagrid-row-index='"+index+"' name='instrument'>";
//                            }
//                        },{
//                            title: "编码",
//                            field: 'codeNo',
//                            width: 50
//                        }, {
//                            title: "中文名称",
//                            field: 'name',
//                            flex: 1,
//                            width: 50
//                        }, {
//                            title: "地区",
//                            field: 'regionName',
//                            width: 50
//                        }]
//                    ],
//                    autoRowHeight: false,
//                    pagination: true
//                });
//            }, url, 600);
//        });
//
//        /* 关键词搜索 */
//        $("#" + this.preId + "SearchBtn").click(function () {
//            CtrInstrBoxs.reloadDatagrid();
//        });
//
//        /* 状态搜索 */
//        $("." + this.preId + "-status-selector").on("click", "li", function () {
//            $("#" + CtrInstrBoxs.preId + "StatusSpan").html($(this).html());
//            $("." + CtrInstrBoxs.preId + "-status-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            });
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + CtrInstrBoxs.preId + "Status").val(statusVal);
//
//            CtrInstrBoxs.reloadDatagrid();
//        });
//
//        /* 排序 */
//        $("." + this.preId + "-sort-selector").on("click", "li", function () {
//            $("#" + CtrInstrBoxs.preId + "SortSpan").html($(this).html());
//            $("." + CtrInstrBoxs.preId + "-sort-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            });
//
//            var sortVal = $(this).attr("el-value");
//            $("#" + CtrInstrBoxs.preId + "Sort").val(sortVal);
//
//            CtrInstrBoxs.reloadDatagrid();
//        });
//
//        /* 批量删除 */
//        $("#" + this.preId + "DeleteCtrInstrBoxs").click(function () {
//            var checkedItems = CtrInstrBoxs.dataGrid.datagrid("getChecked");
//            if (checkedItems.length == 0) {
//                showMessage('请选择要删除的数据!');
//                return false;
//            }
//
//            var names = [];
//            var ids = [];
//            $.each(checkedItems, function (index, item) {
//                if (item.status == true) {
//                    names.push(item.box_barcode);
//                } else {
//                    ids.push(item.id);
//                }
//            });
//            if (names.length > 0) {
//                showMessage("名称" + newcommonjs.getItemsMsg(names) + "启用状态，不允许删除!");
//                return false;
//            }
//            CtrInstrBoxs.ajaxDeleteBoxs(ids.join(","));
//        });
//
//
//        $(window).on('resize', function () {
//            newcommonjs.tableAuto(CtrInstrBoxs.tableList);
//        });
//    },
//
//    reloadDatagrid: function () {
//        CtrInstrBoxs.dataGrid.datagrid("reload", CtrInstrBoxs.searchObj());
//    },
//
//    editDictCode: function (opType) {
//        console.log(opType);
//        $("#editBtn").attr("disabled", true);
//        formTextTrim("InfoForm");
//        var url = this.doAddUrl;
//        var data = $("#InfoForm").serialize();
//        if (this.validateSave()) {
//            this.editSubmit(url, data, opType);
//        } else {
//            $("#editBtn").attr("disabled", false);
//        }
//    },
//
//    editSubmit: function (url, data, opType) {
//        $.ajax({
//            url: url,
//            type: "POST",
//            data: data,
//            success: function (data) {
//                $("#editBtn").attr("disabled", false);
//                var err = data.indexOf("err|");
//                var succ = data.indexOf("succ|");
//                if (err == 0) {
//                    showMessage(data.substring(4));
//                    return;
//                }
//                if (succ == 0) {
//                    var obj = CtrInstrBoxs.searchObj();
//                    if (opType == "add") {
//                        CtrInstrBoxs.currentEvent = "add";
//                        var pager = CtrInstrBoxs.dataGrid.datagrid('getPager');
//                        pager.pagination('refresh',{
//                            pageNumber:1
//                        });
//                        obj.sort = 2;
//                        obj.status = "";
//                    }
//                    $.messager.show({
//                        title: '提示',
//                        msg: data.substring(5),
//                        timeout: 2000,
//                        showType: 'slide'
//                    });
//                    CtrInstrBoxs.dataGrid.datagrid('reload', obj);
//                    $("#ctrDictInfoModal").hide();
//                }
//            },
//            error: function () {
//                $("#editBtn").attr("disabled", false);
//            }
//        });
//    },
//
//    searchObj: function () {
//        return {
//            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
//            status: $("#" + this.preId + "Status").val(),
//            sort: $("#" + this.preId + "Sort").val(),
//            orgId: typeof CtrInstrBoxs.orgId == "undefined" ? -1 : CtrInstrBoxs.orgId
//        };
//    },
//
//    /* 创建dataGrid */
//    createDataGrid: function (url, params, method) {
//        var gridObj = newcommonjs.createGridObj(url, method, params);
//        gridObj.columns = [[
//            {field: "ck", checkbox: true, width: 30},
//            {
//                title: "编码", field: 'code_no', width: 80, formatter: function (value, row) {
//                var rowData = JSON.stringify(row);
//                return "<a onclick='CtrInstrBoxs.showDialog(" + rowData + ")'>" + value + "</a>";
//            }
//            },
//            {title: "盒子条码", field: 'box_barcode', flex: 1, width: 100},
//            {title: "盒子IP", field: 'box_ip', flex: 1, width: 100},
//            {title: "顺序号", field: 'display_order', flex: 1, width: 60},
//            {title: "备注", field: 'memo', width: 200},
//            {
//                title: "状态", field: 'status', formatter: function (value, row, index) {
//                var rowData = JSON.stringify(row);
//                var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='CtrInstrBoxs.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
//                if (value == '1') {
//                    returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='CtrInstrBoxs.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
//                }
//                return returnStr;
//            }
//
//            },
//            {
//                title: "操作", field: 'opt', width: 60, align: 'center',
//                formatter: function (value, row, index) {
//                    var str = "";
//                    var rowData = JSON.stringify(row);
//                    str += "<a class='icon icon-edit' onclick='CtrInstrBoxs.showEditDialog(" + rowData + ")'></a>";
//                    str += "<a class=\"icon icon-trash\" onclick='CtrInstrBoxs.deleteRow(" + index + "," + rowData + ")'></a>";
//                    return str;
//                }
//            }]];
//
//        gridObj.onLoadSuccess = function () {
//            newcommonjs.tableAuto(CtrInstrBoxs.tableList);
//        };
//        return gridObj;
//    },
//
//
//    /* 弹出详情信息框 */
//    showDialog: function (rowData) {
//        var url = this.doViewUrl + "?opType=view";
//        newcommonjs.newshowDictCodeEditDialog(null, function () {
//            $("#InfoForm").form("load", {
//                box_barcode: rowData.box_barcode,
//                box_ip: rowData.box_ip,
//                id: rowData.id,
//                display_order: rowData.display_order,
//                memo: rowData.memo,
//                org_id: CtrInstrBoxs.orgId,
//                code_no: rowData.code_no
//            });
//            $("#editBtn").hide();
//            $("#spanEditCodeNo").html(rowData.code_no);
//            $("form input").attr("readonly","readonly");
//            $("form textarea").attr("readonly","readonly");
//        }, url, 480);
//    },
//
//    /* 编辑 */
//    showEditDialog: function (rowData) {
//        if (rowData.status == true) {
//            showMessage('当前选中记录已启用，不允许修改！');
//            return;
//        }
//        var url = this.doViewUrl + "?opType=edit";
//        newcommonjs.newshowDictCodeEditDialog(null, function () {
//            $("#InfoForm").form("load", {
//                box_barcode: rowData.box_barcode,
//                box_ip: rowData.box_ip,
//                id: rowData.id,
//                display_order: rowData.display_order,
//                memo: rowData.memo,
//                org_id: CtrInstrBoxs.orgId,
//                code_no: rowData.code_no,
//                status: rowData.status
//            });
//            $("#editBoxBarcode").focus();
//            $("#spanEditCodeNo").html(rowData.code_no);
//        }, url, 480);
//
//    },
//
//    /* 删除行 */
//    deleteRow: function (index, rowData) {
//        var id = rowData.id;
//        var status = rowData.status;
//        if (status == true) {
//            showMessage('当前选中记录已启用，不允许删除！');
//            return;
//        }
//        var ids = [];
//        ids.push(id);
//        this.ajaxDeleteBoxs(ids.join(","));
//    },
//
//    ajaxDeleteBoxs: function (ids) {
//        $.messager.confirm("提示", "你确定要删除吗?", function (r) {
//            if (r) {
//                //alert(id);
//                $.ajax({
//                    url: CtrInstrBoxs.doDelUrl,
//                    type: 'POST',
//                    data: {
//                        ids: ids
//                    },
//                    success: function (data) {
//                        resolutionData(data);
//                        CtrInstrBoxs.dataGrid.datagrid('reload');
//
//                    },
//                    error: function () {
//
//                    }
//                });
//            }
//        });
//    },
//
//    /* 启用、停用状态 */
//    changeStatus: function (index, rowData) {
//        var id = rowData.id;
//        var status = rowData.status;
//        if (status == '1') {
//            confirmMeg = "是否停用当前记录？";
//        }
//        if (status == '0') {
//            confirmMeg = "是否启用当前记录？";
//        }
//        $.messager.confirm("提示", confirmMeg, function (r) {
//            if (r) {
//                $.ajax({
//                    url: CtrInstrBoxs.doAddUrl,
//                    type: 'POST',
//                    data: {
//                        opType: 'changeStatus',
//                        id: id,
//                        status: status
//                    },
//                    success: function (data) {
//                        resolutionData(data);
//                        CtrInstrBoxs.dataGrid.datagrid('reload');
//                    },
//                    error: function () {
//                        dataGrid.datagrid('refreshRow', index);
//                    }
//                });
//            } else {
//                dataGrid.datagrid('refreshRow', index);
//            }
//        });
//    },
//
//    /* 验证保存的必填条件 */
//    validateSave: function () {
//        var name = $.trim($("#editBoxBarcode").val());
//        var boxIp = $.trim($("#editBoxIp").val());
//        var displayOrderId = "editDisplayOrder";
//        if (name == '') {
//            showMessage('盒子条码为空，请重新输入！');
//            $("#editBoxBarcode").focus();
//            return false;
//        }
//        if (boxIp == '') {
//            showMessage('盒子IP为空，请重新输入！');
//            $("#editBoxIp").focus();
//            return false;
//        }
//        if (validateDisplayOrder(displayOrderId)) {
//            return false;
//        }
//        return true;
//
//    }
//
//}
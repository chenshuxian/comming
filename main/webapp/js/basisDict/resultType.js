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
        _focusId = "editName",
        _hideCols = [],	//要穩藏的欄位
        _data = ResultType.searchObj(_preId),
        _pageListUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesPageList",
        _pageListUrl2 = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailPageList",
        _module = "ResultType",
        _module2 = "ResultType2",
        _delBatUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesDeleteBatch",
        _existUrl = ctx + "/basisDict/ctrResultTypes/checkNameExisted",
        _updateUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesEdit",
        _addUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesAdd",
        _delUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesDelete",
        _changeStatusUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesDisableOrEnable",
        _InfoUrl = ctx + "/basisDict/ctrResultTypes/ctrResultTypesInfo",

        //url2
        _delBatUrl2 = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDeleteBatch",
        _existUrl2 = ctx + "/basisDict/ctrResultTypeDetail/checkNameExisted",
        _updateUrl2 = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailEdit",
        _addUrl2 = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailAdd",
        _delUrl2 = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailDelete",
        _InfoUrl2 = ctx + "/basisDict/ctrResultTypeDetail/ctrResultTypeDetailInfo",
        //_height = ($(window).height() < 810) ? 240 : 300,
        _height = CB.HEIGHT + 5,


    /* START dataGrid 生成*/

        //first dataGrid
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId,
            height:_height
        },
        //resultType dataGrid obj render
        _gridObj = dataGridM.init(_dgParams),

        _upgradeObj = {
            //pagination: false,

            onLoadSuccess: function(data) {

                var rows = ResultType.dataGrid.datagrid("getRows");

                if (data.total == 0) {
                    ResultType.dataGrid2.datagrid('loadData', {total: 0, rows: []});//清空下方DateGrid
                    BM.parentStatus = -1;
                } else {
                    ResultType.typeId = rows[0].stringId;
                    BM.parentStatus = rows[0].status;
                    dataGridM.firstRow.call(this);
                    _loadResultDescDataGrid(ResultType.typeId);
                }

            },
            onClickRow: function(index, row) {
                // 刷新结果描述表
                dataGridM.clickRow.call(this,index,row);
                BM.parentStatus = row.status;
                //BM.parentStatus
                ResultType.reloadResultDesc(row);

            },
            onCheck: function(index, row) {
                ResultType.reloadResultDesc(row);
            }

        },

        _gridObj = $.extend(true,{},_gridObj,_upgradeObj),
        // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj),


    /* 加载结果描述 */
        _loadResultDescDataGrid = function (typeId) {
        // 结果描述列表
        var
            _data2 = {typeId: typeId, sort: ResultType.descSort},

            //second dataGrid
            _dgParams2 = {
                url:_pageListUrl2,
                data:_data2,
                module:_module2,
                hideCols:_hideCols,
                tableList:_tableList2,
                preId:_preId,
                height:_height
            },

            //resultType dataGrid obj render
            _gridObj2 = dataGridM.init(_dgParams2),

            _upgradeObj2 = {

                //pagination: false,

                onLoadSuccess: function(data) {

                    var columns = ResultType.dataGrid2.datagrid('getColumnFields');

                },
                onClickRow: function(index, row) {
                        // 刷新结果描述表
                    dataGridM.clickRow.call(this,index,row);
                    //newcommonjs.rowClickStyle(ResultType.dataGrid, this);

                }

            },
            // render dataGrid
            _gridObj2 = ResultType.getNewParams(_gridObj2,_upgradeObj2);//extend({},_gridObj2,_upgradeObj2);

        ResultType.dataGrid2 = _tableList2.datagrid(_gridObj2);

    };

    // delete desc batch
    $("#" + _preId + "DeleteResultDescBatch").click(function () {

        if (BM.parentStatus == 1) {
            BM.showMessage("当前选中结果类型已启用，不允许删除结果描述！");
            return;
        }else if (BM.parentStatus == "-1") {
            BM.showMessage("当前无任何数据，不允许删除结果描述！");
            return;
        }

        var params = {
            dataGrid : ResultType.dataGrid2,
            url: ResultType.delBatUrl2
        };

        ResultType.deleteBatch(params);

    });

    /* 结果描述新增 */
    $("#" + _preId + "AddResultDesc").click(function () {

        if (BM.parentStatus == 1) {
            BM.showMessage("当前选中结果类型已启用，不允许添加结果描述！");
            return;
        }else if (BM.parentStatus == "-1") {
            BM.showMessage("当前无任何数据，不允许添加结果描述！");
            return;
        }
        var
            params = {

                callback : function(){
                    $("#editTypeId").val(ResultType.typeId);
                    $("#editResultValue").focus();
                },
                url: ResultType.InfoUrl2,
                //beforeCallBack before submit
                BCB: true,
                data: {
                    id:"",
                    opType: "add",
                    typeId:ResultType.typeId
                }

            };
            //BCB = ResultType.resultDescEdit;
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
        module: _module,
        typeId: null,
        //设定pop弹出框的大小
        popArea: 480,
        descSort: 0,
        focusId: _focusId,
        tableList:_tableList,
        tableList2:_tableList2,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        existUrl: _existUrl,
        updateUrl: _updateUrl,
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,

        //dataGrid2 of Url
        delBatUrl2: _delBatUrl2,
        existUrl2: _existUrl2,
        updateUrl2: _updateUrl2,
        addUrl2: _addUrl2,
        delUrl2: _delUrl2,
        InfoUrl2: _InfoUrl2,
        pageListUrl2: _pageListUrl2,
        /*END url 定義*/
        dataGrid:_dataGrid,
        searchHold: CB.SEARCHHOLDER.RESULTTYPE,
        //dataGrid2:_dataGrid2,

        validateSave: function() {

            var displayOrderId = "editDisplayOrder";

            if(validateDisplayOrder(displayOrderId)){
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
        beforeSubmit: function () {

            var
                name = $("#editResultValue").val(),
                data= $("#InfoForm").serializeArray(),
                params;

            data.push({name:'name',value:name});
            params = {
                addUrl: _addUrl2,
                updateUrl: _updateUrl2,
                existUrl: _existUrl2,
                dataGrid: this.dataGrid2,
                data: data
            };
            this.exParams = {typeId: this.typeId};
            //console.log("typeResult:" + name);
            this.editDictCode(params);

        },

        changeStatusEx: function(index,rowData) {

            var
                params = {
                    logParent: true
                };

            this.changeStatus(index,rowData,params);
        },

        editResultDesc: function(rowData) {

            if (BM.parentStatus == 1) {
                BM.showMessage("当前选中结果类型已启用，不允许编辑结果描述！");
                return;
            }

            var url = _InfoUrl2,
                callback = function(){

                    $("#InfoForm").form("load", {
                        resultValue: rowData.resultValue,
                        displayOrder: rowData.displayOrder,
                        id: rowData.stringId,
                        fastCode: rowData.fastCode,
                        opType: 'edit',
                        typeId: ResultType.typeId
                    });
                    ResultType.oldResultValue = rowData.resultValue;

                },
                params = {
                    url: url,
                    callback: callback,
                    BCB: true
                };

            this.editRow(rowData,params);

        },

        deleteResultDesc: function (index, rowData) {

            if (BM.parentStatus == 1) {
                BM.showMessage("当前选中结果类型已启用，不允许删除结果描述！ ");
                return;
            }
            var
                params = {
                    url: this.delUrl2,
                    dataGrid: this.dataGrid2
                };

            this.deleteRow(index,rowData,params);
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
                name: rowData.name,
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

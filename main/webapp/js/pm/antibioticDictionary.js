/***
 *@ClassName: antibioticDictionary.js
 * @Description: TODO(抗生素字典-JS)
 * @author chenshuxian
 * @date 2016年03月01日
 ***/
var AntibioticDictionary = (function($){

    /* START render basicModule */
    AntibioticDictionary = Object.create(MG);
    /* END render basicModule */

    var
        _preId = CB.PREID.AD,
        _tableList =  $("#" + _preId + "List"),
        _itemTypeId = $("#" + _preId + "ItemTypeId").val(),
        _exParams = {itemTypeId: _itemTypeId},
        _hideCols = [],	//要穩藏的欄位
        _data = AntibioticDictionary.searchObj(_preId),
        _pageListUrl = AntibioticDictionary.pageListUrl,
        _module = "AntibioticDictionary",

        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(AntibioticDictionary,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: AntibioticDictionary.getAddParams(_exParams),
        exParams:_exParams,
        itemTypeId:_itemTypeId
    })

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

        AntibioticDictionary.searchGrid();
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

        AntibioticDictionary.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        AntibioticDictionary.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        AntibioticDictionary.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        AntibioticDictionary.deleteBetch();
    });

    return AntibioticDictionary;


}(jQuery));

$(function(){
    AntibioticDictionary.init();
});
/*
var AntibioticDictionary = {

    preId: $("#antibioticDictionaryPreId").val(),
    /!*url 定義*!/
    delBatUrl: ctx + "/pm/CentreMicrobeItem/batchDeleteCentreMicrobeitems",
    checkUrl:  ctx + "/pm/CentreMicrobeItem/checkIfCentreMicrobeitemNameExist",
    check2Url: ctx + "/pm/CentreMicrobeItem/checkIfCentreMicrobeitemNameExist",
    updateUrl: ctx + "/pm/CentreMicrobeItem/modifyCentreMicrobeitem",
    addUrl: ctx + "/pm/CentreMicrobeItem/addCentreMicrobeitem",
    delUrl: ctx + "/pm/CentreMicrobeItem/deleteCentreMicrobeitem",
    changeStatusUrl: ctx + "/pm/CentreMicrobeItem/disableOrEnableCentreMicrobeitem",
    tubeInfoUrl: ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemDetailById",
    pageListUrl: ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemsPageList",
    itemTypeId: $("#"+$("#antibioticDictionaryPreId").val()+"ItemTypeId").val(),

    reloadData: {
        searchStr: '',
        status: '',
        sort: '',
        itemTypeId: '2'
    },

    init: function () {
        newcommonjs.pageInit(this.preId);
        AntibioticDictionary.tableList = $("#" + AntibioticDictionary.preId + "TypeList");
        var url = AntibioticDictionary.pageListUrl;
        var POST = "POST";
        var GET = "GET";
        var typeKey = AntibioticDictionary.itemTypeId;
        var params = {itemTypeId: AntibioticDictionary.itemTypeId};  //如有需要在編寫如上方格式。
        var coloumns = new Array()
        //coloumns[0]="whonetCode";	//要穩藏的欄位

        var gridObj = AntibioticDictionary.createDataGrid(url, typeKey, params, POST, AntibioticDictionary.tableList, coloumns);
        gridObj.view =
            $.extend({}, $.fn.datagrid.defaults.view, {
                onAfterRender: function () {
                    // 操作成功后刷新dataGrid
                    switch (AntibioticDictionary.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(AntibioticDictionary.preId, "", 2, 2);
                            AntibioticDictionary.currentEvent = undefined;
                            break;
                    }
                }
            });


        //!* render DataGrid *!/
        this.dataGrid = AntibioticDictionary.tableList.datagrid(gridObj);

        /!* 关键词搜索 *!/
        $("#" + this.preId + "SearchBtn").click(function () {
            newcommonjs.dataGridSearch(AntibioticDictionary.dataGrid, AntibioticDictionary.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + AntibioticDictionary.preId + "StatusSpan").html($(this).html());
            $("." + AntibioticDictionary.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + AntibioticDictionary.preId + "Status").val(statusVal);

            newcommonjs.dataGridSearch(AntibioticDictionary.dataGrid, AntibioticDictionary.searchObj());
        });

        /!* 排序 *!/
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + AntibioticDictionary.preId + "SortSpan").html($(this).html());
            $("." + AntibioticDictionary.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + AntibioticDictionary.preId + "Sort").val(sortVal);

            newcommonjs.dataGridSearch(AntibioticDictionary.dataGrid, AntibioticDictionary.searchObj());
        });

        /!* 批量删除 *!/
        $("#" + this.preId + "DeleteTypeBatch").click(function () {
            newcommonjs.deleteBatch(AntibioticDictionary.dataGrid, AntibioticDictionary.delBatUrl, POST);
        });

        /!* 新增 *!/
        $("#" + this.preId + "AddType").click(function () {
            AntibioticDictionary.currentEvent = "add";
            var data = {id: '', opType: 'add', itemTypeId: AntibioticDictionary.itemTypeId};
            var url = AntibioticDictionary.tubeInfoUrl;
            newcommonjs.newshowDictCodeEditDialog(data, function () {
                $("#editName").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(AntibioticDictionary.tableList);
        });
    },

    /!* *
     * 取得所有搜尋欄資訊
     * 返回obj 格式
     * *!/
    searchObj: function () {
        return {
            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
            status: $("#" + this.preId + "Status").val(),
            sort: $("#" + this.preId + "Sort").val(),
            itemTypeId: AntibioticDictionary.itemTypeId
        };
    },

    /!* 创建dataGrid
     * url:为pageList
     * typekey:可有可无
     * params:可有可无
     * method: POST OR GET
     * tableList: main.jsp 中的 呈现dataGrid 的　div
     * hideColumns:是一个阵列，用来存要稳藏的栏位。
     * *!/
    createDataGrid: function (url, typeKey, params, method, tableList, hideColumns) {
        var gridObj = newcommonjs.createGridObj(url, method, params);
        gridObj.columns = ColCollect.getColumns("AntibioticDictionary");
        gridObj.onLoadSuccess = function () {
            newcommonjs.tableAuto(tableList);
            if (hideColumns) {
                $.each(hideColumns, function (k, v) {
                    AntibioticDictionary.dataGrid.datagrid('hideColumn', v);
                })
            }
        };
        gridObj.onClickRow = function (index, row) {
            newcommonjs.rowClickStyle(AntibioticDictionary.dataGrid, this);
        }
        return gridObj;
    },

    /!* 启用、停用状态 *!/
    changeStatus: function (index, rowData) {
        var url = this.changeStatusUrl;
        var dataGrid = this.dataGrid;
        newcommonjs.changeStatus(index, rowData, dataGrid, url, "POST");
    },

    /!* 删除行 *!/
    deleteRow: function (index, rowData) {
        var url = this.delUrl;
        var dataGrid = this.dataGrid;
        newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
    },

    /!* 编辑 *!/
    editRow: function (rowData) {
        var id = rowData.stringId;
        if (rowData.status == true) {
            showMessage('当前选中记录已启用，不允许修改！');
            return;
        }
        var url = this.tubeInfoUrl;
        var data = {id: rowData.stringId, opType: 'edit', itemTypeId: this.itemTypeId, id: rowData.stringId};

        var callback = function () {

            $("#InfoForm").form("load", {
                /!* input's name attr : data *!/
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                id: rowData.stringId,
                typeKey: rowData.typeKey,
                opType: 'edit',
                codeNo: rowData.codeNo
            });
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;
        };

        newcommonjs.newshowDictCodeEditDialog(data, callback, url, 720);

    },

    /!* 弹出详情信息框 *!/
    showDialog: function (rowData) {
        var url = this.tubeInfoUrl;
        var data = {id: rowData.stringId, opType: 'view', itemTypeId: this.itemTypeId, id: rowData.stringId};
        var callback = function () {

            $("#InfoForm").form("load", {
                /!* input's name attr : data *!/
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("form input").attr("readonly", "readonly");
            $("form textarea").attr("readonly", "readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);
        };

        newcommonjs.newshowDictCodeEditDialog(data, callback, url, 480);
    },

    /!* 判断新增还是修改 *!/
    editDictCode: function (opType, typeKey) {
        var existUrl = AntibioticDictionary.checkUrl;
        var dataGrid = AntibioticDictionary.dataGrid;
        var data = $("#infoForm").serialize();
        var existData = {
            id: $("#editId").val(),
            itemTypeId: this.itemTypeId,
            name: $("#editName").val()
        };

        var successF = function (data) {
            //alert(AntibioticDictionaryInst.orgTypeId);
            var opType = $("#editOpType").val();
            //alert(opType);
            if (data.indexOf("confirm|") == 0) {
                // 有同名
                showConfirm(data.substring(8), function () {

                    // 确认继续
                    if (opType == 'add') {
                        if (AntibioticDictionary.itemTypeId == '2') {
                            AntibioticDictionary.checkNacaoId('add');

                        } else {
                            newcommonjs.newadd(AntibioticDictionary.addUrl, 'POST', AntibioticDictionary.dataGrid, AntibioticDictionary.reloadData);
                        }
                    } else {
                        if (AntibioticDictionary.itemTypeId == '2') {
                            AntibioticDictionary.checkNacaoId();

                        } else {
                            newcommonjs.update(AntibioticDictionary.updateUrl, 'POST', AntibioticDictionary.dataGrid);
                        }
                    }

                });
            } else {
                // 无同名，确认继续
                if (opType == 'add') {
                    AntibioticDictionary.reloadData.sort = 2;
                    newcommonjs.newadd(AntibioticDictionary.addUrl, 'POST', AntibioticDictionary.dataGrid, AntibioticDictionary.reloadData);
                } else {
                    if (AntibioticDictionary.itemTypeId == '2') {
                        // 检测卫生机构代码
                        AntibioticDictionary.checkNacaoId();

                    } else {
                        newcommonjs.update(AntibioticDictionary.updateUrl, 'POST', AntibioticDictionary.dataGrid);
                    }
                }
//				if (AntibioticDictionaryInst.orgTypeId == '40') {
//					 if(opType == 'add')
//						 AntibioticDictionaryInst.checkNacaoId('add');
//					 else
//						 AntibioticDictionaryInst.checkNacaoId();
//				} else {
//					newcommonjs.newadd(addUrl,'POST',AntibioticDictionaryInst.dataGrid,AntibioticDictionaryInst.reloadData);
//				}
            }
        };
        var v = this.validateSave();
        if (opType == "add") {
            newcommonjs.newaddDictCode(existUrl, AntibioticDictionary.addUrl, "POST", AntibioticDictionary.dataGrid, existData, successF, v);
        } else if (opType == "edit") {
            newcommonjs.newupdateDictCode(existUrl, AntibioticDictionary.updateUrl, "POST", AntibioticDictionary.dataGrid, existData, successF, v);
        }
    },

    checkNacaoId: function (type) {
        var itemTypeId = this.itemTypeId
        $.ajax({
            url: this.check2Url,
            type: "POST",
            data: {
                itemTypeId: itemTypeId
            },
            success: function (data) {
                // resolutionData(data);

                if (data.indexOf("confirm|") == 0) {
                    showConfirm(data.substring(8), function () {
                        if (type == 'add') {
                            newcommonjs.newadd(AntibioticDictionary.addUrl, 'POST', AntibioticDictionary.dataGrid, AntibioticDictionary.reloadData);
                        } else {
                            newcommonjs.update(AntibioticDictionary.updateUrl, 'POST', AntibioticDictionary.dataGrid);
                        }
                    });
                } else {
                    // 无，确认继续
                    if (type == 'add') {
                        newcommonjs.newadd(AntibioticDictionary.addUrl, 'POST', AntibioticDictionary.dataGrid, AntibioticDictionary.reloadData);
                    } else {
                        newcommonjs.update(AntibioticDictionary.updateUrl, 'POST', AntibioticDictionary.dataGrid);
                    }
                }
            },
            error: function () {
            }
        });
    },

    validateSave: function () {
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
    }


};

$(function () {
    AntibioticDictionary.init();
});*/

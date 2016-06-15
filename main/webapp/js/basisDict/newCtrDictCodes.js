/**
 * @ClassName: newCtrDictCodes.js
 * @Description: TODO(基础字典-JS)
 * @author subanmiao
 * @date 2016-01-07
 */
var CtrDictCodes = (function($){

    /* START render basicModule */
    CtrDictCodes =  Object.create(BasicModule);
    /* END render basicModule */

    $.extend(CtrDictCodes,{

        //设定pop弹出框的大小
        preId: null,
        popArea: 480,
        focusId: "editName",
        tableList:null,
        dataGrid:null,
        delBatUrl: ctx + "/basisDict/ctrDictCodes/ctrDictCodesDeleteBatch",
        existUrl: ctx + "/basisDict/ctrDictCodes/checkNameExisted",
        updateUrl: ctx + "/basisDict/ctrDictCodes/ctrDictCodesEdit",
        addUrl: ctx + "/basisDict/ctrDictCodes/ctrDictCodesAdd",
        delUrl: ctx + "/basisDict/ctrDictCodes/ctrDictCodesDelete",
        changeStatusUrl: ctx + "/basisDict/ctrDictCodes/ctrDictCodesDisableOrEnable",
        InfoUrl: ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo",
        pageListUrl: ctx + "/basisDict/ctrDictCodes/ctrDictCodesPageList",


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

        validateBox: function() {
            //中文名长度
            $("input[name='name']").validatebox({
                required:true,
                validType:  ['symbol','length[0,30]','space'],
                missingMessage: "中文名称为空，请重新输入！"
            });
            $("input[name='name']").attr('maxlength','30');
            //英文名长度
            $("input[name='enShortName']").validatebox({
                validType:  ['symbol','length[0,20]']
            });
            $("input[name='enShortName']").attr('maxlength','20');
            //英文名长度
            $("input[name='enName']").validatebox({
                validType:  ['symbol','length[0,55]']
            });
            $("input[name='enName']").attr('maxlength','55');
            //whonetCode长度
            $("input[name='whonetCode']").validatebox({
                validType:  ['symbol','length[0,15]']
            });
            $("input[name='whonetCode']").attr('maxlength','15');
            //fastCode长度
            $("input[name='fastCode']").validatebox({
                validType:  ['symbol','length[0,9]']
            });
            $("input[name='fastCode']").attr('maxlength','9');
            //displayOrder长度
            $("input[name='displayOrder']").validatebox({
                validType:  ['symbol','length[0,11]']
            });
            $("input[name='displayOrder']").attr('maxlength','11');
            //备注
            $("textarea").validatebox({
                validType:  ['symbol','length[0,150]']
            });
            $("textarea").attr('maxlength','150');


        },

        /*callback function area*/

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(CtrDictCodes.rowData);
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
                opType: 'edit',
                codeNo: rowData.codeNo
            });

            $("#spanEditCodeNo").html(rowData.codeNo);
            $("#editName").focus();
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

        },

        /*callback function area end*/

        searchObj: function(preId) {

            return {
                searchStr: $.trim($("#" + preId + "SearchStr").val()),
                status: $("#" + preId + "Status").val(),
                sort: $("#" + preId + "Sort").val(),
                typeKey: $("#" + preId + "TypeKey").val()
            };

        }

    });

    return CtrDictCodes;

}(jQuery));

/*var CtrDictCodes = {

    /!* 搜索 *!/
    dataGridSearch: function (dataGrid, obj) {
        dataGrid.datagrid('load', {
            searchStr: obj.searchStr,
            status: obj.status,
            sort: obj.sort,
            typeKey: obj.typeKey
        });
    },

    /!* 创建dataGrid *!/
    createDataGrid: function (url, typeKey, params, method, tableList, hideColumns) {
        var gridObj = newcommonjs.createGridObj(url, method, params);
        gridObj.columns = [[
            {field: "ck", checkbox: true, width: 30},
            {
                title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
                var rowData = JSON.stringify(row);
                return "<a onclick='CtrDictCodes.showDialog(" + rowData + ")'>" + value + "</a>";
            }
            },
            {title: "中文名称", field: 'name', flex: 1, width: 60},
            {title: "英文简称", field: 'enShortName', flex: 1, width: 60},
            {title: "英文名称", field: 'enName', flex: 1, width: 60},
            {title: "WHONET编码", field: 'whonetCode', flex: 1, width: 60},
            {title: "助记符", field: 'fastCode', flex: 1, width: 60},
            {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
            {title: "备注", field: 'memo', width: 200, formatter: function (value) {
                if (value.length > newcommonjs.colMaxLength) {
                    return value.substring(0, newcommonjs.colMaxLength) + "……";
                } else {
                    return value;
                }
            }},
            {
                title: "状态", field: 'status', formatter: function (value, row, index) {
                var rowData = JSON.stringify(row);
                var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='CtrDictCodes.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                if (value == '1') {
                    returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='CtrDictCodes.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                }
                return returnStr;
            }

            },
            {
                title: "操作", field: 'opt', width: 60, align: 'center',
                formatter: function (value, row, index) {
                    var str = "";
                    var rowData = JSON.stringify(row);
                    str += "<a class='icon icon-edit' onclick='CtrDictCodes.editRow(" + rowData + ")'></a>";
                    str += "<a class=\"icon icon-trash\" onclick='CtrDictCodes.deleteRow(" + index + "," + rowData + ")'></a>";
                    return str;
                }
            }]];

        gridObj.onLoadSuccess = function () {
            newcommonjs.tableAuto(tableList);
            if (hideColumns) {
                $.each(hideColumns, function (k, v) {
                    CtrDictCodes.getCurrentDataGrid(typeKey).datagrid('hideColumn', v);
                })
            }
        };

        gridObj.onClickRow = function (index, row) {
            newcommonjs.rowClickStyle(CtrDictCodes.getCurrentDataGrid(typeKey), this);
        }
        return gridObj;
    },


    /!* 弹出详情信息框 *!/
    showDialog: function (rowData) {
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
        newcommonjs.showDictCodeEditDialog('', 'view', rowData.typeKey, function () {
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
            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);
        }, url, 480);
    },

    /!* 编辑 *!/
    editRow: function (rowData) {
        var id = rowData.stringId;
        if (rowData.status == true) {
            showMessage('当前选中记录已启用，不允许修改！');
            return;
        }
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
        newcommonjs.showDictCodeEditDialog(id, 'edit', rowData.typeKey, function () {
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
            $("#editName").focus();
            newcommonjs.oldName = rowData.name;
        }, url, 480);
    },

    /!* 删除行 *!/
    deleteRow: function (index, rowData) {
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesDelete";
        var dataGrid = CtrDictCodes.getCurrentDataGrid(rowData.typeKey);
        newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
    },

    /!* 批量删除 *!/
    deleteBatch: function (dataGrid) {
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesDeleteBatch";
        newcommonjs.deleteBatch(dataGrid, url, "POST");
    },

    /!* 启用、停用状态 *!/
    changeStatus: function (index, rowData) {
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesDisableOrEnable";
        var dataGrid = CtrDictCodes.getCurrentDataGrid(rowData.typeKey);
        newcommonjs.changeStatus(index, rowData, dataGrid, url, "POST");
    },

    /!* 判断新增还是修改 *!/
    editDictCode: function (opType, typeKey) {
        var existUrl = ctx + "/basisDict/ctrDictCodes/checkNameExisted";
        var dataGrid = CtrDictCodes.getCurrentDataGrid(typeKey);
        if (opType == "add") {
            var addUrl = ctx + "/basisDict/ctrDictCodes/ctrDictCodesAdd";
            newcommonjs.addDictCode(existUrl, addUrl, "POST", "POST", dataGrid);
        } else if (opType == "edit") {
            var updateUrl = ctx + "/basisDict/ctrDictCodes/ctrDictCodesEdit";
            newcommonjs.updateDictCode(existUrl, updateUrl, "POST", "POST", dataGrid);
        }
    },

    /!* 获取当前的DataGrid *!/
    getCurrentDataGrid: function (typeKey) {
        if (typeKey == undefined) return;
        switch (typeKey.toString()) {
            case "1": // 标本类型
                return SpecimenType.dataGrid;
                break;
            case "2": // 检验方法
                return TestMethod.dataGrid;
                break;
            case "3": // 医学专业组
                return Discipline.dataGrid;
                break;
            case "4": // 病理大类
                return PathologyCategory.dataGrid;
                break;
            case "5": // 受检成份
                return SubjectIngredient.dataGrid;
                break;
            case "6": // 受检属性
                return SubjectProperty.dataGrid;
                break;
            case "7": // 样本标识
                return SpecimenLogo.dataGrid;
                break;
            case "8": // 时间特征
                return TimeCharacteristic.dataGrid;
                break;
            case "9": // 就诊类型
                return SpecimenStatus.dataGrid;
                break;
            case "10": // 就诊类型
                return TreatmentType.dataGrid;
                break;
            case "11": // 结果单位
                return ResultUnit.dataGrid;
                break;
        }
    }

}*/

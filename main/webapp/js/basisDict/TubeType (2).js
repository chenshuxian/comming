/**
 * @ClassName: newCtrDictCodes.js
 * @Description: TODO(基础字典-JS)
 * @author subanmiao
 * @date 2016-01-07
 */
var TubeType = {
	
    /* 搜索 */
    dataGridSearch: function (dataGrid, obj) {
        dataGrid.datagrid('load', {
            searchStr: obj.searchStr,
            status: obj.status,
            sort: obj.sort,
            typeKey: obj.typeKey
        });
    },

    /* 创建dataGrid */
    createDataGrid: function (url, typeKey, params, method, tableList, hideColumns) {
        var gridObj = newcommonjs.createGridObj(url, method, params);
        gridObj.columns = [[
            {field: "ck", checkbox: true, width: 30},
            {
                title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
                var rowData = JSON.stringify(row);
                return "<a onclick='TubeType.showDialog(" + rowData + ")'>" + value + "</a>";
            }
            },
            {title: "中文名称", field: 'name', flex: 1, width: 60},
            {title: "英文简称", field: 'enShortName', flex: 1, width: 60},
            {title: "英文名称", field: 'enName', flex: 1, width: 60},
            {title: "WHONET编码", field: 'whonetCode', flex: 1, width: 60},
            {title: "助记符", field: 'fastCode', flex: 1, width: 60},
            {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
            {title: "备注", field: 'memo', width: 200},
            {
                title: "状态", field: 'status', formatter: function (value, row, index) {
                var rowData = JSON.stringify(row);
                var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='TubeType.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                if (value == '1') {
                    returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='TubeType.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                }
                return returnStr;
            }

            },
            {
                title: "操作", field: 'opt', width: 60, align: 'center',
                formatter: function (value, row, index) {
                    var str = "";
                    var rowData = JSON.stringify(row);
                    str += "<a class='icon icon-edit' onclick='TubeType.editRow(" + rowData + ")'></a>";
                    str += "<a class=\"icon icon-trash\" onclick='TubeType.deleteRow(" + index + "," + rowData + ")'></a>";
                    return str;
                }
            }]];
        
        gridObj.onLoadSuccess = function () {
            newcommonjs.tableAuto(tableList);
            if (hideColumns) {
                $.each(hideColumns, function (k, v) {
                    TubeTypes.dataGrid.datagrid('hideColumn', v);
                })
            }
        };
        return gridObj;
    },


    /* 弹出详情信息框 */
    showDialog: function (rowData) {
        TubeType.showDictCodeEditDialog('', 'view', rowData.typeKey, function () {
            $("#ctrDictCodeInfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("#spanInfoCodeNo").html(rowData.codeNo);
        });
    },

    /* 编辑 */
    editRow: function (rowData) {
        var id = rowData.stringId;
        if (rowData.status == true) {
            showMessage('当前选中记录已启用，不允许修改！');
            return;
        }
        TubeType.showDictCodeEditDialog(id, 'edit', rowData.typeKey, function () {
            $("#ctrDictCodeInfoEditForm").form("load", {
                /* input's name attr : data */
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
            $("#spanEditCodeNo").html(rowData.codeNo);
            TubeType.oldName = rowData.name;
        });

    },

    /* 删除行 */
    deleteRow: function (index, rowData) {
        var id = rowData.stringId;
        var status = rowData.status;
        if (status == true) {
            showMessage('当前选中记录已启用，不允许删除！');
            return;
        }
        $.messager.confirm("提示", "你确定要删除吗?", function (r) {
            if (r) {
                $.ajax({
                    url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDelete",
                    type: "POST",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        resolutionData(data);
                        TubeTypes.dataGrid.datagrid('reload');
                    },
                    error: function () {
                    }
                });
            }
        });
    },

    /* 批量删除 */
    deleteBatch: function (dataGrid) {
        var checkedItems = dataGrid.datagrid("getChecked");
        if (checkedItems.length == 0) {
            showMessage('请选择要删除的数据!');
            return false;
        }

        var names = [];
        var ids = [];
        $.each(checkedItems, function (index, item) {
            if (item.status == true) {
                names.push(item.name);
            } else {
                ids.push(item.stringId);
            }
        });
        if (names.length > 0) {
            showMessage("名称【" + names.join(",") + '】启用状态，不允许删除!');
            return false;
        }

        $.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
            if (r) {
                $.ajax({
                    url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDeleteBatch",
                    type: "POST",
                    data: {
                        ids: ids.join(",")
                    },
                    success: function (data) {
                        resolutionData(data);
                        dataGrid.datagrid('reload');
                    },
                    error: function () {
                    }
                });
            }

        });

    },


    /* 启用、停用状态 */
    changeStatus: function (index, rowData) {
        var id = rowData.stringId;
        var val = rowData.status.toString();
        if (id == '' || val == '') {
            showMessage('请选择操作记录!');
            return;
        }
        var confirmMeg = "";
        var operatioType = "";
        var newVal;
        if (val == '1') {
            confirmMeg = "是否停用当前记录？";
            operatioType = "Disable";
            newVal = '0';
        }
        if (val == '0') {
            confirmMeg = "是否启用当前记录？";
            operatioType = "Enable";
            newVal = '1';
        }
        $.messager.confirm("提示", confirmMeg, function (r) {
            if (r) {
                $.ajax({
                    url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDisableOrEnable",
                    type: "POST",
                    data: {id: id, operatioType: operatioType},
                    success: function (data) {
                    	TubeTypes.dataGrid.datagrid('updateRow', {
                            index: index,
                            row: {
                                status: newVal
                            }
                        });
                    },
                    error: function () {
                    	TubeTypes.dataGrid.datagrid('refreshRow', index);
                    }
                });
            } else {
            	TubeTypes.dataGrid.datagrid('refreshRow', index);
            }

        });
    },

    /* 弹出新增/编辑/详情框 */
    showDictCodeEditDialog: function (id, opType, typeKey, callbackFun) {
        //var typeKey = $("#" + CtrDictCodes.preId + "TypeKey").val();
        var url = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesInfo";
        $("#ctrDictInfoModal").load(url, {id: id, opType: opType, typeKey: typeKey}, function () {
            dialog("ctrDictInfoModal", {
                width: 480
            }, callbackFun);
        });
    },

    /* 判断新增还是修改 */
    editDictCode: function (opType) {
        if (opType == "add") {
            TubeType.addDictCode();
        } else if (opType == "edit") {
            TubeType.updateDictCode();
        }
    },

    /* 修改 */
    updateDictCode: function () {
        //防止重复提交
        $("#editBtn").attr("disabled", true);
        //是否有过变更
        if (!formIsDirty("ctrDictCodeInfoEditForm")) {
            $("#ctrDictInfoModal").hide();
            return false;
        }
        formTextTrim("ctrDictCodeInfoEditForm");
        if (!TubeType.validateSave()) {
            $("#editBtn").attr("disabled", false);
            return;
        }
        // 检查是否同名
        var id = $("#editId").val();
        var typeKey = $("#editTypeKey").val();
        var name = $("#editName").val().trim();
        // 检查是否同名
        if (TubeType.oldName != name) {

            $.ajax({
                url: ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
                type: "POST",
                data: {id: id, typeKey: typeKey, name: name},
                success: function (data) {
                    $("#editBtn").attr("disabled", false);
                    if (data.indexOf("confirm|") == 0) {
                        // 有同名
                        showConfirm(data.substring(8), function () {
                            // 确认继续
                            TubeType.update(typeKey);
                        });
                    } else {
                        // 无同名，确认继续
                        TubeType.update(typeKey);
                    }
                },
                error: function () {
                    $("#editBtn").attr("disabled", false);
                }
            });
        } else {
            TubeType.update(typeKey);
        }

    },

    update: function (typeKey) {
        var dataString = $("#ctrDictCodeInfoEditForm").serialize();
        //var id = $("#editid").val();
        $.ajax({
            url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesEide",
            type: "POST",
            data: dataString,
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                resolutionData(data);
                TubeTypes.dataGrid.datagrid('reload');
                $("#ctrDictInfoModal").hide();
            },
            "error": function () {
                $("#editBtn").attr("disabled", false);
            }
        });
    },

    /* 新增 */
    addDictCode: function () {
        //防止重复提交
        $("#editBtn").attr("disabled", true);
        formTextTrim("ctrDictCodeInfoEditForm");


        if (!TubeType.validateSave()) {
            $("#editBtn").attr("disabled", false);
            return;
        }

        var typeKey = $("#editTypeKey").val();
        var name = $.trim($("#editName").val());
        // 检查是否同名
        $.ajax({
            url: ctx + "/basisDict/ctrTubeTypes/checkNameExisted",
            type: "POST",
            data: {
                typeKey: typeKey,
                name: name
            },
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                if (data.indexOf("confirm|") == 0) {
                    // 有同名
                    showConfirm(data.substring(8), function () {
                        // 确认继续
                        TubeType.add(typeKey);
                    })
                } else {
                    // 无同名，确认继续
                    TubeType.add(typeKey);
                }
            },
            error: function () {
                $("#editBtn").attr("disabled", false);
            }
        });

    },

    add: function (typeKey) {
        var dataString = $("#ctrDictCodeInfoEditForm").serialize();
        $.ajax({
            url: ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesAdd",
            type: "POST",
            data: dataString,
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                resolutionData(data);
                TubeTypes.dataGrid.datagrid('reload');
                $("#ctrDictInfoModal").hide();
            },
            error: function () {
                $("#editBtn").attr("disabled", false);
            }
        });
    },

    /* 验证保存的必填条件 */
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
    },

    /* 获取当前的DataGrid */
    getCurrentDataGrid: function (typeKey) {
        switch (typeKey.toString()) {
            case "1": // 标本类型
                return SpecimenType.dataGrid;
                break;
            case "2": // 检验方法
                return TestMethod.dataGrid;
                break;
            case "9": // 標本狀態
                return SpecimenStatus.dataGrid;
                break;
        }

    }

}
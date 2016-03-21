/**
 * For EasyUI style
 * Created by subanmiao on 2016/1/7.
 */

var newcommonjs = {
    colMaxLength: 15,
		
	//2016/01/11 add by chenshuxian 共用栏
	getColumns: function (obj){
		 var columns = [[
           {field: "ck", checkbox: true, width: 30},
           {
               title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
               var rowData = JSON.stringify(row);
               return "<a onclick='"+ obj +".showDialog(" + rowData + ")'>" + value + "</a>";
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
               var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
               if (value == '1') {
                   returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='"+ obj +".changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
               }
               return returnStr;
           }

           },
           {
               title: "操作", field: 'opt', width: 60, align: 'center',
               formatter: function (value, row, index) {
                   var str = "";
                   var rowData = JSON.stringify(row);
                   str += "<a class='icon icon-edit' onclick='"+ obj +".editRow(" + rowData + ")'></a>";
                   str += "<a class=\"icon icon-trash\" onclick='"+ obj +".deleteRow(" + index + "," + rowData + ")'></a>";
                   return str;
               }
           }]];
		
		return columns;
	},
	

    createGridObj: function (url, method, params) {
        var gridObj = {
            url: url,
            method: method,
            queryParams: params,
            fitColumns: true,
            fit: false,
            checkOnSelect: false,
            selectOnCheck: true,
            autoRowHeight: false,
            striped: true,
            pagination: true,
            pageNumber: 1,
            pageSize: 10
        };
        return gridObj;
    },

    /* 自适应表格 */
    tableAuto: function (tableList) {

        var width = tableList.parents('.tabs-panels').width() - 40;
        var height = tableList.parents('.tabs-panels').height() - 70;
        tableList.datagrid('resize', {
            width: width,
            height: height
        });
    },

    /* 弹出新增/编辑/详情框 */
    showDictCodeEditDialog: function (id, opType, typeKey, callbackFun, url, dialogWidth, focusId) {
        $("#ctrDictInfoModal").load(url, {id: id, opType: opType, typeKey: typeKey}, function () {
            dialog("ctrDictInfoModal", {
                //width: 480
                width: dialogWidth
            }, callbackFun);
            validate.validateBox();
           
            $("#"+focusId).focus();
        });
    },
    
    /*2016/1/15 add by chenshuxian 由使用者传入data obj 让方法更灵活*/
    newshowDictCodeEditDialog: function (data, callbackFun, url, dialogWidth, focusId) {
        $("#ctrDictInfoModal").load(url, data, function () {
            dialog("ctrDictInfoModal", {
                //width: 480
                width: dialogWidth
            }, callbackFun);
            validate.validateBox();
            $("#"+focusId).focus();
        });
    },


    /* 删除行 */
    deleteRow: function (rowData, url, dataGrid, method) {
        var id = rowData.stringId;
        var status = rowData.status;
        if (status == true) {
            showMessage('当前选中记录已启用，不允许删除！');
            return;
        }
        $.messager.confirm("提示", "你确定要删除吗?", function (r) {
            if (r) {
                $.ajax({
                    url: url,
                    type: method,
                    data: {
                        id: id
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

    /* 批量删除 */
    deleteBatch: function (dataGrid, url, method) {
        var checkedItems = dataGrid.datagrid("getChecked");
        if (checkedItems.length == 0) {
            showMessage('请选择要删除的数据!');
            return false;
        }

        var names = [];
        var ids = [];
        $.each(checkedItems, function (index, item) {
            if (item.status == true) {
            	if(item.name){
            		names.push(item.name);
            	}else{
            		names.push(item.componentName);
            	}
                
            } else {
                ids.push(item.stringId);
            }
        });
        
        if (names.length > 0) {
            showMessage("名称" + this.getItemsMsg(names) + "启用状态，不允许删除!");
            return false;
        }

        $.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
            if (r) {
                $.ajax({
                    url: url,
                    type: method,
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

    /* 处理返回提示中名称集合 */
    getItemsMsg: function (items) {
        var itemsMsg = "";
        $.each(items, function (k, v) {
           itemsMsg += "【" + v + "】,";
        });
        return itemsMsg.substring(0, itemsMsg.length - 1);
    },

    /* 启用、停用状态 */
    changeStatus: function (index, rowData, dataGrid, url, method) {
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
                    url: url,
                    type: method,
                    data: {id: id, operatioType: operatioType},
                    success: function (data) {
                    	resolutionData(data);
                        dataGrid.datagrid('updateRow', {
                            index: index,
                            row: {
                                status: newVal
                            }
                        });

                    },
                    error: function () {
                        dataGrid.datagrid('refreshRow', index);

                    }
                });
            } else {
                dataGrid.datagrid('refreshRow', index);
            }
        });
    },

    /* 修改 */
    updateDictCode: function (existUrl, updateUrl, existMethod, updateMethod, dataGrid) {
        //防止重复提交
        $("#editBtn").attr("disabled", true);
        //是否有过变更
        if (!formIsDirty("InfoForm")) {
            $("#ctrDictInfoModal").hide();
            return false;
        }
        formTextTrim("InfoForm");
        if (!this.validateSave()) {
        	$("#editBtn").attr("disabled", false);
            return;
        }
        // 检查是否同名
        var id = $("#editId").val();
        var typeKey = $("#editTypeKey").val();
        var name = $("#editName").val().trim();
        // 检查是否同名
        if (newcommonjs.oldName != name) {
            $.ajax({
                url: existUrl,
                type: existMethod,
                data: {id: id, typeKey: typeKey, name: name},
                success: function (data) {
                    $("#editBtn").attr("disabled", false);
                    if (data.indexOf("confirm|") == 0) {
                        // 有同名
                        showConfirm(data.substring(8), function () {
                            // 确认继续
                            newcommonjs.update(updateUrl, updateMethod, dataGrid);
                        });
                    } else {
                        // 无同名，确认继续
                        newcommonjs.update(updateUrl, updateMethod, dataGrid);
                    }
                },
                error: function () {
                    $("#editBtn").attr("disabled", false);
                }
            });
        } else {
            this.update(updateUrl, updateMethod, dataGrid);
        }
    },
    
    newupdateDictCode: function (existUrl, updateUrl, Method, dataGrid, data, successF,v) {
        //防止重复提交
        $("#editBtn").attr("disabled", true);
        //是否有过变更
        if (!formIsDirty("InfoForm")) {
            $("#ctrDictInfoModal").hide();
            return false;
        }
        formTextTrim("InfoForm");
        if (!v) {
            return;
        }
        // 检查是否同名
        //var id = $("#editId").val();
        //var typeKey = $("#editTypeKey").val();
        //var name = $("#editName").val().trim();
        // 检查是否同名
         $.ajax({
                url: existUrl,
                type: Method,
                data: data,
                success: successF
         });
      
            //this.update(updateUrl, Method, dataGrid);
        
    },

    update: function (url, method, dataGrid) {
    	var data = $("#InfoForm").serialize();

        $.ajax({
            url: url,
            type: method,
            data: data,
            success: function (data) {
            	//alert(data);
                $("#editBtn").attr("disabled", false);
                resolutionData(data);
                dataGrid.datagrid('reload');
                $("#ctrDictInfoModal").hide();

            },
            "error": function () {
                $("#editBtn").attr("disabled", false);

            }
        });
    },

    /* 新增 */
    addDictCode: function (existUrl, addUrl, existMethod, addMethod, dataGrid) {
        //防止重复提交
        $("#editBtn").attr("disabled", true);
        formTextTrim("InfoForm");

        if (!this.validateSave()) {
        	$("#editBtn").attr("disabled", false);
            return;
        }

        var typeKey = $("#editTypeKey").val();
        var name = $.trim($("#editName").val());
        // 检查是否同名
        $.ajax({
            url: existUrl,
            type: existMethod,
            data: {
                typeKey: typeKey,
                name: name
            },
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                if (data.indexOf("confirm|") == 0) {
                    // 有同名
                    showConfirm(data.substring(8), function() {
                        // 确认继续
                        newcommonjs.add(addUrl, addMethod, dataGrid, typeKey);
                    })
                } else {
                    // 无同名，确认继续
                    newcommonjs.add(addUrl, addMethod, dataGrid, typeKey);
                }
            },
            error: function () {
                $("#editBtn").attr("disabled", false);
            }
        });
    },
    
    newaddDictCode: function (existUrl, addUrl, Method, dataGrid, data, successF, v) {
        //防止重复提交

        $("#editBtn").attr("disabled", true);
        formTextTrim("InfoForm");
       // console.log(existUrl);
        if (!v) {
        	$("#editBtn").attr("disabled", false);
            return;
        }
//
//        var typeKey = $("#editTypeKey").val();
//        var name = $.trim($("#editName").val());
        // 检查是否同名
        //console.log("newadd"+data);
        $.ajax({
            url: existUrl,
            type: Method,
            data: data,
            success: successF,
            error: function () {
                $("#editBtn").attr("disabled", false);
            }
        });
    },


    add: function (url, method, dataGrid, typeKey) {
        var data = $("#InfoForm").serialize();
        $.ajax({
            url: url,
            type: method,
            data: data,
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                resolutionData(data);
                var pager = dataGrid.datagrid('getPager');
                pager.pagination('refresh',{
                    pageNumber:1
                });
                dataGrid.datagrid('reload', {
                    searchStr: '',
                    sort: 2,
                    status: '',
                    typeKey: typeKey
                });
                $("#ctrDictInfoModal").hide();

            }, 
            error: function () {
                $("#editBtn").attr("disabled", false);

            }
        });
    },
    
    newadd: function (url, method, dataGrid, reloadData) {
        var data = $("#InfoForm").serialize();
        $.ajax({
            url: url,
            type: method,
            data: data,
            success: function (data) {
                $("#editBtn").attr("disabled", false);
                resolutionData(data);
                dataGrid.datagrid('reload', reloadData);
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
    
    /* 搜索 */
    dataGridSearch: function (dataGrid, obj) {
        dataGrid.datagrid('load', {
            searchStr: obj.searchStr,
            status: obj.status,
            sort: obj.sort,
            typeKey: obj.typeKey
        });
    },
    
    /* 搜索 */
    newdataGridSearch: function (dataGrid, obj) {
        dataGrid.datagrid('load', obj);
    },

    /* 页面初始化 */
    pageInit: function (preId) {
        $("#" + preId + "SearchStr").focus();
        this.setSearchConditions(preId,  "", 2, 0);
    },

    /* 设置搜索条件 */
    setSearchConditions: function (preId, searchWord, statusIndex, sortIndex) {

        $("#" + preId + "SearchStr").val(searchWord);
        if (sortIndex > -1) {
            $("." + preId + "-sort-selector li.selected").removeClass("selected");
            $("." + preId + "-sort-selector li").each(function (index) {
                if (sortIndex == index) {
                    $(this).addClass("selected");
                    $("#" + preId + "SortSpan").html($(this).html());
                    var sortVal = $(this).attr("el-value");
                    $("#" + preId + "Sort").val(sortVal);
                }
            });
        }
        if (statusIndex > -1) {
            $("." + preId + "-status-selector li.selected").removeClass("selected");
            $("." + preId + "-status-selector li").each(function (index) {
                if (statusIndex == index) {
                    $(this).addClass("selected");
                    $("#" + preId + "StatusSpan").html($(this).html());
                    var statusVal = $(this).attr("el-value");
                    $("#" + preId + "Status").val(statusVal);
                }
            });
        }
    },

    /* dataGrid单行高亮 */
    lineHighLight: function (dataGrid, row, index) {
        var opt = dataGrid.datagrid("options");
        var rows2 = opt.finder.getTr(row, "", "selected", 2);
        if (rows2.length > 0) {
            $(rows2).each(function () {
                var tempIndex = parseInt($(this).attr("datagrid-row-index"));
                if (tempIndex != index) {
                    $(this).removeClass("datagrid-row-selected");
                }
                if ($(this).is(".datagrid-row-checked")) {
                    $(this).addClass("datagrid-row-over");
                }
            });
        }
    },

    /* 普通表格点击行样式：选中复选框才高亮，点中行其它地方高亮 */
    rowClickStyle: function (dataGrid, row) {
        var opt = dataGrid.datagrid("options");
        var rows = opt.finder.getTr(row, "", "selected", 2);
        if (rows.length > 0) {
            $(rows).each(function () {
                if (!$(this).is(".datagrid-row-checked")) {
                    $(this).removeClass("datagrid-row-selected");
                }
            });
        }
    },

    /* 搜索 */
    dataGridSearch: function (dataGrid, obj) {
        dataGrid.datagrid('load', obj);
    },
    
    trimSpace: function(obj){
    	obj.val($.trim(obj.val()));
    }
   

}


/**
 * Loinc编码表js
 * Created by subanmiao on 2016/1/14.
 */
var CtrLoinc = (function($){

    /* START render basicModule */
    CtrLoinc = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.CL,
        _tableList =  $("#" + _preId + "List"),
        _hideCols =[],	//要穩藏的欄位
        _data = CtrLoinc.searchObj(_preId),
        _module = "CtrLoinc",
        _focusId = "comboText1",
        _popArea = 480,
        _pageListUrl =  ctx + "/ctrLoinc/ctrLoincPageList",
        _delBatUrl =  ctx + "/ctrLoinc/ctrLoincDeleteBatch",
        _existUrl = "",
        _updateUrl =  ctx + "/ctrLoinc/ctrLoincEdit",
        _addUrl = ctx + "/ctrLoinc/ctrLoincAdd",
        _delUrl = ctx + "/ctrLoinc/ctrLoincDelete",
        _changeStatusUrl = ctx + "/ctrLoinc/ctrLoincDisableOrEnable",
        _InfoUrl = ctx + "/ctrLoinc/ctrLoincInfo",
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

        CtrLoinc.searchGrid();
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

        CtrLoinc.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        CtrLoinc.searchGrid();;
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        CtrLoinc.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        CtrLoinc.deleteBetch();
    });


    $.extend(CtrLoinc,{

        preId:_preId,
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


        validateSave: function () {
            var
                componentId = CtrLoinc.componentGrid.getValue(),
                testPropertyId = CtrLoinc.testPropertyGrid.getValue(),
                testMethodId = CtrLoinc.testMethodGrid.getValue(),
                typeOfScaleId = CtrLoinc.typeOfScaleGrid.getValue(),
                timeAspectId = CtrLoinc.timeAspectGrid.getValue(),
                sampleTypeId = CtrLoinc.sampleTypeGrid.getValue();

            if(componentId == ""){
                showMessage("受检成份为空,请重新输入!",function(){
                });
                return false;
            }

            if(testPropertyId == ""){
                showMessage("受检属性为空,请重新输入!",function(){
                });
                return false;
            }

            if(testMethodId == ""){
                showMessage("检验方法为空,请重新输入!",function(){
                });
                return false;
            }

            if(typeOfScaleId == ""){
                showMessage("样本标识为空,请重新输入!",function(){
                });
                return false;
            }

            if(timeAspectId == ""){
                showMessage("时间特性为空,请重新输入!",function(){
                });
                return false;
            }

            if(sampleTypeId == ""){
                showMessage("标本类型为空,请重新输入!",function(){
                });
                return false;
            }

            var displayOrderId = "displayOrder";
            if(validateDisplayOrder(displayOrderId)){
                return false;
            }
            return true;
        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(CtrLoinc.rowData);
            $("#InfoForm").form("load", {
                id: rowData.stringId,
                componentId: rowData.componentIdString,
                componentName: rowData.componentName,
                testPropertyId: rowData.testPropertyIdString,
                testPropertyName: rowData.testPropertyName,
                testMethodId: rowData.testMethodIdString,
                testMethodName: rowData.testMethodName,
                typeOfScaleId: rowData.typeOfScaleIdString,
                typeOfScaleName: rowData.typeOfScaleName,
                timeAspectId: rowData.timeAspectIdString,
                timeAspectName: rowData.timeAspectName,
                sampleTypeId: rowData.sampleTypeIdString,
                sampleTypeName: rowData.sampleTypeName,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("#spanEditCodeNo").html(rowData.codeNo);
            CtrLoinc.componentGrid.setText(rowData.componentName);
            CtrLoinc.testPropertyGrid.setText(rowData.testPropertyName);
            CtrLoinc.testMethodGrid.setText(rowData.testMethodName);
            CtrLoinc.typeOfScaleGrid.setText(rowData.typeOfScaleName);
            CtrLoinc.timeAspectGrid.setText(rowData.timeAspectName);
            CtrLoinc.sampleTypeGrid.setText(rowData.sampleTypeName);

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                componentName: rowData.componentName,
                testPropertyName: rowData.testPropertyName,
                testMethodName: rowData.testMethodName,
                typeOfScaleName: rowData.typeOfScaleName,
                timeAspectName: rowData.timeAspectName,
                sampleTypeName: rowData.sampleTypeName,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("form input").attr("readonly", "readonly");
            $("form textarea").attr("readonly", "readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        },

        /*callback function area end*/

        /********************comboxGrid Start*********************/
        // 受检成份Grid
        componentParam: function () {return {					// 下拉Grid参数,所有参数均为必填
            div_id: CtrLoinc.preId + "_component", 				// 对应表单DIV的id
            grid_id: CtrLoinc.preId + "_gridComponent", 			// 对应数据源Grid的Id
            name: "componentId",					// 在表单中对应的提交name
            columnShow: 1,						// 将要在文本框中显示的列序号
            width: 480, 					    // Combo的宽度
            clearOff: false,						// 是否禁用clear按钮
            searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
            onEnter: function () {
            }
        }},

        // 受检属性Grid
        testPropertyParam: function () {return {				// 下拉Grid参数,所有参数均为必填
            div_id: CtrLoinc.preId + "_property", 				// 对应表单DIV的id
            grid_id: CtrLoinc.preId + "_gridProperty", 		// 对应数据源Grid的Id
            name: "testPropertyId",				// 在表单中对应的提交name
            columnShow: 1,						// 将要在文本框中显示的列序号
            width: 480, 					    // Combo的宽度
            clearOff: false,						// 是否禁用clear按钮
            searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
            onEnter: function () {
            }
        }},

        // 检验方法Grid
        testMethodParam: function () {return {					// 下拉Grid参数,所有参数均为必填
            div_id: CtrLoinc.preId + "_testMethod", 				// 对应表单DIV的id
            grid_id: CtrLoinc.preId + "_gridTestMethod", 			// 对应数据源Grid的Id
            name: "testMethodId",				// 在表单中对应的提交name
            columnShow: 1,						// 将要在文本框中显示的列序号
            width: 480, 					    // Combo的宽度
            clearOff: false,						// 是否禁用clear按钮
            searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
            onEnter: function () {
            }
        }},

        // 样本标识Grid
        typeOfScaleParam: function () {return {				// 下拉Grid参数,所有参数均为必填
            div_id: CtrLoinc.preId + "_typeOfScale", 				// 对应表单DIV的id
            grid_id: CtrLoinc.preId + "_gridTypeOfScale", 			// 对应数据源Grid的Id
            name: "typeOfScaleId",				// 在表单中对应的提交name
            columnShow: 1,						// 将要在文本框中显示的列序号
            width: 480, 					    // Combo的宽度
            clearOff: false,						// 是否禁用clear按钮
            searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
            onEnter: function () {
            }
        }},

        // 时间特征Grid
        timeAspectParam: function () {return {					// 下拉Grid参数,所有参数均为必填
            div_id: CtrLoinc.preId + "_timeAspect", 				// 对应表单DIV的id
            grid_id: CtrLoinc.preId + "_gridTimeAspect", 			// 对应数据源Grid的Id
            name: "timeAspectId",				// 在表单中对应的提交name
            columnShow: 1,						// 将要在文本框中显示的列序号
            width: 480, 					    // Combo的宽度
            clearOff: false,						// 是否禁用clear按钮
            searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
            onEnter: function () {
            }
        }},

        // 样本类型Grid
        sampleTypeParam: function () {return {				 	// 下拉Grid参数,所有参数均为必填
            div_id: CtrLoinc.preId + "_sampleType", 				// 对应表单DIV的id
            grid_id: CtrLoinc.preId + "_gridSampleType", 			// 对应数据源Grid的Id
            name: "sampleTypeId",				// 在表单中对应的提交name
            columnShow: 1,						// 将要在文本框中显示的列序号
            width: 480, 					    // Combo的宽度
            clearOff: false,						// 是否禁用clear按钮
            searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
            onEnter: function () {
            }
        }}
        /********************comboxGrid END*********************/

    });

    return CtrLoinc;

}(jQuery));

$(function(){
    CtrLoinc.init();
});
/*var CtrLoinc = {
    preId: $("#ctrLoincPreId").val(),
    componentGrid: undefined,
    testPropertyGrid: undefined,
    testMethodGrid: undefined,
    typeOfScaleGrid: undefined,
    timeAspectGrid: undefined,
    sampleTypeGrid: undefined,
    init: function () {
        newcommonjs.pageInit(this.preId);
        this.tableList = $("#" + this.preId + "CtrLoincList");
        var url = ctx + "/ctrLoinc/ctrLoincPageList";
        var params = this.searchObj();
        var gridObj = newcommonjs.createGridObj(url, "POST", params);
        gridObj.columns = [[
            {field: "ck", checkbox: true, width: 30},
            {
                title: "编码", field: 'codeNo', width: 80, formatter: function (value, row) {
                var rowData = JSON.stringify(row);
                return "<a onclick='CtrLoinc.showDialog(" + rowData + ")'>" + value + "</a>";
            }
            },
            {title: "受检成份", field: 'componentName', flex: 1, width: 60},
            {title: "受检属性", field: 'testPropertyName', flex: 1, width: 60},
            {title: "检验方法", field: 'testMethodName', flex: 1, width: 60},
            {title: "标本标识", field: 'typeOfScaleName', flex: 1, width: 60},
            {title: "时间特性", field: 'timeAspectName', flex: 1, width: 60},
            {title: "标本类型", field: 'sampleTypeName', flex: 1, width: 60},
            {title: "助记符", field: 'fastCode', flex: 1, width: 60},
            {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
            {
                title: "备注", field: 'memo', width: 200, formatter: function (value) {
                if (value.length > newcommonjs.colMaxLength) {
                    return value.substring(0, newcommonjs.colMaxLength) + "……";
                } else {
                    return value;
                }
            }
            },
            {
                title: "状态", field: 'status', formatter: function (value, row, index) {
                var rowData = JSON.stringify(row);
                var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='CtrLoinc.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                if (value == '1') {
                    returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='CtrLoinc.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
                }
                return returnStr;
            }

            },
            {
                title: "操作", field: 'opt', width: 60, align: 'center',
                formatter: function (value, row, index) {
                    var str = "";
                    var rowData = JSON.stringify(row);
                    str += "<a class='icon icon-edit' onclick='CtrLoinc.editRow(" + rowData + ")'></a>";
                    str += "<a class=\"icon icon-trash\" onclick='CtrLoinc.deleteRow(" + index + "," + rowData + ")'></a>";
                    return str;
                }
            }]];
        gridObj.onLoadSuccess = function () {
            newcommonjs.tableAuto(CtrLoinc.tableList);
        };
        gridObj.view =
            $.extend({}, $.fn.datagrid.defaults.view, {
                onAfterRender: function () {
                    // 操作成功后刷新dataGrid
                    switch (CtrLoinc.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(CtrLoinc.preId, "", 2, 2);
                            CtrLoinc.currentEvent = undefined;
                            break;
                    }
                }
            });
        gridObj.onClickRow = function (index, row) {
            newcommonjs.rowClickStyle(CtrLoinc.dataGrid, this);
        }

        /!* render DataGrid *!/
        this.dataGrid = this.tableList.datagrid(gridObj);

        /!* 关键词搜索 *!/
        $("#" + this.preId + "SearchBtn").click(function () {
            newcommonjs.dataGridSearch(CtrLoinc.dataGrid, CtrLoinc.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + CtrLoinc.preId + "StatusSpan").html($(this).html());
            $("." + CtrLoinc.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + CtrLoinc.preId + "Status").val(statusVal);

            CtrDictCodes.dataGridSearch(CtrLoinc.dataGrid, CtrLoinc.searchObj());
        });

        /!* 排序 *!/
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + CtrLoinc.preId + "SortSpan").html($(this).html());
            $("." + CtrLoinc.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + CtrLoinc.preId + "Sort").val(sortVal);

            CtrDictCodes.dataGridSearch(CtrLoinc.dataGrid, CtrLoinc.searchObj());
        });

        /!* 批量删除 *!/
        $("#" + this.preId + "DeleteCtrLoincBatch").click(function () {
            var url = ctx + "/ctrLoinc/ctrLoincDeleteBatch";
            newcommonjs.deleteBatch(CtrLoinc.dataGrid, url, "POST");
        });

        /!* 新增 *!/
        $("#" + this.preId + "AddCtrLoinc").click(function () {
            CtrLoinc.currentEvent = "add";
            var url = ctx + "/ctrLoinc/ctrLoincInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', '', function () {
                $("#comboText1").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(CtrLoinc.tableList);
        });
    },

    /!* 弹出详情信息框 *!/
    showDialog: function (rowData) {
        var url = ctx + "/ctrLoinc/ctrLoincInfo";
        newcommonjs.showDictCodeEditDialog('', 'view', '', function () {
            $("#InfoForm").form("load", {
                componentName: rowData.componentName,
                testPropertyName: rowData.testPropertyName,
                testMethodName: rowData.testMethodName,
                typeOfScaleName: rowData.typeOfScaleName,
                timeAspectName: rowData.timeAspectName,
                sampleTypeName: rowData.sampleTypeName,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("form input").attr("readonly", "readonly");
            $("form textarea").attr("readonly", "readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);
        }, url, 480);
    },

    editCtrLoinc: function (opType) {
        if (opType == "add") {
            this.addCtrLoinc();
        } else if (opType == "edit") {
            this.updateCtrLoinc();
        }
    },

    addCtrLoinc: function () {
        //防止重复提交
        $("#editBtn").attr("disabled", true);

        formTextTrim("InfoForm");
        if (!this.validateSave()) {
            $("#editBtn").attr("disabled", false);
            return;
        }

        var url = ctx + "/ctrLoinc/ctrLoincAdd";
        var reloadData = this.searchObj();
        reloadData.sort = 2;
        reloadData.searchStr = "";
        reloadData.status = "";
        newcommonjs.newadd(url, "POST", this.dataGrid, reloadData);
    },

    updateCtrLoinc: function () {
        $("#editBtn").attr("disabled", true);
        formTextTrim("InfoForm");
        if (!this.validateSave()) {
            $("#editBtn").attr("disabled", false);
            return;
        }
        var url = ctx + "/ctrLoinc/ctrLoincEdit";
        newcommonjs.update(url, "POST", this.dataGrid);
    },

    editRow: function (rowData) {
        //var id = rowData.stringId;
        if (rowData.status == true) {
            showMessage('当前选中记录已启用，不允许修改！');
            return;
        }
        var url = ctx + "/ctrLoinc/ctrLoincInfo";
        newcommonjs.showDictCodeEditDialog('', 'edit', '', function () {
            $("#InfoForm").form("load", {
                id: rowData.stringId,
                componentId: rowData.componentIdString,
                componentName: rowData.componentName,
                testPropertyId: rowData.testPropertyIdString,
                testPropertyName: rowData.testPropertyName,
                testMethodId: rowData.testMethodIdString,
                testMethodName: rowData.testMethodName,
                typeOfScaleId: rowData.typeOfScaleIdString,
                typeOfScaleName: rowData.typeOfScaleName,
                timeAspectId: rowData.timeAspectIdString,
                timeAspectName: rowData.timeAspectName,
                sampleTypeId: rowData.sampleTypeIdString,
                sampleTypeName: rowData.sampleTypeName,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("#spanEditCodeNo").html(rowData.codeNo);
            CtrLoinc.componentGrid.setText(rowData.componentName);
            CtrLoinc.testPropertyGrid.setText(rowData.testPropertyName);
            CtrLoinc.testMethodGrid.setText(rowData.testMethodName);
            CtrLoinc.typeOfScaleGrid.setText(rowData.typeOfScaleName);
            CtrLoinc.timeAspectGrid.setText(rowData.timeAspectName);
            CtrLoinc.sampleTypeGrid.setText(rowData.sampleTypeName);
            $("#comboText1").focus();
        }, url, 480);
    },

    validateSave: function () {
        var componentId = this.componentGrid.getValue();
        var testPropertyId = this.testPropertyGrid.getValue();
        var testMethodId = this.testMethodGrid.getValue();
        var typeOfScaleId = this.typeOfScaleGrid.getValue();
        var timeAspectId = this.timeAspectGrid.getValue();
        var sampleTypeId = this.sampleTypeGrid.getValue();

        if(componentId == ""){
            showMessage("受检成份为空,请重新输入!",function(){
            });
            return false;
        }

        if(testPropertyId == ""){
            showMessage("受检属性为空,请重新输入!",function(){
            });
            return false;
        }

        if(testMethodId == ""){
            showMessage("检验方法为空,请重新输入!",function(){
            });
            return false;
        }

        if(typeOfScaleId == ""){
            showMessage("样本标识为空,请重新输入!",function(){
            });
            return false;
        }

        if(timeAspectId == ""){
            showMessage("时间特性为空,请重新输入!",function(){
            });
            return false;
        }

        if(sampleTypeId == ""){
            showMessage("标本类型为空,请重新输入!",function(){
            });
            return false;
        }

        var displayOrderId = "displayOrder";
        if(validateDisplayOrder(displayOrderId)){
            return false;
        }
        return true;
    },

    searchObj: function () {
        return {
            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
            status: $("#" + this.preId + "Status").val(),
            sort: $("#" + this.preId + "Sort").val()
        };
    },

    changeStatus: function (index, rowData) {
        var url = ctx + "/ctrLoinc/ctrLoincDisableOrEnable";
        newcommonjs.changeStatus(index, rowData, CtrLoinc.dataGrid, url, "POST");
    },

    deleteRow: function (index, rowData) {
        var url = ctx + "/ctrLoinc/ctrLoincDelete"
        newcommonjs.deleteRow(rowData, url, CtrLoinc.dataGrid, "POST");
    },


// 受检成份Grid
    componentParam: function () {return {					// 下拉Grid参数,所有参数均为必填
        div_id: CtrLoinc.preId + "_component", 				// 对应表单DIV的id
        grid_id: CtrLoinc.preId + "_gridComponent", 			// 对应数据源Grid的Id
        name: "componentId",					// 在表单中对应的提交name
        columnShow: 1,						// 将要在文本框中显示的列序号
        width: 480, 					    // Combo的宽度
        clearOff: false,						// 是否禁用clear按钮
        searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
        lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
        onEnter: function () {
        }
    }},

// 受检属性Grid
    testPropertyParam: function () {return {				// 下拉Grid参数,所有参数均为必填
        div_id: CtrLoinc.preId + "_property", 				// 对应表单DIV的id
        grid_id: CtrLoinc.preId + "_gridProperty", 		// 对应数据源Grid的Id
        name: "testPropertyId",				// 在表单中对应的提交name
        columnShow: 1,						// 将要在文本框中显示的列序号
        width: 480, 					    // Combo的宽度
        clearOff: false,						// 是否禁用clear按钮
        searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
        lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
        onEnter: function () {
        }
    }},

// 检验方法Grid
    testMethodParam: function () {return {					// 下拉Grid参数,所有参数均为必填
        div_id: CtrLoinc.preId + "_testMethod", 				// 对应表单DIV的id
        grid_id: CtrLoinc.preId + "_gridTestMethod", 			// 对应数据源Grid的Id
        name: "testMethodId",				// 在表单中对应的提交name
        columnShow: 1,						// 将要在文本框中显示的列序号
        width: 480, 					    // Combo的宽度
        clearOff: false,						// 是否禁用clear按钮
        searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
        lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
        onEnter: function () {
        }
    }},

// 样本标识Grid
    typeOfScaleParam: function () {return {				// 下拉Grid参数,所有参数均为必填
        div_id: CtrLoinc.preId + "_typeOfScale", 				// 对应表单DIV的id
        grid_id: CtrLoinc.preId + "_gridTypeOfScale", 			// 对应数据源Grid的Id
        name: "typeOfScaleId",				// 在表单中对应的提交name
        columnShow: 1,						// 将要在文本框中显示的列序号
        width: 480, 					    // Combo的宽度
        clearOff: false,						// 是否禁用clear按钮
        searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
        lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
        onEnter: function () {
        }
    }},

// 时间特征Grid
    timeAspectParam: function () {return {					// 下拉Grid参数,所有参数均为必填
        div_id: CtrLoinc.preId + "_timeAspect", 				// 对应表单DIV的id
        grid_id: CtrLoinc.preId + "_gridTimeAspect", 			// 对应数据源Grid的Id
        name: "timeAspectId",				// 在表单中对应的提交name
        columnShow: 1,						// 将要在文本框中显示的列序号
        width: 480, 					    // Combo的宽度
        clearOff: false,						// 是否禁用clear按钮
        searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
        lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
        onEnter: function () {
        }
    }},

// 样本类型Grid
    sampleTypeParam: function () {return {				 	// 下拉Grid参数,所有参数均为必填
        div_id: CtrLoinc.preId + "_sampleType", 				// 对应表单DIV的id
        grid_id: CtrLoinc.preId + "_gridSampleType", 			// 对应数据源Grid的Id
        name: "sampleTypeId",				// 在表单中对应的提交name
        columnShow: 1,						// 将要在文本框中显示的列序号
        width: 480, 					    // Combo的宽度
        clearOff: false,						// 是否禁用clear按钮
        searchColumn: [1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
        lockBy: [26, 471],					// 锁定Grid，传入数组[top,left]
        onEnter: function () {
        }
    }}


};


$(function () {
    CtrLoinc.init();
});*/

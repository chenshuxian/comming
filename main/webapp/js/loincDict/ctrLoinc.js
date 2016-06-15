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


    $.extend(CtrLoinc,{

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
        searchHold: CB.SEARCHHOLDER.LOGICTABLE,


        validateSave: function () {
            var
                componentId = CtrLoinc.componentGrid.getValue(),
                testPropertyId = CtrLoinc.testPropertyGrid.getValue(),
                testMethodId = CtrLoinc.testMethodGrid.getValue(),
                typeOfScaleId = CtrLoinc.typeOfScaleGrid.getValue(),
                timeAspectId = CtrLoinc.timeAspectGrid.getValue(),
                sampleTypeId = CtrLoinc.sampleTypeGrid.getValue();


            if(BM.comboGrid(CtrLoinc.componentGrid,CB.COMBOMSG.COMPONENT,"cl_component")){
                return false;
            }

            if(BM.comboGrid(CtrLoinc.testPropertyGrid,CB.COMBOMSG.TESTPROPERTY,"cl_property")) {
                return false;
            }


            if(BM.comboGrid(CtrLoinc.testMethodGrid,CB.COMBOMSG.TESTMETHOD,"cl_testMethod")) {
                return false;
            }

            if(BM.comboGrid(CtrLoinc.typeOfScaleGrid,CB.COMBOMSG.TESTITEM,"cl_typeOfScale")) {
                return false;
            }


            if(BM.comboGrid(CtrLoinc.timeAspectGrid,CB.COMBOMSG.TIMEASPECT,"cl_timeAspect")) {
                return false;
            }


            if(BM.comboGrid(CtrLoinc.sampleTypeGrid,CB.COMBOMSG.SAMPLETYPE,"cl_sampleType")) {
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
                $("#cl_property input:text").select();
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
                $("#cl_testMethod input:text").select();
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
                $("#cl_typeOfScale input:text").select();
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
                $("#cl_timeAspect input:text").select();
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
                $("#cl_sampleType input:text").select();
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
                $("#cl_fastCode").focus();
            }
        }}
        /********************comboxGrid END*********************/

    });

    return CtrLoinc;

}(jQuery));

$(function(){
    CtrLoinc.init();
});

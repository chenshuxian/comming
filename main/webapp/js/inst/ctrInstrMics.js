/**
 * 中心仪器细菌对照
 * Created by chenshuxian
 * 2016/3/17.
 */
var CtrInstrMics = (function($){

    /* START render basicModule */
    CtrInstrMics = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.IMR,
        _tableList =  $("#" + _preId + "List"),
        _tableList2 = $("#" + _preId + "List2"),
        _hideCols = [],	//要穩藏的欄位
        _data = null,
        _module = "CtrInstrMics",
        _focusId = "name",
        _module2 = "CtrInstrMics2",
        _delBatUrl = ctx + "/pm/testItem/deleteTestItem",
        _existUrl = ctx + "/pm/testItem/findCount",
        _updateUrl =  ctx + "/pm/testItemGroup/saveOrEditTestItemGroup",
        _addUrl =  ctx + "/pm/testItemGroup/saveOrEditTestItemGroup",
        _changeStatusUrl = ctx + "/pm/testItem/modifyTestItemStatus",
        _InfoUrl = ctx + "/pm/testItemGroup/showAddOrEdit",
        _pageListUrl = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsList",
        //_exParams = {orderType:2},

    //url2
        _delBatUrl2 = ctx + "/pm/testItemGroup/delSingleItemBatch",
        _existUrl2 = ctx + "/basisDict/ctrCtrInstrMicsDetail/checkNameExisted",
        _addUrl2 = ctx + "/pm/testItemGroup/addOrRemoveItem",
        _InfoUrl2 = ctx + "/pm/testItemGroup/addSingleItemShow",
        _pageListUrl2 = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsList",
        _instrumentUrl = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsList",
        _optLeftUrl = ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddLeft',
        _optRightUrl = ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddRightList',
        _initHeight = ($(window).height() < 810) ? 240 : 300,




    /* START dataGrid 生成*/

    //first dataGrid
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId,
            height:_initHeight,
            isSecond:true
        },
        //CtrInstrMics dataGrid obj render
        _gridObj = dataGridM.init(_dgParams),

        _upgradeObj = {
            pagination: false
        },

        _gridObj = $.extend({},_gridObj,_upgradeObj),
        // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj),


        /* 加载结果描述 */

        _dgParams2 = {
            url:_pageListUrl2,
            data:_data,
            module:_module2,
            hideCols:_hideCols,
            tableList:_tableList2,
            height:_initHeight,
            preId:_preId,
            isSecond:true
        },

        //CtrInstrMics dataGrid obj render
        _gridObj2 = dataGridM.init(_dgParams2),
        _upgradeObj2 = {pagination: false};
        // render dataGrid
        _gridObj2 = CtrInstrMics.getNewParams(_gridObj2,_upgradeObj2);

        CtrInstrMics.dataGrid2 = _tableList2.datagrid(_gridObj2);

    var _columns = function() {

            var columns =  [[
                {field: "idString", checkbox: true, width: 30},
                {title: "编码", field: 'codeNo', width: 50},
                {title: "中文名称", field: 'name', flex: 1, width: 50},
                {title: "英文简称", field: 'enShortName', width: 50}
            ]];

            return columns;
        },

        //细菌例表添加钮点下后已包含
        _loadContainList = function() {

            CtrInstrMics.leftDG =   $("#addCheckProjectLeft").datagrid({
                url: _optLeftUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: '',itemTypeId: 1},
                height: _initHeight,
                fitColumns: true,
                striped: true,
                checkOnSelect: false,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                    $("#containSize").html(data.total);
                }
            });
        },

        //细菌例表添加钮点下后未包含
        _loadNoContainList = function() {

            CtrInstrMics.rightDG = $("#addCheckProjectRight").datagrid({
                url: _optRightUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: '',itemTypeId: 1},
                height: _initHeight,
                fitColumns: true,
                striped: true,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns()
            });
        },

        //抗生素添加钮点下后已包含
        _loadContainList2 = function() {

            CtrInstrMics.leftDG =   $("#addCheckProjectLeft").datagrid({
                url: _optLeftUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: '',itemTypeId: 2},
                height: _initHeight,
                fitColumns: true,
                striped: true,
                checkOnSelect: false,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                    $("#containSize").html(data.total);
                }
            });
        },

        //抗生素添加钮点下后未包含
        _loadNoContainList2 = function() {

            CtrInstrMics.rightDG = $("#addCheckProjectRight").datagrid({
                url: _optRightUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: '',itemTypeId: 2},
                height: _initHeight,
                fitColumns: true,
                striped: true,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns()
            });
        },

        //仪器 dataGrid
        _loadInsList = function() {
           $("#instrumentSelectList").datagrid({
               url: ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsPageList',
               method: CB.METHOD,
               height: _initHeight,
               fitColumns: true,
               striped: true,
               checkOnSelect: false,
               fit: false,
               columns: [[
                   {
                       field: 'idString',
                       formatter: function (value, row, index) {
                           return "<input type='radio' datagrid-row-index='" + index + "' name='instrument'>";
                       }
                   },
                   {title: "编码", field: 'codeNo', width: 80},
                   {title: "仪器名称", field: 'name', width: 100},
                   {title: "仪器型号", field: 'model', width: 100}
               ]],
               onClickCell: function (index, field) {
                   var rowData = $("#instrumentSelectList").datagrid('getData').rows[index],
                       instrumentId = rowData.idString,
                       instrumentName = rowData.name;
                   CtrInstrMics.instrumentId = instrumentId;
                   $("#instrumentName").text(instrumentName);
                   if (field == 'idString') {
                       return;
                   }
                   $("#imr_instrumentList input[type='radio']:eq(" + index + ")").click();
               },
               pagination: true,
               pageNumber: 1,
               pageSize: 10
           });
        };

    /* 仪器列表 */
    $("#" + _preId + "instrumentList").click(function () {

        var
            params = {
                url: _instrumentUrl,
                data: {},
                callback: function(){
                    _loadInsList();
                },
                //popArea: _initHeight,
                focusId: "instrumentSchStr"
            };

        CtrInstrMics.addPop(params);

    });

    // delete desc batch
    $("#" + _preId + "DeleteBatch2").click(function () {

        if (CtrInstrMics.parentStatus == 1) {
            showMessage("该单项所属的组合是启用状态，不允许删除!");
            return false;
        }

        var
            dgObj= CtrInstrMics.dataGrid2,
            ids = CtrInstrMics.getIds(dgObj),
            params = {
                dataGrid : dgObj,
                url: CtrInstrMics.delBatUrl2,
                data:{
                    testItemid:ids.join(","),
                    groupItemid:CtrInstrMics.parentId
                }
            };

        CtrInstrMics.deleteBetch(params);

    });

    /!* 項目列表新增 *!/
    $("#" + _preId + "Add2").click(function () {

        //if (RegionalManagement.parentStatus == true) {
        //    showMessage("当前选中机构已启用，不允许关联其他机构！");
        //    return;
        //}
        //RegionalManagement.currentEvent = "addRegional";

        var
            params = {
                url: _InfoUrl2,
                data: {testItemId: CtrInstrMics.parentId},
                callback: function(){
                    _loadContainList();
                    _loadNoContainList();
                },
                popArea: 810,
                focusId: "instrumentSearch"
            };

        CtrInstrMics.addPop(params);

    });

    $(window).on('resize', function () {
        //newcommonjs.tableAuto(CtrInstrMics.CtrInstrMicsTableList);
        var width = CtrInstrMics.tableList.parents('.tabs-panels').width() - 40;
        CtrInstrMics.tableList.datagrid('resize', {
            width: width
        });
        CtrInstrMics.tableList2.datagrid('resize', {
            width: width
        });
    });

    $.extend(CtrInstrMics,{

        preId:_preId,
        module:_module,
        parentId: null,
        //设定pop弹出框的大小
        popArea: 580,
        descSort: 0,
        focusId: _focusId,
        tableList:_tableList,
        tableList2:_tableList2,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        existUrl: _existUrl,
        updateUrl: _updateUrl,
        addUrl: _addUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,
        //exParams: _exParams,

        //dataGrid2 of Url
        delBatUrl2: _delBatUrl2,
        existUrl2: _existUrl2,
        addUrl2: _addUrl2,
        InfoUrl2: _InfoUrl2,
        pageListUrl2: _pageListUrl2,
        /*END url 定義*/
        dataGrid:_dataGrid,
        leftDG: null,
        rightDG: null,
        instrumentId: null,
        addTestItemIds:[],
        delTestItemIds:[],

        //默认标本类型Grid
        sampleTypeParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"sampleType", 				//对应表单DIV的id
            grid_id:"gridSampleType", 			//对应数据源Grid的Id
            name:"sampleTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 180, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
            }
        },



        validateSave: function() {

            var name = $.trim($("#name").val()); //组合名称
            //var sampleTypeId = $.trim($("#sampleTypeId option:selected").val());//默认样本类型
            var sampleTypeId = CtrInstrMics.sampleTypeGrid.getValue();
            var displayOrderId = "displayOrder";
            var regExp = /^[A-Z]+$/;
            var enShortName = $("#enShortName").val();//英文简称
            var enName = $("#enName").val();//英文名称
            var fastCode = $("#fastCode").val();//英文简称
            var displayOrder = $.trim($("#displayOrder").val()); //顺序號

            if(name == ""){
                showMessage("组合名称为空，请重新输入！",function(){
                    $("#name").focus();
                });
                return false;
            }
            if(sampleTypeId == ""){
                showMessage("默认标本类型为空，请重新输入！",function(){
                });
                return false;
            }

            if(validateDisplayOrder(displayOrderId)){
                return false;
            }
            if(displayOrder.length > 6){
                showMessage("顺序号最大长度为6位，请重新输入！",function(){
                    $("#displayOrder").focus();
                });
                return false;
            }

            if(enShortName != ""){
                if(!regExp.test(enShortName)){
                    showMessage("英文简称只能是大写字母，请重新输入！",function(){
                        $("#enShortName").focus();
                    });
                    return false;
                }
            }

            if(enName != ""){
                regExp = /^[a-z|A-Z|0-9]+$/;
                if(!regExp.test(enName)){
                    showMessage("英文名称只能是字母和数字，请重新输入！",function(){
                        $("#enName").focus();
                    });
                    return false;
                }
            }

            if(fastCode != ""){
                regExp = /^[A-Z|0-9]+$/;
                if(!regExp.test(fastCode)){
                    showMessage("助记符只能是大写字母和数字，请重新输入！",function(){
                        $("#fastCode").focus();
                    });
                    return false;
                }
            }
            return true;
        },

        searchObj: function () {
            return {
                searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
                status: $("#" + this.preId + "Status").val(),
                orderType: $("#" + this.preId + "Sort").val()
            };
        },

        addSuccess: function(data) {
            //console.log(data);
            var count = data.substring(5);
            if (count > 0) {
                //提示项目名称重复是否继续
                showConfirm("组合名称重复，是否继续？", function () {
                    BasicModule.add();
                });
                //项目名称没有重复，不提示直接保存
            } else {
                BasicModule.add();
            }

        },

        editSuccess: function(data) {
            var
                nameValidation = $.trim($("#oldName").val()),
                name = $.trim($("#name").val());

            if(nameValidation != name){
                //判断项目名称是否重复
                count = data.substring(5);
                if(count > 0){
                    //提示项目名称重复是否继续
                    showConfirm("组合名称重复，是否继续？",function(){
                        BasicModule.update();
                    });
                }else{
                    //修改数据
                    BasicModule.update();

                }
            }else{
                //修改数据
                BasicModule.update();
            }

        },


        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(CtrInstrMics.rowData);
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                id: rowData.stringId,
                name: rowData.name,
                oldName: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                codeNo: rowData.codeNo,
                opType: 'edit'
            });
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;
            if (rowData.isIndividualStat == '1') {
                $("#isIndividualStat").attr("checked", 'true');
            }

        },

        reloadDG2: function(row) {

            this.parentId = row.stringId;
            BasicModule.parentStatus = row.status;
            CtrInstrMics.dataGrid2.datagrid('reload', {testItemId: row.stringId});

        },


        //editResultDesc: function (rowData) {
        //
        //    var url = _InfoUrl2,
        //        callback = function(){
        //
        //            $("#InfoForm").form("load", {
        //                resultValue: rowData.resultValue,
        //                displayOrder: rowData.displayOrder,
        //                id: rowData.stringId,
        //                fastCode: rowData.fastCode,
        //                opType: 'edit',
        //                typeId: CtrInstrMics.typeId
        //            });
        //            CtrInstrMics.oldResultValue = rowData.resultValue;
        //
        //        },
        //        params = {
        //            url: url,
        //            callback: callback
        //        };
        //
        //    this.editRow(rowData,params);
        //
        //},

        editRowEx: function(rowData) {

            var params = {
                BCB: true
            };
            this.editRow(rowData,params);
        },

        changeStatusEx: function(index,rowData) {

            var type,params;
            type = rowData.status.toString();

            if(type = "1")
                type = "0";
            else
                type = "1";

            params = {
                data:
                {
                    testItemid: rowData.stringId,
                    type: type
                }
            };

            this.changeStatus(index,rowData,params)


        },

        deleteRowEx: function(index,rowData) {

            var params = {
                data:{testItemid: rowData.stringId}
            };

            this.deleteRow(index,rowData,params);
        },

        //第二个grid中的删除钮
        deleteRowEx2: function(index,rowData) {

            var params = {
                data:{
                    testItemid: rowData.stringId,
                    groupItemid:this.parentId
                },
                url:this.delUrl2,
                dataGrid:this.dataGrid2
            };

            this.deleteRow(index,rowData,params);
        },
        //修改新增和修改时传送出的data资料
        dataUpgrade: function(){

            var params,data;
            data = $("#InfoForm").serialize();
            if($("#isIndividualStat").prop("checked")){
                data +="&isIndividualStat=1";
            }else{
                data +="&isIndividualStat=0";
            }
            data += "&sampleTypeName=" + CtrInstrMics.sampleTypeGrid.getText();

            params = {
                data: data
            };

            this.editDictCode(params);
        }

        /*callback function area end*/

    });

    return CtrInstrMics;


}(jQuery));

$(function(){

    var _preId = CB.PREID.TIG;
    CtrInstrMics.init();
    //删除预设事件
    $("#" + _preId + "Add").unbind();
    $("#" + _preId + "Add").on("click",function() {
        var params = {
            BCB: true
        };
        CtrInstrMics.addPop(params);
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").unbind();
    $("#" + _preId + "DeleteBatch").on("click",function() {
        var params,ids;
        ids = CtrInstrMics.getIds();
        params = {
            data: {testItemid: ids.join(",")}
        }
        CtrInstrMics.deleteBetch(params);
    });
});
//var imr_canStore = true;
//var imr_addTestItemIds = "";
//var imr_delTestItemIds = "";
//
////加载数据列表相关变量
//var imr_instrumentItemList;
//var imr_instrumentAntiList;
//var imr_instrumentSelectList;
//var imr_addInstrumentItemLeft;
//var imr_addInstrumentItemRight;
//var imr_addInstrumentItemBtn;
//var imr_removeInstrumentItemBtn;
////抗生素添加
//var imr_addInstrumentAntiLeft;
//var imr_addInstrumentAntiRight;
//var imr_addInstrumentAntiBtn;
//var imr_removeInstrumentAntiBtn;
//
//$(function() {
//	imr_instrumentItemList = $('#imr_instrumentItemList');
//	imr_instrumentAntiList = $('#imr_instrumentAntiList');
//	imr_instrumentSelectList = $('#imr_instrumentSelectList');
//	imr_addInstrumentItemLeft = $('#imr_addInstrumentItemLeft');
//	imr_addInstrumentItemRight = $('#imr_addInstrumentItemRight');
//
//	imr_addInstrumentAntiLeft = $('#imr_addInstrumentAntiLeft');
//	imr_addInstrumentAntiRight = $('#imr_addInstrumentAntiRight');
//	//绑定前台通讯类、状态单击事件
//	$('#imr_ul_frontClass li').click(function(){
//	    $("#imr_frontClass").html($(this).html());
//	    $("#imr_frontClass").attr("value",$(this).attr("value"));
//	    imr_queryInstruments();
//	});
//	$('#imr_ul_status li').click(function(){
//	    $("#imr_status").html($(this).html());
//	    $("#imr_status").attr("value",$(this).attr("value"));
//	    imr_queryInstruments();
//	});
//
//	//绑定仪器细菌对照列表事件开始
//	imr_instrumentItemListOpt.onClickCell=imr_onClickCell;
//	imr_instrumentItemList.datagrid(imr_instrumentItemListOpt); //绑定仪器细菌对照列表事件结束
//
//	//绑定选中抗生素参考值列表开始
//	imr_instrumentAntiListOpt.onClickCell=imr_onClickCell2;
//    imr_instrumentAntiList.datagrid(imr_instrumentAntiListOpt); //抗生素列表结束
//
//    //绑定仪器选择列表开始
//    $(document).on('click', '.J_instrumentList', function() {
////	    imr_instrumentSelectList.datagrid(imr_instrumentSelectListOpt).pagination(imr_defaultPageOpt);
//	    imr_queryInstruments(1);
//	}); //绑定仪器选择列表事件结束
////添加细菌按钮
//	$(document).on('click', '.J_addInstrumentGerm', function (e) {
//		//先检查是否已选仪器
//		var instrumentId = $("#imr_instrumentId").val();
//		if (instrumentId == '') {
//			showMessage("请选择仪器");
//			return;
//		}
//		showPop(e); //弹出窗口
//
//		var queryParams = imr_addInstrumentItemLeftOpt.queryParams;
//		if (queryParams == undefined) {
//			queryParams = [];
//		}
//		queryParams.instrumentId = instrumentId;
//		queryParams.itemTypeId=1;
//		imr_addInstrumentItemLeftOpt.queryParams = queryParams;
//
//		var queryParams2 = imr_addInstrumentItemRightOpt.queryParams;
//		if (queryParams2 == undefined) {
//			queryParams2 = [];
//		}
//		queryParams2.instrumentId = instrumentId;
//		queryParams2.itemTypeId=1;
//		imr_addInstrumentItemRightOpt.queryParams = queryParams2;
//	    imr_addInstrumentItemLeft.datagrid(imr_addInstrumentItemLeftOpt);
//	    imr_addInstrumentItemRight.datagrid(imr_addInstrumentItemRightOpt);
//
//	});
//
//	//绑定抗生素添加按钮事件
//	$(document).on('click', '.J_instAntiDescAdd', function (e) {
//		//先检查是否已选仪器
//		var instrumentId = $("#imr_instrumentId").val();
//		if (instrumentId == '') {
//			showMessage("请选择仪器");
//			return;
//		}
//		showPop(e); //弹出窗口
//		var queryParams = imr_addInstrumentAntiLeftOpt.queryParams;
//		if (queryParams == undefined) {
//			queryParams = [];
//		}
//		queryParams.instrumentId = instrumentId;
//		queryParams.itemTypeId=2;
//		imr_addInstrumentAntiLeftOpt.queryParams = queryParams;
//
//		var queryParams2 = imr_addInstrumentAntiRightOpt.queryParams;
//		if (queryParams2 == undefined) {
//			queryParams2 = [];
//		}
//		queryParams2.instrumentId = instrumentId;
//		queryParams2.itemTypeId=2;
//		imr_addInstrumentAntiRightOpt.queryParams = queryParams2;
//	    imr_addInstrumentAntiLeft.datagrid(imr_addInstrumentAntiLeftOpt);
//	    imr_addInstrumentAntiRight.datagrid(imr_addInstrumentAntiRightOpt);
//
//	    //设置已包含的个数
//	    $("#imr_containAntiCount").text(imr_addInstrumentAntiLeft.datagrid("getData").total);
//	});
//
//	$("#imr_testMethodId").combobox({onChange: function () {
//		imr_queryTestItems();
//	}});
//});
//
////处理可编辑的单元格
//$.extend($.fn.datagrid.methods, {
//	editCell : function(jq, param) {
//		return jq.each(function() {
//			var opts = $(this).datagrid("options");
//			var fields = $(this).datagrid('getColumnFields', true).concat(
//					$(this).datagrid('getColumnFields'));
//			for (var i = 0; i < fields.length; i++) {
//				var col = $(this).datagrid('getColumnOption', fields[i]);
//				col.editor1 = col.editor;
//				if (fields[i] != param.field) {
//					col.editor = null;
//				}
//			}
//			$(this).datagrid("beginEdit", param.index);
//
//			for (var i = 0; i < fields.length; i++) {
//				var col = $(this).datagrid('getColumnOption', fields[i]);
//				col.editor = col.editor1;
//			}
//		});
//	}
//});
//
//
//var imr_editIndex = undefined;
//var imr_curIndex = -1;
//function imr_endEditing() {
//	if (imr_editIndex == undefined) {
//		return true;
//	}
//	if (imr_instrumentItemList.datagrid('validateRow', imr_editIndex)) {
//		imr_instrumentItemList.datagrid('endEdit', imr_editIndex);
//		imr_editIndex = undefined;
//		return true;
//	}
//	return false;
//}
//var imr_editIndex2 = undefined;
//var imr_curIndex2 = -1;
//function imr_endEditing2() {
//	if (imr_editIndex2 == undefined) {
//		return true;
//	}
//	if (imr_instrumentAntiList.datagrid('validateRow', imr_editIndex2)) {
//		imr_instrumentAntiList.datagrid('endEdit', imr_editIndex2);
//		imr_editIndex2 = undefined;
//		return true;
//	}
//	return false;
//}
///**.
// * 点击细菌列表的单元格事件
// * @param index
// * @param field
// */
//function imr_onClickCell(index, field) {
//	if (imr_endEditing()) {
//		imr_instrumentItemList.datagrid('selectRow', index).datagrid('editCell', {
//			index : index,
//			field : field
//		});
//		//如果是可编辑的框，获得焦点
//		var editor = imr_instrumentItemList.datagrid('getEditor', {index: index, field: field});
//	    if (editor != null) {
//	    	editor.target.focus();
//	    }
////		if (imr_curIndex != index) { //重复点击当前行，不重新加载（根据情况选择是否加该判断）
//			var rowData = imr_instrumentItemList.datagrid('getData').rows[index];
//			var testItemId = rowData.testItemId;
//			$("#imr_testItemId").val(testItemId);
//
//			//触发查询
////			imr_queryItemRefrange();
////		}
//		imr_curIndex = index;
//		imr_editIndex = index;
//	}
//}
///**.
// * 点击抗生素列表的单元格事件
// * @param index
// * @param field
// */
//function imr_onClickCell2(index, field) {
//	if (imr_endEditing2()) {
//		imr_instrumentAntiList.datagrid('selectRow', index).datagrid('editCell', {
//			index : index,
//			field : field
//		});
//		//如果是可编辑的框，获得焦点
//		var editor = imr_instrumentAntiList.datagrid('getEditor', {index: index, field: field});
//	    if (editor != null) {
//	    	editor.target.focus();
//	    }
//		imr_curIndex2 = index;
//		imr_editIndex2 = index;
//	}
//}
///**.
// * 选择仪器页面的“确定”按钮事件
// */
//function imr_comfirmInstrumentSlt(e){
//	var selectRow = $("#imr_instrumentList input[type='radio']:checked");
//	if (selectRow == undefined || selectRow.length <= 0) {
//		showMessage("请先选择一个仪器");
//		return;
//	}
//	var index = $(selectRow).attr("datagrid-row-index");
//	var rowData = imr_instrumentSelectList.datagrid('getData').rows[index];
//
//	var instrumentId = rowData.idString;
//	var instrumentName = rowData.name;
//	$("#imr_instrumentId").val(instrumentId);
//	$("#imr_instrumentName").text(instrumentName);
//	//关闭窗口
//	imr_closePop(e);
//	//触发查询
//	imr_queryInstrumentItems();
//}
//
///**.
// * 按条件查询仪器
// */
//function imr_queryInstruments(init){
//	if(init==1){
//
//		$("#imr_frontClass").html('全部');
//	    $("#imr_frontClass").attr("value","2");
//	    $("#imr_status").html('全部');
//	    $("#imr_status").attr("value","2");
//	    $("#imr_instrumentSchStr").val('');
//	}
//	var queryParams = imr_instrumentSelectListOpt.queryParams;
//	if (queryParams == undefined) {
//		queryParams = [];
//	}
//	var frontClassName=$("#imr_frontClass").attr("value");
//	var status=$("#imr_status").attr("value");
//	queryParams.searchStr = $("#imr_instrumentSchStr").val();
//	queryParams.frontClassName = frontClassName;
//	queryParams.status = status;
//	queryParams.typeId = 1;
//	imr_instrumentSelectListOpt.queryParams = queryParams;
//	imr_instrumentSelectList.datagrid(imr_instrumentSelectListOpt).pagination(imr_defaultPageOpt);
//}
//
//function imr_queryTestItems(itemTypeId){
//	var instrumentId = $("#imr_instrumentId").val();
//	if(itemTypeId==1){
//		var opts = imr_addInstrumentItemRight.datagrid("options");
//		var queryParams = opts.queryParams;
//		if (queryParams == undefined) {
//			queryParams = [];
//
//		}
//		queryParams.itemTypeId = itemTypeId;
//		queryParams.instrumentId = instrumentId;
//		queryParams.addGermSearchStr = $("#imr_itemSchStr").val();
//		//opts.queryParams = queryParams;
//		imr_addInstrumentItemRight.datagrid(opts);
//	}else{
//		var opts2 = imr_addInstrumentAntiRight.datagrid("options");
//		var queryParams2 = opts2.queryParams;
//		if (queryParams2 == undefined) {
//			queryParams2 = [];
//		}
//		queryParams2.itemTypeId = itemTypeId;
//		queryParams2.instrumentId = instrumentId;
//		queryParams2.addAntiSearchStr = $("#imr_AntiSchStr").val();
//		imr_addInstrumentAntiRight.datagrid(opts2);
//	}
//
//}
///**.
// * 查询选中仪器下的细菌、抗生素
// */
//function imr_queryInstrumentItems(itemTypeId){
//
//	//当前选中的仪器
//
//	var instrumentId = $("#imr_instrumentId").val();
//	if (instrumentId == '') { //没有仪器，不执行查询
//		return;
//	}
//
//	//细菌
//	var opts = imr_instrumentItemList.datagrid("options");
//	opts.url = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsList";
//	var queryParmas = opts.queryParams;
//	queryParmas.instrumentId = instrumentId;
//	queryParmas.itemTypeId = 1;
//	imr_instrumentItemList.datagrid(opts);
//	//抗生素
//	var opts2 = imr_instrumentAntiList.datagrid("options");
//	opts2.url = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsList";
//	var queryParmas2 = opts2.queryParams;
//	queryParmas2.instrumentId = instrumentId;
//	queryParmas2.itemTypeId = 2;
//	imr_instrumentAntiList.datagrid(opts2);
//	return;
//
//
//
//
//}
//
//function imr_queryItemRefrange(){
//
//	//加载当前仪器项目的参考范围
//	var opts = imr_instrumentAntiList.datagrid("options");
//	opts.url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeList";
//	//当前选中的仪器
//	var instrumentId = $("#imr_instrumentId").val();
//	if (instrumentId == '') { //没有仪器，不执行查询
//		return;
//	}
//	//当前选中的仪器项目
//	var testItemId = $("#imr_testItemId").val();
//	if (testItemId == '') { //没有仪器项目，不执行查询
//		return;
//	}
//	//获取当前选中排序值
//	var orderBy = $(".J_itemRefrangeOrder > li.selected").val();
//	var queryParams = opts.queryParams;
//	if (queryParams == undefined) {
//		queryParams = [];
//	}
//	queryParams.orderBy = orderBy;
//	queryParams.testItemId = testItemId;
//	queryParams.instrumentId = instrumentId;
//
//	imr_instrumentAntiList.datagrid(opts);
//}
//function imr_editRefrange(index, event){
//	var rowData = imr_instrumentAntiList.datagrid("getData").rows[index];
//	var id = rowData.idString;
//	$("#imr_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeEdit");
//	imr_findRefrangeInfo(id, true);
//}
//function imr_copyRefrange(index, event){
//	var rowData = imr_instrumentAntiList.datagrid("getData").rows[index];
//	var id = rowData.idString;
//	$("#imr_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
//	imr_findRefrangeInfo(id, false);
//}
///*function imr_findRefrangeInfo(id, isEdit){
//
//	//从后台查出最新数据
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeInfo",
//		"type" : "POST",
//		data: {id: id},
//		"success" : function(data) {
//			var entity = data.entity;
//			if(entity.idString == ''){
//				// 有重叠
//				showMessage('数据不存在或已被删除！',function(){
//					//刷新列表
//					imr_queryInstrumentItems();
//				});
//			} else {
//				imr_setRefrangeInfo(entity, isEdit);
//			}
//		},
//		"error" : function() {
//		}
//	});
//}*/
///*function imr_setRefrangeInfo(rowData, isEdit){
//	//打开页面
//	dialog("imr_instrumentRefrangeAdd", {
//        width: 420
//    }, function(){
//    	if (isEdit) {
//    		$("#imr_refrangeId").val(rowData.idString);
//    	}
//    	var sampleTypeId = rowData.sampleTypeId;
//    	if ($('#imr_sampleTypeId').find("option[value='"+sampleTypeId+"']").length == 0) {
//    		$('#imr_sampleTypeId').combobox('setValue', '['+rowData.sampleTypeName+']停用');
//    	} else {
//    		$('#imr_sampleTypeId').combobox('setValue', sampleTypeId+'');
//    	}
//    	var sexId = rowData.sexId;
//    	if ($('#imr_sexId').find("option[value='"+sexId+"']").length == 0) {
//    		$('#imr_sexId').combobox('setValue', '['+rowData.sexName+']停用');
//    	} else {
//    		$('#imr_sexId').combobox('setValue', sexId+'');
//    	}
//    	var ageUnitId = rowData.ageUnitId;
//    	if ($('#imr_ageUnitId').find("option[value='"+ageUnitId+"']").length == 0) {
//    		$('#imr_ageUnitId').combobox('setValue', '['+rowData.ageUnitName+']停用');
//    	} else {
//    		$('#imr_ageUnitId').combobox('setValue', ageUnitId+'');
//    	}
//
//    	$('#imr_sexId').combobox('setValues', rowData.sexId+'');
//    	$('#imr_ageUnitId').combobox('setValues', rowData.ageUnitId+'');
//    	$("#imr_ageMin").numberbox('setValue', rowData.ageMin);
//    	$("#imr_ageMax").numberbox('setValue', rowData.ageMax);
//
////    	$("#imr_sampleTypeId").val(rowData.sampleTypeId);
////    	$("#imr_sexId").val(rowData.sexId);
////    	$("#imr_ageUnitId").val(rowData.ageUnitId);
////    	$("#imr_ageMin").val(rowData.ageMin);
////    	$("#imr_ageMax").val(rowData.ageMax);
//    	$("#imr_calcAgeMin").val(rowData.calcAgeMin);
//    	$("#imr_calcAgeMax").val(rowData.calcAgeMax);
//    	$("#imr_refLow").val(rowData.refLow);
//    	$("#imr_refHigh").val(rowData.refHigh);
//    	$("#imr_panicLow").val(rowData.panicLow);
//    	$("#imr_panicHigh").val(rowData.panicHigh);
//    	$("#imr_alarmLow").val(rowData.alarmLow);
//    	$("#imr_alarmHigh").val(rowData.alarmHigh);
//    	$("#imr_refText").val(rowData.refText);
//    	$("#imr_refRemark").val(rowData.refRemark);
//    });
//}*/
///* 删除行 */
///*function imr_deleteDescRow(index) {
//	var id = imr_instrumentAntiList.datagrid("getData").rows[index].idString;
//
//	//进入后台删除
//	showConfirm('是否删除当前记录？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeDelete",
//			"type" : "GET",
//			data: "id="+id,
//			"success" : function(data) {
//				//从页面中删除
//				imr_instrumentAntiList.datagrid("deleteRow", index);
//			},
//			"error" : function() {
//			}
//		});
//	});
//}*/
//
//function imr_closePop(e){
//	$(e).parents('.pop').hide();
//}
//function imr_closeRefPop(){
//	//先清空页面数据
//	imr_clearRefrangeInfo();
//	//关掉
//	$("#imr_instrumentRefrangeAdd").hide();
//	return false;
//}
//function imr_saveInstDesc(){
//	//防止重复提交
//    if(!imr_canStore){
// 		return false;
//    }
//
//	formTextTrim("imr_instRefAddForm");
//	//处理掉不可用的数据
//	var sampleTypeId = $('#imr_sampleTypeId').combobox('getValue');
//	//如果下拉框里没有该数据，清空
//	if ($("#imr_sampleTypeId > option[value='"+sampleTypeId+"']").length == 0) {
//		$('#imr_sampleTypeId').combobox('setValue', "");
//	}
//	var ageUnitId = $('#imr_ageUnitId').combobox('getValue');
//	//如果下拉框里没有该数据，清空
//	if ($("#imr_ageUnitId > option[value='"+ageUnitId+"']").length == 0) {
//		$('#imr_ageUnitId').combobox('setValue', "");
//	}
//	var sexId = $('#imr_sexId').combobox('getValue');
//	//如果下拉框里没有该数据，清空
//	if ($("#imr_sexId > option[value='"+sexId+"']").length == 0) {
//		$('#imr_sexId').combobox('setValue', "");
//	}
//	if(!imr_validateRefrangeSave()){
//		imr_canStore = true;
//		return;
//	}
//
//	var instrumentId = $("#imr_instrumentId").val();
//	var testItemId = $("#imr_testItemId").val();
//	var formData = $("#imr_instRefAddForm").serialize() + "&instrumentId="+instrumentId+"&testItemId="+testItemId;
//
//	// 检查是否年龄段重叠
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemIfOverlap",
//		"type" : "POST",
//		data:formData,
//		"success" : function(data) {
//			if(data.indexOf("err|") == 0){
//				// 有重叠
//				showMessage('相同的样本类型、性别、年龄单位情况下，年龄段范围不可以重叠！',function(){
//					imr_canStore = true;
//					$("#imr_ageMin").focus();
//				});
//			} else {
//				// 无重叠，继续
//				imr_doAddRefrange(formData);
//			}
//		},
//		"error" : function() {
//		}
//	});
//}
//
//function imr_doAddRefrange(formData){
//	var actionUrl = $("#imr_refrangeActionUrl").val();
////	var actionUrl = $("#imr_instRefAddForm").attr("action");
//	if (actionUrl == '') {
//		actionUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd";
//	}
//	imr_canStore = false;
//	$.ajax({
//		url: actionUrl,
//		type: "POST",
//		data:formData,
//
//		success : function(data) {
//			imr_canStore = true;
//			resolutionData(data);
//			$("#imr_saveInstrumentRefrange").parents('.pop').hide();
//			imr_queryItemRefrange();//刷新list
//			//清空项目参考范围添加页面的数据
//			imr_clearRefrangeInfo();
//		},
//		error : function() {
//			imr_canStore = true;
//		}
//	});
//}
///**
// * 验证保存的必填条件
// * return
// */
//function imr_validateRefrangeSave(){
//	var ageUnitId = $("#imr_ageUnitId").val();
//	var ageMin = $("#imr_ageMin").val();
//	var ageMax = $("#imr_ageMax").val();
//
//	if(ageMin == ''){
//		showMessage('起始年龄为空，请重新输入！',function(){
//			$("#imr_ageMin").focus();
//		});
//		return false;
//	}
//	if(ageMax == ''){
//		showMessage('结束年龄为空，请重新输入！',function(){
//			$("#imr_ageMax").focus();
//		});
//		return false;
//	}
//	if(ageUnitId!='6' && isNaN(ageMin)){
//		showMessage('年龄单位不是【详细年龄】，起始年龄请输入数字！',function(){
//			$("#imr_ageMin").focus();
//		});
//		return false;
//	}
//	if(ageUnitId!='6' && isNaN(ageMax)){
//		showMessage('年龄单位不是【详细年龄】，结束年龄请输入数字！',function(){
//			$("#imr_ageMax").focus();
//		});
//		return false;
//	}
//	if(ageUnitId!='6' && ageMax>200){
//		showMessage('结束年龄要求小于200，请重新输入！',function(){
//			$("#imr_ageMax").focus();
//		});
//		return false;
//	}
//
//	return true;
//}
//
//function imr_clearRefrangeInfo(){
//	$("#imr_instRefAddForm")[0].reset();
//	$("#imr_refrangeId").val("");
//	$('#imr_sampleTypeId').combobox('setValue', '');
//	$('#imr_ageUnitId').combobox('setValue', '');
//	$('#imr_sexId').combobox('setValue', '');
//}
//
////批量删除参考值
//function imr_deleteRefrangeBatch(){
//	var ids = "";
//	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
//
//	var sltedRowDatas = imr_instrumentAntiList.datagrid("getChecked");
//	if (sltedRowDatas == undefined || sltedRowDatas.length <= 0) {
//		showMessage("请选择要删除的参考值！");
//		return false;
//	}
//	for (var i in sltedRowDatas) {
//		ids2 += sltedRowDatas[i].idString + ",";
//	}
//
//	showConfirm('是否删除所选中的参考值？',function(){
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsRegrangeDeleteBatch",
//			"type" : "GET",
//			data:"ids="+ids2,
//			"success" : function(data) {
//				//resolutionData(data);
//				imr_queryItemRefrange();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
////批量删除细菌
//function imr_deleteItemBatch(itemTypeId){
//	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
//	var sltedRowDatas ;
//	var firmStr="";
//	if(itemTypeId==1){
//		firmStr='是否删除所选中的细菌？';
//		sltedRowDatas = imr_instrumentItemList.datagrid("getChecked");
//		if (sltedRowDatas == undefined || sltedRowDatas.length <= 0) {
//			showMessage("请选择要删除的细菌！");
//			return false;
//		}
//	}else{
//		firmStr='是否删除所选中的抗生素？';
//		sltedRowDatas = imr_instrumentAntiList.datagrid("getChecked");
//		if (sltedRowDatas == undefined || sltedRowDatas.length <= 0) {
//			showMessage("请选择要删除的抗生素！");
//			return false;
//		}
//	}
//
//	for (var i in sltedRowDatas) {
//		ids2 += sltedRowDatas[i].id + ",";
//	}
//
//	showConfirm(firmStr,function(){
//		$.ajax({
//			url : ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsDeleteBatch",
//			"type" : "POST",
//			data:{ids:ids2},
//			"success" : function(data) {
//				resolutionData(data);
//				imr_queryInstrumentItems();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
///*获取数据行*/
//function imr_makeToArray(obj) {
//    return Array.prototype.slice.call(obj);
//}
//
///*细菌左右数据切换*/
//imr_addInstrumentItemBtn = $('#imr_addInstrumentItemBtn');
//imr_removeInstrumentItemBtn = $('#imr_removeInstrumentItemBtn');
////细菌左移按钮事件
//imr_addInstrumentItemBtn.on('click', function () {
//    var addInstrumentItemData = imr_addInstrumentItemRight.datagrid('getChecked');
//
//    if (addInstrumentItemData == undefined || addInstrumentItemData.length <= 0) {
//    	showMessage("请选择要添加的项目！");
//    	return;
//    }
//    imr_makeToArray(addInstrumentItemData).forEach(function (element, index) {
//        var rowIndex = imr_addInstrumentItemRight.datagrid("getRowIndex", element);
//        imr_addInstrumentItemRight.datagrid('deleteRow', rowIndex);
//        imr_addInstrumentItemLeft.datagrid('appendRow', element);
//        var id = element.idString;
//        imr_delTestItemIds = imr_delTestItemIds.replace(id+",", ''); //删除的id中去掉该id
//        imr_addTestItemIds += id + ","; //新增的id中加上该id
//    });
//});
////细菌右移移按钮事件
//imr_removeInstrumentItemBtn.on('click', function () {
//    var removeInstrumentItemData = imr_addInstrumentItemLeft.datagrid('getChecked');
//    if (removeInstrumentItemData == undefined || removeInstrumentItemData.length <= 0) {
//    	showMessage("请选择要移除的细菌！");
//    	return;
//    }
//    imr_makeToArray(removeInstrumentItemData).forEach(function (element, index) {
//        var rowIndex = imr_addInstrumentItemLeft.datagrid("getRowIndex", element);
//        imr_addInstrumentItemLeft.datagrid('deleteRow', rowIndex);
//        imr_addInstrumentItemRight.datagrid('appendRow', element);
//        var id = element.idString;
//        imr_addTestItemIds = imr_addTestItemIds.replace(id+",", ''); //新增的id中去掉该id
//        imr_delTestItemIds += id + ","; //删除的id中加上该id
//    });
//});
///////////////////////////////////////////////////////////////////////////////////////////////////////
///*抗生素左右数据切换*/
//imr_addInstrumentAntiBtn = $('#imr_addInstrumentAntiBtn');
//imr_removeInstrumentAntiBtn = $('#imr_removeInstrumentAntiBtn');
////抗生素左移按钮事件
//imr_addInstrumentAntiBtn.on('click', function () {
//    var addInstrumentAntiData = imr_addInstrumentAntiRight.datagrid('getChecked');
//
//    if (addInstrumentAntiData == undefined || addInstrumentAntiData.length <= 0) {
//    	showMessage("请选择要添加的抗生素！");
//    	return;
//    }
//    imr_makeToArray(addInstrumentAntiData).forEach(function (element, index) {
//        var rowIndex = imr_addInstrumentAntiRight.datagrid("getRowIndex", element);
//        imr_addInstrumentAntiRight.datagrid('deleteRow', rowIndex);
//        imr_addInstrumentAntiLeft.datagrid('appendRow', element);
//        var id = element.idString;
//        imr_delTestItemIds = imr_delTestItemIds.replace(id+",", ''); //删除的id中去掉该id
//        imr_addTestItemIds += id + ","; //新增的id中加上该id
//    });
//});
////抗生素右移移按钮事件
//imr_removeInstrumentAntiBtn.on('click', function () {
//    var removeInstrumentAntiData = imr_addInstrumentAntiLeft.datagrid('getChecked');
//    if (removeInstrumentAntiData == undefined || removeInstrumentAntiData.length <= 0) {
//    	showMessage("请选择要移除的抗生素！");
//    	return;
//    }
//    imr_makeToArray(removeInstrumentAntiData).forEach(function (element, index) {
//        var rowIndex = imr_addInstrumentAntiLeft.datagrid("getRowIndex", element);
//        imr_addInstrumentAntiLeft.datagrid('deleteRow', rowIndex);
//        imr_addInstrumentAntiRight.datagrid('appendRow', element);
//        var id = element.idString;
//        imr_addTestItemIds = imr_addTestItemIds.replace(id+",", ''); //新增的id中去掉该id
//        imr_delTestItemIds += id + ","; //删除的id中加上该id
//    });
//});
//////////////////////////////////////////////////////////////////////////////////////////////////////
////添加页面，点击确定
//function imr_confirmInstrumentItemAdd(e,itemTypeId){
//	if((imr_addTestItemIds!=null && imr_addTestItemIds!='')
//		|| (imr_delTestItemIds!=null && imr_delTestItemIds!='')){
//		// 提交
//		var instrumentId = $("#imr_instrumentId").val();
//		var data = "instrumentId="+instrumentId+"&itemTypeId="+itemTypeId+"&addMicsIds="+imr_addTestItemIds+"&delMicsIds="+imr_delTestItemIds;
//		$.ajax({
//			"url" : ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddBatch",
//			"type" : "GET",
//			data:data,
//			"success" : function(data) {
//				//清空数据
//				imr_addTestItemIds = "";
//				imr_delTestItemIds = "";
//				imr_closePop(e);
//				imr_queryInstrumentItems(itemTypeId);//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	} else {
//		//清空数据
//		imr_addTestItemIds = "";
//		imr_delTestItemIds = "";
//		imr_closePop(e);
//	}
//}
//
//
//// 保存细菌列表
//function imr_saveItemList() {
//	//所有输入框结束编辑
//	imr_endEditing();
//	// 防止重复提交
//	if (!imr_canStore) {
//		return false;
//	}
//	// 空表格直接返回
//	var rowData = imr_instrumentItemList.datagrid('getData');
//	if (rowData == undefined || imr_instrumentItemList.datagrid('getData').total == 0) {
//		showMessage("没有可保持的数据");
//		imr_canStore = true;
//		return false;
//	}
//	imr_canStore = false;
//	//组装数据
//	var rows = rowData.rows;
//	var formData = [];
//	for (var i in rows) {
//		var row = rows[i];
//		var id = row.id;
//		var channelCode = row.channelCode;
//		var printOrder = row.printOrder;
//		formData.push({name: "txtIdGerm", value: id});
//		formData.push({name: "txtChannelCodeGerm", value: channelCode});
//		formData.push({name: "txtPrintOrderGerm", value: printOrder});
//	}
//	formData.push({name: "itemTypeId", value: 1});
//	var instrumentId = $("#imr_instrumentId").val();
//	formData.push({name: "instrumentId", value: instrumentId});
////	alert(alert(JSON.stringify(formData)));
//	// 栏位校验
//	if (!imr_validateItemSave(rows)) {
//		imr_canStore = true;
//		return;
//	}
//	// 修改
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsSave",
//		"type" : "POST",
//		data : formData,
//		"success" : function(data) {
//			imr_canStore = true;
////			showMessage("保存成功", function(){
////
////			});
//			resolutionData(data);
//			//刷新列表
//			imr_queryInstrumentItems();
//		},
//		"error" : function() {
//			imr_canStore = true;
//		}
//	});
//}
////保存抗生素列表
//function imr_saveAntiList() {
//	//所有输入框结束编辑
//	imr_endEditing2();
//	// 防止重复提交
//	if (!imr_canStore) {
//		return false;
//	}
//	// 空表格直接返回
//	var rowData = imr_instrumentAntiList.datagrid('getData');
//	if (rowData == undefined || imr_instrumentAntiList.datagrid('getData').total == 0) {
//		showMessage("没有可保持的数据");
//		imr_canStore = true;
//		return false;
//	}
//	imr_canStore = false;
//	//组装数据
//	var rows = rowData.rows;
//	var formData = [];
//	for (var i in rows) {
//		var row = rows[i];
//		var id = row.id;
//		var channelCode = row.channelCode;
//		var printOrder = row.printOrder;
//		formData.push({name: "txtIdAnti", value: id});
//		formData.push({name: "txtChannelCodeAnti", value: channelCode});
//		formData.push({name: "txtPrintOrderAnti", value: printOrder});
//	}
//	formData.push({name: "itemTypeId", value: 2});
//	var instrumentId = $("#imr_instrumentId").val();
//	formData.push({name: "instrumentId", value: instrumentId});
////	alert(alert(JSON.stringify(formData)));
//	// 栏位校验
//	if (!imr_validateItemSave(rows)) {
//		imr_canStore = true;
//		return;
//	}
//	// 修改
//	$.ajax({
//		"url" : ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsSave",
//		"type" : "POST",
//		data : formData,
//		"success" : function(data) {
//			imr_canStore = true;
//			/*showMessage("保存成功", function(){
//				//刷新列表
//				imr_queryInstrumentItems();
//			});*/
//			resolutionData(data);
//			//刷新列表
//			imr_queryInstrumentItems();
//		},
//		"error" : function() {
//			imr_canStore = true;
//		}
//	});
//}
///**
// * 验证保存的必填条件 return
// */
//function imr_validateItemSave(rows) {
////	alert(JSON.stringify(rows));
//	var bRet = true;
//	// 通道码
//	var channelCodeString = "";
//	var channelCodeObj={};
//	for (var i in rows) {
//		var row = rows[i];
//		var channelCode = row.channelCode;
//		var printOrder = row.printOrder;
//		if (channelCode != null && channelCode != '') {
//			var channelCodePre=channelCodeObj[channelCode];
//			if(null==channelCodePre){
//				channelCodeObj[channelCode]=channelCode;
//			}else{
//				bRet = false;
//				showMessage("第"+(+i+1)+"行的仪器通道码["+channelCode+"]有重复，请重新输入！", function() {
//				});
//				return false;
//			}
//
//
//			/*if (channelCodeString.indexOf(channelCode + "&&$$##") == -1) {
//				channelCodeString += channelCode + "&&$$##";
//			} else {
//				bRet = false;
//				showMessage("第"+(+i+1)+"行的仪器通道码["+channelCode+"]有重复，请重新输入！", function() {
//				});
//				return false;
//			}*/
//		}
//		if (printOrder == null || printOrder == '') {
//			bRet = false;
//			showMessage("第"+(+i+1)+"行的打印次序为空，请重新输入！", function() {
//			});
//			return false;
//		}
//	}
//
//	return bRet;
//}
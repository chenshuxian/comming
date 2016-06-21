/**
 * 组合项目
 * Created by chenshuxian on 2016/1/11.
 */
var testItemGroupMain = (function($){

    /* START render basicModule */
    testItemGroupMain = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.TIG,
        _popArea= 580,
        _tableList =  $("#" + _preId + "List"),
        _tableList2 = $("#" + _preId + "groupProjectDescription"),
        _hideCols = [],	//要穩藏的欄位
        _data = testItemGroupMain.searchObj(_preId),
        _module = "testItemGroupMain",
        _focusId = "name",
        _module2 = "testItemGroupMain2",
        _delBatUrl = ctx + "/pm/testItem/deleteTestItem",
        _existUrl = ctx + "/pm/testItem/findCount",
        _updateUrl =  ctx + "/pm/testItemGroup/saveOrEditTestItemGroup",
        _addUrl =  ctx + "/pm/testItemGroup/saveOrEditTestItemGroup",
        _delUrl = ctx + "/pm/testItem/deleteTestItem",
        _changeStatusUrl = ctx + "/pm/testItem/modifyTestItemStatus",
        _InfoUrl = ctx + "/pm/testItemGroup/showAddOrEdit",
        _pageListUrl = ctx + '/pm/testItemGroup/testItemGroupList',
        _exParams = {orderType:2},

    //url2
        _delBatUrl2 = ctx + "/pm/testItemGroup/delSingleItemBatch",
        _existUrl2 = ctx + "/basisDict/ctrtestItemGroupMainDetail/checkNameExisted",
        _addUrl2 = ctx + "/pm/testItemGroup/addOrRemoveItem",
        _delUrl2 = ctx + "/pm/testItemGroup/delSingleItem",
        _InfoUrl2 = ctx + "/pm/testItemGroup/addSingleItemShow",
        _pageListUrl2 = ctx + "/pm/testItemGroup/singleItemList",

        _optLeftUrl = ctx + '/pm/testItemGroup/containList',
        _optRightUrl = ctx + '/pm/testItemGroup/notContainList',

        _initHeight = CB.HEIGHT,
        _initHeight2 = _initHeight + 50,

    /* START dataGrid 生成*/

    //first dataGrid
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId,
            height:_initHeight
        },
    //testItemGroupMain dataGrid obj render
        _gridObj = dataGridM.init(_dgParams),

        _upgradeObj = {
            //pagination: false,
            onLoadSuccess: function(data) {

                var rows = testItemGroupMain.dataGrid.datagrid("getRows");

                if (data.total == 0) {
                    testItemGroupMain.dataGrid2.datagrid('loadData', {total: 0, rows: []});//清空下方DateGrid
                    BasicModule.parentStatus = -1;
                } else {
                    testItemGroupMain.parentId = rows[0].stringId;
                    BasicModule.parentStatus = rows[0].status;
                    dataGridM.firstRow.call(this);
                    _loadDataGrid2(testItemGroupMain.parentId);
                }
                dataGridM.loadSuccess(this);
            },
            onClickRow: function(index, row) {
                // 载入第二支表
                dataGridM.clickRow.call(this, index,row);
                testItemGroupMain.reloadDG2(row);

            },
            onCheck: function(index, row) {
                testItemGroupMain.reloadDG2(row);
            }

        },

        _gridObj = $.extend({},_gridObj,_upgradeObj),
    // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj),


    /* 加载结果描述 */
        _loadDataGrid2 = function (testItemId) {
            // 结果描述列表
            var
                _data2 = {testItemId: testItemId},
            //second dataGrid
                _dgParams2 = {
                    url:_pageListUrl2,
                    data:_data2,
                    module:_module2,
                    hideCols:_hideCols,
                    tableList:_tableList2,
                    preId:_preId,
                    height:_initHeight,
                    isSecond:true
                },

            //testItemGroupMain dataGrid obj render
                _gridObj2 = dataGridM.init(_dgParams2),

                _upgradeObj2 = {

                    //pagination: false,
                    onLoadSuccess: function(data) {

                        var columns = testItemGroupMain.dataGrid2.datagrid('getColumnFields');

                    }

                },
            // render dataGrid
                _gridObj2 = testItemGroupMain.getNewParams(_gridObj2,_upgradeObj2);//extend({},_gridObj2,_upgradeObj2);
            //console.log("dg2"+_gridObj2);
            testItemGroupMain.dataGrid2 = _tableList2.datagrid(_gridObj2);

        },

        _columns = function() {

            var columns = [[
                {field: "ck",checkbox: true,width: 30},
                {title: "达安标准码", field: 'codeNo', width: 50},
                {title: "项目名称", field: 'name', flex: 1, width: 50},
                {title: "英文简称", field: 'enName', width: 50},
                {title: "检验方法", field: 'testMethodName', width: 50},
                {title: "项目性别", field: 'sexId', width: 50, hidden:false,
                    formatter : function(value) {
                        var returnStr = '不限';
                        if (value == '1') {
                            returnStr = '男';
                        }
                        if (value == '2') {
                            returnStr = '女';
                        }
                        return returnStr;
                    }
                }
            ]];

          return columns;
        },

        //第二个grid 中新增页面的左datagrid
        _loadContainList = function() {

            testItemGroupMain.leftDG =   $("#addCheckProjectLeft").datagrid({
                url: _optLeftUrl,
                method: CB.METHOD,
                queryParams: {testItemId: testItemGroupMain.parentId},
                height: _initHeight2,
                fitColumns: true,
                striped: true,
                fit: false,
                //autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                    $("#containSize").html(data.total);
                }
            });
        },

        //第二个grid 中新增页面的右datagrid
        _loadNoContainList = function() {

          testItemGroupMain.rightDG = $("#addCheckProjectRight").datagrid({
                url: _optRightUrl,
                method: CB.METHOD,
                queryParams: {testitemId: testItemGroupMain.parentId, searchGroupStr:null},
                height: _initHeight2,
                fitColumns: true,
                striped: true,
                fit: false,
                //autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                      //console.log(data);
                      if(data.rows.source != "local") {
                          testItemGroupMain.rightArr = [];
                          testItemGroupMain.rightArr = data.rows;
                          BM.dataFilter(testItemGroupMain.rightArr);
                      }

                }
            });
        };

    // delete desc batch
    $("#" + _preId + "DeleteBatch2").click(function () {

        if (testItemGroupMain.parentStatus == 1) {
            BM.showMessage("当前选中的组合项目启用状态，不允许删除项目！");
            return false;
        } else if (testItemGroupMain.parentStatus == -1) {
            BM.showMessage("当前无任何数据，不允许删除项目！");
            return false;
        }

        var
            dgObj= testItemGroupMain.dataGrid2,
            ids = testItemGroupMain.getIds(dgObj),
            params = {
                dataGrid : dgObj,
                url: testItemGroupMain.delBatUrl2,
                data:{
                    testItemid:ids.join(","),
                    groupItemid:testItemGroupMain.parentId
                }
            };

        testItemGroupMain.deleteBatch(params);

    });

    /!* 項目列表新增 *!/
    $("#" + _preId + "Add2").click(function () {
    	 if (testItemGroupMain.parentStatus == 1) {
             showMessage("当前选中组合已启用，不允许添加项目！");
             return;
         } else if (testItemGroupMain.parentStatus == -1) {
             BM.showMessage("当前无任何数据，不允许添加项目！");
             return false;
         }
    	
        var
            params = {
                url: _InfoUrl2,
                data: {testItemId: testItemGroupMain.parentId},
                callback: function(){
                    _loadContainList();
                    _loadNoContainList();
                },
                popArea: 1100,
                focusId: "instrumentSearch"
            };
        console.log(params)
        testItemGroupMain.addPop(params);

    });

    $(window).on('resize', function () {
        //newcommonjs.tableAuto(testItemGroupMain.testItemGroupMainTableList);
        var width = testItemGroupMain.tableList.parents('.tabs-panels').width() - 40;
        testItemGroupMain.tableList.datagrid('resize', {
            width: width
        });
        testItemGroupMain.tableList2.datagrid('resize', {
            width: width
        });
    });

    $.extend(testItemGroupMain,{

        preId:_preId,
        module:_module,
        parentId: null,
        //设定pop弹出框的大小
        popArea: _popArea,
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
        exParams: _exParams,

        //dataGrid2 of Url
        delBatUrl2: _delBatUrl2,
        existUrl2: _existUrl2,
        addUrl2: _addUrl2,
        delUrl2: _delUrl2,
        InfoUrl2: _InfoUrl2,
        pageListUrl2: _pageListUrl2,
        /*END url 定義*/
        dataGrid:_dataGrid,
        leftDG: null,
        rightDG: null,

        //默认标本类型Grid
        sampleTypeParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"tg_sampleType", 				//对应表单DIV的id
            grid_id:"tg_gridSampleType", 			//对应数据源Grid的Id
            name:"sampleTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 100, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
                if (testItemGroupMain.sampleTypeGrid.delay == 1) {
                    testItemGroupMain.sampleTypeGrid.delay = 0;
                } else {
                    $("#fastCode").select();
                    testItemGroupMain.sampleTypeGrid.delay = 1;
                }
            }
        },



        validateSave: function() {

            var name = $.trim($("#name").val()); //组合名称
            //var sampleTypeId = $.trim($("#sampleTypeId option:selected").val());//默认样本类型
            var sampleTypeId = testItemGroupMain.sampleTypeGrid.getValue();
            var displayOrderId = "displayOrder";


            if(BM.comboGrid(testItemGroupMain.sampleTypeGrid,CB.COMBOMSG.SAMPLETYPE,"sampleType")) {
                return false;
            }


            if(validateDisplayOrder(displayOrderId)){
                return false;
            }

            return true;
        },

        validateBox: function() {

            $("input[name='name']").validatebox({
                required:true,
                validType:  ['symbol','length[0,50]','space'],
                missingMessage: "组合项目为空，请重新输入！"
            });
            $("input[name='name']").attr('maxlength','50');

            $("input[name='enShortName']").validatebox({
                validType:  ['upperCase','length[0,20]']
            });
            $("input[name='enShortName']").attr('maxlength','20');

            //displayOrder长度
            $("input[name='displayOrder']").validatebox({
                validType:  ['digits','length[0,6]']
            });
            $("input[name='displayOrder']").attr('maxlength','6');

            //英文名长度
            $("input[name='enName']").validatebox({
                validType:  ['numAndLetters','length[0,55]']
            });
            $("input[name='enName']").attr('maxlength','55');

            //fastCode长度
            $("input[name='fastCode']").validatebox({
                validType:  ['upperNum','length[0,9]']
            });
            $("input[name='fastCode']").attr('maxlength','9');

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
            //console.log(testItemGroupMain.rowData);
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

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(testItemGroupMain.rowData);
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
            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("select").attr("disabled","disabled");
            $("#editBtn").hide();

        },

        reloadDG2: function(row) {

            this.parentId = row.stringId;
            BasicModule.parentStatus = row.status;
            testItemGroupMain.dataGrid2.datagrid('reload', {testItemId: row.stringId});

        },


        editRowEx: function(rowData) {

            var params = {
                BCB: true
            };
            this.editRow(rowData,params);
        },

        changeStatusEx: function(index,rowData) {

            var type,params;
            type = rowData.status.toString();

            if(type == "1")
                type = "0";
            else
                type = "1";

            params = {
                data:
                {
                    testItemid: rowData.stringId,
                    type: type
                },
                logParent: true
            };

            this.changeStatus(index,rowData,params)


        },

        deleteRowEx: function(index,rowData) {

            var params = {
                data:{ids: rowData.stringId}
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
        beforeSubmit: function(){

            var params,data;
            data = $("#InfoForm").serializeArray();
            if($("#isIndividualStat").prop("checked")){
                //data +="&isIndividualStat=1";
                data.push({
                    name:'isIndividualStat',
                    value:1
                });
            }else{
                //data +="&isIndividualStat=0";
                data.push({
                    name:'isIndividualStat',
                    value:0
                });
            }
            //data += "&sampleTypeName=" + testItemGroupMain.sampleTypeGrid.getText();
            data.push({
                name:'sampleTypeName',
                value:testItemGroupMain.sampleTypeGrid.getText()
            });

            params = {
                data: data
            };

            this.editDictCode(params);
        }

        /*callback function area end*/

    });

    return testItemGroupMain;


}(jQuery));

$(function(){

    var _preId = CB.PREID.TIG;
    testItemGroupMain.init();
    //删除预设事件
    $("#" + _preId + "Add").unbind();
    $("#" + _preId + "Add").on("click",function() {
        var params = {
            BCB: true
        };
        testItemGroupMain.addPop(params);
    });

    // deleteBatch
    //$("#" + _preId + "DeleteBatch").unbind();
    //$("#" + _preId + "DeleteBatch").on("click",function() {
    //    var params,ids;
    //    ids = testItemGroupMain.getIds();
    //    params = {
    //        data: {testItemid: ids.join(",")}
    //    }
    //    testItemGroupMain.deleteBatch(params);
    //});
});

 
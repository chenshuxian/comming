/**
 * 检验项目
 * Created by chenshuxian on 2016/03/24
 */
var TestItem = (function($){

    /* START render basicModule */
    TestItem = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.TI,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	//要穩藏的欄位
        _data = TestItem.searchObj(_preId),
        _module = "TestItem",
        _focusId = "testItem_codeNo",
        _popArea = 750,
        _delBatUrl = ctx+"/pm/testItem/deleteTestItem",
        _existUrl = ctx+"/pm/testItem/findCount",
        _updateUrl = ctx+"/pm/testItem/saveOrEditTestItem",
        _addUrl = ctx+"/pm/testItem/saveOrEditTestItem",
        _delUrl = ctx+"/pm/testItem/deleteTestItem",
        _changeStatusUrl = ctx+"/pm/testItem/modifyTestItemStatus",
        _InfoUrl = ctx + "/pm/testItem/queryTestItemToID",
        _pageListUrl =  ctx +'/pm/testItem/testItemList',
        //_exParams = {orderType:2},

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

    /*download 相关参数设定  */
    $("#" + _preId + "download").on("click",function() {

       var serObj = TestItem.searchObj(_preId);

        //若为空，以下为预设值
        if(!serObj.status){
            serObj.status=2;
        }
        if(!serObj.orderType){
            serObj.status=0;
        }
        window.location.href = ctx + "/pm/testItem/exportTestItemExcel?searchStr="+serObj.searchStr+"&status="+serObj.status+"&orderType="+serObj.orderType;
    });


    $.extend(TestItem,{

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
       //exParams: _exParams,
        /*END url 定義*/
        dataGrid:_dataGrid,
        addreload:{
            searchStr:"",
            status:"",
            orderType:"2"
        },
        testMethodParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_testMethod", 				//对应表单DIV的id
            grid_id:"testItem_gridTestMethod", 			//对应数据源Grid的Id
            name:"testMethodId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 260, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
                if ( TestItem.testMethodGrid.delay == 1) {
                    TestItem.testMethodGrid.delay = 0;
                } else {
                    $("#testItem_discipline input:text").select();
                    TestItem.testMethodGrid.delay = 1;
                }               
            }
        },
        //医学专业组Grid
        disciplineParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_discipline", 				//对应表单DIV的id
            grid_id:"testItem_gridDiscipline", 			//对应数据源Grid的Id
            name:"disciplineId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 260, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
                $("#testItem_sampleType input:text").select();
            }
        },
        //默认标本类型Grid
        sampleTypeParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_sampleType", 				//对应表单DIV的id
            grid_id:"testItem_gridSampleType", 			//对应数据源Grid的Id
            name:"sampleTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 260, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
                $("#testItem_refMethod").focus();
                $("#testItem_refMethod").select();
            }
        },
        //单位Grid
        unitParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_units", 				//对应表单DIV的id
            grid_id:"testItem_gridUnit", 			//对应数据源Grid的Id
            name:"unitSelect",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 260, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
                if ( TestItem.unitGrid.delay == 1) {
                    TestItem.unitGrid.delay = 0;
                } else {
                    $("#testItem_resultType input:text").select();
                    TestItem.unitGrid.delay = 1;
                }
               
            }
        },
        //结果类型Grid
        resultTypeParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_resultType", 				//对应表单DIV的id
            grid_id:"testItem_gridResultType", 			//对应数据源Grid的Id
            name:"resultTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 260, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
                $("#testItem_resultPrecision").focus();
            }
        },

        validateBox: function() {
            $("#testItem_codeNo").validatebox({
                required: true,
                validType:  ['numAndLetters','length[0,15]','space'],
                missingMessage: "达安标准码为空，请重新输入！"
            });
            $("#testItem_codeNo").attr('maxlength','15');

            $("#testItem_name").validatebox({
                required: true,
                validType:  ['symbol','length[0,50]','space'],
                missingMessage: "项目名字为空，请重新输入！"
            });
            $("#testItem_name").attr('maxlength','50');

            $("#testItem_enName").validatebox({
                required: true,
                validType:  ['symbol','length[0,55]','space'],
                missingMessage: "英文名称为空，请重新输入！"
            });
            $("#testItem_enName").attr('maxlength','55');
            $("#testItem_enShortName").validatebox({
                required: true,
                validType:  ['symbol','length[0,20]','space'],
                missingMessage: "英文简称为空，请重新输入！"
            });
            $("#testItem_enShortName").attr('maxlength','20');
            $("#testItem_resultPrecision").validatebox({
                validType:  ['symbol','length[0,9]']
            });
            $("#testItem_resultPrecision").attr('maxlength','9');
            $("#testItem_fastCode").validatebox({
                validType:  ['symbol','length[0,9]']
            });
            $("#testItem_fastCode").attr('maxlength','9');
            $("#testItem_stdCode").validatebox({
                validType:  ['symbol','length[0,15]']
            });
            $("#testItem_stdCode").attr('maxlength','15');

            $("#testItem_displayOrder").validatebox({
                validType:  ['digits','length[0,6]']
            });
            $("#testItem_displayOrder").attr('maxlength','6');

            $("#testItem_memo").validatebox({
                validType:  ['symbol','length[0,150]']
            });
            $("#testItem_memo").attr('maxlength','150');

        },

        validateSave: function() {

            var
                codeNo = $.trim($("#testItem_codeNo").val()),
                name = $.trim($("#testItem_name").val()),
                enShortName = $.trim($("#testItem_enShortName").val()),
                enName = $.trim($("#testItem_enName").val()),
                sexId = $.trim($("#testItem_sexId option:selected").val()),
                testMethodId = TestItem.testMethodGrid.getValue(),
                disciplineId = TestItem.disciplineGrid.getValue(),

                sampleTypeId = TestItem.sampleTypeGrid.getValue(),
                unit = TestItem.unitGrid.getValue(),
                resultTypeId =TestItem.resultTypeGrid.getValue(),
                resultPrecision = $.trim($("#testItem_resultPrecision").val()),
                displayOrder = $.trim($("#testItem_displayOrder").val());

            if(sexId == ""){
                BM.showMessage("请选择性别！",function(){
                });
                return false;
            }

            if(BM.comboGrid(TestItem.testMethodGrid,CB.COMBOMSG.TESTMETHOD,"testItem_testMethod")) {
                return false;
            }
            if(BM.comboGrid(TestItem.disciplineGrid,CB.COMBOMSG.DISCIPLINE,"testItem_discipline")) {
                return false;
            }
            if(BM.comboGrid(TestItem.sampleTypeGrid,CB.COMBOMSG.SAMPLETYPE,"testItem_sampleType")) {
                return false;
            }
            //if(BM.comboGrid(TestItem.unitGrid,CB.COMBOMSG.UNIT,"testItem_units",0)) {
            //    return false;
            //}
            if(BM.comboGrid(TestItem.resultTypeGrid,CB.COMBOMSG.RESULTTYPE,"testItem_resultType",0)) {
                return false;
            }



            var re = /^[0-9]*[1-9][0-9]*$/;
            if (resultPrecision != '' && (isNaN(resultPrecision) || !re.test(resultPrecision))) {
                BM.showMessage('小数位数必须为大于0的整数，请重新输入！', function() {
                    $("#testItem_resultPrecision").focus();
                });
                return false;
            }
            /*if(isNaN(resultPrecision)){
                BM.showMessage("小数位数只能是数字",function(){
                    $("#testItem_resultPrecision").focus();
                });
                return false;
            }*/
            var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#testItem_@!~\]\[{}\\`\|])*)$/);
            if(unit != null){
                if(!regEx.test(unit)){
                    BM.showMessage("单位有特殊字符，请重新输入!",function(){
                        $("#testItem_units").focus();
                    });
                    return false;
                }
            }
            if(isNaN(displayOrder)){
                BM.showMessage("顺序号只能是数字，请重新输入！",function(){
                    $("#testItem_displayOrder").focus();
                });
                return false;
            }
            var displayOrderId = "testItem_displayOrder";
            if(validateDisplayOrder(displayOrderId)){
                return false;
            }
            if(displayOrder.length > 6){
                BM.showMessage("顺序号最大长度为6位，请重新输入！",function(){
                    $("#testItem_displayOrder").focus();
                });
                return false;
            }


            return true;
        },

        editRowEx: function(rowData) {

            var params = {
                BCB: true
            };
            this.editRow(rowData,params);
        },

        deleteRowEx: function(index,rowData) {

            var params = {
                data:{ids: rowData.stringId}
            };

            this.deleteRow(index,rowData,params);
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
                    }
                };

            this.changeStatus(index,rowData,params);
        },


        //修改新增和修改时传送出的data资料
        beforeSubmit: function(){
            console.log("testItem");
            var params,data;
            data = $("#InfoForm").serializeArray();
            data.push(
                {name: 'unit', value: TestItem.unitGrid.getText()},
                {name: 'disciplineName', value: TestItem.disciplineGrid.getText()},
                {name: 'sampleTypeName', value: TestItem.sampleTypeGrid.getText()},
                {name: 'testMethodName', value: TestItem.testMethodGrid.getText()},
                {name: 'resultTypeName', value: TestItem.resultTypeGrid.getText()}
            );

            console.log(data);

            params = {
              data: data
            };

            this.editDictCode(params);
        },

        searchObj: function(preId) {

            return {
                searchStr: $.trim($("#" + preId + "SearchStr").val()),
                status: $("#" + preId + "Status").val(),
                orderType: $("#" + preId + "Sort").val()
            };

        },

        addSuccess: function(data) {


            var check = BM.resolutionData(data);

            if(check) {
                var confirm = data.indexOf("confirm|");
                if ( confirm != -1) {
                    showConfirm("项目名称重复，是否继续？",function(){
                        				BasicModule.add();
                    });
                }else{
                    BasicModule.add();
                }

            }

        },

        editSuccess: function() {
            var
                nameValidation = $.trim($("#testItem_nameValidation").val()),
                name = $.trim($("#testItem_name").val());

            if(nameValidation != name){
				//判断项目名称是否重复
                $.ajax({
                    "url" : _existUrl,
                    "type" : CB.METHOD,
                    "data" : {testName:name},
                    "success" : function(data) {
                        count = data.substring(5);
                        if(count > 0){
                            //提示项目名称重复是否继续
                            showConfirm("项目名称重复，是否继续？",function(){
                                BasicModule.update();
                            });
                        }else{
                            //修改数据
                            BasicModule.update();

                        }
                    }
                });
            }else{
                //修改数据
               BasicModule.update();

           }

        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#spanEditCodeNo").html(rowData.codeNo);
            $("#testItem_codeNo").attr("readonly","readonly");
            newcommonjs.oldName = rowData.name;

        },

        showCallBack: function() {
            var rowData = BasicModule.rowData;
            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            TestItem.testMethodGrid.disable();
            TestItem.disciplineGrid.disable();
            TestItem.sampleTypeGrid.disable();
            TestItem.unitGrid.disable();
            TestItem.resultTypeGrid.disable();
            $("select").attr("disabled","disabled");
            $("#editBtn").hide();
        }

        /*callback function area end*/

    });

    return TestItem;

}(jQuery));

$(function(){
    var _preId = CB.PREID.TI;
    TestItem.init();

    $("#" + _preId + "Add").unbind();
    $("#" + _preId + "Add").on("click",function() {
        var params = {
            BCB: true
        };
        TestItem.addPop(params);
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").unbind();
    $("#" + _preId + "DeleteBatch").on("click",function() {

        var params,ids;
        ids = testItemGroupMain.getIds();
        params = {
            data: {testItemid: ids.join(",")}
        };
        TestItem.deleteBatch(params);

    });
});


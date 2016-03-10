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
        _focusId = "testItem_name",
        _popArea = 750,
        _delBatUrl = ctx+"/pm/testItem/deleteTestItem",
        _existUrl = ctx+"/pm/testItem/findCount",
        _updateUrl = ctx+"/pm/testItem/saveOrEditTestItem",
        _addUrl = ctx+"/pm/testItem/saveOrEditTestItem",
        _delUrl = ctx+"/pm/testItem/deleteTestItem",
        _changeStatusUrl = ctx+"/pm/testItem/modifyTestItemStatus",
        _InfoUrl = ctx + "/pm/testItem/queryTestItemToID",
        _pageListUrl =  ctx +'/pm/testItem/testItemList',
        _exParams = {orderType:2},

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

        TestItem.searchGrid();
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

        TestItem.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        TestItem.searchGrid();;
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        var params = {
            BCB: true
        };
        TestItem.addPop(params);
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {

        var
            checkedItems = TestItem.dataGrid.datagrid("getChecked"),
            ids = [],
            params;

        $.each(checkedItems,function(index,item){
            ids.push(item.stringId);
        });

        params = {
            data: {testItemid: ids.join(",")}
        };
        TestItem.deleteBetch(params);
    });


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
        exParams: _exParams,
        /*END url 定義*/
        dataGrid:_dataGrid,
        testMethodParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_testMethod", 				//对应表单DIV的id
            grid_id:"testItem_gridTestMethod", 			//对应数据源Grid的Id
            name:"testMethodId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 180, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
            }
        },
        //医学专业组Grid
        disciplineParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_discipline", 				//对应表单DIV的id
            grid_id:"testItem_gridDiscipline", 			//对应数据源Grid的Id
            name:"disciplineId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 180, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
            }
        },
        //默认标本类型Grid
        sampleTypeParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_sampleType", 				//对应表单DIV的id
            grid_id:"testItem_gridSampleType", 			//对应数据源Grid的Id
            name:"sampleTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 180, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
            }
        },
        //单位Grid
        unitParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_units", 				//对应表单DIV的id
            grid_id:"testItem_gridUnit", 			//对应数据源Grid的Id
            name:"unitSelect",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 180, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
            }
        },
        //结果类型Grid
        resultTypeParam: {					//下拉Grid参数,所有参数均为必填
            div_id:"testItem_resultType", 				//对应表单DIV的id
            grid_id:"testItem_gridResultType", 			//对应数据源Grid的Id
            name:"resultTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 180, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],					//锁定Grid，传入数组[top,left]
            onEnter:function(){
            }
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

            if(codeNo == ""){
                showMessage("达安标准码为空，请重新输入！",function(){
                    $("#testItem_codeNo").focus();
                });
                return false;
            }
            if(name == ""){
                showMessage("项目名字为空，请重新输入！",function(){
                    $("#testItem_name").focus();
                });
                return false;
            }
            if(enName == ""){
                showMessage("英文名称为空，请重新输入！",function(){
                    $("#testItem_enName").focus();
                });
                return false;
            }
            if(enShortName == ""){
                showMessage("英文简称为空，请重新输入！",function(){
                    $("#testItem_enShortName").focus();
                });
                return false;
            }
            if(sexId == ""){
                showMessage("请选择性别！",function(){
                });
                return false;
            }
            if(testMethodId == ""){
                showMessage("检验方法为空，请重新输入！",function(){
                });
                return false;
            }
            if(disciplineId == ""){
                showMessage("医学专业组为空，请重新输入！",function(){
                });
                return false;
            }
            if(sampleTypeId == ""){
                showMessage("默认标本类型为空，请重新输入！",function(){
                });
                return false;
            }
            var re = /^[0-9]*[1-9][0-9]*$/;
            if (resultPrecision != '' && (isNaN(resultPrecision) || !re.test(resultPrecision))) {
                showMessage('小数位数必须为大于0的整数，请重新输入！', function() {
                    $("#testItem_resultPrecision").focus();
                });
                return false;
            }
            /*if(isNaN(resultPrecision)){
                showMessage("小数位数只能是数字",function(){
                    $("#testItem_resultPrecision").focus();
                });
                return false;
            }*/
            var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#testItem_@!~\]\[{}\\`\|])*)$/);
            if(unit != null){
                if(!regEx.test(unit)){
                    showMessage("单位有特殊字符，请重新输入!",function(){
                        $("#testItem_units").focus();
                    });
                    return false;
                }
            }
            if(isNaN(displayOrder)){
                showMessage("顺序号只能是数字，请重新输入！",function(){
                    $("#testItem_displayOrder").focus();
                });
                return false;
            }
            var displayOrderId = "testItem_displayOrder";
            if(validateDisplayOrder(displayOrderId)){
                return false;
            }
            if(displayOrder.length > 6){
                showMessage("顺序号最大长度为6位，请重新输入！",function(){
                    $("#testItem_displayOrder").focus();
                });
                return false;
            }
            //regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#testItem_@!~\]\[{}\\/`\|])*)$/);
            //var result = codeNo.match(regEx);
            regEx = /^[A-Za-z0-9]+$/;
            if(!regEx.test(codeNo)){
                showMessage("达安标准码只能输入纯字母、纯数字，或字母+数字组合，请重新输入！",function(){
                    $("#testItem_codeNo").focus();
                });
                return false;
            }

            var patrn = /[0-9a-zA-Z]/;

            if (!patrn.exec(codeNo)){
                showMessage("达安标准码只能由数字或字母组成，请重新输入！",function(){
                    $("#testItem_codeNo").focus();
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
                data:{testItemid: rowData.stringId}
            };

            this.deleteRow(index,rowData,params);
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

            this.changeStatus(index,rowData,params);
        },

        //修改新增和修改时传送出的data资料
        dataUpgrade: function(){

            var params,data;
            data = $("#InfoForm").serialize();
            data +="&unit="+encodeURIComponent(TestItem.unitGrid.getText())+
                    "&disciplineName="+TestItem.disciplineGrid.getText()+
                    "&sampleTypeName="+TestItem.sampleTypeGrid.getText()+
                    "&testMethodName="+TestItem.testMethodGrid.getText()+
                    "&resultTypeName="+TestItem.resultTypeGrid.getText();

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

            var
                count = data.substring(5),
                name = $.trim($("#testItem_name").val());

            if(count > 0){
					showMessage("达安标准码已存在，请重新输入！",function(){
						count = 0;
                        $("#editBtn").attr("disable", false);
					});
					return false;
            }else{
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
									BasicModule.add();
								});
							//项目名称没有重复，不提示直接保存
							}else{
								BasicModule.add();
							}

						}
					});
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
            //console.log(TestItem.rowData);
            //console.log(rowData);
            //$("#InfoForm").form('load', {
	        	//codeNo: rowData.codeNo,
	        	//name: rowData.name,
	        	//enName: rowData.enName,
	        	//enShortName: rowData.enShortName,
	        	//sexId: rowData.sexId,
	        	////testMethodId: rowData.testMethodId,
	         //   memo: rowData.memo,
	         //   //disciplineId: rowData.disciplineId,
	         //   sampleType: rowData.sampleType,
	         //   refMethod:rowData.refMethod,
	         //   unit:rowData.unit,
	         //   //resultTypeId:rowData.resultTypeId,
	         //   resultPrecision:rowData.resultPrecision,
	         //   fastCode:rowData.fastCode,
	         //   stdCode:rowData.stdCode,
	         //   displayOrder:rowData.displayOrder,
	         //   isFreeze:rowData.isFreeze,
	         //   opType: 'edit'
            //});
            //$("#editName").focus();
            //TestItem.testMethodGrid.setText(rowData.testMethodName);
            //TestItem.disciplineGrid.setText(rowData.disciplineName);
            //TestItem.sampleTypeGrid.setText(rowData.sampleTypeName);
            //TestItem.unitGrid.setText(rowData.unit);
            //TestItem.resultTypeGrid.setText(rowData.resultTypeName);
            $("#spanEditCodeNo").html(rowData.codeNo);

            newcommonjs.oldName = rowData.name;

        }

        /*callback function area end*/

    });

    return TestItem;

}(jQuery));

$(function(){
    TestItem.init();
});

//var testMethodGrid;//默认样本类型
//var disciplineGrid;//医学专业组
//var sampleTypeGrid;//默认标本类型
//var unitGrid;//单位
//var resultTypeGrid;//结果类型
//var canStore = true;//防止重复提交
//var count = 0;//统计字段在数据库是否存在
////检验方法ComboBoxGrid
//var testMethodParam = {					//下拉Grid参数,所有参数均为必填
//	div_id:"testItem_testMethod", 				//对应表单DIV的id
//	grid_id:"testItem_gridTestMethod", 			//对应数据源Grid的Id
//	name:"testMethodId",				//在表单中对应的提交name
//	columnShow:1,						//将要在文本框中显示的列序号
//	width : 180, 					    //Combo的宽度
//	clearOff:false,						//是否禁用clear按钮
//	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	onEnter:function(){
//	}
//};
////医学专业组Grid
//var disciplineParam = {					//下拉Grid参数,所有参数均为必填
//	div_id:"testItem_discipline", 				//对应表单DIV的id
//	grid_id:"testItem_gridDiscipline", 			//对应数据源Grid的Id
//	name:"disciplineId",				//在表单中对应的提交name
//	columnShow:1,						//将要在文本框中显示的列序号
//	width : 180, 					    //Combo的宽度
//	clearOff:false,						//是否禁用clear按钮
//	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	onEnter:function(){
//	}
//};
////默认标本类型Grid
//var sampleTypeParam = {					//下拉Grid参数,所有参数均为必填
//	div_id:"testItem_sampleType", 				//对应表单DIV的id
//	grid_id:"testItem_gridSampleType", 			//对应数据源Grid的Id
//	name:"sampleTypeId",				//在表单中对应的提交name
//	columnShow:1,						//将要在文本框中显示的列序号
//	width : 180, 					    //Combo的宽度
//	clearOff:false,						//是否禁用clear按钮
//	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	onEnter:function(){
//	}
//};
////单位Grid
//var unitParam = {					//下拉Grid参数,所有参数均为必填
//	div_id:"testItem_units", 				//对应表单DIV的id
//	grid_id:"testItem_gridUnit", 			//对应数据源Grid的Id
//	name:"unitSelect",				//在表单中对应的提交name
//	columnShow:1,						//将要在文本框中显示的列序号
//	width : 180, 					    //Combo的宽度
//	clearOff:false,						//是否禁用clear按钮
//	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	onEnter:function(){
//	}
//};
////结果类型Grid
//var resultTypeParam = {					//下拉Grid参数,所有参数均为必填
//	div_id:"testItem_resultType", 				//对应表单DIV的id
//	grid_id:"testItem_gridResultType", 			//对应数据源Grid的Id
//	name:"resultTypeId",				//在表单中对应的提交name
//	columnShow:1,						//将要在文本框中显示的列序号
//	width : 180, 					    //Combo的宽度
//	clearOff:false,						//是否禁用clear按钮
//	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
//	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
//	onEnter:function(){
//	}
//};
////保存数据验证
//function validateSave(){
//	var codeNo = $.trim($("#testItem_codeNo").val());
//	var name = $.trim($("#testItem_name").val());
//	var enShortName = $.trim($("#testItem_enShortName").val());
//	var enName = $.trim($("#testItem_enName").val());
//	var sexId = $.trim($("#testItem_sexId option:selected").val());
//	//var testMethodId = $.trim($("#testItem_testMethodId option:selected").val());
//	var testMethodId = testMethodGrid.getValue();
//	//var disciplineId = $.trim($("#testItem_disciplineId option:selected").val());
//	var disciplineId = disciplineGrid.getValue();
//
//	//var sampleTypeId = $.trim($("#testItem_sampleTypeId option:selected").val());
//	var sampleTypeId = sampleTypeGrid.getValue();
//	//var unit = $.trim($("#testItem_unit option:selected").val());
//	var unit = unitGrid.getValue();
//	//var resultTypeId = $.trim($("#testItem_resultTypeId option:selected").val());
//	var resultTypeId =resultTypeGrid.getValue();
//	var resultPrecision = $.trim($("#testItem_resultPrecision").val());
//	var displayOrder = $.trim($("#testItem_displayOrder").val());
//	if(codeNo == ""){
//		showMessage("达安标准码为空，请重新输入！",function(){
//			$("#testItem_codeNo").focus();
//		});
//		return false;
//	}
//	if(name == ""){
//		showMessage("项目名字为空，请重新输入！",function(){
//			$("#testItem_name").focus();
//		});
//		return false;
//	}
//	if(enName == ""){
//		showMessage("英文名称为空，请重新输入！",function(){
//			$("#testItem_enName").focus();
//		});
//		return false;
//	}
//	if(enShortName == ""){
//		showMessage("英文简称为空，请重新输入！",function(){
//			$("#testItem_enShortName").focus();
//		});
//		return false;
//	}
//	if(sexId == ""){
//		showMessage("请选择性别！",function(){
//		});
//		return false;
//	}
//	if(testMethodId == ""){
//		showMessage("检验方法为空，请重新输入！",function(){
//		});
//		return false;
//	}
//	if(disciplineId == ""){
//		showMessage("医学专业组为空，请重新输入！",function(){
//		});
//		return false;
//	}
//	if(sampleTypeId == ""){
//		showMessage("默认标本类型为空，请重新输入！",function(){
//		});
//		return false;
//	}
//	var re = /^[0-9]*[1-9][0-9]*$/;
//	if (resultPrecision != '' && (isNaN(resultPrecision) || !re.test(resultPrecision))) {
//		showMessage('小数位数必须为大于0的整数，请重新输入！', function() {
//			$("#testItem_resultPrecision").focus();
//		});
//		return false;
//	}
//	/*if(isNaN(resultPrecision)){
//		showMessage("小数位数只能是数字",function(){
//			$("#testItem_resultPrecision").focus();
//		});
//		return false;
//	}*/
//	var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#testItem_@!~\]\[{}\\`\|])*)$/);
//	if(unit != null){
//		if(!regEx.test(unit)){
//			showMessage("单位有特殊字符，请重新输入!",function(){
//				$("#testItem_units").focus();
//			});
//			return false;
//		}
//	}
//	if(isNaN(displayOrder)){
//		showMessage("顺序号只能是数字，请重新输入！",function(){
//			$("#testItem_displayOrder").focus();
//		});
//		return false;
//	}
//	var displayOrderId = "testItem_displayOrder";
//	if(validateDisplayOrder(displayOrderId)){
//		return false;
//	}
//	if(displayOrder.length > 6){
//		showMessage("顺序号最大长度为6位，请重新输入！",function(){
//			$("#testItem_displayOrder").focus();
//		});
//		return false;
//	}
//	//regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#testItem_@!~\]\[{}\\/`\|])*)$/);
//	//var result = codeNo.match(regEx);
//	regEx = /^[A-Za-z0-9]+$/;
//	if(!regEx.test(codeNo)){
//		showMessage("达安标准码只能输入纯字母、纯数字，或字母+数字组合，请重新输入！",function(){
//			$("#testItem_codeNo").focus();
//		});
//		return false;
//	}
//
//	var patrn = /[0-9a-zA-Z]/;
//
//	if (!patrn.exec(codeNo)){
//		showMessage("达安标准码只能由数字或字母组成，请重新输入！",function(){
//			$("#testItem_codeNo").focus();
//		});
//		return false;
//	}
//	return true;
//}
//
////添加数据数据
//function add(params){
//	$.ajax({
//		"url" : ctx+"/pm/testItem/saveOrEditTestItem",
//		"type" : "POST",
//		"data" : params,
//		"success" : function(data) {
//			var ret = resolutionData(data);
////			closeEdit();//关闭页面
//			$("#testItem_searchStr").val("");
////			$("#testItem_orderType").val("2").attr("selected",true);
////			$("#testItem_searchDisciplineId").val("0").attr("selected",true);
////			search();//刷新list
////			tableList.datagrid('reload');
//			var param = {searchStr:'',status:'',orderType:2};
//			$("#testItem_userManagerList").datagrid("load", param);
//	         $('#testItem_saveOrEdit').hide();
//		}
//	});
//}
//
////保存数据
//function save(){
//	//防止重复提交
//
//    if(!canStore){
// 		return false;
//    }
//    //表单是否有过变更
//   /* if(!formIsDirty("testItem_crtTestItemFrom")){
//   // 	closeEdit();//关闭页面
//    	return false;
//    }*/
//
//    //必填验证
//    if(!validateSave()){
//    	return false;
//    }
//    //清除文本的前后空格
//    formTextTrim("testItem_crtTestItemFrom");
//    var type = $("#testItem_type").val();//添加修改类型 add 添加  edit 修改
//	var params = $("#testItem_crtTestItemFrom").serialize();
//	params +=
//		"&unit="+encodeURIComponent(unitGrid.getText())+
//		"&disciplineName="+disciplineGrid.getText()+
//	    "&sampleTypeName="+sampleTypeGrid.getText()+
//	    "&testMethodName="+testMethodGrid.getText()+
//	    "&resultTypeName="+resultTypeGrid.getText();
//	var codeNo = $.trim($("#testItem_codeNo").val());
//	var name = $.trim($("#testItem_name").val());
//	var id = $.trim($("#testItem_id").val());
//
//	//add 添加 edit 修改
//	if(type == "add"){
//		canStore = false;
//		// 新增的场合，需要清空条件，且排序改为按录入顺序倒序
//		$("#testItem_searchStr").val("");
//		$("#testItem_searchStatus").val("2");
//		$("#testItem_orderType").val("2");
//		//验证达安标准码唯一性
//		$.ajax({
//			"url" : ctx+"/pm/testItem/findCount",
//			"type" : "POST",
//			"data" : {codeNo:codeNo},
//			"success" : function(data) {
//				canStore = false;
//				count = data.substring(5);
//				if(count > 0){
//					showMessage("达安标准码已存在，请重新输入！",function(){
//						count = 0;
//						canStore = true;
//					});
//					return false;
//				}else{
//					//判断项目名称是否重复
//					$.ajax({
//						"url" : ctx+"/pm/testItem/findCount",
//						"type" : "POST",
//						"data" : {testName:name},
//						"success" : function(data) {
//							count = data.substring(5);
//							if(count > 0){
//								//提示项目名称重复是否继续
//								showConfirm("项目名称重复，是否继续？",function(){
//									add(params);
//								});
//								canStore = true;
//							//项目名称没有重复，不提示直接保存
//							}else{
//								add(params);
//								canStore = true;
//							}
//
//						}
//					});
//				}
//			}
//		});
//	}else{
//		//旧的项目名称
//		var nameValidation = $.trim($("#testItem_nameValidation").val());
//		//新的项目名称
//		var name = $.trim($("#testItem_name").val());
//		/**这段代码可以不用删除，现在的达安标准码是不可编辑的，到时候如果启用编辑代码解除注释就可以使用了
//		//旧的达安标准码（修改的时候验证达安标准码是否已经被改动）
//		var codeNoValidation = $("#testItem_codeNoValidation").val();
//		//新的达安标准码（修改或者未修改的达安标准码）
//		var codeNo = $("#testItem_codeNo").val();
//		//如果达安标准码有改动就要判断是否唯一
//		if(codeNoValidation != codeNo){
//			//验证达安标准码唯一性和项目名称是否重复
//			$.ajax({
//				"url" : ctx+"/pm/testItem/findCount",
//				"type" : "POST",
//				"data" : {codeNo:codeNo},
//				"success" : function(data) {
//					canStore = false;
//					count = data.substring(5);
//					if(count > 0){
//						showMessage("达安标准码已经存在！",function(){
//							count = 0;
//							canStore = true;
//							flag = false;
//						});
//						return false;
//					}
//				}
//			});
//		}else{*/
//			//判断项目名称是否被修改
//			if(nameValidation != name){
//				//判断项目名称是否重复
//				$.ajax({
//					"url" : ctx+"/pm/testItem/findCount",
//					"type" : "POST",
//					"data" : {testName:name},
//					"success" : function(data) {
//						count = data.substring(5);
//						if(count > 0){
//							//提示项目名称重复是否继续
//							showConfirm("项目名称重复，是否继续？",function(){
//								update(params);
//							});
//							canStore = true;
//						}else{
//							//修改数据
//							update(params);
//							canStore = true;
//						}
//					}
//				});
//			}else{
//				//修改数据
//				update(params);
//				canStore = true;
//			}
//		//}
//	}
//}
//
///**
// * 验证达安标准码的唯一性
// * @param codeNo 达安标准码
// */
//function findCodeNoCount(codeNo){
//
//}
//
///**
// *  修改数据
// */
//function update(params){
//	$.ajax({
//		"url" : ctx+"/pm/testItem/saveOrEditTestItem",
//		"type" : "POST",
//		"data" : params,
//		"success" : function(data) {
//			canStore = true;
//			var ret = resolutionData(data);
////			closeEdit();//关闭页面
//			//刷新该行记录
//			var jsonObj = eval('(' + ret + ')');
//
//			//赋值
//			/*var testItemid = "'" + jsonObj.idString + "'";
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(1).html('<a href="javascript:Query(' + testItemid + ');">'+jsonObj.codeNo+'</a>');
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(2).html(replaceHtml(jsonObj.name));
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(3).html(replaceHtml(jsonObj.enName));
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(4).html(replaceHtml(jsonObj.enShortName));
//			if(jsonObj.sexId == 1){
//				$("#testItem_tr_"+jsonObj.idString).children('td').eq(5).html(replaceHtml("男"));
//			}else if(jsonObj.sexId == 2){
//				$("#testItem_tr_"+jsonObj.idString).children('td').eq(5).html(replaceHtml("女"));
//			}else{
//				$("#testItem_tr_"+jsonObj.idString).children('td').eq(5).html(replaceHtml("不限"));
//			}
//
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(6).html(replaceHtml(jsonObj.testMethodName));
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(7).html(replaceHtml(jsonObj.disciplineName));
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(8).html(replaceHtml(jsonObj.sampleTypeName));
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(9).html(replaceHtml(jsonObj.fastCode));
//			$("#testItem_tr_"+jsonObj.idString).children('td').eq(10).html(replaceHtml(jsonObj.displayOrder));*/
//			tableList.datagrid('reload');
//	         $('#testItem_saveOrEdit').hide();
//
//		},
//		"error" : function() {
//			canStore = true;
//		}
//	});
//}
//
////删除数据
//function del(id){
//	//判断检验项目是否停用，可用状态不可修改数据 1启用 0停用
//	var status = $("#testItem_status_" + id).val();
//	if(status == 1){
//		showMessage("当前选中记录已启用，不允许删除！",function(){
//			$("#testItem_codeNo").focus();
//		});
//		return;
//	}
//	showConfirm("是否要删除当前记录？",function(){
//		$.ajax({
//			"url" : ctx+"/pm/testItem/deleteTestItem",
//			"type" : "POST",
//			data : {testItemid:id},
//			"success" : function(data) {
//				resolutionData(data);
//				search();//刷新list
//			},
//			"error" : function() {
//			}
//		});
//	});
//}
//
////新增数据按钮
//function addOrEdit(testItemid,type){
//	if(type == "add"){
//		/**点击添加*/
//		$("#testItem_testItem_saveOrEdit").load(ctx + "/pm/testItem/queryTestItemToID",{testItemid:testItemid,type:type});
//		$("#testItem_testItem_saveOrEdit").show();
//		$("body").append("<div class='oy'></div>");
//	    $("#testItem_xinxi").show();
//	}else{
//		//判断检验项目是否停用，可用状态不可修改数据 1启用 0停用
//		var status = $("#testItem_status_" + testItemid).val();
//		if(status == 1){
//			showMessage("当前选中记录已启用，不允许修改！");
//			return;
//		}
//		/**点击添加*/
//		$("#testItem_testItem_saveOrEdit").load(ctx + "/pm/testItem/queryTestItemToID",{testItemid:testItemid,type:type});
//		$("#testItem_testItem_saveOrEdit").show();
//		$("body").append("<div class='oy'></div>");
//	    $("#testItem_xinxi").show();
//	}
//
//}
///* 弹出新增/编辑框 */
//function showAddAndEditDialog(index, opType, callbackFun) {
//	var rowData = tableList.datagrid('getData').rows[index];
//
////	alert(JSON.stringify(rowData));
//
//
//    var url = ctx + "/pm/testItem/queryTestItemToID";
// /*   if("edit"==opType){
//    	callbackFun=function () {
//	        $('#testItem_crtTestItemFrom').form('load', {
//	        	codeNo: rowData.codeNo,
//	        	name: rowData.name,
//	        	enName: rowData.enName,
//	        	enShortName: rowData.enShortName,
//	        	sexId: rowData.sexId,
//	        	testMethodId: rowData.testMethodId,
//	            memo: rowData.memo,
//	            disciplineId: rowData.disciplineId,
//	            sampleType: rowData.sampleType,
//	            refMethod:rowData.refMethod,
//	            unit:rowData.unit,
//	            resultTypeId:rowData.resultTypeId,
//	            resultPrecision:rowData.resultPrecision,
//	            fastCode:rowData.fastCode,
//	            stdCode:rowData.stdCode,
//	            displayOrder:rowData.displayOrder,
//	            memo:rowData.memo,
//	            isFreeze:rowData.isFreeze,
//	            opType: 'edit'
//	        });
//	    };
//    }*/
//    var parm;
//    if("edit"==opType){
//    	if(rowData.status==1){
//    		showMessage('当前选中记录已启用，不允许修改!');
//            return;
//    	}
//    	parm={testItemid:rowData.stringId,type: opType};
//    }else{
//    	parm={type: opType};
//    }
//    $("#testItem_saveOrEdit").load(url, parm, function () {
//        dialog('testItem_saveOrEdit', {
//            width: 750
//        }, function () {
//			$("#testItem_name").focus();
//		});
//    });
//}
//
////启用停用项目
////testItemid 项目ID
////type 1启用 0停用
//function disavleOrUsing(testItemid,type){
//	var msg = '';
//	if(type == '0'){
//		msg = '是否停用当前记录？';
//	}else{
//		msg = '是否启用当前记录？';
//	}
//	showConfirm(msg,function(){
//		$.ajax({
//			"url" : ctx+"/pm/testItem/modifyTestItemStatus",
//			"type" : "POST",
//			data : {testItemid:testItemid,type:type},
//			"success" : function(data) {
//				if(data != null && data != ""){
//					var msg = data.indexOf("err|");
//					if(msg == 0){
//						showMessage(msg.substring(4));
//					}else{
//						//切换显示启用停用功能，减少后台交互1启用 0停用
//						if(type == 0){
//							$("#testItem_disavle_" + testItemid).hide();
//							$("#testItem_using_" + testItemid).show();
//							$("#testItem_status_" + testItemid).val(0);
//							//resolutionData(data);
//						}else{
//							$("#testItem_using_" + testItemid).hide();
//							$("#testItem_disavle_" + testItemid).show();
//							$("#testItem_status_" + testItemid).val(1);
//							//resolutionData(data);
//						}
//					}
//				}
//				//resolutionData(data);
//				//search();//刷新list
//			}
//		});
//	});
//}
///* 启用、停用状态 */
//function changeStatus(index, id, val) {
//    if (id == '' || val == '') {
//        showMessage('请选择操作记录!');
//        return;
//    }
//    var confirmMeg = "";
//    var operatioType = "";
//    var newVal;
//    if (val == '1') {
//        confirmMeg = "是否停用当前记录？";
//        operatioType = "Disable";
//        newVal = '0';
//    }
//    if (val == '0') {
//        confirmMeg = "是否启用当前记录？";
//        operatioType = "Enable";
//        newVal = '1';
//    }
//
//    $.ajax({
//        url:  ctx+"/pm/testItem/modifyTestItemStatus",
//        type: "POST",
//        data: {testItemid: id, type: newVal},
//        success: function (data) {
// //          resolutionData(data);
//            tableList.datagrid('updateRow', {
//                index: index,
//                row: {
//                    status: newVal
//                }
//            });
//            tableList.datagrid('refreshRow', index);
//        },
//        error: function () {
//        	tableList.datagrid('refreshRow', index);
//        }
//    });
//
////    $.messager.confirm("提示", confirmMeg, function (r) {
////        if (r) {} else {
////
////        }
////    });
//}
//
////查看信息
//function Query(testItemid){
//	/**点击添加*/
//	$("#testItem_testItem").load(ctx + "/pm/testItem/queryTestItem",{testItemid:testItemid});
//	$("#testItem_testItem").show();
//	$("body").append("<div class='oy'></div>")
//    $("#testItem_testItemView").show();
//}
//
////清除页面所有数据
//function clear(){
//	$("#testItem_id").val("");
//	$("#testItem_codeNo").val("");
//	$("#testItem_name").val("");
//	$("#testItem_enName").val("");
//	$("#testItem_enShortName").val("");
//	$('#testItem_sexId option:eq(0)').attr('selected',true);
//	$('#testItem_testMethodId option:eq(0)').attr('selected',true);
//	$('#testItem_disciplineId option:eq(0)').attr('selected',true);
//	$('#testItem_sampleTypeId option:eq(0)').attr('selected',true);
//	$('#testItem_refMethod option:eq(0)').attr('selected',true);
//	$('#testItem_unit option:eq(0)').attr('selected',true);
//	$('#testItem_resultTypeId option:eq(0)').attr('selected',true);
//	$('#testItem_status option:eq(0)').attr('selected',true);
//	$("#testItem_precision").val("");
//	$("#testItem_fastCode").val("");
//	$("#testItem_stdCode").val("");
//	$("#testItem_displayOrder").val("");
//	$("#testItem_memo").val("");
//	$("#testItem_isFreeze").attr("checked",false);
//}
//
////搜索
//function search() {
//	pageQuery();
//}
//
////根据条件搜索数据
//function pageQuery(){
//	var searchStr = $("#testItem_searchStr").val().trim();  //搜索输入框的值
//	$("#testItem_searchStr").val(searchStr);
//	var status = $("#testItem_searchStatus").attr("value"); //状态
//	var orderType = $("#testItem_orderType").attr("value");//排序
//	if(status!='0'&&status!='1'){
//		status=2;
//	}
//	if(orderType==''||orderType==null||orderType=='null'){
//		orderType=0;
//	}
//	var param = {searchStr:searchStr,status:status,orderType:orderType};
//	$("#testItem_userManagerList").datagrid("load", param);
//}
//
////批量删除
//function deleteChecked(){
//	/*var ids = "";
//	var i = 0;//标示位提示某行的数据是否也启用使用
//	var flag = false; //当ids为空时且状态勾选有启用的项目时进行判断
//	var msg = "";
//	$("a[id='checkItem']").each(function(){
//		i++;
//		if($(this).attr("class") == 'yes'){
//			//判断选择的数据是否是停用数据
//			var status = $("#testItem_status_" + $(this).attr("value")).val();
//			var testItemName = $("#testItem_tr_" + $(this).attr("value")).children('td').eq(2).html();
//			if(status == 1){
//				msg += "【" + testItemName + "】、";
//				flag = true;
//				//return false;//跳出所有循环；相当于 java中的 break 效果。反之 continue 效果
//			}
//			ids += $(this).attr("value")+",";
//		}
//	});
//	if(flag){
//		showMessage("项目名称："+msg.substring(0, msg.length-1)+'启用状态，不允许删除!');
//		return;
//	}
//	if(ids == ''){
//		showMessage("请选择要删除的数据！");
//		return;
//	}
//	//提示确认信息
//	showConfirm("是否删除当前记录？",function(){
//		$.ajax({
//			"url" : ctx+"/pm/testItem/deleteTestItem",
//			"type" : "POST",
//			data : {testItemid:ids},
//			"success" : function(data) {
//				resolutionData(data);
//				search();//刷新list
//			}
//		});
//	});*/
//	//////////////////////////////////////////////////////////////
//	var checkedItems = tableList.datagrid('getChecked');
//    if (checkedItems.length == 0) {
//        showMessage('请选择要删除的数据!');
//        return false;
//    }
//
//    var names = [];
//    var ids = [];
//    $.each(checkedItems, function (index, item) {
//        if (item.status == true) {
//            names.push(item.name);
//        } else {
//            ids.push(item.stringId);
//        }
//    });
//    if (names.length > 0) {
//        showMessage("名称【" + names.join(",") + '】启用状态，不允许删除!');
//        return false;
//    }
//
//    $.messager.confirm("提示", "是否删除所选中的记录？", function (r) {
//        if (r) {
//            $.ajax({
//                url: ctx+"/pm/testItem/deleteTestItem",
//                type: "POST",
//                data: {
//                	testItemid: ids.join(",")
//                },
//                success: function (data) {
//                	resolutionData(data);
//                    tableList.datagrid('reload');
//                },
//                error: function () {
//                }
//            });
//        }
//
//    });
//	////////////////////////////////////////////////////////////////////
//}
//
////导出
//function download(){
//	var searchStr = $("#testItem_searchStr").val().trim();  //搜索输入框的值
//	var status = $("#testItem_searchStatus").attr("value"); //状态
//	var orderType = $("#testItem_orderType").attr("value");//排序
//	if(status==''||status==null||status=='null'){
//		status=2;
//	}
//	if(orderType==''||orderType==null||orderType=='null'){
//		orderType=0;
//	}
//	window.location.href = ctx + "/pm/testItem/exportTestItemExcel?searchStr="+searchStr+"&status="+status+"&orderType="+orderType;
//}
///****************************************UI整改***********************************************************/
//var tableList;
//$(function() {
//	tableList = $('#testItem_userManagerList');
//	tableList.datagrid({
//		url :  ctx +'/pm/testItem/testItemList',
//		method : 'post',
//		height : 500,
//		fitColumns : true,
//		 pagination: true,
//		fit : false,
//		checkOnSelect : false,
//		selectOnCheck : false,
//		columns : [ [
//			{field : "ck",checkbox : true,width : 30},
//			{title : "达安标准码",field : 'codeNo',flex : 1,width : 60},
//			{title : "项目名称",field : 'name',flex : 1,width : 60},
//			{title : "英文名称",field : 'enName',flex : 1,width : 60},
//			{title : "英文简称",field : 'enShortName',flex : 1,width : 60},
//			{title : "项目性别",field : 'sexId',flex : 1,width : 60,
//				formatter : function(value) {
//					var returnStr = '不限';
//						if (value == '1') {
//							returnStr = '男';
//						}
//						if (value == '2') {
//							returnStr = '女';
//						}
//							return returnStr;
//						}},
//			{title : "检验方法",field : 'testMethodName',flex : 1,width : 60},
//			{title : "医学专业组",field : 'disciplineName',flex : 1,width : 60},
//			{title : "默认标本类型",field : 'sampleTypeName',flex : 1,width : 60},
//			{title : "助记符",field : 'fastCode',flex : 1,width : 60},
//			{title : "顺序号",field : 'displayOrder',flex : 1,width : 60},
//			{title : "状态",field : 'status',formatter : function(value, row, index) {
//				var returnStr = '<div class="status-switch"><input type="checkbox" name="status" onchange="changeStatus(\'' + index + '\',\'' + row.stringId + '\',\'' + value + '\')" /><i></i></div>';
//					if (value == '1') {
//						returnStr = '<div class="status-switch"><input type="checkbox" name="status" checked="checked" onchange="changeStatus(\'' + index + '\',\'' + row.stringId + '\',\'' + value + '\')" /><i></i></div>';
//					}
//						return returnStr;
//					}},
//			{title : "操作",field : 'opt',width : 60,align : 'center',
//									formatter : function(value, row,index) {
//										var str = "";
//
//										str += '<a class="icon icon-edit" onclick="showAddAndEditDialog('+ index+ ',\'edit\')"></a>';
//										str += '<a class="icon icon-trash" onclick="deleteRow(' + index + ',this)"></a>';
//										return str;
//									}
//			} ] ],
//					//                autoRowHeight: false,
//					//                pagination: true,
//					//                pageSize: 10
//			}).pagination({
//			beforePageText : '第',//页数文本框前显示的汉字
//			afterPageText : '页    共 {pages} 页',
//			displayMsg : '共{total}条数据',
//			total : 26,
//			pageSize : 10,
//			pageNumber : 1
//		});
//
//	/*自适应表格*/
//	function tableAutoWidth() {
//		var width = tableList.parents('.tabs-panels').width() - 40;
//		tableList.datagrid('resize', {
//			width : width
//		});
//	}
//
//	$(window).on('resize', function() {
//		tableAutoWidth();
//	});
//	//单击事件
//	$('#testItem_ul_status li').click(function(){
//		$("#testItem_ul_status > li.selected").removeClass("selected");
//		$(this).addClass("selected");
//	    $("#testItem_searchStatus").html($(this).html());
//	    $("#testItem_searchStatus").attr("value",$(this).attr("value"));
//	    pageQuery();
//	});
//	$('#testItem_ul_order li').click(function(){
//		$("#testItem_ul_order > li.selected").removeClass("selected");
//		$(this).addClass("selected");
//	    $("#testItem_orderType").html($(this).html());
//	    $("#testItem_orderType").attr("value",$(this).attr("value"));
//	    pageQuery();
//	});
//
//	$("#testItem_searchStr").focus();
//});
///*编辑*/
//function editRow(index, row) {
//
//
////	var param = {"age" :18};
////	$("#testItem_userManagerList").datagrid("load", param);
//	 console.log(row[index]);
//}
///*删除行*/
//function deleteRow(index) {
//	var rowData = tableList.datagrid('getData').rows[index];
//	var status=rowData.status;
//	var id=rowData.stringId;
//	 if (status == true) {
//	        showMessage('当前选中记录已启用，不允许删除！');
//	        return;
//	    }
//	    $.messager.confirm("提示", "你确定要删除吗?", function (r) {
//	        if (r) {
//	            $.ajax({
//	                url:  ctx+"/pm/testItem/deleteTestItem",
//	                type: "POST",
//	                data: {
//	                	testItemid:id
//	                },
//	                success: function (data) {
//	                   resolutionData(data);
//	                    tableList.datagrid('deleteRow', index);
//	                    pageQuery();
//	                },
//	                error: function () {
//	                }
//	            });
//	        }
//	    });
//}
//
///*重置密码*/
//function resetPassword(index) {
//	//            var rowData = tableList.datagrid('deleteRow', index);
//	$.messager.confirm("重置密码", "是否确认重置密码?", function(r) {
//	});
//}
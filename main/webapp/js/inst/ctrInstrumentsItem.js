var iir_canStore = true;
var iir_addTestItemIds = "";
var iir_delTestItemIds = "";

//加载数据列表相关变量
var iir_instrumentItemList;
var iir_instrumentRefrangeList;
var iir_instrumentSelectList;
var iir_addInstrumentItemLeft;
var iir_addInstrumentItemRight;
var iir_addInstrumentItemBtn;
var iir_removeInstrumentItemBtn;

$(function() {
	iir_instrumentItemList = $('#iir_instrumentItemList');
	iir_instrumentRefrangeList = $('#iir_instrumentRefrangeList');
	iir_instrumentSelectList = $('#iir_instrumentSelectList');
	iir_addInstrumentItemLeft = $('#iir_addInstrumentItemLeft');
	iir_addInstrumentItemRight = $('#iir_addInstrumentItemRight');
	//绑定前台通讯类、状态单击事件
	$('#iir_ul_frontClass li').click(function(){
	    $("#iir_frontClass").html($(this).html());
	    $("#iir_frontClass").attr("value",$(this).attr("value"));
	    iir_queryInstruments();
	});
	$('#iir_ul_status li').click(function(){
	    $("#iir_status").html($(this).html());
	    $("#iir_status").attr("value",$(this).attr("value"));
	    iir_queryInstruments();
	});
	
	//绑定仪器项目对照列表事件开始
	iir_instrumentItemListOpt.onClickCell=iir_onClickCell;
	iir_instrumentItemList.datagrid(iir_instrumentItemListOpt); //绑定仪器项目对照列表事件结束
	
	//绑定选中项目参考值列表开始
    iir_instrumentRefrangeList.datagrid(iir_instrumentRefrangeListOpt); //绑定选中项目参考值列表结束
	
    //绑定仪器选择列表开始
    $(document).on('click', '.J_instrumentList', function() {
//	    iir_instrumentSelectList.datagrid(iir_instrumentSelectListOpt).pagination(iir_defaultPageOpt);
	    iir_queryInstruments(1);
	}); //绑定仪器选择列表事件结束

	$(document).on('click', '.J_addInstrumentItem', function (e) {
		//先检查是否已选仪器
		var instrumentId = $("#iir_instrumentId").val();
		if (instrumentId == '') {
			showMessage("请选择仪器");
			return;
		}
		showPop(e); //弹出窗口
		
		var queryParams = iir_addInstrumentItemLeftOpt.queryParams;
		if (queryParams == undefined) {
			queryParams = [];
		}
		queryParams.instrumentId = instrumentId;
		iir_addInstrumentItemLeftOpt.queryParams = queryParams;
		
		var queryParams2 = iir_addInstrumentItemRightOpt.queryParams;
		if (queryParams2 == undefined) {
			queryParams2 = [];
		}
		queryParams2.instrumentId = instrumentId;
		iir_addInstrumentItemRightOpt.queryParams = queryParams2;
	    iir_addInstrumentItemLeft.datagrid(iir_addInstrumentItemLeftOpt);	    
	    iir_addInstrumentItemRight.datagrid(iir_addInstrumentItemRightOpt);
	    
	    //设置已包含的个数
	    $("#iir_containItemCount").text(iir_addInstrumentItemLeft.datagrid("getData").total);
	});

	//仪器项目列表加载完成后选中第一行
	iir_instrumentItemList.datagrid({onLoadSuccess : function(data){
		if (iir_instrumentItemList.datagrid("getData").total > 0) { //如果有数据，选中第一行
//			iir_instrumentItemList.datagrid('selectRow', 0);
			iir_onClickCell(0, "name");
		}
	}});

	/**
	 * 绑定排序下拉列表的点击事件
	 */
	$(document).on('click', '.J_instrumentItemOrder > li', function() {
		//变化样式
		$(".J_instrumentItemOrder > li.selected").removeClass("selected");
		$(this).addClass("selected");
		//触发查询
		iir_queryInstrumentItems();
	});

	//绑定项目参考范围添加按钮事件
	$(document).on('click', '.J_instItemDescAdd', function(e) {
		//先检查是否已选仪器
		var instrumentId = $("#iir_instrumentId").val();
		var testItemId = $("#iir_testItemId").val();
		if (instrumentId == '') {
			showMessage("请选择仪器");
			return;
		}
		if (testItemId == '') {
			showMessage("请选择仪器项目");
			return;
		}
		$("#iir_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
//		$("#iir_instRefAddForm").attr("action", ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
		showPop(e);
	});
	
//	iir_instrumentSelectList.datagrid({ onClickRow:
//	    function () {
//	        //单击行的时候，将单选按钮设置为选中
//	        var id = iir_instrumentSelectList.datagrid("getSelected");
//	        $("input[name='instrument']").each(function () {
//	            if ($(this).val() == id.idString) {
//	                $(this).attr("checked", true);
//	            }
//	        });
//	    }
//	});
	
	$("#iir_testMethodId").combobox({onChange: function () {
		iir_queryTestItems();
	}});
});

//处理可编辑的单元格
$.extend($.fn.datagrid.methods, {
	editCell : function(jq, param) {
		return jq.each(function() {
			var opts = $(this).datagrid("options");
			var fields = $(this).datagrid('getColumnFields', true).concat(
					$(this).datagrid('getColumnFields'));
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field) {
					col.editor = null;
				}
			}
			$(this).datagrid("beginEdit", param.index);
			
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});


var iir_editIndex = undefined;
var iir_curIndex = -1;
function iir_endEditing() {
	if (iir_editIndex == undefined) {
		return true
	}
	if (iir_instrumentItemList.datagrid('validateRow', iir_editIndex)) {
		iir_instrumentItemList.datagrid('endEdit', iir_editIndex);
		iir_editIndex = undefined;
		return true;
	} 
	return false;
}

/**.
 * 点击仪器项目列表的单元格事件
 * @param index
 * @param field
 */
function iir_onClickCell(index, field) {
	if (iir_endEditing()) {
		iir_instrumentItemList.datagrid('selectRow', index).datagrid('editCell', {
			index : index,
			field : field
		});
		//如果是可编辑的框，获得焦点
		var editor = iir_instrumentItemList.datagrid('getEditor', {index: index, field: field});
	    if (editor != null) {
	    	editor.target.focus();
	    }
//		if (iir_curIndex != index) { //重复点击当前行，不重新加载（根据情况选择是否加该判断）
			var rowData = iir_instrumentItemList.datagrid('getData').rows[index];
			var testItemId = rowData.testItemId;
			$("#iir_testItemId").val(testItemId);
			//触发查询
			iir_queryItemRefrange();
//		}
		iir_curIndex = index;
		iir_editIndex = index;
	}
}

/**.
 * 选择仪器页面的“确定”按钮事件
 */
function iir_comfirmInstrumentSlt(e){
	var selectRow = $("#iir_instrumentList input[type='radio']:checked");
	if (selectRow == undefined || selectRow.length <= 0) {
		showMessage("请先选择一个仪器");
		return;
	}
	var index = $(selectRow).attr("datagrid-row-index");
	var rowData = iir_instrumentSelectList.datagrid('getData').rows[index];
	
	var instrumentId = rowData.idString;
	var instrumentName = rowData.name;
	$("#iir_instrumentId").val(instrumentId);
	$("#iir_instrumentName").text(instrumentName);
	//关闭窗口
	iir_closePop(e);
	//触发查询
	iir_queryInstrumentItems();
	$("#iir_testItemId").val("");
	//清空项目参考范围列表
	iir_instrumentRefrangeList.datagrid('loadData', { total: 0, rows: [] });
}

/**.
 * 按条件查询仪器
 */
function iir_queryInstruments(init){
	if(init==1){	
		$("#iir_frontClass").html('全部');
	    $("#iir_frontClass").attr("value","2");
	    $("#iir_status").html('全部');
	    $("#iir_status").attr("value","2");
	    $("#iir_instrumentSchStr").val('');
	}
	var queryParams = iir_instrumentSelectListOpt.queryParams;
	if (queryParams == undefined) {
		queryParams = [];
	}
	var frontClassName=$("#iir_frontClass").attr("value");
	var status=$("#iir_status").attr("value");
	queryParams.searchStr =trim( $("#iir_instrumentSchStr").val());
	queryParams.frontClassName = frontClassName;
	queryParams.status = status;
	iir_instrumentSelectListOpt.queryParams = queryParams;
	iir_instrumentSelectList.datagrid(iir_instrumentSelectListOpt).pagination(iir_defaultPageOpt);
}

function iir_queryTestItems(){
	var opts = iir_addInstrumentItemRight.datagrid("options");
	var queryParams = opts.queryParams;
	if (queryParams == undefined) {
		queryParams = [];
	}
	queryParams.addItemSearchStr = $("#iir_itemSchStr").val();
	queryParams.testMethodId = $('#iir_testMethodId').combobox('getValue');
	opts.queryParams = queryParams;
	iir_addInstrumentItemRight.datagrid(opts);
}
/**.
 * 查询选中仪器下的仪器项目
 */
function iir_queryInstrumentItems(){
	//当前选中的仪器
	var instrumentId = $("#iir_instrumentId").val();
	if (instrumentId == '') { //没有仪器，不执行查询
		return;
	}
	//获取当前选中排序值
	var orderBy = $(".J_instrumentItemOrder > li.selected").val();
	//项目查询条件
	var itemName = $("#iir_itemName").val();
	
	var opts = iir_instrumentItemList.datagrid("options");
	opts.url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemList";
	var queryParmas = opts.queryParams;
	queryParmas.instrumentId = instrumentId;
	queryParmas.orderBy = orderBy;
	queryParmas.addItemSearchStr = itemName;
	
	iir_instrumentItemList.datagrid(opts);
}

function iir_queryItemRefrange(){

	//加载当前仪器项目的参考范围
	var opts = iir_instrumentRefrangeList.datagrid("options");
	opts.url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeList";
	//当前选中的仪器
	var instrumentId = $("#iir_instrumentId").val();
	if (instrumentId == '') { //没有仪器，不执行查询
		return;
	}
	//当前选中的仪器项目
	var testItemId = $("#iir_testItemId").val();
	if (testItemId == '') { //没有仪器项目，不执行查询
		return;
	}
	//获取当前选中排序值
	var orderBy = $(".J_itemRefrangeOrder > li.selected").val();
	var queryParams = opts.queryParams;
	if (queryParams == undefined) {
		queryParams = [];
	}
	queryParams.orderBy = orderBy;
	queryParams.testItemId = testItemId;
	queryParams.instrumentId = instrumentId;
	
	iir_instrumentRefrangeList.datagrid(opts);
}
function iir_editRefrange(index, event){
	var rowData = iir_instrumentRefrangeList.datagrid("getData").rows[index];
	var id = rowData.idString;
	$("#iir_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeEdit");
//	$("#iir_instRefAddForm").attr("action", ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeEdit");
	iir_findRefrangeInfo(id, true);
}
function iir_copyRefrange(index, event){
	var rowData = iir_instrumentRefrangeList.datagrid("getData").rows[index];
	var id = rowData.idString;
	$("#iir_refrangeActionUrl").val(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
//	$("#iir_instRefAddForm").attr("action", ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd");
	iir_findRefrangeInfo(id, false);
}
function iir_findRefrangeInfo(id, isEdit){
	
	//从后台查出最新数据
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeInfo",
		"type" : "POST",
		data: {id: id},
		"success" : function(data) {
			var entity = data.entity;
			if(entity.idString == ''){
				// 有重叠
				showMessage('数据不存在或已被删除！',function(){
					//刷新列表
					iir_queryInstrumentItems();
				});
			} else {
				iir_setRefrangeInfo(entity, isEdit);
			}
		},
		"error" : function() {
		}
	});
}
function iir_setRefrangeInfo(rowData, isEdit){
	//打开页面
	dialog("iir_instrumentRefrangeAdd", {
        width: 420
    }, function(){
    	if (isEdit) {
    		$("#iir_refrangeId").val(rowData.idString);
    	}
    	var sampleTypeId = rowData.sampleTypeId;
    	if ($('#iir_sampleTypeId').find("option[value='"+sampleTypeId+"']").length == 0) {
    		$('#iir_sampleTypeId').combobox('setValue', '['+rowData.sampleTypeName+']停用');
    	} else {
    		$('#iir_sampleTypeId').combobox('setValue', sampleTypeId+'');
    	}
    	var sexId = rowData.sexId;
    	if ($('#iir_sexId').find("option[value='"+sexId+"']").length == 0) {
    		$('#iir_sexId').combobox('setValue', '['+rowData.sexName+']停用');
    	} else {
    		$('#iir_sexId').combobox('setValue', sexId+'');
    	}
    	var ageUnitId = rowData.ageUnitId;
    	if ($('#iir_ageUnitId').find("option[value='"+ageUnitId+"']").length == 0) {
    		$('#iir_ageUnitId').combobox('setValue', '['+rowData.ageUnitName+']停用');
    	} else {
    		$('#iir_ageUnitId').combobox('setValue', ageUnitId+'');
    	}
    	
    	$('#iir_sexId').combobox('setValues', rowData.sexId+'');
    	$('#iir_ageUnitId').combobox('setValues', rowData.ageUnitId+'');
    	$("#iir_ageMin").numberbox('setValue', rowData.ageMin);
    	$("#iir_ageMax").numberbox('setValue', rowData.ageMax);
    	
//    	$("#iir_sampleTypeId").val(rowData.sampleTypeId);
//    	$("#iir_sexId").val(rowData.sexId);		
//    	$("#iir_ageUnitId").val(rowData.ageUnitId);
//    	$("#iir_ageMin").val(rowData.ageMin);		
//    	$("#iir_ageMax").val(rowData.ageMax);		
    	$("#iir_calcAgeMin").val(rowData.calcAgeMin);	
    	$("#iir_calcAgeMax").val(rowData.calcAgeMax);	
    	$("#iir_refLow").val(rowData.refLow);		
    	$("#iir_refHigh").val(rowData.refHigh);	
    	$("#iir_panicLow").val(rowData.panicLow);	
    	$("#iir_panicHigh").val(rowData.panicHigh);	
    	$("#iir_alarmLow").val(rowData.alarmLow);	
    	$("#iir_alarmHigh").val(rowData.alarmHigh);	
    	$("#iir_refText").val(rowData.refText);	
    	$("#iir_refRemark").val(rowData.refRemark);
    });
}
/* 删除行 */
function iir_deleteDescRow(index) {
	var id = iir_instrumentRefrangeList.datagrid("getData").rows[index].idString;

	//进入后台删除
	showConfirm('是否删除当前记录？',function(){
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeDelete",
			"type" : "GET",
			data: "id="+id,
			"success" : function(data) {
				//从页面中删除
				resolutionData(data);
				iir_instrumentRefrangeList.datagrid("deleteRow", index);
			},
			"error" : function() {
			}
		});
	});
}

function iir_closePop(e){
	$(e).parents('.pop').hide();
}
function iir_closeRefPop(){
	//先清空页面数据
	iir_clearRefrangeInfo();
	//关掉
	$("#iir_instrumentRefrangeAdd").hide();
	return false;
}
function iir_saveInstDesc(){
	//防止重复提交
    if(!iir_canStore){
 		return false;
    }
    
	formTextTrim("iir_instRefAddForm");
	//处理掉不可用的数据
	var sampleTypeId = $('#iir_sampleTypeId').combobox('getValue');
	//如果下拉框里没有该数据，清空
	if ($("#iir_sampleTypeId > option[value='"+sampleTypeId+"']").length == 0) {
		$('#iir_sampleTypeId').combobox('setValue', "");
	}
	var ageUnitId = $('#iir_ageUnitId').combobox('getValue');
	//如果下拉框里没有该数据，清空
	if ($("#iir_ageUnitId > option[value='"+ageUnitId+"']").length == 0) {
		$('#iir_ageUnitId').combobox('setValue', "");
	}
	var sexId = $('#iir_sexId').combobox('getValue');
	//如果下拉框里没有该数据，清空
	if ($("#iir_sexId > option[value='"+sexId+"']").length == 0) {
		$('#iir_sexId').combobox('setValue', "");
	}
	if(!iir_validateRefrangeSave()){
		iir_canStore = true;
		return;
	}

	var instrumentId = $("#iir_instrumentId").val();
	var testItemId = $("#iir_testItemId").val();
	var formData = $("#iir_instRefAddForm").serialize() + "&instrumentId="+instrumentId+"&testItemId="+testItemId;
	
	// 检查是否年龄段重叠
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemIfOverlap",
		"type" : "POST",
		data:formData,
		"success" : function(data) {
			if(data.indexOf("err|") == 0){
				// 有重叠
				showMessage('相同的样本类型、性别、年龄单位情况下，年龄段范围不可以重叠！',function(){
					iir_canStore = true;
					$("#iir_ageMin").focus();
				});
			} else {
				// 无重叠，继续
				iir_doAddRefrange(formData);
			}
		},
		"error" : function() {
		}
	});
}

function iir_doAddRefrange(formData){
	var actionUrl = $("#iir_refrangeActionUrl").val();
//	var actionUrl = $("#iir_instRefAddForm").attr("action");
	if (actionUrl == '') {
		actionUrl = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd";
	}
	iir_canStore = false;
	$.ajax({
		url: actionUrl,
		type: "POST",
		data:formData,
		
		success : function(data) {
			iir_canStore = true;
			resolutionData(data);
			$("#iir_saveInstrumentRefrange").parents('.pop').hide();
			iir_queryItemRefrange();//刷新list
			//清空项目参考范围添加页面的数据
			iir_clearRefrangeInfo();
		},
		error : function() {
			iir_canStore = true;
		}
	});
}
/**
 * 验证保存的必填条件
 * return 
 */
function iir_validateRefrangeSave(){
	var ageUnitId = $("#iir_ageUnitId").val();
	var ageMin = $("#iir_ageMin").val();
	var ageMax = $("#iir_ageMax").val();

	if(ageMin == ''){
		showMessage('起始年龄为空，请重新输入！',function(){
			$("#iir_ageMin").focus();
		});
		return false;
	}
	if(ageMax == ''){
		showMessage('结束年龄为空，请重新输入！',function(){
			$("#iir_ageMax").focus();
		});
		return false;
	}
	if(ageUnitId!='6' && isNaN(ageMin)){
		showMessage('年龄单位不是【详细年龄】，起始年龄请输入数字！',function(){
			$("#iir_ageMin").focus();
		});
		return false;
	}
	if(ageUnitId!='6' && isNaN(ageMax)){
		showMessage('年龄单位不是【详细年龄】，结束年龄请输入数字！',function(){
			$("#iir_ageMax").focus();
		});
		return false;
	}
	if(ageUnitId!='6' && ageMax>200){
		showMessage('结束年龄要求小于200，请重新输入！',function(){
			$("#iir_ageMax").focus();
		});
		return false;
	}
	
	return true;
}

function iir_clearRefrangeInfo(){
	$("#iir_instRefAddForm")[0].reset();
	$("#iir_refrangeId").val("");
	$('#iir_sampleTypeId').combobox('setValue', '');
	$('#iir_ageUnitId').combobox('setValue', '');
	$('#iir_sexId').combobox('setValue', '');
}

//批量删除参考值
function iir_deleteRefrangeBatch(){
	var ids = "";
	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
	
	var sltedRowDatas = iir_instrumentRefrangeList.datagrid("getChecked");
	if (sltedRowDatas == undefined || sltedRowDatas.length <= 0) {
		showMessage("请选择要删除的参考值！");
		return false;
	}
	for (var i in sltedRowDatas) {
		ids2 += sltedRowDatas[i].idString + ",";
	}
	
	showConfirm('是否删除所选中的参考值？',function(){
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsRegrangeDeleteBatch",
			"type" : "GET",
			data:"ids="+ids2,
			"success" : function(data) {
				resolutionData(data);
				iir_queryItemRefrange();//刷新list
			},
			"error" : function() {
			}
		});
	});
}
//批量删除项目
function iir_deleteItemBatch(){
	var ids = "";
	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
	
	var sltedRowDatas = iir_instrumentItemList.datagrid("getChecked");
	if (sltedRowDatas == undefined || sltedRowDatas.length <= 0) {
		showMessage("请选择要删除的项目！");
		return false;
	}
	for (var i in sltedRowDatas) {
		ids2 += sltedRowDatas[i].id + ",";
	}
	
	showConfirm('是否删除所选中的项目？',function(){
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemDeleteBatch",
			"type" : "GET",
			data:"ids="+ids2,
			"success" : function(data) {
				resolutionData(data);
				iir_queryInstrumentItems();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

/*获取数据行*/
function iir_makeToArray(obj) {
    return Array.prototype.slice.call(obj);
}

/*左右数据切换*/
iir_addInstrumentItemBtn = $('#iir_addInstrumentItemBtn');
iir_removeInstrumentItemBtn = $('#iir_removeInstrumentItemBtn');
//左移按钮事件
iir_addInstrumentItemBtn.on('click', function () {
    var addInstrumentItemData = iir_addInstrumentItemRight.datagrid('getChecked');

    if (addInstrumentItemData == undefined || addInstrumentItemData.length <= 0) {
    	showMessage("请选择要添加的项目！");
    	return;
    }
    iir_makeToArray(addInstrumentItemData).forEach(function (element, index) {
        var rowIndex = iir_addInstrumentItemRight.datagrid("getRowIndex", element);
        iir_addInstrumentItemRight.datagrid('deleteRow', rowIndex);
        iir_addInstrumentItemLeft.datagrid('appendRow', element);
        var id = element.idString;
        iir_delTestItemIds = iir_delTestItemIds.replace(id+",", ''); //删除的id中去掉该id
        iir_addTestItemIds += id + ","; //新增的id中加上该id
    });
});
//右移移按钮事件
iir_removeInstrumentItemBtn.on('click', function () {
    var removeInstrumentItemData = iir_addInstrumentItemLeft.datagrid('getChecked');
    if (removeInstrumentItemData == undefined || removeInstrumentItemData.length <= 0) {
    	showMessage("请选择要移除的项目！");
    	return;
    }
    iir_makeToArray(removeInstrumentItemData).forEach(function (element, index) {
        var rowIndex = iir_addInstrumentItemLeft.datagrid("getRowIndex", element);
        iir_addInstrumentItemLeft.datagrid('deleteRow', rowIndex);
        iir_addInstrumentItemRight.datagrid('appendRow', element);
        var id = element.idString;
        iir_addTestItemIds = iir_addTestItemIds.replace(id+",", ''); //新增的id中去掉该id
        iir_delTestItemIds += id + ","; //删除的id中加上该id
    });
});

//添加项目页面，点击确定
function iir_confirmInstrumentItemAdd(e){
	
	//iir_addTestItemIds = iir_addTestItemIds.replace(/, /g,''); //删除空的id
	//iir_delTestItemIds = iir_delTestItemIds.replace(/, /g,''); //删除空的id
	
	if((iir_addTestItemIds!=null && iir_addTestItemIds!='')
		|| (iir_delTestItemIds!=null && iir_delTestItemIds!='')){
		// 提交
		
		var instrumentId = $("#iir_instrumentId").val();
		var data = "instrumentId="+instrumentId+"&addTestItemIds="+iir_addTestItemIds+"&delTestItemIds="+iir_delTestItemIds;
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddBatch",
			"type" : "GET",
			data:data,
			"success" : function(data) {
				//清空数据
				resolutionData(data);
				iir_addTestItemIds = "";
				iir_delTestItemIds = "";
				iir_closePop(e);
				iir_queryInstrumentItems();//刷新list
			},
			"error" : function() {
			}
		});
	} else {
		//清空数据
		iir_addTestItemIds = "";
		iir_delTestItemIds = "";
		iir_closePop(e);
	}
}


// 保存对照列表
function iir_saveItemList() {
	//所有输入框结束编辑
	iir_endEditing();
	// 防止重复提交
	if (!iir_canStore) {
		return false;
	}

	// 空表格直接返回
	var rowData = iir_instrumentItemList.datagrid('getData');
	if (rowData == undefined || iir_instrumentItemList.datagrid('getData').total == 0) {
		showMessage("没有可保持的数据");
		iir_canStore = true;
		return false;
	}

	iir_canStore = false;
	// 去除多余空格
//	formTextTrim("itemListForm");

	//组装数据
	var rows = rowData.rows;
	var formData = [];
	for (var i in rows) {
		var row = rows[i];
		var id = row.id;
		var channelCode = row.channelCode;
		var factor = row.factor;
		var printOrder = row.printOrder;
		var unit = row.unit;
		formData.push({name: "txtId", value: id});
		formData.push({name: "txtChannelCode", value: channelCode});
		formData.push({name: "txtFactor", value: factor});
		formData.push({name: "txtPrintOrder", value: printOrder});
		formData.push({name: "txtUnit", value: unit});
	}
	var instrumentId = $("#iir_instrumentId").val();
	formData.push({name: "instrumentId", value: instrumentId});
	
	// 栏位校验
	if (!iir_validateItemSave(rows)) {
		iir_canStore = true;
		return;
	}
	// 修改
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemSave",
		"type" : "POST",
		data : formData,
		"success" : function(data) {
			iir_canStore = true;
		/*	showMessage("保存成功", function(){
				//刷新列表
				
			});*/
			resolutionData(data);
			iir_queryInstrumentItems();
//			if (data != null && data != '') {
//				resolutionData(data);
//			}
		},
		"error" : function() {
			iir_canStore = true;
		}
	});
}

/**
 * 验证保存的必填条件 return
 */
function iir_validateItemSave(rows) {
	var bRet = true;

	// 通道码
	var channelCodeString = "";
	for (var i in rows) {
		var row = rows[i];
		var instrItemId = row.id;
		var channelCode = row.channelCode;
		var factor = row.factor;
		var printOrder = row.printOrder;
		var unit = row.unit;
		
		if (channelCode != null && channelCode != '') {
			if (channelCodeString.indexOf(channelCode + "&&$$##") == -1) {
				channelCodeString += channelCode + "&&$$##";
			} else {
				bRet = false;
				showMessage("第"+(+i+1)+"行的仪器通道码["+channelCode+"]有重复，请重新输入！", function() {
//					$("#" + objId).focus();
				});
				return false;
			}
		}
		if (factor != null && factor != '' && isNaN(factor)) {
			bRet = false;
			showMessage("第"+(+i+1)+"行的转换系数必须为数字，请重新输入！", function() {
//				$("#" + objId).focus();
			});
			return false;
		}
		
		if (printOrder == null || printOrder == '') {
			bRet = false;
			showMessage("第"+(+i+1)+"行的打印次序为空，请重新输入！", function() {
//				$("#" + objId).focus();
			});
			return false;
		}
	}

	return bRet;
}
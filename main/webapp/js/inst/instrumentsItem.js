var canStore = true;

var addTestItemIds = "";
var delTestItemIds = "";
var newRowMap = new Map(); //记录左右移的tr行数据

var sampleTypeGrid;//默认标本类型
var testMethodGrid;//检验方法

//默认标本类型Grid
var sampleTypeParam = {					//下拉Grid参数,所有参数均为必填
	div_id:"sampleTypeDiv", 			//对应表单DIV的id
	grid_id:"gridSampleType", 			//对应数据源Grid的Id
	name:"sampleTypeId",				//在表单中对应的提交name
	columnShow:1,						//将要在文本框中显示的列序号
	width : 180, 					    //Combo的宽度
	clearOff:false,						//是否禁用clear按钮
	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};
//检验方法Grid
var testMethodParam = {					//下拉Grid参数,所有参数均为必填
	div_id:"testMethodDiv", 			//对应表单DIV的id
	grid_id:"gridTestMethod", 			//对应数据源Grid的Id
	name:"testMethodId",				//在表单中对应的提交name
	columnShow:1,						//将要在文本框中显示的列序号
	width : 180, 					    //Combo的宽度
	clearOff:false,						//是否禁用clear按钮
	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};

// 关闭窗口
function closeWin(){
	// 清零
	delTestItemIds = "";
    addTestItemIds = "";
    newRowMap.clear();
    
    $(".oy").remove();
    $(".xinxi").empty();
    $(".xinxi").hide();
}

// 打开仪器选择界面
function openSelectInstrument(){
	var data = "";
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsMain";
	$("#openPageDiv").load(url,data,function(){
		$("body").append("<div class='oy'></div>");
		$("#openPageDiv").width(700);
		$("#openPageDiv").height(470);
		$("#openPageDiv").show();
	});
}

// 仪器选择页面，查询List，给翻页使用
function pageQuery(){
	var pageNo =$("#pageNo").val();
	var pageSize = $("#pageSize").val();
	if(pageNo == 'undefined' || pageNo == null){
		pageNo = 1;
	}
	if(pageSize == 'undefined' || pageSize == null){
		pageSize = 5;
	}

	var frontClassName = $("#frontClassName").val();
	var status = $("#status").val();
	var sort = $("#sort").val();
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsPageList";
	$("#infoPageDiv").load(url,{frontClassName:frontClassName,status:status,sort:sort,pageNo:pageNo,pageSize:pageSize},function(){
		$("#infoPageDiv").show();
	});
}

//仪器选择页面，查询List， 实时查询数据
function pageQuery_realtime(){
	var pageNo = 1;
	var pageSize = $("#pageSize").val();
	if(pageSize == 'undefined' || pageSize == null){
		pageSize = 5;
	}
	
	// 去除空格
	formTextTrim("rslForm");

	var searchStr = $("#searchStr").val();
	var frontClassName = $("#frontClassName").val();
	var status = $("#status").val();
	var sort = $("#sort").val();
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsPageList";
	$("#infoPageDiv").load(url,{searchStr:searchStr,frontClassName:frontClassName,status:status,sort:sort,pageNo:pageNo,pageSize:pageSize,realtime:1},function(){
		$("#infoPageDiv").show();
	});
}

// 仪器选择页面，选择某个仪器，点击确定
function selectOneInstrument(){
	// 判断是否有选择
	var instrumentString = $('input[name="instrumentRadio"]:checked').val();
	if(instrumentString == '' || instrumentString == 'undefined' || instrumentString == undefined){
		showMessage("请选择仪器！");
		return false;
	}
	
	// 关闭选择窗口
	closeWin();
	
	// 给父页面赋值
	var index = instrumentString.indexOf('_');
	var instrumentId = instrumentString.substring(0, index);
	var instrumentName = instrumentString.substring(index+1);
	$("#instrumentId").val(instrumentId);
	$("#instrumentName").val(instrumentName);
	
	// 父页面列表刷新
	testItemListQuery();
}

//查询项目对照List
function testItemListQuery(){
	var instrumentId = $("#instrumentId").val();
	if(instrumentId == 'undefined' || instrumentId == undefined){
		instrumentId = "";
	}
	var itemSearchStr = $("#itemSearchStr").val();
	if(itemSearchStr == 'undefined' || itemSearchStr == undefined){
		itemSearchStr = "";
	} else {
		$("#itemSearchStr").val(trim($("#itemSearchStr").val()));
		itemSearchStr = trim(itemSearchStr);
	}
	
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemList";
	$("#itemListDiv").load(url,{instrumentId:instrumentId,itemSearchStr:itemSearchStr},function(){
		$("#itemListDiv").show();
	});
}

//查询参考值List
function refrangeListQuery(){
	var instrumentId = $("#instrumentId").val();
	if(instrumentId == 'undefined' || instrumentId == undefined){
		instrumentId = "";
	}
	var testItemId = $("#testItemId").val();
	if(testItemId == 'undefined' || testItemId == undefined){
		testItemId = "";
	}
	
	var data = "instrumentId="+instrumentId+"&testItemId="+testItemId;
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeList";
	$("#refrangeListDiv").load(url,data,function(){
		$("#refrangeListDiv").show();
		
		// 设定选择的项目
		$("#testItemId").val(testItemId);
	});
}

// 项目对照列表，选择某行项目
function changeTr(id,instrumentId,testItemId){
	$("#testItemTable tr").removeClass("cur");
	$("#tr_" + id).attr("class","cur");

	// 查询参考值
	var data = "instrumentId="+instrumentId+"&testItemId="+testItemId;
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeList";
	$("#refrangeListDiv").load(url,data,function(){
		$("#refrangeListDiv").show();
		
		// 设定选择的项目
		$("#testItemId").val(testItemId);
	});
}

// 保存对照列表
function saveItemList(){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    
    // 空表格直接返回
	var itemRowsNum = $("#testItemTable tr").length - 1;
	if(itemRowsNum==0){
		return false;
	}
    
    // 去除多余空格
    formTextTrim("itemListForm");
    
    // 栏位校验
    if(!validateItemSave()){
		return ;
	}
    
	// 修改
	canStore = false;
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemSave",
		"type" : "POST",
		data:$("#itemListForm").serialize(),
		"success" : function(data) {
			canStore = true;
			if(data!=null&&data!=''){
				resolutionData(data);
			}
		},
		"error" : function() {
			canStore = true;
		}
	});
	
}

/**
 * 验证保存的必填条件
 * return 
 */
function validateItemSave(){
	var bRet = true;
	
	// 通道码
	var channelCodeString = "";
	var	formData = jQuery("#testItemTable input[name='txtChannelCode']");
 	formData.each(function(){
 		var objId = jQuery(this).attr("id");
		var channelCode = jQuery(this).val();
		if(channelCode!=null && channelCode!=''){
			if(channelCodeString.indexOf(channelCode+"&&$$##")==-1){
				channelCodeString += channelCode+"&&$$##";
			} else{
				bRet = false;
				showMessage('同一个仪器通道码不可以重复，请重新输入！',function(){
					$("#"+objId).focus();
				});
				return false;
			}
		}
 	});
	
	// 转换系数
 	var	formData2 = jQuery("#testItemTable input[name='txtFactor']");
 	formData2.each(function(){
 		var objId = jQuery(this).attr("id");
		var factor = jQuery(this).val();
		if(factor!=null && factor!='' && !validateDouble(factor)){
			bRet = false;
			showMessage('转换系数必须为正数或0，请重新输入！',function(){
				//jQuery(this).focus();
				$("#"+objId).focus();
			});
			return false;
		}
 	});
 	
	// 打印次序
 	var	formData3 = jQuery("#testItemTable input[name='txtPrintOrder']");
 	formData3.each(function(){
 		var objId = jQuery(this).attr("id");
		var printOrder = jQuery(this).val();
		if(printOrder==null || printOrder==''){
			bRet = false;
			showMessage('打印次序为空，请重新输入！',function(){
				//jQuery(this).focus();
				$("#"+objId).focus();
			});
			return false;
		}
		/*if(isNaN(printOrder)){
			bRet = false;
			showMessage('打印次序必须为数字，请重新输入！',function(){
				jQuery(this).focus();
			});
			return false;
		}*/
		if(validatePrintOrder(jQuery(this))){
			bRet = false;
			return false; 
		}
 	});
 		
	return bRet;
}

//进入参考值明细页面
function showRefrangeInfo(id, opType){
	var instrumentId = $("#instrumentId").val();
	if(instrumentId == '' || instrumentId == 'undefined' || instrumentId == undefined){
		return false;
	}
	var testItemId = $("#testItemId").val();
	if(testItemId == '' || testItemId == 'undefined' || testItemId == undefined){
		return false;
	}
	
	var url = '';
	var data = '';
	
	// 查看、新增、修改
	url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeInfo";
	data = "id="+id+"&opType="+opType;
	$("#openPageDiv").load(url,data,function(){
		$("body").append("<div class='oy'></div>");
		$("#openPageDiv").width(800);
		$("#openPageDiv").height(500);
		$("#openPageDiv").show();
	});
}

/**
 * 验证保存的必填条件
 * return 
 */
function validateRefrangeSave(){
	var sampleTypeId = sampleTypeGrid.getValue();
	var ageUnitId = $("#ageUnitId").val();
	var ageMin = $("#ageMin").val();
	var ageMax = $("#ageMax").val();

	if(sampleTypeId == ''){
		showMessage('标本类型为空，请重新输入！',function(){
			//$("#sampleTypeId").focus();
		});
		return false;
	}
	if(ageMin == ''){
		showMessage('起始年龄为空，请重新输入！',function(){
			$("#ageMin").focus();
		});
		return false;
	}
	if(ageMax == ''){
		showMessage('结束年龄为空，请重新输入！',function(){
			$("#ageMax").focus();
		});
		return false;
	}
	if(ageUnitId!='6' && (validateDisplayOrder("ageMin") || ageMin=='0')){
		showMessage('年龄单位不是【详细年龄】，起始年龄请输入正整数！',function(){
			$("#ageMin").focus();
		});
		return false;
	}
	if(ageUnitId!='6' && (validateDisplayOrder("ageMax") || ageMax=='0')){
		showMessage('年龄单位不是【详细年龄】，结束年龄请输入正整数！',function(){
			$("#ageMax").focus();
		});
		return false;
	}
	if(ageUnitId!='6' && ageMax>200){
		showMessage('结束年龄要求小于200，请重新输入！',function(){
			$("#ageMax").focus();
		});
		return false;
	}
	
	return true;
}

//新增参考值
function addRefrange(){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    
	formTextTrim("addForm");
	if(!validateRefrangeSave()){
		return;
	}

	var instrumentId = $("#instrumentId").val();
	var testItemId = $("#testItemId").val();
	var formData = $("#addForm").serialize() + "&instrumentId="+instrumentId+"&testItemId="+testItemId;;
	
	// 检查是否年龄段重叠
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemIfOverlap",
		"type" : "POST",
		data:formData,
		"success" : function(data) {
			if(data.indexOf("err|") == 0){
				// 有重叠
				showMessage('相同的样本类型、性别、年龄单位情况下，年龄段范围不可以重叠！',function(){
					$("#ageMin").focus();
				});
			} else {
				// 无重叠，继续
				doAddRefrange(formData);
			}
		},
		"error" : function() {
		}
	});
}
function doAddRefrange(formData){
	canStore = false;
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeAdd",
		"type" : "POST",
		data:formData,
		"success" : function(data) {
			canStore = true;
			closeWin();
			refrangeListQuery();//刷新list
		},
		"error" : function() {
			canStore = true;
		}
	});
}

//修改
function updateRefrange(row){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    
	formTextTrim("editForm");
	if(!validateRefrangeSave()){
		return;
	}
	
	var instrumentId = $("#instrumentId").val();
	var testItemId = $("#testItemId").val();
	var formData = $("#editForm").serialize() + "&instrumentId="+instrumentId+"&testItemId="+testItemId;;
	
	// 检查是否年龄段重叠
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemIfOverlap",
		"type" : "POST",
		data:formData,
		"success" : function(data) {
			if(data.indexOf("err|") == 0){
				// 有重叠
				showMessage('相同的样本类型、性别、年龄单位情况下，年龄段范围不可以重叠！',function(){
					$("#ageMin").focus();
				});
			} else {
				// 无重叠，继续
				doUpdateRefrange(formData);
			}
		},
		"error" : function() {
		}
	});
}
function doUpdateRefrange(formData){
	canStore = false;
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeEdit",
		"type" : "POST",
		data:formData,
		"success" : function(data) {
			canStore = true;
			var ret = resolutionData(data);
			closeWin();
			
			//刷新该行记录
			var jsonObj = eval('(' + ret + ')');
			//赋值
			$("#tr_ref_"+jsonObj.idString).children('td').eq(1).html(replaceHtml(jsonObj.sampleTypeName));
			if(jsonObj.sexId==1){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(2).html('男');
			} else if(jsonObj.sexId==2){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(2).html('女');
			} else if(jsonObj.sexId==3){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(2).html('不限');
			}
			if(jsonObj.ageUnitId==1){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(3).html('岁');
			} else if(jsonObj.ageUnitId==2){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(3).html('月');
			} else if(jsonObj.ageUnitId==3){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(3).html('周');
			} else if(jsonObj.ageUnitId==4){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(3).html('天');
			} else if(jsonObj.ageUnitId==5){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(3).html('小时');
			} else if(jsonObj.ageUnitId==6){
				$("#tr_ref_"+jsonObj.idString).children('td').eq(3).html('详细年龄');
			}			
			$("#tr_ref_"+jsonObj.idString).children('td').eq(4).html(replaceHtml(jsonObj.ageMin));
			$("#tr_ref_"+jsonObj.idString).children('td').eq(5).html(replaceHtml(jsonObj.ageMax));
			$("#tr_ref_"+jsonObj.idString).children('td').eq(6).html(replaceHtml(jsonObj.refHigh));
			$("#tr_ref_"+jsonObj.idString).children('td').eq(7).html(replaceHtml(jsonObj.refLow));
			$("#tr_ref_"+jsonObj.idString).children('td').eq(8).html(replaceHtml(jsonObj.panicHigh));
			$("#tr_ref_"+jsonObj.idString).children('td').eq(9).html(replaceHtml(jsonObj.panicLow));
			$("#tr_ref_"+jsonObj.idString).children('td').eq(10).html(replaceHtml(jsonObj.alarmHigh));
			$("#tr_ref_"+jsonObj.idString).children('td').eq(11).html(replaceHtml(jsonObj.alarmLow));
		},
		"error" : function() {
			canStore = true;
		}
	});
}

//删除参考值
function deleteRefrange(id){
	showConfirm('是否删除当前记录？',function(){
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemRefrangeDelete",
			"type" : "GET",
			data:"id="+id,
			"success" : function(data) {
				refrangeListQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

//批量删除参考值
function deleteRefrangeBatch(){
	var ids = "";
	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
		
	$("a[id='checkItem_ref']").each(function(){
		if($(this).attr("class") == 'yes'){
			ids += $(this).attr("value")+",";
			ids2 += $(this).attr("value")+",";
		} else {
			ids2 += " ,";
		}
	});
	
	if(ids == ''){
		showMessage("请选择要删除的参考值！");
		return false;
	}
	
	showConfirm('是否删除所选中的参考值？',function(){
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsRegrangeDeleteBatch",
			"type" : "GET",
			data:"ids="+ids2,
			"success" : function(data) {
				//resolutionData(data);
				refrangeListQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

//批量删除项目
function deleteItemBatch(){
	var ids = "";
	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
		
	$("a[id='checkItem_item']").each(function(){
		if($(this).attr("class") == 'yes'){
			ids += $(this).attr("value")+",";
			ids2 += $(this).attr("value")+",";
		} else {
			ids2 += " ,";
		}
	});
	
	if(ids == ''){
		showMessage("请选择要删除的项目！");
		return false;
	}
	
	showConfirm('是否删除所选中的项目？',function(){
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemDeleteBatch",
			"type" : "GET",
			data:"ids="+ids2,
			"success" : function(data) {
				//resolutionData(data);
				testItemListQuery();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

//打开添加项目界面
function openTestItemAdd(){
	var instrumentId = $("#instrumentId").val();
	if(instrumentId == '' || instrumentId == undefined){
		return false;
	}
	
	var data = "";
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddMain";
	$("#openPageDiv").load(url,data,function(){
		$("body").append("<div class='oy'></div>");
		$("#openPageDiv").width(1200);
		$("#openPageDiv").height(600);
		$("#openPageDiv").show();
	});
}

// 添加项目界面，查询未包含列表
function unContainQuery(init){
	var url = ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddRightList";
	
	var instrumentId = $("#instrumentId").val();
	//var testMethodId = testMethodGrid.getValue();
	var testMethodId = $("#testMethodId").val();
	$("#addItemSearchStr").val(trim($("#addItemSearchStr").val()));
	var addItemSearchStr = $("#addItemSearchStr").val();

	$("#unContainListDiv").load(url,{instrumentId:instrumentId,testMethodId:testMethodId,addItemSearchStr:addItemSearchStr,init:init},function(){
		refreshUncontainTable();
		$("#unContainListDiv").show();
	});
}

// 添加项目页面，添加项目
function addTestItem(){
	var i = 0;
	$("#unContainListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;
			
			// 获取要添加的项目ID
			var trId = $(this).attr("id");
			addTestItemIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen3\"><a id=\"checkItem_contain\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#containListTable tr:first").after(newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan3> a").removeClass("yes").addClass("not");
			$(".quan4> a").removeClass("yes").addClass("not");
		}
	});
	
	if(i == 0){
		showMessage("请选择要添加的项目！",function(){
			return;
		});
	} else {
		// 消除反复移除带来的重复id
		refactorTestItems();
	}
}

// 添加项目页面，删除项目
function delTestItem(){
	var i = 0;
	$("#containListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;

			// 获取要删除的项目ID
			var trId = $(this).attr("id");
			delTestItemIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen4\"><a id=\"checkItem_unContain\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#unContainListTable tr:first").after(newRow);
			newRowMap.put(trId, newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan3> a").removeClass("yes").addClass("not");
			$(".quan4> a").removeClass("yes").addClass("not");
		}
	});
	
	if(i == 0){
		showMessage("请选择要移除的项目！",function(){
			return;
		});
	} else {
		// 消除反复移除带来的重复id
		refactorTestItems();
	}
}

//添加项目页面，点击确定
function addConfirm(){

	if((addTestItemIds!=null && addTestItemIds!='')
		|| (delTestItemIds!=null && delTestItemIds!='')){
		// 提交
		
		var instrumentId = $("#instrumentId").val();
		var data = "instrumentId="+instrumentId+"&addTestItemIds="+addTestItemIds+"&delTestItemIds="+delTestItemIds;
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddBatch",
			"type" : "GET",
			data:data,
			"success" : function(data) {
				closeWin();
				testItemListQuery();//刷新list
			},
			"error" : function() {
			}
		});
	} else {
		closeWin();
	}
	
}

// 消除addTestItemIds和addTestItemIds重复的项目
function refactorTestItems(){
	var addArray = addTestItemIds.split(",");
	var delArray = delTestItemIds.split(",");
	for(i=0;i<addArray.length;i++){
		for(j=0;j<delArray.length;j++){
			if(addArray[i]==delArray[j]){
				// 有重复、去除
				addArray[i] = '';
				delArray[j] = '';
				break;
			}
		}
	}
	
	// 重新组织addTestItemIds和delTestItemIds
	addTestItemIds = "";
	delTestItemIds = "";
	for(i=0;i<addArray.length;i++){
		if(addArray[i] != ''){
			addTestItemIds += addArray[i]+",";
		}
	}
	for(i=0;i<delArray.length;i++){
		if(delArray[i] != ''){
			delTestItemIds += delArray[i]+",";
		}
	}
}

// 未包含列表搜索之后，将之前的左右移的操作记录恢复
function refreshUncontainTable(){
	
	// 先做减法，将已移除的记录移除掉
	$("#unContainListTable tr").each(function(){
		var trId = $(this).attr("id");
		if(trId != undefined && trId != 'undefined'){
			trId = trId.substring(3);
		}
		if(addTestItemIds.indexOf(trId) >= 0){
			//移除
			$(this).remove();
		}
	});
	
	// 再做加法，将已添加的记录添加上
	var delArray = delTestItemIds.split(",");
	for(i=0;i<delArray.length;i++){
		var newRow = newRowMap.get("tr_"+delArray[i]);
		$("#unContainListTable tr:first").after(newRow);
		bindXuanClick("tr_"+delArray[i]);
	}
}
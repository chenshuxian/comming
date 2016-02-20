var canStore = true;

var addGermIds = "";
var delGermIds = "";
var addAntiIds = "";
var delAntiIds = "";
var newRowMap = new Map(); //记录左右移的tr行数据

// 关闭窗口
function closeWin(){
	// 清零
    delGermIds = "";
    addGermIds = "";
    delAntiIds = "";
    addAntiIds = "";
    newRowMap.clear();
    
    $(".oy").remove();
    $(".xinxi").empty();
    $(".xinxi").hide();
}

// 打开仪器选择界面
function openSelectInstrument(){
	var data = "";
	var url = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMain";
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
	$("#infoPageDiv").load(url,{frontClassName:frontClassName,status:status,sort:sort,typeId:1,pageNo:pageNo,pageSize:pageSize},function(){
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
	$("#infoPageDiv").load(url,{searchStr:searchStr,frontClassName:frontClassName,status:status,sort:sort,typeId:1,pageNo:pageNo,pageSize:pageSize,realtime:1},function(){
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
	micsListQuery('1');
	micsListQuery('2');
}

//查询微生物对照List
function micsListQuery(itemTypeId){
	
	var instrumentId = $("#instrumentId").val();
	if(instrumentId == 'undefined' || instrumentId == undefined){
		instrumentId = "";
	}
	var germSearchStr = $("#germSearchStr").val();
	if(germSearchStr == 'undefined' || germSearchStr == undefined){
		germSearchStr = "";
	} else {
		$("#germSearchStr").val(trim($("#germSearchStr").val()));
		germSearchStr = trim(germSearchStr);
	}
	var antiSearchStr = $("#antiSearchStr").val();
	if(antiSearchStr == 'undefined' || antiSearchStr == undefined){
		antiSearchStr = "";
	} else {
		$("#antiSearchStr").val(trim($("#antiSearchStr").val()));
		antiSearchStr = trim(antiSearchStr);
	}
	
	var url = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsList";
	if(itemTypeId=='1'){// 细菌
		$("#germListDiv").load(url,{instrumentId:instrumentId,itemTypeId:itemTypeId,germSearchStr:germSearchStr,antiSearchStr:antiSearchStr},function(){
			$("#germListDiv").show();
		});
	} else if(itemTypeId=='2'){//抗生素
		$("#antiListDiv").load(url,{instrumentId:instrumentId,itemTypeId:itemTypeId,germSearchStr:germSearchStr,antiSearchStr:antiSearchStr},function(){
			$("#antiListDiv").show();
		});
	}
}

// 保存微生物对照列表
function saveMicsList(itemTypeId){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    
    // 空表格直接返回
	var rowsNum = "";
	if(itemTypeId=='1'){
		rowsNum = $("#germTable tr").length - 1;
	} else if(itemTypeId=='2'){
		rowsNum = $("#antiTable tr").length - 1;
	}
	if(rowsNum==0){
		return false;
	}
    
    // 去除多余空格
	var formData = "itemTypeId="+itemTypeId + "&";
	if(itemTypeId=='1'){
		formTextTrim("germListForm");
		formData += $("#germListForm").serialize();
	} else if(itemTypeId=='2'){
		formTextTrim("antiListForm");
		formData += $("#antiListForm").serialize();
	}
    
    // 栏位校验
    if(!validateMicsSave(itemTypeId)){
		return ;
	}
    
	// 修改
	canStore = false;
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsSave",
		"type" : "POST",
		data:formData,
		"success" : function(data) {
			canStore = true;
			if(data!=null&&data!=''){
				resolutionData(data);
				micsListQuery(itemTypeId);
			}
		},
		"error" : function() {
			canStore = true;
		}
	});
}

/**
 * 验证微生物保存的必填条件
 * return 
 */
function validateMicsSave(itemTypeId){
	var bRet = true;
	
	var formData = null;
	var formData2 = null;
	if(itemTypeId=='1'){
		//细菌
		formData = jQuery("#germTable input[name='txtChannelCodeGerm']");
		formData2 = jQuery("#germTable input[name='txtPrintOrderGerm']");
	} else if(itemTypeId=='2'){
		//抗生素
		formData = jQuery("#antiTable input[name='txtChannelCodeAnti']");
		formData2 = jQuery("#antiTable input[name='txtPrintOrderAnti']");
	}
	
	// 通道码
	var channelCodeString = "";
 	formData.each(function(){
 		var objId = jQuery(this).attr("id");
		var channelCode = jQuery(this).val();
		if(channelCode!=null && channelCode!=''){
			if(channelCodeString.indexOf(channelCode+"&&$$##")==-1){
				channelCodeString += channelCode+"&&$$##";
			} else{
				bRet = false;
				showMessage('同一个仪器通道码不可以重复，请重新输入！',function(){
					//jQuery(this).focus();
					$("#"+objId).focus();
				});
				return false;
			}
		}
 	});
 	
	// 打印次序
 	formData2.each(function(){
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

//批量删除微生物
function deleteMicsBatch(itemTypeId){
	var ids = "";
	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
	
	if(itemTypeId=='1'){//细菌
		$("a[id='checkItem_germ']").each(function(){
			if($(this).attr("class") == 'yes'){
				ids += $(this).attr("value")+",";
				ids2 += $(this).attr("value")+",";
			} else {
				ids2 += " ,";
			}
		});
	} else if(itemTypeId=='2'){//抗生素
		$("a[id='checkItem_anti']").each(function(){
			if($(this).attr("class") == 'yes'){
				ids += $(this).attr("value")+",";
				ids2 += $(this).attr("value")+",";
			} else {
				ids2 += " ,";
			}
		});
	}
	
	if(ids == ''){
		showMessage("请选择要删除的记录！");
		return false;
	}
	
	showConfirm('是否删除所选中的记录？',function(){
		$.ajax({
			"url" : ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsDeleteBatch",
			"type" : "GET",
			data:"ids="+ids2,
			"success" : function(data) {
				micsListQuery(itemTypeId);//刷新list
			},
			"error" : function() {
			}
		});
	});
}

//打开添加微生物界面
function openMicsAdd(itemTypeId){
	var instrumentId = $("#instrumentId").val();
	if(instrumentId == '' || instrumentId == undefined){
		return false;
	}
	
	var data = "itemTypeId="+itemTypeId;
	var url = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddMain";
	$("#openPageDiv").load(url,data,function(){
		$("body").append("<div class='oy'></div>");
		$("#openPageDiv").width(1200);
		$("#openPageDiv").height(600);
		$("#openPageDiv").show();
	});
}

// 添加项目界面，查询未包含微生物列表
function unContainQuery(itemTypeId, init){
	var url = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddRightList";
	
	var instrumentId = $("#instrumentId").val();
	
	if(itemTypeId=='1'){// 细菌
		$("#addGermSearchStr").val(trim($("#addGermSearchStr").val()));
		var addGermSearchStr = $("#addGermSearchStr").val();
		$("#unContainGermListDiv").load(url,{instrumentId:instrumentId,itemTypeId:itemTypeId,addGermSearchStr:addGermSearchStr,init:init},function(){
			refreshUncontainGermTable();
			$("#unContainGermListDiv").show();
		});
	} else if(itemTypeId=='2'){//抗生素
		$("#addAntiSearchStr").val(trim($("#addAntiSearchStr").val()));
		var addAntiSearchStr = $("#addAntiSearchStr").val();
		$("#unContainAntiListDiv").load(url,{instrumentId:instrumentId,itemTypeId:itemTypeId,addAntiSearchStr:addAntiSearchStr,init:init},function(){
			refreshUncontainAntiTable();
			$("#unContainAntiListDiv").show();
		});
	}
}

// 添加细菌页面，添加细菌
function addGerm(){
	var i = 0;
	$("#unContainGermListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;
			
			// 获取要添加的项目ID
			var trId = $(this).attr("id");
			addGermIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen3\"><a id=\"checkItem_containGerm\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#containGermListTable tr:first").after(newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan3> a").removeClass("yes").addClass("not");
			$(".quan4> a").removeClass("yes").addClass("not");
			
		}
	});
	
	if(i == 0){
		showMessage("请选择要添加的细菌！",function(){
			return;
		});
	} else {
		// 消除反复移除带来的重复id
		refactorGermItems();
	}
}

//添加抗生素页面，添加抗生素
function addAnti(){
	var i = 0;
	$("#unContainAntiListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;
			
			// 获取要添加的项目ID
			var trId = $(this).attr("id");
			addAntiIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen5\"><a id=\"checkItem_containAnti\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#containAntiListTable tr:first").after(newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan5> a").removeClass("yes").addClass("not");
			$(".quan6> a").removeClass("yes").addClass("not");
		}
	});
	
	if(i == 0){
		showMessage("请选择要添加的抗生素！",function(){
			return;
		});
	} else {
		// 消除反复移除带来的重复id
		refactorAntiItems();
	}
}

// 添加细菌页面，删除细菌
function delGerm(){
	var i = 0;
	$("#containGermListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;

			// 获取要删除的项目ID
			var trId = $(this).attr("id");
			delGermIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen4\"><a id=\"checkItem_unContainGerm\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#unContainGermListTable tr:first").after(newRow);
			newRowMap.put(trId, newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan3> a").removeClass("yes").addClass("not");
			$(".quan4> a").removeClass("yes").addClass("not");
		}
	});

	if(i == 0){
		showMessage("请选择要移除的细菌！",function(){
			return;
		});
	} else {
		// 消除反复移除带来的重复id
		refactorGermItems();
	}
}

//添加抗生素页面，删除抗生素
function delAnti(){
	var i = 0;
	$("#containAntiListTable tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;

			// 获取要删除的项目ID
			var trId = $(this).attr("id");
			delAntiIds += trId.substring(3) + ",";
			
			var newRow = "<tr id=\""+trId+"\"><td class=\"cen6\"><a id=\"checkItem_unContainAnti\" value=\""+trId.substring(3)+"\" href=\"javascript:void(0)\" class=\"not\"></a></td>";
			newRow += $(this).html().substring($(this).html().indexOf("<td title="))+"</tr>";
			$("#unContainAntiListTable tr:first").after(newRow);
			newRowMap.put(trId, newRow);
			
			$(this).remove();
			bindXuanClick(trId);
			$(".quan5> a").removeClass("yes").addClass("not");
			$(".quan6> a").removeClass("yes").addClass("not");
		}
	});
	
	if(i == 0){
		showMessage("请选择要移除的抗生素！",function(){
			return;
		});
	} else {
		// 消除反复移除带来的重复id
		refactorAntiItems();
	}
}

//添加微生物页面，点击确定
function addMicsConfirm(itemTypeId){
	
	// 细菌
	if(itemTypeId=='1' && addGermIds=='' && delGermIds==''){
		closeWin();
		return;
	}
	// 抗生素
	if(itemTypeId=='2' && addAntiIds=='' && delAntiIds==''){
		closeWin();
		return;
	}
	
	// 提交
	var data = "";
	var instrumentId = $("#instrumentId").val();
	if(itemTypeId=='1'){
		data = "instrumentId="+instrumentId+"&itemTypeId="+itemTypeId+"&addMicsIds="+addGermIds+"&delMicsIds="+delGermIds;
	} else if(itemTypeId=='2'){
		data = "instrumentId="+instrumentId+"&itemTypeId="+itemTypeId+"&addMicsIds="+addAntiIds+"&delMicsIds="+delAntiIds;
	}
	
	$.ajax({
		"url" : ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddBatch",
		"type" : "GET",
		data:data,
		"success" : function(data) {
			closeWin();
			micsListQuery(itemTypeId);//刷新list
		},
		"error" : function() {
		}
	});

}


//消除addGermIds和delGermIds重复的项目
function refactorGermItems(){
	var addArray = addGermIds.split(",");
	var delArray = delGermIds.split(",");
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
	
	// 重新组织addGermIds和delGermIds
	addGermIds = "";
	delGermIds = "";
	for(i=0;i<addArray.length;i++){
		if(addArray[i] != ''){
			addGermIds += addArray[i]+",";
		}
	}
	for(i=0;i<delArray.length;i++){
		if(delArray[i] != ''){
			delGermIds += delArray[i]+",";
		}
	}
}
//消除addAntiIds和delAntiIds重复的项目
function refactorAntiItems(){
	var addArray = addAntiIds.split(",");
	var delArray = delAntiIds.split(",");
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
	
	// 重新组织addAntiIds和delAntiIds
	addAntiIds = "";
	delAntiIds = "";
	for(i=0;i<addArray.length;i++){
		if(addArray[i] != ''){
			addAntiIds += addArray[i]+",";
		}
	}
	for(i=0;i<delArray.length;i++){
		if(delArray[i] != ''){
			delAntiIds += delArray[i]+",";
		}
	}
}

//未包含列表搜索之后，将之前的左右移的操作记录恢复（细菌）
function refreshUncontainGermTable(){
	// 先做减法，将已移除的记录移除掉
	$("#unContainGermListTable tr").each(function(){
		var trId = $(this).attr("id");
		if(trId != undefined && trId != 'undefined'){
			trId = trId.substring(3);
		}
		if(addGermIds.indexOf(trId) >= 0){
			//移除
			$(this).remove();
		}
	});
	
	// 再做加法，将已添加的记录添加上
	var delArray = delGermIds.split(",");
	for(i=0;i<delArray.length;i++){
		var newRow = newRowMap.get("tr_"+delArray[i]);
		$("#unContainGermListTable tr:first").after(newRow);
		bindXuanClick("tr_"+delArray[i]);
	}
}
//未包含列表搜索之后，将之前的左右移的操作记录恢复（抗生素）
function refreshUncontainAntiTable(){
	// 先做减法，将已移除的记录移除掉
	$("#unContainAntiListTable tr").each(function(){
		var trId = $(this).attr("id");
		if(trId != undefined && trId != 'undefined'){
			trId = trId.substring(3);
		}
		if(addAntiIds.indexOf(trId) >= 0){
			//移除
			$(this).remove();
		}
	});
	
	// 再做加法，将已添加的记录添加上
	var delArray = delAntiIds.split(",");
	for(i=0;i<delArray.length;i++){
		var newRow = newRowMap.get("tr_"+delArray[i]);
		$("#unContainAntiListTable tr:first").after(newRow);
		bindXuanClick("tr_"+delArray[i]);
	}
}
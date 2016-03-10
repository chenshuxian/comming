/**
* @ClassName: instrMics.js
* @Description: TODO(微生物的细菌、抗生素仪器通道-JS) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:52:56 
*
 */
// 控制重复提交
var canStore = true;
var g_status = 1; //状态是否是可用   0-停用    1-启用
var addMap = {};// 存放添加项目的map addMpa[key] = value;
var removeMap = {};//存放移除的项目map removeMap[key] = value;

var closeType = "";
// 关闭窗口
function closeWin() {
	$(".oy").remove();
	$(".xinxi").hide();
	//选择机构后清空仪器、及列表
	if(closeType == "searchOrgsInfo"){
		$("#instrumentId").val("");
		$("#instrumentName").val("");
		$("#micsSearchStr").val("");
		$("#autiMicsSearchStr").val("");
		pageQuery();
		antiPageQuery();
		closeType = "";
	}
	//选择仪器后重刷列表
	if(closeType == "getAllInstrumentInfo"){
		$("#micsSearchStr").val("");
		$("#autiMicsSearchStr").val("");
		pageQuery();
		antiPageQuery();
		closeType = "";
	}
}
//机构弹出框
function searchOrgsInfo(){
	var pageNo = $("#pageNo_OrgPopUp").val();
	var pageSize = $("#pageSize").val();
	if (typeof (pageNo) == 'undefined' || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 5;
	}
	var searchStr = $("#searchOrgStr").val();
	var status = 1;
	var sort = "";
	var orgTypeId = 40;
	var url = ctx + "/instruments/iorgsPageList";
	$("#orgInfoViewDiv").load(url, {
		searchStr : searchStr,
		pageNo : pageNo,
		pageSize : pageSize,
		status : status,
		orgTypeId : orgTypeId,
		sort : sort
	}, function() {
		$("#orgInfoViewDiv").show();
		$("#searchOrgStr").val(searchStr);
		closeType = "searchOrgsInfo";
	});
}
//仪器弹出框
function getAllInstrumentInfo(){
	var orgId = $("#orgsId").val();
	if (typeof(orgId) =='undefined' || orgId == '') {
		showMessage('请先选择机构!');
		return;
	}
	var pageNo = $("#pageNo_OrgPopUp").val();
	var pageSize = $("#pageSize").val();
	if (typeof (pageNo) == undefined || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 5;
	}
	var searchStr = $("#instrumentSearchStr").val();
	var status = 1;
	var sort = "";
	var orgTypeId = 40;
	var url = ctx + "/instruments/instrumentsPopUpList";
	$("#instrInfoViewDiv").load(url, {
		searchStr : searchStr,
		pageNo : pageNo,
		pageSize : pageSize,
		status : status,
		orgTypeId : orgTypeId,
		sort : sort,
		orgsId : orgsId
	}, function() {
		$("#instrInfoViewDiv").show();
		$("#instrumentSearchStr").val(searchStr);
		closeType = "getAllInstrumentInfo";
	});
}
// 查询细菌List
function pageQuery() {
	var orgId = $("#orgsId").val();
	var itemTypeId = 1;//$("#typeKey").val();
	var sort = $("#sort").val();
	var instrumentId = $("#instrumentId").val();
	var searchStr = $("#micsSearchStr").val();
//	if (searchStr == '') {
//		showMessage('请输入查找内容!');
//		return;
//	}
	var url = ctx + "/inst/instrMics/instrMicsPageList";
	$("#infoPageDiv").load(url, {orgId : orgId, itemTypeId : itemTypeId, sort : sort, searchStr : searchStr, instrumentId : instrumentId}, function() {
		$("#infoPageDiv").show();
		$("#micsSearchStr").val(searchStr);
		onloadFun(itemTypeId);
	});
}
//查询抗生素List
function antiPageQuery() {
	var orgId = $("#orgsId").val();
	var itemTypeId = 2;//$("#typeKey").val();
	var sort = $("#sort").val();
	var instrumentId = $("#instrumentId").val();
	var searchStr = $("#autiMicsSearchStr").val();
//	if (type == 'search') {
//		searchStr = $("#autiMicsSearchStr").val();
//		if (searchStr == '') {
//			showMessage('请输入查找内容!');
//			return;
//		}
//		
//	}
	var url = ctx + "/inst/instrMics/instrMicsPageList";
	$("#antiInfoPageDiv").load(url, {orgId : orgId, itemTypeId : itemTypeId, sort : sort, searchStr : searchStr, instrumentId : instrumentId}, function() {
		$("#antiInfoPageDiv").show();
		$("#autiMicsSearchStr").val(searchStr);
		onloadFun(itemTypeId);
	});
}
//进入明细页面
function showInfo(itemTypeId) {
	var orgId = $("#orgsId").val();
	if (typeof(orgId) =='undefined' || orgId == '') {
		showMessage('请选择机构!');
		return;
	}
	var instrumentId = $("#instrumentId").val();
	if (typeof(instrumentId) =='undefined' || instrumentId == '') {
		showMessage('请选择仪器!');
		return;
	}
	var url = ctx + "/inst/instrMics/instrMicsInfo";
	$("#infoViewDiv").load(url, {orgId : orgId, instrumentId : instrumentId, itemTypeId : itemTypeId}, function() {
		$("body").append("<div class='oy'></div>")
		$("#infoViewDiv").show();
	});
}
//批量保存:只保存有过变更的数据行
var oldArr = [];  //细菌FORM初始记录input原始值，保存时做对比是否有变更
var autiOldArr = [];  //抗生素FORM初始记录input原始值，保存时做对比是否有变更
var saveArr = []; //存放变更过的值做保存
function saveBatch(itemTypeId) {
	getSaveValue(itemTypeId);
	if (saveArr != null && saveArr.length > 0) {
		var saveJson = JSON.stringify(saveArr);// 将对象序列化成JSON字符串
		$.ajax({
			url : ctx + "/inst/instrMics/instrMicsEide",
			type : "POST",
			dataType : 'json',
			data : {
				saveJson : saveJson
			},
			success : function(data) {
				resolutionData(data);
				if (itemTypeId == "1") {
					pageQuery();// 刷新list
				} else if (itemTypeId == "2") {
					antiPageQuery();
				}
				saveArr = new Array();//清空
			}
		});
	}
}

function getValue(itemTypeId) {
	var valueArr = new Array();
	if (itemTypeId == "1") {
		var len = $("#micsListNumber").text();
		for (var i = 0; i < len; i++) {
			var id = $("#id_"+i).val();
			var channelCode = $("#channelCode_"+i).val();
			var printOrder = $("#printOrder_"+i).val();
			valueArr.push({id: id, channelCode : channelCode, printOrder : printOrder}); 
		}
	} else if (itemTypeId == "2") {
		var len = $("#autiMicsListNumber").text();
		for (var i = 0; i < len; i++) {
			var id = $("#antiId_"+i).val();
			var channelCode = $("#antiChannelCode_"+i).val();
			var printOrder = $("#antiPrintOrder_"+i).val();
			valueArr.push({id: id, channelCode : channelCode, printOrder : printOrder}); 
		}
	}
	return valueArr;  
}  
//初始化界面加载列表的值
function onloadFun(itemTypeId) {
	if (itemTypeId == "1") {
		oldArr = getValue(itemTypeId);
	} else if (itemTypeId == "2") {
		autiOldArr = getValue(itemTypeId);
	}
}  
//有过变更的
function enFun(svaeValue) {
	saveArr.push(svaeValue);
}  
//获取需保存的数据
function getSaveValue(itemTypeId) {
    var thisarr = getValue(itemTypeId);
    if (itemTypeId == "1") {
    	compare(thisarr , oldArr);
	} else if (itemTypeId == "2") {
		compare(thisarr , autiOldArr);
	}
}  
//对比是否有过变更
function compare(newArr, oldArr) {
    for(var i = 0; i < oldArr.length; i++) {
        if(newArr[i].channelCode !== oldArr[i].channelCode || newArr[i].printOrder !== oldArr[i].printOrder) {  
        	enFun(newArr[i]);
        }  
    }  
}
/**
 * 验证保存的必填条件
 * return 
 */
function validateSave(printOrderObj){
	var printOrder = printOrderObj.value;
	if(printOrder == ''){
		showMessage('打印次序为空，请重新输入！', function() {
			printOrderObj.focus();
		});
		return false;
	}
	var re = /^[0-9]*[0-9][0-9]*$/ ;
	if (printOrder != '' && (isNaN(printOrder) || !re.test(printOrder))) {
		showMessage('打印次序必须为大于或等于零的整数，请重新输入！', function() {
			printOrderObj.focus();
		});
		return true;
	} else {
		return false;
	}
}
//验证通道码是否重复
function validateChannelCode(channelCodeObj, instrumentId) {
	var channelCode = channelCodeObj.value;
	var objId = channelCodeObj.id;
	var oldChannelCode = $("#old_"+objId).val();
	//为空或通道码无改变不进行验证
	if (channelCode == '' || oldChannelCode == channelCode){
		return;
	}
	$.ajax({
		url : ctx+"/inst/instrMics/checkChannelCodeExisted",
		type : "POST",
		dataType: 'json',  
		data : {instrumentId : instrumentId, channelCode : channelCode},
		success : function(data) {
			var err=data.indexOf("err|");
			if(err==0){
				showMessage(data.substring(4), function() {
					channelCodeObj.focus();
				});
				return ;
			}
		}
	});
}
//未包含项目查询
function notContainSearch() {
	var orgId = $("#addOrgId").val();
	var instrumentId = $("#addInstrumentId").val();
	var itemTypeId = $("#addItemTypeId").val();
	var searchStr = $("#notContainSearchStr").val();
	if (typeof(searchStr) !='undefined' && searchStr == '') {
		showMessage('请输入搜索内容!');
		return;
	}
	var url = ctx + "/inst/instrMics/queryInstrMicsNoAddItems";
	$("#notContainList").load(url, {orgId : orgId, instrumentId : instrumentId, itemTypeId : itemTypeId, searchStr : searchStr}, function() {
		$("body").append("<div class='oy'></div>")
		$("#infoViewDiv").show();
	    $("#notContainSearchStr").val(searchStr);
	});
}
// 细菌添加或者删除
function addOrRemoveItem(){
	var orgId = $("#addOrgId").val();
	var instrumentId = $("#addInstrumentId").val();
	var itemTypeId = $("#addItemTypeId").val();
	// 需要移除的项目
	var removeInstrMicsList = new Array();  
	$.each(removeMap, function(key, values) {
		removeInstrMicsList.push({orgId: orgId, instrumentId : instrumentId, itemTypeId : itemTypeId, micItemId : values});  
		// 清空removeMap
		delete removeMap[values];
	});
	var removeInstrMicsJson = JSON.stringify(removeInstrMicsList);//将对象序列化成JSON字符串  
	// 需要添加的项目
	var addInstrMicsList = new Array();  
	$.each(addMap, function(key, values) {
		addInstrMicsList.push({orgId: orgId, instrumentId : instrumentId, itemTypeId : itemTypeId, micItemId : values});  
		// 清空addMap
		delete addMap[values];
	});
	var addInstrMicsJson = JSON.stringify(addInstrMicsList);//将对象序列化成JSON字符串  
	$.ajax({
		url : ctx+"/inst/instrMics/instrMicsAdd",
		type : "POST",
		dataType: 'json',  
		data : {removeInstrMicsJson : removeInstrMicsJson, addInstrMicsJson : addInstrMicsJson},
		success : function(data) {
			resolutionData(data);
			//changeTr(groupItemID);//刷新list
			$.each(removeMap,function(key,values){ 
				//清空removeMap
				delete removeMap[values];
			});
			$.each(addMap,function(key,values){ 
				//清空addMap
				delete addMap[values];
			});
			closeWin();//关闭页面
			if (itemTypeId == "1") {
				pageQuery();// 刷新list
			} else if (itemTypeId == "2") {
				antiPageQuery();// 刷新list
			}
		}
	});
}
//已包含项目表格行点击事件
function containTr(){
	var testItemId = "";
	$("a[id='checkItem']").each(function(){
		if($(this).attr("class") == 'yes'){
			testItemId = $(this).attr("value");
			highlight("notContainTab",testItemId);
			var codeNo = $("#tr_contain_"+testItemId).children('td').eq(1).text();//达安标准码
			var testName = $("#tr_contain_"+testItemId).children('td').eq(2).text();//项目名称
			var enShortName = $("#tr_contain_"+testItemId).children('td').eq(3).text();//英文简称
			var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
			var containListNumber = $("#containListNumber").text();//组合包含项目总数
			//先删除右边列表
			$("#tr_contain_"+testItemId).remove();
			var id = "'"+testItemId+"'";
			//添加到左边列表中的数据,新的插到最前面
			var TrData = '<tr id="tr_notContain_'+testItemId+'"><td class="cen2"><a id="checkItem2" value="'+testItemId+'" href="javascript:void(0)" class="not"></a></td><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td></tr>';
			$("#notContainTab tr:eq(0)").after(TrData);
			$("#checkItem2").unbind();        //解绑点击事件 
			$("#checkItem2").click(function(){//绑定点击事件函数 
				var cla=$(this).attr("class");
		        if(cla=="not"){
		            $(this).removeClass("not").addClass("yes");
		        }else{
		            $(this).removeClass("yes").addClass("not");
		        }
			}); 
			//修改行总数
			$("#notContainListNumber").text(parseInt(notContainListNumber) + 1);//组合未包含项目总数 -1
			$("#containListNumber").text(parseInt(containListNumber) - 1);//组合包含项目总数 +1
			//把移除的项目添加到removeMap中
			removeMap[testItemId] = testItemId;
			//删除addMap要要添加的项目
			delete addMap[testItemId];
		}
	});
	if(testItemId == ''){
		showMessage("请选择要删除的数据");
		return;
	}
}
//未包含项目表格行点击事件
function notContainTr() {
	var testItemId = "";
	$("a[id='checkItem2']").each(function() {
		if($(this).attr("class") == 'yes'){
			testItemId = $(this).attr("value")+"";
			highlight("containTab",testItemId);
				var codeNo = $("#tr_notContain_"+testItemId).children('td').eq(1).text();//达安标准码
				var testName = $("#tr_notContain_"+testItemId).children('td').eq(2).text();//项目名称
				var enShortName = $("#tr_notContain_"+testItemId).children('td').eq(3).text();//英文简称
				var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
				var containListNumber = $("#containListNumber").text();//组合包含项目总数
					var id = "'"+testItemId+"'";
					//添加到左边列表中的数据
					var TrData = '<tr id="tr_contain_'+testItemId+'"><td class="cen1"><a id=checkItem value="'+testItemId+'" href="javascript:void(0)" class="not"></a></td><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td></tr>';
					//先删除右边列表
					$("#tr_notContain_"+testItemId).remove();
					//动态更新添加一行到组合包含项目列表
					$("#containTab tr:eq(0)").after(TrData);
					$("#checkItem").unbind();        //解绑点击事件 
					$("#checkItem").click(function(){//绑定点击事件函数 
						var cla=$(this).attr("class");
				        if(cla=="not"){
				            $(this).removeClass("not").addClass("yes");
				            //$(this).parent().parent().addClass("cur");
				        }else{
				            $(this).removeClass("yes").addClass("not");
				            //$(this).parent().parent().removeClass("cur");
				        }
					}); 
					//修改行总数
					$("#notContainListNumber").text(parseInt(notContainListNumber) - 1);//组合未包含项目总数 -1
					$("#containListNumber").text(parseInt(containListNumber) + 1);//组合包含项目总数 +1
					//把添加的项目保存到Map中
					addMap[testItemId] = testItemId;
					//移除需要删除的项目;
					delete removeMap[testItemId];
					//解除左移按钮事件
					//$("#leftMove").unbind("click");
			 }
	});
}
//指删除
function deleteMicsBatch(id) {
	var ids = "";
	$("a[id="+id+"]").each(function() {
		if ($(this).attr("class") == 'yes') {
			var checkId = $(this).attr("value");
			ids += checkId + ",";
		}
	});
	if (ids == '') {
		showMessage('请选择要删除的数据!');
		return false;
	}
	showConfirm('是否删除所选中的记录？', function() {
		$.ajax({
			url : ctx + "/inst/instrMics/instrMicsDeleteBatch",
			type : "POST",
			data : {
				ids : ids
			},
			success : function(data) {
				resolutionData(data);
				if (id == "checkItem") {
					pageQuery();// 刷新list
				} else if (id == "checkAntilItem") {
					antiPageQuery();// 刷新list
				}
			},
			error : function() {
			}
		});
	});
}

/**
 * 控制行高亮
 * tableName table名字
 * id 项目ID
 */
function highlight(tableName,id){
	$("#" + tableName + " tr").removeClass("cur");
	if("containList" == tableName){
		$("#tr_contain_" + id).attr("class","cur");
	}else if("notContainList" == tableName){
		$("#tr_notContain_" + id).attr("class","cur");
	}else {
		$("#tr_" + id).attr("class","cur");
	}
}

////////////////////////////////////新UI更新///////////////////////////////////////////////





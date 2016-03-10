var addMap = {};// 存放添加项目的map addMpa[key] = value;
var removeMap = {};//存放移除的项目map removeMap[key] = value;
/**
 * 机构弹出
 */
function getAllOrgsInfo(){
	var pageNo = $("#pageNo_OrgPopUp").val();
	var pageSize = $("#pageSize").val();
	if (typeof (pageNo) == undefined || pageNo == null) {
		pageNo = 1;
	}
	if (pageSize == 'undefined' || pageSize == null) {
		pageSize = 5;
	}
	var searchStr = $("#searchOrgStr").val(); // 检索的内容
	var status = 1;// 状态
	var sort = "";// 排序
	var orgTypeId = 40;// 类型
	var orgId = "";//机构ID
	//清空客户仪器选择
	$("#instrumentId").val("");
	$("#instrumentName").val("");
	var url = ctx + "/instruments/iorgsPageList";
	$("#openPageDiv").load(url, {
		searchStr : searchStr,
		pageNo : pageNo,
		pageSize : pageSize,
		status : status,
		orgTypeId : orgTypeId,
		sort : sort
	}, function() {
		$("#openPageDiv").show();
	});
}
/**
 *  仪器弹出
 */
function getAllInstrumentInfo(){
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
	var orgsId = $("#orgsId").val(); //机构ID
	//判断是否选择了客户机构
	if(orgsId == 'undefined' || orgsId == ''){
		showMessage("请选择客户机构!");
		return;
	}
	var url = ctx + "/instruments/instrumentsPopUpList";
	$("#openPageDiv").load(url, {
		searchStr : searchStr,
		pageNo : pageNo,
		pageSize : pageSize,
		status : status,
		orgTypeId : orgTypeId,
		sort : sort,
		orgsId : orgsId
	}, function() {
		$("#openPageDiv").show();
	});
}
/**
 * 添加检验项目
 */
function openTestItemAdd(){
	var orgId = $("#orgsId").val(); //机构ID
	var instrumentId = $("#instrumentId").val();//仪器ID
	//判断是否选择了客户机构
	if(orgId == 'undefined' || orgId == ''){
		showMessage("请选择客户机构!");
		return;
	}
	//判断是否选择了客户仪器
	if(instrumentId == 'undefined' || instrumentId == ''){
		showMessage("请选择客户仪器!");
		return;
	}
	//显示添加仪器项目界面
	$("#openPageDiv").load(ctx + "/inst/instrumentsItem/instrumentsAddTestItemMain",function(){
		$("body").append("<div class='oy'></div>");
		$("#openPageDiv").show();
		$("#openPageDiv").height(600);
		$("#openPageDiv").width(1200);
	});
}
/**
 * 查询仪器对照项目
 */
function testItemListQuery(){
	var orgId = $("#orgsId").val(); //机构ID
	var instrumentId = $("#instrumentId").val();//仪器ID
	//判断是否选择了客户机构
	if(orgId == 'undefined' || orgId == ''){
		showMessage("请选择客户机构!");
		return;
	}
	//判断是否选择了客户仪器
	if(instrumentId == 'undefined' || instrumentId == ''){
		showMessage("请选择客户仪器!");
		return;
	}
	//查询文本内容
	var itemSearchStr = $("#itemSearchStr").val().trim();
	//去除空格后再重新赋值
	$("#itemSearchStr").val(itemSearchStr);
	//机构ID
	var orgsId = $("#orgsId").val();
	//仪器ID
	var instrumentId = $("#instrumentId").val();
	//访问路径
	var url = ctx + "/inst/instrumentsItem/instrumentsItemList";
	//请求参数
	var data = {itemSearchStr:itemSearchStr,orgsId:orgsId,instrumentId:instrumentId};
	//加载项目对照页面
	$("#itemListDiv").load(url, data,function(){
		$("#itemListDiv").show();
	});
}
/**
 * 查询未包含项目
 */
function notContainSearch(){
	var orgsId = $("#orgsId").val(); //机构ID
	var instrumentId = $("#instrumentId").val();//仪器ID
	var testMethodId = $("#testMethod option:selected").val(); //检验方法
	var notContainSearchStr = $("#notContainSearchStr").val().trim();//文本框查询条件
	$("#notContainListDiv").load(ctx + "/inst/instrumentsItem/instrumentsItemNotContainList",{orgsId:orgsId,instrumentId:instrumentId,testMethodId:testMethodId,searchStr:notContainSearchStr},function(){
		// 显示条数
		var itemRowsNum = $("#notContainList tr").length - 1;
		$("#notContainListNumber").text(itemRowsNum);
	});
}
/**
 * 包含项目表格行点击事件
 */
function containTr(){
	var testItemId = "";
	$("a[id='checkItem']").each(function(){
		if($(this).attr("class") == 'yes'){
			testItemId = $(this).attr("value");
			highlight("notContainList","tr_notContain_"+testItemId);
			var codeNo = $("#tr_contain_"+testItemId).children('td').eq(1).text();//达安标准码
			var testName = $("#tr_contain_"+testItemId).children('td').eq(2).text();//项目名称
			var enShortName = $("#tr_contain_"+testItemId).children('td').eq(3).text();//英文简称
			var testMethodName = $("#tr_contain_"+testItemId).children('td').eq(4).text();//检验方法
			var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
			var containListNumber = $("#containListNumber").text();//组合包含项目总数
			//先删除右边列表
			$("#tr_contain_"+testItemId).remove();
			var id = "'"+testItemId+"'";
			//添加到左边列表中的数据,新的插到最前面
			var TrData = '<tr id="tr_notContain_'+testItemId+'"><td class="cen2"><a id="checkItem2" value="'+testItemId+'" href="javascript:void(0)" class="not"></a></td><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td><td>'+testMethodName+'</td></tr>';
			$("#notContainList tr:eq(0)").after(TrData);
			$("#checkItem2").unbind();        //解绑点击事件 
			$("#checkItem2").click(function(){//绑定点击事件函数 
				var cla=$(this).attr("class");
		        if(cla=="not"){
		            $(this).removeClass("not").addClass("yes");
		            $(this).parent().parent().addClass("cur");
		        }else{
		            $(this).removeClass("yes").addClass("not");
		            $(this).parent().parent().removeClass("cur");
		        }
			}); 
			//修改行总数
			$("#notContainListNumber").text(parseInt(notContainListNumber) + 1);//组合未包含项目总数 +1
			$("#containListNumber").text(parseInt(containListNumber) - 1);//组合包含项目总数 -1
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
/**
 * 未包含项目表格行点击事件
 */
function notContainTr() {
	var testItemId = "";
	$("a[id='checkItem2']").each(function() {
		if($(this).attr("class") == 'yes'){
			testItemId = $(this).attr("value")+"";
			highlight("containList","tr_contain_"+testItemId);
				var codeNo = $("#tr_notContain_"+testItemId).children('td').eq(1).text();//达安标准码
				var testName = $("#tr_notContain_"+testItemId).children('td').eq(2).text();//项目名称
				var enShortName = $("#tr_notContain_"+testItemId).children('td').eq(3).text();//英文简称
				var testMethodName = $("#tr_notContain_"+testItemId).children('td').eq(4).text();//检验方法
				var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
				var containListNumber = $("#containListNumber").text();//组合包含项目总数
					var id = "'"+testItemId+"'";
					//添加到左边列表中的数据
					var TrData = '<tr id="tr_contain_'+testItemId+'"><td class="cen1"><a id=checkItem value="'+testItemId+'" href="javascript:void(0)" class="not"></a></td><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td><td>'+testMethodName+'</td></tr>';
					//先删除右边列表
					$("#tr_notContain_"+testItemId).remove();
					//动态更新添加一行到组合包含项目列表
					$("#containList tr:eq(0)").after(TrData);
					$("#checkItem").unbind();        //解绑点击事件 
					$("#checkItem").click(function(){//绑定点击事件函数 
						var cla=$(this).attr("class");
				        if(cla=="not"){
				            $(this).removeClass("not").addClass("yes");
				            $(this).parent().parent().addClass("cur");
				        }else{
				            $(this).removeClass("yes").addClass("not");
				            $(this).parent().parent().removeClass("cur");
				        }
					}); 
					//修改行总数
					$("#notContainListNumber").text(parseInt(notContainListNumber) - 1);//组合未包含项目总数 -1
					$("#containListNumber").text(parseInt(containListNumber) + 1);//组合包含项目总数   +1
					//把添加的项目保存到Map中
					addMap[testItemId] = testItemId;
					//移除需要删除的项目;
					delete removeMap[testItemId];
			 }
	});
	if(testItemId == ''){
		showMessage("请选择要添加的数据");
		return;
	}
}
/**
 * 添加删除仪器项目
 */
function addOrRemoveInstrumentsItem(){
	var orgId = $("#orgsId").val(); //机构ID
	var instrumentId = $("#instrumentId").val();//仪器ID
	// 需要移除的项目
	var removeInstrItem = new Array();  
	$.each(removeMap, function(key, values) {
		//orgsId 机构ID  instrumentId 仪器ID  testItemId项目ID
		removeInstrItem.push({orgId: orgId, instrumentId : instrumentId, testItemId : values});  
		// 清空removeMap
		delete removeMap[values];
	});
	//将对象序列化成JSON字符串  
	var removeInstrItemJson = JSON.stringify(removeInstrItem);
	// 需要添加的项目
	var addInstrItemList = new Array();  
	$.each(addMap, function(key, values) {
		//orgsId 机构ID  instrumentId 仪器ID  testItemId项目ID
		addInstrItemList.push({orgId: orgId, instrumentId : instrumentId, testItemId : values});  
		// 清空addMap
		delete addMap[values];
	});
	//将对象序列化成JSON字符串 
	var addInstrItemJson = JSON.stringify(addInstrItemList); 
	$.ajax({
		url : ctx+"/inst/instrumentsItem/addOrRemoveInstrumentsItem",
		type : "POST",
		dataType: 'json',  
		data : {removeInstrItemJson : removeInstrItemJson, addInstrItemJson : addInstrItemJson},
		success : function(data) {
			resolutionData(data);
			$.each(removeMap,function(key,values){ 
				//清空removeMap
				delete removeMap[values];
			});
			$.each(addMap,function(key,values){ 
				//清空addMap
				delete addMap[values];
			});
			closeWin();//关闭页面
		}
	});
}
/**
 * 控制行高亮
 * tableName table名字
 * id 项目ID
 */
function highlight(tableName,id){
	$("#" + tableName + " tr").removeClass("cur");
	$("#tr_" + id).attr("class","cur");
}

/**
 * 关闭弹出页面
 */
var flag = false; //判断是那个弹出页面关闭
function closeWin(type){
	$(".oy").remove();
    $(".xinxi").hide();
    //机构
    if(type == "refurbish"){
    	flag = true;
    //选择了仪器后要查询数据
    }else{
    	if(flag){
        	testItemListQuery();
        	flag = false;
        }
    }
}
var sampleTypeGrid;//默认标本类型
var canStore = true;//防止重复提交
var count = 0;//统计字段在数据库是否存在
var addMap = {};// 存放添加项目的map addMpa[key] = value;
var removeMap = {};//存放移除的项目map removeMap[key] = value;
//搜索数据
function search(){
	var searchStr = $("#searchStr").val().trim();  //搜索输入框的值
	$("#searchStr").val(searchStr);
	var status = $("#searchStatus option:selected").val(); //状态
	var orderType = $("#orderType option:selected").val();//排序
	//组合项目列表
	$("#groupList").load(ctx + "/pm/testItemGroup/testItemGroupList",{searchStr:searchStr,status:status,orderType:orderType},function(){
		$("#testItemGroupList").find('tr:eq(1)').click();
		$("#groupList").show();
		//组合列表行数
		var ctrTestItemGroupsNumber = $("#ctrTestItemGroupsNumber").val();
		//当组合项目没有数据的时候需要刷新组合包含项目列表
		if(ctrTestItemGroupsNumber == 0){
			//组合包含的项目列表
			$("#singleItmeList").load(ctx + "/pm/testItemGroup/singleItemList",{testItemId:0});
			$("#singleItmeList").show();
		}
	});
	
}
//添加项目页面中的搜索功能
function notContainSearch(){
	var testItemId = $("#testItemGroupId").val();
	var instrumentId = $("#instrumentId option:selected").val();//仪器id
	var searchGroupStr = $("#searchGroupStr").val().trim();//添加项目的搜索框
	$("#searchGroupStr").val(searchGroupStr);
	//组合项目列表
	$("#notContainListDiv").load(ctx + "/pm/testItemGroup/notContainList",{testitemId:testItemId,instrumentId:instrumentId,searchGroupStr:searchGroupStr},function(){
		// 显示条数
		var itemRowsNum = $("#notContainList tr").length - 1;
		$("#notContainListNumber").text(itemRowsNum);
	});
}

/**
 *  选择某行的组合查询组合所包含的项目
 *  项目ID
 */
function changeTr(id){
	highlight("testItemGroupList",id);
	//组合包含的项目列表
	$("#singleItmeList").load(ctx + "/pm/testItemGroup/singleItemList",{testItemId:id});
	$("#singleItmeList").show();
}

//添加修改页面初始化
function addOrEdit(testItemid,type){
	if(type == "add"){
		// 新增的场合，需要清空条件，且排序改为按录入顺序倒序
		$("#searchStr").val("");
		$("#searchStatus").val("2");
		$("#orderType").val("2");
		/**点击添加*/
		$("#saveOrEdit").load(ctx + "/pm/testItemGroup/shwoAddOrEdit",{testItemid:testItemid,type:type});
		$("#saveOrEdit").show();
		$("body").append("<div class='oy'></div>")
	    $("#xinxi").show();
	}else{
		//判断检验项目是否停用，可用状态不可修改数据 1启用 0停用
		var status = $("#status_" + testItemid).val();
		if(status == 1){
			showMessage("当前选中记录已启用，不允许修改！");
			return;
		}
		/**点击添加*/
		$("#saveOrEdit").load(ctx + "/pm/testItemGroup/shwoAddOrEdit",{testItemid:testItemid,type:type});
		$("#saveOrEdit").show();
		$("body").append("<div class='oy'></div>")
	    $("#xinxi").show();
	}
	
}

//保存数据验证
function validateSave(){
	var name = $.trim($("#name").val()); //组合名称
	//var sampleTypeId = $.trim($("#sampleTypeId option:selected").val());//默认样本类型
	var sampleTypeId = sampleTypeGrid.getValue();
	var displayOrder = $.trim($("#displayOrder").val()); //顺序好
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
	var displayOrderId = "displayOrder";
	if(validateDisplayOrder(displayOrderId)){
		return false; 
	}
	if(displayOrder.length > 6){
		showMessage("顺序号最大长度为6位，请重新输入！",function(){
			$("#displayOrder").focus();
		});
		return false;
	}
	var regExp = /^[A-Z]+$/;
	var enShortName = $("#enShortName").val();//英文简称
	if(enShortName != ""){
		if(!regExp.test(enShortName)){
			showMessage("英文简称只能是大写字母，请重新输入！",function(){
				$("#enShortName").focus();
			});
			return false;
		}
	}
	regExp = /^[a-z|A-Z|0-9]+$/;
	var enName = $("#enName").val();//英文名称
	if(enName != ""){
		if(!regExp.test(enName)){
			showMessage("英文名称只能是字母和数字，请重新输入！",function(){
				$("#enName").focus();
			});
			return false;
		}
	}
	regExp = /^[A-Z|0-9]+$/;
	var fastCode = $("#fastCode").val();//英文简称
	if(fastCode != ""){
		if(!regExp.test(fastCode)){
			showMessage("助记符只能是大写字母和数字，请重新输入！",function(){
				$("#fastCode").focus();
			});
			return false;
		}
	}
	return true;
}

//添加数据数据
function add(params){
	$.ajax({
		"url" : ctx+"/pm/testItemGroup/saveOrEditTestItemGroup",
		"type" : "POST",
		"data" : params,
		"success" : function(data) {
			var ret = resolutionData(data);
			closeEdit();//关闭页面
			$("#searchStr").val("");
			$("#orderType").val("2").attr("selected",true);
			$("#searchDisciplineId").val("0").attr("selected",true);
			search();//刷新list
		}
	});
}

//修改数据
function update(params){
	$.ajax({
		"url" : ctx+"/pm/testItemGroup/saveOrEditTestItemGroup",
		"type" : "POST",
		"data" : params,
		"success" : function(data) {
			canStore = true;
			var ret = resolutionData(data);
			closeEdit();//关闭页面
			//刷新该行记录
			var jsonObj = eval('(' + ret + ')');
			//赋值
			var testItemid = "'" + jsonObj.idString + "'";
			$("#tr_"+jsonObj.idString).children('td').eq(1).html('<a href="javascript:Query(' + testItemid + ');">'+jsonObj.codeNo+'</a>');
			$("#tr_"+jsonObj.idString).children('td').eq(2).html(replaceHtml(jsonObj.name));
			$("#tr_"+jsonObj.idString).children('td').eq(3).html(replaceHtml(jsonObj.enShortName));
			$("#tr_"+jsonObj.idString).children('td').eq(4).html(replaceHtml(jsonObj.enName));
			$("#tr_"+jsonObj.idString).children('td').eq(5).html(replaceHtml(jsonObj.sampleTypeName));
			$("#tr_"+jsonObj.idString).children('td').eq(6).html(replaceHtml(jsonObj.fastCode));
			$("#tr_"+jsonObj.idString).children('td').eq(7).html(replaceHtml(jsonObj.displayOrder));
			
		},
		"error" : function() {
			canStore = true;
		}
	});
}

//保存数据
function saveOrEdit(){
	//防止重复提交
    if(!canStore){
 		return false;
    }
    //必填验证
    if(!validateSave()){
    	return false;
    }
    
    var type = $("#type").val();//添加修改类型 add 添加  edit 修改
	var params = $("#crtTestItemGroupFrom").serialize(); //组合项目表单
	var name = $.trim($("#name").val()); //验证组合名称是否重复使用
	var id = $.trim($("#id").val()); //当前行数据的项目ID，动态更新表单数据使用
	var isIndividualStat = $("input[type=checkbox]:checked").val();
	if(isIndividualStat == undefined){
		isIndividualStat = 1;
		params += "&isIndividualStat=" + isIndividualStat;
	}
	params += "&sampleTypeName=" + sampleTypeGrid.getText();
	//判断是添加项目还是修改项目
	if(type == 'add'){
		//判断项目名称是否重复
		$.ajax({
			"url" : ctx+"/pm/testItem/findCount",
			"type" : "POST",
			"data" : {testName:name},
			"success" : function(data) {
				count = data.substring(5);
				if(count > 0){
					//提示项目名称重复是否继续
					showConfirm("组合项目名称重复，是否继续？",function(){
						add(params);
					});
					canStore = true;
				//项目名称没有重复，不提示直接保存
				}else{
					add(params);
					canStore = true;
				}
				
			}
		});
	}else{
		//旧的组合名称
		var oldName = $("#oldName").val();
		//新的组合名称
		var name = $("#name").val();
		if(oldName != name){
			//判断项目名称是否重复
			$.ajax({
				"url" : ctx+"/pm/testItem/findCount",
				"type" : "POST",
				"data" : {testName:name},
				"success" : function(data) {
					count = data.substring(5);
					if(count > 0){
						//提示项目名称重复是否继续
						showConfirm("组合项目名称重复，是否继续？",function(){
							update(params);
						});
						canStore = true;
					//项目名称没有重复，不提示直接保存
					}else{
						update(params);
						canStore = true;
					}
				}
			});
		}else{
			//修改数据
			update(params);
			canStore = true;
		}
	}
}

/**
 * 启用或者停用 
 * testItemid 项目ID
 * type 0停用 1启用
 */
function disavleOrUsing(testItemid,type){
	var msg = '';
	if(type == '0'){
		msg = '是否停用当前记录？';
	}else{
		msg = '是否启用当前记录？';
	}
	showConfirm(msg,function(){
		$.ajax({
			"url" : ctx+"/pm/testItem/modifyTestItemStatus",
			"type" : "POST",
			data : {testItemid:testItemid,type:type},
			"success" : function(data) {
				if(data != null && data != ""){
					var msg = data.indexOf("err|");
					if(msg == 0){
						showMessage(msg.substring(4));
					}else{
						//切换显示启用停用功能，减少后台交互
						if(type == 0){
							$("#disavle_" + testItemid).hide();
							$("#using_" + testItemid).show();
							$("#status_" + testItemid).val(0);
							//resolutionData(data);
						}else{
							$("#using_" + testItemid).hide();
							$("#disavle_" + testItemid).show();
							$("#status_" + testItemid).val(1);
							//resolutionData(data);
						}
					}
				}
			}
		});
	});
}

//查看信息
function Query(testItemid){
	/**点击添加*/
	$("#testItem").load(ctx + "/pm/testItemGroup/shwoAddOrEdit",{testItemid:testItemid,type:"view"});
	$("#testItem").show();
	$("body").append("<div class='oy'></div>")
    $("#testItemView").show();
}

//删除数据
function del(id){
	//判断检验项目是否停用，可用状态不可修改数据 1启用 0停用
	var status = $("#status_" + id).val();
	var testItemGroupId = $("#testItemGroupId").val();
	if(id == testItemGroupId){
		$("#testItemGroupId").val("");
	}
	if(status == 1){
		showMessage("当前选中记录已启用，不允许删除！",function(){
			$("#codeNo").focus();
		});
		return;
	}
	showConfirm("是否要删除当前记录？",function(){
		$.ajax({
			"url" : ctx+"/pm/testItem/deleteTestItem",
			"type" : "POST",
			data : {testItemid:id},
			"success" : function(data) {
				resolutionData(data);
				search();//刷新list
			},
			"error" : function() {
			}
		});
	});
}

//批量删除组合项目
function deleteCheckedAll(){
	var ids = "";
	var i = 0;//标示位提示某行的数据是否也启用使用
	var flag = false; //当ids为空时且状态勾选有启用的项目时进行判断
	var msg = "";
	$("a[id='checkItem']").each(function(){
		i++;
		if($(this).attr("class") == 'yes'){
			//判断选择的数据是否是停用数据
			var status = $("#status_" + $(this).attr("value")).val();
			var testItemName = $("#tr_" + $(this).attr("value")).children('td').eq(2).html();
			if(status == 1){
				msg += "【" + testItemName + "】、";
				flag = true;
				//return false;//跳出所有循环；相当于 java中的 break 效果。反之 continue 效果
			}
			ids += $(this).attr("value")+",";
			//组合项目ID
			var testItemGroupId = $("#testItemGroupId").val();
			if($(this).attr("value") == testItemGroupId){
				$("#testItemGroupId").val("");
			}
		}
	});
	if(flag){
		showMessage("项目名称："+msg.substring(0, msg.length-1)+'启用状态，不允许删除!');
		return;
	}
	if(ids == ''){
		showMessage("请选择要删除的数据！");
		return;
	}
	//提示确认信息
	showConfirm("是否删除当前记录？",function(){
		$.ajax({
			"url" : ctx+"/pm/testItem/deleteTestItem",
			"type" : "POST",
			data : {testItemid:ids},
			"success" : function(data) {
				resolutionData(data);
				search();//刷新list
			}
		});
	});
}

//显示组合添加项目页面
function addSingleItmeShow(){
	//组合项目ID
	var testItemid = $("#testItemGroupId").val();
	//组合列表的行数
	var ctrTestItemGroupsNumber = $("#ctrTestItemGroupsNumber").val();
	if(testItemid == "" || ctrTestItemGroupsNumber == 0){
		showMessage("请选择需要添加项目的组合！");
		return;
	}
	//当前选择组合停用启用状态
	var status = $("#status_" + testItemid).val();
	if(status == 1){
		showMessage("当前选中组合已启用，不允许添加项目！");
		return;
	}
	$("#addSingleItme").load(ctx + "/pm/testItemGroup/addSingleItemShow",{testItemid:testItemid},function(){
		$("#addSingleItme").show();
		$("body").append("<div class='oy'></div>")
	    $("#addSingleItmeShow").show();
	});
	
}

/**
 * 组合未包含项目表格行点击事件
 */
/**function notContainTr(testItemId){
	//控制行高亮
	highlight("notContainList",testItemId);
	$("#leftMove").unbind("click");
	//点击组合未包含项目列时为左移按钮绑定事件
	$("#leftMove").bind("click",function(){
		var codeNo = $("#tr_notContain_"+testItemId).children('td').eq(0).text();//达安标准码
		var testName = $("#tr_notContain_"+testItemId).children('td').eq(1).text();//项目名称
		var enShortName = $("#tr_notContain_"+testItemId).children('td').eq(2).text();//英文简称
		var testMethodName = $("#tr_notContain_"+testItemId).children('td').eq(3).text();//检验方法
		var sex = $("#tr_notContain_"+testItemId).children('td').eq(4).text();//项目性别
		var sexID = $("#tr_notContain_"+testItemId).children('td').eq(5).text();//项目性别ID
		var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
		var containListNumber = $("#containListNumber").text();//组合包含项目总数
		var flag = true;//性别判断
		//遍历表格中性别是否有添加项目的性别是否相同
		$("#containList tr").each(function(){
			//sexIDThan用做比对
			var sexIDThan = $.trim($(this).children('td').eq(5).text());
			if(sexIDThan != "3" && sexIDThan != ""){
				if(sexID != "3"){
					if(sexID != sexIDThan){
						showMessage("当前选中记录性别不符，不允许添加!");
						flag = false;
					}
				}
				
			}
		});
		//存在不同性别的项目不给添加
		if(flag){
			//onclick+id直接拼接到字符串中出现下面这种情况,用双引号做拼接符也会出现下面这种情况，导致点击行不会响应事件
			//<tr id="tr_674898712387911680" onclick="containTr(" 674898712387911680');'=""><td>单项1</td><td>单项1</td><td></td><td>检验方法3</td></tr>
			var id = "'"+testItemId+"'";
			//添加到左边列表中的数据
			var TrData = '<tr id="tr_contain_'+testItemId+'" onclick="containTr('+id+');"><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td><td>'+testMethodName+'</td><td>'+sex+'</td><td>'+sexID+'</td></tr>';
			//先删除右边列表
			$("#tr_notContain_"+testItemId).remove();
			//动态更新添加一行到组合包含项目列表
			$("#containList tbody").append(TrData);
			//修改行总数
			$("#notContainListNumber").text(parseInt(notContainListNumber) - 1);//组合未包含项目总数 -1
			$("#containListNumber").text(parseInt(containListNumber) + 1);//组合包含项目总数 +1
			//把添加的项目保存到Map中
			addMap[testItemId] = testItemId;
			//移除需要删除的项目;
			delete removeMap[testItemId];
			//$.each(addMap,function(key,values){ 
			//	alert(values);
			//});
			//解除左移按钮事件
			$("#leftMove").unbind("click");
		}
	});
}*/

/**
 * 验证是否已经选中列表的行
 * @param type 左右列表
 */
function verify(type){
	var i = 0;//用来判断calss的样式等于‘cur’有多少，小于0的就是没有选中行
	$("#"+type+" tr").each(function(){
		if($(this).attr("class") == 'cur'){
			i++;
		}
	});
	var msg = "";
	if(type == 'notContainList'){
		msg = "请选择要添加的项目！";
	}else{
		msg = "请选择要移除的项目！";
	}
	//判断项目是否选中
	if(i == 0){
		showMessage(msg,function(){
			return;
		});
	}
}

/**
 * 组合已包含项目表格行点击事件
 */
/**function containTr(testItemId){
	//控制行高亮
	highlight("containList",testItemId);
	$("#rightMove").unbind("click");
	//点击组合已包含项目列时为右移按钮绑定事件
	$("#rightMove").bind("click",function(){
		var codeNo = $("#tr_contain_"+testItemId).children('td').eq(0).text();//达安标准码
		var testName = $("#tr_contain_"+testItemId).children('td').eq(1).text();//项目名称
		var enShortName = $("#tr_contain_"+testItemId).children('td').eq(2).text();//英文简称
		var testMethodName = $("#tr_contain_"+testItemId).children('td').eq(3).text();//检验方法
		var sex = $("#tr_contain_"+testItemId).children('td').eq(4).text();//项目性别
		var sexID = $("#tr_contain_"+testItemId).children('td').eq(5).text();//项目性别
		var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
		var containListNumber = $("#containListNumber").text();//组合包含项目总数
	    
		//先删除右边列表
		$("#tr_contain_"+testItemId).remove();
		//onclick+id直接拼接到字符串中出现下面这种情况
		//<tr id="tr_674898712387911680" onclick="containTr(" 674898712387911680');'=""><td>单项1</td><td>单项1</td><td></td><td>检验方法3</td></tr>
		var id = "'"+testItemId+"'";
		//添加到左边列表中的数据
		var TrData = '<tr id="tr_notContain_'+testItemId+'" onclick="notContainTr('+id+')"><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td><td>'+testMethodName+'</td><td>'+sex+'</td><td>'+sexID+'</td></tr>';
		//动态更新添加一行到组合包含项目列表
		$("#notContainList tbody").append(TrData);
		//修改行总数
		$("#notContainListNumber").text(parseInt(notContainListNumber) + 1);//组合未包含项目总数 -1
		$("#containListNumber").text(parseInt(containListNumber) - 1);//组合包含项目总数 +1
		//把移除的项目添加到removeMap中
		removeMap[testItemId] = testItemId;
		//删除addMap要要添加的项目
		delete addMap[testItemId];
		//解除右移按钮事件
		$("#rightMove").unbind("click");
	});
}*/

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
			var sex = $("#tr_contain_"+testItemId).children('td').eq(5).text();//项目性别
			var sexID = $("#tr_contain_"+testItemId).children('td').eq(6).text();//项目性别
			var tId = $("#tr_notContain_"+testItemId).children('td').eq(7).text();//项目ID
			var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
			var containListNumber = $("#containListNumber").text();//组合包含项目总数
			//先删除右边列表
			$("#tr_contain_"+testItemId).remove();
			var id = "'"+testItemId+"'";
			//添加到左边列表中的数据,新的插到最前面
			var TrData = '<tr id="tr_notContain_'+testItemId+'"><td class="cen2"><a id="checkItem2" value="'+testItemId+'" href="javascript:void(0)" class="not"></a></td><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td><td>'+testMethodName+'</td><td>'+sex+'</td><td>'+sexID+'</td><td>'+tId+'</td></tr>';
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
	var msg = ""; //用于判断想是否有重复提示使用
	$("a[id='checkItem2']").each(function() {
		if($(this).attr("class") == 'yes'){
			testItemId = $(this).attr("value")+"";
			highlight("containList","tr_contain_"+testItemId);
			var codeNo = $("#tr_notContain_"+testItemId).children('td').eq(1).text();//达安标准码
			var testName = $("#tr_notContain_"+testItemId).children('td').eq(2).text();//项目名称
			var enShortName = $("#tr_notContain_"+testItemId).children('td').eq(3).text();//英文简称
			var testMethodName = $("#tr_notContain_"+testItemId).children('td').eq(4).text();//检验方法
			var sex = $("#tr_notContain_"+testItemId).children('td').eq(5).text();//项目性别
			var sexID = $("#tr_notContain_"+testItemId).children('td').eq(6).text();//项目性别ID
			var tId = $("#tr_notContain_"+testItemId).children('td').eq(7).text();//项目ID
			var notContainListNumber = $("#notContainListNumber").text();//组合未包含项目总数
			var containListNumber = $("#containListNumber").text();//组合包含项目总数
			var flag = true;//性别判断
			//遍历表格中性别是否有添加项目的性别是否相同
			$("#containList tr").each(function(){
				//sexIDThan用做比对
				var sexIDThan = $.trim($(this).children('td').eq(6).text());
				//判断项目是否已经存在
				var tIdThan = $.trim($(this).children('td').eq(7).text());
				if(tIdThan != ""){
					if(tIdThan == tId){
						msg += "【" + testName + "】、"
						flag = false;
					}
					
				}
				if(sexIDThan != "3" && sexIDThan != ""){
					if(sexID != "3"){
						if(sexID != sexIDThan){
							showMessage("当前选中记录性别不符，不允许添加!");
							flag = false;
						}
					}
					
				}
			});
			if(flag){
				var id = "'"+testItemId+"'";
				//添加到左边列表中的数据
				var TrData = '<tr id="tr_contain_'+testItemId+'"><td class="cen1"><a id="checkItem" value="'+testItemId+'" href="javascript:void(0)" class="not"></a></td><td>'+codeNo+'</td><td>'+testName+'</td><td>'+enShortName+'</td><td>'+testMethodName+'</td><td>'+sex+'</td><td>'+sexID+'</td><td>'+tId+'</td></tr>';
				//先删除右边列表
				$("#tr_notContain_"+testItemId).remove();
				//动态更新添加一行到组合包含项目列表
				$("#containList tr:eq(0)").after(TrData);
				$("a[id='checkItem']").unbind();        //解绑点击事件
				$("a[id='checkItem']").click(function(){//绑定点击事件函数 
					var cla = $(this).attr("class");
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
		}
	});
	if(msg != ""){
		showMessage("项目名称:" + msg.substring(0, msg.length - 1) + ",已经存在于组合中,不允许添加！");
	}
	if(testItemId == ''){
		showMessage("请选择要添加的数据");
		return;
	}
}

/**
 * 添加或者删除组合项目
 */
function addOrRemoveItem(){
	//组合项目ID
	var groupItemID = $("#testItemGroupId").val();
	//组合需要移除的项目
	var removeItemID = "";
	$.each(removeMap,function(key,values){ 
		removeItemID += values + ',';
		//清空removeMap
		delete removeMap[values];
	});
	//组合需要添加的项目
	var addItemID = "";
	$.each(addMap,function(key,values){ 
		addItemID += values + ',';
		//清空addMap
		delete addMap[values];
	});
	$.ajax({
		"url" : ctx+"/pm/testItemGroup/addOrRemoveItem",
		"type" : "POST",
		data : {removeItemID:removeItemID,addItemID:addItemID,groupItemID:groupItemID},
		"success" : function(data) {
			resolutionData(data);
			changeTr(groupItemID);//刷新list
			$.each(removeMap,function(key,values){ 
				//清空removeMap
				delete removeMap[values];
			});
			$.each(addMap,function(key,values){ 
				//清空addMap
				delete addMap[values];
			});
			closeShow();//关闭页面
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
	if("containList" == tableName){
		$("#tr_contain_" + id).attr("class","cur");
	}else if("notContainList" == tableName){
		$("#tr_notContain_" + id).attr("class","cur");
	}else {
		$("#tr_" + id).attr("class","cur");
	}
}

/**
 * 删除组合单项
 */
function delSingleItem(id){
	//组合项目ID
	var groupItemid = $("#testItemGroupId").val();
	//当前选择组合停用启用状态
	var status = $("#status_" + groupItemid).val();
	if(status == 1){
		showMessage("当前选中组合已启用，不允许删除组合包含的项目！");
		return;
	}
	showConfirm("是否要删除当前记录？",function(){
		$.ajax({
			"url" : ctx+"/pm/testItemGroup/delSingleItem",
			"type" : "POST",
			data : {testItemid:id,groupItemid:groupItemid},
			"success" : function(data) {
				resolutionData(data);
				changeTr(groupItemid)//刷新组合包含项目list
			},
			"error" : function() {
			}
		});
	});
}

/**
 * 批量删除组合包含的项目
 */
function delSingleItemBatch(){
	//组合项目ID
	var groupItemid = $("#testItemGroupId").val();
	//当前选择组合停用启用状态
	var status = $("#status_" + groupItemid).val();
	if(status == 1){
		showMessage("当前选中组合已启用，不允许删除组合包含的项目！");
		return;
	}
	//批量删除组合包含的项目ＩＤ
	var ids = "";
	$("a[id='checkItem']").each(function(){
		if($(this).attr("class") == 'yes'){
			ids += $(this).attr("value")+",";
		}
	});
	
	if(ids == ''){
		showMessage("请选择要删除的数据！");
		return;
	}
	//提示确认信息
	showConfirm("是否删除选择记录？",function(){
		$.ajax({
			"url" : ctx+"/pm/testItemGroup/delSingleItemBatch",
			"type" : "POST",
			data : {testItemid:ids,groupItemid:groupItemid},
			"success" : function(data) {
				resolutionData(data);
				changeTr(groupItemid)//刷新组合包含项目list
			}
		});
	});
}

/**
 * 关闭添加修改页面
 */
function closeEdit(){
    $(".oy").remove();
    $("#xinxi").hide();
}

/**
 * 关闭添加组合项目的页面
 */
function closeShow(){
	$(".oy").remove();
    $("#addSingleItmeShow").hide();
}

/**
 * 关闭添加修改页面
 */
function closeView(){
    $(".oy").remove();
    $("#testItemView").hide();
}
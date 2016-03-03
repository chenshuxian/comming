
/***
 *@ClassName: independent.js
 * @Description: TODO(中心机构单位-JS)
 * @date 2016年01月19日 
 ***/
var InstBox;

InstBox = (function($){

    /*url 定義*/
	var preId= "box";
    var delBatUrl= ctx + "/inst/instrumentBox/batchDeleteInstrumentBox";
    var checkUrl= ctx + "/inst/instrumentBox/checkIfInstrumentBoxExist";
    var updateUrl=   ctx + "/inst/instrumentBox/modifyInstrumentBox"; 
    var addUrl= ctx + "/inst/instrumentBox/addInstrumentBox"; 
    var delUrl= ctx + "/inst/instrumentBox/deleteInstrumentBox";
    var changeStatusUrl= ctx + "/inst/instrumentBox/disableOrEnableInstrumentBox";
    var codeNoUrl = ctx + "/inst/instrumentBox/getInstrumentBoxCodeNoAndDisplayOrder";
    var pageListUrl= ctx + "/inst/instrumentBox/getInstrumentBoxPageList";
    var orgsId= $("#boxorgsId").val();
    var POST = "POST";
    var GET = "GET";
    var dataGrid="";
    
	var reloadData = {
	        searchStr: '',
	        status:'',
	        sort: '',
	        orgsId:''	
    };
	
	var _init = function () {
	    	
			//tableList = $("#" + preId + "TypeList");    	
	    	newcommonjs.pageInit(preId);   
	    	
	        //dataGrid render Start
	        var params = {orgsId:orgsId};  //如有需要在編寫如上方格式。
	    	var hideCols=new Array();
	    	var tableList = $("#boxTypeList");
	        //var url = pageListUrl;
	        var params = {
	        		url:pageListUrl,
	        		orgsId:orgsId,
	        		data:params,
	        		module:"Box",
	        		hideCols:hideCols,
	        		tableList:tableList,
	        		preId:preId
	        };  //如有需要在編寫如上方格式。
	        
	        //console.log(params);        

	        var gridObj = dataGridM.init(params);
	             
	        //* render DataGrid */
	        InstBox.dataGrid = tableList.datagrid(gridObj);
	        //dataGrid render End
	        //test second grid
	        //_searchGridCallback();
	        
	        /* 关键词搜索 */
	        $("#" + preId + "SelectBtn").click(function () {
	        	_getAllOrgsInfo();
	        });
	        
	        /* 关键词搜索 */
	        $("#" + preId + "SearchBtn").click(function () {
	        	newcommonjs.newdataGridSearch(dataGrid, searchObj());
	        });
	       
	        /* 状态搜索 */
	        $("." + preId + "-status-selector").on("click", "li", function () {
	            $("#" + preId + "StatusSpan").html($(this).html());
	            $("." + preId + "-status-selector li.selected").removeClass("selected");
	            var flg = $(this).is('.selected');
	            $(this).addClass(function () {
	                return flg ? '' : 'selected';
	            })

	            var statusVal = $(this).attr("el-value");
	            $("#" + preId + "Status").val(statusVal);

	            newcommonjs.newdataGridSearch(dataGrid, searchObj());
	        });

	        /* 排序 */
	        $("." + preId + "-sort-selector").on("click", "li", function () {
	            $("#" + preId + "SortSpan").html($(this).html());
	            $("." + preId + "-sort-selector li.selected").removeClass("selected");
	            var flg = $(this).is('.selected');
	            $(this).addClass(function () {
	                return flg ? '' : 'selected';
	            })

	            var sortVal = $(this).attr("el-value");
	            $("#" + preId + "Sort").val(sortVal);

	            newcommonjs.newdataGridSearch(dataGrid, searchObj());
	        });

	        /* 批量删除 */
	        $("#" + preId + "DeleteTypeBatch").click(function () {
	            newcommonjs.deleteBatch(dataGrid,delBatUrl,POST);
	        });

	        /* 新增 */
	        $("#" + preId + "AddType").click(function () {
	        	currentEvent = "add";
	        	var data = {id:'', opType: 'add', orgTypeId: orgTypeId};
	        	var url = tubeInfoUrl; 
	        	
	            newcommonjs.newshowDictCodeEditDialog(data,null,url,720);
	        });

	        $(window).on('resize', function () {
	            newcommonjs.tableAuto(tableList);
	        });
	    };
	    
	    var orgsId;
		var orgCode;
		var orgName;
		
		 var _orgSelect = function(id, code, name) {
			 
				orgsId = id;
				orgCode = code;
				orgName = name;
		 };
		
		 var _setParentValue = function () {
				if (!orgsId) {
					//alert("请选择数据！");
					showMessage('请选择数据！');
					return;
				}
				$("#orgsId").val(orgsId);
				$("#orgName").val(orgName);
				closeWin('refurbish');
		 };
		 
		 var _searchOrgsInfo = function (){
//				var pageNo = $("#pageNo_OrgPopUp").val();
//				var pageSize = $("#pageSize").val();
//				if (typeof (pageNo) == undefined || pageNo == null) {
//					pageNo = 1;
//				}
//				if (pageSize == 'undefined' || pageSize == null) {
//					pageSize = 5;
//				}
				//var searchStr = $("#searchOrgStr").val().trim();
//				var status = 1;
//				var sort = "";
//				var orgTypeId = 40;
				
//				var params ={
//						searchStr : searchStr,
//						pageNo : pageNo,
//						pageSize : pageSize,
//						status : status,
//						orgTypeId : orgTypeId,
//						sort : sort	
//				};
			 	var url = ctx + "/instruments/iorgsPageList";
				newcommonjs.newshowDictCodeEditDialog(null,_searchGridCallback, url, 400);
				

		 };
		 
		 var _searchGridCallback = function (){
			 
			 	//var searchStr = $("#searchOrgStr").val().trim();
			 	var searchStr = '';
			 	var status= 1;
				var orgTypeId= 40;
				var sort = '';
				var tableList2 = $("#orgTableList");
				var data = {
						orgTypeId:orgTypeId,
						status:1,
						sort:'',
						searchStr: searchStr			
				};  //如有需要在編寫如上方格式。
			    var hideCols=new Array();
			 	var params = {
		        		url:ctx + "/instruments/newiorgsPageList",
		        		data:data,
		        		module:"BoxSub",
		        		hideCols:hideCols,
		        		tableList:tableList2,
		        		preId:"box"
		        };  //如有需要在編寫如上方格式。
		        //console.log(params);
		        var gridObj = dataGridM.init(params);
		        //console.log(gridObj.columns);        

		        
		        InstBox.dataGrid2 = tableList2.datagrid(gridObj);
		        //setTimeout(alert("hello"),5000);
			 
		 };
	    
		 ///**
		 // * 机构弹出
		 // */
		 var _getAllOrgsInfo = function() {
//		 	var pageNo = $("#pageNo_OrgPopUp").val();
//		 	var pageSize = $("#pageSize").val();
//		 	if (typeof (pageNo) == undefined || pageNo == null) {
//		 		pageNo = 1;
//		 	}
//		 	if (pageSize == 'undefined' || pageSize == null) {
//		 		pageSize = 5;
//		 	}
//		 	var searchStr = $("#searchOrgStr").val(); // 检索的内容
//		 	var status = 1;// 状态
//		 	var sort = "";// 排序
//		 	var orgTypeId = 40;// 类型
//		 	var orgId = "";//机构ID
//		 	//清空客户仪器选择
//		 	$("#instrumentId").val("");
//		 	$("#instrumentName").val("");
		 	var url = ctx + "/instruments/iorgsPageList";
		 	var params ={};
//		 	var params = { 
//		 			searchStr : searchStr,
//					pageNo : pageNo,
//					pageSize : pageSize,
//					status : status,
//					orgTypeId : orgTypeId,
//					sort : sort
//		 	};
//		 	
		 	newcommonjs.newshowDictCodeEditDialog(params,_searchGridCallback, url, 720);
	
		 };
	    
	    var searchObj= function () {
	        return {
	            searchStr: $.trim($("#" + preId + "SearchStr").val()),
	            status: $("#" + preId + "Status").val(),
	            sort: $("#" + preId + "Sort").val(),
	            orgsId: orgsId
	        };
	    };
	    
	    /* 启用、停用状态 */
	    var _changeStatus= function (index, rowData) {
	        var url = changeStatusUrl;
	        newcommonjs.changeStatus(index, rowData, dataGrid, url, "POST");
	    };
	    
	    /* 删除行 */
	    var _deleteRow= function (index, rowData) {
	        var url = delUrl;
	        //var dataGrid = dataGrid;
	        newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
	    };
	    
	    /* 编辑 */
	    var _editRow= function (rowData) {
	        var id = rowData.stringId;
	        if (rowData.status == true) {
	            showMessage('当前选中记录已启用，不允许修改！');
	            return;
	        }
	        var url = tubeInfoUrl;
	        var data = {id:rowData.stringId, opType: 'edit', orgTypeId: orgTypeId};
	        
	        var callback = function () {
	        	
	            $("#InfoForm").form("load", {
	                /* input's name attr : data */
	            	regionName: rowData.regionName,
	            	regionId: rowData.regionSId,
	                name: rowData.name,
	                shortName: rowData.shortName,
	                nacaoId: rowData.nacaoId,
	                enShortName: rowData.enShortName,
	                enName: rowData.enName,
	                address: rowData.address,
	                enAddress: rowData.enAddress,
	                contacts: rowData.contacts,
	                telephone: rowData.telephone,
	                fax: rowData.fax,
	                fastCode: rowData.fastCode,
	                displayOrder: rowData.displayOrder,
	                memo: rowData.memo,
	                orgTypeId: orgTypeId,
	                id:rowData.stringId,
	                codeNo:rowData.codeNo,
	                opType: 'edit'              
	            });
	            $("#spanEditCodeNo").html(rowData.codeNo);
	            newcommonjs.oldName = rowData.name;
	            _initTree();
	        };
	               
	        newcommonjs.newshowDictCodeEditDialog(data,callback, url, 720);
	       
	    };
	    
	    /* 弹出详情信息框 */
	    var _showDialog= function (rowData) {
	    	
	        var url = tubeInfoUrl;
	        var data = {id:rowData.stringId, opType: 'view', orgTypeId: orgTypeId};
	        
	        var callback = function () {
	        	
	            $("#InfoForm").form("load", {
	                /* input's name attr : data */
	            	regionName: rowData.regionName,
	                name: rowData.name,
	                shortName: rowData.shortName,
	                nacaoId: rowData.nacaoId,
	                enShortName: rowData.enShortName,
	                enName: rowData.enName,
	                address: rowData.address,
	                enAddress: rowData.enAddress,
	                contacts: rowData.contacts,
	                telephone: rowData.telephone,
	                fax: rowData.fax,
	                fastCode: rowData.fastCode,
	                displayOrder: rowData.displayOrder,
	                memo: rowData.memo
	            });
	            $("form input").attr("readonly","readonly");
	            $("form textarea").attr("readonly","readonly");
	            $("#editBtn").hide();
	            $("#spanEditCodeNo").html(rowData.codeNo);
	        };
	        
	        newcommonjs.newshowDictCodeEditDialog(data,callback, url, 720);
	    };
	    
	    /* 判断新增还是修改 */
	    var _editDictCode= function (opType, typeKey) {
	        var existUrl = checkUrl;

	        var data = $("#infoForm").serialize();
	        
			var v = validateSave();
	        if (opType == "add") {
	            newcommonjs.newaddDictCode(existUrl, addUrl, "POST", dataGrid, data, successF,v);
	        } else if (opType == "edit") {
	            newcommonjs.newupdateDictCode(existUrl, updateUrl, "POST", dataGrid, data, successF,v);
	        }
	    };
	    

	//===============以下为公共方法================//
	return {
		init:_init,
		editDictCode:_editDictCode,
		editRow :_editRow,
		deleteRow: _deleteRow,
		changeStatus:_changeStatus,
		showDialog:_showDialog,
		orgSelect:_orgSelect,
		setParentValue:_setParentValue,
		searchOrgsInfo:_searchOrgsInfo
		
		//setTypeId:_setTypeId,
		//setPreId:_setPreID,
		//searchBtn:_searchBtn,
		//getDataGrid: _getDataGrid
	};
}(jQuery));

$(function () {
	
	Box = (function(old){
		var my = Object.create(old);
		my.init();
		return my;
	}(InstBox));
   
});


//var enable = 1;
//var disable = 2;
//
///**
// * 机构弹出
// */
//function getAllOrgsInfo() {
//	var pageNo = $("#pageNo_OrgPopUp").val();
//	var pageSize = $("#pageSize").val();
//	if (typeof (pageNo) == undefined || pageNo == null) {
//		pageNo = 1;
//	}
//	if (pageSize == 'undefined' || pageSize == null) {
//		pageSize = 5;
//	}
//	var searchStr = $("#searchOrgStr").val(); // 检索的内容
//	var status = 1;// 状态
//	var sort = "";// 排序
//	var orgTypeId = 40;// 类型
//	var orgId = "";//机构ID
//	//清空客户仪器选择
//	$("#instrumentId").val("");
//	$("#instrumentName").val("");
//	var url = ctx + "/instruments/iorgsPageList";
//	$("#orgSelect").load( url, { searchStr : searchStr,
//											pageNo : pageNo,
//											pageSize : pageSize,
//											status : status,
//											orgTypeId : orgTypeId,
//											sort : sort
//	}, function() {
//		$("#orgSelect").show();
//	});
//}
//
//
//
//function viewPage(id) {
//	var codeNo = $("#tr_"+id).children('td').eq(1).text().trim();
//	var boxBarCode = $("#tr_"+id).children('td').eq(2).text().trim();
//	var boxIP = $("#tr_"+id).children('td').eq(3).text().trim();
//	var memo =  $("#tr_"+id).children('td').eq(4).text().trim();
//	var displayOrder = $("#tr_"+id).children('td').eq(5).text().trim();
//	$("#codeNo").text(codeNo);
//	$("#boxBarCode").val(boxBarCode);
//	$("#boxIP").val(boxIP);
//	$("#memo").val(memo);
//	$("#displayOrder").val(displayOrder);
//	$("#id").val(id);
//	$("#opType").val("view");
//	$("#cancel").hide();
//	$("#addModifyOrViewBox").show();
//}
//
//function addPage () {
//	var orgId = $("#orgsId").val();
//	if (orgId == null || orgId == 'undefined' || orgId == '') {
//		showMessage("请选择机构!");
//		return;
//	}
//	$("#boxBarCode").val("");
//	$("#boxIP").val("");
//	$("#displayOrder").val("");
//	$("#memo").val("");
//	$("#opType").val("add");
//	$("#cancel").show();
//	var url = ctx + "/inst/instrumentBox/getInstrumentBoxCodeNoAndDisplayOrder";
//	$.ajax({
//		url : url,
//		type : "POST",
//		data : null,
//	    complete: function(result){
//	    	var array = result.responseText.replace(/"/g,"").split("|");
//	    	$("#codeNo").html(array[0]);
//	    	$("#displayOrder").val(array[1]);
//	    	$("#addModifyOrViewBox").show();
//	    }
//	});
//}
//
//
//
//function add() {
//	var codeNo = $("#codeNo").html().trim();
//	var boxBarCode = $("#boxBarCode").val();
//	var boxIP = $("#boxIP").val();
//	var displayOrder = $("#displayOrder").val();
//	var memo = $("#memo").val();
//	var orgId = $("#orgsId").val();
//	if (boxBarCode == null || boxBarCode == 'undefined' || boxBarCode == '') {
//		showMessage("盒子条码为空，请重新输入!");
//		return;
//	}
//	if (boxIP == null || boxIP == 'undefined' || boxIP == '') {
//		showMessage("盒子IP为空，请重新输入!");
//		return;
//	}
//	var url = ctx + "/inst/instrumentBox/addInstrumentBox";
//	//请求参数
//	var data = {
//			"codeNo":codeNo,
//			"boxBarCode":boxBarCode,
//			"boxIP":boxIP,
//			"displayOrder":displayOrder,
//			"memo":memo,
//			"orgId":orgId
//	};
//	$.ajax({
//		url : url,
//		type : "POST",
//		data : data,
//	    complete: function(){
//	    	closeWin();
//	    	$("#sort  option[value=2] ").attr("selected",true);  //新增后排序默认为按按录入顺序降序
//		    $("#status option:first ").attr("selected",true); //新增后状态默认为全部
//		    $("#searchStr").val("");
//		    pageQuery();
//	    }
//	});
//}
//
//function modifyPage(id,status) {
//	var codeNo = $("#tr_"+id).children('td').eq(1).text().trim();
//	var boxBarCode = $("#tr_"+id).children('td').eq(2).text().trim();
//	var boxIP = $("#tr_"+id).children('td').eq(3).text().trim();
//	var memo =  $("#tr_"+id).children('td').eq(4).text().trim();
//	var displayOrder = $("#tr_"+id).children('td').eq(5).text().trim();
//	$("#codeNo").text(codeNo);
//	$("#boxBarCode").val(boxBarCode);
//	$("#boxIP").val(boxIP);
//	$("#memo").val(memo);
//	$("#displayOrder").val(displayOrder);
//	$("#id").val(id);
//	$("#cancel").show();
//	if (status == "1") {
//		showMessage("启用状态不允许修改!");
//		return;
//	}
//	$("#opType").val("modify");
//	$("#addModifyOrViewBox").show();
//}
//
//function modifyInstrumentBox() {
//	var id = $("#id").val();
//	var boxBarCode = $("#boxBarCode").val();
//	var boxIP = $("#boxIP").val();
//	var displayOrder = $("#displayOrder").val();
//	var memo = $("#memo").val();
//	if (boxBarCode == null || boxBarCode == 'undefined' || boxBarCode == '') {
//		showMessage("盒子条码为空，请重新输入!");
//		return;
//	}
//	if (boxIP == null || boxIP == 'undefined' || boxIP == '') {
//		showMessage("盒子IP为空，请重新输入!");
//		return;
//	}
//	$.ajax({
//		url : ctx + "/inst/instrumentBox/modifyInstrumentBox",
//		type : "POST",
//		data : {
//			"id":id,
//			"boxBarCode":boxBarCode,
//			"boxIP":boxIP,
//			"displayOrder":displayOrder,
//			"memo":memo
//		},
//		complete: function(){
//			closeWin();
//		    pageQuery();
//	    }
//	});
//}
//
//function deleteInstrumentBox(id){
//	var status = $("#tr_" + id).children('td').eq(8).html();
//	if (status == enable){
//		showMessage('当前选中记录已启用，不允许删除！');
//		return;
//	}
//	showConfirm('是否删除当前记录？',function(){
//		$.ajax({
//			url : ctx + "/inst/instrumentBox/deleteInstrumentBox",
//			type : "POST",
//			data : { id : id },
//			complete: function(){
//			    pageQuery();
//		    }
//		});
//	});
//}
//
//function batchDeleteInstrumentBox() {
//	var ids = "";
//	var isNotDeleteCodes = "";
//	//var i = 0;
//	$("a[id='checkItem']").each(function() {
//		//i++;
//		if ($(this).attr("class") == 'yes') {
//			var checkId = $(this).attr("value");
//			var status = $("#tr_" + checkId).children('td').eq(8).html();
//			if (status != "1") { // 非启用状态可进行删除
//				ids += checkId + ",";
//			} else { // 启用状态的条码记录下来做提示
//				isNotDeleteCodes += "【"+$("#tr_"+checkId).children('td').eq(2).html() + "】、";
//				//isNotDeleteCodes += i + ",";
//			}
//		}
//	});
//	if (isNotDeleteCodes != "" || isNotDeleteCodes.length > 0) {
//		showMessage("名称" + isNotDeleteCodes.substring(0, isNotDeleteCodes.length - 1) + '启用状态，不允许删除!');
//		return false;
//	}
//	if (ids == '') {
//		showMessage('请选择要删除的数据!');
//		return false;
//	}
//	showConfirm('是否删除所选中的记录？', function() {
//		$.ajax({
//			url : ctx + "/inst/instrumentBox/batchDeleteInstrumentBox",
//			type : "POST",
//			data : {
//				ids : ids
//			},
//			complete: function(){
//			    pageQuery();
//		    }
//		});
//	});
//}
//
//function disableOrEnable(id, index, operatioType) {
//	if (id == '' || operatioType == '') {
//		showMessage('请选择操作记录!');
//		return;
//	}
//	var confirmMeg = "";
//	if(operatioType == 'Disable'){
//		confirmMeg = "是否停用当前记录？";
//	}
//	if(operatioType == 'Enable'){
//		confirmMeg = "是否启用当前记录？";
//	}
//	showConfirm(confirmMeg,function(){
//		$.ajax({
//			url : ctx + "/inst/instrumentBox/disableOrEnableInstrumentBox",
//			type : "POST",
//			data : {id : id, operatioType : operatioType},
//			complete: function(){
//			    pageQuery();
//		    }
//		});
//	});
//}
//
//function pageQuery(type){
//	var orgId = $("#orgsId").val(); //机构ID
//	if (type == 'search') {
//		//判断是否选择了客户机构
//		if(orgId == 'undefined' || orgId == ''){
//			showMessage("请选择客户机构!");
//			return;
//		}
//	}
//	if (type == 'select') {
//		if(orgId == 'undefined' || orgId == ''){
//			return;
//		}
//	}
//	var pageNo = $("#pageNo").val();
//	var pageSize = $("#pageSize").val();
//	if(type=="init"){
//		pageNo =1;
//	}
//	if (pageNo == 'undefined' || pageNo == null) {
//		pageNo = 1;
//	}
//	if (pageSize == 'undefined' || pageSize == null) {
//		pageSize = 10;
//	}
//	var searchStr = $("#searchStr").val();
//	//去除空格后再重新赋值
//	$("#searchStr").val(searchStr);
//	var status = $("#status").val();
//	var sort = $("#sort").val();
//	var pageNo = $("#pageNo").val();
//	var pageSize = $("#pageSize").val();
//	var url = ctx + "/inst/instrumentBox/getInstrumentBoxPageList";
//	//请求参数
//	var data = {
//			"orgId" : orgId,
//			"searchStr" : searchStr,
//			"status" : status,
//			"sort" : sort,
//			"pageNo":pageNo,
//			"pageSize":pageSize
//	};
//	//加载项目对照页面
//	$("#pageListDiv").load(url, data,function(){
//		$("#pageListDiv").show();
//	});
//}
//
///**
// * 确定按钮
// */
//function enter () {
//	var  opType = $("#opType").val();
//	if (opType == "add" || opType == "modify") {
//		var boxBarCode = $("#boxBarCode").val();
//		$.ajax({
//			url : ctx + "/inst/instrumentBox/checkIfInstrumentBoxExist",
//			type : "POST",
//			data : { "boxBarCode" : boxBarCode },
//			complete: function(result){
//				if (result.responseText.replace(/"/g,"") != "exist" ) {
//					if (opType == "modify") {
//						modifyInstrumentBox();
//					}
//					if (opType == "add") {
//						add();
//					}
//				} else {
//					showMessage("盒子条码已存在!");
//				}
//			}
//		});
//	}
//	if(opType == "view") {
//		closeWin();
//	}
//}
//
///**
// *关闭窗口 
// */
//function closeWin(type) {
//	$(".oy").remove();
//	$(".xinxi").hide();
//	$("#addModifyOrViewBox").hide();
//	if(type == "refurbish"){
//		pageQuery();
//	}
//}
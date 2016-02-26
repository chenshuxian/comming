
/***
 *@ClassName: centerOrg.js
 * @Description: TODO(中心机构单位-JS)
 * @date 2015年01月15日 
 ***/



var CenterOrg = (function($){

	/* START render basicModule */
	CenterOrg =  Object.create(BasicModule);
	/* END render basicModule */

	var
		_delBatUrl = ctx + "/org/centerOrg/centerOrgDeleteBatch",
		_existUrl = ctx + "/org/centerOrg/centerOrgIfExisted",
		_exist2Url = ctx + "/org/centerOrg/checkNacaoIdExisted",
		_updateUrl = ctx + "/org/centerOrg/centerOrgEdit",
		_addUrl = ctx + "/org/centerOrg/centerOrgAdd",
		_delUrl = ctx + "/org/centerOrg/centerOrgDelete",
		_changeStatusUrl = ctx + "/org/centerOrg/centerOrgDisableOrEnable",
		_InfoUrl = ctx + "/org/centerOrg/centerOrgInfo",
		_pageListUrl = ctx + "/org/centerOrg/centerOrgPageList";

	var _initTree= function(){

		var obj = EasyTree.getInit();
		var click = {

			onClick:function(node){
				$("#regionId").val(node.id);
				$("#regionName").val(node.text);
				$("#showRegionDiv").hide();
				return;
			}

		};
		$.extend(obj,click);	//自定义click方法
		$("#regionName").combotree(obj);

	};

	var _checkNacaoId= function(orgTypeId) {
		//console.log(obj);
		var
			nacaoId = $("#nacaoId").val().trim(),
			type = $("#opType").val();

		/*console.log("checkNaco:"+nacaoId);
		 console.log("url:"+check2Url);
		 console.log(orgTypeId);
		 console.log(type);*/
		$.ajax({
			url : CenterOrg.exist2Url,
			type : CB.METHOD,
			data : {orgTypeId : orgTypeId, nacaoId : nacaoId},
			success : function(data) {
				//resolutionData(data);
				console.log("checknao:"+data);
				//alert("chekno2");

				if (data.indexOf("confirm|") == 0) {
					// 有相同的卫生机构代码
					showConfirm(data.substring(8), function() {
						if(type == 'add'){
							CenterOrg.add();
						}else{
							CenterOrg.update();
						}
					});
				} else {
					// 无，确认继续
					if(type == 'add'){
						CenterOrg.add();
					}else{
						CenterOrg.update();
					}
				}
			},
			error : function() {
			}
		});
	};

	$.extend(CenterOrg,{

		//设定pop弹出框的大小
		preId: null,
		popArea: 720,
		focusId: "name",
		tableList:null,
		dataGrid:null,
		delBatUrl: _delBatUrl,
		existUrl: _existUrl,
		exist2Url: _exist2Url,
		updateUrl: _updateUrl,
		addUrl: _addUrl,
		delUrl: _delUrl,
		changeStatusUrl: _changeStatusUrl,
		InfoUrl: _InfoUrl,
		pageListUrl: _pageListUrl,

		/*callback function area*/

		//新增成功callback
		addSuccess: function(data) {
		 //console.log("successcallback");
			 //$("#editBtn").attr("disable", false);
			var orgTypeId = $("#orgTypeId").val();
			if (data.indexOf("confirm|") == 0) {
			 // 有同名
				 showConfirm(data.substring(8), function () {
					 if (orgTypeId == '40') {
						 // 检测卫生机构代码
						 _checkNacaoId(orgTypeId);

					 } else {
						 CenterOrg.add();
					 }
				 });
			 } else {
			 // 无同名，确认继续
				 if (orgTypeId == '40') {
					 // 检测卫生机构代码
					 _checkNacaoId(orgTypeId);

				 } else {
					 CenterOrg.add();
				 }
			 }

		 },
		//修改成功callback
		 editSuccess: function(data) {
		 //console.log("editcallback");
			 var orgTypeId = $("#orgTypeId").val();
			 //console.log(orgTypeId);
			 if (data.indexOf("confirm|") == 0) {
			 // 有同名
			 	showConfirm(data.substring(8), function () {
			 // 确认继续
					if (orgTypeId == '40') {
						// 检测卫生机构代码
						_checkNacaoId(orgTypeId);
					} else {

						CenterOrg.update();
					}
				});
			 } else {
			 // 无同名，确认继续
				 if (orgTypeId == '40') {
				 // 检测卫生机构代码
					 _checkNacaoId(orgTypeId);

				 } else {

					 CenterOrg.update();
				 }
			 }

		 },


		editCallBack: function() {

			var rowData = BasicModule.rowData;
			$("#InfoForm").form("load", {
			/* input's name attr : data */
				//regionName: rowData.regionName,
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
				//orgTypeId: params.orgTypeId,
				id:rowData.stringId,
				codeNo:rowData.codeNo,
				opType: 'edit'
			});
			$("#spanEditCodeNo").html(rowData.codeNo);
			//console.log(rowData.regionName);
			CenterOrg.addCallBack();
			$("#regionName").combotree('setValue',rowData.regionName);
			newcommonjs.oldName = rowData.name;


		},

		showCallBack: function() {

			var rowData = BasicModule.rowData;
			$("#InfoForm").form("load", {
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


		},

		/*callback function area end*/

		searchObj: function(preId) {

			return {
				searchStr: $.trim($("#" + preId + "SearchStr").val()),
				status: $("#" + preId + "Status").val(),
				sort: $("#" + preId + "Sort").val(),
				orgTypeId: $("#" + preId + "orgTypeId").val()
			};

		},

		addCallBack: function(){
			_initTree();
		},


	});


	return CenterOrg;


}(jQuery));

/*var MedInst;

MedInst = (function($){
			
    /!*url 定義*!/
    var delBatUrl= ctx + "/org/centerOrg/centerOrgDeleteBatch";
    var checkUrl= ctx + "/org/centerOrg/centerOrgIfExisted";
    var check2Url= ctx + "/org/centerOrg/checkNacaoIdExisted";
    var updateUrl=  ctx + "/org/centerOrg/centerOrgEdit";
    var addUrl= ctx + "/org/centerOrg/centerOrgAdd";
    var delUrl= ctx + "/org/centerOrg/centerOrgDelete";
    var changeStatusUrl= ctx + "/org/centerOrg/centerOrgDisableOrEnable";
    var tubeInfoUrl= ctx + "/org/centerOrg/centerOrgInfo";
    //var orgTypeId= $("#medorgTypeId").val();
    var POST= "POST";
	
		var _init = function (params) {
		    

	    	newcommonjs.pageInit(params.preId);
	    	
	    	$(window).on('resize', function () {
	            newcommonjs.tableAuto(params.tableList);
	        });
	    	

	        
	    };
	    
	    
	    var _callback = function () {
	    	_initTree();	    	
	    };
	    
	      /!* 新增 *!/
	    var _add= function () {
	    	    //console.log(this);
	        	currentEvent = "add";
	        	var data = {id:'', opType: 'add', orgTypeId: this.params.orgTypeId};
	        	var url = tubeInfoUrl; 
	        	
	            newcommonjs.newshowDictCodeEditDialog(data,_callback,url,720, "name");
	    };
	    
	    /!* 批量删除 *!/
	    var _deleteBetch= function (){ 
	    	//console.log(dataGrid);
	        newcommonjs.deleteBatch(this.params.dataGrid,delBatUrl,POST);	   
	    };
    	    
	    /!*
	     * params 说明
	     * preId: 为每个页面id中的前辍字
	     * orgType: 为每个共用页面各别的orgType，对应后端资料库
	     *!/
	    var _searchBtn= function (){
	    	  /!* 关键词搜索 *!/
	        newcommonjs.newdataGridSearch(this.params.dataGrid, _searchObj(this));

	    };
	    
	    /!* *
	     * 取得所有搜尋欄資訊
	     * 返回obj 格式
	     * *!/
	    var _searchObj= function (obj) {
	    	var preId = obj.params.preId;
	    	return {
	            searchStr: $.trim($("#" + preId + "SearchStr").val()),
	            status: $("#" + preId + "Status").val(),
	            sort: $("#" + preId + "Sort").val(),
	            orgTypeId: obj.params.orgTypeId
	        };
	    };	    
	    
	    /!* 启用、停用状态 *!/
	    var _changeStatus= function (index, rowData) {
	        var url = changeStatusUrl;
	        newcommonjs.changeStatus(index, rowData, this.params.dataGrid, url,POST);
	    };
	    
	    /!* 删除行 *!/
	    var _deleteRow= function (index, rowData) {
	        var url = delUrl;
	        newcommonjs.deleteRow(rowData, url, this.params.dataGrid, "POST");
	    };
	    
	    /!* 编辑 *!/
	    var _editRow= function (rowData) {
	        var id = rowData.stringId;
	        if (rowData.status == true) {
	            showMessage('当前选中记录已启用，不允许修改！');
	            return;
	        }
	        var url = tubeInfoUrl;
	        var data = {id:rowData.stringId, opType: 'edit', orgTypeId: this.params.orgTypeId};
	        
	        var callback = function () {
	        	
	            $("#InfoForm").form("load", {
	                /!* input's name attr : data *!/
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
	                //orgTypeId: params.orgTypeId,
	                id:rowData.stringId,
	                codeNo:rowData.codeNo,
	                opType: 'edit'              
	           });
	            
	            $("#spanEditCodeNo").html(rowData.codeNo);
	            newcommonjs.oldName = rowData.name;
	            _callback();
	            
	        };
	               
	        newcommonjs.newshowDictCodeEditDialog(data,callback, url, 720, "name");
	       
	    };
	    
	    /!* 弹出详情信息框 *!/
	    var _showDialog= function (rowData) {
	    	
	        var url = tubeInfoUrl;
	        var data = {id:rowData.stringId, opType: 'view', orgTypeId: this.params.orgTypeId};
	        //console.log(data);
	        
	        var callback = function () {
	        	
	            $("#InfoForm").form("load", {
	                /!* input's name attr : data *!/
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
	    
	    /!* 判断新增还是修改 *!/
	    var _editDictCode= function (opType) {
	        var existUrl = checkUrl;
	        var dataGrid = this.params.dataGrid;
	        var orgTypeId = this.params.orgTypeId;
	        reloadData = _searchObj(this);
	        var useObj = this;
	        //var dataGrid = dataGrid;
	        //var data1 = $("#InfoForm").serialize();
	        var data = $("#InfoForm").serialize();
	        //console.log("data:"+data);
	       
	        var successF = function(data) {
	        	//alert(orgTypeId);
	        	var opType = $("#opType").val();
	        	//alert(opType);
				if (data.indexOf("confirm|") == 0) {
					// 有同名
					showConfirm(data.substring(8), function() {
						// 确认继续
					if(opType == 'add'){
						if (orgTypeId == '40') {
							// 检测卫生机构代码
						    	checkNacaoId(useObj);

						} else {
							newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
						}
					}else{
						if (orgTypeId == '40') {
							// 检测卫生机构代码
							
						    	checkNacaoId(useObj);

						} else {
							
							newcommonjs.update(updateUrl,'POST',dataGrid);
						}
					}
						
					});
				} else {
					// 无同名，确认继续
					if(opType == 'add'){
						if (orgTypeId == '40') {
							// 检测卫生机构代码
						    	checkNacaoId(useObj);

						} else {
							newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
						}
					}else{
						if (orgTypeId == '40') {
							// 检测卫生机构代码
						    	checkNacaoId(useObj);

						} else {
							//console.log("update2:"+updateUrl);
							//console.log("dataGrid"+dataGrid);
							newcommonjs.update(updateUrl,'POST',dataGrid);
						}
					}

				}
			};
			
			var v = validateSave(this);
	        if (opType == "add") {
	            newcommonjs.newaddDictCode(existUrl, addUrl, "POST", dataGrid, data, successF,v);
	        } else if (opType == "edit") {
	            newcommonjs.newupdateDictCode(existUrl, updateUrl, "POST", dataGrid, data, successF,v);
	        }
	    };
	    
	   
	    var _initTree= function(){
	    	
	    	var obj = EasyTree.getInit();
	    	var click = {
	    			
	    		onClick:function(node){
	    			$("#regionId").val(node.id);
	    			$("#regionName").val(node.text);
	    			$("#showRegionDiv").hide();
	    			return;
	    		}
	    	
	    	};
	    	$.extend(obj,click);	//自定义click方法
	    	$("#regionName").combotree(obj);
	    
	    };
	    
	    var checkNacaoId= function(obj) {
	    	//console.log(obj);
	    	var nacaoId = $("#nacaoId").val().trim();
	    	var orgTypeId = $("#orgTypeId").val();
	    	var type = $("#opType").val();
	    	var dataGrid = obj.params.dataGrid;

	    	/!*console.log("checkNaco:"+nacaoId);
			console.log("url:"+check2Url);
			console.log(orgTypeId);
			console.log(type);*!/
	    	$.ajax({
	    		url : check2Url,
	    		type : "POST",
	    		data : {
	    			orgTypeId : orgTypeId,
	    			nacaoId : nacaoId
	    		},
	    		success : function(data) {
	    			 //resolutionData(data);
	    			 console.log("checknao:"+data);
	    			//alert("chekno2");
	    	
	    			if (data.indexOf("confirm|") == 0) {
	    				// 有相同的卫生机构代码
	    				showConfirm(data.substring(8), function() {
	    					if(type == 'add'){
	    					
	    						newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
	    					}else{
	    						
	    						newcommonjs.update(updateUrl,'POST',dataGrid);
	    					}
	    				});
	    			} else {
	    				// 无，确认继续
	    				if(type == 'add'){
	    					
	    					newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
	    				}else{
	    					
	    					newcommonjs.update(updateUrl,'POST',dataGrid);
	    				}		
	    			}
	    		},
	    		error : function() {
	    		}
	    	});
	    };
	    
	    var validateSave= function(obj) {
	    	var regionName = $("#regionName").val();
	    	var name = $("#name").val();
	    	//var orgTypeId = $("#orgTypeId").val();
	    	if (regionName == '') {
	    		showMessage('所属地区为空，请重新输入！', function() {
	    			$("#regionId").focus();
	    		});
	    		return false;
	    	}
	    	if (name == '') {
	    		showMessage('中文名称为空，请重新输入！', function() {
	    			$("#name").focus();
	    		});
	    		return false;
	    	}
	    	var displayOrderId = "displayOrder";
	    	if(validateDisplayOrder(displayOrderId)){
	    		return false; 
	    	}
	    	if (obj.orgTypeId == '41') {
	    		var webUrl = $("#webUrl").val();
	    		var telephone = $("#telephone").val();
	    		if (webUrl == '') {
	    			showMessage('网站名称为空，请重新输入！', function() {
	    				$("#webUrl").focus();
	    			});
	    			return false;
	    		}
	    		if (telephone == '') {
	    			showMessage('联系电话为空，请重新输入！', function() {
	    				$("#telephone").focus();
	    			});
	    			return false;
	    		}
	    	}
	    	return true;
	    };


	
	//===============以下为公共方法================//
	return {
		init:_init,
		initTree: _initTree,
		editDictCode:_editDictCode,
		editRow :_editRow,
		deleteRow: _deleteRow,
		changeStatus:_changeStatus,
		showDialog:_showDialog,
		searchBtn:_searchBtn,
		searchObj:_searchObj,
		deleteBetch:_deleteBetch,
		add:_add
	};
}(jQuery));*/



//
///***
// *@ClassName: centerOrg.js
// * @Description: TODO(中心机构单位-JS)
// * @date 2015年01月15日 
// ***/
//var MedInst;
//
//MedInst = (function($){
//			
//    /*url 定義*/
//    var delBatUrl= ctx + "/org/centerOrg/centerOrgDeleteBatch";
//    var checkUrl= ctx + "/org/centerOrg/centerOrgIfExisted";
//    var check2Url= ctx + "/org/centerOrg/checkNacaoIdExisted";
//    var updateUrl=  ctx + "/org/centerOrg/centerOrgEdit"; 
//    var addUrl= ctx + "/org/centerOrg/centerOrgAdd"; 
//    var delUrl= ctx + "/org/centerOrg/centerOrgDelete";
//    var changeStatusUrl= ctx + "/org/centerOrg/centerOrgDisableOrEnable";
//    var tubeInfoUrl= ctx + "/org/centerOrg/centerOrgInfo";
//    //var orgTypeId= $("#medorgTypeId").val();
//    var POST= "POST";
//    
//	var reloadData = {
//	        searchStr: '',
//	        status:'',
//	        sort: '',
//	        orgTypeId: 40	
//    };
//	
//	var _init = function (params) {
//		    
//
//	    	newcommonjs.pageInit(params.preId);
//	    	
//	    	$(window).on('resize', function () {
//	            newcommonjs.tableAuto(params.tableList);
//	        });
//
//	        
//	    };
//	    
//	      /* 新增 */
//	    var _add= function (orgTypeId) {
//	    	    console.log(this);
//	        	currentEvent = "add";
//	        	var data = {id:'', opType: 'add', orgTypeId: orgTypeId};
//	        	var url = tubeInfoUrl; 
//	        	
//	            newcommonjs.newshowDictCodeEditDialog(data,_initTree,url,720);
//	    };
//	    
//	    /* 批量删除 */	 
//	    var _deleteBetch= function (dataGrid){ 
//	    	//console.log(dataGrid);
//	        newcommonjs.deleteBatch(dataGrid,delBatUrl,POST);	   
//	    };
//    	    
//	    /*
//	     * params 说明
//	     * preId: 为每个页面id中的前辍字
//	     * orgType: 为每个共用页面各别的orgType，对应后端资料库
//	     */
//	    var _searchBtn= function (params){
//	    	  /* 关键词搜索 */
//	    	//console.log(params);
//	    	//console.log(searchObj(params));	    
//	        newcommonjs.newdataGridSearch(params.dataGrid, _searchObj(params));
//
//	    };
//	    
//	    /* *
//	     * 取得所有搜尋欄資訊
//	     * 返回obj 格式
//	     * */
//	    var _searchObj= function (params) {
//	        return {
//	            searchStr: $.trim($("#" + params.preId + "SearchStr").val()),
//	            status: $("#" + params.preId + "Status").val(),
//	            sort: $("#" + params.preId + "Sort").val(),
//	            orgTypeId: params.orgTypeId
//	        };
//	    };	    
//	    
//	    /* 启用、停用状态 */
//	    var _changeStatus= function (index, rowData, params) {
//	        var url = changeStatusUrl;
//	        newcommonjs.changeStatus(index, rowData, params.dataGrid, url,POST);
//	    };
//	    
//	    /* 删除行 */
//	    var _deleteRow= function (index, rowData, params) {
//	        var url = delUrl;
//	        //var dataGrid = dataGrid;
//	        newcommonjs.deleteRow(rowData, url, params.dataGrid, "POST");
//	    };
//	    
//	    /* 编辑 */
//	    var _editRow= function (rowData,params) {
//	        var id = rowData.stringId;
//	        if (rowData.status == true) {
//	            showMessage('当前选中记录已启用，不允许修改！');
//	            return;
//	        }
//	        var url = tubeInfoUrl;
//	        var data = {id:rowData.stringId, opType: 'edit', orgTypeId: params.orgTypeId};
//	        
//	        var callback = function () {
//	        	
//	            $("#InfoForm").form("load", {
//	                /* input's name attr : data */
//	            	regionName: rowData.regionName,
//	            	regionId: rowData.regionSId,
//	                name: rowData.name,
//	                shortName: rowData.shortName,
//	                nacaoId: rowData.nacaoId,
//	                enShortName: rowData.enShortName,
//	                enName: rowData.enName,
//	                address: rowData.address,
//	                enAddress: rowData.enAddress,
//	                contacts: rowData.contacts,
//	                telephone: rowData.telephone,
//	                fax: rowData.fax,
//	                fastCode: rowData.fastCode,
//	                displayOrder: rowData.displayOrder,
//	                memo: rowData.memo,
//	                //orgTypeId: params.orgTypeId,
//	                id:rowData.stringId,
//	                codeNo:rowData.codeNo,
//	                opType: 'edit'              
//	            });
//	            $("#spanEditCodeNo").html(rowData.codeNo);
//	            newcommonjs.oldName = rowData.name;
//	            _initTree();
//	        };
//	               
//	        newcommonjs.newshowDictCodeEditDialog(data,callback, url, 720);
//	       
//	    };
//	    
//	    /* 弹出详情信息框 */
//	    var _showDialog= function (rowData,params) {
//	    	
//	        var url = tubeInfoUrl;
//	        var data = {id:rowData.stringId, opType: 'view', orgTypeId: params.orgTypeId};
//	        //console.log(data);
//	        
//	        var callback = function () {
//	        	
//	            $("#InfoForm").form("load", {
//	                /* input's name attr : data */
//	            	regionName: rowData.regionName,
//	                name: rowData.name,
//	                shortName: rowData.shortName,
//	                nacaoId: rowData.nacaoId,
//	                enShortName: rowData.enShortName,
//	                enName: rowData.enName,
//	                address: rowData.address,
//	                enAddress: rowData.enAddress,
//	                contacts: rowData.contacts,
//	                telephone: rowData.telephone,
//	                fax: rowData.fax,
//	                fastCode: rowData.fastCode,
//	                displayOrder: rowData.displayOrder,
//	                memo: rowData.memo
//	            });
//	            $("form input").attr("readonly","readonly");
//	            $("form textarea").attr("readonly","readonly");
//	            $("#editBtn").hide();
//	            $("#spanEditCodeNo").html(rowData.codeNo);
//	        };
//	   
//	        
//	        newcommonjs.newshowDictCodeEditDialog(data,callback, url, 720);
//	    };
//	    
//	    /* 判断新增还是修改 */
//	    var _editDictCode= function (opType,params) {
//	        var existUrl = checkUrl;
//	        var dataGrid = params.dataGrid;
//	        var orgTypeId = params.orgTypeId;
//	        //var dataGrid = dataGrid;
//	        //var data1 = $("#InfoForm").serialize();
//	        var data = $("#InfoForm").serialize();
//	        //console.log("data:"+data);
//	       
//	        var successF = function(data) {
//	        	//alert(orgTypeId);
//	        	var opType = $("#opType").val();
//	        	//alert(opType);
//				if (data.indexOf("confirm|") == 0) {
//					// 有同名
//					showConfirm(data.substring(8), function() {
//						// 确认继续
//					if(opType == 'add'){
//						if (orgTypeId == '40') {
//							// 检测卫生机构代码
//						    	checkNacaoId(params);
//
//						} else {
//							newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
//						}
//					}else{
//						if (orgTypeId == '40') {
//							// 检测卫生机构代码
//							
//						    	checkNacaoId(params);
//
//						} else {
//							
//							newcommonjs.update(updateUrl,'POST',dataGrid);
//						}
//					}
//						
//					});
//				} else {
//					// 无同名，确认继续
//					if(opType == 'add'){
//						if (orgTypeId == '40') {
//							// 检测卫生机构代码
//						    	checkNacaoId(params);
//
//						} else {
//							newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
//						}
//					}else{
//						if (orgTypeId == '40') {
//							// 检测卫生机构代码
//						    	checkNacaoId(params);
//
//						} else {
//							console.log("update2:"+updateUrl);
//							console.log("dataGrid"+dataGrid);
//							newcommonjs.update(updateUrl,'POST',dataGrid);
//						}
//					}
//
//				}
//			};
//			
//			var v = validateSave();
//	        if (opType == "add") {
//	            newcommonjs.newaddDictCode(existUrl, addUrl, "POST", dataGrid, data, successF,v);
//	        } else if (opType == "edit") {
//	            newcommonjs.newupdateDictCode(existUrl, updateUrl, "POST", dataGrid, data, successF,v);
//	        }
//	    };
//	    
//	   
//	    var _initTree= function(){
//	    	
//	    	//EasyTree.setObj($("#medtt"));
//	    	
//	    	var obj = EasyTree.getInit();
//	    	var click = {
//	    			
//	    		onClick:function(node){
//	    			$("#regionId").val(node.id);
//	    			$("#regionName").val(node.text);
//	    			$("#showRegionDiv").hide();
//	    			return;
//	    		}
//	    	
//	    	};
//	    	$.extend(obj,click);	//自定义click方法
//	    	$("#regionName").combotree(obj);
//	    
//	    };
//	    
//	    var checkNacaoId= function(params) {
//	    	var nacaoId = $("#nacaoId").val().trim();
//	    	var orgTypeId = $("#orgTypeId").val();
//	    	var type = $("#opType").val();
//	    	var dataGrid = params.dataGrid;
//
//	    	/*console.log("checkNaco:"+nacaoId);
//			console.log("url:"+check2Url);
//			console.log(orgTypeId);
//			console.log(type);*/
//	    	$.ajax({
//	    		url : check2Url,
//	    		type : "POST",
//	    		data : {
//	    			orgTypeId : orgTypeId,
//	    			nacaoId : nacaoId
//	    		},
//	    		success : function(data) {
//	    			// resolutionData(data);
//	    			//alert("chekno2");
//	    	
//	    			if (data.indexOf("confirm|") == 0) {
//	    				// 有相同的卫生机构代码
//	    				showConfirm(data.substring(8), function() {
//	    					if(type == 'add'){
//	    					
//	    						newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
//	    					}else{
//	    						
//	    						newcommonjs.update(updateUrl,'POST',dataGrid);
//	    					}
//	    				});
//	    			} else {
//	    				// 无，确认继续
//	    				if(type == 'add'){
//	    					
//	    					newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
//	    				}else{
//	    					
//	    					newcommonjs.update(updateUrl,'POST',dataGrid);
//	    				}		
//	    			}
//	    		},
//	    		error : function() {
//	    		}
//	    	});
//	    };
//	    
//	    var validateSave= function() {
//	    	var regionName = $("#regionName").val();
//	    	var name = $("#name").val();
//	    	//var orgTypeId = $("#orgTypeId").val();
//	    	if (regionName == '') {
//	    		showMessage('所属地区为空，请重新输入！', function() {
//	    			$("#regionId").focus();
//	    		});
//	    		return false;
//	    	}
//	    	if (name == '') {
//	    		showMessage('中文名称为空，请重新输入！', function() {
//	    			$("#name").focus();
//	    		});
//	    		return false;
//	    	}
//	    	var displayOrderId = "displayOrder";
//	    	if(validateDisplayOrder(displayOrderId)){
//	    		return false; 
//	    	}
//	    	if (orgTypeId == '41') {
//	    		var webUrl = $("#webUrl").val();
//	    		var telephone = $("#telephone").val();
//	    		if (webUrl == '') {
//	    			showMessage('网站名称为空，请重新输入！', function() {
//	    				$("#webUrl").focus();
//	    			});
//	    			return false;
//	    		}
//	    		if (telephone == '') {
//	    			showMessage('联系电话为空，请重新输入！', function() {
//	    				$("#telephone").focus();
//	    			});
//	    			return false;
//	    		}
//	    	}
//	    	return true;
//	    };
//	    
//	    
//
//	
//	//===============以下为公共方法================//
//	return {
//		init:_init,
//		initTree: _initTree,
//		editDictCode:_editDictCode,
//		editRow :_editRow,
//		deleteRow: _deleteRow,
//		changeStatus:_changeStatus,
//		showDialog:_showDialog,
//		searchBtn:_searchBtn,
//		searchObj:_searchObj,
//		deleteBetch:_deleteBetch,
//		add:_add
//	};
//}(jQuery));
//
//

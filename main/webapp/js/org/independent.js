
/***
 *@ClassName: independent.js
 * @Description: TODO(中心机构单位-JS)
 * @date 2016年01月19日 
 ***/
var Indenpent = (function($){

	/* START render basicModule */
	Indenpent = Object.create(CenterOrg);
	/* END render basicModule */

	var
		_preId = CB.PREID.IDL,
		_module = "Indenpent",
		_tableList =  $("#" + _preId + "List"),
		_orgTypeId = $("#" + _preId + "orgTypeId").val(),
		_exParams = {orgTypeId: _orgTypeId},
		_hideCols = [],	//要穩藏的欄位
		_data = Indenpent.searchObj(_preId),
		_pageListUrl = Indenpent.pageListUrl,

	/* 参数说明:
	 * url:pagelisturl
	 * data:初始时后台所有接收的参数，是一个物件
	 * module:目前的这个模组名，会对晕到gridColumus.js需要注意
	 * hideCols:想稳藏的栏位，是一个array
	 * tableList:dataGird的对象
	 * preId:前辍
	 */
		_dgParams = {
			url:_pageListUrl,
			data:_data,
			module:_module,
			hideCols:_hideCols,
			tableList:_tableList,
			preId:_preId
		},

		_gridObj = dataGridM.init(_dgParams),
		_dataGrid = _tableList.datagrid(_gridObj);


	$.extend(Indenpent,{
		preId: _preId,
		module:_module,
		tableList: _tableList,
		dataGrid: _dataGrid,
		addParams: Indenpent.getAddParams(_exParams),
		exParams:_exParams,
		orgTypeId:_orgTypeId
	})

	///* 状态搜索 */
	//$("." + _preId + "-status-selector li").on("click", function () {
	//	$("#" + _preId + "StatusSpan").html($(this).html());
	//	$("." + _preId + "-status-selector li.selected").removeClass("selected");
	//	var flg = $(this).is('.selected');
	//	$(this).addClass(function () {
	//		return flg ? '' : 'selected';
	//	})
    //
	//	var statusVal = $(this).attr("el-value");
	//	$("#" + _preId + "Status").val(statusVal);
    //
	//	Indenpent.searchGrid();
	//});
    //
	///* 排序 */
	//$("." + _preId + "-sort-selector li").on("click", function () {
	//	$("#" + _preId + "SortSpan").html($(this).html());
	//	$("." + _preId + "-sort-selector li.selected").removeClass("selected");
	//	var flg = $(this).is('.selected');
	//	$(this).addClass(function () {
	//		return flg ? '' : 'selected';
	//	})
    //
	//	var sortVal = $(this).attr("el-value");
	//	$("#" + _preId + "Sort").val(sortVal);
    //
	//	Indenpent.searchGrid();
	//});
    //
	///* search Btn */
	//$("#" + _preId + "SearchBtn").on("click",function() {
	//	Indenpent.searchGrid();
	//});

	/*Start add 相关参数设定  */
	//$("#" + _preId + "Add").on("click",function() {
	//	Indenpent.addPop();
	//});
    //
	//// deleteBatch
	//$("#" + _preId + "DeleteBatch").on("click",function() {
	//	Indenpent.deleteBetch();
	//});

	return Indenpent;


}(jQuery));

$(function(){
	Indenpent.init();
});
/*var Indenpent;

Indenpent = (function($){
		
	
    /!*url 定義*!/
	var preId= "idl";
    var delBatUrl= ctx + "/org/centerOrg/centerOrgDeleteBatch";
    var checkUrl= ctx + "/org/centerOrg/centerOrgIfExisted";
    var check2Url= ctx + "/org/centerOrg/checkNacaoIdExisted";
    var updateUrl=  ctx + "/org/centerOrg/centerOrgEdit"; 
    var addUrl= ctx + "/org/centerOrg/centerOrgAdd"; 
    var delUrl= ctx + "/org/centerOrg/centerOrgDelete";
    var changeStatusUrl= ctx + "/org/centerOrg/centerOrgDisableOrEnable";
    var tubeInfoUrl= ctx + "/org/centerOrg/centerOrgInfo";
    var pageListUrl= ctx + "/org/centerOrg/centerOrgPageList";
    var orgTypeId= $("#idlorgTypeId").val();
    var dataGrid="";
    
	var reloadData = {
	        searchStr: '',
	        status:'',
	        sort: '',
	        orgTypeId: 41	
    };
	
	var _init = function () {
	    	
			//preId = pre;
			tableList = $("#" + preId + "TypeList");
	    	
	    	newcommonjs.pageInit(preId);

	    	
	        //dataGrid render Start
	        var url = pageListUrl;
	        var POST = "POST";
	        var GET = "GET";
	        //var typeKey = orgTypeId;
	        var params = {orgTypeId:orgTypeId};  //如有需要在編寫如上方格式。
	        var coloumns=new Array()
	        //coloumns[0]="whonetCode";	//要穩藏的欄位
	        
	        var gridObj = createDataGrid(url, params,POST, tableList,coloumns);
	        gridObj.view =    
	            $.extend({}, $.fn.datagrid.defaults.view, {
	                onAfterRender: function () {
	                    // 操作成功后刷新dataGrid
	                    switch (Indenpent.currentEvent) {
	                        case "add":
	                            newcommonjs.setSearchConditions(preId, "", 2, 2);
	                            Indenpent.currentEvent = undefined;
	                            break;
	                    }
	                }
	            });

	        
	        //!* render DataGrid *!/
	        dataGrid = tableList.datagrid(gridObj);
	        //dataGrid render End

	        /!* 关键词搜索 *!/
	        $("#" + preId + "SearchBtn").click(function () {
	        	newcommonjs.newdataGridSearch(dataGrid, searchObj());
	        });
	       
	        /!* 状态搜索 *!/
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

	        /!* 排序 *!/
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

	        /!* 批量删除 *!/
	        $("#" + preId + "DeleteTypeBatch").click(function () {
	            newcommonjs.deleteBatch(dataGrid,delBatUrl,POST);
	        });

	        /!* 新增 *!/
	        $("#" + preId + "AddType").click(function () {
	        	currentEvent = "add";
	        	var data = {id:'', opType: 'add', orgTypeId: orgTypeId};
	        	var url = tubeInfoUrl; 
	        	
	            newcommonjs.newshowDictCodeEditDialog(data, _initTree,url,720);
	        });

	        $(window).on('resize', function () {
	            newcommonjs.tableAuto(tableList);
	        });
	    };
	    
	    
//	    var _getDataGrid = function(){
//	    	return dataGrid;
//	    };
//	    	    
//	    /!*
//	     * params 说明
//	     * preId: 为每个页面id中的前辍字
//	     * orgType: 为每个共用页面各别的orgType，对应后端资料库
//	     *!/
//	    var _searchBtn= function(dataGrid,preId,orgType){
//	    	  /!* 关键词搜索 *!/
//	        $("#" + preId + "SearchBtn").click(function () {
//	        	newcommonjs.newdataGridSearch(dataGrid, searchObj(preId,orgType));
//	        });
//	        
//	    };
//	    
	    /!* *
	     * 取得所有搜尋欄資訊
	     * 返回obj 格式
	     * *!/
	    var searchObj= function () {
	        return {
	            searchStr: $.trim($("#" + preId + "SearchStr").val()),
	            status: $("#" + preId + "Status").val(),
	            sort: $("#" + preId + "Sort").val(),
	            orgTypeId: orgTypeId
	        };
	    };
	    
	    /!* 创建dataGrid  
	     * url:为pageList
	     * typekey:可有可无
	     * params:可有可无
	     * method: POST OR GET
	     * tableList: main.jsp 中的 呈现dataGrid 的　div
	     * hideColumns:是一个阵列，用来存要稳藏的栏位。
	     * *!/
	    var createDataGrid= function (url, params, method, tableList, hideColumns) {
	    	//alert("createD");
	    	//alert(url);
	    	var gridObj = newcommonjs.createGridObj(url, method, params);
	        gridObj.columns = ColCollect.getColumns("Indenpent");        
	        gridObj.onLoadSuccess = function () {
	            newcommonjs.tableAuto(tableList);
	            if (hideColumns) {
	                $.each(hideColumns, function (k, v) {
	                    dataGrid.datagrid('hideColumn', v);
	                })
	            }
	        };
	        return gridObj;
	    };
	    
	    /!* 启用、停用状态 *!/
	    var _changeStatus= function (index, rowData) {
	        var url = changeStatusUrl;
	        newcommonjs.changeStatus(index, rowData, dataGrid, url, "POST");
	    };
	    
	    /!* 删除行 *!/
	    var _deleteRow= function (index, rowData) {
	        var url = delUrl;
	        //var dataGrid = dataGrid;
	        newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
	    };
	    
	    /!* 编辑 *!/
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
	    
	    /!* 弹出详情信息框 *!/
	    var _showDialog= function (rowData) {
	    	
	        var url = tubeInfoUrl;
	        var data = {id:rowData.stringId, opType: 'view', orgTypeId: orgTypeId};
	        
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
	    var _editDictCode= function (opType, typeKey) {
	        var existUrl = checkUrl;

	        var data = $("#infoForm").serialize();
	       
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
						    	checkNacaoId('add');

						} else {
							newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
						}
					}else{
						if (orgTypeId == '40') {
							// 检测卫生机构代码
						    	checkNacaoId();

						} else {
							alert("samename");
							newcommonjs.update(updateUrl,'POST',dataGrid);
						}
					}
						
					});
				} else {
					// 无同名，确认继续
					if(opType == 'add'){
						if (orgTypeId == '40') {
							// 检测卫生机构代码
						    	checkNacaoId('add');

						} else {
							newcommonjs.newadd(addUrl,'POST',dataGrid,reloadData);
						}
					}else{
						if (orgTypeId == '40') {
							// 检测卫生机构代码
						    	checkNacaoId();

						} else {

							newcommonjs.update(updateUrl,'POST',dataGrid);
						}
					}

				}
			};
			var v = validateSave();
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
	    	//EasyTree.init(obj);
	    	$("#regionName").combotree(obj);
	   
	    };
	    
	    var checkNacaoId= function(type) {
	    	var nacaoId = $("#nacaoId").val().trim();
	    	//var orgTypeId = $("#orgTypeId").val();
	    	//alert("chekno");
	    	$.ajax({
	    		url : this.check2Url,
	    		type : "GET",
	    		data : {
	    			orgTypeId : orgTypeId,
	    			nacaoId : nacaoId
	    		},
	    		success : function(data) {
	    			// resolutionData(data);
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
	    
	    var validateSave= function() {
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
	    	if (orgTypeId == '41') {
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
	    
	    var _setObj = function(obj){
	    	tableList = obj;
	    };
	    
	    var _setTypeId = function(id){
	    	orgTypeId = id;
	    };
	    
	    var _setPreID= function(id){
	    	preId = id;
	    }
	    
	    

	
	//===============以下为公共方法================//
	return {
		init:_init,
		setObj:_setObj,
		initTree: _initTree,
		editDictCode:_editDictCode,
		editRow :_editRow,
		deleteRow: _deleteRow,
		changeStatus:_changeStatus,
		showDialog:_showDialog,
		//setTypeId:_setTypeId,
		//setPreId:_setPreID,
		//searchBtn:_searchBtn,
		//getDataGrid: _getDataGrid
	};
}(jQuery));

$(function () {
	
	Inde = (function(old){
		var my = Object.create(old);
		my.init();
		return my;
	}(Indenpent));
   
});*/


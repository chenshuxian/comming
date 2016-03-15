/***
 *@ClassName: bacteriaDictionary.js
 * @Description: TODO(细菌字典-JS)
 * @author chenshuxian
 * @date 2016年03月01日
 ***/
var BacteriaDictionary = (function($){

    /* START render basicModule */
    BacteriaDictionary = Object.create(MG);
    /* END render basicModule */

    var
        _preId = CB.PREID.BD,
        _tableList =  $("#" + _preId + "List"),
        _itemTypeId = $("#" + _preId + "ItemTypeId").val(),
        _exParams = {itemTypeId: _itemTypeId},
        _hideCols = [],	//要穩藏的欄位
        _data = BacteriaDictionary.searchObj(_preId),
        _pageListUrl = BacteriaDictionary.pageListUrl,
        _module = "BacteriaDictionary",

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


    $.extend(BacteriaDictionary,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: BacteriaDictionary.getAddParams(_exParams),
        exParams:_exParams,
        itemTypeId:_itemTypeId
    })

    ///* 状态搜索 */
    //$("." + _preId + "-status-selector li").on("click", function () {
    //    $("#" + _preId + "StatusSpan").html($(this).html());
    //    $("." + _preId + "-status-selector li.selected").removeClass("selected");
    //    var flg = $(this).is('.selected');
    //    $(this).addClass(function () {
    //        return flg ? '' : 'selected';
    //    })
    //
    //    var statusVal = $(this).attr("el-value");
    //    $("#" + _preId + "Status").val(statusVal);
    //
    //    BacteriaDictionary.searchGrid();
    //});
    //
    ///* 排序 */
    //$("." + _preId + "-sort-selector li").on("click", function () {
    //    $("#" + _preId + "SortSpan").html($(this).html());
    //    $("." + _preId + "-sort-selector li.selected").removeClass("selected");
    //    var flg = $(this).is('.selected');
    //    $(this).addClass(function () {
    //        return flg ? '' : 'selected';
    //    })
    //
    //    var sortVal = $(this).attr("el-value");
    //    $("#" + _preId + "Sort").val(sortVal);
    //
    //    BacteriaDictionary.searchGrid();
    //});
    //
    ///* search Btn */
    //$("#" + _preId + "SearchBtn").on("click",function() {
    //    BacteriaDictionary.searchGrid();
    //});

    /*Start add 相关参数设定  */
    //$("#" + _preId + "Add").on("click",function() {
    //    BacteriaDictionary.addPop();
    //});
    //
    //// deleteBatch
    //$("#" + _preId + "DeleteBatch").on("click",function() {
    //    BacteriaDictionary.deleteBetch();
    //});

    return BacteriaDictionary;


}(jQuery));

$(function(){
    BacteriaDictionary.init();
});
//var BacteriaDictionary = {
//
//    preId: $("#bacteriaDictionaryPreId").val(),
//    /*url 定義*/
//    delBatUrl: ctx + "/pm/CentreMicrobeItem/batchDeleteCentreMicrobeitems",
//    checkUrl: ctx + "/pm/CentreMicrobeItem/checkIfCentreMicrobeitemNameExist",
//    check2Url: ctx + "/pm/CentreMicrobeItem/checkIfCentreMicrobeitemNameExist",
//    updateUrl: ctx + "/pm/CentreMicrobeItem/modifyCentreMicrobeitem",
//    addUrl: ctx + "/pm/CentreMicrobeItem/addCentreMicrobeitem",
//    delUrl: ctx + "/pm/CentreMicrobeItem/deleteCentreMicrobeitem",
//    changeStatusUrl: ctx + "/pm/CentreMicrobeItem/disableOrEnableCentreMicrobeitem",
//    tubeInfoUrl: ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemDetailById",
//    pageListUrl: ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemsPageList",
//    itemTypeId: $("#"+$("#bacteriaDictionaryPreId").val()+"ItemTypeId").val(),
//
//    reloadData: {
//        searchStr: '',
//        status: '',
//        sort: '',
//        itemTypeId: '1'
//    },
//
//    init: function () {
//        newcommonjs.pageInit(this.preId);
//        BacteriaDictionary.tableList = $("#" + BacteriaDictionary.preId + "TypeList");
//        var url = BacteriaDictionary.pageListUrl;
//        var POST = "POST";
//        var GET = "GET";
//        var typeKey = BacteriaDictionary.itemTypeId;
//        var params = {itemTypeId: BacteriaDictionary.itemTypeId};  //如有需要在編寫如上方格式。
//        var coloumns = new Array()
//        //coloumns[0]="whonetCode";	//要穩藏的欄位
//
//        var gridObj = BacteriaDictionary.createDataGrid(url, typeKey, params, POST, BacteriaDictionary.tableList, coloumns);
//        gridObj.view =
//            $.extend({}, $.fn.datagrid.defaults.view, {
//                onAfterRender: function () {
//                    // 操作成功后刷新dataGrid
//                    switch (BacteriaDictionary.currentEvent) {
//                        case "add":
//                            newcommonjs.setSearchConditions(BacteriaDictionary.preId, "", 2, 2);
//                            BacteriaDictionary.currentEvent = undefined;
//                            break;
//                    }
//                }
//            });
//
//
//        //* render DataGrid */
//        this.dataGrid = BacteriaDictionary.tableList.datagrid(gridObj);
//
//        /* 关键词搜索 */
//        $("#" + this.preId + "SearchBtn").click(function () {
//            newcommonjs.dataGridSearch(BacteriaDictionary.dataGrid, BacteriaDictionary.searchObj());
//        });
//
//        /* 状态搜索 */
//        $("." + this.preId + "-status-selector").on("click", "li", function () {
//            $("#" + BacteriaDictionary.preId + "StatusSpan").html($(this).html());
//            $("." + BacteriaDictionary.preId + "-status-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + BacteriaDictionary.preId + "Status").val(statusVal);
//
//            newcommonjs.dataGridSearch(BacteriaDictionary.dataGrid, BacteriaDictionary.searchObj());
//        });
//
//        /* 排序 */
//        $("." + this.preId + "-sort-selector").on("click", "li", function () {
//            $("#" + BacteriaDictionary.preId + "SortSpan").html($(this).html());
//            $("." + BacteriaDictionary.preId + "-sort-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var sortVal = $(this).attr("el-value");
//            $("#" + BacteriaDictionary.preId + "Sort").val(sortVal);
//
//            newcommonjs.dataGridSearch(BacteriaDictionary.dataGrid, BacteriaDictionary.searchObj());
//        });
//
//        /* 批量删除 */
//        $("#" + this.preId + "DeleteTypeBatch").click(function () {
//            newcommonjs.deleteBatch(BacteriaDictionary.dataGrid, BacteriaDictionary.delBatUrl, POST);
//        });
//
//        /* 新增 */
//        $("#" + this.preId + "AddType").click(function () {
//            BacteriaDictionary.currentEvent = "add";
//            var data = {id: '', opType: 'add', itemTypeId: BacteriaDictionary.itemTypeId};
//            var url = BacteriaDictionary.tubeInfoUrl;
//            newcommonjs.newshowDictCodeEditDialog(data, function () {
//                $("#editName").focus();
//            }, url, 480);
//        });
//
//        $(window).on('resize', function () {
//            newcommonjs.tableAuto(BacteriaDictionary.tableList);
//        });
//    },
//
//    /* *
//     * 取得所有搜尋欄資訊
//     * 返回obj 格式
//     * */
//    searchObj: function () {
//        return {
//            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
//            status: $("#" + this.preId + "Status").val(),
//            sort: $("#" + this.preId + "Sort").val(),
//            itemTypeId: BacteriaDictionary.itemTypeId
//        };
//    },
//
//    /* 创建dataGrid
//     * url:为pageList
//     * typekey:可有可无
//     * params:可有可无
//     * method: POST OR GET
//     * tableList: main.jsp 中的 呈现dataGrid 的　div
//     * hideColumns:是一个阵列，用来存要稳藏的栏位。
//     * */
//    createDataGrid: function (url, typeKey, params, method, tableList, hideColumns) {
//        var gridObj = newcommonjs.createGridObj(url, method, params);
//        gridObj.columns = ColCollect.getColumns("BacteriaDictionary");
//        gridObj.onLoadSuccess = function () {
//            newcommonjs.tableAuto(tableList);
//            if (hideColumns) {
//                $.each(hideColumns, function (k, v) {
//                    BacteriaDictionary.dataGrid.datagrid('hideColumn', v);
//                })
//            }
//        };
//        gridObj.onClickRow = function (index, row) {
//            newcommonjs.rowClickStyle(BacteriaDictionary.dataGrid, this);
//        }
//        return gridObj;
//    },
//
//    /* 启用、停用状态 */
//    changeStatus: function (index, rowData) {
//        var url = this.changeStatusUrl;
//        var dataGrid = this.dataGrid;
//        newcommonjs.changeStatus(index, rowData, dataGrid, url, "POST");
//    },
//
//    /* 删除行 */
//    deleteRow: function (index, rowData) {
//        var url = this.delUrl;
//        var dataGrid = this.dataGrid;
//        newcommonjs.deleteRow(rowData, url, dataGrid, "POST");
//    },
//
//    /* 编辑 */
//    editRow: function (rowData) {
//        var id = rowData.stringId;
//        if (rowData.status == true) {
//            showMessage('当前选中记录已启用，不允许修改！');
//            return;
//        }
//        var url = this.tubeInfoUrl;
//        var data = {id: rowData.stringId, opType: 'edit', itemTypeId: this.itemTypeId, id: rowData.stringId};
//
//        var callback = function () {
//
//            $("#InfoForm").form("load", {
//                /* input's name attr : data */
//                name: rowData.name,
//                enShortName: rowData.enShortName,
//                enName: rowData.enName,
//                whonetCode: rowData.whonetCode,
//                fastCode: rowData.fastCode,
//                displayOrder: rowData.displayOrder,
//                memo: rowData.memo,
//                id: rowData.stringId,
//                typeKey: rowData.typeKey,
//                opType: 'edit',
//                codeNo: rowData.codeNo
//            });
//            $("#spanEditCodeNo").html(rowData.codeNo);
//            newcommonjs.oldName = rowData.name;
//        };
//
//        newcommonjs.newshowDictCodeEditDialog(data, callback, url, 720);
//
//    },
//
//    /* 弹出详情信息框 */
//    showDialog: function (rowData) {
//        var url = this.tubeInfoUrl;
//        var data = {id: rowData.stringId, opType: 'view', itemTypeId: this.itemTypeId, id: rowData.stringId};
//        var callback = function () {
//
//            $("#InfoForm").form("load", {
//                /* input's name attr : data */
//                name: rowData.name,
//                enShortName: rowData.enShortName,
//                enName: rowData.enName,
//                whonetCode: rowData.whonetCode,
//                fastCode: rowData.fastCode,
//                displayOrder: rowData.displayOrder,
//                memo: rowData.memo
//            });
//            $("form input").attr("readonly", "readonly");
//            $("form textarea").attr("readonly", "readonly");
//            $("#editBtn").hide();
//            $("#spanEditCodeNo").html(rowData.codeNo);
//        };
//
//        newcommonjs.newshowDictCodeEditDialog(data, callback, url, 480);
//    },
//
//    /* 判断新增还是修改 */
//    editDictCode: function (opType, typeKey) {
//        var existUrl = BacteriaDictionary.checkUrl;
//        var dataGrid = BacteriaDictionary.dataGrid;
//        var data = $("#infoForm").serialize();
//        var existData = {
//            id: $("#editId").val(),
//            itemTypeId: this.itemTypeId,
//            name: $("#editName").val()
//        };
//
//        var successF = function (data) {
//            //alert(MedInst.orgTypeId);
//            var opType = $("#editOpType").val();
//            //alert(opType);
//            if (data.indexOf("confirm|") == 0) {
//                // 有同名
//                showConfirm(data.substring(8), function () {
//
//                    // 确认继续
//                    if (opType == 'add') {
//                        if (BacteriaDictionary.itemTypeId == '1') {
//                            // 检测卫生机构代码
//                            BacteriaDictionary.checkNacaoId('add');
//
//                        } else {
//                            newcommonjs.newadd(BacteriaDictionary.addUrl, 'POST', BacteriaDictionary.dataGrid, BacteriaDictionary.reloadData);
//                        }
//                    } else {
//                        if (BacteriaDictionary.itemTypeId == '1') {
//                            // 检测卫生机构代码
//                            BacteriaDictionary.checkNacaoId();
//
//                        } else {
//                            newcommonjs.update(BacteriaDictionary.updateUrl, 'POST', BacteriaDictionary.dataGrid);
//                        }
//                    }
//
//                });
//            } else {
//                // 无同名，确认继续
//                if (opType == 'add') {
//                    //if (BacteriaDictionary.itemTypeId == '1') {
//                    //	// 检测卫生机构代码
//                    //	BacteriaDictionary.checkNacaoId('add');
//                    //
//                    //} else {
//                    BacteriaDictionary.reloadData.sort = 2;
//                    newcommonjs.newadd(BacteriaDictionary.addUrl, 'POST', BacteriaDictionary.dataGrid, BacteriaDictionary.reloadData);
//                    //}
//                } else {
//                    if (BacteriaDictionary.itemTypeId == '1') {
//                        // 检测卫生机构代码
//                        BacteriaDictionary.checkNacaoId();
//
//                    } else {
//                        newcommonjs.update(BacteriaDictionary.updateUrl, 'POST', BacteriaDictionary.dataGrid);
//                    }
//                }
////				if (MedInst.orgTypeId == '40') {
////					 if(opType == 'add')
////						 MedInst.checkNacaoId('add');
////					 else
////						 MedInst.checkNacaoId();
////				} else {
////					newcommonjs.newadd(addUrl,'POST',MedInst.dataGrid,MedInst.reloadData);
////				}
//            }
//        };
//        var v = this.validateSave();
//        if (opType == "add") {
//            newcommonjs.newaddDictCode(existUrl, BacteriaDictionary.addUrl, "POST", BacteriaDictionary.dataGrid, existData, successF, v);
//        } else if (opType == "edit") {
//            newcommonjs.newupdateDictCode(existUrl, BacteriaDictionary.updateUrl, "POST", BacteriaDictionary.dataGrid, existData, successF, v);
//        }
//    },
//
//    checkNacaoId: function (type) {
//        var itemTypeId = this.itemTypeId
//        $.ajax({
//            url: this.check2Url,
//            type: "POST",
//            data: {
//                itemTypeId: itemTypeId
//            },
//            success: function (data) {
//                // resolutionData(data);
//
//                if (data.indexOf("confirm|") == 0) {
//                    showConfirm(data.substring(8), function () {
//                        if (type == 'add') {
//                            newcommonjs.newadd(BacteriaDictionary.addUrl, 'POST', BacteriaDictionary.dataGrid, BacteriaDictionary.reloadData);
//                        } else {
//                            newcommonjs.update(BacteriaDictionary.updateUrl, 'POST', BacteriaDictionary.dataGrid);
//                        }
//                    });
//                } else {
//                    // 无，确认继续
//                    if (type == 'add') {
//                        newcommonjs.newadd(BacteriaDictionary.addUrl, 'POST', BacteriaDictionary.dataGrid, BacteriaDictionary.reloadData);
//                    } else {
//                        newcommonjs.update(BacteriaDictionary.updateUrl, 'POST', BacteriaDictionary.dataGrid);
//                    }
//                }
//            },
//            error: function () {
//            }
//        });
//    },
//
//    validateSave: function () {
//        var name = $.trim($("#editName").val());
//        var displayOrderId = "editDisplayOrder";
//        if (name == '') {
//            showMessage('中文名称为空，请重新输入！');
//            $("#editName").focus();
//            return false;
//        }
//        if (validateDisplayOrder(displayOrderId)) {
//            return false;
//        }
//        return true;
//    }
//
//
//};
//
//$(function () {
//    BacteriaDictionary.init();
//});

///**
//* @ClassName: CtrDictCodes.js
//* @Description: TODO(基础字典-JS)
//* @author zengxiaowang
//* @date 2015年11月25日 下午4:52:56
//*
// */
//// 控制重复提交
//var canStore = true;
//var g_status = 1; //状态是否是可用   0-停用    1-启用
//// 关闭窗口
//function closeWin() {
//	$(".oy").remove();
//	$(".xinxi").hide();
//}
//// 查询List
//function pageQuery(type) {
//	var pageNo = $("#pageNo").val();
//	var pageSize = $("#pageSize").val();
//	if(type=="init"){
//		pageNo=1;
//	}
//	if (pageNo == 'undefined' || pageNo == null) {
//		pageNo = 1;
//	}
//	if (pageSize == 'undefined' || pageSize == null) {
//		pageSize = 10;
//	}
//	var searchStr = $("#searchStr").val().trim();
//	var status = $("#status").val();
//	var itemTypeId = $("#itemTypeId").val();
//	var sort = $("#sort").val();
//	var url = ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemsPageList";
//	$("#infoPageDiv").load(url, {pageNo : pageNo, pageSize : pageSize, searchStr : searchStr, status : status, itemTypeId : itemTypeId, sort : sort}, function() {
//		$("#infoPageDiv").show();
//		/*var rowsize = document.getElementById('listTable').getElementsByTagName('tr').length;
//		if (rowsize == 1){
//			showMessage('未查询到数据！');
//			return;
//		}*/
//	});
//}
//
//// 进入明细页面
//function showInfo(id, opType, status) {
//	if (opType == "edit" && status == g_status){
//		showMessage('当前选中记录已启用，不允许修改！');
//		return;
//	}
//	var itemTypeId = $("#itemTypeId").val();
//	var url = ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemDetailById";
//	$("#infoViewDiv").load(url, {id : id, opType : opType, itemTypeId : itemTypeId}, function() {
//		$("body").append("<div class='oy'></div>")
//		$("#infoViewDiv").show();
//		$("#editForm > div[class='btns'] > input").focus();
//	});
//}
//
//// 全选、反选
//function selectAll() {
//	var chk = $("input[id='selectAllBox']").is(':checked');
//	if (chk == true) {
//		// 全选
//		$("input[id='checkItem']").each(function() {
//			$(this).prop("checked", true);
//		});
//	} else {
//		// 反选
//		$("input[id='checkItem']").each(function() {
//			$(this).prop("checked", !$(this).prop("checked"));
//		});
//	}
//}
//
//// 启用Or停用
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
//			url : ctx + "/pm/CentreMicrobeItem/disableOrEnableCentreMicrobeitem",
//			type : "POST",
//			data : {id : id, operatioType : operatioType},
//			success : function(data) {
//				resolutionData(data);
//				pageQuery();// 刷新list
//			},
//			error : function() {
//			}
//		});
//	});
//}
//
//// 新增
//function addDictCode() {
//	//防止重复提交
//    if(!canStore){
// 		return false;
//    }
//	formTextTrim("addForm");
//	if(!validateSave()){
//		return;
//	}
//	var itemTypeId = $("#itemTypeId").val();
//	var name = $("#name").val().trim();
//	// 检查是否同名
//	$.ajax({
//		url : ctx + "/pm/CentreMicrobeItem/checkIfCentreMicrobeitemNameExist",
//		type : "POST",
//		data : {itemTypeId : itemTypeId, name : name},
//		success : function(data) {
//			//resolutionData(data);
//			if(data.indexOf("confirm|") == 0){
//				// 有同名
//				showConfirm(data.substring(8), function() {
//					// 确认继续
//					add();
//				});
//			} else {
//				// 无同名，确认继续
//				add();
//			}
//		},
//		error : function() {
//		}
//	});
//}
//
//function add(){
//	canStore = false;
//	var dataString = $("#addForm").serialize();
//	$.ajax({
//		url : ctx + "/pm/CentreMicrobeItem/addCentreMicrobeitem",
//		type : "POST",
//		data : dataString,
//		success : function(data) {
//			canStore = true;
//			resolutionData(data);
//			closeWin();
//		    $("#sort  option[value=2] ").attr("selected",true)  //新增后排序默认为按按录入顺序降序
//		    $("#status  option:first ").attr("selected",true)  //新增后状态默认为全部
//		     $("#searchStr").val("");
//			pageQuery();// 刷新list
//		},
//		error : function() {
//			canStore = true;
//		}
//	});
//}
//
//// 修改
//function updateDictCode() {
//	//防止重复提交
//    if(!canStore){
// 		return false;
//    }
//	formTextTrim("editForm");
//	if(!validateSave()){
//		return;
//	}
//	if(!formIsDirty("editForm")){
//    	closeWin();
//    	return false;
//    }
//	// 检查是否同名
//	var id = $("#id").val();
//	var itemTypeId = $("#itemTypeId").val();
//	var name = $("#name").val().trim();
//	// 检查是否同名
//	$.ajax({
//		url : ctx + "/pm/CentreMicrobeItem/checkIfCentreMicrobeitemNameExist",
//		type : "POST",
//		data : {id : id, itemTypeId : itemTypeId, name : name},
//		success : function(data) {
//			//resolutionData(data);
//			if(data.indexOf("confirm|") == 0){
//				// 有同名
//				showConfirm(data.substring(8), function() {
//					// 确认继续
//					update();
//				});
//			} else {
//				// 无同名，确认继续
//				update();
//			}
//		},
//		error : function() {
//		}
//	});
//}
//
//function update(){
//	canStore = false;
//	var dataString = $("#editForm").serialize();
//	var id = $("#id").val();
//	$.ajax({
//		url : ctx + "/pm/CentreMicrobeItem/modifyCentreMicrobeitem",
//		type : "POST",
//		data : dataString,
//		success : function(data) {
//			canStore = true;
//			closeWin();
//			//pageQuery();// 刷新list
//			var ret = resolutionData(data);
//			closeWin();
//			//刷新该行记录
//			var jsonObj = eval('(' + ret + ')');
//			//赋值
//			//$("#tr_"+id).children('td').eq(1).html(replaceHtml(jsonObj.codeNo));
//			$("#tr_"+id).children('td').eq(2).html(replaceHtml(jsonObj.name));
//			$("#tr_"+id).children('td').eq(3).html(replaceHtml(jsonObj.enShortName));
//			$("#tr_"+id).children('td').eq(4).html(replaceHtml(jsonObj.enName));
//			$("#tr_"+id).children('td').eq(5).html(replaceHtml(jsonObj.whonetCode));
//			$("#tr_"+id).children('td').eq(6).html(replaceHtml(jsonObj.fastCode));
//			$("#tr_"+id).children('td').eq(7).html(replaceHtml(jsonObj.displayOrder));
//			$("#tr_"+id).children('td').eq(8).html(replaceHtml(jsonObj.memo));
//		},
//		"error" : function() {
//			canStore = true;
//		}
//	});
//}
//
///**
// * 验证保存的必填条件
// * return
// */
//function validateSave(){
//	var name = $("#name").val().trim();
//	if(name == ''){
//		showMessage('中文名称为空，请重新输入！',function(){
//			$("#name").focus();
//		});
//		return false;
//	}
//	var displayOrderId = "displayOrder";
//	if(validateDisplayOrder(displayOrderId)){
//		return false;
//	}
//	return true;
//}
//
//// 删除
//function deleteDictCode(id) {
//	var status = $("#tr_"+id).children('td').eq(11).html();
//	if (status == g_status){
//		showMessage('当前选中记录已启用，不允许删除！');
//		return;
//	}
//	showConfirm('是否删除当前记录？',function(){
//		$.ajax({
//			url : ctx + "/pm/CentreMicrobeItem/deleteCentreMicrobeitem",
//			type : "POST",
//			data : {
//				id : id
//			},
//			success : function(data) {
//				resolutionData(data);
//				pageQuery();// 刷新list
//			},
//			error : function() {
//			}
//		});
//	});
//}
//
//// 批量删除
//function deleteDictCodeBatch() {
//	var ids = "";
//	var ids2 = "";//没有被选中的记录，将空格传到后台，以便获取行号
//	var isNotDeleteCodes = "";
//	$("a[id='checkItem']").each(function(){
//		if($(this).attr("class") == 'yes'){
//			var checkId = $(this).attr("value");
//			var status = $("#tr_"+checkId).children('td').eq(11).html();
//			if (status != g_status) {  //非启用状态可进行删除
//				ids += checkId+",";
//				ids2 += checkId+",";
//			} else {				  //启用状态的条码记录下来做提示
//				isNotDeleteCodes += "【"+$("#tr_"+checkId).children('td').eq(2).html() + "】、";
//			}
//		} else {
//			ids2 += " ,";
//		}
//	});
//	if (isNotDeleteCodes != "" || isNotDeleteCodes.length > 0) {
//		showMessage("名称："+isNotDeleteCodes.substring(0, isNotDeleteCodes.length-1)+'启用状态，不允许删除!');
//		return false;
//	}
//	if (ids == '') {
//		showMessage('请选择要删除的数据!');
//		return false;
//	}
//	showConfirm('是否删除所选中的记录？',function(){
//		$.ajax({
//			url : ctx + "/pm/CentreMicrobeItem/batchDeleteCentreMicrobeitems",
//			type : "POST",
//			data : {
//				ids : ids
//			},
//			success : function(data) {
//				resolutionData(data);
//				pageQuery();// 刷新list
//			},
//			error : function() {
//			}
//		});
//	});
//}
// 主页面仪器列表
var ii_instrumentsListOpts = {
	url : null,
	method : 'POST',
	height : ($(window).height() < 700) ? 500 : 740,
	fitColumns : true,
	striped: true,
	fit : false,
	checkOnSelect : false,
	selectOnCheck : true,
	columns : [ [
	    {
	    	field : "ck", checkbox : true, width : 40
	    },
	    {
	    	title : "编码", field: 'codeNo', width : 80
	    },
	    {
			title : "仪器名称", field : 'name', flex : 1, width : 200
	    },
	    {
	    	title : "仪器型号", field : 'model', width : 80
	    },
	    {
			title : '仪器类型', field : 'typeId', width : 120,
			formatter : function(value, row, index) {
				var returnStr="";
				if (value == "0") {
					returnStr = "常规";
				}else if(value == "1"){
					returnStr = "微生物";
				}else if(value == "2"){
					returnStr = "文字报告";
				}else if(value == "3"){
					returnStr = "酶标";
				}
				return returnStr;
			}
	    },
//	    {
//			title : '单列报告模板', field : 'rptTemplateName', width : 120
//	    },
//	    {
//			title : '双列报告模板', field : 'rptTemplate2Name', width : 120
//	    },
	    {
			title : '通讯参数', field: 'cargument', width : 45,
			formatter: function (value, row, index) {
				if (showAuthrized) {
					return "<div class='editable-cell'><span class='J_ShowPop sm-size' data-show='ii_instrParamsInfo' onclick='ii_showInstrParamsPop("+ index + ", 0)'>查看</span></div>";
				} else {
					return "查看";
				}
            }
	    },
	    {
			title : "状态", field : 'status', width : 45,
			formatter : function(value, row, index) {
				if (statusAuthrized) {
					var returnStr = '<div class="status-switch"><input type="checkbox" name="status" onclick="ii_modifyStatus('+index+');"/><i></i></div>';
					if (value == '1') {
						returnStr = '<div class="status-switch"><input type="checkbox" name="status" checked="checked" onclick="ii_modifyStatus('+index+');"/><i></i></div>';
					}
				} else {
					returnStr = "停用";
					if (value == "1") {
						returnStr = "开启";
					}
				}
				return returnStr;
			}
	    },
		{
			title : "操作", field : 'opt', width : 80, align : 'center', 
			formatter : function(value, row, index) {
                var str = "";
                if (editAuthrized) {
                	str += '<span class="help-tips J_ShowPop md-size"><a class="icon icon-edit" onclick="ii_showInstrumentsPop('+ index + ', 1)"></a><i class="help-tips-content">修改</i></span>';
				}
                if (deleteAuthrized) {
                	str += '<span class="help-tips danger-tips"><a class="icon icon-trash" onclick="ii_deleteInstruments('+ index + ',this)"></a><i class="help-tips-content">删除</i></span>';
				}
                if (copyAddAuthrized) {
                	str += '<span class="help-tips J_ShowPop md-size"><a class="icon icon-copy" onclick="ii_showInstrumentsPop('+ index + ', 2)"></a><i class="help-tips-content">复制添加</i></span>';
				}
                if (settingAuthrized) {
                	str += '<span id="ii_j_showInstrParamsPop" data-show="ii_instrParamsInfo" class="help-tips J_ShowPop md-size"><a class="icon icon-edit" onclick="ii_showInstrParamsPop('+ index + ', 1)"></a><i class="help-tips-content">通讯设置</i></span>';
				}
                return str;
			}
		} 
	] ],
//	autoRowHeight: true,
	pagination : false,
//	pageSize : 20,
};

// （从仪器库添加）仪器列表
var ii_instrumentsCtrListOpts = {
	url : null,
	method : 'POST',
	height : ($(window).height() < 700) ? 400 : 400,
	fitColumns : true,
	striped: true,
	fit : false,
	checkOnSelect : false,
	selectOnCheck : true,
	columns : [ [
	    {
	    	field : "ck", checkbox : true, width : 30
	    },
	    {
	    	title : "编码", field: 'codeNo', width : 60
	    },
	    {
			title : "仪器名称", field : 'name', width : 60
	    },
	    {
	    	title : "仪器型号", field : 'model', width : 60
	    }
	] ],
	autoRowHeight: true,
	pagination : true,
	pageSize : 20,
};

//（从仪器库添加）仪器项目列表
var ii_instrumentsCtrItemListOpts = {
	url : null,
	method : 'POST',
	height : ($(window).height() < 700) ? 150 : 150,
	fitColumns : true,
	striped: true,
	fit : false,
	columns : [ [
	    {
	    	title : "达安标准码", field: 'itemCodeNo', width : 80
	    },
	    {
			title : "项目名称", field : 'itemName', width : 80
	    },
	    {
	    	title : "英文简称", field : 'itemEnShortName', width : 80
	    },
	    {
	    	title : "通道码", field : 'channelCode', width : 80
	    },
	    {
	    	title : "单位", field : 'unit', width : 80
	    },
	    {
	    	title : "默认样本类型", field : 'itemSampleTypeName', width : 80
	    }
	] ],
	autoRowHeight: true,
};

//（从仪器库添加）仪器细菌列表
var ii_instrumentsCtrGermListOpts = {
	url : null,
	method : 'POST',
	height : ($(window).height() < 700) ? 150 : 150,
	fitColumns : true,
	striped: true,
	fit : false,
	columns : [ [
	    {
	    	title : "编码", field: 'micsCodeNo', width : 120
	    },
	    {
			title : "细菌名称", field : 'micsName', width : 120
	    },
	    {
	    	title : "通道码", field : 'channelCode', width : 120
	    }
	] ],
	autoRowHeight: true,
}

//（从仪器库添加）仪器抗生素列表
var ii_instrumentsCtrAntiListOpts = {
	url : null,
	method : 'POST',
	height : ($(window).height() < 700) ? 150 : 150,
	fitColumns : true,
	striped: true,
	fit : false,
	columns : [ [
	    {
	    	title : "编码", field: 'micsCodeNo', width : 120
	    },
	    {
			title : "抗生素名称", field : 'micsName', width : 120
	    },
	    {
	    	title : "通道码", field : 'channelCode', width : 120
	    }
	] ],
	autoRowHeight: true,
};
//机构列表
var ii_mechanismSelectListOpt = {
	    url : ctx + "/local_inst/instruments/centerOrgPageList",
	    method : 'post',
	    height : ($(window).height() < 700) ? 250 : 250,
	    fitColumns : true,
	    striped : true,
	    checkOnSelect : false,	    
	    onLoadSuccess:function(){
	    	$("#ii_mechanismSchStr").focus();
	    },
	    onClickCell: function(index, field){
	    	var rowData = ii_mechanismSelectList.datagrid('getData').rows[index];
			var ii_mechanismId = rowData.idString;
			ii_mechanismName = rowData.name;
			$("#ii_mechanismId").val(ii_mechanismId);
	    	if (field == 'idString') {
	    		return;
	    	}
	    	$("#ii_mechanismSelectList input[type='radio']:eq("+index+")").click();
	    },
	    fit : false,
	    columns : [ [
	    	{
	        	field : 'idString',
	        	formatter : function(value, row, index) {
	    			return "<input type='radio' datagrid-row-index='"+index+"' name='instrument'>";
	        	}
	    	}, {
	    		title : "编码", field : 'codeNo', width : 80
	    	}, {
	    		title : "中文名称", field : 'name', width : 100
	    	}, {
	    		title : "所属地区", field : 'regionName', width : 100
	    	} ] ],
	    pagination: true
	}
var ii_defaultPageOpt = {
		beforePageText : '第',// 页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '共 {total} 条数据',
		pageSize : 10,
		pageNumber : 1
	}
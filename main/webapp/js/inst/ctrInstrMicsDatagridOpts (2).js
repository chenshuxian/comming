var imr_initHeight = ($(window).height() < 810) ? 240 : 350;
var imr_initPopHeight =  ($(window).height() < 700) ? 400 : 400;
var imr_instrumentItemListOpt = {
	url : null,
	method : 'post',
	height : imr_initHeight,
	fitColumns : true,
	striped : true,
	checkOnSelect : false,
	fit : false,
	columns : [ [ {
		field : "idString", checkbox : true, width : 30
	}, {
		title : "编码", field : 'codeNo', width : 50
	}, {
		title : "细菌名称", field : 'name', flex : 1, width : 50
	},{
		title : "通道码", field : 'channelCode', width : 50, editor : 'text'
	},{
		title : '打印次序', field : 'printOrder', width : 50, editor : 'text'
	} ] ],
	autoRowHeight : false
};

var imr_instrumentAntiListOpt = {
    url : null,
    method : 'post',
    height : imr_initHeight,
    fitColumns : true,
    striped : true,
    checkOnSelect : false,
    fit : false,
	columns : [ [ {
		field : "idString", checkbox : true, width : 30
	}, {
		title : "编码", field : 'codeNo', width : 50
	}, {
		title : "抗生素名称", field : 'name', flex : 1, width : 50
	},{
		title : "通道码", field : 'channelCode', width : 50, editor : 'text'
	},{
		title : '打印次序', field : 'printOrder', width : 50, editor : 'text'
	} ] ],
	
    autoRowHeight : false,
}

//function onInstrumentClickRow(index, data){
//
//	var row = imr_instrumentSelectList.datagrid('getSelected');
//	imr_instrumentSelectList.datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("radio", true);
//}

var imr_instrumentSelectListOpt = {
    url : ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsPageList',
    method : 'post',
    height : imr_initHeight,
    fitColumns : true,
    striped : true,
    checkOnSelect : false,
    onLoadSuccess:function(){
    	$("#imr_instrumentSchStr").focus();
    },
    onClickCell: function(index, field){
    	var rowData = imr_instrumentSelectList.datagrid('getData').rows[index];
		var instrumentId = rowData.idString;
		$("#imr_instrumentId").val(instrumentId);
    	if (field == 'idString') {
    		return;
    	}
    	$("#imr_instrumentList input[type='radio']:eq("+index+")").click();
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
    		title : "仪器名称", field : 'name', width : 100
    	}, {
    		title : "仪器型号", field : 'model', width : 100
    	} ] ],
    pagination: true
}
var imr_defaultPageOpt = {
	beforePageText : '第',// 页数文本框前显示的汉字
	afterPageText : '页    共 {pages} 页',
	displayMsg : '共 {total} 条数据',
	pageSize : 10,
	pageNumber : 1
}
//细菌
var imr_addInstrumentItemLeftOpt = {
    url: ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddLeft',  
    method: 'post',
    height: imr_initPopHeight,
    fitColumns: true,
    striped: true,
    fit: false,
    onLoadSuccess:function(){
	    //设置已包含的个数
	    $("#imr_containItemCount").text(imr_addInstrumentItemLeft.datagrid("getData").total);   
	    $("#imr_itemSchStr").focus();
    },
    columns: [
        [{
            field: "idString", checkbox: true, width: 30
        }, {
            title: "编码", field: 'codeNo', width: 50
        }, {
            title: "中文名称", field: 'name', flex: 1, width: 50
        }, {
            title: "英文简称", field: 'enShortName', width: 50
        }]
    ],
    autoRowHeight: false
}

var imr_addInstrumentItemRightOpt = {
    url: ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddRightList',    
    method: 'post',
    height: imr_initPopHeight,
    fitColumns: true,
    striped: true,
    fit: false,
    onLoadSuccess:function(){
	    $("#imr_itemSchStr").focus();
    },
    columns: [
        [{
            field: "idString", checkbox: true, width: 30
        }, {
            title: "编码", field: 'codeNo', width: 50
        }, {
            title: "中文名称", field: 'name', flex: 1, width: 50
        }, {
            title: "英文简称", field: 'enShortName', width: 50
        }]
  ],
  autoRowHeight: false
}

//抗生素 
var imr_addInstrumentAntiLeftOpt = {
    url: ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddLeft',  
    method: 'post',
    height: imr_initPopHeight,
    fitColumns: true,
    striped: true,
    fit: false,
    onLoadSuccess:function(){
	    //设置已包含的个数
	    $("#imr_containAntiCount").text(imr_addInstrumentAntiLeft.datagrid("getData").total);   
	    $("#imr_AntiSchStr").focus();
    },
    columns: [
        [{
            field: "idString", checkbox: true, width: 30
        }, {
            title: "编码", field: 'codeNo', width: 80
        }, {
            title: "中文名称", field: 'name', flex: 1, width: 80
        }, {
            title: "英文简称", field: 'enShortName', width: 50
        }]
    ],
    autoRowHeight: false
}

var imr_addInstrumentAntiRightOpt = {
    url: ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddRightList',    
    method: 'post',
    height: imr_initPopHeight,
    fitColumns: true,
    striped: true,
    fit: false,
    onLoadSuccess:function(){
	    $("#imr_AntiSchStr").focus();
    },
    columns: [
        [{
            field: "idString", checkbox: true, width: 30
        }, {
            title: "编码", field: 'codeNo', width: 80
        }, {
            title: "中文名称", field: 'name', flex: 1, width: 80
        }, {
            title: "英文简称", field: 'enShortName', width: 50
        }]
  ],
  autoRowHeight: false
}
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
	lockBy:[26, 471],					//锁定Grid，传入数组[top,left]
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
	lockBy:[26, 471],					//锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};
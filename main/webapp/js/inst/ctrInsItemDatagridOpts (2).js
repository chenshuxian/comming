var iir_initHeight = ($(window).height() < 700) ? 200 : 300;
var iir_initPopHeight = ($(window).height() < 700) ? 400 : 400;
var iir_instrumentItemListOpt = {
	url : null,
	method : 'post',
	height : iir_initHeight,
	fitColumns : true,
	striped : true,
	checkOnSelect : false,
	fit : false,
	columns : [ [ {
		field : "idString", checkbox : true, width : 30
	}, {
		title : "达安标准码", field : 'codeNo', width : 50
	}, {
		title : "项目名称", field : 'name', flex : 1, width : 50
	}, {
		title : "英文简称", field : 'enShortName', width : 50
	}, {
		title : "通道码", field : 'channelCode', width : 50, editor : 'text'
	}, {
		title : '转换系数', field : 'factor', width : 50, editor : 'text'
	}, {
		title : '打印次序', field : 'printOrder', width : 50, editor : 'text'
	}, {
		title : '单位', field : 'unit', width : 50, editor : 'text'
	}, {
		title : '默认标本类型', field : 'sampleTypeName', width : 50
	} ] ],
	autoRowHeight : false
};

var iir_instrumentRefrangeListOpt = {
    url : null,
    method : 'get',
    height : iir_initHeight,
    fitColumns : true,
    striped : true,
    checkOnSelect : false,
    fit : false,
    columns : [ [
        {
        	field : "idString", checkbox : true, width : 30
        },
        {
        	title : "标本类型", field : 'sampleTypeName', width : 50
        },
        {
        	title : "性别", field : 'sexName', flex : 1, width : 50
        },
        {
        	title : '年龄单位', field : 'ageUnitName', width : 50
        },
        {
        	title : '起始年龄', field : 'ageMin', width : 50
        },
        {
        	title : '结束年龄', field : 'ageMax', width : 50
        },
        {
        	title : '参考下限', field : 'refLow', width : 50
        },
        {
        	title : '参考上限', field : 'refHigh', width : 50
        },
        {
        	title : '危急下限', field : 'panicLow', width : 50
        },
        {
        	title : '危急上限', field : 'panicHigh', width : 50
        },
        {
        	title : '警告上限', field : 'alarmHigh', width : 50
        },
        {
        	title : '警告下限', field : 'alarmLow', width : 50
        },
        {
        	title : "操作", field : 'opt', width : 50, align : 'center',
        	formatter : function(value, row, index) {
				var str = "";
				str += '<span class="help-tips"><a class="icon icon-edit" onclick="iir_editRefrange('
				+ index
				+ ',this)"></a><i class="help-tips-content">编辑</i></span>';
				str += '<span class="help-tips danger-tips"><a class="icon icon-trash" onclick="iir_deleteDescRow('
				+ index
				+ ',this)"></a><i class="help-tips-content">删除</i></span>';
				str += '<span class="help-tips"><a class="icon icon-copy" onclick="iir_copyRefrange('
				+ index
				+ ',this)"></a><i class="help-tips-content">复制</i></span>';
				return str;
			}
        }
    ] ],
    autoRowHeight : false,
}

//function onInstrumentClickRow(index, data){
//
//	var row = iir_instrumentSelectList.datagrid('getSelected');
//	iir_instrumentSelectList.datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("radio", true);
//}

var iir_instrumentSelectListOpt = {
    url : ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsPageList',
    method : 'post',
    height : iir_initHeight,
    fitColumns : true,
    striped : true,
    checkOnSelect : false,
    onClickCell: function(index, field){
    	if (field == 'idString') {
    		return;
    	}
    	$("#iir_instrumentList input[type='radio']:eq("+index+")").click();
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
    		title : "仪器类型", field : 'model', width : 100
    	} ] ],
    pagination: true
}
var iir_defaultPageOpt = {
	beforePageText : '第',// 页数文本框前显示的汉字
	afterPageText : '页    共 {pages} 页',
	displayMsg : '共 {total} 条数据',
	pageSize : 10,
	pageNumber : 1
}

var iir_addInstrumentItemLeftOpt = {
    url: ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsItemAddLeft',
    method: 'post',
    height: iir_initPopHeight,
    fitColumns: true,
    striped: true,
    fit: false,
    columns: [
        [{
            field: "idString", checkbox: true, width: 30
        }, {
            title: "达安标准码", field: 'codeNo', width: 50
        }, {
            title: "项目名称", field: 'name', flex: 1, width: 50
        }, {
            title: "英文简称", field: 'enShortName', width: 50
        }, {
            title: "检验方法", field: 'testMethodName', width: 50
        }]
    ],
    autoRowHeight: false
}

var iir_addInstrumentItemRightOpt = {
    url: ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsItemAddRightList',
    method: 'post',
    height: iir_initPopHeight,
    fitColumns: true,
    striped: true,
    fit: false,
    columns: [
        [{
            field: "idString", checkbox: true, width: 30
        }, {
            title: "达安标准码", field: 'codeNo', width: 50
        }, {
            title: "项目名称", field: 'name', flex: 1, width: 50
        }, {
            title: "英文简称", field: 'enShortName', width: 50
        }, {
            title: "检验方法", field: 'testMethodName', width: 50
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
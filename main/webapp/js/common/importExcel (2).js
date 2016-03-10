var i=0;
var ajaxOver = true;

function importExcel(funcCode) {
	var str = $("#uploadFile").val();
	if (str == '') {
		return false;
	}

	str = str.substr(str.lastIndexOf(".") + 1);
	if (!(str.toLowerCase() == "xls" || str.toLowerCase() == "xlsx")) {
		showMsg("文件非Excel类型的文件，无法导入", "提示信息");
		return false;
	}
	
	var testitemType = null;
	var areaPriceType = null;
	//实验室价格维护
	if(funcCode == 'lab_testitem_price'){
		testitemType = $('input[name="testitemType"]:checked').val();
		if(testitemType == '' || testitemType == 'undefined' || testitemType == undefined){
			showMsg("请选择导入项目类型", "提示信息");
			return false;
		}
		
		if(testitemType == '1'){
			funcCode = 'lab_testitem_price';
		}
		if(testitemType == '2'){
			funcCode = 'lab_testitem_group_price';
		}
		if(testitemType == '3'){
			funcCode = 'lab_testitem_set_price';
		}
	}
	//区域价格维护
	if(funcCode == 'area_price'){
		areaPriceType = $('input[name="areaPriceType"]:checked').val();
		if(areaPriceType == '' || areaPriceType == 'undefined' || areaPriceType == undefined){
			showMsg("请选择导入类型", "提示信息");
			return false;
		}
		
		if(areaPriceType == '1'){//单项
			funcCode = 'area_price';
		}
		if(areaPriceType == '2'){//组合
			funcCode = 'area_group_price';
		}
		if(areaPriceType == '3'){//套餐
			funcCode = 'area_set_price';
		}
		
	}
	
	var data = {"funcCode":funcCode};
	var url = ctx + '/importExcel/doImport';

	$("#progressBar").css("width","0%");
	$("#progressBarDIV").show();
	
	ajaxOver = false;
	progressBarChange();

	$.ajaxFileUpload({
		url : url,
		fileElementId : 'uploadFile',// id
		type : 'POST',
        dataType : 'json',  
        data:data,  
		async : true,
		success : function(result, status) {
			if(result != null){
				if(result.successMsg != null && result.successMsg!=''){
					$("#progressBar").css("width",+"100%");
					
					$("#resultDIV").show();
					$("#successMsgDIV").show();
					$("#successDetailDIV").show();
					$("#errorMsgDIV").hide();
					$("#successMsg").html(result.successMsg);
					
					$("#successDetailDIV").load(ctx + '/importExcel/importDetail/'+funcCode + '/' + result.missionId);
				}
				if(result.errorMsg != null && result.errorMsg!=''){
					$("#resultDIV").show();
					$("#successMsgDIV").hide();
					$("#successDetailDIV").hide();
					$("#errorMsgDIV").show();
					$("#errorMsg").html(result.errorMsg);
				}
			}
		},
		error : function(data, status, e) {
			showMsg("Excel导入失败，请重试", "提示信息");
		},
		complete: function(result){
			ajaxOver = true;
			i = 0;
			$("#progressBarDIV").hide();
			$("#progressBar").css("width","0%");
        }
	});
}

function progressBarChange(){
	if(ajaxOver == false){
		if(i<95){
			i=i+5;
			$("#progressBar").css("width",i+"%");
			setTimeout("progressBarChange()", 20);
		}
	}
}

function pageQuery() {
	var funcCode = $("#funcCode").val();
	var missionId = $("#missionId").val();
	
	var params = "pageNo=" + $("#pageNo").val() + 
				"&pageSize=" + $("#pageSize").val();
	
	$("#successDetailDIV").load(ctx+"/importExcel/importDetailList/"+funcCode+"/"+missionId, params, function() {
	});
}

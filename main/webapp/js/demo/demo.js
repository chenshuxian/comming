function search(){
	$("#pageNo").val(1);
	pageQuery();
}

function pageQuery(){
	$("#tableDiv").load(ctx+"/demo/demoTable",
			$("#searchForm").serialize()
			,function(){
	});
}

function saveAdd(){
	var code=trim($("#code").val());
	var testedElementName=trim($("#testedElement option:selected").text());
	var testedPropertiesName=trim($("#testedProperties option:selected").text());
	var testMethodName=trim($("#testMethod option:selected").text());
	var specimenMarkName=trim($("#specimenMark option:selected").text());
	var timePropertiesName=trim($("#timeProperties option:selected").text());
	var specimenTypeName=trim($("#specimenType option:selected").text());
	var parms=$("#addForm").serialize()
	+"&testedElementName="+testedElementName
	+"&testedPropertiesName="+testedPropertiesName
	+"&testMethodName="+testMethodName
	+"&specimenMarkName="+specimenMarkName
	+"&timePropertiesName="+timePropertiesName
	+"&specimenTypeName="+specimenTypeName;
	if(null==code||code==""){
		showMsg("[编码]不能为空");	
		$("#code").focus();
		return;
	}
	$.ajax({
		"url" : ctx+"/demo/saveAdd",
		"type" : "POST",
		data:parms,
		"success" : function(data) {
			if(data!=""&&data!=null){
				var index=data.indexOf("MSG|");
				if(index==0){
					showMsg(data.substring(4),2000);
				}else{
					window.close(); 
				}
				
			}else{
				showMsg("保存出错！",2000);
			}		
		},
		"error" : function() {
		}
	});
}

function saveEdit(){
	var code=trim($("#code").val());
	var testedElementName=trim($("#testedElement").val());
	var testedPropertiesName=trim($("#testedProperties").val());
	var testMethodName=trim($("#testMethod").val());
	var specimenMarkName=trim($("#specimenMark").val());
	var timePropertiesName=trim($("#timeProperties").val());
	var specimenTypeName=trim($("#specimenType").val());
	var parms=$("#editForm").serialize()
	+"&testedElementName="+testedElementName
	+"&testedPropertiesName="+testedPropertiesName
	+"&testMethodName="+testMethodName
	+"&specimenMarkName="+specimenMarkName
	+"&timePropertiesName="+timePropertiesName
	+"&specimenTypeName="+specimenTypeName;
	if(null==code||code==""){
		showMsg("[编码]不能为空");	
		$("#code").focus();
		return;
	}
	$.ajax({
		"url" : ctx+"/demo/saveEdit",
		"type" : "POST",
		data:parms,
		"success" : function(data) {
			if(data!=""&&data!=null){
				var index=data.indexOf("MSG|");
				if(index==0){
					showMsg(data.substring(4),2000);
				}else{
					window.close(); 
				}
				
			}else{
				showMsg("保存出错！",2000);
			}
		},
		"error" : function() {
		}
	});
}
function toDelete(id){
	$('#deleteRowId').val(id);
	var code=$("#"+id).find('td:eq(0)').html();
	$("#deleteTip").html("编码："+code);
	$('#myModal').modal('show');
}
function deletedemo(){
	var id=$('#deleteRowId').val();
	$.ajax({
		"url" : ctx+"/demo/deletedemo",
		"type" : "POST",
		data:{id:id},
		"success" : function(data) {
			if("success"==data){
				$("#"+id).remove();
				$('#myModal').modal('hide');
				pageQuery();
			}else{
				
			}
		},
		"error" : function() {
		}
	});
}
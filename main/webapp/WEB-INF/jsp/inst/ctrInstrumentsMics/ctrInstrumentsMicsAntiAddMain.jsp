<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/inst/instrumentsMics.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>仪器抗生素新增</title>
    
<script type="text/javascript">
$(document).ready(function(){
	var instrumentId = $("#instrumentId").val();
	$("#containAntiDiv").load(ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddLeft",{instrumentId:instrumentId,itemTypeId:2});
	$("#noContainAntiDiv").load(ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddRightMain",{itemTypeId:2});
});
</script>

</head>

<body>

    <h3>添加抗生素<a href="javascript:closeWin();"></a></h3>
    <div class="yi_c over">
    	<div id="containAntiDiv" style="float: left; width: 510px;height: 480px;overflow:auto; border-top:0px; padding: 10px 0px;"></div>
    	<div style="float: left;width: 50px;padding-top: 200px; border-top:0px">
	     	<div class="btns" style="border-top:0px">
	     		<input type="button" id="addBtn" value="&lt;&lt;" onclick="javascript:addAnti();" title="添加抗生素"/>
	     		<br/><br/>
	     		<input type="button" id="removeBtn" value=">>" onclick="javascript:delAnti();" title="移除抗生素"/>
	       	</div>
    	</div>
  		<div id="noContainAntiDiv" style="float: right; width: 510px;height: 480px; border-top:0px; padding: 10px 0px;"></div>
    </div>
    <div class="btns">
		<input type="button" value="确定" onclick="javascript:addMicsConfirm('2');" onkeydown='if(event.keyCode==13){}'>
		<input type="button" value="取消" onclick="javascript:closeWin();">
    </div>

</body>
</html>
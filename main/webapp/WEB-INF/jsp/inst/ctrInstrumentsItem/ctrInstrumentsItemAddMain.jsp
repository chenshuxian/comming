<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/inst/instrumentsItem.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>仪器项目新增</title>
    
<script type="text/javascript">
$(document).ready(function(){
	var instrumentId = $("#instrumentId").val();
	$("#containDiv").load(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddLeft",{instrumentId:instrumentId});
	$("#noContainDiv").load(ctx + "/inst/ctrInstrumentsItem/ctrInstrumentsItemAddRightMain",null);
});
</script>

</head>

<body>

    <h3>添加检验项目<a href="javascript:closeWin();"></a></h3>
    <div class="yi_c over">
    	<div id="containDiv" style="float: left; width: 510px;height: 480px;overflow:auto; border-top:0px; padding: 10px 0px;"></div>
    	<div style="float: left;width: 50px;padding-top: 200px; border-top:0px">
	     	<div class="btns" style="border-top:0px">
	     		<input type="button" id="addBtn" value="&lt;&lt;" onclick="javascript:addTestItem();" title="添加项目"/>
	     		<br/><br/>
	     		<input type="button" id="removeBtn" value=">>" onclick="javascript:delTestItem();" title="移除项目"/>
	       	</div>
    	</div>
  		<div id="noContainDiv" style="float: right; width: 510px;height: 480px; border-top:0px; padding: 10px 0px;"></div>
    </div>
    <div class="btns">
		<input type="button" value="确定" onclick="javascript:addConfirm();" onkeydown='if(event.keyCode==13){}'>
		<input type="button" value="取消" onclick="javascript:closeWin();">
    </div>

</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">
<script src="${ctx}/js/enterToTab.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		var orgsId = $("#orgsId").val(); //机构ID
		var instrumentId = $("#instrumentId").val();//仪器ID
		$("#instrumentsItemContainList").load(ctx + "/inst/instrumentsItem/instrumentsItemContainList",{orgsId:orgsId,instrumentId:instrumentId});
		$("#instrumentsItemNotContainListMain").load(ctx + "/inst/instrumentsItem/instrumentsItemNotContainListMain");
	});
</script>
<title>添加项目</title>
</head>
<body>
	<h3>
		<a href="javascript:closeWin();"></a>
	</h3>
	      <div class="yi_c over">
	      	<div id="instrumentsItemContainList" style="float: left; width: 520px;height: 480px;overflow-y:auto;"></div>
	      	<div style="float: left;width: 50px;padding-top: 200px;">
		      	<div class="btns">
		      		<input type="button" id="leftMove" value="&lt;&lt;" onclick="notContainTr();" title="添加项目"/>
		      		<br/><br/>
		      		<input type="button" id="rightMove" value=">>" onclick="containTr();" title="移除项目"/>
		        </div>
	      	</div>
	    	<div id="instrumentsItemNotContainListMain"></div>
	      </div>
	      <div class="btns">
	        <input type="button" value="确 定" onclick="addOrRemoveInstrumentsItem();">
	        <input type="button" value="取 消" onclick="closeWin();">
	      </div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>细菌信息列表</title>
</head>

<script type="text/javascript">
$(document).ready(function(){
	unContainQuery('1','1');
	
	$("#addGermSearchStr").focus();
});
</script>

<body>
	<h3>未包含细菌</h3>
	<div style="float:left; padding: 10px 10px;">
	   	<input type="text" placeholder="搜索内容..." id="addGermSearchStr" name="addGermSearchStr" style="width:300px;">
	    <input type="button" value="搜索" onclick="javascript:unContainQuery('1','');">
	</div>
	
	<!-- 仪器细菌对照列表List -->
	<div id="unContainGermListDiv" style="display:none;width:100%;height:400px;overflow:auto;"></div>
</body>
</html>

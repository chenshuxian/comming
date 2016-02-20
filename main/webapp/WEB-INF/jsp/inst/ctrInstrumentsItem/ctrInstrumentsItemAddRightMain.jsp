<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>项目信息列表</title>
</head>

<script type="text/javascript">
$(document).ready(function(){
	// 初始化赋值
	//testMethodGrid = new TextCombo(testMethodParam);
	//testMethodGrid.focus();
	$("#testMethodId").focus();
	
	unContainQuery('1');
});
</script>

<body>
	<h3>未包含项目</h3>
	<div class="sc">
	    <span style="width:60px; float:left; padding: 10px 0px; font-weight: normal;">检验方法</span>
	    <div class="selectstyle1" style="float:left; padding: 10px 0px;">
<!-- 	    	<div id="testMethodDiv" style="width: 100px"></div> -->
	        <select name="testMethodId" id="testMethodId" style="width:100px; height:30px;" onchange="unContainQuery();">
	        	<option value="">&nbsp;</option>
				<c:forEach items="${methodList}" var="item" varStatus="status">
					<option value="${item.id}">${item.name}</option>
				</c:forEach>
	        </select>
	    </div>
    </div>
    <div style="float:left; padding: 10px 10px;">
	    <input type="text" placeholder="搜索内容..." id="addItemSearchStr" name="addItemSearchStr" style="width:140px">
	    <input type="button" value="搜索" onclick="javascript:unContainQuery('');">
	</div>
	
	<!-- 仪器项目对照列表List -->
	<div id="unContainListDiv" style="display:none;width:100%;height:410px;overflow:auto;"></div>
	
	<!-------------------------------------------------------------------------------- 
	---------------------------单列报告模板下拉Grid数据源-------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridTestMethod" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="item" items="${methodList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
</body>
</html>

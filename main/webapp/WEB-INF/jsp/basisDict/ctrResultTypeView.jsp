<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>基础字典-结果类型-明细</title>
<script type="text/javascript">
	$(document).ready(function() {
		$("#viewEnter").focus();
	});
</script>
</head>
<body class="bg">
	<h3>
		基本信息<a href="javascript:closeWin();"></a>
		<b class = "codeNo">编码:${entity.codeNo }</b>
	</h3>
	<form id="editForm" name="editForm">
		<input type="hidden" id="opType" name="opType" value="${opType }" />
		<input type="hidden" id="codeNo" name="codeNo"
			value="${entity.codeNo }" /> <input type="hidden" id="typeKey"
			name="typeKey" value="${typeKey}" /> <input type="hidden" id="id"
			name="id" value="${entity.id }" />
		<div>
			<span><i>*</i>中文名称</span> <input type="text" id="name" name="name" readonly="readonly" value= "<c:out value="${entity.name}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div>
			<span>顺序号</span> <input type="text" id="displayOrder" name="displayOrder" readonly="readonly" value="<c:out value="${entity.displayOrder}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div class="btns">
			<input id = "viewEnter" type="reset" value="确定" onclick="javascript:closeWin();">
		</div>
	</form>
</body>
</html>
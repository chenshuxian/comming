<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<script src="${ctx}/js/xuan2.js?var=${randomVal}"></script>
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

<script type="text/javascript">
$(document).ready(function(){
	// 显示条数
	var antiRowsNum = $("#antiTable tr").length - 1;
	$("#antiRowsNum").text("记录总数："+antiRowsNum);
});
</script>

</head>
<body class="bg">
	<div class="dels">
	<form id="antiListForm">
		<table id="antiTable">
           <tr>
				<th style="width: 10%" class="quan2"><a href="javascript:void(0)" class="not"></a></th>
				<th style="width: 20%">编码</th>
				<th style="width: 30%">抗生素名称</th>
				<th style="width: 20%">通道码</th>
				<th style="width: 20%">打印次序</th>
			</tr>
			<c:forEach items="${antiList}" var="item" varStatus="status">
				<tr id="tr_${item.id}">
					<td class="cen2"><a id="checkItem_anti" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
				    <td title='<c:out value="${item.codeNo}" escapeXml="true"/>'><c:out value="${item.codeNo}" escapeXml="true"/></td>
				    <td title='<c:out value="${item.name}" escapeXml="true"/>'><c:out value="${item.name}" escapeXml="true"/></td>
				    <td><input type="text" style="width: 150px" id="txtChannelCodeAnti_${status.index}" name="txtChannelCodeAnti" value="${item.channelCode}" maxlength="50" onblur="checkSpecialSymbol('txtChannelCodeAnti_${status.index}',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /></td>
				    <td><input type="text" style="width: 100px" id="txtPrintOrderAnti_${status.index}" name="txtPrintOrderAnti" value="${item.printOrder}" maxlength="4" onblur="checkSpecialSymbol('txtPrintOrderAnti_${status.index}',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /></td>
				    <input type="hidden" id="txtIdAnti" name="txtIdAnti" value="${item.id}" /><!-- 随输入框一起提交后台 -->
				</tr>
			</c:forEach>
    	</table>
    </form>
	</div>
</body>
</html>
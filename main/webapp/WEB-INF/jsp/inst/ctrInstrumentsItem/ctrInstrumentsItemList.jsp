<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<script src="${ctx}/js/xuan.js?var=1.0.0.0"></script>
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

<script type="text/javascript">
$(document).ready(function(){
	// 显示条数
	var itemRowsNum = $("#testItemTable tr").length - 1;
	$("#itemRowsNum").text("记录总数："+itemRowsNum);

	// 查询参考值列表
	if(itemRowsNum > 0){
		// 执行第一行onclick事件
		$('#testItemTable tr:eq(1)').click();
	} else {
		// 查询一个空列表
		refrangeListQuery();
	}
});
</script>

</head>
<body class="bg">
	<div class="dels">
	<form id="itemListForm">
		<table id="testItemTable">
           <tr>
				<th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
				<th style="width: 10%">达安标准码</th>
				<th style="width: 20%">项目名称</th>
				<th style="width: 10%">英文简称</th>
				<th style="width: 15%">通道码</th>
				<th style="width: 10%">转换系数</th>
				<th style="width: 10%">打印次序</th>
				<th style="width: 10%">单位</th>
				<th style="width: 10%">默认标本类型</th>
			</tr>
			<c:forEach items="${itemList}" var="item" varStatus="status">
				<tr id="tr_${item.id}" onclick="changeTr('${item.id}','${item.instrumentId}','${item.testItemId}');">
					<td class="cen1"><a id="checkItem_item" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
				    <td title="${item.codeNo}"><c:out value="${item.codeNo}" escapeXml="true"/></td>
				    <td title="${item.name}"><c:out value="${item.name}" escapeXml="true"/></td>
				    <td title="${item.enShortName}"><c:out value="${item.enShortName}" escapeXml="true"/></td>
				    <td><input type="text" style="width: 150px" id="txtChannelCode_${status.index}" name="txtChannelCode" value="${item.channelCode}" maxlength="50" onblur="checkSpecialSymbol('txtChannelCode_${status.index}',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /></td>
				    <td><input type="text" style="width: 100px" id="txtFactor_${status.index}" name="txtFactor" value="${item.factor}" maxlength="9" onblur="checkSpecialSymbol('txtFactor_${status.index}',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /></td>
				    <td><input type="text" style="width: 100px" id="txtPrintOrder_${status.index}" name="txtPrintOrder" value="${item.printOrder}" maxlength="4" onblur="checkSpecialSymbol('txtPrintOrder_${status.index}',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /></td>
				    <td><input type="text" style="width: 100px" id="txtUnit_${status.index}" name="txtUnit" value="${item.unit}" maxlength="12" onblur="checkSpecialSymbol('txtUnit_${status.index}',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /></td>
				    <input type="hidden" id="txtId" name="txtId" value="${item.id}" /><!-- 随输入框一起提交后台 -->
				    <td title="${item.sampleTypeName}"><c:out value="${item.sampleTypeName}" escapeXml="true"/></td>
				</tr>
			</c:forEach>
    	</table>
    </form>
	</div>
</body>
</html>
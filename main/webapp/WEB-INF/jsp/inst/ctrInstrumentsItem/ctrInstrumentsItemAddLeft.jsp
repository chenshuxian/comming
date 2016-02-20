<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan3.js?var=1.0.0.0"></script>
<title>项目信息列表</title>
</head>
<body>
<div class="fl left">
	<h3 style="font-weight:normal; border-bottom:0px;">已包含项目（记录总数：${fn:length(containList)}）</h3>
    <table id="containListTable">
       	<tr>
			<th style="width: 10%" class="quan3"><a href="javascript:void(0)" class="not"></a></th>
			<th style="width: 20%">达安标准码</th>
			<th style="width: 30%">项目名称</th>
			<th style="width: 20%">英文简称</th>
			<th style="width: 20%">检验方法</th>
		</tr>
		<c:forEach items="${containList}" var="item" varStatus="status">
			<tr id="tr_${item.id}">
				<td class="cen3"><a id="checkItem_contain" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
			    <td title='<c:out value="${item.codeNo}" escapeXml="true"/>'><c:out value="${item.codeNo}" escapeXml="true"/></td>
			    <td title='<c:out value="${item.name}" escapeXml="true"/>'><c:out value="${item.name}" escapeXml="true"/></td>
			    <td title='<c:out value="${item.enShortName}" escapeXml="true"/>'><c:out value="${item.enShortName}" escapeXml="true"/></td>
			    <td title='<c:out value="${item.testMethodName}" escapeXml="true"/>'><c:out value="${item.testMethodName}" escapeXml="true"/></td>
			</tr>
		</c:forEach>
    </table>
</div>
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan6.js?var=${randomVal}"></script>
<title>抗生素列表</title>
</head>
<body>
    <table id="unContainAntiListTable">
       	<tr>
			<th style="width: 10%" class="quan6"><a href="javascript:void(0)" class="not"></a></th>
			<th style="width: 30%">编码</th>
			<th style="width: 40%">中文名称</th>
			<th style="width: 20%">英文简称</th>
		</tr>
		<c:forEach items="${unContainAntiList}" var="item" varStatus="status">
			<tr id="tr_${item.id}">
				<td class="cen6"><a id="checkItem_unContainAnti" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
			    <td title='<c:out value="${item.codeNo}" escapeXml="true"/>'><c:out value="${item.codeNo}" escapeXml="true"/></td>
			    <td title='<c:out value="${item.name}" escapeXml="true"/>'><c:out value="${item.name}" escapeXml="true"/></td>
			    <td title='<c:out value="${item.enShortName}" escapeXml="true"/>'><c:out value="${item.enShortName}" escapeXml="true"/></td>			
			</tr>
		</c:forEach>
    </table>
</body>
</html>

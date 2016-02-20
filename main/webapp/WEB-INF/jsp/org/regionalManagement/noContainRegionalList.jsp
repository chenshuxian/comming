<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan2.js?var=1.0.0.0"></script>
<title>机构信息列表</title>
</head>
<body>
            <table id="unContainListTable">
                <tr>
					<th style="width: 10%" class="quan2"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 30%">编码</th>
                    <th style="width: 30%">中文名称</th>
                    <th style="width: 30%">地区</th>
                </tr>
                <c:if test="${notContainList != null || fn:length(notContainList) != 0}">
                <c:forEach items="${notContainList }" var="notContainList">
                	<tr id="tr_notContain_${notContainList.id}">
	                    <td class="cen2"><a id="checkItem2" value="${notContainList.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td title="${notContainList.codeNo}"><c:out value="${notContainList.codeNo}" escapeXml="true"/></td>
	                    <td title="${notContainList.name}"><c:out value="${notContainList.name}" escapeXml="true"/></td>
	                    <td title="${notContainList.regionName}"><c:out value="${notContainList.regionName}" escapeXml="true"/></td>
	                </tr>
	            </c:forEach>
                </c:if>
            </table>
</body>
</html>

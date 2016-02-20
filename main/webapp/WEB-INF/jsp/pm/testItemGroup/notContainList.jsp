<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan2.js?var=1.0.0.0"></script>
<title>项目信息列表</title>
</head>
<body>
            <table id="notContainList">
                <tr>
					<th style="width: 30px;" class="quan2"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">达安标准码</th>
                    <th style="width: 10%">项目名称</th>
                    <th style="width: 10%">英文简称</th>
                    <th style="width: 8%">检验方法</th>
                    <th style="width: 10%">项目性别</th>
                    <th style="width: 0px;">性别ID</th>
                    <th style="width: 0px;">项目ID</th>
                </tr>
                <c:if test="${notContainList != null || fn:length(notContainList) != 0}">
                <c:forEach items="${notContainList }" var="notContainList">
                	<tr id="tr_notContain_${notContainList.id}">
	                    <td class="cen2"><a id="checkItem2" value="${notContainList.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td title="${notContainList.codeNo }">${notContainList.codeNo }</td>
	                    <td title="${notContainList.name }">${notContainList.name }</td>
	                    <td title="${notContainList.enShortName }">${notContainList.enShortName }</td>
	                    <td title="${notContainList.testMethodName }">${notContainList.testMethodName }</td>
	                    <td title="<c:if test="${notContainList.sexId == 3}">不限</c:if><c:if test="${notContainList.sexId == 1}">男</c:if><c:if test="${notContainList.sexId == 2}">女</c:if>">
	                    	<c:if test="${notContainList.sexId == 3}">不限</c:if><c:if test="${notContainList.sexId == 1}">男</c:if><c:if test="${notContainList.sexId == 2}">女</c:if>
	                    </td>
	                    <td>${notContainList.sexId}</td>
	                    <td>${notContainList.id}</td>
	                </tr>
	            </c:forEach>
                </c:if>
            </table>
</body>
</html>

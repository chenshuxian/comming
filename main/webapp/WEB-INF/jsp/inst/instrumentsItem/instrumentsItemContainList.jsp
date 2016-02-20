<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan.js?var=1.0.0.0"></script>
<title>项目信息列表</title>
</head>
<body>
            <h3>已包含项目</h3>
            <p align="right">(记录总数：<label id="containListNumber">${fn:length(containList)}</label>)</p>
            <table id="containList">
                <tr>
                    <th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">达安标准码</th>
                    <th style="width: 10%">项目名称</th>
                    <th style="width: 10%">英文简称</th>
                    <th style="width: 8%">检验方法</th>
                </tr>
                <c:if test="${containList != null || fn:length(containList) != 0}">
	                <c:forEach items="${containList }" var="containList">
	                <tr id="tr_contain_${containList.id }" onclick="containTr('${containList.id }');">
	                    <td class="cen1"><a id="checkItem" value="${containList.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td title="${containList.codeNo }">${containList.codeNo }</td>
	                    <td title="${containList.name }">${containList.name }</td>
	                    <td title="${containList.enShortName }">${containList.enShortName }</td>
	                    <td title="${containList.testMethodName }">${containList.testMethodName }</td>
	                </tr>
	                </c:forEach>
                </c:if>
            </table>
</body>
</html>

<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<script src="${ctx}/js/xuan.js?var=1.0.0.0"></script>
</head>
<body class="bg">
<div class="yi_c over">
    <div>
        <h3>查询列表</h3>
         <input type="hidden" id="message" name="message" value="<c:out value='${message}' escapeXml='true'/>" />
        <div class="dels">
            <table>
                <tr>
                    <th style="width: 15%">操作项目</th>
                    <th style="width: 15%">操作类型</th>
                    <th style="width: 40%">操作内容</th>
                    <th style="width: 15%">操作人</th>
                    <th style="width: 15%">操作时间</th>
                </tr>
            <c:if test="${resultList != null || fn:length(resultList) != 0}">
                <c:forEach items="${resultList}" var="item" varStatus="status">
	                <tr id="tr_${item.id}">
	                    <td title="<c:out value='${item.summary}' escapeXml='true'/>"><c:out value="${item.summary}" escapeXml="true"/></td>
	                    <td title="<c:out value='${item.functionDesc}' escapeXml='true'/>"><c:out value="${item.functionDesc}" escapeXml="true"/></td>
	                    <td title="<c:out value='${item.description}' escapeXml='true'/>"><c:out value="${item.description}" escapeXml="true"/></td>
	                    <td title="<c:out value='${item.userName}(${item.userNo})' escapeXml='true'/>"><c:out value="${item.userName}" escapeXml="true"/></td>
	                    <td title="<c:out value='${item.operateTime}' escapeXml='true'/>"><c:out value="${item.operateTime}" escapeXml="true"/></td>
	                </tr>
                </c:forEach>
             </c:if>
             <c:if test="${(resultList == null || fn:length(resultList) == 0)&&isMain!='0'}">
             <tr><td colspan="13"><span style="color: red">未查询到数据</span></td></tr>
             </c:if>
            </table>
 	        <!-- 引入分页jsp start -->
	        <%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>
	        <!-- 引入分页jsp end -->
        </div>
    </div>
</div>

</body>
</html>
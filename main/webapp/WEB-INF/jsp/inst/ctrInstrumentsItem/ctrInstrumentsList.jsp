<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

<script type="text/javascript">

</script>

</head>

<body class="bg">
	<div class="yi_c over" style="padding: 10px 0px;">
        <div style="padding: 10px 10px; border-top:1px dashed #ddd">
            <table>
                <tr>
					<th style="width: 10%">&nbsp;</th>
                    <th style="width: 20%">编码</th>
                    <th style="width: 35%">仪器名称</th>
                    <th style="width: 35%">仪器型号</th>
                </tr>
                <c:forEach items="${resultList}" var="item" varStatus="status">
	                <tr>
						<td><input type="radio" name="instrumentRadio" value="${item.id}_${item.name}"/></td>
	                    <td title="${item.codeNo}"><c:out value="${item.codeNo}" escapeXml="true"/></td>
	                    <td title="${item.name}"><c:out value="${item.name}" escapeXml="true"/></td>
	                    <td title="${item.model}"><c:out value="${item.model}" escapeXml="true"/></td>
	                </tr>
                </c:forEach>
            </table>
 	        <!-- 引入分页jsp start -->
	        <%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>
	        <!-- 引入分页jsp end -->
        </div>
	    <div class="btns">
	        <input type="button" value="确定" onclick="javascript:selectOneInstrument();" onkeydown='if(event.keyCode==13){}'>
	        <input type="button" value="取消" onclick="javascript:closeWin();">
	    </div>
   	</div>
</body>
</html>
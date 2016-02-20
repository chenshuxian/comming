<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan.js?var=1.0.0.0"></script>
<title>检验项目信息列表</title>
</head>
<body>
	<h3>检验项目信息列表</h3>
        <div class="btn">
            <a href="javascript:addOrEdit('0','add');" class="Create">添加</a>
            <a href="javascript:deleteChecked();">删除</a>
            <a href="javascript:download();">导出</a>
        </div>
        <div class="dels">
            <table id="testItemList">
                <tr>
                    <!-- <th style="width: 5%" class="quan"><input type="checkbox" id="checkboxAll" onchange="selectAll('checkboxId');" /></th> -->
                    <th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">达安标准码</th>
                    <th style="width: 10%">项目名称</th>
                    <th style="width: 10%">英文名称</th>
                    <th style="width: 10%">英文简称</th>
                    <th style="width: 5%">项目性别</th>
                    <th style="width: 8%">检验方法</th>
                    <th style="width: 8%">医学专业组</th>
                    <th style="width: 8%">默认标本类型</th>
                    <th style="width: 5%">助记符</th>
                    <th style="width: 5%">顺序号</th>
                    <th style="width: 10%">状态</th>
                    <th style="width: 10%">操作</th>
                </tr>
                <c:if test="${ctrTestItemsList != null || fn:length(ctrTestItemsList) != 0}">
                	<c:forEach var="list" items="${ctrTestItemsList}">
                	<tr id="tr_${list.id}">
                	    
<%--                 	    <td class="cen1"> -->
	                    	<input type="checkbox" id="checkboxId" name="checkboxId" value="${list.id}" />
	                    </td> --%>
                	     
                	    <td class="cen1"><a id="checkItem" value="${list.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td title="${list.codeNo}"><a href="javascript:Query('${list.id}')" class="ck">${list.codeNo}</a></td>
	                    <td title="${list.name}"><c:out value='${list.name}' escapeXml="true"/></td>
	                    <td title="${list.enName}"><c:out value='${list.enName}' escapeXml="true"/></td>
	                    <td title="${list.enShortName}"><c:out value='${list.enShortName}' escapeXml="true"/></td>
	                    <td title="<c:if test="${list.sexId == 3}">不限</c:if><c:if test="${list.sexId == 1}">男</c:if><c:if test="${list.sexId == 2}">女</c:if>">
	                    	<c:if test="${list.sexId == 3}">不限</c:if><c:if test="${list.sexId == 1}">男</c:if><c:if test="${list.sexId == 2}">女</c:if>
	                    </td>
	                    <td title="${list.testMethodName}"><c:out value='${list.testMethodName}' escapeXml="true"/></td>
	                    <td title="${list.disciplineName}"><c:out value='${list.disciplineName}' escapeXml="true"/></td>
	                    <td title="${list.sampleTypeName}"><c:out value='${list.sampleTypeName}' escapeXml="true"/></td>
	                    <td title="${list.fastCode}"><c:out value='${list.fastCode}' escapeXml="true"/></td>
	                    <td title="${list.displayOrder}"><c:out value='${list.displayOrder}' escapeXml="true"/></td>
	                    <td class="as">
	                    	<!-- 判断是否可以修改数据使用 -->
	                        <input type="hidden" value="${list.status}" id="status_${list.id}"/> 
	                        <div id="disavle_${list.id}" <c:if test="${list.status == 0 }"> style="display: none;" </c:if>>
		                        <span style="color: #E0E0E0;">启用</span>
		                    	<a href="javascript:disavleOrUsing('${list.id}','0');"><span>停用</span></a>
	                    	</div>
	                        <div id="using_${list.id}" <c:if test="${list.status == 1 }"> style="display: none;" </c:if>>
		                        <a href="javascript:disavleOrUsing('${list.id}','1');"><span>启用</span></a>
		                    	<span style="color: #E0E0E0;">停用</span>
	                    	</div>
	                    </td>
	                    <td class="as"><a href="javascript:addOrEdit('${list.id}','edit');" class="sb">修改</a><a href="javascript:del('${list.id}');">删除</a></td>
                	</tr>
                	</c:forEach>
                </c:if>
                <c:if test="${ctrTestItemsList == null || fn:length(ctrTestItemsList) == 0}">
                <tr><td colspan="13"><span style="color: red">未查询到数据</span></td></tr>
                </c:if>
            </table>
	        <!-- 引入分页jsp start -->
	        <%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>
	        <!-- 引入分页jsp end -->
         </div>
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan.js?var=1.0.0.1"></script>
<script type="text/javascript">
$(document).ready(function(){
	//加载的时候默认选择第一行
	//$("#tableId").find("tr:first").click();
	$("#manageList").find("tr:eq(1)").click();
});
</script>
<title>管理机构列表</title>
</head>
<body>
	<h3>管理机构列表</h3>
        <div class="btn">
            <a href="javascript:showInfo('','add');" class="Create">添加</a>
            <a href="javascript:deleteBatch();">删除</a>
<%--             <p align="right">记录总行数：${fn:length(ctrTestItemGroups)}</p> --%>
            <input type="hidden" id="centerOrgNumber" value="${fn:length(resultList)}"/>
        </div>
        <div class="dels" >
            <table id="manageList">
                <tr>
                    <!-- <th style="width: 5%" class="quan"><input type="checkbox" id="checkboxAll" onchange="selectAll('checkboxId');" /></th> -->
                    <th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">编码</th>
                    <th style="width: 15%">中文名称</th>
                    <th style="width: 30%">中文地址</th>
                    <th style="width: 10%">联系人</th>
                    <th style="width: 10%">联系电话</th>
                    <th style="width: 10%">状态</th>
                    <th style="width: 10%">操作</th>
                </tr>
                 <c:if test="${resultList != null || fn:length(resultList) != 0}">
                 <c:forEach items="${resultList}" var="item" varStatus="status">
	                <tr id="tr_${item.id}" onclick="changeTr('${item.id}');">
                	    <td class="cen1"><a id="checkItem" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td><a href="javascript:showInfo('${item.id}','view');" class="sc" title="${item.codeNo}">${item.codeNo}</a></td>
	                    <td title="${item.name}"><c:out value="${item.name}" escapeXml="true"/></td>
	                    <td title="${item.address}"><c:out value="${item.address}" escapeXml="true"/></td>
	                    <td title="${item.contacts}"><c:out value="${item.contacts}" escapeXml="true"/></td>
	                    <td title="${item.telephone}"><c:out value="${item.telephone}" escapeXml="true"/></td>
	                    <td class="as">
	                       <div id="disavle_${item.id}" <c:if test="${item.status == 0 }"> style="display: none;" </c:if>>
		                        <span style="color: #E0E0E0;">启用</span>
		                    	<a href="javascript:disableOrEnable('${item.id}', '${status.index }', 'Disable');"><span>停用</span></a>
	                    	</div>
	                        <div id="using_${item.id}" <c:if test="${item.status == 1}"> style="display: none;" </c:if>>
		                        <a href="javascript:disableOrEnable('${item.id}', '${status.index }', 'Enable');"><span>启用</span></a>
		                    	<span style="color: #E0E0E0;">停用</span>
	                    	</div>
	                    </td>
	                    <td class="as">
	                    <a href="javascript:showInfo('${item.id}','edit','${item.status}');" class="sb">修改</a>
	                    <a href="javascript:deleteIt('${item.id}');">删除</a></td>
	                    <td id="status_${item.id}" style="display:none">${item.status}</td>
                	    <td style="display:none"><input type="hidden" id="orgTypeId" name="orgTypeId" value="${item.orgTypeId}" /></td>
                	</tr>
                	</c:forEach>
                </c:if>
                <c:if test="${resultList == null || fn:length(resultList) == 0}">
                <tr><td colspan="8"><span style="color: red">未查询到数据</span></td></tr>
                </c:if>
            </table>
            <!-- 引入分页jsp start -->
	        <%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>
	        <!-- 引入分页jsp end -->
         </div>
</body>
</html>


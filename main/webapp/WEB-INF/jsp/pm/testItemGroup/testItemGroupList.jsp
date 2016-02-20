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
	$("#testItemGroupList").find("tr:eq(1)").click();
});
</script>
<title>组合项目信息列表</title>
</head>
<body>
	<h3>组合项目列表</h3>
        <div class="btn">
            <a href="javascript:addOrEdit('0','add');" class="Create">添加</a>
            <a href="javascript:deleteCheckedAll();">删除</a>
            <p align="right">记录总行数：${fn:length(ctrTestItemGroups)}</p>
            <input type="hidden" id="ctrTestItemGroupsNumber" value="${fn:length(ctrTestItemGroups)}"/>
        </div>
        <div class="dels" style="height:170px;overflow-y:auto; ">
            <table id="testItemGroupList">
                <tr>
                    <!-- <th style="width: 5%" class="quan"><input type="checkbox" id="checkboxAll" onchange="selectAll('checkboxId');" /></th> -->
                    <th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">编码</th>
                    <th style="width: 10%">中文名称</th>
                    <th style="width: 10%">英文简称</th>
                    <th style="width: 10%">英文名称</th>
                    <th style="width: 8%">默认标本类型</th>
                    <th style="width: 5%">助记符</th>
                    <th style="width: 5%">顺序号</th>
                    <th style="width: 10%">状态</th>
                    <th style="width: 10%">操作</th>
                </tr>
                <c:if test="${ctrTestItemGroups != null || fn:length(ctrTestItemGroups) != 0}">
                	<c:forEach var="list" items="${ctrTestItemGroups}">
                	<tr id="tr_${list.id}" onclick="changeTr('${list.id}');">
                	    <td class="cen1"><a id="checkItem" value="${list.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td title="${list.codeNo}"><a href="javascript:Query('${list.id}')" class="ck">${list.codeNo}</a></td>
	                    <td title="${list.name}">${list.name}</td>
	                    <td title="${list.enShortName}">${list.enShortName}</td>
	                    <td title="${list.enName}">${list.enName}</td>
	                    <td title="${list.sampleTypeName}">${list.sampleTypeName}</td>
	                    <td title="${list.fastCode}">${list.fastCode}</td>
	                    <td title="${list.displayOrder}">${list.displayOrder}</td>
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
                <c:if test="${ctrTestItemGroups == null || fn:length(ctrTestItemGroups) == 0}">
                <tr><td colspan="10"><span style="color: red">未查询到数据</span></td></tr>
                </c:if>
            </table>
         </div>
</body>
</html>


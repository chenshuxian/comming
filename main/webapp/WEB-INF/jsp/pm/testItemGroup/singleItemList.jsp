<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/xuan.js?var=1.0.0.0"></script>
<title>项目信息列表</title>
</head>
<body>
	<h3>已包含项目列表</h3>
        <div class="btn">
            <a href="javascript:addSingleItmeShow();" class="Create">添加项目</a>
            <a href="javascript:delSingleItemBatch();">删除</a>
            <p align="right">记录总行数：${fn:length(containList)}</p>
        </div>
        <div class="dels" style="height:170px;overflow-y:auto; ">
            <input type="hidden" id="testItemGroupId" name="testItemGroupId" value="${testItemId}"/>
            <table id="singleItemList">
                <tr>
                    <th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">达安标准码</th>
                    <th style="width: 10%">项目名称</th>
                    <th style="width: 10%">英文简称</th>
                    <th style="width: 8%">检验方法</th>
                    <th style="width: 10%">操作</th>
                </tr>
                <c:if test="${containList != null || fn:length(containList) != 0}">
                	<c:forEach var="list" items="${containList}">
                	<tr id="tr_${list.id}">
                	    
                	   <!--  <td class="cen1"> 
	                    	<input type="checkbox" id="checkboxId" name="checkboxId" value="${list.id}" />
	                    </td>  -->
                	     
                	    <td class="cen1"><a id="checkItem" value="${list.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td title="${list.codeNo}">${list.codeNo}</td>
	                    <td title="${list.name}">${list.name}</td>
	                    <td title="${list.enShortName}">${list.enShortName}</td>
	                    <td title="${list.testMethodName}">${list.testMethodName}</td>
	                    <td class="as"><a href="javascript:delSingleItem('${list.id}');">删除</a></td>
                	</tr>
                	</c:forEach>
                </c:if>
                <c:if test="${containList == null || fn:length(containList) == 0}">
                <tr><td colspan="6"><span style="color: red">未查询到数据</span></td></tr>
                </c:if>
            </table>
         </div>
</body>
</html>

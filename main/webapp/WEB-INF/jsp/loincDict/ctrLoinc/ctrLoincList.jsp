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
        <h3>LOINC编码表列表</h3>
        <div class="btn">
            <a href="javascript:showInfo('','add');" class="tianjia">添加</a>
            <a href="javascript:deleteBatch();">删除</a>
        </div>
        <div class="dels">
            <table>
                <tr>
<!--                <th style="width: 5%" class="quan"><input type="checkbox" id="selectAllBox" name="selectAllBox" onclick="selectAll();"></th> -->
					<th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 8%">编码</th>
                    <th style="width: 8%">受检成份</th>
                    <th style="width: 8%">受检属性</th>
                    <th style="width: 8%">检验方法</th>
                    <th style="width: 8%">样本标识</th>
                    <th style="width: 8%">时间特征</th>
                    <th style="width: 8%">标本类型</th>
                    <th style="width: 7%">助记符</th>
                    <th style="width: 6%">顺序号</th>
                    <th style="width: 8%">备注</th>
                    <th style="width: 8%">状态</th>
                    <th style="width: 8%">操作</th>
                </tr>
                <c:if test="${resultList != null || fn:length(resultList) != 0}">
                <c:forEach items="${resultList}" var="item" varStatus="status">
	                <tr id="tr_${item.id}">
						<td class="cen1"><a id="checkItem" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td><a href="javascript:showInfo('${item.id}','view');" class="sc" title="${item.codeNo}"><c:out value="${item.codeNo}" escapeXml="true"/></a></td>
	                    <td title="${item.componentName}"><c:out value="${item.componentName}" escapeXml="true"/></td> 
	                    <td title="${item.testPropertyName}"><c:out value="${item.testPropertyName}" escapeXml="true"/></td> 
	                    <td title="${item.testMethodName}"><c:out value="${item.testMethodName}" escapeXml="true"/></td>
	                    <td title="${item.typeOfScaleName}"><c:out value="${item.typeOfScaleName}" escapeXml="true"/></td>
	                    <td title="${item.timeAspectName}"><c:out value="${item.timeAspectName}" escapeXml="true"/></td>
	                    <td title="${item.sampleTypeName}"><c:out value="${item.sampleTypeName}" escapeXml="true"/></td>
	                    <td title="${item.fastCode}"><c:out value="${item.fastCode}" escapeXml="true"/></td>
	                    <td title="${item.displayOrder}"><c:out value="${item.displayOrder}" escapeXml="true"/></td>
	                    <td title="${item.memo}"><c:out value="" escapeXml="true"/><c:out value="${item.memo}" escapeXml="true"/></td>
	                    <td class="as">
	                    	<c:if test='${item.status==1}'>
	                    		<span id="l_enable_${status.index }" style="color: #E0E0E0;">启用</span>
	                    		<a id="a_disable_${status.index }" href="javascript:disableIt('${item.id}', '${status.index }');">停用</a>
	                    	</c:if>
	                    	<c:if test='${item.status==0}'>
	                    		<a id="a_enable_${status.index }" href="javascript:enableIt('${item.id}', '${status.index }');">启用</a>
	                    		<span id="l_disable_${status.index }" style="color: #E0E0E0;">停用</span>
	                    	</c:if>
	                    </td>
	                    <td class="as"><a href="javascript:showInfo('${item.id}','edit');" class="sb">修改</a><a href="javascript:deleteIt('${item.id}');">删除</a></td>
	                	<td style="display:none">${item.status}</td>
	                	<td style="display:none">${item.codeNo}</td>
	                </tr>
                </c:forEach>
                </c:if>
                <c:if test="${resultList == null || fn:length(resultList) == 0}">
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
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<script src="${ctx}/js/xuan.js?var=1.0.0.0"></script>
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

</head>

<body class="bg">
<div class="yi_c over">
    <div>
        <h3>仪器信息列表</h3>
        <div class="btn">
            <a href="javascript:showInfo('','add');" class="tianjia">添加</a>
            <a href="javascript:deleteBatch();">删除</a>
        </div>
        <div class="dels">
            <table>
                <tr>
<!--                     <th style="width: 5%" class="quan"><input type="checkbox" id="selectAllBox" name="selectAllBox" onclick="selectAll();"></th> -->
					<th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 8%">编码</th>
                    <th style="width: 13%">仪器名称</th>
                    <th style="width: 13%">仪器型号</th>
                    <th style="width: 15%">单列报告模板</th>
                    <th style="width: 8%">默认标本类型</th>
                    <th style="width: 8%">顺序号</th>
                    <th style="width: 8%">仪器类型</th>
                    <th style="width: 6%">通讯参数</th>
                    <th style="width: 8%">状态</th>
                    <th style="width: 8%">操作</th>
                </tr>
                <c:forEach items="${resultList}" var="item" varStatus="status">
	                <tr id="tr_${item.id}">
<%-- 	                    <td class="cen1"><input type="checkbox" id="checkItem" id="checkItem" value="${item.id}" /></td> --%>
						<td class="cen1"><a id="checkItem" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td><a href="javascript:showInfo('${item.id}','view');" class="sc" title="${item.codeNo}">${item.codeNo}</a></td>
	                    <td title="${item.name}"><c:out value="${item.name}" escapeXml="true"/></td>
	                    <td title="${item.model}"><c:out value="${item.model}" escapeXml="true"/></td>
	                    <td title="${item.reportTemplateName}"><a href="javascript:void(0)">${item.reportTemplateName}</a></td>
	                    <td title="${item.sampleTypeName}">${item.sampleTypeName}</td>
	                    <td title="${item.displayOrder}">${item.displayOrder}</td>
	                    <c:if test='${item.typeId==0}'>
	                    	<td title="常规">常规</td>
						</c:if>
	                    <c:if test='${item.typeId==1}'>
	                    	<td title="微生物">微生物</td>
						</c:if>
	                    <c:if test='${item.typeId==2}'>
	                    	<td title="文字报告">文字报告</td>
						</c:if>
	                    <c:if test='${item.typeId==3}'>
	                    	<td title="酶标">酶标</td>
						</c:if>
	                    <td><a href="javascript:showParamsInfo('${item.id}');" class="sb">修改</a></td>
	                    <td class="as">
	                    	<!-- 判断是否可以修改数据使用 -->
	                        <input type="hidden" value="${item.status}" id="status_${item.id}"/> 
	                    	<c:if test='${item.status==1}'>
	                    		<span id="l_enable_${status.index }" style="color: #E0E0E0;">启用</span>
	                    		<a id="a_disable_${status.index }" href="javascript:disableIt('${item.id}', '${status.index }');">停用</a>
	                    	</c:if>
	                    	<c:if test='${item.status==0}'>
	                    		<a id="a_enable_${status.index }" href="javascript:enableIt('${item.id}', '${status.index }','${item.sampleTypeName}');">启用</a>
	                    		<span id="l_disable_${status.index }" style="color: #E0E0E0;">停用</span>
	                    	</c:if>
	                    </td>
	                    <td class="as"><a href="javascript:showInfo('${item.id}','edit');" class="sb">修改</a><a href="javascript:deleteIt('${item.id}');">删除</a></td>
	                </tr>
                </c:forEach>
            </table>
 	        <!-- 引入分页jsp start -->
	        <%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>
	        <!-- 引入分页jsp end -->
        </div>
    </div>
</div>

</body>
</html>
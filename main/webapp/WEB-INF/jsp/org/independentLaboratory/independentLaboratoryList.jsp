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
        <h3>独立实验室维护列表</h3>
        <div class="btn">
            <a href="javascript:showInfo('','add');" class="tianjia">添加</a>
            <a href="javascript:deleteBatch();">删除</a>
        </div>
        <div class="dels">
            <table>
                <tr>
					<th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 8%">编码</th>
                    <th style="width: 10%">所属地区</th>
                    <th style="width: 10%">中文名称</th>
                    <th style="width: 21%">中文地址</th>
                    <th style="width: 8%">联系人</th>
                    <th style="width: 8%">联系电话</th>
                    <th style="width: 8%">助记符</th>
                    <th style="width: 6%">顺序号</th>
                    <th style="width: 8%">状态</th>
                    <th style="width: 8%">操作</th>
                </tr>
             <c:if test="${resultList != null || fn:length(resultList) != 0}">
                <c:forEach items="${resultList}" var="item" varStatus="status">
	                <tr id="tr_${item.id}">
						<td class="cen1"><a id="checkItem" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td><a href="javascript:showInfo('${item.id}','view');" class="sc" title="${item.codeNo}">${item.codeNo}</a></td>
	                    <td title="${item.regionName}"><c:out value="${item.regionName}" escapeXml="true"/></td>
	                    <td title="${item.name}"><c:out value="${item.name}" escapeXml="true"/></td>
	                    <td title="${item.address}"><c:out value="${item.address}" escapeXml="true"/></td>
	                    <td title="${item.contacts}"><c:out value="${item.contacts}" escapeXml="true"/></td>
	                    <td title="${item.telephone}"><c:out value="${item.telephone}" escapeXml="true"/></td>
	                    <td title="${item.fastCode}"><c:out value="${item.fastCode}" escapeXml="true"/></td>
	                    <td title="${item.displayOrder}"><c:out value="${item.displayOrder}" escapeXml="true"/></td>
	                    <td class="as">
	                    	<c:if test='${item.status==1}'>
	                    		<span id="l_enable_${status.index }" style="color: #E0E0E0;">启用</span>
	                    		<a id="a_disable_${status.index }" href="javascript:disableOrEnable('${item.id}', '${status.index }', 'Disable');">停用</a>
	                    	</c:if>
	                    	<c:if test='${item.status==0}'>
	                    		<a id="a_enable_${status.index }" href="javascript:disableOrEnable('${item.id}', '${status.index }', 'Enable');">启用</a>
	                    		<span id="l_disable_${status.index }" style="color: #E0E0E0;">停用</span>
	                    	</c:if>
	                    </td>
	                    <td class="as">
	                      <a href="javascript:showInfo('${item.id}','edit','${item.status}');" class="sb">修改</a>
	                      <a href="javascript:deleteIt('${item.id}');">删除</a></td>
	                      <td style="display:none"><input type="hidden" id="orgTypeId" name="orgTypeId" value="${item.orgTypeId}" /></td>
	                      <td style="display:none">${item.status}</td>
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
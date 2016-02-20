<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<script src="${ctx}/js/xuan.js?var=1.0.0.2"></script>
<head lang="en">
</head>
<body class="bg">
	<div class="yi_c over">
		<div>
			<div class="btn">
				<h3 style="float:left">结果类型列表</h3>
					<a href="javascript:showInfo('','add');" class="tianjia">添加</a> 
					<a href="javascript:deleteResultTypeBatch();">删除</a>				
					<p align="right">记录总行数：${fn:length(resultList)}</p>
			</div>
			<div class="dels" style="height:255px;overflow-y:auto; ">
				<table id="listTable">
					<tr style="position: relative; top:expression(this.offsetParent.scrollTop-2);">
						<th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
						<th style="width: 10%">编码</th>
						<th style="width: 45%">中文名称</th>
						<th style="width: 10%">顺序号</th>
						<th style="width: 10%">状态</th>
						<th style="width: 20%">操作</th>
					</tr>
					<c:if test="${resultList == null || fn:length(resultList) == 0}">
			        	<tr><td colspan="6"><span style="color: red">未查询到数据</span></td></tr>
			        </c:if>
					<c:forEach items="${resultList}" var="resultType" varStatus="status">
						<tr id="tr_${resultType.id}" onclick="pageQuery2('${resultType.id}', 0);">
							<td class="cen1">
								<a id="checkItem" value="${resultType.id}" href="javascript:void(0)" class="not"></a>
							</td>
							<td><a href="javascript:showInfo('${resultType.id}', 'view', '${resultType.status}');"  class="sc" title="${resultType.codeNo}"><c:out value="${resultType.codeNo}" escapeXml="true" /></a> </td>
							<td title="${resultType.name}"><c:out value="${resultType.name}" escapeXml="true" /></td>
							<td title="${resultType.displayOrder}"><c:out value="${resultType.displayOrder}" escapeXml="true" /></td>
							<td class="as">
								<c:if test='${resultType.status==1}'>
									<span id="l_enable_${status.index }" style="color: #E0E0E0;">启用</span>
		                    		<a id="a_disable_${status.index }" href="javascript:disableOrEnable('${resultType.id}', '${status.index }', 'Disable');">停用</a>
								</c:if> 
								<c:if test='${resultType.status==0}'>
									<a id="a_enable_${status.index }" href="javascript:disableOrEnable('${resultType.id}', '${status.index }', 'Enable');">启用</a>
	                    			<span id="l_disable_${status.index }" style="color: #E0E0E0;">停用</span>
								</c:if>
							</td>
							<td class="as">
								<a href="javascript:showInfo('${resultType.id}', 'edit', '${resultType.status}');" class="sb">修改</a>
								<a href="javascript:deleteResultType('${resultType.id}');">删除</a>
							</td>
							<td style="display:none">${resultType.status}</td>
							<td style="display:none">${resultType.id}</td>
						</tr>
					</c:forEach>
				</table>
				<!-- 引入分页jsp start -->
<%-- 				<%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>
 --%>				<!-- 引入分页jsp end -->
			</div>
		</div>
	</div>
</body>
</html>
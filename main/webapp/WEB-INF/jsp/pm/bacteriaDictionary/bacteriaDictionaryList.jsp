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
			<h3>细菌字典列表</h3>
			<div class="btn">
				<a href="javascript:showInfo('','add');" class="tianjia">添加</a> 
				<a href="javascript:deleteDictCodeBatch();">删除</a>
			</div>
			<div class="dels">
				<table id="listTable">
					<tr>
						<th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
						<th style="width: 8%">编码</th>
						<th style="width: 15%">中文名称</th>
						<th style="width: 10%">英文简称</th>
						<th style="width: 10%">英文名称</th>
						<th style="width: 8%">WHONET编码</th>
						<th style="width: 8%">助记符</th>
						<th style="width: 5%">顺序号</th>
						<th style="width: 15%">备注</th>
						<th style="width: 8%">状态</th>
						<th style="width: 8%">操作</th>
					</tr>
					<c:forEach items="${resultList}" var="dictCode" varStatus="status">
						<tr id="tr_${dictCode.id}">
							<td class="cen1">
								<a id="checkItem" value="${dictCode.id}" href="javascript:void(0)" class="not"></a>
							</td>
							<td>
								<a href="javascript:showInfo('${dictCode.id}','view');" class="sc" title="${dictCode.codeNo}"><c:out value="${dictCode.codeNo}" escapeXml="true" /></a>
							</td>
							<td title="<c:out value="${dictCode.name}" escapeXml="true" />"><c:out value="${dictCode.name}" escapeXml="true" /></td>
							<td title="<c:out value="${dictCode.enShortName}" escapeXml="true" />"><c:out value="${dictCode.enShortName}" escapeXml="true" /></td>
							<td title="<c:out value="${dictCode.enName}" escapeXml="true" />"><c:out value="${dictCode.enName}" escapeXml="true" /></td>
							<td title="<c:out value="${dictCode.whonetCode}" escapeXml="true" />"><c:out value="${dictCode.whonetCode}" escapeXml="true" /></td>
							<td title="<c:out value="${dictCode.fastCode}" escapeXml="true" />"><c:out value="${dictCode.fastCode}" escapeXml="true" /></td>
							<td title="<c:out value="${dictCode.displayOrder}" escapeXml="true" />"><c:out value="${dictCode.displayOrder}" escapeXml="true" /></td>
							<td title="<c:out value="${dictCode.memo}" escapeXml="true" />"><c:out value="${dictCode.memo}" escapeXml="true" /></td>
							<td class="as">
								<c:if test='${dictCode.status==1}'>
									<span id="l_enable_${status.index }" style="color: #E0E0E0;">启用</span>
		                    		<a id="a_disable_${status.index }" href="javascript:disableOrEnable('${dictCode.id}', '${status.index }', 'Disable');">停用</a>
								</c:if> 
								<c:if test='${dictCode.status==0}'>
									<a id="a_enable_${status.index }" href="javascript:disableOrEnable('${dictCode.id}', '${status.index }', 'Enable');">启用</a>
	                    			<span id="l_disable_${status.index }" style="color: #E0E0E0;">停用</span>
								</c:if>
							</td>
							<td class="as">
								<a href="javascript:showInfo('${dictCode.id}', 'edit', '${dictCode.status}');" class="sb">修改</a>
								<a href="javascript:deleteDictCode('${dictCode.id}');">删除</a>
							</td>
							<td style="display:none">${dictCode.status}</td>
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
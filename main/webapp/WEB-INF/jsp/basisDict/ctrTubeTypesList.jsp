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
			<h3>试管类型列表</h3>
			<div class="btn">
				<a href="javascript:showInfo('','add');" class="tianjia">添加</a> 
				<a href="javascript:deleteTubeTypeBatch();">删除</a>
			</div>
			<div class="dels">
				<table id="listTable">
					<tr>
						<th style="width: 5%" class="quan"><a href="javascript:void(0)" class="not"></a></th>
						<th style="width: 8%">编码</th>
						<th style="width: 13%">中文名称</th>
						<th style="width: 13%">英文简称</th>
						<th style="width: 15%">英文名称</th>
						<th style="width: 8%">助记符</th>
						<th style="width: 8%">顺序号</th>
						<th style="width: 8%">备注</th>
						<th style="width: 8%">状态</th>
						<th style="width: 8%">操作</th>
					</tr>
					<c:if test="${resultList == null || fn:length(resultList) == 0}">
			        	<tr><td colspan="10"><span style="color: red">未查询到数据</span></td></tr>
			        </c:if>
					<c:forEach items="${resultList}" var="tubeType" varStatus="status">
						<tr id="tr_${tubeType.id}">
							<td class="cen1">
								<a id="checkItem" value="${tubeType.id}"  href="javascript:void(0)" class="not"></a>
							</td>
							<td>
								<a href="javascript:showInfo('${tubeType.id}','view');" class="sc" title="${tubeType.codeNo}"><c:out value="${tubeType.codeNo}" escapeXml="true" /></a>
							</td>
							<td title="${tubeType.name}"><c:out value="${tubeType.name}" escapeXml="true" /></td>
							<td title="${tubeType.enShortName}"><c:out value="${tubeType.enShortName}" escapeXml="true" /></td>
							<td title="${tubeType.enName}"><c:out value="${tubeType.enName}" escapeXml="true" /></td>
							<td title="${tubeType.fastCode}"><c:out value="${tubeType.fastCode}" escapeXml="true" /></td>
							<td title="${tubeType.displayOrder}"><c:out value="${tubeType.displayOrder}" escapeXml="true" /></td>
							<td title="${tubeType.memo}"><c:out value="${tubeType.memo}" escapeXml="true" /></td>
							<td class="as">
								<c:if test='${tubeType.status==1}'>
									<span id="l_enable_${status.index }" style="color: #E0E0E0;">启用</span>
		                    		<a id="a_disable_${status.index }" href="javascript:disableOrEnable('${tubeType.id}', '${status.index }', 'Disable');">停用</a>
								</c:if> 
								<c:if test='${tubeType.status==0}'>
									<a id="a_enable_${status.index }" href="javascript:disableOrEnable('${tubeType.id}', '${status.index }', 'Enable');">启用</a>
	                    			<span id="l_disable_${status.index }" style="color: #E0E0E0;">停用</span>
								</c:if>
							</td>
							<td class="as">
								<a href="javascript:showInfo('${tubeType.id}', 'edit', '${tubeType.status}');" class="sb">修改</a>
								<a href="javascript:deleteTubeType('${tubeType.id}');">删除</a>
							</td>
							<td style="display:none">${tubeType.status}</td>
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
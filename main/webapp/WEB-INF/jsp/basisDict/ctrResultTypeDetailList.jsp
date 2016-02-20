<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<script src="${ctx}/js/xuan2.js?var=1.0.0.3"></script>
</head>
<body class="bg">
	<div class="yi_c over">
		<div>
			<div class="btn">
				<h3 style="float:left">结果描述列表</h3>
					<a href="javascript:detailShowInfo('','add');" class="tianjia">添加</a> 
					<a href="javascript:deleteResultTypeDetailBatch();">删除</a>
					<input type="hidden" id="typeId" name="typeId" value="${typeId}" />					
					<p align="right">记录总行数：${fn:length(resultList)}</p>
			</div>
			<div class="dels" style="height:190px; overflow-y:scroll;">
				<table id="detailListTable">
					<tr>
						<th style="width: 5%" class="quan2"><a href="javascript:void(0)" class="not"></a></th>
						<th style="width: 45%">结果描述</th>
						<th style="width: 10%">顺序号</th>
						<th style="width: 10%">助记符</th>
						<th style="width: 20%">操作</th>
					</tr>
					<c:if test="${resultList == null || fn:length(resultList) == 0}">
			        	<tr><td colspan="5"><span style="color: red">未查询到数据</span></td></tr>
			        </c:if>
					<c:forEach items="${resultList}" var="resultTypeDetail" varStatus="status">
						<tr id="tr_${resultTypeDetail.id}">
							<td class="cen2">
								<a id="checkDetailItem" value="${resultTypeDetail.id}" href="javascript:void(0)" class="not"></a>
							</td>
							<td title="${resultTypeDetail.resultValue}"><c:out value="${resultTypeDetail.resultValue}" escapeXml="true" /></td>
							<td title="${resultTypeDetail.displayOrder}"><c:out value="${resultTypeDetail.displayOrder}" escapeXml="true" /></td>
							<td title="${resultTypeDetail.fastCode}"><c:out value="${resultTypeDetail.fastCode}" escapeXml="true" /></td>
							<td class="as">
								<a href="javascript:detailShowInfo('${resultTypeDetail.id}', 'edit');" class="sb">修改</a>
								<a href="javascript:deleteResultTypeDetail('${resultTypeDetail.id}');">删除</a>
							</td>
						</tr>
					</c:forEach>
				</table>
				<!-- 引入分页jsp start -->
				<%-- <%@ include file="/WEB-INF/jsp/common/listPage_2.jsp"%> --%>
				<!-- 引入分页jsp end -->
			</div>
		</div>
	</div>
</body>
</html>
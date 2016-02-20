<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/pm/bacteriaDictionary.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${bd}MainContentContainer">
	<div class="main-content-header">
		<div class="flex-container flex-space-between">
			<div class="search flex-container  flex-space-between">
				<div class="form-control-icon icon-right">
					<input type="text" id="${bd}SearchStr" class="form-control" placeholder="搜索内容..."/>
					<button class="control-icon text-center" id="${bd}SearchBtn">
						<i class="icon icon-search"></i>
					</button>
				</div>
				<span class="symbol"></span> <span>状态:</span>

				<div class="drop-down">
					<div class="drop-down-selected">
						<span class="selected-items" id="${bd}StatusSpan">所有</span><i class="icon icon-angle-down"></i>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled ${bd}-status-selector">
							<c:forEach items="${isAbleList}" var="isAble">
								<li <c:if test="${isAble.index == 2}">selected="selected" el-value=""</c:if>
									<c:if test="${isAble.index != 2}">selected="selected" el-value="${isAble.index}"</c:if> >${isAble.text}</li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
			<div class="option icon-group-inline ">
				<div class="drop-down drop-down-icon">
					<div class="drop-down-selected">
						<i class="icon icon-sort"></i><span class="selected-items" id="${bd}SortSpan">排序</span>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled ${bd}-sort-selector">
							<li class="selected" el-value="0">按顺序号升序</li>
							<li el-value="1">按名称升序</li>
							<li el-value="2">按录入顺序降序</li>
						</ul>
					</div>
				</div>

				<span class="symbol">|</span>

				<span id="${bd}AddType"><i class="icon icon-plus-square"></i>添加</span>
				<span id="${bd}DeleteTypeBatch"><i class="icon icon-trash"></i>删除选中</span>
			</div>
		</div>
	</div>

	<div class="main-content-body">
		<table id="${bd}TypeList"></table>
	</div>

	<input type="hidden" id="${bd}Status"/>
	<input type="hidden" id="${bd}Sort"/>
	<input type="hidden" id="${bd}ItemTypeId" name="itemTypeId" value="${itemTypeId}" />
	<input type="hidden" id="bacteriaDictionaryPreId" value="${bd}" />

</div>

<%--<!DOCTYPE html>--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>--%>
<%--<html xmlns="http://www.w3.org/1999/xhtml">--%>
<%--<head lang="en">--%>
<%--<meta http-equiv="content-type" content="text/html; charset=UTF-8">--%>
<%--<script src="${ctx}/scripts/jalert/jquery.ui.draggable.js"></script>--%>
<%--<script src="${ctx}/scripts/jalert/jquery.alerts.js"></script>--%>
<%--<script src="${ctx}/js/pm/bacteriaDictionary.js?var=${randomVal}"></script>--%>
<%--<script type="text/javascript">--%>
	<%--$(document).ready(function() {--%>
		<%--pageQuery();--%>
		<%--$("#searchStr").focus();--%>
		<%--// 添加下拉框事件--%>
		<%--/* $(".sc").click(function() {--%>
			<%--pageQuery();--%>
		<%--}); */--%>
	<%--});--%>
<%--</script>--%>
<%--<title>中心微生物-细菌字典</title>--%>
<%--</head>--%>
<%--<body class="bg">--%>
	<%--<div class="search over">--%>
		<%--<div class="over">--%>
			<%--<h3>查询条件</h3>--%>
			<%--<form id="rslForm">--%>
				<%--<input type="hidden" id="itemTypeId" name="itemTypeId" value="${itemTypeId}" />--%>
				<%--<div>--%>
					<%--<input type="text" id="searchStr" name="searchStr" placeholder="搜索内容..."><input type="button" value="搜索" onclick="pageQuery('init');" />--%>
				<%--</div>--%>
				<%--<div class="sc">--%>
					<%--<span>状态</span>--%>
					<%--<div class="selectstyle">--%>
						<%--<select id="status" name="status" class = 'select_box' onchange="javascript:pageQuery('init');">--%>
							<%--<option value="" selected>全部</option>--%>
							<%--<option value="1">可用</option>--%>
							<%--<option value="0">停用</option>--%>
						<%--</select>--%>
					<%--</div>--%>
					<%--<span>排序</span>--%>
					<%--<div class="selectstyle">--%>
						<%--<select id="sort" name="sort" class = 'select_box' onchange="javascript:pageQuery('init');">--%>
							<%--<option value="0" selected>按顺序号升序</option>--%>
							<%--<option value="1">按名称升序</option>--%>
							<%--<option value="2">按录入顺序降序</option>--%>
						<%--</select>--%>
					<%--</div>--%>
				<%--</div>--%>
			<%--</form>--%>
		<%--</div>--%>
	<%--</div>--%>
	<%--<div id="infoViewDiv" class="xinxi"></div>--%>
	<%--<div id="infoPageDiv" style="display: none;"></div>--%>
	<%--<div class="footer">--%>
		<%--<div></div>--%>
	<%--</div>--%>
<%--</body>--%>
<%--</html>--%>
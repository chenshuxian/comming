<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/basisDict/resultType.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${rt}MainContentContainer">
	<div class="flex-container layout-vertical main-content-top">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container  flex-space-between">
					<div class="form-control-icon icon-right">
						<input type="text" id="${rt}SearchStr" class="form-control searchWidth" style="width:250px;" placeholder=""/>
						<button class="control-icon text-center" id="${rt}SearchBtn">
							<i class="icon icon-search"></i>
						</button>
					</div>
					<span class="symbol"></span> <span>状态:</span>

					<div class="drop-down">
						<div class="drop-down-selected">
							<span class="selected-items" id="${rt}StatusSpan">所有</span><i class="fa fa-angle-down "></i>
						</div>
						<div class="drop-down-menu">
							<ul class="list-unstyled ${rt}-status-selector">
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
							<i class="icon icon-sort"></i><span class="selected-items" id="${rt}SortSpan">排序</span>
						</div>
						<div class="drop-down-menu">
							<ul class="list-unstyled ${rt}-sort-selector">
								<li class="selected" el-value="0">按顺序号升序</li>
								<li el-value="1">按名称升序</li>
								<li el-value="2">按录入顺序降序</li>
							</ul>
						</div>
					</div>

					<span class="symbol">|</span>

					<span id="${rt}Add"><i class="icon icon-plus-square"></i>添加</span>
					<span id="${rt}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
				</div>
			</div>
		</div>

		<div class="main-content-body">
			<table id="${rt}List"></table>
		</div>
	</div>
	<div class="line sm-size"></div>
	<div class="flex-container layout-vertical main-content-bottom">
		<div class="main-content-header">
			<div class="flex-container flex-space-between" style="float: right">
				<div class="option icon-group-inline ">
					<span id="${rt}AddResultDesc"><i class="icon icon-plus-square"></i>添加</span>
					<span id="${rt}DeleteResultDescBatch"><i class="icon icon-trash"></i>删除选中</span>
				</div>
			</div>
		</div>

		<div class="main-content-body">
			<table id="${rt}List2"></table>
		</div>
	</div>

	<input type="hidden" id="${rt}Status"/>
	<input type="hidden" id="${rt}Sort"/>
	<input type="hidden" id="resultTypesMainPreId" value="${rt}">
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
<%--<script src="${ctx}/js/basisDict/ctrResultTypes.js?var=${randomVal}"></script>--%>
<%--<title>基础字典-结果类型</title>--%>
<%--<script type="text/javascript">--%>
	<%--$(document).ready(function() {--%>
		<%--pageQuery();--%>
		<%--$("#searchStr").focus();--%>
		<%--// 添加下拉框事件--%>
		<%--$(".sc").click(function() {--%>
			<%--pageQuery();--%>
		<%--});--%>
	<%--});--%>
<%--</script>--%>
<%--</head>--%>
<%--<body class="bg">--%>
	<%--<div class="search over">--%>
		<%--<div class="over">--%>
			<%--<h3>查询条件</h3>--%>
			<%--<form id="rslForm">--%>
				<%--<div>--%>
					<%--<input type="text" id="searchStr" name="searchStr" placeholder="搜索内容..."><input type="button" value="搜索" onclick="pageQuery();" />--%>
				<%--</div>--%>
				<%--<div class="sc">--%>
					<%--<span>状态</span>--%>
					<%--<div class="selectstyle">--%>
						<%--<select id="status" name="status" class="select_box">--%>
							<%--<option value="" selected>全部</option>--%>
							<%--<option value="1">可用</option>--%>
							<%--<option value="0">停用</option>--%>
						<%--</select>--%>
					<%--</div>--%>
					<%--<span>排序</span>--%>
					<%--<div class="selectstyle">--%>
						<%--<select id="sort" name="sort" class="select_box">--%>
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
	<%--<div id="detailInfoViewDiv" class="xinxi"></div>--%>
	<%--<div id="infoPageDiv" style="display: none;"></div>--%>
	<%--<div id="detailInfoPageDiv" ></div>--%>
	<%--<div class="footer">--%>
		<%--<div></div>--%>
	<%--</div>--%>
<%--</body>--%>
<%--</html>--%>
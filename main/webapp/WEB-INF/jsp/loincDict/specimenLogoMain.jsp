<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/loincDict/specimenLogo.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${sl}MainContentContainer">
	<div class="main-content-header">
		<div class="flex-container flex-space-between">
			<div class="search flex-container  flex-space-between">
				<div class="form-control-icon icon-right">
					<input type="text" id="${sl}SearchStr" class="form-control searchWidth" style="width:250px;" placeholder="搜索内容..."/>
					<button class="control-icon text-center" id="${sl}SearchBtn">
						<i class="icon icon-search"></i>
					</button>
				</div>
				<span class="symbol"></span> <span>状态:</span>

				<div class="drop-down">
					<div class="drop-down-selected">
						<span class="selected-items" id="${sl}StatusSpan">所有</span><i class="fa fa-angle-down "></i>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled ${sl}-status-selector">
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
						<i class="icon icon-sort"></i><span class="selected-items" id="${sl}SortSpan">排序</span>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled ${sl}-sort-selector">
							<li class="selected" el-value="0">按顺序号升序</li>
							<li el-value="1">按名称升序</li>
							<li el-value="2">按录入顺序降序</li>
						</ul>
					</div>
				</div>

				<span class="symbol">|</span>

				<span id="${sl}Add"><i class="icon icon-plus-square"></i>添加</span>
				<span id="${sl}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
			</div>
		</div>
	</div>

	<div class="main-content-body">
		<table id="${sl}List"></table>
	</div>

	<input type="hidden" id="${sl}TypeKey" name="typeKey" value="${typeKey}"/>
	<input type="hidden" id="${sl}Status"/>
	<input type="hidden" id="${sl}Sort"/>
	<input type="hidden" id="specimenLogoPreId" value="${sl}">
</div>


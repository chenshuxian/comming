<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<c:set var="rm" value="rm"></c:set>
<div class="flex-container layout-vertical main-content-container" id="${rm}mainContentContainer">
	<local:ifAuthrized value="02020404">
		<input type="hidden" id="${rm}statusAuthrized" value="true"/>
	</local:ifAuthrized>
	<local:ifAuthrized value="02020405">
		<input type="hidden" id="${rm}offerAuthrized" value="true"/>
	</local:ifAuthrized>
	<local:ifAuthrized value="02020406">
		<input type="hidden" id="${rm}editAuthrized" value="true"/>
	</local:ifAuthrized>
	<local:ifAuthrized value="02020403">
		<input type="hidden" id="${rm}deleteAuthrized" value="true"/>
	</local:ifAuthrized>
	<div class="main-content-header" id="${rm}main-content-header">
		<div class="flex-container flex-space-between">
			<div class="search flex-container  flex-space-between">
				<div class="form-control-icon icon-right">
					<input type="text" id="${rm}SearchStr" class="form-control" placeholder="搜索内容..." />
					<button class="control-icon text-center" id="${rm}SearchBtn">
						<i class="icon icon-search"></i>
					</button>
				</div>
				<span class="symbol"></span> <span class="drop-down-label">状态:</span>

				<div class="drop-down">
					<div class="drop-down-selected">
						<span class="selected-items" id="${rm}StatusSpan">全部</span>
						<i class="icon icon-angle-down"></i>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled ${rm}-status-selector">
							<%--<c:forEach items="<%=StatusEnum.values()%>" var="isAbleEnum" varStatus="status">--%>
								<%--<li el-value="${isAbleEnum.getIndex()}"--%>
									<%--<c:if test="${isAbleEnum.getIndex()==-1}">--%>
										<%--selected="selected"--%>
									 <%--</c:if> >${isAbleEnum.text}--%>
									 <%--</li>--%>
		                    <%--</c:forEach>--%>
								<c:forEach items="${isAbleList}" var="isAble">
									<li     <c:if test="${isAble.index == 2}">selected="selected" el-value=""</c:if>
											<c:if test="${isAble.index != 2}">selected="selected"
											el-value="${isAble.index}"</c:if> >${isAble.text}</li>
								</c:forEach>
						</ul>
					</div>
				</div>
			</div>
			
			<div class="option icon-group-inline ">
				<div class="drop-down drop-down-icon">
					<div class="drop-down-selected">
						<i class="icon icon-sort"></i> <span class="selected-items" id="${rm}SortSpan">按顺序号升序</span>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled ${rm}-sort-selector">
							<li class="selected" el-value="0">按顺序号升序</li>
							<li el-value="1">按名称升序</li>
							<li el-value="2">按录入顺序降序</li>
						</ul>
					</div>
				</div>

				<span class="symbol">|</span>
				<local:ifAuthrized value="02020402">
				<%--<span id="${rm}J_ShowPop" class="J_ShowPop" data-show="${rm}roleManagerAdd" onclick="userGroupsMain.showuserGroupsAddPop('','0');">--%>
					<%--<i class="icon icon-plus-square"></i>添加--%>
				<%--</span>--%>
					<span id="${rm}Add"><i class="icon icon-plus-square"></i>添加</span>
				</local:ifAuthrized>
				<local:ifAuthrized value="02020403">
				<%--<span onclick="userGroupsMain.checkedDelRow();">--%>
				 	<%--<i class="icon icon-trash"></i>--%>
				 	<%--删除选中--%>
				 <%--</span>--%>
					<span id="${rm}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
				 </local:ifAuthrized>
			</div>
		</div>
	</div>
	<div class="main-content-body">
		<table id="${rm}List"></table>
	</div>

	<input type="hidden" id="${rm}Status"/>
	<input type="hidden" id="${rm}Sort"/>
	<!--自定义分页-->
</div>

<%--<!--基本信息-->--%>
<%--<form id="${rm}addForm" method="post" class="easyui-form" data-options="novalidate: false">--%>
<%--<div class="pop" id="${rm}roleManagerAdd">--%>
	<%--<div class="pop-inner-wrap">--%>
		<%--<div class="pop-container">--%>
			<%--<div class="wrapper-container">--%>
				<%--<div class="wrapper-header flex-container flex-space-between">--%>
					<%--<h1>基本信息</h1>--%>
					<%--<small class="tips">编码: --%>
						<%--<code id="${rm}code"></code>--%>
						<%--<input type="hidden" id="${rm}code_ht" name="codeNo">--%>
					<%--</small>--%>
				<%--</div>--%>
				<%--<div class="wrapper-content">--%>
					<%--<div class="flex-container">--%>
						<%--<div class="form-combo block-show">--%>
							<%--<div class=" flex-container  flex-space-between">--%>
								<%--<label for=""><span class="required-icon">*</span>名称:</label>--%>
								<%--<input type="text" id="${rm}name" name="name" class="form-control block-show" maxlength="50">--%>
								<%--<input type="hidden" id="${rm}id" name="id" class="form-control block-show">--%>
							<%--</div>--%>
						<%--</div>--%>
					<%--</div>--%>
					<%--<div class="flex-container">--%>
						<%--<div class="form-combo block-show">--%>
							<%--<div class=" flex-container  flex-space-between">--%>
								<%--<label for="">顺序号:</label>--%>
								<%--<input type="text" id="${rm}displayOrder" name="displayOrder" class="form-control block-show" maxlength="6">--%>
							<%--</div>--%>
						<%--</div>--%>
					<%--</div>--%>
					<%--<div class="flex-container">--%>
						<%--<div class="form-combo block-show">--%>
							<%--<div class=" flex-container  flex-space-between">--%>
								<%--<label for="">备注:</label>--%>
								<%--<input type="text" id="${rm}memo" name="memo" class="form-control block-show">--%>
							<%--</div>--%>
						<%--</div>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div class="wrapper-footer text-center">--%>
					<%--<button data-show="addAreaUserSure" class="btn btn-submit sm-size J_ShowPop" id="${rm}submitPop" onclick="userGroupsMain.submitIt(this);">确定</button>--%>
					<%--<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>--%>
				<%--</div>--%>
			<%--</div>--%>

		<%--</div>--%>
	<%--</div>--%>
<%--</div>--%>
<%--</form>--%>

<!--授权管理-->
<div class="pop" id="${rm}rolePermissionManager">
	<input type="hidden" id= "${rm}userGroupsId">
	<input type="hidden" id= "${rm}userGroupsName">
	<input type="hidden" id= "${rm}userGroupsCodeNo">
	<div class="pop-inner-wrap">
		<div class="pop-container">
			<div class="wrapper-container">
				<div class="wrapper-header flex-container flex-space-between">
					<h1>授权管理</h1>
				</div>
				<div class="wrapper-content" style="overflow-y:auto;height: 500px">
					<ul id="${rm}rolePermissionManagerData" class="easyui-tree"></ul>
				</div>
				<div class="wrapper-footer text-center">
					<button data-show="addAreaUserSure" class="btn btn-submit sm-size J_ShowPop" id="${rm}rolePermission" onclick="userGroupsMain.submitRolePermission();">确定</button>
					<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="${ctx}/js/auth/userGroupsMain.js?var=${randomVal}"></script>
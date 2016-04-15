<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
	<div class="flex-container layout-vertical main-content-container" id="ii_mainContentContainer">
		<local:ifAuthrized value="01040105">
			<input type="hidden" id="${ii}showAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040106">
			<input type="hidden" id="${ii}statusAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040107">
			<input type="hidden" id="${ii}editAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040104">
			<input type="hidden" id="${ii}deleteAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040108">
			<input type="hidden" id="${ii}copyAddAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040109">
			<input type="hidden" id="${ii}settingAuthrized" value="true" />
		</local:ifAuthrized>
		<div class="main-content-header" id="ii_main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container flex-space-between">
					<span class="drop-down-label">机构:</span>
					<div class="J_ShowPop J_mechanismList md-size">
						<input type="hidden" id="ii_mechanismId" />
						<span class="selected-items" id="${ii}SelectOrg" >请选择机构</span><i class="icon icon-angle-down"></i>
					</div>
					<div class="form-control-icon icon-right">
							<input id="${ii}SearchStr" type="text" class="form-control" placeholder="搜索内容..."/>
							<button class="control-icon text-center" id="${ii}SearchBtn">
								<i class="icon icon-search"></i>
							</button>
						</div>
				</div>
				<div class="search flex-container  flex-space-between">
							<span class="symbol"></span><span>前台通讯类:</span>
							<div class="drop-down drop-down-icon">
								<div class="drop-down-selected">
									<span class="selected-items" id="${ii}frontClassSpan">全部</span>
								</div>
								<div class="drop-down-menu">
									<ul class="list-unstyled ${ii}-frontClass-selector">
										<li class="selected" el-value="">全部</li>
										<li el-value="0">类名不为空</li>
										<li el-value="1">类名为空</li>
									</ul>
								</div>
							</div>
							<span class="symbol"></span> <span>状态:</span>
							<div class="drop-down">
								<div class="drop-down-selected">
									<span class="selected-items" id="${ii}StatusSpan">所有</span><i class="icon icon-angle-down"></i>
								</div>
								<div class="drop-down-menu">
									<ul class="list-unstyled ${ii}-status-selector">
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
								<i class="icon icon-sort"></i><span class="selected-items" id="${ii}SortSpan">排序</span>
							</div>
							<div class="drop-down-menu">
								<ul class="list-unstyled ${ii}-sort-selector">
									<li class="selected" el-value="0">按顺序号升序</li>
									<li el-value="1">按名称升序</li>
									<li el-value="2">按录入顺序降序</li>
								</ul>
							</div>
						</div>
						<span class="symbol">|</span>
						<local:ifAuthrized value="01040102">
							<span id="${ii}Add2" class="J_ShowPop J_InstrumentAddFromCTR lg-size"  ><i class="icon icon-plus-square"></i> 从仪器库添加</span>
						</local:ifAuthrized>
						<local:ifAuthrized value="01040103"> 
							<span id="${ii}Add" class="J_ShowPop md-size"><i class="icon icon-plus-square"></i> 添加</span>
						</local:ifAuthrized>
						<local:ifAuthrized value="01040104">
							<span id="${ii}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
						</local:ifAuthrized>
				</div>
			</div>
		</div>
		<div class="main-content-body easyui-layout">
			<table id="${ii}List"></table>
		</div>
		<input type="hidden" id="${ii}Status"/>
		<input type="hidden" id="${ii}Sort"/>
		<input type="hidden" id="${ii}frontClass"/>
	</div>
<script src="${ctx}/js/inst/instruments/instruments.js?var=${randomVal}"></script>

<!-------------------------------------------------------------------------------- 
---------------------------实验室专业组下拉Grid数据源-------------------------------------
--------------------------------------------------------------------------------->
<!-- <div id="ii_gridLabGroup" class="tablebox_02" style="width: 298px; height: 217px; display: none;"> -->
<!-- 	<table> -->
<!-- 		<tr class="tablehead"> -->
<!-- 			<td style="width: 15px;">&nbsp;</td> -->
<!-- 			<td style="width: 100px;">名称</td> -->
<!-- 			<td style="width: auto;">助记符</td> -->
<!-- 		</tr> -->
<!-- 	</table> -->
<!-- 	<div class="tablelist" style="width: 100%; height: 172px;"> -->
<!-- 		<table> -->
<%-- 			<c:forEach var="item" items="${labGroupList}"> --%>
<%-- 				<tr id="${item.id}"> --%>
<!-- 					<td style="width: 15px;">&nbsp;</td> -->
<%-- 					<td style="width: auto;">${item.name}</td> --%>
<!-- 				</tr> -->
<%-- 			</c:forEach> --%>
<!-- 		</table> -->
<!-- 	</div> -->
<!-- </div> -->

	<%--<script src="${ctx}/js/inst/instruments/instrumentsDatagridOpts.js?var=${randomVal}"></script>--%>

	
	
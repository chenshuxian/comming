<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
 <script src="${ctx}/js/pm/testItem.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="testItem_mainContentContainer">
	<div class="main-content-header">
		<div class="flex-container flex-space-between">
			<div class="search flex-container  flex-space-between">
				<div class="form-control-icon icon-right">
					<input type="text" class="form-control" placeholder="搜索内容..." id="testItem_searchStr"/>
					<button class="control-icon text-center" onclick="search();">
						<i class="icon icon-search"></i>
					</button>
				</div>
				<span class="symbol"></span> <span>状态:</span>
				<div class="drop-down">
					 <div class="drop-down-selected">
						<span class="selected-items" id="testItem_searchStatus" >所有</span><i class="icon icon-angle-down"></i>
					</div> 
					<div class="drop-down-menu">
						<ul class="list-unstyled" id="testItem_ul_status">
						<c:forEach items="${isAbleList}" var="isAble">
                        	 <li <c:if test="${isAble.index == 2}">selected="selected"</c:if> value="${isAble.index}">${isAble.text}</li>
                        </c:forEach>
						</ul>
					</div>
				</div>
			</div>
			<div class="option icon-group-inline ">
				<div class="drop-down drop-down-icon">
					<div class="drop-down-selected">
						<i class="icon icon-sort"></i><span id="testItem_orderType" class="selected-items">按顺序号升序</span>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled" id="testItem_ul_order">
							<li value="0">按顺序号升序</li>
							<li value="1">按名称升序</li>
							<li value="2">按录入顺序降序</li>
						</ul>
					</div>
				</div>

				<span class="symbol">|</span>
				<span onclick="showAddAndEditDialog('', 'add');" class="J_ShowPop" data-show="basicInfo">
					<i class="icon icon-plus-square"></i>添加
				</span> 
				<span onclick="deleteChecked();">
					<i class="icon icon-trash"></i>删除选中
				</span>
				<span onclick="download();">
					<i ></i>导出
				</span>
			</div>
		</div>
	</div>
	<div class="main-content-body">
		<table id="testItem_userManagerList"></table>
	</div>
	
</div>
<!--基本信息-->

<div class="pop"  id="testItem_saveOrEdit"></div>

<!-------------------------------------------------------------------------------- 
	---------------------------默认样本类型下拉Grid数据源------------------------------------
	--------------------------------------------------------------------------------->
	<div id="testItem_gridTestMethod" class="tablebox_02" style="width: 180px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="testMethod" items="${testMethodList}">
					<tr id="${testMethod.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${testMethod.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------医学专业组下拉Grid数据源--------------------------------------
	--------------------------------------------------------------------------------->
	<div id="testItem_gridDiscipline" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="discipline" items="${disciplineList}">
					<tr id="${discipline.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;"><c:out value="${discipline.name }" escapeXml="true"/></td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------默认标本类型下拉Grid数据源-------------------------------------
	--------------------------------------------------------------------------------->
	<div id="testItem_gridSampleType" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="sampleType" items="${sampleTypeList}">
					<tr id="${sampleType.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${sampleType.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------单位Grid数据源--------------------------------------------
	--------------------------------------------------------------------------------->
	<div id="testItem_gridUnit" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="units" items="${unitList}">
					<tr id="${units.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${units.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------结果类型下拉Grid数据源--------------------------------------
	--------------------------------------------------------------------------------->
	<div id="testItem_gridResultType" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="resultType" items="${resultTypesList}">
					<tr id="${resultType.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;"><c:out value="${resultType.name }" escapeXml="true"/></td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
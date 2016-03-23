<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp"%>
<div class="flex-container layout-vertical main-content-container" id="${imr}_mainContentContainer">
	<div class="flex-container layout-vertical main-content-top">
	<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container flex-space-between">
					<span class="drop-down-label">仪器:</span>
					<div class="J_ShowPop J_instrumentList md-size" id="${imr}instrumentList">
						<span class="selected-items" id="instrumentName" >请选择仪器</span><i class="icon icon-angle-down"></i>
					</div>
				</div>
			</div>
		</div>

		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container  flex-space-between">
					<h5 class="tips">细菌列表</h5>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_addInstrumentGerm lg-size" id="${imr}Add">
						<i class="icon icon-plus-square"></i> 添加细菌</span>
					<span id="${imr}Save"><i class="icon icon-plus-square"></i> 保存修改</span>
					<span id="${imr}DeleteBatch"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<form action="" id="${imr}_itemListForm" method="post" class="easyui-form" data-options="novalidate: false">
				<table id="${imr}List"></table>
			</form>
		</div>
	</div>
	<div class="flex-container layout-vertical main-content-bottom">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container  flex-space-between">
					<h5 class="tips">抗生素列表</h5>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_instAntiDescAdd lg-size" id="${imr}Add2">
						<i class="icon icon-plus-square"></i> 添加抗生素</span>
					<span id="${imr}Save2"><i class="icon icon-plus-square"></i> 保存修改</span>
					<span id="${imr}DeleteBatch2"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<input type="hidden" id=${imr}_testItemId />
			<table id="${imr}List2"></table>
		</div>
	</div>
	
</div>
<script src="${ctx}/js/inst/ctrInstrMics.js?var=1.0.0.16"></script>


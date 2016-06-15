<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="flex-container layout-vertical main-content-container" id="irr_mainContentContainer">
	<div class="flex-container layout-vertical main-content-top">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container flex-space-between">
					<span class="drop-down-label">仪器:</span>
					<div class="J_ShowPop J_instrumentList md-size" id="irrinstrumentList">
						<span class="selected-items blue" id="irrinstrumentName" >请选择仪器</span><i class="fa fa-angle-down "></i>
					</div>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_addInstrumentGerm lg-size" id="irrAdd">
						<i class="icon icon-plus-square"></i> 添加检验项目</span>
					<span id="irrSave"><i class="icon icon-plus-square"></i> 保存修改</span>
					<span id="irrDeleteBatch"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<form action="" id="irr_itemListForm" method="post" class="easyui-form" data-options="novalidate: false">
				<table id="irrList"></table>
			</form>
		</div>
	</div>
	<div class="line sm-size"></div>
	<div class="flex-container layout-vertical main-content-bottom">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container  flex-space-between">
					<h5 class="tips">选中项目参考值</h5>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_instAntiDescAdd lg-size" id="irrAdd2">
						<i class="icon icon-plus-square"></i> 添加</span>
					<span id="irrDeleteBatch2"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<table id="irrList2"></table>
		</div>
	</div>

</div>
<script src="${ctx}/js/inst/ctrInstrumentsItem.js?var=1.0.0.16"></script>


<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/13
  Time: 10:34
  Name: 机构系统管理
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp"%>
<div class="flex-container layout-vertical main-content-container" id="${oi}_mainContentContainer">
  <div class="flex-container layout-vertical main-content-top">
    <div class="main-content-header">
      <div class="flex-container flex-space-between">
        <div class="search flex-container flex-space-between">
          <span class="drop-down-label">机构:</span>
          <div class="J_ShowPop J_instrumentList md-size" id="${oi}orgList">
            <span class="selected-items blue" id="${oi}orgName">请选择机构</span><i class="fa fa-angle-down "></i>
          </div>
        </div>
      </div>
    </div>

    <div class="main-content-header">
      <div class="flex-container flex-space-between">
        <div class="search flex-container  flex-space-between">
          <h5 class="tips">系统列表</h5>
        </div>
        <div class="option icon-group-inline ">
          <span class="J_addInstrumentGerm lg-size" id="${oi}Add"><i class="icon icon-plus-square"></i> 添加</span>
          <%--<span id="${oi}DeleteBatch"><i class="icon icon-trash"></i> 删除选中</span>--%>
          记录总数 : <span id="${oi}Total"></span>
        </div>
      </div>
    </div>
    <div class="main-content-body" style="overflow-y: hidden;">
        <table id="${oi}List"></table>
    </div>
  </div>
  <div class="line sm-size"></div>
  <div class="flex-container layout-vertical main-content-bottom">
    <div class="main-content-header">
      <div class="flex-container flex-space-between">
        <div class="search flex-container  flex-space-between">
          <h5 class="tips">管理员列表</h5>
        </div>
        <div class="option icon-group-inline ">
          记录总数 : <span id="${oi}Total2"></span>
        </div>
      </div>
    </div>
    <div class="main-content-body" style="overflow-y: hidden;">
      <table id="${oi}List2"></table>
    </div>
  </div>

</div>
<script src="${ctx}/js/sys/centerSetting/orgInit.js?var=1.0.0.16"></script>



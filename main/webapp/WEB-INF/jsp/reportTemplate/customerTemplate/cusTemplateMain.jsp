<%--
  Created by IntelliJ IDEA.
  User: chenshuxian
  Date: 2016/4/15
  Time: 13:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/reportTemplate/cusTemplate.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${cst}MainContentContainer">
  <div class="main-content-header">
    <div class="flex-container flex-space-between">
      <div class="search flex-container  flex-space-between">
        <span class="drop-down-label">机构:</span>
        <div class="J_ShowPop J_mechanismList md-size">
          <span class="selected-items" id="${cst}SelectOrg" >请选择机构</span><i class="icon icon-angle-down"></i>
        </div>
        <div class="form-control-icon icon-right">
          <input type="text" id="${cst}SearchStr" class="form-control" placeholder="搜索内容..."/>
          <button class="control-icon text-center" id="${cst}SearchBtn">
            <i class="icon icon-search"></i>
          </button>
        </div>
      </div>
      <div class="search flex-container  flex-space-between">
        <span class="symbol"></span> <span>状态:</span>
        <div class="drop-down">
          <div class="drop-down-selected">
            <span class="selected-items" id="${cst}StatusSpan">所有</span><i class="icon icon-angle-down"></i>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${cst}-status-selector">
              <c:forEach items="${isAbleList}" var="isAble">
                <li <c:if test="${isAble.index == 2}">selected="selected" el-value=""</c:if>
                    <c:if test="${isAble.index != 2}">selected="selected" el-value="${isAble.index}"</c:if> >${isAble.text}</li>
              </c:forEach>
            </ul>
          </div>
        </div>
        <span class="symbol"></span> <span>模板类型:</span>
        <div class="drop-down">
          <div class="drop-down-selected">
            <span class="selected-items" id="${ct}Template">全部</span><i class="icon icon-angle-down"></i>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${ct}-template-selector">
              <li class="selected" el-value="">全部</li>
              <li el-value="0">报告</li>
              <li el-value="1">条码标签</li>
              <li el-value="2">报表</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="option icon-group-inline ">
        <div class="drop-down drop-down-icon">
          <div class="drop-down-selected">
            <i class="icon icon-sort"></i><span class="selected-items" id="${cst}SortSpan">排序</span>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${cst}-sort-selector">
              <li class="selected" el-value="0">按顺序号升序</li>
              <li el-value="1">按名称升序</li>
              <li el-value="2">按录入顺序降序</li>
            </ul>
          </div>
        </div>

        <span class="symbol">|</span>
        <span id="${cst}Add2" class="J_ShowPop J_InstrumentAddFromCTR lg-size"  ><i class="icon icon-plus-square"></i> 从模板库添加</span>
        <span id="${cst}Add"><i class="icon icon-plus-square"></i>添加</span>
        <span id="${cst}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
      </div>
    </div>
  </div>

  <div class="main-content-body">
    <table id="${cst}List"></table>
  </div>

  <input type="hidden" id="${cst}Status"/>
  <input type="hidden" id="${cst}Sort"/>
  <input type="hidden" id="${cst}Template"/>

</div>

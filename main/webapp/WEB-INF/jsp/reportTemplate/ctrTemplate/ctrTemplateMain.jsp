<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/reportTemplate/ctrTemplate.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${ct}MainContentContainer">
  <div class="main-content-header">
    <div class="flex-container flex-space-between">
      <div class="search flex-container  flex-space-between">
        <div class="form-control-icon icon-right">
          <input type="text" id="${ct}SearchStr searchWidth" class="form-control" style="width:250px;" placeholder="搜索内容..."/>
          <button class="control-icon text-center" id="${ct}SearchBtn">
            <i class="icon icon-search"></i>
          </button>
        </div>
        <span class="symbol"></span> <span>所属系统:</span>
        <div class="drop-down">
          <div class="drop-down-selected">
            <span class="selected-items" id="${ct}SystemSpan">请选择</span><i class="fa fa-angle-down"></i>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${ct}-system-selector">
              <c:forEach items="${applicationList}" var="appList">
                <li el-value="${appList.stringId}" >${appList.name}</li>
              </c:forEach>
            </ul>
          </div>
        </div>
        <span class="symbol">|</span> <span>模板类型:</span>
        <div class="drop-down">
          <div class="drop-down-selected">
            <span class="selected-items" id="${ct}Template">请选择</span><i class="fa fa-angle-down"></i>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${ct}-template-selector">
              <li el-value="0">报告</li>
              <li el-value="1">条码标签</li>
              <li el-value="2">报表</li>
            </ul>
          </div>
        </div>
        <span class="symbol">|</span> <span>状态:</span>
        <div class="drop-down">
          <div class="drop-down-selected">
            <span class="selected-items" id="${ct}StatusSpan">所有</span><i class="fa fa-angle-down"></i>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${ct}-status-selector">
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
            <i class="icon icon-sort"></i><span class="selected-items" id="${ct}SortSpan">排序</span>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${ct}-sort-selector">
              <li class="selected" el-value="0">按顺序号升序</li>
              <li el-value="1">按名称升序</li>
              <li el-value="2">按录入顺序降序</li>
            </ul>
          </div>
        </div>

        <span class="symbol">|</span>

        <span id="${ct}Add"><i class="icon icon-plus-square"></i>添加</span>
        <span id="${ct}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
        <%--<span id="${ct}Upload"><i class="icon icon-file"></i>档案上传</span>--%>
        <%--<span id="${ct}View"><i class="icon icon-file"></i>档案预览</span>--%>
      </div>
    </div>
  </div>

  <div class="main-content-body">
    <table id="${ct}List"></table>
  </div>

  <input type="hidden" id="${ct}Status"/>
  <input type="hidden" id="${ct}Sort"/>
  <input type="hidden" id="${ct}TemplateVal" value="-1"/>
  <input type="hidden" id="${ct}System" value="-1"/>
</div>

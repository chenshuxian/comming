<%--
  Created by IntelliJ IDEA.
  User: reach-pc
  Date: 2016/1/25
  Time: 13:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="com.daan.domain.Constant" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<div class="flex-container layout-vertical main-content-container" id="${ctrInsBox}MainContentContainer">
  <div class="main-content-header">
    <div class="flex-container flex-space-between">
      <div class="search flex-container  flex-space-between">
        <span class="symbol"></span> <span>机构:</span>

        <div class="drop-down">
          <div class="drop-down-selected">
            <span class="selected-items" id="${ctrInsBox}SelectOrg">请选择机构</span><i class="icon icon-angle-down"></i>
          </div>
        </div>
        &nbsp;&nbsp;
        <div class="form-control-icon icon-right">
          <input type="text" id="${ctrInsBox}SearchStr" class="form-control" placeholder="搜索内容..."/>
          <button class="control-icon text-center" id="${ctrInsBox}SearchBtn">
            <i class="icon icon-search"></i>
          </button>
        </div>
        <span class="symbol"></span> <span>状态:</span>

        <div class="drop-down">
          <div class="drop-down-selected">
            <span class="selected-items" id="${ctrInsBox}StatusSpan">所有</span><i class="icon icon-angle-down"></i>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${ctrInsBox}-status-selector">
              <c:forEach items="${isAbleList}" var="isAble">
                <li
                        <c:if test="${isAble.index == 2}">selected="selected" el-value=""</c:if>
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
            <i class="icon icon-sort"></i><span class="selected-items" id="${ctrInsBox}SortSpan">排序</span>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled ${ctrInsBox}-sort-selector">
              <li class="selected" el-value="0">按顺序号升序</li>
              <li el-value="1">按盒子条码升序</li>
              <li el-value="2">按录入顺序降序</li>
            </ul>
          </div>
        </div>

        <span class="symbol">|</span>

        <span id="${ctrInsBox}Add"><i class="icon icon-plus-square"></i>添加</span>
        <span id="${ctrInsBox}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
      </div>
    </div>
  </div>

  <div class="main-content-body">
    <table id="${ctrInsBox}List"></table>
  </div>

  <%--基本信息--%>
  <div class="pop"  id="ctrInsBox_viewForm"></div>
  <input type="hidden" id="${ctrInsBox}Status"/>
  <input type="hidden" id="${ctrInsBox}Sort"/>

  <script src="${ctx}/js/inst/ctrInstrBoxs.js?var=${randomVal}"></script>
  <%--<script language="JavaScript">
    $(
            function () {
              CtrInstrBoxs.preId = "${ctrInsBox}";
              CtrInstrBoxs.doSearchUrl = "${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_SEARCH%>";
              CtrInstrBoxs.doViewUrl = "${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_VIEW%>";
              CtrInstrBoxs.doAddUrl = "${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_ADD%>";
              CtrInstrBoxs.doUpdateUrl = "${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_UPDATE%>";
              CtrInstrBoxs.doDelUrl = "${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_DELETE%>";
              CtrInstrBoxs.doExcuteUrl = "${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_EXCUTE%>";
              CtrInstrBoxs.orgTypeId = "<%=Constant.CtrInstrBoxsConstant.MODULEID_ID%>"
              CtrInstrBoxs.init();
            }
    )

  </script>--%>

</div>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>

<div class="flex-container layout-vertical main-content-container" id="${tt}MainContentContainer">
    <div class="main-content-header">
        <div class="flex-container flex-space-between">
            <div class="search flex-container  flex-space-between">
                <div class="form-control-icon icon-right">
                    <input type="text" id="${tt}SearchStr" class="form-control" placeholder="搜索内容..."/>
                    <button class="control-icon text-center" id="${tt}SearchBtn">
                        <i class="icon icon-search"></i>
                    </button>
                </div>
                <span class="symbol"></span> <span>状态:</span>

                <div class="drop-down">
                    <div class="drop-down-selected">
                        <span class="selected-items" id="${tt}StatusSpan">所有</span><i class="icon icon-angle-down"></i>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${tt}-status-selector">
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
                        <i class="icon icon-sort"></i><span class="selected-items" id="${tt}SortSpan">排序</span>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${tt}-sort-selector">
                            <li class="selected" el-value="0">按顺序号升序</li>
                            <li el-value="1">按名称升序</li>
                            <li el-value="2">按录入顺序降序</li>
                        </ul>
                    </div>
                </div>

                <span class="symbol">|</span>

                <span id="${tt}Add"><i class="icon icon-plus-square"></i>添加</span>
                <span id="${tt}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
            </div>
        </div>
    </div>

    <div class="main-content-body">
        <table id="${tt}List"></table>
    </div>

    <input type="hidden" id="${tt}Status"/>
    <input type="hidden" id="${tt}Sort"/>

</div>
<script src="${ctx}/js/basisDict/newctrTubeTypes.js?var=${randomVal}"></script>



<%-- 

<%--
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<!-- @ include file="/WEB-INF/jsp/common/taglibs.jsp"%-->
<!-- %@ include file="/WEB-INF/jsp/common/page_head.jsp"%-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<script src="${ctx}/comming/scripts/jalert/jquery.ui.draggable.js"></script>
<script src="${ctx}/comming/scripts/jalert/jquery.alerts.js"></script>
<!-- script src="${ctx}/comming/js/basisDict/ctrTubeTypes.js?var=${randomVal}"></script -->
<title>基础字典-试管类型</title>
<!--  script type="text/javascript">
	$(document).ready(function() {
		pageQuery();
		$("#searchStr").focus();
		// 添加下拉框事件
		$(".sc").click(function() {
			pageQuery();
		});
	});
</script -->

</head>
<div class="flex-container layout-vertical main-content-container" id="mainContentContainer">
    <div class="main-content-header">
        <div class="flex-container flex-space-between">
            <div class="search flex-container  flex-space-between">
                <div class="form-control-icon icon-right">
                    <input type="text" id="searchStr" class="form-control" placeholder="搜索内容..."/>
                    <button class="control-icon text-center" id="searchBtn">
                        <i class="icon icon-search"></i>
                    </button>
                </div>
                <span class="symbol"></span> <span>状态:</span>

                <div class="drop-down">
                    <div class="drop-down-selected">
                        <span class="selected-items" id="statusSpan">所有</span><i class="icon icon-angle-down"></i>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled status-selector">
                            <li class="selected" el-value="">所有</li>
                            <li el-value="1">开启</li>
                            <li el-value="0">停用</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="option icon-group-inline ">
                <div class="drop-down drop-down-icon">
                    <div class="drop-down-selected">
                        <i class="icon icon-sort"></i><span class="selected-items" id="sortSpan">排序</span>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled sort-selector">
                            <li class="selected" el-value="0">按顺序号升序</li>
                            <li el-value="1">按名称升序</li>
                            <li el-value="2">按录入顺序降序</li>
                        </ul>
                    </div>
                </div>

                <span class="symbol">|</span>

                <span id="editInfoTube"><i class="icon icon-plus-square"></i>添加</span>
                <span id="deleteTubeTypeBatch"><i class="icon icon-trash"></i>删除选中</span>
            </div>
        </div>
    </div>

    <div class="main-content-body">
        <table id="ctrTubeTypesList"></table>
    </div>


    <input type="hidden" id="status"/>
    <input type="hidden" id="sort"/>

    <script src="${ctx}/comming/js/basisDict/newctrTubeTypes.js?var=${randomVal}"></script>

</div>
</html>
 --%>
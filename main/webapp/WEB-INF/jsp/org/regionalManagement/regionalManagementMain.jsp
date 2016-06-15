<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/org/newRegionalManagement.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${rmm}MainContentContainer">
    <div class="flex-container layout-vertical main-content-top">
        <div class="main-content-header">
            <div class="flex-container flex-space-between">
                <div class="search flex-container  flex-space-between">
                    <div class="form-control-icon icon-right">
                        <input type="text" id="${rmm}SearchStr" class="form-control searchWidth" style="width:250px;" placeholder="搜索内容..."/>
                        <button class="control-icon text-center" id="${rmm}SearchBtn">
                            <i class="icon icon-search"></i>
                        </button>
                    </div>
                    <span class="symbol"></span> <span>状态:</span>

                    <div class="drop-down">
                        <div class="drop-down-selected">
                            <span class="selected-items" id="${rmm}StatusSpan">所有</span><i class="fa fa-angle-down "></i>
                        </div>
                        <div class="drop-down-menu">
                            <ul class="list-unstyled ${rmm}-status-selector">
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
                            <i class="icon icon-sort"></i><span class="selected-items" id="${rmm}SortSpan">排序</span>
                        </div>
                        <div class="drop-down-menu">
                            <ul class="list-unstyled ${rmm}-sort-selector">
                                <li class="selected" el-value="0">按顺序号升序</li>
                                <li el-value="1">按名称升序</li>
                                <li el-value="2">按录入顺序降序</li>
                            </ul>
                        </div>
                    </div>

                    <span class="symbol">|</span>

                    <span id="${rmm}Add"><i class="icon icon-plus-square"></i>添加</span>
                    <span id="${rmm}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
                </div>
            </div>
        </div>

        <div class="main-content-body">
            <table id="${rmm}List"></table>
        </div>
    </div>
    <div class="line sm-size"></div>
    <div class="flex-container layout-vertical main-content-bottom">
        <div class="main-content-header">
            <div class="flex-container flex-space-between">
                <div class="search flex-container flex-space-between">
                    <h5 class="tips">关联机构列表</h5>
                </div>
                <div class="option icon-group-inline ">
                    <span id="${rmm}AddRelated"><i class="icon icon-plus-square"></i>添加</span>
                    <span id="${rmm}DeleteRelatedBatch"><i class="icon icon-trash"></i>删除选中</span>
                </div>
            </div>
        </div>

        <div class="main-content-body">
            <table id="${rmm}List2">
            </table>
        </div>
    </div>

    <input type="hidden" id="${rmm}Status"/>
    <input type="hidden" id="${rmm}Sort"/>
    <input type="hidden" id="${rmm}orgTypeId" name="orgTypeId" value="${orgTypeId}" />
    <input type="hidden" id="regionalManagementPreId" value="${rmm}">
</div>

<%--<!DOCTYPE html>--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>--%>

<%--<html xmlns="http://www.w3.org/1999/xhtml">--%>
<%--<head lang="en">--%>
	<%--<title>区域管理机构维护-main</title>--%>
	<%--<meta http-equiv="content-type" content="text/html; charset=UTF-8">--%>
    <%--<link href="${ctx}/scripts/jalert/jquery.alerts.css" rel="stylesheet">--%>
	<%--<script src="${ctx}/scripts/jalert/jquery.ui.draggable.js"></script>--%>
	<%--<script src="${ctx}/scripts/jalert/jquery.alerts.js"></script>--%>
    <%--<script src="${ctx}/js/org/regionalManagement.js?v=${randomVal}"></script>--%>
    <%--<script type="text/javascript">--%>
	<%--$(document).ready(function(){--%>
		<%--search();--%>
		<%--$("#searchStr").focus();--%>
		<%--// 添加下拉框事件--%>
		<%--$(".sc").click(function(){--%>
			<%--pageQuery();--%>
		<%--});--%>
	<%--});--%>
    <%--</script>--%>
<%--</head>--%>
<%--<body class="bg">--%>
<%--<div class="search over">--%>
    <%--<div class="over">--%>
        <%--<h3>查询条件</h3>--%>
        <%--<form>--%>
         <%--<input type="hidden" id="orgTypeId" name="orgTypeId" value="${orgTypeId}" />--%>
            <%--<div>--%>
                <%--<input id="searchStr" name="searchStr" type="text" placeholder="搜索内容..."><input type="button" value="搜索" onclick="search();">--%>
            <%--</div>--%>
            <%--<div class="sc">--%>
                <%--<span>状态</span>--%>
                <%--<div class="selectstyle">--%>
                    <%--<select id="status" name="status" class = "select_box">--%>
						<%--<option value="" selected>全部</option>--%>
						<%--<option value="1">可用</option>--%>
						<%--<option value="0">停用</option>--%>
                    <%--</select>--%>
                <%--</div>--%>
                <%--<span>顺序</span>--%>
                <%--<div class="selectstyle">--%>
                    <%--<select id="sort" name="sort" class = "select_box">--%>
						<%--<option value="0" selected>按顺序号升序</option>--%>
						<%--<option value="1">按名称升序</option>--%>
						<%--<option value="2">按录入顺序降序</option>--%>
                    <%--</select>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</form>--%>
    <%--</div>--%>
<%--</div>--%>
<%--<!-- 管理机构列表  -->--%>
<%--<div class="yi_c over" >--%>
    <%--<div id="managementList" style="display:none;"></div>--%>
<%--</div>--%>
<%--<!-- 关联机构列表  -->--%>
<%--<div class="yi_c over" style="height:260px;">--%>
    <%--<div id="relatedList" style="display:none;"></div>--%>
<%--</div>--%>
<%--<!-- 添加修改查看页面  -->--%>
<%--<div id="infoViewDiv" class="xinxi"></div>--%>
<%--<!-- 翻页 -->--%>
<%--<div id="infoPageDiv" style="display:none;">--%>
<%--<!-- 添加机构 -->--%>
<%--<div class="xinxi" id="addRelatedRegionalShow" style="width: 1200px;height:600px;">--%>
    <%--<div id="addRelatedRegional" style="display:none;"></div>--%>
<%--</div>--%>
<%--</body>--%>
<%--</html>--%>
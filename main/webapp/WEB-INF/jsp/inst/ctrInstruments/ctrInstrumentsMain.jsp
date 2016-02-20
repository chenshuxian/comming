<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/inst/instruments.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${ins}MainContentContainer">
    <div class="main-content-header">
        <div class="flex-container flex-space-between">
            <div class="search flex-container  flex-space-between">
                <div class="form-control-icon icon-right">
                    <input type="text" id="${ins}SearchStr" class="form-control" placeholder="搜索内容..."/>
                    <button class="control-icon text-center" id="${ins}SearchBtn">
                        <i class="icon icon-search"></i>
                    </button>
                </div>
                <span class="symbol"></span> <span>状态:</span>

                <div class="drop-down">
                    <div class="drop-down-selected">
                        <span class="selected-items" id="${ins}StatusSpan">所有</span><i class="icon icon-angle-down"></i>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${ins}-status-selector">
                            <c:forEach items="${isAbleList}" var="isAble">
                                <li <c:if test="${isAble.index == 2}">selected="selected" el-value=""</c:if>
                                    <c:if test="${isAble.index != 2}">selected="selected" el-value="${isAble.index}"</c:if> >${isAble.text}</li>
                            </c:forEach>
                        </ul>
                    </div>
                </div>
                 <span class="symbol"></span><span>前台通讯类:</span>
                <div class="drop-down drop-down-icon">
                	<div class="drop-down-selected">
                        <span class="selected-items" id="${ins}frontClassSpan">全部</span>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${ins}-frontClass-selector">
                            <li class="selected" el-value="">全部</li>
                            <li el-value="0">类名不为空</li>
                            <li el-value="1">类名为空</li>
                        </ul>
                    </div>
               </div>
            </div>
            <div class="option icon-group-inline ">
                <div class="drop-down drop-down-icon">
                    <div class="drop-down-selected">
                        <i class="icon icon-sort"></i><span class="selected-items" id="${ins}SortSpan">排序</span>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${ins}-sort-selector">
                            <li class="selected" el-value="0">按顺序号升序</li>
                            <li el-value="1">按名称升序</li>
                            <li el-value="2">按录入顺序降序</li>
                        </ul>
                    </div>
                </div>

                <span class="symbol">|</span>

                <span id="${ins}AddType"><i class="icon icon-plus-square"></i>添加</span>
                <span id="${ins}DeleteTypeBatch"><i class="icon icon-trash"></i>删除选中</span>
            </div>
        </div>
    </div>

    <div class="main-content-body">
        <table id="${ins}TypeList"></table>
    </div>

    <input type="hidden" id="${ins}Status"/>
    <input type="hidden" id="${ins}Sort"/>
    <input type="hidden" id="${ins}frontClass"/>
    <input type="hidden" id="${ins}PreId" value="${ins}">

</div>
<%--
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    
    <link href="${ctx}/scripts/jalert/jquery.alerts.css" rel="stylesheet">
	<script src="${ctx}/scripts/jalert/jquery.ui.draggable.js"></script>
	<script src="${ctx}/scripts/jalert/jquery.alerts.js"></script>

    <script src="${ctx}/js/inst/instruments.js?var=${randomVal}"></script>
    <title>中心仪器信息</title>

<script type="text/javascript">
	$(document).ready(function(){
		pageQuery_realtime('init');
		$("#searchStr").focus();
		
		// 添加下拉框事件
		/*$(".sc").click(function(){
			pageQuery('init');
		});*/
	});
</script>


</head>

<body class="bg">
<div class="search over">
    <div class="over">
        <h3>查询条件</h3>
        <form id="rslForm">
            <div>
                <input type="text" id="searchStr" name="searchStr" placeholder="搜索内容..."><input type="button" value="搜索" onclick="pageQuery_realtime('init');">
            </div>
            <div class="sc">
                <span>前台通讯类</span>
                <div class="selectstyle">
                    <select id="frontClassName" name="frontClassName" class="select_box" onchange="javascript:pageQuery_realtime('init');">
						<option value="" selected>全部</option>
						<option value="0">类名不为空</option>
						<option value="1">类名为空</option>
                    </select>
                </div>
                <span>状态</span>
                <div class="selectstyle">
                    <select id="status" name="status" class="select_box" onchange="javascript:pageQuery_realtime('init');">
						<option value="" selected>全部</option>
						<option value="1">可用</option>
						<option value="0">停用</option>
                    </select>
                </div>
                <span>排序</span>
                <div class="selectstyle">
                    <select id="sort" name="sort" class="select_box" onchange="javascript:pageQuery_realtime('init');">
						<option value="0" selected>按顺序号升序</option>
						<option value="1">按仪器名称升序</option>
						<option value="2">按录入顺序降序</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</div>

<div id="infoViewDiv" class="xinxi"></div>

<div id="infoPageDiv" style="display:none;">
</div>

<div class="footer">
    <div>
    </div>
</div>

<script>
    /**表格的行数**/
    var SH=$(window).height();
    var h1=$(".search").height();
    var h2=$(".yi_c").height();
    var h3=$(".footer").height();
    var ths=SH-h1-h2-h3-103;
    var ge=parseInt(ths/35);
</script>

</body>
</html>
 --%>
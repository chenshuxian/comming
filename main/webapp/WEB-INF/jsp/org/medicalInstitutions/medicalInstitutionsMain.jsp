<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/org/med.js?var=${randomVal}"></script>
<%--<script>--%>
<%--$(function () {--%>
	<%----%>
	<%--var pageListUrl= ctx + "/org/centerOrg/centerOrgPageList"; --%>
	<%--var hideCols=new Array();--%>
	<%--var tableList = $("#medTypeList");--%>
	<%--var preId="med";--%>
    <%--//var url = pageListUrl;--%>
    <%--var params = {--%>
    		<%--url:pageListUrl,--%>
    		<%--orgTypeId:40,--%>
    		<%--data:{orgTypeId:40},--%>
    		<%--module:"MED",--%>
    		<%--hideCols:hideCols,--%>
    		<%--tableList:tableList,--%>
    		<%--preId:preId--%>
    	<%--};  //如有需要在編寫如上方格式。--%>

    <%--var gridObj = dataGridM.init(params);--%>
    <%----%>
    <%--//* render DataGrid */--%>
    <%--params.dataGrid = tableList.datagrid(gridObj);--%>
    <%----%>
	<%--MED = (function(old,p){--%>
		<%--var my = Object.create(old);--%>
		<%--my.init(p);--%>
		<%--return my;--%>
	<%--}(MedInst,params));--%>
	<%----%>
	<%--MED.params = params;--%>
	<%----%>
	<%--/* 状态搜索 */	--%>
    <%--$("." + preId + "-status-selector li").on("click", function () {--%>
        <%--$("#" + preId + "StatusSpan").html($(this).html());--%>
        <%--$("." + preId + "-status-selector li.selected").removeClass("selected");--%>
        <%--var flg = $(this).is('.selected');--%>
        <%--$(this).addClass(function () {--%>
            <%--return flg ? '' : 'selected';--%>
        <%--})--%>

        <%--var statusVal = $(this).attr("el-value");--%>
        <%--$("#" + preId + "Status").val(statusVal);--%>

        <%--newcommonjs.newdataGridSearch(params.dataGrid, MED.searchObj(MED));--%>
    <%--});--%>

    <%--/* 排序 */--%>
    <%--$("." + preId + "-sort-selector li").on("click", function () {--%>
        <%--$("#" + preId + "SortSpan").html($(this).html());--%>
        <%--$("." + preId + "-sort-selector li.selected").removeClass("selected");--%>
        <%--var flg = $(this).is('.selected');--%>
        <%--$(this).addClass(function () {--%>
            <%--return flg ? '' : 'selected';--%>
        <%--})--%>

        <%--var sortVal = $(this).attr("el-value");--%>
        <%--$("#" + preId + "Sort").val(sortVal);--%>

        <%--newcommonjs.newdataGridSearch(params.dataGrid, MED.searchObj(MED));--%>
    <%--});--%>
	<%----%>
   <%----%>
<%--});--%>
<%--</script>--%>
<div class="flex-container layout-vertical main-content-container" id="${med}MainContentContainer">
    <div class="main-content-header">
        <div class="flex-container flex-space-between">
            <div class="search flex-container  flex-space-between">
                <div class="form-control-icon icon-right">
                    <input type="text" id="${med}SearchStr" class="form-control searchWidth" style="width:250px;" placeholder="搜索内容..."/>
                    <button class="control-icon text-center" id="${med}SearchBtn">
                        <i class="icon icon-search"></i>
                    </button>
                </div>
                <span class="symbol"></span> <span>状态:</span>

                <div class="drop-down">
                    <div class="drop-down-selected">
                        <span class="selected-items" id="${med}StatusSpan">所有</span><i class="fa fa-angle-down "></i>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${med}-status-selector">
                            <c:forEach items="${isAbleList}" var="isAble">
                                <li <c:if test="${isAble.index == 2}">selected="selected" el-value=""</c:if>
                                    <c:if test="${isAble.index != 2}">selected="selected" el-value="${isAble.index}"</c:if>>${isAble.text}</li>
                            </c:forEach>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="option icon-group-inline ">
                <div class="drop-down drop-down-icon">
                    <div class="drop-down-selected">
                        <i class="icon icon-sort"></i><span class="selected-items" id="${med}SortSpan">排序</span>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${med}-sort-selector">
                            <li class="selected" el-value="0">按顺序号升序</li>
                            <li el-value="1">按名称升序</li>
                            <li el-value="2">按录入顺序降序</li>
                        </ul>
                    </div>
                </div>

                <span class="symbol">|</span>

                <span id="${med}Add"><i class="icon icon-plus-square"></i>添加</span>
                <span id="${med}DeleteBatch"><i class="icon icon-trash"></i>删除选中</span>
            </div>
        </div>
    </div>

    <div class="main-content-body">
        <table id="${med}List"></table>
    </div>
    
    <input type="hidden" id="${med}Status"/>
    <input type="hidden" id="${med}Sort"/>
    <input type="hidden" id="${med}orgTypeId" name="orgTypeId" value="${orgTypeId}" />

</div>
<%-- <!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link href="${ctx}/scripts/jalert/jquery.alerts.css" rel="stylesheet">
<script src="${ctx}/scripts/jalert/jquery.ui.draggable.js"></script>
<script src="${ctx}/scripts/jalert/jquery.alerts.js"></script>
<script src="${ctx}/js/org/centerOrg.js?var=1.0.0.5"></script>
<title>医疗机构维护</title>
<script type="text/javascript">
$(document).ready(function(){
	search();
	$("#searchStr").focus();
	// 添加下拉框事件
	$(".sc").click(function(){
		pageQuery();
	});
});
</script>
</head>
<body class="bg">
<div class="search over">
    <div class="over">
        <h3>查询条件</h3>
        <form id="rslForm">
            <input type="hidden" id="orgTypeId" name="orgTypeId" value="${orgTypeId}" />
            <div>
                <input type="text" id="searchStr" name="searchStr" placeholder="搜索内容..."><input type="button" value="搜索" onclick="search();">
            </div>
            <div class="sc">
                <span>状态</span>
                <div class="selectstyle">
                    <select id="status" name="status" class = "select_box">
						<option value="" selected>全部</option>
						<option value="1">可用</option>
						<option value="0">停用</option>
                    </select>
                </div>
                <span>排序</span>
                <div class="selectstyle">
                    <select id="sort" name="sort" class = "select_box">
						<option value="0" selected>按顺序号升序</option>
						<option value="1">按名称升序</option>
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
</html> --%>
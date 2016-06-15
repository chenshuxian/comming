<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/sys/logQuery.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${logQ}mainContentContainer">
	<div class="main-content-header" id="${logQ}main-content-header">
		<div class="flex-container flex-space-between">
			<div class="search flex-container  flex-space-between">
				<div class="option-time">

		      操作时间:<span class="symbol"></span>  <span class="selected-items"><input type='text'  id="${logQ}beginTime" class="easyui-datetimebox" value="${startDate}" /></span>
		      		<span style="margin-left:-10px;">-</span>
					<span class="selected-items"><input type='text' id="${logQ}endTime"  class="easyui-datetimebox" value="${endDate}" /></span>
				</div>
				<span class="symbol"></span>
				<span class="drop-down-label">模块名称:</span>

				<div class="drop-down">
					<div class="drop-down-selected">
						<span class="selected-items" id="${logQ}StatusSpan">请选择模块</span><i class="fa fa-angle-down "></i>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled ${logQ}-status-selector scrollHeight ulDefaultWidth">
							<c:forEach items="${resultList}" var="item" varStatus="status">
								<li <c:if test="${item.moduleId == 1}"> class="selected" </c:if> el-value="${item.moduleId}">${item.moduleName} </li>							
							</c:forEach>
						</ul>
					</div>
				</div>
				<div class="form-control-icon icon-right">
					<input type="text" id="${logQ}SearchStr" class="form-control searchWidth" style="width:250px;" placeholder="搜索内容..."/>
					<button class="control-icon text-center" id="${logQ}SearchBtn">
						<i class="icon icon-search"></i>
					</button>
				</div>
			</div>
		
			<div class="option icon-group-inline ">
				<span id="${logQ}Export" onclick="logQuery.expExcel()"><i class="icon icon-export"></i>导出</span>
			</div>
		</div>
	</div>
	<div class="main-content-body">
		<table id="${logQ}List"></table>
	</div>
	
	<%--<input type="hidden" id="${logQ}StatusNew" value="-1"/>--%>
	<input type="hidden" id="${logQ}Status" value="-1"/>
	
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
<script src="${ctx}/scripts/wdate/WdatePicker.js"></script>
<script src="${ctx}/js/sys/logQuery.js?var=v1.0.0.22"></script>
<title>日志查询</title>
<script type="text/javascript">
$(document).ready(function(){
	search("0");
	$("#moduleId").focus();
	// 添加下拉框事件
	/* $(".sc").click(function(){
		pageQuery();
	}); */
});
</script>
</head>
<body class="bg">
<div class="search over">
    <div class="over">
        <h3>查询条件</h3>
        <form id="rslForm">
            <div class="sc">
                <span>模块名称</span>
                <div class="selectstyle">
                    <select id="moduleId" name="moduleId" class = "select_box">
						<option value="" selected></option>
						<c:forEach items="${resultList}" var="item" varStatus="status">
						<option value="${item.moduleId}">${item.moduleName}</option>
					</c:forEach>
                    </select>
                </div>
                <span>操作时间</span>
                <div class="selectstyle"><input id="startDate" name="startDate" value="${startDate}" type="text" onfocus="dateOnFcusStart('yyyy-MM-dd HH:mm')" style="width:190px;"/></div>
		        <span>至&nbsp;&nbsp;&nbsp;</span>
		        <div class="selectstyle">
		        <input id="endDate" name="endDate" type="text" value="${endDate}" onfocus="dateOnFcusStart('yyyy-MM-dd HH:mm')" style="width:190px;"/>
            </div>
            <div>
                <input type="button" id="searchBtn" value="搜索" onclick="search();">
            </div>
            <div class="selectstyle">
             <input type="button" value="导出" onclick="download();">
            </div>
            </div>
        </form>
    </div>
</div>
<div id="infoPageDiv">
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
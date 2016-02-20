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

    <script src="${ctx}/js/inst/instrumentsItem.js?var=${randomVal}"></script>
    <title>中心仪器选择</title>

<script type="text/javascript">
	$(document).ready(function(){
		pageQuery_realtime();
		$("#searchStr").focus();
	});
</script>


</head>

<body class="bg">
<div>
    <div class="over">
        <h3>仪器列表<a href="javascript:closeWin();"></a></h3>
        <form id="rslForm">
            <div class="sc">
                <span style="width:60px; text-align:left;">前台通讯类</span>
                <div class="selectstyle">
                    <select id="frontClassName" name="frontClassName" style="width:200px;height:30px;" onchange="javascript:pageQuery_realtime();">
						<option value="" selected>全部</option>
						<option value="0">类名不为空</option>
						<option value="1">类名为空</option>
                    </select>
                </div>
                <span style="width:70px">状态</span>
                <div class="selectstyle">
                    <select id="status" name="status" style="width:200px;height:30px;" onchange="javascript:pageQuery_realtime();">
						<option value="" selected>全部</option>
						<option value="1">可用</option>
						<option value="0">停用</option>
                    </select>
                </div>
            </div>
            <div>
                <input type="text" id="searchStr" name="searchStr" placeholder="搜索内容..." style="width:490px;">&nbsp;&nbsp;
                <input type="button" value="搜索" onclick="pageQuery_realtime();">
            </div>
        </form>
    </div>
</div>

<div id="infoPageDiv" style="display:none; ">
</div>

<script>
</script>

</body>
</html>
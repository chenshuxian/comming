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
<script src="${ctx}/js/inst/instItem.js?v=${randomVal}"></script>
<title>中心仪器项目对照</title>

<script type="text/javascript">
$(document).ready(function(){
	// 初始化项目对照列表Main页面
	var url = ctx + "/inst/instrumentsItem/instrumentsItemListMain";
	$("#itemListMainDiv").load(url,function(){
		$("#itemListMainDiv").show();
	});
});
</script>
</head>

<body class="bg">
<div class="search over">
    <div class="over">
        <h3>查询条件</h3>
        <form>
            <div>
                <span>机构</span>
					<div>
						<input type="hidden" id="orgsId" name="orgsId" />
						<input type="text" id="orgName" name="orgName" placeholder="" readonly="readonly"><input type="button" value=" 选 择 " onclick="getAllOrgsInfo();" />
					</div>
					<span>仪器</span>
					<div>
						<input type="hidden" id="instrumentId" name="instrumentId" />
						<input type="text" id="instrumentName" name="instrumentName" placeholder="" readonly="readonly">
						<input type="button" value=" 选 择 " onclick="getAllInstrumentInfo();" />
					</div>
            </div>
        </form>
    </div>
</div>

<!-- 客户仪器项目对照列表DIV -->

<div class="yi_c over">
	<div id="itemListMainDiv" style="display:none;"></div>
</div>

<!-- 弹出窗口DIV -->
<div id="openPageDiv" class="xinxi"></div>

</body>
</html>
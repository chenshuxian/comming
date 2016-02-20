<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<script src="${ctx}/js/xuan.js?var=1.0.0.0"></script>
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

<script type="text/javascript">
$(document).ready(function(){
	$("#itemSearchStr").focus();
});
</script>

</head>
<body class="bg">
        <h3>仪器项目对照列表</h3>
        <div class="btn">
            <a href="javascript:openTestItemAdd();" class="jy_btn">添加检验项目</a>
            <a href="javascript:saveItemList();" class="tianjia">保存</a>
            <a href="javascript:deleteItemBatch();">删除</a>
            <span style="line-height: 30px; font-weight: bold; margin-right: 12px;">查找项目</span>
            <input type="text" id="itemSearchStr" name="itemSearchStr" /><input type="button" value="查找" onclick="javasscript:testItemListQuery();">
            <input type="hidden" id="instrumentId" name="instrumentId" />
        </div>
        
		<!-- 仪器项目对照列表List -->
		<div id="itemListDiv" style="display:none;"></div>
</body>
</html>
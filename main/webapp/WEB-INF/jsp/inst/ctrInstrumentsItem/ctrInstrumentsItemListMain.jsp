<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

<script type="text/javascript">
$(document).ready(function(){
	testItemListQuery();
});
</script>

</head>

<body class="bg">
<div class="yi_c over">
    <div style="height:250px;">
        <h3>仪器项目对照列表</h3>
        <div class="btn">
            <a href="javascript:openTestItemAdd();" class="jy_btn">添加检验项目</a>
            <a href="javascript:saveItemList();" class="tianjia">保存</a>
            <a href="javascript:deleteItemBatch();">删除</a>
            <input type="text" id="itemSearchStr" name="itemSearchStr" />
            <input type="button" value="查找" onclick="javasscript:testItemListQuery();">
            <input type="hidden" id="instrumentId" name="instrumentId" />
            <span id="itemRowsNum" class="fr"></span>
        </div>
        
		<!-- 仪器项目对照列表List -->
		<div id="itemListDiv" style="display:none;width:100%;height:190px;overflow:auto;"></div>
    </div>
</div>

</body>
</html>
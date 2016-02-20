<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

<script type="text/javascript">
$(document).ready(function(){
	micsListQuery('2');
});
</script>

</head>

<body class="bg">
<div class="yi_c over">
    <div style="height:250px;">
        <h3>抗生素列表</h3>
        <div class="btn">
            <a href="javascript:openMicsAdd('2');" class="jy_btn">添加抗生素</a>
            <a href="javascript:saveMicsList('2');" class="tianjia">保存</a>
            <a href="javascript:deleteMicsBatch('2');">删除</a>
            <input type="text" id="antiSearchStr" name="antiSearchStr" />
            <input type="button" value="查找" onclick="javasscript:micsListQuery('2');">
            <input type="hidden" id="instrumentId" name="instrumentId" />
            <span id="antiRowsNum" class="fr"></span>
        </div>
        
		<!-- 抗生素对照列表List -->
		<div id="antiListDiv" style="display:none;width:100%;height:190px;overflow:auto;"></div>
    </div>
</div>

</body>
</html>
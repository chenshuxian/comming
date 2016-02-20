<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>中心仪器信息查看</title>
    
<script type="text/javascript">
$(document).ready(function(){
	// 初始化赋值
	$("#reportTemplateId").val("${entity.reportTemplateId }");
	$("#typeId").val("${entity.typeId }");
	
	$("#closeBtn").focus();
});

function closeWin(){
    $(".oy").remove();
    $(".xinxi").hide();
}

</script>

</head>

<body class="bg">

    <h3>基本信息<a href="javascript:closeWin();"></a><b class="codeNo">编码:${entity.codeNo }</b></h3>
    <form>
    	<input type="hidden" id="opType" name="opType" value="${opType} }"/>
    	
		<div>
			<span><i>*</i>仪器名称</span><input type="text" id="name" name="name" value="${entity.name }" disabled />
			<span><i>*</i>仪器型号</span><input type="text" id="model" name="model" value="${entity.model }" disabled />
		</div>
		<div>
			<span>生产厂家</span><input type="text" id="producer" name="producer" value="${entity.producer }" disabled />
            <span>单列报告模板</span>
            <div class="selectstyle1">
<!--                 <select name="reportTemplateId" id="reportTemplateId" class="select_box" disabled > -->
<!--                 	<option value="">&nbsp;</option> -->
<%-- 					<c:forEach items="${rtList}" var="item" varStatus="status"> --%>
<%-- 						<option value="${item.id}">${item.name}</option> --%>
<%-- 					</c:forEach> --%>
<!--                 </select> -->
                <input type="text" id="sampleTypeId" name="sampleTypeId" value="${entity.reportTemplateName }" disabled />
            </div>
		</div>
		<div>
			<span><i>*</i>默认标本类型</span>
            <div class="selectstyle1">
<!--                 <select name="sampleTypeId" id="sampleTypeId" class="select_box" disabled> -->
<%-- 					<c:forEach items="${stList}" var="item" varStatus="status"> --%>
<!-- 						<option value="">&nbsp;</option> -->
<%-- 						<option value="${item.id}">${item.name}</option> --%>
<%-- 					</c:forEach> --%>
<!--                 </select> -->
                <input type="text" id="sampleTypeId" name="sampleTypeId" value="${entity.sampleTypeName }" disabled />
            </div>
			<span>助记符</span><input type="text" id="fastCode" name="fastCode" value="${entity.fastCode }" disabled />
		</div>
		<div>
			<span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" value="${entity.displayOrder }" disabled />
			<span><i>*</i>仪器类型</span>
            <div class="selectstyle1">
                <select name="typeId" id="typeId" class="select_box" disabled>
                	<option value="">&nbsp;</option>
					<option value="0">常规</option>
					<option value="1">微生物</option>
					<option value="2">文字报告</option>
					<option value="3">酶标</option>
                </select>
            </div>
		</div>
        <div class="btns">
            <input id ="closeBtn" type="button" value="确定" onclick="javascript:closeWin();">
        </div>
    </form>

</body>
</html>
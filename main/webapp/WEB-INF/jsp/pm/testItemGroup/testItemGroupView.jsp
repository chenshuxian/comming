<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">
<script src="${ctx}/js/enterToTab.js"></script>
<script>
$(document).ready(function () {
	$("#closeBtn").focus();
});
</script>
<title>检验项目添加修改</title>
</head>
<body>
	<h3>
		组合项目信息<a href="javascript:closeView();"></a>
		<span class="codeNo">编码:${testItemGroup.codeNo}</span>
	</h3>
    <form id="crtTestItemGroupFrom">
        <input type="hidden" id="type" name="type" value="${type }"/>
    	<input type="hidden" id="id" name="id" value='<c:out value="${testItemGroup.id }"/>'>
    	<input type="hidden" id="codeNo" name="codeNo" value='<c:out value="${testItemGroup.codeNo }"/>'>
    	<input type="hidden" id="itemTypeId" name="itemTypeId" value='2'/>
		<div>
            <span><i>*</i>组合名称</span><input type="text" id="name" name="name" value='<c:out value="${testItemGroup.name}"/>' disabled="disabled">
            <span>英文简称</span><input type="text" id="enShortName" name="enShortName" value='<c:out value="${testItemGroup.enShortName}"/>' disabled="disabled">
        </div>
        <div>
            <span>英文名称</span><input type="text" id="enName" name="enName" value='<c:out value="${testItemGroup.enName}"/>' disabled="disabled">
            <span><i>*</i>默认标本类型</span><input type="text" id="enName" name="enName" value='<c:out value="${testItemGroup.sampleTypeName}"/>' disabled="disabled">
<!--             <div class="selectstyle"> -->
<!--                 <select name="sampleTypeId" id="sampleTypeId" class="select_box" disabled="disabled"> -->
<%--                     <c:forEach items="${sampleTypeList }" var="sampleType"> --%>
<%--                     <option <c:if test="${testItemGroup.sampleTypeId == sampleType.id }">selected="selected"</c:if> value="${sampleType.id }">${sampleType.name }</option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
<!--             </div> -->
        </div>
        <div>
            <span>助记符</span><input type="text" id="fastCode" name="fastCode" value='<c:out value="${testItemGroup.fastCode}"/>' disabled="disabled">
            <span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" value='<c:out value="${testItemGroup.displayOrder}"/>' maxlength="6" placeholder="数字型，最大长度6位" disabled="disabled">
        </div>
       <%--  <div>
            <span>按单项统计检测工作量</span><input type="checkbox" id="isIndividualStat" name="isIndividualStat" value='0' <c:if test="${testItemGroup.isIndividualStat == 0}">checked="checked"</c:if>/ disabled="disabled">
        </div> --%>
        <div class="btns">
            <input id = "closeBtn" type="button" value="关 闭" onclick="closeView();">
        </div>
    </form>
</body>
</html>
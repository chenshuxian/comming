<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">
<script src="${ctx}/js/enterToTab.js"></script>
<script type="text/javascript">
//关闭添加修改页面
function closeView(){
    $(".oy").remove();
    $("#testItemView").hide();
}
$(document).ready(function () {
	$("#closeBtn").focus();
});
</script>
<title>检验项目添加修改</title>
</head>
<body class="bg">
	<h3>基本信息<a href="javascript:closeView();"></a></h3>
    <form id="crtTestItemFrom">
        <div>
            <span> <i>*</i>达安标准码</span><input type="text" id="codeNo" name="codeNo" value='<c:out value="${crtTestItemDto.codeNo}"/>' disabled="disabled">
            <span> <i>*</i>项目名称</span><input type="text" id="name" name="name" value='<c:out value="${crtTestItemDto.name}"/>' disabled="disabled">
        </div>
        <div>
            <span> <i>*</i>英文名称</span><input type="text" id="enName" name="enName" value='<c:out value="${crtTestItemDto.enName}"/>' disabled="disabled">
            <span> <i>*</i>英文简称</span><input type="text" id="enShortName" name="enShortName" value='<c:out value="${crtTestItemDto.enShortName}"/>' disabled="disabled">
        </div>
        <div>
            <span> <i>*</i>项目性别</span>
            <c:if test="${crtTestItemDto.sexId == 3}"><input type="text" value="不限" disabled="disabled"/></c:if>
            <c:if test="${crtTestItemDto.sexId == 1}"><input type="text" value="男" disabled="disabled"/></c:if>
            <c:if test="${crtTestItemDto.sexId == 2}"><input type="text" value="女" disabled="disabled"/></c:if>
<!--             <div class="selectstyle"> -->
<!--                 <select name="sexId" id="sexId" disabled="disabled" class="select_box"> -->
<%--                     <option <c:if test="${crtTestItemDto.sexId == 3}">selected="selected"</c:if> value="3">不限</option> --%>
<%--                     <option <c:if test="${crtTestItemDto.sexId == 1}">selected="selected"</c:if> value="1">男</option> --%>
<%--                     <option <c:if test="${crtTestItemDto.sexId == 2}">selected="selected"</c:if> value="2">女</option> --%>
<!--                 </select> -->
<!--             </div> -->
            <span><i>*</i>检验方法</span><input type="text" value="<c:out value="${crtTestItemDto.testMethodName}" escapeXml="true"/>" disabled="disabled"/>
<!--             <div class="selectstyle"> -->
<!--                 <select name="testMethodId" id="testMethodId" disabled="disabled" class="select_box"> -->
<%--                     <c:forEach items="${testMethodList }" var="testMethod"> --%>
<%--                     	<option <c:if test="${crtTestItemDto.testMethodId == testMethod.id }">selected="selected"</c:if> value = "${testMethod.id }">${testMethod.name }</option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
<!--             </div> -->
        </div>
        <div>
            <span> <i>*</i>医学专业组</span><input type="text" value="<c:out value="${crtTestItemDto.disciplineName}" escapeXml="true"/>" disabled="disabled"/>
<!--             <div class="selectstyle"> -->
<!--                 <select name="disciplineId" id="disciplineId" disabled="disabled" class="select_box"> -->
<%--                     <c:forEach items="${disciplineList }" var="discipline"> --%>
<%--                     <option <c:if test="${discipline.id == crtTestItemDto.disciplineId}">selected="selected"</c:if> value="${discipline.id }">${discipline.name }</option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
<!--             </div> -->
            <span><i>*</i>默认标本类型</span><input type="text" value="<c:out value="${crtTestItemDto.sampleTypeName}" escapeXml="true"/>" disabled="disabled"/>
<!--             <div class="selectstyle"> -->
<!--                 <select name="sampleTypeId" id="sampleTypeId" disabled="disabled" class="select_box"> -->
<%--                     <c:forEach items="${sampleTypeList }" var="sampleType"> --%>
<%--                     <option <c:if test="${sampleType.id == crtTestItemDto.sampleTypeId}">selected="selected"</c:if> value="${sampleType.id }">${sampleType.name }</option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
<!--             </div> -->
        </div>
        <div>
            <span>参考值方式</span>
	            <c:if test="${crtTestItemDto.refMethod == ''}"><input type="text" value="" disabled="disabled"/></c:if> 
	            <c:if test="${crtTestItemDto.refMethod == '[Min –Max]'}"><input type="text" value="[Min –Max]" disabled="disabled"/></c:if>
	            <c:if test="${crtTestItemDto.refMethod == '[<Max]'}"><input type="text" value="[&lt;Max]" disabled="disabled"/></c:if>
	            <c:if test="${crtTestItemDto.refMethod == '[<=Max]'}"><input type="text" value="[&lt;=Max]" disabled="disabled"/></c:if>
	            <c:if test="${crtTestItemDto.refMethod == '[>Min]'}"><input type="text" value="[>Min]" disabled="disabled"/></c:if>
	            <c:if test="${crtTestItemDto.refMethod == '[>=Min]'}"><input type="text" value="[>=Min]" disabled="disabled"/></c:if>
<!--             <div class="selectstyle"> -->
<!--                 <select name="refMethod" id="refMethod" disabled="disabled" class="select_box"> -->
<%--                     <option <c:if test="${crtTestItemDto.refMethod == ''}">selected="selected"</c:if> value=""></option> --%>
<%--                     <option <c:if test="${crtTestItemDto.refMethod == '[Min –Max]'}">selected="selected"</c:if> value="[Min –Max]">[Min –Max]</option> --%>
<%-- 					<option <c:if test="${crtTestItemDto.refMethod == '[<Max]'}">selected="selected"</c:if>value="[&lt;Max]">[&lt;Max]</option> --%>
<%-- 					<option <c:if test="${crtTestItemDto.refMethod == '[<=Max]'}">selected="selected"</c:if>value="[&lt;=Max]">[&lt;=Max]</option> --%>
<%-- 					<option <c:if test="${crtTestItemDto.refMethod == '[>Min]'}">selected="selected"</c:if>value="[>Min]">[>Min]</option> --%>
<%-- 					<option <c:if test="${crtTestItemDto.refMethod == '[>=Min]'}">selected="selected"</c:if>value="[>=Min]">[>=Min]</option> --%>
<!--                 </select> -->
<!--             </div> -->
            <span>单位</span><input type="text" value="<c:out value="${crtTestItemDto.unit}" escapeXml="true"/>" disabled="disabled"/>
<!--             <div class="selectstyle"> -->
<!--                 <select name="unit" id="unit" disabled="disabled" class="select_box"> -->
<%--                     <c:forEach items="${unitList }" var="units"> --%>
<%--                     <option <c:if test="${units.name == crtTestItemDto.unit}">selected="selected"</c:if> value="${units.id }">${units.name }</option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
<!--             </div> -->
        </div>
        <div>
            <span>结果类型</span><input type="text" value="<c:out value="${crtTestItemDto.resultTypeName}" escapeXml="true"/>" disabled="disabled"/>
<!--             <div class="selectstyle"> -->
<!--                 <select name="resultTypeId" id="resultTypeId" disabled="disabled" class="select_box"> -->
<%--                     <c:forEach items="${resultTypesList }" var="resultType"> --%>
<%--                     <option <c:if test="${resultType.id == crtTestItemDto.resultTypeId}">selected="selected"</c:if> value="${resultType.id }">${resultType.name }</option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
<!--             </div> -->
            <span>小数位数</span><input type="text" id="resultPrecision" name="resultPrecision" value='<c:out value="${crtTestItemDto.resultPrecision}"/>' disabled="disabled">
        </div>
        <div>
            <span>助记符</span><input type="text" id="fastCode" name="fastCode" value='<c:out value="${crtTestItemDto.fastCode}"/>' disabled="disabled">
            <span>国家标准码</span><input type="text" id="stdCode" name="stdCode" value='<c:out value="${crtTestItemDto.stdCode}"/>' disabled="disabled">
        </div>
        <div>
            <span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" value='<c:out value="${crtTestItemDto.displayOrder}"/>' disabled="disabled">
            <span>备注</span><input type="text" id="memo" name="memo" value='<c:out value="${crtTestItemDto.memo}"/>' disabled="disabled">
        </div>
        <div>
            <!-- span>状态</span -->
            <div class="selectstyle" style="display: none;" disabled="disabled">
                <select name="status" id="status">
                    <option selected="selected" value="0">可用</option>
                    <option value="1">停用</option>
                </select>
            </div>
<%--             <span>冰冻</span><input type="checkbox" id="isFreeze" name="isFreeze" value='1' <c:if test="${crtTestItemDto.isFreeze == 1}">checked="checked"</c:if>/> --%>
        </div>
        <div class="btns">
            <input type="button" id="closeBtn" value="关 闭" onclick="closeView();">
        </div>
    </form>
</body>
</html>
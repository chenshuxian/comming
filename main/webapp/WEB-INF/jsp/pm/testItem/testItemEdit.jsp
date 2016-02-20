<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/enterToTab.js"></script>
<script>
$(document).ready(function () {
	testMethodGrid = new TextCombo(testMethodParam);
	disciplineGrid = new TextCombo(disciplineParam);
	sampleTypeGrid = new TextCombo(sampleTypeParam);
	unitGrid = new TextCombo(unitParam);
	resultTypeGrid = new TextCombo(resultTypeParam);
	setTimeout(function(){
		$("input[name='testMethodId']").val("${crtTestItemDto.testMethodId}");  
		testMethodGrid.setText("${crtTestItemDto.testMethodName}");
		$("input[name='disciplineId']").val("${crtTestItemDto.disciplineId}");
		disciplineGrid.setText("${crtTestItemDto.disciplineName}");
		$("input[name='sampleTypeId']").val("${crtTestItemDto.sampleTypeId}");
		sampleTypeGrid.setText("${crtTestItemDto.sampleTypeName}");
		unitGrid.setText("${crtTestItemDto.unit}");
		if('${crtTestItemDto.resultTypeId}' != 0 ){
			$("input[name='resultTypeId']").val("${crtTestItemDto.resultTypeId}");
			resultTypeGrid.setText("${crtTestItemDto.resultTypeName}");
		}
	},500);
	$("#codeNo").focus();
});
//关闭添加修改页面
function closeEdit(){
    $(".oy").remove();
    $("#xinxi").hide();
}
</script>
<title>检验项目添加修改</title>
</head>
<body>
	<h3>基本信息<a href="javascript:closeEdit();"></a></h3>
    <form id="crtTestItemFrom">
        <input type="hidden" id="type" name="type" value="${type}"/>
    	<input type="hidden" id="id" name="id" value='<c:out value="${crtTestItemDto.id}" escapeXml="true"/>'>
    	<input id="itemTypeId" name="itemTypeId" type="hidden" value='1'/>
		<input id="testItemId" name="testItemId" type="hidden" value='<c:out value="${crtTestItemDto.testItemId}" escapeXml="true"/>'/>
		<input id="gridTestMethodId" name="gridTestMethodId" type="hidden" value="${crtTestItemDto.testMethodId}"/>
		<input id="codeNoValidation" name="codeNoValidation" type="hidden" value="<c:out value="${crtTestItemDto.codeNo}" escapeXml="true"/>" />
        <input id="nameValidation" name="nameValidation" type="hidden" value="<c:out value="${crtTestItemDto.name}" escapeXml="true"/>">
        <div>
            <span> <i>*</i>达安标准码</span><input onblur="checkSpecialSymbol('codeNo',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="codeNo" name="codeNo" value='<c:out value="${crtTestItemDto.codeNo}" escapeXml="true"/>' maxlength="15" <c:if test="${type == 'edit'}">readonly="readonly"</c:if>>
            <span> <i>*</i>项目名称</span><input onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="name" name="name" value='<c:out value="${crtTestItemDto.name}" escapeXml="true"/>' maxlength="55">
        </div>
        <div>
            <span> <i>*</i>英文名称</span><input onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enName" name="enName" value='<c:out value="${crtTestItemDto.enName}" escapeXml="true"/>' maxlength="55">
            <span> <i>*</i>英文简称</span><input onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enShortName" name="enShortName" value='<c:out value="${crtTestItemDto.enShortName}" escapeXml="true"/>' maxlength="30">
        </div>
        <div>
            <span> <i>*</i>项目性别</span>
            <div class="selectstyle" style="width: 180px;margin-left: 20px">
                <select name="sexId" id="sexId" class="select_box" >
                    <option <c:if test="${crtTestItemDto.sexId == 3}">selected="selected"</c:if> value="3">不限</option>
                    <option <c:if test="${crtTestItemDto.sexId == 1}">selected="selected"</c:if> value="1">男</option>
                    <option <c:if test="${crtTestItemDto.sexId == 2}">selected="selected"</c:if> value="2">女</option>
                </select>
            </div>
            <span><i>*</i>检验方法</span>
            <div class="selectstyle">
            	<div id="testMethod" style="width: 190px"></div>
                <%-- <select name="testMethodId" id="testMethodId" class="select_box">
                    <c:forEach items="${testMethodList }" var="testMethod">
                    	<option <c:if test="${crtTestItemDto.testMethodId == testMethod.id }">selected="selected"</c:if> value = "${testMethod.id }"><c:out value="${testMethod.name }" escapeXml="true"/></option>
                    </c:forEach>
                </select> --%>
            </div>
        </div>
        <div>
            <span> <i>*</i>医学专业组</span>
            <div class="selectstyle">
            	<div id="discipline" style="width: 190px"></div>
            <%--    <select name="disciplineId" id="disciplineId" class="select_box">
                    <c:forEach items="${disciplineList }" var="discipline">
                    <option <c:if test="${discipline.id == crtTestItemDto.disciplineId}">selected="selected"</c:if> value="${discipline.id }"><c:out value="${discipline.name }" escapeXml="true"/></option>
                    </c:forEach>
                </select>--%>
            </div>
            <span><i>*</i>默认标本类型</span>
            <div class="selectstyle">
                 <div id="sampleType" style="width: 190px"></div>
<!--                 <select name="sampleTypeId" id="sampleTypeId" class="select_box"> -->
<%--                     <c:forEach items="${sampleTypeList }" var="sampleType"> --%>
<%--                     <option <c:if test="${sampleType.id == crtTestItemDto.sampleTypeId}">selected="selected"</c:if> value="${sampleType.id }"><c:out value="${sampleType.name }" escapeXml="true"/></option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
            </div>
        </div>
        <div>
            <span>参考值方式</span>
            <div class="selectstyle" style="width: 180px;margin-left: 20px">
                <select name="refMethod" id="refMethod" class="select_box">
                    <option <c:if test="${crtTestItemDto.refMethod == ''}">selected="selected"</c:if> value=""></option>
                    <option <c:if test="${crtTestItemDto.refMethod == '[Min –Max]'}">selected="selected"</c:if> value="[Min –Max]">[Min –Max]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[<Max]'}">selected="selected"</c:if>value="[&lt;Max]">[&lt;Max]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[<=Max]'}">selected="selected"</c:if>value="[&lt;=Max]">[&lt;=Max]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[>Min]'}">selected="selected"</c:if>value="[>Min]">[>Min]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[>=Min]'}">selected="selected"</c:if>value="[>=Min]">[>=Min]</option>
                </select>
            </div>
            <span>单位</span>
            <div class="selectstyle">
                 <div id="units" style="width: 190px"></div>
<!--                 <select name="unit" id="unit" class="select_box"> -->
<%--                     <c:forEach items="${unitList }" var="units"> --%>
<%--                     <option <c:if test="${units.name == crtTestItemDto.unit}">selected="selected"</c:if> value="${units.name }"><c:out value="${units.name }" escapeXml="true"/></option> --%>
<%--                     </c:forEach> --%>
<!--                 </select> -->
            </div>
        </div>
        <div>
            <span>结果类型</span>
            <div class="selectstyle">
                   <div id="resultType" style="width: 190px"></div>
<!--                 <select name="resultTypeId" id="resultTypeId" class="select_box"> -->
<%--                 	<option <c:if test="${crtTestItemDto.resultTypeId == 1}">selected="selected"</c:if> value="1">结果类型1</option> --%>
<%--                     <option <c:if test="${crtTestItemDto.resultTypeId == 2}">selected="selected"</c:if> value="2">结果类型2</option> --%>
<%--                     <option <c:if test="${crtTestItemDto.resultTypeId == 3}">selected="selected"</c:if> value="3">结果类型3</option> --%>
<!--                 </select> -->
            </div>
            <span>小数位数</span><input onblur="checkSpecialSymbol('resultPrecision',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="resultPrecision" name="resultPrecision" value='<c:if test="${crtTestItemDto.resultPrecision != 0}"><c:out value="${crtTestItemDto.resultPrecision}" escapeXml="true"/></c:if>' maxlength="9">
        </div>
        <div>
            <span>助记符</span><input onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="fastCode" name="fastCode" value='<c:out value="${crtTestItemDto.fastCode}" escapeXml="true"/>' maxlength="9">
            <span>国家标准码</span><input onblur="checkSpecialSymbol('stdCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="stdCode" name="stdCode" value='<c:out value="${crtTestItemDto.stdCode}" escapeXml="true"/>' maxlength="15">
        </div>
        <div>
            <span>顺序号</span><input onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="displayOrder" name="displayOrder" value='<c:out value="${crtTestItemDto.displayOrder}" escapeXml="true"/>' maxlength="6" placeholder="数字型，最大长度6位">
            <span>备注</span><input onblur="checkSpecialSymbol('memo',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="memo" name="memo" value='<c:out value="${crtTestItemDto.memo}" escapeXml="true"/>' maxlength="150">
        </div>
        <div>
            <!-- span>状态</span>
            <div class="selectstyle" style="display: none;">
                <select name="status" id="status">
                    <option value="0">可用</option>
                    <option selected="selected" value="1">停用</option>
                </select>
            </div>-->
<%--             <span>冰冻</span><input type="checkbox" id="isFreeze" name="isFreeze" value='1' <c:if test="${crtTestItemDto.isFreeze == 1}">checked="checked"</c:if>/> --%>
        </div>
        <div class="btns">
            <input type="button" value="确 定" onclick="save();" id='<%=COMFIRM_ID%>'>
            <input type="button" value="取 消" onclick="closeEdit();" id='<%=CANCEL_ID%>'>
        </div>
    </form>
    <!-------------------------------------------------------------------------------- 
	---------------------------默认样本类型下拉Grid数据源------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridTestMethod" class="tablebox_02" style="width: 180px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="testMethod" items="${testMethodList}">
					<tr id="${testMethod.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${testMethod.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------医学专业组下拉Grid数据源--------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridDiscipline" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="discipline" items="${disciplineList}">
					<tr id="${discipline.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;"><c:out value="${discipline.name }" escapeXml="true"/></td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------默认标本类型下拉Grid数据源-------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridSampleType" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="sampleType" items="${sampleTypeList}">
					<tr id="${sampleType.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${sampleType.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------单位Grid数据源--------------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridUnit" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="units" items="${unitList}">
					<tr id="${units.name}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${units.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	<!-------------------------------------------------------------------------------- 
	---------------------------结果类型下拉Grid数据源--------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridResultType" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="resultType" items="${resultTypesList}">
					<tr id="${resultType.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;"><c:out value="${resultType.name }" escapeXml="true"/></td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
</body>
</html>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/inst/instruments.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>中心仪器信息修改</title>
    
<script type="text/javascript">
$(document).ready(function(){
	// 初始化赋值
	sampleTypeGrid = new TextCombo(sampleTypeParam);
	reportTemplateGrid = new TextCombo(reportTemplateParam);
	setTimeout(function(){
		$("input[name='sampleTypeId']").val("${entity.sampleTypeId}");
		sampleTypeGrid.setText("${entity.sampleTypeName}");
		$("input[name='reportTemplateId']").val("${entity.reportTemplateId}");
		reportTemplateGrid.setText("${entity.reportTemplateName}");
	},500);
	
	$("#typeId").val("${entity.typeId }");
	$("#name").focus();
});
</script>

</head>

<body class="bg">

    <h3>基本信息<a href="javascript:closeWin();"></a><b class="codeNo">编码:${entity.codeNo }</b></h3>
    <form id="editForm" name="editForm">
    	<input type="hidden" id="opType" name="opType" value="${opType }"/>
    	<input type="hidden" id="id" name="id" value="${entity.id }"/>
    	
		<div>
			<span><i>*</i>仪器名称</span><input type="text" id="name" name="name" value="${entity.name }"  maxlength="30" onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
			<span><i>*</i>仪器型号</span><input type="text" id="model" name="model" value="${entity.model }"  maxlength="20" onblur="checkSpecialSymbol('model',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')"/>
		</div>
		<div>
			<span>生产厂家</span><input type="text" id="producer" name="producer" value="${entity.producer }" onblur="checkSpecialSymbol('producer',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
            <span>单列报告模板</span>
            <div class="selectstyle1">
            	<div id="reportTemplateDiv" style="width: 190px"></div>
<!--                 <select id="reportTemplateId" name="reportTemplateId" class="select_box"> -->
<!--                 	<option value="">&nbsp;</option> -->
<%-- 					<c:forEach items="${rtList}" var="item" varStatus="status"> --%>
<%-- 						<option value="${item.id}">${item.name}</option> --%>
<%-- 					</c:forEach> --%>
<!--                 </select> -->
            </div>
		</div>
		<div>
			<span><i>*</i>默认标本类型</span>
            <div class="selectstyle1">
            	<div id="sampleTypeDiv" style="width: 190px"></div>
<!--                 <select id="sampleTypeId" name="sampleTypeId" class="select_box"> -->
<!--                 	<option value="">&nbsp;</option> -->
<%-- 					<c:forEach items="${stList}" var="item" varStatus="status"> --%>
<%-- 						<option value="${item.id}">${item.name}</option> --%>
<%-- 					</c:forEach> --%>
<!--                 </select> -->
            </div>
			<span>助记符</span><input type="text" id="fastCode" name="fastCode" value="${entity.fastCode }" onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" value="${entity.displayOrder }" maxlength="6" onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
			<span><i>*</i>仪器类型</span>
            <div class="selectstyle1">
                <select id="typeId" name="typeId" class="select_box">
                	<option value="">&nbsp;</option>
					<option value="0">常规</option>
					<option value="1">微生物</option>
					<option value="2">文字报告</option>
					<option value="3">酶标</option>
                </select>
            </div>
		</div>
        <div class="btns">
            <input type="button" value="确定" onclick="javascript:updateIt();" onkeydown='if(event.keyCode==13){}'>
            <input type="reset" value="取消" onclick="javascript:closeWin();">
        </div>
    </form>

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
 				<c:forEach var="item" items="${stList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>

	<!-------------------------------------------------------------------------------- 
	---------------------------单列报告模板下拉Grid数据源-------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridReportTemplate" class="tablebox_02" style="width: 200px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 200px;">
 				<c:forEach var="item" items="${rtList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
</body>
</html>
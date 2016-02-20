<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/basisDict/ctrDictCodes.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <script type="text/javascript">
	$(document).ready(function() {
		var name = $("#name").val();
		$("#name").focus().val(name);
	});
</script>
    <title>loinc字典-受检成份-修改</title>
</head>
<body class="bg">
	<h3>
		基本信息<a href="javascript:closeWin();"></a><b class="codeNo">编码:${entity.codeNo }</b>
	</h3>
	<form id="editForm" name="editForm">
    	<input type="hidden" id="opType" name="opType" value="${opType }" />
		<input type="hidden" id="codeNo" name="codeNo" value="${entity.codeNo }" />
		<input type="hidden" id="typeKey" name="typeKey" value="${typeKey}" />
		<input type="hidden" id="id" name="id" value="${entity.id }"/>		
		<div>
			<span><i>*</i>中文名称</span>
			<input type="text" id="name" name="name" maxlength="30" value= "<c:out value="${entity.name}" escapeXml="true"></c:out>" style = "width:70%;" onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>英文简称</span>
			<input type="text" id="enShortName" name="enShortName" maxlength="20" value="<c:out value="${entity.enShortName}" escapeXml="true"></c:out>" style = "width:70%;" onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
		<div>
			<span>英文名称</span>
			<input type="text" id="enName" name="enName" maxlength="55" value="<c:out value="${entity.enName}" escapeXml="true"></c:out>" style = "width:70%;" onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>助记符</span>
			<input type="text" id="fastCode" name="fastCode"  maxlength="9" value="<c:out value="${entity.fastCode}" escapeXml="true"></c:out>" style = "width:70%;" onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
		<div>
			<span>顺序号</span>
			<input type="text" id="displayOrder" name="displayOrder"  maxlength="6" value="<c:out value="${entity.displayOrder}" escapeXml="true"></c:out>"  style = "width:70%;" onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
		<div>
			<span>备注</span>
			<input type="text" id="memo" name="memo" maxlength="150" value="<c:out value="${entity.memo}" escapeXml="true"></c:out>"  style = "width:70%;" onblur="checkSpecialSymbol('memo',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
        <div class="btns">
            <input type="button" id='<%=COMFIRM_ID%>' value="确定" onclick="javascript:updateDictCode();">
            <input type="reset" id='<%=CANCEL_ID%>'  value="取消" onclick="javascript:closeWin();">
        </div>
    </form>
</body>
</html>
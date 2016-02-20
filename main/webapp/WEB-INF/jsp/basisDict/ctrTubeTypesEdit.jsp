<%-- <!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/basisDict/ctrTubeTypes.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>基础字典-试管类型-修改</title>
<script type="text/javascript">
	$(document).ready(function() {
		var name = $("#name").val();
		$("#name").focus().val(name);
	});
</script>
</head>
<body class="bg">
	<h3>
		基本信息<a href="javascript:closeWin();"></a>
		<b class="codeNo">编码:${entity.codeNo}</b>
	</h3>
	<form id="editForm" name="editForm">
		<input type="hidden" id="codeNo" name="codeNo" value="${entity.codeNo}" />
		<input type="hidden" id="id" name="id" value="${entity.id}" />
		<div>
			<span><i>*</i>中文名称</span>
			<input type="text" id="name" name="name" maxlength="30" value="${entity.name}" style = "width:70%;" onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>英文简称</span>
			<input type="text" id="enShortName" name="enShortName" maxlength="20" value="${entity.enShortName}" style = "width:70%;" onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
		<div>
			<span>英文名称</span>
			<input type="text" id="enName" name="enName" maxlength="30" value="${entity.enName}" style = "width:70%;" onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>助记符</span>
			<input type="text" id="fastCode" name="fastCode" maxlength="9" value="${entity.fastCode}" style = "width:70%;" onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
		<div>
			<span>顺序号</span>
			<input type="text" id="displayOrder" name="displayOrder" maxlength="6" value="${entity.displayOrder}" style = "width:70%;" onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
		<div>
			<span>备注</span>
			<input type="text" id="memo" name="memo" maxlength="6" value="${entity.memo}" style = "width:70%;" onblur="checkSpecialSymbol('memo',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" /> 
		</div>
        <div class="btns">
            <input type="button" id='<%=COMFIRM_ID%>' value="确定" onclick="javascript:updateTubeType();" onkeydown='if(event.keyCode==13){}' />
            <input type="button" id='<%=CANCEL_ID%>' value="取消" onclick="javascript:closeWin();" />
        </div>
    </form>
</body>
</html> --%>
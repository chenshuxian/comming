<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<script src="${ctx}/js/basisDict/ctrResultTypes.js?var=${randomVal}"></script>
<script src="${ctx}/js/enterToTab.js"></script>
<title>基础字典-结果描述-修改</title>
<script type="text/javascript">
	$(document).ready(function() {
		var name = $("#resultValue").val();
		$("#resultValue").focus().val(name);
	});
</script>
</head>
<body class="bg">
    <div>
		<h3>
			基本信息<a href="javascript:closeWin();"></a>
		</h3>
	</div>
	<form id="editDetailForm" name="editDetailForm">
		<input type="hidden" id="typeId" name="typeId" value="${entity.typeId}" />
		<input type="hidden" id="id" name="id" value="${entity.id}" />
		<div>
			<span><i>*</i>结果描述</span> <input type="text" id="resultValue" name="resultValue" value="${entity.resultValue}" maxlength="150" style="width: 70%;" onblur="checkSpecialSymbol('resultValue',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>助记符</span> <input type="text" id="fastCode" name="fastCode" value="${entity.fastCode}" maxlength="9" style="width: 70%;" onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>顺序号</span> <input type="text" id="displayOrder" name="displayOrder" value="${entity.displayOrder}" maxlength="6" style="width: 70%;" onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div class="btns">
			<input type="button" value="确定" onclick="javascript:updateResultTypeDetail();"  onkeydown='if(event.keyCode==13){}' />
			<input type="button" value="取消" onclick="javascript:closeWin();" />
		</div>
	</form>
</body>
</html>
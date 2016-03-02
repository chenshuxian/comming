<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap">
	<div class="pop-container">
		<div class="wrapper-container">
			<form id="InfoForm">
				<div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
					<small class="basic-code">编码: ${codeNo}<span id="spanEditCodeNo"></span></small>
				</div>
				<div class="wrapper-content">
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editName"><span class="required-icon">*</span>中文名称:</label>
								<input type="text" class="form-control block-show" id="editName" name="name"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editEnShortName">英文简称:</label>
								<input type="text" class="form-control block-show" id="editEnShortName"
									   name="enShortName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editEnName">英文名称:</label>
								<input type="text" class="form-control block-show" id="editEnName" name="enName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editWhonetCode">WHONET编码:</label>
								<input type="text" class="form-control block-show" id="editWhonetCode"
									   name="whonetCode"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editFastCode">助记符:</label>
								<input type="text" class="form-control block-show" id="editFastCode"
									   name="fastCode"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editDisplayOrder">顺序号:</label>
								<input type="text" class="form-control block-show" id="editDisplayOrder"
									   name="displayOrder" value="${displayOrder}"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editMemo">备注:</label>
								<textarea class="form-control block-show" id="editMemo" name="memo"></textarea>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="editId" name="id"/>
				<input type="hidden" id="opType" name="opType" value="${opType}"/>
				<input type="hidden" id="editCodeNo" name="codeNo" value="${codeNo}"/>
				<input type="hidden" id="editItemTypeId" name="itemTypeId" value="${itemTypeId}"/>
				<div class="wrapper-footer text-center">
					<button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
					<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
				</div>
			</form>
		</div>
	</div>
</div>

<%--<!DOCTYPE html>--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>--%>
<%--<html xmlns="http://www.w3.org/1999/xhtml">--%>
<%--<head lang="en">--%>
<%--<meta http-equiv="content-type" content="text/html; charset=UTF-8">--%>
<%--<script src="${ctx}/js/pm/bacteriaDictionary.js?var=${randomVal}"></script>--%>
<%--<script src="${ctx}/js/enterToTab.js?var=${randomVal}"></script>--%>
<%--<script type="text/javascript">--%>
	<%--$(document).ready(function() {--%>
		<%--$("#name").focus();--%>
	<%--});--%>
<%--</script>--%>
<%--<title>中心微生物-细菌字典-新增</title>--%>
<%--</head>--%>
<%--<body class="bg">--%>
	<%--<div>--%>
		<%--<h3>--%>
			<%--基本信息<a href="javascript:closeWin();"></a>--%>
			<%--<b class="codeNo">编码:${codeNo}</b>--%>
		<%--</h3>--%>
	<%--</div>--%>
	<%--<form id="addForm" name="addForm">--%>
		<%--<input type="hidden" id="opType" name="opType" value="${opType }" />--%>
		<%--<input type="hidden" id="codeNo" name="codeNo" value="${codeNo }" />--%>
		<%--<input type="hidden" id="itemTypeId" name="itemTypeId" value="${itemTypeId}" />--%>
		<%--<div>--%>
			<%--<span><i>*</i>中文名称</span> <input onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="name" name="name" maxlength="30" style="width: 70%;" />--%>
		<%--</div>--%>
		<%--<div>--%>
			<%--<span>英文简称</span> <input onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enShortName" name="enShortName" maxlength="20" style="width: 70%;" />--%>
		<%--</div>--%>
		<%--<div>--%>
			<%--<span>英文名称</span> <input onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enName" name="enName" maxlength="55" style="width: 70%;" />--%>
		<%--</div>--%>
		<%--<div>--%>
			<%--<span>WHONET编码</span> <input onblur="checkSpecialSymbol('whonetCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="whonetCode" name="whonetCode" maxlength="15" style="width: 70%;" />--%>
		<%--</div>--%>
		<%--<div>--%>
			<%--<span>助记符</span> <input onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="fastCode" name="fastCode" 	maxlength="9" style="width: 70%;" />--%>
		<%--</div>--%>
		<%--<div>--%>
			<%--<span>顺序号</span> <input onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="displayOrder"  value="${displayOrder}"	name="displayOrder" maxlength="6" style="width: 70%;" />--%>
		<%--</div>--%>
		<%--<div>--%>
			<%--<span>备注</span> <input onblur="checkSpecialSymbol('memo',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="memo" name="memo" maxlength="150" style="width: 70%;" />--%>
		<%--</div>--%>
		<%--<div class="btns">--%>
			<%--<input type="button" id='<%=COMFIRM_ID%>' value="确定" onclick="javascript:addDictCode();"  onkeydown='if(event.keyCode==13){}' />--%>
			<%--<input type="button" id='<%=CANCEL_ID%>'  value="取消" onclick="javascript:closeWin();" />--%>
		<%--</div>--%>
	<%--</form>--%>
<%--</body>--%>
<%--</html>--%>
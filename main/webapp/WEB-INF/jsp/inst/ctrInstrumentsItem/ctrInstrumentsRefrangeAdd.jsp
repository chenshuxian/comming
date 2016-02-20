<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/inst/instrumentsItem.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>参考值新增</title>
    
<script type="text/javascript">
$(document).ready(function(){
	sampleTypeGrid = new TextCombo(sampleTypeParam);
	sampleTypeGrid.focus();
});
</script>

</head>

<body class="bg">

    <h3>基本信息<a href="javascript:closeWin();"></a></h3>
    <form id="addForm" name="addForm">
    	<input type="hidden" id="opType" name="opType" value="${opType }"/>
    	
		<div>
			<span><i>*</i>标本类型</span>
            <div class="selectstyle1">
            	<div id="sampleTypeDiv" style="width: 120px"></div>
<!--                 <select id="sampleTypeId" name="sampleTypeId" style="width:90px;height:30px;"> -->
<%-- 					<c:forEach items="${stList}" var="item" varStatus="status"> --%>
<%-- 						<option value="${item.id}">${item.name}</option> --%>
<%-- 					</c:forEach> --%>
<!--                 </select> -->
            </div>
			<span><i>*</i>性别</span>
            <div class="selectstyle1">
                <select id="sexId" name="sexId" style="width:90px;height:30px;">
					<option value="1">男</option>
					<option value="2">女</option>
					<option value="3" selected>不限</option>
                </select>
            </div>
			<span><i>*</i>年龄单位</span>
            <div class="selectstyle1">
                <select id="ageUnitId" name="ageUnitId" style="width:90px;height:30px;">
					<option value="1" selected>岁</option>
					<option value="2">月</option>
					<option value="3">周</option>
					<option value="4">天</option>
					<option value="5">小时</option>
					<option value="6">详细年龄</option>
                </select>
            </div>
		</div>
		<div>
			<span><i>*</i>起始年龄</span><input type="text" id="ageMin" name="ageMin" maxlength="17" onblur="checkSpecialSymbol('ageMin',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
			<span><i>*</i>结束年龄</span><input type="text" id="ageMax" name="ageMax" maxlength="17" onblur="checkSpecialSymbol('ageMax',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>参考上限</span><input type="text" id="refHigh" name="refHigh" maxlength="15" onblur="checkSpecialSymbol('refHigh',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
			<span>参考下限</span><input type="text" id="refLow" name="refLow" maxlength="15" onblur="checkSpecialSymbol('refLow',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>危急上限</span><input type="text" id="panicHigh" name="panicHigh" maxlength="15" onblur="checkSpecialSymbol('panicHigh',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
			<span>危急下限</span><input type="text" id="panicLow" name="panicLow" maxlength="15" onblur="checkSpecialSymbol('panicLow',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>警告上限</span><input type="text" id="alarmHigh" name="alarmHigh" maxlength="15" onblur="checkSpecialSymbol('alarmHigh',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
			<span>警告下限</span><input type="text" id="alarmLow" name="alarmLow" maxlength="15" onblur="checkSpecialSymbol('alarmLow',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>文字描述</span><textarea id="refText" name="refText" rows="3" style="width:520px" maxlength="2000" />
		</div>
		<div>
			<span>备注</span><textarea id="refRemark" name="refRemark" rows="3" style="width:520px" maxlength="150" />
		</div>
        <div class="btns">
            <input type="button" value="确定" onclick="javascript:addRefrange();" onkeydown='if(event.keyCode==13){}'>
            <input type="button" value="取消" onclick="javascript:closeWin();">
        </div>
    </form>

	<!-------------------------------------------------------------------------------- 
	---------------------------标本类型下拉Grid数据源-------------------------------------
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
</body>
</html>
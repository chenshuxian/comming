<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<script>
	$(document).ready(function () {
		testItemGroupMain.sampleTypeGrid = new TextCombo(testItemGroupMain.sampleTypeParam);
		setTimeout(function() {
			$("input[name='sampleTypeId']").val("${ctrTestItems.sampleTypeId}");
			testItemGroupMain.sampleTypeGrid.setText("${ctrTestItems.sampleTypeName}");
		},500);
	});
</script>
<div class="pop-inner-wrap">
	<div class="pop-container">
		<div class="wrapper-container">
			<form id="InfoForm">
				<input type="hidden" id="id" name="id" />
				<input type="hidden" id="codeNo" name="codeNo" value="${codeNo}" />
				<input type="hidden" id="oldName" name="oldName" />
				<input type="hidden" id="itemTypeId" name="itemTypeId" value='2'/>
				<input type="hidden" id="opType" name="opType" value="${opType}" />
				<div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
					<small class="basic-code">编码:${codeNo}<span id="spanEditCodeNo"></span></small>
				</div>
				<div class="wrapper-content">
					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="name"><span class="required-icon">*</span>组合项目:</label>
										<input type="text" class="form-control block-show" id="name" name="name"/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="enName">英文名称:</label>
										<input type="text" class="form-control block-show" id="enName" name="enName"/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="enShortName">英文简称:</label>
										<input type="text" class="form-control block-show"  id="enShortName" name="enShortName"/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="sampleType"><span class="required-icon">*</span>默认标本类型:</label>
										<div id="sampleType" style="width: 197px"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="fastCode">助记符:</label>
										<input type="text" class="form-control block-show"  id="fastCode" name="fastCode"/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="displayOrder">顺序号:</label>
										<input type="text" class="form-control block-show"  id="displayOrder" name="displayOrder" value="${displayOrder}"/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-12">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container ">
										<span style="padding-right: 5px;" for="isIndividualStat">按单项统计检测工作量 :</span>
										<input type="checkbox"  id="isIndividualStat" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="wrapper-footer text-center">
					<%--<button data-show="addAreaUserSure" onclick="testItemGroupMain.saveGroupProject();" class="btn btn-submit sm-size J_ShowPop">确定</button>--%>
						<button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!--------------------------------------------------------------------------------
---------------------------默认标本类型下拉Grid数据源-------------------------------------
--------------------------------------------------------------------------------->
<div id="gridSampleType" class="tablebox_02" style="width: 180px; height: 211px; display: none;">
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
<%--<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>
<%--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">--%>
<%--<html>--%>
<%--<head>--%>
<%--<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">--%>
<%--<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">--%>
<%--<script src="${ctx}/js/enterToTab.js"></script>--%>
<%--<script>--%>
<%--//默认标本类型Grid--%>
<%--var sampleTypeParam = {					//下拉Grid参数,所有参数均为必填--%>
	<%--div_id:"sampleType", 				//对应表单DIV的id--%>
	<%--grid_id:"gridSampleType", 			//对应数据源Grid的Id--%>
	<%--name:"sampleTypeId",				//在表单中对应的提交name--%>
	<%--columnShow:1,						//将要在文本框中显示的列序号--%>
	<%--width : 180, 					    //Combo的宽度--%>
	<%--clearOff:false,						//是否禁用clear按钮--%>
	<%--searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列--%>
	<%--lockBy:[26,471],					//锁定Grid，传入数组[top,left]--%>
	<%--onEnter:function(){--%>
	<%--}--%>
<%--};--%>
<%--$(document).ready(function () {--%>
	<%--sampleTypeGrid = new TextCombo(sampleTypeParam);--%>
	<%--setTimeout(function(){--%>
		<%--$("input[name='sampleTypeId']").val("${testItemGroup.sampleTypeId}");--%>
		<%--//sampleTypeGrid.setValue("${testItemGroup.sampleTypeId}");--%>
		<%--sampleTypeGrid.setText("${testItemGroup.sampleTypeName}");--%>
	<%--},500); --%>
	<%--$("#name").focus();--%>
<%--});--%>
<%--</script>--%>
<%--<title>检验项目添加修改</title>--%>
<%--</head>--%>
<%--<body>--%>
	<%--<h3>--%>
		<%--组合项目信息<a href="javascript:closeEdit();"></a>--%>
		<%--<span class="codeNo">编码:${testItemGroup.codeNo}</span>--%>
	<%--</h3>--%>
    <%--<form id="crtTestItemGroupFrom">--%>
        <%--<input type="hidden" id="type" name="type" value="${type }"/>--%>
    	<%--<input type="hidden" id="id" name="id" value='<c:out value="${testItemGroup.id }"/>'>--%>
    	<%--<input type="hidden" id="codeNo" name="codeNo" value='<c:out value="${testItemGroup.codeNo }"/>'>--%>
    	<%--<input type="hidden" id="itemTypeId" name="itemTypeId" value='2'/>--%>
    	<%--<input type="hidden" id="oldName" name="oldName" value="<c:out value="${testItemGroup.name}"/>"> --%>
		<%--<div>--%>
            <%--<span><i>*</i>组合名称</span><input type="text" id="name" name="name" value='<c:out value="${testItemGroup.name}"/>' onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" maxlength="55">--%>
            <%--<span>英文简称</span><input type="text" id="enShortName" name="enShortName" value='<c:out value="${testItemGroup.enShortName}"/>' onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" maxlength="30">--%>
        <%--</div>--%>
        <%--<div>--%>
            <%--<span>英文名称</span><input type="text" id="enName" name="enName" value='<c:out value="${testItemGroup.enName}"/>' onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" maxlength="55">--%>
            <%--<span><i>*</i>默认标本类型</span>--%>
            <%--<div class="selectstyle">--%>
                  <%--<div id="sampleType" style="width: 190px"></div>--%>
<%--<!--                 <select name="sampleTypeId" id="sampleTypeId" class="select_box"> -->--%>
<%--&lt;%&ndash;                     <c:forEach items="${sampleTypeList }" var="sampleType"> &ndash;%&gt;--%>
<%--&lt;%&ndash;                     <option <c:if test="${sampleType.id == testItemGroup.sampleTypeId}">selected="selected"</c:if> value="${sampleType.id }">${sampleType.name }</option> &ndash;%&gt;--%>
<%--&lt;%&ndash;                     </c:forEach> &ndash;%&gt;--%>
<%--<!--                 </select> -->--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<div>--%>
            <%--<span>助记符</span><input type="text" id="fastCode" name="fastCode" value='<c:out value="${testItemGroup.fastCode}"/>' onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" maxlength="9">--%>
            <%--<span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" value='<c:out value="${testItemGroup.displayOrder}"/>' maxlength="6" onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')">--%>
        <%--</div>--%>
        <%--<div>--%>
            <%--<span>按单项统计检测工作量</span><input type="checkbox" id="isIndividualStat" name="isIndividualStat" value='0' <c:if test="${testItemGroup.isIndividualStat == 0}">checked="checked"</c:if>/>--%>
        <%--</div>--%>
        <%--<div class="btns">--%>
            <%--<input type="button" value="确 定" onclick="saveOrEdit();" id="<%=COMFIRM_ID%>">--%>
            <%--<input type="button" value="取 消" onclick="closeEdit();" id="<%=CANCEL_ID%>">--%>
        <%--</div>--%>
    <%--</form>--%>
    <%--<!-------------------------------------------------------------------------------- --%>
	<%-----------------------------默认标本类型下拉Grid数据源---------------------------------------%>
	<%----------------------------------------------------------------------------------->--%>
	<%--<div id="gridSampleType" class="tablebox_02" style="width: 200px; height: 205px; display: none;">--%>
		<%--<table width="100%" border="0" cellspacing="0" cellpadding="0">--%>
			<%--<tr class="tablehead">--%>
				<%--<td style="width: 15px;">&nbsp;</td>--%>
				<%--<td style="width: auto;">名称</td>--%>
			<%--</tr>--%>
		<%--</table>--%>
		<%--<div class="tablelist" style="width: 100%; height: 176px;">--%>
			<%--<!--tablebox_02 tablelist start-->--%>
			<%--<table cellspacing="0" cellpadding="0" style="width: 200px;">--%>
 				<%--<c:forEach var="sampleType" items="${sampleTypeList}">--%>
					<%--<tr id="${sampleType.id}">--%>
						<%--<td style="width: 15px;">&nbsp;</td>--%>
						<%--<td style="width: auto;">${sampleType.name}</td>--%>
					<%--</tr>--%>
				<%--</c:forEach> --%>
			<%--</table>--%>
		<%--</div>--%>
	<%--</div>--%>
<%--</body>--%>
<%--</html>--%>
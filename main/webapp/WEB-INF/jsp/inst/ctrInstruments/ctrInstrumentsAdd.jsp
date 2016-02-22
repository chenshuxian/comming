<!--中心仪器信息-->
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
    <div class="pop-inner-wrap">
        <div class="pop-container">
            <div class="wrapper-container">
                <!--  form id="ctrDictCodeInfoEditForm"-->
    <form id="InfoForm">
    <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
         <small class="basic-code">编码: ${codeNo}<span id="spanEditCodeNo"></span></small>
    </div>
    <div class="wrapper-content">
        <div class="divider sm-size"></div>
        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                        <span class="required-icon">*</span>
                            <label for="">仪器名称:</label>
                            <input type="text" id="name" name="name" maxlength="30" class="form-control block-show" value="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                        <span class="required-icon">*</span>
                            <label for="">仪器型号:</label>
                            <input type="text" id="model" name="model" maxlength="20" class="form-control block-show" value="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">生产厂家:</label>
                            <input type="text" id="producer" name="producer" maxlength="30" class="form-control block-show" value="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">单列报告模板:</label>
                            <div id="reportTemplateDiv" class="" value="" style="width:260px"></div>
                            <!-- input id="reportTemplate" name="reportTemplate"  class="form-control block-show" value="" -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                        <span class="required-icon">*</span>
                            <label for="">默认标本类型:</label>
                            <div id="sampleTypeDiv" class=""  value="" style="width:260px"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">助记符:</label>
                            <input type="text" id="fastCode" name="fastCode" maxlength="9" class="form-control block-show" value="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">顺序号:</label>
                            <input type="text" id="displayOrder" name="displayOrder" value="${displayOrder }" maxlength="6" class="form-control block-show" value="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                        <span class="required-icon">*</span>
                            <label for="">仪器类型:</label>
                             <select name="typeId" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
				                    class="easyui-combobox form-control-combo" id="typeId" >
				                   <option value="">&nbsp;</option>
									<option value="0">常规</option>
									<option value="1">微生物</option>
									<option value="2">文字报告</option>
									<option value="3">酶标</option>
				               </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

     </div>
     <input type="hidden" id="id" name="id">
     <input type="hidden" id="codeNo" name="codeNo" value="${codeNo}">
     <input type="hidden" id="opType" name="opType" value="${opType}"/> 
     <div class="wrapper-footer text-center">
	           <button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
	           <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
	 </div>
     </form>
       <!-------------------------------------------------------------------------------- 
			---------------------------默认标本类型下拉Grid数据源-------------------------------------
			--------------------------------------------------------------------------------->
			<div id="gridSampleType" class="tablebox_02" style="width: 200px; height: 211px; display: none;">
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
			<div id="gridReportTemplate" class="tablebox_02" style="width: 200px; height: 211px; display: none;">
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
	     
			
      </div>
   </div>
</div>
<%-- 
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/inst/instruments.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>中心仪器信息新增</title>
    
<script type="text/javascript">
$(document).ready(function(){
	sampleTypeGrid = new TextCombo(sampleTypeParam);
	reportTemplateGrid = new TextCombo(reportTemplateParam);
	$("#name").focus();
});
</script>

</head>

<body class="bg">

    <h3>基本信息<a href="javascript:closeWin();"></a><b class="codeNo">编码:${codeNo }</b></h3>
    <form id="addForm" name="addForm">
    	<input type="hidden" id="opType" name="opType" value="${opType }"/>
    	<input type="hidden" id="codeNo" name="codeNo" value="${codeNo }" />
    	
		<div>
			<span><i>*</i>仪器名称</span><input type="text" id="name" name="name" maxlength="30" onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
			<span><i>*</i>仪器型号</span><input type="text" id="model" name="model" maxlength="20" onblur="checkSpecialSymbol('model',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>生产厂家</span><input type="text" id="producer" name="producer" maxlength="30" onblur="checkSpecialSymbol('producer',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
            <span>单列报告模板</span>
            <div class="selectstyle1">
            	<div id="reportTemplateDiv" style="width: 190px"></div>
<!--                 <select id="reportTemplateId" name="reportTemplateId" class="select_box"> -->
<!--                 	<option value="">&nbsp;</option> -->
<%-- 					<c:forEach items="${rtList}" var="item" varStatus="status"> --%>
<%-- 						<option value="${item.id}">${item.name}</option> --%>
<%-- 					</c:forEach> --%>
<!--                 </select> 
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
<%--            </div>
			<span>助记符</span><input type="text" id="fastCode" name="fastCode" maxlength="9" onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
		</div>
		<div>
			<span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" value="${displayOrder }" maxlength="6" onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" />
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
            <input type="button" value="确定" onclick="javascript:addIt();" onkeydown='if(event.keyCode==13){}'>
            <input type="button" value="取消" onclick="javascript:closeWin();">
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
--%>
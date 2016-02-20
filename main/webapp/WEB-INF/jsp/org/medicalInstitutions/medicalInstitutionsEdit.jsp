<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${ctx}/scripts/zTree_v3/css/zTreeStyle/metro.css" type="text/css">
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.core-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.excheck-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.exedit-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/js/org/centerOrg.js?var=1.0.0.3"></script>
<script src="${ctx}/js/enterToTab.js"></script>
<title>医疗机构维护修改</title>
<script type="text/javascript">
$(document).ready(function() {
	$("#regionName").focus();
	$("#showRegionDiv").hover(
		function(){$(this).css('display', 'block');},
		function(){$(this).css('display', 'none');}
   );
});
</script>
<style type="text/css">
	.ztree li a span{
		text-align: left;
		margin-left: 5px;
	}
</style>
</head>
<body class="bg">
    <h3>基本信息<a href="javascript:closeWin();"></a>
    <b class="codeNo">编码:${entity.codeNo}</b>
    </h3>
    <form id="editForm" name="editForm">
    	<input type="hidden" id="opType" name="opType" value="<c:out value='${opType}' escapeXml='true'/>"/>
    	<input type="hidden" id="id" name="id" value="<c:out value='${entity.id}' escapeXml='true'/>"/> 
    	<input type="hidden" id="orgTypeId" name="orgTypeId" value="<c:out value='${orgTypeId}' escapeXml='true'/>" />
    	<input type="hidden" id = "codeNo" name="codeNo" value="<c:out value='${entity.codeNo}' escapeXml='true'/>"/>
		<div>
			<span><i>*</i>所属地区</span>
			<input type="hidden" id = "regionId" name="regionId" value="<c:out value='${entity.regionId}' escapeXml='true'/>" >
			<input type="text" id="regionName" name="regionName" value="<c:out value='${entity.regionName}' escapeXml='true'/>" onclick="showRegionDiv()" readonly="readonly">
			<div id="showRegionDiv" class="col-sm-10  col-md-10" style="width:30%;display:none;text-align:left;position:absolute;background-color:#f0f0f0 ;overflow: auto;z-index:999;border:1px solid #AAAAAA; height:270px;overflow-y: auto;">
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="zTreeDemoBackground left">
							<ul id="treeDemo" class="ztree"></ul>
						</div>
					</div>
				</div>
			</div>
			<span>卫生机构代码</span><input onblur="checkSpecialSymbol('nacaoId',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="nacaoId" name="nacaoId" maxlength="32" value="<c:out value='${entity.nacaoId}' escapeXml='true'/>"/>
		</div>
		<div>
			<span><i>*</i>中文名称</span><input onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="name" name="name" maxlength="35" value="<c:out value='${entity.name}' escapeXml='true'/>"/>
			<span>中文简称</span><input onblur="checkSpecialSymbol('shortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="shortName" name="shortName" maxlength="15" value="<c:out value='${entity.shortName}' escapeXml='true'/>"/>
		</div>
		<div>
			 <span>中文地址</span><input onblur="checkSpecialSymbol('address',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="address" name="address" maxlength="35" value="<c:out value='${entity.address}' escapeXml='true'/>"/>
			  <span>英文名称</span><input onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enName" name="enName" maxlength="120" value="<c:out value='${entity.enName}' escapeXml='true'/>"/>
		</div>
		<div>
		    <span>英文简称</span><input onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enShortName" name="enShortName" maxlength="45" value="<c:out value='${entity.enShortName}' escapeXml='true'/>"/>
		      <span>英文地址</span><input onblur="checkSpecialSymbol('enAddress',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enAddress" name="enAddress" maxlength="120" value="<c:out value='${entity.enAddress}' escapeXml='true'/>"/>
		</div>
		<div>
		    <span>联系人</span><input onblur="checkSpecialSymbol('contacts',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="contacts" name="contacts" maxlength="30" value="<c:out value='${entity.contacts}' escapeXml='true'/>">
		     <span>联系电话</span><input onblur="checkSpecialSymbol('telephone',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="telephone" name="telephone" maxlength="50" value="<c:out value='${entity.telephone}' escapeXml='true'/>"/>
		</div>
		<div>
		    <span>传真号码</span><input onblur="checkSpecialSymbol('fax',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="fax" name="fax" maxlength="25" value="<c:out value='${entity.fax}' escapeXml='true'/>"/>
		    <span>助记符</span><input onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="fastCode" name="fastCode" maxlength="9" value="<c:out value='${entity.fastCode}' escapeXml='true'/>"/>
		</div>
		<div>
			<span>顺序号</span><input onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="displayOrder" name="displayOrder" maxlength="6" value="<c:out value='${entity.displayOrder}' escapeXml='true'/>"/>
			<span>备注</span><input onblur="checkSpecialSymbol('memo',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="memo" name="memo" maxlength="150" value="<c:out value='${entity.memo}' escapeXml='true'/>"/>
		</div>
        <div class="btns">
            <input type="button" id='<%=COMFIRM_ID%>' value="确定" onclick="javascript:updateIt();" onkeydown='if(event.keyCode==13){}'>
            <input type="reset" id='<%=CANCEL_ID%>' value="取消" onclick="javascript:closeWin();">
        </div>
    </form>
</body>
</html>
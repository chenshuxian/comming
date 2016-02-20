<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>医疗机构维护查看</title>   
<script type="text/javascript">
function closeWin(){
    $(".oy").remove();
    $(".xinxi").hide();
}
$(document).ready(function () {
	$("#closeBtn").focus();
});
</script>
</head>
<body class="bg">
    <h3>基本信息<a href="javascript:closeWin();"></a>
    <b class="codeNo">编码:${entity.codeNo }</b>
    </h3>
    <form>
    	<input type="hidden" id="opType" name="opType" value="<c:out value='${opType}' escapeXml='true'/>"/>
    	<input type="hidden" id="orgTypeId" name="orgTypeId" value="<c:out value='${orgTypeId}' escapeXml='true'/>"/>
		<div>
			<span><i>*</i>中文名称</span><input type="text" id="name" name="name" maxlength="35" value="<c:out value='${entity.name}' escapeXml='true'/>" disabled/>
			<span>中文简称</span><input type="text" id="shortName" name="shortName" maxlength="15" value="<c:out value='${entity.shortName}' escapeXml='true'/>" disabled/>
		</div>
		<div>
		    <span>中文地址</span><input type="text" id="address" name="address" maxlength="35" value="<c:out value='${entity.address}' escapeXml='true'/>" disabled/>
		    <span>英文名称</span><input type="text" id="enName" name="enName" maxlength="120" value="<c:out value='${entity.enName}' escapeXml='true'/>" disabled/>
		</div>
		<div>
		    <span>英文简称</span><input type="text" id="enShortName" name="enShortName" maxlength="45" value="<c:out value='${entity.enShortName}' escapeXml='true'/>" disabled/>
		    <span>英文地址</span><input type="text" id="enAddress" name="enAddress" maxlength="120" value="<c:out value='${entity.enAddress}' escapeXml='true'/>" disabled/>
		</div>
		<div>
		    <span>联系人</span><input type="text" id="contacts" name="contacts" maxlength="30" value="<c:out value='${entity.contacts}' escapeXml='true'/>" disabled/>
		    <span>联系电话</span><input type="text" id="telephone" name="telephone" maxlength="50" value="<c:out value='${entity.telephone}' escapeXml='true'/>" disabled/>
		</div>
		<div>
		    <span>传真号码</span><input type="text" id="fax" name="fax" maxlength="25" value="<c:out value='${entity.fax}' escapeXml='true'/>" disabled/>
		    <span>助记符</span><input type="text" id="fastCode" name="fastCode" maxlength="9" value="<c:out value='${entity.fastCode}' escapeXml='true'/>" disabled/>
		</div>
		<div>
			<span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" maxlength="6" value="<c:out value='${entity.displayOrder}' escapeXml='true'/>" disabled/>
			<span>备注</span><input type="text" id="memo" name="memo" maxlength="150" value="<c:out value='${entity.memo}' escapeXml='true'/>" disabled/>
		</div>
        <div class="btns">
            <input type="button" value="关闭" id="closeBtn" onclick="javascript:closeWin();">
        </div>
    </form>
</body>
</html>
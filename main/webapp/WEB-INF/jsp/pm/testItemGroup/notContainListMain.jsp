<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
$(document).ready(function(){
	//notContainSearch();
	$("#instrumentId").focus();
});
</script>
<title>项目信息列表</title>
</head>
<body>
		<h3>组合未包含项目</h3>
		<p align="right">记录总行数： <label id="notContainListNumber">${fn:length(notContainList)}</label></p><br/>
		<div>
		    <div class="selectstyle">
		            仪器过滤：
                    <select name="instrumentId" id="instrumentId" onchange="notContainSearch();" class="select_box" style="width: 150px;">
                          <option></option>
                          <c:forEach items="${ctrInstrumentsList }" var="ctrInstruments">
                          <option <c:if test="${ctrInstruments.id == crtTestItemDto.instrumentId}">selected="selected"</c:if> value="${ctrInstruments.id }"><c:out value="${ctrInstruments.name }" escapeXml="true"/></option> 
                         </c:forEach> 
                    </select>
            </div>
            <input id="searchGroupStr" name="searchGroupStr" type="text" placeholder="搜索内容..."><input type="button" value="搜索" onclick="notContainSearch();">
        </div>
        <div id="notContainListDiv">
        	<table id="notContainList">
                <tr>  
                    <th style="width: 30px;" class="quan2"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">达安标准码</th>
                    <th style="width: 10%">项目名称</th>
                    <th style="width: 10%">英文简称</th>
                    <th style="width: 8%">检验方法</th>
                    <th style="width: 10%">项目性别</th>
                    <th style="width: 0px;"></th>
                    <th style="width: 0px;"></th>
                </tr>
        	</table>
        </div>
</body>
</html>

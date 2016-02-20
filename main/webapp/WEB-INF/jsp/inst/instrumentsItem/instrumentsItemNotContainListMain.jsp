<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
$(document).ready(function(){
	//初始查询
	notContainSearch();
});
</script>
<title>项目信息列表</title>
</head>
<body>
		<h3>未包含项目</h3>
		<p align="right">(记录总数： <label id="notContainListNumber">${fn:length(notContainList)}</label>)</p><br/>
		<div>
		    <div class="selectstyle">
		            检验方法：
                    <select name="testMethod" id="testMethod" onchange="notContainSearch();" class="select_box" style="width: 150px;">
                        	 <option value="">全部</option>
                        	 <c:forEach items="${testMethodList }" var="testMethodList">
                        	 	<option value="${testMethodList.id }">${testMethodList.name }</option>
                        	 </c:forEach>
                    </select>
                                组合项目：
                    <select name="instrumentId" id="instrumentId" onchange="notContainSearch();" class="select_box" style="width: 150px;">
                        	 <option value="">1</option>
                    </select>
            </div>
            <br/>
            <input id="notContainSearchStr" name="notContainSearchStr" type="text" placeholder="搜索内容..."><input type="button" value="搜索" onclick="notContainSearch();">
        </div>
        <div id="notContainListDiv" style="width: 520px;height: 360px;overflow-y:auto;"></div>
</body>
</html>

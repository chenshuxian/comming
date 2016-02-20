<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<script src="${ctx}/js/xuan2.js?var=1.0.0.0"></script>
<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">

<script type="text/javascript">
$(document).ready(function(){
	// 显示条数
	var refRowsNum = $("#refrangeTable tr").length - 1;
	$("#refRowsNum").text("记录总数："+refRowsNum);
});
</script>

</head>

<body class="bg">
<div class="yi_c over">
    <div style="height:250px;">
        <h3>选中项目参考值</h3>
        <div class="btn">
            <a href="javascript:showRefrangeInfo('','add');" class="tianjia">添加</a>
            <a href="javascript:deleteRefrangeBatch();">删除</a>
            <span id="refRowsNum" class="fr"></span>
            <input type="hidden" id="testItemId" name="testItemId" />
        </div>
        <div class="dels" style="height:200px;overflow:auto;">
            <table id="refrangeTable">
                <tr class="top">
                    <th style="width: 5%" class="quan2" ><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 10%">标本类型</th>
                    <th style="width: 7%">性别</th>
                    <th style="width: 7%">年龄单位</th>
                    <th style="width: 7%">起始年龄</th>
                    <th style="width: 7%">结束年龄</th>
                    <th style="width: 7%">参考上限</th>
                    <th style="width: 7%">参考下限</th>
                    <th style="width: 7%">危急上限</th>
                    <th style="width: 7%">危急下线</th>
                    <th style="width: 7%">警告上限</th>
                    <th style="width: 7%">警告下线</th>
                    <th style="width: 15%">操作</th>
                </tr>
                <c:forEach items="${itemList}" var="item" varStatus="status">
	                <tr id="tr_ref_${item.id}">
	                    <td class="cen2"><a id="checkItem_ref" value="${item.id}" href="javascript:void(0)" class="not"></a></td>
	                    <td title="${item.sampleTypeName}"><c:out value="${item.sampleTypeName}" escapeXml="true"/></td>
						<c:if test='${item.sexId==1}'>
	                    	<td title="男">男</td>
						</c:if>
						<c:if test='${item.sexId==2}'>
	                    	<td title="女">女</td>
						</c:if>
						<c:if test='${item.sexId==3 || item.sexId==0}'>
	                    	<td title="不限">不限</td>
						</c:if>
						<c:if test='${item.ageUnitId==1 || item.ageUnitId==0}'>
	                    	<td title="岁">岁</td>
						</c:if>
						<c:if test='${item.ageUnitId==2}'>
	                    	<td title="月">月</td>
						</c:if>
	                    <c:if test='${item.ageUnitId==3}'>
	                    	<td title="周">周</td>
						</c:if>
	                    <c:if test='${item.ageUnitId==4}'>
	                    	<td title="天">天</td>
						</c:if>
	                    <c:if test='${item.ageUnitId==5}'>
	                    	<td title="小时">小时</td>
						</c:if>
	                    <c:if test='${item.ageUnitId==6}'>
	                    	<td title="详细年龄">详细年龄</td>
						</c:if>
	                    <td title="${item.ageMin}"><c:out value="${item.ageMin}" escapeXml="true"/></td>
	                    <td title="${item.ageMax}"><c:out value="${item.ageMax}" escapeXml="true"/></td>
	                    <td title="${item.refHigh}"><c:out value="${item.refHigh}" escapeXml="true"/></td>
	                    <td title="${item.refLow}"><c:out value="${item.refLow}" escapeXml="true"/></td>
	                    <td title="${item.panicHigh}"><c:out value="${item.panicHigh}" escapeXml="true"/></td>
	                    <td title="${item.panicLow}"><c:out value="${item.panicLow}" escapeXml="true"/></td>
	                    <td title="${item.alarmHigh}"><c:out value="${item.alarmHigh}" escapeXml="true"/></td>
	                    <td title="${item.alarmLow}"><c:out value="${item.alarmLow}" escapeXml="true"/></td>
	                    <td>
	                    	<a href="javascript:showRefrangeInfo('${item.id}','edit');" class="sb">修改</a>
	                    	<a href="javascript:deleteRefrange('${item.id}');"">删除</a>
	                    	<a href="javascript:showRefrangeInfo('${item.id}','copy');">复制添加</a>
	                    </td>
	                </tr>
                </c:forEach>
            </table>
        </div>
    </div>
</div>

</body>
</html>
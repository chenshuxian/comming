<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<title>机构选择弹出框</title>
<script type="text/javascript">
	var orgId;
	var orgCode;
	var orgName;
	function orgSelect(id, code, name) {
		orgId = id;
		orgCode = code;
		orgName = name;
	}
	function setParentValue() {
		if (!orgId) {
			//alert("请选择数据！");
			BM.showMessage('请选择数据！');
			return;
		}
		$("#orgId").val(orgId);
		$("#orgName").val(orgName);
		closeWin();
	}
</script>
</head>
<body class="bg">
	<div class="yi_c over">
		<div>
			<h3>机构选择</h3>
			<div class="dels">
				 <div>
                	<input type="text" id="orgSearchStr" name="orgSearchStr" style="width: 70%" placeholder="搜索内容..."><input type="button" value="搜索" onclick="getAllOrgsInfo();">
            	</div>
				<table>
					<tr>
						<th style="width: 20%">编码</th>
						<th style="width: 35%">中文名称</th>
						<th style="width: 20%">所属地区</th>
					</tr>
					<c:if test="${resultList != null || fn:length(resultList) != 0}">
						<c:forEach items="${resultList}" var="item" varStatus="status">
							<tr id="${item.id}" onclick="orgSelect('${item.id}', '${item.codeNo}' , '${item.name}')">
								<td title="${item.name}">${item.codeNo}</td>
								<td title="${item.name}">${item.name}</td>
								<td title="${item.name}">${item.regionName}</td>
							</tr>
						</c:forEach>
					</c:if>
					<c:if test="${resultList == null || fn:length(resultList) == 0}">
						<tr>
							<td colspan="3"><span style="color: red">未查询到数据</span></td>
						</tr>
					</c:if>
				</table>
				<!-- 引入分页jsp start -->
				<%@ include file="/WEB-INF/jsp/common/listPageOrgPopUp.jsp"%>
				<!-- 引入分页jsp end -->
				<div class="btns">
					<input type="button" value="确定" onclick="javascript:setParentValue();" /> 
					<input type="button" value="取消" onclick="javascript:closeWin();" />
				</div>
			</div>
		</div>
	</div>

</body>
</html>
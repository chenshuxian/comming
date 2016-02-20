<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>导入Excel</title>

<script type="text/javascript">



</script>

</head>
<body>
                
    <div class="col-sm-12 col-md-12">
        <h5>详细信息如下： </h5>
    </div>
    <div class="col-sm-12 col-md-12">
        <table class="table table-bordered table-striped table-hover table-condensed">
			<thead>
				<tr>
	                <th>#</th>
	                <th>行数</th>
	                <th>描述</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${page.result}" var="item" varStatus="status">
					<c:if test="${item.can_import==0}">
						<tr class="text-danger">
							<td><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></td>
							<td>${item.row_id}</td>
							<td>${item.import_msg}</td>
						</tr>
					</c:if>
					<c:if test="${item.can_import==2}">
						<tr class="text-warning">
							<td><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></td>
							<td>${item.row_id}</td>
							<td>${item.import_msg}</td>
						</tr>
					</c:if>
				</c:forEach>
			</tbody>
        </table>
    </div>

    <div class="row">
		<%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>
    </div>

<input type="hidden" id="funcCode" name="funcCode" value="${funcCode}" />
<input type="hidden" id="missionId" name="missionId" value="${missionId}" />

</body>
</html>

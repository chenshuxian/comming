<!DOCTYPE HTML>
<%@ page  language="java"
	pageEncoding="UTF-8"%>
	
<!-- 机构弹出框、页内id和方法后面加上  "_OrgPopUp",多个分页的以此类推。 -->
<script type="text/javascript">
	function nextPage_OrgPopUp() {
		var lastPage = parseInt($("#lastpageNo_Org").val());
		var currentPage = parseInt($("#pageNo_OrgPopUp").val());
		if (currentPage < lastPage) {
			$("#pageNo_OrgPopUp").val(currentPage + 1);
			getAllOrgsInfo();
		}
	}

	function previousPage_OrgPopUp() {
		var currentPage = parseInt($("#pageNo_OrgPopUp").val());
		if (currentPage > 1) {
			$("#pageNo_OrgPopUp").val(currentPage - 1);
			getAllOrgsInfo();
		}
	}

	function firstPage_OrgPopUp() {
		var currentPage = parseInt($("#pageNo_OrgPopUp").val());
		if (currentPage != 1) {
			$("#pageNo_OrgPopUp").val(1);
			getAllOrgsInfo();
		}
	}

	function lastPage_OrgPopUp() {
		var currentPage = parseInt($("#pageNo_OrgPopUp").val());
		var lastPage = parseInt($("#lastpageNo_Org").val());
		if (currentPage != lastPage) {
			$("#pageNo_OrgPopUp").val(lastPage);
			getAllOrgsInfo();
		}
	}

	function selectPage_OrgPopUp() {
		var currentPage = parseInt($("#pageNo_OrgPopUp").val());
		var selectPageNo = $("#pageSelect_OrgPopUp").val();
		if (currentPage != selectPageNo) {
			$("#pageNo_OrgPopUp").val(selectPageNo);
			getAllOrgsInfo();
		}
	}
</script>

<div class="page">
	<input type="hidden" id="pageNo_OrgPopUp" name="pageNo_OrgPopUp" value="${page.pageNo}" />
	<input type="hidden" id="lastpageNo_Org" value="${page.lastPage}" /> 
	<input type="hidden" id="totalpageNo_OrgPopUp" value="${page.totalPages}" />
	<div class="fl">
		显示1到
		<c:if test="${page.pageSize==5}">5</c:if>
		<c:if test="${page.pageSize==10}">10</c:if>
		<c:if test="${page.pageSize==15}">15</c:if>
		<c:if test="${page.pageSize==20}">20</c:if>
		<c:if test="${page.pageSize==50}">50</c:if>
		项，共  ${page.totalCount } 项
	</div>
	<div class="fenye">
		<ul>
			<li id="first" onclick="firstPage_OrgPopUp();">首页</li>
			<li id="top" onclick="previousPage_OrgPopUp();">上一页</li>
			<li class="xifenye" id="xifenye"><select id="pageSelect" onchange="selectPage_OrgPopUp();">
					<c:forEach var="pages" begin="1" end="${page.totalPages}">
						<option value="${pages}"
							<c:if test="${page.pageNo == pages}"> selected </c:if>>${pages}</option>
					</c:forEach>
			</select></li>
			<li id="down" onclick="nextPage_OrgPopUp();">下一页</li>
			<li id="last" onclick="lastPage_OrgPopUp();">末页</li>
		</ul>

	</div>
</div>



<!DOCTYPE HTML>
<%@ page  language="java"
	pageEncoding="UTF-8"%>
	
<!-- 对于一个页面中有两个分页的，引入的第二个分页页面的每个页面名称、页内id和方法后面加上  "_3",多个分页的以此类推。 -->
<script type="text/javascript">
	function nextPage_3() {
		var lastPage = parseInt($("#lastPageNo_3").val());
		var currentPage = parseInt($("#pageNo_3").val());
		if (currentPage < lastPage) {
			$("#pageNo_3").val(currentPage + 1);
			searchBaseInfo();
		}
	}

	function previousPage_3() {
		var currentPage = parseInt($("#pageNo_3").val());
		if (currentPage > 1) {
			$("#pageNo_3").val(currentPage - 1);
			searchBaseInfo();
		}
	}

	function firstPage_3() {
		var currentPage = parseInt($("#pageNo_3").val());
		if (currentPage != 1) {
			$("#pageNo_3").val(1);
			searchBaseInfo();
		}
	}

	function lastPage_3() {
		var currentPage = parseInt($("#pageNo_3").val());
		var lastPage = parseInt($("#lastPageNo_3").val());
		if (currentPage != lastPage) {
			$("#pageNo_3").val(lastPage);
			searchBaseInfo();
		}
	}

	function selectPage_3() {
		var currentPage = parseInt($("#pageNo_3").val());
		var selectPageNo = $("#pageSelect_3").val();
		if (currentPage != selectPageNo) {
			$("#pageNo_3").val(selectPageNo);
			searchBaseInfo();
		}
	}
</script>

<div class="page">
	<input type="hidden" id="pageNo_3" name="pageNo_3" value="${page.pageNo}" />
	<input type="hidden" id="lastPageNo_3" value="${page.lastPage}" /> <input
		type="hidden" id="totalPageNo_3" value="${page.totalPages}" />
	<div class="fl">
		显示1到
		<c:if test="${page.pageSize==5}">5</c:if>
		<c:if test="${page.pageSize==10}">10</c:if>
		<c:if test="${page.pageSize==15}">15</c:if>
		<c:if test="${page.pageSize==20}">20</c:if>
		<c:if test="${page.pageSize==50}">50</c:if>
		项，共 ${page.totalCount } 项
	</div>
	<div class="fenye">
		<ul>
			<li id="first" onclick="firstPage_3();">首页</li>
			<li id="top" onclick="previousPage_3();">上一页</li>
			<li class="xifenye" id="xifenye"><select id="pageSelect"
				onchange="selectPage_3();">
					<c:forEach var="pages" begin="1" end="${page.totalPages}">
						<option value="${pages}"
							<c:if test="${page.pageNo == pages}"> selected </c:if>>${pages}</option>
					</c:forEach>
			</select></li>
			<li id="down" onclick="nextPage_3();">下一页</li>
			<li id="last" onclick="lastPage_3();">末页</li>
		</ul>

	</div>
</div>
<!-- page -->
<!-- 
<div class="col-sm-8 col-md-8 ">
<div class="form-inline pull-right">
		<input type="hidden" id="pageNo_3" name="pageNo" value="${page.pageNo}" />
		<input type="hidden" id="lastPageNo_3" value="${page.lastPage}" /> <input
			type="hidden" id="totalPageNo" value="${page.totalPages}" />
		<div class="form-group">
			<div class="btn-toolbar" role="toolbar"
				aria-label="Toolbar with button groups">
				<div class="btn-group" role="group" aria-label="First group">
					<button type="button" class="btn btn-default"
						onclick="firstPage_3();">
						<span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-default"
						onclick="previousPage_3();">
						<span class="glyphicon glyphicon-backward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="nextPage_3();">
						<span class="glyphicon glyphicon-forward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="lastPage_3();">
						<span class="glyphicon glyphicon-fast-forward" aria-hidden="true">
						</span>
					</button>
				</div>
				<div class="btn-group" role="group" aria-label="Second group">
					<label for="currentpage_combo">当前第</label> <select id="pageSelect_3"
						class="form-control input-sm" onchange="selectPage_3();">
						<c:forEach var="x" begin="1" end="${page.totalPages}">
							<option value="${x}"
								<c:if test="${page.pageNo==x}"> selected </c:if>>${x}</option>
						</c:forEach>
					</select> <label for="currentpage_combo">页</label>
				</div>

			</div>
		</div>
		</div>
</div>
 -->
<!-- end page -->



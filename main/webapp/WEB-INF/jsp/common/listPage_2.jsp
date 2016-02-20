<!DOCTYPE HTML>
<%@ page  language="java"
	pageEncoding="UTF-8"%>
	
<!-- 对于一个页面中有两个分页的，引入的第二个分页页面的每个页面名称、页内id和方法后面加上  "_2",多个分页的以此类推。 -->
<script type="text/javascript">
	function nextPage_2() {
		var lastPage = parseInt($("#lastPageNo_2").val());
		var currentPage = parseInt($("#pageNo_2").val());
		if (currentPage < lastPage) {
			$("#pageNo_2").val(currentPage + 1);
			pageQuery2();
		}
	}

	function previousPage_2() {
		var currentPage = parseInt($("#pageNo_2").val());
		if (currentPage > 1) {
			$("#pageNo_2").val(currentPage - 1);
			pageQuery2();
		}
	}

	function firstPage_2() {
		var currentPage = parseInt($("#pageNo_2").val());
		if (currentPage != 1) {
			$("#pageNo_2").val(1);
			pageQuery2();
		}
	}

	function lastPage_2() {
		var currentPage = parseInt($("#pageNo_2").val());
		var lastPage = parseInt($("#lastPageNo_2").val());
		if (currentPage != lastPage) {
			$("#pageNo_2").val(lastPage);
			pageQuery2();
		}
	}

	function selectPage_2() {
		var currentPage = parseInt($("#pageNo_2").val());
		var selectPageNo = $("#pageSelect_2").val();
		if (currentPage != selectPageNo) {
			$("#pageNo_2").val(selectPageNo);
			pageQuery2();
		}
	}
</script>

<div class="page">
	<input type="hidden" id="pageNo_2" name="pageNo_2" value="${page.pageNo}" />
	<input type="hidden" id="lastPageNo_2" value="${page.lastPage}" /> <input
		type="hidden" id="totalPageNo_2" value="${page.totalPages}" />
	<div class="fl">
		显示1到
		<c:if test="${page.pageSize==5}">5</c:if>
		<c:if test="${page.pageSize==10}">10</c:if>
		<c:if test="${page.pageSize==15}">15</c:if>
		<c:if test="${page.pageSize==20}">20</c:if>
		<c:if test="${page.pageSize==50}">50</c:if>
		项，共 <span> ${page.totalCount } </span>项
	</div>
	<div class="fenye">
		<ul>
			<li id="first" onclick="firstPage_2();">首页</li>
			<li id="top" onclick="previousPage_2();">上一页</li>
			<li class="xifenye" id="xifenye"><select id="pageSelect"
				onchange="selectPage_2();">
					<c:forEach var="pages" begin="1" end="${page.totalPages}">
						<option value="${pages}"
							<c:if test="${page.pageNo == pages}"> selected </c:if>>${pages}</option>
					</c:forEach>
			</select></li>
			<li id="down" onclick="nextPage_2();">下一页</li>
			<li id="last" onclick="lastPage_2();">末页</li>
		</ul>

	</div>
</div>
<!-- page -->
<!-- 
<div class="col-sm-8 col-md-8 ">
<div class="form-inline pull-right">
		<input type="hidden" id="pageNo_2" name="pageNo" value="${page.pageNo}" />
		<input type="hidden" id="lastPageNo_2" value="${page.lastPage}" /> <input
			type="hidden" id="totalPageNo" value="${page.totalPages}" />
		<div class="form-group">
			<div class="btn-toolbar" role="toolbar"
				aria-label="Toolbar with button groups">
				<div class="btn-group" role="group" aria-label="First group">
					<button type="button" class="btn btn-default"
						onclick="firstPage_2();">
						<span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-default"
						onclick="previousPage_2();">
						<span class="glyphicon glyphicon-backward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="nextPage_2();">
						<span class="glyphicon glyphicon-forward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="lastPage_2();">
						<span class="glyphicon glyphicon-fast-forward" aria-hidden="true">
						</span>
					</button>
				</div>
				<div class="btn-group" role="group" aria-label="Second group">
					<label for="currentpage_combo">当前第</label> <select id="pageSelect_2"
						class="form-control input-sm" onchange="selectPage_2();">
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



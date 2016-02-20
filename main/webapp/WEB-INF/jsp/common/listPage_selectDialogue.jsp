<!DOCTYPE HTML>
<%@ page  language="java"
	pageEncoding="UTF-8"%>
<script type="text/javascript">
	function nextPage_sd() {
		var lastPage = parseInt($("#lastPageNo_sd").val());
		var currentPage = parseInt($("#pageNo_sd").val());
		if (currentPage < lastPage) {
			$("#pageNo_sd").val(currentPage + 1);
			pageQuery_sd();
		}
	}

	function previousPage_sd() {
		var currentPage = parseInt($("#pageNo_sd").val());
		if (currentPage > 1) {
			$("#pageNo_sd").val(currentPage - 1);
			pageQuery_sd();
		}
	}

	function firstPage_sd() {
		var currentPage = parseInt($("#pageNo_sd").val());
		if (currentPage != 1) {
			$("#pageNo_sd").val(1);
			pageQuery_sd();
		}
	}

	function lastPage_sd() {
		var currentPage = parseInt($("#pageNo_sd").val());
		var lastPage = parseInt($("#lastPageNo_sd").val());
		if (currentPage != lastPage) {
			$("#pageNo_sd").val(lastPage);
			pageQuery_sd();
		}
	}

	function selectPage_sd() {
		var currentPage = parseInt($("#pageNo_sd").val());
		var selectPageNo = $("#pageSelect_sd").val();
		if (currentPage != selectPageNo) {
			$("#pageNo_sd").val(selectPageNo);
			pageQuery_sd();
		}
	}
</script>

		<!-- 每页显示函数-->
		<div class="col-sm-4 col-md-4">
			<form class="form-inline">
				<div class="form-group">
					<label for="pageSize">每页显示：</label>
					<select class="form-control input-sm" id="pageSize_sd" name="pageSize_sd"  onchange="search_sd();">
						<option value="5" <c:if test="${page.pageSize==5}"> selected </c:if>>5</option>
						<option value="10" <c:if test="${page.pageSize==10}"> selected </c:if>>10</option>
					</select> 
					<label for="pageSize">行</label>
				</div>
			</form>
		</div>

<!-- page -->
<div class="col-sm-8 col-md-8 ">
<form class="form-inline pull-right">
		<input type="hidden" id="pageNo_sd" name="pageNo_sd" value="${page.pageNo}" />
		<input type="hidden" id="lastPageNo_sd" value="${page.lastPage}" /> <input
			type="hidden" id="totalPageNo_sd" value="${page.totalPages}" />
		<div class="form-group">
			<div class="btn-toolbar" role="toolbar"
				aria-label="Toolbar with button groups">
				<div class="btn-group" role="group" aria-label="First group">
					<button type="button" class="btn btn-default"
						onclick="firstPage_sd();">
						<span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-default"
						onclick="previousPage_sd();">
						<span class="glyphicon glyphicon-backward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="nextPage_sd();">
						<span class="glyphicon glyphicon-forward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="lastPage_sd();">
						<span class="glyphicon glyphicon-fast-forward" aria-hidden="true">
						</span>
					</button>
				</div>
				<div class="btn-group" role="group" aria-label="Second group">
					<label for="currentpage_combo">当前第</label> <select id="pageSelect_sd"
						class="form-control input-sm" onchange="selectPage_sd();">
						<c:forEach var="x" begin="1" end="${page.totalPages}">
							<option value="${x}"
								<c:if test="${page.pageNo==x}"> selected </c:if>>${x}</option>
						</c:forEach>
					</select> <label for="currentpage_combo">页</label>
				</div>

			</div>
		</div>
		</form>
</div>
<!-- end page -->



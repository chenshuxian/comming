<!DOCTYPE HTML>
<%@ page  language="java"
	pageEncoding="UTF-8"%>
<script type="text/javascript">
	function nextPage() {
		var lastPage = parseInt($("#lastPageNo").val());
		var currentPage = parseInt($("#pageNo").val());
		if (currentPage < lastPage) {
			$("#pageNo").val(currentPage + 1);
			pageQuery();
		}
	}

	function previousPage() {
		var currentPage = parseInt($("#pageNo").val());
		if (currentPage > 1) {
			$("#pageNo").val(currentPage - 1);
			pageQuery();
		}
	}

	function firstPage() {
		var currentPage = parseInt($("#pageNo").val());
		if (currentPage != 1) {
			$("#pageNo").val(1);
			pageQuery();
		}
		return false;
	}

	function lastPage() {
		var currentPage = parseInt($("#pageNo").val());
		var lastPage = parseInt($("#lastPageNo").val());
		if (currentPage != lastPage) {
			$("#pageNo").val(lastPage);
			pageQuery();
		}
	}

	function selectPage() {
		var currentPage = parseInt($("#pageNo").val());
		var selectPageNo = $("#pageSelect").val();
		if (currentPage != selectPageNo) {
			$("#pageNo").val(selectPageNo);
			pageQuery();
		}
	}
	
	$(document).ready(function(){
		// 初始化页码信息
		var pageNo = parseInt($("#pageNo").val());
		var pageSize = parseInt("${page.pageSize}");
		var totalCount = parseInt("${page.totalCount }");

		var startNum = (pageNo-1)*pageSize+1;
		if(totalCount==0||totalCount==null){
			startNum =0;
		}
		var endNum = startNum+pageSize-1;
		if(endNum > totalCount){
			endNum = totalCount;
		}

		$("#pageNumInfo").text("");
		$("#pageNumInfo").text("显示 "+startNum+" 到 "+endNum+" 项，共 "+totalCount+" 项");
	});
</script>
        
        <div class="page">
               <input type="hidden" id="pageNo" name="pageNo" value="${page.pageNo}" />
			   <input type="hidden" id="lastPageNo" value="${page.lastPage}" /> 
			   <input type="hidden" id="totalPageNo" value="${page.totalPages}" />
                   	<!-- 显示1到<c:if test="${page.pageSize==5}">5</c:if>
					<c:if test="${page.pageSize==10}">10</c:if>
					<c:if test="${page.pageSize==15}">15</c:if>
					<c:if test="${page.pageSize==20}">20</c:if>
					<c:if test="${page.pageSize==50}">50</c:if>
					项，共 ${page.totalCount } 项 -->
					
				<span id="pageNumInfo" style="width:200px; text-align:left;"></span>
               <div class="fenye">
                    <ul>
                        <li id="firstvvv" onclick="firstPage();">首页</li>
                        <li id="top" onclick="previousPage();">上一页</li>
                        <li class="xifenye" id="xifenye">
                            <select id="pageSelect" onchange="selectPage();">
								<c:forEach var="pages" begin="1" end="${page.totalPages}">
									<option value="${pages}" <c:if test="${page.pageNo == pages}"> selected </c:if>>${pages}</option>
								</c:forEach>
							</select>
                        </li>
                        <li id="down" onclick="nextPage();">下一页</li>
                        <li id="last" onclick="lastPage();">末页</li>
                    </ul>

               </div>
            </div>
        
<!--    
		 每页显示函数 
		<div class="col-sm-4 col-md-4">
			<div class="form-inline">
				<div class="form-group">
					<label for="pageSize">每页显示：</label> <select
						class="form-control input-sm" id="pageSize" name="pageSize"  onchange="$('#pageNo').val(1);pageQuery();">
						<option value="5" <c:if test="${page.pageSize==5}"> selected </c:if>>5</option>
						<option value="10" <c:if test="${page.pageSize==10}"> selected </c:if>>10</option>
						<option value="15" <c:if test="${page.pageSize==15}"> selected </c:if>>15</option>
						<option value="20" <c:if test="${page.pageSize==20}"> selected </c:if>>20</option>
						<option value="50" <c:if test="${page.pageSize==50}"> selected </c:if>>50</option>
					</select> <label for="pageSize">行，记录总数为：</label> <label
						for="pageSize">${page.totalCount }</label>
				</div>
			</div>
		</div>

 page 
<div class="col-sm-8 col-md-8 ">
<div class="form-inline pull-right">
		
		<div class="form-group">
			<div class="btn-toolbar" role="toolbar"
				aria-label="Toolbar with button groups">
				<div class="btn-group" role="group" aria-label="First group">
					<button type="button" class="btn btn-default"
						onclick="firstPage();">
						<span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-default"
						onclick="previousPage();">
						<span class="glyphicon glyphicon-backward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="nextPage();">
						<span class="glyphicon glyphicon-forward" aria-hidden="true">
						</span>
					</button>
					<button type="button" class="btn btn-default" onclick="lastPage();">
						<span class="glyphicon glyphicon-fast-forward" aria-hidden="true">
						</span>
					</button>
				</div>
				<div class="btn-group" role="group" aria-label="Second group">
					<label for="currentpage_combo">当前第</label> <select id="pageSelect"
						class="form-control input-sm" onchange="selectPage();">
						<c:forEach var="x" begin="1" end="${page.totalPages}">
							<option value="${x}"
								<c:if test="${page.pageNo==x}"> selected </c:if>>${x}</option>
						</c:forEach>
					</select> <label for="currentpage_combo">页</label>
				</div>

			</div>
		</div>
		</div>
</div> -->    
<!-- end page -->



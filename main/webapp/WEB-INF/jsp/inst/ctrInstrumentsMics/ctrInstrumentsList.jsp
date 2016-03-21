<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap">
		<div class="pop-container">
			<div class="wrapper-container">
				<div class="wrapper-header flex-container flex-space-between">
					<div class="flex-container flex-space-between">
						<div class="search flex-container  flex-space-between">
							<div class="form-control-icon icon-right">
								<input type="text" class="form-control"  id="instrumentSchStr"  placeholder="搜索内容..."/>
								<button class="control-icon text-center" id="SearchBtn"><i class="icon icon-search"></i></button>
							</div>
							<span class="symbol"></span>
							<span class="drop-down-label">前台通讯类:</span>
							<div class="drop-down">
								<div class="drop-down-selected">
									<span class="selected-items" id="frontClassStr">全部</span> <i class="icon icon-angle-down"></i>
								</div>
								<div class="drop-down-menu">
									<ul class="list-unstyled frontClass-selector">
										<li class="selected" value="2">全部</li>
										<li value="0">类名不为空</li>
										<li value="1">类名为空</li>
									</ul>
								</div>
							</div>
						</div>
						<span class="drop-down-label">状态:</span>
						<div class="option icon-group-inline ">
							<div class="drop-down drop-down-icon">
								<div class="drop-down-selected">
									<i class="icon icon-sort"></i><span class="selected-items" id="StatusSpan">全部</span>
								</div>
								<div class="drop-down-menu">
									<ul class="list-unstyled status-selector"><!-- 换动态迭代样式竟然很丑，暂停找不到原因 -->
										<li class="selected" value="2">全部</li>
										<li value="1">可用</li>
										<li value="0">停用</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="wrapper-content">
					<table id="instrumentSelectList"></table>
				</div>
				<div class="wrapper-footer text-center">
					<button class="btn btn-submit sm-size" id="SubmitBtn">确定</button>
					<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
				</div>
				<input type="hidden" id="frontClass" value="2"/>
				<input type="hidden" id="status" value="2"/>
			</div>
		</div>
</div>
<script>
	$(function(){
		var _params = {dataGrid: $("#instrumentSelectList")};

		/* 状态搜索 */
		$(".status-selector li").on("click", function () {
			var flg,statusVal
			$("#StatusSpan").html($(this).html());
			$(".status-selector li.selected").removeClass("selected");
			flg = $(this).is('.selected');
			$(this).addClass(function () {
				return flg ? '' : 'selected';
			})

			statusVal = $(this).attr("value");
			$("#status").val(statusVal);

			CtrInstrMics.searchGrid(_params);
		});

		/* 前台通讯类 */
		$(".frontClass-selector li").on("click", function () {
			$("#frontClassStr").html($(this).html());
			$(".frontClass-selector li.selected").removeClass("selected");
			var flg = $(this).is('.selected');
			$(this).addClass(function () {
				return flg ? '' : 'selected';
			})

			var sortVal = $(this).attr("value");
			$("#frontClass").val(sortVal);

			CtrInstrMics.searchGrid(_params);
		});

		/* search Btn */
		$("#SearchBtn").on("click",function() {
			CtrInstrMics.searchGrid(_params);
		});

		$("#SubmitBtn").on("click",function() {
			var
					checkRadio =  $("input[type='radio']:checked"),
					opts2 = CtrInstrMics.dataGrid2.datagrid("options"),
					opts1 = CtrInstrMics.dataGrid.datagrid("options");
					opts1.url = CtrInstrMics.pageListUrl,
					opts1.queryParams =
					{
						instrumentId: CtrInstrMics.instrumentId,
						itemTypeId: 1
					};

					opts2.url = CtrInstrMics.pageListUrl;
					opts2.queryParams =
					{
						instrumentId: CtrInstrMics.instrumentId,
						itemTypeId: 2
					};


			if(!checkRadio){
				showMessage("请先选择一个仪器");
				return;
			}
			//修改页面仪器名
			$("#instrumentName").text(CtrInstrMics.instrumentName);
			$("#" + CB.POPDIV).hide();
			//DG1 RELOAD
			CtrInstrMics.dataGrid.datagrid(opts1);
			//DG2 RELOAD
			CtrInstrMics.dataGrid2.datagrid(opts2);

		});
	});
</script>
<%--<!DOCTYPE html>--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>--%>

<%--<html xmlns="http://www.w3.org/1999/xhtml">--%>
<%--<head lang="en">--%>
<%--<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">--%>

<%--<script type="text/javascript">--%>

<%--</script>--%>

<%--</head>--%>

<%--<body class="bg">--%>
	<%--<div class="yi_c over" style="padding: 10px 0px;">--%>
        <%--<div style="padding: 10px 10px; border-top:1px dashed #ddd">--%>
            <%--<table>--%>
                <%--<tr>--%>
					<%--<th style="width: 10%">&nbsp;</th>--%>
                    <%--<th style="width: 20%">编码</th>--%>
                    <%--<th style="width: 35%">仪器名称</th>--%>
                    <%--<th style="width: 35%">仪器型号</th>--%>
                <%--</tr>--%>
                <%--<c:forEach items="${resultList}" var="item" varStatus="status">--%>
	                <%--<tr>--%>
						<%--<td><input type="radio" name="instrumentRadio" value="${item.id}_${item.name}"/></td>--%>
	                    <%--<td title="${item.codeNo}"><c:out value="${item.codeNo}" escapeXml="true"/></td>--%>
	                    <%--<td title="${item.name}"><c:out value="${item.name}" escapeXml="true"/></td>--%>
	                    <%--<td title="${item.model}"><c:out value="${item.model}" escapeXml="true"/></td>--%>
	                <%--</tr>--%>
                <%--</c:forEach>--%>
            <%--</table>--%>
 	        <%--<!-- 引入分页jsp start -->--%>
	        <%--<%@ include file="/WEB-INF/jsp/common/listPage.jsp"%>--%>
	        <%--<!-- 引入分页jsp end -->--%>
        <%--</div>--%>
	    <%--<div class="btns">--%>
	        <%--<input type="button" value="确定" onclick="javascript:selectOneInstrument();" onkeydown='if(event.keyCode==13){}'>--%>
	        <%--<input type="button" value="取消" onclick="javascript:closeWin();">--%>
	    <%--</div>--%>
   	<%--</div>--%>
<%--</body>--%>
<%--</html>--%>
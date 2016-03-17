<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
	<div class="pop-inner-wrap">
		<div class="pop-container">
			<div class="wrapper-container">
				<div class="wrapper-header flex-container flex-space-between">
					<div>
						<strong>已包含项目</strong>
						<small>(已包含项目<span id="containSize"></span>)</small>
					</div>
					<div class="header-right">
						<div class="flex-container flex-space-between group-items">
							<strong>未包含项目</strong>
							<span>仪器过滤</span>
							<div class="drop-down">
								<div class="drop-down-selected">
									<span class="selected-items"  id="instrument"></span>
									<i class="icon icon-angle-down"></i>
								</div>
								<div class="drop-down-menu">
									<ul class="list-unstyled ul_instrument">
										<c:forEach items="${ctrInstrumentsList}" var="instrument">
											<%--<li onclick="testItemGroupMain.instrumentClick('${instrument.idStr }','${instrument.name }');" value="${instrument.idStr }">${instrument.name }</li>--%>
											<li selected="selected" el-value="${instrument.idStr}" >${instrument.name}</li>
										</c:forEach>
									</ul>
								</div>
							</div>
							<div class="form-control-icon icon-right">
								<input type="text" class="form-control" id="instrumentSearch" placeholder="搜索内容...">
								<button class="control-icon text-center" id="searchBtn2"><i class="icon icon-search"></i></button>
							</div>
						</div>
					</div>

				</div>
				<div class="wrapper-content">
					<div class="flex-container">
						<div class="flex-col-6">
							<table id="addCheckProjectLeft">
							</table>
						</div>
						<div class="text-center vertical-options flex-container flex-center layout-vertical">
							<button class="btn btn-circle" id="leftShiftBtn">
								<i class="fa fa-chevron-left"></i>
							</button>
							<button class="btn btn-circle no-margin-left" id="rightShiftBtn">
								<i class="fa fa-chevron-right"></i>
							</button>
						</div>
						<div class="flex-col-6">
							<table id="addCheckProjectRight">
							</table>
						</div>
					</div>

				</div>
				<div class="wrapper-footer text-center">
					<button id="addBtn" class="btn btn-submit sm-size J_ShowPop">确定</button>
					<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
				</div>
				<input type="hidden" id="instrumentId"/>
			</div>

		</div>
	</div>

	<script>
		$(function () {

			getSearchObj = function() {
				return	{
					testitemId: testItemGroupMain.parentId,
					instrumentId: $("#instrumentId").val(),
					searchGroupStr: $.trim( $("#instrumentSearch").val())
				};
			};
			/* 仪器过滤 */
			$(".ul_instrument li").on("click", function () {
				var
						dataGrid = testItemGroupMain.rightDG,
						flg = $(this).is('.selected'),
						sortVal = $(this).attr("el-value"),
						searchObj,params;
						$("#instrumentId").val(sortVal);

				searchObj = getSearchObj();
				params = {
					dataGrid: dataGrid,
					searchObj: searchObj
				};

				$("#instrument").html($(this).html());
				$(".ul_instrument li.selected").removeClass("selected");
				$(this).addClass(function () {
					return flg ? '' : 'selected';
				})

				testItemGroupMain.searchGrid(params);
			});

			/*左右数据切换*/

			$("#leftShiftBtn").on('click',BasicModule.leftShiftBtn);
			$("#rightShiftBtn").on('click',BasicModule.rightShiftBtn);
			$("#searchBtn2").on('click', function () {
				$("#addCheckProjectRight").datagrid("reload", getSearchObj());
			});

			$("#addBtn").on('click', function () {

				if((testItemGroupMain.addTestItemIds.length > 0) || (testItemGroupMain.delTestItemIds.length > 0)){
					// 提交
					var parentId = testItemGroupMain.parentId, //父ID
						data = {
							removeItemID: testItemGroupMain.delTestItemIds.join(","),
							addItemID: testItemGroupMain.addTestItemIds.join(","),
							groupItemID: parentId
						};

					$.ajax({
						"url": testItemGroupMain.addUrl2,
						"type": "POST",
						data: data,
						"success": function (data) {
							resolutionData(data);
							testItemGroupMain.dataGrid2.datagrid('reload');
							$("#" + CB.POPDIV).hide();
							testItemGroupMain.addTestItemIds = [];
							testItemGroupMain.delTestItemIds = [];
						},
						"error": function () {
						}
					});

				} else {
					//$("#ctrDictInfoModal").hide();
					$("#" + CB.POPDIV).hide();
				}
			})
		});
	</script>

<%--<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>--%>
<%--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">--%>
<%--<html>--%>
<%--<head>--%>
<%--<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">--%>
<%--<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">--%>
<%--<script src="${ctx}/js/enterToTab.js"></script>--%>
<%--<script type="text/javascript">--%>
	<%--$(document).ready(function(){--%>
		<%--var testItemId = $("#testItemGroupId").val();--%>
		<%--$("#containList").load(ctx + "/pm/testItemGroup/containList",{testItemId:testItemId});--%>
		<%--$("#notContainListMain").load(ctx + "/pm/testItemGroup/notContainListMain",{testItemId:testItemId});--%>
	<%--});--%>
<%--</script>--%>
<%--<title>添加项目</title>--%>
<%--</head>--%>
<%--<body>--%>
	<%--<h3>--%>
		<%--添加项目<a href="javascript:closeShow();"></a>--%>
	<%--</h3>--%>
	      <%--<div class="yi_c over">--%>
	      	<%--<div id="containList" style="float: left; width: 520px;height: 480px;overflow-y:auto;"></div>--%>
	      	<%--<div style="float: left;width: 50px;padding-top: 200px;">--%>
		      	<%--<div class="btns">--%>
		      		<%--<input type="button" id="leftMove" value="&lt;&lt;" onclick="notContainTr();" title="添加项目"/>--%>
		      		<%--<br/><br/>--%>
		      		<%--<input type="button" id="rightMove" value=">>" onclick="containTr();" title="移除项目"/>--%>
		        <%--</div>--%>
	      	<%--</div>--%>
	    	<%--<div id="notContainListMain" style="float: right; width: 510px;height: 480px;overflow-y:auto;"></div>--%>
	      <%--</div>--%>
	      <%--<div class="btns">--%>
	        <%--<input type="button" value="确 定" onclick="addOrRemoveItem();">--%>
	        <%--<input type="button" value="取 消" onclick="closeShow();">--%>
	      <%--</div>--%>
<%--</body>--%>
<%--</html>--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap">
		<div class="pop-container">
			<div class="wrapper-container">
				<div class="wrapper-header flex-container flex-space-between">
					<div>
						<strong>已包含细菌</strong>
						<small>(已包含细菌<span id="imr_containItemCount"></span>)</small>
					</div>
					<div class="header-right">
						<div class="flex-container flex-space-between group-items">
							<strong>未包含细菌</strong>
							<div class="form-control-icon icon-right">
								<input type="text" class="form-control" id="imr_itemSchStr" placeholder="搜索内容...">

								<button class="control-icon text-center" onclick="imr_queryTestItems(1);"><i class="icon icon-search"></i></button>
							</div>
						</div>
					</div>

				</div>
				<div class="wrapper-content">
					<div class="flex-container">
						<div class="flex-col-6">
							<table id="imr_addInstrumentItemLeft">
							</table>
						</div>
						<div class="text-center vertical-options flex-container flex-center layout-vertical">
							<button class="btn btn-circle" id="imr_addInstrumentItemBtn">
								<i class="fa fa-chevron-left"></i>
							</button>
							<button class="btn btn-circle no-margin-left" id="imr_removeInstrumentItemBtn">
								<i class="fa fa-chevron-right"></i>
							</button>
						</div>
						<div class="flex-col-6">
							<table id="imr_addInstrumentItemRight">
							</table>
						</div>
					</div>
				</div>
				<div class="wrapper-footer text-center">
					<button onclick="imr_confirmInstrumentItemAdd(this,1);" class="btn btn-submit sm-size">确定</button>
					<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
				</div>
			</div>
		</div>
</div>

<%--<!DOCTYPE html>--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>--%>

<%--<html xmlns="http://www.w3.org/1999/xhtml">--%>
<%--<head lang="en">--%>
    <%--<meta http-equiv="content-type" content="text/html; charset=UTF-8">--%>
    <%--<script src="${ctx}/js/inst/instrumentsMics.js?var=${randomVal}"></script>--%>
    <%--<script src="${ctx}/js/enterToTab.js"></script>--%>
    <%--<title>仪器细菌新增</title>--%>
    <%----%>
<%--<script type="text/javascript">--%>
<%--$(document).ready(function(){--%>
	<%--var instrumentId = $("#instrumentId").val();--%>
	<%--$("#containGermDiv").load(ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddLeft",{instrumentId:instrumentId,itemTypeId:1});--%>
	<%--$("#noContainGermDiv").load(ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddRightMain",{itemTypeId:1});--%>
<%--});--%>
<%--</script>--%>

<%--</head>--%>

<%--<body>--%>

    <%--<h3>添加细菌<a href="javascript:closeWin();"></a></h3>--%>
    <%--<div class="yi_c over">--%>
    	<%--<div id="containGermDiv" style="float: left; width: 510px;height: 480px;overflow:auto; border-top:0px; padding: 10px 0px;"></div>--%>
    	<%--<div style="float: left;width: 50px;padding-top: 200px; border-top:0px">--%>
	     	<%--<div class="btns" style="border-top:0px">--%>
	     		<%--<input type="button" id="addBtn" value="&lt;&lt;" onclick="javascript:addGerm();" title="添加细菌"/>--%>
	     		<%--<br/><br/>--%>
	     		<%--<input type="button" id="removeBtn" value=">>" onclick="javascript:delGerm();" title="移除细菌"/>--%>
	       	<%--</div>--%>
    	<%--</div>--%>
  		<%--<div id="noContainGermDiv" style="float: right; width: 510px;height: 480px; border-top:0px; padding: 10px 0px;"></div>--%>
    <%--</div>--%>
    <%--<div class="btns">--%>
		<%--<input type="button" value="确定" onclick="javascript:addMicsConfirm('1');" onkeydown='if(event.keyCode==13){}'>--%>
		<%--<input type="button" value="取消" onclick="javascript:closeWin();">--%>
    <%--</div>--%>

<%--</body>--%>
<%--</html>--%>
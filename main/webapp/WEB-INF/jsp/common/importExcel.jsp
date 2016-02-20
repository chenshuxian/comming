<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>导入Excel</title>
<script src="js/common/importExcel.js?var=${randomVal}"></script>
<script src="js/common/ajaxfileupload.js?var=${randomVal}"></script>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<jsp:include page="/WEB-INF/jsp/common/navHead.jsp" />
	</div>
	</nav>

<div class="container-fluid">
    <div class="row main">
        <ol class="breadcrumb">
            <li>
                <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
                <a>中心库</a>
            </li>
            <li class="active">${level1 }</li>
            <li class="active">${level2 }</li>
            <div class="dropdown pull-right">
                <li class="dropdown">
                    <a href="#" id="dropdownMenu2" class="dropdown-toggle" data-toggle="dropdown" role="button"
                       aria-expanded="true">辅助功能 <span class="caret"></span></a>
                    <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu2">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="${ctx}/importExcel/download/${funcCode}"><span
                                class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"> </span> 模板下载</a></li>
                    </ul>
            </div>
        </ol>
        <h4 class="page-header">${level2 }－导入Excel</h4>

<c:if test="${funcCode=='contract_discount'}">
        <div class="col-sm-3 col-md-3">
            <dl class="to-left">
                <dt>合同编号：</dt>
                <dd><em>${code }</em></dd>
                <dt>合同名称：</dt>
                <dd><em>${name }</em></dd>
            </dl>
        </div>
</c:if>
<c:if test="${funcCode=='contract_discount'}">
		<div class="col-sm-9 col-md-9">
</c:if>
<c:if test="${funcCode!='contract_discount'}">
		<div class="col-sm-12 col-md-12">
</c:if>
        
            <div class="panel panel-default">
                <form>

                    <div class="panel-body">
                        <div class="form-group">
                            <label for="uploadFile">导入文件：</label>
                            <input type="file" id="uploadFile" name="uploadFile" class="btn btn-default">
							
                            <p class="help-block">请选择Microsoft Excel 文件.</p>
                        </div>
                        <c:if test="${funcCode=='lab_testitem_price'}">
                        <div class="form-group">
                            <input type="radio" id="testitemType" name="testitemType" value="1"/>单项&nbsp;&nbsp;
                            <input type="radio" id="testitemType" name="testitemType" value="2"/>组合&nbsp;&nbsp;
                            <input type="radio" id="testitemType" name="testitemType" value="3"/>套餐&nbsp;&nbsp;
                        </div>
                        </c:if>
                        <c:if test="${funcCode=='area_price'}">
                        <div class="form-group">
                            <input type="radio" id="areaPriceType" name="areaPriceType" value="1"/>单项&nbsp;&nbsp;
                            <input type="radio" id="areaPriceType" name="areaPriceType" value="2"/>组合&nbsp;&nbsp;
                            <input type="radio" id="areaPriceType" name="areaPriceType" value="3"/>套餐&nbsp;&nbsp;
                        </div>
                        </c:if>
                        <div class="form-group">
                            <button type="submit" class="btn btn-default bs-docs-activate-animated-progressbar focus"
                                    aria-label="Left Align" data-toggle="button" aria-pressed="false"  autocomplete="off"
                                    onclick="importExcel('${funcCode}');">
                                <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> 导入数据
                            </button>
                        </div>

                        <div class="progress" id="progressBarDIV">
                            <div id="progressBar" class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="45"
                                 aria-valuemin="0" aria-valuemax="100" style="width: 0%"><span class="sr-only">0% Complete</span>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

			<div id="resultDIV">
            <hr>
            <h4>数据导入完成报告</h4>

            <div class="row">
                <div class="col-sm-12 col-md-12">
					
					<div id="successMsgDIV">
                    <div class="bs-callout bs-callout-info" id="callout-xref-input-group">
                        <h4 id="input-groups"><strong> 文件已导入成功</strong></h4>
                        <p><label id="successMsg" name="successMsg"></label></p>
                    </div>
                    </div>

					<div id="errorMsgDIV">
                    <div class="bs-callout bs-callout-danger" id="callout-xref-input-group">
                        <h4 id="input-groups"><strong> 文件导入失败</strong></h4>
                        <p><label id="errorMsg" name="errorMsg"></label></p>
                    </div>
                    </div>
                </div>
                
                <div id="successDetailDIV"></div>
            </div>
			</div>

        </div>


    </div>


</div>
</div>

</body>
</html>

<script type="text/javascript">
	$("#progressBarDIV").hide();
	$("#resultDIV").hide();
	$("#successMsgDIV").hide();
	$("#errorMsgDIV").hide();
</script>
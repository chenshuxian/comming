<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap">
    <div class="pop-container">
        <div class="wrapper-container">
            <div class="wrapper-header flex-container flex-space-between">
                <div>
                    <strong>已包含细菌</strong>
                    <small>(已包含细菌<span id="containSize"></span>)</small>
                </div>
                <div class="header-right">
                    <div class="flex-container flex-space-between group-items">
                        <strong>未包含细菌</strong>
                        <div class="form-control-icon icon-right">
                            <input type="text" class="form-control" id="searchStr" placeholder="搜索内容...">
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
                <button class="btn btn-submit sm-size" id="addBtn">确定</button>
                <button class="btn btn-cancel sm-size J_ClosePop" onclick="BM.arrayClean();">关闭</button>
            </div>
            <input type="hidden" id="itemTypeId" value="1"/>
        </div>
    </div>
</div>
<script src="${ctx}/js/inst/popFrom.js"></script>
<%--<!DOCTYPE html>--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>--%>
<%--<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>--%>

<%--<html xmlns="http://www.w3.org/1999/xhtml">--%>
<%--<head lang="en">--%>
<%--<link href="${ctx}/css/select.css" type="text/css" rel="stylesheet">--%>

<%--<script type="text/javascript">--%>
<%--$(document).ready(function(){--%>
	<%--micsListQuery('1');--%>
<%--});--%>
<%--</script>--%>

<%--</head>--%>

<%--<body class="bg">--%>
<%--<div class="yi_c over">--%>
    <%--<div style="height:250px;">--%>
        <%--<h3>细菌列表</h3>--%>
        <%--<div class="btn">--%>
            <%--<a href="javascript:openMicsAdd('1');" class="jy_btn">添加细菌</a>--%>
            <%--<a href="javascript:saveMicsList('1');" class="tianjia">保存</a>--%>
            <%--<a href="javascript:deleteMicsBatch('1');">删除</a>--%>
            <%--<input type="text" id="germSearchStr" name="germSearchStr" />--%>
            <%--<input type="button" value="查找" onclick="javasscript:micsListQuery('1');">--%>
            <%--<input type="hidden" id="instrumentId" name="instrumentId" />--%>
            <%--<span id="germRowsNum" class="fr"></span>--%>
        <%--</div>--%>
        <%----%>
		<%--<!-- 细菌对照列表List -->--%>
		<%--<div id="germListDiv" style="display:none;width:100%;height:190px;overflow:auto;"></div>--%>
    <%--</div>--%>
<%--</div>--%>

<%--</body>--%>
<%--</html>--%>
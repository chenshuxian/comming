<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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

                        <span>地区</span>
                        <div class="form-control-icon icon-left">
                            <input type="hidden" id="regionId" name="regionId">
                            <input type="text" id="regionName" name="regionName" class="form-control block-show"
                                   value="">
                        </div>
                        <div class="form-control-icon icon-right">
                            <input type="text" class="form-control" id="relatedSearchStr" style="width: 100px;" placeholder="搜索内容...">
                            <button class="control-icon text-center" id="relatedSearchBtn"><i class="icon icon-search"></i></button>
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
                <button id="addRelatedBtn" class="btn btn-submit sm-size J_ShowPop">确定</button>
                <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
            </div>
        </div>

    </div>
</div>

<script>
    $(function () {
        /*左右数据切换*/

        $("#leftShiftBtn").on('click',BasicModule.leftShiftBtn);
        $("#rightShiftBtn").on('click',BasicModule.rightShiftBtn);

        $("#relatedSearchBtn").on('click', function () {
            $("#addCheckProjectRight").datagrid("reload", {
                parentId: RegionalManagement.parentId,
                regionId: $("#regionId").val(),
                searchStr: $.trim($("#relatedSearchStr").val())
            })
        });

        $("#addRelatedBtn").on('click', function () {
            if((RegionalManagement.addTestItemIds.length > 0)
                    || (RegionalManagement.delTestItemIds.length > 0)){
                // 提交
                var parentId = RegionalManagement.parentId;//父ID
                var data = "parentId="+parentId+"&addTestItemIds="+RegionalManagement.addTestItemIds.join(",")+"&delTestItemIds="+RegionalManagement.delTestItemIds.join(",");
                RegionalManagement.deleteRelatedAjax(data, function () {
                    $("#ctrDictInfoModal").hide();
                    RegionalManagement.addTestItemIds = [];
                    RegionalManagement.delTestItemIds = [];
                });
//                $.ajax({
//                    "url" : ctx + "/org/regionalManagement/regionalManagementItemAddBatch",
//                    "type" : "POST",
//                    data:data,
//                    "success" : function(data) {
//                        if(data.indexOf("succ") > -1) {
//                            RegionalManagement.relatedDataGrid.datagrid('reload');
//                            $("#ctrDictInfoModal").hide();
//                            RegionalManagement.addTestItemIds = [];
//                        }
//                    },
//                    "error" : function() {
//                    }
//                });
            } else {
                $("#ctrDictInfoModal").hide();
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
<%--var parentId = $("#parentId").val();--%>
<%--$("#containDiv").load(ctx + "/org/regionalManagement/containRegionalList",{parentId:parentId});--%>
<%--$("#noContainDiv").load(ctx + "/org/regionalManagement/noContainRegionalMain",{parentId:parentId});--%>
<%--});--%>
<%--</script>--%>
<%--<title>添加机构</title>--%>
<%--</head>--%>
<%--<body>--%>
<%--<h3>添加机构<a href="javascript:closeWin();"></a></h3>--%>
<%--<input type="hidden" id="parentId" name="parentId" value="${parentId}">--%>
<%--<div class="yi_c over">--%>
<%--<div id="containDiv" style="float: left; width: 510px;height: 480px;overflow:auto; border-top:0px; padding: 10px 0px;"></div>--%>
<%--<div style="float: left;width: 50px;padding-top: 200px; border-top:0px">--%>
<%--<div class="btns" style="border-top:0px">--%>
<%--<input type="button" id="addBtn" value="&lt;&lt;" onclick="javascript:addTestItem();" title="添加项目"/>--%>
<%--<br/><br/>--%>
<%--<input type="button" id="removeBtn" value=">>" onclick="javascript:delTestItem();" title="移除项目"/>--%>
<%--</div>--%>
<%--</div>--%>
<%--<div id="noContainDiv" style="float: right; width: 510px;height: 480px; border-top:0px; padding: 10px 0px;"></div>--%>
<%--</div>--%>
<%--<div class="btns">--%>
<%--<input type="button" value="确定" onclick="javascript:addConfirm();" onkeydown='if(event.keyCode==13){}'>--%>
<%--<input type="button" value="取消" onclick="javascript:closeWin();">--%>
<%--</div>--%>
<%--</body>--%>
<%--</html>--%>
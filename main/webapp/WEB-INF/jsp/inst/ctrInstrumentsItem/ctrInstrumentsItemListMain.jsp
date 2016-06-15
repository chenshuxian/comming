<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap">
    <div class="pop-container">
        <div class="wrapper-container" >
            <div class="wrapper-header flex-container flex-space-between">
                <div>
                    <strong>已包含项目</strong>
                    <small>(已包含项目<span id="containSize"></span>)</small>
                </div>
                <div class="header-right">
                    <div class="flex-container flex-space-between group-items">
                        <strong>未包含项目</strong>
                        <span>检验方法:</span>
                        <div class="drop-down">
                            <div class="drop-down-selected">
                                <span class="selected-items" id="StatusSpan">全部</span><i class="fa fa-angle-down "></i>
                            </div>
                            <div class="drop-down-menu">
                                <ul class="list-unstyled status-selector scrollHeight ulDefaultWidth">
                                    <li class="selected" el-value="">全部</li>
                                    <c:forEach items="${methodList}" var="method">
                                        <li el-value="${method.stringId}" >${method.name}</li>
                                    </c:forEach>
                                </ul>
                            </div>
                        </div>
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
                        <table id="addCheckProjectLeft"></table>
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
                        <table id="addCheckProjectRight"></table>
                    </div>
                </div>

            </div>
            <div class="wrapper-footer text-center">
                <button class="btn btn-submit sm-size" id="addBtn">确定</button>
                <button class="btn btn-cancel sm-size J_ClosePop" onclick="BM.arrayClean();">关闭</button>
            </div>
            <input type="hidden" id="testMethodId" />
        </div>

    </div>
</div>
<script>
    /* 状态搜索 */
    $(".status-selector li").on("click", function () {
        $("#StatusSpan").html($(this).html());
        $(".status-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var
                statusVal = $(this).attr("el-value"),
                queryItem = ["testMethodName"],
                searchStr = $(this).html();

        $("#testMethodId").val(statusVal);
        //console.log($(this).html());
        if (searchStr == "全部") {
            searchStr = "";
        }
        BM.localQuery(CtrInstrItem.rightArr,searchStr,queryItem);

        //$("#addCheckProjectRight").datagrid("reload", getSearchObj());

    });

    getSearchObj = function() {
        var
                searchStr =  $.trim( $("#searchStr").val()),
                testId = $("#testMethodId").val(),
                searchObj = {
                    instrumentId: CtrInstrItem.instrumentId,
                    addItemSearchStr: searchStr,
                    testMethodId: testId
                };

        return searchObj;
    };

    $("#leftShiftBtn").on('click',function () { BasicModule.leftShiftBtn(CtrInstrItem.rightArr); });
    $("#rightShiftBtn").on('click',function () { BasicModule.rightShiftBtn(CtrInstrItem.rightArr); });

    $("#searchBtn2").on('click', function () {
        var
                searchStr = $("#searchStr").val(),
                queryItem = ["codeNo","name","enName","enShortName","fastCode"];

        BM.localQuery(CtrInstrItem.rightArr,searchStr,queryItem);

    });

    $("#addBtn").on('click', function () {

        if ((BasicModule.addTestItemIds.length > 0) || (BasicModule.delTestItemIds.length > 0)) {
            // 提交
            var
                    data = {
                        instrumentId: CtrInstrItem.instrumentId,
                        delTestItemIds: BasicModule.delTestItemIds.join(","),
                        addTestItemIds: BasicModule.addTestItemIds.join(",")
                    };

            $.ajax({
                "url": CtrInstrItem.addUrl,
                "type": "POST",
                data: data,
                "success": function (data) {
                    resolutionData(data);
                    CtrInstrItem.dataGrid.datagrid('reload');
                    $("#" + CB.POPDIV).hide();
                    BasicModule.addTestItemIds = [];
                    BasicModule.delTestItemIds = [];
                },
                "error": function () {
                }
            });

        } else {
            //$("#ctrDictInfoModal").hide();
            $("#" + CB.POPDIV).hide();
        }
    })
</script>
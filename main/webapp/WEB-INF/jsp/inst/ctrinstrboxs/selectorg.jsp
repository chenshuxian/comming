<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<div class="pop-inner-wrap" id="${ctrInsBox}OrgPop">
    <div class="pop-container">
        <div class="wrapper-container">
            <div class="wrapper-header flex-container flex-space-between">
                <h1>选择机构</h1>
            </div>
            <div class="wrapper-content">
                <div class="main-content-header" style="margin-top: 10px;">
                    <div class="flex-container flex-space-between">
                        <div class="search flex-container  flex-space-between">
                            <div class="form-control-icon icon-right">
                                <input type="text" id="${ctrInsBox}OrgSearchStr" class="form-control"
                                       placeholder="搜索内容..."/>
                                <button class="control-icon text-center" id="${ctrInsBox}OrgSearchBtn">
                                    <i class="icon icon-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="main-content-body">
                    <table id="${ctrInsBox}OrgList"></table>
                </div>
            </div>
            <div class="wrapper-footer text-center">
                <button id="selectOrgBtn" class="btn btn-submit sm-size">确定</button>
                <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
            </div>
        </div>
    </div>
</div>

<script>
    $(function () {
        $("#" + CtrInstrBoxs.preId + "OrgSearchBtn").click(function () {
            CtrInstrBoxs.reloadDatagrid();
        });

        $("#selectOrgBtn").click(function () {
            if(typeof CtrInstrBoxs.orgId != "undefined") {
                $("#" + CtrInstrBoxs.preId + "SelectOrg").html(CtrInstrBoxs.orgName);
                CtrInstrBoxs.reloadDatagrid();
            } else {
                CtrInstrBoxs.orgId = CtrInstrBoxs.tempOrgId;
                CtrInstrBoxs.orgName = CtrInstrBoxs.tempOrgName;
            }
            $("#ctrDictInfoModal").hide();
        });
    });
</script>
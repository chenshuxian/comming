<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/13
  Time: 14:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<div class="pop-inner-wrap" id="${oi}OrgPop">
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
                <input type="text" id="${oi}OrgSearchStr" class="form-control"
                       placeholder="搜索内容..."/>
                <button class="control-icon text-center" id="${oi}OrgSearchBtn">
                  <i class="icon icon-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="main-content-body">
          <table id="${oi}OrgList"></table>
        </div>
      </div>
      <div class="wrapper-footer text-center">
        <button id="${oi}selectOrgBtn" class="btn btn-submit sm-size">确定</button>
        <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
      </div>
    </div>
  </div>
</div>

<script>
  $(function () {
    $("#oiOrgSearchBtn").click(function () {
      //OrgInit.reloadDatagrid();
      var params = {
        dataGrid: $("#oiOrgList"),
        searchObj:{
          searchStr: $("#oiOrgSearchStr").val()
        }
      }
      OrgInit.searchGrid(params);
    });

    $("#oiselectOrgBtn").click(function () {
      OrgInit.exParams = {orgId: OrgInit.orgId};
      //console.log("CIBORG"+ OrgInit.orgId);
      if(typeof OrgInit.orgId != "undefined") {
        $("#" + OrgInit.preId + "orgName").html(OrgInit.orgName);
        OrgInit.searchGrid();
      } else {
        OrgInit.orgId = OrgInit.tempOrgId;
        OrgInit.orgName = OrgInit.tempOrgName;
      }
      $("#"+CB.POPDIV).hide();
    });
  });
</script>

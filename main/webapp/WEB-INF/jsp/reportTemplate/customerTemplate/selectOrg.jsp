<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/13
  Time: 14:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<div class="pop-inner-wrap" id="OrgPop">
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
                <input type="text" id="OrgSearchStr" class="form-control"
                       placeholder="搜索内容..."/>
                <button class="control-icon text-center" id="OrgSearchBtn">
                  <i class="icon icon-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="main-content-body">
          <table id="OrgList"></table>
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
    $("#OrgSearchBtn").click(function () {
      //CusTemplate.reloadDatagrid();
      var params = {
        dataGrid: $("#OrgList"),
        searchObj:{
          searchStr: $("#OrgSearchStr").val()
        }
      }
      CusTemplate.searchGrid(params);
    });

    $("#selectOrgBtn").click(function () {
      CusTemplate.exParams = {orgId: CusTemplate.orgId};
      //console.log("CIBORG"+ CusTemplate.orgId);
      if(typeof CusTemplate.orgId != "undefined") {
        $("#" + CusTemplate.preId + "SelectOrg").html(CusTemplate.orgName);
        CusTemplate.searchGrid();
      } else {
        CusTemplate.orgId = CusTemplate.tempOrgId;
        CusTemplate.orgName = CusTemplate.tempOrgName;
      }
      $("#"+CB.POPDIV).hide();
    });
  });
</script>

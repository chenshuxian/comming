<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<div class="pop-inner-wrap" id="${ii}OrgPop">
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
                <input type="text" id="${ii}OrgSearchStr" class="form-control"
                       placeholder="搜索内容..."/>
                <button class="control-icon text-center" id="${ii}OrgSearchBtn">
                  <i class="icon icon-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="main-content-body">
          <table id="${ii}OrgList"></table>
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

    $("#" + Instruments.preId + "OrgSearchBtn").click(function () {
      var params = {
        dataGrid: $("#iiOrgList"),
        searchObj:{
          searchStr: $("#iiOrgSearchStr").val()
        }
      };
      //Instruments.reloadDatagrid();
      Instruments.searchGrid(params);
    });

    $("#selectOrgBtn").click(function () {
      Instruments.exParams = {orgId: Instruments.orgId};
      //console.log("CIBORG"+ Instruments.orgId);
      if(typeof Instruments.orgId != "undefined") {
        $("#" + Instruments.preId + "SelectOrg").html(Instruments.orgName);
        //Instruments.reloadDatagrid();
        Instruments.searchGrid();
      } else {
        Instruments.orgId = Instruments.tempOrgId;
        Instruments.orgName = Instruments.tempOrgName;
      }
      $("#"+CB.POPDIV).hide();
    });
  });
</script>
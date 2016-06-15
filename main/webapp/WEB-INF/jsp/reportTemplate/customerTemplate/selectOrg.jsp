<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/13
  Time: 14:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap" id="cstOrgPop">
  <div class="pop-container">
    <div class="wrapper-container">
      <div class="wrapper-header flex-container flex-space-between">
        <h1>选择机构</h1>
          <div class="flex-space-between">
            <div class="search flex-container  flex-space-between">
              <div class="form-control-icon icon-right">
                <input type="text" id="OrgSearchStr" style="width:200px" class="form-control"
                       placeholder="搜索内容..."/>
                <button class="control-icon text-center" id="OrgSearchBtn">
                  <i class="icon icon-search"></i>
                </button>
              </div>
            </div>
          </div>
      </div>
      <div class="wrapper-content">
          <table id="cstOrgList"></table>
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
      CusTemplate.orgId = undefined;
      var params = {
        dataGrid: $("#cstOrgList"),
        searchObj:{
          searchStr: $("#OrgSearchStr").val()
        }
      }
      CusTemplate.searchGrid(params);
    });

    $("#selectOrgBtn").click(function () {
      var
              orgId = CusTemplate.orgId,
              url = CusTemplate.systemUrl,
              checkRadio =  $("input[type='radio']:checked").length;

      if(checkRadio == 0){
        BM.showMessage("请选择机构");
        return;
      }

      CusTemplate.exParams = {orgId: orgId};
      //console.log("CIBORG"+ CusTemplate.orgId);
      //if(typeof orgId != "undefined") {
        $("#" + CusTemplate.preId + "SelectOrg").html("<p>" + CusTemplate.orgName + "</p>");
        $("#" + CusTemplate.preId + "SelectOrg").tooltip({
          content: "<span style='color:#000000'>" + CusTemplate.orgName + "</span>",
          onShow: function() {
            $(this).tooltip('tip').css({
              backgroundColor: '#fff',
              borderColor: '#666'
            });
          }
        });
        //所属系统
        $.ajax({
          url: url,
          type: CB.METHOD,
          data: {orgId: orgId},
          success: function(data) {
            //console.log(data);
            //先将选择系统清空
            $("#systemSelect").html("");
            $("#cstSystem").val("-1");
            $("#cstSystemSpan").html("选择系统");

              if(data) {
                $.each(data, function (i, item) {
                  $("#systemSelect").append("<li el-value=" + item.appId + ">" + item.appName + "</li>");
                })
              }
          }
        });
      CusTemplate.searchGrid();
      $("#"+CB.POPDIV).hide();
//      } else {
////        CusTemplate.orgId = CusTemplate.tempOrgId;
////        CusTemplate.orgName = CusTemplate.tempOrgName;
//        //BM.showMessage("请选择机构");
//      }

    });
  });
</script>

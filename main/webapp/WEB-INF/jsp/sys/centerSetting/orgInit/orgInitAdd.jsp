<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/13
  Time: 16:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<div class="pop-inner-wrap">
  <div class="pop-container">
    <div class="wrapper-container">
      <div class="wrapper-header flex-container flex-space-between">
        <h1>添加系统</h1>
        <small class="basic-code">(记录总数):<span id="total"></span></small>
      </div>
      <div class="wrapper-content">
        <div class="main-content-body">
          <table id="subAddList"></table>
        </div>
      </div>
      <div class="wrapper-footer text-center">
        <button id="saveBtn" class="btn btn-submit sm-size">确定</button>
        <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
      </div>
    </div>
  </div>
</div>
<script>
  (function($){
    $(function(){
        $("#saveBtn").click(function(){
            //取得已选取的checkbox
            $("#saveBtn").attr("disabled", true);
            var
                   dataGrid = $("#subAddList"),
                   checkItems =  OrgInit.getIds(dataGrid);

            //console.log("ci"+ checkItems);

            $.ajax({
              url: OrgInit.addUrl2,
              type: CB.METHOD,
              data:{ids:checkItems.join(","),orgId:OrgInit.orgId},
              success: function(response){
                  $("#saveBtn").attr("disabled", false);
                  BM.resolutionData(response);
                  OrgInit.dataGrid.datagrid("reload");
                  $("#"+CB.POPDIV).hide();
              },
              error: function(){
                $("#saveBtn").attr("disabled", false);
              }
            })
        })
    })
  }(jQuery))
</script>


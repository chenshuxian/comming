<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/15
  Time: 13:22
  Name: 客户报表模板维护-从模板库添加
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap">
  <div class="pop-container">
    <div class="wrapper-container">
      <div class="flex-container project-dictionary">
        <div class="flex-col-7 dictionary-database">
          <div class="wrapper-header flex-container flex-space-between">
            <div class="option">
              <div class="flex-container flex-vertical-center">
                <span class="symbol"></span><span>所属系统:</span>
                <div class="drop-down">
                  <div class="drop-down-selected">
                    <span class="selected-items" id="SystemSpan"></span><i class="fa fa-angle-down "></i>
                  </div>
                  <div class="drop-down-menu">
                    <ul class="list-unstyled system-selector" id="systemSelect">
                      <c:forEach items="${applicationList}" var="appList" varStatus="status">
                        <li el-value="${appList.appId}"  <c:if test="${status.first}">selected="selected"</c:if>>${appList.appName}</li>
                      </c:forEach>
                    </ul>
                  </div>
                </div>
                <span class="symbol"></span> <span>模板类型:</span>
                <div class="drop-down">
                  <div class="drop-down-selected">
                    <span class="selected-items" id="template">全部</span><i class="fa fa-angle-down "></i>
                  </div>
                  <div class="drop-down-menu">
                    <ul class="list-unstyled template-selector">
                      <li class="selected" el-value="-1">全部</li>
                      <li el-value="0">报告</li>
                      <li el-value="1">条码标签</li>
                      <li el-value="2">报表</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-control-icon icon-right">
              <input type="text" id="searchStr" class="form-control" style="width:120px;" placeholder="搜索内容...">
              <button class="control-icon text-center" id="searchBtn">
                <i class="icon icon-search"></i>
              </button>
            </div>
          </div>
          <div class="wrapper-content">
            <div class="main-content-body easyui-layout">
              <table id="List"></table>
            </div>
          </div>
          <input type="hidden" id="typeKey"/>
          <input type="hidden" id="appId"/>
          <div class="wrapper-footer text-center">
            <button class="btn btn-submit sm-size J_ShowPop" id="editBtn">确定</button>
            <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
          </div>
        </div>
        <div class="flex-col-5">
          <div class="wrapper-header">
            <h1>报告预览</h1>
          </div>
          <img id="picture" src="http://article.fd.zol-img.com.cn/t_s640x2000/g5/M00/0E/07/ChMkJlcPLTiIASPzAAvx2Us-1dsAAP4cQK84M4AC_Hx502.png">
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  (function($){
    var _dataGrid =  $("#List");
    var getParams = function() {
      var
              params = {
                dataGrid:_dataGrid,
                searchObj: {
                  searchStr: $("#searchStr").val(),
                  typeKey: $("#typeKey").val(),
                  appId: $("#appId").val(),
                  orgId: CusTemplate.orgId
                }
              };
      return params;
    };

    // 模板类型
    $(".template-selector li").on("click", function () {
        var flg,val,params;
        $("#template").html($(this).html());
        $(".template-selector li.selected").removeClass("selected");
        flg = $(this).is('.selected');
        $(this).addClass(function () {
          return flg ? '' : 'selected';
        })

        val = $(this).attr("el-value");
        $("#typeKey").val(val);
        params = getParams();
        CusTemplate.searchGrid(params);
    });

    // 系统
    $(".system-selector li").on("click", function () {
        var flg,val,params;
        $("#SystemSpan").html($(this).html());
        $(".system-selector li.selected").removeClass("selected");
        flg = $(this).is('.selected');
        $(this).addClass(function () {
          return flg ? '' : 'selected';
        })

        val = $(this).attr("el-value");
        $("#appId").val(val);
        params = getParams();
        CusTemplate.searchGrid(params);
    });

    $("#searchBtn").on("click",function() {
        var params = getParams();
        CusTemplate.searchGrid(params);
    });

    $("#editBtn").on("click",function(){
      var
              checkedItems = CusTemplate.getIds(_dataGrid),
              params;


      if(checkedItems == ''){
        BM.showMessage("请选择要添加的模板！");
        return false;
      }

      params = {
        url:CusTemplate.templateAddUrl,
        dataGrid:CusTemplate.dataGrid,
        data:{
          ids: checkedItems.join(","),
          orgId: CusTemplate.orgId
        }
      }
      CusTemplate.commonAdd(params);

    });

  }(jQuery));
</script>

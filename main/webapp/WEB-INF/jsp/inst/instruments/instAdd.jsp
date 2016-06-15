<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="pop-inner-wrap">
  <div class="pop-container">
    <div class="wrapper-container" id="ii_addFromCTR_main-content-header">
      <div class="flex-container project-dictionary">
        <div class="flex-col-5 dictionary-database">
          <div class="wrapper-header flex-container flex-space-between">
            <div class="option">
              <div class="flex-container flex-y-center">
                <span class="symbol"></span><span>前台通讯类:</span>
                <div class="drop-down drop-down-icon">
                  <div class="drop-down-selected">
                    <span class="selected-items" id="frontClassSpan">全部</span>
                  </div>
                  <div class="drop-down-menu">
                    <ul class="list-unstyled frontClass-selector">
                      <li class="selected" el-value="">全部</li>
                      <li el-value="0">类名不为空</li>
                      <li el-value="1">类名为空</li>
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
            <div class="main-content-body">
              <table id="instCtrList"></table>
            </div>
          <div class="wrapper-footer text-center">
            <button class="btn btn-submit sm-size J_ShowPop" id="editBtn">确定</button>
            <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
          </div>
        </div>
        <div class="flex-col-7">
          <div class="wrapper-header flex-container flex-space-between flex-space-10">
              <div class="flex-col-6">
                  <div class="flex-container flex-y-center">
                     <label for=""> 前台通讯类:</label> <input type="text" id="frontClassName" class="form-control block-show" style="width:150px" disabled/>
                  </div>
              </div>
              <div class="flex-col-6">
                  <div class="flex-container flex-y-center">
                      <label for="">  后台解析类:</label> <input type="text" id="className" class="form-control block-show" style="width:150px" disabled/>
                  </div>
              </div>
          </div>
          <div class="wrapper-content">
            <div class="vertical-space">
              <table id="instCtrItemList"></table>
            </div>
            <div class="vertical-space">
              <table id="instCtrGermList"></table>
            </div>
            <div class="vertical-space">
              <table id="instCtrAntiList"></table>
            </div>
            <input type="hidden" id="frontClass"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  (function($){
    var _dataGrid =  $("#instCtrList");
    var getParams = function() {
      var
              params = {
                dataGrid:_dataGrid,
                searchObj: {
                  searchStr: $("#searchStr").val(),
                  searchFrontClassName: $("#frontClass").val()
                }
              };
      return params;
    }
    // 前台通讯类
    $(".frontClass-selector li").on("click", function () {
        var flg,val,params;
        $("#frontClassSpan").html($(this).html());
        $(".frontClass-selector li.selected").removeClass("selected");
        flg = $(this).is('.selected');
        $(this).addClass(function () {
          return flg ? '' : 'selected';
        })

        val = $(this).attr("el-value");
        $("#frontClass").val(val);
        params = getParams();
        Instruments.searchGrid(params);
    });

    $("#searchBtn").on("click",function() {
        var params = getParams();
        Instruments.searchGrid(params);
    });

    $("#editBtn").on("click",function(){
        var
              checkedItems = _dataGrid.datagrid('getChecked'),
              ids=[],params;
        $.each(checkedItems, function(index, item){
            ids.push(item.idString);
        });

        if(ids == ''){
            BM.showMessage("请选择要添加的仪器！");
            return false;
        }

        params = {
          url:Instruments.instAddUrl,
          dataGrid:Instruments.dataGrid,
          data:{
            ids: ids.join(","),
            orgId: Instruments.orgId
          }
        }
        Instruments.commonAdd(params);
    });

  }(jQuery));
</script>
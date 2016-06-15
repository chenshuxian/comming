/**
 * 标本类型js
 * Created by subanmiao on 2016/1/8.
 */

var SpecimenType = (function($){

    /* START render basicModule */
    SpecimenType = Object.create(CtrDictCodes);
    /* END render basicModule */
    
    var
         _preId = CB.PREID.SY,//$("#specimenTypeMainPreId").val(),
         _module = "SpecimenType",
         _tableList =  $("#" + _preId + "List"),
         _typeKey = $("#" + _preId + "TypeKey").val(),
         _exParams = {typeKey: _typeKey},
         _hideCols = null,	//要穩藏的欄位
         _data = SpecimenType.searchObj(_preId),
         _pageListUrl = SpecimenType.pageListUrl,

    
         /* 参数说明:
         * url:pagelisturl
         * data:初始时后台所有接收的参数，是一个物件
         * module:目前的这个模组名，会对晕到gridColumus.js需要注意
         * hideCols:想稳藏的栏位，是一个array
         * tableList:dataGird的对象
         * preId:前辍
         */
         _dgParams = {
             url:_pageListUrl,
             data:_data,
             module:_module,
             hideCols:_hideCols,
             tableList:_tableList,
             preId:_preId
         },
    
         _gridObj = dataGridM.init(_dgParams),
         _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(SpecimenType,{
        preId: _preId,
        module: _module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SpecimenType.getAddParams(_exParams),//$.extend({},SpecimenType.addParams,{typeKey:_typeKey}),
        exParams: _exParams
    });

    return SpecimenType;

}($));

$(function(){
    SpecimenType.init();
    //BasicModule.checkAuth("sy");
});
/*var SpecimenType = {
    preId: $("#specimenTypeMainPreId").val(),
    init: function () {
        newcommonjs.pageInit(this.preId);
        this.tableList = $("#" + this.preId + "CtrDictCodeList");
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesPageList";
        var typeKey = $("#" + this.preId + "TypeKey").val();
        var params = this.searchObj();
        var gridObj = CtrDictCodes.createDataGrid(url, typeKey, params, 'POST', this.tableList);
        gridObj.view =
            $.extend({}, $.fn.datagrid.defaults.view, {
                onAfterRender: function () {
                    // 操作成功后刷新dataGrid
                    switch (SpecimenType.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(SpecimenType.preId, "", 2, 2);
                            SpecimenType.currentEvent = undefined;
                            break;
                    }
                }
            });

        /!* render DataGrid *!/
        this.dataGrid = this.tableList.datagrid(gridObj);

        /!* 关键词搜索 *!/
        $("#" + this.preId + "SearchBtn").click(function () {
            CtrDictCodes.dataGridSearch(SpecimenType.dataGrid, SpecimenType.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + SpecimenType.preId + "StatusSpan").html($(this).html());
            $("." + SpecimenType.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + SpecimenType.preId + "Status").val(statusVal);

            CtrDictCodes.dataGridSearch(SpecimenType.dataGrid, SpecimenType.searchObj());
        });

        /!* 排序 *!/
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + SpecimenType.preId + "SortSpan").html($(this).html());
            $("." + SpecimenType.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + SpecimenType.preId + "Sort").val(sortVal);

            CtrDictCodes.dataGridSearch(SpecimenType.dataGrid, SpecimenType.searchObj());
        });

        /!* 批量删除 *!/
        $("#" + this.preId + "DeleteCtrDictCodeBatch").click(function () {
            CtrDictCodes.deleteBatch(SpecimenType.dataGrid);
        });

        /!* 新增 *!/
        $("#" + this.preId + "AddCtrDictCode").click(function () {
            SpecimenType.currentEvent = "add";
            var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, function () {
                $("#editName").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(SpecimenType.tableList);
        });
    },

    searchObj: function () {
        return {
            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
            status: $("#" + this.preId + "Status").val(),
            sort: $("#" + this.preId + "Sort").val(),
            typeKey: $("#" + this.preId + "TypeKey").val()
        };
    }

};

$(function () {
    SpecimenType.init();
});*/

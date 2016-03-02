/**
 * 样本标识js
 * Created by subanmiao on 2016/1/8.
 */
var SpecimenLogo = (function($){

    /* START render basicModule */
    SpecimenLogo = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.SL,//$("#SpecimenLogoMainPreId").val(),
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = [],	//要穩藏的欄位
        _data = SpecimenLogo.searchObj(_preId),
        _pageListUrl = SpecimenLogo.pageListUrl,

        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:"SpecimenLogo",
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(SpecimenLogo,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SpecimenLogo.getAddParams(_exParams),
        exParams:_exParams
    })


    /* 状态搜索 */
    $("." + _preId + "-status-selector li").on("click", function () {
        $("#" + _preId + "StatusSpan").html($(this).html());
        $("." + _preId + "-status-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#" + _preId + "Status").val(statusVal);

        SpecimenLogo.searchGrid();
    });

    /* 排序 */
    $("." + _preId + "-sort-selector li").on("click", function () {
        $("#" + _preId + "SortSpan").html($(this).html());
        $("." + _preId + "-sort-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var sortVal = $(this).attr("el-value");
        $("#" + _preId + "Sort").val(sortVal);

        SpecimenLogo.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        SpecimenLogo.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        SpecimenLogo.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        SpecimenLogo.deleteBetch();
    });

    return SpecimenLogo;


}(jQuery));

$(function(){
    SpecimenLogo.init();
});
//var SpecimenLogo = {
//    preId: $("#specimenLogoPreId").val(),
//    init: function () {
//        newcommonjs.pageInit(this.preId);
//        this.tableList = $("#" + this.preId + "CtrDictCodeList");
//        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesPageList";
//        var typeKey = $("#" + this.preId + "TypeKey").val();
//        var params = this.searchObj();
//        var gridObj = CtrDictCodes.createDataGrid(url, typeKey, params, 'POST', this.tableList);
//        gridObj.view =
//            $.extend({}, $.fn.datagrid.defaults.view, {
//                onAfterRender: function () {
//                    switch (SpecimenLogo.currentEvent) {
//                        case "add":
//                            newcommonjs.setSearchConditions(SpecimenLogo.preId, "", 2, 2);
//                            SpecimenLogo.currentEvent = undefined;
//                            break;
//                    }
//                }
//            });
//
//        /* render DataGrid */
//        this.dataGrid = this.tableList.datagrid(gridObj);
//
//        /* 关键词搜索 */
//        $("#" + this.preId + "SearchBtn").click(function () {
//            CtrDictCodes.dataGridSearch(SpecimenLogo.dataGrid, SpecimenLogo.searchObj());
//        });
//
//        /* 状态搜索 */
//        $("." + this.preId + "-status-selector").on("click", "li", function () {
//            $("#" + SpecimenLogo.preId + "StatusSpan").html($(this).html());
//            $("." + SpecimenLogo.preId + "-status-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + SpecimenLogo.preId + "Status").val(statusVal);
//
//            CtrDictCodes.dataGridSearch(SpecimenLogo.dataGrid, SpecimenLogo.searchObj());
//        });
//
//        /* 排序 */
//        $("." + this.preId + "-sort-selector").on("click", "li", function () {
//            $("#" + SpecimenLogo.preId + "SortSpan").html($(this).html());
//            $("." + SpecimenLogo.preId + "-sort-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var sortVal = $(this).attr("el-value");
//            $("#" + SpecimenLogo.preId + "Sort").val(sortVal);
//
//            CtrDictCodes.dataGridSearch(SpecimenLogo.dataGrid, SpecimenLogo.searchObj());
//        });
//
//        /* 批量删除 */
//        $("#" + this.preId + "DeleteCtrDictCodeBatch").click(function () {
//            CtrDictCodes.deleteBatch(SpecimenLogo.dataGrid);
//        });
//
//        /* 新增 */
//        $("#" + this.preId + "AddCtrDictCode").click(function () {
//            SpecimenLogo.currentEvent = "add";
//            var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
//            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, function () {
//                $("#editName").focus();
//            }, url, 480);
//        });
//
//        $(window).on('resize', function () {
//            newcommonjs.tableAuto(SpecimenLogo.tableList);
//        });
//    },
//
//    searchObj: function () {
//        return {
//            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
//            status: $("#" + this.preId + "Status").val(),
//            sort: $("#" + this.preId + "Sort").val(),
//            typeKey: $("#" + this.preId + "TypeKey").val()
//        };
//    }
//
//};
//
//$(function () {
//    SpecimenLogo.init();
//});

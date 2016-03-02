/**
 * 受检成份js
 * Created by subanmiao on 2016/1/8.
 */
var SubjectIngredient = (function($){

    /* START render basicModule */
    SubjectIngredient = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.SI,//$("#SubjectIngredientMainPreId").val(),
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = [],	//要穩藏的欄位
        _data = SubjectIngredient.searchObj(_preId),
        _pageListUrl = SubjectIngredient.pageListUrl,

        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:"SubjectIngredient",
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(SubjectIngredient,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SubjectIngredient.getAddParams(_exParams),
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

        SubjectIngredient.searchGrid();
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

        SubjectIngredient.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        SubjectIngredient.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        SubjectIngredient.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        SubjectIngredient.deleteBetch();
    });

    return SubjectIngredient;


}(jQuery));

$(function(){
    SubjectIngredient.init();
});
//var SubjectIngredient = {
//    preId: $("#subjectIngredientPreId").val(),
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
//                    switch (SubjectIngredient.currentEvent) {
//                        case "add":
//                            newcommonjs.setSearchConditions(SubjectIngredient.preId, "", 2, 2);
//                            SubjectIngredient.currentEvent = undefined;
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
//            CtrDictCodes.dataGridSearch(SubjectIngredient.dataGrid, SubjectIngredient.searchObj());
//        });
//
//        /* 状态搜索 */
//        $("." + this.preId + "-status-selector").on("click", "li", function () {
//            $("#" + SubjectIngredient.preId + "StatusSpan").html($(this).html());
//            $("." + SubjectIngredient.preId + "-status-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + SubjectIngredient.preId + "Status").val(statusVal);
//
//            CtrDictCodes.dataGridSearch(SubjectIngredient.dataGrid, SubjectIngredient.searchObj());
//        });
//
//        /* 排序 */
//        $("." + this.preId + "-sort-selector").on("click", "li", function () {
//            $("#" + SubjectIngredient.preId + "SortSpan").html($(this).html());
//            $("." + SubjectIngredient.preId + "-sort-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            })
//
//            var sortVal = $(this).attr("el-value");
//            $("#" + SubjectIngredient.preId + "Sort").val(sortVal);
//
//            CtrDictCodes.dataGridSearch(SubjectIngredient.dataGrid, SubjectIngredient.searchObj());
//        });
//
//        /* 批量删除 */
//        $("#" + this.preId + "DeleteCtrDictCodeBatch").click(function () {
//            CtrDictCodes.deleteBatch(SubjectIngredient.dataGrid);
//        });
//
//        /* 新增 */
//        $("#" + this.preId + "AddCtrDictCode").click(function () {
//            SubjectIngredient.currentEvent = "add";
//            var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
//            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, function () {
//                $("#editName").focus();
//            }, url, 480);
//        });
//
//        $(window).on('resize', function () {
//            newcommonjs.tableAuto(SubjectIngredient.tableList);
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
//    SubjectIngredient.init();
//});

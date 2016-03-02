/**
 * 病理大类js
 * Created by subanmiao on 2016/1/8.
 */
var PathologyCategory = (function($){

    /* START render basicModule */
    PathologyCategory = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.PC,
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = ["whonetCode"],	//要穩藏的欄位
        _data = PathologyCategory.searchObj(_preId),
        _pageListUrl = PathologyCategory.pageListUrl,

        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:"PathologyCategory",
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(PathologyCategory,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: PathologyCategory.getAddParams(_exParams),
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

        PathologyCategory.searchGrid();
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

        PathologyCategory.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        PathologyCategory.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        PathologyCategory.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        PathologyCategory.deleteBetch();
    });

    return PathologyCategory;


}(jQuery));

$(function(){
    PathologyCategory.init();
});
/*var PathologyCategory = {
    preId: $("#pathologyCategoryMainPreId").val(),
    init: function () {
        newcommonjs.pageInit(this.preId);
        this.tableList = $("#" + this.preId + "CtrDictCodeList");
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesPageList";
        var typeKey = $("#" + this.preId + "TypeKey").val();
        var params = this.searchObj();
        var hideColumns = [];
        hideColumns.push("whonetCode");
        var gridObj = CtrDictCodes.createDataGrid(url, typeKey, params, 'POST', this.tableList, hideColumns);
        gridObj.view =
            $.extend({}, $.fn.datagrid.defaults.view, {
                onAfterRender: function () {
                    // 操作成功后刷新dataGrid
                    switch (PathologyCategory.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(PathologyCategory.preId, "", 2, 2);
                            PathologyCategory.currentEvent = undefined;
                            break;
                    }
                }
            });
        /!* render DataGrid *!/
        this.dataGrid = this.tableList.datagrid(gridObj);

        /!* 关键词搜索 *!/
        $("#" + this.preId + "SearchBtn").click(function () {
            CtrDictCodes.dataGridSearch(PathologyCategory.dataGrid, PathologyCategory.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + PathologyCategory.preId + "StatusSpan").html($(this).html());
            $("." + PathologyCategory.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            });

            var statusVal = $(this).attr("el-value");
            $("#" + PathologyCategory.preId + "Status").val(statusVal);

            CtrDictCodes.dataGridSearch(PathologyCategory.dataGrid, PathologyCategory.searchObj());
        });

        /!* 排序 *!/
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + PathologyCategory.preId + "SortSpan").html($(this).html());
            $("." + PathologyCategory.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + PathologyCategory.preId + "Sort").val(sortVal);

            CtrDictCodes.dataGridSearch(PathologyCategory.dataGrid, PathologyCategory.searchObj());
        });

        /!* 批量删除 *!/
        $("#" + this.preId + "DeleteCtrDictCodeBatch").click(function () {
            CtrDictCodes.deleteBatch(PathologyCategory.dataGrid);
        });

        /!* 新增 *!/
        $("#" + this.preId + "AddCtrDictCode").click(function () {
            PathologyCategory.currentEvent = "add";
            var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, function () {
                $("#editName").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(PathologyCategory.tableList);
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
    PathologyCategory.init();
});*/

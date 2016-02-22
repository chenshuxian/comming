/**
 * 医学专业组js
 * Created by subanmiao on 2016/1/8.
 */
var Discipline = (function($){

    /* START render basicModule */
    Discipline = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.MPG,//$("#disciplineMainPreId").val(),
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = null,	//要穩藏的欄位
        _data = Discipline.searchObj(_preId),
        _pageListUrl = Discipline.pageListUrl,

        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:"Discipline",
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(Discipline,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SpecimenType.getAddParams(_exParams),
        exParams:_exParams,
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

        Discipline.searchGrid();
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

        Discipline.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        Discipline.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        Discipline.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        Discipline.deleteBetch();
    });

    return Discipline;


}(jQuery));

$(function(){
    Discipline.init();
});
/*var Discipline = {
    preId: $("#disciplineMainPreId").val(),
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
                    switch (Discipline.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(Discipline.preId, "", 2, 2);
                            Discipline.currentEvent = undefined;
                            break;
                    }
                }
            });
        //!* render DataGrid *!/
        this.dataGrid = this.tableList.datagrid(gridObj);

        /!* 关键词搜索 *!/
        $("#" + this.preId + "SearchBtn").click(function () {
            CtrDictCodes.dataGridSearch(Discipline.dataGrid, Discipline.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + Discipline.preId + "StatusSpan").html($(this).html());
            $("." + Discipline.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + Discipline.preId + "Status").val(statusVal);

            CtrDictCodes.dataGridSearch(Discipline.dataGrid, Discipline.searchObj());
        });

        /!* 排序 *!/
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + Discipline.preId + "SortSpan").html($(this).html());
            $("." + Discipline.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + Discipline.preId + "Sort").val(sortVal);

            CtrDictCodes.dataGridSearch(Discipline.dataGrid, Discipline.searchObj());
        });

        /!* 批量删除 *!/
        $("#" + this.preId + "DeleteCtrDictCodeBatch").click(function () {
            CtrDictCodes.deleteBatch(Discipline.dataGrid);
        });

        /!* 新增 *!/
        $("#" + this.preId + "AddCtrDictCode").click(function () {
            Discipline.currentEvent = "add";
            var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, function () {
                $("#editName").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(Discipline.tableList);
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
    Discipline.init();
});*/

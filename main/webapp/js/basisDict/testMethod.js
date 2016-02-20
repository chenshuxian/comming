/**
 * 检验方法js
 * Created by subanmiao on 2016/1/8.
 */
var TestMethod = (function($){

    /* START render basicModule */
    TestMethod = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.TM,//$("#TestMethodMainPreId").val(),
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = ["whonetCode"],	//要穩藏的欄位
        _data = TestMethod.searchObj(_preId),
        _pageListUrl = TestMethod.pageListUrl,

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
            module:"TestMethod",
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(TestMethod,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: TestMethod.getAddParams(_exParams),//$.extend({},TestMethod.addParams,{typeKey:_typeKey}),
        exParams:_exParams,
    });


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

        TestMethod.searchGrid();
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

        TestMethod.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        TestMethod.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        TestMethod.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        TestMethod.deleteBetch();
    });

    return TestMethod;


}(jQuery));

$(function(){
    TestMethod.init();
});
/*var TestMethod = {
    preId: $("#testMethodMainPreId").val(),
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
                    switch (TestMethod.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(TestMethod.preId, "", 2, 2);
                            TestMethod.currentEvent = undefined;
                            break;
                    }
                }
            });
        /!* render DataGrid *!/
        this.dataGrid = this.tableList.datagrid(gridObj);

        /!* 关键词搜索 *!/
        $("#" + this.preId + "SearchBtn").click(function () {
            CtrDictCodes.dataGridSearch(TestMethod.dataGrid, TestMethod.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + TestMethod.preId + "StatusSpan").html($(this).html());
            $("." + TestMethod.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + TestMethod.preId + "Status").val(statusVal);

            CtrDictCodes.dataGridSearch(TestMethod.dataGrid, TestMethod.searchObj());
        });

        /!* 排序 *!/
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + TestMethod.preId + "SortSpan").html($(this).html());
            $("." + TestMethod.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + TestMethod.preId + "Sort").val(sortVal);

            CtrDictCodes.dataGridSearch(TestMethod.dataGrid, TestMethod.searchObj());
        });

        /!* 批量删除 *!/
        $("#" + this.preId + "DeleteCtrDictCodeBatch").click(function () {
            CtrDictCodes.deleteBatch(TestMethod.dataGrid);
        });

        /!* 新增 *!/
        $("#" + this.preId + "AddCtrDictCode").click(function () {
            TestMethod.currentEvent = "add"
            var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, function () {
                $("#editName").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(TestMethod.tableList);
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
    TestMethod.init();
});*/

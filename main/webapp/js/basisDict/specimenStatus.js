/**
 *标本状态js
 * Created by chenshuxian on 2016/1/8.
 */
var SpecimenStatus = (function($){

    /* START render basicModule */
    SpecimenStatus = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.SS,
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = ["whonetCode"],	//要穩藏的欄位
        _data = SpecimenStatus.searchObj(_preId),
        _pageListUrl = SpecimenStatus.pageListUrl,

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
            module:"SpecimenStatus",
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(SpecimenStatus,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SpecimenStatus.getAddParams(_exParams),
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

        SpecimenStatus.searchGrid();
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

        SpecimenStatus.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        SpecimenStatus.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        SpecimenStatus.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        SpecimenStatus.deleteBetch();
    });

    return SpecimenStatus;


}(jQuery));

$(function(){
    SpecimenStatus.init();
});
/*var SpecimenStatus = {
    preId: $("#ssPreId").val(),
    init: function () {
    	newcommonjs.pageInit(this.preId);
        SpecimenStatus.tableList = $("#" + SpecimenStatus.preId + "TypeList");
        var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesPageList";
        var typeKey = $("#" + SpecimenStatus.preId + "TypeKey").val();
        var params = {typeKey: typeKey};
        var coloumns=new Array()
        coloumns[0]="whonetCode";
        var gridObj = CtrDictCodes.createDataGrid(url, typeKey, params, 'POST', SpecimenStatus.tableList,coloumns);
        gridObj.view =    
            $.extend({}, $.fn.datagrid.defaults.view, {
                onAfterRender: function () {
                    // 操作成功后刷新dataGrid
                    switch (SpecimenStatus.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(SpecimenStatus.preId, "", 2, 2);
                            SpecimenStatus.currentEvent = undefined;
                            break;
                    }
                }
            });

        //!* render DataGrid *!/
        SpecimenStatus.dataGrid = SpecimenStatus.tableList.datagrid(gridObj);

        /!* 关键词搜索 *!/
        $("#" + SpecimenStatus.preId + "SearchBtn").click(function () {
        	newcommonjs.dataGridSearch(SpecimenStatus.dataGrid, SpecimenStatus.searchObj());
        });

        /!* 状态搜索 *!/
        $("." + SpecimenStatus.preId + "-status-selector").on("click", "li", function () {
            $("#" + SpecimenStatus.preId + "StatusSpan").html($(this).html());
            $("." + SpecimenStatus.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + SpecimenStatus.preId + "Status").val(statusVal);

            newcommonjs.dataGridSearch(SpecimenStatus.dataGrid, SpecimenStatus.searchObj());
        });

        /!* 排序 *!/
        $("." + SpecimenStatus.preId + "-sort-selector").on("click", "li", function () {
            $("#" + SpecimenStatus.preId + "SortSpan").html($(this).html());
            $("." + SpecimenStatus.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + SpecimenStatus.preId + "Sort").val(sortVal);

            newcommonjs.dataGridSearch(SpecimenStatus.dataGrid, SpecimenStatus.searchObj());
        });

        /!* 批量删除 *!/
        $("#" + SpecimenStatus.preId + "DeleteTypeBatch").click(function () {
            CtrDictCodes.deleteBatch(SpecimenStatus.dataGrid);
        });

        /!* 新增 *!/
        $("#" + SpecimenStatus.preId + "AddType").click(function () {
        	SpecimenStatus.currentEvent = "add";
        	var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, null, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(SpecimenStatus.tableList);
        });
    },

    searchObj: function () {
        return {
            searchStr: $.trim($("#" + SpecimenStatus.preId + "SearchStr").val()),
            status: $("#" + SpecimenStatus.preId + "Status").val(),
            sort: $("#" + SpecimenStatus.preId + "Sort").val(),
            typeKey: $("#" + SpecimenStatus.preId + "TypeKey").val()
        };
    }

};

$(function () {
    SpecimenStatus.init();
});*/

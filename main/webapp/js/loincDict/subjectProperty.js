/**
 * 受检属性js
 * Created by subanmiao on 2016/1/8.
 */
var SubjectProperty = {
    preId: $("#subjectPropertyPreId").val(),
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
                    switch (SubjectProperty.currentEvent) {
                        case "add":
                            newcommonjs.setSearchConditions(SubjectProperty.preId, "", 2, 2);
                            SubjectProperty.currentEvent = undefined;
                            break;
                    }
                }
            });

        /* render DataGrid */
        this.dataGrid = this.tableList.datagrid(gridObj);

        /* 关键词搜索 */
        $("#" + this.preId + "SearchBtn").click(function () {
            CtrDictCodes.dataGridSearch(SubjectProperty.dataGrid, SubjectProperty.searchObj());
        });

        /* 状态搜索 */
        $("." + this.preId + "-status-selector").on("click", "li", function () {
            $("#" + SubjectProperty.preId + "StatusSpan").html($(this).html());
            $("." + SubjectProperty.preId + "-status-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + SubjectProperty.preId + "Status").val(statusVal);

            CtrDictCodes.dataGridSearch(SubjectProperty.dataGrid, SubjectProperty.searchObj());
        });

        /* 排序 */
        $("." + this.preId + "-sort-selector").on("click", "li", function () {
            $("#" + SubjectProperty.preId + "SortSpan").html($(this).html());
            $("." + SubjectProperty.preId + "-sort-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var sortVal = $(this).attr("el-value");
            $("#" + SubjectProperty.preId + "Sort").val(sortVal);

            CtrDictCodes.dataGridSearch(SubjectProperty.dataGrid, SubjectProperty.searchObj());
        });

        /* 批量删除 */
        $("#" + this.preId + "DeleteCtrDictCodeBatch").click(function () {
            CtrDictCodes.deleteBatch(SubjectProperty.dataGrid);
        });

        /* 新增 */
        $("#" + this.preId + "AddCtrDictCode").click(function () {
            SubjectProperty.currentEvent = "add";
            var url = ctx + "/basisDict/ctrDictCodes/ctrDictCodesInfo";
            newcommonjs.showDictCodeEditDialog('', 'add', typeKey, function () {
                $("#editName").focus();
            }, url, 480);
        });

        $(window).on('resize', function () {
            newcommonjs.tableAuto(SubjectProperty.tableList);
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
    SubjectProperty.init();
});

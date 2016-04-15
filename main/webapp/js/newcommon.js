/**
 * For EasyUI style
 * Created by subanmiao on 2016/1/7.
 */

var newcommonjs = {
    //colMaxLength: 15,
		
	createGridObj: function (url, method, params) {
        var gridObj = {
            url: url,
            method: method,
            queryParams: params,
            fitColumns: true,
            fit: false,
            checkOnSelect: false,
            selectOnCheck: true,
            autoRowHeight: false,
            striped: true,
            pagination: true,
            pageNumber: 1,
            pageSize: 10
        };
        return gridObj;
    },

    /* 自适应表格 */
    tableAuto: function (tableList) {

        //var width = tableList.parents('.tabs-panels').width() - 40;
        //console.log($(window).width());
        var width = $(window).width() - 213;
        var height = tableList.parents('.tabs-panels').height() - 70;
        //console.log(tableList);
        //console.log(width);
        //console.log(height);
        tableList.datagrid('resize', {
            width: width,
            height: height
        });
    },

    /* 自适应表格 */
    toggleTableAuto: function (tableList) {

        var
            vt = $(".datagrid:visible").find("table.datagrid-f");

            width = $(".tabs-container").width() - 40 - 2,
            height =  $(".tabs-container").height() -2;

        console.log("w:" + width);
        vt.datagrid("resize",{
            width: width
        })
    },

    /* 搜索 */
    dataGridSearch: function (dataGrid, obj) {
        dataGrid.datagrid('load', obj);
    },


    /* 页面初始化 */
    pageInit: function (preId) {
        $("#" + preId + "SearchStr").focus();
        this.setSearchConditions(preId,  "", 2, 0);
    },

    /* 设置搜索条件 */
    setSearchConditions: function (preId, searchWord, statusIndex, sortIndex) {

        $("#" + preId + "SearchStr").val(searchWord);
        if (sortIndex > -1) {
            $("." + preId + "-sort-selector li.selected").removeClass("selected");
            $("." + preId + "-sort-selector li").each(function (index) {
                if (sortIndex == index) {
                    $(this).addClass("selected");
                    $("#" + preId + "SortSpan").html($(this).html());
                    var sortVal = $(this).attr("el-value");
                    $("#" + preId + "Sort").val(sortVal);
                }
            });
        }
        if (statusIndex > -1) {
            $("." + preId + "-status-selector li.selected").removeClass("selected");
            $("." + preId + "-status-selector li").each(function (index) {
                if (statusIndex == index) {
                    $(this).addClass("selected");
                    $("#" + preId + "StatusSpan").html($(this).html());
                    var statusVal = $(this).attr("el-value");
                    $("#" + preId + "Status").val(statusVal);
                }
            });
        }
    }

    ///* dataGrid单行高亮 */
    //lineHighLight: function (dataGrid, row, index) {
    //    var opt = dataGrid.datagrid("options");
    //    var rows2 = opt.finder.getTr(row, "", "selected", 2);
    //    if (rows2.length > 0) {
    //        $(rows2).each(function () {
    //            var tempIndex = parseInt($(this).attr("datagrid-row-index"));
    //            if (tempIndex != index) {
    //                $(this).removeClass("datagrid-row-selected");
    //            }
    //            if ($(this).is(".datagrid-row-checked")) {
    //                $(this).addClass("datagrid-row-over");
    //            }
    //        });
    //    }
    //},
    //
    ///* 普通表格点击行样式：选中复选框才高亮，点中行其它地方高亮 */
    //rowClickStyle: function (dataGrid, row) {
    //    var opt = dataGrid.datagrid("options");
    //    var rows = opt.finder.getTr(row, "", "selected", 2);
    //    if (rows.length > 0) {
    //        $(rows).each(function () {
    //            if (!$(this).is(".datagrid-row-checked")) {
    //                $(this).removeClass("datagrid-row-selected");
    //            }
    //        });
    //    }
    //},


}


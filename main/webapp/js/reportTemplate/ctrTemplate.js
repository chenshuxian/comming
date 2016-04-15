/**
 * Created by chenshuxian on 2016/04/14
 * ModuleName 中心报表模板维护
 */

var CtrTemplate = (function($){

    /* START render basicModule */
    CtrTemplate = Object.create(BasicModule);
    CtrTemplate.searchObj = function(preId) {

        return {
            searchStr: $.trim($("#" + preId + "SearchStr").val()),
            status: $("#" + preId + "Status").val(),
            sort: $("#" + preId + "Sort").val(),
            typeKey: $("#" + preId + "Template").val()
        };

    };

    var
        _preId = CB.PREID.CT,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	//要穩藏的欄位
        _data = CtrTemplate.searchObj(_preId),
        _module = "CtrTemplate",
        _focusId = "name",
        _popArea = 380,
        _delBatUrl = ctx +  "/ctrTemplate/ctrTemplateDeleteBatch",
        _existUrl = ctx + "/ctrTemplate/ctrTemplateIfExisted",
        _updateUrl = ctx + "/ctrTemplate/ctrTemplateEdit",
        _addUrl = ctx + "/ctrTemplate/ctrTemplateAdd",
        _delUrl = ctx +  "/ctrTemplate/ctrTemplateDelete",
        _changeStatusUrl =  ctx + "/ctrTemplate/ctrTemplateDisableOrEnable",
        _InfoUrl = ctx + "/ctrTemplate/ctrTemplateInfo",
        _pageListUrl = ctx + "/ctrTemplate/ctrTemplateList",


    /* START dataGrid 生成*/
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
    // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj);



    /* 模板类型 */
    $("." + _preId + "-template-selector").on("click", "li", function () {
        $("#" + _preId + "Template").html($(this).html());
        $("." + _preId + "-template-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#" + _preId + "Template").val(statusVal);

        CtrTemplate.searchGrid();
    });

    $("#" +  _preId + "View").on("click",function(){
        var params = {
            data: {
                opType: "view"
            },
            callback:function(){
                var width = $("#picture").width();
                $(".pop-container").width(width);
            }
        };
        CtrTemplate.commonPop(params);
    });


    $.extend(CtrTemplate,{

        preId:_preId,
        module:_module,
        //设定pop弹出框的大小
        popArea: _popArea,
        focusId: _focusId,
        tableList:_tableList,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        //existUrl: _existUrl,
        updateUrl: _updateUrl,
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,

        validateBox: function() {

            $("input[name='name']").validatebox({
                required:true,
                validType:  ['symbol','length[0,30]','space'],
                missingMessage: "模板名称为空，请重新输入！"
            });
            $("input[name='name']").attr('maxlength','30');
            $("input[name='displayOrder']").validatebox({
                validType:  ['digits','length[0,6]']
            });
            $("input[name='displayOrder']").attr('maxlength','6');


        },

        editCallBack: function() {
            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                id: rowData.stringId,
                codeNo: rowData.codeNo
            });
            $("#typeKey").val(rowData.typeKey);
            $("#spanEditCodeNo").html(rowData.codeNo);

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("#typeKey").val(rowData.typeKey);
            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("select").attr("disabled","disabled");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        },

        upload: function(rowData) {
            var params = {
                data: {
                    opType: "upload"
                },
                callback:function(rowData){
                    $("#editId").val(rowData.stringId);
                }
            };
            CtrTemplate.commonPop(params);
        },
        uploadSave: function() {

        },
        download: function(rowData) {

        }

    });

    return CtrTemplate;


}(jQuery));

$(function(){
    CtrTemplate.init();
});
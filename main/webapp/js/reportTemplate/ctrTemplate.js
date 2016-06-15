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
            typeKey: $("#" + preId + "TemplateVal").val(),
            appId: $("#" + preId + "System").val()
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
        _existUrl = ctx + "/ctrTemplate/checkNameExisted",
        _updateUrl = ctx + "/ctrTemplate/ctrTemplateEdit",
        _addUrl = ctx + "/ctrTemplate/ctrTemplateAdd",
        _delUrl = ctx +  "/ctrTemplate/ctrTemplateDelete",
        _changeStatusUrl =  ctx + "/ctrTemplate/ctrTemplateDisableOrEnable",
        _InfoUrl = ctx + "/ctrTemplate/ctrTemplateInfo",
        _pageListUrl = ctx + "/ctrTemplate/ctrTemplateList",
        _uploadUrl = ctx + "/ctrTemplate/uploadFiles",


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
        $("#" + _preId + "TemplateVal").val(statusVal);

        CtrTemplate.searchGrid();
    });

    /* 所属系统 */
    $("." + _preId + "-system-selector").on("click", "li", function () {
        $("#" + _preId + "SystemSpan").html($(this).html());
        $("." + _preId + "-system-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#" + _preId + "System").val(statusVal);

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
        existUrl: _existUrl,
        updateUrl: _updateUrl,
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,
        uploadUrl: _uploadUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,
        searchHold: CB.SEARCHHOLDER.TEMPLATE,

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
            $("input[name='appId']").validatebox({
                required:true,
                validType:  ['symbol','length[0,30]','space'],
                missingMessage: "模板名称为空，请重新输入！"
            });
            $("input[name='appId']").attr('maxlength','30');
            $("input[name='rows']").validatebox({
                validType:  ['digits','length[0,11]']
            });
            $("input[name='rows']").attr('maxlength','11');
            //备注
            $("textarea").validatebox({
                validType:  ['symbol','length[0,150]']
            });
            $("textarea").attr('maxlength','150');


        },

        ///* 结果描述判断新增还是修改 */
        //beforeSubmit: function () {
        //
        //    this.exParams = {typeId: this.typeId};
        //    //console.log("typeResult:" + name);
        //    this.editDictCode();
        //
        //},


        addCallBack: function() {
            var systemId = $("#ctSystem").val(),
                tmpId = $("#ctTemplateVal").val();

            $("#appId").val(systemId);
            $("#appIdShow").val(systemId);
            $("#typeKey").val(tmpId);
            $("#typeKeyShow").val(tmpId);
            $("select").attr("disabled","disabled");
            CtrTemplate.exParams = {appId: systemId, typeKey: tmpId};
        },

        editCallBack: function() {
            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                id: rowData.stringId,
                codeNo: rowData.codeNo,
                rows: rowData.rows
            });
            $("#typeKey").val(rowData.typeKey);
            $("#appId").val(rowData.appId);
            $("#typeKeyShow").val(rowData.typeKey);
            $("#typeKeyShow").attr("disabled","disabled");
            $("#appIdShow").val(rowData.appId);
            $("#spanEditCodeNo").html(rowData.codeNo);

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                rows: rowData.rows
            });
            $("#typeKey").val(rowData.typeKey);
            $("#appId").val(rowData.appId);
            $("#typeKeyShow").val(rowData.typeKey);
            $("#appIdShow").val(rowData.appId);
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
                callback:function(){
                    $("#editId").val(rowData.stringId);
                }
            };
            CtrTemplate.commonPop(params);
        },

        changeStatusEx: function(index,rowData) {

            if(rowData.status == 0) {

                if(rowData.fileName == null || rowData.fileName == ""){
                    BM.showMessage("没有上传模板，不允许启用");
                    this.dataGrid.datagrid('refreshRow', index);
                    return;
                }

            }

            this.changeStatus(index,rowData);
        },

        checkTemplate: function () {
            var templateId =  $("#ctTemplateVal").val();
            if(templateId == null || templateId == "-1") {
                BM.showMessage("请选模板类型");
                return true;
            }

        }
    });

    return CtrTemplate;


}(jQuery));

$(function(){
    var _preId = CtrTemplate.preId,
        params = {
            BCB: true
        };
    CtrTemplate.init();

    $("#" + _preId + "Add").unbind();

    $("#" + _preId + "Add").click(function () {
        var systemId = $("#ctSystem").val();
        if(systemId == "-1"){
            BM.showMessage("请选择系统");
            return;
        }else if(CtrTemplate.checkTemplate()) {
            return false;
        }


        CtrTemplate.addPop();
    });
});
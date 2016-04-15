/**
 * Created by chenshuxian on 2016/04/15
 * ModuleName 客户报表模板维护
 */

var CusTemplate = (function($){

    /* START render basicModule */
    CusTemplate = Object.create(BasicModule);
    CusTemplate.searchObj = function(preId) {

        return {
            searchStr: $.trim($("#" + preId + "SearchStr").val()),
            status: $("#" + preId + "Status").val(),
            sort: $("#" + preId + "Sort").val(),
            typeKey: $("#" + preId + "Template").val()
        };

    };

    var
        _preId = CB.PREID.CST,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	//要穩藏的欄位
        _data = CusTemplate.searchObj(_preId),
        _module = "CusTemplate",
        _focusId = "name",
        _popArea = 380,
        _delBatUrl = ctx +  "/cusTemplate/cusTemplateDeleteBatch",
        _existUrl = ctx + "/cusTemplate/cusTemplateIfExisted",
        _updateUrl = ctx + "/cusTemplate/cusTemplateEdit",
        _addUrl = ctx + "/cusTemplate/cusTemplateAdd",
        _delUrl = ctx +  "/cusTemplate/cusTemplateDelete",
        _changeStatusUrl =  ctx + "/cusTemplate/cusTemplateDisableOrEnable",
        _InfoUrl = ctx + "/cusTemplate/cusTemplateInfo",
        _pageListUrl = ctx + "/cusTemplate/cusTemplateList",
        _templateUrl = ctx + "/cusTemplate/templateList",         //从模板库添加


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
        _dataGrid = _tableList.datagrid(_gridObj),

    //仪器库添加左DG
        _templateList = function() {

            $("#List").datagrid({
                url: _templateUrl,
                method: 'POST',
                height: 400,
                fitColumns: true,
                striped: true,
                fit: false,
                checkOnSelect: false,
                selectOnCheck: true,
                columns: [[
                    {field : "ck", checkbox : true, width : 30},
                    {title : "编码", field: 'codeNo', width : 60},
                    {title : "模板名称", field : 'name', width : 60}
                ]],
                autoRowHeight: true,
                pagination : true,
                pageSize : 20,
                onClickRow: function(index,row) {
                    dataGridM.clickRow.call(this, index,row);
                    //设定右边显示图示
                }
            });

        },

        //确认机构是否选择
        _checkOrg = function() {
            if(!CusTemplate.orgId){
                BM.showMessage("请先选择机构");
                return false;
            }
            return true;
        }



    /* 模板类型 */
    $("." + _preId + "-template-selector").on("click", "li", function () {
        if(_checkOrg()) {

            $("#" + _preId + "Template").html($(this).html());
            $("." + _preId + "-template-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + _preId + "Template").val(statusVal);

            CusTemplate.searchGrid();

        }
    });

    //报表预览
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
        CusTemplate.commonPop(params);
    });

    //从模板库添加
    $("#" + _preId + "Add2").on("click",function() {

        if(_checkOrg()) {

            var params = {
                data:{opType: "template"},
                callback: function () {
                    _templateList();
                },
                popArea: 900,
                focusId: "searchStr"
            };
            CusTemplate.commonPop(params);

        }
    });

    /* 选择机构 */
    $("#" + _preId + "SelectOrg").click(function () {
        var
            callback = function () {

                CusTemplate.tempOrgId = CusTemplate.orgId;
                CusTemplate.tempOrgName = CusTemplate.orgName;
                $("#OrgList").datagrid({
                    url: ctx + "/local_inst/instruments/centerOrgPageList",
                    method: 'POST',
                    queryParams: "",
                    height: ($(window).height() < 700) ? 400 : 400,
                    fitColumns : true,
                    striped : true,
                    checkOnSelect : false,
                    onClickRow: function(index, row){

                        CusTemplate.orgId = row.stringId;
                        CusTemplate.orgName = row.name;

                        $("#OrgPop input[type='radio']:eq("+index+")").attr("checked",true);
                        //$("input[type='radio']:eq(" + index + ")").click();
                    },
                    columns:
                        [
                            [
                                {
                                    field : 'idString',
                                    width: 10,
                                    formatter : function(value, row, index) {
                                        return "<input type='radio' datagrid-row-index='"+index+"' name='instrument'>";
                                    }
                                },
                                {title: "编码", field: 'codeNo', width: 50},
                                {title: "中文名称", field: 'name', flex: 1, width: 50},
                                {title: "地区", field: 'regionName', width: 50}
                            ]
                        ],
                    autoRowHeight: false,
                    pagination: true
                });
            },
            params = {
                data:{opType: "org"},
                callback: callback,
                popArea: 600,
                focusId: "OrgSearchStr"
            };
       // console.log(params);
        CusTemplate.commonPop(params);

    });



    $.extend(CusTemplate,{

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
            CusTemplate.commonPop(params);
        },
        uploadSave: function() {

        },
        download: function(rowData) {

        }

    });

    return CusTemplate;


}(jQuery));

$(function(){
    CusTemplate.init();
});

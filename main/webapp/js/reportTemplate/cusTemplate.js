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
            typeKey: $("#" + preId + "TemplateVal").val(),
            appId: $("#" + preId + "System").val(),
            orgId: typeof CusTemplate.orgId == "undefined" ? -1 : CusTemplate.orgId
        };

    };

    var
        _preId = CB.PREID.CST,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	//要穩藏的欄位
        _data = CusTemplate.searchObj(_preId),
        _module = "CusTemplate",
        _focusId = "editName",
        _popArea = 380,
        _delBatUrl = ctx +  "/cusTemplate/cusTemplateDeleteBatch",
        _existUrl = ctx + "/cusTemplate/checkNameExisted",
        _updateUrl = ctx + "/cusTemplate/cusTemplateEdit",
        _addUrl = ctx + "/cusTemplate/cusTemplateAdd",
        _delUrl = ctx +  "/cusTemplate/cusTemplateDelete",
        _changeStatusUrl =  ctx + "/cusTemplate/cusTemplateDisableOrEnable",
        _InfoUrl = ctx + "/cusTemplate/cusTemplateInfo",
        _pageListUrl = ctx + "/cusTemplate/cusTemplateList",
        _templateUrl = ctx + "/cusTemplate/ctrReportTemplatePageList",         //从模板库添加
        _systemUrl = ctx + "/cusTemplate/cusFindAppByOrgId",
        _uploadUrl =  ctx + "/cusTemplate/uploadFiles",
        _templateAddUrl =  ctx + "/cusTemplate/ctrReportTemplateAdd",


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
        _templateList = function(appId) {
            var tmpId =  $("#cstTemplateVal").val();
            $("#List").datagrid({
                url: _templateUrl,
                queryParams: {appId: appId, orgId: CusTemplate.orgId,typeKey:tmpId},
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
            if(!CusTemplate.orgId && !CusTemplate.tempOrgId){
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
            console.log("tmpId" + statusVal);
            $("#" + _preId + "TemplateVal").val(statusVal);

            CusTemplate.searchGrid();

        }
    });

    /* 所属系统 */
    $("#cstSystemSpan").on('click',function() {
        _checkOrg();
    });

    $("." + _preId + "-system-selector").on("click", "li", function () {


            $("#" + _preId + "SystemSpan").html($(this).html());
            $("." + _preId + "-system-selector li.selected").removeClass("selected");
            var flg = $(this).is('.selected');
            $(this).addClass(function () {
                return flg ? '' : 'selected';
            })

            var statusVal = $(this).attr("el-value");
            $("#" + _preId + "System").val(statusVal);

            CusTemplate.searchGrid();

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
        var systemId = $("#cstSystem").val();
        if(_checkOrg()) {

            //确认系统
            if(_checkSys()){
                return false;
            }

            //确认模板
            if(_checkTemplate()){
                return false;
            }

            var params = {
                data:{
                    opType:"template",
                    orgId:CusTemplate.orgId
                },
                callback: function () {
                    var
                        system =  $("#systemSelect li:first").html(),
                        appId = systemId,
                        tempName = $("#cstTemplate").html();
                    _templateList(appId);
                    $("#tempName").html(tempName);
                    $("#SystemSpan").html(system);
                    $("#appId").val(appId);

                },
                popArea: 900,
                focusId: "searchStr"
            };
            CusTemplate.commonPop(params);

        }
    });

    /* 选择机构 */
    $("#" + _preId + "SelectOrg").click(function () {

        CusTemplate.tempOrgId = CusTemplate.orgId;
        CusTemplate.tempOrgName = CusTemplate.orgName;
        CusTemplate.orgId = undefined;
        var
            callback = function () {
                BM.orgSelect(_preId,CusTemplate);
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

    var _checkSys = function () {
            var systemId = $("#cstSystem").val();
            if(systemId == -1) {
                BM.showMessage("请先选择系统");
                return true;
            }

        },
        _checkTemplate = function () {
            var templateId =  $("#cstTemplateVal").val();
            if(templateId == null || templateId == "-1") {
                BM.showMessage("请选模板类型");
                return true;
            }
        }



    $.extend(CusTemplate,{

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
        systemUrl: _systemUrl,
        uploadUrl: _uploadUrl,
        templateAddUrl: _templateAddUrl,
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


        addCallBack: function() {
            //console.log("addcallback");
            var orgId = CusTemplate.orgId,
                tempId = $("#cstTemplateVal").val(),
                sysId = $("#cstSystem").val();
            $("#typeKeyShow").val(tempId);
            $("#appIdShow").val(sysId);
            $("#appId").val(sysId);
            $("#typeKey").val(tempId);
            $("select").attr("disabled","disabled");
            //CusTemplate.systemSelect(orgId);
            $("#orgId").val(orgId);
            CusTemplate.exParams = {appId: sysId,typeKey: tempId, orgId: orgId};

        },

        editCallBack: function() {

            var rowData = BasicModule.rowData,
                orgId = CusTemplate.orgId;
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
            $("#typeKeyShow").val(rowData.typeKey);
            $("#typeKeyShow").attr("disabled","disabled");
            $("#spanEditCodeNo").html(rowData.codeNo);
            $("#orgId").val(orgId);
            $("#appIdShow").val(rowData.appId);
            $("#appId").val(rowData.appId);

            //CusTemplate.systemSelect(orgId);

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData,
                orgId = CusTemplate.orgId;

            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                rows: rowData.rows
            });
            $("#typeKeyShow").val(rowData.typeKey);
            $("#appIdShow").val(rowData.appId);
            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("select").attr("disabled","disabled");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

            //CusTemplate.systemSelect(orgId);

        },

        upload: function(rowData) {
            var params = {
                data: {
                    opType: "upload"
                },
                callback: function(){
                    $("#editId").val(rowData.stringId);
                }
            };
            CusTemplate.commonPop(params);
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

        checkSys: _checkSys,
        checkTemplate: _checkTemplate

    });

    return CusTemplate;


}(jQuery));

$(function(){

    var _preId = CusTemplate.preId;
    CusTemplate.init();

    $("#" + _preId + "Add").unbind();

    $("#" + _preId + "Add").click(function () {

        var params = {
            data: {
                id: '',
                opType: 'add',
                orgId: CusTemplate.orgId
            }
        };

        if(!CusTemplate.orgId && !CusTemplate.tempOrgId){
            BM.showMessage("请选择机构");
            return;
        }else if(CusTemplate.checkSys()) {
            return;
        }else if(CusTemplate.checkTemplate()) {
            return;
        }


        CusTemplate.addPop(params);
    });

});

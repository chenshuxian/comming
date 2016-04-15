/**
 * 机构系统初始化js
 * Created by chenshuxian
 * data 2016/4/13.
 */
var OrgInit2, OrgInit;

OrgInit2 = OrgInit = (function($){

    /* START render basicModule */
     OrgInit = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.OI,
        _tableList =  $("#" + _preId + "List"),
        _tableList2 = $("#" + _preId + "List2"),
        _hideCols = ["displayOrder","memo","status"],	//要穩藏的欄位
        _data = {orgId: typeof OrgInit.orgId == "undefined" ? -1 : OrgInit.orgId},
        _module = "OrgInit",
        _focusId = "account",
        _module2 = "OrgInit2",
        _delBatUrl = ctx +  "/sys/systemInit/orgAppDelete",
        _delUrl = ctx +  "/sys/systemInit/orgAppDelete",
        _addUrl =  ctx + "/sys/systemInit/addAdministrator",
        _addUrl2 = ctx + "/sys/systemInit/orgAppAdd",
        _changeStatusUrl =  ctx + "/sys/systemInit/orgAppDisableOrEnable",
        _pageListUrl = ctx + "/sys/systemInit/applicationsList",
        _InfoUrl = ctx + "/sys/systemInit/systemInfo",
        _existUrl = ctx + "/sys/systemInit/userIfExisted",

        _pageListUrl2 = ctx + "/sys/systemInit/usersList",
        _initHeight = CB.HEIGHT,


    /* START dataGrid 生成*/

    //first dataGrid
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId,
            height:_initHeight,
            isSecond:true
        },
    //OrgInit dataGrid obj render
        _gridObj = dataGridM.init(_dgParams),

        _upgradeObj = {
            pagination: false,
            onLoadSuccess: function(response){
                var rowData = $(this).datagrid('getData').rows[0],
                    params,appId;

                appId ="";

                if(rowData){
                    appId = rowData.appId
                }
                params = {
                        orgId: OrgInit.orgId ? OrgInit.orgId : -1,
                        appId: appId
                };
                $("#oiTotal").html(response.total);
                _loadDG2(params);
            },
            onClickRow: function(index,row) {
                dataGridM.clickRow.call(this, index,row);
                var params = {
                    orgId: OrgInit.orgId,
                    appId: row.appId
                };
                OrgInit.dataGrid2.datagrid("reload",params);
            }
        };

    _gridObj = $.extend({},_gridObj,_upgradeObj);
    // render dataGrid

   var _dataGrid = _tableList.datagrid(_gridObj);

    var _loadDG2 = function(params){

        var
            _dgParams2 = {
                url:_pageListUrl2,
                data:params,
                module:_module2,
                hideCols:_hideCols,
                tableList:_tableList2,
                preId:_preId,
                height:_initHeight,
                isSecond:true
            },

            _gridObj2 = dataGridM.init(_dgParams2),

            _upgradeObj2 = {
                pagination: false,
                onLoadSuccess: function(response){
                    $("#oiTotal2").html(response.total);
                    if(response.total > 0){
                        OrgInit.disableAdminAdd = true;
                    }else{
                        OrgInit.disableAdminAdd = false;
                    }
                    dataGridM.hideColumn(_tableList2,_hideCols);
                }
            };

        _gridObj2 = $.extend({},_gridObj2, _upgradeObj2);

        OrgInit.dataGrid2 = _tableList2.datagrid(_gridObj2);

    }


    var _addDg = function() {
            $("#subAddList").datagrid({
                url:  ctx + "/sys/systemInit/addApplicationsList",
                method: 'POST',
                queryParams: {orgId: OrgInit.orgId},
                height: ($(window).height() < 700) ? 400 : 400,
                fitColumns : true,
                striped : true,
                checkOnSelect : false,
                columns:
                    [
                        [
                            {field : "ck",checkbox : true,width : 30},
                            {title: "编码", field: 'codeNo', width: 50},
                            {title: "名称", field: 'name', flex: 1, width: 50}
                        ]
                    ],
                autoRowHeight: false,
                pagination: false
            });
        };

    /* 选择机构 */
    $("#" + _preId + "orgList").click(function () {
        var
            //url = _selectOrgUrl,
            callback = function () {
                OrgInit.tempOrgId = OrgInit.orgId;
                OrgInit.tempOrgName = OrgInit.orgName;

                $("#" +_preId + "OrgList").datagrid({
                    url: ctx + "/local_inst/instruments/centerOrgPageList",
                    method: 'POST',
                    queryParams: "",
                    height: ($(window).height() < 700) ? 400 : 400,
                    fitColumns : true,
                    striped : true,
                    checkOnSelect : false,
                    onClickCell: function(index, field){

                        var rows = $("#" + _preId + "OrgList").datagrid("getData").rows[index];
                        OrgInit.orgId = rows.stringId;
                        OrgInit.orgName = rows.name;

                        $("#"+ _preId +"OrgPop input[type='radio']:eq("+index+")").attr("checked",true);
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
                data:{opType:"org"},
                callback: callback,
                popArea: 600,
                focusId: _preId + "OrgSearchStr"
            };

        OrgInit.commonPop(params);

    });

    $(window).on('resize', function () {
        //newcommonjs.tableAuto(ResultType.resultTypeTableList);
        var width = OrgInit.tableList.parents('.tabs-panels').width() - 40;
        OrgInit.tableList.datagrid('resize', {
            width: width
        });
        OrgInit.tableList2.datagrid('resize', {
            width: width
        });
    });



    $.extend(OrgInit,{

        preId:_preId,
        module:_module,
        parentId: null,
        //设定pop弹出框的大小
        popArea: 580,
        focusId: _focusId,
        tableList:_tableList,
        tableList2:_tableList2,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        delUrl: _delUrl,
        addUrl: _addUrl,
        addUrl2:_addUrl2,
        pageListUrl: _pageListUrl,
        InfoUrl: _InfoUrl,
        existUrl: _existUrl,
        changeStatusUrl: _changeStatusUrl,
        disableAdminAdd: false,

        //dataGrid2 of Url
        pageListUrl2: _pageListUrl2,
        /*END url 定義*/
        dataGrid:_dataGrid,
        //dataGrid2:_dataGrid2,
        orgId: null,
        orgName: null,

        validateBox: function() {
            //中文名长度
            $("input[name='userNo']").validatebox({
                required:true,
                validType:  ['authUser','length[0,16]','space'],
                missingMessage: "用户名称不可为空！"
            });
            $("input[name='userNo']").attr('maxlength','16');

            //中文名长度
            $("input[name='userName']").validatebox({
                required:true,
                validType:  ['symbol','length[0,35]'],
                missingMessage: "用户帐号不可为空！"
            });
            $("input[name='userName']").attr('maxlength','35');
        },

        searchObj: function() {
            return {
                orgId: typeof OrgInit.orgId == "undefined" ? -1 : OrgInit.orgId,
                searchStr: $.trim($("#" + _preId + "SearchStr").val())
            };
        },
        addCallBack: function() {
            //设定datagrid
            _addDg();
            $("#total").val(1);
        },
        changeStatusEx: function() {
            var params ={

            };
            OrgInit.changeStatus();
        },
        adminSet: function(rowData){
            if(OrgInit.disableAdminAdd) {
                BM.showMessage("每机构最多只能有一个管理员");
                return;
            }else{

                var params = {
                    data: {opType: "admin"},
                    callback: function () {
                        $("#appId").val(rowData.appId);
                        $("#orgId").val(OrgInit.orgId);
                    },
                    BCB:true
                };
                OrgInit.commonPop(params);
            }
        },
        beforeSubmit: function(){
          var params ={
                dataGrid: OrgInit.dataGrid2
              };
            OrgInit.editDictCode(params);
        },
        resetPassword: function(rowData){

            var
                data = {
                    action: "resetPassword",
                    userId: rowData.userId,
                    appId: rowData.appId,
                    orgId: OrgInit.orgId
                };

            $.ajax({
                url: _addUrl,
                type: CB.METHOD,
                data: data,
                success: function (response) {
                    BM.resolutionData(response);
                }
            });
        }

    });

    return OrgInit;


}(jQuery));

$(function(){
    var _preId = CB.PREID.OI;
    OrgInit.init();
    $("#" + _preId + "Add").unbind();
    /* 细菌列表 */
    $("#" + _preId + "Add").click(function () {

        if(!OrgInit.orgId){
            BM.showMessage("请选择机构");
            return;
        }

        OrgInit.addPop();

    });

    $("#" + _preId + "DeleteBatch").unbind();
    /* 细菌列表 */
    $("#" + _preId + "DeleteBatch").click(function () {

        if(!OrgInit.orgId){
            BM.showMessage("请选择机构");
            return;
        }

        var
            checkItems = OrgInit.getIds(OrgInit.dataGrid),
            params = {
                data: {id:checkItems.join(",")}
            };

        OrgInit.deleteBatch(params);

    });
});

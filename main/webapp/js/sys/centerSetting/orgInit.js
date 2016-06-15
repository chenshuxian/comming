/**
 * 机构系统管理js
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
        _hideCols = ["displayOrder","memo","status","ck"],	//要穩藏的欄位
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
        _systemInitUrl = ctx + "/sys/systemInit/setInit",

        _pageListUrl2 = ctx + "/sys/systemInit/usersList",
        _initHeight = CB.HEIGHT - 51 ,


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

                if ( rowData ){
                    if ( OrgInit.appId ) {
                        appId = OrgInit.appId;
                    } else {
                        appId = rowData.appId;
                    }
                }

                params = {
                        orgId: OrgInit.orgId ? OrgInit.orgId : -1,
                        appId: appId
                };
                $("#oiTotal").html(response.total);
                _loadDG2(params);

                dataGridM.loadSuccess(this);
            },
            onClickRow: function(index,row) {
                dataGridM.clickRow.call(this, index,row);
                OrgInit.appId = row.appId;
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
                onLoadSuccess: function(response){
                    $("#total").html(response.total);
                },
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
        OrgInit.tempOrgId = OrgInit.orgId;
        OrgInit.tempOrgName = OrgInit.orgName;
        OrgInit.orgId = undefined;
        var
            callback = function () { BM.orgSelect(_preId,OrgInit) },
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
        //disableAdminAdd: false,

        //dataGrid2 of Url
        pageListUrl2: _pageListUrl2,
        /*END url 定義*/
        dataGrid:_dataGrid,
        //dataGrid2:_dataGrid2,
        //orgId: null,
        //orgName: null,

        validateBox: function() {
            //中文名长度
            $("input[name='userNo']").validatebox({
                required:true,
                validType:  ['authUser','length[0,15]','blank'],
                missingMessage: "用户帐号不可为空！"
            });
            $("input[name='userNo']").attr('maxlength','15');

            //中文名长度
            $("input[name='userName']").validatebox({
                required:true,
                validType:  ['symbol','length[0,25]','blank'],
                missingMessage: "用户名称不可为空！"
            });
            $("input[name='userName']").attr('maxlength','25');
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
        changeStatusEx: function(index,rowData) {

            if(rowData.initCount == 1){
                OrgInit.changeStatus(index,rowData);
            }else{
                BM.showMessage("请先进行系统初始化!");
                this.dataGrid.datagrid('refreshRow', index);
            }

        },
        adminSet: function(rowData){
            if(rowData.adminStatus) {
                BM.showMessage("每机构最多只能有一个管理员");
                return;
            }else{
                var params = {
                    data: {opType: "admin"},
                    callback: function () {
                        $("#appId").val(rowData.appId);
                        $("#orgId").val(OrgInit.orgId);
                    }
                    //BCB:true
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
                    id: rowData.idString,
                    appId: rowData.appId,
                    orgId: OrgInit.orgId
                };

            showConfirm('是否重置密码为[111111]?', function () {
                $.ajax({
                    url: _addUrl,
                    type: CB.METHOD,
                    data: data,
                    success: function (response) {
                        BM.resolutionData(response);
                    }
                });
            });
        },
        //系统初始化
        systemInit: function(rowData){
            //管理员设置后才可进行系统初始化
            if(rowData.adminStatus) {
                $.ajax({
                    url: _systemInitUrl,
                    data: {id:rowData.stringId,orgId:OrgInit.orgId},
                    type: CB.METHOD,
                    success: function(data){
                        BM.resolutionData(data);
                        OrgInit.dataGrid.datagrid("reload");
                    }
                });
            }else{
                BM.showMessage("请先设置管理员!");
            }
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

        if(!OrgInit.orgId && !OrgInit.tempOrgId){
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

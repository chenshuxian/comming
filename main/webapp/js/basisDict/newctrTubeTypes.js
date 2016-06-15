/**
 * 标本类型js
 * Created by chenshuxian
 * data 2016/1/8.
 */
var TubeTypes = (function($){

    /* START render basicModule */
    TubeTypes = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.TT,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = ["whonetCode"],	            //要穩藏的欄位
        _data = TubeTypes.searchObj(_preId),    //取得初始grid时所需要的server 参数
        _module = "TubeTypes",                  //模组名称，于grid 建立时使用
        _focusId = "editName",                  //新增、修改页面打开时focus的对象id
        _popArea = 480,                         //新增、修改页面开启时初始大小
        _delBatUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDeleteBatch",           //批次删除的url
        _existUrl = ctx + "/basisDict/ctrTubeTypes/checkNameExisted",                   //查询是否已存在资料url
        _updateUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesEide",                  //修改url
        _addUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesAdd",                      //新增url
        _delUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDelete",                   //删除url
        _changeStatusUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesDisableOrEnable", //改变状态的url
        _InfoUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesInfo",                    //新增、修改、view 页面打开时所对映后台调用url
        _pageListUrl = ctx + "/basisDict/ctrTubeTypes/ctrTubeTypesPageList",            //datagrid 取得资料的url
        /* START dataGrid 生成*/
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),                   //取得 datagrid 物件参数
        // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj);

    $.extend(TubeTypes,{

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
        /*END url 定義*/
        dataGrid:_dataGrid,


        validateSave: function() {

            var name = $.trim($("#editName").val());
            var displayOrderId = "editDisplayOrder";

            if (name == '') {

                BM.showMessage('中文名称为空，请重新输入！');
                $("#editName").focus();
                return false;

            }
            if (validateDisplayOrder(displayOrderId)) {

                return false;

            }
            return true;
        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(TubeTypes.rowData);
            $("#InfoForm").form("load", {
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                id: rowData.stringId,
                typeKey: rowData.typeKey,
                opType: 'edit'
            });
            $("#editName").focus();
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });

            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        }

        /*callback function area end*/

    });

   return TubeTypes;

}(jQuery));

$(function(){
    TubeTypes.init();
});



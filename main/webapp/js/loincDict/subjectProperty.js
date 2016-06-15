/**
 * 受检属性js
 * Created by subanmiao on 2016/1/8.
 */
var SubjectProperty = (function($){

    /* START render basicModule */
    SubjectProperty = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.SP,//$("#SubjectPropertyMainPreId").val(),
        _module = "SubjectProperty",
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = ["whonetCode"],	//要穩藏的欄位
        _data = SubjectProperty.searchObj(_preId),
        _pageListUrl = SubjectProperty.pageListUrl,

        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(SubjectProperty,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SubjectProperty.getAddParams(_exParams),
        exParams:_exParams
    })



    return SubjectProperty;


}(jQuery));

$(function(){
    SubjectProperty.init();
});

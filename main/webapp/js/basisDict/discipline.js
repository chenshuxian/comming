/**
 * 医学专业组js
 * Created by subanmiao on 2016/1/8.
 */
var Discipline = (function($){

    /* START render basicModule */
    Discipline = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.MPG,//$("#disciplineMainPreId").val(),
        _module = "Discipline",
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = ["whonetCode"],	//要穩藏的欄位
        _data = Discipline.searchObj(_preId),
        _pageListUrl = Discipline.pageListUrl,

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

    $.extend(Discipline,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: Discipline.getAddParams(_exParams),
        exParams:_exParams
    })


    return Discipline;


}(jQuery));

$(function(){
    Discipline.init();
});

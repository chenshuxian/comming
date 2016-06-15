/**
 * 时间特征js
 * Created by subanmiao on 2016/1/8.
 */
var TimeCharacteristic = (function($){

    /* START render basicModule */
    TimeCharacteristic = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.TC,//$("#TimeCharacteristicMainPreId").val(),
        _module = "TimeCharacteristic",
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = ["whonetCode"],	//要穩藏的欄位
        _data = TimeCharacteristic.searchObj(_preId),
        _pageListUrl = TimeCharacteristic.pageListUrl,

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


    $.extend(TimeCharacteristic,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: TimeCharacteristic.getAddParams(_exParams),
        exParams:_exParams
    })

    return TimeCharacteristic;


}(jQuery));

$(function(){
    TimeCharacteristic.init();
});

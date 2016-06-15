/**
 * 受检成份js
 * Created by subanmiao on 2016/1/8.
 */
var SubjectIngredient = (function($){

    /* START render basicModule */
    SubjectIngredient = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.SI,//$("#SubjectIngredientMainPreId").val(),
        _module = "SubjectIngredient",
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols =  ["whonetCode"],	//要穩藏的欄位
        _data = SubjectIngredient.searchObj(_preId),
        _pageListUrl = SubjectIngredient.pageListUrl,

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


    $.extend(SubjectIngredient,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SubjectIngredient.getAddParams(_exParams),
        exParams:_exParams
    })


    return SubjectIngredient;


}(jQuery));

$(function(){
    SubjectIngredient.init();
});

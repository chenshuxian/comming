/**
 * 样本标识js
 * Created by subanmiao on 2016/1/8.
 */
var SpecimenLogo = (function($){

    /* START render basicModule */
    SpecimenLogo = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.SL,//$("#SpecimenLogoMainPreId").val(),
        _module = "SpecimenLogo",
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols =  ["whonetCode"],	//要穩藏的欄位
        _data = SpecimenLogo.searchObj(_preId),
        _pageListUrl = SpecimenLogo.pageListUrl,

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


    $.extend(SpecimenLogo,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: SpecimenLogo.getAddParams(_exParams),
        exParams:_exParams
    })


    return SpecimenLogo;


}(jQuery));

$(function(){
    SpecimenLogo.init();
});

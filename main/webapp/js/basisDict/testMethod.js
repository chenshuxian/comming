/**
 * 检验方法js
 * Created by subanmiao on 2016/1/8.
 */
var TestMethod = (function($){

    /* START render basicModule */
    TestMethod = Object.create(CtrDictCodes);
    /* END render basicModule */

    var
        _preId = CB.PREID.TM,//$("#TestMethodMainPreId").val(),
        _module = "TestMethod",
        _tableList =  $("#" + _preId + "List"),
        _typeKey = $("#" + _preId + "TypeKey").val(),
        _exParams = {typeKey: _typeKey},
        _hideCols = ["whonetCode"],	//要穩藏的欄位
        _data = TestMethod.searchObj(_preId),
        _pageListUrl = TestMethod.pageListUrl,

    /* 参数说明:
     * url:pagelisturl
     * data:初始时后台所有接收的参数，是一个物件
     * module:目前的这个模组名，会对晕到gridColumus.js需要注意
     * hideCols:想稳藏的栏位，是一个array
     * tableList:dataGird的对象
     * preId:前辍
     */
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


    $.extend(TestMethod,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: TestMethod.getAddParams(_exParams),//$.extend({},TestMethod.addParams,{typeKey:_typeKey}),
        exParams:_exParams
    });

    return TestMethod;


}(jQuery));

$(function(){
    TestMethod.init();
});

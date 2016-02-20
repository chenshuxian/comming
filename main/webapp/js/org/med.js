var MED = (function($){

    /* START render basicModule */
    MED = Object.create(CenterOrg);
    /* END render basicModule */

    var
        _preId = CB.PREID.MED,
        _tableList =  $("#" + _preId + "List"),
        _orgTypeId = $("#" + _preId + "orgTypeId").val(),
        _exParams = {orgTypeId: _orgTypeId},
        _hideCols = [],	//要穩藏的欄位
        _data = MED.searchObj(_preId),
        _pageListUrl = MED.pageListUrl,

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
            module:"MED",
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(MED,{
        preId: _preId,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: MED.getAddParams(_exParams),
        exParams:_exParams,
        orgTypeId:_orgTypeId
    })

    /* 状态搜索 */
    $("." + _preId + "-status-selector li").on("click", function () {
        $("#" + _preId + "StatusSpan").html($(this).html());
        $("." + _preId + "-status-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#" + _preId + "Status").val(statusVal);

        MED.searchGrid();
    });

    /* 排序 */
    $("." + _preId + "-sort-selector li").on("click", function () {
        $("#" + _preId + "SortSpan").html($(this).html());
        $("." + _preId + "-sort-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var sortVal = $(this).attr("el-value");
        $("#" + _preId + "Sort").val(sortVal);

        MED.searchGrid();
    });

    /* search Btn */
    $("#" + _preId + "SearchBtn").on("click",function() {
        MED.searchGrid();
    });

    /*Start add 相关参数设定  */
    $("#" + _preId + "Add").on("click",function() {
        MED.addPop();
    });

    // deleteBatch
    $("#" + _preId + "DeleteBatch").on("click",function() {
        MED.deleteBetch();
    });

    return MED;


}(jQuery));

$(function(){
    MED.init();
});
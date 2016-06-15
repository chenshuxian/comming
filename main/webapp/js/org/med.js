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
        _module = "MED",

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


    $.extend(MED,{
        preId: _preId,
        module:_module,
        tableList: _tableList,
        dataGrid: _dataGrid,
        addParams: MED.getAddParams(_exParams),
        exParams:_exParams,
        orgTypeId:_orgTypeId,
        searchHold: CB.SEARCHHOLDER.MED,

        validateBox: function(){
            $("input[name='name']").validatebox({
                required:true,
                validType:  ['symbol','length[0,30]','space'],
                missingMessage: "中文名称不可为空！"
            });
            $("input[name='name']").attr('maxlength','30');

            $("input[name='shortName']").validatebox({
                validType:  ['symbol','length[0,15]']
            });
            $("input[name='shortName']").attr('maxlength','15');
            //英文名长度
            $("input[name='enShortName']").validatebox({
                validType:  ['symbol','length[0,20]']
            });
            $("input[name='enShortName']").attr('maxlength','20');
            //英文名长度
            $("input[name='enName']").validatebox({
                validType:  ['symbol','length[0,55]']
            });
            $("input[name='enName']").attr('maxlength','55');
            //whonetCode长度
            $("input[name='whonetCode']").validatebox({
                validType:  ['symbol','length[0,15]']
            });
            $("input[name='whonetCode']").attr('maxlength','15');
            //fastCode长度
            $("input[name='fastCode']").validatebox({
                validType:  ['symbol','length[0,9]']
            });
            $("input[name='fastCode']").attr('maxlength','9');
            //displayOrder长度
            $("input[name='displayOrder']").validatebox({
                validType:  ['digits','length[0,6]']
            });
            $("input[name='displayOrder']").attr('maxlength','6');

            $("#telephone").validatebox({
                validType:  ['symbol']
            });
            //地址
            $("#address").validatebox({
                validType:  ['symbol','length[0,35]']
            });
            $("#address").attr('maxlength','35');

            $("#enAddress").validatebox({
                validType:  ['symbol','length[0,120]']
            });
            $("#enAddress").attr('maxlength','120');
            //连络人
            $("#contacts").validatebox({
                validType:  ['symbol','length[0,20]']
            });
            $("#contacts").attr('maxlength','20');
            //传真
            $("#fax").validatebox({
                validType:  ['symbol','length[0,25]']
            });
            $("#fax").attr('maxlength','25');
            //备注
            $("#memo").validatebox({
                validType:  ['symbol','length[0,100]']
            });
            $("#memo").attr('maxlength','100');

            //卫生代码
            $("#nacaoId").validatebox({
                validType:  ['symbol','length[0,30]']
            });
            $("#nacaoId").attr('maxlength','30');
        },

        addCallBack: function(){
            MED.initTree();
            $("#spanEditCodeNo").hide();
        }
    });



    return MED;


}(jQuery));

$(function(){
    MED.init();
});
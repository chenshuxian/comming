/**
 * Created by Administrator on 2016/3/21.
 */
var
    itemTypeId = $("#itemTypeId").val();

getSearchObj = function() {
    var
        searchObj = {
            itemTypeId: itemTypeId,
            instrumentId: CtrInstrMics.instrumentId
        },
        searchStr =  $.trim( $("#searchStr").val());

    if (itemTypeId == 1){
        searchObj.addGermSearchStr = searchStr;     //细菌
    }else{
        searchObj.addAntiSearchStr = searchStr;     //抗生素
    }
    return searchObj;
};

$("#leftShiftBtn").on('click',BasicModule.leftShiftBtn);
$("#rightShiftBtn").on('click',BasicModule.rightShiftBtn);

$("#searchBtn2").on('click', function () {
    $("#addCheckProjectRight").datagrid("reload", getSearchObj());
});

$("#addBtn").on('click', function () {

    if((BasicModule.addTestItemIds.length > 0) || (BasicModule.delTestItemIds.length > 0)){
        // 提交
        var
            data = {
                instrumentId: CtrInstrMics.instrumentId,
                delMicsIds: BasicModule.delTestItemIds.join(","),
                addMicsIds: BasicModule.addTestItemIds.join(","),
                itemTypeId: itemTypeId
            };

        $.ajax({
            "url": CtrInstrMics.addUrl,
            "type": "POST",
            data: data,
            "success": function (data) {
                resolutionData(data);
                if(itemTypeId == 1){
                    CtrInstrMics.dataGrid.datagrid('reload');   //细菌
                }else{
                    CtrInstrMics.dataGrid2.datagrid('reload');  //抗生素
                }

                $("#" + CB.POPDIV).hide();
                BasicModule.addTestItemIds = [];
                BasicModule.delTestItemIds = [];
            },
            "error": function () {}
        });

    } else {
        //$("#ctrDictInfoModal").hide();
        $("#" + CB.POPDIV).hide();
    }
})

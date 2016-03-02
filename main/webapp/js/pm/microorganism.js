/***
 *@ClassName: microorganism.js
 * @Description: TODO(微生物字典-JS)
 * @date 2016年03月01日
 * @author chenshuxian
 ***/
var MG = (function($){

    /* START render basicModule */
    MG =  Object.create(BasicModule);
    /* END render basicModule */

    var
        _delBatUrl =  ctx + "/pm/CentreMicrobeItem/batchDeleteCentreMicrobeitems",
        _existUrl = ctx + "/pm/CentreMicrobeItem/checkIfCentreMicrobeitemNameExist",
        //_exist2Url = ctx + "/org/MG/checkNacaoIdExisted",
        _updateUrl = ctx + "/pm/CentreMicrobeItem/modifyCentreMicrobeitem",
        _addUrl = ctx + "/pm/CentreMicrobeItem/addCentreMicrobeitem",
        _delUrl = ctx + "/pm/CentreMicrobeItem/deleteCentreMicrobeitem",
        _changeStatusUrl = ctx + "/pm/CentreMicrobeItem/disableOrEnableCentreMicrobeitem",
        _InfoUrl = ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemDetailById",
        _pageListUrl = ctx + "/pm/CentreMicrobeItem/getCentreMicrobeitemsPageList";


    var _checkNacaoId= function(itemTypeId) {
        //console.log(obj);
        var
            nacaoId = $("#nacaoId").val().trim(),
            type = $("#opType").val();

        /*console.log("checkNaco:"+nacaoId);
         console.log("url:"+check2Url);
         console.log(orgTypeId);
         console.log(type);*/
        $.ajax({
            url : MG.exist2Url,
            type : CB.METHOD,
            data : {itemTypeId : itemTypeId},
            success : function(data) {
                //resolutionData(data);
                console.log("checknao:"+data);
                //alert("chekno2");

                if (data.indexOf("confirm|") == 0) {
                    // 有相同的卫生机构代码
                    showConfirm(data.substring(8), function() {
                        if(type == 'add'){
                            MG.add();
                        }else{
                            MG.update();
                        }
                    });
                } else {
                    // 无，确认继续
                    if(type == 'add'){
                        MG.add();
                    }else{
                        MG.update();
                    }
                }
            },
            error : function() {
            }
        });
    };

    $.extend(MG,{

        //设定pop弹出框的大小
        preId: null,
        popArea: 480,
        focusId: "editName",
        tableList:null,
        dataGrid:null,
        delBatUrl: _delBatUrl,
        existUrl: _existUrl,
        updateUrl: _updateUrl,
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,

        /*callback function area*/

        //新增成功callback
        addSuccess: function(data) {
            //console.log("successcallback");
            //$("#editBtn").attr("disable", false);
            var itemTypeId = $("#itemTypeId").val();
            if (data.indexOf("confirm|") == 0) {
                // 有同名
                showConfirm(data.substring(8), function () {
                    if (itemTypeId == '1') {
                        // 检测卫生机构代码
                        _checkNacaoId(itemTypeId);

                    } else {
                        MG.add();
                    }
                });
            } else {
                // 无同名，确认继续
               MG.add();
            }

        },
        //修改成功callback
        editSuccess: function(data) {
            //console.log("editcallback");
            var itemTypeId = $("#itemTypeId").val();
            //console.log(orgTypeId);
            if (data.indexOf("confirm|") == 0) {
                // 有同名
                showConfirm(data.substring(8), function () {
                    // 确认继续
                    if (itemTypeId == '1') {
                        // 检测卫生机构代码
                        _checkNacaoId(itemTypeId);
                    } else {

                        MG.update();
                    }
                });
            } else {
                // 无同名，确认继续
                if (itemTypeId == '1') {
                    // 检测卫生机构代码
                    _checkNacaoId(itemTypeId);

                } else {

                    MG.update();
                }
            }

        },


        editCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                id: rowData.stringId,
                typeKey: rowData.typeKey,
                opType: 'edit',
                codeNo: rowData.codeNo
            });
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;


        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                enShortName: rowData.enShortName,
                enName: rowData.enName,
                whonetCode: rowData.whonetCode,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });
            $("form input").attr("readonly", "readonly");
            $("form textarea").attr("readonly", "readonly");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        },

        /*callback function area end*/

        searchObj: function(preId) {

            return {
                searchStr: $.trim($("#" + preId + "SearchStr").val()),
                status: $("#" + preId + "Status").val(),
                sort: $("#" + preId + "Sort").val(),
                itemTypeId: $("#" + preId + "ItemTypeId").val()
            };

        }


    });


    return MG;


}(jQuery));/**
 * Created by Administrator on 2016/3/1.
 */

/**
 * 中心仪器细菌对照
 * Created by chenshuxian
 * 2016/3/17.
 */
var CtrInstrMics = (function($){

    /* START render basicModule */
    CtrInstrMics = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.IMR,
        _tableList =  $("#" + _preId + "List"),
        _tableList2 = $("#" + _preId + "List2"),
        _hideCols = [],	//要穩藏的欄位
        _data = '',
        _module = "CtrInstrMics",
        _focusId = "name",
        _module2 = "CtrInstrMics2",
        _delBatUrl = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsDeleteBatch",
        _addUrl =  ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddBatch",
        _saveUrl =  ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsSave",
        _pageListUrl = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsList",

        _pageListUrl2 = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsList",
        _instrumentUrl = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsList",
        _instrumentsMicsListUrl = ctx + "/inst/ctrInstrumentsMics/ctrInstrumentsMicsListMain",
        _optLeftUrl = ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddLeft',
        _optRightUrl = ctx + '/inst/ctrInstrumentsMics/ctrInstrumentsMicsAddRightList',
        _initHeight = CB.HEIGHT - 20 ,
        _initHeight2 = CB.HEIGHT + 70 ,

    /* START dataGrid 生成*/

    //first dataGrid
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId,
            height:_initHeight,
            isSecond:true
        },
        //CtrInstrMics dataGrid obj render
        _gridObj = dataGridM.init(_dgParams),

        _upgradeObj = {
           // pagination: false,
            onLoadSuccess: function() {
                dataGridM.loadSuccess(this);
            },

            onCellEdit: function(index,field,value){
                //记录最后一个编辑时的index
                CtrInstrMics.frozeCell = index;
                CtrInstrMics.frozeField = field;
            },
            loadFilter: function(data){
                var params = {total:0,rows:[]};
                if(data.rows)
                    return data;
                else
                    return params;
            }
        };

        _gridObj = $.extend({},_gridObj,_upgradeObj);
        // render dataGrid

        var _dataGrid = _tableList.datagrid(_gridObj).datagrid("enableCellEditing");

        /* 加载结果描述 */
        var
            _dgParams2 = {
                url:_pageListUrl,
                data:_data,
                module:_module2,
                hideCols:_hideCols,
                tableList:_tableList2,
                preId:_preId,
                height:_initHeight,
                isSecond:true
            },

            //CtrInstrMics dataGrid obj render
            _gridObj2 = dataGridM.init(_dgParams2);
            // render dataGrid
        _gridObj2 = CtrInstrMics.getNewParams(_gridObj2,_upgradeObj);

        var _dataGrid2 = _tableList2.datagrid(_gridObj2).datagrid("enableCellEditing");

    var _columns = function() {

            var columns =  [[
                {field: "idString", checkbox: true, width: 30},
                {title: "编码", field: 'codeNo', width: 50},
                {title: "中文名称", field: 'name', flex: 1, width: 50},
                {title: "英文简称", field: 'enShortName', width: 50}
            ]];

            return columns;
        },

        //细菌例表添加钮点下后已包含
        _loadContainList = function() {

            CtrInstrMics.leftDG =   $("#addCheckProjectLeft").datagrid({
                url: _optLeftUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: CtrInstrMics.instrumentId,itemTypeId: 1},
                height: _initHeight2,
                fitColumns: true,
                striped: true,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                    $("#containSize").html(data.total);
                }
            });
        },

        //细菌例表添加钮点下后未包含
        _loadNoContainList = function() {

            CtrInstrMics.rightDG = $("#addCheckProjectRight").datagrid({
                url: _optRightUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: CtrInstrMics.instrumentId,itemTypeId: 1},
                height: _initHeight2,
                fitColumns: true,
                striped: true,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                    if(data.rows.source != "local") {
                        CtrInstrMics.rightArr = [];
                        CtrInstrMics.rightArr = data.rows;
                    }
                }
            });
        },

        //抗生素添加钮点下后已包含
        _loadContainList2 = function() {

            CtrInstrMics.leftDG =   $("#addCheckProjectLeft").datagrid({
                url: _optLeftUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: CtrInstrMics.instrumentId,itemTypeId: 2},
                height: _initHeight2,
                fitColumns: true,
                striped: true,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                    $("#containSize").html(data.total);
                }
            });
        },

        //抗生素添加钮点下后未包含
        _loadNoContainList2 = function() {

            CtrInstrMics.rightDG = $("#addCheckProjectRight").datagrid({
                url: _optRightUrl,
                method: CB.METHOD,
                queryParams: {instrumentId: CtrInstrMics.instrumentId,itemTypeId: 2},
                height: _initHeight2,
                fitColumns: true,
                striped: true,
                fit: false,
                autoRowHeight: false,
                pagination: false,
                columns: _columns(),
                onLoadSuccess: function (data) {
                    if(data.rows.source != "local") {
                        CtrInstrMics.rightArr = [];
                        CtrInstrMics.rightArr = data.rows;
                    }
                }
            });
        },

        //仪器 dataGrid
        _loadInsList = function(data) {
            console.log("loadINstLIst");
           CtrInstrMics.instDG = $("#instrumentSelectList").datagrid({
               url: ctx + '/inst/ctrInstrumentsItem/ctrInstrumentsPageList',
               method: CB.METHOD,
               height: _initHeight + 37,
               queryParams:data,
               fitColumns: true,
               striped: true,
               checkOnSelect: false,
               fit: false,
               columns: [[
                   {
                       field: 'idString',
                       formatter: function (value, row, index) {
                           return "<input type='radio' datagrid-row-index='" + index + "' name='instrument'>";
                       }
                   },
                   {title: "编码", field: 'codeNo', width: 80},
                   {title: "仪器名称", field: 'name', width: 100},
                   {title: "仪器型号", field: 'model', width: 100}
               ]],
               onClickCell: function (index, field) {
                   var rowData = $(this).datagrid('getData').rows[index],
                       instrumentId = rowData.idString,
                       instrumentName = rowData.name;
                   CtrInstrMics.instrumentId = instrumentId;
                   //$("#instrumentName").text(instrumentName);
                   CtrInstrMics.instrumentName = instrumentName;
                   if (field == 'idString') {
                       return;
                   }
                   $("input[type='radio']:eq(" + index + ")").click();
               },
               pagination: true,
               pageNumber: 1,
               pageSize: 10
           });
        },

        //保存修改
        _saveCommon = function(params) {

            var
                data = params.data,
                dataGrid = params.dataGrid,
                itemTypeId = params.itemTypeId,
                formData = [],channelCode = [], channelCodePre,
                flag = true,
                reg = /[<>|$]/;

            console.log(data.length);

            if(data.length > 0){
                $.each(data,function(i,item){
                    //验证打印次数不可为空
                    if(!item.printOrder){
                        BM.showMessage("第"+ (i+1) +"行的打印次序为空，请重新输入！");
                        dataGrid.datagrid("editCell",{index:i,field:'printOrder'});
                        flag = false;
                        return false;
                    }
                    //验证仪器通道码不可重覆
                    if(item.channelCode){
                        if(reg.test(item.channelCode)){
                            BM.showMessage("第"+(+i+1)+"行的仪器通道码有特殊符号，请重新输入");
                            dataGrid.datagrid("editCell",{index:i,field:'channelCode'});
                            flag = false;
                            return;
                        }
                        channelCodePre = channelCode[item.channelCode];
                        if(channelCodePre){
                            BM.showMessage("第"+(+i+1)+"行的仪器通道码["+item.channelCode+"]有重复，请重新输入");
                            dataGrid.datagrid("editCell",{index:i,field:'channelCode'});
                            flag = false;
                            return;
                        }else{
                            channelCode[item.channelCode] = item.channelCode;
                        }
                    }
                    //单位
                    if(reg.test(item.unit)){
                        BM.showMessage("第"+(+i+1)+"行的单位有特殊符号，请重新输入");
                        dataGrid.datagrid("editCell",{index:i,field:'unit'});
                        flag = false;
                        return;
                    }
                    if(itemTypeId == 1) {                //细菌
                        formData.push({name: "txtIdGerm", value: item.id});
                        formData.push({name: "txtChannelCodeGerm", value: item.channelCode});
                        formData.push({name: "txtPrintOrderGerm", value: item.printOrder});
                    }else{                              //抗生素
                        formData.push({name: "txtIdAnti", value: item.id});
                        formData.push({name: "txtChannelCodeAnti", value: item.channelCode});
                        formData.push({name: "txtPrintOrderAnti", value: item.printOrder});
                    }
                })
            }else{
                BM.showMessage("没有可保存的数据");
                flag = false;
                return false;
            }

            formData.push({name: "itemTypeId", value: itemTypeId});
            formData.push({name: "instrumentId", value: CtrInstrMics.instrumentId});

            if(flag){
                $.ajax({
                    "url" : _saveUrl,
                    "type" : "POST",
                    data : formData,
                    "success" : function(data) {
                        resolutionData(data);
                        dataGrid.datagrid("reload");
                    }
                });
            }


        }


    $("#" + _preId + "Add2").click(function () {

        if(!CtrInstrMics.instrumentId){
            BM.showMessage("请选择仪器");
            return;
        }

        var
            params = {
                url: CtrInstrMics.instrumentsMicsListUrl,
                data: {itemTypeId: 2},
                callback: function(){
                    _loadContainList2();
                    _loadNoContainList2();
                },
                popArea: 920,
                focusId: "searchStr"
            };

        CtrInstrMics.addPop(params);

    });

    $("#" + _preId + "DeleteBatch2").click(function () {

        var
            params = {
                url: _delBatUrl,
                dataGrid: CtrInstrMics.dataGrid2
            };

        CtrInstrMics.deleteBatch(params);

    });

    /* 仪器列表 */
    $("#" + _preId + "instrumentList").click(function () {

        var
            params = {
                url: _instrumentUrl,
                data: {},
                callback: function(){
                    var data = CtrInstrMics.searchObj();
                    _loadInsList(data);
                },
               // popArea: 720,
                focusId: "instrumentSchStr"
            };

        CtrInstrMics.addPop(params);

    });


    /* 细菌保存 */
    $("#" + _preId + "Save").click(function () {

        var
            dataGrid = CtrInstrMics.dataGrid,
            data = dataGrid.datagrid("getRows"),
            itemTypeId = 1,
            params = {
                data: data,
                dataGrid: dataGrid,
                itemTypeId: itemTypeId
            };

        //将编辑栏位栋结
        if(CtrInstrMics.frozeCell >= 0 && CtrInstrMics.frozeCell != null) {
            dataGrid.datagrid("endEdit", CtrInstrMics.frozeCell);
        }

        _saveCommon(params);

    });

    /* 抗生素保存 */
    $("#" + _preId + "Save2").click(function () {
        var dataGrid = CtrInstrMics.dataGrid2,
            data = dataGrid.datagrid("getRows"),
            itemTypeId = 1,
            params = {
                data: data,
                dataGrid: dataGrid,
                itemTypeId: itemTypeId
            };
        //将编辑栏位栋结
        if(CtrInstrMics.frozeCell >= 0 && CtrInstrMics.frozeCell != null) {
            dataGrid.datagrid("endEdit", CtrInstrMics.frozeCell);
        }

        _saveCommon(params);

    });



    $.extend(CtrInstrMics,{

        preId:_preId,
        module:_module,
        parentId: null,
        //设定pop弹出框的大小
        popArea: 580,
        descSort: 0,
        focusId: _focusId,
        tableList:_tableList,
        tableList2:_tableList2,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        addUrl: _addUrl,
        pageListUrl: _pageListUrl,
        instrumentsMicsListUrl:_instrumentsMicsListUrl,
        //exParams: _exParams,

        //dataGrid2 of Url
        pageListUrl2: _pageListUrl2,
        /*END url 定義*/
        dataGrid:_dataGrid,
        dataGrid2:_dataGrid2,
        leftDG: null,
        rightDG: null,
        instDG: null,
        instrumentId: null,
        instrumentName: null,
        loadContainList: _loadContainList,
        loadNoContainList: _loadNoContainList,
        frozeCell: null,

        searchObj: function() {
            return {
                searchStr: $.trim($("#instrumentSchStr").val()),
                status: $("#status").val(),
                frontClassName: $("#frontClass").val(),
                typeId: 1
            };
        },

        popSubmit: function() {

            var
                checkRadio =  $("input[type='radio']:checked").length,
                opts2 = CtrInstrMics.dataGrid2.datagrid("options"),
                opts1 = CtrInstrMics.dataGrid.datagrid("options");
                opts1.url = CtrInstrMics.pageListUrl,
                opts1.queryParams =
                {
                    instrumentId: CtrInstrMics.instrumentId,
                    itemTypeId: 1
                };

            opts2.url = CtrInstrMics.pageListUrl;
            opts2.queryParams =
            {
                instrumentId: CtrInstrMics.instrumentId,
                itemTypeId: 2
            };


            if(checkRadio == 0){
                BM.showMessage("请先选择一个仪器");
                return;
            }
            //修改页面仪器名
            $("#instrumentName").text(CtrInstrMics.instrumentName);
            $("#" + CB.POPDIV).hide();
            //DG1 RELOAD
            CtrInstrMics.dataGrid.datagrid(opts1);
            //DG2 RELOAD
            CtrInstrMics.dataGrid2.datagrid(opts2);
        }

        /*callback function area end*/

    });

    return CtrInstrMics;


}(jQuery));

$(function(){
    var _preId = CB.PREID.IMR;
    CtrInstrMics.init();
    $("#" + _preId + "Add").unbind();
    /* 细菌列表 */
    $("#" + _preId + "Add").click(function () {

        if(!CtrInstrMics.instrumentId){
            BM.showMessage("请选择仪器");
            return;
        }

        var
            params = {
                url: CtrInstrMics.instrumentsMicsListUrl,
                data: {itemTypeId: 1},
                callback: function(){
                    CtrInstrMics.loadContainList();
                    CtrInstrMics.loadNoContainList();
                },
                popArea: 920,
                focusId: "searchStr"
            };

        CtrInstrMics.addPop(params);

    });
});

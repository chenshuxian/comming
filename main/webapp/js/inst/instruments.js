/**
 * Created by chenshuxian on 2016/03/02
 * ModuleName 中心仪器信息
 */

var Inst = (function($){

    /* START render basicModule */
    Inst = Object.create(BasicModule);

    var
        _preId = CB.PREID.INS,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	//要穩藏的欄位
        _data = Inst.searchObj(_preId),
        _module = "Inst",
        _focusId = "name",
        _popArea = 720,
        _delBatUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsDeleteBatch",
        _existUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsIfExisted",
        _updateUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsEdit",
        _updateUrl2 = ctx + "/inst/ctrInstruments/ctrInstrumentsParamsEdit",
        _updateUrlIf = ctx + "/inst/ctrInstruments/ctrInstrumentsIfEdit",
        _addUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsAdd",
        _delUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsDelete",
        _changeStatusUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsDisableOrEnable",
        _InfoUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsInfo",
        _InfoUrl2 = ctx + "/inst/ctrInstruments/ctrInstrumentsParamsInfo",
        _pageListUrl = ctx + "/inst/ctrInstruments/ctrInstrumentsPageList",
        _TestItemUrl = ctx + "/inst/ctrInstruments/getTestItem",

        //默认标本类型Grid
        _sampleTypeParam = {					//下拉Grid参数,所有参数均为必填
            div_id:"sampleTypeDiv", 			//对应表单DIV的id
            grid_id:"gridSampleType", 			//对应数据源Grid的Id
            name:"sampleTypeId",				//在表单中对应的提交name
            columnShow:1,						//将要在文本框中显示的列序号
            width : 207, 					    //Combo的宽度
            clearOff:false,						//是否禁用clear按钮
            searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
            lockBy:[26,471],			//锁定Grid，传入数组[top,left]
            onEnter: function() {
                if (Inst.sampleTypeGrid.delay == 1) {
                    Inst.sampleTypeGrid.delay = 0;
                } else {
                    $("#fastCode").focus();
                    Inst.sampleTypeGrid.delay = 1;
                }
            }

        },

        ////单列报告模板Grid
        //_reportTemplateParam = {				//下拉Grid参数,所有参数均为必填
        //    div_id:"reportTemplateDiv", 		//对应表单DIV的id
        //    grid_id:"gridReportTemplate", 		//对应数据源Grid的Id
        //    name:"reportTemplateId",			//在表单中对应的提交name
        //    columnShow:1,						//将要在文本框中显示的列序号
        //    width : 172, 					    //Combo的宽度
        //    clearOff:false,						//是否禁用clear按钮
        //    searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
        //    lockBy:[26,471]	,				//锁定Grid，传入数组[top,left]
        //    onEnter: function() {
        //        if (Inst.sampleTypeGrid.delay == 1) {
        //            Inst.sampleTypeGrid.delay = 0;
        //        } else {
        //            $("#sampleTypeDiv input:text").select();
        //            Inst.sampleTypeGrid.delay = 1;
        //        }
        //    }
        //
        //},

    /* START dataGrid 生成*/
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),
    // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj),

        _typeCombo = function() {
            var
                typeId = $("#typeId"),
                typeIdData = [
                    {id:"0", text:"常规"},
                    {id:"1", text:"微生物"},
                    {id:"2", text:"文字报告"},
                    {id:"3", text:"酶标"},
                ];

            BM.comboboxCreate(typeId,typeIdData);
        };



    /* 前台通讯类 */
    $("." + _preId + "-frontClass-selector").on("click", "li", function () {
        $("#" + _preId + "frontClassSpan").html($(this).html());
        $("." +_preId + "-frontClass-selector li.selected").removeClass("selected");
        var flg = $(this).is('.selected');
        $(this).addClass(function () {
            return flg ? '' : 'selected';
        })

        var statusVal = $(this).attr("el-value");
        $("#" + _preId + "frontClass").val(statusVal);

        Inst.searchGrid();
    });


    $.extend(Inst,{

        preId:_preId,
        module:_module,
        //设定pop弹出框的大小
        popArea: _popArea,
        focusId: _focusId,
        tableList:_tableList,
        /*START url 定義*/
        delBatUrl: _delBatUrl,
        existUrl: _existUrl,
        updateUrl: _updateUrl,
        updateUrl2: _updateUrl2,
        updateUrlIf: _updateUrlIf,
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        InfoUrl2: _InfoUrl2,
        pageListUrl: _pageListUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,
        sampleTypeParam:  _sampleTypeParam,
       // reportTemplateParam: _reportTemplateParam,
        searchHold: CB.SEARCHHOLDER.CENTERINSTR,


        validateSave: function() {


            var

                displayOrder = $("#displayOrder").val(),
                typeId = $("#typeId").val();

            if(BM.comboGrid(Inst.sampleTypeGrid,CB.COMBOMSG.SAMPLETYPE,"sampleTypeDiv")) {
                return false;
            }

            if(validateDisplayOrder("displayOrder")){
                return false;
            }

            return true;
        },

        validateBox: function() {

            $("input[name='name']").validatebox({
                required:true,
                validType:  ['symbol','length[0,30]','space'],
                missingMessage: "仪器名称为空，请重新输入！"
            });
            $("input[name='name']").attr('maxlength','30');
            $("#model").validatebox({
                required:true,
                validType:  ['symbol','length[0,50]','space'],
                missingMessage: "仪器型号为空，请重新输入！"
            });
            $("#model").attr('maxlength','50');
            $("#typeId").validatebox({
                required:true,
                validType: 'selectValueRequired["#typeId"]',
                missingMessage: "仪器类型为空，请重新输入！"
            });

            //fastCode长度
            $("input[name='fastCode']").validatebox({
                validType:  ['symbol','length[0,9]']
            });
            $("input[name='fastCode']").attr('maxlength','9');

            //生产厂家
            $("input[name='producer']").validatebox({
                validType:  ['symbol','length[0,20]']
            });
            $("input[name='producer']").attr('maxlength','20');

            //displayOrder长度
            $("input[name='displayOrder']").validatebox({
                validType:  ['digits','length[0,11]']
            });
            $("input[name='displayOrder']").attr('maxlength','6');

        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(Inst.rowData);
            Inst.sampleTypeGrid = new TextCombo(_sampleTypeParam);
            //Inst.reportTemplateGrid = new TextCombo(_reportTemplateParam);
            Inst.sampleTypeGrid.delay = 1;
            //_typeCombo();

            $("#InfoForm").form("load", {
                /* input's name attr : data */
            	name: rowData.name,
                model: rowData.model,
                producer: rowData.producer,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                typeId: rowData.typeName,
                sampleTypeDiv: rowData.sampleTypeName,
                reportTemplateDiv: rowData.reportTemplateName,
                orgTypeId: Inst.orgTypeId,
                id:rowData.stringId,
                codeNo:rowData.codeNo,
                opType: 'edit'
            });
            //$("#typeId").combobox("setValue",rowData.typeId);
            $("#typeId").val(rowData.typeId);
            $("#spanEditCodeNo").html(rowData.codeNo);
            newcommonjs.oldName = rowData.name;
            setTimeout(function() {
                //alert(rowData.sampleTypeName);
                Inst.sampleTypeGrid.setValue(rowData.sampleTypeSId, rowData.sampleTypeName);
                //Inst.reportTemplateGrid.setValue(rowData.reportTemplateSId, rowData.reportTemplateName);
            },500);

        },

        showCallBack: function() {

            //_typeCombo();
            var sampleTypeGrid = new TextCombo(_sampleTypeParam);
            //var reportTemplateGrid = new TextCombo(_reportTemplateParam);
            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                /* input's name attr : data */
                name: rowData.name,
                model: rowData.model,
                producer: rowData.producer,
                fastCode: rowData.fastCode,
                displayOrder: rowData.displayOrder,
                typeId: rowData.typeName
                //sampleTypeDiv: rowData.sampleTypeName,
                //reportTemplateDiv: rowData.reportTemplateName

            });
            //$("#sampleTypeDiv").html(rowData.sampleTypeName);
            //$("#typeId").combobox("setValue",rowData.typeId);
            sampleTypeGrid.setText(rowData.sampleTypeName);
            sampleTypeGrid.disable();
            //reportTemplateGrid.setText(rowData.reportTemplateName);
           // reportTemplateGrid.disable();
            $("#typeId").val(rowData.typeId);

            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("select").attr("disabled","disabled");
            $("#editBtn").hide();
            $("#spanEditCodeNo").html(rowData.codeNo);

        },

        addCallBack: function() {
            Inst.sampleTypeGrid = new TextCombo(_sampleTypeParam);
            //Inst.reportTemplateGrid = new TextCombo(_reportTemplateParam);
            Inst.sampleTypeGrid.delay = 1;
            //_typeCombo();
        },

        searchObj: function(preId) {

            return {
                searchStr: $.trim($("#" + preId + "SearchStr").val()),
                status: $("#" + preId + "Status").val(),
                sort: $("#" + preId + "Sort").val(),
                frontClassName: $("#" + preId + "frontClass").val(),
                realtime:1
            };

        },
        /*callback function area end*/

        showParamsInfo: function (id){

            var callbackUpdate = function(data) {

                resolutionData(data);

                var callback;

                callback = function () {
                    
                    var
                        comPort = $("#comPort"),
                        comPortData =[
                            {id:"1", text:"COM1"},
                            {id:"2", text:"COM2"},
                            {id:"3", text:"COM3"},
                            {id:"4", text:"COM4"},
                            {id:"5", text:"COM5"},
                            {id:"6", text:"COM6"},
                            {id:"7", text:"COM7"},
                            {id:"8", text:"COM8"},
                            {id:"9", text:"COM9"},
                            {id:"10", text:"COM10"}
                        ],
                        trans = $("#transferMode"),
                        transData = [
                            {id:"0", text:"无通信"},
                            {id:"1", text:"单向"},
                            {id:"2", text:"双向(无校验位)"},
                            {id:"3", text:"双向(带校验位)"},
                            {id:"4", text:"其它"}
                        ],
                        protocol = $("#protocol"),
                        protocolData = [
                            {id:"", text:""},
                            {id:"1", text:"XonXof"},
                            {id:"2", text:"RTS or OTS"},
                            {id:"3", text:"ASTS"}
                        ],
                        baudRate = $("#baudRate"),
                        baudRateData = [
                            {id:"", text:""},
                            {id:"1200", text:"1200"},
                            {id:"2400", text:"2400"},
                            {id:"4800", text:"4800"},
                            {id:"9600", text:"9600"},
                            {id:"19200", text:"19200"},
                            {id:"38400", text:"38400"},
                            {id:"115200", text:"115200"}
                        ],
                        dataBit = $("#dataBit"),
                        dataBitData = [
                            {id:"", text:""},
                            {id:"1", text:"1"},
                            {id:"2", text:"2"},
                            {id:"3", text:"3"},
                            {id:"4", text:"4"},
                            {id:"5", text:"5"},
                            {id:"6", text:"6"},
                            {id:"7", text:"7"},
                            {id:"8", text:"8"}
                        ],
                        stopBit = $("#stopBit"),
                        stopBitData = [
                            {id:"", text:""},
                            {id:"1", text:"1"},
                            {id:"2", text:"2"},
                            {id:"3", text:"3"}
                        ],
                        parityBit = $("#parityBit"),
                        parityBitData = [
                            {id:"", text:""},
                            {id:"0", text:"无校验"},
                            {id:"1", text:"奇校验"},
                            {id:"2", text:"偶校验"}
                        ];


                    BM.comboboxCreate(comPort,comPortData);
                    BM.comboboxCreate(trans,transData);
                    BM.comboboxCreate(protocol,protocolData);
                    BM.comboboxCreate(baudRate,baudRateData);
                    BM.comboboxCreate(dataBit,dataBitData);
                    BM.comboboxCreate(stopBit,stopBitData);
                    BM.comboboxCreate(parityBit,parityBitData);

                    // 需要回应
                    if ($("#isRespond").val() == '1') {
                        $("#isRespondCheck").attr("checked", 'true');
                    }
                    // DTR
                    if ($("#isDtr").val() == '1') {
                        $("#isDtrCheck").attr("checked", 'true');
                    }
                    // RTS
                    if ($("#isRts").val() == '1') {
                        $("#isRtsCheck").attr("checked", 'true');
                    }

                };

                if(data.indexOf("err|") != 0){

                    var
                        params = {
                            url: Inst.InfoUrl2,
                            data: {instrumentId: id},
                            callback: callback
                        };

                    Inst.commonPop(params);
                    //newcommonjs.newshowDictCodeEditDialog(data,callback,url,720);
                }
            };

            this.checkIfEdit(callbackUpdate,id);
        },

        checkIfEdit: function(callback,id){

                  $.ajax({
                    "url" : Inst.updateUrlIf,
                    "type" : "POST",
                    data:"id="+id,
                    "success" : callback
                });

        },

        //修改通讯参数
        updateParams: function(){
            //防止重复提交
            $("#editBtn").attr("disabled", true);

            formTextTrim("InfoForm");
            $("#isRespond").val(0);
            $("#isDtr").val(0);
            $("#isRts").val(0);

            $("input[name='checkboxInst']:checked").each(function(){
                //alert(this.value);
                $("#"+ this.value).val(1);
            });

            // 修改
            $.ajax({
                url: Inst.updateUrl2, //ctx + "/inst/ctrInstruments/ctrInstrumentsParamsEdit",
                type: "POST",
                data:$("#InfoForm").serialize(),
                success: function(data) {
                    BM.resolutionData(data);
                    $("#ctrDictInfoModal").hide();
                }
            });
        }

    });


    return Inst;


}(jQuery));

$(function(){
    Inst.init();
});


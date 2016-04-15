/**
 * 用户管理js
 * Created by chenshuxian
 * data 2016/4/8.
 */
var AuthUsers = (function($){

    /* START render basicModule */
    AuthUsers = Object.create(BasicModule);
    /* END render basicModule */
    var
        _preId = CB.PREID.AU,
        _tableList =  $("#" + _preId + "List"),
        _hideCols = [],	            //要穩藏的欄位
        _data = AuthUsers.searchObj(_preId),    //取得初始grid时所需要的server 参数
        _module = "AuthUsers",                  //模组名称，于grid 建立时使用
        _focusId = "editUserNo",                  //新增、修改页面打开时focus的对象id
        _popArea = 480,                         //新增、修改页面开启时初始大小
        _updateUrl = ctx + "/auth/user/doUpdate",                  //修改url
        _addUrl = ctx + "/auth/user/doUpdate",                      //新增url
        _delUrl = ctx + "/auth/user/doDelete",                   //删除url
        _delBatUrl = ctx + "/auth/user/doDelete", //改变状态的url
        _changeStatusUrl = ctx + "/auth/user/doUpdate", //改变状态的url
        _InfoUrl = ctx + "/auth/user/doView",                    //新增、修改、view 页面打开时所对映后台调用url
        _pageListUrl = ctx + "/auth/user/doSearch",            //datagrid 取得资料的url
        _doExcuteUrl = ctx + "/auth/user/doExcute",
        _existUrl = ctx + "/auth/user/userIfExisted",
    /* START dataGrid 生成*/
        _dgParams = {
            url:_pageListUrl,
            data:_data,
            module:_module,
            hideCols:_hideCols,
            tableList:_tableList,
            preId:_preId
        },

        _gridObj = dataGridM.init(_dgParams),                   //取得 datagrid 物件参数
    // render dataGrid
        _dataGrid = _tableList.datagrid(_gridObj);


    $.extend(AuthUsers,{

        preId:_preId,
        module:_module,
        //设定pop弹出框的大小
        popArea: _popArea,
        focusId: _focusId,
        tableList:_tableList,
        /*START url 定義*/
        updateUrl: _updateUrl,
        addUrl: _addUrl,
        delUrl: _delUrl,
        changeStatusUrl: _changeStatusUrl,
        InfoUrl: _InfoUrl,
        pageListUrl: _pageListUrl,
        delBatUrl: _delBatUrl,
        existUrl: _existUrl,
        /*END url 定義*/
        dataGrid:_dataGrid,
        checkStatus:false,

        //validateSave: function() {
        //
        //    var
        //        name = $.trim($("#editUserNo").val()),
        //        displayOrderId = "editDisplayOrder";
        //    if (name == '') {
        //        showMessage('用户账号为空，请重新输入！');
        //        $("#editUserNo").focus();
        //        return false;
        //    }
        //    if (validateDisplayOrder(displayOrderId)) {
        //        return false;
        //    }
        //    return true;
        //},

        validateBox: function() {

            $("input[name='userNo']").validatebox({
                validType: ['symbol','authUser'],
                required:true
            });
            $("input[name='userNo']").attr('maxlength','45');

            $("input[name='userName']").validatebox({
                validType:['symbol','space'],
                required:true,
                message: "用户名称不可为空"
            });
            $("input[name='userName']").attr('maxlength','25');

            //displayOrder长度
            $("input[name='displayOrder']").validatebox({
                validType:  ['digits','length[0,6]']
            });
            $("input[name='displayOrder']").attr('maxlength','6');

            //备注
            $("#editMemo").validatebox({
                validType:  ['symbol','length[0,50]']
            });
            $("#editMemo").attr('maxlength','50');

        },

        addCallBack: function() {
            $("#InfoForm").form("load", {
                action: 'add'
            });
        },

        editCallBack: function() {

            var rowData = BasicModule.rowData;
            //console.log(AuthUsers.rowData);
            $("#InfoForm").form("load", {
                userNo: rowData.userNo,
                userName: rowData.userName,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo,
                id: rowData.stringId,
                typeKey: rowData.typeKey,
                opType: 'update',
                action: 'update'
            });
            $("#editUserNo").attr("readonly","readonly");
            newcommonjs.oldName = rowData.name;

        },

        showCallBack: function() {

            var rowData = BasicModule.rowData;
            $("#InfoForm").form("load", {
                userNo: rowData.userNo,
                userName: rowData.userName,
                displayOrder: rowData.displayOrder,
                memo: rowData.memo
            });

            $("form input").attr("readonly","readonly");
            $("form textarea").attr("readonly","readonly");
            $("#editBtn").hide();

        },

        changeStatusEx: function(index,rowData) {
            var
                params = {
                  data:{
                      id: rowData.stringId,
                      action:"changeStatus",
                      status:rowData.status
                  }
                };

            this.changeStatus(index,rowData,params);
        },

        resetPassword: function (index, rowData) {
            var id = rowData.id;
            var status = rowData.status;
            showConfirm('是否重置密码为[111111]?', function () {
                $.ajax({
                    url: _updateUrl,
                    type: 'POST',
                    data: {
                        action: 'resetPassword',
                        id: id,
                        status: status
                    },
                    success: function (data) {
                        resolutionData(data);
                    },
                    error: function () {

                    }
                });
            });

        },

        showUserGroupDialog: function (index,rowData) {
            var params = {
                data: {id: rowData.id, opType: "userGroup"},
                callback: function () {
                    $('#userGroup_userId').val(rowData.id);

                    $('#userGroup_tree').tree({
                        url: _doExcuteUrl,
                        method: "POST",
                        queryParams: {id: rowData.id, action: "getUserGroupData"},
                        idField: 'id',
                        checkbox: "true",
                        textField: 'group_name',

                        loadFilter: function (data) {
                            var json = eval(data);
                            var treeData = new Array();

                            for (i in json) {
                                treeData[i] = new Object();
                                treeData[i].id = json[i].id;
                                treeData[i].text = json[i].group_name;
                                treeData[i].checked = json[i].checked;
                                treeData[i].iconCls = "/images/icon/icon.png";
                            }
                            return treeData;
                        }
                    });
                }
            };

            this.commonPop(params);
        },

        //    //保存修改的权限
        saveUserGroup: function (userId, groupIds) {
            $("#authUser_btnSave").attr("disable", false);

            $.ajax({
                url: _doExcuteUrl,
                type: 'POST',
                data: {
                    userId: userId,
                    groupIds: JSON.stringify(groupIds),
                    action: 'saveUserGroup'
                },
                success: function (data) {
                    resolutionData(data);
                    $("#authUser_btnSave").attr("disable", false);
                    $("#"+CB.POPDIV).hide();
                },
                error: function () {
                    $("#authUser_btnSave").attr("disable", false);
                }
            });

        },

        updatePassword: function () {

            var oldPassword = $("#up_oldPassword").val();
            var newPassword = $("#up_newPassword").val();
            var reNewPassword = $("#up_reNewPassword").val();
            if (oldPassword == null || oldPassword == "") {
                BM.showMessage("请输入旧密码");
                this.clearUpdatePassword();
                return;
            }
            if (newPassword == null || newPassword == "") {
                BM.showMessage("请输入密码");
                this.clearUpdatePassword();
                return;
            }
            if (reNewPassword == null || reNewPassword == "") {
                BM.showMessage("请输入确认密码");
                this.clearUpdatePassword();
                return;
            }
            if (newPassword != reNewPassword) {
                BM.showMessage("两次新密码不一致，请重新输入！");
                this.clearUpdatePassword();
                return;
            }
            $.ajax({
                url: ctx + "/auth/user/doUpdatePW",
                type: "POST",
                data: {oldPassword: oldPassword, newPassword: newPassword},
                success: function (data) {
                    AuthUsers.clearUpdatePassword();
                    resolutionData(data);
                },
                error: function () {
                }
            });
        },

        clearUpdatePassword: function () {
            $("#up_oldPassword").val("");
            $("#up_newPassword").val("");
            $("#up_reNewPassword").val("");
        }


    });

    return AuthUsers;

}(jQuery));

$(function(){
    AuthUsers.init();
});
///**
// * Created by reach-pc on 2016/1/13.
// */
//
//
//var AuthUsers = {
//    //preId: $("#authUserMainPreId").val(),
//    preId:null,
//    doSearchUrl: null,
//    doViewUrl: null,
//    doUpdateUrl: null,
//    doAddUrl: null,
//    doDelUrl: null,
//    doExcuteUrl: null,
//    dataGrid: null,
//    currentEvent: null,
//	height: $('.tabs-panels').height() - 60,
//    init: function () {
//    	console.log(this.height);
//        newcommonjs.pageInit(this.preId);
//        this.tableList = $("#" + this.preId + "ResultList");
//        var url = AuthUsers.doSearchUrl; //ctx + "/auth/user/doSearch";
//        var params = this.searchObj();
//
//        var _dgParams = {
//        		url:url,
//        		data:params,
//        		module:"AuthUsers",
//        		hideCols:null,
//        		tableList:this.tableList,
//        		preId:this.preId,
//        		height: this.height
//        };
//
//        var gridObj = dataGridM.init(_dgParams);
//
//        // render dataGrid
//        AuthUsers.dataGrid = this.tableList.datagrid(gridObj);
//        /* END dataGrid 生成*/
//
////        var gridObj = AuthUsers.createDataGrid(url, params, 'POST', this.tableList);
////        gridObj.view =
////            $.extend({}, $.fn.datagrid.defaults.view, {
////                onAfterRender: function () {
////                    // 操作成功后刷新dataGrid
////                    switch (AuthUsers.currentEvent) {
////                        case "add":
////                            newcommonjs.setSearchConditions(AuthUsers.preId, "", -1, 2);
////                            AuthUsers.currentEvent = undefined;
////                            break;
////                    }
////                }
////            });
////
////        /* render DataGrid */
////      AuthUsers.dataGrid = this.tableList.datagrid(gridObj);
//        AuthUsers.dataGrid.gridObj = gridObj;
//        /* 关键词搜索 */
//        $("#" + this.preId + "SearchBtn").click(function () {
//            AuthUsers.dataGridSearch(AuthUsers.dataGrid, AuthUsers.searchObj());
//        });
//
//        /* 状态搜索 */
//        $("." + this.preId + "-status-selector").on("click", "li", function () {
//            $("#" + AuthUsers.preId + "StatusSpan").html($(this).html());
//            $("." + AuthUsers.preId + "-status-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            });
//
//            var statusVal = $(this).attr("el-value");
//            $("#" + AuthUsers.preId + "Status").val(statusVal);
//
//            AuthUsers.dataGridSearch(AuthUsers.dataGrid, AuthUsers.searchObj());
//        });
//
//        /* 排序 */
//        $("." + this.preId + "-sort-selector").on("click", "li", function () {
//            $("#" + AuthUsers.preId + "SortSpan").html($(this).html());
//            $("." + AuthUsers.preId + "-sort-selector li.selected").removeClass("selected");
//            var flg = $(this).is('.selected');
//            $(this).addClass(function () {
//                return flg ? '' : 'selected';
//            });
//
//            var sortVal = $(this).attr("el-value");
//            $("#" + AuthUsers.preId + "Sort").val(sortVal);
//
//            AuthUsers.dataGridSearch(AuthUsers.dataGrid, AuthUsers.searchObj());
//        });
//
//        ///* 批量删除 */
//        //$("#" + this.preId + "DeleteAuthUsers").click(function () {
//        //    AuthUsers.deleteBatch(AuthUsers.dataGrid);
//        //});
//
//        /* 新增 */
//        $("#" + this.preId + "AddAuthUsers").click(function () {
//            AuthUsers.currentEvent = "add";
//            AuthUsers.showAddDialog();
//        });
//
//        $(window).on('resize', function () {
//            newcommonjs.tableAuto(AuthUsers.tableList);
//        });
//    },
//
//    searchObj: function () {
//        return {
//            searchStr: $.trim($("#" + this.preId + "SearchStr").val()),
//            status: $("#" + this.preId + "Status").val(),
//            sort: $("#" + this.preId + "Sort").val()
//        };
//    },
//    /* 搜索 */
//    dataGridSearch: function (dataGrid, obj) {
//        dataGrid.datagrid('load', {
//            searchStr: obj.searchStr,
//            status: obj.status,
//            sort: obj.sort
//        });
//        newcommonjs.trimSpace($("#" + this.preId + "SearchStr"));
//    },
//
//
//
//    /* 创建dataGrid */
////    createDataGrid: function (url, params, method) {
////        var gridObj = newcommonjs.createGridObj(url, method, params);
////        gridObj.columns = [[
////            {field: "ck", checkbox: true, width: 30},
////            {
////                title: "用戶帐号", field: 'userNo', width: 80, formatter: function (value, row) {
////                var rowData = JSON.stringify(row);
////                return "<a onclick='AuthUsers.showDialog(" + rowData + ")'>" + value + "</a>";
////            }
////            },
////            {title: "用户名称", field: 'userName', flex: 1, width: 60},
////            {title: "顺序号", field: 'displayOrder', flex: 1, width: 60},
////            {title: "备注", field: 'memo', width: 400},
////            {
////                title: "状态", field: 'status', formatter: function (value, row, index) {
////                var rowData = JSON.stringify(row);
////                var returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" onchange='AuthUsers.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
////                if (value == '1') {
////                    returnStr = "<div class=\"status-switch\"><input type=\"checkbox\" name=\"status\" checked=\"checked\" onchange='AuthUsers.changeStatus(" + index + "," + rowData + ")' /><i></i></div>";
////                }
////                return returnStr;
////            }
////
////            },
////            {
////                title: "操作", field: 'opt', width: 60, align: 'center',
////                formatter: function (value, row, index) {
////                    var str = "";
////                    var rowData = JSON.stringify(row);
////                    str += "<a class='icon icon-edit' onclick='AuthUsers.showEditDialog(" + rowData + ")'></a>";
////                    str += "<a class=\"icon icon-trash\" onclick='AuthUsers.deleteRow(" + index + "," + rowData + ")'></a>";
////                    str += "<a class=\"icon icon-lock-b\" onclick='AuthUsers.resetPassword(" + index + "," + rowData + ")'></a>";
////                    str += "<a class=\"icon icon-user J_ShowPop J_DataRest\" onclick='AuthUsers.showUserGroupDialog(" + index + "," + rowData + ")'></a>";
////                    return str;
////                }
////            }]];
////
////        gridObj.onLoadSuccess = function () {
////            //newcommonjs.tableAuto(tableList);
////        };
////        return gridObj;
////    },
//
//
//    /* 弹出详情信息框 */
//    showDialog: function (rowData) {
//        var url = this.doViewUrl;
//        $("#authuser_viewForm").load(url, {id: rowData.id, action: "view"}, function () {
//            dialog("authuser_viewForm", {
//                width: 480
//            }, function () {
//                $("#InfoForm").form("load", {
//                    /* input's name attr : data */
//                    userName: rowData.userName,
//                    userNo: rowData.userNo,
//                    id: rowData.id,
//                    displayOrder: rowData.displayOrder,
//                    memo: rowData.memo
//                });
//                $("form input").attr("readonly", "readonly");
//                $("form textarea").attr("readonly", "readonly");
//                $("#editBtn").hide();
//            });
//        });
//
//    },
//
//    /* 新增 */
//    showAddDialog: function () {
//
//        var url = this.doViewUrl;
//        var param = {id: null, action: "add"};
//        $("#authuser_viewForm").load(url, param, function () {
//            dialog("authuser_viewForm", {
//                //width: 480
//                width: 480
//            }, function () {
//                $("#InfoForm").form("load", {
//                    opType: 'add'
//                });
//
//                $("#editUserNo").focus();
//                BasicModule.getAuth('AuthUsers');
//            });
//        });
//    },
//
//
//    //showUserGroupDialog: function (index, rowData) {
//    //    var url = this.doViewUrl;
//    //    var param = {id: rowData.id, action: "userGroup"};
//    //    $("#authuser_userGroupForm").load(
//    //        url, param,
//    //        function () {
//    //            $('#userGroup_userId').val(rowData.id);
//    //            dialog("authuser_userGroupForm", {
//    //                //width: 480
//    //                //width: 600
//    //            }, function () {
//    //                $('#userGroup_tree').datagrid({
//    //                    url: AuthUsers.doExcuteUrl,
//    //                    method: "POST",
//    //                    queryParams: {id: rowData.id, action: "getUserGroupData"},
//    //                    //idField: 'id',
//    //                    //treeField: 'group_name',
//    //                    //selectOnCheck:"false",
//    //                    fitColumns:"true",
//    //                    columns: [[
//    //                        {title: 'checked', field: 'checked', width: '10%',checkbox:'true'},
//    //                        {title: 'id', field: 'id', width: '20%'},
//    //                        {title: 'group_name', field: 'group_name', width: '20%'},
//    //                        {title: 'display_order', field: 'display_order'}
//    //                    ]],
//    //                    loadFilter: function (data) {
//    //                        var json = eval(data);
//    //                        var treeData = new Array();
//    //
//    //                        for (i in json) {
//    //                            treeData[i] = new Object();
//    //                            treeData[i].id = json[i].id;
//    //                            treeData[i].group_name = json[i].group_name;
//    //                            treeData[i].display_order = json[i].display_order;
//    //                            treeData[i].checked = json[i].checked;
//    //                        }
//    //                        return treeData;
//    //                    }
//    //                });
//    //                $('#userGroup_tree').datagrid('reload');
//    //
//    //            });
//    //
//    //        }
//    //    )
//    //
//    //}
//
//    showUserGroupDialog: function (index,rowData) {
//        var url = this.doViewUrl;
//        var param = {id:rowData.id,action:"userGroup"};
//        $("#authuser_userGroupForm").load(
//            url, param,
//            function () {
//                $('#userGroup_userId').val(rowData.id);
//                dialog("authuser_userGroupForm", {
//                    //width: 480
//                    //width: 600
//                }, function () {
//                    $('#userGroup_tree').tree({
//                        url:AuthUsers.doExcuteUrl,
//                        method:"POST",
//                        queryParams:{id:rowData.id,action:"getUserGroupData"},
//                        idField:'id',
//                        checkbox:"true",
//                        textField:'group_name',
//                    //    formatter:function(node){
//                    //    return  "<div class='icon icon-edit''>" + node.text +" </div>" ;
//                    //},
//
//                        loadFilter: function(data){
//                            var json = eval(data);
//                            var treeData =new Array();
//
//                            for( i in json){
//                                treeData[i] = new Object();
//                                treeData[i].id = json[i].id;
//                                treeData[i].text = json[i].group_name;
//                                treeData[i].checked = json[i].checked;
//                                treeData[i].iconCls = "/images/icon/icon.png" ;
//                            }
//                            return treeData;
//                        }
//                    });
//                });
//
//            }
//        )
//
//    }
//    ,
//
//    /* 编辑 */
//    showEditDialog: function (rowData) {
//        if (rowData.status == true) {
//            showMessage('当前选中记录已启用，不允许修改！');
//            return;
//        }
//        var url = this.doViewUrl;
//        var param = {id: rowData.id, action: "update"};
//
//        $("#authuser_viewForm").load(url, param, function () {
//            dialog("authuser_viewForm", {
//                //width: 480
//                width: 480
//            }, function () {
//                $("#InfoForm").form("load", {
//                    /* input's name attr : data */
//                    userName: rowData.userName,
//                    userNo: rowData.userNo,
//                    id: rowData.id,
//                    displayOrder: rowData.displayOrder,
//                    memo: rowData.memo,
//                    opType: 'edit'
//
//                });
//                $("#editUserNo").focus();
//            });
//        });
//    },
//
//    /* 保存按钮事件 */
//    updateAuthUsers: function (opType) {
//        var url = this.doUpdateUrl;
//        //防止重复提交
//        $("#editBtn").attr("disabled", true);
//        formTextTrim("InfoForm");
//        if (!this.validateSave()) {
//            $("#editBtn").attr("disabled", false);
//            return;
//        }
//        var data = $("#InfoForm").serialize();
//        if (opType == "add") {
//            data += "&action=add";
//        }
//        else if (opType == "edit") {
//            data += "&action=update";
//            //是否有过变更
//            if (!formIsDirty("InfoForm")) {
//                $("#authuser_viewForm").hide();
//                return false;
//            }
//        }
//
//        $.ajax({
//            url: url,
//            type: 'POST',
//            data: data,
//            success: function (data) {
//                if (opType == "add") {
//                    AuthUsers.dataGrid.gridObj.pageNumber = 1;
//                    AuthUsers.dataGrid.datagrid('reload', {
//                        searchStr: '',
//                        status: '',
//                        sort: '2'
//
//                    });
//                } else {
//                    resolutionData(data);
//                    AuthUsers.dataGrid.datagrid('reload');
//
//                }
//                $("#editBtn").attr("disabled", false);
//                $("#authuser_viewForm").hide();
//            },
//            "error": function () {
//                $("#editBtn").attr("disabled", false);
//            }
//        });
//    },
//
//
//    /* 删除行 */
//    deleteRow: function (index, rowData) {
//        var id = rowData.id;
//        var status = rowData.status;
//        if (status == true) {
//            showMessage('当前选中记录已启用，不允许删除！');
//            return;
//        }
//        $.messager.confirm("提示", "你确定要删除吗?", function (r) {
//            if (r) {
//                //alert(id);
//                $.ajax({
//                    url: AuthUsers.doDelUrl,
//                    type: 'POST',
//                    data: {
//                        id: id
//                    },
//                    success: function (data) {
//                        resolutionData(data);
//                        AuthUsers.dataGrid.datagrid('reload');
//
//                    },
//                    error: function () {
//
//                    }
//                });
//            }
//        });
//    },
//
//    //保存修改的权限
//    saveUserGroup: function (userId, groupIds) {
//        $("#authUser_btnSave").attr("disable", false);
//
//        $.ajax({
//            url: AuthUsers.doExcuteUrl,
//            type: 'POST',
//            //dataType: "json",
//            data: {
//                userId: userId,
//                groupIds: JSON.stringify(groupIds),
//                action: 'saveUserGroup'
//            },
//            success: function (data) {
//                resolutionData(data);
//                $("#authUser_btnSave").attr("disable", false);
//                $("#authuser_userGroupForm").hide();
//            },
//            error: function () {
//                $("#authUser_btnSave").attr("disable", false);
//            }
//        });
//
//    }
//    ,
//
//
//    /* 启用、停用状态 */
//    changeStatus: function (index, rowData) {
//        var id = rowData.id;
//        var status = rowData.status;
//
//        $.ajax({
//            url: AuthUsers.doUpdateUrl,
//            type: 'POST',
//            data: {
//                action: 'changeStatus',
//                id: id,
//                status: status
//            },
//            success: function (data) {
//                resolutionData(data);
//                AuthUsers.dataGrid.datagrid('reload');
//
//            },
//            error: function () {
//
//            }
//        });
//
//    },
//    resetPassword: function (index, rowData) {
//        var id = rowData.id;
//        var status = rowData.status;
//        showConfirm('是否重置密码为[111111]?', function () {
//	        $.ajax({
//	            url: AuthUsers.doUpdateUrl,
//	            type: 'POST',
//	            data: {
//	                action: 'resetPassword',
//	                id: id,
//	                status: status
//	            },
//	            success: function (data) {
//	                resolutionData(data);
//	                //AuthUsers.dataGrid.datagrid('reload');
//	            },
//	            error: function () {
//
//	            }
//	        });
//        });
//
//    },
//
//
//    /* 验证保存的必填条件 */
//    validateSave: function () {
//        var name = $.trim($("#editUserNo").val());
//        var displayOrderId = "editDisplayOrder";
//        if (name == '') {
//            showMessage('用户账号为空，请重新输入！');
//            $("#editName").focus();
//            return false;
//        }
//        if (validateDisplayOrder(displayOrderId)) {
//            return false;
//        }
//        return true;
//
//    },
//
//    updatePassword: function () {
//
//        var oldPassword = $("#up_oldPassword").val();
//        var newPassword = $("#up_newPassword").val();
//        var reNewPassword = $("#up_reNewPassword").val();
//        if (oldPassword == null || oldPassword == "") {
//            showMessage("请输入旧密码");
//            this.clearUpdatePassword();
//            return;
//        }
//        if (newPassword == null || newPassword == "") {
//            showMessage("请输入密码");
//            this.clearUpdatePassword();
//            return;
//        }
//        if (reNewPassword == null || reNewPassword == "") {
//            showMessage("请输入确认密码");
//            this.clearUpdatePassword();
//            return;
//        }
//        if (newPassword != reNewPassword) {
//            showMessage("两次新密码不一致，请重新输入！");
//            this.clearUpdatePassword();
//            return;
//        }
//        $.ajax({
//            url: ctx + "/auth/user/doUpdatePW",
//            type: "POST",
//            data: {oldPassword: oldPassword, newPassword: newPassword},
//            success: function (data) {
//                AuthUsers.clearUpdatePassword();
//                resolutionData(data);
//            },
//            error: function () {
//            }
//        });
//    },
//
//    ui_submit: function () {
//        var loginSysId = $("#ui_loginSysId").val();
//        var loginOrgId = $("#ui_loginOrgId").val();
//        var loginSysName = $("#ui_loginSysName").val();
//        var loginOrgName = $("#ui_loginOrgName").val();
//        showConfirm('是否确定提交？', function () {
//            $.ajax({
//                url: ctx + "/auth/user/doSaveUserInfo",
//                type: "POST",
//                data: {
//                    loginSysId: loginSysId,
//                    loginOrgId: loginOrgId,
//                    loginSysName: loginSysName,
//                    loginOrgName: loginOrgName
//                },
//                success: function (data) {
//                    resolutionData(data);
//                },
//                error: function () {
//                }
//            });
//        });
//
//    },
//
//    clearUpdatePassword: function () {
//        $("#up_oldPassword").val("");
//        $("#up_newPassword").val("");
//        $("#up_reNewPassword").val("");
//    }
//
//
//}

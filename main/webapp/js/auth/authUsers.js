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
        _telePage =  ctx + "/auth/user/telephone",
        _saveMobile = ctx + "/auth/user/doSaveUserMobile",
        _unConnect = ctx + "/auth/user/doClearUserMobile",
        _checkMobile = ctx + "/auth/user/mobileIfExisted "

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
        searchHold: CB.SEARCHHOLDER.USERMEANAGEMENT,

        validateSave: function() {
        
        	 var userNo = $("#editUserNo").val().toLowerCase();
             if(userNo!='' && userNo.indexOf('admin')>0){
             	  BM.showMessage("账号中不能含有“admin”关键字");
                   return false;
             }
            return true;
        },

        validateBox: function() {

            //$("input[name='userNo']").validatebox({
            //    validType: ['symbol','authUser'],
            //    required:true
            //});
            $("input[name='userNo']").attr('maxlength','45');

            //for 一般用户
            $("#editUserNo").validatebox({
               validType: ['symbol','customer','account'],
                required:true
            });

            //for 管理员
            $("#userNo").validatebox({
                validType: ['symbol','authUser'],
                required:true
            });

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
                validType:  ['symbol','length[0,150]']
            });
            $("#editMemo").attr('maxlength','150');
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

            //if (rowData.status == 1) {
            //    BM.showMessage("状态启用，不允许分配角色");
            //    return;
            //}

            var params = {
                data: {id: rowData.id, opType: "userGroup"},
                height: 700,
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
        },

        //电话绑定
        telephone: function() {
            //console.log("telephone");
            var
                mobile = $("#mobileMain").val(),
                reg = /^(?:13\d|14\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/,
                params = {
                    url: _telePage,
                    focusId: "mobile",
                    callback: function () {
                        var
                            userName = $("#userName").val(),
                            startTime = localStorage.getItem(userName),
                            msgGet = $("#getpasscode"),
                            enterTime = Math.round(new Date().getTime()/1000),
                            limitTime = enterTime - startTime,       //已过的时间
                            msgSecond = 180 - limitTime;             //剩余时间

                        $("#mobile").val(mobile);
                        if ( msgSecond >= 0 ) {
                            time(msgGet,msgSecond);
                            $("#mobile").attr("readonly","readonly");
                        }
                    }
                };

            if( mobile == "" || mobile == null ) {
                BM.showMessage("请填入手机号码");
                return;
            }

            if	(!reg.test(mobile)) {
                //$("#errorMsg").html('*请输入正确的手机号码！');
                showMessage("请输入正确的手机号码!");
                return;
            }

            //进行手机号码验证
            $.ajax({
                type: "POST",
                url:_checkMobile,
                data: {mobile: mobile},
                success: function(data) {
                    var next = BM.resolutionData(data);
                    if (next) {
                        BM.commonPop(params);
                    }
                }
            });

        },

        //绑定
        saveMobile: function() {

            var passCode = $("#passCode").val();
            if(passCode ==  null || passCode ==""){
                BM.showMessage("请输入验证码");
                return;
            }

            $.ajax({
                type: "POST",
                url: _saveMobile,
                data:{
                    mobile:$("#mobile").val(),
                    passcode:passCode
                },
                success: function(data) {
                    var hide = BM.resolutionData(data);
                    if(hide){
                        $("#"+CB.POPDIV).hide();
                        $("#mobileMain").attr("readonly","readonly");
                        $("#mobileMain").val($("#mobile").val());
                        $("#unconnect").show();
                        $("#connect").hide();
                    }

                }
            });
        },
        //解绑
        unConnect: function() {

            showConfirm("是否确认解绑!", function () {
                $.ajax({
                    type: "POST",
                    url: _unConnect,
                    success: function(data) {
                        var hide = BM.resolutionData(data);
                        if(hide){
                            $("#mobileMain").val("");
                            $("#mobileMain").removeAttr("readonly");
                            $("#unconnect").hide();
                            $("#connect").show();
                        }

                    }
                })
            })

        }


    });

    return AuthUsers;

}(jQuery));

$(function(){
    AuthUsers.init();
});

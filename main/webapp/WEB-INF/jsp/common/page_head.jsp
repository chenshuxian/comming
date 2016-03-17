<%@ page language="java" pageEncoding="utf-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <link href="${ctx}/css/combobox.css" rel="stylesheet"/>
    <link href="${ctx}/scripts/jalert/jquery.alerts.css" rel="stylesheet">
    <link href="${ctx}/css/css.css" rel="stylesheet"/>
    <link href="${ctx}/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="${ctx}/css/easyui.css" rel="stylesheet"/>

    <script src="${ctx}/js/jquery-2.1.4.min.js"></script>
    <%--<script src="${ctx}/js/jquery-migrate-1.1.1.js"></script>--%>
    <script src="${ctx}/js/jquery.easyui.min.js?v=1.0.0.2"></script>
    <script src="${ctx}/js/easyui-lang-zh_CN.js"></script>
    <%--<script src="${ctx}/scripts/jalert/jquery.ui.draggable.js"></script>--%>
    <script src="${ctx}/scripts/jalert/jquery.alerts.js"></script>
    <script src="${ctx}/js/jquery.page.js"></script>
    <script src="${ctx}/js/public.js"></script>
    <script src="${ctx}/scripts/common.js?v=1.0.0.1"></script>
    <script src="${ctx}/js/backspace_common.js"></script>
    <script src="${ctx}/js/common.js?v=1.0.0.27"></script>
    <script src="${ctx}/js/screenfull.min.js"></script>
    <script src="${ctx}/js/newcommon.js?v=1.0.0.1"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <script src="${ctx}/js/jquery.slimscroll.min.js"></script>
    <script src="${ctx}/js/datagrid-cellediting.js"></script>


    <script type="text/javascript">
        $(function () {
            disableBackspace();
        });
        var ctx = "<%=request.getContextPath()%>";
        var basePath = "<%=request.getScheme()%>" + "://" + "<%=request.getServerName()%>" + ":" + "<%=request.getServerPort()%>";
        /**
         * 普通提示信息
         * @param msg 提示信息
         * @param callback 回调函数
         */
        function showMessage(msg, callback) {
            if (callback) {
                jAlert(msg, '提示信息', callback);
            } else {
                jAlert(msg, '提示信息');
            }
        }
        /*
         * 确认框的提示信息
         * @param msg 提示信息
         * @param callback 回调函数
         */
        function showConfirm(msg, callback) {
            jConfirm(msg, '确认信息', function (choice) {
                if (choice) {
                    if (callback) {
                        callback();
                    }
                }else{
                    $("#editBtn").attr("disabled", false);
                }
            });
        }
        /**
         * @param msg Ajax返回的信息
         */
        function resolutionData(msg) {
            if (msg != "" && msg != null) {
                var err = msg.indexOf("err|");
                var info = msg.indexOf("info|");
                var data = msg.indexOf("data|");
                var succ = msg.indexOf("succ|");
                if (err == 0) {
                    showMessage(msg.substring(4));
                    $("#editBtn").attr("disabled", false);
                    return;
                }
                if (info == 0) {
                    var mess = msg.substring(5);
                    if (mess.indexOf("成功") != -1) {
                        $.messager.show({
                            title: '提示',
                            msg: msg.substring(5),
                            timeout: 2000,
                            showType: 'slide'
                        });
                    } else {
                        showMessage(mess, "提示信息");
                    }

                    return;
                }
                if (data == 0) {
                    return msg.substring(5);
                }
                if (succ == 0) {
                    $.messager.show({
                        title: '提示',
                        msg: msg.substring(5),
                        timeout: 2000,
                        showType: 'slide'
                    });
                }
            } else {
                showMessage("获取数据异常！");
            }
        }
        function errorHandle(XMLHttpRequest) {
            var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
            if (sessionstatus == "timeout") {
                parent.location.href = ctx + "/home";
            }
            var errirstatus = XMLHttpRequest.getResponseHeader("error");
            if (errirstatus == "true") {
                jAlert("系统错误,请联系管理员.", "提示信息");
            }
        }
        $.ajaxSetup({
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            beforeSend: function (XMLHttpRequest) {

            },
            error: function (xhr, status, error) {
            },
            complete: function (XMLHttpRequest, textStatus) {
                errorHandle(XMLHttpRequest);
            }
        });

        /**传入input id
         *@param msg 提示信息
         * @param callback 回调函数
         *验证通过返回true,验证不通过返回false
         */
        function validateDisplayOrder(displayOrderId) {
            var displayOrder = $("#" + displayOrderId).val();
            var re = /^[0-9]*[0-9][0-9]*$/;
            if (displayOrder != '' && (isNaN(displayOrder) || !re.test(displayOrder))) {
                showMessage('顺序号必须为大于或等于零的整数，请重新输入！', function () {
                    $("#" + displayOrderId).focus();
                });
                return true;
            } if (displayOrder > 999999) {
                showMessage('顺序号不能大于999999，请重新输入！', function () {
                    $("#" + displayOrderId).focus();
                });
                return true;
            } else {
                return false;
            }
        }
        //验证打印次序
        function validatePrintOrder(obj) {
            var printOrder = obj.val();
            var re = /^[0-9]*[0-9][0-9]*$/;
            if (printOrder != '' && printOrder != '0' && (isNaN(printOrder) || !re.test(printOrder))) {
                showMessage('打印次序必须为大于零的整数，请重新输入！', function () {
                    obj.focus();
                });
                return true;
            } else {
                return false;
            }
        }

        var isCancel = false;
        function checkSpecialSymbol(id, regular, msg, comfirmId, cancelId) {
            console.log("GGGGGG");
            var obj = $("#" + id);
            var value = obj.val();
            if (cancelId == "") {
                cancelId = "cancelId";
            }
            if (comfirmId == "") {
                comfirmId = "comfirmId";
            }
            //当id内容为空时不做处理
            if (obj == null) {
                $("#" + comfirmId).attr("disabled", false);
                $("#inputDivErrMsg").html("");
                $("#inputDivErrMsg").hide();
                return;
            }
            $("#" + cancelId).click(function () {
                isCancel = true;
            });
            //点击取消按钮时不做处理
            if (isCancel) {
                isCancel = false;
                $("#" + comfirmId).attr("disabled", false);
                $("#inputDivErrMsg").html("");
                $("#inputDivErrMsg").hide();
                return;
            }
            var flag = isNaN(regular) && regular.test(value);
            //内容不包含特殊符号时不做处理
            if (!flag) {
                $("#" + comfirmId).attr("disabled", false);
                $("#inputDivErrMsg").html("");
                $("#inputDivErrMsg").hide();
                return;
            }
            var top = obj.offset().top;
            var left = obj.offset().left;
            $("body").append("<div id=\"inputDivErrMsg\" style=\"color:red;padding:5px;display:none;text-align:left;position:absolute;background-color:#fafafa ;z-index:999999;border:1px solid #AAAAAA;\"></div>")
            $("#" + comfirmId).attr("disabled", true);
            $("#inputDivErrMsg").css("top", top + 32).css("left", left);
            $("#inputDivErrMsg").html(msg);
            $("#inputDivErrMsg").show();
            $("#" + id).focus();
            setTimeout(function () {
                closeInputDivErrMsg(id, regular, comfirmId)
            }, 1000);
        }
        function closeInputDivErrMsg(id, regular, comfirmId) {
            var obj = $("#" + id);
            var value = obj.val();
            if (isNaN(regular) && regular.test(value)) {
                return;
            }
            $("#" + comfirmId).attr("disabled", false);
            $("#inputDivErrMsg").html("");
            $("#inputDivErrMsg").hide();
        }

        /*
         * xuan.js控件，给checkbox绑定click事件
         * 参数为列表行TR的id
         */
        function bindXuanClick(obj) {
            $("#" + obj + " a").unbind("click").click(function () {
                var cla = $("#" + obj + " a").attr("class");
                if (cla == "not") {
                    $("#" + obj + " a").removeClass("not").addClass("yes");
                    $("#" + obj + " a").parent().parent().addClass("cur");

                } else {
                    $("#" + obj + " a").removeClass("yes").addClass("not");
                    $("#" + obj + " a").parent().parent().removeClass("cur");
                }
            });
        }
        function openWin(url) {
            window.open(url);
        }
    </script>
    <script src="${ctx}/js/input_common.js"></script>
</head>

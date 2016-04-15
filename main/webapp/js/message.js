/*
 * 2016/03/31
 * easyui message Module
 * 作者: chenshuxian
 * 功能：进行后台资讯处理
 */
var message;

message = (function($,BM){



    $.extend(BM,{

        resolutionData: function(msg) {
            if (msg != "" && msg != null) {
                var err = msg.indexOf("err|");
                var info = msg.indexOf("info|");
                var data = msg.indexOf("data|");
                var succ = msg.indexOf("succ|");
                if (err == 0) {
                    showMessage(msg.substring(4));
                    $("#editBtn").attr("disabled", false);
                    return false;
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
                return true;
            } else {
               // showMessage("获取数据异常！");
            	 return true;
            }

            return true;
        },

        showMessage: function(msg, callback) {
           // $.messager.alert("提示",msg);
            if (callback) {
                jAlert(msg, '提示', callback);
            } else {
                jAlert(msg, '提示');
            }
        }


    });

    return BM;


}(jQuery,BasicModule));

//$(function(){
//	validate.init();
//});
/**
 * Created by Administrator on 2016/3/31.
 */

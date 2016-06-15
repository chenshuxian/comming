/**
 * Created by chenshuxian on 2016/5/18.
 * 权限管理中心
 * 依登入时后台传入的权限数据进行管理
 */

var BasicModule = (function ($,BM) {


    /*
    2016/05/18
    chenshuxian
    权限控制:
        依权限清单进行权限配置
        添加及删除选中直接进行hide
        状态、修改、删除，由于是在grid中
        所以会回传相对映的字串，然后在
        gridColumns.js 中进行过滤
     */

    BM.checkAuth = function (preId) {
        var
            authStr = $("#authStr").val(),
            //authStr = "",
            str = "";

        switch (preId) {

            //标本类型
            case "sy":
            case "SpecimenType":

                if (authStr.indexOf("1010101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010102") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010103") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010104") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010105") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;
            //检验方法
            case "tm":
            case "TestMethod":

                if (authStr.indexOf("1010201") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010202") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010203") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010204") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010205") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;
            //医学专业组
            case "mpg":
            case "Discipline":

                if (authStr.indexOf("1010301") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010302") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010303") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010304") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010305") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;
            //病理大类
            case "pc":
            case "PathologyCategory":

                if (authStr.indexOf("1010401") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010402") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010403") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010404") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010405") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;
            //标本状态
            case "ss":
            case "SpecimenStatus":

                if (authStr.indexOf("1010501") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010502") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010503") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010504") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010505") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //就诊类型
            case "dy":
            case "TreatmentType":

                if (authStr.indexOf("1010601") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010602") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010603") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010604") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010605") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //结果单位
            case "ru":
            case "ResultUnit":

                if (authStr.indexOf("1010701") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010702") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010703") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010704") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010705") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //结果类型
            case "rt":
            case "ResultType":

                if (authStr.indexOf("1010801") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010802") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010803") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010804") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010805") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //试管类型
            case "tt":
            case "TubeTypes":

                if (authStr.indexOf("1010901") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1010902") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1010903") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1010904") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1010905") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //地区维护
            case "reg":

                if (authStr.indexOf("1011001") == -1) {

                    $("#regaddBrotherBtn").hide();
                }
                if (authStr.indexOf("1011002") == -1) {

                    $("#regaddchildrenBtn").hide();
                }
                if (authStr.indexOf("1011003") == -1) {

                    $("#regupdataBtn").hide();
                }
                if (authStr.indexOf("1011004") == -1) {

                    $("#regdelBtn").hide();
                }


                break;

            //医疗机构维护
            case "med":
            case "MED":

                if (authStr.indexOf("3010101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("3010102") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("3010103") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("3010104") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("3010105") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //独立实验室
            case "idl":
            case "Indenpent":

                if (authStr.indexOf("3010201") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("3010202") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("3010203") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("3010204") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("3010205") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //区域管理机构维护
            case "rmm":
            case "RegionalManagement":

                if (authStr.indexOf("3010301") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("3010302") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("3010303") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("3010304") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("3010305") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //LOINC字典
            //受检成份
            case "si":
            case "SubjectIngredient":

                if (authStr.indexOf("1020101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1020102") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1020103") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1020104") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1020105") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //受检属性
            case "sp":
            case "SubjectProperty":

                if (authStr.indexOf("1020201") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1020202") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1020203") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1020204") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1020205") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //样本标识
            case "sl":
            case "SpecimenLogo":

                if (authStr.indexOf("1020301") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1020302") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1020303") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1020304") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1020305") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //时间特征
            case "tc":
            case "TimeCharacteristic":

                if (authStr.indexOf("1020401") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1020402") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1020403") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1020404") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1020405") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //LOINC编码表
            case "cl":
            case "CtrLoinc":

                if (authStr.indexOf("1020501") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1020502") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1020503") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1020504") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1020505") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //检验项目
            case "ti":
            case "TestItem":

                if (authStr.indexOf("1030101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1030102") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1030103") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1030104") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1030105") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                if (authStr.indexOf("1030106") == -1) {
                    $("#" + preId + "download").hide();
                }
                return str;
                break;

            //组合项目
            case "tig":
            case "testItemGroupMain":

                if (authStr.indexOf("1030201") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1030202") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1030203") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1030204") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1030205") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //细菌字典
            case "bd":
            case "BacteriaDictionary":

                if (authStr.indexOf("1040101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1040102") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1040103") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1040104") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1040105") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //抗生素字典
            case "ad":
            case "AntibioticDictionary":

                if (authStr.indexOf("1040201") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1040202") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1040203") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1040204") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1040205") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //中心仪器信息
            case "ins":
            case "Inst":

                if (authStr.indexOf("2010101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("2010102") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("2010103") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("2010104") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("2010105") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                return str;
                break;

            //中心仪器细菌对照
            case "imr":
            case "CtrInstrMics":

                if (authStr.indexOf("2020201") == -1) {
                    //添加细菌
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("2020202") == -1) {
                    //删除选中
                    $("#" + preId + "DeleteBatch").hide();
                }
                if (authStr.indexOf("2020203") == -1) {
                    //保存修改
                    $("#" + preId + "Save").hide();
                }
                if (authStr.indexOf("2020204") == -1) {
                    //抗生素
                    $("#" + preId + "Add2").hide();
                }
                if (authStr.indexOf("2020205") == -1) {
                    //删除选中抗
                    $("#" + preId + "DeleteBatch2").hide();
                }
                if (authStr.indexOf("2020206") == -1) {
                    //保抗生
                    $("#" + preId + "Save2").hide();
                }
                return str;
                break;

            //中心仪器项目对照
            case "irr":
            case "CtrInstrItem2":

                if (authStr.indexOf("2030301") == -1) {

                    //添加检验项目
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("2030302") == -1) {

                    //删除选中
                    $("#" + preId + "DeleteBatch").hide();
                }
                if (authStr.indexOf("2030303") == -1) {

                    //保存修改
                    $("#" + preId + "Save").hide();

                }
                if (authStr.indexOf("2030304") == -1) {

                    //添加项目参考值
                    $("#" + preId + "Add2").hide();
                }
                if (authStr.indexOf("2030305") == -1) {

                    //删除选中项目参考值
                    $("#" + preId + "DeleteBatch2").hide();
                }
                if (authStr.indexOf("2030306") != -1) {

                    //复制
                    str += "copy,";
                }
                if (authStr.indexOf("2030307") != -1) {

                    //编辑项目参考值
                    str += "edit,";
                }
                if (authStr.indexOf("2030308") != -1) {

                    //删除项目参考值
                    str += "del";
                }

                console.log(str);
                return str;
                break;

            //客户盒子登记
            //case "cib":
            //case "CtrInstrBoxs":
            //
            //    if (authStr.indexOf("1050401") != -1) {
            //        str += "status,";
            //    }
            //    if (authStr.indexOf("1050402") != -1) {
            //        str += "edit,";
            //    }
            //    if (authStr.indexOf("1050403") != -1) {
            //        str += "del";
            //    }
            //    if (authStr.indexOf("1050404") == -1) {
            //        $("#" + preId + "Add").hide();
            //    }
            //    if (authStr.indexOf("1050405") == -1) {
            //        $("#" + preId + "DeleteBatch").hide();
            //    }
            //    return str;
            //    break;

            //客户仪器信息
            //case "ii":
            //case "Instruments":
            //
            //    if (authStr.indexOf("1050501") != -1) {
            //        str += "status,";
            //    }
            //    if (authStr.indexOf("1050502") != -1) {
            //        str += "edit,";
            //    }
            //    if (authStr.indexOf("1050503") != -1) {
            //        str += "del";
            //    }
            //    if (authStr.indexOf("1050504") == -1) {
            //        $("#" + preId + "Add").hide();
            //    }
            //    if (authStr.indexOf("1050505") == -1) {
            //        $("#" + preId + "DeleteBatch").hide();
            //    }
            //    if (authStr.indexOf("1050506") == -1) {
            //        $("#" + preId + "Add2").hide();
            //    }
            //    return str;
            //    break;

            //中心报表模板维护
            case "ct":
            case "CtrTemplate":

                if (authStr.indexOf("1050101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("1050102") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("1050103") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("1050104") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("1050105") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                if (authStr.indexOf("1050106") != -1) {
                    //上传模板
                   str += "upload,"
                }
                if (authStr.indexOf("1050107") != -1) {
                    //下载模板
                    str += "download"
                }
                return str;
                break;

            //客户报表模板维护
            case "cst":
            case "CusTemplate":

                if (authStr.indexOf("3020201") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("3020202") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("3020203") != -1) {
                    str += "del";
                }
                if (authStr.indexOf("3020204") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("3020205") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }
                if (authStr.indexOf("3020206") != -1) {
                    str += "upload,"
                }
                if (authStr.indexOf("3020207") != -1) {
                    str += "download,"
                }
                if (authStr.indexOf("3020208") == -1) {
                    $("#" + preId + "Add2").hide();
                }
                return str;
                break;


            //机构系统管理
            case "oi":
            case "OrgInit":

                if (authStr.indexOf("3020101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("3020102") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("3020103") != -1) {
                    //设置管理员
                    str += "setAdmin,";
                }
                if (authStr.indexOf("3020104") != -1) {
                   //系统初始化
                    str += "init";
                }

                return str;
                break;

            //用户管理
            case "authUsers":
            case "AuthUsers":

                if (authStr.indexOf("4010101") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("4010102") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("4010103") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("4010104") != -1) {
                    //分配角色
                    str += "dist";
                }

                return str;
                break;

         /*   //个人信息
            case "personal":

                if (authStr.indexOf("2020201") == -1) {
                    $("#" + preId + "Btn").hide();
                }
                break;

            //修改密码
            case "updatePw":

                if (authStr.indexOf("2020301") == -1) {
                    $("#" + preId + "Btn").hide();
                }
                break;
*/

            //角色管理
            case "rm":
            case "UserGroupsMain":

                if (authStr.indexOf("4010201") != -1) {
                    str += "status,";
                }
                if (authStr.indexOf("4010202") != -1) {
                    str += "admit,";
                }
                if (authStr.indexOf("4010203") != -1) {
                    str += "edit,";
                }
                if (authStr.indexOf("4010204") != -1) {
                    str += "del,";
                }
                if (authStr.indexOf("4010205") == -1) {
                    $("#" + preId + "Add").hide();
                }
                if (authStr.indexOf("4010206") == -1) {
                    $("#" + preId + "DeleteBatch").hide();
                }

                return str;
                break;

            //中心管理日志
            case "logQ":

                if (authStr.indexOf("4020101") == -1) {
                    $("#" + preId + "Export").hide();
                }

                return str;
                break;

            default:
                return "allDeny";
                break;

        }

    };

    return BM;

} (jQuery,BasicModule));
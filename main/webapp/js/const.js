/**
 * Created by jacky on 2016/2/7.
 */

var CB,ConstBox;
CB = ConstBox = (function($){

    const ConstBox = {
        METHOD: "POST",
        POPDIV: "ctrDictInfoModal",
        DELSUCC: "succ|刪除成功!",
        COLMAXLEN: 15,
        HEIGHT:($(window).height() - 232) / 2,
        LOCALHOST: window.location.host,
        VERSION: "V1.0.0.0",

        PREID:{
            //就诊类型
            DY: "dy",
            //科室信息
            HI: "hi",
            //病区信息
            IAI: "iai",
            //医生信息
            DI: "di",
            //实验室专业组
            LG: "lg",
            //医学专业组
            MPG: "mpg",
            //标本类型
            SY: "sy",
            //标本狀態
            SS: "ss",
            //检验方法,
            TM: "tm",
            //结果单位
            RU:"ru",
            //结果类型
            RT: "rt",
            //试管
            TT: "tt",
            //檢驗項目
            TI: "ti",
            //規則公式
            RF: "rf",
            //組合項目
            GI: "gi",
            //申請項目對照
            IR: "ir",
            //細菌字典
            MD: "md",
            //病理大类
            PC: "pc",
            //逻辑编码表
            LGM: "lgm",
            //地區維護
            REG: "reg",
            //受检成份
            SI: "si",
            //受检属性
            SP: "sp",
            //样本标识
            SL: "sl",
            //时间特征
            TC: "tc",
            //loinc编码表
            CL: "cl",
            //centerOrg
            MED: "med",
            //中心仪器信息
            INS: "ins",
            //用户管理
            AU: "authUsers",
            //角色管理
            RM: "rm",
            //细菌字典
            BD: "bd",
            //日志查询
            LOGQ: "logQ",
            //独立实验事
            IDL: "idl",
            //抗生素字典
            AD: "ad",
            //客戶盒子登記
            BOX: "box",
            //区域机构管理
            RMM: "rmm",
            //客户盒子登记
            CIB: "cib",
            //组合项目
            TIG: "tig",
            //中心仪器细菌对照
            IMR: "imr",
            //中心仪器项目对照
            IRR: "irr",
            //客户仪器信息
            II: "ii",
            //机构系统初始化
            OI: "oi",
            //中心报表模板
            CT: "ct",
            //客户报表模板
            CST: "cst"
        },

        //查询提示字串
        SEARCHHOLDER: {
            COMMON: "编码\\中文名称\\英文简称\\英文名称\\助记符",
            RESULTTYPE: "编码\\中文名称",     //结果类型
            LOGICTABLE: "编码\\受检成份\\受检属性\\检验方法\\样本标识\\时间特征\\标本类型\\助记符",      //罗辑编码表
            TEMPLATE: "编码\\模板名称",     //中心报表,机构报表模板维护
            CENTERINSTR: "编码\\仪器名称\\仪器型号\\助记符",     //中心仪器信息
            MED: "编码\\卫生机构代码\\所属地区\\中文名称\\中文地址\\联系人\\联系电话\\助记符",     //医疗机构维护
            INDEPENDT: "编码\\所属地区\\中文名称\\中文地址\\联系人\\联系电话\\助记符",     //独立实验室维护
            AREAMANAGEMENT: "编码\\中文名称\\中文地址\\联系人\\联系电话\\助记符",     //区域管理机构维护
            USERMEANAGEMENT: "用户帐号\\用户名称",       //用户管理
            ROLE: "编码\\名称",         //角色管理
            LOG: "操作项目\\操作类型\\操作内容\\操作人"       //中心日志管理
        },

        COMBOMSG: {
            SAMPLETYPE: "默认标本类型",
            COMPONENT: "受检成份",
            TESTPROPERTY: "受检属性",
            TESTMETHOD: "检验方法",
            TESTITEM: "样本标识",
            TIMEASPECT: "时间特征",
            UNIT: "单位",
            DISCIPLINE: "医学专业",
            RESULTTYPE: "结果类型"
        }


    };

    return ConstBox;

}(jQuery));

package com.daan.domain;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.daan.util.PropertiesUtil;

/**
 * @ClassName: Constant 常量类
 * @Description: 
 * TODO(注意：常量先缀命名规划为单词缩写，) 
 * TODO(		1.RMC：RequestMappingClass类级别的请求通符) 
 * TODO(		2.RMM: RequestMappingMethod方法请求通符)
 * @author Wumingjava
 * @date 2015年11月26日 上午11:17:17
 */
public class Constant {
	public static final String XXXXXXX = "";
	public final static String SESSION_KEY = "SESSION_KEY";
	public final static String GET_REQUEST = "GET";
	public final static String POST_REQUEST = "POST";
	
	// 删除操作有外键关联报异常功能的相关常量
	public final static String CONFIG_PATH = Thread.currentThread().getContextClassLoader().getResource("").getPath() + "config/fktables-config.xml";
	public final static String FK_TABLE_KEY = "fk_table";
	public final static long TIMES = 30;
	public final static TimeUnit TIME_UNIT = TimeUnit.DAYS;
	// 数据缓存接口常量
	public final static int EXPIRED_TIME = 20;
	public final static String PREFIX_KEY = "comming_";
	
	//日志状态-转义
	public final static String STATUS_FORMAT = "状态";
	//日志是否状态-转义
	public final static String YESORNOSTATUS_FORMAT = "是否状态";
	//日志是否状态-转义
	public final static String SEXTYPE_FORMAT = "性别";
	//日志-操作类型
	public final static String OPERATION_ADD = "新增";
	public final static String OPERATION_EDIT = "修改";
	public final static String OPERATION_DETELE = "删除";
	//----------登录--wmm---2015-12-09--------------
	public final static String JSP_LOGIN="/WEB-INF/jsp/common/login.jsp";
	public final static String JSP_MAIN="/WEB-INF/jsp/common/main.jsp";
	public final static String JSP_LEFT="/WEB-INF/jsp/common/left.jsp";
	public final static String REDIRECT_MAIN = "redirect:/main";
	public final static String SYS_PROPERTYNAME ="ctr";
	public final static String SYS_DEFAULT_ORG ="default_org";
	public final static String SYS_DEFAULT_APP = "default_app";
	/**
	 * 所有业务表CODE编码对应该的编号：
	 * -------------------------------------------------------------------
	 * 特别注意：
	 * 前面01~29是预留给基础字典的类型，所以，之后新增的模块请在48后进行增加。
	 * 01 样本类型   标本类型
	 * 02 检验方法   检验方法
	 * 03 医学专业组  医学专业组
	 * 04 病理大类  病理大类
	 * 05 受检成分  受检成份
	 * 06 受检属性  受检属性
	 * 07 样本标识  标本标识
	 * 08 时间特征  时间特征
	 * 09 标本状态  标本状态
	 * 10 就诊类型  就诊类型
	 * 11 结果单位  结果单位
	 * -------------------------------------------------------------------
	 * 30 结果类型 
	 * 33 试管类型 
	 * 34 LOINC编码表 
	 * 35 检验项目 
	 * 36 组合项目 
	 * 37 细菌字典 
	 * 38 抗生素字典 
	 * 39 地区维护 
	 * 40 医疗机构维护 
	 * 41 独立实验室维护 
	 * 42 中心仪器信息 
	 * 43 中心仪器对照 
	 * 44 中心仪器细菌对照 
	 * 45 客户仪器信息 
	 * 46 客户仪器项目对照 
	 * 47 客户仪器细菌对照
	 * 48 中心报告模板 
	 * 49 用户管理控制器
	 * 50 系统信息设置
	 * 51区域管理机构维护
	 * 52客户盒子登记
	 * 53角色管理
	 */
	public final static String MODULE_USER = "用户";
	// 接口访问地址
	public final static String MODULE_TESTITEM = "检验项目";
	public final static String ENTITY_TESTITEM = "检验项目";
	//public final static String CODE_TESTITEM = "35";
	public final static int MODULEID_TESTITEM = 35;
	public final static String TABLE_NAME_TESTITEM = "ctr_test_items";
	
	public final static String MODULE_GROUP_TESTITEM = "组合项目";
	public final static String ENTITY_GROUP_TESTITEM = "组合项目";
	public final static int MODULEID_GROUP_TESTITEM = 36;
	public final static String MODULE_LOCDICTCODES = "本地基础字典";
	public final static String ENTITY_LOCDICTCODES = "本地基础字典明细表";
	public final static int MODULEID_LOCDICTCODES = 1;
	public static final String RMM_LOCDICTCODES_PAGELIST = "/locDictCodesPageList";
	//启用或停用
	public static final String RMM_LOCDICTCODES_DIDABLEORENABLE = "/locDictCodesDisableOrEnable";
	
	/**
	 * 获取service类级请求通符 
	 * @param rMClass
	 * @return
	 */
	public final static String serviceRMClass(String rMClass) {
		return SERVICE + rMClass;
	}
	/**
	 * 获取访问userService的url
	 * @param rMClass
	 * @return
	 */
	public final static String userServiceURL(String rMClass, String rMMethod) {
		return USER_URI + serviceRMClass(rMClass) + rMMethod;
	}
	/**
	 * 获取访问service的url
	 * @param rMClass
	 * @return
	 */
	public final static String serviceURL(String rMClass, String rMMethod) {
		return SERVICE_URI + serviceRMClass(rMClass) + rMMethod;
	}
	// 公共接口访问地址
	public static final String SERVICE_URI = PropertiesUtil.get("comming","SERVICE_URI");
	public static final String USER_URI = PropertiesUtil.get("comming","USER_URI");
	public static final String SERVICE = "/service";
	
	//37 微生物(zhoujie)--------开始(2015-12-16)-------
	public final static String MODULE_CTRMICITEMS = "中心微生物字典";
	public final static String ENTITY_CTRMICITEMS = "中心微生物";
	public final static int MODULEID_CTRMICITEMS = 37;
	public final static String TABLENAME_CTRMICITEMS = "ctr_mic_items";
	//39 地区(wuming)--------开始(2015-11-26)-------
	public final static String ENTITY_CTRREGIONS = "地区字典";
	public final static String MODULE_CTRREGIONS = "地区维护";
	public final static String JSP_CTRREGIONSMAIN = "/WEB-INF/jsp/org/ctrRegionsMain.jsp";
	public final static int CODE_CTRREGIONS = 39;
	public final static long CTRREGIONS_CHINA_ID = 111111111111111111L;
	public final static String JSP_CTRREGIONSADD = "/WEB-INF/jsp/org/ctrRegionsAdd.jsp";
	//42 中心仪器(zhoujie)--------开始(2015-11-26)-------
	public final static String MODULE_CTRINSTRUMENTS = "中心仪器信息";
	public final static String MODULE_CTRINSTR_PARAMS = "中心仪器通讯参数信息";
	public final static String ENTITY_CTRINSTRUMENTS = "中心仪器";
	public final static String ENTITY_CTRINSTR_PARAMS = "中心仪器通讯参数";
	public final static int MODULEID_CTRINSTRUMENTS = 42;
	public final static String TABLENAME_CTRINSTRUMENTS = "ctr_instruments";
	//43 中心仪器项目对照(zhoujie)--------开始(2015-11-26)-------
	public final static String MODULE_CTRINSTRUMENTS_ITEM = "中心仪器项目对照";
	public final static String ENTITY_CTRINSTRUMENTS_ITEM = "中心仪器项目对照";
	public final static int MODULEID_CTRINSTRUMENTS_ITEM = 43;
	public final static String TABLENAME_CTRINSTRUMENTS_ITEM = "ctr_instr_items";
	public final static String MODULE_INSTRUMENTSITEM = "仪器关联项目管理";
	public final static String ENTITY_INSTRUMENTSITEM = "仪器关联项目表";
	//44 中心仪器细菌对照(zhoujie)--------开始(2015-12-16)-------
	public final static String MODULE_CTRINSTRUMENTS_MICS = "中心仪器细菌对照";
	public final static String ENTITY_CTRINSTRUMENTS_MICS = "中心仪器细菌对照";
	public final static String MODULE_CTRINSTRUMENTS_ANTI = "中心仪器抗生素对照";
	public final static String ENTITY_CTRINSTRUMENTS_ANTI = "中心仪器抗生素对照";
	public final static int MODULEID_CTRINSTRUMENTS_MICS = 44;
	public final static String TABLENAME_CTRINSTRUMENTS_MICS = "ctr_instr_mics";
	public final static String MODULE_INSTRUMENTSMICS = "仪器关联微生物管理";
	public final static String ENTITY_INSTRUMENTSMICS = "仪器关联微生物表";
	
	
	//29 中心报告模板(zhoujie)--------开始(2015-12-01)-------
	public final static String MODULE_CTRREPORT_TEMPLATES = "中心报告模板";
	public final static String CODE_CTRREPORT_TEMPLATES = "29";
	//46 客户仪器项目对照 (谢瑞云)
	public final static String MODULE_INSTRUMENTS_ITEM = "客户仪器项目对照";
	public final static int MODULEID_INSTRUMENTS_ITEM = 46;
	/*
	 * 类级请求
	 */
	//public static final String RMC_COMMON = "/common";
	public static final String RMC_CTRREGIONS = "/ctrRegions";
	public static final String RMC_CTRINSTRUMENTS = "/inst/ctrInstruments";
	public static final String RMC_CTRINSTRUMENTSITEM = "/inst/ctrInstrumentsItem";
	public static final String RMC_CTRINSTRUMENTSMICS = "/inst/ctrInstrumentsMics";
	public static final String RMC_LOCDICTCODES = "basisDict/locDictCodes";
	public static final String RMM_LOCDICTCODES_LOCDICTCODELIST = "/locdictCodesList";
	/*
	 * 方法请求
	 */
	//公共
	public static final String RMM_MAXDISPLAYORDER = "/getMaxDisplayOrder";
	public static final String MAX_ORDER = "999999";
	//地区
	public static final String RMM_CTRREGIONSMAIN = "/ctrRegionsMain";
	public static final String RMM_NAMEREPEAT = "/nameRepeat";
	public static final String RMM_SAVECTRREGIONS = "/saveCtrRegions";
	public static final String RMM_LOADCTRREGIONSBYID = "/loadCtrRegionsById";
	public static final String RMM_GETCODENO = "/getCodeNo";
	public static final String RMM_DELCTRREGIONS="/delCtrRegions";
	public static final String RMM_INITCTRREGIONSTREE = "/initCtrRegionsTree";
	public static final String RMM_LOADCTRREGIONSTREE = "/loadCtrRegionsTree";
	public final static String RMM_MOVECTRREGIONS = "/moveCtrRegions";
	//中心仪器
	public static final String RMM_CTRINSTRUMENTS_MAIN = "/ctrInstrumentsMain";//进入主页面
	public static final String RMM_CTRINSTRUMENTS_PAGE_LIST = "/ctrInstrumentsPageList";//分页查询列表
	public static final String RMM_CTRINSTRUMENTS_INFO = "/ctrInstrumentsInfo";//进入中心仪器基本信息页面
	public static final String RMM_CTRINSTRUMENTS_PARAMS_INFO = "/ctrInstrumentsParamsInfo";//进入中心仪器通讯参数基本信息页面
	public static final String RMM_CTRINSTRUMENTS_INFO_RTLIST= "/ctrInstrumentsInfoRtList"; //查询报告模板列表
	public static final String RMM_CTRINSTRUMENTS_INFO_STLIST= "/ctrInstrumentsInfoStList"; //查询标本类型列表
	public static final String RMM_CTRINSTRUMENTS_ADD = "/ctrInstrumentsAdd";//新增
	public static final String RMM_CTRINSTRUMENTS_EDIT = "/ctrInstrumentsEdit";//修改
	public static final String RMM_CTRINSTRUMENTS_PRAMS_EDIT = "/ctrInstrumentsParamsEdit";//修改
	public static final String RMM_CTRINSTRUMENTS_IFEDIT = "/ctrInstrumentsIfEdit";//检查是否可修改
	public static final String RMM_CTRINSTRUMENTS_IFEXISTED = "/ctrInstrumentsIfExisted";//检查是否有同名
	public static final String RMM_CTRINSTRUMENTS_ENABLE = "/ctrInstrumentsEnable";//启用
	public static final String RMM_CTRINSTRUMENTS_DISABLE = "/ctrInstrumentsDisable";//停用
	public static final String RMM_CTRINSTRUMENTS_DIDABLEORENABLE = "/ctrInstrumentsDisableOrEnable"; //2016/1/16启用或停用
	public static final String RMM_CTRINSTRUMENTS_DELETE = "/ctrInstrumentsDelete";//删除
	public static final String RMM_CTRINSTRUMENTS_DELETE_BATCH = "/ctrInstrumentsDeleteBatch";//批量删除
	
	//中心仪器项目对照
	public static final String RMM_CTRINSTRUMENTSITEM_MAIN = "/ctrInstrumentsItemMain";//进入主页面
	public static final String RMM_CTRINSTRUMENTSITEM_LIST_MAIN = "/ctrInstrumentsItemListMain";//进入项目对照列表主页面
	public static final String RMM_CTRINSTRUMENTSITEM_LIST = "/ctrInstrumentsItemList";//查询对照列表
	public static final String RMM_CTRINSTRUMENTSITEM_REF_LIST = "/ctrInstrumentsItemRefrangeList";//查询参考值列表
	public static final String RMM_CTRINSTRUMENTSITEM_SAVE = "/ctrInstrumentsItemSave";//项目对照列表的保存
	public static final String RMM_CTRINSTRUMENTSITEM_REF_INFO = "/ctrInstrumentsItemRefrangeInfo";//进入参考值基本信息页面
	public static final String RMM_CTRINSTRUMENTSITEM_REF_IFOVERLAP = "/ctrInstrumentsItemIfOverlap";//检查年龄段是否重叠
	public static final String RMM_CTRINSTRUMENTSITEM_REF_ADD = "/ctrInstrumentsItemRefrangeAdd";//新增参考值
	public static final String RMM_CTRINSTRUMENTSITEM_REF_EDIT = "/ctrInstrumentsItemRefrangeEdit";//新增参考值
	public static final String RMM_CTRINSTRUMENTSITEM_REF_DELETE = "/ctrInstrumentsItemRefrangeDelete";//删除参考值
	public static final String RMM_CTRINSTRUMENTSITEM_REF_DELETE_BATCH = "/ctrInstrumentsRegrangeDeleteBatch";//批量删除参考值
	public static final String RMM_CTRINSTRUMENTSITEM_DELETE_BATCH = "/ctrInstrumentsItemDeleteBatch";//批量删除项目
	public static final String RMM_CTRINSTRUMENTSITEM_ADD_MAIN = "/ctrInstrumentsItemAddMain";//进入项目添加页面
	public static final String RMM_CTRINSTRUMENTSITEM_ADD_LEFT = "/ctrInstrumentsItemAddLeft";//项目添加页面，左侧已包含项目列表
	public static final String RMM_CTRINSTRUMENTSITEM_ADD_RIGHT_MAIN = "/ctrInstrumentsItemAddRightMain";//项目添加页面，右侧未包含项目列表初始化
	public static final String RMM_CTRINSTRUMENTSITEM_ADD_RIGHT_LIST = "/ctrInstrumentsItemAddRightList";//项目添加页面，右侧未包含项目列表查询
	public static final String RMM_CTRINSTRUMENTSITEM_ADD_BATCH = "/ctrInstrumentsItemAddBatch";//批量添加项目
	
	//中心仪器细菌对照
	public static final String RMM_CTRINSTRUMENTSMICS_MAIN = "/ctrInstrumentsMicsMain";//进入主页面
	public static final String RMM_CTRINSTRUMENTSMICS_LIST_MAIN = "/ctrInstrumentsMicsListMain";//进入细菌、抗生素对照列表主页面
	public static final String RMM_CTRINSTRUMENTSMICS_LIST = "/ctrInstrumentsMicsList";//查询细菌、抗生素对照列表
	public static final String RMM_CTRINSTRUMENTSMICS_SAVE = "/ctrInstrumentsMicsSave";//细菌、抗生素对照列表的保存
	public static final String RMM_CTRINSTRUMENTSMICS_DELETE_BATCH = "/ctrInstrumentsMicsDeleteBatch";//批量删除细菌、抗生素

	public static final String RMM_CTRINSTRUMENTSMICS_ADD_MAIN = "/ctrInstrumentsMicsAddMain";//进入细菌、抗生素添加页面
	public static final String RMM_CTRINSTRUMENTSMICS_ADD_LEFT = "/ctrInstrumentsMicsAddLeft";//微生物添加页面，左侧已包含细菌、抗生素列表
	public static final String RMM_CTRINSTRUMENTSMICS_ADD_RIGHT_MAIN = "/ctrInstrumentsMicsAddRightMain";//微生物添加页面，右侧未包含细菌、抗生素列表初始化
	public static final String RMM_CTRINSTRUMENTSMICS_ADD_RIGHT_LIST = "/ctrInstrumentsMicsAddRightList";//微生物添加页面，右侧未包含细菌、抗生素列表查询
	public static final String RMM_CTRINSTRUMENTSMICS_ADD_BATCH = "/ctrInstrumentsMicsAddBatch";//批量添加细菌、抗生素
	
	//19 地区--------结束-------
	
	//40 医疗机构维护 (zhangliping)--------开始(2015-12-07)-------
	public final static String MODULE_CENTERORG_MEDICALINSTITUTIONS = "医疗机构维护";
	
	public final static int MODULEID_CENTERORG_MEDICALINSTITUTIONS = 40;
	//医疗机构维护-跳转页面MAP
	public final static HashMap<String, String> CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP = new HashMap<String, String>();
	static {
			CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP.put("main", "/WEB-INF/jsp/org/medicalInstitutions/medicalInstitutionsMain.jsp");
			CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP.put("list", "/WEB-INF/jsp/org/medicalInstitutions/medicalInstitutionsList.jsp");
			CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP.put("add", "/WEB-INF/jsp/org/medicalInstitutions/medicalInstitutionsAdd.jsp");
			CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP.put("edit", "/WEB-INF/jsp/org/medicalInstitutions/medicalInstitutionsEdit.jsp");
			CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP.put("view", "/WEB-INF/jsp/org/medicalInstitutions/medicalInstitutionsView.jsp");
			//CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP.put("code", CODE_CENTERORG_MEDICALINSTITUTIONS);//-获取CODE使用
			CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP.put("module", MODULE_CENTERORG_MEDICALINSTITUTIONS);//-模块
		   }
	//40 医疗机构维护 (zhangliping)--------结束(2015-12-07)-------
	
	//41 独立实验室维护 (zhangliping)--------开始(2015-12-09)-------
	public final static String MODULE_CENTERORG_INDEPENDENTLABORATORY = "独立实验室维护";
//	public final static int CODE_CENTERORG_INDEPENDENTLABORATORY = 41;
	public final static int MODULEID_CENTERORG_INDEPENDENTLABORATORY = 41;
	//独立实验室维护 -跳转页面MAP
	public final static HashMap<String, String> CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP = new HashMap<String, String>();
	static {
			CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP.put("main", "/WEB-INF/jsp/org/independentLaboratory/independentLaboratoryMain.jsp");
			CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP.put("list", "/WEB-INF/jsp/org/independentLaboratory/independentLaboratoryList.jsp");
			CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP.put("add", "/WEB-INF/jsp/org/independentLaboratory/independentLaboratoryAdd.jsp");
			CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP.put("edit", "/WEB-INF/jsp/org/independentLaboratory/independentLaboratoryEdit.jsp");
			CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP.put("view", "/WEB-INF/jsp/org/independentLaboratory/independentLaboratoryView.jsp");
			//CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP.put("code", CODE_CENTERORG_INDEPENDENTLABORATORY);//-获取CODE使用
			CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP.put("module", MODULE_CENTERORG_INDEPENDENTLABORATORY);//-模块
			}
	public final static Map<Integer, HashMap<String, String>> CENTERORG_MODULE_MAP = new HashMap<Integer, HashMap<String, String>>();
    static {
    	CENTERORG_MODULE_MAP.put(MODULEID_CENTERORG_MEDICALINSTITUTIONS, CENTERORG_MEDICALINSTITUTIONS_MODULE_MAP);  //40-医疗机构
    	CENTERORG_MODULE_MAP.put(MODULEID_CENTERORG_INDEPENDENTLABORATORY, CENTERORG_INDEPENDENTLABORATORY_MODULE_MAP);  //41-独立实验室	
    }
	//41 独立实验室维护  (zhangliping)--------结束(2015-12-09)-------
	
	//中心机构单位   (zhangliping)--------开始(2015-12-07)-------
	public final static String ENTITY_CENTERORG = "中心机构单位";
	public final static String MODULE_CENTERORG = "中心机构单位";
	public final static int MODULEID_CENTERORG = 40;
	public final static String TABLENAME_CTRORGS = "ctr_orgs";
	// 类级请求
	public static final String RMC_CENTERORG = "/org/centerOrg";
	public static final String RMM_CENTERORG_MAIN = "/centerOrgMain";//初始界面
	public static final String RMM_CENTERORG_PAGE_LIST = "/centerOrgPageList";//分页查询列表
	public static final String RMM_CENTERORG_USER_LIST ="/centerOrgUserList";
	public static final String RMM_CENTERORG_POPUPINFOLIST = "/orgPopUpInfoList";//机构弹出框列表
	public static final String RMM_CENTERORG_INFO = "/centerOrgInfo";//进入查询基本信息页面
	public static final String RMM_CENTERORG_INFO_RTLIST = "/centerOrgInfoRtList"; //查询地区名称列表
	public static final String RMM_CENTERORG_DIDABLEORENABLE = "/centerOrgDisableOrEnable";//启用或停用
	public static final String RMM_CENTERORG_ADD = "/centerOrgAdd";//新增
	public static final String RMM_CENTERORG_EDIT = "/centerOrgEdit";//修改
	public static final String RMM_CENTERORG_DELETE = "/centerOrgDelete";//删除
	public static final String RMM_CENTERORG_DELETE_BATCH = "/centerOrgDeleteBatch";//批量删除
	public static final String RMM_CENTERORG_NAME_IFEXISTED = "/centerOrgIfExisted";//检查是否有同名
	public static final String RMM_CENTERORG_NACAOID_IFEXISTED = "/checkNacaoIdExisted";//检查是否同卫生机构代码
	public static final String MODULE_CENTERORG_POPUPINFOLIST = "/WEB-INF/jsp/org/independentLaboratory/orgPopUp.jsp";//机构弹出框列表
	//中心机构单位 (zhangliping)--------结束(2015-12-09)-------
	

	//区域管理机构维护(zhangliping)--------开始(2015-12-28)-------
	public final static String ENTITY_CENTERORGRELATIONS = "行政机构关系关联";
	public final static String MODULE_CENTERORGRELATIONS = "区域管理机构维护";
	public final static int MODULEID_CENTERORGRELATIONS = 51;
	public final static int CENTERORG_PAGE_NUMBER = 5;
	public static final String RMC_CENTERORG_MANAGEMENT = "/org/regionalManagement";
	public static final String RMM_CENTERORG_MANAGEMENT_MAIN = "/regionalManagementMain";//初始界面
	public static final String RMM_CENTERORG_MANAGEMENT_PAGE_LIST = "/regionalManagementPageList";//分页查询列表
	public static final String RMM_CENTERORG_RELATED_LIST = "/relatedList";//包含的机构List页面
	public static final String RMM_CENTERORG_MANAGEMENT_INFO = "/regionalManagementInfo";//进入查询基本信息页面
	public static final String RMM_ADD_CENTERORG_SHOW = "/addRelatedRegionalShow";//添加机构想弹出页面
	public static final String RMM_CENTERORG_MANAGEMENT_DIDABLEORENABLE = "/regionalManagementDisableOrEnable";//启用或停用
	public static final String RMM_CONTAIN_REGIONAL_LIST = "/containRegionalList";//机构包含的机构页面
	public static final String RMM_NO_CONTAIN_REGIONAL_MAIN = "/noContainRegionalMain";//机构包含的机构页面
	public static final String RMM_NO_CONTAIN_REGIONAL_LIST = "/noContainRegionalList";//机构包含的机构页面
	public static final String RMM_CENTERORG_MANAGEMENT_DELETE_BATCH = "/regionalManagementDeleteBatch";//批量删除行政机构
	public static final String RMM_CENTERORG_MANAGEMENT_DELETE_ITEM_BATCH = "/regionalManagementDelItemBatch";//批量删除关联的机构
	public static final String RMM_CENTERORG_MANAGEMENT_DELETE = "/regionalManagementDelete";//删除行政机构
	public static final String RMM_CENTERORG_MANAGEMENT_DELETE_ITEM = "/regionalManagementDelItem";//删除关联的机构
	public static final String RMM_CENTERORG_REGION_LIST = "/regionList"; //查询地区名称列表
	public static final String RMM_CENTERORG_MANAGEMENT_NAME_IFEXISTED = "/regionalManagementIfExisted";//检查是否有同名
	public static final String RMM_CENTERORG_MANAGEMENT_ADD = "/regionalManagementAdd";//新增
	public static final String RMM_CENTERORG_MANAGEMENT_EDIT = "/regionalManagementEdit";//修改
	public static final String RMM_CENTERORG_MANAGEMENT_ADD_BATCH = "/regionalManagementItemAddBatch";//批量添加项目
	//区域管理机构维护(zhangliping)--------结束(2015-12-28)-------
	
	//日志查询   (zhangliping)--------开始(2015-12-10)-------
	public final static int TIME_NUMBER = 15;
	public static final String RMC_LOGQUERY = "/sys/logQuery";
	public static final String RMM_LOGQUERY_MAIN = "/logQueryMain";//进入主页面
	public static final String DEMO_LOGQUERY_MAIN = "/WEB-INF/jsp/sys/logQuery/logQueryMain.jsp";//主页面jsp
	public static final String RMM_LOGQUERY_PAGE_LIST = "/logQueryPageList";//分页查询列表
	public static final String DEMO_LOGQUERY_PAGE_LIST = "/WEB-INF/jsp/sys/logQuery/logQueryList.jsp";//查询列表jsp
	public static final String RMM_EXPORT_LOGQUERY_EXCEL = "/exportLogQueryExcel";//导出
	//日志查询 (zhangliping)--------结束(2015-12-10)-------
	
	//检测项目start
	//类级请求
	public static final String RMC_HOME = "/home";
	public static final String RMC_TESTITEM = "/pm/testItem";
	public final static String ENTITY_TESTITEMS = "本地项目库";
	//方法请求
	public static final String RMM_LOGIN = "/login";
	public static final String RMM_LEFT = "/left";
	public static final String RMM_LOGOUT = "/logout";
	public static final String RMM_TESTITEMINFO = "/testItemMain";
	public static final String RMM_FINFBYDICTCODE = "/findByDictCode";
	public static final String RMM_SAVEOREDITTESTITEM = "/saveOrEditTestItem";
	public static final String RMM_PAGEQUERYTESTITEMS = "/pageQueryTestItems";
	public static final String RMM_TESTITEMLIST = "/testItemList";
	public static final String RMM_QUERY_TESTITEM_EDIT = "/queryTestItemToID";
	public static final String RMM_DELETETESTIEM = "/deleteTestItem";
	public static final String RMM_MODIFY_TESTITEM_STATUS = "/modifyTestItemStatus";
	public static final String RMM_QUERY_TESTITEM = "/queryTestItem";
	public static final String RMM_FIND_COUNT = "/findCount";
	public static final String RMM_EXPORT_TESTITEM_EXCEL = "/exportTestItemExcel";
	//检测项目end
	//组合项目 start
	//类级请求
	public static final String RMC_TESTITEM_GROUP = "/pm/testItemGroup";
	//方法请求
	public static final String RMM_TESTITEM_GROUP_MAIN = "/testItemGroupMain";//组合项目首页
	public static final String RMM_TESTITEM_GROUP_LIST = "/testItemGroupList";//组合List页面
	public static final String RMM_SINGLEITEM_LIST = "/singleItemList";//组合包含的项目List页面
	public static final String RMM_SHOW_ADDOREDIT = "/shwoAddOrEdit";//组合修改添加弹出页面
	public static final String RMM_QUERY_TESTITEM_GROUP = "/queryTestItemGroup";//查询组合项目
	public static final String RMM_SAVEOREDIT_TESTITEM_GROUP = "/saveOrEditTestItemGroup";//保存组合项目
	public static final String RMM_ADD_SINGLEITEM_SHOW = "/addSingleItemShow";//添加组合想弹出页面
	public static final String RMM_CONTAINLIST = "/containList";//组合包含的项目页面
	public static final String RMM_NOT_CONTAINLIST = "/notContainList"; // 组合未包含的项目页面
	public static final String RMM_NOT_CONTAINLIST_MAIN = "notContainListMain";//组合未包含的项目首页面
	public static final String RMM_ADD_OR_REMOVE_ITEM = "/addOrRemoveItem"; //添加删除组合单项
	public static final String RMM_DELETE_SINGLEITEM = "/delSingleItem"; //删除组合单项
	public static final String RMM_DELETE_SINGLEITEM_BATCH = "/delSingleItemBatch";//批量删除组合单项
	public static final String RMM_QUERY_BY_STATUS = "/queryByStatus";//根据状态查询
	//组合项目 end
	
	//客户仪器项目对照 start
	//类级请求
	public static final String RMC_INSTRUMENTS_ITEM = "/inst/instrumentsItem";
	
	//方法请求
	public static final String RMM_INSTRUMENTS_ITEM_MAIN = "/instrumentsItemMain";//客户仪器项目对照主页面
	public static final String RMM_INSTRUMENTSITEM_LIST_MAIN = "/instrumentsItemListMain";//进入项目对照列表主页面
	public static final String RMM_INSTRUMENTSITEM_LIST = "/instrumentsItemList";//查询仪器项目对照列表
	public static final String RMM_INSTRUMENTS_ADD_TESTITEM_MAIN = "/instrumentsAddTestItemMain";//显示添加检验项目首页
	public static final String RMM_INSTRUMENTS_ITEM_CONTAINLIST = "/instrumentsItemContainList";//显示已选择机构仪器下已包含的项目列表
	public static final String RMM_INSTRUMENTS_ITEM_NOT_CONTAINLIST_MAIN = "/instrumentsItemNotContainListMain";//已选择机构仪器下未包含的项目Main主页面
	public static final String RMM_INSTRUMENTS_ITEM_NOT_CONTAINLIST = "/instrumentsItemNotContainList";//已选择机构仪器下未包含的项目列表
	public static final String RMM_INSTRUMENTS_ITEM_ADD_OR_REMOVE = "/addOrRemoveInstrumentsItem";//添加删除仪器对照项目
	//客户仪器项目对照 end
	
	
	public static final String DICTIONARY_RESULTUNITLIST = SERVICE_URI + "/service/resultUnit/resultUnitList";

	// -------微生物的细菌、抗生素仪器通道(zengxiaowang)----- start
	public final static int INSTRMICS_PAGE_NUMBER = 5;
	public final static int MODULEID_INSTRMICS = 47;
	public final static String MODULE_INSTRMICS = "微生物的细菌、抗生素仪器通道";
	public final static String ENTITY_INSTRMICS = "微生物的细菌、抗生素仪器通道";

	public final static String TABLENAME_INSTRMICS = "instr_mics";
	// controller类级请求
	public static final String RMC_INSTRMICS = "inst/instrMics";

	// 初始界面
	public static final String RMM_INSTRMICS_MAIN = "/instrMicsMain";
	// 抗生素数据列表
	public static final String RMM_INSTRMICS_PAGELIST = "/instrMicsPageList";
	// 明细
	public static final String RMM_INSTRMICS_INFO = "/instrMicsInfo";
	// 明细
	public static final String RMM_INSTRMICS_NOTADDITEMS = "/queryInstrMicsNoAddItems";
	
	// 新增
	public static final String RMM_INSTRMICS_ADD = "/instrMicsAdd";
	// 修改
	public static final String RMM_INSTRMICS_EDIT = "/instrMicsEide";
	// 删除
	public static final String RMM_INSTRMICS_DELETE = "/instrMicsDelete";
	// 批量删除
	public static final String RMM_INSTRMICS_DELETE_BATCH = "/instrMicsDeleteBatch";
	// 验证名称是否重复
	public static final String RMM_INSTRMICS_IFEXISTED = "/checkChannelCodeExisted";

	// -首页
	public final static String DEMO_INSTRMICS_MAIN = "/WEB-INF/jsp/inst/instrMicsMain.jsp";
	// -详细数据列表
	public final static String DEMO_INSTRMICS_PAGELIST = "/WEB-INF/jsp/inst/instrMicsList.jsp";
	// -新增
	public final static String DEMO_INSTRMICS_ADD = "/WEB-INF/jsp/inst/instrMicsAdd.jsp";
	// -修改
	public final static String DEMO_INSTRMICS_EDIT = "/WEB-INF/jsp/inst/instrMicsEdit.jsp";
	
	// 抗生素数据列表
	public static final String RMM_INSTRMICSANTI_PAGELIST = "/instrMicsAntiPageList";
	// 明细
	public static final String RMM_INSTRMICSANTI_INFO = "/instrMicsAntiInfo";
	// 新增
	public static final String RMM_INSTRMICSANTI_ADD = "/instrMicsAntiAdd";
	// 修改
	public static final String RMM_INSTRMICSANTI_EDIT = "/instrMicsAntiEide";
	// 删除
	public static final String RMM_INSTRMICSANTI_DELETE = "/instrMicsAntiDelete";
	// 批量删除
	public static final String RMM_INSTRMICSANTI_DELETE_BATCH = "/instrMicsAntiDeleteBatch";
	// -首页
	public final static String DEMO_INSTRMICSANTI_MAIN = "/WEB-INF/jsp/inst/instrMicsAntiMain.jsp";
	// -详细数据列表
	public final static String DEMO_INSTRMICSANTI_PAGELIST = "/WEB-INF/jsp/inst/instrMicsAntiList.jsp";
	// -新增
	public final static String DEMO_INSTRMICSANTI_ADD = "/WEB-INF/jsp/inst/instrMicsAntiAdd.jsp";
	// -修改
	public final static String DEMO_INSTRMICSANTI_EDIT = "/WEB-INF/jsp/inst/instrMicsAntiEdit.jsp";

	// --------------微生物的细菌、抗生素仪器通道---------- END
	
	// -------结果类型(zengxiaowang)----- start
	public final static int PAGE_NUMBER = 10;
	
	public final static int RESULTYTYPE_PAGE_NUMBER = 5;
	public final static int MODULEID_CTRRESULTTYPES = 30;
	public final static String MODULE_CTRRESULTTYPES = "结果类型";
	public final static String ENTITY_CTRRESULTTYPES = "结果类型";
	
	public final static HashMap<String, String> MODULE_CTRRESULTTYPES_MODULE_MAP = new HashMap<String, String>();
	static {
		MODULE_CTRRESULTTYPES_MODULE_MAP.put("module", MODULE_CTRRESULTTYPES);//-模块
	}
	public final static String TABLENAME_CTRRESULTTYPES = "ctr_result_types";
	// controller类级请求
	public static final String RMC_CTRRESULTTYPES = "basisDict/ctrResultTypes";

	// 初始界面
	public static final String RMM_CTRRESULTTYPES_MAIN = "/ctrResultTypesMain";
	// 详细数据列表
	public static final String RMM_CTRRESULTTYPES_PAGELIST = "/ctrResultTypesPageList";
	// 明细
	public static final String RMM_CTRRESULTTYPES_INFO = "/ctrResultTypesInfo";
	// 新增
	public static final String RMM_CTRRESULTTYPES_ADD = "/ctrResultTypesAdd";
	// 修改
	public static final String RMM_CTRRESULTTYPES_EDIT = "/ctrResultTypesEdit";
	// 删除
	public static final String RMM_CTRRESULTTYPES_DELETE = "/ctrResultTypesDelete";
	// 批量删除
	public static final String RMM_CTRRESULTTYPES_DELETE_BATCH = "/ctrResultTypesDeleteBatch";
	// 启用或停用
	public static final String RMM_CTRRESULTTYPES_DIDABLEORENABLE = "/ctrResultTypesDisableOrEnable";
	// 验证名称是否重复
	public static final String RMM_CTRRESULTTYPES_IFEXISTED = "/checkNameExisted";
	//根据状态查询
	public static final String RMM_CTRRESULTTYPES_QUERYBYSTATUS = "/queryByStatus";

	// -首页
	public final static String DEMO_CTRRESULTTYPES_MAIN = "/WEB-INF/jsp/basisDict/ctrResultTypesMain.jsp";
	// -详细数据列表
	public final static String DEMO_CTRRESULTTYPES_PAGELIST = "/WEB-INF/jsp/basisDict/ctrResultTypesList.jsp";
	// -新增
	public final static String DEMO_CTRRESULTTYPES_ADD = "/WEB-INF/jsp/basisDict/ctrResultTypesAdd.jsp";
	// -修改
	public final static String DEMO_CTRRESULTTYPES_EDIT = "/WEB-INF/jsp/basisDict/ctrResultTypesEdit.jsp";
	// -明细
	public final static String DEMO_CTRRESULTTYPES_VIEW = "/WEB-INF/jsp/basisDict/ctrResultTypeView.jsp";
	
	
	public final static String MODULE_CTRRESULTTYPESDETAIL = "结果类型[结果描述]";
	public final static String ENTITY_CTRRESULTTYPESDETAIL = "结果类型[结果描述]";
	public final static String TABLENAME_CTRRESULTTYPEDETAIL = "ctr_result_type_details";
	// controller类级请求
	public static final String RMC_CTRRESULTTYPEDETAIL = "basisDict/ctrResultTypeDetail";

	// 初始界面
	public static final String RMM_CTRRESULTTYPEDETAIL_MAIN = "/ctrResultTypeDetailMain";
	// 详细数据列表
	public static final String RMM_CTRRESULTTYPEDETAIL_PAGELIST = "/ctrResultTypeDetailPageList";
	// 明细
	public static final String RMM_CTRRESULTTYPEDETAIL_INFO = "/ctrResultTypeDetailInfo";
	// 新增
	public static final String RMM_CTRRESULTTYPEDETAIL_ADD = "/ctrResultTypeDetailAdd";
	// 修改
	public static final String RMM_CTRRESULTTYPEDETAIL_EDIT = "/ctrResultTypeDetailEdit";
	// 删除
	public static final String RMM_CTRRESULTTYPEDETAIL_DELETE = "/ctrResultTypeDetailDelete";
	// 批量删除
	public static final String RMM_CTRRESULTTYPEDETAIL_DELETE_BATCH = "/ctrResultTypeDetailDeleteBatch";
	// 启用或停用
	public static final String RMM_CTRRESULTTYPEDETAIL_DIDABLEORENABLE = "/ctrResultTypeDetailDisableOrEnable";
	// 验证名称是否重复
	public static final String RMM_CTRRESULTTYPEDETAIL_IFEXISTED = "/checkNameExisted";

	// -首页
	//public final static String DEMO_CTRRESULTTYPEDETAIL_MAIN = "/WEB-INF/jsp/basisDict/ctrResultTypeDetailMain.jsp";
	// -详细数据列表
	public final static String DEMO_CTRRESULTTYPEDETAIL_PAGELIST = "/WEB-INF/jsp/basisDict/ctrResultTypeDetailList.jsp";
	// -新增
	public final static String DEMO_CTRRESULTTYPEDETAIL_ADD = "/WEB-INF/jsp/basisDict/ctrResultTypeDetailAdd.jsp";
	// -修改
	public final static String DEMO_CTRRESULTTYPEDETAIL_EDIT = "/WEB-INF/jsp/basisDict/ctrResultTypeDetailEdit.jsp";
	
	
	// --------------结果类型---------- END
	
	//---------------试管类型---------- start
	public final static String MODULE_CTRTUBETYPES = "试管类型";
	public final static int MODULEID_CTRTUBETYPES = 33;
	public final static String ENTITY_CTRTUBETYPES = "试管类型";
	public final static String TABLENAME_CTRTUBETYPES = "ctr_tube_types";
	// controller类级请求
	public static final String RMC_CTRTUBETYPES = "basisDict/ctrTubeTypes";

	// 初始界面
	public static final String RMM_CTRTUBETYPES_MAIN = "/ctrTubeTypesMain";
	// 详细数据列表
	public static final String RMM_CTRTUBETYPES_PAGELIST = "/ctrTubeTypesPageList";
	// 明细
	public static final String RMM_CTRTUBETYPES_INFO = "/ctrTubeTypesInfo";
	// 新增
	public static final String RMM_CTRTUBETYPES_ADD = "/ctrTubeTypesAdd";
	// 修改
	public static final String RMM_CTRTUBETYPES_EDIT = "/ctrTubeTypesEide";
	// 删除
	public static final String RMM_CTRTUBETYPES_DELETE = "/ctrTubeTypesDelete";
	// 批量删除
	public static final String RMM_CTRTUBETYPES_DELETE_BATCH = "/ctrTubeTypesDeleteBatch";
	// 启用或停用
	public static final String RMM_CTRTUBETYPES_DIDABLEORENABLE = "/ctrTubeTypesDisableOrEnable";
	// 验证名称是否重复
	public static final String RMM_CTRTUBETYPES_IFEXISTED = "/checkNameExisted";
	
	//-首页
	public final static String DEMO_CTRTUBETYPES_MAIN = "/WEB-INF/jsp/basisDict/ctrTubeTypesMain.jsp";
	//-详细数据列表
	public final static String DEMO_CTRTUBETYPES_PAGELIST = "/WEB-INF/jsp/basisDict/ctrTubeTypesList.jsp";
	//-新增
	public final static String DEMO_CTRTUBETYPES_ADD = "/WEB-INF/jsp/basisDict/ctrTubeTypesAdd.jsp";
	//-修改
	public final static String DEMO_CTRTUBETYPES_EDIT = "/WEB-INF/jsp/basisDict/ctrTubeTypesEdit.jsp";
	//-查看
	public final static String DEMO_CTRTUBETYPES_VIEW = "/WEB-INF/jsp/basisDict/ctrTubeTypesView.jsp";
	
	//---------------试管类型---------- END
	
	/* 	************************	 基础字典 - 公用部分 - START	zxw	2015-11-26		************************ */
	public final static String MODULE_CTRDICTCODES = "基础字典";
	public final static int MODULEID_CTRDICTCODES = 1;
	public final static String ENTITY_CTRDICTCODES = "中心基础字典明细表";
	public final static String TABLENAME_CTRDICTCODES = "ctr_dict_codes";
	public final static String MODULE_CTRDICTCODES_SPECIMENTYPE = "标本类型";
	public final static int MODULEID_CTRDICTCODES_TESTMETHOD = 2;
	public final static String MODULE_CTRDICTCODES_TESTMETHOD = "检验方法";
	public final static int MODULEID_CTRDICTCODES_DISCIPLINE = 3;
	public final static String MODULE_CTRDICTCODES_DISCIPLINE = "医学专业组";
	public final static int MODULEID_CTRDICTCODES_PATHOLOGYCATEGORY = 4;
	public final static String MODULE_CTRDICTCODES_PATHOLOGYCATEGORY = "病理大类";
	public final static int MODULEID_CTRDICTCODES_SUBJECTINGREDIENT = 5;
	public final static String MODULE_CTRDICTCODES_SUBJECTINGREDIENT = "受检成份";
	public final static int MODULEID_CTRDICTCODES_SUBJECTPROPERTY = 6;
	public final static String MODULE_CTRDICTCODES_SUBJECTPROPERTY = "受检属性";
	public final static int MODULEID_CTRDICTCODES_SPECTIMELOGO = 7;
	public final static String MODULE_CTRDICTCODES_SPECTIMELOGO = "样本标识";	
	public final static int MODULEID_CTRDICTCODES_TIMECHARACTERISTIC = 8;
	public final static String MODULE_CTRDICTCODES_TIMECHARACTERISTIC = "时间特征";
	public final static int MODULEID_CTRDICTCODES_SPECTIMESTATUS = 9;
	public final static String MODULE_CTRDICTCODES_SPECTIMESTATUS = "标本状态";	
	public final static int MODULEID_CTRDICTCODES_TREATMENTTYPE = 10;
	public final static String MODULE_CTRDICTCODES_TREATMENTTYPE = "就诊类型";
	public final static int MODULEID_CTRDICTCODES_UNIT = 11;
	public final static String MODULE_CTRDICTCODES_UNIT = "结果单位";
	
	// controller类级请求
	public static final String RMC_CTRDICTCODES = "/basisDict/ctrDictCodes";
	
	//初始界面
	public static final String RMM_CTRDICTCODES_MAIN = "/ctrDictCodesMain";
	//详细数据列表
	public static final String RMM_CTRDICTCODES_PAGELIST = "/ctrDictCodesPageList";
	//明细
	public static final String RMM_CTRDICTCODES_INFO = "/ctrDictCodesInfo";
	//新增
	public static final String RMM_CTRDICTCODES_ADD = "/ctrDictCodesAdd";
	//修改
	public static final String RMM_CTRDICTCODES_EDIT = "/ctrDictCodesEdit";
	//删除
	public static final String RMM_CTRDICTCODES_DELETE = "/ctrDictCodesDelete";
	//批量删除
	public static final String RMM_CTRDICTCODES_DELETE_BATCH = "/ctrDictCodesDeleteBatch";
	//启用或停用
	public static final String RMM_CTRDICTCODES_DIDABLEORENABLE = "/ctrDictCodesDisableOrEnable";
	//获取编码
	//public static final String RMM_CTRDICTCODES_GETCODENO = "/ctrDictCodesGetCodeNo";
	//验证名称是否重复	
	public static final String RMM_CTRDICTCODES_IFEXISTED = "/checkNameExisted";
	
	//查询基本信息
	//public static final String RMM_CTRDICTCODES_INFO = "/ctrInstrumentsInfo";
	//--------------JSP----------------
	//01.标本类型
	//-首页
	//public final static String DEMO_CTRDICTCODES_SPECTIMETYPE_MAIN = "/WEB-INF/jsp/basisDict/specimenTypeMain.jsp";
	//-详细数据列表
	//public final static String DEMO_CTRDICTCODES_SPECTIMETYPE_PAGE_LIST = "/WEB-INF/jsp/basisDict/specimenTypeList.jsp";
	//-新增
	//public final static String DEMO_CTRDICTCODES_SPECTIMETYPE_ADD = "/WEB-INF/jsp/basisDict/specimenTypeAdd.jsp";
	//-修改
	//public final static String DEMO_CTRDICTCODES_SPECTIMETYPE_EDIT = "/WEB-INF/jsp/basisDict/specimenTypeEdit.jsp";
	//-查看
	//public final static String DEMO_CTRDICTCODES_SPECTIMETYPE_VIEW = "/WEB-INF/jsp/basisDict/specimenTypeView.jsp";
	
	//基础字典-跳转页面MAP
	public final static HashMap<String, String> CTRDICTCODES_SPECIMENTYPE_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_SPECIMENTYPE_MODULE_MAP.put("main", "/WEB-INF/jsp/basisDict/specimenTypeMain.jsp");//-首页
		CTRDICTCODES_SPECIMENTYPE_MODULE_MAP.put("list", "/WEB-INF/jsp/basisDict/specimenTypeList.jsp");//-详细数据列表
		CTRDICTCODES_SPECIMENTYPE_MODULE_MAP.put("add", "/WEB-INF/jsp/basisDict/specimenTypeAdd.jsp");  //-新增
		CTRDICTCODES_SPECIMENTYPE_MODULE_MAP.put("edit", "/WEB-INF/jsp/basisDict/specimenTypeEdit.jsp");//-修改
		CTRDICTCODES_SPECIMENTYPE_MODULE_MAP.put("view", "/WEB-INF/jsp/basisDict/specimenTypeView.jsp");//-查看
		//CTRDICTCODES_SPECIMENTYPE_MODULE_MAP.put("code", CODE_CTRDICTCODES_SPECIMENTYPE);//-获取CODE使用
		CTRDICTCODES_SPECIMENTYPE_MODULE_MAP.put("module", MODULE_CTRDICTCODES_SPECIMENTYPE);//-模块
	}
	//基础字典-检验方法 2015-12-7 liujiawei
	public final static HashMap<String, String> CTRDICTCODES_TESTMETHOD_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_TESTMETHOD_MODULE_MAP.put("main", "/WEB-INF/jsp/basisDict/testMethodMain.jsp");//-首页
		CTRDICTCODES_TESTMETHOD_MODULE_MAP.put("list", "/WEB-INF/jsp/basisDict/testMethodList.jsp");//-详细数据列表
		CTRDICTCODES_TESTMETHOD_MODULE_MAP.put("add", "/WEB-INF/jsp/basisDict/testMethodAdd.jsp");  //-新增
		CTRDICTCODES_TESTMETHOD_MODULE_MAP.put("edit", "/WEB-INF/jsp/basisDict/testMethodEdit.jsp");//-修改
		CTRDICTCODES_TESTMETHOD_MODULE_MAP.put("view", "/WEB-INF/jsp/basisDict/testMethodView.jsp");//-查看
		CTRDICTCODES_TESTMETHOD_MODULE_MAP.put("module", MODULE_CTRDICTCODES_TESTMETHOD);//-模块
	}
	//基础字典-医学专业组 2015-12-8 liujiawei
	public final static HashMap<String, String> CTRDICTCODES_DISCIPLINE_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_DISCIPLINE_MODULE_MAP.put("main", "/WEB-INF/jsp/basisDict/disciplineMain.jsp");//-首页
		CTRDICTCODES_DISCIPLINE_MODULE_MAP.put("list", "/WEB-INF/jsp/basisDict/disciplineList.jsp");//-详细数据列表
		CTRDICTCODES_DISCIPLINE_MODULE_MAP.put("add", "/WEB-INF/jsp/basisDict/disciplineAdd.jsp");  //-新增
		CTRDICTCODES_DISCIPLINE_MODULE_MAP.put("edit", "/WEB-INF/jsp/basisDict/disciplineEdit.jsp");//-修改
		CTRDICTCODES_DISCIPLINE_MODULE_MAP.put("view", "/WEB-INF/jsp/basisDict/disciplineView.jsp");//-查看
		CTRDICTCODES_DISCIPLINE_MODULE_MAP.put("module", MODULE_CTRDICTCODES_DISCIPLINE);//-模块
	}
	//基础字典-病理大类 2015-12-8 liujiawei
	public final static HashMap<String, String> CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP.put("main", "/WEB-INF/jsp/basisDict/pathologyCategoryMain.jsp");//-首页
		CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP.put("list", "/WEB-INF/jsp/basisDict/pathologyCategoryList.jsp");//-详细数据列表
		CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP.put("add", "/WEB-INF/jsp/basisDict/pathologyCategoryAdd.jsp");  //-新增
		CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP.put("edit", "/WEB-INF/jsp/basisDict/pathologyCategoryEdit.jsp");//-修改
		CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP.put("view", "/WEB-INF/jsp/basisDict/pathologyCategoryView.jsp");//-查看
		CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP.put("module", MODULE_CTRDICTCODES_PATHOLOGYCATEGORY);//-模块
	}
	//基础字典-就诊类型 2015-12-8 liujiawei
	public final static HashMap<String, String> CTRDICTCODES_TREATMENTTYPE_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_TREATMENTTYPE_MODULE_MAP.put("main", "/WEB-INF/jsp/basisDict/treatmentTypeMain.jsp");//-首页
		CTRDICTCODES_TREATMENTTYPE_MODULE_MAP.put("list", "/WEB-INF/jsp/basisDict/treatmentTypeList.jsp");//-详细数据列表
		CTRDICTCODES_TREATMENTTYPE_MODULE_MAP.put("add", "/WEB-INF/jsp/basisDict/treatmentTypeAdd.jsp");  //-新增
		CTRDICTCODES_TREATMENTTYPE_MODULE_MAP.put("edit", "/WEB-INF/jsp/basisDict/treatmentTypeEdit.jsp");//-修改
		CTRDICTCODES_TREATMENTTYPE_MODULE_MAP.put("view", "/WEB-INF/jsp/basisDict/treatmentTypeView.jsp");//-查看
		CTRDICTCODES_TREATMENTTYPE_MODULE_MAP.put("module", MODULE_CTRDICTCODES_TREATMENTTYPE);//-模块
	}
	//基础字典-结果单位 2015-12-8 liujiawei
	public final static HashMap<String, String> CTRDICTCODES_UNIT_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_UNIT_MODULE_MAP.put("main", "/WEB-INF/jsp/basisDict/unitMain.jsp");//-首页
		CTRDICTCODES_UNIT_MODULE_MAP.put("list", "/WEB-INF/jsp/basisDict/unitList.jsp");//-详细数据列表
		CTRDICTCODES_UNIT_MODULE_MAP.put("add", "/WEB-INF/jsp/basisDict/unitAdd.jsp");  //-新增
		CTRDICTCODES_UNIT_MODULE_MAP.put("edit", "/WEB-INF/jsp/basisDict/unitEdit.jsp");//-修改
		CTRDICTCODES_UNIT_MODULE_MAP.put("view", "/WEB-INF/jsp/basisDict/unitView.jsp");//-查看
		CTRDICTCODES_UNIT_MODULE_MAP.put("module", MODULE_CTRDICTCODES_UNIT);//-模块
	}			
	//基础字典-标本状态-跳转页面MAP
	public final static HashMap<String, String> CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP.put("main", "/WEB-INF/jsp/basisDict/specimenStatusMain.jsp");
		CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP.put("list", "/WEB-INF/jsp/basisDict/specimenStatusList.jsp");
		CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP.put("add", "/WEB-INF/jsp/basisDict/specimenStatusAdd.jsp");
		CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP.put("edit", "/WEB-INF/jsp/basisDict/specimenStatusEdit.jsp");
		CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP.put("view", "/WEB-INF/jsp/basisDict/specimenStatusView.jsp");
		CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP.put("module", MODULE_CTRDICTCODES_SPECTIMESTATUS);//-模块
	}
	//loinc字典-受检成份 -跳转页面MAP
	public final static HashMap<String, String> CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP.put("main", "/WEB-INF/jsp/loincDict/subjectIngredientMain.jsp");
		CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP.put("list", "/WEB-INF/jsp/loincDict/subjectIngredientList.jsp");
		CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP.put("add", "/WEB-INF/jsp/loincDict/subjectIngredientAdd.jsp");
		CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP.put("edit", "/WEB-INF/jsp/loincDict/subjectIngredientEdit.jsp");
		CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP.put("view", "/WEB-INF/jsp/loincDict/subjectIngredientView.jsp");
		CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP.put("module", MODULE_CTRDICTCODES_SUBJECTINGREDIENT);//-模块
	}
    //loinc字典-受检属性-跳转页面MAP
	public final static HashMap<String, String> CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP.put("main", "/WEB-INF/jsp/loincDict/subjectPropertyMain.jsp");
		CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP.put("list", "/WEB-INF/jsp/loincDict/subjectPropertyList.jsp");
		CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP.put("add", "/WEB-INF/jsp/loincDict/subjectPropertyAdd.jsp");
		CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP.put("edit", "/WEB-INF/jsp/loincDict/subjectPropertyEdit.jsp");
		CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP.put("view", "/WEB-INF/jsp/loincDict/subjectPropertyView.jsp");
		CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP.put("module", MODULE_CTRDICTCODES_SUBJECTPROPERTY);//-模块
	}		
 	//loinc字典-样本标识-跳转页面MAP
	public final static HashMap<String, String> CTRDICTCODES_SPECTIMELOGO_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_SPECTIMELOGO_MODULE_MAP.put("main", "/WEB-INF/jsp/loincDict/specimenLogoMain.jsp");
		CTRDICTCODES_SPECTIMELOGO_MODULE_MAP.put("list", "/WEB-INF/jsp/loincDict/specimenLogoList.jsp");
		CTRDICTCODES_SPECTIMELOGO_MODULE_MAP.put("add", "/WEB-INF/jsp/loincDict/specimenLogoAdd.jsp");
		CTRDICTCODES_SPECTIMELOGO_MODULE_MAP.put("edit", "/WEB-INF/jsp/loincDict/specimenLogoEdit.jsp");
		CTRDICTCODES_SPECTIMELOGO_MODULE_MAP.put("view", "/WEB-INF/jsp/loincDict/specimenLogoView.jsp");
		CTRDICTCODES_SPECTIMELOGO_MODULE_MAP.put("module", MODULE_CTRDICTCODES_SPECTIMELOGO);//-模块
	}	
	//loinc字典-时间特征-跳转页面MAP
	public final static HashMap<String, String> CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP = new HashMap<String, String>();
	static {
		CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP.put("main", "/WEB-INF/jsp/loincDict/timeCharacteristicMain.jsp");
		CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP.put("list", "/WEB-INF/jsp/loincDict/timeCharacteristicList.jsp");
		CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP.put("add", "/WEB-INF/jsp/loincDict/timeCharacteristicAdd.jsp");
		CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP.put("edit", "/WEB-INF/jsp/loincDict/timeCharacteristicEdit.jsp");
		CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP.put("view", "/WEB-INF/jsp/loincDict/timeCharacteristicView.jsp");
		CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP.put("module", MODULE_CTRDICTCODES_TIMECHARACTERISTIC);//-模块
	}	
	
  public final static Map<Integer, HashMap<String, String>> CTRDICTCODES_MODULE_MAP = new HashMap<Integer, HashMap<String, String>>();
  static {
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES, CTRDICTCODES_SPECIMENTYPE_MODULE_MAP);  //1-样本类型
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_TESTMETHOD, CTRDICTCODES_TESTMETHOD_MODULE_MAP);  //2-检验方法
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_DISCIPLINE, CTRDICTCODES_DISCIPLINE_MODULE_MAP);  //3-医学专业组
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_PATHOLOGYCATEGORY, CTRDICTCODES_PATHOLOGYCATEGORY_MODULE_MAP);  //4-病理大类
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_TREATMENTTYPE, CTRDICTCODES_TREATMENTTYPE_MODULE_MAP);  //10-就诊类型
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_UNIT, CTRDICTCODES_UNIT_MODULE_MAP);  //11-结果单位
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_SPECTIMESTATUS, CTRDICTCODES_SPECTIMESTATUS_MODULE_MAP);  //9标本状态
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_SUBJECTINGREDIENT, CTRDICTCODES_SUBJECTINGREDIENT_MODULE_MAP);  //5受检成份
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_SUBJECTPROPERTY, CTRDICTCODES_SUBJECTPROPERTY_MODULE_MAP);  //6受检属性
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_SPECTIMELOGO, CTRDICTCODES_SPECTIMELOGO_MODULE_MAP);  //7标本标识
	  CTRDICTCODES_MODULE_MAP.put(MODULEID_CTRDICTCODES_TIMECHARACTERISTIC, CTRDICTCODES_TIMECHARACTERISTIC_MODULE_MAP);  //8时间特征
     }
	

	/* 	************************	 基础字典 - 公用部分 - END												************************ */
	public final static String MODULE_LOINCDICT = "LOINC字典表";
	public final static String CODE_LOINCDICTCODE = "10";
	
	// 34.LOINC字典编码表
	// LOINC字典编码表  - START
	// 34 LOINC编码表(xiaobing--------开始(2015-12-07)-------)
	public final static String ENTITY_CTRLOINC = "LOINC编码对应表";
	public final static String MODULE_CTRLOINC = "LOINC编码表";
	public final static int CODE_CTRLOINC = 34;
	public final static int MODULEID_CTRLOINC = 34;
	public final static String TABLENAME_CTRLOINC = "ctr_loinc";
	// 类级请求
	public static final String RMC_LOINCDICTS = "/loincdicts";
	public static final String RMC_CTRLOINC = "/ctrLoinc";
	// 方法请求
	public static final String RMM_LOINCDICTLIST = "/loincDictList";
	public static final String RMM_LOINCDICTSAVE = "/saveLoincDicts";
	public static final String RMM_LOINCDICTEDIT = "/editLoincDicts";
	public static final String RMM_LOINCDICTDELETE = "/deleteLoincDicts";
	public static final String RMM_LOINCDICTQUERYBYID = "/queryLoincDictById";
	// 14 LOINC编码表(xiaobing--------开始(2015-12-07)-------)
	public static final String RMM_CTRLOINC_MAIN = "/ctrLoincMain";//进入主页面
	public static final String RMM_CTRLOINC_PAGE_LIST = "/ctrLoincPageList";//分页查询列表
	public static final String RMM_CTRLOINC_INFO = "/ctrLoincInfo";//进入查询基本信息页面
	public static final String RMM_CTRLOINC_INFO_RTLIST= "/ctrLoincInfoRtList"; //查询报告模板列表
	public static final String RMM_CTRLOINC_INFO_STLIST= "/ctrLoincInfoStList"; //查询标本类型列表
	public static final String RMM_CTRLOINC_ADD = "/ctrLoincAdd";//新增
	public static final String RMM_CTRLOINC_EDIT = "/ctrLoincEdit";//修改
	public static final String RMM_CTRLOINC_IFEDIT = "/ctrLoincIfEdit";//检查是否可修改
	public static final String RMM_CTRLOINC_IFEXISTED = "/ctrLoincIfExisted";//检查是否有同名
	public static final String RMM_CTRLOINC_ENABLE = "/ctrLoincEnable";//启用
	public static final String RMM_CTRLOINC_DISABLE = "/ctrLoincDisable";//停用
	public static final String RMM_CTRLOINC_DELETE = "/ctrLoincDelete";//删除
	public static final String RMM_CTRLOINC_DELETE_BATCH = "/ctrLoincDeleteBatch";//批量删除
	public static final String RMM_CTRLOINC_DISABLEORENABLE= "/ctrLoincDisableOrEnable";//启用或停用
	// LOINC字典编码表 - END	
	
	// 45.客户仪器信息  - START
	// 客户仪器信息  - (xiaobing--------开始(2015-12-10)-------)
	public final static String ENTITY_INSTRUMENTS = "仪器字典表";
	public final static String ENTITY_INSTRPARAMS = "仪器通讯参数表";
	public final static String ENTITY_INSTRITEMS = "仪器关联项目表";
	public final static String ENTITY_ORGS = "机构单位表";
	public final static String ENTITY_INSTRREFRANGES = "本地仪器常规项目参考值对应表";
	public final static String MODULE_INSTRUMENTS = "客户仪器信息";
	public final static String MODULE_INSTRPARAMS = "仪器通讯参数";
	public final static String MODULE_INSTRITEMS = "仪器关联项目";
	public final static String MODULE_ORGS = "机构单位";
	public final static String MODULE_INSTRREFRANGES = "本地仪器常规项目参考值对应";
	public final static int CODE_INSTRUMENTS = 45;
	public final static String TABLENAME_INSTRUMENTS = "instruments";
	public final static String TABLENAME_INSTRPARAMS = "instr_params";
	public final static String TABLENAME_INSTRITEMS = "instr_items";
	public final static String TABLENAME_ORGS = "orgs";
	public final static String TABLENAME_INSTRREFRANGES = "instr_refranges";
	// 类级请求  
	public static final String RMC_INSTRUMENTS = "/inst/instruments";
	public static final String RMC_LOCAL_INSTRUMENTS = "/local_inst/instruments";
	// 方法请求
	public static final String RMM_INSTRUMENTS_MAIN = "/instrumentsMain";//进入主页面
	public static final String RMM_INSTRUMENTS_BASEMAIN = "/instrumentsBaseMain";//进入仪器库主页面
	public static final String RMM_INSTRUMENTS_PAGE_LIST = "/instrumentsPageList";//分页查询列表
	public static final String RMM_INSTRUMENTS_BASE_LIST = "/instrumentsBaseList";//仪器库查询列表
	public static final String RMM_IORGS_PAGE_LIST = "/iorgsPageList";//机构分页查询列表
	public static final String RMM_IORGS_PAGE_LIST_NEW = "/newiorgsPageList";//机构分页查询列表
	public static final String RMM_INSTRUMENTS_INFO = "/instrumentsInfo";//进入查询基本信息页面
	public static final String RMM_INSTRUMENTS_PARAMS_INFO = "/instrumentsParamsInfo";//进入仪器通讯参数基本信息页面
	public static final String RMM_INSTRUMENTS_INFO_RTLIST= "/instrumentsInfoRtList"; //查询报告模板列表
	public static final String RMM_INSTRUMENTS_INFO_STLIST= "/instrumentsInfoStList"; //查询标本类型列表
	public static final String RMM_INSTRUMENTS_INFO_BOLIST= "/instrumentsInfoBoList"; //查询盒子列表
	public static final String RMM_INSTRUMENTS_INFO_INLIST= "/instrumentsInfoInList"; //查询虚拟仪器列表
	public static final String RMM_INSTRUMENTS_INSTRITEMS_LIST= "/instrumentsInstrItemsList"; //查询仪器对应项目列表
	public static final String RMM_INSTRUMENTS_INSTRMICS_LIST= "/instrumentsInstrMicsList";   //查询仪器对应细菌列表
	public static final String RMM_INSTRUMENTS_INSTRATIC_LIST= "/instrumentsInstrAticList";   //查询仪器对应抗生素列表
	public static final String RMM_INSTRUMENTS_ADD = "/instrumentsAdd";//新增
	public static final String RMM_INSTRUMENTS_COPY = "/instrumentsCopy";//复制新增
	public static final String RMM_INSTRUMENTS_EDIT = "/instrumentsEdit";//修改
	public static final String RMM_INSTRUMENTS_IFEDIT = "/instrumentsIfEdit";//检查是否可修改
	public static final String RMM_INSTRUMENTS_PRAMS_EDIT = "/instrumentsParamsEdit";//修改
	public static final String RMM_INSTRUMENTS_IFEXISTED = "/instrumentsIfExisted";//检查是否有同名
	public static final String RMM_INSTRUMENTS_ENABLE = "/instrumentsEnable";//启用
	public static final String RMM_INSTRUMENTS_DISABLE = "/instrumentsDisable";//停用
	public static final String RMM_INSTRUMENTS_DELETE = "/instrumentsDelete";//删除
	public static final String RMM_INSTRUMENTS_DELETE_BATCH = "/instrumentsDeleteBatch";//批量删除
	
	public static final String RMM_INSTRUMENTS_POPUP_LIST = "/instrumentsPopUpList";//客户仪器弹出框列表
	/*************************************************2016-1-25************************************************/
	public static final String JSP_INSTRUMENTS_MIAN = "/WEB-INF/jsp/inst/instruments/instrumentsMain.jsp";
	  public static final String RMM_INSTRUMENTS_RT_LIST = "/instrumentsRtList"; // 报告模板列表查询
	  public static final String RMM_INSTRUMENTS_BB_LIST = "/instrumentsBbList"; // 盒子条码列表查询
	  public static final String RMM_INSTRUMENTS_CODE_DISPLAYORDER = "/instrumentsCodeDisplayorder"; // 获取编号和最大顺序号
	  public static final String RMM_INSTRUMENTS_LIST = "/instrumentsList"; // 仪器列表查询
	  public static final String RMM_INSTRUMENTS_UPDATESTATUS = "/instrumentsStatusUpdate"; // 启用停用状态
	  public static final String RMM_INSTRUMENTS_PARAMS_EDIT = "/instrParamsEdit"; // 编辑仪器通讯参数信息
	  public static final String RMM_INSTRUMENTS_CTR_LIST = "/instrumentsCtrList"; // （从仪器库添加）仪器列表查询
	  public static final String RMM_INSTRUMENTS_CTR_ITEM_LIST = "/instrumentsCtrItemList"; // （从仪器库添加）仪器项目列表查询
	  public static final String RMM_INSTRUMENTS_CTR_GERM_LIST = "/instrumentsCtrGermList"; // （从仪器库添加）仪器细菌列表查询
	  public static final String RMM_INSTRUMENTS_CTR_ANTI_LIST = "/instrumentsCtrAntiList"; // （从仪器库添加）仪器抗生素列表查询
	  public static final String RMM_INSTRUMENTS_CTR_ADD = "/instrumentsCtrAdd"; // （从仪器库添加）新增仪器
	  public static final String RMM_INSTRUMENTS_VI_LIST = "/instrumentsViList"; // 虚拟仪器列表查询
	// 客户仪器信息 - END
	
	/* 	************************	 中心微生物字典表 -- START	liujiawei	2015-12-11		************************ */
	//类级请求
	public static final String RMC_CENTREMICROBEITEM = "/pm/CentreMicrobeItem";
	//表名
	public final static String TABLENAME_CENTREMICROBEITEM = "ctr_mic_items";
	//初始界面
	public static final String RMC_CENTREMICROBEITEM_MAIN = "/centreMicrobeItemMain";
	//查询单个中心微生物明细方法
	public static final String RMM_GET_CENTREMICROBEITEM_DETAIL_BY_ID = "/getCentreMicrobeitemDetailById";
	//查询中心微生物字典分页列表方法
	public static final String RMM_GET_CENTREMICROBEITEMS_PAGELIST = "/getCentreMicrobeitemsPageList";
	//添加中心微生物字典方法
	public static final String RMM_ADD_CENTREMICROBEITEM = "/addCentreMicrobeitem";
	//修改中心微生物字典方法
	public static final String RMM_MODIFY_CENTREMICROBEITEM = "/modifyCentreMicrobeitem";
	//删除中心微生物字典方法
	public static final String RMM_DELETE_CENTREMICROBEITEM = "/deleteCentreMicrobeitem";
	//批量删除中心微生物字典方法
	public static final String RMM_BATCH_DELETE_CENTREMICROBEITEMS = "/batchDeleteCentreMicrobeitems";
	//启用或停用中心微生物字典方法
	public static final String RMM_DISABLE_OR_ENABLE_CENTREMICROBEITEM = "/disableOrEnableCentreMicrobeitem";
	//检查名字是否存在
	public static final String RMM_CHECK_IF_CENTREMICROBEITEM_NAME_EXIST = "/checkIfCentreMicrobeitemNameExist";

	public final static int MODULEID_CENTREMICROBEITEM_BACTERIADICTIONARY = 1;
	public final static String MODULE_CENTREMICROBEITEM_BACTERIADICTIONARY = "细菌字典";
	public final static int MODULEID_CENTREMICROBEITEM_ANTIBIOTICDICTIONARY = 2;
	public final static String MODULE_CENTREMICROBEITEM_ANTIBIOTICDICTIONARY = "抗生素字典";
	public final static HashMap<String, String> CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP = new HashMap<String, String>();
	static {
		CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP.put("main", "/WEB-INF/jsp/pm/bacteriaDictionary/bacteriaDictionaryMain.jsp");
		CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP.put("list", "/WEB-INF/jsp/pm/bacteriaDictionary/bacteriaDictionaryList.jsp");
		CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP.put("add", "/WEB-INF/jsp/pm/bacteriaDictionary/bacteriaDictionaryAdd.jsp");
		CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP.put("edit", "/WEB-INF/jsp/pm/bacteriaDictionary/bacteriaDictionaryEdit.jsp");
		CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP.put("view", "/WEB-INF/jsp/pm/bacteriaDictionary/bacteriaDictionaryView.jsp");
		CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP.put("module", MODULE_CENTREMICROBEITEM_BACTERIADICTIONARY);//-模块
	}

	public final static HashMap<String, String> CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP = new HashMap<String, String>();
	static {
		CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP.put("main", "/WEB-INF/jsp/pm/antibioticDictionary/antibioticDictionaryMain.jsp");
		CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP.put("list", "/WEB-INF/jsp/pm/antibioticDictionary/antibioticDictionaryList.jsp");
		CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP.put("add", "/WEB-INF/jsp/pm/antibioticDictionary/antibioticDictionaryAdd.jsp");
		CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP.put("edit", "/WEB-INF/jsp/pm/antibioticDictionary/antibioticDictionaryEdit.jsp");
		CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP.put("view", "/WEB-INF/jsp/pm/antibioticDictionary/antibioticDictionaryView.jsp");
		CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP.put("module", MODULE_CENTREMICROBEITEM_ANTIBIOTICDICTIONARY);//-模块
	}
	public final static Map<Integer, HashMap<String, String>> CENTREMICROBEITEM_MODULE_MAP = new HashMap<Integer, HashMap<String, String>>();
	
	    static {
		CENTREMICROBEITEM_MODULE_MAP.put(MODULEID_CENTREMICROBEITEM_BACTERIADICTIONARY, CENTREMICROBEITEM_BACTERIADICTIONARY_MODULE_MAP);  //1-细菌字典
		CENTREMICROBEITEM_MODULE_MAP.put(MODULEID_CENTREMICROBEITEM_ANTIBIOTICDICTIONARY, CENTREMICROBEITEM_ANTIBIOTICDICTIONARY_MODULE_MAP);  //1-抗生素字典
    }
    /* 	************************	 中心微生物字典表 -- END	liujiawei	2015-12-11		************************ */
    //公共模块Map(zhangliping) - start - 格式 ：模块ID,模块名称
    public final static HashMap<Integer, String> COMMON_MODULE_MAP = new HashMap<Integer, String>();
    static {
    	COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES, MODULE_CTRDICTCODES_SPECIMENTYPE);  //1-样本类型
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_TESTMETHOD, MODULE_CTRDICTCODES_TESTMETHOD);  //2-检验方法
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_DISCIPLINE, MODULE_CTRDICTCODES_DISCIPLINE);  //3-医学专业组
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_PATHOLOGYCATEGORY, MODULE_CTRDICTCODES_PATHOLOGYCATEGORY);  //4-病理大类
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_TREATMENTTYPE, MODULE_CTRDICTCODES_TREATMENTTYPE);  //10-就诊类型
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_UNIT, MODULE_CTRDICTCODES_UNIT);  //11-结果单位
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_SPECTIMESTATUS, MODULE_CTRDICTCODES_SPECTIMESTATUS);  //9标本状态
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_SUBJECTINGREDIENT, MODULE_CTRDICTCODES_SUBJECTINGREDIENT);  //5受检成份
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_SUBJECTPROPERTY, MODULE_CTRDICTCODES_SUBJECTPROPERTY);  //6受检属性
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_SPECTIMELOGO, MODULE_CTRDICTCODES_SPECTIMELOGO);  //7标本标识
	    COMMON_MODULE_MAP.put(MODULEID_CTRDICTCODES_TIMECHARACTERISTIC, MODULE_CTRDICTCODES_TIMECHARACTERISTIC);  //8时间特征
	    COMMON_MODULE_MAP.put(MODULEID_CTRRESULTTYPES, MODULE_CTRRESULTTYPES);  //30结果类型
	    COMMON_MODULE_MAP.put(MODULEID_CTRLOINC, MODULE_CTRLOINC);  //34LOINC编码表 
	    COMMON_MODULE_MAP.put(MODULEID_TESTITEM, MODULE_TESTITEM);  //35检验项目
	    COMMON_MODULE_MAP.put(MODULEID_GROUP_TESTITEM, MODULE_GROUP_TESTITEM);  //36组合项目
    	COMMON_MODULE_MAP.put(MODULEID_CENTERORG_MEDICALINSTITUTIONS, MODULE_CENTERORG_MEDICALINSTITUTIONS);  //40-医疗机构
    	COMMON_MODULE_MAP.put(MODULEID_CENTERORG_INDEPENDENTLABORATORY, MODULE_CENTERORG_INDEPENDENTLABORATORY);  //41-独立实验室	
    	COMMON_MODULE_MAP.put(MODULEID_CTRINSTRUMENTS, MODULE_CTRINSTRUMENTS);  //42中心仪器
		COMMON_MODULE_MAP.put(MODULEID_CTRINSTRUMENTS_ITEM, MODULE_CTRINSTRUMENTS_ITEM);  //43中心仪器项目对照
		COMMON_MODULE_MAP.put(MODULEID_CTRINSTRUMENTS_MICS, MODULE_CTRINSTRUMENTS_MICS);  //44中心仪器细菌对照
		COMMON_MODULE_MAP.put(MODULEID_CENTERORGRELATIONS, MODULE_CENTERORGRELATIONS);  //51区域管理机构维护
    }
    //公共模块Map - end
    
    /* 	************************	 日志监控常量 -- START	liujiawei	2015-12-21		************************ */
    public final static String METHOD = " method : ";
    public final static String INPUT_PARAMS = " input parameters : ";
    public final static String RETURN_VALUE = " return value : ";
    public final static String EXCEPTION = " exception : ";
    public final static String PARAMS_IS_NULL = " params is null ! ";
    /* ************************	 日志监控常量 -- END	liujiawei	2015-12-21		************************ */

    /* 	************************ 客户盒子登记 -- START	liujiawei	2015-12-29		************************ */
    //类级请求
    public static final String RMC_INSTRUMENTBOX = "/inst/instrumentBox";
	//方法请求
    public static final String RMM_INSTRUMENTBOX_MAIN = "/instrumentBoxMain";
    public static final String RMM_GET_INSTRUMENTBOX_DETAIL_BY_ID = "/getInstrumentBoxDetailById";
	public static final String RMM_GET_INSTRUMENTBOX_PAGELIST = "/getInstrumentBoxPageList";
	public static final String RMM_ADD_INSTRUMENTBOX = "/addInstrumentBox";
	public static final String RMM_MODIFY_INSTRUMENTBOX = "/modifyInstrumentBox";
	public static final String RMM_DELETE_INSTRUMENTBOX = "/deleteInstrumentBox";
	public static final String RMM_BATCH_DELETE_INSTRUMENTBOX = "/batchDeleteInstrumentBox";
	public static final String RMM_DISABLE_OR_ENABLE_INSTRUMENTBOX = "/disableOrEnableInstrumentBox";
	public static final String RMM_CHECK_IF_INSTRUMENTBOX_EXIST = "/checkIfInstrumentBoxExist";
	public static final String RMM_GET_INSTRUMENTBOX_CODENO_AND_DISPLAYORDER = "/getInstrumentBoxCodeNoAndDisplayOrder";
	//页面地址
	public final static String RMM_INSTRUMENTBOXMAIN_PAGE = "/WEB-INF/jsp/inst/instrumentBoxMain.jsp";
	public final static String RMM_INSTRUMENTBOXLIST_PAGE = "/WEB-INF/jsp/inst/instrumentBoxList.jsp";
	//模块相关常量
	public final static String MODULE_INSTRUMENTBOX = "客户盒子登记";
	public final static int MODULEID_INSTRUMENTBOX  = 52;
	public final static String TABLENAME_INSTRUMENTBOX = "instr_boxs";
    
    /* ************************	 客户盒子登记 -- END	liujiawei	2015-12-29		************************ */
    
    /**49用户管理*/
    //start.------------------------------------------------------


//	/**42用户管理*/
//	//===================================================================================================================
	public final static String ENTITY_DOCTORS = "医生信息表";
	public final static String ENTITY_LOCRESULTTYPES = "结果类型";
	public final static String ENTITY_USERS = "用户表";
	public final static String MODULE_USERS = "用户管理";
	public final static String TABLENAME_USERS = "users";
	public final static int CODE_USERS = 42;
	public static final String RMC_USER = "/sys/user";
	public static final String RMM_USERMAIN = "/userMain";
	public static final String RMM_SAVEUSERMESSAGE="/saveUserMessage";
	public static final String JSP_USERMIAN = "/WEB-INF/jsp/sys/users/userMain.jsp";
	public static final String RMM_USERINFOMESSAGE = "/userInfoMessage";
	public static final String JSP_USERINFO = "/WEB-INF/jsp/auth/authUsers/userInfo.jsp";
	public static final String RMM_SETPASSWORD = "/setPassWord";
	public static final String JSP_SETPASSWORD = "/WEB-INF/jsp/auth/authUsers/setPassWord.jsp";
	public static final String RMM_UPDATEPASSWORD = "/updatePassWord";
	public static final String RMM_SAVEUPDATEPASSWORD = "/saveUpdatePassWord";
	public static final String JSP_UPDATEPASSWORD = "/WEB-INF/jsp/auth/authUsers/updatePassWord.jsp";
	public static final String RMM_LIST = "/userList"; // 用户列表查询
	public static final String RMM_USER_INFO = "/usersInfo"; // 查看用户信息
	public static final String RMM_USER_DELETE = "/usersDelete"; // 删除用户信息
	public static final String RMM_USER_RESETPWD = "/userResetPwd"; // 删除用户信息
	public static final String RMM_USER_UPDATESTATUS = "/userStatusUpdate"; // 启用停用状态
	public static final String RESET_PWD = "111111"; // 默认密码
	public static final String RMM_USER_ADD = "/usersAdd"; // 删除用户信息
	public static final String RMM_USER_EDIT = "/userEdit"; // 编辑用户信息
	public static final String RMM_USER_IFEXISTED = "/userIfExisted"; // 同名验证
	public static final String RMM_LOADUSERS = "/loadUsers";
	public static final String RMM_USER_MAXDISPLAYORDER = "/getMaxDisplayOrder"; // 获取最大顺序号
	public final static String MODULE_USERMESSAGE ="个人信息";
	public final static String MODULE_SETPASSWORD ="设置密码";
	public final static String MODULE_UPDATEPASSWORD ="修改密码";

/////////////////////////////////////////////////////////////////////////////////////////////
	/**53角色管理*/
	public final static String ENTITY_USERGROUPS = "权限组表";
	public final static String MODULE_USERGROUPS = "角色管理";
	public final static String TABLENAME_USERGROUPS = "auth_groups";
    public static final String RMC_USERGROUPS = "/sys/userGroups";
    public final static int MODULEID_USERGROUPS = 53;
    public static final String RMM_USERGROUPSMAIN = "/userGroupsMain";
    public static final String JSP_USERGROUPSMAIN = "/WEB-INF/jsp/auth/authGroup/userGroupsMain.jsp";
    public static final String RMM_SAVEUSERGROUPS = "/saveUserGroups";
    public static final String RMM_DELETEUSERGROUPS = "/deleteUserGroups";
    public static final String RMM_LOADUSERGROUPS = "/loadUserGroups";
    public static final String RMM_EDITUSERGROUPS = "/editUserGroups";
    public static final String RMM_USERGROUPSIFEXISTED = "/userGroupsIfExisted";
    public static final String RMM_UPDATESTATUSUERGROUPS = "/updateStatusUserGroups";
    public static final String RMM_LOADROLEPERMISSION = "/loadRolePermission";
    public static final String RMM_SAVEROLEPERMISSION="/saveRolePermission";
////////////////////////////////////////////////////////////////////////////////////////////////////	
//===================================================================================================================

	public final static int MODULEID_AUTHUSERS = 49;
	public final static String MODULEID_AUTHUSERS_NAME = "用户管理";
	public static final class AuthUserConstant{
		//控制层请求头
		public static final String RMC_HEAD = "/auth/user";
		//服务层请求头
		public static final String RMS_HEAD = Constant.SERVICE + "/auth/user";
		//页面资源文件目录
		public static final String JSP_HEAD = "/WEB-INF/jsp/auth/authUsers";

		public static final String RESET_PWD = "111111"; // 默认密码

		public static final String JSP_USER_GROUP = "/userGroup.jsp";//查看详细信息页面
	}

	public static final class CtrInstrBoxsConstant{
		//控制层请求头
		public static final String RMC_HEAD = "/inst/ctrinstrboxs";
		//服务层请求头
		public static final String RMS_HEAD = Constant.SERVICE + "/inst/ctrinstrboxs";
		//页面资源文件目录
		public static final String JSP_HEAD = "/WEB-INF/jsp/inst/ctrinstrboxs";
		public static final String JSP_MAIN = "/ctrInstrBoxsMain.jsp";//(相对JSP_HEAD的路径)主页面
		public static final String JSP_SELECT_ORG_MAIN = "/selectorg.jsp";//选择机构主页面
		public static final String JSP_EDIT = "/ctrInstrBoxsEdit.jsp";//编辑页面

		public final static int MODULEID_ID = 50;
		public final static String MODULEID_NAME = "客户仪器盒子管理";

		public final static String TABLENAME = "ctr_instr_boxs";
	}


	//针对大多常用请求统一命名:增,删,改,查,初始化
	public static final class CommonURI{
		//http请求相对路径
		public static final String RMM_INIT = "/doInit";//初始化动作
		public static final String RMM_SEARCH = "/doSearch";//根据查询条件,获取查询结果,一般用于返回列表
		public static final String RMM_VIEW = "/doView";//获取一条数据的详细信息
		public static final String RMM_UPDATE = "/doUpdate";//更新数据
		public static final String RMM_ADD = "/doAdd";//新增数据
		public static final String RMM_DELETE = "/doDelete";//删除数据
		public static final String RMM_OTHER = "/doOther";//其他操作

		public static final String RMM_UPDATEPW = "/doUpdatePW"; //修改密碼 add by chenshuxian 1/20
		public static final String RMM_INITUPDATE = "/doInitUpdate";//初始化动作
		public static final String RMM_USERINFO = "/doUserInfo";//初始化动作
		public static final String RMM_SAVEUSERINFO = "/doSaveUserInfo";//初始化动作


		public static final String RMM_EXCUTE = "/doExcute";//rpc调用

		//页面资源文件相对位置
		public static final String JSP_MAIN = "/main.jsp";//主页面
		public static final String JSP_VIEW = "/view.jsp";//查看详细信息页面
		public static final String JSP_UPDATE = "/update.jsp";//修改页面
		public static final String JSP_UPDATEMAIN = "/updatePassWord.jsp";//修改密碼 add by chenshuxian 1/20
		public static final String JSP_USERINFO = "/userInfo.jsp";//修改密碼 add by chenshuxian 1/20
		
		
	}

//	//分页使用的参数
//	public static final class PageParam{
//		public static final String PARAM_PAGE = "page";
//		public static final String PARAM_SEARCHSTR = "searchStr";
//		public static final String PARAM_SORT = "sort";
//
//
//	}

	public static final class OrgAppId{
		public static final String CTR_ORG_ID = PropertiesUtil.get("comming","CTR_ORG_ID");
		public static final String CTR_APP_ID = PropertiesUtil.get("comming","CTR_APP_ID");


	}

    //end.--------------------------------------------------------
    /**系统信息设置*/
    //start.------------------------------------------------------
    public final static String ENTITY_APPLICATIONS = "系统字典表";
	public final static String MODULE_APPLICATIONS = "系统信息设置";
    public static final String RMC_APPLICATIONS = "/sys/Applications";
    public final static int MODULEID_APPLICATIONS = 50;
    public static final String RMC_FINDAPPLICATIONS = "/findApplications";
    //end---------------------------------------------------------
}

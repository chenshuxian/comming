<%@ page import="com.daan.domain.Constant" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp" %>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>首页</title>
</head>
<script type="text/javascript">
    $(document).ready(function () {
        $('#toggle-menu').trigger("click");
    });
</script>

<body>

<!--框架-->
<div id="site-container" class="flex-container layout-vertical">
    <!--头部-->
    <jsp:include page="/WEB-INF/jsp/common/top.jsp"></jsp:include>
    <!--end-->
    <!--内容-->
    <div id="site-main" class="flex-container layout-horizontal">
        <!--菜单-->
        <!-- -----------------------------大菜单列表---------------------------------- -->
        <div id="allMenu">
            <div class="menu-list">
                <local:ifAuthrized value="01000000">
                    <div class="items">
                        <h2>
                            <a class="J_MenuChange" data-show="dictionaryMenu">
                                <i class="icon icon-pages"></i>
                                <span class="select-value">字典管理</span>
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </h2>

                        <div class="drop-down" data-show="dicSubMenu">
                            <div class="drop-down-selected">
                                <i class="icon icon-pages"></i>
                            </div>
                            <div class="drop-down-menu"></div>
                        </div>
                    </div>
                </local:ifAuthrized>
                <local:ifAuthrized value="02000000">
                    <div class="items">
                        <h2>
                            <a class="J_MenuChange" data-show="systemSettingMenu">
                                <i class="icon icon-tools"></i>
                                <span class="select-value">系统管理</span>
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </h2>

                        <div class="drop-down " data-show="sysSubMenu">
                            <div class="drop-down-selected">
                                <i class="icon icon-tools"></i>
                            </div>
                            <div class="drop-down-menu"></div>
                        </div>
                    </div>
                </local:ifAuthrized>
            </div>
        </div>

        <!-- -------------------------带子项目的菜单--------------------------------- -->
        <div id="dictionaryMenu">
            <div class="menu-list submenu">
                <div class="items">
                    <h2>
                        <a class="link-back J_MenuChange" data-show="allMenu">
                            <i class="fa fa-angle-left"></i>
                            <span class="select-value">返回</span>
                        </a>
                    </h2>

                    <div class="site-menu-container">
                        <div class="drop-down collapse-open">
                            <local:ifAuthrized value="01000000">
                                <div class="drop-down-selected">
                                    <i class="icon icon-pages"></i>
                                </div>
                                <div id="dicSubMenu" class="drop-down-menu">
                                    <div class="drop-down-menu-title">字典管理</div>
                                    <div class="flex-container">
                                        <!-- --------------基础字典-------------- -->
                                        <local:ifAuthrized value="01010000">
                                            <div class="items">
                                                <div class="toggle-show">
                                                    <div class="toggle-show-title">
                                                        <i class="fa fa-caret-right"></i>基础字典
                                                    </div>

                                                    <div class="toggle-show-menu">
                                                        <ul class="list-unstyled">
                                                            <local:ifAuthrized value="01010700">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('标本类型','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=1');">标本类型</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01010900">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('检验方法','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=2');">检验方法</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01010600">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('医学专业组','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=3');">医学专业组</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('病理大类','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=4');">病理大类</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01010800">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('标本状态','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=9');">标本状态</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01010100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('就诊类型','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=10');">就诊类型</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01011000">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('结果单位','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=11');">结果单位</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01011100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('结果类型','${ctx}/basisDict/ctrResultTypes/ctrResultTypesMain');">结果类型</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01011200">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('试管类型','${ctx}/basisDict/ctrTubeTypes/ctrTubeTypesMain');">试管类型</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('地区维护','${ctx}/ctrRegions/ctrRegionsMain'); return false;">地区维护</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('医疗机构维护','${ctx}/org/centerOrg/centerOrgMain?orgTypeId=40'); return false;">医疗机构维护</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('独立实验室维护','${ctx}/org/centerOrg/centerOrgMain?orgTypeId=41'); return false;">独立实验室维护</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('区域管理机构维护','${ctx}/org/regionalManagement/regionalManagementMain?orgTypeId=51'); return false;">区域管理机构维护</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </local:ifAuthrized>
                                        <!-- --------------LOINC字典-------------- -->
                                        <local:ifAuthrized value="01020000">
                                            <div class="items">
                                                <div class="toggle-show">
                                                    <div class="toggle-show-title">
                                                        <i class="fa fa-caret-right"></i>LOINC字典
                                                    </div>
                                                    <div class="toggle-show-menu">
                                                        <ul class="list-unstyled">
                                                            <local:ifAuthrized value="01020100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('受检成份','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=5');">受检成份</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01020200">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('受检属性','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=6');">受检属性</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01020300">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('样本标识','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=7');">样本标识</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01020400">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('时间特征','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=8');">时间特征</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01020400">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('LOINC编码表','${ctx}/ctrLoinc/ctrLoincMain');">LOINC编码表</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </local:ifAuthrized>
                                        <!-- --------------项目字典-------------- -->
                                        <local:ifAuthrized value="01020000">
                                            <div class="items">
                                                <div class="toggle-show">
                                                    <div class="toggle-show-title">
                                                        <i class="fa fa-caret-right"></i>项目字典
                                                    </div>
                                                    <div class="toggle-show-menu">
                                                        <ul class="list-unstyled">
                                                            <local:ifAuthrized value="01020100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('检验项目','${ctx}/pm/testItem/testItemMain');">检验项目</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01020100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('组合项目','${ctx}/pm/testItemGroup/testItemGroupMain');">组合项目</a>
                                                                </li>
                                                            </local:ifAuthrized>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </local:ifAuthrized>
                                        <!-- --------------微生物字典-------------- -->
                                        <local:ifAuthrized value="01030000">
                                            <div class="items">
                                                <div class="toggle-show">
                                                    <div class="toggle-show-title">
                                                        <i class="fa fa-caret-right"></i>微生物字典
                                                    </div>
                                                    <div class="toggle-show-menu">
                                                        <ul class="list-unstyled">
                                                            <local:ifAuthrized value="01020100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('细菌字典','${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=1');">细菌字典</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01020100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('抗生素字典','${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=2');">抗生素字典</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </local:ifAuthrized>
                                        <!-- --------------设备管理-------------- -->
                                        <local:ifAuthrized value="01040000">
                                            <div class="items">
                                                <div class="toggle-show">
                                                    <div class="toggle-show-title">
                                                        <i class="fa fa-caret-right"></i>设备管理
                                                    </div>
                                                    <div class="toggle-show-menu">
                                                        <ul class="list-unstyled">
                                                            <local:ifAuthrized value="01040100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('中心仪器信息','${ctx}/inst/ctrInstruments/ctrInstrumentsMain');">中心仪器信息</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01040200">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('中心仪器细菌对照','${ctx}/inst/ctrInstrumentsMics/ctrInstrumentsMicsMain');">中心仪器细菌对照</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01040300">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('中心仪器项目对照','${ctx}/inst/ctrInstrumentsItem/ctrInstrumentsItemMain');">中心仪器项目对照</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01040300">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('客户盒子登记','${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_INIT%>');">客户盒子登记</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                                   onclick="addTab('客户仪器信息','${ctx}/local_inst/instruments/instrumentsMain');">客户仪器信息</a>
                                                            <li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </local:ifAuthrized>
                                    </div>
                                </div>
                            </local:ifAuthrized>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="systemSettingMenu">
            <div class="menu-list submenu">
                <div class="items">
                    <h2>
                        <a class="link-back J_MenuChange" data-show="allMenu">
                            <i class="fa fa-angle-left"></i>
                            <span class="select-value">返回</span>
                        </a>
                    </h2>

                    <div class="site-menu-container">
                        <local:ifAuthrized value="02000000">
                            <div class="drop-down collapse-open">
                                <div class="drop-down-selected">
                                    <i class="icon icon-tools"></i>
                                </div>
                                <div id="sysSubMenu" class="drop-down-menu">
                                    <div class="drop-down-menu-title">系统管理</div>
                                    <div class="flex-container">
                                        <!-- -------------用户设置------------------ -->
                                        <local:ifAuthrized value="02020000">
                                            <div class="items">
                                                <div class="toggle-show">
                                                    <div class="toggle-show-title">
                                                        <i class="fa fa-caret-right"></i>用户设置
                                                    </div>
                                                    <div class="toggle-show-menu">
                                                        <ul class="list-unstyled">
                                                            <local:ifAuthrized value="01050100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('用户管理','${ctx}<%=Constant.AuthUserConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_INIT%>');">用户管理</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01050100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('个人信息','${ctx}/auth/user/doUserInfo');">个人信息</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01050100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('设置密码','${ctx}/sys/users/setPassWord');">设置密码</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="01050100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('修改密码','${ctx}/auth/user/doInitUpdate');">修改密码</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                            <local:ifAuthrized value="02020400">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('角色管理','${ctx}/sys/userGroups/userGroupsMain');">角色管理</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </local:ifAuthrized>
                                        <!-- -------------日志管理------------------ -->
                                        <local:ifAuthrized value="02030000">
                                            <div class="items">
                                                <div class="toggle-show">
                                                    <div class="toggle-show-title">
                                                        <i class="fa fa-caret-right"></i>日志管理
                                                    </div>
                                                    <div class="toggle-show-menu">
                                                        <ul class="list-unstyled">

                                                            <local:ifAuthrized value="01050100">
                                                                <li><a href="javascript:void(0)"
                                                                       class="easyui-linkbutton"
                                                                       onclick="addTab('中心管理日志','${ctx}/sys/logQuery/logQueryMain');">中心管理日志</a>
                                                                </li>
                                                            </local:ifAuthrized>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </local:ifAuthrized>
                                    </div>
                                </div>
                            </div>
                        </local:ifAuthrized>
                    </div>
                </div>
            </div>
        </div>

        <div id="site-menu">
            <div class="menu-list">
                <div class="items">
                    <h2>
                        <a class="J_MenuChange" data-show="dictionaryMenu">
                            <i class="icon icon-pages"></i>
                            <span class="select-value">字典管理</span>
                            <i class="fa fa-angle-right"></i>
                        </a>
                    </h2>

                    <div class="drop-down">
                        <div class="drop-down-selected">
                            <i class="icon icon-pages"></i>
                        </div>
                        <div class="drop-down-menu">
                            <div class="drop-down-menu-title">字典管理</div>
                            <div class="flex-container">
                                <!-- --------------基础字典-------------- -->
                                <div class="items">
                                    <div class="toggle-show">
                                        <div class="toggle-show-title">
                                            <i class="fa fa-caret-right"></i>基础字典
                                        </div>
                                        <div class="toggle-show-menu">
                                            <ul class="list-unstyled">
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('标本类型','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=1');">标本类型</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('检验方法','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=2');">检验方法</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('医学专业组','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=3');">医学专业组</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('病理大类','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=4');">病理大类</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('标本状态','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=9');">标本状态</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('就诊类型','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=10');">就诊类型</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('结果单位','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=11');">结果单位</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('结果类型','${ctx}/basisDict/ctrResultTypes/ctrResultTypesMain');">结果类型</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('试管类型','${ctx}/basisDict/ctrTubeTypes/ctrTubeTypesMain');">试管类型</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('地区维护','${ctx}/ctrRegions/ctrRegionsMain'); return false;">地区维护</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('医疗机构维护','${ctx}/org/centerOrg/centerOrgMain?orgTypeId=40'); return false;">医疗机构维护</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('独立实验室维护','${ctx}/org/centerOrg/centerOrgMain?orgTypeId=41'); return false;">独立实验室维护</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('区域管理机构维护','${ctx}/org/regionalManagement/regionalManagementMain?orgTypeId=51'); return false;">区域管理机构维护</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- --------------LOINC字典-------------- -->
                                <div class="items">
                                    <div class="toggle-show">
                                        <div class="toggle-show-title">
                                            <i class="fa fa-caret-right"></i>LOINC字典
                                        </div>
                                        <div class="toggle-show-menu">
                                            <ul class="list-unstyled">
                                                <local:ifAuthrized value="01020100">
                                                    <li><a href="javascript:void(0)"
                                                           class="easyui-linkbutton"
                                                           onclick="addTab('受检成份','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=5');">受检成份</a>
                                                    </li>
                                                </local:ifAuthrized>
                                                <local:ifAuthrized value="01020200">
                                                    <li><a href="javascript:void(0)"
                                                           class="easyui-linkbutton"
                                                           onclick="addTab('受检属性','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=6');">受检属性</a>
                                                    </li>
                                                </local:ifAuthrized>
                                                <local:ifAuthrized value="01020300">
                                                    <li><a href="javascript:void(0)"
                                                           class="easyui-linkbutton"
                                                           onclick="addTab('样本标识','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=7');">样本标识</a>
                                                    </li>
                                                </local:ifAuthrized>
                                                <local:ifAuthrized value="01020400">
                                                    <li><a href="javascript:void(0)"
                                                           class="easyui-linkbutton"
                                                           onclick="addTab('时间特征','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=8');">时间特征</a>
                                                    </li>
                                                </local:ifAuthrized>
                                                <local:ifAuthrized value="01020400">
                                                    <li><a href="javascript:void(0)"
                                                           class="easyui-linkbutton"
                                                           onclick="addTab('LOINC编码表','${ctx}/ctrLoinc/ctrLoincMain');">LOINC编码表</a>
                                                    </li>
                                                </local:ifAuthrized>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- --------------项目字典-------------- -->
                                <div class="items">
                                    <div class="toggle-show">
                                        <div class="toggle-show-title">
                                            <i class="fa fa-caret-right"></i>项目字典
                                        </div>
                                        <div class="toggle-show-menu">
                                            <ul class="list-unstyled">
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('检验项目','${ctx}/pm/testItem/testItemMain');">检验项目</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('组合项目','${ctx}/pm/testItemGroup/testItemGroupMain');">组合项目</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- --------------微生物字典-------------- -->
                                <div class="items">
                                    <div class="toggle-show">
                                        <div class="toggle-show-title">
                                            <i class="fa fa-caret-right"></i>微生物字典
                                        </div>
                                        <div class="toggle-show-menu">
                                            <ul class="list-unstyled">
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('细菌字典','${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=1');">细菌字典</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('抗生素字典','${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=2');">抗生素字典</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- --------------设备管理-------------- -->
                                <div class="items">
                                    <div class="toggle-show">
                                        <div class="toggle-show-title">
                                            <i class="fa fa-caret-right"></i>设备管理
                                        </div>
                                        <div class="toggle-show-menu">
                                            <ul class="list-unstyled">
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('中心仪器信息','${ctx}/inst/ctrInstruments/ctrInstrumentsMain');">中心仪器信息</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('中心仪器细菌对照','${ctx}/inst/ctrInstrumentsMics/ctrInstrumentsMicsMain');">中心仪器细菌对照</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('中心仪器项目对照','${ctx}/inst/ctrInstrumentsItem/ctrInstrumentsItemMain');">中心仪器项目对照</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('客户盒子登记','${ctx}<%=Constant.CtrInstrBoxsConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_INIT%>');">客户盒子登记</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('客户仪器信息','${ctx}/local_inst/instruments/instrumentsMain');">客户仪器信息</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="items">
                    <h2>
                        <a class="J_MenuChange" data-show="systemSettingMenu">
                            <i class="icon icon-tools"></i> <span class="select-value">系统管理</span>
                            <i class="fa fa-angle-right"></i>
                        </a>
                    </h2>

                    <div class="drop-down">
                        <div class="drop-down-selected">
                            <i class="icon icon-tools"></i>
                        </div>
                        <div class="drop-down-menu">
                            <div class="drop-down-menu-title">系统管理</div>
                            <div class="flex-container">
                                <!-- -------------用户设置------------------ -->
                                <div class="items">
                                    <div class="toggle-show">
                                        <div class="toggle-show-title">
                                            <i class="fa fa-caret-right"></i>用户设置
                                        </div>
                                        <div class="toggle-show-menu">
                                            <ul class="list-unstyled">
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('用户管理','${ctx}<%=Constant.AuthUserConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_INIT%>');">用户管理</a></li>

                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('个人信息','${ctx}/auth/user/doUserInfo');">个人信息</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('设置密码','${ctx}/sys/users/setPassWord');">设置密码</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('修改密码','${ctx}/auth/user/doInitUpdate');">修改密码</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- -------------日志管理------------------ -->
                                <div class="items">
                                    <div class="toggle-show">
                                        <div class="toggle-show-title">
                                            <i class="fa fa-caret-right"></i>日志管理
                                        </div>
                                        <div class="toggle-show-menu">
                                            <ul class="list-unstyled">
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('日志查询','${ctx}/auth/logQuery/logQueryMain');">日志查询</a>
                                                </li>
                                                <li><a href="javascript:void(0)" class="easyui-linkbutton"
                                                       onclick="addTab('中心日志管理','${ctx}/sys/logQuery/logQueryMain');">中心日志管理</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="menu-list"></div>

				<span class="toggle-menu help-tips">
					<i class="icon icon-collapse"></i>
					<span class="help-tips-content">收缩导航</span>
				</span>
        </div>
        <!--end-->
        <!--内容展示区-->
        <jsp:include page="/WEB-INF/jsp/common/welcome.jsp"></jsp:include>
        <!--end-->

        <!-- 基础字典信息编辑/展示框 -->
        <div class="pop" id="ctrDictInfoModal"></div>
        <!-- 信息编辑 end -->
    </div>
</div>
</body>

</html>

<script src="${ctx}/js/const.js?var=${randomVal}"></script>
<script src="${ctx}/js/basicModule.js?var=${randomVal}"></script>
<script src="${ctx}/js/basisDict/newCtrDictCodes.js?var=${randomVal}"></script>
<script src="${ctx}/js/gridColumns.js?var=${randomVal}"></script>
<script src="${ctx}/js/EasyTree.js?var=${randomVal}"></script>
<script src="${ctx}/js/dataGrid.js?var=${randomVal}"></script>
<script src="${ctx}/js/validatebox.js?var=${randomVal}"></script>
<script src="${ctx}/js/org/centerOrg.js?var=${randomVal}"></script>


<script src="${ctx}/js/auth/authUsers.js"></script>
<script src="${ctx}/js/inst/ctrInstrBoxs.js"></script>
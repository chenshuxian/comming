<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/18
  Time: 10:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="com.daan.domain.Constant" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp" %>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp" %>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link rel="icon" href="img/favicon.ico">
    <title>云康中心库</title>
  <%--<script src="${ctx}/js/mresize.js?var=${randomVal}"></script>--%>
  <script src="${ctx}/js/const.js?var=${randomVal}"></script>
  <script src="${ctx}/js/basicModule.js?var=${randomVal}"></script>
    <script>
        $(function(){
           $("#version").html(CB.VERSION);
        });
    </script>
</head>
<body>
<!--主菜单-->
<div id="site-menu">
  <div class="title"><i class="icon icon-home"></i>全部菜单 <i class="fa fa-angle-down"></i></div>
  <div class="submenu">
    <ul class="list-unstyled">
      <local:ifAuthrized value="1000000"> 
      <li class="submenu-item"><i class="icon-dict" data-class="dict-hover"></i><span>中心字典</span>
        <i class="fa fa-angle-right"></i>
        <div class="sub-list">
        <local:ifAuthrized value="1010000">
            <dl class="list-unstyled">
                <dt><strong>基础字典<i class="fa fa-angle-right"></i></strong></dt>
                <dd>
                  <local:ifAuthrized value="1010100">
                    <a href="javascript:void(0)"
                       onclick="addTab('标本类型','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=1');">标本类型</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010200">
                    <a href="javascript:void(0)" 
                           onclick="addTab('检验方法','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=2');">检验方法</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010300">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('医学专业组','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=3');">医学专业组</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010400">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('病理大类','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=4');">病理大类</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010500">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('标本状态','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=9');">标本状态</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010600">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('就诊类型','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=10');">就诊类型</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010700">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('结果单位','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=11');">结果单位</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010800">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('结果类型','${ctx}/basisDict/ctrResultTypes/ctrResultTypesMain');">结果类型</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1010900">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('试管类型','${ctx}/basisDict/ctrTubeTypes/ctrTubeTypesMain');">试管类型</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="1011000">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('地区维护','${ctx}/ctrRegions/ctrRegionsMain'); return false;">地区维护</a>
                  </local:ifAuthrized>
                </dd>
            </dl>
           </local:ifAuthrized>
             <local:ifAuthrized value="1020000"> 
            <dl>
              <dt><strong>LOINC字典<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                <local:ifAuthrized value="1020100">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('受检成份','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=5');">受检成份</a>
                </local:ifAuthrized>
                <local:ifAuthrized value="1020200">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('受检属性','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=6');">受检属性</a>
                </local:ifAuthrized>
                <local:ifAuthrized value="1020300">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('样本标识','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=7');">样本标识</a>
                </local:ifAuthrized>
                <local:ifAuthrized value="1020400">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('时间特征','${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=8');">时间特征</a>
                </local:ifAuthrized>
                <local:ifAuthrized value="1020500">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('LOINC编码表','${ctx}/ctrLoinc/ctrLoincMain');">LOINC编码表</a>
                </local:ifAuthrized>
              </dd>
            </dl>
          </local:ifAuthrized>
          
          <local:ifAuthrized value="1030000"> 
            <dl>
              <dt><strong>项目字典<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                <local:ifAuthrized value="1030100">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('检验项目','${ctx}/pm/testItem/testItemMain');">检验项目</a>
                </local:ifAuthrized>
                <local:ifAuthrized value="1030200">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('组合项目','${ctx}/pm/testItemGroup/testItemGroupMain');">组合项目</a>
                </local:ifAuthrized>
              </dd>
            </dl>
            </local:ifAuthrized>
            
           <local:ifAuthrized value="1040000"> 
            <dl>
              <dt><strong>微生物字典<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                <local:ifAuthrized value="1040100">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('细菌字典','${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=1');">细菌字典</a>
                  
                </local:ifAuthrized>
                <local:ifAuthrized value="1040200">
                  <a href="javascript:void(0)"
                         
                         onclick="addTab('抗生素字典','${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=2');">抗生素字典</a>
                  
                </local:ifAuthrized>
              </dd>
            </dl>
          </local:ifAuthrized>
          
           <local:ifAuthrized value="1050000"> 
            <dl>
              <dt><strong>报表模板<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                 <local:ifAuthrized value="1050100">
                <a href="javascript:void(0)" 
                       onclick="addTab('中心报表模板维护','${ctx}/ctrTemplate/ctrTemplateMain');">中心报表模板维护</a>
                </local:ifAuthrized>
              </dd>
            </dl>
          </local:ifAuthrized>
        </div>
      </li>
 	</local:ifAuthrized> 
 	
    <local:ifAuthrized value="2000000">
      <li class="submenu-item"><i class="icon-center" data-class="center-hover" ></i><span>中心设备</span> <i
              class="fa fa-angle-right"></i>

        <div class="sub-list">
          <ul class="list-unstyled">
          
          <local:ifAuthrized value="2010000">
            <dl>
              <dt><strong>仪器设备<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                      <local:ifAuthrized value="2010100">
                      <a href="javascript:void(0)"
                             
                             onclick="addTab('中心仪器信息','${ctx}/inst/ctrInstruments/ctrInstrumentsMain');">中心仪器信息</a>

                      </local:ifAuthrized>

                      <local:ifAuthrized value="2030300">
                          <a href="javascript:void(0)"
                                 
                                 onclick="addTab('中心仪器项目对照','${ctx}/inst/ctrInstrumentsItem/ctrInstrumentsItemMain');">中心仪器项目对照</a>

                      </local:ifAuthrized>
                      <local:ifAuthrized value="2020200">
                          <a href="javascript:void(0)"
                             
                             onclick="addTab('中心仪器细菌对照','${ctx}/inst/ctrInstrumentsMics/ctrInstrumentsMicsMain');">中心仪器细菌对照</a>

                      </local:ifAuthrized>
              </dd>
            </dl>
           </local:ifAuthrized> 
          </ul>
        </div>
      </li>
      </local:ifAuthrized> 
      
       <local:ifAuthrized value="3000000">
      <li class="submenu-item"><i class="icon-orgm" data-class="orgm-hover"></i><span>机构管理</span> <i
              class="fa fa-angle-right"></i>

        <div class="sub-list">
          <ul class="list-unstyled">
           <local:ifAuthrized value="3010000">
            <dl>
              <dt><strong>机构信息<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                <local:ifAuthrized value="3010100">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('医疗机构维护','${ctx}/org/centerOrg/centerOrgMain?orgTypeId=40'); return false;">医疗机构维护</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="3010200">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('独立实验室维护','${ctx}/org/centerOrg/centerOrgMain?orgTypeId=41'); return false;">独立实验室维护</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="3010300">
                    <a href="javascript:void(0)"
                       
                       onclick="addTab('区域管理机构维护','${ctx}/org/regionalManagement/regionalManagementMain?orgTypeId=51'); return false;">区域管理机构维护</a>
                  </local:ifAuthrized>
              </dd>
            </dl>
            </local:ifAuthrized>
          <local:ifAuthrized value="3020000">
            <dl>
              <dt><strong>机构设置<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                  <local:ifAuthrized value="3020100">
                      <a href="javascript:void(0)"
                             
                             onclick="addTab('机构系统管理','${ctx}/sys/systemInit/systemInitMain');">机构系统管理</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="3020200">
               		 <a href="javascript:void(0)" 
                       onclick="addTab('机构报表模板维护','${ctx}/cusTemplate/cusTemplateMain');">机构报表模板维护</a>
               	  </local:ifAuthrized>
              </dd>
            </dl>
           </local:ifAuthrized> 
          </ul>
        </div>
      </li>
      </local:ifAuthrized> 
      
       <local:ifAuthrized value="4000000">
      <li class="submenu-item"><i class="icon-tools" data-class="tools-hover"></i><span>系统管理</span> <i
              class="fa fa-angle-right"></i>

        <div class="sub-list">
          <ul class="list-unstyled">
           <local:ifAuthrized value="4010000">
            <dl>
              <dt><strong>用户设置<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
                  <local:ifAuthrized value="4010100">
                      <a href="javascript:void(0)"
                             
                             onclick="addTab('用户管理','${ctx}<%=Constant.AuthUserConstant.RMC_HEAD%><%=Constant.CommonURI.RMM_INIT%>');">用户管理</a>
                  </local:ifAuthrized>
                  <local:ifAuthrized value="4010200">
                      <a href="javascript:void(0)"
                             
                             onclick="addTab('角色管理','${ctx}/sys/userGroups/userGroupsMain');">角色管理</a>
                  </local:ifAuthrized>
              </dd>
            </dl>
            </local:ifAuthrized>
          <local:ifAuthrized value="4020000">
            <dl>
              <dt><strong>日志管理<i class="fa fa-angle-right"></i></strong></dt>
              <dd>
               <local:ifAuthrized value="4020100">
                      <a href="javascript:void(0)"
                             
                             onclick="addTab('中心管理日志','${ctx}/sys/logQuery/logQueryMain');">中心管理日志</a>
                  </local:ifAuthrized>
              </dd>
            </dl>
           </local:ifAuthrized> 
          </ul>
        </div>
      </li>
      </local:ifAuthrized> 
    </ul>
  </div>
</div>
<!--end 主菜单-->
<!--主体内容-->
<div class="flex-container layout-vertical" id="full-page">
  <!--网站头部-->
  <header id="site-header">
    <div class="flex-container flex-space-between flex-y-center">
      <div class="logo-group flex-container flex-center">
        <a href="http://www.yunkanghealth.com/" target="_blank">
          <img src="images/base/logo.png" alt="">
        </a><h5 style="color:#fff;">中心库</h5>
        <%--<a href="">远程病理</a>--%>
        <%--<a href="">健康体检</a>--%>
      </div>
      <div class="member-action flex-container flex-y-center selected-items">
        <%--<a href=""><i class="fa fa-envelope"></i>折扣到期</a><span class="symbol">|</span>--%>
        <%--<a href=""><i class="fa fa-comment"></i>迟发提醒</a><span class="symbol">|</span>--%>
        <%--<a href=""><i class="fa fa-bell"></i>危险值</a><span class="symbol">|</span>--%>
        <div class="drop-down">
          <div class="drop-down-selected">
            <i class="fa fa-user"></i> <span class="selected-value">欢迎您,${userName}</span><i class="fa fa-angle-down"></i>
          </div>
          <div class="drop-down-menu">
            <ul class="list-unstyled">
                <li><a href="javascript:void(0)"  onclick="addTab('个人信息','/comming/auth/user/doUserInfo')"><i class="fa fa-user"></i> 个人信息</a></li>
                <li><a href="javascript:void(0)"  onclick="addTab('修改密码','/comming/auth/user/doInitUpdate')"><i class="fa fa-lock"></i> 修改密码</a></li>
                <li><a href="/comming/home/logout"><i class="fa fa-sign-out"></i>退出</a></li>
            </ul>
          </div>
        </div>
        <%--<div id="full-screen"><i class="fa fa-arrows-alt"></i></div>--%>
      </div>
    </div>
  </header>
  <!--end 网站头部-->
  <!--主视图-->
  <div id="main">
    <section id="site-content" class="easyui-tabs flex-container layout-vertical">
      <div title="首页">

        <div class="flex-container main-content-container1">
          <div class="welcome-message block-show">
            <div class="flex-container  block-show">
              <div class="msg-container flex-container flex-y-center flex-col-6">
                <i class="icon-card"></i>

                <div class="msg-body">
                  <h5 class="selected-items">欢迎，${userName}</h5>
                    <input type="hidden" id="userName" value="${userName}" />
                    <input type="hidden" id="authStr" value="${funcCode}">
                  <p>${orgName}</p>
                </div>
              </div>

              <div class="msg-container flex-container layout-vertical-center">
                <i class="icon-clock"></i>

                <div class="msg-body">
                  <h5>您本次登陆时间：</h5>

                  <p>${loginTime}</p>
                </div>
              </div>
            </div>
            <div class="divider sm-size"></div>
            <div class="content-bottom">
              <div class="flex-container block-show msg-container">
                <i class="icon-notice"></i>

                <div class="msg-body">
                  <h5>公告信息：</h5>

                  <p>
                    以下是发布的主要版本及内容！
                  </p>

                  <p>版本：<span id="version"></span> 日期：2016-06-02</p>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- 基础字典信息编辑/展示框 -->
    <div class="pop" id="ctrDictInfoModal" style="z-index: 8999;" ></div>
    <!-- 信息编辑 end -->
  </div>
</div>

</body>
</html>

<script src="${ctx}/js/basisDict/newCtrDictCodes.js?var=${randomVal}"></script>
<script src="${ctx}/js/gridColumns.js?var=${randomVal}"></script>
<script src="${ctx}/js/EasyTree.js?var=${randomVal}"></script>
<script src="${ctx}/js/dataGrid.js?var=${randomVal}"></script>
<script src="${ctx}/js/validatebox.js?var=${randomVal}"></script>
<script src="${ctx}/js/message.js?var=${randomVal}"></script>
<script src="${ctx}/js/authManagement.js?var=${randomVal}"></script>
<script src="${ctx}/js/org/centerOrg.js?var=${randomVal}"></script>
<script src="${ctx}/js/pm/microorganism.js?var=${randomVal}"></script>
<script src="${ctx}/js/auth/authUsers.js"></script>



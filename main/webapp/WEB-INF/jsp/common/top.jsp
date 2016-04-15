<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<!--头部-->
<div id="site-header" class="flex-container layout-horizontal flex-space-between">
	<div class="logo-group flex-container flex-space-between">
		<img src="images/base/logo_w.png" alt="" />
		<span class="symbol">|</span>
		<span style="color:#FFFFFF">中心库</span>
		<%--<img src="images/base/logo_kh.png" alt="" /> --%>
		<%--<span id="changeSystem">--%>
			<%--<i class="fa fa-caret-down"></i>--%>
		<%--</span>--%>
	</div>
	<div class="site-top-menu">
		<%--<a href="javascript:void(0)"><i class="fa fa-envelope"></i>折扣到期</a><span class="symbol">|</span>--%>
		<%--<a href="javascript:void(0)"><i class="fa fa-comment"></i>迟发提醒</a><span class="symbol">|</span>--%>
		<%--<a href="javascript:void(0)"><i class="fa fa-bell"></i>危急值</a><span class="symbol">|</span>--%>
		<div class="drop-down">
			<div class="drop-down-selected">
				<i class="fa fa-user"></i><span class="selected-value">欢迎您,${userName}</span>
				<!-- <i class="fa fa-angle-down"></i> -->
			</div>
			<div class="drop-down-menu">
				<ul class="list-unstyled">
					<li><a href="javascript:void(0)" class="easyui-linkbutton" onclick="addTab('个人信息','/comming/auth/user/doUserInfo')"><i class="fa fa-user"></i> 个人信息</a></li>
					<li><a href="javascript:void(0)" class="easyui-linkbutton" onclick="addTab('修改密码','/comming/auth/user/doInitUpdate')"><i class="fa fa-lock"></i> 修改密码</a></li>
					<li><a href="${ctx}/comming/home/logout"><i class="fa fa-sign-out"></i>退出</a></li>
				</ul>
			</div>
		</div>
		<div id="full-screen">
			<i class="fa fa-arrows-alt"></i>
		</div>
	</div>
</div>
<!--end-->
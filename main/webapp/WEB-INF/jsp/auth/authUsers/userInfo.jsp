<%@ page contentType="text/html;charset=UTF-8" import="com.daan.enums.IsAbleEnum" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
	<!--主题内容-->
	<div class="panel-main">
		<div class="panel-container">
			<div class="panel-main-header">
				<h1 class="text-center color-green">
					<i class="icon icon-user-g"></i>个人信息
				</h1>
			</div>
			<div class="panel-content" style="width: 95%;margin:30px auto;">
				<div class="flex-container flex-space-between flex-flex-start">
					<div class="col-6">
						<div class="form-group">
							<label for=""><strong>用户账号</strong></label> <input type="text" class="form-control block-show" value="${user.userNo }" readOnly="readOnly"/>
						</div>
						<div class="form-group">
							<label for=""><strong>用户名称</strong></label> <input type="text" class="form-control block-show" value="${user.userName }" readOnly="readOnly"/>
						</div>
						<div class="form-group">
							<label for=""><strong>手机号</strong><small>(完成绑定后，您可以用该手机号登录和找回密码)</small>
							</label>
							<div class="form-control-icon icon-right block-show">
								<button class="control-icon J_ShowPop" data-show="ui_blindPhone" disabled="disabled" title="此功能暂时不开放">绑定</button>
								<input type="text" readonly=readonly value="13712345638" class="form-control block-show" />
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label for=""><strong>默认登录机构</strong></label>
							<div class="form-control-icon icon-right block-show">
								<button class="control-icon J_ShowPop" data-show="ui_loginOrganization" onclick="fox('orglogin');">设置</button>
								<input id="ui_loginOrgId" type="hidden" value="${user.orgId }"/>
								<input id="ui_loginOrgName" type="text" class="form-control block-show" value="${user.orgName }" readonly="readonly" />
							</div>
						</div>
						<div class="form-group">
							<label for=""><strong>默认登录系统</strong></label>
							<div class="form-control-icon icon-right block-show">
								<button class="control-icon J_ShowPop" data-show="ui_loginSystem" onclick="fox('sysreg');">设置</button>
								<input id="ui_loginSysId" type="hidden" value="${user.sysId }"/>
								<input id="ui_loginSysName" type="text" class="form-control block-show" value="${user.sysName }" readonly="readonly" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="panel-main-footer text-center">
			<button class="btn btn-submit middle-size" onclick="AuthUsers.ui_submit();">提交</button>
			</div>
		</div>
	</div>
	<!--end-->
	<!--登陆弹窗-->
	<div class="pop" id="ui_loginSystem">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="panel-container">
					<div class="panel-header">
						<h1 class="text-center">设置登录系统</h1>
					</div>
					<table class="table table-default">
						<tr>
							<th></th>
							<th>编码</th>
							<th>系统名称</th>
						</tr>
						  <c:if test="${applications != null || fn:length(applications) != 0}">
							<c:forEach items="${applications}" var="items" varStatus="status">
								<tr id="ui_sysTr_${items.id}">
									<td><input type="radio" name="system" value="${items.id}"/></td>
									<td>${items.codeNo}</td>
									<td>${items.name}</td>
								</tr>
							</c:forEach>
						</c:if> 
					</table> 
					<div class="panel-footer text-center">
						<button class="btn btn-submit sm-size" onclick="ui_message.ui_submitSys();">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--登陆机构-->
	<div class="pop" id="ui_loginOrganization">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="panel-container">
					<div class="panel-header">
						<h1 class="text-center">设置登录机构</h1>
					</div>
					<table class="table table-default">
						<tr>
							<th></th>
							<th>编码</th>
							<th>机构名称</th>
						</tr>
						 <c:if test="${centerorg != null || fn:length(centerorg) != 0}">
							<c:forEach items="${centerorg}" var="items" varStatus="status">
								<tr id="ui_orgTr_${items.id}">
									<td><input type="radio" name="org" value="${items.id}"/></td>
									<td>${items.codeNo}</td>
									<td>${items.name}</td>
								</tr>
							</c:forEach>
						</c:if> 
					</table>
					<div class="panel-footer text-center">
						<button class="btn btn-submit sm-size" onclick="ui_message.ui_submitOrg();">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>

			</div>
		</div>
	</div>

	<!--绑定手机-->
	<div class="pop" id="ui_blindPhone">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="panel-container">
					<div class="panel-header">
						<h1 class="text-center">绑定手机号</h1>
					</div>
					<div class="panel-content">
						<div class="form-group">
							<label for=""><strong>手机号</strong> <small>(完成绑定后，您可以用该手机号登录和找回密码)</small>
							</label> <input type="text" class="form-control block-show" />
						</div>
						<div class="form-group">
							<label for=""><strong>验证码</strong> </label>

							<div class="form-control-icon icon-right md-size">
								<button class="control-icon" data-show="loginSystem">
									获取短信验证码</button>
								<input type="text" class="form-control block-show" />
							</div>
						</div>
					</div>
					<div class="panel-footer text-center">
						<button class="btn btn-submit sm-size">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
 <script src="${ctx}/js/auth/user.js?var=v1.0.0.1"></script>
<style>
	.panel-main{
		width:800px;margin:auto;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);margin-top: 20px;
	}
	.panel-main-header{
		border-bottom: 1px solid #cdd2d4;padding:30px;
	}
	.color-green{
		color: #39bc8b
	}
	.panel-main-footer{
		border-top: 1px solid #cdd2d4;margin-top: 30px;padding: 30px;
	}
	.col-6 {
	  width: 50%;padding-right: 40px;
	}
	.col-6:not(:first-child) {
	  border-left: 2px dashed #e1e9ed;padding-left: 40px;padding-right: 0;
	}
	.control-icon {
	  position: absolute;left: 0;top: 0;width: 40px;bottom: 0;background: transparent;border: none;line-height: 1;text-align: center;float: right;
	}
	.form-control {
  		padding-left: 10px;
	}
	.form-control-icon.icon-right.md-size .form-control {
	  padding-right: 120px;
	}
	.form-control-icon.icon-right.md-size .control-icon {
	  width: 120px;
	}
	.form-control-icon.icon-right .form-control {
	  padding-right: 50px; padding-left: 10px;
	}
	.form-control-icon.icon-right .control-icon {
	  left: auto; right: 0; width: 50px;
	}
	.form-control-icon.icon-right .control-icon:after {
	  display: none;
	}
	.table {
	  width: 100%; border-collapse: collapse;
	}
	.table td, .table th {
	  padding: 10px; border: 1px solid #e1e9ed;
	}
	.table td:first-child, .table th:first-child {
	  border-left: none;
	}
	.table td:last-child, .table th:last-child {
	  border-right: none;
	}
	.table tr.selected td {
	  background: #fefaa3;
	}
	.table th {
	  color: #818c99; text-align: left;
	}
	.table a {
	  color: #39bc8b;
	}
	
	.table-header, .table-footer {
	  padding-top: 20px; padding-bottom: 20px;
	}
	.table-header .form-control-icon, .table-footer .form-control-icon {
	  margin-bottom: 0;
	}
</style>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
 <%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
	<!--主题内容-->
	<div class="container">
		<div class="panel-container">
			<div class="panel-header text-center">
				<h1>
					<i class="icon icon-user-g"></i> 个人信息
				</h1>
			</div>
			<div class="panel-content">
				<div class="flex-container flex-space-between flex-flex-start">
					<div class="col-6">
						<div class="form-group">
							<label for=""><strong>用户账户</strong></label> <input type="text" class="form-control block-show" value="${user.name }" />
						</div>
						<div class="form-group">
							<label for=""><strong>用户名称</strong></label> <input type="text" class="form-control block-show" value="${user.userName }" />
						</div>
						<div class="form-group">
							<label for=""><strong>手机号</strong><small>(完成绑定后，您可以用该手机号登录和找回密码)</small>
							</label>
							<div class="form-control-icon icon-right block-show">
								<button class="control-icon J_ShowPop" data-show="blindPhone" disabled="disabled" title="此功能暂时不开放">修改</button>
								<input type="text" value="13712345638" class="form-control block-show" />
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label for=""><strong>默认登录机构</strong></label>
							<div class="form-control-icon icon-right block-show">
								<button class="control-icon J_ShowPop" data-show="loginOrganization">设置</button>
								<input type="text" class="form-control block-show" value="广州达安医学检验中心" readonly="readonly" />
							</div>
						</div>
						<div class="form-group">
							<label for=""><strong>默认登录系统</strong></label>
							<div class="form-control-icon icon-right block-show">
								<button class="control-icon J_ShowPop" data-show="loginSystem">设置</button>
								<input type="text" class="form-control block-show" value="康明LIS" readonly="readonly" />
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="panel-footer text-center">
				<a href="user.html" class="btn btn-submit middle-size">提交</a>
			</div>
		</div>
	</div>
	<!--end-->
	<!--登陆弹窗-->
	<div class="pop" id="loginSystem">
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
								<tr>
									<td><input type="radio" name="system" checked="checked" /></td>
									<td>${items.codeNo}</td>
									<td>${items.name}</td>
								</tr>
							</c:forEach>
						</c:if> 
					</table> 
					<div class="panel-footer text-center">
						<button class="btn btn-submit sm-size">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--登陆机构-->
	<div class="pop" id="loginOrganization">
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
								<tr>
									<td><input type="radio" name="system" checked="checked" /></td>
									<td>${items.codeNo}</td>
									<td>${items.name}</td>
								</tr>
							</c:forEach>
						</c:if> 
					</table>
					<div class="panel-footer text-center">
						<button class="btn btn-submit sm-size">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>

			</div>
		</div>
	</div>

	<!--绑定手机-->
	<div class="pop" id="blindPhone">
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

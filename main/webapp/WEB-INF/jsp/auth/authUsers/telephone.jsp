<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/5/21
  Time: 15:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
  <div class="pop-inner-wrap">
    <div class="pop-container">
      <div class="wrapper-container">
        <div class="wrapper-header flex-container flex-space-between"><h1>绑定手机号</h1>
        </div>
        <div class="wrapper-content">
          <div class="flex-container">
            <div class="form-combo block-show">
              <label for=""><span class="required-icon">*</span><strong>手机号</strong> <small>(完成绑定后，您可以用该手机号登录和找回密码)</small></label>
              <input type="text" maxlength="11" id="mobile" class="form-control block-show" />

            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <label for=""><span class="required-icon">*</span><strong>验证码</strong></label>
              <div class=" flex-container flex-space-between">
                <div class="form-control-icon icon-right md-size">
                  <button id="getpasscode"  onclick="getPasscode();" class="control-icon" data-show="loginSystem">获取短信验证码</button>
                  <input id="passCode" name="passCode" type="text"  class="form-control block-show" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper-footer text-center">
          <button class="btn btn-submit sm-size" onclick="AuthUsers.saveMobile();">确定</button>
          <button class="btn btn-cancel sm-size J_ClosePop" >关闭</button>
        </div>
      </div>
    </div>
  </div>

<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/5/23
  Time: 16:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="col-6 margin-center">
  <div class="form-group">
    <label for=""><strong>账号/手机号</strong>
    </label>

    <input type="text" id="mobile" class="form-control block-show" value="${mobile}"
           readonly="readonly"/>
  </div>

  <div class="form-group">
    <label for=""><strong>短信验证码</strong>
    </label>

    <div class="form-control-icon icon-right md-size block-show">
      <button class="control-icon" id="getPassCode" onclick="getPassword.getCode();">
        获取短信验证码
      </button>
      <input type="text" maxlength="6" id="passcode" class="form-control block-show"/>
    </div>

  </div>
</div>
<div class="panel-footer text-center">
  <button onclick="getPassword.secondSubmit();" class="btn btn-submit middle-size">下一步</button>
</div>


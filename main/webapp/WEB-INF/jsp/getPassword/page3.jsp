<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/5/23
  Time: 17:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="col-6 margin-center">
  <div class="form-group">
    <label for=""><strong>新密码</strong>
      <small>(6-20个，字母、数字的组合)</small>
    </label>

    <input id="newPW" maxlength="20" type="password" class="form-control block-show"/>
  </div>

  <div class="form-group">
    <label for=""><strong>确认新密码</strong>
    </label>

    <input id="checkPW" maxlength="20"  type="password" class="form-control block-show"/>

  </div>
</div>
<div class="panel-footer text-center">
  <button onclick="getPassword.thirdSubmit();" class="btn btn-submit middle-size">提交</button>
</div>

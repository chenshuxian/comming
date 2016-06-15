<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/5/23
  Time: 14:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
  <title></title>
  <link rel="stylesheet" type="text/css" href="css/getPWcss.css"/>
  <link rel="stylesheet" type="text/css" href="${ctx}/scripts/jalert/jquery.alerts.css"/>
  <script>
    var ctx = "<%=request.getContextPath()%>";
  </script>
  <script src="${ctx}/js/jquery-2.1.4.min.js"></script>
  <script src="${ctx}/scripts/jalert/jquery.alerts.js"></script>
  <script src="${ctx}/js/getPassword.js"></script>
</head>
<body class="personal-center-content">
<!--头部-->
<header id="site-header" class="personal-center">
  <div class="container flex-container flex-space-between">
    <div class="logo"><a href="index.html"><img src="images/logo_w.png" alt=""/></a>  <span class="title">个人信息</span></div>
    <%--<p>--%>
      <%--欢迎，a100001 <span class="symbol">|</span> <a href=""><i class="icon icon-logout"></i> 退出</a>--%>
    <%--</p>--%>
  </div>
</header>
<!--end-->
<!--主题内容-->
<main>
  <div class="container">
    <div class="panel-container">
        <div class="panel-header">
          <h1 class="text-center"> 找回密码</h1>
        </div>
        <div class="panel-content">
          <div class="progress-bar flex-container flex-space-between row-direction">
            <div class="items active">
              <span>1.输入手机号</span>
            </div>
            <div class="items">
              <span>2.验证身份</span>
            </div>
            <div class="items">
              <span>3.重置密码</span>
            </div>
            <div class="items">
              <span>4.完成</span>
            </div>
          </div>

          <div id="changeBlock">
            <div class="col-6 margin-center">
              <div class="form-group">
                <label for=""><strong>手机号</strong>
                </label>

                <input id="mobile" maxlength="11" type="text" class="form-control block-show" />
              </div>

              <div class="form-group">
                <label for=""><strong>图片验证码</strong>
                </label>

                <div class="flex-container flex-space-between validate-code">
                  <input id="passcode" type="text" class="form-control block-show"/>
                  <a><img id="imgCaptcha" src="${ctx}/home/captcha" /></a>
                  <span id="changeCaptcha"><i class="icon icon-refresh"></i> 换一张</span>
                </div>

              </div>
            </div>
            <div class="panel-footer text-center">
              <button class="btn btn-submit middle-size" id="firstSubmit">提交</button>
            </div>
          </div>

        </div>

    </div>
  </div>
</main>
<!--end-->
</body>
</html>

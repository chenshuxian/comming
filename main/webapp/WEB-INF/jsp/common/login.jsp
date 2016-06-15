<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html>
<html lang="en">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
<meta name="description" content="康明系统">
<meta name="author" content="达安健康">
<link rel="icon" href="img/favicon.ico">
<link href="css/icon.css" rel="stylesheet">
<link href="scripts/jalert/jquery.alerts.css" rel="stylesheet">
<link href="css/loginCss.css" rel="stylesheet">
<title>云康中心库－用户登录</title>
</head>
<script src="${ctx}/js/jquery-2.1.4.min.js"></script>
<script src="${ctx}/scripts/jalert/jquery.alerts.js"></script>
<script src="${ctx}/js/basicModule.js"></script>
<script src="${ctx}/js/message.js"></script>
<script src="${ctx}/js/enterToTab.js"></script>

<%--<script src="${ctx}/js/enterToTab.js"></script>--%>
<%--<script>--%>
    <%--$(document).ready(function () {--%>
        <%--$(':input:text:first').focus();--%>
        <%--var textboxes = $('.enterIndex');--%>
        <%--textboxes.on("keydown", CheckForEnter);--%>
        <%--// now we check to see which browser is being used--%>
<%--//        if ($.browser.mozilla) {--%>
<%--//            $(textboxes).on('keypress', CheckForEnter);--%>
<%--//        } else {--%>
<%--//            $(textboxes).on('keydown', CheckForEnter);--%>
        <%--//}--%>
    <%--});--%>
    <%--function CheckForEnter(event) {--%>
        <%--if (event.keyCode == 13 && $(this).attr('type') != 'button' && $(this).attr('type') != 'submit') {--%>
            <%--var i = $('.enterIndex').index($(this));--%>
            <%--var n = $('.enterIndex').length;--%>
            <%--if($(this).attr('type') == "password"){--%>
                <%--$("form").submit();--%>
            <%--}--%>
            <%--if (i < n - 1) {--%>
                    <%--NextDOM($('.enterIndex'),i);--%>
            <%--}--%>
            <%--return false;--%>
        <%--}--%>
    <%--}--%>
    <%--function NextDOM(myjQueryObjects,counter) {--%>
        <%--if (myjQueryObjects.eq(counter+1)[0].disabled) {--%>
            <%--NextDOM(myjQueryObjects, counter + 1);--%>
        <%--}--%>
        <%--else {--%>
            <%--myjQueryObjects.eq(counter + 1).trigger('focus');--%>
        <%--}--%>
    <%--}--%>

<%--</script>--%>
<script>
    $(function(){
        $("#user_name").focus();
//        console.log("screen:" + screen.width);
//        if (screen.width == 1024) {
//            console.log(screen.width);
//            BasicModule.showMessage("您的屏幕分辨率为 1024 * 768 ，为使系统呈现最佳效果<br>，请调高你的屏幕分辨率");
//        }
    });

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function makeToArray(obj) {
    return Array.prototype.slice.call(obj);
}
//document.addEventListener('DOMContentLoaded', function () {
//    var banner = document.getElementById('banner');
//    var slide = makeToArray(banner.querySelectorAll('.slide'));
//    var paginationItems;
//    var _current = 0;
//    var len = slide.length;
//    var time = 5000;
//
//    function generatePagination() {
//        var oFragment = document.createDocumentFragment();
//        var pagination = document.createElement('ul');
//        pagination.className = 'pagination';
//        for (var i = 0; i < len; i++) {
//            pagination.appendChild(document.createElement('li'));
//        }
//        oFragment.appendChild(pagination);
//        banner.appendChild(oFragment);
//    }
//
//    function init() {
//        generatePagination();
//        paginationItems = makeToArray(banner.getElementsByClassName('pagination')[0].querySelectorAll('li'));
//        sliders(0);
//        setPagination(0);
//    }
//
//    init();
//
//    function sliders(_current) {
//        slide.forEach(function (element, index) {
//            element.style.zIndex = index;
//            element.style.opacity = 0;
//        });
//        slide[_current].style.zIndex = slide.length + 9;
//        slide[_current].style.opacity = 1;
//    }
//
//
//    function setPagination(_current) {
//        paginationItems.forEach(function (element, index) {
//            element.classList.remove('active');
//        });
//        paginationItems[_current].classList.add('active');
//    }
//
//    var slideTimer = setInterval(function () {
//        sliders(_current);
//        setPagination(_current);
//        if (_current < len) {
//            _current++;
//        }
//        if (_current > len - 1) {
//            _current = 0;
//        }
//    }, time);
//
//}, false);
</script>
<body>
<!--头部-->
<header id="site-header">
    <div class="container flex-container flex-space-between">
        <div class="logo">
        	<a href="http://www.yunkanghealth.com/" target="_blank">
        		<img id="loginLogo" src="images/logo.png" alt=""/>
        	</a>
        </div>
    </div>
</header>
<!--end-->
<!--主题内容-->
<main>
    <section id="banner">
        <div class="container rel" style="width: 1047px; padding-top: 20px; position: relative; overflow: hidden;">
            <div id="loginTitleDiv">
                <h3 id="loginTitle">中心库管理平台</h3>
                <ul class="zindex20">
                    <li><h2>专业化医学资源联动</h2></li>
                    <li><h2>标准化服务平台实施</h2></li>
                    <li><h2>智慧化联结运行支持</h2></li>
                </ul>
            </div>
            <div style="width: 282px; height: 345px; float: right; position: relative;" id="login-form" class="panel-container">
                <h1>用户登录</h1>
                <form id="loginForm" class="form-signin" action="/comming/home/login" method="POST">
                    <div class="form-control-icon block-show">
                        <button class="control-icon">
                            <i class="icon icon-user"></i>
                        </button>
                        <strong><input class="form-control block-show enterIndex" placeholder="输入账户/手机号" id="user_name" name="user_name" value="" tabindex="1" type="text"></strong>
                    </div>
                    <div class="form-control-icon block-show">
                        <button class="control-icon">
                            <i class="icon icon-lock"></i>
                        </button>
                        <input class="form-control block-show enterIndex" placeholder="输入密码" id="password" name="password" tabindex="2" type="password">
                    </div>
                    <div class="error-tips">

                    </div>
                    <div>
                        <button id="editBtn" type="submit" tabindex="3" class="btn btn-submit block-show enterIndex">登录</button>
                    </div>
                </form>
                <div class="form-tips text-center">
                    忘记密码？<a href="/comming/home/getPassword">立即找回密码</a>
                </div>
            </div>

        </div>
    </section>
    <%--<section id="banner">--%>
        <%--&lt;%&ndash;<div style="width:52%;height:300px;float:left;"></div>&ndash;%&gt;--%>
        <%--<div class="container rel" style="width:900px;padding-top:15px;overflow:hidden;zoom:1;">--%>
            <%--<div id="loginTitleDiv">--%>
                <%--<h3 id = "loginTitle">中心库管理平台</h3>--%>
                <%--<ul class="zindex20">--%>
                    <%--<li><h2>专业化医学资源联动</h2></li>--%>
                    <%--<li><h2>标准化服务平台实施</h2></li>--%>
                    <%--<li><h2>智慧化联结运行支持</h2></li>--%>
                <%--</ul>--%>
            <%--</div>--%>
            <%--<div id="login-form" class="panel-container">--%>
                <%--<h1>用户登录</h1>--%>
                <%--<form id="loginForm" class="form-signin" action="${ctx}/home/login" method="POST">--%>
                    <%--<div class="form-control-icon block-show">--%>
                        <%--<button class="control-icon">--%>
                            <%--<i class="icon icon-user"></i>--%>
                        <%--</button>--%>
                        <%--<input type="text" class="form-control block-show enterIndex" placeholder="输入账户/手机号" id="user_name" name="user_name" value="${user_name}" tabindex="1"/>--%>
                    <%--</div>--%>
                    <%--<div class="form-control-icon block-show">--%>
                        <%--<button class="control-icon">--%>
                            <%--<i class="icon icon-lock"></i>--%>
                        <%--</button>--%>
                        <%--<input type="password" class="form-control block-show enterIndex" placeholder="输入密码" id="password" name="password" tabindex="2" />--%>
                    <%--</div>--%>
                    <%--<div class="error-tips">--%>
                        <%--<c:if test='${errorMSG!=""}'>${fn:substring(errorMSG,4,200)}</c:if>--%>
                    <%--</div>--%>
                    <%--<div>--%>
                        <%--<button id="editBtn" type="submit" tabindex="3" class="btn btn-submit block-show enterIndex">登录</button>--%>
                    <%--</div>--%>
                <%--</form>--%>
                <%--<div class="form-tips text-center">--%>
                    <%--忘记密码？<a href="${ctx}/home/getPassword" >立即找回密码</a>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="slide" style="background:url('images/login_banner.jpg') no-repeat center center"></div>--%>
        <%--</div>--%>
        <%--&lt;%&ndash;<div class="slide" style="background:url('images/banner.jpg') no-repeat center center"></div>&ndash;%&gt;--%>
    <%--</section>--%>

</main>
<!--end-->
<!--底部-->
<footer class="site-footer">
    <div class="container clearfix">
        <section class="pull-left">


        </section></div>
    <div class="container text-center f14">
        <address>
            <p><a href="mailto:pr@daanhealth.com"><i class="fa fa-envelope-o"></i>pr@daanhealth.com</a><span class="items"><i class="fa fa-map-marker"></i>广东省广州市黄埔区科学城荔枝山路6号达安健康总部 / 广东省广州市越秀区东风东路中山大学北校区北门云康服务中心</span></p>
            <p><a href="http://www.yunkanghealth.com">www.yunkanghealth.com</a> © 2015 版权所有： 云康    <span class="items">						 备案号：<a href="http://www.miibeian.gov.cn" rel="nofollow" target="_blank">粤ICP备12059545号-6</a>
						 </span></p>
            <section class=" platform">
                <div class="group clearfix" id="group">
                    <span class="pull-left"><img src="images/erweima1.jpg" alt=""><br>云康公众号</span>
                    <span class="pull-right"><img src="images/erweima2.jpg" alt=""><br>达安临检公众号</span>
                </div>
            </section>
        </address>
    </div>
</footer>
<%--<footer id="site-footer">--%>
    <%--<div class="container flex-container flex-space-between">--%>
        <%--<div class="copyright">Copyright © 2013-2015 <a href="http://www.yunkanghealth.com" target="_blank">www.yunkanghealth.com</a>--%>
            <%--All Rights Reserved.--%>
        <%--</div>--%>
        <%--<div class="sub-menu">--%>
            <%--<a href="">了解云康</a>--%>
            <%--<span class="symbol">|</span>--%>
            <%--<a href="">合作伙伴</a>--%>
            <%--<span class="symbol">|</span>--%>
            <%--<a href="">技术支持</a>--%>
            <%--<span class="symbol">|</span>--%>
            <%--<a href="">联系我们</a>--%>
        <%--</div>--%>
    <%--</div>--%>
<%--</footer>--%>
<!--end-->
</body>

</html>
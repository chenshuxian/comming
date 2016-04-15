<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
<meta name="description" content="康明系统">
<meta name="author" content="达安健康">
<link rel="icon" href="img/favicon.ico">
<link href="css/loginCss.css" rel="stylesheet">
<title>康明系统－用户登录</title>
</head>
<script>
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
//var userName = GetCookie("userName");
//if(userName != null && userName != ''){
//	$("#user_name").val(userName);
//}
//$(function(){
//	if(userName != null && userName != ''){
//		$("#user_name").val(userName);
//	}
//});

function makeToArray(obj) {
    return Array.prototype.slice.call(obj);
}
document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('banner');
    var slide = makeToArray(banner.querySelectorAll('.slide'));
    var paginationItems;
    var _current = 0;
    var len = slide.length;
    var time = 5000;

    function generatePagination() {
        var oFragment = document.createDocumentFragment();
        var pagination = document.createElement('ul');
        pagination.className = 'pagination';
        for (var i = 0; i < len; i++) {
            pagination.appendChild(document.createElement('li'));
        }
        oFragment.appendChild(pagination);
        banner.appendChild(oFragment);
    }

    function init() {
        generatePagination();
        paginationItems = makeToArray(banner.getElementsByClassName('pagination')[0].querySelectorAll('li'));
        sliders(0);
        setPagination(0);
    }

    init();

    function sliders(_current) {
        slide.forEach(function (element, index) {
            element.style.zIndex = index;
            element.style.opacity = 0;
        });
        slide[_current].style.zIndex = slide.length + 9;
        slide[_current].style.opacity = 1;
    }


    function setPagination(_current) {
        paginationItems.forEach(function (element, index) {
            element.classList.remove('active');
        });
        paginationItems[_current].classList.add('active');
    }

    var slideTimer = setInterval(function () {
        sliders(_current);
        setPagination(_current);
        if (_current < len) {
            _current++;
        }
        if (_current > len - 1) {
            _current = 0;
        }
    }, time);

}, false);
</script>
<body>
<!--头部-->
<header id="site-header">
    <div class="container flex-container flex-space-between">
        <div class="logo">
        	<a href="index.html">
        		<img src="images/logo.png" alt=""/>
        	</a>
        </div>
    </div>
</header>
<!--end-->
<!--主题内容-->
<main>
    <section id="banner">
        <div class="slide" style="background:url('images/banner.jpg') no-repeat center center"></div>
        <div class="slide" style="background:url('images/banner.jpg') no-repeat center center"></div>
        <div class="slide" style="background:url('images/banner.jpg') no-repeat center center"></div>
    </section>
    <div id="login-form" class="panel-container">
        <h1>用户登录</h1>
        <form id="loginForm" class="form-signin" action="${ctx}/home/login" method="POST">
            <div class="form-control-icon block-show">
                <button class="control-icon">
                    <i class="icon icon-user"></i>
                </button>
                <input type="text" class="form-control block-show" placeholder="输入账户/手机号" id="user_name" name="user_name" value="${user_name}" tabindex="1"/>
            </div>
            <div class="form-control-icon block-show">
                <button class="control-icon">
                    <i class="icon icon-lock"></i>
                </button>
                <input type="password" class="form-control block-show" placeholder="输入密码" id="password" name="password" tabindex="2"/>
            </div>
			<div class="error-tips">
				<c:if test='${errorMSG!=""}'>${fn:substring(errorMSG,4,200)}</c:if>
			</div>
            <div>
                <button type="submit" class="btn btn-submit block-show">登录</button>
            </div>
            <div class="form-tips text-center">
                	忘记密码？<a href="#" onclick='openWin("http://localhost:8081/User/home/getPassword")'>立即找回密码</a>
            </div>
        </form>
    </div>
</main>
<!--end-->
<!--底部-->
<footer id="site-footer">
    <div class="container flex-container flex-space-between">
        <div class="copyright">Copyright © 2013-2015 <a href="http://www.yunkanghealth.com" target="_blank">www.yunkanghealth.com</a>
            All Rights Reserved.
        </div>
        <div class="sub-menu">
            <a href="">了解云康</a>
            <span class="symbol">|</span>
            <a href="">合作伙伴</a>
            <span class="symbol">|</span>
            <a href="">技术支持</a>
            <span class="symbol">|</span>
            <a href="">联系我们</a>
        </div>
    </div>
</footer>
<!--end-->
</body>
</html>
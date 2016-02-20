<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>设置密码</title>
</head>
<body>
    <div class="panel-main">
        <div class="panel-container">
            <div class="panel-main-header">
                <h1 class="text-center color-green"><i class="icon icon-lock-g"></i> 设置密码</h1>
            </div>
            <div class="panel-content" style="width: 60%;margin:30px auto;">
                <div class="col-6 margin-center">
                    <div class="form-group">
                        <label for="">
                        	<strong>密码</strong>
                            <small>(6-20个字符，字母、数字和符号的组合)</small>
                        </label>
                        <input type="password" class="form-control block-show" id="password"/>
                    </div>
                    <div class="form-group">
                        <label for="">
                        	<strong>确认密码</strong>
                        </label>
                        <input type="password" class="form-control block-show" id="rePassword"/>
                    </div>
                </div>
            </div>
            <div class="panel-main-footer text-center">
                <button class="btn btn-submit middle-size" onclick="ui_message.setPassword();">提交</button>
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
</style>
<!--end-->
</body>

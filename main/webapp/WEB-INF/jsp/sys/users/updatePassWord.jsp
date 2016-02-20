 <!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
    <div class="panel-main">
        <div class="panel-container">
            <div class="panel-main-header">
                <h1 class="text-center color-green"><i class="icon icon-lock-g"></i>修改密码</h1>
            </div>
            <div class="panel-content" style="width: 60%;margin:30px auto;">
                <div class="col-6 margin-center">
                    <div class="form-group">
                    	<div class="form-group">
                            <label for=""><strong>旧密码</strong>
                            </label>
                            <input type="password" class="form-control block-show" id="up_oldPassword" />
                        </div>
                        <label for="">
                        	<strong>密码</strong>
                            <small>(6-20个字符，字母、数字和符号的组合)</small>
                        </label>
                        <input type="password" class="form-control block-show" id="up_newPassword" />
                    </div>
                    <div class="form-group">
                        <label for="">
                        	<strong>确认密码</strong>
                        </label>
                        <input type="password" class="form-control block-show" id="up_reNewPassword"/>
                    </div>
                </div>
            </div>
            <div class="panel-main-footer text-center">
                <button class="btn btn-submit middle-size" onclick="ui_message.updatePassword();">提交</button>
            </div>
        </div>
    </div>
 <script src="${ctx}/js/sys/user.js?var=v1.0.0.1"></script>
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
 
<%--
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<!--主题内容-->
<main>
    <div class="container">
        <div class="panel-container">
            <form action="getPassword-2.html">
                <div class="panel-header">
                    <h1 class="text-center"><i class="icon icon-lock-g"></i>修改密码</h1>
                </div>
                <div class="panel-content">
                    <div class="col-6 margin-center">
                        <div class="form-group">
                            <label for=""><strong>旧密码</strong>
                            </label>

                            <input type="text" class="form-control block-show"/>
                        </div>
                        <div class="form-group">
                            <label for=""><strong>密码</strong>
                                <small>(6-20个字符，字母、数字和符号的组合)</small>
                            </label>

                            <input type="text" class="form-control block-show"/>
                        </div>
                        <div class="form-group">
                            <label for=""><strong>确认密码</strong>
                            </label>

                            <input type="text" class="form-control block-show"/>
                        </div>
                    </div>
                </div>
                <div class="panel-footer text-center">
                    <button class="btn btn-submit middle-size">提交</button>
                </div>
            </form>
        </div>
    </div>
</main>
<!--end-->
--%>
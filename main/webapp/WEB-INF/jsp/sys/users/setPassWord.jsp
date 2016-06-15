<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<main>
    <div class="container">
        <div class="panel-container">
            <div class="panel-header">
                <h1 class="text-center"><i class="icon icon-lock-g"></i> 设置密码</h1>
            </div>
            <div class="panel-content">
                <div class="col-6 margin-center">
                    <div class="form-group">
                        <label for=""><strong>密码</strong>
                            <small>(6-20个字符，字母、数字的组合)</small>
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
        </div>
    </div>
</main>
<!--end-->

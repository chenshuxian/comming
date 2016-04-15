<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/14
  Time: 11:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap">
  <div class="pop-container">
    <div class="wrapper-container">
      <form id="InfoForm">
        <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
        </div>
        <div class="wrapper-content">
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="userNo"><span class="required-icon">*</span>用户帐号:</label>
                admin<input type="text" class="form-control block-show" id="userNo" name="userNo"/>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label></label>
                <span class="required-icon">admin开头，长度不超过20个字符（数字、字母和下划线），每个帐号最少包含一个字母，不区分大小写，确定后不可修改。</span>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="userName"><span class="required-icon">*</span>用户名称:</label>
                <input type="text" class="form-control block-show" id="userName" name="userName"/>
              </div>
            </div>
          </div>

        </div>
        <input type="hidden" id="appId" name="appId"/>
        <input type="hidden" id="orgId" name="orgId"/>
        <input type="hidden" id="action" name="action" value="add"/>
        <div class="wrapper-footer text-center">
          <button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
          <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
        </div>
      </form>

    </div>
  </div>
</div>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

  <div class="pop-inner-wrap">
    <div class="pop-container">
      <div class="wrapper-container">
        <div class="wrapper-header flex-container flex-space-between">
          <h1>授权管理</h1>
        </div>
        <div class="wrapper-content" style="overflow-y:auto;height: 500px">
          <ul id="rolePermissionManagerData" class="easyui-tree"></ul>
        </div>
        <input type="hidden" id= "userGroupsId">
        <input type="hidden" id= "userGroupsName">
        <input type="hidden" id= "userGroupsCodeNo">
        <div class="wrapper-footer text-center">
          <button class="btn btn-submit sm-size" id="rolePermission" onclick="UserGroupsMain.submitRolePermission();">确定</button>
          <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
        </div>
      </div>
    </div>
  </div>


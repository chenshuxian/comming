<%--
  Created by IntelliJ IDEA.
  User: reach-pc
  Date: 2016/1/20
  Time: 12:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap" >
    <div class="pop-container" >
        <div class="wrapper-container">
            <div class="wrapper-header flex-container flex-space-between"><h1>分配角色</h1>

            </div>
            <div class="wrapper-content">
                <table id="userGroup_tree" style="width:100%;height:400px"></table>

            </div>

            <div class="wrapper-footer text-center">
                <button id="authUser_btnSave" class="btn btn-submit sm-size J_ShowPop" onclick="authUsers_saveUserGroup()">确定</button>
                <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
            </div>
            <input type="hidden" id="userGroup_userId">

        </div>

    </div>
</div>
<script type="text/javascript">
    function authUsers_saveUserGroup(){
        var userId = $('#userGroup_userId').val();
        var nodes = $('#userGroup_tree').tree('getChecked');
        var groupIds = [];
        for(i in nodes){
            groupIds[i] = nodes[i].id;
        }
        var gps = {};
        gps.groupIds = groupIds;
        AuthUsers.saveUserGroup(userId,groupIds);
    }
</script>

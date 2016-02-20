<%--
  Created by IntelliJ IDEA.
  User: reach-pc
  Date: 2016/1/15
  Time: 15:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<div class="pop-inner-wrap">
    <div class="pop-container">
        <div class="wrapper-container">
            <form id="InfoForm">
                <div class="wrapper-header"><h1 class="text-center">基本信息</h1></div>

                <div class="wrapper-content">

                    <div class="form-group">
                        <label for="editUserNo"><strong><span class="required-icon">*</span>用户账号 </strong>
                            <small>(4-20位，可由数字、字母和下划线组成，最少包含一位字母，字母不区分大小写)</small>
                        </label>

                        <input type="text" class="form-control block-show" id="editUserNo" name="userNo"/>
                    </div>
                    <div class="form-group">
                        <label for="editUserName"><strong><span class="required-icon">*</span>用户名称</strong>
                        </label>
                        <input type="text" class="form-control block-show" id="editUserName" name="userName"/>

                    </div>
                    <div class="form-group">
                        <label for="editDisplayOrder"><strong>顺序号</strong>
                        </label>
                        <input type="text" class="form-control block-show" name="displayOrder" id="editDisplayOrder"/>

                    </div>
                    <div class="form-group">
                        <label for="editMemo"><strong>备注</strong>
                        </label>
                        <input type="text" class="form-control block-show" name="memo" id="editMemo"/>
                    </div>
                </div>
                <input type="hidden" id="editId" name="id"/>
                <input type="hidden" id="editOpType" name="opType" />
            </form>
            <div class="wrapper-footer text-center">
                <script type="text/javascript">
                    function authUsers_onclickSave(){
                        var _optype = $('#editOpType').val();
                        AuthUsers.updateAuthUsers(_optype);
                    }
                </script>
                <button id="editBtn" class="btn btn-submit sm-size"
                        onclick="authUsers_onclickSave()">确定
                </button>
                <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
            </div>

        </div>
    </div>
</div>


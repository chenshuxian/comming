<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/14
  Time: 17:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap">
  <div class="pop-container">
    <div class="wrapper-container">
      <form id="InfoForm">
        <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
          <small class="basic-code">编码: ${codeNo}<span id="spanEditCodeNo"></span></small>
        </div>
        <div class="wrapper-content">
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="editName"><span class="required-icon">*</span>模板名称:</label>
                <input type="text" class="form-control block-show" id="editName" name="name"/>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="editDisplayOrder"><span class="required-icon">*</span>模版类型:</label>
                <select name="typeKey"  id="typeKey" style="width: 315px;height: 30px;line-height: 16px;padding-left: 8px;border: 1px solid #cdd2d4;vertical-align: middle;box-sizing: border-box;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) inset;">
                  <option value="0">报告</option>
                  <option value="1">条码标签</option>
                  <option value="2">报表</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="editDisplayOrder">顺序号:</label>
                <input type="text" class="form-control block-show" id="editDisplayOrder"
                       name="displayOrder" value="${displayOrder}"/>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="editMemo">备注:</label>
                <textarea class="form-control block-show" id="editMemo" name="memo"></textarea>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" id="editId" name="id"/>
        <input type="hidden" id="opType" name="opType" value="${opType}"/>
        <input type="hidden" id="editCodeNo" name="codeNo" value="${codeNo}"/>
        <div class="wrapper-footer text-center">
          <button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
          <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
        </div>
      </form>

    </div>
  </div>
</div>

<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/4/15
  Time: 10:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap">
  <div class="pop-container" id="uploadPop">
    <div class="wrapper-container">
        <div class="wrapper-header flex-container flex-space-between"><h1>上传模板</h1><span class="required-icon">只能上传.repx格式文件</span>
        </div>
        <div class="wrapper-content">
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container">
                <label for="upload"><span class="required-icon">*</span>上传模板:</label>
                <input type="file" id="upload" name="upload"/>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" id="editId" name="id"/>
        <div class="wrapper-footer text-center">
          <button id="editBtn" class="btn btn-submit sm-size" onclick="CtrTemplate.uploadSave()">确定</button>
          <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
        </div>
    </div>
  </div>
</div>

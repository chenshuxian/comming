<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<form id="InfoForm" method="post" class="easyui-form" data-options="novalidate: false">
    <div class="pop-inner-wrap">
      <div class="pop-container">
        <div class="wrapper-container">
          <div class="wrapper-header flex-container flex-space-between">
            <h1>基本信息</h1>
            <small class="tips">编码:${codeNo}<span id="spanEditCodeNo"></span></small>
          </div>
          <div class="wrapper-content">
            <div class="flex-container">
              <div class="form-combo block-show">
                <div class=" flex-container  flex-space-between">
                  <label for=""><span class="required-icon">*</span>名称:</label>
                  <input type="text" id="name" name="name" class="form-control block-show" maxlength="50">
                </div>
              </div>
            </div>
            <div class="flex-container">
              <div class="form-combo block-show">
                <div class=" flex-container  flex-space-between">
                  <label for="">顺序号:</label>
                  <input type="text" id="displayOrder" name="displayOrder" value="${displayOrder}"
                         class="form-control block-show" maxlength="6">
                </div>
              </div>
            </div>
            <div class="flex-container">
              <div class="form-combo block-show">
                <div class=" flex-container  flex-space-between">
                  <label for="">备注:</label>
                  <input type="text" id="memo" name="memo" class="form-control block-show">
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
        </div>
      </div>
    </div>
</form>

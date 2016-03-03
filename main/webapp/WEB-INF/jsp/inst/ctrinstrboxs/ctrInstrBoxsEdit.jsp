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
                <label for="editBoxBarcode"><span class="required-icon">*</span>盒子条码:</label>
                <input type="text" maxlength="20" class="form-control block-show" id="editBoxBarcode" name="box_barcode"/>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="editBoxIp"><span class="required-icon">*</span>盒子IP:</label>
                <input type="text" class="form-control block-show" id="editBoxIp"
                       name="box_ip"/>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="editDisplayOrder">顺序号:</label>
                <input type="text" class="form-control block-show" id="editDisplayOrder"
                       name="display_order" value="${displayOrder}"/>
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
        <input type="hidden" id="editCodeNo" name="code_no" value="${codeNo}"/>
        <input type="hidden" id="editOrgId" name="org_id" value=""/>
        <input type="hidden" id="editAppId" name="app_id" value="0"/>
        <input type="hidden" id="editStatus" name="status" value=""/>
        <div class="wrapper-footer text-center">
          <button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
          <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
        </div>
      </form>
    </div>
  </div>
</div>
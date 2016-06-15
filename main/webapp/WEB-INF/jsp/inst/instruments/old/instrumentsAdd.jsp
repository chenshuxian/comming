<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
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
                <label for="editName"><span class="required-icon">*</span>仪器名称:</label>
                <input type="text" class="form-control block-show" id="editName" name="name"/>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label for="model"><span class="required-icon">*</span>仪器型号:</label>
                <input type="text" class="form-control block-show" id="model" name="model"/>
              </div>
            </div>
          </div>
         <%--  <div class="flex-container">
            <div class="form-combo block-show">
              <div class=" flex-container flex-space-between">
                <label><span class="required-icon">*</span>仪器类型:</label>
                <select id="typeId" name="typeId"
                        data-options="editable:false,width:240,height:30,panelHeight:'auto'"
                        class="easyui-combobox xs-size form-control-combo">
                  <option value="">&nbsp;</option>
                  <c:forEach items="<%=CtrInstrumentsType.values()%>" var="item" varStatus="status">
                    <option value="${item.ordinal()}" >${item.text}</option>
                  </c:forEach>
                </select>
              </div>
            </div>
          </div> --%>
        </div>
        <input type="hidden" id="editId" name="id"/>
        <input type="hidden" id="opType" name="opType" value="${opType}"/>
        <input type="hidden" id="editCodeNo" name="codeNo" value="${codeNo}"/>
        <input type="hidden" id="orgId" name="orgId"/>
        <div class="wrapper-footer text-center">
          <button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
          <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
        </div>
      </form>
    </div>
  </div>
</div>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>--%>
<%--<div class="pop-inner-wrap">--%>
    <%--<div class="pop-container">--%>
      <%--<form action="" id="Form" method="post" class="easyui-form" data-options="novalidate: false">--%>
        <%--<div class="wrapper-container">--%>
          <%--<div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>--%>
            <%--<small class="basic-code">编码: ${codeNo}<span id="codeNo"></span></small>--%>
          <%--</div>--%>
          <%--<div class="wrapper-content">--%>
            <%--<div class="flex-container flex-space-between flex-space-10">--%>
              <%--<div class="flex-col-6">--%>
                <%--<div class="flex-container">--%>
                  <%--<div class="form-combo block-show">--%>
                    <%--<div class=" flex-container  flex-space-between">--%>
                      <%--<label for=""><span class="required-icon">*</span>仪器名称:</label>--%>
                      <%--<input type="text" id="ii_name" name="name" class="form-control block-show" maxlength="30"/>--%>
                    <%--</div>--%>
                  <%--</div>--%>
                <%--</div>--%>
              <%--</div>--%>
              <%--<div class="flex-col-6">--%>
                <%--<div class="flex-container">--%>
                  <%--<div class="form-combo block-show">--%>
                    <%--<div class=" flex-container  flex-space-between">--%>
                      <%--<label for=""><span class="required-icon">*</span>仪器型号:</label>--%>
                      <%--<input type="text" id="ii_model" name="model" class="form-control block-show" maxlength="20"/>--%>
                    <%--</div>--%>
                  <%--</div>--%>
                <%--</div>--%>
              <%--</div>--%>
            <%--</div>--%>
            <%--<div class="flex-container flex-space-between flex-space-10">--%>
              <%--<div class="flex-col-6">--%>
                <%--<div class="flex-container">--%>
                  <%--<div class="form-combo block-show">--%>
                    <%--<div class=" flex-container  flex-space-between">--%>
                      <%--<label for=""><span class="required-icon">*</span>仪器类型:</label>--%>
                      <%--<!--  <div id="ii_labGroupDiv" style="width: 317px;"></div> -->--%>
                      <%--<select id="ii_typeId" name="typeId"--%>
                              <%--data-options="editable:false,width:240,height:30,panelHeight:'auto'"--%>
                              <%--class="easyui-combobox xs-size form-control-combo">--%>
                        <%--<option value="">&nbsp;</option>--%>
                        <%--<c:forEach items="<%=CtrInstrumentsType.values()%>" var="item" varStatus="status">--%>
                          <%--<option value="${item.ordinal()}" >${item.text}</option>--%>
                        <%--</c:forEach>--%>
                      <%--</select>--%>
                    <%--</div>--%>
                  <%--</div>--%>
                <%--</div>--%>
              <%--</div>--%>
            <%--</div>--%>
          <%--</div>--%>
          <%--<input type="hidden" id="editId" name="id"/>--%>
          <%--<input type="hidden" id="opType" name="opType" value="${opType}"/>--%>
          <%--<div class="wrapper-footer text-center">--%>
            <%--<button data-show="submitInstrumentsSure" class="btn btn-submit sm-size J_ShowPop" id="ii_j_instrumentsSubmitPop" onclick="ii_submitInstruments(this);">确定</button>--%>
            <%--<button class="btn btn-cancel sm-size J_ClosePop" onclick="ii_closeInstrParamsPop();">关闭</button>--%>
          <%--</div>--%>
        <%--</div>--%>
      <%--</form>--%>
    <%--</div>--%>
<%--</div>--%>

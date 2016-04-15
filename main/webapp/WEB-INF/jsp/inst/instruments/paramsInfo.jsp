<!--通訊參數-->
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap">
  <div class="pop-container">
    <div class="wrapper-container">
      <form id="InfoForm">
        <div class="wrapper-header flex-container flex-space-between"><h1>通讯参数</h1></div>
        <div class="wrapper-content">
          <div class="divider sm-size"></div>
          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">前台通讯类:</label>
                    <input type="text" id="frontClassName" name="frontClassName" value="${entity.frontClassName }"  maxlength="50" class="form-control block-show" >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">后台解析类:</label>
                    <input type="text" id="className" name="className" value="${entity.className}"  maxlength="50" class="form-control block-show" >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">端口选择:</label>
                    <select id="comPort" name="comPort" data-val="${entity.comPort }" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox form-control-combo">
                      <option value="">&nbsp;</option>
                      <c:forEach var="item" items="<%=ComPortType.values()%>">
                        <option value="${item.getIndex()}">${item.text}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <span class="required-icon">*</span>
                    <label for="">通信模式:</label>
                    <select id="transferMode" name="transferMode" data-val="${entity.transferMode }" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox xs-size form-control-combo">
                      <c:forEach var="item" items="<%=TransferModeType.values()%>">
                        <option value="${item.ordinal()}">${item.text}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">通讯协议:</label>
                    <select id="protocol" name="protocol" data-val="${entity.protocol }" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox xs-size form-control-combo">
                      <option value="">&nbsp;</option>
                      <c:forEach var="item" items="<%=ProtocolType.values()%>">
                        <option value="${item.getIndex()}">${item.text}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">波特率:</label>
                    <select id="baudRate" name="baudRate" data-val="${entity.baudRate }" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox xs-size form-control-combo">
                      <option value="">&nbsp;</option>
                      <c:forEach var="item" items="<%=BaudRateType.values()%>">
                        <option value="${item.text}">${item.text}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">数据位:</label>
                    <select id="dataBit" name="dataBit" data-val="${entity.dataBit }" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox xs-size form-control-combo">
                      <option value="">&nbsp;</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">停止位:</label>
                    <select id="stopBit" name="stopBit" data-val="${entity.stopBit }" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox xs-size form-control-combo">
                      <option value="">&nbsp;</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">奇偶校验位:</label>
                    <select id="parityBit" name="parityBit" data-val="${entity.parityBit }" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox xs-size form-control-combo">
                      <option value="">&nbsp;</option>
                      <c:forEach var="item" items="<%=ParityBitType.values()%>">
                        <option value="${item.ordinal()}">${item.text}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">盒子条码:</label>
                    <select id="boxBarcode" name="boxBarcode" data-val=${entity.boxBarcode }"" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                            class="easyui-combobox xs-size form-control-combo">
                      <option value="">&nbsp;</option>
                      <c:forEach var="item" items="${bbList}">
                        <option value="${item.id}">${item.boxBarcode}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">回应码:</label>
                    <input type="text" id="respondCode" name="respondCode" value="${entity.respondCode }"  maxlength="15" class="form-control block-show" >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">回应遇到码:</label>
                    <input type="text" id="respondingCode" name="respondingCode" value="${entity.respondingCode }"  maxlength="15" class="form-control block-show" >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
               <div class="flex-container label-inline">
                  <div class="form-combo block-show">
                    <div class=" flex-container  flex-space-between">
                      <label for="">结束码:</label>
                      <input type="text" id="endCode" name="endCode" value="${entity.endCode }"  maxlength="15" class="form-control block-show" >
                    </div>
                  </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">主机IP:</label>
                    <input type="text" id="serverIp" name="serverIp" value="${entity.serverIp }" class="form-control block-show" maxlength="20"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">端口:</label>
                    <input type="text" id="port" name="port" value="${entity.port }" class="form-control block-show" maxlength="5"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-col-6">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">解析间隔时间:</label>
                    <input type="text" id="intervals" name="intervals" value="${entity.intervals }" class="form-control block-show" maxlength="8"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-12">
              <div class="flex-container label-inline">
                <div class="form-combo block-show">
                  <div class=" flex-container  flex-space-between">
                    <label for="">质控样本号:</label>
                    <input type="text" id="qcCode" name="qcCode" value="${entity.qcCode}" class="form-control block-show" maxlength="30"/>
                  </div>
                  <span class="required-icon">(多个样本号以英文逗号隔开，如:90001,90002)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-container vertical-space flex-space-between flex-space-20">

            <div class="flex-container label-inline">
              <div class="form-combo block-show">
                <div class=" flex-container  flex-space-between">
                  <label for="isRespondCheck">需要回应:</label>
                  <input type="checkbox" id="isRespondCheck" name="checkboxInst" value="isRespond" >
                </div>
              </div>
            </div>


            <div class="flex-container label-inline">
              <div class="form-combo block-show">
                <div class=" flex-container  flex-space-between">
                  <label for="">DTR:</label>
                  <input type="checkbox" id="isDtrCheck" name="checkboxInst" value="isDtr" >
                </div>
              </div>
            </div>


            <div class="flex-container label-inline">
              <div class="form-combo block-show">
                <div class=" flex-container  flex-space-between">
                  <label for="">RTS:</label>
                  <input type="checkbox" id="isRtsCheck" name="checkboxInst" value="isRts" >
                </div>
              </div>
            </div>
          </div>


        </div>
        <input type="hidden" id="instrumentId" name="instrumentId" value="${entity.instrumentId }"/>
        <input type="hidden" id="isRespond" name="isRespond" value="${entity.isRespond }"/>
        <input type="hidden" id="isDtr" name="isDtr" value="${entity.isDtr }"/>
        <input type="hidden" id="isRts" name="isRts" value="${entity.isRts }"/>
      </form>
      <div class="wrapper-footer text-center">
        <button id="editBtn" class="btn btn-submit sm-size" onclick="Instruments.updateParams()">确定</button>
        <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
      </div>
    </div>
  </div>
</div>

<%--&lt;%&ndash;--%>
  <%--Created by IntelliJ IDEA.--%>
  <%--User: Administrator--%>
  <%--Date: 2016/3/25--%>
  <%--Time: 14:50--%>
  <%--To change this template use File | Settings | File Templates.--%>
<%--&ndash;%&gt;--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" %>--%>
<%--<html>--%>
<%--<head>--%>
    <%--<title></title>--%>
<%--</head>--%>
<%--<body>--%>

<%--</body>--%>
<%--</html>--%>

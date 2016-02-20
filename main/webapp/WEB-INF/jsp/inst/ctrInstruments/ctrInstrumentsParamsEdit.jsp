<!--中心仪器信息-->
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
    <div class="pop-inner-wrap">
        <div class="pop-container">
            <div class="wrapper-container">
                <!--  form id="ctrDictCodeInfoEditForm"-->
    <form id="InfoForm">
    <div class="wrapper-header flex-container flex-space-between"><h1>通讯参数</h1>
    </div>
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
                            <input type="text" id="className" name="className" value="${entity.className }"  maxlength="50" class="form-control block-show" >
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
				                	<option value="1">COM1</option>
									<option value="2">COM2</option>
									<option value="3">COM3</option>
									<option value="4">COM4</option>
									<option value="5">COM5</option>
									<option value="6">COM6</option>
									<option value="7">COM7</option>
									<option value="8">COM8</option>
									<option value="9">COM9</option>
									<option value="10">COM10</option>
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
				                   	<option value="0">无通信</option>
									<option value="1">单向</option>
									<option value="2">双向（无校验位）</option>
									<option value="3">双向（带校验位）</option>
									<option value="4">其它</option>
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
				                	<option value="1">XonXof</option>
									<option value="2">RTS or OTS</option>
									<option value="3">ASTS</option>
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
				                	<option value="1200">1200</option>
									<option value="2400">2400</option>
									<option value="4800">4800</option>
									<option value="9600">9600</option>
									<option value="19200">19200</option>
									<option value="38400">38400</option>
									<option value="115200">115200</option>
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
				                	<option value="0">无校验</option>
									<option value="1">奇校验</option>
									<option value="2">偶校验</option>
				             </select>
                        </div>
                    </div>
                </div>
            </div>
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
	           <button id="editBtn" class="btn btn-submit sm-size" onclick="Inst.updateParams()">确定</button>
	           <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
	  </div>
			
      </div>
   </div>
</div>
<%--
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/inst/instruments.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>中心仪器通讯参数修改</title>

<!-- 暂时放在这里，以后移到css文件 -->    
    <style type="text/css">
		.chk_not{ background: url("${ctx}/images/not.jpg") no-repeat; display:inline-block; width: 18px; height: 18px; margin: 0.2em 0 0  2em; float: left; }
		.chk_yes{ background: url("${ctx}/images/01.jpg") no-repeat; display:inline-block; width: 18px; height: 18px; margin: 0.2em 0 0  2em; float: left; }
    </style>
    
<script type="text/javascript">
	$(document).ready(function(){
		// 初始化赋值
		$("#comPort").val("${entity.comPort }");
		$("#transferMode").val("${entity.transferMode }");
		$("#protocol").val("${entity.protocol }");
		$("#baudRate").val("${entity.baudRate }");
		$("#dataBit").val("${entity.dataBit }");
		$("#stopBit").val("${entity.stopBit }");
		$("#parityBit").val("${entity.parityBit }");
		
		// 需要回应
		if("${entity.isRespond }" == '1'){
			$("#isRespondCheck").removeClass("chk_not").addClass("chk_yes");
		}
		// DTR
		if("${entity.isDtr }" == '1'){
			$("#isDtrCheck").removeClass("chk_not").addClass("chk_yes");
		}
		// RTS
		if("${entity.isRts }" == '1'){
			$("#isRtsCheck").removeClass("chk_not").addClass("chk_yes");
		}
	});
</script>

</head>

<body class="bg">

    <h3>通讯参数<a href="javascript:closeWin();"></a></h3>
    <form id="editForm" name="editForm">
    	<input type="hidden" id="instrumentId" name="instrumentId" value="${entity.instrumentId }"/>
    	
    	<input type="hidden" id="isRespond" name="isRespond" value="${entity.isRespond }"/>
    	<input type="hidden" id="isDtr" name="isDtr" value="${entity.isDtr }"/>
    	<input type="hidden" id="isRts" name="isRts" value="${entity.isRts }"/>
    	
		<div>
			<span>前台通讯类</span><input type="text" id="frontClassName" name="frontClassName" value="${entity.frontClassName }"  maxlength="50"/>
			<span>后台解析类</span><input type="text" id="className" name="className" value="${entity.className }"  maxlength="50"/>
		</div>
		<div>
            <span>端口选择</span>
            <div class="selectstyle1">
                <select id="comPort" name="comPort" class="select_box">
                	<option value="">&nbsp;</option>
                	<option value="1">COM1</option>
					<option value="2">COM2</option>
					<option value="3">COM3</option>
					<option value="4">COM4</option>
					<option value="5">COM5</option>
					<option value="6">COM6</option>
					<option value="7">COM7</option>
					<option value="8">COM8</option>
					<option value="9">COM9</option>
					<option value="10">COM10</option>
                </select>
            </div>
            <span>通信模式</span>
            <div class="selectstyle1">
                <select id="transferMode" name="transferMode" class="select_box">
                	<option value="0">无通信</option>
					<option value="1">单向</option>
					<option value="2">双向（无校验位）</option>
					<option value="3">双向（带校验位）</option>
					<option value="4">其它</option>
                </select>
            </div>
		</div>
		<div>
            <span>通讯协议</span>
            <div class="selectstyle1">
                <select id="protocol" name="protocol" class="select_box">
                	<option value="">&nbsp;</option>
                	<option value="1">XonXof</option>
					<option value="2">RTS or OTS</option>
					<option value="3">ASTS</option>
                </select>
            </div>
            <span>波特率</span>
            <div class="selectstyle1">
                <select id="baudRate" name="baudRate" class="select_box">
                	<option value="">&nbsp;</option>
                	<option value="1200">1200</option>
					<option value="2400">2400</option>
					<option value="4800">4800</option>
					<option value="9600">9600</option>
					<option value="19200">19200</option>
					<option value="38400">38400</option>
					<option value="115200">115200</option>
                </select>
            </div>
		</div>
		<div>
            <span>数据位</span>
            <div class="selectstyle1">
                <select id="dataBit" name="dataBit" class="select_box">
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
            <span>停止位</span>
            <div class="selectstyle1">
                <select id="stopBit" name="stopBit" class="select_box">
                	<option value="">&nbsp;</option>
                	<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
                </select>
            </div>
		</div>
		<div>
            <span>奇偶校验位</span>
            <div class="selectstyle1">
                <select id="parityBit" name="parityBit" class="select_box">
                	<option value="">&nbsp;</option>
                	<option value="0">无校验</option>
					<option value="1">奇校验</option>
					<option value="2">偶校验</option>
                </select>
            </div>
            <span>结束码</span><input type="text" id="endCode" name="endCode" value="${entity.endCode }"  maxlength="15"/>
		</div>
		<div>
			<span>回应码</span><input type="text" id="respondCode" name="respondCode" value="${entity.respondCode }"  maxlength="15"/>
            <span>回应遇到码</span><input type="text" id="respondingCode" name="respondingCode" value="${entity.respondingCode }"  maxlength="15"/>
		</div>
		<div>
			<span>需要回应</span><a id="isRespondCheck" href="javascript:changeStatus('isRespondCheck');" class="chk_not"></a>
            <span>DTR</span><a id="isDtrCheck" href="javascript:changeStatus('isDtrCheck');" class="chk_not"></a>
            <span>RTS</span><a id="isRtsCheck"  href="javascript:changeStatus('isRtsCheck');" class="chk_not"></a>
		</div>
        <div class="btns">
            <input type="button" value="确定" onclick="javascript:updateParams();" onkeydown='if(event.keyCode==13){}'>
            <input type="reset" value="取消" onclick="javascript:closeWin();">
        </div>
    </form>

</body>
</html>
 --%>
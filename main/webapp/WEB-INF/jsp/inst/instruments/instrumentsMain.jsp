<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
	<div class="flex-container layout-vertical main-content-container" id="ii_mainContentContainer">
		<local:ifAuthrized value="01040105">
			<input type="hidden" id="ii_showAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040106">
			<input type="hidden" id="ii_statusAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040107">
			<input type="hidden" id="ii_editAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040104">
			<input type="hidden" id="ii_deleteAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040108">
			<input type="hidden" id="ii_copyAddAuthrized" value="true" />
		</local:ifAuthrized>
		<local:ifAuthrized value="01040109">
			<input type="hidden" id="ii_settingAuthrized" value="true" />
		</local:ifAuthrized>
		<div class="main-content-header" id="ii_main-content-header">
				<div class="flex-container flex-space-between">
				
				<div class="search flex-container flex-space-between">
					<span class="drop-down-label">机构:</span>
					<div class="J_ShowPop J_mechanismList md-size" data-show="ii_mechanismList">
						<input type="hidden" id="ii_mechanismId" />
						<span class="selected-items" id="ii_mechanismName" >请选择机构</span><i class="icon icon-angle-down"></i>
					</div>
					<div class="form-control-icon icon-right">
							<input id="ii_searchStr" type="text" class="form-control" placeholder="搜索内容..."/>
							<button class="control-icon text-center" onclick="ii_Search();">
								<i class="icon icon-search"></i>
							</button>
						</div>
				</div>
				
				
					<div class="search flex-container  flex-space-between">
						<div class="drop-down">
							<div class="drop-down-selected">
								<span class="selected-items">前台通讯类</span><i class="icon icon-angle-down"></i>
							</div>
							<div class="drop-down-menu">
								<ul class="list-unstyled ii_j_searchFrontClassName" id="ii_j_searchFrontClassName">
									<li   value="2" class="selected">全部</li>
                                    <c:forEach items="<%=FrontClassType.values()%>" var="item" varStatus="status">
										<li value="${item.ordinal()}" >${item.text}</li>
				                    </c:forEach>
								</ul>
							</div>
						</div>
						<span class="symbol"></span> <span></span>
						<div class="drop-down">
							<div class="drop-down-selected">
								<span class="selected-items">状态</span><i class="icon icon-angle-down"></i>
							</div>
							<div class="drop-down-menu">
								<ul class="list-unstyled ii_j_status" id="ii_j_status">
									<c:forEach items="<%=StatusEnum.values()%>" var="isAbleEnum" varStatus="status">
										<li value="${isAbleEnum.getIndex()}" 
											<c:if test="${isAbleEnum.getIndex() == -1}">
												class="selected"
											</c:if>
										>${isAbleEnum.text}</li>
				                    </c:forEach>
								</ul>
							</div>
						</div>
					</div>
					<div class="option icon-group-inline ">
						<div class="drop-down drop-down-icon">
							<div class="drop-down-selected">
								<i class="icon icon-sort"></i><span class="selected-items">排序</span>
							</div>
							<div class="drop-down-menu">
								<ul class="list-unstyled ii_j_sort" id="ii_j_sort">
									<c:forEach items="<%=SortEnum.values()%>" var="sortEnum" varStatus="sort">
									<li value="${sortEnum.getIndex()}" 
										<c:if test="${sortEnum.getIndex() == 0}">
											class="selected"
										</c:if>
									>${sortEnum.text}</li>
				                    </c:forEach>
								</ul>
							</div>
						</div>
		
						<span class="symbol">|</span>
						<local:ifAuthrized value="01040102">
							<span id="ii_j_showAddFromCtrPop" class="J_ShowPop J_InstrumentAddFromCTR lg-size"  ><i class="icon icon-plus-square"></i> 从仪器库添加</span>
						</local:ifAuthrized>
						<local:ifAuthrized value="01040103"> 
							<span id="ii_j_showInstrumentsPop" class="J_ShowPop md-size"  onclick="ii_showInstrumentsPop('', '0');"><i class="icon icon-plus-square"></i> 添加</span> 
						</local:ifAuthrized>
						<local:ifAuthrized value="01040104">
							<span onclick="ii_checkedDelRow();"><i class="icon icon-trash"></i>删除选中</span>
						</local:ifAuthrized>
					</div>
				</div>
			</div>
		<div class="main-content-body easyui-layout">
			<table id="ii_instrumentTable"></table>
		</div>
	</div>


	<!--仪器信息-->
	<div class="pop" id="ii_instrumentInfo">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<form action="" id="ii_instrumentsForm" method="post" class="easyui-form" data-options="novalidate: false">
				<input type="hidden" id="ii_id" name="id" />
				<input type="hidden" id="ii_codeNo" name="codeNo" />
				<div class="wrapper-container">
	                <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
	                    <small class="basic-code">编码: <span id="ii_span_codeNo"></span></small>
	                </div>
	                <div class="wrapper-content">
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for=""><span class="required-icon">*</span>仪器名称:</label>
	                                        <input type="text" id="ii_name" name="name" class="form-control block-show" maxlength="30"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for=""><span class="required-icon">*</span>仪器型号:</label>
	                                        <input type="text" id="ii_model" name="model" class="form-control block-show" maxlength="20"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for=""><span class="required-icon">*</span>仪器类型:</label>
										<!--  <div id="ii_labGroupDiv" style="width: 317px;"></div> -->
	                                        <select id="ii_typeId" name="typeId" 
	                                        		data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
	                                            <option value="">&nbsp;</option>
	                                            <%-- <c:forEach var="item" items="${labGroupList}">
	                                            	<option value="${item.id}">${item.name}</option>
	                                            </c:forEach> --%>
	                                             <c:forEach items="<%=CtrInstrumentsType.values()%>" var="item" varStatus="status">
													<option value="${item.ordinal()}" >${item.text}</option>
							                    </c:forEach>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <!-- <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">助记符:</label>
	                                        <input type="text" id="ii_fastCode" name="fastCode" class="form-control block-show" maxlength="9"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div> -->
	                    </div>
	                    <%-- <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for=""><span class="required-icon">*</span>默认标本类型:</label>
	                                        <select id="ii_sampleTypeId" name="sampleTypeId"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
	                                            <c:forEach var="item" items="${sampleTypeList}">
	                                            	<option value="${item.id}">${item.name}</option>
	                                            </c:forEach>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">报告抬头:</label>
	                                        <input type="text" id="ii_reportHeader" name="reportHeader" class="form-control block-show" maxlength="150"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for=""><span class="required-icon">*</span>单列报告模板:</label>
	                                        <select id="ii_rptTemplateId" name="rptTemplateId"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
	                                            <c:forEach var="item" items="${rtList}">
	                                            	<option value="${item.id}">${item.name}</option>
	                                            </c:forEach>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">双列报告模板:</label>
	                                        <select id="ii_rptTemplate2Id" name="rptTemplate2Id"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
	                                            <c:forEach var="item" items="${rtList2}">
	                                            	<option value="${item.id}">${item.name}</option>
	                                            </c:forEach>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">生产厂商:</label>
	                                        <input type="text" id="ii_producer" name="producer" class="form-control block-show" maxlength="30"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">销售公司:</label>
	                                        <input type="text" id="ii_provider" name="provider" class="form-control block-show" maxlength="30"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">购买日期:</label>
	                                        <input type="text" id="ii_purchaseDate" name="purchaseDateString" class="form-control block-show easyui-datebox"
	                                               data-options="width:240"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">安装日期:</label>
	                                        <input type="text" id="ii_installDate" name="installDateString" class="form-control block-show easyui-datebox"
	                                               data-options="width:240"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">维护联系人:</label>
	                                        <input type="text" id="ii_maintainer" name="maintainer" class="form-control block-show" maxlength="10"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">联系电话:</label>
	                                        <input type="text" id="ii_maintainTel" name="maintainTel" class="form-control block-show" maxlength="30"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">顺序号:</label>
	                                        <input type="text" id="ii_displayOrder" name="displayOrder" class="form-control block-show" maxlength="6"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">仪器类型:</label>
	                                        <select id="ii_typeId" name="typeId"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
	                                            <c:forEach var="item" items="<%=InstrumentType.values()%>">
	                                            	<option value="${item.ordinal()}">${item.text}</option>
	                                            </c:forEach>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div> --%>
	                </div>
	                <div class="wrapper-footer text-center">
	                    <button data-show="submitInstrumentsSure" class="btn btn-submit sm-size J_ShowPop" id="ii_j_instrumentsSubmitPop" onclick="ii_submitInstruments(this);">确定</button>
	                    <button class="btn btn-cancel sm-size J_ClosePop" onclick="ii_closeInstrParamsPop();">关闭</button>
	                </div>
				</div>
				</form>
			</div>
		</div>
	</div>

	<!--通讯参数信息-->
	<div class="pop" id="ii_instrParamsInfo">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<form action="" id="ii_instrParamsForm" method="post" class="easyui-form" data-options="novalidate: false">
				<input type="hidden" id="ii_instrumentId" name="instrumentId" />
				<div class="wrapper-container">
	                <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
	                </div>
	                <div class="wrapper-content">
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">前台通讯类:</label>
	                                        <input type="text" id="ii_frontClassName" name="frontClassName" class="form-control block-show" maxlength="50"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">后台解析类:</label>
	                                        <input type="text" id="ii_className" name="className" class="form-control block-show" maxlength="50"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">端口选择:</label>
	                                        <select id="ii_comPort" name="comPort"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
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
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for=""><span class="required-icon">*</span>通信模式:</label>
	                                        <select id="ii_transferMode" name="transferMode"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
	                                            <c:forEach var="item" items="<%=TransferModeType.values()%>">
	                                            	<option value="${item.ordinal()}">${item.text}</option>
	                                            </c:forEach>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">通讯协议:</label>
	                                        <select id="ii_protocol" name="protocol"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
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
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">波特率:</label>
	                                        <select id="ii_baudRate" name="baudRate"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
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
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">数据位:</label>
	                                        <select id="ii_dataBit" name="dataBit"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
<%--  	                                            <c:forEach var="item" items="<%=DataBitType.values()%>"
	                                            	<option value="${item.text}">${item.text}</option>
	                                            </c:forEach>--%>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">停止位:</label>
	                                        <select id="ii_stopBit" name="stopBit"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
<%-- 	                                            <c:forEach var="item" items="<%=StopBitType.values()%>">
	                                            	<option value="${item.text}">${item.text}</option>
	                                            </c:forEach>--%>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">奇偶校验位:</label>
	                                        <select id="ii_parityBit" name="parityBit"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
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
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">结束码:</label>
	                                        <input type="text" id="ii_endCode" name="endCode" class="form-control block-show" maxlength="15"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">需要回应:</label>
	                                        <input type="checkbox" id="ii_chk_isRespond" name="chkIsRespond"/>
	                                        <input type="hidden" id="ii_isRespond" name="isRespond"/>
	                                        <div style="width:200px">&nbsp;</div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">回应遇到码:</label>
	                                        <input type="text" id="ii_respondingCode" name="respondingCode" class="form-control block-show" maxlength="15"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">回应码:</label>
	                                        <input type="text" id="ii_respondCode" name="respondCode" class="form-control block-show" maxlength="15"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">主机IP:</label>
	                                        <input type="text" id="ii_serverIp" name="serverIp" class="form-control block-show" maxlength="20"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">端口:</label>
	                                        <input type="text" id="ii_port" name="port" class="form-control block-show" maxlength="5"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">解析间隔时间:</label>
	                                        <input type="text" id="ii_intervals" name="intervals" class="form-control block-show" maxlength="8"/>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">虚拟仪器:</label>
	                                        <select id="ii_virutalInstrId" name="virutalInstrId"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
	                                            <c:forEach var="item" items="${viList}">
	                                            	<option value="${item.id}">${item.name}</option>
	                                            </c:forEach>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">虚拟仪器方式:</label>
	                                        <select id="ii_virutalType" name="virutalType"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
	                                                class="easyui-combobox xs-size form-control-combo">
		                                        <option value="">&nbsp;</option>
<%-- 	                                            <c:forEach var="item" items="<%=VirutalType.values()%>">
	                                            	<option value="${item.ordinal()}">${item.text}</option>
	                                            </c:forEach>--%>
	                                        </select>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="flex-container flex-space-between flex-space-10">
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">盒子条码:</label>
	                                        <select id="ii_boxBarcode" name="boxBarcode"
	                                                data-options="editable:false,width:240,height:30,panelHeight:'auto'"
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
	                        <div class="flex-col-6">
	                            <div class="flex-container">
	                                <div class="form-combo block-show">
	                                    <div class=" flex-container  flex-space-between">
	                                        <label for="">DTR</label>
	                                        <input type="checkbox" id="ii_chk_isDtr" name="chkIsDtr"/>
	                                        <input type="hidden" id="ii_isDtr" name="isDtr"/>
	                                        <div style="width:50px">&nbsp;</div>
	                                        <label for="">RTS</label>
	                                        <input type="checkbox" id="ii_chk_isRts" name="chkIsRts"/>
	                                        <input type="hidden" id="ii_isRts" name="isRts"/>
	                                        <div style="width:50px">&nbsp;</div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="wrapper-footer text-center">
	                    <button data-show="submitInstrParamsSure" class="btn btn-submit sm-size J_ShowPop" id="ii_j_instrParamsSubmitPop" onclick="ii_submitInstrParams(this);">确定</button>
	                    <button class="btn btn-cancel sm-size J_ClosePop" onclick="ii_closeInstruParamsPop();">关闭</button>
	                </div>
				</div>
				</form>
			</div>
		</div>
	</div>

	<!--从仪器库添加-->
	<div class="pop" id="ii_addInstrumentsFromCTR">
	    <div class="pop-inner-wrap">
	        <div class="pop-container">
	            <div class="wrapper-container" id="ii_addFromCTR_main-content-header">
	                <div class="flex-container project-dictionary">
	                    <div class="flex-col-5 dictionary-database">
	                        <div class="wrapper-header flex-container flex-space-between">
	                            <div class="option">
	                                <div class="flex-container flex-vertical-center">
	                                    <span class="drop-down-label">前台通讯类:</span>
                                        <select id="ii_addFromCTR_frontClassName" name="addFromCTR_frontClassName"
                                                data-options="editable:false,width:120,height:30,panelHeight:'auto'"
                                                class="easyui-combobox xs-size form-control-combo">
	                                        <option value="">全部</option>
                                            <c:forEach var="item" items="<%=FrontClassType.values()%>">
                                            	<option value="${item.ordinal()}">${item.text}</option>
                                            </c:forEach>
                                        </select>
	                                </div>
	                            </div>
	                            <div class="form-control-icon icon-right">
	                                <input type="text" id="ii_addFromCTR_searchStr" class="form-control" style="width:120px;" placeholder="搜索内容...">
									<button class="control-icon text-center" onclick="ii_addFromCTR_Search();">
										<i class="icon icon-search"></i>
									</button>
	                            </div>
	                        </div>
	                        <div class="wrapper-content">
								<div class="main-content-body easyui-layout">
									<table id="ii_instrumentCtrTable"></table>
								</div>	                            
	                        </div>
	                        <div class="wrapper-footer text-center">
	                            <button data-show="addAreaUserSure" class="btn btn-submit sm-size J_ShowPop" id="ii_j_addFromCTR_submitPop" onclick="ii_addFromCTR_submit(this);">确定</button>
	                            <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
	                        </div>
	                    </div>
	                    <div class="flex-col-7">
	                        <div class="wrapper-header">
	                            <span>前台通讯类: <input type="text" id="ii_show_addFromCTR_frontClassName" class="form-control block-show" style="width:150px" disabled/></span>
	                            <span class="symbol"></span>
	                            <span>后台解析类: <input type="text" id="ii_show_addFromCTR_className" class="form-control block-show" style="width:150px" disabled/></span>
	                        </div>
	                        <div class="wrapper-content">
	                            <div class="vertical-space">
	                                <table id="ii_instrumentCtrItemTable"></table>
	                            </div>
	                            <div class="vertical-space">
	                                <table id="ii_instrumentCtrGermTable"></table>
	                            </div>
	                            <div class="vertical-space">
	                                <table id="ii_instrumentCtrAntiTable"></table>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	
	        </div>
	    </div>
	</div>
<!--机构列表选择-->
	<div class="pop" id="ii_mechanismList">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="wrapper-container">
					<div class="wrapper-header flex-container flex-space-between">
						 <div class="flex-container flex-space-between">
                <div class="search flex-container  flex-space-between">
                    <div class="form-control-icon icon-right">
                        <input type="text" class="form-control"  id="ii_mechanismSchStr"  placeholder="搜索内容..."/>
                        <button class="control-icon text-center"  onclick="iir_queryInstruments();"><i class="icon icon-search"></i></button>
                    </div>
                </div>
            </div>
				</div>
					<div class="wrapper-content">
						<table id="ii_mechanismSelectList"></table>
					</div>
					<div class="wrapper-footer text-center">
						<button onclick="ii_mechanismSlt(this);" class="btn btn-submit sm-size">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-------------------------------------------------------------------------------- 
---------------------------实验室专业组下拉Grid数据源-------------------------------------
--------------------------------------------------------------------------------->
<!-- <div id="ii_gridLabGroup" class="tablebox_02" style="width: 298px; height: 217px; display: none;"> -->
<!-- 	<table> -->
<!-- 		<tr class="tablehead"> -->
<!-- 			<td style="width: 15px;">&nbsp;</td> -->
<!-- 			<td style="width: 100px;">名称</td> -->
<!-- 			<td style="width: auto;">助记符</td> -->
<!-- 		</tr> -->
<!-- 	</table> -->
<!-- 	<div class="tablelist" style="width: 100%; height: 172px;"> -->
<!-- 		<table> -->
<%-- 			<c:forEach var="item" items="${labGroupList}"> --%>
<%-- 				<tr id="${item.id}"> --%>
<!-- 					<td style="width: 15px;">&nbsp;</td> -->
<%-- 					<td style="width: auto;">${item.name}</td> --%>
<!-- 				</tr> -->
<%-- 			</c:forEach> --%>
<!-- 		</table> -->
<!-- 	</div> -->
<!-- </div> -->

	<script src="${ctx}/js/inst/instruments/instrumentsDatagridOpts.js?var=${randomVal}"></script>
	<script src="${ctx}/js/inst/instruments/instruments.js?var=${randomVal}"></script>
	
	
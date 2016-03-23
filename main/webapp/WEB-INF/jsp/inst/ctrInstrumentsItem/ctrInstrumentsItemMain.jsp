<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="flex-container layout-vertical main-content-container" id="irr_mainContentContainer">
	<div class="flex-container layout-vertical main-content-top">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container flex-space-between">
					<span class="drop-down-label">仪器:</span>
					<div class="J_ShowPop J_instrumentList md-size" id="irrinstrumentList">
						<span class="selected-items" id="instrumentName" >请选择仪器</span><i class="icon icon-angle-down"></i>
					</div>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_addInstrumentGerm lg-size" id="irrAdd">
						<i class="icon icon-plus-square"></i> 添加检验项目</span>
					<span id="irrSave"><i class="icon icon-plus-square"></i> 保存修改</span>
					<span id="irrDeleteBatch"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<form action="" id="irr_itemListForm" method="post" class="easyui-form" data-options="novalidate: false">
				<table id="irrList"></table>
			</form>
		</div>
	</div>
	<div class="flex-container layout-vertical main-content-bottom">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container  flex-space-between">
					<h5 class="tips">选中项目参考值</h5>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_instAntiDescAdd lg-size" id="irrAdd2">
						<i class="icon icon-plus-square"></i> 添加</span>
					<span id="irrDeleteBatch2"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<table id="irrList2"></table>
		</div>
	</div>

</div>
<script src="${ctx}/js/inst/ctrInstrumentsItem.js?var=1.0.0.16"></script>
<%--<div class="flex-container layout-vertical main-content-container" id="iir_mainContentContainer">--%>
	<%--<div class="flex-container layout-vertical main-content-top">--%>
		<%--<div class="main-content-header">--%>
			<%--<div class="flex-container flex-space-between">--%>
				<%--<div class="search flex-container flex-space-between">--%>
					<%--<!-- <h5 class="tips">仪器项目对照表</h5>&nbsp;&nbsp; -->--%>
					<%--<span class="drop-down-label">仪器:</span>--%>
					<%--<div class="J_ShowPop J_instrumentList md-size" data-show="iir_instrumentList">--%>
						<%--<span class="selected-items" id="irrinstrumentName" >请选择仪器</span><i class="icon icon-angle-down"></i>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div class="option icon-group-inline ">--%>
					<%--<div class="drop-down drop-down-icon">--%>
						<%--<div class="drop-down-selected">--%>
							<%--<i class="icon icon-sort"></i>--%>
							<%--<span class="selected-items">排序</span>--%>
						<%--</div>--%>
						<%--<div class="drop-down-menu">--%>
							<%--<ul class="list-unstyled J_instrumentItemOrder">--%>
								<%--<c:forEach var="sort" items="<%=InstrumentsSortEnum.values()%>" varStatus="status">--%>
									<%--<li value="${sort.ordinal()}" <c:if test="${status.index == 0}">class="selected"</c:if>>${sort.text}</li>--%>
								<%--</c:forEach>--%>
							<%--</ul>--%>
						<%--</div>--%>
					<%--</div>--%>

					<%--<span class="symbol">|</span>--%>
					<%--<span class="J_addInstrumentItem lg-size" data-show="irrAdd">--%>
						<%--<i class="icon icon-plus-square"></i> 添加检验项目--%>
					<%--</span>--%>
					<%--<span class="" onclick="irrsaveItemList(this);">--%>
						<%--<i class="icon icon-plus-square"></i> 保存修改--%>
					<%--</span>--%>
					<%--<span onclick="irrdeleteItemBatch();"><i class="icon icon-trash"></i> 删除选中</span>--%>
				<%--</div>--%>
			<%--</div>--%>
		<%--</div>--%>

		<%--<div class="main-content-body">--%>
			<%--<form action="" id="irritemListForm" method="post" class="easyui-form" data-options="novalidate: false">--%>
				<%--<table id="irrList"></table>--%>
			<%--</form>--%>
		<%--</div>--%>
	<%--</div>--%>
	<%--<div class="flex-container layout-vertical main-content-bottom">--%>
		<%--<div class="main-content-header">--%>
			<%--<div class="flex-container flex-space-between">--%>
				<%--<div class="search flex-container  flex-space-between">--%>
					<%--<h5 class="tips">选中项目参考值</h5>--%>
				<%--</div>--%>
				<%--<div class="option icon-group-inline ">--%>
					<%--<span class="J_instItemDescAdd" data-show="irrAdd2"><i--%>
						<%--class="icon icon-plus-square"></i> 添加</span>--%>
					<%--<span onclick="irrdeleteRefrangeBatch();"><i--%>
						<%--class="icon icon-trash"></i> 删除选中</span>--%>
				<%--</div>--%>
			<%--</div>--%>
		<%--</div>--%>
		<%--<div class="main-content-body">--%>
			<%--<input type="hidden" id=irrtestItemId />--%>
			<%--<table id="irrList2></table>--%>
		<%--</div>--%>
	<%--</div>--%>

	<%--&lt;%&ndash;<!--添加检验项目-->&ndash;%&gt;--%>
	<%--&lt;%&ndash;<div class="pop" id="iir_instrumentItemAdd">&ndash;%&gt;--%>
	    <%--&lt;%&ndash;<div class="pop-inner-wrap">&ndash;%&gt;--%>
	        <%--&lt;%&ndash;<div class="pop-container">&ndash;%&gt;--%>
	            <%--&lt;%&ndash;<div class="wrapper-container">&ndash;%&gt;--%>
	                <%--&lt;%&ndash;<div class="wrapper-header flex-container flex-space-between">&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;<div>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;<strong>已包含项目</strong>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;<small>(已包含项目<span id="iir_containItemCount"></span>)</small>&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;<div class="header-right">&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;<div class="flex-container flex-space-between group-items">&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<strong>未包含项目</strong>&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<span>检验方法:</span>&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<div class="drop-down">&ndash;%&gt;--%>
	                            	<%--&lt;%&ndash;<select id="iir_testMethodId" data-options="editable:false,width:100,height:30,panelHeight:'auto'"&ndash;%&gt;--%>
										<%--&lt;%&ndash;class="easyui-combobox xs-size form-control-combo">&ndash;%&gt;--%>
										<%--&lt;%&ndash;<option value="">全部</option>&ndash;%&gt;--%>
		                            	<%--&lt;%&ndash;<c:forEach var="method" items="${methodList}" >&ndash;%&gt;--%>
		                            		<%--&lt;%&ndash;<option value="${method.idString}">${method.name}</option>&ndash;%&gt;--%>
		                            	<%--&lt;%&ndash;</c:forEach>&ndash;%&gt;--%>
	                            	<%--&lt;%&ndash;</select>&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<div class="form-control-icon icon-right">&ndash;%&gt;--%>
	                                <%--&lt;%&ndash;<input type="text" class="form-control" id="iir_itemSchStr" placeholder="搜索内容...">&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	                                <%--&lt;%&ndash;<button class="control-icon text-center" onclick="iir_queryTestItems();"><i class="icon icon-search"></i></button>&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                <%--&lt;%&ndash;<div class="wrapper-content">&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;<div class="flex-container">&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;<div class="flex-col-6">&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<table id="iir_addInstrumentItemLeft">&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;</table>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;<div class="text-center vertical-options flex-container flex-center layout-vertical">&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<button class="btn btn-circle" id="iir_addInstrumentItemBtn">&ndash;%&gt;--%>
	                                <%--&lt;%&ndash;<i class="fa fa-chevron-left"></i>&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;</button>&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<button class="btn btn-circle no-margin-left" id="iir_removeInstrumentItemBtn">&ndash;%&gt;--%>
	                                <%--&lt;%&ndash;<i class="fa fa-chevron-right"></i>&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;</button>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;<div class="flex-col-6">&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;<table id="iir_addInstrumentItemRight">&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	                            <%--&lt;%&ndash;</table>&ndash;%&gt;--%>
	                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	                <%--&lt;%&ndash;<div class="wrapper-footer text-center">&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;<button onclick="iir_confirmInstrumentItemAdd(this);" class="btn btn-submit sm-size">确定</button>&ndash;%&gt;--%>
	                    <%--&lt;%&ndash;<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>&ndash;%&gt;--%>
	                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	            <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	<%--&lt;%&ndash;&ndash;%&gt;--%>
	        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	<%--&lt;%&ndash;</div>&ndash;%&gt;--%>

	<%--&lt;%&ndash;<!--从仪器列表选择-->&ndash;%&gt;--%>
	<%--&lt;%&ndash;<div class="pop" id="iir_instrumentList">&ndash;%&gt;--%>
		<%--&lt;%&ndash;<div class="pop-inner-wrap">&ndash;%&gt;--%>
			<%--&lt;%&ndash;<div class="pop-container">&ndash;%&gt;--%>
				<%--&lt;%&ndash;<div class="wrapper-container">&ndash;%&gt;--%>
					<%--&lt;%&ndash;<!-- <div class="wrapper-header flex-container flex-space-between">&ndash;%&gt;--%>
						<%--&lt;%&ndash;<h1>仪器列表</h1>&ndash;%&gt;--%>

						<%--&lt;%&ndash;<div class="form-control-icon icon-right">&ndash;%&gt;--%>
							<%--&lt;%&ndash;<input type="text" class="form-control" id="iir_instrumentSchStr" placeholder="搜索内容...">&ndash;%&gt;--%>

							<%--&lt;%&ndash;<button class="control-icon text-center" onclick="iir_queryInstruments();">&ndash;%&gt;--%>
								<%--&lt;%&ndash;<i class="icon icon-search"></i>&ndash;%&gt;--%>
							<%--&lt;%&ndash;</button>&ndash;%&gt;--%>
						<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
					<%--&lt;%&ndash;</div> -->&ndash;%&gt;--%>
					<%--&lt;%&ndash;<div class="wrapper-header flex-container flex-space-between">&ndash;%&gt;--%>
						 <%--&lt;%&ndash;<div class="flex-container flex-space-between">&ndash;%&gt;--%>
                <%--&lt;%&ndash;<div class="search flex-container  flex-space-between">&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<div class="form-control-icon icon-right">&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<input type="text" class="form-control"  id="iir_instrumentSchStr"  placeholder="搜索内容..."/>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<button class="control-icon text-center"  onclick="iir_queryInstruments();"><i class="icon icon-search"></i></button>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<span class="symbol"></span>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<span class="drop-down-label">前台通讯类:</span>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<div class="drop-down">&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<div class="drop-down-selected">&ndash;%&gt;--%>
                            <%--&lt;%&ndash;<span class="selected-items" id="iir_frontClass">全部</span> <i class="icon icon-angle-down"></i>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<div class="drop-down-menu">&ndash;%&gt;--%>
                            <%--&lt;%&ndash;<ul class="list-unstyled" id="iir_ul_frontClass">&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<li class="selected" value="2">&ndash;%&gt;--%>
                                   	 <%--&lt;%&ndash;全部&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<li value="0">&ndash;%&gt;--%>
                                  	  <%--&lt;%&ndash;类名不为空&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<li value="1">&ndash;%&gt;--%>
                                  	  <%--&lt;%&ndash;类名为空&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                            <%--&lt;%&ndash;</ul>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                 <%--&lt;%&ndash;<span class="drop-down-label">状态:</span>&ndash;%&gt;--%>
                <%--&lt;%&ndash;<div class="option icon-group-inline ">&ndash;%&gt;--%>
                    <%--&lt;%&ndash;<div class="drop-down drop-down-icon">&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<div class="drop-down-selected">&ndash;%&gt;--%>
                            <%--&lt;%&ndash;<i class="icon icon-sort"></i>&ndash;%&gt;--%>
                            <%--&lt;%&ndash;<span class="selected-items" id="iir_status">全部</span>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<div class="drop-down-menu">&ndash;%&gt;--%>
                            <%--&lt;%&ndash;<ul class="list-unstyled" id="iir_ul_status"><!-- 换动态迭代样式竟然很丑，暂停找不到原因 -->&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<li class="selected" value="2">&ndash;%&gt;--%>
                                  	  <%--&lt;%&ndash;全部&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<li value="1">&ndash;%&gt;--%>
                                  	  <%--&lt;%&ndash;可用&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<li value="0">&ndash;%&gt;--%>
                                   	 <%--&lt;%&ndash;停用&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
                            <%--&lt;%&ndash;</ul>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
            <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
				<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
					<%--&lt;%&ndash;<div class="wrapper-content">&ndash;%&gt;--%>
						<%--&lt;%&ndash;<table id="iir_instrumentSelectList"></table>&ndash;%&gt;--%>
					<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
					<%--&lt;%&ndash;<div class="wrapper-footer text-center">&ndash;%&gt;--%>
						<%--&lt;%&ndash;<button onclick="iir_comfirmInstrumentSlt(this)" class="btn btn-submit sm-size">确定</button>&ndash;%&gt;--%>
						<%--&lt;%&ndash;<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>&ndash;%&gt;--%>
					<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
				<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
			<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
		<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	<%--&lt;%&ndash;</div>&ndash;%&gt;--%>
	<%--<!--基本信息弹窗-->--%>
	<%--<div class="pop" id="iir_instrumentRefrangeAdd">--%>
		<%--<div class="pop-inner-wrap">--%>
			<%--<div class="pop-container">--%>
				<%--<form action="" id="iir_instRefAddForm" method="post" class="easyui-form" data-options="novalidate: false">--%>
				<%--<input type="hidden" id="iir_refrangeId" name="id" />--%>
				<%--<input type="hidden" id="iir_refrangeActionUrl" />--%>
				<%--<div class="wrapper-container">--%>
					<%--<div class="wrapper-header flex-container flex-space-between">--%>
						<%--<h1>添加参考值</h1>--%>
					<%--</div>--%>
					<%--<div class="wrapper-content">--%>

						<%--<div class=" flex-container flex-space-between  block-show">--%>
							<%--<label for="">标本类型:</label>--%>
							<%--<select id="iir_sampleTypeId" name="sampleTypeId"--%>
								<%--data-options="editable:false,width:324,height:30,panelHeight:'auto'"--%>
								<%--class="easyui-combobox xs-size form-control-combo">--%>
								<%--<c:forEach var="item" items="${stList}" varStatus="status">--%>
									<%--<option value="${item.id}" <c:if test="${status.index == 0 }">selected="selected"</c:if>>${item.name}</option>--%>
								<%--</c:forEach>--%>
							<%--</select>--%>
						<%--</div>--%>

						<%--<div class="flex-container flex-space-between">--%>
							<%--<label><span class="required-icon">*</span>年龄:</label>--%>

							<%--<div class="flex-container flex-space-between block-show">--%>
								<%--<div class="form-combo">--%>

									<%--<input type="text" id="iir_ageMin" name="ageMin" class="easyui-numberbox" data-options="width:35" />--%>
									<%--<span>-</span>--%>
									<%--<input type="text" id="iir_ageMax" name="ageMax" class="easyui-numberbox" data-options="width:35" />--%>
								<%--</div>--%>
								<%--<div class="form-combo">--%>
									<%--<label>年龄单位:</label>--%>
									<%--<select id="iir_ageUnitId" name="ageUnitId"--%>
										<%--data-options="editable:false,width:60,height:30,panelHeight:'auto'"--%>
										<%--class="easyui-combobox xs-size form-control-combo">--%>
										<%--<option value="1" selected="selected">年</option>--%>
										<%--<option value="2">月</option>--%>
										<%--<option value="3">周</option>--%>
										<%--<option value="4">天</option>--%>
										<%--<option value="5">时</option>--%>
									<%--</select>--%>
								<%--</div>--%>
								<%--<div class="form-combo">--%>
									<%--<label for="">性别:</label>--%>
									<%--<select id="iir_sexId" name="sexId"--%>
										<%--data-options="editable:false,width:60,height:30,panelHeight:'auto'"--%>
										<%--class="easyui-combobox xs-size form-control-combo">--%>
										<%--<c:forEach var="sexType" items="<%=SexType.values()%>" varStatus="status">--%>
											<%--<option value="${sexType.index}" <c:if test="${status.index == 3}">selected="selected"</c:if>>${sexType.text}</option>--%>
										<%--</c:forEach>--%>
									<%--</select>--%>
								<%--</div>--%>
							<%--</div>--%>
						<%--</div>--%>

						<%--<div--%>
							<%--class="flex-container flex-space-between horizontal-group xs-size">--%>

							<%--<div class=" flex-container block-show">--%>
								<%--<label for="">参考上限:</label>--%>
								<%--<input type="text" name="refHigh" id="iir_refHigh" class="form-control block-show" value="" />--%>
							<%--</div>--%>
							<%--<div class=" flex-container  block-show">--%>
								<%--<label for="">参考下限:</label>--%>
								<%--<input type="text" name="refLow" id="iir_refLow" class="form-control block-show" value="" />--%>
							<%--</div>--%>

						<%--</div>--%>
						<%--<div--%>
							<%--class="flex-container flex-space-between horizontal-group xs-size">--%>

							<%--<div class=" flex-container block-show">--%>
								<%--<label for="">危急上限:</label>--%>
								<%--<input type="text" name="panicHigh" id="iir_panicHigh" class="form-control block-show" value="" />--%>
							<%--</div>--%>
							<%--<div class=" flex-container block-show">--%>
								<%--<label for="">危急下限:</label>--%>
								<%--<input type="text" name="panicLow" id="iir_panicLow" class="form-control block-show" value="" />--%>
							<%--</div>--%>

						<%--</div>--%>
						<%--<div--%>
							<%--class="flex-container flex-space-between horizontal-group xs-size">--%>

							<%--<div class=" flex-container  block-show">--%>
								<%--<label for="">警告上限:</label>--%>
								<%--<input type="text" name="alarmHigh" id="iir_alarmHigh" class="form-control block-show" value="" />--%>
							<%--</div>--%>
							<%--<div class=" flex-container  block-show">--%>
								<%--<label for="">警告下限:</label>--%>
								<%--<input type="text" name="alarmLow" id="iir_alarmLow" class="form-control block-show" value="" />--%>
							<%--</div>--%>

						<%--</div>--%>

						<%--<div class="flex-container flex-space-between">--%>
							<%--<label for="">文字描述:</label>--%>
							<%--<textarea name="refText" id="iir_refText" class="form-control block-show"></textarea>--%>
						<%--</div>--%>
						<%--<div class="flex-container flex-space-between">--%>
							<%--<label for="">备注:</label>--%>
							<%--<textarea name="refRemark" id="iir_refRemark" class="form-control block-show"></textarea>--%>
						<%--</div>--%>

					<%--</div>--%>
					<%--<div class="wrapper-footer text-center">--%>
						<%--<button class="btn btn-submit sm-size" id="iir_saveInstrumentRefrange" onclick="iir_saveInstDesc();">确定</button>--%>
						<%--<button class="btn btn-cancel sm-size" onclick="iir_closeRefPop();">关闭</button>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--</form>--%>
			<%--</div>--%>
		<%--</div>--%>
	<%--</div>--%>
<%--</div>--%>
<%--<!-- 这里取不到ctx的值，不知为何 -->--%>
<%--<script src="${ctx}/js/inst/ctrInsItemDatagridOpts.js?var=1.0.0.16"></script>--%>
<%--<script src="${ctx}/js/inst/ctrInstrumentsItem.js?var=1.0.0.78"></script>--%>
<%--<script>--%>
<%--</script>--%>

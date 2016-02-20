<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="flex-container layout-vertical main-content-container" id="iir_mainContentContainer">
	<div class="flex-container layout-vertical main-content-top">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container flex-space-between">
					<!-- <h5 class="tips">仪器项目对照表</h5>&nbsp;&nbsp; -->
					<span class="drop-down-label">仪器:</span>

					<div class="J_ShowPop J_instrumentList md-size" data-show="iir_instrumentList">
						<input type="hidden" id="iir_instrumentId" />
						<span class="selected-items" id="iir_instrumentName" >请选择仪器</span><i class="icon icon-angle-down"></i>
					</div>
				</div>
				<div class="option icon-group-inline ">
					<div class="drop-down drop-down-icon">
						<div class="drop-down-selected">
							<i class="icon icon-sort"></i>
							<span class="selected-items">排序</span>
						</div>
						<div class="drop-down-menu">
							<ul class="list-unstyled J_instrumentItemOrder">
								<c:forEach var="sort" items="<%=InstrumentsSortEnum.values()%>" varStatus="status">
									<li value="${sort.ordinal()}" <c:if test="${status.index == 0}">class="selected"</c:if>>${sort.text}</li>
								</c:forEach>
							</ul>
						</div>
					</div>

					<span class="symbol">|</span>
					<span class="J_addInstrumentItem lg-size" data-show="iir_instrumentItemAdd">
						<i class="icon icon-plus-square"></i> 添加检验项目
					</span>
					<span class="" onclick="iir_saveItemList(this);">
						<i class="icon icon-plus-square"></i> 保存修改
					</span>
					<span onclick="iir_deleteItemBatch();"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>

		<div class="main-content-body">
			<form action="" id="iir_itemListForm" method="post" class="easyui-form" data-options="novalidate: false">
				<table id="iir_instrumentItemList"></table>
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
					<span class="J_instItemDescAdd" data-show="iir_instrumentRefrangeAdd"><i
						class="icon icon-plus-square"></i> 添加</span>
					<span onclick="iir_deleteRefrangeBatch();"><i
						class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<input type="hidden" id=iir_testItemId />
			<table id="iir_instrumentRefrangeList"></table>
		</div>
	</div>

	<!--添加检验项目-->
	<div class="pop" id="iir_instrumentItemAdd">
	    <div class="pop-inner-wrap">
	        <div class="pop-container">
	            <div class="wrapper-container">
	                <div class="wrapper-header flex-container flex-space-between">
	                    <div>
	                        <strong>已包含项目</strong>
	                        <small>(已包含项目<span id="iir_containItemCount"></span>)</small>
	                    </div>
	                    <div class="header-right">
	                        <div class="flex-container flex-space-between group-items">
	                            <strong>未包含项目</strong>
	
	                            <span>检验方法:</span>
	
	                            <div class="drop-down">
	                            	<select id="iir_testMethodId" data-options="editable:false,width:100,height:30,panelHeight:'auto'"
										class="easyui-combobox xs-size form-control-combo">
										<option value="">全部</option>
		                            	<c:forEach var="method" items="${methodList}" >
		                            		<option value="${method.idString}">${method.name}</option>
		                            	</c:forEach>
	                            	</select>
	                            </div>
	                            <div class="form-control-icon icon-right">
	                                <input type="text" class="form-control" id="iir_itemSchStr" placeholder="搜索内容...">
	
	                                <button class="control-icon text-center" onclick="iir_queryTestItems();"><i class="icon icon-search"></i></button>
	                            </div>
	                        </div>
	                    </div>
	
	                </div>
	                <div class="wrapper-content">
	                    <div class="flex-container">
	                        <div class="flex-col-6">
	                            <table id="iir_addInstrumentItemLeft">
	
	                            </table>
	                        </div>
	                        <div class="text-center vertical-options flex-container flex-center layout-vertical">
	                            <button class="btn btn-circle" id="iir_addInstrumentItemBtn">
	                                <i class="fa fa-chevron-left"></i>
	                            </button>
	                            <button class="btn btn-circle no-margin-left" id="iir_removeInstrumentItemBtn">
	                                <i class="fa fa-chevron-right"></i>
	                            </button>
	                        </div>
	                        <div class="flex-col-6">
	                            <table id="iir_addInstrumentItemRight">
	
	                            </table>
	                        </div>
	                    </div>
	
	                </div>
	                <div class="wrapper-footer text-center">
	                    <button onclick="iir_confirmInstrumentItemAdd(this);" class="btn btn-submit sm-size">确定</button>
	                    <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
	                </div>
	            </div>
	
	        </div>
	    </div>
	</div>

	<!--从仪器列表选择-->
	<div class="pop" id="iir_instrumentList">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="wrapper-container">
					<!-- <div class="wrapper-header flex-container flex-space-between">
						<h1>仪器列表</h1>

						<div class="form-control-icon icon-right">
							<input type="text" class="form-control" id="iir_instrumentSchStr" placeholder="搜索内容...">

							<button class="control-icon text-center" onclick="iir_queryInstruments();">
								<i class="icon icon-search"></i>
							</button>
						</div>
					</div> -->
					<div class="wrapper-header flex-container flex-space-between">
						 <div class="flex-container flex-space-between">
                <div class="search flex-container  flex-space-between">
                    <div class="form-control-icon icon-right">
                        <input type="text" class="form-control"  id="iir_instrumentSchStr"  placeholder="搜索内容..."/>
                        <button class="control-icon text-center"  onclick="iir_queryInstruments();"><i class="icon icon-search"></i></button>
                    </div>
                    <span class="symbol"></span>
                    <span class="drop-down-label">前台通讯类:</span>
                    <div class="drop-down">
                        <div class="drop-down-selected">
                            <span class="selected-items" id="iir_frontClass">全部</span> <i class="icon icon-angle-down"></i>
                        </div>
                        <div class="drop-down-menu">
                            <ul class="list-unstyled" id="iir_ul_frontClass">
                                <li class="selected" value="2">
                                   	 全部
                                </li>
                                <li value="0">
                                  	  类名不为空
                                </li>
                                <li value="1">
                                  	  类名为空
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                 <span class="drop-down-label">状态:</span>
                <div class="option icon-group-inline ">
                    <div class="drop-down drop-down-icon">
                        <div class="drop-down-selected">
                            <i class="icon icon-sort"></i>
                            <span class="selected-items" id="iir_status">全部</span>
                        </div>
                        <div class="drop-down-menu">
                            <ul class="list-unstyled" id="iir_ul_status"><!-- 换动态迭代样式竟然很丑，暂停找不到原因 -->
                                <li class="selected" value="2">
                                  	  全部
                                </li>
                                <li value="1">
                                  	  可用
                                </li>
                                <li value="0">
                                   	 停用
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
				</div>
					<div class="wrapper-content">
						<table id="iir_instrumentSelectList"></table>
					</div>
					<div class="wrapper-footer text-center">
						<button onclick="iir_comfirmInstrumentSlt(this)" class="btn btn-submit sm-size">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--基本信息弹窗-->
	<div class="pop" id="iir_instrumentRefrangeAdd">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<form action="" id="iir_instRefAddForm" method="post" class="easyui-form" data-options="novalidate: false">
				<input type="hidden" id="iir_refrangeId" name="id" />
				<input type="hidden" id="iir_refrangeActionUrl" />
				<div class="wrapper-container">
					<div class="wrapper-header flex-container flex-space-between">
						<h1>添加参考值</h1>
					</div>
					<div class="wrapper-content">

						<div class=" flex-container flex-space-between  block-show">
							<label for="">标本类型:</label>
							<select id="iir_sampleTypeId" name="sampleTypeId"
								data-options="editable:false,width:324,height:30,panelHeight:'auto'"
								class="easyui-combobox xs-size form-control-combo">
								<c:forEach var="item" items="${stList}" varStatus="status">
									<option value="${item.id}" <c:if test="${status.index == 0 }">selected="selected"</c:if>>${item.name}</option>
								</c:forEach> 
							</select>
						</div>

						<div class="flex-container flex-space-between">
							<label><span class="required-icon">*</span>年龄:</label>

							<div class="flex-container flex-space-between block-show">
								<div class="form-combo">

									<input type="text" id="iir_ageMin" name="ageMin" class="easyui-numberbox" data-options="width:35" />
									<span>-</span>
									<input type="text" id="iir_ageMax" name="ageMax" class="easyui-numberbox" data-options="width:35" />
								</div>
								<div class="form-combo">
									<label>年龄单位:</label>
									<select id="iir_ageUnitId" name="ageUnitId"
										data-options="editable:false,width:60,height:30,panelHeight:'auto'"
										class="easyui-combobox xs-size form-control-combo">
										<option value="1" selected="selected">年</option>
										<option value="2">月</option>
										<option value="3">周</option>
										<option value="4">天</option>
										<option value="5">时</option>
									</select>
								</div>
								<div class="form-combo">
									<label for="">性别:</label>
									<select id="iir_sexId" name="sexId"
										data-options="editable:false,width:60,height:30,panelHeight:'auto'"
										class="easyui-combobox xs-size form-control-combo">
										<c:forEach var="sexType" items="<%=SexType.values()%>" varStatus="status">
											<option value="${sexType.index}" <c:if test="${status.index == 3}">selected="selected"</c:if>>${sexType.text}</option>
										</c:forEach>
									</select>
								</div>
							</div>
						</div>

						<div
							class="flex-container flex-space-between horizontal-group xs-size">

							<div class=" flex-container block-show">
								<label for="">参考上限:</label>
								<input type="text" name="refHigh" id="iir_refHigh" class="form-control block-show" value="" />
							</div>
							<div class=" flex-container  block-show">
								<label for="">参考下限:</label>
								<input type="text" name="refLow" id="iir_refLow" class="form-control block-show" value="" />
							</div>

						</div>
						<div
							class="flex-container flex-space-between horizontal-group xs-size">

							<div class=" flex-container block-show">
								<label for="">危急上限:</label>
								<input type="text" name="panicHigh" id="iir_panicHigh" class="form-control block-show" value="" />
							</div>
							<div class=" flex-container block-show">
								<label for="">危急下限:</label>
								<input type="text" name="panicLow" id="iir_panicLow" class="form-control block-show" value="" />
							</div>

						</div>
						<div
							class="flex-container flex-space-between horizontal-group xs-size">

							<div class=" flex-container  block-show">
								<label for="">警告上限:</label>
								<input type="text" name="alarmHigh" id="iir_alarmHigh" class="form-control block-show" value="" />
							</div>
							<div class=" flex-container  block-show">
								<label for="">警告下限:</label>
								<input type="text" name="alarmLow" id="iir_alarmLow" class="form-control block-show" value="" />
							</div>

						</div>

						<div class="flex-container flex-space-between">
							<label for="">文字描述:</label>
							<textarea name="refText" id="iir_refText" class="form-control block-show"></textarea>
						</div>
						<div class="flex-container flex-space-between">
							<label for="">备注:</label>
							<textarea name="refRemark" id="iir_refRemark" class="form-control block-show"></textarea>
						</div>

					</div>
					<div class="wrapper-footer text-center">
						<button class="btn btn-submit sm-size" id="iir_saveInstrumentRefrange" onclick="iir_saveInstDesc();">确定</button>
						<button class="btn btn-cancel sm-size" onclick="iir_closeRefPop();">关闭</button>
					</div>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- 这里取不到ctx的值，不知为何 -->
<script src="${ctx}/js/inst/ctrInsItemDatagridOpts.js?var=1.0.0.16"></script>
<script src="${ctx}/js/inst/ctrInstrumentsItem.js?var=1.0.0.78"></script>
<script>
</script>

<%@ page contentType="text/html;charset=UTF-8" language="java" import="com.daan.enums.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="flex-container layout-vertical main-content-container" id="imr_mainContentContainer">
	<div class="flex-container layout-vertical main-content-top">
	<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container flex-space-between">
					<span class="drop-down-label">仪器:</span>
					<div class="J_ShowPop J_instrumentList md-size" id="imrinstrumentList">
						<span class="selected-items" id="instrumentName" >请选择仪器</span><i class="icon icon-angle-down"></i>
					</div>
				</div>
			</div>
		</div>

		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container  flex-space-between">
					<h5 class="tips">细菌列表</h5>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_addInstrumentGerm lg-size" data-show="imr_instrumentItemAdd">
						<i class="icon icon-plus-square"></i> 添加细菌
					</span>
					<span class="" onclick="imr_saveItemList(this);">
						<i class="icon icon-plus-square"></i> 保存修改
					</span>
					<span onclick="imr_deleteItemBatch(1);"><i class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>

		<div class="main-content-body">
			<form action="" id="imr_itemListForm" method="post" class="easyui-form" data-options="novalidate: false">
				<table id="imrList"></table>
			</form>
		</div>
	</div>
	<div class="flex-container layout-vertical main-content-bottom">
		<div class="main-content-header">
			<div class="flex-container flex-space-between">
				<div class="search flex-container  flex-space-between">
					<h5 class="tips">抗生素列表</h5>
				</div>
				<div class="option icon-group-inline ">
					<span class="J_instAntiDescAdd lg-size" data-show="imr_instrumentAntiAdd"><i
						class="icon icon-plus-square"></i> 添加抗生素</span>
						<span class="" onclick="imr_saveAntiList(this);">
						<i class="icon icon-plus-square"></i> 保存修改
					</span>
					<span  onclick="imr_deleteItemBatch(2);"><i
						class="icon icon-trash"></i> 删除选中</span>
				</div>
			</div>
		</div>
		<div class="main-content-body">
			<input type="hidden" id=imr_testItemId />
			<table id="imrList2"></table>
		</div>
	</div>

	<!--添加细菌项目-->
	<div class="pop" id="imr_instrumentItemAdd">
	    <div class="pop-inner-wrap">
	        <div class="pop-container">
	            <div class="wrapper-container">
	                <div class="wrapper-header flex-container flex-space-between">
	                    <div>
	                        <strong>已包含细菌</strong>
	                        <small>(已包含细菌<span id="imr_containItemCount"></span>)</small>
	                    </div>
	                    <div class="header-right">
	                        <div class="flex-container flex-space-between group-items">
	                            <strong>未包含细菌</strong>
	                            <div class="form-control-icon icon-right">
	                                <input type="text" class="form-control" id="imr_itemSchStr" placeholder="搜索内容...">
	
	                                <button class="control-icon text-center" onclick="imr_queryTestItems(1);"><i class="icon icon-search"></i></button>
	                            </div>
	                        </div>
	                    </div>
	
	                </div>
	                <div class="wrapper-content">
	                    <div class="flex-container">
	                        <div class="flex-col-6">
	                            <table id="imr_addInstrumentItemLeft">
	                            </table>
	                        </div>
	                        <div class="text-center vertical-options flex-container flex-center layout-vertical">
	                            <button class="btn btn-circle" id="imr_addInstrumentItemBtn">
	                                <i class="fa fa-chevron-left"></i>
	                            </button>
	                            <button class="btn btn-circle no-margin-left" id="imr_removeInstrumentItemBtn">
	                                <i class="fa fa-chevron-right"></i>
	                            </button>
	                        </div>
	                        <div class="flex-col-6">
	                            <table id="imr_addInstrumentItemRight">
	                            </table>
	                        </div>
	                    </div>	
	                </div>
	                <div class="wrapper-footer text-center">
	                    <button onclick="imr_confirmInstrumentItemAdd(this,1);" class="btn btn-submit sm-size">确定</button>
	                    <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
<!--添加抗生素-->
<div class="pop" id="imr_instrumentAntiAdd">
    <div class="pop-inner-wrap">
        <div class="pop-container">
            <div class="wrapper-container" >
                <div class="wrapper-header flex-container flex-space-between">
                    <div>
                        <strong>已包含抗生素</strong>
                        <small>(已包含抗生素<span id="imr_containAntiCount"></span>)</small>
                    </div>
                    <div class="header-right">
                        <div class="flex-container flex-space-between group-items">
                            <strong>未包含抗生素</strong>


                            <div class="form-control-icon icon-right">
                                <input type="text" class="form-control" id="imr_AntiSchStr" placeholder="搜索内容...">

                                <button  onclick="imr_queryTestItems(2);" class="control-icon text-center"><i class="icon icon-search"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="wrapper-content">
                    <div class="flex-container">
                        <div class="flex-col-6">
                            <table id="imr_addInstrumentAntiLeft">

                            </table>
                        </div>
                        <div class="text-center vertical-options flex-container flex-center layout-vertical">
                            <button class="btn btn-circle" id="imr_addInstrumentAntiBtn">
                                <i class="fa fa-chevron-left"></i>
                            </button>
                            <button class="btn btn-circle no-margin-left" id="imr_removeInstrumentAntiBtn">
                                <i class="fa fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="flex-col-6">
                            <table id="imr_addInstrumentAntiRight">

                            </table>
                        </div>
                    </div>

                </div>
                <div class="wrapper-footer text-center">
                   <button onclick="imr_confirmInstrumentItemAdd(this,2);" class="btn btn-submit sm-size">确定</button>
	               <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
                </div>
            </div>

        </div>
    </div>
</div>
	<%--<!--从仪器列表选择-->--%>
	<%--<div class="pop" id="imr_instrumentList">--%>
		<%--<div class="pop-inner-wrap">--%>
			<%--<div class="pop-container">--%>
				<%--<div class="wrapper-container">--%>
					 <%--<div class="wrapper-header flex-container flex-space-between">--%>
						 <%--<div class="flex-container flex-space-between">--%>
                <%--<div class="search flex-container  flex-space-between">--%>
                    <%--<div class="form-control-icon icon-right">--%>
                        <%--<input type="text" class="form-control"  id="imr_instrumentSchStr"  placeholder="搜索内容..."/>--%>
                        <%--<button class="control-icon text-center"  onclick="imr_queryInstruments();"><i class="icon icon-search"></i></button>--%>
                    <%--</div>--%>
                    <%--<span class="symbol"></span>--%>
                    <%--<span class="drop-down-label">前台通讯类:</span>--%>
                    <%--<div class="drop-down">--%>
                        <%--<div class="drop-down-selected">--%>
                            <%--<span class="selected-items" id="imr_frontClass">全部</span> <i class="icon icon-angle-down"></i>--%>
                        <%--</div>--%>
                        <%--<div class="drop-down-menu">--%>
                            <%--<ul class="list-unstyled" id="imr_ul_frontClass">--%>
                                <%--<li class="selected" value="2">--%>
                                   	 <%--全部--%>
                                <%--</li>--%>
                                <%--<li value="0">--%>
                                  	  <%--类名不为空--%>
                                <%--</li>--%>
                                <%--<li value="1">--%>
                                  	  <%--类名为空--%>
                                <%--</li>--%>
                            <%--</ul>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
                 <%--<span class="drop-down-label">状态:</span>--%>
                <%--<div class="option icon-group-inline ">--%>
                    <%--<div class="drop-down drop-down-icon">--%>
                        <%--<div class="drop-down-selected">--%>
                            <%--<i class="icon icon-sort"></i>--%>
                            <%--<span class="selected-items" id="imr_status">全部</span>--%>
                        <%--</div>--%>
                        <%--<div class="drop-down-menu">--%>
                            <%--<ul class="list-unstyled" id="imr_ul_status"><!-- 换动态迭代样式竟然很丑，暂停找不到原因 -->--%>
                                <%--<li class="selected" value="2">--%>
                                  	  <%--全部--%>
                                <%--</li>--%>
                                <%--<li value="1">--%>
                                  	  <%--可用--%>
                                <%--</li>--%>
                                <%--<li value="0">--%>
                                   	 <%--停用--%>
                                <%--</li>--%>
                            <%--</ul>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
				<%--</div> --%>
					<%--<div class="wrapper-content">--%>
						<%--<table id="imr_instrumentSelectList"></table>--%>
					<%--</div>--%>
					<%--<div class="wrapper-footer text-center">--%>
						<%--<button onclick="imr_comfirmInstrumentSlt(this)" class="btn btn-submit sm-size">确定</button>--%>
						<%--<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>--%>
					<%--</div>--%>
				<%--</div>--%>
			<%--</div>--%>
		<%--</div>--%>
	<%--</div>--%>
	
</div>
<script src="${ctx}/js/inst/ctrInstrMicsDatagridOpts.js?var=1.0.0.78"></script>
<script src="${ctx}/js/inst/ctrInstrMics.js?var=1.0.0.16"></script>
<script>
</script>

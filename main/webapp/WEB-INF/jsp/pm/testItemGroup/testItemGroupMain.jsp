<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp"%>
 <script src="${ctx}/js/pm/testItemGroupNew.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="mainContentContainer">
    <div class="flex-container layout-vertical main-content-top">
        <div class="main-content-header">
            <div class="flex-container flex-space-between">
                <div class="search flex-container  flex-space-between">
                    <div class="form-control-icon icon-right">
                        <input type="text" class="form-control searchWidth" id="${tig}SearchStr" style="width:250px;" placeholder="搜索内容..."/>
                        <%--<button class="control-icon text-center" onclick="testItemGroupMain.queryGroupProject();"><i class="icon icon-search"></i></button>--%>
                        <button class="control-icon text-center"  id="${tig}SearchBtn"><i class="icon icon-search"></i></button>
                    </div>
                    <span class="symbol"></span>
                    <span class="drop-down-label">状态:</span>

                    <div class="drop-down">
                        <div class="drop-down-selected">
                            <span class="selected-items" id="${tig}StatusSpan">所有</span> <i class="fa fa-angle-down "></i>
                        </div>
                        <div class="drop-down-menu">
                            <ul class="list-unstyled ${tig}-status-selector">
                                <c:forEach items="${isAbleList}" var="isAble">
                                    <li <c:if test="${isAble.index == 2}">selected="selected" el-value=""</c:if>
                                        <c:if test="${isAble.index != 2}">selected="selected" el-value="${isAble.index}"</c:if> >${isAble.text}</li>
                                </c:forEach>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="option icon-group-inline ">
                    <div class="drop-down drop-down-icon">
                        <div class="drop-down-selected">
                            <i class="icon icon-sort"></i>
                            <span class="selected-items"  id="${tig}SortSpan">排序</span>
                        </div>
                        <div class="drop-down-menu">
                            <ul class="list-unstyled ${tig}-sort-selector">
                                <li class="selected" el-value="0">按顺序号升序</li>
                                <li el-value="1">按名称升序</li>
                                <li el-value="2">按录入顺序降序</li>
                            </ul>
                        </div>
                    </div>

                    <span class="symbol">|</span>
                    <%--<span class="J_ShowPop md-size" data-show="${tig}Add" onclick="testItemGroupMain.editRow('-1',0)"><i class="icon icon-plus-square"></i> 添加</span>--%>
                    <span class="J_ShowPop md-size" id="${tig}Add"><i class="icon icon-plus-square"></i> 添加</span>
                    <span  id="${tig}DeleteBatch"><i class="icon icon-trash"></i> 删除选中</span>
                </div>
            </div>
        </div>

        <div class="main-content-body">
            <table id="${tig}List"></table>
        </div>
    </div>
    <div class="line sm-size"></div>
    <div class="flex-container layout-vertical main-content-bottom">
        <div class="main-content-header">
            <div class="flex-container flex-space-between">
                <div class="search flex-container  flex-space-between">
                    <h5 class="tips">已包含项目列表</h5>
                </div>
                <div class="option icon-group-inline ">
                    <div class="drop-down drop-down-icon"></div>
                    <span id="${tig}Add2" class="J_ShowPop J_addCheckProject lg-size" ><i class="icon icon-plus-square"></i> 添加</span>
                    <span id="${tig}DeleteBatch2"><i class="icon icon-trash"></i> 删除选中</span>
                </div>
            </div>
        </div>
        <div class="main-content-body">
            <table id="${tig}groupProjectDescription"></table>
        </div>
    </div>
    <input type="hidden" id="${tig}Status"/>
    <input type="hidden" id="${tig}Sort"/>

</div>
<!--基本信息弹窗-->
<%--<div class="pop" id="${tig}groupProjectAdd">--%>
    <%--<div class="pop-inner-wrap">--%>
        <%--<div class="pop-container">--%>
            <%--<div class="wrapper-container">--%>
            <%--<form id="${tig}editForm">--%>
           	 <%--<input type="hidden" id="${tig}id" name="id" />--%>
           	 <%--<input type="hidden" id="${tig}codeNo" name="codeNo" />--%>
           	  <%--<input type="hidden" id="${tig}oldName" name="oldName" />--%>
           	 <%--<input type="hidden" id="${tig}itemTypeId" name="itemTypeId" value='2'/>--%>
           	 <%--<input type="hidden" id="${tig}type" name="type" />--%>
                <%--<div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>--%>
					<%--<small class="basic-code">编码:<span id="${tig}codeNoText"></span></small>--%>
                <%--</div> --%>
                <%--<div class="wrapper-content">--%>
                    <%--<div class="flex-container flex-space-between flex-space-10">--%>
                        <%--<div class="flex-col-6">--%>
                            <%--<div class="flex-container">--%>
                                <%--<div class="form-combo block-show">--%>
                                    <%--<div class=" flex-container  flex-space-between">--%>
                                        <%--<label for=""><span class="required-icon">*</span>中文名称:</label>--%>
                                        <%--<input type="text" class="form-control block-show" id="${tig}name" name="name"/>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div class="flex-col-6">--%>
                            <%--<div class="flex-container">--%>
                                <%--<div class="form-combo block-show">--%>
                                    <%--<div class=" flex-container  flex-space-between">--%>
                                        <%--<label for="">英文名称:</label>--%>
                                        <%--<input type="text" class="form-control block-show"--%>
                                               <%--id="${tig}enName" name="enName"/>--%>
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
                                        <%--<label for="">英文简称:</label>--%>
                                        <%--<input type="text" class="form-control block-show"  id="${tig}enShortName" name="enShortName"/>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div class="flex-col-6">--%>
                            <%--<div class="flex-container">--%>
                                <%--<div class="form-combo block-show">--%>
                                    <%--<div class=" flex-container  flex-space-between">--%>
                                        <%--<label for=""><span class="required-icon">*</span>默认标本类型:</label>--%>
                                        <%--<div id="${tig}sampleType" style="width: 187px"></div>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>

                    <%--</div>--%>

                    <%--<div class="flex-container flex-space-between flex-space-10">--%>
                       <%----%>
                        <%--<div class="flex-col-6">--%>
                            <%--<div class="flex-container">--%>
                                <%--<div class="form-combo block-show">--%>
                                    <%--<div class=" flex-container  flex-space-between">--%>
                                        <%--<label for="">助记符:</label>--%>
                                        <%--<input type="text" class="form-control block-show"  id="${tig}fastCode" name="fastCode"/>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
 						<%--<div class="flex-col-6">--%>
                            <%--<div class="flex-container">--%>
                                <%--<div class="form-combo block-show">--%>
                                    <%--<div class=" flex-container  flex-space-between">--%>
                                        <%--<label for="">顺序号:</label>--%>
                                        <%--<input type="text" class="form-control block-show"  id="${tig}displayOrder" name="displayOrder"/>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>

                    <%--<div class="flex-container flex-space-between flex-space-10">--%>
                        <%----%>
                        <%--<div class="flex-col-6">--%>
                            <%--<div class="flex-container">--%>
                                <%--<div class="form-combo block-show">--%>
                                    <%--<div class=" flex-container ">--%>
                                        <%--<label for="">按单项统计监--%>
                                            	<%--测工作量:</label>--%>
                                        <%--<input type="checkbox"  id="${tig}isIndividualStat" />--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>

                    <%--</div>--%>
                <%--</div>--%>
                <%--</form>--%>
                <%--<div class="wrapper-footer text-center">--%>
                    <%--<button data-show="${tig}addAreaUserSure" onclick="testItemGroupMain.saveGroupProject();" class="btn btn-submit sm-size J_ShowPop">确定</button>--%>
                    <%--<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>--%>
                <%--</div>--%>
            <%--</div>--%>

        <%--</div>--%>
    <%--</div>--%>
<%--</div>--%>

<!--添加检验项目-->
<%--<div class="pop" id="${tig}addCheckProject">--%>
    <%--<div class="pop-inner-wrap">--%>
        <%--<div class="pop-container">--%>
            <%--<div class="wrapper-container">--%>
                <%--<div class="wrapper-header flex-container flex-space-between">--%>
                    <%--<div>--%>
                        <%--<strong>已包含项目</strong>--%>
                        <%--<small>(已包含项目<span id="${tig}containItemCount"></span>)</small>--%>
                    <%--</div>--%>
                    <%--<div class="header-right">--%>
                        <%--<div class="flex-container flex-space-between group-items">--%>
                            <%--<strong>未包含项目</strong>--%>
                            <%--<span>仪器过滤</span>--%>
                            <%--<div class="drop-down">--%>
                                <%--<div class="drop-down-selected">--%>
                                    <%--<span class="selected-items"  id="${tig}instrument"></span>--%>
                                    <%--<i class="fa fa-angle-down "></i>--%>
                                <%--</div>--%>
                                <%--<div class="drop-down-menu">--%>
                                    <%--<ul class="list-unstyled"  id="${tig}ul_instrument">--%>
                                        <%--<c:forEach items="${ctrInstrumentsList }" var="instrument">--%>
		                        			 <%--<li onclick="testItemGroupMain.instrumentClick('${instrument.idStr }','${instrument.name }');" value="${instrument.idStr }">${instrument.name }</li>--%>
		                       		 	<%--</c:forEach>--%>
                                    <%--</ul>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <%--<div class="form-control-icon icon-right">--%>
                                <%--<input type="text" class="form-control" id="${tig}instrumentSearch" style="width:250px;" placeholder="搜索内容...">--%>
                                <%--<button class="control-icon text-center" onclick="testItemGroupMain.queryNotContain();"><i class="icon icon-search"></i></button>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>

                <%--</div>--%>
                <%--<div class="wrapper-content">--%>
                    <%--<div class="flex-container">--%>
                        <%--<div class="flex-col-6">--%>
                            <%--<table id="${tig}addCheckProjectLeft">--%>

                            <%--</table>--%>
                        <%--</div>--%>
                        <%--<div class="text-center vertical-options flex-container flex-center layout-vertical">--%>
                            <%--<button class="btn btn-circle" id="${tig}addCheckProjectBtn">--%>
                                <%--<i class="fa fa-chevron-left"></i>--%>
                            <%--</button>--%>
                            <%--<button class="btn btn-circle no-margin-left" id="${tig}removeInstrumentProjectBtn">--%>
                                <%--<i class="fa fa-chevron-right"></i>--%>
                            <%--</button>--%>
                        <%--</div>--%>
                        <%--<div class="flex-col-6">--%>
                            <%--<table id="${tig}addCheckProjectRight">--%>

                            <%--</table>--%>
                        <%--</div>--%>
                    <%--</div>--%>

                <%--</div>--%>
                <%--<div class="wrapper-footer text-center">--%>
                    <%--<button data-show="${tig}addAreaUserSure" onclick="testItemGroupMain.saveSingleItems();" class="btn btn-submit sm-size J_ShowPop">确定</button>--%>
                    <%--<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>--%>
                <%--</div>--%>
            <%--</div>--%>

        <%--</div>--%>
    <%--</div>--%>
<%--</div>--%>
 <!-------------------------------------------------------------------------------- 
	---------------------------默认标本类型下拉Grid数据源-------------------------------------
	--------------------------------------------------------------------------------->
	<%--<div id="${tig}gridSampleType" class="tablebox_02" style="width: 200px; height: 205px; display: none;">--%>
		<%--<table width="100%" border="0" cellspacing="0" cellpadding="0">--%>
			<%--<tr class="tablehead">--%>
				<%--<td style="width: 15px;">&nbsp;</td>--%>
				<%--<td style="width: auto;">名称</td>--%>
			<%--</tr>--%>
		<%--</table>--%>
		<%--<div class="tablelist" style="width: 100%; height: 176px;">--%>
			<%--<!--tablebox_02 tablelist start-->--%>
			<%--<table cellspacing="0" cellpadding="0" style="width: 200px;">--%>
 				<%--<c:forEach var="sampleType" items="${sampleTypeList}">--%>
					<%--<tr id="${sampleType.id}">--%>
						<%--<td style="width: 15px;">&nbsp;</td>--%>
						<%--<td style="width: auto;">${sampleType.name}</td>--%>
					<%--</tr>--%>
				<%--</c:forEach> --%>
			<%--</table>--%>
		<%--</div>--%>
	<%--</div>--%>

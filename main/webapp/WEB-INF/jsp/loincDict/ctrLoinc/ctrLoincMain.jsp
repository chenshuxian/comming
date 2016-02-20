<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/loincDict/ctrLoinc.js?var=${randomVal}"></script>
<div class="flex-container layout-vertical main-content-container" id="${cl}MainContentContainer">
    <div class="main-content-header">
        <div class="flex-container flex-space-between">
            <div class="search flex-container  flex-space-between">
                <div class="form-control-icon icon-right">
                    <input type="text" id="${cl}SearchStr" class="form-control" placeholder="搜索内容..."/>
                    <button class="control-icon text-center" id="${cl}SearchBtn">
                        <i class="icon icon-search"></i>
                    </button>
                </div>
                <span class="symbol"></span> <span>状态:</span>

                <div class="drop-down">
                    <div class="drop-down-selected">
                        <span class="selected-items" id="${cl}StatusSpan">所有</span><i class="icon icon-angle-down"></i>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${cl}-status-selector">
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
                        <i class="icon icon-sort"></i><span class="selected-items" id="${cl}SortSpan">排序</span>
                    </div>
                    <div class="drop-down-menu">
                        <ul class="list-unstyled ${cl}-sort-selector">
                            <li class="selected" el-value="0">按顺序号升序</li>
                            <li el-value="1">按名称升序</li>
                            <li el-value="2">按录入顺序降序</li>
                        </ul>
                    </div>
                </div>

                <span class="symbol">|</span>

                <span id="${cl}AddCtrLoinc"><i class="icon icon-plus-square"></i>添加</span>
                <span id="${cl}DeleteCtrLoincBatch"><i class="icon icon-trash"></i>删除选中</span>
            </div>
        </div>
    </div>

    <div class="main-content-body">
        <table id="${cl}CtrLoincList"></table>
    </div>

    <input type="hidden" id="${cl}Status"/>
    <input type="hidden" id="${cl}Sort"/>
    <input type="hidden" id="ctrLoincPreId" value="${cl}">

</div>

<!--------------------------------------------------------------------------------
---------------------------检验方法下拉Grid数据源------------------------------------
--------------------------------------------------------------------------------->
<div id="${cl}_gridTestMethod" class="tablebox_02" style="width: 353px; height: 205px; display: none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="tablehead">
            <td style="width: 15px;">&nbsp;</td>
            <td style="width: auto;">名称</td>
        </tr>
    </table>
    <div class="tablelist" style="width: 100%; height: 176px;">
        <!--tablebox_02 tablelist start-->
        <table cellspacing="0" cellpadding="0" style="width: 353px;">
            <c:forEach var="testMethod" items="${testMethodList}">
                <tr id="${testMethod.id}">
                    <td style="width: 15px;">&nbsp;</td>
                    <td style="width: auto;">${testMethod.name}</td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>
<!--------------------------------------------------------------------------------
---------------------------受检成份下拉Grid数据源--------------------------------------
--------------------------------------------------------------------------------->
<div id="${cl}_gridComponent" class="tablebox_02" style="width: 353px; height: 205px; display: none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="tablehead">
            <td style="width: 15px;">&nbsp;</td>
            <td style="width: auto;">名称</td>
        </tr>
    </table>
    <div class="tablelist" style="width: 100%; height: 176px;">
        <!--tablebox_02 tablelist start-->
        <table cellspacing="0" cellpadding="0" style="width: 353px;">
            <c:forEach var="discipline" items="${componentList}">
                <tr id="${discipline.id}">
                    <td style="width: 15px;">&nbsp;</td>
                    <td style="width: auto;"><c:out value="${discipline.name }" escapeXml="true"/></td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>
<!--------------------------------------------------------------------------------
---------------------------默认标本类型下拉Grid数据源-------------------------------------
--------------------------------------------------------------------------------->
<div id="${cl}_gridSampleType" class="tablebox_02" style="width: 353px; height: 205px; display: none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="tablehead">
            <td style="width: 15px;">&nbsp;</td>
            <td style="width: auto;">名称</td>
        </tr>
    </table>
    <div class="tablelist" style="width: 100%; height: 176px;">
        <!--tablebox_02 tablelist start-->
        <table cellspacing="0" cellpadding="0" style="width: 353px;">
            <c:forEach var="sampleType" items="${sampleTypeList}">
                <tr id="${sampleType.id}">
                    <td style="width: 15px;">&nbsp;</td>
                    <td style="width: auto;">${sampleType.name}</td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>
<!--------------------------------------------------------------------------------
---------------------------受检属性Grid数据源--------------------------------------------
--------------------------------------------------------------------------------->
<div id="${cl}_gridProperty" class="tablebox_02" style="width: 353px; height: 205px; display: none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="tablehead">
            <td style="width: 15px;">&nbsp;</td>
            <td style="width: auto;">名称</td>
        </tr>
    </table>
    <div class="tablelist" style="width: 100%; height: 176px;">
        <!--tablebox_02 tablelist start-->
        <table cellspacing="0" cellpadding="0" style="width: 353px;">
            <c:forEach var="units" items="${propertyList}">
                <tr id="${units.id}">
                    <td style="width: 15px;">&nbsp;</td>
                    <td style="width: auto;">${units.name}</td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>
<!--------------------------------------------------------------------------------
---------------------------样本类型下拉Grid数据源--------------------------------------
--------------------------------------------------------------------------------->
<div id="${cl}_gridTypeOfScale" class="tablebox_02" style="width: 353px; height: 205px; display: none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="tablehead">
            <td style="width: 15px;">&nbsp;</td>
            <td style="width: auto;">名称</td>
        </tr>
    </table>
    <div class="tablelist" style="width: 100%; height: 176px;">
        <!--tablebox_02 tablelist start-->
        <table cellspacing="0" cellpadding="0" style="width: 353px;">
            <c:forEach var="resultType" items="${typeOfScaleList}">
                <tr id="${resultType.id}">
                    <td style="width: 15px;">&nbsp;</td>
                    <td style="width: auto;"><c:out value="${resultType.name }" escapeXml="true"/></td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>
<!--------------------------------------------------------------------------------
---------------------------时间特性下拉Grid数据源--------------------------------------
--------------------------------------------------------------------------------->
<div id="${cl}_gridTimeAspect" class="tablebox_02" style="width: 353px; height: 205px; display: none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="tablehead">
            <td style="width: 15px;">&nbsp;</td>
            <td style="width: auto;">名称</td>
        </tr>
    </table>
    <div class="tablelist" style="width: 100%; height: 176px;">
        <!--tablebox_02 tablelist start-->
        <table cellspacing="0" cellpadding="0" style="width: 353px;">
            <c:forEach var="resultType" items="${timeAspectList}">
                <tr id="${resultType.id}">
                    <td style="width: 15px;">&nbsp;</td>
                    <td style="width: auto;"><c:out value="${resultType.name }" escapeXml="true"/></td>
                </tr>
            </c:forEach>
        </table>
    </div>
</div>


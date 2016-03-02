<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>

<div class="pop-inner-wrap">
	<div class="pop-container">
		<div class="wrapper-container">
			<form id="InfoForm" name="${cl}_crtLoincFrom">
				<input type="hidden" id="${cl}_id" name="id" value='<c:out value="${crtTestItemDto.id}" escapeXml="true"/>'>

				<input id="${cl}_codeNo" name="codeNo" type="hidden" value='${codeNo}'/>
				<input id="opType" name="opType" type="hidden" value='${opType}'/>
				<div class="wrapper-header flex-container flex-space-between">
					<h1>基本信息</h1>
					<small class="basic-code">编码: ${codeNo}<span id="spanEditCodeNo"></span></small>
				</div>
				<div class="wrapper-content">

					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_component"><span class="required-icon">*</span>受检成份:</label>
							<div id="${cl}_component" style="width: 353px" ></div>
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_property"><span class="required-icon">*</span>受检属性:</label>
							<div id="${cl}_property" style="width: 353px" ></div>
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_testMethod"><span class="required-icon">*</span>检验方法:</label>
							<div id="${cl}_testMethod" style="width: 353px"></div>
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_typeOfScale"><span class="required-icon">*</span>样本标识:</label>
							<div id="${cl}_typeOfScale" style="width: 353px"></div>
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_timeAspect"><span class="required-icon">*</span>时间特性:</label>
							<div id="${cl}_timeAspect" style="width: 353px"></div>
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_sampleType"><span class="required-icon">*</span>标本类型:</label>
							<div id="${cl}_sampleType" style="width: 353px"></div>
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_fastCode">助记符:</label>
							<input type="text" class="form-control block-show" id="${cl}_fastCode" name="fastCode" value='<c:out value="${crtTestItemDto.fastCode}" escapeXml="true"/>' maxlength="9">
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container  block-show">
							<label for="${cl}_displayOrder">顺序号:</label>
							<input type="text" class="form-control block-show"  id="displayOrder" name="displayOrder"  value="${displayOrder}" maxlength="6">
						</div>
					</div>
					<div class="flex-container flex-space-between horizontal-group">
						<div class=" flex-container flex-vertical-center  block-show">
							<label for="${cl}_memo">备注: </label>
							<textarea class="form-control block-show" id="${cl}_memo" name="memo"></textarea>
						</div>
					</div>
					<%-- <div class=" flex-container horizontal-group block-show">
                                    <label for="" class="rowspan-title">冰冻:</label>
                                    <input type="checkbox" id="testItem_isFreeze" name="isFreeze" value='1' <c:if test="${crtTestItemDto.isFreeze == 1}">checked="checked"</c:if>/>
                                </div> --%>
				</div>
				<div class="wrapper-footer text-center">
				<%--<button id="editBtn" class="btn btn-submit sm-size" onclick="CtrLoinc.editCtrLoinc('${opType}')">确定</button>--%>
				<button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
				<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
			</div>
			</form>
			</form>
			<input id="${cl}_componentId" name="componentId" type="hidden" value='<c:out value="${crtTestItemDto.testItemId}" escapeXml="true"/>'/>
			<input id="${cl}_propertyId" name="testPropertyId" type="hidden" value="${crtTestItemDto.testMethodId}"/>
			<input id="${cl}_testMethodId" name="testMethodId" type="hidden" value="<c:out value="${crtTestItemDto.codeNo}" escapeXml="true"/>" />
			<input id="${cl}_typeOfScaleId" name="typeOfScaleId" type="hidden" value="<c:out value="${crtTestItemDto.name}" escapeXml="true"/>">
			<input id="${cl}_timeAspectId" name="timeAspectId" type="hidden" value="<c:out value="${crtTestItemDto.name}" escapeXml="true"/>">
			<input id="${cl}_sampleTypeId" name="sampleTypeId" type="hidden" value="<c:out value="${crtTestItemDto.name}" escapeXml="true"/>">
		</div>
	</div>
</div>


<script type="text/javascript">

	$(document).ready(function() {
		CtrLoinc.componentGrid = new TextCombo(CtrLoinc.componentParam());
		CtrLoinc.testPropertyGrid = new TextCombo(CtrLoinc.testPropertyParam());
		CtrLoinc.testMethodGrid = new TextCombo(CtrLoinc.testMethodParam());
		CtrLoinc.typeOfScaleGrid = new TextCombo(CtrLoinc.typeOfScaleParam());
		CtrLoinc.timeAspectGrid = new TextCombo(CtrLoinc.timeAspectParam());
		CtrLoinc.sampleTypeGrid = new TextCombo(CtrLoinc.sampleTypeParam());
	});
</script>



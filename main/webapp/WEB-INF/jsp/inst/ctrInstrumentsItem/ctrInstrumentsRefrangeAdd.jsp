<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script>
	$("#detail").hide();
	$('.year').numberbox({
		min:0,
		max:200,
		width:35
	});
//
//	$('.floatNum').numberbox({
//		min:0,
//		precision:2,
//		width:146,
//		height:28
//	});

	/* 年龄单位 */
	$("#ageUnitId").change(function () {
		var val = $(this).children('option:selected').val();
		if(val == 6){
			$("#detail").show();
			$("#noDetail").hide();
		}else{
			$("#detail").hide();
			$("#noDetail").show();
		}
	});

</script>
<div class="pop-inner-wrap">
		<div class="pop-container">
			<form id="InfoForm">
				<div class="wrapper-container">
					<div class="wrapper-header flex-container flex-space-between">
						<h1>添加参考值</h1>
					</div>
					<div class="wrapper-content ctrInstruments">
						<div class="flex-container flex-space-between">
							<label for="">标本类型:</label>
							<select id="sampleTypeId" name="sampleTypeId"
									class="easyui-combobox xs-size form-control-combo"
									style="width: 370px;height: 30px;line-height: 16px;;border: 1px solid #cdd2d4;vertical-align: middle;box-sizing: border-box;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) inset;">
									<c:forEach var="item" items="${stList}" varStatus="status">
										<option value="${item.id}" <c:if test="${status.index == 0 }"> selected="selected"</c:if>>${item.name}</option>
									</c:forEach>
							</select>
						</div>
						<div class="flex-container flex-space-between">
								<label>年龄单位:</label>
								<select id="ageUnitId" name="ageUnitId"
										class="easyui-combobox xs-size form-control-combo"
										style="width: 370px;height: 30px;line-height: 16px;border: 1px solid #cdd2d4;vertical-align: middle;box-sizing: border-box;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) inset;">
									<option value="1" selected="selected">岁</option>
									<option value="2">月</option>
									<option value="3">周</option>
									<option value="4">天</option>
									<option value="5">时</option>
									<option value="6">详细年龄</option>
								</select>
						</div>
						<div class="flex-container">

								<span class="flex-container flex-space-between" id="noDetail">
									<label><span class="required-icon">*</span>年龄:</label>
									<input type="text" id="ageMin" name="ageMin" class="year"/>
									<span>-</span>
									<input type="text" id="ageMax" name="ageMax" class="year" />
								</span>
								<span class="flex-container flex-space-between" id="detail">
									<label><span class="required-icon">*</span>起始年龄:</label>
									<input type="text" id="yearStart" name="yearStart" class="year" data-options="width:35" />岁
									<span>-</span>
									<input type="text" id="monthStart" name="monthStart" class="year" data-options="width:35" />月
									<span>-</span>
									<input type="text" id="dayStart" name="dayStart" class="year" data-options="width:35" />天
									<label style="margin-left:5px;"><span class="required-icon">*</span>结束年龄:</label>
									<input type="text" id="yearEnd" name="yearEnd" class="year" data-options="width:35" />岁
									<span>-</span>
									<input type="text" id="monthEnd" name="monthEnd" class="year" data-options="width:35" />月
									<span>-</span>
									<input type="text" id="dayEnd" name="dayEnd" class="year" data-options="width:35" />天
								</span>

						</div>
						<div class="flex-container flex-space-between">
								<label for="">性别:</label>
								<select id="sexId" name="sexId"
										class="easyui-combobox xs-size form-control-combo"
										style="width: 370px;height: 30px;line-height: 16px;border: 1px solid #cdd2d4;vertical-align: middle;box-sizing: border-box;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) inset;">
									<c:forEach var="sexType" items="<%=SexType.values()%>" varStatus="status">
										<c:if test="${status.index != 0}">
										<option value="${sexType.index}" <c:if test="${status.index == 3}">selected="selected"</c:if>>${sexType.text}</option>
										</c:if>
									</c:forEach>
								</select>
						</div>
						<div class="flex-container flex-space-between">

							<div class=" flex-container  flex-space-between">
								<label for="">参考下限:</label>
								<input type="text" name="refLow" id="refLow" class="form-control block-show floatNum" value="" />
							</div>
							<div class=" flex-container flex-space-between">
								<label for="">参考上限:</label>
								<input type="text" name="refHigh" id="refHigh" class="form-control block-show floatNum" value="" />
							</div>
						</div>
						<div class="flex-container flex-space-between">

							<div class=" flex-container flex-space-between">
								<label for="">危急下限:</label>
								<input type="text" name="panicLow" id="panicLow" class="form-control block-show floatNum" value="" />
							</div>
							<div class=" flex-container flex-space-between">
								<label for="">危急上限:</label>
								<input type="text" name="panicHigh" id="panicHigh" class="form-control block-show floatNum" value="" />
							</div>
						</div>
						<div class="flex-container flex-space-between ">

							<div class=" flex-container  flex-space-between">
								<label for="">警告下限:</label>
								<input type="text" name="alarmLow" id="alarmLow" class="form-control block-show floatNum" value="" />
							</div>
							<div class=" flex-container  flex-space-between">
								<label for="">警告上限:</label>
								<input type="text" name="alarmHigh" id="alarmHigh" class="form-control block-show floatNum" value="" />
							</div>
						</div>
						<div class="flex-container flex-space-between">
							<label for="">文字描述:</label>
							<textarea name="refText" id="refText" class="form-control block-show"></textarea>
						</div>
						<div class="flex-container flex-space-between">
							<label for="">备注:</label>
							<textarea name="refRemark" id="refRemark" class="form-control block-show"></textarea>
						</div>
					</div>
					<input type="hidden" id="editId" name="id"/>
					<input type="hidden" id="opType" name="opType" value="${opType}"/>
					<input type="hidden" id="instrumentId" name="instrumentId"/>
					<input type="hidden" id="testItemId" name="testItemId"/>
					<input type="hidden" id="calcAgeMin" name="calcAgeMin"/>
					<input type="hidden" id="calcAgeMax" name="calcAgeMax"/>
					<input type="hidden" id="ageMinStr" name="ageMinStr"/>
					<input type="hidden" id="ageMaxStr" name="ageMaxStr"/>
					<div class="wrapper-footer text-center">
						<button class="btn btn-submit sm-size" id="editBtn" onclick="BasicModule.submit()">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</form>
		</div>
</div>


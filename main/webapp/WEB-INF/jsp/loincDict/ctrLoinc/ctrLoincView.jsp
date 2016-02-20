<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap">
	<div class="pop-container">
		<div class="wrapper-container">
			<form id="InfoForm">
				<div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
					<small class="basic-code">编码: ${codeNo}<span id="spanEditCodeNo"></span></small>
				</div>
				<div class="wrapper-content">
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editComponentName"><span class="required-icon">*</span>受检成份:</label>
								<input type="text" class="form-control block-show" id="editComponentName" name="componentName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editTestPropertyName"><span class="required-icon">*</span>受检属性:</label>
								<input type="text" class="form-control block-show" id="editTestPropertyName"
									   name="testPropertyName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editTestMethodName"><span class="required-icon">*</span>检验方法:</label>
								<input type="text" class="form-control block-show" id="editTestMethodName" name="testMethodName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editTypeOfScaleName"><span class="required-icon">*</span>样本标识:</label>
								<input type="text" class="form-control block-show" id="editTypeOfScaleName"
									   name="typeOfScaleName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editTimeAspectName"><span class="required-icon">*</span>时间特性:</label>
								<input type="text" class="form-control block-show" id="editTimeAspectName"
									   name="timeAspectName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editSampleTypeName"><span class="required-icon">*</span>标本类型:</label>
								<input type="text" class="form-control block-show" id="editSampleTypeName"
									   name="sampleTypeName"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editFastCode">助记符:</label>
								<input type="text" class="form-control block-show" id="editFastCode"
									   name="fastCode"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editDisplayOrder">顺序号:</label>
								<input type="text" class="form-control block-show" id="editDisplayOrder"
									   name="displayOrder" value="${displayOrder}"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="editMemo">备注:</label>
								<textarea class="form-control block-show" id="editMemo" name="memo"></textarea>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="editId" name="id"/>
				<input type="hidden" id="editOpType" name="opType" value="${opType}"/>
				<input type="hidden" id="editCodeNo" name="codeNo" value="${codeNo}"/>
			</form>
			<div class="wrapper-footer text-center">
				<button id="editBtn" class="btn btn-submit sm-size"
						onclick="CtrDictCodes.editDictCode('${opType}')">确定
				</button>
				<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
			</div>
		</div>
	</div>
</div>
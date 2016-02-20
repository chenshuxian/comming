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
								<label for="editName"><span class="required-icon">*</span>中文名称:</label>
								<input type="text" class="form-control block-show" id="editName" name="name"/>
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
				</div>
				<input type="hidden" id="editId" name="id"/>
				<input type="hidden" id="editOpType" name="opType" value="${opType}"/>
				<input type="hidden" id="editCodeNo" name="codeNo" value="${codeNo}"/>
			</form>
			<div class="wrapper-footer text-center">
				<button id="editBtn" class="btn btn-submit sm-size" onclick="ResultType.editDictCode('${opType}', '${typeKey}')">确定</button>
				<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
			</div>
		</div>
	</div>
</div>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap">
	<div class="pop-container">
		<div class="wrapper-container">
			<form id="ctrDictCodeInfoForm">
				<div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
					<small class="basic-code">编码: <span id="spanInfoCodeNo"></span></small>
				</div>
				<div class="wrapper-content">
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="name"><span class="required-icon">*</span>中文名称:</label>
								<input type="text" class="form-control block-show" id="name" name="name"
									   readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="displayOrder">顺序号:</label>
								<input type="text" class="form-control block-show" id="displayOrder"
									   name="displayOrder"
									   readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="flex-container">
						<div class="form-combo block-show">
							<div class=" flex-container flex-space-between">
								<label for="memo">备注:</label>
                                <textarea class="form-control block-show" id="memo" name="memo"
										  readonly="readonly"></textarea>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div class="wrapper-footer text-center">
				<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
			</div>
		</div>
	</div>
</div>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<div class="pop-inner-wrap">
	<div class="pop-container">
		<div class="wrapper-container">
			<form id="InfoForm">
				<div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
					<small class="basic-code">编码: ${codeNo}<span id="spanEditCodeNo"></span></small>
				</div>
				<div class="wrapper-content">
					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editName"><span class="required-icon">*</span>中文名称:</label>
										<input type="text" class="form-control block-show" id="editName" name="name" value=""/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editShortName">中文简称:</label>
										<input type="text" class="form-control block-show" id="editShortName" name="shortName"
											   value=""/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editAddress">中文地址:</label>
										<input type="text" class="form-control block-show" id="editAddress" name="address" value=""/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editEnName">英文名称:</label>
										<input type="text" class="form-control block-show" id="editEnName" name="enName"
											   value=""/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editEnShortName">英文简称:</label>
										<input type="text" class="form-control block-show" id="editEnShortName" name="enShortName" value=""/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editEnAddress">英文地址:</label>
										<input type="text" class="form-control block-show" id="editEnAddress" name="enAddress" value=""/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editContacts">联系人:</label>
										<input type="text" class="form-control block-show" id="editContacts" name="contacts" value=""/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editTelephone">联系电话:</label>
										<input type="text" class="form-control block-show" id="editTelephone" name="telephone" value=""/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editFax">传真号码:</label>
										<input type="text" class="form-control block-show" id="editFax" name="fax" value=""/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editFastCode">助记符:</label>
										<input type="text" class="form-control block-show" id="editFastCode" name="fastCode" value=""/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-container flex-space-between flex-space-10">
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editDisplayOrder">顺序号:</label>
										<input type="text" class="form-control block-show" id="editDisplayOrder" name="displayOrder" value="${displayOrder}"/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-col-6">
							<div class="flex-container">
								<div class="form-combo block-show">
									<div class=" flex-container  flex-space-between">
										<label for="editMemo">备注:</label>
										<%--<input type="text" class="form-control block-show" id="editMemo" name="memo" value=""/>--%>
										<textarea class="form-control block-show" id="editMemo" name="memo"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="editId" name="id"/>
				<input type="hidden" id="opType" name="opType" value="${opType}"/>
				<input type="hidden" id="editCodeNo" name="codeNo" value="${codeNo}"/>
				<input type="hidden" id="orgTypeId" name="orgTypeId" value="${orgTypeId}">
				<div class="wrapper-footer text-center">
					<button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
					<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
				</div>
			</form>

		</div>
	</div>
</div>
<!--机构信息维护-->
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
    <div class="pop-inner-wrap">
        <div class="pop-container">
            <div class="wrapper-container">
                <!--  form id="ctrDictCodeInfoEditForm"-->
    <form id="InfoForm">
    <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
        <span id="spanEditCodeNo"><small class="basic-code">编码: ${codeNo}</small></span>
    </div>
    <div class="wrapper-content">
        <div class="divider sm-size"></div>
        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for=""><span class="required-icon">*</span>所属地区:</label>
                            <input type="text" id="regionName" name="regionName" class="form-control block-show" value="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for=""><span class="required-icon">*</span>中文名称:</label>
                            <input type="text" class="form-control block-show" value="" id="name" name="name" maxlength="35">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">卫生机构代码:</label>
                            <input type="text" class="form-control block-show" value="" id="nacaoId" name="nacaoId" maxlength="32">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">中文简称:</label>
                            <input type="text" class="form-control block-show" value="" id="shortName" name="shortName" maxlength="15">
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">中文地址:</label>
                            <input type="text" class="form-control block-show" value="" id="address" name="address" maxlength="35">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">英文名称:</label>
                            <input type="text" class="form-control block-show" value="" id="enName" name="enName" maxlength="120">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">英文简称:</label>
                            <input type="text" class="form-control block-show" value="" id="enShortName" name="enShortName" maxlength="45">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">英文地址:</label>
                            <input type="text" class="form-control block-show" value="" id="enAddress" name="enAddress" maxlength="120">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">联系人:</label>
                            <input type="text" class="form-control block-show" value="" id="contacts" name="contacts" maxlength="30">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">联系电话:</label>
                            <input type="text" class="form-control block-show" value="" id="telephone" name="telephone" maxlength="50">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">传真号:</label>
                            <input type="text" class="form-control block-show" value="" id="fax" name="fax" maxlength="25">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">助记符:</label>
                            <input type="text" class="form-control block-show" value="" id="fastCode" name="fastCode" maxlength="9">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">顺序号:</label>
                            <input type="text" class="form-control block-show" value="${displayOrder}" id="displayOrder" name="displayOrder" maxlength="6">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
				<div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">备注:</label>
                            <textarea type="text" class="form-control block-show" value="" id="memo" name="memo" maxlength="150"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
     <input type="hidden" id="regionId" name="regionId">
     <input type="hidden" id="id" name="id">
     <input type="hidden" id="codeNo" name="codeNo" value="${codeNo}">
     <input type="hidden" id="opType" name="opType" value="${opType}"/>
	 <input type="hidden" id="orgTypeId" name="orgTypeId" value=${orgTypeId} />
	  <div class="wrapper-footer text-center">
	           <!--button id="editBtn" class="btn btn-submit sm-size"><input type='submit'>确定</button-->
	           <button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
	           <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
	     </div>
     </form>

      </div>
   </div>
</div>


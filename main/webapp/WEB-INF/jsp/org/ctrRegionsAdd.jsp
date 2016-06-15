<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
    <div class="pop-inner-wrap">
        <div class="pop-container">
            <div class="wrapper-container">
                <form id="editForm">
                    <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
                        <small class="basic-code" id="regCodeNo">编号: ${formdata.codeNo}</small>
                    </div>
                    <div class="wrapper-content">
                        <div class="flex-container">
                            <div class="form-combo block-show">
                                <div class=" flex-container flex-space-between">
                                    <label for="editName"><span class="required-icon">*</span>上级地区:</label>
                                    <span id="regpName"></span>
                                </div>
                            </div>
                        </div>
                        <div class="flex-container">
                            <div class="form-combo block-show">
                                <div class=" flex-container flex-space-between">
                                    <label for="name"><span class="required-icon">*</span>中文名称:</label>
                                    <input type="text" class="form-control block-show" id="name"
                                           name="name" value="${formdata.name}"/>
                                </div>
                            </div>
                        </div>
                        <div class="flex-container">
                            <div class="form-combo block-show">
                                <div class=" flex-container flex-space-between">
                                    <label for="enShortName">英文简称:</label>
                                    <input type="text" class="form-control block-show" id="enShortName" name="enShortName" value="${formdata.enShortName}"/>
                                </div>
                            </div>
                        </div>       
                          <div class="flex-container">
                            <div class="form-combo block-show">
                                <div class=" flex-container flex-space-between">
                                    <label for="enName">英文名称:</label>
                                    <input type="text" class="form-control block-show" id="enName" name="enName" value="${formdata.enName}"/>
                                </div>
                            </div>
                        </div>                     
                        <div class="flex-container">
                            <div class="form-combo block-show">
                                <div class=" flex-container flex-space-between">
                                    <label for="fastCode">助记符:</label>
                                    <input type="text" class="form-control block-show" id="fastCode"
                                           name="fastCode" value="${formdata.fastCode}"/>
                                </div>
                            </div>
                        </div>                      
                    </div>
                    <input type="hidden" name="id" id="id" value="${formdata.id}" />
					<input type="hidden" name="codeNo" id="hCodeNo" value="${formdata.codeNo}" />
					<input type="hidden" name="regoldName" id="regoldName" value="${formdata.name}" />
					<input type="hidden" name="regpid" id="regpid" value="" />
					<input type="hidden" name="eidtType" id="editType" value="" />

                    <div class="wrapper-footer text-center">
                        <%--<button id="editBtn" class="btn btn-submit sm-size" onclick="EasyTree.save();">确定</button>--%>
                        <button id="editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit()">确定</button>
                        <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
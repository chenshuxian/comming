<!--机构信息维护-->
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
    <div class="pop-inner-wrap">
        <div class="pop-container">
            <div class="wrapper-container">
                <!--  form id="ctrDictCodeInfoEditForm"-->
    <form id="InfoForm">
    <div class="wrapper-header flex-container flex-space-between"><h1>基本信息</h1>
         <small class="basic-code">编码: ${codeNo}<span id="spanEditCodeNo"></span></small>
    </div>
    <div class="wrapper-content">
        <div class="divider sm-size"></div>
        <div class="flex-container vertical-space flex-space-between flex-space-20">
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">所属地区:</label>
                            <input type="text" id="regionName" name="regionName" class="form-control block-show" value="">
                            <!-- <div id="showRegionDiv" class="col-sm-10  col-md-10" style="width:30%;display:none;text-align:left;position:absolute;background-color:#f0f0f0 ;overflow: auto;z-index:999;border:1px solid #AAAAAA;height:270px;overflow-y: auto;">
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="zTreeDemoBackground left">
											<ul id="medtt"></ul>
										</div>
									</div>
								</div> 
							</div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col-6">
                <div class="flex-container label-inline">
                    <div class="form-combo block-show">
                        <div class=" flex-container  flex-space-between">
                            <label for="">中文名称:</label>
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
                            <input type="text" class="form-control block-show" value="" id="memo" name="memo" maxlength="150">
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
     <input type="hidden" id="regionId" name="regionId">
     <input type="hidden" id="id" name="id">
     <input type="hidden" id="codeNo" name="codeNo" value="">
     <input type="hidden" id="opType" name="opType" value="${opType}"/>
	 <input type="hidden" id="orgTypeId" name="orgTypeId" value="${orgTypeId}" />
	 <div class="wrapper-footer text-center">
	           <!--button id="editBtn" class="btn btn-submit sm-size"><input type='submit'>确定</button-->
	           <button id="editBtn" class="btn btn-submit sm-size" onclick="validate.submit('Indenpent','${opType}')">确定</button>
	           <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
	 </div>     
     </form>
      </div>
   </div>
</div>

<%--
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${ctx}/scripts/zTree_v3/css/zTreeStyle/metro.css" type="text/css">
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.core-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.excheck-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.exedit-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/js/org/centerOrg.js?var=1.0.0.3"></script>
<script src="${ctx}/js/enterToTab.js"></script>
<title>独立实验室维护添加</title>  
<script type="text/javascript">
$(document).ready(function() {
	$("#regionName").focus();
	$("#showRegionDiv").hover(
	      function(){$(this).css('display', 'block');},
	      function(){$(this).css('display', 'none');}
	);
});
</script>
<style type="text/css">
	.ztree li a span{
		text-align: left;
		margin-left: 5px;
	}
</style>
</head>
<body class="bg">
    <h3>基本信息<a href="javascript:closeWin();"></a>
    <b class="codeNo">编码:${codeNo}</b>
    </h3>
    <form id="addForm" name="addForm">
    	<input type="hidden" id="opType" name="opType" value="${opType }"/>
    	<input type="hidden" id="orgTypeId" name="orgTypeId" value="${orgTypeId}" />
		<div>
			<span><i>*</i>所属地区</span>
			<input type="hidden" id = "regionId" name="regionId">
			<input type="text" id="regionName" name="regionName" onclick="showRegionDiv()" readonly="readonly">
			<div id="showRegionDiv" class="col-sm-10  col-md-10" style="width:30%;display:none;text-align:left;position:absolute;background-color:#f0f0f0 ;overflow: auto;z-index:999;border:1px solid #AAAAAA;height:270px;overflow-y: auto;">
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="zTreeDemoBackground left">
							<ul id="treeDemo" class="ztree" style="width: 100px;"></ul>
						</div>
					</div>
				</div>
			</div>
			
			<span><i>*</i>中文名称</span><input onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="name" name="name" maxlength="35"/>
		</div>
		<div>
			<span>中文简称</span><input onblur="checkSpecialSymbol('shortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="shortName" name="shortName" maxlength="15" />
			<span>中文地址</span><input onblur="checkSpecialSymbol('address',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="address" name="address" maxlength="35" />
		</div>
		<div>
		   <span>英文名称</span><input onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enName" name="enName" maxlength="120" />
		   <span>英文简称</span><input onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enShortName" name="enShortName" maxlength="45" />
		</div>
		<div>
		     <span>英文地址</span><input onblur="checkSpecialSymbol('enAddress',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="enAddress" name="enAddress" maxlength="120" />
		     <span><i>*</i>网站名称（地址）</span><input onblur="checkSpecialSymbol('webUrl',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="webUrl" name="webUrl" maxlength="55" />
		</div>
		<div>
		     <span>联系人</span><input onblur="checkSpecialSymbol('contacts',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="contacts" name="contacts" maxlength="30" />
		     <span><i>*</i>联系电话</span><input onblur="checkSpecialSymbol('telephone',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="telephone" name="telephone" maxlength="50" />
		</div>
		<div>
		     <span>传真号码</span><input onblur="checkSpecialSymbol('fax',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="fax" name="fax" maxlength="25" />
		     <span>助记符</span><input onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>')" type="text" id="fastCode" name="fastCode" maxlength="9" />
		</div>
		<div>
		   <span>顺序号</span><input onblur="checkSpecialSymbol('displayOrder',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="displayOrder" name="displayOrder" value="${displayOrder }" maxlength="6" />
		   <span>备注</span><input onblur="checkSpecialSymbol('memo',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" id="memo" name="memo" maxlength="150" />
		</div>
        <div class="btns">
            <input type="button" id='<%=COMFIRM_ID%>' value="确定" onclick="javascript:addIt();" onkeydown='if(event.keyCode==13){}'>
            <input type="button" id='<%=CANCEL_ID%>' value="取消" onclick="javascript:closeWin();">
        </div>
    </form>
</body>
</html>
 --%>
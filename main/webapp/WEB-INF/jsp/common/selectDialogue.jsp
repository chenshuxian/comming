<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>选择对话框</title>
<script src="js/common/selectDialogue.js?var=${randomVal}"></script>
<script type="text/javascript">
var callback = "${dto.callback }";

function search_sd() {
	$("#pageNo_sd").val(1);
	pageQuery_sd();
}

function pageQuery_sd() {
	var funcType = $("#funcType").val();
	var customerId = $("#customerId").val();
	var laboratoryId = $("#laboratoryId").val();
	var typeCode = $("#typeCode").val();
	
	var params = "pageNo=" + $("#pageNo_sd").val() + 
				"&pageSize=" + $("#pageSize_sd").val() + 
				"&orderField=" + $("#orderField").val() + 
				"&funcType=" + $("#funcType").val() + 
				"&searchStr=" + $("#searchTxt").val() + 
				"&objectId=" + $("#objectId").val() + 
				"&retObjectId=" + $("#retObjectId").val()
	if(funcType == 'location'){
		params += "&customerId=" + customerId;
	}
	if(funcType == 'labTestitem'){
		params += "&laboratoryId=" + laboratoryId;
	}
	if(funcType == 'labTestitem2'){
		params += "&laboratoryId=" + laboratoryId;
	}
	if(funcType == 'dictionary' || funcType == 'admArea'){
		params += "&typeCode=" + typeCode;
	}
	 
	params +="&callback=" + callback;
	
	$("#commonModalDiv").load(ctx+"/selectDialogue/list", encodeURI(params), function() {
	});
}

// 单选
function selectOne(){
	//得到表格所有行元素  
	var trs = $("#myChooseModal").find("tr");  
	var rr = "";
	
	//从第2行开始，得到每一行的radio组中的选定项  
	for(var i=1; i<trs.length; i++) {  
	    var radio = trs.eq(i).children().eq(0).find("input[type='radio']:checked");
	    
	    if(radio.val() != null && radio.val() != "" 
	    		&& radio.val() != undefined && radio.val() != "undefined"){
	    	rr = radio.val();
	    }
	}
	if(rr == ""){
		return false;
	}
	
	// 返回值
	var selectId = rr.split("@@##$$%%");
	var funcType = $("#funcType").val();
	var typeCode = $("#typeCode").val();
	if(funcType == 'labTestitem2'){
// 		alert(selectId[1]);
// 		alert(selectId[0]+'|'+selectId[2]);
		$("#" + $("#objectId").val() + "").val(selectId[1]); //Name
		$("#" + $("#retObjectId").val() + "").val(selectId[0]+'|'+selectId[2]); //ID
	} 
	else if(funcType ==  'admArea' && typeCode == 'double'){
		$("#" + $("#objectId").val() + "").val(selectId[1]); //Name
		$("#" + $("#retObjectId").val() + "").val(selectId[0]+'|'+selectId[2]); //ID + 行政区域简称
		$("#txt_customerCode").val('');
	}
	else if(funcType ==  'testItem2' ){
		$("#" + $("#objectId").val() + "").val(selectId[1]); //Name
		$("#" + $("#retObjectId").val() + "").val(selectId[0]+'|'+selectId[2]); //ID + 行政区域简称
	}
	else {
		$("#" + $("#objectId").val() + "").val(selectId[1]); //Name
		$("#" + $("#retObjectId").val() + "").val(selectId[0]); //ID
	}
	$("#select_dialogue_colose").trigger("click");
// 	$('#myChooseModal').modal('hide');
	
	if(callback != null && callback != 'null' && callback != ''){
		eval("("+callback+"())");
	}
}

// 全选
function selectAll(){
	$("input[id='selCheck']").each(function(){
		$(this).prop("checked", true);
	});
}
//反选
function unSelectAll(){
	$("input[id='selCheck']").each(function(){
		$(this).prop("checked", !$(this).prop("checked"));
	});
}

// 添加勾选
function addChecked(){
	var ids = '';
	var types = '';
	$("input[id='selCheck']").each(function(){
		if($(this).prop("checked") == true){
			var selectId = $(this).val().split("@@##$$%%");
			ids += selectId[0]+",";
			types += selectId[1]+",";
		}
	});
	
	$("#" + $("#objectId").val() + "").val(types); //Name
	$("#" + $("#retObjectId").val() + "").val(ids); //ID
	
	$("#select_dialogue_colose").trigger("click");
// 	$('#myChooseModal').modal('hide');
	
	if(callback != null && callback != 'null' && callback != ''){
		eval("("+callback+"())");
	}
}

// 添加到套餐

function addCheckedContinue(){
	var ids = '';
	var types = '';
	$("input[id='selCheck']").each(function(){
		if($(this).prop("checked") == true){
			var selectId = $(this).val().split("@@##$$%%");
			ids += selectId[0]+",";
			types += selectId[1]+",";
		}
	});
	
	$("#" + $("#objectId").val() + "").val(types); //Name
	$("#" + $("#retObjectId").val() + "").val(ids); //ID
	
	
	if(callback != null && callback != 'null' && callback != ''){
		eval("("+callback+"())");
	}
	
	$('#myChooseModal').modal('hide');
	
	pageQuery_sd();
}
</script>
</head>
<body>

<!-- 选择对话框 -->

	<div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
	            aria-hidden="true">×</span></button>
	    <h4 class="modal-title" id="myLargeModalLabel">选择${dto.funcTypeName }<a class="anchorjs-link" href="#myChooseModal"><span
	            class="anchorjs-icon"></span></a></h4>
	</div>
	<div class="modal-body">
	    <div class="row placeholder">
	        <div class="col-sm-6 col-md-6">
	            <div class="input-group">
	                <input type="text" class="form-control input-sm" placeholder="搜索内容..." id="searchTxt" value="${dto.searchStr }">
	     <span class="input-group-btn">
	       <button class="btn btn-default btn-sm" type="button" onclick="search_sd();"> 搜索</button>
	     </span>
	            </div>
	            <!-- /input-group -->
	        </div>
	        <c:if test="${dto.funcType=='labTestitem'}">
				<div class="col-sm-6 col-md-6">
                    <div class="input group">
                        <button class="btn btn-default btn-sm" type="button" onclick="selectAll();"> 全选</button>
                        <button class="btn btn-default btn-sm" type="button" onclick="unSelectAll();"> 反选</button>
                        <button type="button" class="btn btn-primary btn-sm" onclick="addChecked();"><span
                                class="glyphicon glyphicon-ok" aria-hidden="true"></span> 添加勾选
                        </button>
                    </div>
                </div>
			</c:if>
	    </div>
	
	    <div class="row placeholder">
	        <div class="col-sm-12 col-md-12">
	            <table class="table table-bordered table-striped table-hover table-condensed">
					<thead>
						<tr>
							<c:if test="${dto.funcType=='admArea'}">
								<th>&nbsp;</th><th>编码</th><th>行政区域</th><th>递属行政区域</th>
							</c:if>
							<c:if test="${dto.funcType=='salesArea'}">
								<th>&nbsp;</th><th>编码</th><th>销售区域</th><th>递属销售区域</th>
							</c:if>
							<c:if test="${dto.funcType=='testitemType'}">
								<th>&nbsp;</th><th>编码</th><th>项目分类</th><th>递属项目分类</th>
							</c:if>
							<c:if test="${dto.funcType=='lab'}">
								<th>&nbsp;</th><th>中文名称</th><th>递属机构</th><th>行政区域</th>
							</c:if>
							<c:if test="${dto.funcType=='salesMan'}">
								<th>&nbsp;</th><th>姓名</th><th>联系电话</th><th>销售区域</th>
							</c:if>
							<c:if test="${dto.funcType=='user'}">
								<th>&nbsp;</th><th>账号</th><th>姓名</th>
							</c:if>
							<c:if test="${dto.funcType=='testItem'}">
								<th>&nbsp;</th><th>类别</th><th>编号</th><th>名称</th><th>检验方法</th>
							</c:if>
							<c:if test="${dto.funcType=='labTestitem'}">
								<th>&nbsp;</th><th>全国统一码</th><th>项目名称</th><th>英文名称</th><th>检验方法</th><th>项目类型</th>
							</c:if>
							<c:if test="${dto.funcType=='labTestitem2'}">
								<th>&nbsp;</th><th>全国统一码</th><th>项目名称</th><th>英文名称</th><th>检验方法</th><th>项目类型</th>
							</c:if>
							<!-- 区域价格维护 -->
							<c:if test="${dto.funcType=='testItem2'}">
								<th>&nbsp;</th><th>全国统一码</th><th>项目名称</th><th>英文名称</th><th>检验方法</th><th>所属实验室</th><th>项目类型</th>
							</c:if>
							<c:if test="${dto.funcType=='customer'}">
								<th>&nbsp;</th><th>编号</th><th>名称</th><th>行政区域</th><th>销售区域</th>
							</c:if>
							<c:if test="${dto.funcType=='location'}">
								<th>&nbsp;</th><th>助记符</th><th>中文名称</th><th>英文名称</th><th>上级科室</th>
							</c:if>
							<c:if test="${dto.funcType=='dictionary'}">
								<th>&nbsp;</th><th>编码</th><th>中文名称</th><th>英文名称</th><th>显示顺序</th>
							</c:if>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${list}" var="item" varStatus="status">
							<tr>
								<c:if test="${dto.funcType!='labTestitem' && dto.funcType!='labTestitem2' && dto.funcType!='admArea' && dto.funcType!='testItem2'}">


					<%-- 			<c:if test="${dto.funcType!='labTestitem' && dto.funcType!='labTestitem2' && dto.funcType!='testItem2'}"> --%>


									<td scope="row" align="center"><input type="radio" id="selRadio" name="selRadio" value="${item.id}@@##$$%%${item.cnName }"></td>
								</c:if>
								<c:if test="${dto.funcType=='labTestitem'}">
									<td scope="row" align="center"><input type="checkbox" id="selCheck" name="selCheck" value="${item.id}@@##$$%%${item.testItemFlag }"></td>
								</c:if>
								<c:if test="${dto.funcType=='labTestitem2'}">
									<td scope="row" align="center"><input type="radio" id="selRadio" name="selRadio" value="${item.id}@@##$$%%${item.cnName }@@##$$%%${item.testItemFlag }"></td>
								</c:if>
								<!--区域价格维护开始  -->
								<c:if test="${dto.funcType=='testItem2'}">
									<td scope="row" align="center"><input type="radio" id="selRadio" name="selRadio" value="${item.uniqueCode}@@##$$%%${item.cnName }@@##$$%%${item.testItemFlag }"></td>
								</c:if>
								<!--区域价格维护结束  -->
								<c:if test="${dto.funcType=='admArea'}">
									<td scope="row" align="center"><input type="radio" id="selRadio" name="selRadio" value="${item.id}@@##$$%%${item.cnName }@@##$$%%${item.abbreviation }"></td>
								</c:if>
								<c:if test="${dto.funcType=='admArea'}">
									<td>${item.code }</td><td>${item.cnName }</td><td>${item.parentName }</td>
								</c:if>
								<c:if test="${dto.funcType=='salesArea'}">
									<td>${item.code }</td><td>${item.cnName }</td><td>${item.parentName }</td>
								</c:if>
								<c:if test="${dto.funcType=='testitemType'}">
									<td>${item.code }</td><td>${item.cnName }</td><td>${item.parentName }</td>
								</c:if>
								<c:if test="${dto.funcType=='lab'}">
									<td>${item.cnName }</td><td>${item.parentName }</td><td>${item.admAreaName }</td>
								</c:if>
								<c:if test="${dto.funcType=='salesMan'}">
									<td>${item.cnName }</td><td>${item.telephone }</td><td>${item.salesAreaName }</td>
								</c:if>
								<c:if test="${dto.funcType=='user'}">
									<td>${item.userName }</td><td>${item.cnName }</td>
								</c:if>
								<c:if test="${dto.funcType=='testItem'}">
									<td>${item.testitemCategoryName }</td><td>${item.uniqueCode }</td><td>${item.cnName }</td><td>${item.testMethod }</td>
								</c:if>
								<c:if test="${dto.funcType=='labTestitem'}">
									<td>${item.uniqueCode }</td><td>${item.cnName }</td><td>${item.enName }</td><td>${item.testMethod }</td>
									<c:if test="${item.testItemFlag=='1'}">
										<td>单项</td>
									</c:if>
									<c:if test="${item.testItemFlag=='2'}">
										<td>组合</td>
									</c:if>
								</c:if>
								<c:if test="${dto.funcType=='labTestitem2'}">
									<td>${item.uniqueCode }</td><td>${item.cnName }</td><td>${item.enName }</td><td>${item.testMethod }</td>
									<c:if test="${item.testItemFlag=='1'}">
										<td>单项</td>
									</c:if>
									<c:if test="${item.testItemFlag=='2'}">
										<td>组合</td>
									</c:if>
									<c:if test="${item.testItemFlag=='3'}">
										<td>套餐</td>
									</c:if>
								</c:if>
								<!--区域价格维护  -->
								<c:if test="${dto.funcType=='testItem2'}">
									<td>${item.uniqueCode }</td><td>${item.cnName }</td><td>${item.enName }</td><td>${item.testMethod }</td><td>${item.labName }</td>
									<c:if test="${item.testItemFlag=='1'}">
										<td>单项</td>
									</c:if>
									<c:if test="${item.testItemFlag=='2'}">
										<td>组合</td>
									</c:if>
									<c:if test="${item.testItemFlag=='3'}">
										<td>套餐</td>
									</c:if>
								</c:if>
								<c:if test="${dto.funcType=='customer'}">
									<td>${item.code }</td><td>${item.cnName }</td><td>${item.admAreaName }</td><td>${item.salesAreaName }</td>
								</c:if>
								<c:if test="${dto.funcType=='location'}">
									<td>${item.fastCode }</td><td>${item.cnName }</td><td>${item.enName }</td><td>${item.parentName }</td>
								</c:if>
								<c:if test="${dto.funcType=='dictionary'}">
									<td>${item.code }</td><td>${item.cnName }</td><td>${item.enName }</td><td>${item.displayOrder }</td>
								</c:if>
							</tr>
						</c:forEach>
					</tbody>
	            </table>
	        </div>
	
	    </div>
	
	
	    <div class="row">
			<%@ include file="/WEB-INF/jsp/common/listPage_selectDialogue.jsp"%>
	    </div>
	
	</div>
	
	<!-- table div -->
	
	<div class="modal-footer">
	    <button id="select_dialogue_colose" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	    <c:if test="${dto.funcType!='labTestitem'}">
	    	<button type="button" class="btn btn-primary" onclick="selectOne();">确定选择</button>
	    </c:if>
	    <c:if test="${dto.funcType=='labTestitem'}">
	    	<button type="button" class="btn btn-primary" onclick="addCheckedContinue();">添加到套餐</button>
	    </c:if>
	</div>
	
<!-- 编辑对话框-->

	
<input type="hidden" id="funcType" name="funcType" value="${dto.funcType}" />
<input type="hidden" id="objectId" name="objectId" value="${dto.objectId}" /> 
<input type="hidden" id="retObjectId" name="retObjectId" value="${dto.retObjectId}" />

<input type="hidden" id="customerId" name="customerId" value="${dto.customerId}" />
<input type="hidden" id="laboratoryId" name="laboratoryId" value="${dto.laboratoryId}" />
<input type="hidden" id="typeCode" name="typeCode" value="${dto.typeCode}" />

</body>
</html>
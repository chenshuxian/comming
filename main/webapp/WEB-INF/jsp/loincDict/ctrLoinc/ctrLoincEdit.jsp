<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <script src="${ctx}/js/loincDict/loinc.js?var=${randomVal}"></script>
    <script src="${ctx}/js/enterToTab.js"></script>
    <title>LOINC编码表信息查看</title>
    
<script type="text/javascript">

// 受检成份Grid
var componentParam = {					// 下拉Grid参数,所有参数均为必填
	div_id:"component", 				// 对应表单DIV的id
	grid_id:"gridComponent", 			// 对应数据源Grid的Id
	name:"componentId",					// 在表单中对应的提交name
	columnShow:1,						// 将要在文本框中显示的列序号
	width : 480, 					    // Combo的宽度
	clearOff:false,						// 是否禁用clear按钮
	searchColumn:[1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					// 锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};

// 受检属性Grid
var testPropertyParam = {				// 下拉Grid参数,所有参数均为必填
	div_id:"testProperty", 				// 对应表单DIV的id
	grid_id:"gridTestProperty", 		// 对应数据源Grid的Id
	name:"testPropertyId",				// 在表单中对应的提交name
	columnShow:1,						// 将要在文本框中显示的列序号
	width : 480, 					    // Combo的宽度
	clearOff:false,						// 是否禁用clear按钮
	searchColumn:[1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					// 锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};

// 检验方法Grid
var testMethodParam = {					// 下拉Grid参数,所有参数均为必填
	div_id:"testMethod", 				// 对应表单DIV的id
	grid_id:"gridTestMethod", 			// 对应数据源Grid的Id
	name:"testMethodId",				// 在表单中对应的提交name
	columnShow:1,						// 将要在文本框中显示的列序号
	width : 480, 					    // Combo的宽度
	clearOff:false,						// 是否禁用clear按钮
	searchColumn:[1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					// 锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};

// 样本标识Grid
var typeOfScaleParam = {				// 下拉Grid参数,所有参数均为必填
	div_id:"typeOfScale", 				// 对应表单DIV的id
	grid_id:"gridTypeOfScale", 			// 对应数据源Grid的Id
	name:"typeOfScaleId",				// 在表单中对应的提交name
	columnShow:1,						// 将要在文本框中显示的列序号
	width : 480, 					    // Combo的宽度
	clearOff:false,						// 是否禁用clear按钮
	searchColumn:[1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					// 锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};

// 时间特征Grid
var timeAspectParam = {					// 下拉Grid参数,所有参数均为必填
	div_id:"timeAspect", 				// 对应表单DIV的id
	grid_id:"gridTimeAspect", 			// 对应数据源Grid的Id
	name:"timeAspectId",				// 在表单中对应的提交name
	columnShow:1,						// 将要在文本框中显示的列序号
	width : 480, 					    // Combo的宽度
	clearOff:false,						// 是否禁用clear按钮
	searchColumn:[1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					// 锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};

// 样本类型Grid
var sampleTypeParam = {				 	// 下拉Grid参数,所有参数均为必填
	div_id:"sampleType", 				// 对应表单DIV的id
	grid_id:"gridSampleType", 			// 对应数据源Grid的Id
	name:"sampleTypeId",				// 在表单中对应的提交name
	columnShow:1,						// 将要在文本框中显示的列序号
	width : 480, 					    // Combo的宽度
	clearOff:false,						// 是否禁用clear按钮
	searchColumn:[1],					// 要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	lockBy:[26,471],					// 锁定Grid，传入数组[top,left]
	onEnter:function(){
	}
};

$(document).ready(function() {
	componentGrid = new TextCombo(componentParam);
	testPropertyGrid = new TextCombo(testPropertyParam);
	testMethodGrid = new TextCombo(testMethodParam);
	typeOfScaleGrid = new TextCombo(typeOfScaleParam);
	timeAspectGrid = new TextCombo(timeAspectParam);
	sampleTypeGrid = new TextCombo(sampleTypeParam);
	
	setTimeout(function(){
		componentGrid.setValue("${entity.componentId}");
		componentGrid.setText("${entity.componentName}");
		
		testPropertyGrid.setValue("${entity.testPropertyId}");
		testPropertyGrid.setText("${entity.testPropertyName}");
		
		testMethodGrid.setValue("${entity.testMethodId}");
		testMethodGrid.setText("${entity.testMethodName}");
		
		typeOfScaleGrid.setValue("${entity.typeOfScaleId}");
		typeOfScaleGrid.setText("${entity.typeOfScaleName}");
		
		timeAspectGrid.setValue("${entity.timeAspectId}");
		timeAspectGrid.setText("${entity.timeAspectName}");
		
		sampleTypeGrid.setValue("${entity.sampleTypeId}");
		sampleTypeGrid.setText("${entity.sampleTypeName}");
	},500); 
	
	$("#comboText1").focus();
});
</script>

</head>

<body class="bg">

	<h3>基本信息<a href="javascript:closeWin();"></a>
    	<b class="codeNo">编码:${entity.codeNo }</b>
    </h3>
    <form id="editForm" name="editForm">
    	<input type="hidden" id="opType" name="opType" value="${opType }"/>
    	<input type="hidden" id="id" name="id" value="${entity.id }"/>
    	
		<div>
			<span><i>*</i>受检成份</span>
            <div class="selectstyle">
            	<div id="component" style="width: 480px"></div>
                	<%-- <select name="componentId" style="width:480px;" id="componentId" class="select_box">
					<c:forEach items="${cdccList}" var="item" varStatus="status">
						<c:if test='${item.id==entity.componentId}'>
							<option value="${item.id}" selected>${item.name}</option>
						</c:if>
						<c:if test='${item.id!=entity.componentId}'>
							<option value="${item.id}">${item.name}</option>
						</c:if>
					</c:forEach>
                </select>--%>
            </div>
		</div>
		<div>
			<span><i>*</i>受检属性</span>
            <div class="selectstyle">
               <div id="testProperty" style="width: 480px"></div>
               <%--<select name="testPropertyId" style="width:480px;" id="testPropertyId" class="select_box">
					<c:forEach items="${cdcpList}" var="item" varStatus="status">
						<c:if test='${item.id==entity.testPropertyId}'>
							<option value="${item.id}" selected>${item.name}</option>
						</c:if>
						<c:if test='${item.id!=entity.testPropertyId}'>
							<option value="${item.id}">${item.name}</option>
						</c:if>
					</c:forEach>
                </select>--%>
            </div>
		</div>
		
		<div>
			<span><i>*</i>检验方法</span>
            <div class="selectstyle">
            	<div id="testMethod" style="width: 480px"></div>
                <%--<select name="testMethodId" style="width:480px;" id="testMethodId" class="select_box">
					<c:forEach items="${cdcmList}" var="item" varStatus="status">
						<c:if test='${item.id==entity.testMethodId}'>
							<option value="${item.id}" selected>${item.name}</option>
						</c:if>
						<c:if test='${item.id!=entity.testMethodId}'>
							<option value="${item.id}">${item.name}</option>
						</c:if>
					</c:forEach>
                </select>--%>
            </div>
		</div>
		
		<div>
			<span><i>*</i>样本标识</span>
            <div class="selectstyle">
            	<div id="typeOfScale" style="width: 480px"></div>
                <%-- <select name="typeOfScaleId" style="width:480px;" id="typeOfScaleId" class="select_box">
					<c:forEach items="${cdcsList}" var="item" varStatus="status">
						<c:if test='${item.id==entity.typeOfScaleId}'>
							<option value="${item.id}" selected>${item.name}</option>
						</c:if>
						<c:if test='${item.id!=entity.typeOfScaleId}'>
							<option value="${item.id}">${item.name}</option>
						</c:if>
					</c:forEach>
                </select>--%>
            </div>
		</div>
		
		<div>
			<span><i>*</i>时间特征</span>
            <div class="selectstyle">
            	<div id="timeAspect" style="width: 480px"></div>
                <%--  <select name="timeAspectId" style="width:480px;" id="timeAspectId" class="select_box">
					<c:forEach items="${cdcaList}" var="item" varStatus="status">
						<c:if test='${item.id==entity.timeAspectId}'>
							<option value="${item.id}" selected>${item.name}</option>
						</c:if>
						<c:if test='${item.id!=entity.timeAspectId}'>
							<option value="${item.id}">${item.name}</option>
						</c:if>
					</c:forEach>
                </select>--%>
            </div>
		</div>
		
		<div>
			<span><i>*</i>标本类型</span>
            <div class="selectstyle">
               <div id="sampleType" style="width: 480px"></div>
               <%--<select name="sampleTypeId" style="width:480px;" id="sampleTypeId" class="select_box">
					<c:forEach items="${cdctList}" var="item" varStatus="status">
						<c:if test='${item.id==entity.sampleTypeId}'>
							<option value="${item.id}" selected>${item.name}</option>
						</c:if>
						<c:if test='${item.id!=entity.sampleTypeId}'>
							<option value="${item.id}">${item.name}</option>
						</c:if>
					</c:forEach>
                </select>--%>
            </div>
		</div>
		
		<div>
			<span>助记符</span><input type="text" id="fastCode" name="fastCode" value="${entity.fastCode }" maxlength="9" style="width:470px;margin-left:10px;"/>
		</div>
		<div>
			<span>顺序号</span><input type="text" id="displayOrder" name="displayOrder" value="${entity.displayOrder }" maxlength="6" style="width:470px;margin-left:10px;"/>
		</div>
		
		<div>
			<span>备注</span><input type="text" id="memo" name="memo" value="${entity.memo }" maxlength="150" style="width:470px;margin-left:10px;"/>
		</div>
		
        <div class="btns">
            <input type="button" value="确定" onclick="javascript:updateIt();" onkeydown='if(event.keyCode==13){}'>
            <input type="reset" value="取消" onclick="javascript:closeWin();">
        </div>
    </form>
	
	  <!-------------------------------------------------------------------------------- 
	---------------------------下拉Grid数据源------------------------------------
	--------------------------------------------------------------------------------->
	<div id="gridComponent" class="tablebox_02" style="width: 480px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 480px;">
 				<c:forEach var="item" items="${cdccList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	
	<div id="gridTestProperty" class="tablebox_02" style="width: 480px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 480px;">
 				<c:forEach var="item" items="${cdcpList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	
	<div id="gridTestMethod" class="tablebox_02" style="width: 480px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 480px;">
 				<c:forEach var="item" items="${cdcmList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	
	<div id="gridTypeOfScale" class="tablebox_02" style="width: 480px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 480px;">
 				<c:forEach var="item" items="${cdcsList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	
	<div id="gridTimeAspect" class="tablebox_02" style="width: 480px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 480px;">
 				<c:forEach var="item" items="${cdcaList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
	
	<div id="gridSampleType" class="tablebox_02" style="width: 480px; height: 205px; display: none;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr class="tablehead">
				<td style="width: 15px;">&nbsp;</td>
				<td style="width: auto;">名称</td>
			</tr>
		</table>
		<div class="tablelist" style="width: 100%; height: 176px;">
			<!--tablebox_02 tablelist start-->
			<table cellspacing="0" cellpadding="0" style="width: 480px;">
 				<c:forEach var="item" items="${cdctList}">
					<tr id="${item.id}">
						<td style="width: 15px;">&nbsp;</td>
						<td style="width: auto;">${item.name}</td>
					</tr>
				</c:forEach> 
			</table>
		</div>
	</div>
</body>
</html>
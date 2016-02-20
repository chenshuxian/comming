<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script type="text/javascript" src="${ctx}/js/org/ctrRegions.js?var=V1.0.0.12"></script>
<div class="flex-container layout-vertical main-content-container" id="${reg}MainContentContainer">
 <div class="main-content-header">
        <div class="flex-container flex-space-between">
            <div class="search flex-container  flex-space-between">
                <div class="icon-right">
                   <h2>地区树</h2>
                </div>   				 
            </div>
            <div class="option icon-group-inline ">
                <span><button id="${reg}addBrotherBtn"><i class="icon icon-plus-square"></i>添加同级节点</button></span>
                <span><button id="${reg}addchildrenBtn"><i class="icon icon-plus-square"></i>添加子节点</button></span>
                <span><button id="${reg}updataBtn"><i class="icon icon-edit"></i>修改</button></span>
                <span><button id="${reg}delBtn"><i class="icon icon-trash"></i>删除</button></span>
            </div>
        </div>
    </div>
    <div class="main-content-body" style="overflow:auto">
        <ul id="tt"></ul>
        <!-- ul class="easyui-tree" id="tt" -->
    </div>
    <input type="hidden" id=${reg} value=${reg}>
   
    <!--script src="${ctx}/comming/js/basisDict/newCtrDictCodes.js?var=${randomVal}"></script-->

</div>
<!-- 
<!DOCTYPE html>
<%--@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/pageIds.jsp" %>
<script src="${ctx}/js/org/ctrRegions.js?var=${randomVal}"></script>


<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<!-- <link href="css/org/ctrRegions.css?var=V1.0.0.1" rel=stylesheet type="text/css"> -->
<link rel="stylesheet" href="${ctx}/scripts/zTree_v3/css/zTreeStyle/metro.css" type="text/css">
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.core-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.excheck-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.exedit-3.5.js" type="text/javascript" ></script>

<script src="${ctx}/js/enterToTab.js"></script>
<title>机构管理-地区维护-主页</title>
<script type="text/javascript">
$(function() {

	EasyTree.init("","1");



	initTreeEasy();
	initTree();
>>>>>>> .r14736
});
</script>
</head>
<body class="bg">


<div style="width:200px;height:auto;border:1px solid #ccc;">
	<ul id="tt" class="easyui-tree">
	</ul>
</div>
	<div class="yi_c over">
		<div>
			<h3>地区树</h3>
			<div class="btn">
				<a href="javascript:EasyTree.nodeAdd('addBrotherNode')" id="addBrotherBtn">添加同级节点</a>
				<a href="javascript:EasyTree.nodeAdd('addchildrenNode')" id="addchildrenBtn">添加子节点</a>
				<a href="javascript:EasyTree.nodeUpdate()" id= "updataBtn">修改</a>
				<a href="javascript:EasyTree.del()" id= "delBtn">删除</a>
			</div>
			<div class="dels">
				<div class="col-sm-10  col-md-10">
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="zTreeDemoBackground left">
							<ul id="treeDemo" class="ztree"></ul>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
	</div>
	<div class="xinxi" id="xinxi3">
		<h3>
			基本信息
			<a href="javascript:EasyTree.closeWin()"></a>
			<b class="codeNo" id = "codeNoLab"></b>
		</h3>
		<input type="hidden" name="pid" id="pid" />

		<form id="editForm">
			<input type="hidden" name="id" id="id" />
			<input type="hidden" name="codeNo" id="codeNo" />
			<input type="hidden" name="oldName" id="oldName" />
			<div>
				<span>上一级地区</span><span id="pName" style="text-align: left"></span>
			</div>
			<div>
				<span><i>*</i>中文名称 </span><input onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="name" id="name" value='<c:out value="${dto.name}" escapeXml="true"/>' maxlength="20"/>
			</div>
			<div>
				<span>英文简称</span><input onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="enShortName" id="enShortName" value='<c:out value="${dto.enShortName}" escapeXml="true"/>' maxlength="10"/>
			</div>
			<div>
				<span>英文名称</span><input onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="enName" id="enName" value='<c:out value="${dto.enName}" escapeXml="true"/>' maxlength="30"/>
			</div>
			<div>
				<span>助记符</span><input onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="fastCode" id="fastCode" value='<c:out value="${dto.fastCode}" escapeXml="true"/>' maxlength="9"/>
			</div>
			<div class="btns">
				<input type="button" value="确定" onclick="save()" id='<%=COMFIRM_ID%>'> 
				<input type="button" value="取消" onclick="closeWin()" id='<%=CANCEL_ID--%>'>
			</div>
		</form>

		<%--<form id="editForm">--%>
			<%--<input type="hidden" name="id" id="id" />--%>
			<%--<input type="hidden" name="codeNo" id="codeNo" />--%>
			<%--<input type="hidden" name="oldName" id="oldName" />--%>
			<%--<div>--%>
				<%--<span>上一级地区</span><span id="pName" style="text-align: left"></span>--%>
			<%--</div>--%>
			<%--<div>--%>
				<%--<span><i>*</i>中文名称 </span><input onblur="checkSpecialSymbol('name',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="name" id="name" value='<c:out value="${dto.name}" escapeXml="true"/>' maxlength="20"/>--%>
			<%--</div>--%>
			<%--<div>--%>
				<%--<span>英文简称</span><input onblur="checkSpecialSymbol('enShortName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="enShortName" id="enShortName" value='<c:out value="${dto.enShortName}" escapeXml="true"/>' maxlength="10"/>--%>
			<%--</div>--%>
			<%--<div>--%>
				<%--<span>英文名称</span><input onblur="checkSpecialSymbol('enName',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="enName" id="enName" value='<c:out value="${dto.enName}" escapeXml="true"/>' maxlength="30"/>--%>
			<%--</div>--%>
			<%--<div>--%>
				<%--<span>助记符</span><input onblur="checkSpecialSymbol('fastCode',<%=RE_SSYMBOL%>,'<%=MSG_SSYMBOL%>','<%=COMFIRM_ID%>','<%=CANCEL_ID%>')" type="text" name="fastCode" id="fastCode" value='<c:out value="${dto.fastCode}" escapeXml="true"/>' maxlength="9"/>--%>
			<%--</div>--%>
			<%--<div class="btns">--%>
				<%--<input type="button" value="确定" onclick="save()" id='<%=COMFIRM_ID%>'>--%>
				<%--<input type="button" value="取消" onclick="closeWin()" id='<%=CANCEL_ID%>'>--%>
			<%--</div>--%>
		<%--</form>--%>

	</div>
</body>
</html>
 -->
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
                                <label for="enShortName">英文简称:</label>
                                <input type="text" class="form-control block-show" id="enShortName"
                                       name="enShortName" readonly="readonly"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex-container">
                        <div class="form-combo block-show">
                            <div class=" flex-container flex-space-between">
                                <label for="enName">英文名称:</label>
                                <input type="text" class="form-control block-show" id="enName" name="enName"
                                       readonly="readonly"/>
                            </div>
                        </div>
                    </div>                   
                    <div class="flex-container">
                        <div class="form-combo block-show">
                            <div class=" flex-container flex-space-between">
                                <label for="fastCode">助记符:</label>
                                <input type="text" class="form-control block-show" id="fastCode"
                                       name="fastCode" readonly="readonly"/>
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
<%--
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>基础字典-标本状态</title>
</head>

<body class="bg">
	<h3>
		基本信息<a href="javascript:closeWin();"></a><b class="codeNo">编码:${entity.codeNo }</b>
	</h3>
	<form id="editForm" name="editForm">
		<input type="hidden" id="opType" name="opType" value="${opType }" />
		<input type="hidden" id="codeNo" name="codeNo"
			value="${entity.codeNo }" /> <input type="hidden" id="typeKey"
			name="typeKey" value="${typeKey}" /> <input type="hidden" id="id"
			name="id" value="${entity.id }" />
		<div>
			<span><i>*</i>中文名称</span> <input type="text" id="name" name="name" readonly="readonly" value= "<c:out value="${entity.name}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div>
			<span>英文简称</span> <input type="text" id="enShortName" name="enShortName" readonly="readonly" value="<c:out value="${entity.enShortName}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div>
			<span>英文名称</span> <input type="text" id="enName" name="enName" readonly="readonly" value="<c:out value="${entity.enName}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div>
			<span>助记符</span> <input type="text" id="fastCode" name="fastCode" readonly="readonly" value="<c:out value="${entity.fastCode}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div>
			<span>顺序号</span> <input type="text" id="displayOrder" name="displayOrder" readonly="readonly" value="<c:out value="${entity.displayOrder}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div>
			<span>备注</span> <input type="text" id="memo" name="memo" readonly="readonly" value="<c:out value="${entity.memo}" escapeXml="true"></c:out>" style="width: 70%;" />
		</div>
		<div class="btns">
			<input type="reset" value="确定" onclick="javascript:closeWin();">
		</div>
	</form>
</body>
</html>
 --%>
<%--
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="en">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>基础字典-试管类型</title>
<script type="text/javascript">
</script>
</head>
	<body class="bg">
		<h3>
			基本信息<a href="javascript:closeWin();"></a>
			<b class="codeNo">编码:${entity.codeNo}</b>
		</h3>
		<form id="editForm" name="editForm">
			<input type="hidden" id="opType" name="opType" value="${opType }" />
			<input type="hidden" id="codeNo" name="codeNo" value="${entity.codeNo }" /> 
			<input type="hidden" id="id" name="id" value="${entity.id }" />
			<div>
				<span><i>*</i>中文名称</span> <input type="text" id="name" name="name" readonly="readonly" value="${entity.name}" style="width: 70%;" />
			</div>
			<div>
				<span>英文简称</span> <input type="text" id="enShortName" name="enShortName" readonly="readonly" value="${entity.enShortName}" style="width: 70%;" />
			</div>
			<div>
				<span>英文名称</span> <input type="text" id="enName" name="enName" readonly="readonly" value="${entity.enName}" style="width: 70%;" />
			</div>
			<div>
				<span>助记符</span> <input type="text" id="fastCode" name="fastCode" readonly="readonly" value="${entity.fastCode}" style="width: 70%;" />
			</div>
			<div>
				<span>顺序号</span> <input type="text" id="displayOrder" name="displayOrder" readonly="readonly" value="${entity.displayOrder}" style="width: 70%;" />
			</div>
			<div>
				<span>备注</span> <input type="text" id="memo" name="memo" readonly="readonly" value="${entity.memo}" style="width: 70%;" />
			</div>
			<div class="btns">
				<input type="reset" value="确定" onclick="javascript:closeWin();" />
			</div>
		</form>
	</body>
</html>
 --%>
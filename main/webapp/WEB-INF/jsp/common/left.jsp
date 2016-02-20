<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title></title>

<script type="text/javascript" src="${ctx}/js/jquery.min.js"></script>

<style type="text/css">
    html, body {
        width: 100%;
        height: 100%; 
        margin: 0px;
        padding: 0px;
        overflow: hidden;
    }
	
	a{ text-decoration:none; color:#333} 
	a:hover{ text-decoration:underline;}
</style>

<script type="text/javascript">	
	$(document).ready(function(){
		
	});
	
	function menuLink(href){ 
		$('#navigation > li > #left').stop().animate({'marginLeft':'-185px'},200);
        $('#content').attr('src',href);
	}

</script> 
</head>

<body>
	<div id="treeboxbox_tree" style="width:100%; height:100%; margin:0px; padding:0px; overflow:auto; background:#E0E9F5; font-size:12px;">
		<ul>
			<li>基础字典
				<ul>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=1');">标本类型</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=2');">检验方法</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=3');">医学专业组</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=4');">病理大类</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=9');">标本状态</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=10');">就诊类型</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=11');">结果单位</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrResultTypes/ctrResultTypesMain');">结果类型 </a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrTubeTypes/ctrTubeTypesMain');">试管类型 </a></li>
					<li>LOINC字典
				<ul>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=5');">受检成份</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=6');">受检属性</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=7');">样本标识</a></li>
					<li><a href="javascript:menuLink('${ctx}/basisDict/ctrDictCodes/ctrDictCodesMain?typeKey=8');">时间特征</a></li>
					<li><a href="javascript:menuLink('${ctx}/ctrLoinc/ctrLoincMain');">LOINC编码表</a></li>
				</ul>
			</li>
				</ul>
			</li>
			<li>机构管理
				<ul>
					<li><a href="javascript:menuLink('${ctx}/ctrRegions/ctrRegionsMain');" >地区维护</a></li>
				</ul>
				<ul>
					<li><a href="javascript:menuLink('${ctx}/org/regionalManagement/regionalManagementMain?orgTypeId=51');" >区域管理机构维护</a></li>
				</ul>
				<ul>
					<li><a href="javascript:menuLink('${ctx}/org/centerOrg/centerOrgMain?orgTypeId=40');">医疗机构维护</a></li>
				</ul>
				<ul>
					<li><a href="javascript:menuLink('${ctx}/org/centerOrg/centerOrgMain?orgTypeId=41');">独立实验室维护</a></li>
				</ul>
			</li>
			<li>设备管理
				<ul>
					<li><a href="javascript:menuLink('${ctx}/inst/ctrInstruments/ctrInstrumentsMain');">中心仪器信息</a></li>
					<li><a href="javascript:menuLink('${ctx}/inst/ctrInstrumentsItem/ctrInstrumentsItemMain');">中心仪器项目对照</a></li>
					<li><a href="javascript:menuLink('${ctx}/inst/ctrInstrumentsMics/ctrInstrumentsMicsMain');">中心仪器细菌对照</a></li>
					<li><a href="javascript:menuLink('${ctx}/instruments/instrumentsMain');">客户仪器信息</a></li>
					<li><a href="javascript:menuLink('${ctx}/inst/instrumentsItem/instrumentsItemMain');">客户仪器项目对照</a></li>
					<li><a href="javascript:menuLink('${ctx}/inst/instrumentBox/instrumentBoxMain');">客户盒子登记</a></li>
				</ul>
				<ul>
					<li><a href="javascript:menuLink('${ctx}/inst/instrMics/instrMicsMain');">客户仪器细菌对照</a></li>
				</ul>
			</li>
			<li>项目管理
				<ul>
					<li><a href="javascript:menuLink('${ctx}/pm/testItem/testItemMain');">检验项目</a></li>
					<li><a href="javascript:menuLink('${ctx}/pm/testItemGroup/testItemGroupMain');">组合项目</a></li>
					<li><a href="javascript:menuLink('${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=1');">细菌字典</a></li>
					<li><a href="javascript:menuLink('${ctx}/pm/CentreMicrobeItem/centreMicrobeItemMain?itemTypeId=2');">抗生素字典</a></li>
				</ul>
			</li>
			<li>系统管理
				<ul>
					<li><a href="javascript:menuLink('${ctx}/sys/logQuery/logQueryMain');" >日志查询</a></li>
					<li><a href="javascript:menuLink('${ctx}/sys/user/userMain');" >用户管理</a></li>
					<li><a href="javascript:menuLink('${ctx}/sys/user/userInfo');" >个人信息</a></li>
					<li><a href="javascript:menuLink('${ctx}/sys/user/setPassWord');" >设置密码</a></li>
					<li><a href="javascript:menuLink('${ctx}/sys/user/updatePassWord');" >修改密码</a></li>
				</ul>
			</li>
		</ul>
	</div>
</body>
</html>

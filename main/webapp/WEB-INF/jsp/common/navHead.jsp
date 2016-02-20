<%@ page language="java" import="java.util.*,com.daan.domain.Constant,com.daan.domain.User" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<head>
<title>DC主页</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript">
	function menuClick(href) {
		$("#containerDIV").load(href);
	}

	function logout(){
		parent.window.location='${ctx}/home/logout';
	}
</script>

<%
	String name = "";
	User user = (User)request.getSession().getAttribute(Constant.SESSION_KEY);
	if(user != null){
	/*	name = user.getName();*/
	}
%>

</head>

<body>
	<!-- <nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid"> -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand">中心库</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-left">
				<dc:ifAuthrized value="01000000">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-expanded="false">项目管理<span
							class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<dc:ifAuthrized value="01010000">
								<li><a href="${ctx}/dictionary/dictionaryMain" >基础字典</a></li>
								<li class="divider"></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="01020000">
								<li><a href="${ctx}/testitemType/testitemTypeMain">项目分类</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="01030000">
								<li><a href="${ctx}/pathologyGroupList">病理大类</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="01040000">
								<li><a href="${ctx}/testItem/main">检验项目</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="01050000">
								<li><a href="${ctx}/bacteria/bacteriaMain">细菌字典</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="01060000">
								<li><a href="${ctx}/antibiotic/main">抗生素字典</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="01070000">
								<li class="divider"></li>
								<li><a href="${ctx}/loincCode/loincCodeList">LOINC编码表</a></li>
							</dc:ifAuthrized>
						</ul>
					</li>
				</dc:ifAuthrized>

				<dc:ifAuthrized value="02000000">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-expanded="false">机构管理<span
							class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<dc:ifAuthrized value="02010000">
								<li><a href="${ctx}/org/ctrRegionsMain" >地区维护</a></li>
							</dc:ifAuthrized>
						</ul>
					</li>
				</dc:ifAuthrized>

				<dc:ifAuthrized value="03000000">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-expanded="false">渠道管理<span
							class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<dc:ifAuthrized value="03010000">
								<li><a href="${ctx}/customerDictionary/main">渠道基础字典</a></li>
								<li class="divider"></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="03020000">
								<li><a href="${ctx}/admArea/admAreaMain">行政区域</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="03030000">
								<li><a href="${ctx}/areaPrice/areaPriceList">区域价格</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="03040000">
								<li><a href="${ctx}/salesRegion/salesRegionMain">销售区域</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="03050000">
								<li><a href="${ctx}/salesmen/salesmenList">业务员</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="03060000">
								<li class="divider"></li>
								<li><a href="${ctx}/customer/customerList">客户维护</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="03070000">
								<li class="divider"></li>
								<li><a href="${ctx}/contract/contractList">合同管理</a></li>
							</dc:ifAuthrized>
						</ul>
					</li>
				</dc:ifAuthrized>

				<dc:ifAuthrized value="04000000">
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown" role="button" aria-expanded="false">权限管理<span
							class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<dc:ifAuthrized value="04010000">
								<li><a href="${ctx}/user/main">用户</a></li>
							</dc:ifAuthrized>
							<dc:ifAuthrized value="04020000">
								<li class="divider"></li>
								<li><a href="${ctx}/role/main">权限组</a></li>
							</dc:ifAuthrized>
						</ul>
					</li>
				</dc:ifAuthrized>
			</ul>
			
			<!-- 用户信息-->
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-expanded="false"><%=name %>
						<span class="caret"></span>
				</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="${ctx }/operationLog/main">操作日志</a></li>
						<li><a href="${ctx}/user/toChangePwd" target="_blank">更改密码</a></li>
						<li class="divider"></li>
						<li><a href="javascript:logout();">注销</a></li>
					</ul></li>
			</ul>
		</div>
<!-- 	</div>
	</nav> -->
		
	
</body>
</html>
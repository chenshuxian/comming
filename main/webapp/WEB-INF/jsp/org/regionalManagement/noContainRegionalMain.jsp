<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/page_head.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${ctx}/scripts/zTree_v3/css/zTreeStyle/metro.css" type="text/css">
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.core-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.excheck-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/scripts/zTree_v3/js/jquery.ztree.exedit-3.5.js" type="text/javascript" ></script>
<script src="${ctx}/js/enterToTab.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	initTree("", "1");
	notContainSearch();
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
<title>机构信息列表</title>
</head>
<body>
		<h3>未包含机构列表</h3>
<%-- 		<p align="right">记录总行数： <label id="notContainListNumber">${fn:length(notContainList)}</label></p><br/> --%>
		   <div>
		       <span style="width:60px; float:left; padding: 10px 0px; font-weight: normal;">地区</span> 
               <input type="hidden" id = "regionId" name="regionId">
			   <input type="text" id="regionName" name="regionName" onclick="showRegionDiv();" readonly="readonly">
			   <div id="showRegionDiv" class="col-sm-10  col-md-10" style="width:30%;display:none;text-align:left;position:absolute;background-color:#f0f0f0 ;overflow: auto;z-index:999;border:1px solid #AAAAAA;height:270px;overflow-y: auto;">
				 <div class="panel panel-default">
					<div class="panel-body">
						<div class="zTreeDemoBackground left">
							<ul id="treeDemo" class="ztree"></ul>
						</div>
					</div>
				</div>
			   </div>
			   </div>
            <div style="float:left; padding: 10px 10px;">
                <input id="searchRegionalStr" name="searchRegionalStr" type="text" placeholder="搜索内容...">
                <input type="button" value="搜索" onclick="notContainSearch();">
           </div>
        <div id="notContainListDiv">
        	<table id="notContainList">
                <tr>  
                    <th style="width: 10%" class="quan2"><a href="javascript:void(0)" class="not"></a></th>
                    <th style="width: 30%">编码</th>
                    <th style="width: 30%">中文名称</th>
                    <th style="width: 30%">地区</th>
                </tr>
        	</table>
        </div>
</body>
</html>

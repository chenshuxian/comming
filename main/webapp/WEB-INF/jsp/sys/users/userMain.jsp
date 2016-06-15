<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<div class="flex-container layout-vertical main-content-container" id="mainContentContainer">
	<div class="main-content-header">
		<div class="flex-container flex-space-between">
			<div class="search flex-container  flex-space-between">
				<div class="form-control-icon icon-right">
					<input type="text" class="form-control" placeholder="搜索内容..." />
					<button class="control-icon text-center">
						<i class="icon icon-search"></i>
					</button>
				</div>
				<span class="symbol"></span> <span>状态:</span>
				<div class="drop-down">
					<div class="drop-down-selected">
						<span class="selected-items">所有</span><i class="fa fa-angle-down "></i>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled">
							<li class="selected">所有</li>
							<li>开启</li>
							<li>停用</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="option icon-group-inline ">
				<div class="drop-down drop-down-icon">
					<div class="drop-down-selected">
						<i class="icon icon-sort"></i><span class="selected-items">排序</span>
					</div>
					<div class="drop-down-menu">
						<ul class="list-unstyled">
							<li class="selected">按顺序号升序</li>
							<li>按名称升序</li>
							<li>按录入顺序降序</li>
						</ul>
					</div>
				</div>

				<span class="symbol">|</span>
				<span class="J_AddAreaUser J_ShowPop" data-show="addAreaUser"><i class="icon icon-plus-square"></i>
				添加区域用户</span><span class="J_ShowPop" data-show="basicInfo"><i class="icon icon-plus-square"></i> 
				添加</span> <span><i class="icon icon-trash"></i>删除选中</span>
			</div>
		</div>
	</div>
	<div class="main-content-body easyui-layout">
		<table id="userManagerList"></table>
	</div>
	<!--自定义分页-->
	<!-- <div class="main-content-footer">
		<div class="flex-container flex-space-between">
			<div>
				共 <strong>4</strong> 条记录
			</div>
			<div class="pagination">
				<a href=""> <i class="icon icon-page-first"></i>
				</a> <a href=""> <i class="icon icon-page-prev"></i>
				</a><span><input type="text" value="1" /> / 2
				</span> <a href=""> <i class="icon icon-page-next"></i>
				</a> <a href=""> <i class="icon icon-page-last"></i>
				</a>
			</div>
			<div class="change-page">
				<span> 每页显示：</span>
				<div class="drop-down">
					<div class="drop-down-selected">
						20 <i class="fa fa-angle-down "></i>
					</div>
					<div class="drop-down-menu position-top">
						<ul class="list-unstyled">
							<li class="selected">20</li>
							<li>40</li>
							<li>60</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		end
	</div> -->

	<!--基本信息展示-->
	<div class="pop" id="basicInfoOnly">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="panel-container">
					<div class="panel-header">
						<h1 class="text-center">基本信息</h1>
					</div>
					<div class="panel-content">
						<div class="form-group">
							<label for="">
								<strong><span class="required-icon">*</span>用户账号 </strong> 
								<small>(4-20位，可由数字、字母和下划线组成，最少包含一位字母，字母区分大小写)</small>
							</label>
							<input type="text" class="form-control block-show" value="a100001" readonly="readonly" />
						</div>
						<div class="form-group">
							<label for=""><strong><span class="required-icon">*</span>用户名称</strong></label> 
							<input type="text" class="form-control block-show" value="张三" readonly="readonly" />
						</div>
						<div class="form-group">
							<label for=""><strong>顺序号</strong> </label> 
							<input type="text" class="form-control block-show" value="1" readonly="readonly" />
						</div>
						<div class="form-group">
							<label for=""><strong>备注</strong></label> 
							<input type="text" class="form-control block-show" />
						</div>
					</div>
					<div class="panel-footer text-center">
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--基本信息-->
	<div class="pop" id="basicInfo">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="panel-container">
					<div class="panel-header">
						<h1 class="text-center">基本信息</h1>
					</div>
				<form id="fm" method="post"> 
					<div class="panel-content">
						<div class="form-group">
							<label for="">
								<strong><span class="required-icon">*</span>用户账号 </strong> 
								<small>(4-20位，可由数字、字母和下划线组成，最少包含一位字母，字母区分大小写)</small>
							</label> 
							<input type="text" class="form-control block-show" />
						</div>
						<div class="form-group">
							<label for="">
								<strong><span class="required-icon">*</span>用户名称</strong> 
							</label> 
							<input type="text" class="form-control block-show" />
						</div>
						<div class="form-group">
							<label for=""><strong>顺序号</strong></label>
							<input type="text" class="form-control block-show" />
						</div>
						<div class="form-group">
							<label for=""><strong>备注</strong></label>
							<input type="text" class="form-control block-show" />
						</div>
					</div>
				</form>
					<div class="panel-footer text-center">
						<button class="btn btn-submit sm-size">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--添加区域用户-->
	<div class="pop" id="addAreaUser">
		<div class="pop-inner-wrap">
			<div class="pop-container">
				<div class="panel-container">
					<div class="panel-header">
						<h1 class="text-center">添加区域用户</h1>
					</div>
					<div class="table-header">
						<div class="flex-container flex-space-between">
							<div>
								<span><span class="required-icon">*</span>用户所属机构:</span>
								<div class="drop-down">
									<div class="drop-down-selected selected-items">
										广州达安实验室 <i class="fa fa-angle-down "></i>
									</div>
									<div class="drop-down-menu">
										<ul class="list-unstyled">
											<li class="selected">
												<i class="icon icon-check"></i>广州达安实验室
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="search">
								<div class="form-control-icon icon-right">
									<input type="text" class="form-control" placeholder="搜索内容..." />
									<button class="control-icon text-center">
										<i class="icon icon-search"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="pop-table-data-list">
						<table id="areaUserList">
						</table>
					</div>
					<div class="panel-footer text-center">
						<button data-show="addAreaUserSure" class="btn btn-submit sm-size J_ShowPop">确定</button>
						<button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
		var tableList;
		var areaUserList;
		$(function() {
			tableList = $('#userManagerList');
			areaUserList = $('#areaUserList');
			var url = ctx + "/sys/user/userList";
			tableList.datagrid({
				url : url,
				method : 'POST',
				height : 500,
				pagination:true,//分页控件 
				fitColumns : true,
				fit : false,
				checkOnSelect : false,
				selectOnCheck : true,
				columns : [ [
					{field : "ck",checkbox : true,width : 30},
					{title : "用户账户",field : 'userNo',width : 80,formatter : function(value) {
						return '<a class="J_ShowPop" data-show="basicInfoOnly">'+ value + '</a>';
					}},
					{title : "用户名称",field : 'userName',flex : 1,width : 60},
					{title : "备注",field : 'memo',width : 200},
					{title : "状态",field : 'status',formatter : function(value) {
						var returnStr = '<div class="status-switch"><input type="checkbox" name="status" /><i></i></div>';
							if (value == '1') {
								returnStr = '<div class="status-switch"><input type="checkbox" name="status" checked="checked" /><i></i></div>';
							}
								return returnStr;
							}},
					{title : "操作",field : 'opt',width : 60,align : 'center',
											formatter : function(value, row,index) {
												var str = "";
												str += '<a class="icon icon-edit" onclick="editRow('+ index + ',this)"></a>';
												str += '<a class="icon icon-trash" onclick="deleteRow(' + index + ',this)"></a>';
												str += '<a class="icon icon-lock-b" onclick="resetPassword(' + index + ',this)"></a>';
												return str;
											}
					} ] ],
							//                autoRowHeight: false,
							//                pagination: true,
							//                pageSize: 10
					}).pagination({
					beforePageText : '第',//页数文本框前显示的汉字
					afterPageText : '页    共 {pages} 页',
					displayMsg : '共{total}条数据',
					total : 26,
					pageSize : 10,
					pageNumber : 1
				});
			$(document).on('click', '.J_AddAreaUser', function() {
				areaUserList.datagrid({
					url : 'app/userManager/userManager/list.json',
					method : 'get',
					height : 400,
					fitColumns : true,
					fit : false,
					columns : [ [ {
						field : "ck",
						checkbox : true,
						width : 30
					}, {
						title : "用户账户",
						field : 'useraccount',
						width : 40
					}, {
						title : "用户名称",
						field : 'username',
						flex : 1,
						width : 60
					}, {
						title : '电话号码',
						field : 'phonenumber',
						align : 'center',
						width : 80
					} ] ],
				//                autoRowHeight: false,
				//                pagination: true,
				//                pageSize: 10
				}).pagination({
					beforePageText : '第',//页数文本框前显示的汉字
					afterPageText : '页    共 {pages} 页',
					displayMsg : '共{total}条数据',
					total : 26,
					pageSize : 10,
					pageNumber : 1
				});
			});

			/*自适应表格*/
			function tableAutoWidth() {
				var width = tableList.parents('.tabs-panels').width() - 40;
				tableList.datagrid('resize', {
					width : width
				});
			}

			$(window).on('resize', function() {
				tableAutoWidth();
			});
		});
		/*编辑*/
	     function editRow(index, obj) {
			
	          //  var row = $("#userManagerList").datagrid("getSelected");
	                $("#basicInfo").dialog("open").dialog('setTitle', 'Edit User');
	               // $("#fm").form("load", row);
	            
	        }
		/*删除行*/
		function deleteRow(index) {
			$.messager.confirm("提示", "你确定要删除吗?", function(r) {
				if (r) {
					tableList.datagrid('deleteRow', index);
				}
			});
		}

		/*重置密码*/
		function resetPassword(index) {
			//            var rowData = tableList.datagrid('deleteRow', index);
			$.messager.confirm("重置密码", "是否确认重置密码?", function(r) {
			});
		}
	</script>
</div>
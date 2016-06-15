<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
	<div class="pop-inner-wrap">
		<div class="pop-container">
			<div class="wrapper-container">
				<div class="wrapper-header flex-container flex-space-between">
					<div>
						<strong>已包含项目</strong>
						<small>(已包含项目<span id="containSize"></span>)</small>
					</div>
					<div class="header-right">
						<div class="flex-container flex-space-between group-items">
							<strong>未包含项目</strong>
							<span>仪器过滤</span>
							<div class="drop-down">
								<%--<div class="drop-down-selected">--%>
									<%--<span class="selected-items"  id="instrument"></span>--%>
									<%--<i class="fa fa-angle-down "></i>--%>
								<%--</div>--%>
								<%--<div class="drop-down-menu">--%>
									<select  class="list-unstyled ul_instrument">
										<option vlaue="-1"></option>
										<c:forEach items="${ctrInstrumentsList}" var="instrument">
											<%--<li onclick="testItemGroupMain.instrumentClick('${instrument.idStr }','${instrument.name }');" value="${instrument.idStr }">${instrument.name }</li>--%>
											<option value="${instrument.idStr}" >${instrument.name}</option>
										</c:forEach>
									</select>
								<%--</div>--%>
							</div>
							<div class="form-control-icon icon-right">
								<input type="text" class="form-control" id="instrumentSearch" placeholder="搜索内容...">
								<button class="control-icon text-center" id="searchBtn2"><i class="icon icon-search"></i></button>
							</div>
						</div>
					</div>

				</div>
				<div class="wrapper-content">
					<div class="flex-container">
						<div class="flex-col-6">
							<table id="addCheckProjectLeft">
							</table>
						</div>
						<div class="text-center vertical-options flex-container flex-center layout-vertical">
							<button class="btn btn-circle" id="leftShiftBtn">
								<i class="fa fa-chevron-left"></i>
							</button>
							<button class="btn btn-circle no-margin-left" id="rightShiftBtn">
								<i class="fa fa-chevron-right"></i>
							</button>
						</div>
						<div class="flex-col-6">
							<table id="addCheckProjectRight">
							</table>
						</div>
					</div>

				</div>
				<div class="wrapper-footer text-center">
					<button id="addBtn" class="btn btn-submit sm-size J_ShowPop">确定</button>
					<button class="btn btn-cancel sm-size J_ClosePop" onclick="BM.arrayClean();">关闭</button>
				</div>
				<input type="hidden" id="instrumentId"/>
			</div>

		</div>
	</div>

	<script>
		$(function () {

			getSearchObj = function() {
				return	{
					testitemId: testItemGroupMain.parentId,
					instrumentId: $("#instrumentId").val(),
					searchGroupStr: $.trim( $("#instrumentSearch").val())
				};
			};
			/* 仪器过滤 */
			$(".ul_instrument").on("change", function () {
				var
						dataGrid = testItemGroupMain.rightDG,
						sortVal = $(this).val(),
						searchObj,params;
				$("#instrumentId").val(sortVal);

				searchObj = getSearchObj();
				params = {
					dataGrid: dataGrid,
					searchObj: searchObj
				};

				testItemGroupMain.searchGrid(params);
			});

			/*左右数据切换*/

			$("#leftShiftBtn").on('click',function(){
				var rightProjectData = $("#addCheckProjectRight").datagrid('getSelections'),
				stringId,rowIndex,rows, localArr = testItemGroupMain.rightArr;
				var leftProjectData = $("#addCheckProjectLeft").datagrid('getData');
				var leftLen = leftProjectData.rows.length;
				var sexId = 3;
				console.log(leftLen);
				if(leftProjectData && leftProjectData.total > 0) {
					for (var i = 0; i < leftLen; i++) {
						if (leftProjectData.rows[i].sexId != 3) {
							sexId = leftProjectData.rows[i].sexId;
							break;
						}
					}
				}
			if(rightProjectData.length > 0) {

				var msg='', sex='',rightSex= 3, addCheck = true;
				makeToArray(rightProjectData).forEach(function (element, index) {
					var newrow = {
						index:0,
						row: element
					};

					stringId = element.idString;
					if (element.stringId) {
						stringId = element.stringId;
					}

					if(sexId == 1){
						sex = "男";
					}else if(sexId == 2){
						sex = "女";
					}
					if(element.sexId == 3 || element.sexId == sexId || sexId == 3){
						rowIndex = $("#addCheckProjectRight").datagrid("getRowIndex", element);
						if(leftProjectData && leftProjectData.total > 0) {
							makeToArray(leftProjectData.rows).forEach(function (el,index) {
								if( element.stringId == el.stringId ) {
									BM.showMessage(element.name + "已存在");
									addCheck = false;
								}
							});
						}
						if (addCheck) {
							$("#addCheckProjectRight").datagrid('deleteRow', rowIndex);
							$("#addCheckProjectLeft").datagrid('insertRow', newrow);
							if(BM.addDelCheck(BM.addTestItemIds,stringId)) {
								BasicModule.addTestItemIds.push(stringId);
							}
							//本地数资料移除
							BM.removeLocalArr(localArr,stringId);

						}

//						$("#addCheckProjectRight").datagrid('deleteRow', rowIndex);
//						$("#addCheckProjectLeft").datagrid('insertRow', newrow);

					//	BasicModule.addTestItemIds.push(stringId);
					}else if(rightSex!=3 && rightSex!=element.sexId){
						msg += element.name+"、";
					}
					else{
						msg += element.name+"、";
					}
					rightSex = element.sexId;
					if(sexId==3)
						sexId = element.sexId;
				});
				rows = $("#addCheckProjectLeft").datagrid("getRows");
				$("#containSize").html(rows.length);
				if(msg!=''){
					BM.showMessage('只允许添加性别为'+sex+"和不限的项目,"+msg.substring(0,msg.length-1)+"添加失败！");
				}
			}else{
				//alert("ring2");
				BM.showMessage('请选择要添加的项目！');
				return;
			}
			});
			
			
			$("#rightShiftBtn").on('click',function () { BasicModule.rightShiftBtn(testItemGroupMain.rightArr); });
			$("#searchBtn2").on('click', function () {
				//$("#addCheckProjectRight").datagrid("reload", getSearchObj());
				var
						searchStr = $("#instrumentSearch").val(),
						queryItem = ["codeNo","name","enName","enShortName","fastCode","testMethodName"];

				BM.localQuery(testItemGroupMain.rightArr,searchStr,queryItem);
			});

			$("#addBtn").on('click', function () {
				//alert("add");
				if((BasicModule.addTestItemIds.length > 0) || (BasicModule.delTestItemIds.length > 0)){
					// 提交
					var parentId = testItemGroupMain.parentId, //父ID
						data = {
							removeItemID: BasicModule.delTestItemIds.join(","),
							addItemID: BasicModule.addTestItemIds.join(","),
							groupItemID: parentId
						};

					$.ajax({
						"url": testItemGroupMain.addUrl2,
						"type": "POST",
						data: data,
						"success": function (data) {
							resolutionData(data);
							testItemGroupMain.dataGrid2.datagrid('reload');
							$("#" + CB.POPDIV).hide();
							BasicModule.addTestItemIds = [];
							BasicModule.delTestItemIds = [];
						},
						"error": function () {
						}
					});

				} else {
					//$("#ctrDictInfoModal").hide();
					$("#" + CB.POPDIV).hide();
				}
			})
		});
	</script>


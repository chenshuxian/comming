 var testItemGroupMain={
		 	canStore : true,     // 控制重复提交
		 	currentTestItemId:null,
		 	status:null,//选中组合的状态：1：可用
		 	addItemID:"",//组合新增的单项ids
		 	removeItemID:"",//删去组合的单项ids
		 	 tableList:$('#tig_groupProject'),
	         groupProjectDescription:$('#tig_groupProjectDescription'),
	         addCheckProjectLeft:$('#tig_addCheckProjectLeft'),
	         addCheckProjectRight:$('#tig_addCheckProjectRight'),
	         addCheckProjectBtn:$('#tig_addCheckProjectBtn'),
	          initHeight :($(window).height() < 810) ? 240 : 300,
	          initPopHeight  :($(window).height() < 700) ? 400 : 400,
	        sampleTypeGrid:null,		  
	        sampleTypeGrid:null,
	         addCheckProjectData:null,
	       //默认标本类型Grid
	          sampleTypeParam : {					//下拉Grid参数,所有参数均为必填
	         	div_id:"tig_sampleType", 				//对应表单DIV的id
	         	grid_id:"tig_gridSampleType", 			//对应数据源Grid的Id
	         	name:"sampleTypeId",				//在表单中对应的提交name
	         	columnShow:1,						//将要在文本框中显示的列序号
	         	width : 180, 					    //Combo的宽度
	         	clearOff:false,						//是否禁用clear按钮
	         	searchColumn:[1],					//要搜索的列下标以及顺序，[2,1]就是优先搜索第3列，然后搜索第2列
	         	lockBy:[26,471],					//锁定Grid，传入数组[top,left]
	         	onEnter:function(){
	         	}
	         },
	         optLeft:{
	        	 url: ctx + '/pm/testItemGroup/containList', 
	             method: 'post',
	             height: ($(window).height() < 810) ? 240 : 300,
	             fitColumns: true,
	             striped: true,
//	                 checkOnSelect: false,
	             onLoadSuccess:function(){
	             	$("#tig_instrumentSearch").focus();
	             },
	             fit: false,
	             columns: [
	                 [{
	                     field: "ck",
	                     checkbox: true,
	                     width: 30
	                 }, {
	                     title: "达安标准码",
	                     field: 'codeNo',
	                     width: 50
	                 }, {
	                     title: "项目名称",
	                     field: 'name',
	                     flex: 1,
	                     width: 50
	                 }, {
	                     title: "英文简称",
	                     field: 'enName',
	                     width: 50
	                 }, {
	                     title: "检验方法",
	                     field: 'testMethodName',
	                     width: 50
	                 }, {
	                     title: "项目性别",
	                     field: 'sexId',
	                     width: 50,
	                     hidden:true,
	                     formatter : function(value) {
	     					var returnStr = '不限';
	     						if (value == '1') {
	     							returnStr = '男';
	     						}
	     						if (value == '2') {
	     							returnStr = '女';
	     						}
	     							return returnStr;
	     						}
	                 }]
	             ],
	             autoRowHeight: false,
	         },         
	         optRight:{
	        	 url: ctx + '/pm/testItemGroup/notContainList', 
	             method: 'post',
	             height: ($(window).height() < 810) ? 240 : 300,
	             fitColumns: true,
	             striped: true,
//	                 checkOnSelect: false,
	             fit: false,
	             columns: [
	                 [{
	                     field: "ck",
	                     checkbox: true,
	                     width: 30
	                 }, {
	                     title: "达安标准码",
	                     field: 'codeNo',
	                     width: 50
	                 }, {
	                     title: "项目名称",
	                     field: 'name',
	                     flex: 1,
	                     width: 50
	                 }, {
	                     title: "英文简称",
	                     field: 'enName',
	                     width: 50
	                 }, {
	                     title: "检验方法",
	                     field: 'testMethodName',
	                     width: 50
	                 }, {
	                     title: "项目性别",
	                     field: 'sexId',
	                     width: 50,
	                     hidden:true,
	                     formatter : function(value) {
	     					var returnStr = '不限';
	     						if (value == '1') {
	     							returnStr = '男';
	     						}
	     						if (value == '2') {
	     							returnStr = '女';
	     						}
	     							return returnStr;
	     						}
	                 }]
	             ],
	             autoRowHeight: false,
	         },
	         initUI:function(){
	        	 testItemGroupMain.sampleTypeGrid = new TextCombo(testItemGroupMain.sampleTypeParam);
	        	 testItemGroupMain.tableList.datagrid({
		            url: ctx + '/pm/testItemGroup/testItemGroupList', 
		            method: 'post',
		            height: testItemGroupMain.initHeight,
		            fitColumns: true,
		            striped: true,
		            checkOnSelect: true,
		            onClickCell:testItemGroupMain.onClickCell,
		            fit: false,
		            columns: [
		                [{
		                    field: "ck",
		                    checkbox: true,
		                    width: 30
		                }, {
		                    title: "编码",
		                    field: 'codeNo',
		                    width: 80
		                }, {
		                    title: "中文名称",
		                    field: 'name',
		                    width: 80
		                }, {
		                    title: "英文名称",
		                    field: 'enShortName',
		                    width: 80
		                }, {
		                    title: "英文简称",
		                    field: 'enName',
		                    width: 80
		                }, {
		                    title: "默认标本类型",
		                    field: 'sampleTypeName',
		                    width: 80
		                }, {
		                    title: "助记符",
		                    field: 'fastCode',
		                    width: 80
		                },
		                    {
		                        title: '顺序号',
		                        field: 'displayOrder',
		                        align: 'center'
		                    }, {
		                    title: "状态",
		                    field: 'status',
		                    formatter: function (value, row,index) {
		                        var returnStr = '<div class="status-switch help-tips"><input type="checkbox" name="status" onchange="testItemGroupMain.modifyStatus(\'' + index + '\',\'' + row.idStr + '\',\'' + value + '\');" /><i></i><span class="help-tips-content">停用</span></div>';
		                        if (value == '1') {
		                            returnStr = '<div class="status-switch help-tips"><input type="checkbox" name="status" checked="checked" onchange="testItemGroupMain.modifyStatus(\'' + index + '\',\'' + row.idStr + '\',\'' + value + '\');" /><i></i><span class="help-tips-content">开启</span></div>';
		                        }
		                        return returnStr;
		                    }
		                }, {
		                    title: "操作",
		                    field: 'opt',
		                    width: 50,
		                    align: 'center',
		                    formatter: function (value, row, index) {
		                        var str = "";
		                        str += '<span class="help-tips"><a class="icon icon-edit" onclick="testItemGroupMain.editRow(' + index + ',1)"></a><i class="help-tips-content">编辑</i></span>';
		                        str += '<span class="help-tips danger-tips"><a class="icon icon-trash" onclick="testItemGroupMain.deleteRow(' + index + ',this)"></a><i class="help-tips-content">删除</i></span>';
		                        return str;
		                    }
		                }]
		            ],
		            autoRowHeight: false,
		        }).pagination({
		            beforePageText: '第',//页数文本框前显示的汉字
		            afterPageText: '页    共 {pages} 页',
		            displayMsg: '共{total}条数据',
		            total: 26,
		            pageSize: 10,
		            pageNumber: 1
		        });
	        	 testItemGroupMain.groupProjectDescription.datagrid({
		            url: null,
		            method: 'post',
		            height: testItemGroupMain.initHeight,
		            fitColumns: true,
		            striped: true,
		            checkOnSelect: false,
		            fit: false,
		            columns: [
		                [{
		                    field: "ck",
		                    checkbox: true,
		                    width: 30
		                }, {
		                    title: "达安标准码",
		                    field: 'codeNo',
		                    width: 80
		                }, {
		                    title: "项目名称",
		                    field: 'name',
		                    width: 80
		                }, {
		                    title: "英文简称",
		                    field: 'enName',
		                    width: 80
		                },
		                    {
		                        title: "检验方法",
		                        field: 'testMethodName',
		                        width: 80
		                    }
		                    /*{
		                        title: "医学专业组",
		                        field: 'cgroup',
		                        width: 80
		                    },
		                    {
		                        title: "默认标本类型",
		                        field: 'defaultinttype',
		                        width: 80
		                    }*/, {
		                    title: "操作",
		                    field: 'opt',
		                    width: 50,
		                    align: 'center',
		                    formatter: function (value, row, index) {
		                        var str = "";
		                        str += '<span class="help-tips danger-tips"><a class="icon icon-trash" onclick="testItemGroupMain.deleteSingleItem(' + index + ',this)"></a><i class="help-tips-content">删除</i></span>';
		                        return str;
		                    }
		                }]
		            ],
		            autoRowHeight: false,
		        }).pagination({
		            beforePageText: '第',//页数文本框前显示的汉字
		            afterPageText: '页    共 {pages} 页',
		            displayMsg: '共{total}条数据',
		            total: 26,
		            pageSize: 10,
		            pageNumber: 1
		        });

		        $(document).on('click', '.J_addCheckProject', testItemGroupMain.loadLeftAndRight);
		        /*左右数据切换*/
	//	        addCheckProjectBtn = $('#addCheckProjectBtn');
		        testItemGroupMain.removeInstrumentProjectBtn = $('#tig_removeInstrumentProjectBtn');
		        
		        testItemGroupMain.removeInstrumentProjectBtn.on('click', function () {
		        testItemGroupMain.addCheckProjectData = testItemGroupMain.addCheckProjectLeft.datagrid('getSelections');
		        makeToArray(testItemGroupMain.addCheckProjectData).forEach(function (element, index) {
		        var rowIndex = testItemGroupMain.addCheckProjectLeft.datagrid("getRowIndex", element);
		        testItemGroupMain.addCheckProjectLeft.datagrid('deleteRow', rowIndex);
		        testItemGroupMain.addCheckProjectRight.datagrid('appendRow', element);
		        var id = element.idStr;
                testItemGroupMain.addItemID = testItemGroupMain.addItemID.replace(id+",", ''); //新增的id中去掉该id
                testItemGroupMain.removeItemID += id + ","; //删除的id中加上该id
		            });
		        $("#tig_containItemCount").text(testItemGroupMain.addCheckProjectLeft.datagrid("getData").total);
		        });
		        
		        testItemGroupMain.addCheckProjectBtn.on('click', function () {
		            var removeInstrumentProjectData = testItemGroupMain.addCheckProjectRight.datagrid('getSelections');
		            makeToArray(removeInstrumentProjectData).forEach(function (element, index) {
		                var rowIndex = testItemGroupMain.addCheckProjectRight.datagrid("getRowIndex", element);
		                testItemGroupMain.addCheckProjectRight.datagrid('deleteRow', rowIndex);
		                testItemGroupMain.addCheckProjectLeft.datagrid('appendRow', element);	                
		                var id = element.idStr;
				        testItemGroupMain.removeItemID = testItemGroupMain.removeItemID.replace(id+",", ''); //删除的id中去掉该id
				        testItemGroupMain.addItemID += id + ","; //新增的id中加上该id
		            });
		            $("#tig_containItemCount").text(testItemGroupMain.addCheckProjectLeft.datagrid("getData").total);
		        });
		        $(window).on('resize', function () {
		            tableAutoWidth();
		        });
		        /*自适应表格*/
		        function tableAutoWidth() {
		            var width = testItemGroupMain.tableList.parents('.tabs-panels').width() - 40;
//		                var height = tableList.parents('.main-content-body').height() - 10;
		            testItemGroupMain.tableList.datagrid('resize', {
		                width: width
		            });
		            testItemGroupMain.groupProjectDescription.datagrid('resize', {
		                width: width
		            });
		        }
		      //单击事件
		    	$('#tig_ul_status li').click(function(){
		    	    $("#tig_searchStatus").html($(this).html());
		    	    $("#tig_searchStatus").attr("value",$(this).attr("value"));
		    	    testItemGroupMain.queryGroupProject();
		    	});
		    	$('#tig_ul_order li').click(function(){
		    	    $("#tig_orderType").html($(this).html());
		    	    $("#tig_orderType").attr("value",$(this).attr("value"));
		    	    testItemGroupMain.queryGroupProject();
		    	});
		    	
		    	//组合项目列表加载完成后选中第一行
		    	testItemGroupMain.tableList.datagrid({onLoadSuccess : function(data){
		    		if (testItemGroupMain.tableList.datagrid("getData").total > 0) { //如果有数据，选中第一行
		    			testItemGroupMain.onClickCell(0, null);
		    		}
		    	}});
		    	//加载结束统计记录数
		    	testItemGroupMain.addCheckProjectLeft.datagrid({onLoadSuccess : function(data){
		    		 $("#tig_containItemCount").text(testItemGroupMain.addCheckProjectLeft.datagrid("getData").total);
		    	}});
		    	$("#tig_searchStr").focus();
		 },
	       
 /*编辑*/
		 editRow:function editRow(index, optType) {
			 var type="edit";
			 var rowData=null;
			 var testItemId=null;
			 if(optType==0){
				 type="add";
				 $('#tig_editForm')[0].reset(); // 清空表单内容
				 $("[type=hidden]").val("" );
				 $("#tig_codeNoText").html("");
			 }else{
				  rowData = testItemGroupMain.tableList.datagrid('getData').rows[index];
				  testItemId = rowData.idStr;
				  if(rowData.status==1){
					  showMessage('当前选中记录状态为可用，不允许修改！');
						return;
				  }
				  
			 }
			 
					// 新增，获取最大顺序号
	        		$.ajax({
	        			"url" : ctx + "/pm/testItemGroup/shwoAddOrEdit",
	        			"type" : "POST",
	        			data:{testItemid:testItemId,type:type},
	        			"success" : function(data) {
	        				//alert(data);
	        				var jsonObj = eval('(' + data + ')');     
	        				// 弹出查询界面
	        				dialog("tig_groupProjectAdd", {               
	        					width : 580
	        				},function(){
	        					$("#tig_oldName").val(jsonObj["name"]);
	        					$("#tig_id").val(testItemId);	        					
		        				for(var key in jsonObj){
		        					if("isIndividualStat"==key){
		        						var isIndividualStat=jsonObj[key];
		        						$("#tig_isIndividualStat").val(isIndividualStat);
		    	        				if(isIndividualStat==1){
		    	        					$("#tig_isIndividualStat").prop("checked",true);
		    	        				}else{
		    	        					$("#tig_isIndividualStat").prop("checked",false);
		    	        				}
		        					} else if("codeNo"==key){
		        						$("#tig_codeNoText").html(jsonObj[key]);
		        						$("#tig_"+key).val(jsonObj[key]);
		        					} else{
		        						if("id"!=key){
		        							$("#tig_"+key).val(jsonObj[key]);
		        						}
		        						
		        					}
		        				}
		        				$("#tig_itemTypeId").val(2);
		        				setTimeout(function(){
		        					testItemGroupMain.sampleTypeGrid.setValue(jsonObj.sampleTypeIdString,jsonObj.sampleTypeName);   		        					
		        				},500);
								$("#tig_name").focus();
	        				});
	        			},
	        			"error" : function(data) {
	        				//resolutionData(data);
	        			}
	        		});
			 

 }  ,
 saveGroupProject:function(){
	// 防止重复提交
     if(!testItemGroupMain.canStore){
  		return;
     }
    
   //必填验证
     if(!testItemGroupMain.validateSave()){
     	return false;
     }    
    var type = $("#tig_type").val();//添加修改类型 add 添加  edit 修改
 	var params = $("#tig_editForm").serialize(); //组合项目表单
 	if($("#tig_isIndividualStat").prop("checked")){
 		params+="&isIndividualStat=1";
 	}else{
 		params+="&isIndividualStat=0";
 	}
 	var name = $.trim($("#tig_name").val()); //验证组合名称是否重复使用
 //	var id = $.trim($("#tig_id").val()); //当前行数据的项目ID，动态更新表单数据使用
 	var isIndividualStat = $("input[type=checkbox]:checked").val();
 	if(isIndividualStat == undefined){
 		isIndividualStat = 1;
 		params += "&isIndividualStat=" + isIndividualStat;
 	}
 	params += "&sampleTypeName=" + testItemGroupMain.sampleTypeGrid.getText();
 	//判断是添加项目还是修改项目
 	if(type == "add"){
 		//判断项目名称是否重复
 		$.ajax({
 			"url" : ctx+"/pm/testItem/findCount",
 			"type" : "POST",
 			"data" : {testName:name},
 			"success" : function(data) {
 				count = data.substring(5);
 				if(count > 0){
 					//提示项目名称重复是否继续
 					showConfirm("组合名称重复，是否继续？",function(){
 						testItemGroupMain.add(params);
 					});
 					testItemGroupMain.canStore = true;
 				//项目名称没有重复，不提示直接保存
 				}else{
 					testItemGroupMain.add(params);
 					testItemGroupMain.canStore = true;
 				}
 				
 			}
 		});
 	}else{
 		//旧的组合名称
 		var oldName = $("#tig_oldName").val();
 		//新的组合名称
 		var name = $("#tig_name").val();
 		if(oldName != name){
 			//判断项目名称是否重复
 			$.ajax({
 				"url" : ctx+"/pm/testItem/findCount",
 				"type" : "POST",
 				"data" : {testName:name},
 				"success" : function(data) {
 					count = data.substring(5);
 					if(count > 0){
 						//提示项目名称重复是否继续
 						showConfirm("组合项目名称重复，是否继续？",function(){
 							testItemGroupMain.update(params);
 						});
 						canStore = true;
 					//项目名称没有重复，不提示直接保存
 					}else{
 						testItemGroupMain.update(params);
 						testItemGroupMain.canStore = true;
 					}
 				}
 			});
 		}else{
 			//修改数据
 			testItemGroupMain.update(params);
 			testItemGroupMain.canStore = true;
 		}
 	}
 },
//添加数据数据
 add:function add(params){
 	$.ajax({
 		"url" : ctx+"/pm/testItemGroup/saveOrEditTestItemGroup",
 		"type" : "POST",
 		"data" : params,
 		"success" : function(data) {
 			//var ret = resolutionData(data);
 			/*closeEdit();//关闭页面
 			$("#searchStr").val("");
 			$("#orderType").val("2").attr("selected",true);
 			$("#searchDisciplineId").val("0").attr("selected",true);
 			search();//刷新list
*/ 			testItemGroupMain.tableList.datagrid('reload');
	         $('#tig_groupProjectAdd').hide();
 		}
 	});
 },
//修改数据
 update:function update(params){
 	$.ajax({
 		"url" : ctx+"/pm/testItemGroup/saveOrEditTestItemGroup",
 		"type" : "POST",
 		"data" : params,
 		"success" : function(data) {
 			testItemGroupMain.canStore = true;
 			//var ret = resolutionData(data);
 			/*closeEdit();//关闭页面
 			//刷新该行记录
 			var jsonObj = eval('(' + ret + ')');
 			//赋值
 			var testItemid = "'" + jsonObj.idString + "'";
 			$("#tr_"+jsonObj.idString).children('td').eq(1).html('<a href="javascript:Query(' + testItemid + ');">'+jsonObj.codeNo+'</a>');
 			$("#tr_"+jsonObj.idString).children('td').eq(2).html(replaceHtml(jsonObj.name));
 			$("#tr_"+jsonObj.idString).children('td').eq(3).html(replaceHtml(jsonObj.enShortName));
 			$("#tr_"+jsonObj.idString).children('td').eq(4).html(replaceHtml(jsonObj.enName));
 			$("#tr_"+jsonObj.idString).children('td').eq(5).html(replaceHtml(jsonObj.sampleTypeName));
 			$("#tr_"+jsonObj.idString).children('td').eq(6).html(replaceHtml(jsonObj.fastCode));
 			$("#tr_"+jsonObj.idString).children('td').eq(7).html(replaceHtml(jsonObj.displayOrder));*/
 			testItemGroupMain.tableList.datagrid('reload');
	         $('#tig_groupProjectAdd').hide();
 			
 		},
 		"error" : function() {
 			testItemGroupMain.canStore = true;
 		}
 	});
 },
 /*删除行*/
 deleteRow:function deleteRow(index) {
	 var rowData = testItemGroupMain.tableList.datagrid('getData').rows[index];
		var id = rowData.idStr;
		var status = rowData.status;
		if (status == 1){
			showMessage('当前选中记录状态为可用，不允许删除！');
			return;
		}
		showConfirm('是否删除所选中的记录？',function(){
			$.ajax({
				"url" : ctx+"/pm/testItem/deleteTestItem",
				"type" : "POST",
				data : {testItemid:id},
				"success" : function(data) {
					resolutionData(data);
				    // 从页面中删除
					testItemGroupMain.tableList.datagrid('reload');
				},
				"error" : function(data) {
					//resolutionData(data);
				}
			});
		});
 },
 checkedDelRow : function(){
		var checkedItems = testItemGroupMain.tableList.datagrid('getChecked');
		var ids = [];
		var names = [];
		
		$.each(checkedItems, function(index, item){
			if(item.status == 1){
				names.push(item.name);
			}else{
				ids.push(item.idStr);
			}
		});
		if (names != "" || names.length > 0) {
			showMessage("项目名称:" + names.join(",") + '启用状态，不允许删除!');
			return false;
		}
		if(ids == ''){
			showMessage("请选择要删除的数据！");
			return false;
		}
		showConfirm('是否删除所选中的记录？',function(){
			$.ajax({
				"url" : ctx+"/pm/testItem/deleteTestItem",
				"type" : "POST",
				data: {testItemid:ids.join(",")},
				"success" : function(data) {
					resolutionData(data);
					// 刷新datagrid
					testItemGroupMain.tableList.datagrid('reload');
				},
				"error" : function(data) {
					//resolutionData(data);
				}
			});
		});
	},
 queryGroupProject:function(){
	 var searchStr = $("#tig_searchStr").val().trim();  //搜索输入框的值
		$("#tig_searchStr").val(searchStr);
		var status = $("#tig_searchStatus").attr("value"); //状态
		var orderType = $("#tig_orderType").attr("value");//排序	
		if(status!='0'&&status!='1'){
			status=2;
		}
		if(orderType==''||orderType==null||orderType=='null'){
			orderType=0;
		}	
		var param = {searchStr:searchStr,status:status,orderType:orderType};
		testItemGroupMain.tableList.datagrid("load", param);
 },
//保存数据验证
 validateSave:function validateSave(){
 	var name = $.trim($("#tig_name").val()); //组合名称
 	//var sampleTypeId = $.trim($("#sampleTypeId option:selected").val());//默认样本类型
 	var sampleTypeId = testItemGroupMain.sampleTypeGrid.getValue();
 	var displayOrder = $.trim($("#tig_displayOrder").val()); //顺序好
 	if(name == ""){
 		showMessage("组合名称为空，请重新输入！",function(){
 			$("#tig_name").focus();
 		});
 		return false;
 	}
 	if(sampleTypeId == ""){
 		showMessage("默认标本类型为空，请重新输入！",function(){
 		});
 		return false;
 	}
 	var displayOrderId = "tig_displayOrder";
 	if(validateDisplayOrder(displayOrderId)){
 		return false; 
 	}
 	if(displayOrder.length > 6){
 		showMessage("顺序号最大长度为6位，请重新输入！",function(){
 			$("#tig_displayOrder").focus();
 		});
 		return false;
 	}
 	var regExp = /^[A-Z]+$/;
 	var enShortName = $("#tig_enShortName").val();//英文简称
 	if(enShortName != ""){
 		if(!regExp.test(enShortName)){
 			showMessage("英文简称只能是大写字母，请重新输入！",function(){
 				$("#tig_enShortName").focus();
 			});
 			return false;
 		}
 	}
 	regExp = /^[a-z|A-Z|0-9]+$/;
 	var enName = $("#tig_enName").val();//英文名称
 	if(enName != ""){
 		if(!regExp.test(enName)){
 			showMessage("英文名称只能是字母和数字，请重新输入！",function(){
 				$("#tig_enName").focus();
 			});
 			return false;
 		}
 	}
 	regExp = /^[A-Z|0-9]+$/;
 	var fastCode = $("#tig_fastCode").val();//英文简称
 	if(fastCode != ""){
 		if(!regExp.test(fastCode)){
 			showMessage("助记符只能是大写字母和数字，请重新输入！",function(){
 				$("#tig_fastCode").focus();
 			});
 			return false;
 		}
 	}
 	return true;
 },
//启用、停用状态
	modifyStatus :function(index, id, val) {
	    if (id == '' || val == '') {
	        showMessage('请选择操作记录!');
	        return;
	    }
	    var confirmMeg = "";
	    var operatioType = "";
	    var newVal="";
	    if (val == '1') {
	        confirmMeg = "是否停用当前记录？";
	        operatioType = "Disable";
	        newVal = '0';
	    }
	    if (val == '0') {
	        confirmMeg = "是否启用当前记录？";
	        operatioType = "Enable";
	        newVal = '1';
	    }
	    $.messager.confirm("提示", confirmMeg, function (r) {
	        if (r) {
	            $.ajax({
	            	"url" : ctx+"/pm/testItem/modifyTestItemStatus",
	                type: "POST",
	                data: {testItemid:id,type:newVal},
	                success: function (data) {
	                   resolutionData(data);
	                   testItemGroupMain.status=newVal;
	                   testItemGroupMain.tableList.datagrid('updateRow', {
	                        index: index,
	                        row: {
	                            status: newVal
	                        }
	                    });
	                },
	                error: function () {
	                	testItemGroupMain.tableList.datagrid('refreshRow', index);
	                }
	            });
	        } else {
	        	testItemGroupMain.tableList.datagrid('refreshRow', index);
	        }
	    });
	},
	onClickCell:function(index, field) {
				var rowData = testItemGroupMain.tableList.datagrid('getData').rows[index];
				var testItemId = rowData.idStr;
				testItemGroupMain.status=rowData.status;
				testItemGroupMain.currentTestItemId=testItemId;
				//触发查询
				var opts = testItemGroupMain.groupProjectDescription.datagrid("options");
				opts.url=ctx + "/pm/testItemGroup/singleItemList";
				var queryParams = opts.queryParams;
				if (queryParams == undefined) {
					queryParams = [];
				}
				queryParams.testItemId = testItemId;
				testItemGroupMain.groupProjectDescription.datagrid(opts);	
	},
	loadLeftAndRight:function (e) {
		if(testItemGroupMain.currentTestItemId==null||testItemGroupMain.currentTestItemId==""){
			showMessage('请先选定组合!');
	        return;
		}
//		alert(testItemGroupMain.currentTestItemId);
		var leftParams = testItemGroupMain.optLeft.queryParams;
		
		if (leftParams == undefined) {
			leftParams = [];
		}
		leftParams.testItemId=testItemGroupMain.currentTestItemId;	
		testItemGroupMain.optLeft.queryParams=leftParams;
    	testItemGroupMain.addCheckProjectLeft.datagrid(testItemGroupMain.optLeft);
    	
		/*var rightParams = testItemGroupMain.optRight.queryParams;
		if (rightParams == undefined) {
			rightParams = [];
		}
		rightParams.testitemId=testItemGroupMain.currentTestItemId;
		rightParams.instrumentId=$("#tig_instrument").attr("value");
		rightParams.searchGroupStr=$("#tig_instrumentSearch").val();
    	testItemGroupMain.addCheckProjectRight.datagrid(testItemGroupMain.optRight);*/
    	testItemGroupMain.queryNotContain();
		
		/*var opts = testItemGroupMain.groupProjectDescription.datagrid("options");
		//组合项目列表
	$("#notContainListDiv").load(ctx + "/pm/testItemGroup/notContainList",{testitemId:testItemId,instrumentId:instrumentId,searchGroupStr:searchGroupStr}
		showPop(e); //弹出窗口		
		var queryParams = iir_addInstrumentItemLeftOpt.queryParams;
		if (queryParams == undefined) {
			queryParams = [];
		}
		queryParams.instrumentId = instrumentId;
		iir_addInstrumentItemLeftOpt.queryParams = queryParams;
		
		var queryParams2 = iir_addInstrumentItemRightOpt.queryParams;
		if (queryParams2 == undefined) {
			queryParams2 = [];
		}
		queryParams2.instrumentId = instrumentId;
		iir_addInstrumentItemRightOpt.queryParams = queryParams2;
	    iir_addInstrumentItemLeft.datagrid(iir_addInstrumentItemLeftOpt);	    
	    iir_addInstrumentItemRight.datagrid(iir_addInstrumentItemRightOpt);
	    
	    //设置已包含的个数
	    $("#iir_containItemCount").text(iir_addInstrumentItemLeft.datagrid("getData").total);*/
	},
	queryNotContain:function(){
		var rightParams = testItemGroupMain.optRight.queryParams;
		if (rightParams == undefined) {
			rightParams = [];
		}
		rightParams.testitemId=testItemGroupMain.currentTestItemId;
		rightParams.instrumentId=$("#tig_instrument").attr("value");
		rightParams.searchGroupStr=$("#tig_instrumentSearch").val();
		testItemGroupMain.optRight.queryParams=rightParams;
    	testItemGroupMain.addCheckProjectRight.datagrid(testItemGroupMain.optRight);
	},
	saveSingleItems:function(){		
		var groupItemID = testItemGroupMain.currentTestItemId;
		var removeItemID=testItemGroupMain.removeItemID;
		var addItemID=testItemGroupMain.addItemID;
		$.ajax({
			"url" : ctx+"/pm/testItemGroup/addOrRemoveItem",
			"type" : "POST",
			data : {removeItemID:removeItemID,addItemID:addItemID,groupItemID:groupItemID},
			"success" : function(data) {
				//清空数据
				resolutionData(data);
				testItemGroupMain.removeItemID = "";
				testItemGroupMain.addItemID = "";
				 $('#tig_addCheckProject').hide();
				testItemGroupMain.queryGroupProject();//刷新list
			},
			"error" : function() {
				//清空数据
				resolutionData(data);
				testItemGroupMain.removeItemID = "";
				testItemGroupMain.addItemID = "";
			}
		});
	
	},
	instrumentClick:function(id,name){
    	    $("#tig_instrument").html(name);
    	    $("#tig_instrument").attr("value",id);
    	    testItemGroupMain.queryNotContain();
	},
	deleteSingleItem:function deleteRow(index) {
		 var rowData = testItemGroupMain.groupProjectDescription.datagrid('getData').rows[index];
			var id = rowData.idStr;
			if (testItemGroupMain.status==1) {
				showMessage("该单项所属的组合是启用状态，不允许删除!");
				return false;
			}
			showConfirm('是否删除所选中的记录？',function(){
				$.ajax({
					"url" : ctx+"/pm/testItemGroup/delSingleItem",
					"type" : "POST",
					data : {testItemid:id,groupItemid:testItemGroupMain.currentTestItemId},
					"success" : function(data) {
						resolutionData(data);
					    // 从页面中删除
						testItemGroupMain.groupProjectDescription.datagrid('reload');
					},
					"error" : function(data) {
						//resolutionData(data);
					}
				});
			});
	 },
	 checkedDelSingleItemRow : function(){
			var checkedItems = testItemGroupMain.groupProjectDescription.datagrid('getChecked');
		 	//console.log(checkedItems);
		 
		 	var ids = [];
			var names = [];
			
			$.each(checkedItems, function(index, item){
//					names.push(item.name);
					ids.push(item.idStr);
				
			});
			if (testItemGroupMain.status==1) {
				showMessage("该单项所属的组合是启用状态，不允许删除!");
				return false;
			}
			if(ids == ''){
				showMessage("请选择要删除的数据！");
				return false;
			}
			showConfirm('是否删除所选中的记录？',function(){
				$.ajax({
					"url" : ctx+"/pm/testItemGroup/delSingleItemBatch",
					"type" : "POST",
					data : {testItemid:ids.join(","),groupItemid:testItemGroupMain.currentTestItemId},
					"success" : function(data) {
						resolutionData(data);
						// 刷新datagrid
						testItemGroupMain.groupProjectDescription.datagrid('reload');
					},
					"error" : function(data) {
						//resolutionData(data);
					}
				});
			});
		}
}


 
 
 $(function() {
	 testItemGroupMain.initUI();
	 validate.illSymbol();		
});

 
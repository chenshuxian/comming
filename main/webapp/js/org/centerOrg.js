
/***
 *@ClassName: centerOrg.js
 * @Description: TODO(中心机构单位-JS)
 * @date 2015年01月15日 
 ***/

var CenterOrg = (function($){

	/* START render basicModule */
	CenterOrg =  Object.create(BasicModule);
	/* END render basicModule */

	var
		_delBatUrl = ctx + "/org/centerOrg/centerOrgDeleteBatch",
		_existUrl = ctx + "/org/centerOrg/centerOrgIfExisted",
		_exist2Url = ctx + "/org/centerOrg/checkNacaoIdExisted",
		_updateUrl = ctx + "/org/centerOrg/centerOrgEdit",
		_addUrl = ctx + "/org/centerOrg/centerOrgAdd",
		_delUrl = ctx + "/org/centerOrg/centerOrgDelete",
		_changeStatusUrl = ctx + "/org/centerOrg/centerOrgDisableOrEnable",
		_InfoUrl = ctx + "/org/centerOrg/centerOrgInfo",
		_pageListUrl = ctx + "/org/centerOrg/centerOrgPageList";

	var _initTree= function(){

		var obj = EasyTree.getInit();
		var click = {
			height:30,
			onClick:function(node){
				$("#regionId").val(node.id);
				$("#regionName").val(node.text);
				$("#showRegionDiv").hide();
				return;
			}
			//required: true
		};
		$.extend(obj,click);	//自定义click方法
		$("#regionName").combotree(obj);

	};

	var _checkNacaoId= function(orgTypeId) {
		//console.log(obj);
		var
			nacaoId = $("#nacaoId").val().trim(),
			type = BM.currentEvent,
			id = $("#id").val();

		$.ajax({
			url : CenterOrg.exist2Url,
			type : CB.METHOD,
			data : {orgTypeId : orgTypeId, nacaoId : nacaoId, id : id },
			success : function(data) {

				var next = BM.resolutionData(data);
				if (next) {

					if (data.indexOf("confirm|") == 0) {
						// 有相同的卫生机构代码
						showConfirm(data.substring(8), function() {
							if(type == 'add'){
								CenterOrg.add();
							}else{
								CenterOrg.update();
							}
						});
					} else {
						// 无，确认继续
						if(type == 'add'){
							CenterOrg.add();
						}else{
							CenterOrg.update();
						}
					}
				}

			},
			error : function() {
			}
		});
	};

	$.extend(CenterOrg,{

		//设定pop弹出框的大小
		preId: null,
		popArea: 720,
		focusId: "name",
		tableList:null,
		dataGrid:null,
		delBatUrl: _delBatUrl,
		existUrl: _existUrl,
		exist2Url: _exist2Url,
		updateUrl: _updateUrl,
		addUrl: _addUrl,
		delUrl: _delUrl,
		changeStatusUrl: _changeStatusUrl,
		InfoUrl: _InfoUrl,
		pageListUrl: _pageListUrl,

		validateSave: function() {
			var region = $("input[name='regionName']").val();
			console.log("region" + region);
			//若为空
			if(!region){
				BM.showMessage("所属地区不能为空，请重新输入!");
				return false;
			}
			return true;
		},

		//新增成功callback
		addSuccess: function(data) {
		 //console.log("successcallback");
			 //$("#editBtn").attr("disable", false);
			var orgTypeId = $("#orgTypeId").val();
			if (data.indexOf("confirm|") == 0) {
			 // 有同名
				 showConfirm(data.substring(8), function () {
					 if (orgTypeId == '40') {
						 // 检测卫生机构代码
						 _checkNacaoId(orgTypeId);

					 } else {
						 CenterOrg.add();
					 }
				 });
			} else {
			 // 无同名，确认继续
				 if (orgTypeId == '40') {
					 // 检测卫生机构代码
					 _checkNacaoId(orgTypeId);

				 } else {
					 CenterOrg.add();
				 }
			}

		},
		//修改成功callback
		 editSuccess: function(data) {
		 //console.log("editcallback");
			 var orgTypeId = $("#orgTypeId").val();
			 //console.log(orgTypeId);
			 if (data.indexOf("confirm|") == 0) {
			 // 有同名
			 	showConfirm(data.substring(8), function () {
			 // 确认继续
					if (orgTypeId == '40') {
						// 检测卫生机构代码
						_checkNacaoId(orgTypeId);
					} else {

						CenterOrg.update();
					}
				});
			 } else {
			 // 无同名，确认继续
				 if (orgTypeId == '40') {
				 // 检测卫生机构代码
					 _checkNacaoId(orgTypeId);

				 } else {

					 CenterOrg.update();
				 }
			 }

		 },


		editCallBack: function() {

			var rowData = BasicModule.rowData;
			$("#InfoForm").form("load", {
			/* input's name attr : data */
				//regionName: rowData.regionName,
				regionId: rowData.regionSId,
				name: rowData.name,
				shortName: rowData.shortName,
				nacaoId: rowData.nacaoId,
				enShortName: rowData.enShortName,
				enName: rowData.enName,
				address: rowData.address,
				enAddress: rowData.enAddress,
				contacts: rowData.contacts,
				telephone: rowData.telephone,
				fax: rowData.fax,
				fastCode: rowData.fastCode,
				displayOrder: rowData.displayOrder,
				memo: rowData.memo,
				webUrl: rowData.webUrl,
				//orgTypeId: params.orgTypeId,
				id:rowData.stringId,
				codeNo:rowData.codeNo,
				opType: 'edit'
			});
			$("#spanEditCodeNo").html("编码: " + rowData.codeNo);
			//console.log(rowData.regionName);
			CenterOrg.addCallBack();
			$("#regionName").combotree('setValue',rowData.regionName);
			newcommonjs.oldName = rowData.name;


		},

		showCallBack: function() {

			var rowData = BasicModule.rowData;
			$("#InfoForm").form("load", {
				regionName: rowData.regionName,
				name: rowData.name,
				shortName: rowData.shortName,
				nacaoId: rowData.nacaoId,
				enShortName: rowData.enShortName,
				enName: rowData.enName,
				address: rowData.address,
				enAddress: rowData.enAddress,
				contacts: rowData.contacts,
				telephone: rowData.telephone,
				fax: rowData.fax,
				fastCode: rowData.fastCode,
				displayOrder: rowData.displayOrder,
				webUrl: rowData.webUrl,
				memo: rowData.memo
			});
			$("form input").attr("readonly","readonly");
			$("form textarea").attr("readonly","readonly");
			$("#editBtn").hide();
			$("#spanEditCodeNo").html("编码: " + rowData.codeNo);


		},

		/*callback function area end*/

		searchObj: function(preId) {

			return {
				searchStr: $.trim($("#" + preId + "SearchStr").val()),
				status: $("#" + preId + "Status").val(),
				sort: $("#" + preId + "Sort").val(),
				orgTypeId: $("#" + preId + "orgTypeId").val()
			};

		},

		addCallBack: function(){
			_initTree();
		},

		initTree: _initTree


	});


	return CenterOrg;


}(jQuery));



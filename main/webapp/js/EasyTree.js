/*
 * 2016/1/12
 * easyui tree Module
 * 作者: chenshuxian
 */
var EasyTree;

EasyTree = (function($){
	
	var _prefix = "reg";
	var _treeObj = $("#tt");
	var _loadUrlById = ctx + "/ctrRegions/loadCtrRegionsById"; 
	var _nameRepeatUrl =  ctx + "/ctrRegions/nameRepeat";
	var _saveRegUrl = ctx + "/ctrRegions/saveCtrRegions";
	var _delRegUrl = ctx + "/ctrRegions/delCtrRegions";
	var _initTreeUrl = ctx + "/ctrRegions/initCtrRegionsTree";
	var _loadTreeUrl = ctx + "/ctrRegions/loadCtrRegionsTree";
	var _getCodeUrl = ctx + "/ctrRegions/getCodeNo";
	var _pMethod = "POST";
	var _gMethod = "GET";
	var _dnd = false;
	var _onlyLeafCheck = false;
	var _pCheck = false;
	var _CHINAID = "111111111111111111";
	var _onClickF = "";
	
	
	/*取得目前節點*/
	
	var getSelectNode = function() {
				
		var treeNodes = _treeObj.tree('getSelected');
		
		if (treeNodes == null || treeNodes.length == 0) {
			showMessage("请选择节点！");
			return ;
		}

		var treeNode = treeNodes;
			
		return treeNode;
	}
	
	var loadPop = function(url,data,callback){
		$("#ctrDictInfoModal").load(url, data, function () {
            dialog("ctrDictInfoModal", {
                width: 480
            },callback);
     });
	
		
	}

	//update
	var _nodeUpdate = function() {
	
		var treeNode = getSelectNode();
		var pName = _treeObj.tree('getParent',treeNode.target).text;

		var selectId = treeNode.id;
		var selectName = treeNode.text;
		var data =  {id: selectId,otype:"edit"};
		var callback = function(){
			$("#regpName").html(pName);
		};
		loadPop(_loadUrlById,data,callback);
	
	}

	/**
	 * 增加节点 addType:增加的类型(addBrotherNode:添加同级节点,addchildrenNode:添加子节点)
	 */
	var _nodeAdd = function(addType) {

		treeNode = getSelectNode();
		var selectId = "";
		var selectName = "";
		
		if ("addBrotherNode" == addType) {
			treeNode = _treeObj.tree('getParent',treeNode.target);
		}
		
		selectName = treeNode.text;
		selectId = treeNode.id;
		
		var data = {id: selectId,otype:"add"};
		var callback = function(){
			_getCodeNo();
            $("#regpName").html(selectName);
            $("#regpid").val(selectId);
            $("#editType").val(addType);
		};
		loadPop(_loadUrlById,data,callback);
	
	}
	/**
	 * 名字重复提示
	 */
	var _save = function() {
		 //防止重复提交
		$("#editBtn").attr("disabled", true);
		//var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		formTextTrim("editForm");
		var name = $("#name").val();
		var oldName = $("#oldName").val();
		if (name == '') {
			
			showMessage('中文名称为空，请重新输入！',function(){
				$("#name").focus();
			});
			$("#editBtn").attr("disabled", false);
			return;
		}
		var id = $("#id").val();
		//前后一样不做验证处理
		if(oldName==name){
			_addCtrRegions(name,id);
		}else{
			$.ajax({
				url : _nameRepeatUrl,
				type : "POST",
				data : {
					"name" : name
				},
				success : function(data) {
					if (data.indexOf("confirm|") == 0) {
						data = data.substring(8);
						showConfirm((data),function(){
							_addCtrRegions(name,id);
						})
					} else {
						_addCtrRegions(name,id);
					}

				},
				"error" : function() {
					//canStore = true;
				}
			});
		}
	}
	// 保存提交，写库
	var _addCtrRegions = function(name,id) {
		var pid = $("#regpid").val();	
		var editType = $("#editType").val();
		var treeNode = getSelectNode();
		
		$.ajax({
			url : _saveRegUrl,
			type : "POST",
			data : $("#editForm").serialize() + "&pid=" + pid,
			success : function(data) {
				data = resolutionData(data);
				_closeWin();
				if (id != null && id != "") {// 修改
					treeNode.text = name;
					_treeObj.tree('update',treeNode);
				} else {
					newId = data;
					var dataO = [{
							id:data,
							text:name
				    }];
					
					if(editType != "addBrotherNode"){
						//增加子节点
						_treeObj.tree('append',{
							parent:treeNode.target,							
							data:dataO
						});
						
						
					}else{
						
						var pNode = _treeObj.tree('getParent',treeNode.target);
						console.log(pNode);
						if(pNode){
							//增加同级节点
							_treeObj.tree('append',{
								parent:pNode.target,							
								data:dataO
							});
						}
						
					}

				}
			},
			"error" : function() {
				//canStore = true;
			}
		});
	}
	
	var _del = function() {

		var treeNode = getSelectNode();
		var rootNode = _treeObj.tree('getRoot');
		
		var id = treeNode.id;
		if (id == rootNode.id){ //根节点不可删除
			showMessage(rootNode.text+"节点不能删除！");
			return ;
		}
		showConfirm(("是否删除此节点"),function() {// 确认提示：是否删除此节点。
			
			$.ajax({
				url : _delRegUrl,
				type : "POST",
				data : {
					"id" : id
				},
				success : function(data) {
					data = resolutionData(data);
					if (data == null || data == "") {// 删除没有成功。
						return;
					} else {
						_treeObj.tree('remove',treeNode.target);
					}
				},
				"error" : function() {
				}
			});
			
		})
	}
	
	var _setTreeObj = function(obj){
		_treeObj = obj;
	}
	
	var _initObj = function(){
		
		var treeObj = {
	        url: _initTreeUrl,
	        dnd:_dnd,
	        checkbox:_pCheck,
	        onlyLeafCheck:_onlyLeafCheck,
	        animate:true,
	        onBeforeExpand: function(node){  
	        	
		        var url = _loadTreeUrl;
	            $(this).tree('options').url = url;
	            $(this).tree('options').method = "POST";
	            $(this).tree('options').queryParams = {id:node.id,tier:node.attributes.tier};
	
	            $(this).tree('options').loadFilter = function (data) {
	                
	            	//为避免资料格式错误，在此处先进行资料格式判断
	            	var dtos;
	            	if(typeof(data) == "string"){
	            		dtos = eval('(' + data + ')');
	            	}else{
	            		dtos = data;
	            	}
	            	
	                return dtos;
	            }  
	            
            },
            onClick: function(node){
	        	
	        	var rootNode = $(this).tree('getRoot');
	        	console.log(rootNode);
	        	if(node.id == rootNode.id){
	        		$("#regaddBrotherBtn").attr("disabled","disabled");
	        		$("#regdelBtn").attr("disabled","disabled");
	        		$("#regupdateBtn").attr("disabled","disabled");
	        	}else{
	        		$("#regaddBrotherBtn").removeAttr("disabled");
	        		$("#regdelBtn").removeAttr("disabled");
	        		$("#regupdateBtn").removeAttr("disabled");	        		
	        	}

            },
	        loadFilter: function (data) {

	            var dtos = eval('(' + data + ')');
	            return dtos;

	        }
	    }
		
		return treeObj;
	}
	
	
	var _initTreeEasy = function(obj) {
		
	    _treeObj.tree(obj);
	    
	}
	
	var _setCheckBox = function(pCheck,LeafCheck){
		
		_pCheck = pCheck;
		_onlyLeafCheck = LeafCheck;
		
	}

	function _closeWin() {

		$("#ctrDictInfoModal").hide();
		$(".oy").remove();
		$("#xinxi3").hide();
		
	}

	/**
	 * @Title: getCodeNo
	 * @Description: TODO(获取编号)
	 */
	function _getCodeNo() {
		$.ajax({
			url : _getCodeUrl,
			type : "POST",
			async : false,
			success : function(data) {
				data = resolutionData(data);
				$("#regCodeNo").html("编号："+data);
                $("#hCodeNo").val(data);
				
			},
			"error" : function() {
			}
		});
	}
	
	
	//以下为公用方法
	//var my = 
	
	return {
		reg:_prefix,
		init: _initTreeEasy,		
		nodeAdd: _nodeAdd,
		update: _nodeUpdate,
		del:_del,
		save:_save,
		setObj:_setTreeObj,
		getInit: _initObj,
		setCheckBox: _setCheckBox
	};
	
}(jQuery));
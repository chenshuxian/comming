/*
 * 2016/1/12
 * easyui tree Module
 * 作者: chenshuxian
 */
var EasyTree;

EasyTree = (function($){
	//update
	function nodeUpdate() {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var treeNodes = zTree.getSelectedNodes();
		if (treeNodes == null || treeNodes.length == 0) {
			BM.showMessage("请选择节点！");
			return ;
		}
		treeNode = treeNodes[0];
		var pTreeNode = treeNode.getParentNode();
		var selectId = treeNode.id;
		$.ajax({
			url : ctx + "/ctrRegions/loadCtrRegionsById",
			type : "POST",
			data : {
				"id" : selectId
			},
			success : function(data) {
				data = resolutionData(data);
				if (data == "") {
					return;
				}
				var dto = eval('(' + data + ')');
				$("#codeNoLab").html("编号："+dto.codeNo);
				$("#id").val(selectId);
				$("#codeNo").val(dto.codeNo);
				$("#pName").html();
				$("#name").val(dto.name);
				$("#oldName").val(dto.name);
				$("#enName").val(dto.enName);
				$("#enShortName").val(dto.enShortName);
				$("#fastCode").val(dto.fastCode);
				$("#pName").html(pTreeNode.name);
				openWin();
			},
			"error" : function() {

			}
		});

	}

	function clear() {
		$("#codeNoLab").html();
		$("#pid").val("");
		$("#id").val("");
		$("#codeNo").val("");
		$("#pName").html();
		$("#oldName").val("");
		$("#name").val("");
		$("#enName").val("");
		$("#enShortName").val("");
		$("#fastCode").val("");
		$("#status").val("");
	}
	/**
	 * 增加节点 addType:增加的类型(addBrotherNode:添加同级节点,addchildrenNode:添加子节点)
	 */
	function nodeAdd(addType) {
		
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var treeNodes = zTree.getSelectedNodes();
		if (treeNodes == null || treeNodes.length == 0) {
			BM.showMessage("请选择节点！");
			return ;
		}
		treeNode = treeNodes[0];
		var selectId = "";
		var selectName = "";
		if ("addBrotherNode" == addType) {
			treeNode = treeNode.getParentNode();
		}
		selectName = treeNode.name;
		selectId = treeNode.id;
		var codeNo = getCodeNo();
		openWin();
		// 写到基本信息页面上的信息
		$("#pid").val(selectId);
		$("#pName").html(selectName);
	}
	/**
	 * 名字重复提示
	 */
	var canStore = true;
	function save() {
		// 防止重复提交
		if (!canStore) {
			return;
		}
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		formTextTrim("editForm");
		var name = $("#name").val();
		var oldName = $("#oldName").val();
		if (name == '') {
			BM.showMessage('中文名称为空，请重新输入！',function(){
				$("#name").focus();
			});
			return;
		}
		var id = $("#id").val();
		//前后一样不做验证处理
		if(oldName==name){
			addCtrRegions(name, zTree,id);
		}else{
			$.ajax({
				url : ctx + "/ctrRegions/nameRepeat",
				type : "POST",
				data : {
					"name" : name
				},
				success : function(data) {
					if (data.indexOf("confirm|") == 0) {
						data = data.substring(8);
						showConfirm((data),function(){
							addCtrRegions(name, zTree,id);
						})
					} else {
						addCtrRegions(name, zTree,id);
					}

				},
				"error" : function() {
					canStore = true;
				}
			});
		}
	}
	// 保存提交，写库
	var newId = null;
	function addCtrRegions(name, zTree,id) {
		var pid = $("#pid").val();
		$.ajax({
			url : ctx + "/ctrRegions/saveCtrRegions",
			type : "POST",
			data : $("#editForm").serialize() + "&pid=" + pid,
			success : function(data) {
				canStore = true;
				data = resolutionData(data);
				closeWin();
				if (id != null && id != "") {// 修改
					treeNode.name = name;
					zTree.editName(treeNode);
					zTree.cancelEditName();
				} else {
					newId = data;
					treeNode = zTree.addNodes(treeNode, {
						id : data,
						pId : pid,
						name : name
					});
				}
			},
			"error" : function() {
				canStore = true;
			}
		});
	}
	function del() {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var treeNodes = zTree.getSelectedNodes();
		if (treeNodes == null || treeNodes.length == 0) {
			BM.showMessage("请选择节点！");
			return ;
		}
		treeNode = treeNodes[0];
		var id = treeNode.id;
		if (id == CHINAID){
			BM.showMessage("中国节点不能删除！");
			return ;
		}
		showConfirm(("是否删除此节点"),function() {// 确认提示：是否删除此节点。
			$.ajax({
				url : ctx + "/ctrRegions/delCtrRegions",
				type : "POST",
				data : {
					"id" : id
				},
				success : function(data) {
					data = resolutionData(data);
					if (data == null || data == "") {// 删除没有成功。
						return;
					} else {
						zTree.removeNode(treeNode, true);
					}
				},
				"error" : function() {
				}
			});
		})
	}
	var CHINAID = "111111111111111111";
	var setting = {
		view : {
			selectedMulti : false,
			showLine : false,
			showIcon : false
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		data : {
			simpleData : {
				enable : true
			}

		},
		async : {
			enable : true,
			url : ctx + "/ctrRegions/loadCtrRegionsTree",
			autoParam : [ "id" ],
			otherParam : {
				"otherParam" : "zTreeAsyncTest"
			},
			dataFilter : filter
		},
		callback : {
			onClick : onClick,
			/*
			 * beforeDrag : beforeDrag, beforeDrop : beforeDrop,
			 */
			beforeClick : zTreeBeforeClick
		}
	};
	function onClick(event, treeId, treeNode, clickFlag) {
		// 1. 当选择“中国”节点时，“添加同级节点”和“修改”按钮为不可用。
		if (CHINAID == treeNode.id) {
			$("#addBrotherBtn").attr("href", "javascript:void(0)")
			$("#updataBtn").attr("href", "javascript:void(0)");
			$("#updataBtn").attr("style","color:#c0c0c0;border:1px solid #c0c0c0;background:#fff");
			$("#addBrotherBtn").attr("style","color:#c0c0c0;border:1px solid #c0c0c0;background:#fff");
		} else {
			$("#updataBtn").removeAttr("style");
			$("#addBrotherBtn").removeAttr("style");
			$("#addBrotherBtn").attr("href", "javascript:nodeAdd('addBrotherNode')")
			$("#updataBtn").attr("href", "javascript:nodeUpdate()");
		}
		return;
	}
	function filter(treeId, parentNode, childNodes) {
		var nodes = new Array();
		if (!childNodes)
			return null;
		for (var i = 0, l = childNodes.length; i < l; i++) {
			if(newId!=null&&newId==childNodes[i].id){
				break;
			}
			childNodes[i].name = childNodes[i].name.replace('', '');
			nodes[i] = childNodes[i];
		}
		return nodes;
	}
	function showIconForTree(treeId, treeNode) {
		return !treeNode.isParent;
	};
	function beforeDrag(treeId, treeNodes) {
		return false;
		/*
		 * for (var i=0,l=treeNodes.length; i<l; i++) { if (treeNodes[i].drag ===
		 * false) { return false; } } return true;
		 */
	}
	function zTreeBeforeClick(treeId, treeNode, clickFlag) {
		$("#deleteTip").html("中文名称：" + treeNode.name);
		$("#addchild").attr("disabled", false);
		$("#addbro").attr("disabled", false);
		$("#btn_delete").attr("disabled", false);
		if (treeNode.pId == null || treeNode.pId == '0') {
			$("#addbro").attr("disabled", true);
			$("#btn_delete").attr("disabled", true);
		}
	}
	// 拖拽
	function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		/*
		 * if(targetNode == null || (moveType != "inner" && !targetNode.parentTId)){
		 * return false; } $.ajax({ type : "POST", async:false, url :
		 * ctx+"/ctrRegions/moveCtrRegions", data:{ moveType:moveType,
		 * nodeID:treeNodes[0].id, targetNodeID:targetNode.id,
		 * targetNodePId:targetNode.pId }, success : function(result) {
		 * if("success"==result){ return true; }else{ return false; } } });
		 */
		return false;
		// return targetNode ? targetNode.drop !== false : true;
	}
	
	function initTree() {
		$.ajax({
			type : "POST",
			url : ctx + "/ctrRegions/initCtrRegionsTree",
			dataType : "json",
			success : function(data) {
				//data = resolutionData(data);
				var obj = eval("(" + data + ")");
				//console.log(obj);
				$("#tt").tree({
					data: obj
				});
			}
		});
	}
	
	function initTreeEasy() {

	    $('#tt').tree({
	        url: ctx + "/ctrRegions/initCtrRegionsTree",
	        onBeforeExpand: function (node, param) {
	            //var _url = ctx + "/ctrRegions/loadCtrRegionsTree?id="+node.id + "&tier=" + node.attributes.tier;
	            var _url = ctx + "/ctrRegions/loadCtrRegionsTree";
	            $('#tt').tree('options').url = _url;
	            $('#tt').tree('options').method = "POST";
	            $('#tt').tree('options').queryParams = {id:node.id,tier:node.attributes.tier};

	            $('#tt').tree('options').loadFilter = function (data, parent) {
	                data = resolutionData(data);
	                var dtos = eval('(' + data + ')');
	                zNodes = new Array();
	                for (var i = 0; i < dtos.length; i++) {
	                    if ("" == dtos[i].parentId || null == dtos[i].parentId || "0" == dtos[i].parentId) {
	                        zNodes.push({
	                            id: dtos[i].id,
	                            "attributes": {
	                                pId: dtos[i].parentId,
	                                tier: dtos[i].tier
	                            },
	                            text: dtos[i].cnName,
	                            open: true,
	                            state: dtos[i].isParent ? "closed" : "open"
	                        });
	                    } else {
	                        zNodes.push({
	                            id: dtos[i].id,
	                            "attributes": {
	                                pId: dtos[i].parentId,
	                                tier: dtos[i].tier
	                            },
	                            text: dtos[i].cnName,
	                            state: dtos[i].isParent ? "closed" : "open"
	                        });
	                    }

	                }
	                return zNodes;
	            }
	        },
	        onClick: function (node) {
	            alert(node.id +"  "+node.attributes.tier);
	        },
	        loadFilter: function (data, parent) {
	            data = resolutionData(data);
	            var dtos = eval('(' + data + ')');
	            zNodes = new Array();

	            for (var i = 0; i < dtos.length; i++) {
	                if ("" == dtos[i].parentId || null == dtos[i].parentId
	                    || "0" == dtos[i].parentId) {
	                    zNodes.push({
	                        id: dtos[i].id,
	                        "attributes": {
	                            pId: dtos[i].parentId,
	                            tier: dtos[i].tier
	                        },
	                        text: dtos[i].cnName,
	                        open: true,
	                        state: dtos[i].isParent ? "closed" : "open"
	                    });
	                } else {
	                    zNodes.push({
	                        id: dtos[i].id,
	                        "attributes": {
	                            pId: dtos[i].parentId,
	                            tier: dtos[i].tier
	                        },
	                        text: dtos[i].cnName,
	                        state: dtos[i].isParent ? "closed" : "open"
	                    });
	                }

	            }
	            return zNodes;

	        }
	    });
	}

	function loadTree(id, tier) {
		$.ajax({
			type : "POST",
			url : ctx + "/ctrRegions/loadCtrRegionsTree",
			data : {
				"id" : id,
				"tier" : tier
			},
			dataType : "text",
			success : function(data) {
				data = resolutionData(data);
				var dtos = eval('(' + data + ')');
				if (dtos == '') {
					$("#rootExistDiv").hide();
					$("#rootNotExistDiv").show();
				} else {
					$("#rootExistDiv").show();
					$("#rootNotExistDiv").hide();
				}
				zNodes = new Array();
				for (var i = 0; i < dtos.length; i++) {
					if ("" == dtos[i].parentId || null == dtos[i].parentId || "0" == dtos[i].parentId) {
						zNodes.push({id : dtos[i].id,pId : dtos[i].parentId,name : dtos[i].cnName,open : true,isParent : dtos[i].isParent});
					} else {
						zNodes.push({id : dtos[i].id,pId : dtos[i].parentId,name : dtos[i].cnName,isParent : dtos[i].isParent});
					}

				}
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			}
		});
	}
	function closeWin() {
		clear();
		$(".oy").remove();
		$("#xinxi3").hide();
	}
	function openWin() {
		$("body").append("<div class='oy'></div>");
		$("#xinxi3").show();
		$("#name").focus();
	}
	function add() {
		clear();
		getCodeNo();
	}
	/**
	 * @Title: getCodeNo
	 * @Description: TODO(获取编号)
	 */
	function getCodeNo() {
		$.ajax({
			url : ctx + "/ctrRegions/getCodeNo",
			type : "POST",
			async : true,
			success : function(data) {
				data = resolutionData(data);
				$("#codeNoLab").html("编号："+data);
				$("#codeNo").val(data);
			},
			"error" : function() {
			}
		});
	}
	//以下为公用方法
	return{
		init: function(){
			//初始化区块
			initTree();
		},		
		nodeAdd: nodeAdd,
		update: nodeUpdate
 
	};
}(jQuery));

$(function() {
	//EasyTree.init("","1");
	
	//$("#")
});



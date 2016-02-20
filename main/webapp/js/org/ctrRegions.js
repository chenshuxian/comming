$(function() {
	EasyTree.setObj($("#tt"));
	EasyTree.setCheckBox(false,false);
	var obj = EasyTree.getInit();
	EasyTree.init(obj);	
	$("#regaddBrotherBtn").on('click',function(){EasyTree.nodeAdd("addBrotherNode")});
	$("#regaddchildrenBtn").on('click',function(){EasyTree.nodeAdd("addchildrenNode")});
	$("#regdelBtn").on('click',function(){EasyTree.del()});
	$("#regupdataBtn").on('click',function(){EasyTree.update()});
});

//$("#"+EasyTree.reg+"addBrotherBtn").on('click',EasyTree.nodeAdd("addBrotherNode"));
//$("#"+EasyTree.reg+"addchildrenBtn").on('click',EasyTree.nodeAdd("addchildrenNode"));
//$("#"+EasyTree.reg+"nodeUpdate").on('click',EasyTree.update());
//$("#"+EasyTree.reg+"delBtn").on('click',EasyTree._del());
//$("#"+EasyTree.reg+"nodeUpdate").on('click',function(){alert("test")});



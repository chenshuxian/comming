$('*').on('keydown', 'input, select', function(e) {
	var self = $(this),
		form = self.parents('form:eq(0)'),
		focusable, next, tagName, tagId, regStr;

	if (e.keyCode == 13) {
		focusable = form.find('input,a,select,textarea').filter(':visible');
		next = focusable.eq(focusable.index(this)+1);
		if (next.length) {
			checkDisabled(focusable,next);
			next.focus();
			next.select();
		} else {
			tagId = next.context.id;
			tagName = next.context.tagName;
			tagId = tagId.toLowerCase();
			regStr = /search/;
			//判断是表单事件或查询事件
			if(regStr.test(tagId)) {
				$("#" + next.context.id).next().click();	//查询事件触发
			} else {
				$("#editBtn").click();
			}

		}
		return false;
	}
});
//跳过disabaled栏位
function checkDisabled (focusable,next) {
	if(next[0].disabled){
		next = focusable.eq(focusable.index(next)+1);
		checkDisabled(focusable,next);
	}else {
		next.focus();
		next.select();
		return false;
	}
}
//$("*").keydown(function (e) {
//	e = window.event || e || e.which;
//	var element=e.srcElement||e.target;
//    if (e.keyCode == 13 && element.type!='button' && element.type!='submit' && element.type!='reset' && element.type!='textarea' && element.type!='') {
//        if(document.all){
//        	e.keyCode=9;
//        }else{
//        	var obj = getNextInput(element);
//        	if(obj != null){
//        		obj.focus();
//            	e.preventDefault();
//        	}
//        }
//    }
//});
//
//
//function getNextInput(input){
//	var form=input.form;
//	if(form !=null){
//		for(var i=0;i<form.elements.length;i++){
//			if(form.elements[i]==input){
//				break;
//			}
//		}
//
//		while(true){
//			if(i++<form.elements.length){
//				if(form.elements[i] !=null && form.elements[i].type!="hidden"){
//					return form.elements[i];
//				}
//			}else{
//				return null;
//			}
//		}
//	}else{
//		return null;
//	}
//
//}
//

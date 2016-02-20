$("*").keydown(function (e) {
	e = window.event || e || e.which;
	var element=e.srcElement||e.target;
    if (e.keyCode == 13 && element.type!='button' && element.type!='submit' && element.type!='reset' && element.type!='textarea' && element.type!='') {
        if(document.all){
        	e.keyCode=9;
        }else{
        	var obj = getNextInput(element);
        	if(obj != null){
        		obj.focus();
            	e.preventDefault();
        	}
        }
    }
});


function getNextInput(input){
	var form=input.form;
	if(form !=null){
		for(var i=0;i<form.elements.length;i++){
			if(form.elements[i]==input){
				break;
			}
		}

		while(true){
			if(i++<form.elements.length){
				if(form.elements[i] !=null && form.elements[i].type!="hidden"){
					return form.elements[i];
				}
			}else{
				return null;
			}
		}
	}else{
		return null;
	}
	
}


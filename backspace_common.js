function disableBackspace(){
		
		document.getElementsByTagName("body")[0].onkeydown =function(event){ 
			
			if (!event){
		    	var event = window.event;
		    }

	        //获取事件对象  
	        var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget;   

	        if(event.keyCode == 8){//判断按键为backSpace键  

                //判断是否需要阻止按下键盘的事件默认传递  
                var name = elem.nodeName || elem.value;
                  
                if(name!='INPUT' && name!='TEXTAREA'){
                    return _stopIt(event);
                }
                var type_e = elem.type.toUpperCase();
                if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE') && type_e!='TEL' && type_e!='NUMBER'){  
                   return _stopIt(event);
                }
                if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){
                   return _stopIt(event);
                }
            }
        }
    }
	function _stopIt(e){  
		if(e.returnValue){  
			e.returnValue = false ;  
		}  
		if(e.preventDefault ){  
			e.preventDefault();  
		}                 
		
		return false;  
	} 
$(function(){
    
    /***设置第6个列表全选/反选***/
	refreshXuan6();
	
    /********按enter，光标自动跳到下一个文本框*************/
    $("input").unbind("keypress").keypress(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13){
            var i;
            for (i = 0; i < this.form.elements.length; i++)
                if (this == this.form.elements[i])
                    break;
            i = (i + 1) % this.form.elements.length;
            this.form.elements[i].focus();
            return false;
        }
        else
            return true;
    });
});

//当列表中的数据用js代码做增删改时，需要重新把checkbox全选功能设置一遍
function refreshXuan6(){
	$(".cen6> a").unbind("click").click(function(){
        var cla=$(this).attr("class");
        if(cla=="not"){
            $(this).removeClass("not").addClass("yes");
            $(this).parent().parent().addClass("cur");

        }else{
            $(this).removeClass("yes").addClass("not");
            $(this).parent().parent().removeClass("cur");
        }
    });
    
    $(".quan6> a").unbind("click").click(function(){
        var cla=$(this).attr("class");
        if(cla=="not") {
            $(this).removeClass("not").addClass("yes");
            $(this).parent().parent().siblings().find(".cen6>a").removeClass("not").addClass("yes");
            $(this).parent().parent().siblings().find(".cen6").parent().addClass("cur");
        }else{
            $(this).removeClass("yes").addClass("not");
            $(this).parent().parent().siblings().find(".cen6>a").addClass("not").removeClass("yes");
            $(this).parent().parent().siblings().find(".cen6").parent().removeClass("cur");
        }
    });
}
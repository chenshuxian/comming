/*
 * 屏蔽网页滚动
 * **/
function bodyScroll() {
    $('html,body').css({
        overflow: 'visible'
    });
    $("body,html").unbind("touchmove");
}


/*弹性表格*/
function flexTableRest() {
    $('.flex-table-scroll').each(function () {
        var headWidth = [];
        $(this).find('.flex-table-head').find('th').each(function () {
            headWidth.push($(this).outerWidth(true));
        });
        $(this).find('.flex-table-body').find('tr:first-child > td').each(function () {
            $(this).css({
                width: headWidth[$(this).index()] + 'px'
            });
        });
    });
}

/*
 * 开启网页滚动
 * */

function bodyHidden() {
    $('html,body').css({
        overflow: 'hidden'
    });
    $("body,html").bind("touchmove", function (event) {
        event.preventDefault;
    });
}
/*开启全屏*/
function fullScreen() {
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
        el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}
/*退出全屏*/
function exitFullScreen() {
    var el = document;
    var cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
        el.mozCancelFullScreen || el.exitFullScreen;
    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}
/*
 * 弹窗
 * */
var popIndex = 90000;
function dialog(id, attr, callback) {
    //var id = arguments[0] ? arguments[0] : 'popShow';
    //var htmlStr = arguments[1] ? arguments[1] : '';
    var marginB = arguments[1]['marginB'] ? arguments[1]['marginB'] : 30;
    var width = arguments[1]['width'] ? arguments[1]['width'] : 440;
    //var bodyScroll = arguments[1]['bodyScroll'] ? true : arguments[1]['bodyScroll'];
    var marginT = arguments[1]['marginT'] ? arguments[1]['marginT'] : 30;
    //$('.pop').hide();
    popIndex++;
    $('#' + id).css({zIndex: popIndex}).fadeIn(100);
    if (!($('#' + id).find('.pop-shadow').length > 0)) {
        $('#' + id).append('<div class="pop-shadow"></div>');
    }
    var winH = $(window).height();
    var popObj = $('#' + id).find('.pop-container');
    var popH = popObj.height();
    popObj.css({
        width: width + 'px',
        marginTop: '40px'
        //marginTop: (winH - popH) / 3 + 'px',
    });
    if (winH > popH) {
        popObj.css({
            width: width + 'px',
            marginTop: '40px'
            //marginTop: (winH - popH) / 3 + 'px',
        });
    } else {
        popObj.css({
            width: width + 'px',
            marginTop: marginT + 'px',
            marginBottom: marginB + 'px'
        });
    }
    bodyHidden();


    if (typeof callback == 'function') {
        callback();
    }

}

/*弹窗*/
function showPop(e){
	e.preventDefault();
    e.stopPropagation();
    var target = e.target;
    if ($(target).hasClass('md-size')) {
        dialog($(target).attr('data-show'), {
            width: 660
        });
    } else if ($(target).hasClass('lg-size')) {
        dialog($(target).attr('data-show'), {
            width: 960
        });
    } else if ($(target).hasClass('sm-size')) {
        dialog($(target).attr('data-show'), {
            width: 520
        });
    } else {
        dialog($(target).attr('data-show'), {
            width: 420
        });
    }
}

$(document).on('click', '.J_ShowPop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($(this).hasClass('md-size')) {
        dialog($(this).attr('data-show'), {
            width: 660
        });
    } else if ($(this).hasClass('lg-size')) {
        dialog($(this).attr('data-show'), {
            width: 960
        });
    } else if ($(this).hasClass('sm-size')) {
        dialog($(this).attr('data-show'), {
            width: 520
        });
    } else {
        dialog($(this).attr('data-show'), {
            width: 420
        });
    }

});

function closePop(e){
	e.preventDefault();
    e.stopPropagation();
    $(e.target).parents('.pop').hide();
    bodyScroll();
}

$(document).on('click', '.J_ClosePop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).parents('.pop').hide();
    bodyScroll();
});


/*类数组转换为真实的数组*/
function makeToArray(obj) {
    return Array.prototype.slice.call(obj);
}


/*全屏主体内容*/
function siteContentAutoFillScreen() {
    //var panel = $('.tabs-panels', '#site-content');
    var panel = $(".main-content-container");
    var Height = $(window).height();
    panel.css({
        //height: (Height - 75) + 'px'
        height: (Height - 105) + 'px'
    });
}
siteContentAutoFillScreen();

/*选项卡切换*/
function addTab(title, url) {
    if ($('#site-content').tabs('exists', title)) {
        $('#site-content').tabs('select', title);
    } else {
        $.ajax({
            dataType: "html",
            type: "GET",
            url: url,
            success: function (data) {
                $('#site-content').tabs('add', {
                    title: title,
                    content: data,
                    closable: true
                });

                siteContentAutoFillScreen();
            }
        });
        //var content = '<iframe src="' + url + '"class="main-frame"></iframe>';
        //$('#site-content').tabs('add', {
        //    title: title,
        //    content: content,
        //    closable: true
        //});
    }
}
$(window).on('resize', function () {
    siteContentAutoFillScreen();
});
/*状态提示信息*/
$(document).on('click', '.status-switch.help-tips', function () {
    var checkStatus = $(this).find('input').prop('checked');
    if (checkStatus) {
        $(this).find('.help-tips-content').text('开启');
    } else {
        $(this).find('.help-tips-content').text('停用');
    }
});


/*全屏初始化*/
$(function () {
    if (screenfull.enabled) {
        //全屏
        $('#full-screen').on('click', function (e) {
            e.preventDefault();
            screenfull.request($('html')[0]);
            $(this).addClass('hide').siblings().removeClass('hide');
        });
        ////退出全屏
        //$('#full-screen').on('click', function (e) {
        //    e.preventDefault();
        //    screenfull.exit();
        //    $(this).addClass('hide').siblings().removeClass('hide');
        //});
    }

    var main = $('#site-main');
    var toggle = $('.toggle-menu', '#site-menu'); //$('#toggle-menu');
    var dropDown = $('.drop-down');
    var siteMenu = $('#site-menu');
    var siteMenuDropDown = siteMenu.find('.drop-down');
    /*遮罩*/
    function shadowShow() {
        var shadow = document.createElement('div');
        shadow.id = 'shadow';
        document.body.appendChild(shadow);
    }

    shadowShow();

    
    function initMenu(){
    	var siteMenu = $('#site-menu');
        siteMenu.find('.menu-list').remove();
        //console.log(showId.attr('data-showId'))
        siteMenu.prepend($('#allMenu').html());
    }
    
    initMenu();

    /*菜单切换*/
    $(document).on('click', '.toggle-menu', function () {
    	initMenu();
        $(this).toggleClass('active');
        main.toggleClass('menu-collapse-open');

        if (siteMenu.find('.menu-list').hasClass('submenu')) {
            siteMenu.find('.drop-down').toggleClass('collapse-open')
        }

        setTimeout(function(){
            var
                width =  $(".tabs-container").width(),
                vt = $(".datagrid:visible").find("table.datagrid-f");

            $(".tabs-panels").width(width);
            $(".tabs-header").width(width);
            vt.datagrid("resize", {width: width - 40});
        },500);

    });


    /*下拉菜单切换*/
    dropDown.each(function () {
        $(this).on('mouseover', function () {
            $(this).children('.drop-down-menu').show();
            $(this).addClass('active');
        });
        $(this).on('mouseout', function () {
            $(this).children('.drop-down-menu').hide();
            $(this).removeClass('active');
        });
    });
    $(document).on('click', '.drop-down a', function () {
        $(this).parents('.drop-down-menu').hide();
    });
    $(document).on('mouseover', '.menu-collapse-open .items .drop-down', function () {
    	var downMenu = $(this).children('.drop-down-menu');
    	if (downMenu.css('display') == 'none') {
	    	$(this).addClass('active');
	        
	        downMenu.children().remove();
	        downMenu.append($('#' + $(this).attr('data-show')).html());
	        downMenu.show();
	        downMenu.show();
	        $('#shadow').addClass('site-menu-shadow');
    	}

    });
    $(document).on('mouseout', '.menu-collapse-open .items .drop-down', function () {
        $(this).children('.drop-down-menu').hide();
        $('#shadow').removeClass('site-menu-shadow');
        $(this).removeClass('active');

    });


    /*点击菜单关闭弹窗*/
    $('a', '#site-menu').on('click', function () {
        $(this).parents('.drop-down-menu').hide();
        $(this).parents('.drop-down').removeClass('active');
        $('#shadow').removeClass('site-menu-shadow');
    });

    /*切换*/
    $(document).on('click', '.toggle-show .toggle-show-title', function () {
        $(this).toggleClass('active').siblings().slideToggle();
    });
    /*提示信息*/
    $(document).on('mouseover', '.help-tips', function (e) {
        var x = $(this).offset().left - 20;
        var y = $(this).offset().top - 30;
        $(this).children('.help-tips-content').css({
            left: x + 'px',
            top: y + 'px'
        });
    });
    /*调整菜单高度*/
    function resetMenuHeight() {
        var siteMenuContainer = $('.site-menu-container', '#site-menu');
        var height = $('#site-menu').height() - 40;
        if (siteMenuContainer.length > 0) {
            siteMenuContainer.css({
                height: height + 'px'
            });
            siteMenuContainer.slimscroll({
                height: height
            });
        }
    }

    resetMenuHeight();

    $(window).on('resize', function () {
        resetMenuHeight();
    });

    $(document).on('click', '.J_MenuChange', function () {
        var siteMenu = $('#site-menu');
        siteMenu.find('.menu-list').remove();
        var showId = siteMenu.attr('data-showId', $(this).attr('data-show'));
        //console.log(showId.attr('data-showId'))
        siteMenu.prepend($('#' + $(this).attr('data-show')).html());
        resetMenuHeight();
    });

});

/*根据divId获取页面高度*/
function getTableHeight(divId){
	var winHeight = $(window).height();
	var divHeight = $("#"+divId).height();
	return winHeight-divHeight-110;
}

///*编辑*/
//window.editRow = function (index, row) {
//}
//
///*删除行*/
//window.deleteRow = function (index) {
//    $.messager.confirm("提示", "你确定要删除吗?", function (r) {
//
//    });
//}
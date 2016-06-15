//EasyUI datagrid 键盘上下控制选中行
$.extend($.fn.datagrid.methods, {
    keyCtr: function (jq) {
        return jq.each(function () {
            var grid = $(this);
            grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                switch (e.keyCode) {
                    case 38: // up
                        var selected = grid.datagrid('getSelected');
                        if (selected) {
                            var index = grid.datagrid('getRowIndex', selected);
                            grid.datagrid('selectRow', index - 1);

                        } else {
                            var rows = grid.datagrid('getRows');
                            grid.datagrid('selectRow', rows.length - 1);
                        }
                        break;
                    case 40: // down
                        var selected = grid.datagrid('getSelected');
                        if (selected) {
                            var index = grid.datagrid('getRowIndex', selected);
                            grid.datagrid('selectRow', index + 1);
                            // console.log(index + 1)
                        } else {
                            grid.datagrid('selectRow', 0);
                        }

                        break;
                }
            });

        });
    }
});
$.extend($.fn.datagrid.methods, {
    autoMergeCells: function (jq, fields) {
        return jq.each(function () {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
                j = 0,
                temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i];
                j = 0;
                for (j; j < fields.length; j++) {
                    var field = fields[j];
                    var tf = temp[field];
                    if (!tf) {
                        tf = temp[field] = {};
                        tf[row[field]] = [i];
                    } else {
                        var tfv = tf[row[field]];
                        if (tfv) {
                            tfv.push(i);
                        } else {
                            tfv = tf[row[field]] = [i];
                        }
                    }
                }
            }
            $.each(temp, function (field, colunm) {
                $.each(colunm, function () {
                    var group = this;

                    if (group.length > 1) {
                        var before,
                            after,
                            megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            if (rowspan > 1) {
                                target.datagrid('mergeCells', {
                                    index: megerIndex,
                                    field: field,
                                    rowspan: rowspan
                                });
                            }
                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});
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
    siteContentAutoFillScreen();
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
    siteContentAutoFillScreen();
}
/*
 * 弹窗
 * */
var popIndex = 100000;
function dialog(id, attr, callback) {
    //var id = arguments[0] ? arguments[0] : 'popShow';
    //var htmlStr = arguments[1] ? arguments[1] : '';
    var marginB = arguments[1]['marginB'] ? arguments[1]['marginB'] : 30;
    var width = arguments[1]['width'] ? arguments[1]['width'] : 440;
   // var height = attr.height ? attr.height : "auto";
    //var bodyScroll = arguments[1]['bodyScroll'] ? true : arguments[1]['bodyScroll'];
    var marginT = arguments[1]['marginT'] ? arguments[1]['marginT'] : 30;
    //var offsetY = arguments[1]['offsetY'] ? arguments[1]['offsetY'] : 300
    //$('.pop').hide();
    popIndex++;
    if (!($('#' + id).find('.pop-shadow').length > 0)) {
        $('#' + id).append('<div class="pop-shadow"></div>');
    }
    $('#' + id).css({zIndex: popIndex}).fadeIn(100);
    var winH = $(window).height();
    var popObj = $('#' + id).find('.pop-container');
    var popH = popObj.height(),
        popId,
        marginTop;

    if (popObj[0]) {
        popId = popObj[0].id;
    }

    if(popH <= 177) {
        if(popId == "uploadPop") {  //上传档案
            marginTop = ((winH - popH) / 2 - popH / 2 );
        } else {
            marginTop = ((winH - 500) / 2);
        }
    }else {
        marginTop = (winH - popH) / 4;
    }
    console.log("POPH" + popH + "," + "WINh" + winH);
    popObj.css({
        width: width + 'px',
        marginTop: marginTop + 'px'
    });

    bodyHidden();


    if (typeof callback == 'function') {
        callback();
    }

}

/*弹窗*/


$(document).on('click', '.J_ShowPop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($(this).hasClass('md-size')) {
        dialog($(this).attr('data-show'), {
            width: 700
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
    //var panel = $('#site-content > .tabs-panels > .panel');
    var panel = $('#site-content > .tabs-panels');
    var Height = $(window).height();
    panel.css({
        height: (Height - 80) + 'px'
    });
    $('.main-frame').css({
        height: (Height - 85) + 'px'
    });
}
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
        //var height = $(window).height() - 85;
        //var iframe = document.createElement('iframe');
        //iframe.src = url;
        //iframe.className = 'main-frame';
        //iframe.style.height = height + 'px';
        //iframe.style.overflow = 'hidden';
        //$('#site-content').tabs('add', {
        //    title: title,
        //    content: iframe,
        //    closable: true
        //});
    }
    siteContentAutoFillScreen();
}


/*全屏初始化*/
$(function () {
    siteContentAutoFillScreen();
    if (screenfull.enabled) {
        //全屏
        $('#full-screen').on('click', function (e) {
            e.preventDefault();
            screenfull.request($('html')[0]);
            $(this).addClass('hide').siblings().removeClass('hide');
        });
    }

    var siteMenu = $('#site-menu');
    /*遮罩*/
    function shadowShow() {
        var shadow = document.createElement('div');
        shadow.id = 'shadow';
        document.body.appendChild(shadow);
    }

    shadowShow();

    /*下拉菜单切换*/
    $(document).on('mouseover', '.drop-down', function () {
        var li = $(this).children('.drop-down-menu').children().find('li');
        if (li.length > 0) {
            $(this).children('.drop-down-menu').show();
            $(this).addClass('active');
        }
    });
    $(document).on('mouseout', '.drop-down', function () {
        $(this).children('.drop-down-menu').hide();
        $(this).removeClass('active');
    });

    $(document).on('click', '.drop-down a', function () {
        $(this).parents('.drop-down-menu').hide();
    });

    /*网站主菜单*/
    $('.submenu-item', siteMenu).on('mouseover', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var i = $(this).find('i[data-class]');
        i.addClass(i.attr('data-class'));
        $('#shadow').stop().fadeIn();
    });
    $('.submenu-item', siteMenu).on('mouseleave', function () {
        $(this).removeClass('active');
        var i = $(this).find('i[data-class]');
        i.removeClass(i.attr('data-class'));
        $('#shadow').stop().fadeOut();
    });

    $(document).on('click','.main-content-header li',function() {
        var ul =  $(this).closest("ul");
            //span = $(this).closest("div").prev();//取得父节的上一个兄弟节点

        //console.log(span);
        //将所有blue 清空
        ul.find("li").each(function () {
           if($(this).hasClass("blue")){
               $(this).removeClass("blue");
           }
        });

        $(this).addClass('blue');
        //span.addClass('blue');
       // $(this).parent()[0]
    });

});

$(window).on('resize', siteContentAutoFillScreen)
/*--------------------------*/

$(document).on('click', function (e) {
    if ($(e.target).hasClass('J_Tab')) {
        e.preventDefault();
        $(e.target).addClass('active').siblings().removeClass('active');
        $($(e.target).attr('href')).removeClass('hide').siblings().addClass('hide');
    }

    if ($(e.target).hasClass('form-list-component')) {
        e.stopPropagation();
    }


});
$(document).on('mouseover', '.helpers', function (e) {
    //$(this).find('.helpers-content').css({
    //    left: e.clientX,
    //    top: e.clientY
    //}).fadeIn(100);
    var x = $(this).offset().left + 10;
    var y = $(this).offset().top;
    $(this).children('.helpers-content').css({
        left: x + 'px',
        top: y + 'px'
    }).fadeIn(100);
});
//$(document).on('mouseover', function (e) {
//    if (e.target.tagName.toLowerCase() == 'a' || e.target.tagName.toLowerCase() == 'span') {
//        if ($(e.target).find('i').length > 0) {
//            var cls = $(e.target).find('i').attr('class').split('-')[1];
//            $(e.target).find('i').addClass(cls + '-hover');
//        }
//    }
//
//});
//$(document).on('mouseover','.submenu-item', function (e) {
//       //console.log($(e.target).find('i'));
//            if ($(e.target).prev().length > 0) {
//                var cls = $(e.target).prev().attr('class').split('-')[1];
//                //console.log(cls);
//                $(e.target).prev().addClass(cls + '-hover');
//            }
//
//});



$(document).on('mouseleave', '.helpers', function (e) {
    $(this).find('.helpers-content').fadeOut(100);
});

//$(document).on('mouseleave', 'a,span', function (e) {
//    if(!$(e.target).hasClass('helpers')) {
//        if ($(e.target).prev().length > 0) {
//            var cls = $(this).prev().attr('class').split('-')[1];
//            $(this).prev().removeClass(cls + '-hover');
//        }
//    }
//});

/*状态提示信息*/
$(document).on('click', '.status-switch.help-tips', function () {
    var checkStatus = $(this).find('input').prop('checked');
    if (checkStatus) {
        $(this).find('.help-tips-content').text('开启');
    } else {
        $(this).find('.help-tips-content').text('停用');
    }
});



$(document).on('mouseover', function (e) {

    if ((e.target.tagName.toLowerCase() == 'span')) {
       // console.log($(e.target).hasClass('helpers'));
        if(!$(e.target).hasClass('helpers')){
            if ($(e.target).find('i').length > 0) {
                var cls = $(e.target).find('i').attr('class').split('-')[1];
                $(e.target).find('i').addClass(cls + '-hover');
            }
        }

    }

});
//
$(document).on('mouseleave', 'a,span', function (e) {

    if ((e.target.tagName.toLowerCase() == 'span')) {
        // console.log($(e.target).hasClass('helpers'));
        if(!$(e.target).hasClass('helpers')) {
            if ($(this).find('i').length > 0) {
                var cls = $(this).find('i').attr('class').split('-')[1];
                $(this).find('i').removeClass(cls + '-hover');
            }
        }
    }
});
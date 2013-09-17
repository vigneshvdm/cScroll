/**********************************************************************************************************************************
    Version             Modified By                                 Description of change                   Date   
------------------------------------------------------------------------------------------------------------------------------------
        1           Vignesh(svignesh@live.com)                       Created cGrid                         14-Sep-2013 

        2           Vignesh(svignesh@live.com                        added scroll                          16-Sep-2013
            
        3           Renuka(renukavenkat90@gmail.com)                 framed scroll equation                17-sep-2013                               
****************************************************************************************************************************************/
var gWdith, gHeight, cSTop, cSBottom, cSMove, dataLength,
    csht,//height of the scroll bar
    cstotht, //total height of scroll bar container
    divht, //height of the div
    divtotht, //total height of the div including scroll content
    csposition; //bottom of scroll bar
//function to create scroll bar
$.fn.cScroller = function (scEl, divheight, speed) {
    if (this.selector) {jQ = this;}
    else {jQ = scEl;}
    if (!divheight) { divheight = "300px" } if (!speed) { speed = 20; }
    setTimeout(function applycss() {
        $(".cGridDiv").css({ "width": "100%", "height": divheight, "position": "absolute" });
        $(".cGridTable").css({ "width": "98%", "float": "left", "position": "absolute", "left": "0%", "height": divheight, "overflow": "visible", "top": "0%" });
        $(".cScrollContainer").css({ "width": "5%", "height": "100%", "background": "#dfeefa", "margin-left": "98%" });
        $(".cScroll").css({ "outline": "2px solid #fff", "left": "3px", "width": "21%", "background": "green", "float": "left", "position": "relative", "top": "0%","cursor":"pointer" });
        $(".odd").css({ "background": "#dfeefa" });
        $(".even").css({ "background": "white" });
    }, 100);
    if (jQ.parent().is(".cGridDiv")) {
        //jQ.parents('.cGridDiv').html('');
    }
    else if (jQ.parent().is(".cGridTable")) {
        //jQ.html('');
    }
    else {
        jQ.wrap('<div class="cGridDiv"></div>');
        setTimeout(function () { jQ.wrap('<div class="cGridTable"></div>'); }, 10);
        setTimeout(function () { jQ.parents('.cGridDiv').append("<div class='cScrollContainer'><div class='cScroll'></div></div>"); }, 10);
        setTimeout(function () { addMousewheel(); }, 1000);
    }
    setTimeout(assignVar, 100);jQ.css({ "width": "98%" });
};
function assignVar() {
    $tableheight = $('.cGridTable')[0].scrollHeight;
    $divheight = $("#cGrid").height();
    $scrollContainerHeight = $(".cScrollContainer").height();
    if ($tableheight > $divheight) {
        $h2 = ($divheight * $scrollContainerHeight) / $tableheight;
        $(".cScroll").css("height", $h2 + "px");
    }
    else {$(".cScroll").css("height", $divheight + "px");}
}
var $dragging = null;
var temp=0;
$('.cScrollContainer').live("mousemove", function (e) {
    if ($dragging) {
        $table = $('.cGridTable');
        $scroll = $('.cScroll');
        $maxheight = $('.cGridTable')[0].scrollHeight - $(".cGridTable").height();
        if ($(".cScroll").height() < $(".cScrollContainer").height()) {
            if (temp > e.pageY) {
                if ($scroll.position().top > 0) {
                    mid = $(".cScroll").height() / 2;
                    $(".cScroll").css("top", (e.pageY - mid) + "px");
                    scrollMove($(".cScroll").position().top, 'sb');
                }
            }
            else {
                if (Math.abs($table.position().top) <= $maxheight) {
                    mid = $(".cScroll").height() / 2;
                    $(".cScroll").css("top", (e.pageY - mid) + "px");
                    scrollMove($(".cScroll").position().top, 'sb');
                }
            }
            temp = e.pageY;
        }
    }
});
$('.cScrollContainer').live("mousedown", "div", function (e) {
    $dragging = $('.cScroll');
});
$(document).live("mouseup", function (e) {
    $dragging = null;
    $(window).unbind("mousemove");
});
$(document).live("keydown", function (e) {
    if (cSMove) { pix = cSMove } else { pix = 20; }//scroll limit here
    if (e.keyCode == 40) { scrollMove(-pix, 'kb') }//key up button
    else if (e.keyCode == 38) { scrollMove(pix, 'kb') }
});
function addMousewheel() {
    $('.cGridDiv').bind('mousewheel', function (e) {//#cGridTable .cGridDiv
        if (e.originalEvent.wheelDelta / 120 > 0) {scrollMove(20, 'kb');}
        else {scrollMove(-20, 'kb');}
    });
}
function scrollMove(pix, sender) {
    $table = $('.cGridTable');
    $scroll = $('.cScroll');
    $maxheight = $('.cGridTable')[0].scrollHeight - $(".cGridTable").height();
    $tableheight = $('.cGridTable')[0].scrollHeight;
    $divheight = $("#cGrid").height();
    $scrollpix = Math.abs((pix / ($tableheight / $divheight)));
    switch (sender) {
        case 'kb':
            if (pix > 0) {//move up
                if ($scroll.position().top > 0) {
                    $table.css({ "top": $table.position().top + pix });
                    $scroll.css({ "top": $scroll.position().top - $scrollpix });
                }
                else {
                    $table.css({ "top": "0px" });
                }
            }
            else {//move down
                if (Math.abs($table.position().top) <= $maxheight) {
                    $table.css({ "top": $table.position().top + pix });
                    $scroll.css({ "top":  "+="+ $scrollpix });
                }
            }
            break;
        case 'sb':
            tabletop = (pix * $tableheight) / $divheight;
            $table.css({ "top": -(tabletop)});
            break;
    }
};
// function to make array appended in table
$.fn.cGrid = function (array, width, height) {
    var jQ = this;
    gWdith = width;
    gHeight = height;
    dataLength = array.length;
    jQ.parent().css({ "overflow": "hidden", "width": "600px", "height": "300px", "position": "absolute" });
    if (jQ.parent().is(".cGridTable")) {
        jQ.html('');
    }
    jQ.html('');
    $.each(array, function (i, data) {
        if (data.length > 15) { cSMove = (height / dataLength); }
        else { $('.cScroll').css({ "height": "150px" }); }
        if (i % 2 == 0) {
            var tdElement = "";
            $.each(data, function (i, d) {
                tdElement += "<td style='width:" + (width / data.length) + "px'>" + d + "</td>";
            });
            if (data.length > 15) {
                jQ.append("<tr class='even'style='width:100%;height:" + (height / dataLength) + "px'>" + tdElement + "</tr>");
            }
            else { jQ.append("<tr class='even'style='width:100%;height:24px'>" + tdElement + "</tr>"); }
        }
        else {
            var tdElement = "";
            $.each(data, function (i, d) {
                tdElement += "<td style='width:" + (width / data.length) + "px'>" + d + "</td>";
            });
            if (data.length > 15) {
                jQ.append("<tr class='odd'style='width:100%;height:" + (height / dataLength) + "px'>" + tdElement + "</tr>");
            }
            else { jQ.append("<tr class='odd'style='width:100%;height:24px'>" + tdElement + "</tr>"); }
        }
    });
    $(null).cScroller(jQ);
};

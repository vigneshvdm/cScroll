/**********************************************************************************************************************************

    Version             Modified By                                 Description of change                   Date   
------------------------------------------------------------------------------------------------------------------------------------
        1           Vignesh(svignesh@live.com)                       Created cGrid                         14-Sep-2013 


****************************************************************************************************************************************/
var gWdith, gHeight,cSTop,cSBottom,cSMove,dataLength;
//function to create scroll bar
$.fn.cScroller = function (scEl) {
    if (this.selector) {
        jQ = this;
    }

    else {
        jQ = scEl;
    }

    setTimeout(function applycss() {
        $(".cGridDiv").css({ "width": "100%", "height": "100%", "position": "absolute" });
        $(".cGridTable").css({ "width": "98%", "float": "left", "position": "absolute", "left": "0%", "overflow": "visible" });
        $(".cScrollContainer").css({ "width": "5%", "height": "100%", "background": "#dfeefa", "margin-left": "98%" });
        $(".cScroll").css({ "cursor": "pointer", "outline": "2px solid #fff", "left": "3px", "width": "21%", "background": "green", "float": "left", "position": "relative" });
        $(".odd").css({ "background": "#dfeefa" });
        $(".even").css({ "background": "white" });
        var scrollht = $('.cGridTable').height() / (($('.cGridTable')[0].scrollHeight /$('.cGridTable').height())*1.25);
        $(".cScroll").css("height", scrollht);

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
    }

    jQ.css({ "width": "98%" });
};
// function to make array appended in table
$.fn.cGrid = function (array, width, height) {
    var jQ = this;
    gWdith = width;
    gHeight = height;
    dataLength=array.length;
    jQ.parent().css({"overflow": "hidden","width": "600px","height":"300px","position":"absolute"});
    
    if (jQ.parent().is(".cGridTable")) {
        jQ.html('');
    }
   jQ.html('');
   $.each(array, function (i, data) {
       if (data.length > 15) { $('.cScroll').css({ "height": (height / dataLength) + "px" }); cSMove = (height / dataLength);}
       else { $('.cScroll').css({ "height": "150px" }); }
        if (i % 2 == 0) {
            var tdElement="";
            $.each(data, function (i, d) {
                tdElement += "<td style='width:"+(width/data.length)+"px'>" + d + "</td>";
            });
            if (data.length > 15) {
                jQ.append("<tr class='even'style='width:100%;height:" + (height / dataLength) + "px'>" + tdElement + "</tr>");
            }
            else { jQ.append("<tr class='even'style='width:100%;height:24px'>" + tdElement + "</tr>"); }
            //jQ.append("<tr class='even'style='width:100%;height:" + (height / array.length) + "px'>" + tdElement + "</tr>");
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
            //jQ.append("<tr class='odd'style='width:100%;height:" + (height / array.length) + "px'>" + tdElement + "</tr>");
        }
   });
   $(null).cScroller(jQ);
};
var $dragging = null;
$('.cScroll').live("mousemove", function (e) {
    if ($dragging) {
        $dragging.offset({
            top: e.pageY
//            left: e.pageX
        });
        scrollMove(e.pageY, 'sb');
    }
});

$('.cScroll').live("mousedown", "div", function (e) {
    $dragging = $(e.target);
});

$('body').live("mouseup", function (e) {
    $dragging = null;
});
$(document).live("keydown", function (e) {
    if (cSMove) { pix=cSMove}else {pix = 20;}//scroll limit here
    if (e.keyCode == 40) { scrollMove(-pix,'kb')}//key up button
    else if (e.keyCode == 38) { scrollMove(pix, 'kb') }
});
function scrollMove(pix, sender) {
    $table = $('.cGridTable');
    $scroll = $('.cScroll');
    $maxheight = $('.cGridTable')[0].scrollHeight - $(".cGridTable").height();
    switch (sender) {
        case 'kb':
            if (pix > 0) {//move up
                if ($scroll.position().top > 0) {
                    $table.css({ "top": $table.position().top + pix });
                    $scroll.css({ "top": $scroll.position().top - pix });
                }
            }
            else {//move down
                if (Math.abs($table.position().top) <= $maxheight) {
                    $table.css({ "top": $table.position().top + pix });
                    $scroll.css({ "top": $scroll.position().top - pix });
                }

            }
            break;
        case 'sb':
            $table.css({ "top": (-pix) });
            break;
    }



    
};


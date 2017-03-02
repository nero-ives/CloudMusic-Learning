/* 
 * @Author: bk
 * @Date:   2017-02-25 00:21:21
 * @Last Modified by:   bk
 * @Last Modified time: 2017-02-25 13:38:38
 */

'use strict';
$(function() {
  (function(w) {
    //滑动滚动条
    var oScroll = $('#_lyctrl-scroll')[0];
    var list = $('#_lyc-wor')[0];
    var plane = $('#plane')[0];
    oScroll.onmousedown = function(e) {
      var e = e || window.event;
      var disY = e.clientY - oScroll.offsetTop;
      document.onmousemove = function(e) {
        var e = e || window.event;
        var top = e.clientY - disY;
        oScroll.style.top = top + 'px';
        plane.style.top = -top + 'px';
      }
    }
    oScroll.onmouseup = function() {
      document.onmousemove = null;
    }
   /* var top = 32;
    var timer  = setInterval(function(){
    	oScroll.style.top = top + 'px';
        plane.style.top = -top + 'px';
        top += top;
    },5000);*/
  })(window); //auto func
})

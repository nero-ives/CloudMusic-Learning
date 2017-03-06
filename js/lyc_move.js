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
        return false;
      }
      return false;
    }
    oScroll.onmouseup = function() {
        document.onmousemove = null;
      }
     //歌单滚动条
     var scroll = $('#scroll');
      
     
  })(window); //auto func
})

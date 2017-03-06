'use strict';
(function(win, $) {
  $('#_sub-menu li em div').each(function(index, ele) {

    $(ele).removeClass('current');
  });
  win.onhashchange = function() {
    var hash = win.location.hash;
    $('#_sub-menu li em div').each(function(index, ele) {
      $(ele).removeClass('current');
    });
    switch (hash) {
      case '#/phb':
        $('#phb').addClass('current');
        document.getElementById('mainContent').src = './bill.html';
        break;
      case '#/main':
        $('#recom').addClass('current');
        document.getElementById('mainContent').src = './main.html';
        break;
      default:
        break;
    }
  };
})(window, jQuery)

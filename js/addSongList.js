'use strict';
//页面加载完成后读取本地缓存。
window.onload = function() {
  if (localStorage['key1']) {
    $('#list_ul').html(localStorage['key1'])
  }
  /* localStorage.clear();
     $('#list_ul').html('')*/
  if (localStorage['pfeSrc']) {
    $('#lycTit').text(localStorage['sName'])
    $('#pfeImg')[0].src = localStorage['pfeSrc'];
    $('#pBarName').text(localStorage['pBarName']);
    $('#pBarSinger').text(localStorage['pBarSinger']);
  }
  //直接当页面所有元素加载完毕之后  将歌曲添加到歌曲列表
  getList('s01');
  //页面加载完成后  显示页面的提示信息 
  setTimeout(function() {
    $('#_init').css('display', 'none');
  }, 4000);
};
//挂在全局的一个函数
(function(window, $) {
  //挂在getList全局函数
  function getList(para) {
    $('#list_ul').html('');
    $.ajax({
      "url": "./data/list/song_page.php?para=" + para,
      "type": "get",
      "dataType": "json",
      "async": true,
      "success": function(json) {
        var data = json;
        //console.log(data);
        var html = '';
        for (var i = 0; i < data.length; i++) {
          html += '<li id="' + data[i].id + '">';
          html += '<div class="p-icon"><div class="cur">';
          html += '<audio src="" id=""></audio>';
          html += '</div>';
          html += '</div>';
          html += '<div class="s-name">' + data[i].name + '</div>';
          html += '<div class="hover-btn"><div>';
          html += '<em class="clct"></em><em class="she"></em><em class="dload"></em><em class="del"></em>';
          html += '</div></div>';
          html += '<div class="singer"><a href="#">' + data[i].singer + '</a></div>';
          html += '<div class="time">' + data[i].time + '</div>';
          html += '<div class="source"><a href="#"></a></div>';
          html += '</li>';
        };
        localStorage['key1'] = html;
        $('#list_ul').html(html);
      },
      "error": function(xhr) {
        console.log('error');
      }
    })
  }; //getList
  window.getList = getList;
  //挂在topbar跟随滚动条 函数
  function func(value) {
    $('#header').css('top', -value);
    $('#_header-bottom').css('top', -value + 70);
  };
  window.func = func;
})(window, jQuery);

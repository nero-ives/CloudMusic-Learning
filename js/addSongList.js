'use strict';
//页面加载完成后读取本地缓存。
window.onload = function() {
  if (localStorage['key1']) {
    //console.log(localStorage['key1']);
    $('#list_ul').html(localStorage['key1'])
  }
  /* localStorage.clear();
   	 $('#list_ul').html('')*/
  if (localStorage['pfeSrc']) {
    $('#pfeImg')[0].src = localStorage['pfeSrc'];
    $('#pBarName').text(localStorage['pBarName']);
    $('#pBarSinger').text(localStorage['pBarSinger']);
  }

}


function getList(para) {
  $('#list_ul').html('');
  $.ajax({
    "url": "data/list/song_page.php?para=" + para,
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
        html += '<div class="singer">' + data[i].singer + '</div>';
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




}

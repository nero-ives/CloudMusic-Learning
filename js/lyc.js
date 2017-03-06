'use strict';
$(function() {
  (function(window) {
    var $listBtn = $('#_song-page');
    var $listDet = $('#detail');
    var $ctrlBar = $('#_play-ctrl');
    var $liClose = $('#_li-close');
    var $listUl = $('#list_ul');
    //点击歌单显示歌单详细信息
    /****
      fadeBarTag 是window上的一个全局变量控制播放列表和歌词出现后使整个播放底部条不会消失
     *****/
    //timer  控制歌词的定时器
    var timer = null;
    var $lockBtn = $('#_lock-btn');
    $listBtn.on('click', function() {
      if (listDetTag == false) {
        $listDet.css('display', 'block');
        listDetTag = true;
      } else {
        $listDet.css('display', 'none');
        listDetTag = false;
      }
    });
    //歌词面板的关闭按钮
    $liClose.on('click', function() {
      $listDet.css('display', 'none');
      listDetTag = false;
    });
    //hover每一个列表
    //jqery 元素集合 和 each的正确用法 自己下去看，，但是没有原声的for循环效率高
    var $a_eveList = $listUl.children('li');
    //控制播放、暂停的变量。
    var $playBtn = $('#_play'); //播放，暂停
    var playBtn = $playBtn[0];
    var auTag = true; //播放，暂停的标志。
    //delegate用于新增和原先页面的元素的dom操作
    $listUl.delegate('li', 'mouseover', function() {
      $('li').each(function(index, ele) {
        $(ele).removeClass('every');
        $(ele).children('.hover-btn').children('div').removeClass('btns');
      });
      $(this).addClass('every');
      $(this).children('.hover-btn').children('div').addClass('btns');
    });
    $listUl.delegate('li', 'mouseout', function() {
      $('li').each(function(index, ele) {
        $(ele).removeClass('every');
        $(ele).children('.hover-btn').children('div').removeClass('btns');
      });
    });
    //当双击的时候，播放该条目的音乐,从ajax从服务器上获取数据
    //定义一个变量 playBtnTag用于存放每次双击之后双击元素的id,当点击大的播放按钮的时候，能够找到当前播放元素的id.
    var playBtnTag = false;
    //初始化一个变量用于存数歌词文件
    var lyric = '';
    $listUl.delegate('li', 'dblclick', function() {
      var a_audio = $('#list_ul li .p-icon audio');
      a_audio.each(function(index, ele) {
        ele.pause();
      });
      //该条目添加样式前将li下面的所有样式移除
      $('li').removeClass('dbl-every');
      //为该条目添加样式
      $(this).addClass('dbl-every');
      var id = this.id;
      $.ajax({
        type: "get",
        url: "./data/list/info.php?id=" + id,
        async: "true",
        dataType: "json",
        success: function(json) {
          var data = json[0];
          var id = data.id;
          lyric = data.lyc;
          playBtnTag = id;
          var src = data.src;
          var auObj = ($('#' + id).children('.p-icon').children('div').children('audio'))[0];
          auObj.src = src;
          //写入本地储存
          if (window.localStorage) {
            localStorage['lyc'] = data.lyc;
            localStorage['localLi'] = id;
            localStorage['audioSrc'] = auObj.src
          }
          auObj.play();
          //先清除上一次的歌词动画
          clearInterval(timer);
          //auTag=false时单击大暂停键的时候可以暂停
          auTag = false;
          //大播放键添加暂停样式。
          $playBtn.addClass('play-pause');
          //变更播放条为相应信息
          $('#lycTit').text(data.name);
          $('#pfeImg')[0].src = data.img;
          $('#pBarName').text(data.name);
          $('#pBarSinger').text(data.singer);
          //开启定时器 这个定时器会调用update这个回调函数，注意这是在ajax的回调函数里面，回调函数是当onreadstatechange这个事件成功之后，在执行该函数，这时页面上的其他东西先于这个回调函数而执行。
          if (window.localStorage) {
            localStorage['sName'] =  $('#lycTit').text();
            localStorage['pfeSrc'] = $('#pfeImg')[0].src;
            localStorage['pBarName'] = $('#pBarName').text();
            localStorage['pBarSinger'] = $('#pBarSinger').text();
          }
          /*歌词开始播放*/
          //将计时器的count清零
          count = 0;
          //定义一个相对该作用域外层变量lyric来存储从ajax获取到的数据(闭包)，每次获取都会更新这个全局变量。
          //将时间数组和歌词数组写在update函数内部，使得在这个局部作用域里卖你每次都能够调用得到
          update();
          //1秒之后调用定时器，当执行的时候，update所需的变量早已加载完成。最好放在需要变量的后面
          timer = setInterval(update, 1000);
        },
        error: function(xhr) {
          console.log('error');
        }

      });
    });
    //歌词播放条目dom元素
    var oScroll = $('#_lyctrl-scroll')[0];
    var list = $('#_lyc-wor')[0];
    var plane = $('#plane')[0];
    var $p_lyc = $('#plane').children('p');
    //展示歌词区域的p元素
    var lyc_zero = $('#lyc_zero')[0];
    var lyc_fir = $('#lyc_fir')[0];
    var lyc_sec = $('#lyc_sec')[0];
    var lyc_thi = $('#lyc_thi')[0];
    var lyc_active = $('#lyc_active')[0];
    var lyc_fif = $('#lyc_fif')[0];
    var lyc_six = $('#lyc_six')[0];
    var lyc_sev = $('#lyc_sev')[0];

    //歌词时间标志
    var count = 0;

    function update() {
      var aTime = [];
      var aLyric = [];
      var re = lyric.split(']');
      //console.log(lyric);
      for (var i = 0; i < re.length; i++) {
        var res = re[i].split('[');
        var time = res[1];
        var geci = res[0];
        aTime.push(time);
        aLyric.push(geci);
      };
      aTime.pop();
      aLyric.shift();
      for (var i = 0; i < aTime.length; i++) {
        var m = aTime[i].split(":")[0];
        var s = aTime[i].split(":")[1];
        var mis = parseInt(aTime[i].split('.')[1]);
        if (mis < 50) {
          s = s;
        } else {
          s = s + 1;
        }
        aTime[i] = parseInt(m) * 60 + parseInt(s);
      };
      count += 1;
      var i = getCurrent();
      if (aLyric[i - 3]) {
        lyc_zero.innerHTML = aLyric[i - 3]
      } else {
        lyc_zero.innerHTML = '&nbsp;';
      }
      if (aLyric[i - 2]) {
        lyc_fir.innerHTML = aLyric[i - 2];
      } else {
        lyc_fir.innerHTML = '&nbsp;';
      }
      if (aLyric[i - 1]) {
        lyc_sec.innerHTML = aLyric[i - 1];
      } else {
        lyc_sec.innerHTML = '&nbsp;';
      }
      if (aLyric[i]) {
        lyc_active.innerHTML = aLyric[i];
        lyc_active.className = 'active';
      } else {
        lyc_active.innerHTML = '&nbsp;';
      }
      if (aLyric[i + 1]) {
        lyc_thi.innerHTML = aLyric[i + 1];
      } else {
        lyc_thi.innerHTML = '&nbsp;';
      }
      if (aLyric[i + 2]) {
        lyc_fif.innerHTML = aLyric[i + 2];
      } else {
        lyc_fif.innerHTML = '&nbsp;';
      }
      if (aLyric[i + 3]) {
        lyc_six.innerHTML = aLyric[i + 3];
      } else {
        lyc_six.innerHTML = '&nbsp;';
      }

      function getCurrent() {
        for (var i = 0; i < aTime.length; i++) {
          if (aTime[i] >= count) {
            return i - 1; //返回i-1 而不是i
          }
        };
      }
    }
    //问题：当音乐被缓存点击大播放按钮的时候，点击暂停之后再次点击开始会重新加载音乐：解决方式：定义一个初次播放音乐并消除缓存的标志变量clearCache 
    var clearCache = true;
    var tempDom = false;
    $playBtn.click(function() {
      if (auTag) {
        if (playBtnTag) {
          ($('#' + playBtnTag).children('.p-icon').children('div').children('audio'))[0].play();
          this.className = 'play-pause';
          //count = 0;
          timer = setInterval(update, 1000);
          auTag = false;
        } else {
          if (clearCache) {
            if (localStorage['localLi']) {
              var id = localStorage['localLi'];
              var auObj = ($('#' + id).children('.p-icon').children('div').children('audio'))[0];
              auObj.src = localStorage['audioSrc'];
              auObj.play();
              this.className = 'play-pause';
              lyric = localStorage['lyc'];
              count = 0;
              timer = setInterval(update, 1000);
              auTag = false;
              clearCache = false;
              tempDom = auObj;
            }
          } else {
            tempDom.play();
            this.className = 'play-pause';
            lyric = localStorage['lyc'];
            timer = setInterval(update, 1000);
            auTag = false;
          }
        }
      } else {
        if (playBtnTag) {
          ($('#' + playBtnTag).children('.p-icon').children('div').children('audio'))[0].pause();
          this.className = 'play';
          //停止定时器为什么歌词不会走 因为取消了定时器去执行updata 这个函数，当前p中显示的内容不会被更新。
          clearInterval(timer);
          auTag = true;
        } else {
          if (tempDom) {
            tempDom.pause();
            this.className = 'play';
            //停止定时器为什么歌词不会走 因为取消了定时器去执行updata 是个函数，当前p中显示的内容不会被更新。
            lyric = localStorage['lyc'];
            clearInterval(timer);
            auTag = true;
          }
        }
      }
    });
  })(window); //auto func
}); //ready

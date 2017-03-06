/* 
 * @Author: XL
 * @Date:   2017-02-24 16:37:32
 * @Last Modified by:   XL
 * @Last Modified time: 2017-03-06 10:55:04
 */

'use strict';
$(function() {
  (function(window) {
    //alert(timer);  //window.onload里面的值是一个局部变量
    //alert(testVar);//写在script里面的是一个全局变量,并且在该js脚本块之前的可以正常使用
    var $listBtn = $('#_song-page');
    var $listDet = $('#detail');
    var $ctrlBar = $('#_play-ctrl');
    var $liClose = $('#_li-close');
    //点击歌单显示歌单详细信息
    /****
      fadeBarTag 是window上的一个全局变量控制
      1、播放列表和歌词出现后使整个播放底部条不会消失
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
    var $listUl = $('#list_ul');
    //jqery 元素集合 和 each的正确用法 自己下去看，，但是没有原声的for循环效率高
    var $a_eveList = $listUl.children('li');
    //控制播放、暂停的变量。
    var $audio = $('#audio'); //audio标签
    var audio = $audio[0]; //js对象
    var $playBtn = $('#_play'); //播放，暂停
    var playBtn = $playBtn[0];
    var auTag = true; //播放，暂停的标志。
    //jq的方式，移入移除显示小图标
    //delegate用于新增和原先页面的元素
    var dblTag = true;
    $listUl.delegate('li', 'mouseover', function() {
      //为什么这里使用 $a_eveList会不行呢，这是因为 $a_eveList是页面原先的元素，但是后来通过同台加载，这些元素被销毁了。
      /*$a_eveList.each(function(index, ele) {*/
      //所以必须使用当前托管的元素。
      $('li').each(function(index, ele) {
        $(ele).removeClass('every');
        $(ele).children('.hover-btn').children('div').removeClass('btns');
      });
      $(this).addClass('every');
      $(this).children('.hover-btn').children('div').addClass('btns');
    });
    //不使用托管对新增的元素无效
    /*$a_eveList.on('mouseover', function() {

    });*/
    $listUl.delegate('li', 'mouseout', function() {
      $('li').each(function(index, ele) {
          $(ele).removeClass('every');
        $(ele).children('.hover-btn').children('div').removeClass('btns');
      });
    });
    /* $a_eveList.on('mouseout', function() {

     });*/
    //当双击的时候，播放该条目的音乐
    //此处需要用到ajax从服务器上获取数据
    //
    //暂时的一个处理的思路是 将播放列表动态的插入到歌单中（使用面向对象的方式，从后台将数据--插入列表的个数和详细的内容），然后再每条列表相应元素下面的歌曲的唯一id，通过这个id获取歌曲地址和歌词文件
    //定义一个变量用于存放每次双击之后双击元素的id,当点击大的播放按钮的时候，能够找到当前播放元素的id
    var playBtnTag = false;
    //
    var lyric = '';
    $listUl.delegate('li', 'dblclick', function() {
      //alert(5415465464);

      //audio.play();
      //$('#audios').play();
      // console.log(aClct);
      var a_audio = $('#list_ul li .p-icon audio');
      a_audio.each(function(index, ele) {
        ele.pause();
      });
      /*var a_audio = aClct.getElementsByTagName('audio');
      for (var i = a_audio.length - 1; i >= 0; i--) {
        a_audio[i].pause();
      };*/
      //将li下面的所有样式移除
      $('li').removeClass('dbl-every');
      //为该条目添加样式
      $(this).addClass('dbl-every');
      var id = $(this).attr('id');
      $.ajax({
        type: "get",
        url: "./data/list/info.php?id=" + id,
        async: "true",
        dataType: "json",
        success: function(json) {
          var data = json[0];
          var id = data.id;
          //歌词
          lyric = data.lyc;
          playBtnTag = id;
          var src = data.src;
          var auObj = ($('#' + id).children('.p-icon').children('div').children('audio'))[0];
          auObj.src = src;
          //写入缓存
          if (window.localStorage) {
            localStorage['lyc'] = data.lyc;
            localStorage['localLi'] = id;
            localStorage['audioSrc'] = auObj.src
          }
          auObj.play();
          //先清除上一次的歌词、动画
          clearInterval(timer);
          //auTag  =falseshi单击大暂停键的时候可以暂停
          auTag = false;
          //大播放键添加暂停样式。
          $playBtn.addClass('play-pause');
          //变更播放条为相应信息
          //$('#pfeImg').attr('src') = data.img;
          $('#pfeImg')[0].src = data.img;
          $('#pBarName').text(data.name);
          $('#pBarSinger').text(data.singer);
          //开启定时器 这个定时器会调用update这个回调函数，注意这是在ajax的回调函数里面，回调函数是当当onreadstatechange这个事件成功之后，在执行该函数，这时页面上的其他东西先于这个回调函数而执行。
          if (window.localStorage) {
            localStorage['pfeSrc'] = $('#pfeImg')[0].src;
            localStorage['pBarName'] = $('#pBarName').text();
            localStorage['pBarSinger'] = $('#pBarSinger').text();
          }
          //歌词脚本
          //将计时器的count清零
          count = 0;
          //
          //定义一个相对全局变量lyric来存储从ajax获取到的数据，每次获取都会更新这个全局变量。而大播放按钮每次点击也会
          update();
          //1秒之后调用定时器，当执行的时候，update所需的变量早已加载完成。最好放在需要变量的后面
          timer = setInterval(update, 1000);
        },
        error: function(xhr) {
          console.log('error');
        }

      });
      //auTag = false;

      //return false;

    }); //delegate
    //下面的一行代码不适用于动态添加的元素。
    /* $a_eveList.on('dblclick', function() {

     });*/
    // var playBtn = $('#_play');
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

    //
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
        /* $p_lyc.each(function(index, ele) {
           $(ele).removeClass('active');
         });*/
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
            return i - 1;
          }
        };
      }
    }
    //问题：当音乐被缓存点击大播放按钮的时候，点击暂停之后再次点击开始会重新加载音乐：尝试解决方式：定义一个初次播放音乐并消除缓存的标志变量
    var clearCache = true;
    var tempDom = false;
    $playBtn.click(function() {

      if (auTag) {
        //audio.play();
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
            //clearCache =false;
            //tempDom = auObj;
          }


        }
      } else {
        //audio.pause();
        if (playBtnTag) {
          ($('#' + playBtnTag).children('.p-icon').children('div').children('audio'))[0].pause();
          this.className = 'play';
          //停止定时器为什么歌词不会走 因为取消了定时器去执行updata 是个函数，当前p中显示的内容不会被更新。
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
          } else {

          }
          /*if (localStorage['localLi']) {
            var id = localStorage['localLi'];
            var auObj = ($('#' + id).children('.p-icon').children('div').children('audio'))[0];
            auObj.src = localStorage['audioSrc'];
            auObj.pause();
            this.className = 'play';
            //停止定时器为什么歌词不会走 因为取消了定时器去执行updata 是个函数，当前p中显示的内容不会被更新。
            lyric = localStorage['lyc'];
            clearInterval(timer);
            auTag = true;
          }*/
        }


      }
    });

  })(window); //auto func


  (function() {
    //console.log(document.getElementsByTagName('iframe'));
    // var par = document.getElementsByTagName('iframe')[0].contentWindow;
    // console.log(par);
    // var son = par.document.getElementById('ifPro');
    //console.log(son);
    /* for (var i = 0; i < son.length; i++) {
       son[i].onclick = function(){
         alert(this);
       }
     };*/
    /*.document.getElementById('ifPro').onclick = function(){
       alert('iframe');
     };*/


  })(); //auto func
}); //ready

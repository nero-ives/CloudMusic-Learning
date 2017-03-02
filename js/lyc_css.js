/* 
 * @Author: bk
 * @Date:   2017-02-25 13:33:49
 * @Last Modified by:   XL
 * @Last Modified time: 2017-02-25 21:25:59
 */

'use strict';
$(function() {
  (function() {

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

    //audio
    var $audio = $('#audio');
    var audio = $audio[0];
    var $playBtn = $('#_play');
    var playBtn = $playBtn[0];
    var auTag = true;
    $playBtn.click(function() {
      if (auTag) {
        audio.play();
        this.className = 'play-pause';
        timer = setInterval(update, 1000);
        auTag = false;
      } else {
        audio.pause();
        this.className = 'play';
        clearInterval(timer);
        auTag = true;
      }
    });
    var lyric = "[00:00.00] 作曲 : 赵照\n[00:01.00] 作词 : 赵照/叶芝\n[00:10.620]\n[00:14.970]当你老了 头发白了\n[00:23.030]睡意昏沉\n[00:29.170]\n[00:30.180]当你老了 走不动了\n[00:37.640]炉火旁打盹 回忆青春\n[00:44.890]\n[00:46.160]多少人曾爱你青春欢畅的时辰\n[00:53.520]爱慕你的美丽 假意或真心\n[01:00.280]\n[01:01.570]只有一个人还爱你虔诚的灵魂\n[01:08.630]爱你苍老的脸上的皱纹\n[01:13.970]\n[01:15.710]当你老了 眼眉低垂\n[01:23.840]灯火昏黄不定\n[01:29.380]\n[01:30.910]风吹过来 你的消息\n[01:39.040]这就是我心里的歌\n[01:47.060]\n[01:58.690]多少人曾爱你青春欢畅的时辰\n[02:06.020]爱慕你的美丽 假意或真心\n[02:12.380]\n[02:13.910]只有一个人还爱你虔诚的灵魂\n[02:20.980]爱你苍老的脸上的皱纹\n[02:26.560]\n[02:28.250]当你老了 眼眉低垂\n[02:36.290]灯火昏黄不定\n[02:42.390]\n[02:43.410]当我老了 我真希望\n[02:51.440]这首歌是唱给你的\n[03:07.560]\n";
    var aTime = [];
    var aLyric = [];
    var re = lyric.split(']');
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
    var timer = null;
    var count = 0;
    //update();
    function update() {
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

  })(); //auto func
}); //ready;

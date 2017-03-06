'use strict';
$(function() {
    (function(window) {
      function $$(id) {
        return document.getElementById(id);
      }
      var ctrlBar = $$('_play-ctrl');
      var lock = $$('_lock');
      var aniBar = $$('_ani-bar');
      var hand = $$('hand');
      var timer = null;
      var bg = $$('bg');
      window.listDetTag = false;
      //小锁 锁住 底部的播放条 使移入移除失效
      var lockBtn = $$('_lock-btn');
      window.lockTag = false;
      //当页加载完毕的时候，将音乐播放条隐藏
      function fn() {
        firTag = true;
      }
      var gbl_timer = setTimeout(function() {
        animate(aniBar, {
          'top': 0
        });
      }, 6000);

      function upshow() {
        animate(aniBar, {
          'top': -47
        });
      }
      //立马取反
      function downfade() {
        animate(aniBar, {
          'top': 0
        });
      }
      //直接使用父亲元素，不要使用子元素，这样当鼠标移除子元素的时候，整个父元素会立马消失，这个不合逻辑
      aniBar.onmouseover = function() {
        clearTimeout(timer);
        upshow();
      }
      aniBar.onmouseout = function() {
          if (lockTag == true) {
            return;
          } else {
            if (listDetTag == false) {
              timer = setTimeout(downfade, 1000);
            } else {
              return;
            }
          }
        }
        //将timer给window
      window.timer = timer;
      //小锁
      $(lockBtn).on('click', function() {
        if (lockTag == false) {
          lockTag = true; //点上小锁之后  lockTag变为true.  就不执行移除下滑的动作。
          this.className = 'lock-up';
          return;
        } else {
          lockTag = false;
          this.className = 'lock-btn';
        }


      });
    })(window); // auto func
  }) //ready

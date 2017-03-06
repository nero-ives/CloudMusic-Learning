'use strict';
//当这个脚本块放在lyc.js这个脚本块的前面的时候，最好不要使用window.onload的这种写法。因为这个onload只能有一个，如果重复定义后面会取代前面的内容。而且影响性能。如果这个脚本块里面（前面）使用了后面js脚本非事件里面变量也会正常执行,因为window.onload会等前面的js脚本执行完之后在执行，，，，
//但是。。。。如果这里换成reday函数，就会出错，因为ready函数还会按照顺序执行。--->前提是非事件里里面的变量啊，当在事件里面给定了一个全局的变量，这里就可以s使用ready函数了
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
      },6000);

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
      //clearTimeout的正确的正确语法:clearTimeout(timeID);
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
      /* lockBtn.addEventListener('click', function() {
         if (lockTag == false) {
           lockTag = true; //点上小锁之后  lockTag变为true.  就不执行移除下滑的动作。
           this.className = 'lock-up';
           return;
         } else {
           lockTag = false;
           this.className = 'lock-btn';
         }
       }, false);*/
    })(window); // auto func
  }) //ready

$(function() {
  //广告
  (function() {
    var $slideBox = $('#slide_loop');
    var $loopAdv = $('#_loop-adv');
    var a_loopImg = $loopAdv[0].children;
    //左右按钮
    var $slide_ctrl = $('#_slide-ctrl');
    var a_ctrlBtns = $slide_ctrl[0].children;
    var $a_ctrlLeft = $('#_slide-ctrl .ctrl-left');
    var $a_ctrlRight = $('#_slide-ctrl .ctrl-right');
    //小圆圈
    var $circles = $('#_loopcircles');
    var a_cir = $circles[0].children;
    //实现点击动作
    var iNow = 0;
    var scrollWidth = a_loopImg[0].offsetWidth;
    for (var i = 1; i < a_loopImg.length; i++) {
      a_loopImg[i].style.left = scrollWidth + 'px';
    };
    //背景dom
    var $banner = $('#banner');
    var $inner_b = $('#inner_b');
    //每个banner对应的颜色
    var bg = ['#915521', '#d8cfc0', '#b5b5b5', '#000', '#3f47a9', '#6e3b44'];

    function fn() {
      tags = true;
    }
    var tags = true;
    for (var i = 0; i < a_ctrlBtns.length; i++) {
      a_ctrlBtns[i].onclick = function(e) {
          //点击左按钮箱左侧弹出左侧内容
          if (this.className == 'ctrl-left') {
            if (tags) {
              slide(iNow, scrollWidth, 'left');
              tags = false;
              //addClass              
              activeBtn(a_cir[iNow].children[0]);
              console.log($banner.css('background-color'));
              $banner.css('background-color', bg[iNow]);
              $inner_b.css('background-color', bg[iNow]);
            }
          } else if (this.className == 'ctrl-right') {
            if (tags) {
              slide(iNow, scrollWidth, 'right')
              tags = false;
              activeBtn(a_cir[iNow].children[0]);
              $banner.css('background-color', bg[iNow]);
              $inner_b.css('background-color', bg[iNow]);
            }
          } else {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var that = parseInt(target.innerHTML);
            if (tags) {
              if (that > iNow) {
                slide(iNow, scrollWidth, 'right', that)
                tags = false; //立马取反
                //addClass
                activeBtn(target);

              } else if (that < iNow) {
                slide(iNow, scrollWidth, 'left', that)
                tags = false;
                activeBtn(target);
              }
              iNow = that;
              $banner.css('background-color', bg[iNow]);
              $inner_b.css('background-color', bg[iNow]);
            }
          }
        } //click
    }; //for
    function activeBtn(target) {
      for (var i = 0; i < a_cir.length; i++) {
        var a = a_cir[i].children[0]
        a.className = '';
      };
      target.className = 'active';
    } //添加小圆圈样式  end
    var timer = null;
    timer = setInterval(autoplay, 5000);

    function autoplay() {
      animate(a_loopImg[iNow], {
        left: -scrollWidth
      });
      iNow++;
      if (iNow > a_loopImg.length - 1) {
        iNow = 0;
      }
      a_loopImg[iNow].style.left = scrollWidth + 'px';
      animate(a_loopImg[iNow], {
        left: 0
      });
      activeBtn(a_cir[iNow].children[0]);
      $banner.css('background-color', bg[iNow]);
      $inner_b.css('background-color', bg[iNow]);
    } //atuoplay
    $slideBox.mouseover(function() {
      clearInterval(timer);
    });
    $slideBox.mouseout(function() {
      timer = setInterval(autoplay, 5000);
    });
    //封装左滑动和右滑动的函数
    function slide(iTag, value, type, circle) {
      var move = 0;
      if (arguments.length < 4) {
        if (type == 'left') {
          move = -value;
        } else {
          move = value;
        }
        animate(a_loopImg[iTag], {
          left: move
        });
        if (type == 'left') {
          iTag++;
          if (iTag > a_loopImg.length - 1) {
            iTag = 0;
          }
        } else {
          iTag--;
          if (iTag < 0) {
            iTag = a_loopImg.length - 1;
          }
        }
        a_loopImg[iTag].style.left = -move + 'px';
        animate(a_loopImg[iTag], {
          left: 0
        }, fn);
        //addClass              
      } else {
        if (circle > iTag) {
          move = -value;
        } else {
          move = value;
        }
        animate(a_loopImg[iTag], {
          left: move
        });
        a_loopImg[circle].style.left = -move + 'px';
        animate(a_loopImg[circle], {
          left: 0
        }, fn);
      }
      iNow = iTag;
    } //slide_end
  })() //auto func
}); //ready

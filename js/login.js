//一定要在页面加载完dom之后执行函数
$(function() {
  var $user = $('#_user-login');
  var $login = $('#_login-in');
  var $close = $('#_login-close');
 
  //首屏的宽高
  function getWH() {
    if (document.compatMode === "CSS1Compat") // 标准浏览器
    {
      return { //ie 5,6,7,8 chrome ff
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
    return { // 怪异浏览器
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
  var cw = getWH().width / 2;
  var ch = getWH().height / 2;
  //登录创的宽度
  var log_w = $login.width() / 2;
  var log_h = $login.height() / 2;
  var pos_left = cw - log_w;
  var pos_top = ch - log_h;
  $user.on('click', function() {
    $login.css({
      left: pos_left,
      top: pos_top,
    });
    $login.css('display', 'block');
  });
  $close.on('click', function() {
    $login.css('display', 'none');
  });
});

//移动login-top
$(function(){
	(function(){
		var loginTop = $('#_login-top')[0];
		var login = $('#_login-in')[0];
		loginTop.onmousedown=function(e)
		{
			this.style.cursor = 'move';
			var event=e||event;
			var disX=event.clientX-login.offsetLeft;
			var disY=event.clientY-login.offsetTop;
			document.onmousemove=function(e)
			{
				var event=e||event;
				//解决超出浏览器窗口 物体消失的问题
				var left=event.clientX-disX;
				var top=event.clientY-disY;
				if(left<0)
				{
					left=0;
				}else if(left>document.documentElement.clientWidth-login.offsetWidth)
				{
					left=document.documentElement.clientWidth-login.offsetWidth;
				}
				if(top<0)
				{
					top=0;
				}else if(top>document.documentElement.clientHeight-login.offsetHeight)
				{
					left=document.documentElement.clientHeight-login.offsetHeight;
				}
				login.style.left=left+'px';
				login.style.top=top+'px';
			}
			document.onmouseup=function()
			{
				document.onmousemove=null;
				document.onmousedown=null;
			}
			return false;//解决火狐下的拖拽出现影子的bug; 阻止默认事件
		}
	})()//auto func
})//ready


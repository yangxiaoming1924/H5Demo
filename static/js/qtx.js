

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
   //alert(navigator.userAgent); 
   
   //add a new meta node of viewport in head node
	head = document.getElementsByTagName('head');
	viewport = document.createElement('meta');
	viewport.name = 'viewport';
	viewport.content = 'target-densitydpi=device-dpi, width=' + 640 + 'px, user-scalable=no';
	head.length > 0 && head[head.length - 1].appendChild(viewport);    

}

function fpMusic(){
	//加载音乐
	$('#fpMusicAudio').get(0).play();
	
	
	$('#fpMusic').click(function(){
		if($(this).hasClass('stopped')){
			$(this).removeClass('stopped');
			$('#fpMusicAudio').get(0).play();
		}
		else{
			$(this).addClass('stopped');
			$('#fpMusicAudio').get(0).pause();
		}
	})
}

//主函数
function fpExtend(){
	$('[data-fp-animate]').each(function(){
			$(this).css('visibility','hidden');
			//$(this)[0].style.animationName= $(this).data('fp-animate');
			$(this)[0].style.animationDelay=$(this).data('fp-delay');
			$(this)[0].style.animationDuration=$(this).data('fp-duration') ? $(this).data('fp-duration') : '1s';
			$(this)[0].style.animationIterationCount=$(this).data('fp-iteration');
		})
}
function fpRender(){
	$('.fp-section').eq(0).find('[data-fp-animate]').each(function(){
		$(this).css('visibility','visible');
		$(this)[0].style.animationName= $(this).data('fp-animate');
	})
}
function fpLoad(index){
	$('.fp-section').eq(index-1).find('[data-fp-animate]').each(function(){
		$(this).css('visibility','visible');
		$(this)[0].style.animationName= $(this).data('fp-animate');
	})
}
function fpLeave(index){
	$('.fp-section').eq(index-1).find('[data-fp-animate]').each(function(){
		var obj = $(this);
		$(this)[0].style.animationName= '';
		setTimeout(function(){
			obj.css('visibility','hidden');
		},1000)
	})
}
function fpLoading(myfp){
	//进度加载
	var images =new Array(),count = 0;
    
    $('html,body').find('img').each(function(i) {
        images[i]=$(this).attr('src');
    });
    for (var i = 0; i < images.length; i++) {
        img = new Image;
        img.src = images[i];
        img.onload = function() {
            count++;
	        var per = Math.floor(count/images.length*100);
	        $('#fpLoadingNum').text(per);  
	        $('.fpWave').css('margin-top',-2*per);
	        
	        //当加载完成以后要执行的操作
            if(count==images.length)
            {     
            	//return false;
            	setTimeout(function(){
            		
            		$('#fpLoading').fadeOut(100,function(){
			            $('#fpLayout').fadeIn();
			            fpExtend();
			            fpMusic();
			            myfp(); 
			            //$.fn.fullpage.setAllowScrolling(false);
			        });
            		
	                 
            	},500);
            	 
            }
        }
    };
    
    	//添加删除滚轮的操作
//	$('.page2 ul').hover(function(){
//		
//		$.fn.fullpage.setAllowScrolling(false);
//	},
//	function(){
//		$.fn.fullpage.setAllowScrolling(true);
//	})

    function audioAutoPlay(id) {
        var audio = document.getElementById(id),
            play = function () {
                audio.play();
                document.removeEventListener("touchstart", play, false);
            };
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            play();
        }, false);
        document.addEventListener('YixinJSBridgeReady', function () {
            play();
        }, false);
        document.addEventListener("touchstart", play, false);
    }
    audioAutoPlay('fpMusicAudio');
	
}
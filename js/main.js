// var calculate_size = function(){
// 			var BASE_FONT_SIZE = 100;
// 			var docEl = document.documentElement,
// 				clientWidth = docEl.clientWidth;
// 				if(clientWidth>720){
// 					clientWidth=720
// 				}
// 			if (!clientWidth) return;
// 			docEl.style.fontSize = BASE_FONT_SIZE * (clientWidth / 720) + 'px';
// 		};
// 		// 如果浏览器不支持addEventListener，则中止
// 		if (document.addEventListener) {
// 			var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
// 			window.addEventListener(resizeEvt, calculate_size, false);
// 			document.addEventListener('DOMContentLoaded', calculate_size, false);
// 			calculate_size();
// 		}
		
//验证
function isEmpty(obj){
	if($.trim($(obj).val())==""){
	   return true;	
	}
	return false;
}

function validateEmpty(obj,msg,val){
   var	val=val || "";
	var $msg=$(obj).parent().next().find(".Validform_checktip");
		if($.trim($(obj).val())==val){
			$msg.html(msg);
	        $(obj).addClass("error");
		}else{
			$msg.html("");
            $(obj).removeClass("error");			
		}

	}

function validateExpo(obj,msg){
	var $msg=$(obj).closest(".chkexpowrap").next().find(".Validform_checktip");
		if(!$(obj).filter(":checked").length){
			$msg.html(msg);
	        $(obj).addClass("error");
		}else{
			$msg.html("");
            $(obj).removeClass("error");	
		}
	}

 function validatePhone(obj,msg){
    var reg=/^[0-9]*[-]*[0-9]*$/
    var $msg=$(obj).parent().next().find(".Validform_checktip");
		if(!reg.test($(obj).val())){
			$msg.html(msg);
	        $(obj).addClass("error");
		}else{
			$msg.html("");
            $(obj).removeClass("error");
		}
 }
 function validateTelephone(obj,msg){
    var reg=/^([+]\d)*(\d*-\d*)+$/
    var $msg=$(obj).parent().next().find(".Validform_checktip");
		if(!reg.test($(obj).val())){
			$msg.html(msg);
	        $(obj).addClass("error");
		}else{
			$msg.html("");
            $(obj).removeClass("error");
		}
 }


 function validateEmail(obj,msg){
    var reg=/^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/
    var $msg=$(obj).parent().next().find(".Validform_checktip");
   
	 if(!reg.test($(obj).val())){
			$msg.html(msg);
	        $(obj).addClass("error");
		}else{
			$msg.html("");
            $(obj).removeClass("error");
		}
 }


$(".w-form-item input").on('change blur',function(){
		var id=$(this).attr("id");
		if(id=="name"){
		   validateEmpty("#name","请输入用户名");
		   
		}else if(id=="company"){
		   validateEmpty("#company","请输入公司名");
			
		}else if(id=="depart"){
		   validateEmpty("#depart","请输入部门");
			
		}else if(id=="job"){
		   validateEmpty("#job","请输入职位");
			
		}else if(id=="address"){
		   validateEmpty("#address","请输入公司地址");
			
		}else if(id=="mobile"){
		  if(isEmpty("#mobile")){
		   validateEmpty("#mobile","请输入手机号");
		 }else{
		   validatePhone("#mobile","请正确填写您的手机号码");
           		  	
		  }
			
		}else if(id=="telephone"){
		   validatePhone("#telephone","请按格式正确填写您的电话号码");
			
		}else if(id=="email"){
			if(!isEmpty("#email")){
		     validateEmail("#email","请按格式正确填写您的邮箱");
           		  	
		  }else{
		     $("#email").removeClass("error");
		     $("#msg_email").html("");
		  	
		  }

		}
   });

$("#gz_dengji").click(function(){
	validateExpo(".chk-expo","请至少选择一个展会");
   $(".w-form-item input").trigger("change");

  if($(".error").length){
      return false;	
   }else{
   	  return true;
   }
   
});

var wjs = {
    $: function(id) {
      return document.getElementById(id);
    },
    
    lefttime: function() {
      // var endtime = new Date('2015 / 03 / 26, 10:00:00');
      var endtime = new Date('2016/07/20, 09:00:00');
      var nowtime = new Date();
      var leftsecond = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
      var _d = parseInt(leftsecond / 3600 / 24);
      var _h = parseInt((leftsecond / 3600) % 24);
      var _m = parseInt((leftsecond / 60) % 60);
      var _s = parseInt(leftsecond % 60);
      var timer;

      if (leftsecond > 0) {
        wjs.$('lefttime').innerHTML = '<span>' + _d + '<sup>天</sup></span><span>' + _h + '<sup>小时</sup></span><span>' + _m + '<sup>分钟</sup></span>';
      } else {
        wjs.$('lefttime').innerHTML = '<span class="timeout"></span>';
        clearTimeout(timer);
      }

    timer = setTimeout(wjs.lefttime, 1000*60);
    }
  };

  if($("#lefttime").length){
  wjs.lefttime();
  	
  }


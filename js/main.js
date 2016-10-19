    $.tabs = function(tabs, tabcon, options) {
        var defaults = {
            event: "click",
            index: 0
        };
        var setting = $.extend({}, defaults, options);

        $(tabcon).eq(setting.index).show();
        $(tabs).children().on(setting.event, function() {
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $(tabcon).hide().eq(index).show();
        })
    }

    $.tabs(".fptype", ".have-invoice", { index: 1 });
    $.tabs(".invoice", ".invoice-con");
    $.tabs(".pay-tabs", ".pay-tabs-con", { index: 2 });
    
    //给支付方式隐藏域设值 
    $(".pay-tabs span").click(function(){
        var index=$(this).index();
        if(index==0){
          $("input[name=payType]").val(3);
        }/*else if(index==1){
          $("input[name=payType]").val(2);
        }*/else{
          $("input[name=payType]").val(1);

        }
    });
 



    //给发票类型隐藏域设值 
    $(".invoice span").click(function() {
        $("input[name=invoiceType]").val($(this).index() + 1);
    });
	
 $("#country").change(function(){
	 if($(this).val()==1){
		 $("#province").show().css("marginLeft","10px");
	  }else{
		  $("#province").hide();
	   }
	 });	
	



//验证
function isEmpty(obj){
	if($.trim($(obj).val())==""){
	   return true;	
	}
	return false;
}



function validateEmpty(obj,msg,val){
	$(obj).on('blur change',function(){
	 	val= val||"";
	    var $msg=$('<span class="Validform_checktip"></span>');
			$(obj).next(".Validform_checktip").remove();
		if($.trim($(obj).val())==val){
			$msg.html(msg).insertAfter($(this));
	        $(obj).addClass("error");
		}else{
          $(obj).removeClass("error");	
		}
	});
}

function validateExpo(obj,msg){
       var $msg=$('<span class="Validform_checktip"></span>');
			$(".checkin-expo").closest(".w-form-item").find(".Validform_checktip").remove();
		if(!$(obj).filter(":checked").length){
			$msg.html(msg).insertAfter($(".checkin-expo"));
	        $(obj).addClass("error");
		}else{
            $(obj).removeClass("error");	
		}

	}

 function validatePhone(obj){
 	$(obj).on('blur change',function(){
    var reg=/^[0-9]*[-]*[0-9]*$/
    var $msg=$('<span class="Validform_checktip"></span>');
	    $(obj).next(".Validform_checktip").remove();
 		if($.trim($(obj).val())==""){
			$msg.html("请输入手机号").insertAfter($(this));
	        $(obj).addClass("error");
		}else if(!reg.test($(obj).val())){
			$msg.html("请正确填写您的手机号码").insertAfter($(this));
	        $(obj).addClass("error");
		}else{
            $(obj).removeClass("error");	
		}

 		
 	});  
 }

 function validateTelephone(obj,msg){
 	$(obj).on('blur change',function(){
 		 var reg=/^([+]\d)*(\d*-\d*)+$/
        var $msg=$('<span class="Validform_checktip"></span>');
			$(obj).next(".Validform_checktip").remove();
		if(!reg.test($(obj).val()) && $(obj).val()!=""){
			$msg.html(msg).insertAfter($(this));
	        $(obj).addClass("error");
		}else{
            $(obj).removeClass("error");
		 }
 	});
   
 }


 function validateEmail(obj,msg1,msg2){
 	$(obj).on('blur change',function(){
 		 var reg=/^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/
    var $msg=$('<span class="Validform_checktip"></span>');
		$(obj).next(".Validform_checktip").remove();
     	if($.trim($(obj).val())==""){
     		$msg.html(msg1).insertAfter($(this));
             $(obj).addClass("error");
     	}else if(!reg.test($(obj).val()) && $(obj).val()!=""){
			$msg.html(msg2).insertAfter($(this));
	        $(obj).addClass("error");
		}else{
            $(obj).removeClass("error");
		}
 	});
   
 }

 //支付方式验证
 function payWayCheck(){
     if(!$(".pay-tabs span.active").length){
     var $paymsg=$('<span class="pay_checktip"></span>');
     $(".pay_checktip").remove();
      $paymsg.html("请选择支付方式").insertAfter($(".pay-tabs"));
          $(".pay-tabs").addClass("error");
    }else{
          $(".pay_checktip").remove();
          $(".pay-tabs").removeClass("error");  
    }
 }

validateEmpty("#userName","请输入姓名");
 validateEmpty("#telephone","请输入手机/电话");
 validateEmail("#email","请输入邮箱","不是正确的邮箱");
validateEmpty("#companyName","请输入公司名称");
validateEmpty("#address","请输入邮寄地址");
validateEmpty("input[name=invoiceCompany]","请输入开票公司名称");
validateEmpty("#address","请输入邮寄地址");

 $(".form .txt").on('focus',function(){
    $(this).next(".Validform_checktip").remove();
 });

 $("#ticketForm").on('click','.Validform_checktip',function(){
 	$(this).prev("input").focus();
 })



$("#ticketSub").click(function(){
 $(".form .txt").trigger("change");
 payWayCheck();
  if($(".error").length){
      return false;	
   }else{
   	  return true;
   }
 
   
});




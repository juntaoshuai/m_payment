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
    $(".pay-tabs span").click(function() {
        var index = $(this).index();
        if (index == 0) {
            $("input[name=payType]").val(3);
        }
        /*else if(index==1){
                  $("input[name=payType]").val(2);
                }*/
        else {
            $("input[name=payType]").val(1);

        }
    });


    //给发票类型隐藏域设值 
    $(".invoice span").click(function() {
        $("input[name=invoiceType]").val($(this).index() + 1);
    });

    //表单验证
    function validateEmpty(obj, msg, val) {
        $(obj).on('blur change', function() {
            val = val || "";
            var $msg = $('<span class="Validform_checktip"></span>');
            $(obj).next(".Validform_checktip").remove();
            if ($.trim($(obj).val()) == val) {
                $msg.html(msg).insertAfter($(this));
                $(obj).addClass("error");
            } else {
                $(obj).removeClass("error");
            }
        });
    }

    function validateExpo(obj, msg) {
        var $msg = $('<span class="Validform_checktip"></span>');
        $(".checkin-expo").closest(".w-form-item").find(".Validform_checktip").remove();
        if (!$(obj).filter(":checked").length) {
            $msg.html(msg).insertAfter($(".checkin-expo"));
            $(obj).addClass("error");
        } else {
            $(obj).removeClass("error");
        }

    }

    function validatePhone(obj) {
        $(obj).on('blur change', function() {
            var reg = /^[0-9]*[-]*[0-9]*$/
            var $msg = $('<span class="Validform_checktip"></span>');
            $(obj).next(".Validform_checktip").remove();
            if ($.trim($(obj).val()) == "") {
                $msg.html("请输入手机号").insertAfter($(this));
                $(obj).addClass("error");
            } else if (!reg.test($(obj).val())) {
                $msg.html("请正确填写您的手机号码").insertAfter($(this));
                $(obj).addClass("error");
            } else {
                $(obj).removeClass("error");
            }

        });
    }

    function validateTelephone(obj, msg) {
        $(obj).on('blur change', function() {
            var reg = /^([+]\d)*(\d*-\d*)+$/
            var $msg = $('<span class="Validform_checktip"></span>');
            $(obj).next(".Validform_checktip").remove();
            if (!reg.test($(obj).val()) && $(obj).val() != "") {
                $msg.html(msg).insertAfter($(this));
                $(obj).addClass("error");
            } else {
                $(obj).removeClass("error");
            }
        });

    }

    function validateEmail(obj, msg1, msg2) {
        $(obj).on('blur change', function() {
            var reg = /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/
            var $msg = $('<span class="Validform_checktip"></span>');
            $(obj).next(".Validform_checktip").remove();
            if ($.trim($(obj).val()) == "") {
                $msg.html(msg1).insertAfter($(this));
                $(obj).addClass("error");
            } else if (!reg.test($(obj).val()) && $(obj).val() != "") {
                $msg.html(msg2).insertAfter($(this));
                $(obj).addClass("error");
            } else {
                $(obj).removeClass("error");
            }
        });

    }

    //支付方式验证
    function payWayCheck() {
        if (!$(".pay-tabs span.active").length) {
            var $paymsg = $('<span class="pay_checktip"></span>');
            $(".pay_checktip").remove();
            $paymsg.html("请选择支付方式").insertAfter($(".pay-tabs"));
            $(".pay-tabs").addClass("error");
        } else {
            $(".pay_checktip").remove();
            $(".pay-tabs").removeClass("error");
        }
    }

    validateEmpty("#userName", "请输入姓名");
    validateEmpty("#telephone", "请输入手机/电话");
    validateEmail("#email", "请输入邮箱", "不是正确的邮箱");
    validateEmpty("#companyName", "请输入公司名称");
    validateEmpty("#address", "请输入邮寄地址");
    validateEmpty("input[name=invoiceCompany]", "请输入开票公司名称");
    validateEmpty("input[name=dutyNumber]", "请输入税号");

    $(".form .txt").on('focus', function() {
        $(this).next(".Validform_checktip").remove();
    });

    $("#orderForm,#mediaOrderForm").on('click', '.Validform_checktip', function() {
        $(this).prev("input").focus();
    })



    $("#orderSub").click(function() {
        $(".form .txt").trigger("change");
        payWayCheck();
        if ($(".error").length) {
            return false;
        } else {
            var url = $("#mediaOrderForm").attr("action"),
                data = encodeURI($("#mediaOrderForm").serialize());
            $.ajax({
                url: "js/ajax2.txt",
                data: data,
                success: function(data) {
                    var data = $.parseJSON(data);
                    if (data.status == "y") {
                        if(data.payType =="3"){ 
                            window.location.href = "http://www.ofweek.com/alipayapi.jsp?WIDout_trade_no="+data.orderno+"&WIDsubject="+encodeURIComponent(data.ticketTypeName)+"&WIDtotal_fee="+data.totalPrice+"&WIDbody="+encodeURIComponent(data.meetingTypeName);
                        }
                        window.location.href = "media_success.html?&meetingTypeName=" + data.meetingTypeName + "&ticketTypeName=" + data.ticketTypeName;
                    }
                }
            });
        }

    });

    //媒体订单提交
    $("#mediaOrderSub").click(function() {
        $(".form .txt").trigger("change");
        if ($(".error").length) {
            return false;
        } else {
            var url = $("#mediaOrderForm").attr("action"),
                data = encodeURI($("#mediaOrderForm").serialize());
            $.ajax({
                url: "js/ajax2.txt",
                data: data,
                success: function(data) {
                    var data = $.parseJSON(data);
                    if (data.status == "y") {
                        window.location.href = "media_success.html?&meetingTypeName=" + data.meetingTypeName + "&ticketTypeName=" + data.ticketTypeName;
                    }
                }
            });

        }


    });

    //票价数量操作
    $(function() {

        //计算价格
        function countPrice($num) {
            var singlePirce = $num.closest("li").find("input[name=price]").val(),
                zhe = $num.closest("li").find("input[name=discount]").val();
            totalPrice = singlePirce * zhe * $num.html();
            if (singlePirce == 0) { //媒体票
                $("#total").html(0);
            } else {
                $("#total").html(totalPrice);
            }
        }

        function setTicketInfo(numobj) {
            $("#sub_ticketname").val(numobj.closest("li").find(".ticketname").html()),
                $("#sub_price").val(numobj.closest("li").find("input[name=price]").val()),
                $("#sub_discount").val(numobj.closest("li").find("input[name=discount]").val()),
                $("#sub_remark").val(numobj.closest("li").find(".remark").html()),
                $("#sub_num").val(numobj.closest("li").find(".num").html());
        }

        //数量操作（票种只能单选,选择一种票后，其它票数量自动变为0）
        function numOpera(addobj, cutobj, inputobj) {
            var minNum = 1,
                maxNum = 999;
            //数量增
            $("#ticketForm").on('click', addobj, function() {
                var $num = $(this).prev(),
                    cur = $num.html();
                cur++;
                if (cur > 0) {
                    $num.prev().show();
                } else if (cur > maxNum) {
                    $(this).hide();
                } else {
                    $(this).show();

                }
                $("#ticketForm").find(".num").html(0).prev().hide();
                $num.html(cur).prev().show();
                countPrice($num);
                setTicketInfo($num);
            });

            //数量减
            $("#ticketForm").on('click', cutobj, function() {
                var $num = $(this).next(),
                    cur = $num.html();
                cur--;
                $num.html(cur);
                if (cur < minNum) {
                    $(this).hide();
                } else {
                    $(this).show();

                }
                countPrice($num);
            });
        }

        numOpera(".add", ".cut", ".num");

        //ajax读取票种信息


        /* $.getJSON('http://www.ofweek.com/queryTicketAjax.do?meetingType=1', function(data) {
             $("#ticketForm .tab-hd").after($("#temp").render(data));
         });*/

        //表单提交时把门票信息传到订单确认页
        $("#ticket-sub").click(function() {
            var url = '?sub_ticketname=' + $("#sub_ticketname").val() + '&sub_price=' + $("#sub_price").val() + '&sub_discount=' + $("#sub_discount").val() + '&sub_remark=' + $("#sub_remark").val() + '&sub_num=' + $("#sub_num").val();
            if ($("#total").html() > 0) {
                url = "http://192.168.23.1:8080/m_payment/order.html" + url;
            } else {
                url = "http://192.168.23.1:8080/m_payment/media_order.html" + url;
            }

            $("#ticketForm").attr("action", url).submit();

        });








    });

    //JS根据key值获取URL中的参数值及把URL的参数转换成json对象
    function parseQueryString(url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
            arr_url = reg_url.exec(url),
            ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1],
                result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }

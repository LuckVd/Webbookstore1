jQuery( document ).ready(function() {


    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');


    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    jQuery.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    //这上面的代码都是为了解决跨域问题，如果不用的话会引起跨域访问错误




    $("button:has(i)").click(function() {
        $(this).closest("#cart").slideToggle();
    })

     // 添加 减少的函数实现，最后返回的是数量（不能小于1）
    $(".ddd").on("click", function () {
        var $button = $(this);
        var $input = $button.closest('.sp-quantity').find("input.quntity-input");

        $input.val(function(i, value) {
            var value_r=+value + (1 * +$button.data('multi'))
            return Math.max(value_r,1);
        });
    });

    $.ajax({
        type: 'post',
        url: 'cart_show',
        dataType: "JSON",
        success: function (data) {
            console.log("success cart")
            console.log(data)
            var num_of_books=0
             $("div.business").each(function(){
                 $(this).find("img").attr("src",data.pic_src[num_of_books]);
                 $(this).find("h5").text(data.name[num_of_books])
                 $(this).find("div.detail").find("span").text(data.description[num_of_books])
                 $(this).find("strong").text(data.price[num_of_books])
                 $(this).find("input").val(data.num[num_of_books])
                 num_of_books++;
             })

        },
        error: function () {
            console.log("failed")
        }
    });

});


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

    $.ajax({
        type: 'post',
        url: 'bestsellurl',
        dataType: "JSON",
        success: function (data) {
            console.log("success")
            var num_of_books=0
             $("#tab-1").find("div.active").each(function(){
                 $(this).find("img").attr("src",data.pic_src[num_of_books]);
                 $(this).find("h5").find("a").text(data.name[num_of_books])
                 $(this).find("div.product-detail").find("p").text(data.description[num_of_books])
                 $(this).find("strong").text(data.price[num_of_books])
                 num_of_books++;
             })

        },
        error: function () {
            console.log("failed")
        }
    });

})
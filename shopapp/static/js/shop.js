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


    //获得所有作者的信息，根据个数动态添加到左边栏目
    $.ajax({
        type: 'post',
        url: 'author_list',
        dataType: "JSON",
        success: function (data) {
            var author_len = data.name.length;
            console.log(author_len);
            for(var i=0;i<author_len;i++) {
             $('#Author').append('<li><a a href="#">' + data.name[i] + '</a></li> ');
          }

        },
        error: function () {
            console.log("failed")
        }
    });
    //获得书籍信息
    $.ajax({
        type: 'post',
        url: 'book_list',
        dataType: "JSON",
        success: function (data) {
             var num_of_books=0
             $("#book_list").find("div.product-box").each(function(){
                 $(this).find("img").attr("src",data.pic_src[num_of_books]);
                 $(this).find("h5").find("a").text(data.name[num_of_books])
                 $(this).find("div.product-detail").find("p").text(data.description[num_of_books])
                 $(this).find("strong").text(data.price[num_of_books])
                 num_of_books++;
             })

        },
        error: function () {
            console.log("book_detail_failed")
        }
    });

})
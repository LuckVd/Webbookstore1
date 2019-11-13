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

    var booklist;
    var curr_id;

    function display_bolist(){
        $.ajax({
        type: 'post',
        url: '/temp_get/',
         data: "",
        dataType: "text",
        success: function (data) {
            curr_id=data.replace(/[^0-9]/ig,"")
           $("#book_detail").find("#book_stock").text(booklist.book_stock[curr_id]);
           $("#book_detail").find("#book_name").text(booklist.book_name[curr_id]);
           $("#tab-2").find("#book_author").text(booklist.book_author[curr_id]);
           $("#tab-1").find("#book_describe").text(booklist.book_describe[curr_id]);
            $("#book_image").attr("src",booklist.book_image[curr_id]);
        },
        error: function () {
         }
        });
    }



    $.ajax({
        type: 'post',
        url: '/search/',
        dataType: "JSON",
        data: {table: 'book'},
        success: function (data) {
            booklist = data;
            display_bolist()
        },
        error: function () {
            console.log("book_detail_failed")
        }
    });


    $(".ddd").on("click", function () {
        var $button = $(this);
        var $input = $button.closest('.sp-quantity').find("input.quntity-input");

        $input.val(function (i, value) {
            var value_r = +value + (1 * +$button.data('multi'))
            return Math.max(value_r, 1);
        });
    });

})
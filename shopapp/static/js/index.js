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
    var maxlen =20;
    $.ajax({
        type: 'post',
        url: '/search/',
        dataType: "JSON",
        data: {table: 'book'},
        success: function (data) {
            var num_of_books = 0
            console.log(typeof (data.book_name[num_of_books]));
            $("#tab-1").find("div.owl-item ").each(function () {
                $(this).find("img").attr("src", data.book_image[num_of_books]);
                $(this).find("h5").find("a").text(data.book_name[num_of_books].substring(0,maxlen) + "...");
                $(this).find("div.product-detail").find("p").text(data.book_describe[num_of_books].substring(0,maxlen) + "...");
                $(this).find("strong").text(data.book_price[num_of_books]);
                num_of_books++;
            })
                num_of_books=5;
              $("#release-thumb").find("a").each(function () {
                  $(this).find("img.book_image").attr("src",data.book_image[num_of_books]);
                  $(this).find("span.book_name").text(data.book_name[num_of_books].substring(0,5));
                  num_of_books++;
              });
                num_of_books=5;
              $("div.upcoming-slider").find("div.item").each(function () {
                  $(this).find("img.book_image").attr("src",data.book_image[num_of_books]);
                  $(this).find("a.book_name").text(data.book_name[num_of_books].substring(0,maxlen)+ "...");
                  $(this).find("p.book_describe").text(data.book_describe[num_of_books].substring(0,maxlen)+ "...");
                  $(this).find("span.book_price").text(data.book_price[num_of_books]);
                  num_of_books++;
              });

             var length = data.book_name.length-1;
             $("#book_list").find("div.s-product").each(function () {
                 $(this).find("img").attr("src",data.book_image[length]);
                 $(this).find("p.book_describe").text(data.book_describe[length].substring(0,maxlen)+ "...");
                 $(this).find("a.book_name").text(data.book_name[length].substring(0,maxlen)+ "...");
                 $(this).find("span.book_author").text(data.book_author[length].substring(0,maxlen));
                 length--;
            })

        },
        error: function () {
            console.log("failed")
        }
    });



// 添加 减少的函数实现，最后返回的是数量（不能小于1）
//      $(this).on("click",".ddd", function () {
//          console.log("pl")
//         var $button = $(this);
//         var $input = $button.closest('.sp-quantity').find("input.quntity-input");
//
//         $input.val(function(i, value) {
//
//             return +value + (1 * +$button.data('multi'));
//         });
//     });
//
//     $("a[herf='book-detail.html']").on("click", function () {
//         var bookname=$(this).text();
//         alert(bookname);
//          $.ajax({
//             type: 'post',
//             url: '/temp/',
//             dataType: "JSON",
//             data: {
//                 table: 'user',
//                 data: bookname
//             },
//             success: function (data) {
//                 alert("123")
//             },
//             error: function () {
//                  alert("456")
//             }
//         });
//     })

})
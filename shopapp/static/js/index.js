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

    var user_table;//用来保存获取的用户表
    $.ajax({
        type: 'post',
        url: '/search/',
        dataType: "JSON",
        data: {table: 'book'},
        success: function (data) {
            var num_of_books = 0
            $("#tab-1").find("div.owl-item ").each(function () {
                $(this).find("img").attr("src", data.book_image[num_of_books]);
                $(this).find("h5").find("a").text(data.book_name[num_of_books]);
                $(this).find("div.product-detail").find("p").text(data.book_describe[num_of_books]);
                $(this).find("strong").text(data.book_price[num_of_books]);
                num_of_books++;
            })
                num_of_books=5;
              $("#release-thumb").find("a").each(function () {
                  $(this).find("img.book_image").attr("src",data.book_image[num_of_books]);
                  $(this).find("span.book_name").text(data.book_name[num_of_books]);
                  num_of_books++;
              });
                num_of_books=5;
              $("div.upcoming-slider").find("div.item").each(function () {
                  $(this).find("img.book_image").attr("src",data.book_image[num_of_books]);
                  $(this).find("a.book_name").text(data.book_name[num_of_books]);
                  $(this).find("p.book_describe").text(data.book_describe[num_of_books]);
                  $(this).find("span.book_price").text(data.book_price[num_of_books]);
                  num_of_books++;
              });

             var length = data.book_name.length-1;
             $("#book_list").find("div.s-product").each(function () {
                 $(this).find("img").attr("src",data.book_image[length]);
                 $(this).find("p.book_describe").text(data.book_describe[length]);
                 $(this).find("a.book_name").text(data.book_name[length]);
                 $(this).find("span.book_author").text(data.book_author[length]);
                 length--;
            })

        },
        error: function () {
            console.log("failed")
        }
    });

     $.ajax({
            type: 'post',
            url: '/search/',
            dataType: "JSON",
            data: {table: 'user'},
            success: function (data) {
               user_table= data;
            },
            error: function () {
                console.log("无法获取用户表")
            }
        });


      function display_bolist(){
        $.ajax({
        type: 'post',
        url: '/temp_get/',
         data: {"data_method":"user_id"},
        success: function (data) {
            alert(data)
        },
        error: function () {
         }
        });
    }


    function register(senddata) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8000/add/',
            dataType: "JSON",
            data: {
                table: 'user',
                data: senddata
            },
            success: function (data) {
                if (data == '1') {
                    alert("注册成功");
                    $("#register-modal").modal('hide');
                } else {
                    alert("注册失败，写入数据库失败")
                }
            },
            error: function () {
                alert("注册失败，请检查网络")
            }
        });
    }

    //注册事件触发
    $("#btn_register").click(function () {
        var Username = $(this).closest(".sending-form").find("input[placeholder='UserName']").val();
        var Email = $(this).closest(".sending-form").find("input[placeholder='Email']").val();
        var Password = $(this).closest(".sending-form").find("input[placeholder='Password']").val();
        var Password_again = $(this).closest(".sending-form").find("input[placeholder='PasswordAgain']").val();

        console.log(Username);
        //确认输入无误时，将信息传递给后台
        if (Password == Password_again) {
            data = new Object();
            data.user_name = Username;
            data.user_password = Password;
            data.user_email = Email;
            data.user_is_admin = '0'
            data = JSON.stringify(data)
            console.log(data);
            register(data);
        } else {
            alert("密码输入不一致");
        }

    })

    //通过临时信息保存登录用户
      function send_temp(data_temp){
        $.ajax({
        type: 'post',
        url: '/temp_save/',
         data: data_temp,
        dataType: "JSON",
        success: function (data) {
        },
        error: function () {
         }
        });
    }

    //登陆事件触发



    function judge_user(username,password) {
        var len=user_table.id.length;
        for(var i=0;i<len;i++)
        {

            if(username==user_table['user_name'][i]&&password==user_table['user_password'][i])
            {
                if(user_table['user_is_admin'][i]=="1")
                    return -1;
                return i;
            }
        }
        return -2;
    }


    $("#btn_login").click(function () {
        var Username = $(this).closest(".sending-form").find("input[placeholder='UserName']").val();
        var Password = $(this).closest(".sending-form").find("input[placeholder='Password']").val();

        var logindata=judge_user(Username,Password)
         if(logindata==-1){
            //管理员登陆成功
             alert("管理员登陆成功")
         }

        else if(logindata ==-2) {
            //登陆失败
             alert("登陆失败")
        }
         else {
            //普通用户登陆成功
             var json_data={"data_method":"user_id","user_id": logindata};
             send_temp(json_data);
             alert("登陆成功")
             $("#login-modal").modal('hide');
         }

    })


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

    $("a[herf='book-detail.html']").on("click", function () {
        var bookname=$(this).text();
        alert(bookname);
         $.ajax({
            type: 'post',
            url: '/temp/',
            dataType: "JSON",
            data: {
                table: 'user',
                data: bookname
            },
            success: function (data) {
                alert("123")
            },
            error: function () {
                 alert("456")
            }
        });
    })

})
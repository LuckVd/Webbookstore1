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

    $("#bookfind").click(function () {
        var bookid = $("#findbookid").val()
        $.ajax({
            type: 'POST',
            url: '/search/',
            dataType: "JSON",
            data:{
                table:'book',
                data:bookid,
                type: "id"
            },
        success: function (data) {
              if(jQuery.isEmptyObject(data)){
                alert("查询为空!")
            }else
            {
            $("#findbook").empty();
            $("#rebook").html( " <div class=\"form-group\"> <input class=\"form-control\" required=\"required\"  placeholder=\"书名\"> <i class=\"fa fa-book\"></i> </div> <div class=\"form-group\"> <input class=\"form-control\"  required=\"required\" placeholder=\"作者名\"> <i class=\"fa fa-user\"></i> </div> <div class=\"form-group\"> <textarea class=\"form-control\"  required=\"required\" placeholder=\"书籍简介\"></textarea> <i class=\"fa fa-address-book\"></i> </div> <div class=\"form-group\"> <input class=\"form-control\"  required=\"required\" placeholder=\"价格\"> <i class=\"fa fa-cny\"></i> </div> <div class=\"form-group\"> <input class=\"form-control\"  required=\"required\" placeholder=\"销量\"> <i class=\"fa fa-list\"></i> </div> <div class=\"form-group\"> <input class=\"form-control\"  required=\"required\" placeholder=\"剩余库存\"> <i class=\"fa fa-table\"></i> </div> <div class=\"form-group\"> <input class=\"form-control\"  required=\"required\" placeholder=\"详情页面\"> <i class=\"fa fa-paperclip\"></i> </div> <div class=\"form-group\"> <input class=\"form-control\"  required=\"required\" placeholder=\"图片位置\"> <i class=\"fa fa-picture-o\"></i> </div><div class=\"form-group\" align=\"center\"> <button id=\"bookre\" type=\"submit\" data-dismiss=\"modal\" class=\"btn btn-warning\" style=\"font-size: 23px; width: 300px; height: 70px;\" >更新书籍信息</button> </div>")
            var num_of_books=0
           $("#rebook").find("input[placeholder='书名']").val(data.book_name[num_of_books])
        $("#rebook").find("input[placeholder='作者名']").val(data.book_author[num_of_books]);
     $("#rebook").find("textarea[placeholder='书籍简介']").text(data.book_discribe[num_of_books]);
       $("#rebook").find("input[placeholder='价格']").val(data.book_price[num_of_books]);
        $("#rebook").find("input[placeholder='销量']").val(data.book_sales[num_of_books]);
     $("#rebook").find("input[placeholder='剩余库存']").val(data.book_stock[num_of_books]);
      $("#rebook").find("input[placeholder='详情页面']").val(data.book_detail[num_of_books]);
        $("#rebook").find("input[placeholder='图片位置']").val(data.book_image[num_of_books]);
             $("#bookre").click(function () {
                   redata = new Object();
         //redata.id=  bookid;
        redata.book_name=$(this).closest(".sending-form").find("input[placeholder='书名']").val();
        redata.book_author=$(this).closest(".sending-form").find("input[placeholder='作者名']").val();
        redata.book_discribe=$(this).closest(".sending-form").find("textarea[placeholder='书籍简介']").val();
        redata.book_price=$(this).closest(".sending-form").find("input[placeholder='价格']").val();
        redata.book_sales=$(this).closest(".sending-form").find("input[placeholder='销量']").val();
        redata.book_stock=$(this).closest(".sending-form").find("input[placeholder='剩余库存']").val();
        redata.book_detail=$(this).closest(".sending-form").find("input[placeholder='详情页面']").val();
         redata.book_image=$(this).closest(".sending-form").find("input[placeholder='图片位置']").val();
         redata =JSON.stringify(redata);
         console.log(redata);
         $.ajax({
        type: 'post',
          url:'http://localhost:8000/update/',
        dataType: "JSON",
             data: {
                table:'book',
                data:redata,
                id: bookid
             },
        success: function (data) {
            if(data=="1")
            {
            console.log(redata)
            $("#rebook").empty();
            alert("修改成功!")
            window.location.reload()}
            else{
                alert("修改失败!")
            }
        },
        error: function () {
            console.log("fail");
            alert("修改失败！");
        }
    });
    })}
        },
        error: function () {
            console.log("fail");
            alert("查询失败！");
        }
    });
    })
})

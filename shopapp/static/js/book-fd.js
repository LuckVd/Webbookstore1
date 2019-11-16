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
        var id = $("#findbookid").val();
         $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/search/',
            dataType: "JSON",
            data: {
                table: 'book',
                data: id,
                type: 'id'
            },
        success: function (data) {
            if(jQuery.isEmptyObject(data)){
                alert("查询为空!")
            }else
            {
            var num_of_books=0
            $("#Tab").find("img").attr("src",data.book_image[num_of_books]);
            $("#Tab").find("div.single-product-detail").find("h3").text(data.book_name[num_of_books])
            $("#Tab").find("div.single-product-detail").find("p").text(data.book_discribe[num_of_books])
            $("#Tab").find("div.single-product-detail").find("strong").text(data.book_price[num_of_books])
            $("#bookid").text(data.id[num_of_books])
            $("#bookname").text(data.book_name[num_of_books])
            $("#authors").text(data.book_author[num_of_books])
            $("#price").text(data.book_price[num_of_books]+"元")
            $("#sale").text(data.book_sales[num_of_books])
            $("#remain").text(data.book_stock[num_of_books])
            //$("#page").text(data.page[num_of_books])
            $("#page").html("<a href=\""+ data.book_detail[num_of_books] + "\">&nbsp&nbsp&nbsp具体详情请点击这</a>")
            $("#delbutton").html('<div align="center"><br><button id="bookdelete" type="submit" data-dismiss="modal" class="btn btn-danger" style="font-size: 23px; width: 250px; height: 50px;" >删除书籍</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>')
            $("#bookdelete").click(function () {
         $.ajax({
        type: 'post',
        url: 'http://localhost:8000/delete/',
        dataType: "JSON",
        data:{
            table: 'book',
            id: id
        },
        success: function (data) {
            console.log(data)
            if(data=="1")
            {
                 alert("删除成功!")
            }
           else{
               alert("删除失败!")
            }
        },
        error: function () {
            console.log("fail");
            alert("删除失败,请检查网络！");
        }
    });
    })}
        },
        error: function () {
            alert("查询失败！");
        }
    });
    })
})

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

    //
    // //获得所有作者的信息，根据个数动态添加到左边栏目
    // $.ajax({
    //     type: 'post',
    //     url: '/search/',
    //      data: {table: 'author'},
    //     dataType: "JSON",
    //     success: function (data) {
    //         var author_len = data.author_name.length;
    //         for(var i=0;i<author_len;i++) {
    //          $('#Author').append('<li><a a href="#">' + data.author_name[i] + '</a></li> ');
    //       }
    //
    //     },
    //     error: function () {
    //         console.log("failed");
    //     }
    // });
    var maxlen=10;
    function display_bolist(data,i) {
        $("#book_list").find("div.product-box").each(function(){
                if(typeof(data.book_image[i])=="undefined"){$(this).hide()}
                else{
                    $(this).show();
                $(this).find("img").attr("src",data.book_image[i]);
                $(this).find("h5").find("a").text(data.book_name[i].substring(0,maxlen) + "...")
                $(this).find("div.product-detail").find("p").text(data.book_describe[i].substring(0,maxlen) + "...");
                $(this).find("strong").text(data.book_price[i]);
                $(this).attr("id",data.id[i]);
               // $(this).find("h5").find("a").attr("href",("../book-detail.html?"+data.id[i]));
                }

                i++;
        })
    }

    //获得书籍信息
    var booklist;
    var nowpage=1;
    var maxpage;
    $.ajax({
        type: 'post',
        url: '/search/',
        dataType: "JSON",
        data: {table: 'book'},
        success: function (data) {
            booklist = data
            var num_of_books = data.book_name.length;
             maxpage = Math.ceil(num_of_books/9)+1
            //自动生成页码
             $('ul.pagination').append('<li><Button  class="c_page" id="page_pre"><a aria-label="Previous">'+'Prev'+'</a></Button></li> ');
            for(var i=1;i<maxpage;i++)
                {
                 $('ul.pagination').append('<li><Button class="c_page" id="page'+i+'"><a>' + i + '</a></Button></li> ');
                 }
                $('ul.pagination').append('<li><button  class="c_page" id="page_next" ><a aria-label="Next">'+'Next'+'</a></button></li> ');

            var i=0;
            display_bolist(booklist,i)
        },
        error: function () {
            console.log("book_detail_failed")
        }
    });


    $("ul.pagination").on("click",".c_page",function(){
        var id=$(this).attr('id')
        if(id=="page_pre")
        {
            if(nowpage>1){nowpage=nowpage-1;}
            else{alert("已经是第一页");}
        }
        else if(id=="page_next")
        {
            if(nowpage<maxpage-1){nowpage=nowpage+1}
             else{alert("已经是最后一页");}
        }
        else{
            nowpage=id.replace(/[^0-9]/ig,"")
          }
        display_bolist(booklist,(nowpage-1)*9)
     });

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
   $("#book_list").find("div.product-box").on("click",function () {
        var book_id = $(this).attr("id");
        var json_data={"data_method":"book_id","curr_id": book_id};
        send_temp(json_data);
       //跳转到详情页面
       window.location.href = "../book-detail";

    })

})
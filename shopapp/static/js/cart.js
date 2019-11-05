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

    var book_info;
    var nowpage=1;
    var maxpage;
     function create_pagenumber(maxpage){
         //自动生成页码
            $('ul.pagination').empty();
             $('ul.pagination').append('<li><Button  class="c_page" id="page_pre"><a aria-label="Previous">'+'Prev'+'</a></Button></li> ');
            for(var i=1;i<maxpage;i++)
                {
                 $('ul.pagination').append('<li><Button class="c_page" id="page'+i+'"><a>' + i + '</a></Button></li> ');
                 }
                $('ul.pagination').append('<li><button  class="c_page" id="page_next" ><a aria-label="Next">'+'Next'+'</a></button></li> ');
    }


    //展示购物车信息，
    function display(i,book_info) {
         var num_val =book_info[Object.keys(book_info)[0]].length;
         maxpage=Math.ceil(num_val/5)+1;
         create_pagenumber(Math.ceil(num_val/5)+1);
        $("div.business").each(function(){
            if(i<num_val){
                $(this).show();
                 $(this).find("img").attr("src",book_info.pic_src[i]);
                 $(this).find("h5").text(book_info.name[i])
                 $(this).find("div.detail").find("span").text(book_info.description[i])
                 $(this).find("strong").text(book_info.price[i])
                 $(this).find("input").val(book_info.num[i])
            }
            else{  $(this).hide()}
                 i++;
             })
    }

    //删除购物车的商品（就是在表中删除其所有属性），i是需要删除的商品的id
    //删除之后更新book_info，刷新界面，但不更新表（最后统一更新表）
    function del_cart(book_info,i){
        var new_book_info=book_info;
        var list_keys= Object.keys(book_info);
        var num_keys=list_keys.length;//商品key的数量
        var num_val=book_info[list_keys[0]].length;//购物车中商品的数量
        for(var i_key=0;i_key<num_keys;i_key++ )
        {
             var new_i=0;
            for(var i_val=0;i_val<num_val;i_val++)
            {
                if(i_val==i){}
                else{
                    new_book_info[list_keys[i_key]][new_i]=book_info[list_keys[i_key]][i_val];
                    new_i++;
                }
            }
            new_book_info[list_keys[i_key]].splice(-1,1);
        }
        book_info=new_book_info;
        display((nowpage-1)*5,book_info);
    }

    //关闭，删除该项物品
    $("button:has(i)").click(function() {
        //$(this).closest(".business").slideToggle();
        var id=$(this).attr('id').replace(/[^0-9]/ig,"")
        del_cart(book_info,(nowpage-1)*5+Number(id)-1);//因为在html中的序号是从1开始，但是数组是从0开始,同时还要加上这是第几页的元素，id是字符串要进行一次转换
    })

     // 添加 减少的函数实现，最后返回的是数量（不能小于1）
    $(".ddd").on("click", function () {
        var $button = $(this);
        var $input = $button.closest('.sp-quantity').find("input.quntity-input");
        var id_index=$(this).closest(".business").attr('id').replace(/[^0-9]/ig,"");//获取当前操作的物品在本页面的ID

        $input.val(function(i, value) {
            var value_r=+value + (1 * +$button.data('multi'))
            book_info.num[i]=Math.max(value_r,1)//根据加减操作更新Book_info字典相应的物品数量
            return Math.max(value_r,1);
        });
    });
     //翻页的逻辑
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
        display((nowpage-1)*5,book_info);
     });

    $.ajax({
        type: 'post',
        url: 'cart_show',
        dataType: "JSON",
        data:{"table":"book"},
        success: function (data) {
            book_info=data;
            display(0,book_info);
        },
        error: function () {
            console.log("faileds")
        }
    });

});


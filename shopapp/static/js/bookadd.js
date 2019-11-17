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

    function bookadd(senddata){
       $.ajax({
        type: 'post',
           url:'/add/',
        dataType: "JSON",
        data:{
            table:'book',
            data:senddata
        },
        success: function (data) {
         if(data=="1") {
            alert("添加书籍成功!")
        }
        else{
            alert("添加书籍失败!")
        }
        },
        error: function () {
           alert("添加书籍失败，请检查网络")
        }
     });
    }

    $("#bookadd").click(function () {
        data = new Object();
        var file = $(this).closest(".sending-form").find("input[placeholder='图片']").val();
         var fileName = getFileName(file);
    function getFileName(o){
        var pos=o.lastIndexOf("\\");
        return o.substring(pos+1);
    }
        data.book_name=$(this).closest(".sending-form").find("input[placeholder='书名']").val();
        data.book_author=$(this).closest(".sending-form").find("input[placeholder='作者名']").val();
        data.book_discribe=$(this).closest(".sending-form").find("textarea[placeholder='书籍简介']").val();
        data.book_price=$(this).closest(".sending-form").find("input[placeholder='价格']").val();
        data.book_sales=$(this).closest(".sending-form").find("input[placeholder='销量']").val();
        data.book_stock=$(this).closest(".sending-form").find("input[placeholder='剩余库存']").val();
        data.book_detail=$(this).closest(".sending-form").find("input[placeholder='详情页面']").val();
        data.book_image= "static/images/"+ fileName;
         data =JSON.stringify(data);
         console.log(data);
        bookadd(data);
         $.ajax({
        type: 'post',
           url:'/add/',
       contentType:false,
                data: $( '#upimg').serialize(),
                processData:false,
        success: function (data) {
        console.log(typeof(data) );
        },
        error: function () {
           alert("添加图片失败，请检查网络")
        }
     });
    })

})
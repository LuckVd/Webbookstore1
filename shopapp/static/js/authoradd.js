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
            table: 'author',
            data: senddata
        },
        success: function (data) {
            if(data=="1") {
                alert("作者添加成功!")}
            else {
                alert("作者添加失败!")
            }
        },
        error: function () {
           alert("添加失败，请检查网络")
        }
     });
    }

    $("#authoradd").click(function () {
        data = new Object();
        data.author_name=$(this).closest(".sending-form").find("input[placeholder='作者名']").val();
        data.author_describe=$(this).closest(".sending-form").find("textarea[placeholder='作者简介']").val();
        data=JSON.stringify(data);
        bookadd(data);
    })

})
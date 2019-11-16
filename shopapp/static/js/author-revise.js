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

    $("#authorfind").click(function () {
        var authorid = $("#findauthorid").val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/search/',
            dataType: "JSON",
            data: {
                table:'author',
                data:authorid,
                type: 'id'
             },
        success: function (data) {
             if(jQuery.isEmptyObject(data)){
                alert("查询为空!")
            }else
            {
            $("#authorbook").empty();
            $("#reauthor").html( " <div class=\"form-group\"> <input class=\"form-control\"  required=\"required\" placeholder=\"作者名\"> <i class=\"fa fa-user\"></i> </div> <div class=\"form-group\"> <textarea class=\"form-control\"  required=\"required\" placeholder=\"作者简介\"></textarea> <i class=\"fa fa-address-book\"></i> </div> <div class=\"form-group\" align=\"center\"> <button id=\"authorre\" type=\"submit\" data-dismiss=\"modal\" class=\"btn btn-warning\" style=\"font-size: 23px; width: 300px; height: 70px;\" >更新作者信息</button> </div>")
            var num_of_books=0
        $("#reauthor").find("input[placeholder='作者名']").val(data.author_name[num_of_books]);
     $("#reauthor").find("textarea[placeholder='作者简介']").text(data.author_discribe[num_of_books]);
             $("#authorre").click(function () {
                   redata = new Object();
                   //redata.id = authorid;
        redata.author_name=$(this).closest(".sending-form").find("input[placeholder='作者名']").val();
        redata.author_discribe=$(this).closest(".sending-form").find("textarea[placeholder='作者简介']").val();
        redata =JSON.stringify(redata);
         console.log(redata);
         $.ajax({
        type: 'post',
        url:'http://localhost:8000/update/',
        dataType: "JSON",
             data: {
                table: 'author',
                id: authorid,
                data: redata
             },
        success: function (data) {
            if(data=="1"){
            console.log(redata)
            $("#reauthor").empty();
            alert("修改成功!")
            window.location.reload()}
            else{
                alert("修改失败!")
            }
        },
        error: function () {
            console.log("fail");
            alert("修改失败,请查看网络!");
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

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

    $("#userfind").click(function () {
        var findid = $("#finduserid").val()
         $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/search/',
        dataType: "JSON",
             data:{
                table:'user',
                data:findid,
                type: 'id'
             },
        success: function (datas) {
              if(jQuery.isEmptyObject(datas)) {
                alert("查询为空!")
            }
              else{
            var tbhtml ="";
            var i=0;
                        for(;i<datas.id.length;i++){
                                tbhtml+="<tr id=\"tablel"+ i+"\"" +" ><td>"+datas.id[i]+"</td><td>"+datas.user_name[i]+"</td><td>"+datas.user_email[i]+"</td><td>"+"<button id=\"userdelete"+ i+"\"" +" type=\"submit\" data-dismiss=\"modal\" class=\"btn btn-danger\" style=\"font-size: 15px; width: 130px; height: 33px;\" >删除</button>"+"</td></tr>";
                        }
                         $("#tables").html(tbhtml)
            for(i--;i>=0;i--)
            {
                  $("#userdelete"+i).click(function () {
                      var c=$(this).attr('id').slice(10)
         $.ajax({
        type: 'post',
        url: 'http://localhost:8000/delete/',
        dataType: "JSON",
             data:{
                table:'user',
                 id:findid
             },
        success: function (data) {
        if(data=="1"){
             $("#tablel"+c).remove();
            alert("删除成功!")}
            else{
                alert("删除失败,请检查网络!")
            }
        },
        error: function () {
            console.log("fail");
            alert("删除失败！");
        }
    });
    })
            }}

        },
        error: function () {
            console.log("fail");
            alert("查询失败！");
        }
    });
    })
})

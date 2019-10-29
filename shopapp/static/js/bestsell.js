
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
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

  jQuery.ajax({
        type: 'post',
        url: 'bestsellurl',
        timeout : 5000,
        // contentType: "application/json",//该句代码不能加，加了之后无法POST
        data:{hello:"hello"},
        success: function(data) {
          alert("成功");
        },
        error: function() {
          alert("保存失败");
        }
      });






})
/*
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
        $("#tab-1").find("strong").text("777")

       info = {
              "X-CSRFToken":csrftoken
            };

            var hello1 = $("#tn").val();
            $.ajax({
                url: 'bestsellurl',
                type: 'post',
                header: info,
                data:{'hdata':hello1},
                dataType: "text",
                success: function (res) {
                    $("#tab-1").find("strong").text(res)
                    console.log("success");
                },
                error: function (res) {
                    $("#tab-1").find("strong").text(res)
                    console.log("error");
                }
            })



})

*/



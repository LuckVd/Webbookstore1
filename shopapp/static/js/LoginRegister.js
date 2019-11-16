jQuery( document ).ready(function() {
    var user_table;//用来保存获取的用户表
    function getuserdata() {
        $.ajax({
        type: 'post',
        url: '/search/',
        async: false,
        dataType: "JSON",
        data: {table: 'user'},
        success: function (data) {
            user_table = data;
        },
        error: function () {
            console.log("无法获取用户表")
        }
    });

    }


    //查看后台是否当前已经登陆
    // function login_display() {
    //     $.ajax({
    //         type: 'post',
    //         url: '/temp_get/',
    //         data: {"data_method": "user_id"},
    //         success: function (data) {
    //             if (data != "-1") {
    //                 $("a[data-target='#login-modal']").text(user_table.user_name[data])
    //                 $("a[data-target='#login-modal']").attr("data-target", "#quit-modal");
    //                 $("#quit-modal").find("#user_name").text(user_table.user_name[data]);
    //                 $("#quit-modal").find("#user_email").text(user_table.user_email[data]);
    //                 if (user_table.user_is_admin[data] == "1") {
    //                     $("#quit-modal").find("#is_admin").text("管理员");
    //                 }
    //             }
    //             $("a[data-target='#login-modal']").text("Login / Register")
    //
    //         },
    //         error: function () {
    //         }
    //     });
    // }

    function login_display()
    {
       data=sessionStorage.getItem( "user_id" );
       getuserdata();
         if (data != null) {
                    $("a[data-target='#login-modal']").text(user_table.user_name[data])
                    $("a[data-target='#login-modal']").attr("data-target", "#quit-modal");
                    $("#quit-modal").find("#user_name").text(user_table.user_name[data]);
                    $("#quit-modal").find("#user_email").text(user_table.user_email[data]);
                    if (user_table.user_is_admin[data] == "1") {
                        $("#quit-modal").find("#is_admin").text("管理员");
                    }
                }
         $("a[data-target='#login-modal']").text("Login / Register")
    }
    login_display()

    //注册事件
    function register(senddata) {
        $.ajax({
            type: 'post',
            url: '/add/',
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
        var Username = $(this).closest(".sending-form").find("input[placeholder='Username']").val();
        var Email = $(this).closest(".sending-form").find("input[placeholder='Email']").val();
        var Password = $(this).closest(".sending-form").find("input[placeholder='Password']").val();
        var Password_again = $(this).closest(".sending-form").find("input[placeholder='PasswordAgain']").val();
        console.log(typeof (Username));
        console.log(Username);
        //确认输入无误时，将信息传递给后台
        var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
        if (Password != Password_again) {
            alert("密码输入不一致");
        } else if (Username.length >= 20 || Password.length >= 20) {
            alert("用户名或密码过长");
        } else if (!reg.test(Email)) {
            alert("邮箱格式有误");
        } else {
            data = new Object();
            data.user_name = Username;
            data.user_password = Password;
            data.user_email = Email;
            data.user_is_admin = '0'
            data = JSON.stringify(data)
            console.log(data);
            register(data);
        }

    })


    //通过临时信息保存登录用户
    function send_temp(data_temp) {
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

    function judge_user(username, password) {
        var len = user_table.id.length;
        for (var i = 0; i < len; i++) {

            if (username == user_table['user_name'][i] && password == user_table['user_password'][i]) {
                if (user_table['user_is_admin'][i] == "1")
                    return -1;
                return i;
            }
        }
        return -2;
    }


    $("#btn_login").click(function () {
        var Username = $(this).closest(".sending-form").find("input[placeholder='UserName']").val();
        var Password = $(this).closest(".sending-form").find("input[placeholder='Password']").val();

        var logindata = judge_user(Username, Password)
        if (logindata == -1) {
            //管理员登陆成功
            alert("管理员登陆成功")
        } else if (logindata == -2) {
            //登陆失败
            alert("登陆失败")
        } else {
            //普通用户登陆成功
            var json_data = {"data_method": "user_id", "user_id": logindata};
            sessionStorage.setItem( "user_id", logindata );
          //  send_temp(json_data);
            alert("登陆成功")
            $("#login-modal").modal('hide');
            login_display();
        }

    })
    //退出事件触发

    $("#quit_login").click(function () {
        sessionStorage.removeItem("user_id");
        //var json_data = {"data_method": "user_id", "user_id": -2};
       //  send_temp(json_data);
        $("a[data-target='#quit-modal']").attr("data-target", "#login-modal");
        $("a[data-target='#login-modal']").text("Login / Register")
        $("#quit-modal").modal('hide');
    })
})

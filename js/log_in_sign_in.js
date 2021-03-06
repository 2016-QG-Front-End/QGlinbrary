/**
 * [对登录与注册的div的转换]
 */
$(function() {

    /**
     * [从登录div转换到注册div]
     * $('.change-sign-in') [获取登录的div]
     * $('.warm-log-in') [获取注册的div]
     */
    $('.change-sign-in').bind('click', function() {
        $('.warm-sign-in').css("display", "none")
            .prev().css("display", "none");

        $('#username').val('')
            .next().val('');
        $('.log-in-error').html('').css("display", "none");
        $('.log-in-error').css("display", "none");

        $('.warm-log-in').css("display", "block")
            .prev().css("display", "block");


    });

    /**
     * [从注册div转换到登录div]
     * $('.change-sign-in') [获取登录的div]
     * $('.warm-log-in') [获取注册的div]
     */
    $('.change-log-in').bind('click', function() {
        $('.warm-log-in').css("display", "none")
            .prev().css("display", "none");

        $('#signInUsername').val('');
        $('#signInPassword').val('');
        $('#signInConfirmPassword').val('');
        $('.has-user').css({
            'display': 'none'
        });
        $('#passWarm').html('').css("display", "none");
        $('#confirmPassWarm').html('').css("display", "none");

        $('.warm-sign-in').css("display", "block")
            .prev().css("display", "block");
    })
    locationSearch();
})
/**
 * [locationSearch 判断是注册还是登陆]
 * @return {[type]} [返回null，以此结束函数]
 */
function locationSearch() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : false) ;
 
    if (qs == false) {
        return ;
    }

    if (qs.split('=')[1] == '1'){

    } else {
        $('.warm-sign-in').css("display", "none")
            .prev().css("display", "none");
        $('.warm-log-in').css("display", "block")
            .prev().css("display", "block");
    }
}

/**
 * [正则表达式对账号密码验证]
 * 
 * 
 * 
 */
$(function() {

    var username = document.getElementById('username'),
        password = document.getElementById('password'),
        signUsername = document.getElementById('signInUsername'),
        signPassword = document.getElementById('signInPassword'),
        confirmPassword = document.getElementById('signInConfirmPassword'),
        regUser = /^[a-zA-Z0-9]{4,8}$/,
        regPass = /^[a-zA-Z0-9]{4,8}$/;

    $('#username').bind('keyup', function(e) {
        var ev = window.event || e;

        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.log-submit').trigger('click');
        }

        if (!regUser.test(username.value)) {
            $('.log-in-error').html('用户名由4到8个数字或大小写字母组成').css("display", "block");
        } else {
            $('.log-in-error').html('').css("display", "none");
        }
    });

    $('#password').bind('keyup', function(e) {
        var ev = window.event || e;

        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.log-submit').trigger('click');
        };

        if ($('.log-in-error').html() != '用户名由4到8个数字或大小写字母组成') {
            if (!regPass.test(password.value)) {
                $('.log-in-error').html('密码由4到8个数字或大小写字母组成').css("display", "block");
            } else {
                $('.log-in-error').css("display", "none");
            }
        };
    })

    $('#signInUsername').bind('keyup', function(e) {
        var ev = window.event || e;

        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.sign-submit').trigger('click');
        };

        if (!regUser.test(signUsername.value)) {
            $('#userWarm').html('用户名由4到8个数字或大小写字母组成').css("display", "block");
        } else {
            $('#userWarm').html('').css("display", "none");
        };

        $('.has-user').css({
            'display': 'none'
        });
    });

    $('#signInPassword').bind('keyup', function(e) {
        var ev = window.event || e;

        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.sign-submit').trigger('click');
        };

        if (!regUser.test(signPassword.value)) {
            $('#passWarm').html('密码由4到8个数字或大小写字母组成').css("display", "block");
        } else {
            $('#passWarm').html('').css("display", "none");
        };
    });

    $('#signInConfirmPassword').bind('keyup', function(e) {
        var ev = window.event || e;

        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.sign-submit').trigger('click');
        };

        if ((signPassword.value) != confirmPassword.value) {
            $('#confirmPassWarm').html('密码不正确').css("display", "block");
        } else {
            $('#confirmPassWarm').html('').css("display", "none");
        };
    });


})

/**
 * [登录，对登录信息的上传]
 *  
 * 
 *
 */
$(function() {
    $('.log-submit').bind('click', function(e) {
        var username = document.getElementById('username'),
            password = document.getElementById('password'),
            regUser = /^[a-zA-Z0-9]{4,8}$/,
            regPass = /^[a-zA-Z0-9]{4,8}$/,
            obj = new Object();

        obj = {
            user: username.value,
            password: password.value
        };
 

        if ((regUser.test(username.value)) && (regPass.test(password.value))) {
            $.ajax({
                type: "post",
                url: 'http://192.168.199.79:10086/login',
                data: JSON.stringify(obj),
                dataType: "json",
                async: false,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    logInChange(data);
                },
                error: function(xhr, status, errorThrowm) {
                    alert("错误" + status + "错误抛出：" + errorThrowm);
                }
            });
        } else {
            $('#username').trigger('keyup');
            $('#password').trigger('keyup');
        }

    });

})

/**
 * [logInChange 登录数据返回对数据的分析]
 * @param {[type]} data [json解析后的数据]
 */
function logInChange(data) {

    switch (data.status) {
        case 'true':
            location.href = 'index.html';
            break;
        case 'false':
            $('.log-in-error').html('用户名不存在或密码错误').css("display", "block");
    }
}

/**
 * [注册检测用户名]
 * 
 * 
 */
$(function() {
    var username = document.getElementById('username'),
        password = document.getElementById('password'),
        signUsername = document.getElementById('signInUsername'),
        signPassword = document.getElementById('signInPassword'),
        confirmPassword = document.getElementById('signInConfirmPassword'),
        regUser = /^[a-zA-Z0-9]{4,8}$/,
        regPass = /^[a-zA-Z0-9]{4,8}$/;

    $('#signInUsername').bind('blur', function(argument) {
        if (!regUser.test(signUsername.value)) {
            $('#userWarm').html('用户名由4到8个数字或大小写字母组成').css("display", "block");
        } else {
            var obj = new Object();
            obj = {
                user: signUsername.value
            };

            $.ajax({
                type: "post",
                url: 'http://192.168.199.79:10086/hasUser',
                data: JSON.stringify(obj),
                dataType: "json",
                async: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    hasUser(data);
                },
                error: function(xhr, status, errorThrowm) {
                    alert("错误" + status + "错误抛出：" + errorThrowm);
                }
            });
        }
    })
})


/**[hasUser 同户名是否存在的提示]
 * @param  {[type]}  data [对象]
 * 
 */
function hasUser(data) {
    if (data.status == 'false') {
        $('.has-user').css({
            'display': 'block',
            'background': 'url(../images/right.png)  no-repeat #fff',
            'backgroundSize': '16px 16px'
        }).html('用户名可用');
    } else {
        $('.has-user').css({
            'display': 'block',
            'background': 'url(../images/log_in_err.png)  no-repeat #fff',
            'backgroundSize': '16px 54px',
            'backgroundPosition': '0 -39px'
        }).html('用户名已经存在');
    };
}

/**
 * [用于提交注册信息]
 *                        
 *
 *
 */
$(function() {
    var username = document.getElementById('username'),
        password = document.getElementById('password'),
        signUsername = document.getElementById('signInUsername'),
        signPassword = document.getElementById('signInPassword'),
        confirmPassword = document.getElementById('signInConfirmPassword'),
        regUser = /^[a-zA-Z0-9]{4,8}$/,
        regPass = /^[a-zA-Z0-9]{4,8}$/;

    document.getElementById("signSubmit").onclick = function() {
        if ((regUser.test(signUsername.value)) && (regUser.test(signPassword.value)) && ((signPassword.value) == confirmPassword.value) && ($('#hasWarm').text() == '用户名可用')) {
            var obj = new Object();

            obj = {
                user: $('#signInUsername').val(),
                password: $('#signInPassword').val()
            };

            $.ajax({
                type: "post",
                url: 'http://192.168.199.79:10086/signUp',
                data: JSON.stringify(obj),
                dataType: "json",
                async: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data.status) {
                        location.href = 'index.html';
                    }
                },
                xhrFields: {
                    withCredentials: true
                },
                error: function(xhr, status, errorThrowm) {
                    alert("错误" + status + "错误抛出：" + errorThrowm);
                }
            });
        } else {
            $('#signInUsername').trigger('keyup');
            $('#signInPassword').trigger('keyup');
            $('#signInConfirmPassword').trigger('keyup');
            $('#signInUsername').trigger('blur');
        }


    }

})

/**
 * 获取背景图片
 */
$(function() {


    $.ajax({
        type: "post",
        url: 'http://192.168.199.79:10086/ranGra',
        data: null,
        dataType: "json",
        async: true,
        success: function(data) {
            // $('#background').css('backgroundImage', data.picture);
            document.getElementById("background").style.backgroundImage = 'url("' + data.picture + '")';
        },
        error: function(xhr, status, errorThrowm) {
            alert("错误" + status + "错误抛出：" + errorThrowm);
        }
    });


})

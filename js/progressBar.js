    $({ property: 0 }).animate({ property: 100 }, {
        duration: 3000,
        step: function() {
            var percentage = Math.round(this.property);

            $('#progress').css('width', percentage + "%");

            if (percentage == 100) {
                $("#progress").addClass("done"); //完成，隐藏进度条
            }
        }
    });
/**
 * 搜索框的跳转
 */
$(document).ready(function() {
    searchSkip();

})
function searchSkip() {
    $('.button').bind('click', function() {

        location.href = location.hostname + '?' + encodeURIComponent('search_text=' + document.getElementById('search').value);
    });
    $('#search').bind('keyup', function(e) {
        var ev = window.event || e;

        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.button').trigger('click');
        }
    });
}

/**
 * 创建图表
 */
//图表初始化
var myChart = echarts.init(document.getElementById('personPieChart'));
        var option = {
            title: {
                text: '个人搜索类型展示',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['DOTA2','LOL','绝地大逃杀','彩虹6号','杀手6']
            },
            series : [
            {   
                
                name: '玩家数量',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data: [
                    {value: 0, name: 'DOTA2'},
                    {value: 0, name: 'LOL'},
                    {value: 0, name: '绝地大逃杀'},
                    {value: 0, name: '彩虹6号'},
                    {value: 0, name: '杀手6'}
                ],

                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                

                
            }
    ]
        };
        myChart.setOption(option);
        


//获取数据
$(function() {
    var obj = new Object();

    obj.user = $('#userName').text();
    
        $.ajax({
            type: "post",
            url: 'http://192.168.1.110:10086/chart',
            data: null,
            dataType: "json",
            async: false,
            success: function(data) {
                if (data) {
                    $('.person-recommend').css('display', 'none');
                } else {
                    createPie(data.ratio);
                }
                
            },
            // error: function(xhr, status, errorThrowm) {
            //     alert("错误" + status + "错误抛出：" + errorThrowm);
            // }
        });
    
    
})

/**
 * [createPie 獲取图表数据并创建个人数据]
 * @param {[Array]} data [个人搜索新]
 */
function createPie (data) {
    var leg = [],
        serDa = [];

    for (var i in data) {
        var obj = new Object();

            leg.push(name);
            obj.name = i;
            obj.value = data[i];

            serDa.push(obj);
    }

    myChart.setOption({
        legend: {
            data: leg
        },
        series: [{
            data: serDa
        }]
    });
}
/**
 * end 创建图表
 */

/**
 * 个人信息推荐书籍
 */
$(function() {
    
    var obj = new Object();

    obj.user = $('#userName').text();
    
        $.ajax({
            type: "post",
            url: 'http://192.168.1.110:10086/recom',
            data: null,
            dataType: "json",
            async: false,
            success: function(data) {
                if (data) {
                    $('.person-recommend').css('display', 'none');
                } else {
                    createRecBook(data.books);
                }
                
            },
            // error: function(xhr, status, errorThrowm) {
            //     alert("错误" + status + "错误抛出：" + errorThrowm);
            // }
        });
    
})
/**
 * [createRecBook 创建个人推荐书单]
 * @param  {[Array]} arr [一个包含多本书信息的数组]
 * 
 */
function createRecBook(arr) {
    for (var i in arr) {
         var oLi = '<li><a href=""><img src="' + arr[i].pictrue + '"></a><div><h4>' + arr[i].name + '</h4><p class="evaluate">评分：<i>' + arr[i].rating + '</i></p><p class="book-writer">' + arr[i].author + '</p><p class="category ">' + arr[i].type + '</p><p class="cntent-abstract">' + arr[i].content + '</p></div></li>';

         $('.person-recommend-book').append(oLi);
    }
}
/**
 * end 个人信息推荐书籍
 */

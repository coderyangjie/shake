/**
 * 基于jquery的html元素抖动插件
 * Created by yangjie on 2018/9/3.
 */
;(function($){
    $.fn.shake = function (option) {
        //Default settings
        var defaults={
            count: 6, // 抖动次数
            distance: 50, // 最大抖动距离（第一次抖动的距离）
            direction: "left", // 第一次抖动的方向
            event:"",//触发元素抖动的事件
            time: 240, //最长抖动时间（第一次抖动时间）
        };
        //如果有配置项，则合并配置项到默认配置对象
        if (option) { $.extend(defaults, option); }
        // Variable declaration 变量声明
        var $obj = $(this);
        var count = defaults.count;
        var direction = defaults.direction;
        var maxDistance = defaults.distance;
        var maxTime = defaults.time;
        var event = defaults.event;
        var num;

        if ((direction == "left") && count % 2 == 0){
            num = -1;
        }else if (direction == "left"){
            num = 0;
        }else if ((direction == "right") && count % 2 == 0){
            num = 0;
        }else if(direction == "right"){
            num = -1;
        }else if((direction == "top") && count % 2 == 0){
            num = -1;
        }else if(direction == "top"){
            num = 0;
        }else if((direction == "bottom") && count % 2 == 0){
            num = 0;
        }else if(direction == "bottom"){
            num = -1;
        }

        var deltaTime = maxTime / (count); //每次抖动减少的时间量
        var deltaDistance = (maxDistance) / (count - 1); //每次抖动减少的距离量
        //此处为什么要减1，是因为第一次抖动为distance的最大值，从第二次开始进行递减，因此要减1.

        var make = function (currentCount, elem, currentDistance, currentTime) {

            if(direction == "bottom" || direction == "top"){
                if (currentCount > 0) {
                    elem.css("position", "relative").animate({ "top": (((Math.pow(-1, (currentCount + num)) * (currentDistance))).toString()) },
                        currentTime,
                        function () { make(currentCount - 1, elem, currentDistance - deltaDistance, currentTime - deltaTime); });
                }
                else if (currentCount == 0) {
                    elem.css("position", "relative").animate({ "top": "0" }, currentTime);
                }
            }else{
                if (currentCount > 0) {
                    elem.css("position", "relative").animate({ "left": (((Math.pow(-1, (currentCount + num)) * (currentDistance))).toString()) },
                        currentTime,
                        function () { make(currentCount - 1, elem, currentDistance - deltaDistance, currentTime - deltaTime); });
                }
                else if (currentCount == 0) {
                    elem.css("position", "relative").animate({ "left": "0" }, currentTime);
                }
            }

        };

        return this.each(function () {
            //根据event类型，为元素添加事件
            if(event=="click"){
                $obj.bind('click',function(){
                    new make(count, $obj, maxDistance, maxTime);

                });
            }else if(event=="mouseover"){
                $obj.bind('mouseover',function(){
                    new make(count, $obj, maxDistance, maxTime);
                });
            }else if(event==""){
                new make(count, $obj, maxDistance, maxTime);
            }

        });


    };


})(jQuery);
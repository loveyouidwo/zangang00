/**
 * 获取滚动条头部距离和左边距离
 * scroll().top scroll().left   （调用)
 * @returns {{top: number, left: number}}
 */
function scroll(){
    if(window.pageYOffset !== null){
        return{
            top:window.pageYOffset,
            left:window.pageXOffset,
        }
    }else if(document.compatMode === "CSS1Compat"){
        return{
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft,
        }
    }
    return{
        top: document.body.scrollTop,
        left: document.body.scrollLeft,
    }
}

function $(id){
    return typeof id === "string"?document.getElementById(id):null;
}

function show(obj){
    return obj.style.display = 'block';
}

function hide(obj){
    return obj.style.display = '';
}

/**
 * 获取屏幕的可视高度和宽度
 * @returns {{width: number, height: number}}
 */
function client(){
    if(window.innerWidth){
        return {
            width:window.innerWidth,
            height:window.innerHeight,
        }
    }else if(document.compatMode === "CSS1Compat"){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight,
        }
    }
    return{
        width:document.body.clientWidth,
        height:document.body.clientHeight,
    }

}

/**
 * 控制物体的运动方向
 * @param (onbect)obj
 * @param (number)target
 * @param (number)speed
 */
function constant(obj,target,speed){
    //1 清空定时器
    clearInterval(obj.timer);

    //2 判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;

    //设置定时器
    obj.timer = setInterval(function(){
        obj.style.left = obj.offsetLeft + dir + 'px';

        if(Math.abs(target - obj.offsetLeft) < Math.abs(dir)){
            clearInterval(obj.timer);

            obj.style.left = target + 'px';

        }
    },20);
}

/**
 * 获取CSS的样式值
 * @param obj
 * @param attr
 * @returns {string}
 */
function getCSSAttrValue(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}

/**
 * 获取缓动动画的回调值
 * @param obj
 * @param json
 * @param fn
 */
function buffer(obj,json,fn){
    //1.1 清空定时器
    clearInterval(obj.timer);

    //1.2 定义变量
    var target = 0,begin = 0,speed = 0;

    //1.3 设置定时器
    obj.timer = setInterval(function(){
        var flag = true;
        for(var k in json){
            if("opacity" === k){
                //1.4 获取初始值
                begin = Math.round(parseInt(getCSSAttrValue(obj ,k)) * 100) || 100;
                target = parseInt(json[k] * 100);
            }else if("scrollTop" === k){
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[k]);
            }else{
                //其他情况
                begin = parseInt(getCSSAttrValue(obj ,k)) || 0;
                target = parseInt(json[k]);
            }
            //1.5 求出步长
            speed = (target - begin) * 0.2;

            //1.6取整
            speed = (target >= begin) ? Math.ceil(speed) : Math.floor(speed);

            //动起来
            if("opacity" === k){//透明度
                //w3c浏览器
                obj.style.opacity =(begin + speed )/ 100;

                //IE浏览器
                obj.style.filter = 'alpha(opacity:"+(begin+speed)+")';
            }else if("scrollTop" === k){
                obj.scrollTop = begin + speed;
            }else{
                obj.style[k] = begin + speed + "px";
            }

            //判断
            if(begin !== target){
                flag = false;
            }
        }

        //1. 清空定时器
        if(flag){
            clearInterval(obj.timer);

            //判断是否有回调函数
            if(fn){
                fn();
            }
        }
    },20);
}

/**
 *   函数节流
 * @param fn
 * @param delay
 * @returns {Function}
 */
function throttle(fn, delay){
    var timer = null;
    return function(){
        clearTimeout(timer);
        timer = setInterval(fn ,delay);
    }
}

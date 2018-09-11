(function(){
    /*头部导航*/
    change();

    /*背景切换*/
    wall();

    /*评论*/
    comments();

    /*音乐播放*/
    MyMusic();

})();

/*
   头部导航
*/
    function change(){
      var lis = $("tab_top").getElementsByTagName("li");
      var doms = $("tab").getElementsByClassName("dom");
      var lastOne = 0;
      var timer = null;

      //遍历监听
       for(var i=0;i<lis.length;i++){
           var li = lis[i];

           //监听鼠标的点击
            (function(i){
               li.onmousedown = function(){
                //清空
                lis[lastOne].className = "";
                doms[lastOne].style.display = "none";

                //设置
                this.className = "current";
                doms[i].style.display = "block";

                //赋值
                lastOne = i;
            };

            li.onmouseout = function(){
               clearInterval(timer);
               timer = setInterval(function(){
                   //清空
                   lis[lastOne].className = "";
                   doms[lastOne].style.display = "none";
               },2000)
            };
        })(i)
    }
    }

    /*--背景图片的切换---*/
    function wall(){
        var alis = $("dom1").getElementsByTagName("li");
        var dom1 = $("tab").getElementsByClassName("dom");

         for(var j=0;j<alis.length;j++){
             var oli = alis[j];
              oli.index = j+1;
             oli.onclick = function(){
                 document.body.style.background = 'url("../image/beijin0'+this.index+'.jpg")';
                 document.body.style.backgroundSize = '100% 100%';
             }
         }
    }

    /*-----------------评论----------------*/
    function comments(){
        $("btn").onclick = function(){
            var content = $('my_textarea').value;

            if(content === 0){
                alert("请输入内容");
                return;
            }

            var li = document.createElement('li');
            li.innerHTML = content + '<a href="#">删除</a>';
            $('my_ul').insertBefore(li,$('my_ul').children[0]);

            $('my_textarea').value = '';

            var as = $('my_ul').getElementsByTagName('a');

            for(var i=0;i<as.length;i++){
                var a = as[i];
                a.onclick = function(){
                    this.parentNode.remove();
                }
            }
        }
    }

    /*-----------------音乐播放----------------*/
    function MyMusic(){
        let myLis = $("section_left_in").getElementsByTagName("li");
        let MyAudio = document.getElementById("MyAudio");
        let index = 1;

        for(let x=0;x<myLis.length;x++){
            let zli = myLis[x];

            zli.onclick = function(){
                document.getElementById("music").innerHTML = zli.innerText;
                document.getElementById("music").style.color = "red";
                document.getElementById("music").style.fontSize ="18px";
                if(index === zli){
                    MyAudio.src = "../image/music0"+index+".mp3";
                    index++;
                }
          }
        }

    }
function $(id){
    return typeof id === "string" ? document.getElementById(id) : null;
}



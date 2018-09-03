(function(){
    login();
})();
function login(){
    $("submit").onclick = function(){
        $("userName").onblur = function(){
            var value1 = $("userName").value;
            if(isNaN(value1)){
                alert("输入的账号和密码为空");
            }else if(value1 === "2212056035"){
                $("password").onblur = function(){
                    var value2 = $("password").value;
                    if(isNaN(value2)){
                        alert("输入的账号和密码为空");
                    }else if(value2 === "980708"){
                        location.href = "pages/myIndex.html";
                    }else{
                        location.href = "pages/myLogin.html";
                    }
                }
            }else{
                location.href = "pages/myLogin.html";
            }
        }
    }
}

function $(id){
    return typeof id === "string" ? document.getElementById(id) : null;
}


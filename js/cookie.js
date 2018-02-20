"use strict";

function modalLogin() {
    $(document).ready(function () {
        $("#iniSesion").click(function () {
            $("#myModal").modal();
        });
    });
}

function login(userName, password) {
    var but = document.getElementById("log");
    var usr = document.getElementById("usr");
    var psw = document.getElementById("psw");
    var usu = "prueba";
    var passw = "prueba";
    var user = getCookie("username");
    if (userName === usu && passw === password) {
        setCookie("username", userName, 2);
        but.setAttribute("data-dismiss", "modal");
    }
    //debugger;
    if(user !== userName && passw !== password){
        var msgUsr = document.createElement("small");
        var msgPsw = document.createElement("small");
       
        msgUsr.innerText = "Introduce un Usuario";
        msgPsw.innerText = "Introduce una Contraseña";
        
        msgUsr.setAttribute("class", "form-text text-muted");
        msgPsw.setAttribute("class", "form-text text-muted");
        usr.appendChild(msgUsr);
        psw.appendChild(msgPsw);
        msgUsr.style.color = "rgb(255, 0, 0)";
        msgPsw.style.color = "rgb(255, 0, 0)";
        console.log("ERROR de LOGUEO");
    }
    
}



function setCookie(cname,cvalue,exhours) {
    var time = new Date();
    time.setTime(time.getTime() + (exhours*60*60*1000));
    var expires = "expires=" + time.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

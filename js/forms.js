"use strict";


function menuConf(){
    clearMenuContent();
    clearMainCont();

    var conf = document.createElement("nav");
    conf.setAttribute("id", "menuConf");
    var ul = document.createElement("ul");
    var li1 = document.createElement("li");
    var a1 = document.createElement("a");
    a1.setAttribute("href", "#");
    a1.innerText = "Categorias";
    var li2 = document.createElement("li");
    var a2 = document.createElement("a");
    a2.setAttribute("href", "#");
    a2.innerText = "Tiendas";
    var li3 = document.createElement("li");
    var a3 = document.createElement("a");
    a3.setAttribute("href", "#");
    a3.innerText = "Productos";
    var li4 = document.createElement("li");
    var a4 = document.createElement("a");
    a4.setAttribute("href", "#");
    a4.innerText = "Volver";
    conf.appendChild(ul);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    li1.appendChild(a1);
    li2.appendChild(a2);
    li3.appendChild(a3);
    li4.appendChild(a4);
    shopContent.appendChild(conf);
    a4.addEventListener("click", iniPopulate);
}


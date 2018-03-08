"use strict";
var insertShop = document.getElementById("insertar");
var modal = document.getElementById("createModal");
function menuConf() {

    var shops = document.getElementsByClassName("shops");
    clearConfCont();
    clearNewShopCont();
    createConfShop(shops);
    
}

function createConfShop(shop){
    var shops = shop;
    for (var i = 1; i < shops.length; i++) {
        var divConf = document.createElement("div");
        divConf.setAttribute("class", "config");
        var modif = document.createElement("a");
        var delet = document.createElement("a");
        var spanModif = document.createElement("span");
        var spanDelet = document.createElement("span");
        modif.setAttribute("href", "#");
        modif.setAttribute("class", "modif");
        delet.setAttribute("href", "#");
        delet.setAttribute("class", "delecte");
        spanModif.setAttribute("class", "glyphicon glyphicon-wrench");
        spanDelet.setAttribute("class", "glyphicon glyphicon-fire");
        modif.style.backgroundColor = "rgb(115, 201, 94)";
        modif.style.color = "white";
        modif.style.display = "inline-block";
        modif.style.width = "40px";
        modif.style.height = "40px";
        modif.style.borderRadius = "10px";
        delet.style.backgroundColor = "rgb(242, 69, 69)";
        delet.style.color = "white";
        delet.style.display = "inline-block";
        delet.style.width = "40px";
        delet.style.height = "40px";
        delet.style.borderRadius = "10px";
        spanModif.style.paddingTop = "10px";
        modif.style.marginRight = "10px";
        spanDelet.style.paddingTop = "10px";
        modif.appendChild(spanModif);
        delet.appendChild(spanDelet);
        divConf.appendChild(modif);
        divConf.appendChild(delet);
        shops[i].appendChild(divConf);
        modif.setAttribute("id", shops[i].getAttribute('id'));
        delet.setAttribute("id", shops[i].getAttribute('id'));
        
        //modificar una tienda
        modalShopModify(shops[i]);
        //eliminar una tienda
        delet.addEventListener("click", deleteShop(shops[i].getAttribute('id')));
   
    }
    
    var divShops, imgShops, divShopsContent, linksShops, names;
    divShops = document.createElement("div");
    divShops.setAttribute("id", "new");
  
    imgShops = document.createElement("img");
    imgShops.setAttribute("src", "./images/aniadirTienda.png");
    imgShops.setAttribute("alt", "tiendas");
    linksShops = document.createElement("a");
    linksShops.setAttribute("href", "#");
    linksShops.setAttribute("data-toggle", "modal");
    linksShops.setAttribute("data-target", "#createTienda");
    linksShops.appendChild(imgShops);
    names = document.createElement("h2");
    names.innerText = "Añadir";
    linksShops.appendChild(names);
    divShops.setAttribute("class", "col-md-3 text-center newShop");
    divShops.appendChild(linksShops);
    shopContent.appendChild(divShops);
    
    insertShop.addEventListener("click", insertNewShop);

}
function modalShopModify(shop) {
    var j = document.getElementById(shop.getAttribute("id"));
    j.addEventListener("click", modifyShop(shop.getAttribute("id")));
        
}

function clearConfCont() {
    /*Funcion para limpiar el config */
    var divConf = document.getElementsByClassName("config");
    for (let i = 0; i < divConf.length; i++) {
        var allChilds = divConf[i].children;
        while (allChilds.length > 0) {
            divConf[i].removeChild(allChilds[0]);
        }
    }
}
function clearNewShopCont() {
    /*Funcion para limpiar el config */
    var newShop = document.getElementsByClassName("newShop");
    for (let i = 0; i < newShop.length; i++) {
        var allChilds = newShop[i].children;
        while (allChilds.length > 0) {
            newShop[i].removeChild(allChilds[0]);
            newShop[i].style.display = "none";
        }
    }
}

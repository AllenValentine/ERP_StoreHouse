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
        
        modalShopModify(shops[i]);
        deleteShops(shops[i]);
        //modif.addEventListener("click", modifyShop(shops[i].getAttribute('id')));
        //delet.addEventListener("click", deleteShop(shops[i].getAttribute('id')));
   
    }
    
    //modif.addEventListener("click", modifyShop(shops[1].getAttribute('id')));
    var divShops, imgShops, divShopsContent, linksShops, names;
    divShops = document.createElement("div");
    divShops.setAttribute("id", "newShop");
  
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
    //no lo hago bien
    insertShop.addEventListener("click", insertNewShop);

}

function deleteShops(shop) {
    var shop = document.getElementById(shop.getAttribute("id"));
    shop.addEventListener("click", deleteShop(shop.getAttribute("id")));
    
}
function modalShopModify(shop) {
        //debugger;
    var j = document.getElementById(shop.getAttribute("id"));
    //console.log(j.getAttribute("id"));
    j.addEventListener("click", modifyShop(shop.getAttribute("id")));
        
}
/*
function deleteShop(hijo) {
    debugger;
    var itr = store.shops;
    var item = itr.next();
    while (!item.done) {
        if(item.value.name === hijo.parentNode.innerText){
            store.removeShop(item.value);
        }

        item = itr.next();
    }
    
    console.log(hijo.parentNode.innerText);
}*/
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

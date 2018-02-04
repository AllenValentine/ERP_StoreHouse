"use strict";

init();
function iniPopulate(){
    var store = StoreHouse.getInstance();
    var itrT1 = store.shops;
    var item = itrT1.next();
    var divShops, imgShops, divShopsContent, linksShops, names;
    var shopContent = document.getElementById("allShops");
    var imgShop="./images/shop.png";
    // var imgShop="https://www.jumblebee.co.uk/site/wp-content/uploads/2014/06/JB-FE-Shop_10.png";
    //var imgShop;
    while (!item.done) {
        console.log(item.value.name);
        divShops = document.createElement("div");
        divShopsContent= document.createElement("div");
        // FOTOS
        //imgShop='<img src="./images/shop.png " style="width:calc(100% - 40px)"> <h2>'+item.value.name+'</h2>';
        console.log(imgShop);
        imgShops = document.createElement("img");
        imgShops.setAttribute("src", "./images/shop.png");
        imgShops.setAttribute("alt", "tiendas");
        linksShops = document.createElement("a");
        linksShops.setAttribute("href", "#");
        linksShops.appendChild(imgShops);
        names = document.createElement("h2");
        names.innerText = item.value.name;
        linksShops.appendChild(names);
        // divShopsContent.appendChild(imgShops);
        // divShopsContent.appendChild('<img src="'+imgShop+'"/><h2>'+item.value.name+'</h2>')
        divShops.setAttribute("id", item.value.name);
        divShops.setAttribute("class", "col-md-3 text-center thumbnail");
        divShops.appendChild(divShopsContent);
        divShops.appendChild(linksShops);
        shopContent.appendChild(divShops);
        //divShopsContent.innerHTML = imgShop;
        item = itrT1.next();
    }
}

window.onload = iniPopulate;
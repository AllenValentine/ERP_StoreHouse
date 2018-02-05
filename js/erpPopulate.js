"use strict";

init();
var shopContent = document.getElementById("main-content");
var store = StoreHouse.getInstance();
function iniPopulate(){
    var itr = store.shops;
    var item = itr.next();
    var header = document.getElementById("nombreErp");
    var title = document.createElement("h1");
    title.innerText = StoreHouse.wHouse;
    header.appendChild(title);
    var divShops, imgShops, divShopsContent, linksShops, names;
    var imgShop="./images/shop.png";
    // var imgShop="https://www.jumblebee.co.uk/site/wp-content/uploads/2014/06/JB-FE-Shop_10.png";
    //var imgShop;
    while (!item.done) {
        //divShopsContent = document.createElement("div");
        //divShopsContent.setAttribute("id", "shops")
        divShops = document.createElement("div");
        // FOTOS
        //imgShop='<img src="./images/shop.png " style="width:calc(100% - 40px)"> <h2>'+item.value.name+'</h2>';
        
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
        divShops.setAttribute("class", "col-md-3 text-center shops");
        //divShops.appendChild(divShopsContent);
        divShops.appendChild(linksShops);
        shopContent.appendChild(divShops);
        //divShopsContent.innerHTML = imgShop;

        linksShops.addEventListener("click", shopPopulate(item.value));
        item = itr.next();
    }
}

function shopPopulate(shop) {
    var shopMain = shop;
    return function(){
        clearMainCont();
        shopsMenusPopulate(shop);
        menuCategoryShopPopulate(shop);
        var itr = store.getShopProducts(shop);
        var item = itr.next();
        var divProduct, imgProduct, linkProduct, names;
        var contentProducts = document.createElement("div");

        while(!item.done){
            divProduct = document.createElement("div");
            imgProduct = document.createElement("img");
            imgProduct.setAttribute("src", item.value.image);
            imgProduct.setAttribute("alt", "producto");
            linkProduct = document.createElement("a");
            linkProduct.setAttribute("href", "#");
            linkProduct.appendChild(imgProduct);
            names = document.createElement("h2");
            names.innerText = item.value.name;
            linkProduct.appendChild(names);
            divProduct.setAttribute("id", item.value.name);
            divProduct.setAttribute("class", "col-md-3 text-center thumbnail");
            divProduct.appendChild(linkProduct);
            shopContent.appendChild(divProduct);

            item = itr.next();
        }


      
    }
}



function menuCategoryShopPopulate(shop){
    
    clearMainCont();
    var itr = store.getShopCategory(shop);
    var item = itr.next();
    var pos, catLi,catA;
    var categories = [];
    var menuCat = document.createElement("nav");
    menuCat.setAttribute("class", "col-md-3");
    var catUl = document.createElement("ul");
    catUl.setAttribute("class", "nav nav-pills nav-stacked ulCategories")
    while(!item.done){
        if(item.value != ''){;
            function compareCategories(element) {
                return element === item.value.title;   
            }
            pos = categories.findIndex(compareCategories);
            if(pos === -1){
                categories.push(item.value.title);
            }
        }
        item = itr.next();
    }
    for (let i = 0; i < categories.length; i++) {
        //console.log(categories[i]);
        catA = document.createElement("a");
        catA.setAttribute("href", "#");
        catA.innerText = categories[i];
        catLi = document.createElement("li");
        catLi.setAttribute("id", categories[i]);
        catLi.appendChild(catA);
        catUl.appendChild(catLi);
        menuCat.appendChild(catUl);
        shopContent.appendChild(menuCat);       
    }

}


var menu = document.getElementById("menu");
function shopsMenusPopulate(shop) {
    clearMenuContent();
    var menuNav = document.createElement("nav");
    menuNav.setAttribute("id", "menuPrincipal");
    var menuUl = document.createElement("ul");
    var itr = store.shops;
    var item = itr.next();
    while (!item.done) {
        var menuLi = document.createElement("li");
        var menuA = document.createElement("a");
        menuA.setAttribute("href", "#");
        if(shop.name === item.value.name){
            menuA.setAttribute("class", "active");
        }
        menuLi.appendChild(menuA);
        menuUl.appendChild(menuLi);
        menuA.innerText = item.value.name;
        menuA.addEventListener("click", shopPopulate(item.value));

        item = itr.next();
    }
    menuNav.appendChild(menuUl);
    menu.appendChild(menuNav);

    
}



function clearMainCont(){
/*Funcion para limpiar el shopContent */
  var allChilds = shopContent.children;
  while(allChilds.length > 0) {
    shopContent.removeChild(allChilds[0]);
  }
}
function clearMenuContent(){
/*Funcion para limpiar el menu */
  var allMenu = menu.children;
  while(allMenu.length > 0) {
    menu.removeChild(allMenu[0]);
  }
}

window.onload = iniPopulate;

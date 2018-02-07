"use strict";

init();
var shopContent = document.getElementById("main-content");
var store = StoreHouse.getInstance();
function iniPopulate(){
    clearHeader();
    clearMenuContent();
    clearMainCont();
    var itr = store.shops;
    var item = itr.next();
    var header = document.getElementById("nombreErp");
    var title = document.createElement("img");
    title.setAttribute("src","images/logo.png");
    title.setAttribute("alt","logo");
    //title.innerText = StoreHouse.wHouse;
    header.appendChild(title);
    var divShops, imgShops, divShopsContent, linksShops, names;
    var imgShop="./images/shop.png";
    var i = 1;
    while (!item.done) {
        divShops = document.createElement("div");
        // FOTOS
        
        imgShops = document.createElement("img");
        imgShops.setAttribute("src", "./images/shop"+(i++)+".png");
        imgShops.setAttribute("alt", "tiendas");
        linksShops = document.createElement("a");
        linksShops.setAttribute("href", "#");
        linksShops.appendChild(imgShops);
        names = document.createElement("h2");
        names.innerText = item.value.name;
        linksShops.appendChild(names);
        divShops.setAttribute("id", item.value.name);
        divShops.setAttribute("class", "col-md-3 text-center shops");
        divShops.appendChild(linksShops);
        shopContent.appendChild(divShops);
       
        linksShops.addEventListener("click", shopPopulate(item.value));
        item = itr.next();
    }
}

function shopPopulate(shop) {
    return function(){
        clearMainCont();
        shopsMenusPopulate(shop);
        menuCategoryShopPopulate(shop);
        var itr = store.getShopProducts(shop);
        var item = itr.next();
        var divProduct, imgProduct, linkProduct, names;
        var products = document.createElement("div");

        while(!item.done){
            divProduct = document.createElement("div");
            imgProduct = document.createElement("img");
            imgProduct.setAttribute("src", item.value.image);
            imgProduct.setAttribute("alt", "producto");
            linkProduct = document.createElement("a");
            linkProduct.setAttribute("href", "#");
            linkProduct.appendChild(imgProduct);
            names = document.createElement("h4");
            names.innerText = item.value.name;
            linkProduct.appendChild(names);
            divProduct.setAttribute("id", item.value.name);
            divProduct.setAttribute("class", "col-md-3 text-center allProduct");
            divProduct.appendChild(linkProduct);
            shopContent.appendChild(divProduct);
            linkProduct.addEventListener("click", productShopPopulate(item.value, shop));

            item = itr.next();
        }
    }
}

function productShopPopulate(product, shop) {
    var pro = product;
    return function(){
        clearMainCont();
        shopsMenusPopulate(shop);
        menuCategoryShopPopulate(shop);
        var stock = store.getStock(shop, pro);
        var divProduct = document.createElement("div");//contenedor General
        divProduct.setAttribute("class", "col-md-9 product");
        var divRow = document.createElement("div");//fila 
        divRow.setAttribute("id", pro.name);
        divRow.setAttribute("class", "row");
        var divImg = document.createElement("div");
        divImg.setAttribute("class", "col-md-6 img");
        var divInfo = document.createElement("div");
        divInfo.setAttribute("class", "col-md-6 productInfo");
        var pName = document.createElement("p");
        var pPrice = document.createElement("p");
        var pInchs = document.createElement("p");
        var pPattent = document.createElement("p");
        var pStock = document.createElement("p");
        var bBuy = document.createElement("input");
        pName.setAttribute("name", pro.name);
        pName.innerText = "Producto: " + pro.name;
        pInchs.setAttribute("name", pro.inchs);
        pInchs.innerText = "Pulgadas: " + pro.inchs + '"';
        pPattent.setAttribute("name", pro.pattent);
        pPattent.innerText = "Marca: " + pro.pattent;
        pPrice.setAttribute("name", pro.price);  
        pPrice.innerText = "Precio: " + pro.price + " €(sin IVA)";
        pStock.setAttribute("name", stock);  
        pStock.innerText = "Disponible: " + stock;
        bBuy.setAttribute("type", "submit");
        bBuy.setAttribute("value", "Comprar");
        bBuy.setAttribute("name", "comprar");
        divInfo.appendChild(pName);
        divInfo.appendChild(pPrice);
        divInfo.appendChild(pInchs);
        divInfo.appendChild(pPattent);
        divInfo.appendChild(pStock);
        divInfo.appendChild(bBuy);
        var imgProduct = document.createElement("img");
        imgProduct.setAttribute("src", pro.image);
        imgProduct.setAttribute("alt", pro.name);
        var divDescrip = document.createElement("div");
        divDescrip.setAttribute("class", "col-md-9 description");
        var pDescrip = document.createElement("p");
        var hDescr = document.createElement("h2");
        hDescr.innerText = "Descripcion:";
        pDescrip.innerText = product.description;
        var global = document.createElement("a");
        global.setAttribute("href", "#");
        global.innerText = "Disponibilidad";

        divDescrip.appendChild(hDescr);
        divDescrip.appendChild(pDescrip); 
        divDescrip.appendChild(global);
        divImg.appendChild(imgProduct);
        divRow.appendChild(divImg);
        divRow.appendChild(divInfo);
        divRow.appendChild(divDescrip);
        divProduct.appendChild(divRow);
        shopContent.appendChild(divProduct);   
        global.addEventListener("click", globalProductPopulate(shop, pro));
    }
}
function globalProductPopulate(shop, product) {
    var prod = product;
    var totalPrice;
    return function(){
        clearMainCont();
        shopsMenusPopulate(shop);
        menuCategoryShopPopulate(shop);
        var stock = store.totalStock(prod);
        totalPrice = (prod.price * prod.tax) + prod.price;
        var productErp = document.createElement("div");
        productErp.setAttribute("class", "col-md-9");
        var product = document.createElement("div");
        product.setAttribute("class", "row");
        
        var divImg = document.createElement("div");
        divImg.setAttribute("class", "col-md-6");
        var divImage = document.createElement("div");
        divImage.setAttribute("class", "img");
        var imgProduct = document.createElement("img");
        imgProduct.setAttribute("src", prod.image);
        imgProduct.setAttribute("alt", prod.name);
        divImage.appendChild(imgProduct);
        divImg.appendChild(divImage);
        product.appendChild(divImg);
        productErp.appendChild(product);
        shopContent.appendChild(productErp);
        var divInfo = document.createElement("div");
        divInfo.setAttribute("class", "col-md-6");
        var divView = document.createElement("div");
        divView.setAttribute("class", "datos");
        divView.setAttribute("id", prod.name);

        var pName = document.createElement("p");
        var pPrice = document.createElement("p");
        var pInchs = document.createElement("p");
        var pPattent = document.createElement("p");
        var pStock = document.createElement("p");
        var bBack = document.createElement("input");
        pName.setAttribute("name", prod.name);
        pName.innerText = "Producto: " + prod.name;
        pInchs.setAttribute("name", prod.inchs);
        pInchs.innerText = "Pulgadas: " + prod.inchs + '"';
        pPattent.setAttribute("name", prod.pattent);
        pPattent.innerText = "Marca: " + prod.pattent;
        pPrice.setAttribute("name", totalPrice);  
        pPrice.innerText = "Precio: " + totalPrice + " €(con IVA)";
        pStock.setAttribute("name", stock);  
        pStock.innerText = "Disponible en '"+StoreHouse.wHouse+"': " + stock + " unidades";
        bBack.setAttribute("type", "submit");
        bBack.setAttribute("value", "volver");
        bBack.setAttribute("name", "volver");
        divView.appendChild(pName);
        divView.appendChild(pPrice);
        divView.appendChild(pInchs);
        divView.appendChild(pPattent);
        divView.appendChild(pStock);
        divView.appendChild(bBack);
        divInfo.appendChild(divView)
        product.appendChild(divInfo);
        productErp.appendChild(product);
        shopContent.appendChild(productErp);

        bBack.addEventListener("click", shopPopulate(shop));


       //console.log(store.totalStock(product));
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
    
    catUl.setAttribute("class", "nav nav-pills nav-stacked ulCategories");
    
    while(!item.done){
        if(item.value != ''){;
            function compareCategories(element) {
                return element.title === item.value.title;   
            }
            pos = categories.findIndex(compareCategories);
            if(pos === -1){
                categories.push(item.value);
            }
        }
        item = itr.next();
    }
    for (let i = 0; i < categories.length; i++) {
        //console.log(categories[i]);
        catA = document.createElement("a");
        catA.setAttribute("href", "#");
        catA.innerText = categories[i].title;
        catLi = document.createElement("li");
        catLi.setAttribute("id", categories[i].title);
        catLi.appendChild(catA);
        catUl.appendChild(catLi);
        menuCat.appendChild(catUl);
        shopContent.appendChild(menuCat);

        catA.addEventListener("click", productCategoryShopPopulate(shop,categories[i]));       
    }

}
//no va bien el getCategoryProduct
function productCategoryShopPopulate(shop, category) {
    return function(){
        clearMainCont();
        menuCategoryShopPopulate(shop);
        var divProduct, imgProduct, linkProduct, names, divContain;
        var itr = store.getCategoryProducts(shop, category);
        var item = itr.next();
        while (!item.done) {
            if(item.value !== ''){
                divProduct = document.createElement("div");
                imgProduct = document.createElement("img");
                divContain = document.createElement("div");
                divContain.setAttribute("class", "img");
                imgProduct.setAttribute("src", item.value.image);
                imgProduct.setAttribute("alt", "producto");
                linkProduct = document.createElement("a");
                linkProduct.setAttribute("href", "#");
                linkProduct.appendChild(imgProduct);
                names = document.createElement("h4");
                names.innerText = item.value.name;
                linkProduct.appendChild(names);
                divProduct.setAttribute("id", item.value.name);
                divProduct.setAttribute("class", "col-md-3 text-center");
                divProduct.appendChild(linkProduct);
                divContain.appendChild(divProduct);
                shopContent.appendChild(divContain);

                linkProduct.addEventListener("click", productShopPopulate(item.value, shop));
        
            }
            item = itr.next();
            
        }
    }
}


var menu = document.getElementById("menu");
function shopsMenusPopulate(shop) {
    clearMenuContent();
    var menuNav = document.createElement("nav");
    menuNav.setAttribute("id", "menuPrincipal");
    var menuUl = document.createElement("ul");
    var iniLi = document.createElement("li");
    var iniA = document.createElement("a");
    iniA.setAttribute("href", "#");
    var iniSpan = document.createElement("span");
    iniSpan.setAttribute("class", "glyphicon glyphicon-home");
    iniA.appendChild(iniSpan);
    iniLi.appendChild(iniA);
    menuUl.appendChild(iniLi);
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

    iniA.addEventListener("click", iniPopulate);

    
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

function clearHeader(){
    /*Funcion para limpiar el header */
    var nombreErp = document.getElementById("nombreErp");
    var name = nombreErp.children;
      while(name.length > 0) {
        nombreErp.removeChild(name[0]);
      }
    }

window.onload = iniPopulate;

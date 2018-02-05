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
            divProduct.setAttribute("class", "col-md-3 text-center thumbnail");
            divProduct.appendChild(linkProduct);
            shopContent.appendChild(divProduct);

            linkProduct.addEventListener("click", productShopPopulate(item.value, shop));

            item = itr.next();
        }
    }
}

function productShopPopulate(product, shop) {
    return function(){
        clearMainCont();
        shopsMenusPopulate(shop);
        menuCategoryShopPopulate(shop);
        var stock = store.getStock(shop, product);
        var divProduct = document.createElement("div");//contenedor General
        divProduct.setAttribute("class", "col-md-9 product");
        var divRow = document.createElement("div");//fila 
        divRow.setAttribute("id", product.name);
        divRow.setAttribute("class", "row");
        var divImg = document.createElement("div");
        divImg.setAttribute("class", "col-md-6 img");
        var divInfo = document.createElement("div");
        divInfo.setAttribute("class", "col-md-6 productInfo");
        var pName = document.createElement("p");
        var pPrice = document.createElement("p");
        var pStock = document.createElement("p");
        var bBuy = document.createElement("input");
        pName.setAttribute("name", product.name);
        pName.innerText = "Producto: " + product.name;
        pPrice.setAttribute("name", product.price);  
        pPrice.innerText = "Precio: " + product.price + " €";
        pStock.setAttribute("name", stock);  
        pStock.innerText = "Disponible: " + stock;
        bBuy.setAttribute("type", "submit");
        bBuy.setAttribute("value", "Comprar");
        bBuy.setAttribute("name", "comprar");
        divInfo.appendChild(pName);
        divInfo.appendChild(pPrice);
        divInfo.appendChild(pStock);
        divInfo.appendChild(bBuy);
        var imgProduct = document.createElement("img");
        imgProduct.setAttribute("src", product.image);
        imgProduct.setAttribute("alt", product.name);
        var divDescrip = document.createElement("div");
        divDescrip.setAttribute("class", "col-md-9 description");
        var pDescrip = document.createElement("p");

        pDescrip.innerText = product.description;
        var hDescr = document.createElement("h2");
        hDescr.innerText = "Descripcion:";
        divDescrip.appendChild(hDescr);
        divDescrip.appendChild(pDescrip); 
        divImg.appendChild(imgProduct);
        divRow.appendChild(divImg);
        divRow.appendChild(divInfo);
        divRow.appendChild(divDescrip);
        divProduct.appendChild(divRow);
        shopContent.appendChild(divProduct);


        
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
        var divProduct, imgProduct, linkProduct, names;
        var itr = store.getCategoryProducts(shop, category);
        var item = itr.next();
        while (!item.done) {
            if(item.value !== ''){
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
                divProduct.setAttribute("class", "col-md-3 text-center thumbnail");
                divProduct.appendChild(linkProduct);
                shopContent.appendChild(divProduct);

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

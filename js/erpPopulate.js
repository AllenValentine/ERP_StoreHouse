"use strict";

init();
var shopContent = document.getElementById("main-content");
var store = StoreHouse.getInstance();
//usuario y contraseña
var cookie = getCookie("username");
var usu = "prueba";
var passw = "prueba";
//cerrar ventanas
var divClose = document.getElementById("closeWindows");
divClose.appendChild(aCloseWindows());

//boton para logearse y que muestre que se ha logueado
var but = document.getElementById("log");
but.addEventListener("click", iniPopulate);
function iniPopulate() {
    clearHeader();
    clearMenuContent();


    var header = document.getElementById("nombreErp");
    var title = document.createElement("img");
    title.setAttribute("src", "images/logo.png");
    title.setAttribute("alt", "logo");
    header.appendChild(title);
    checkUser(usu, passw);
    if (document.cookie.length > 0) {
        var conf = document.createElement("a");
        var closeSession = document.createElement("a");
        var usr = document.createElement("span");
        conf.setAttribute("href", "#");
        closeSession.setAttribute("href", "#");
        conf.setAttribute("class", "btn btn-lg pull-right");
        closeSession.setAttribute("class", "closeSession pull-left");
        conf.setAttribute("id", "configuracion");
        usr.setAttribute("class", "usuario pull-left");
        usr.innerText = "Usuario: " + cookie;
        conf.innerText = "Configuracion";
        closeSession.innerText = "Cerrar Sesion";
        header.appendChild(usr);
        header.appendChild(conf);
        header.appendChild(closeSession);
        clearMainCont();
        conf.addEventListener("click", menuConf);
        closeSession.addEventListener("click", cleanCookie);

    } else {
        var user = document.createElement("a");
        user.setAttribute("href", "#");
        user.setAttribute("class", "btn btn-lg pull-right");
        user.setAttribute("id", "iniSesion");
        user.setAttribute("data-toggle", "modal");
        user.setAttribute("data-target", "#myModal");

        user.innerText = "Iniciar Sesion";

        header.appendChild(user);
    }

    createStructure();
    clearInputsModalLog();
}

function createStructure() {
    clearMainCont();
    var itr = store.shops;
    var item = itr.next();
    var divShops, imgShops, divShopsContent, linksShops, names;
    var imgShop = "./images/shop.png";
    var i = 1;

    while (!item.done) {
        divShops = document.createElement("div");
        // FOTOS

        imgShops = document.createElement("img");
        imgShops.setAttribute("src", "./images/shop" + (i++) + ".png");
        imgShops.setAttribute("alt", "tiendas");
        linksShops = document.createElement("a");
        linksShops.setAttribute("href", "#");
        linksShops.appendChild(imgShops);
        names = document.createElement("h2");
        names.innerText = item.value.name;
        linksShops.appendChild(names);
        divShops.setAttribute("id", item.value.cif);
        divShops.setAttribute("class", "col-md-3 text-center shops");
        divShops.appendChild(linksShops);
        shopContent.appendChild(divShops);

        linksShops.addEventListener("click", shopPopulate(item.value));
        item = itr.next();
    }
}

function shopPopulate(shop) {
    return function () {
        clearMainCont();
        shopsMenusPopulate(shop);
        menuCategoryShopPopulate(shop);
        createShopPopulate(shop);
    }
}

function createShopPopulate(shop) {
    var itr = store.getShopProducts(shop);
        var item = itr.next();
        var divProduct, imgProduct, linkProduct, names, divAllProducts, rowProducts;
        var products = document.createElement("div");

        divAllProducts = document.createElement("div");
        divAllProducts.setAttribute("class", "col-md-9");
        rowProducts = document.createElement("div");
        rowProducts.setAttribute("class", "row");

        while (!item.done) {
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
            divProduct.setAttribute("class", "col-md-4 text-center allProduct");
            divProduct.appendChild(linkProduct);
            rowProducts.appendChild(divProduct);
            divAllProducts.appendChild(rowProducts);
            shopContent.appendChild(divAllProducts);
            linkProduct.addEventListener("click", productShopPopulate(item.value, shop));

            item = itr.next();
        }
}

function productShopPopulate(product, shopPopu) {
    var shop = shopPopu;
    var pro = product;
    return function () {
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

        pName.setAttribute("name", pro.name);
        pName.innerText = "Producto: " + pro.name + ".";
        pPrice.setAttribute("name", pro.price);
        pPrice.innerText = "Precio: " + pro.price + " € (sin IVA).";

        divInfo.appendChild(pName);
        divInfo.appendChild(pPrice);

        if (pro instanceof Screens) {
            var pInchs = document.createElement("p");
            var pPattent = document.createElement("p");
            pInchs.setAttribute("name", pro.inchs);
            pInchs.innerText = "Pulgadas: " + pro.inchs + '".';
            pPattent.setAttribute("name", pro.pattent);
            pPattent.innerText = "Marca: " + pro.pattent + ".";
            divInfo.appendChild(pInchs);
            divInfo.appendChild(pPattent);
        }
        if (pro instanceof GraficCards) {
            var pType = document.createElement("p");
            pType.setAttribute("name", pro.type);
            pType.innerText = "Tipo: " + pro.type + '.';
            divInfo.appendChild(pType);
        }

        if (pro instanceof Computer) {
            var pRom = document.createElement("p");
            var pProcessor = document.createElement("p");
            pRom.setAttribute("name", pro.rom);
            pRom.innerText = "ROM: " + pro.rom + '.';
            pProcessor.setAttribute("name", pro.processor);
            pProcessor.innerText = "Procesador: " + pro.processor + ".";
            divInfo.appendChild(pRom);
            divInfo.appendChild(pProcessor);
        }

        var pStock = document.createElement("p");
        var bBuy = document.createElement("input");

        pStock.setAttribute("name", stock);
        pStock.innerText = "Disponible: " + stock + " unidades.";
        bBuy.setAttribute("type", "submit");
        bBuy.setAttribute("value", "Comprar");
        bBuy.setAttribute("name", "comprar");

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
        var ficha = document.createElement("a");
        ficha.setAttribute("href", "#");
        ficha.setAttribute("class", "ficha");
        ficha.innerText = "Ver Ficha";
        divDescrip.appendChild(hDescr);
        divDescrip.appendChild(pDescrip);
        divDescrip.appendChild(global);
        divDescrip.appendChild(ficha);
        divImg.appendChild(imgProduct);
        divRow.appendChild(divImg);
        divRow.appendChild(divInfo);
        divRow.appendChild(divDescrip);
        divProduct.appendChild(divRow);
        shopContent.appendChild(divProduct);
        global.addEventListener("click", globalProductPopulate(shop, pro));
        ficha.addEventListener("click", windowProduct(shop, pro));
    }
}
function globalProductPopulate(shop, product) {
    var prod = product;
    var totalPrice;
    return function () {
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
        pName.setAttribute("name", prod.name);
        pName.innerText = "Producto: " + prod.name;
        pPrice.setAttribute("name", totalPrice);
        pPrice.innerText = "Precio: " + totalPrice + " €(" + prod.tax + "% IVA)";
        divView.appendChild(pName);
        divView.appendChild(pPrice);


        if (prod instanceof Screens) {
            var pInchs = document.createElement("p");
            var pPattent = document.createElement("p");
            pInchs.setAttribute("name", prod.inchs);
            pInchs.innerText = "Pulgadas: " + prod.inchs + '".';
            pPattent.setAttribute("name", prod.pattent);
            pPattent.innerText = "Marca: " + prod.pattent + ".";
            divView.appendChild(pInchs);
            divView.appendChild(pPattent);

        }
        if (prod instanceof GraficCards) {
            var pType = document.createElement("p");
            pType.setAttribute("name", prod.type);
            pType.innerText = "Tipo: " + prod.type + '.';
            divView.appendChild(pType);
        }

        if (prod instanceof Computer) {
            var pRom = document.createElement("p");
            var pProcessor = document.createElement("p");
            pRom.setAttribute("name", prod.rom);
            pRom.innerText = "ROM: " + prod.rom + '.';
            pProcessor.setAttribute("name", prod.processor);
            pProcessor.innerText = "Procesador: " + prod.processor + ".";
            divView.appendChild(pRom);
            divView.appendChild(pProcessor);
        }
        var pPrice = document.createElement("p");
        var pStock = document.createElement("p");
        var pDescrip = document.createElement("p");
        var bBack = document.createElement("input");

        pStock.setAttribute("name", stock);
        pStock.innerText = "Disponible en '" + StoreHouse.wHouse + "': " + stock + " unidades";
        pDescrip.innerText = "Descripcion: \n" + prod.description;
        bBack.setAttribute("type", "submit");
        bBack.setAttribute("value", "volver");
        bBack.setAttribute("name", "volver");


        divView.appendChild(pStock);
        divView.appendChild(pDescrip);
        divView.appendChild(bBack);
        divInfo.appendChild(divView)
        product.appendChild(divInfo);
        productErp.appendChild(product);
        shopContent.appendChild(productErp);

        bBack.addEventListener("click", shopPopulate(shop));

    }
}



function menuCategoryShopPopulate(shop) {
    var shop = shop;
    clearMainCont();

    var itr = store.getShopCategory(shop);
    var item = itr.next();
    var pos, catLi, catA;
    var categories = [];
    var menuCat = document.createElement("nav");
    menuCat.setAttribute("class", "menuCategory col-md-3");
    var catUl = document.createElement("ul");

    catUl.setAttribute("class", "nav nav-pills nav-stacked ulCategories");

    while (!item.done) {
        if (item.value != '') {

            function compareCategories(element) {
                return element.title === item.value.title;
            }
            pos = categories.findIndex(compareCategories);
            if (pos === -1) {
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
        if (document.cookie.length > 0) {
            var modif = document.createElement("a");
            var delet = document.createElement("a");
            var spanModif = document.createElement("span");
            var spanDelet = document.createElement("span");
            modif.setAttribute("href", "#");
            modif.setAttribute("class", "modif");
            delet.setAttribute("href", "#");
            delet.setAttribute("class", "delete");
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
            modif.style.marginRight = "10px";
            modif.appendChild(spanModif);
            delet.appendChild(spanDelet);
            catLi.appendChild(modif);
            catLi.appendChild(delet);
            modif.addEventListener("click", modifCategory(xºcategories[i]));
            delet.addEventListener("click",  removeCat(shop, categories[i]));
        }

        catA.addEventListener("click", productCategoryShopPopulate(shop, categories[i]));
    }
    if (document.cookie.length > 0) {
        var catN = document.createElement("a")
        var img = document.createElement("img");
        img.setAttribute("src", "images/aniadirTienda.png");
        img.style.width = "30px";
        catN = document.createElement("a");
        catN.setAttribute("href", "#");

        catLi = document.createElement("li");
        catLi.setAttribute("id", "new");
        catN.appendChild(img);
        catLi.appendChild(catN);
        catUl.appendChild(catLi);
        menuCat.appendChild(catUl);
        shopContent.appendChild(menuCat);
        catN.addEventListener("click", function () {
            catN.setAttribute("data-toggle", "modal");
            catN.setAttribute("data-target", "#categories");
            var insertCategory = document.getElementById("insertarCat");
            insertCategory.addEventListener("click", aniadirCat);

        });
    }
}

function modifCategory(category){
    var category = category;
    return function () {
        var modif = document.getElementsByClassName("modif");
        for (let i = 0; i < modif.length; i++) {
            modif[i].setAttribute("data-toggle", "modal");
            modif[i].setAttribute("data-target", "#categories");

        }
        var insertCategory = document.getElementById("insertarCat");
        var title = document.getElementById("Title");
        var descript = document.getElementById("descript");
        title.value = category.title;
        descript.value = category.description;
        insertCategory.addEventListener("click", function(){
            category.title = title.value;
            category.description = descript.value; 
            insertCategory.setAttribute("data-dismiss", "modal");
        });
        
    }
}

function removeCat(shop, category){
    var category = category;
    var shop = shop;
    return function(){
        store.removeCategory(shop, category);
        //falta Actualizar el menu de categorias
        clearMainCont();
        menuCategoryShopPopulate(shop);
        createShopPopulate(shop);        
    }
}

//añadimos categorias.
function aniadirCat() {
    var insertCategory = document.getElementById("insertarCat");
    var title = document.getElementById("Title").value;
    var descript = document.getElementById("descript").value;
    var category = new Category(title);
    category.description = descript;
    store.addCategory(category);
    insertCategory.setAttribute("data-dismiss", "modal");
    clearInputsModalCategory();
}

function productCategoryShopPopulate(shop, category) {
    return function () {
        clearMainCont();
        menuCategoryShopPopulate(shop);
        var divProduct, imgProduct, linkProduct, names, divContain;
        var itr = store.getCategoryProducts(shop, category);
        var item = itr.next();
        while (!item.done) {
            if (item.value !== '') {
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

//CAMBIAR
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
        if (shop.name === item.value.name) {
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

function insertNewShop() {
    var divCif = document.getElementById("divCif");
    var divName = document.getElementById("divName");
    var cif = document.getElementById("cif").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var tel = document.getElementById("tel").value;
    var t = new Shop(cif, name);
    t.address = address;
    t.phone = tel;
    store.addShop(t);
    insertShop.setAttribute("data-dismiss", "modal");
    createStructure();
    clearInputsModalShop();
}
function modifyShop(cif) {
    var cif = cif;
    return function () {
        var modif = document.getElementsByClassName("modif");
        for (let i = 0; i < modif.length; i++) {
            modif[i].setAttribute("data-toggle", "modal");
            modif[i].setAttribute("data-target", "#createTienda");

        }

        var t = new Shop();
        t = store.getShop(cif);
        var nCif = document.getElementById("cif");
        var name = document.getElementById("name");
        var address = document.getElementById("address");
        var tel = document.getElementById("tel");
        nCif.value = t.cif;
        name.value = t.name;
        address.value = t.address;
        tel.value = t.phone;
        insertShop.removeEventListener("click", insertNewShop);
        insertShop.addEventListener("click", function () {
            t.name = name.value;
            t.address = address.value;
            t.phone = tel.value;
        });
        insertShop.setAttribute("data-dismiss", "modal");
        createStructure();
    }
}

function deleteShop(cif) {
    var cif = cif;
    return function () {
        var t = new Shop();
        t = store.getShop(cif);
        store.removeShop(t);
        createStructure();
    }
}

function clearMainCont() {
    /*Funcion para limpiar el shopContent */
    var allChilds = shopContent.children;
    while (allChilds.length > 0) {
        shopContent.removeChild(allChilds[0]);
    }
}
function clearMenuContent() {
    /*Funcion para limpiar el menu */
    var allMenu = menu.children;
    while (allMenu.length > 0) {
        menu.removeChild(allMenu[0]);
    }
}

function clearHeader() {
    /*Funcion para limpiar el header */
    var nombreErp = document.getElementById("nombreErp");
    var name = nombreErp.children;
    while (name.length > 0) {
        nombreErp.removeChild(name[0]);
    }
}
var formShop = document.getElementById("formShop");
function clearInputsModalShop() {
    formShop.reset();
}

var formShop = document.getElementById("formCategory");
function clearInputsModalCategory() {
    formCategory.reset();
}

var formLogin = document.getElementById("formLog");
function clearInputsModalLog() {
    formLogin.reset();
}
window.onload = iniPopulate;
"use strict";

var oWindows = [];

function windowProduct(shopERP, ProductERP) {
    var shop = shopERP;
    var product = ProductERP;
    return function () {
        var win = window.open("verFicha.html", "", "scrollbars=yes,resizable=yes,width=800,height=600");
        oWindows.push(win);

        win.onload = productPopulate(win, shop, product);

    }
}

function aCloseWindows() {
    var aCloseWindows = document.createElement("a");
    aCloseWindows.setAttribute("href", "#");
    aCloseWindows.innerText = "Cerrar Ventanas";
    aCloseWindows.addEventListener("click", closeWindows);

    return aCloseWindows;
}

function closeWindows() {
    for (var i = 0; i < oWindows.length; i++) {
        oWindows[i].close();
    }
}

function productPopulate(win, shopWindow, productWindow) {
    var shop = shopWindow;
    var product = productWindow;
    var store = StoreHouse.getInstance();

    return function () {
        //cabecera
        win.document.title = product.name;
        var header = win.document.getElementById("nombreErp");
        var imgLogo = win.document.createElement("img");
        imgLogo.setAttribute("src", "images/logo.png");
        imgLogo.setAttribute("alt", "logo");
        header.appendChild(imgLogo);

        var divFicha = win.document.getElementById("main-content");
        divFicha.style.margin = "0";
        var divContent = win.document.createElement("div");
        var divImg = win.document.createElement("div");
        divContent.setAttribute("class", "col-sm-6");
        divImg.setAttribute("class", "img");
        var h1Prod = win.document.createElement("h1");
        h1Prod.style.textAlign = "center";
        h1Prod.setAttribute("id", product.serialNumber);
        var img = win.document.createElement("img");
        img.setAttribute("src", product.image);
        h1Prod.innerText = product.name;
        divFicha.appendChild(h1Prod);
        divImg.appendChild(img);
        divContent.appendChild(divImg);
        divFicha.appendChild(divContent);

        //datos
        var divInfo = win.document.createElement("div");
        divInfo.setAttribute("class", "col-sm-6 datos");
        divFicha.appendChild(divInfo);

        //datos tienda

        var pTiendaCif = win.document.createElement("p");
        pTiendaCif.innerText = "CIF: " + shop.cif + ".";
        var pTiendaName = win.document.createElement("p");
        pTiendaName.innerText = "Nombre: " + shop.name + ".";
        var pTiendaAddress = win.document.createElement("p");
        pTiendaAddress.innerText = "Direccion: " + shop.address + ".";
        var pTiendaPhone = win.document.createElement("p");
        pTiendaPhone.innerText = "Telefono de Contacto: (+34) " + shop.phone + ".";

        divInfo.appendChild(pTiendaCif);
        divInfo.appendChild(pTiendaName);
        divInfo.appendChild(pTiendaAddress);
        divInfo.appendChild(pTiendaPhone);

        //datos producto

        var stock = store.totalStock(product);
        var totalPrice = (product.price * product.tax) + product.price;

        var pProductName = document.createElement("p");
        var pProductPrice = document.createElement("p");
        var pProductPriceIVA = document.createElement("p");
        var pProductInchs = document.createElement("p");
        var pProductPattent = document.createElement("p");
        var pProductStock = document.createElement("p");
        var pProductDescrip = document.createElement("p");
        var bBack = document.createElement("input");
        bBack.setAttribute("type", "submit");
        bBack.setAttribute("value", "Cerrar");
        bBack.setAttribute("name", "cerrar");
        pProductName.setAttribute("name", product.name);
        pProductName.innerText = "Producto: " + product.name + ".";
        divInfo.appendChild(pProductName);
        if (product instanceof Screens) {
            var pInchs = document.createElement("p");
            var pPattent = document.createElement("p");
            pInchs.setAttribute("name", product.inchs);
            pInchs.innerText = "Pulgadas: " + product.inchs + '".';
            pPattent.setAttribute("name", product.pattent);
            pPattent.innerText = "Marca: " + product.pattent + ".";
            divInfo.appendChild(pInchs);
            divInfo.appendChild(pPattent);
        }
        if (product instanceof GraficCards) {
            var pType = document.createElement("p");
            pType.setAttribute("name", product.type);
            pType.innerText = "Tipo: " + product.type + '.';
            divInfo.appendChild(pType);
        }

        if (product instanceof Computer) {
            var pRom = document.createElement("p");
            var pProcessor = document.createElement("p");
            pRom.setAttribute("name", product.rom);
            pRom.innerText = "ROM: " + product.rom + '.';
            pProcessor.setAttribute("name", product.processor);
            pProcessor.innerText = "Procesador: " + product.processor + ".";
            divInfo.appendChild(pRom);
            divInfo.appendChild(pProcessor);
        }

        pProductPrice.setAttribute("name", product.price);
        pProductPrice.innerText = "Precio: " + product.price + " € (sin IVA).";
        pProductPriceIVA.innerText = "Precio con IVA: " + totalPrice + " € (" + product.tax * 100 + "% IVA).";
        pProductStock.setAttribute("name", stock);
        pProductStock.innerText = "Disponible: " + stock + " unidades.";
        pProductDescrip.innerText = "Descripcion: \n" + product.description;

        
        divInfo.appendChild(pProductPrice);
        divInfo.appendChild(pProductPriceIVA);
        divInfo.appendChild(pProductStock);
        divInfo.appendChild(pProductDescrip);
        divInfo.appendChild(bBack);

        bBack.addEventListener("click", function () {
            win.close();
        });



    }
}
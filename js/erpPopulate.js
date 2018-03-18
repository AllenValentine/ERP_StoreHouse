"use strict";
initIDB();
//init();
var shopContent = document.getElementById("main-content");
var store = StoreHouse.getInstance();
//usuario y contraseña
var cookie = getCookie("username");
var usu = "prueba";
var passw = "prueba";

//boton para logearse y que muestre que se ha logueado
var but = document.getElementById("log");
but.addEventListener("click", iniPopulate);


function guardar() {
    var guardar = document.createElement("a");
    guardar.setAttribute("href", "#");
    guardar.innerText = "Guardar Estado";
    guardar.addEventListener("click", guardarEstado);

    return guardar;

}

function guardarEstado() {
    var shops = [];
    var categories = [];
    var shopString;
    var categoryString;

    if (!window.indexedDB) {
        window.alert("Tu navegador no soporta una version estable de indexedDB");
    }

    var db;
    var db_name = "StoreHouse13";
    var request = indexedDB.open(db_name, 1);
    request.onsuccess = function (event) {
        db = event.target.result;
        var almacenShops = db.transaction(["shops"], "readwrite");
        var recShop = almacenShops.objectStore("shops");
        recShop.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                shops.push(cursor.value);
                cursor.continue();
            } else {
                shopString = '{"shops": ' + JSON.stringify(shops) + '}';

                var almacenCategories = db.transaction(["categories"], "readwrite");
                var recCategory = almacenCategories.objectStore("categories");
                recCategory.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        categories.push(cursor.value);
                        cursor.continue();
                    } else {
                        categoryString = '{"categories": ' + JSON.stringify(categories) + '}';
                        $.ajax({
                            type: 'POST',
                            url: 'js/guardar.php',
                            data: { shops: shopString, categories: categoryString, user: usu }
                        })

                    }
                }
            }
        }
    }

}

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
        usr.innerText = "Usuario: " + usu;
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
    var divAllProducts, rowProducts;
    divAllProducts = document.createElement("div");
    divAllProducts.setAttribute("class", "col-md-9");
    divAllProducts.setAttribute("id", "divAllProducts");
    rowProducts = document.createElement("div");
    rowProducts.setAttribute("class", "row");
    rowProducts.setAttribute("id", "contentProducts");
    divAllProducts.appendChild(rowProducts);
    shopContent.appendChild(divAllProducts);
    createProducts(shop);
}
function createProducts(shop) {
    var rowProducts = document.getElementById("contentProducts");
    var dropProducts = document.getElementById("dropProduct");
    var itr = store.getShopProducts(shop);
    var item = itr.next();
    var divProduct, imgProduct, linkProduct, names;
    while (!item.done) {
        divProduct = document.createElement("div");
        imgProduct = document.createElement("img");
        imgProduct.setAttribute("src", item.value.image);
        imgProduct.setAttribute("alt", "producto");
        imgProduct.setAttribute("id", item.value.name + "/" + shop.cif);
        imgProduct.setAttribute("draggable", "true");
        if (document.cookie.length > 0) {
            imgProduct.addEventListener("dragstart", function(event){               
                event.dataTransfer.setData("text", event.target.id);
            });
        }
        linkProduct = document.createElement("a");
        linkProduct.setAttribute("href", "#");
        linkProduct.appendChild(imgProduct);
        names = document.createElement("h4");
        names.innerText = item.value.name;
        linkProduct.appendChild(names);
        divProduct.setAttribute("class", "col-md-4 text-center allProduct");

        divProduct.appendChild(linkProduct);
        rowProducts.appendChild(divProduct);

        linkProduct.addEventListener("click", productShopPopulate(item.value, shop));


        if (document.cookie.length > 0) {
            var delet = document.createElement("a");
            var spanDelet = document.createElement("span");
            delet.setAttribute("href", "#");
            delet.setAttribute("class", "delete");

            spanDelet.setAttribute("class", "glyphicon glyphicon-fire");
            delet.style.backgroundColor = "rgb(242, 69, 69)";
            delet.style.color = "white";
            delet.style.display = "inline-block";
            delet.style.width = "40px";
            delet.style.height = "40px";
            delet.style.borderRadius = "10px";
            spanDelet.style.paddingTop = "10px";
            delet.appendChild(spanDelet);
            divProduct.appendChild(delet);

            delet.addEventListener("click", removeProd(item.value, shop));
            dropProducts.addEventListener("dragover", allowDropProduct);
            dropProducts.addEventListener("drop", dropProduct);

        }
        item = itr.next();
    }
    if (document.cookie.length > 0) {
        var divProduct, imgProduct, linksAddProducts, names;
        divProduct = document.createElement("div");
        divProduct.setAttribute("id", "newProd");

        imgProduct = document.createElement("img");
        imgProduct.setAttribute("src", "./images/aniadirTienda.png");
        imgProduct.setAttribute("alt", "tiendas");
        linksAddProducts = document.createElement("a");
        linksAddProducts.setAttribute("href", "#");
        linksAddProducts.setAttribute("data-toggle", "modal");
        linksAddProducts.setAttribute("data-target", "#products");
        linksAddProducts.appendChild(imgProduct);
        names = document.createElement("h2");
        names.innerText = "Añadir";
        linksAddProducts.appendChild(names);
        divProduct.setAttribute("class", "col-md-3 text-center newShop");
        divProduct.appendChild(linksAddProducts);
        rowProducts.appendChild(divProduct);
        var mainModal = document.createElement("div");
        mainModal.setAttribute("id", "mainModalProd");
        formProduct.appendChild(mainModal);
        var optionModalProducts = document.createElement("div");
        optionModalProducts.setAttribute("id", "options");
        formProduct.appendChild(optionModalProducts);
        linksAddProducts.addEventListener("click", createNewProd(shop));
    }
}

function removeProdDragDrop(data) {
    var data = data;
    debugger;
    var ProductToRemove = data.split("/");
    var prod = ProductToRemove[0];
    var shop = ProductToRemove[1];
    var shop = store.getShop(shop);
    console.log(shop);
    var db;
    var db_name = "StoreHouse13";
    var request = indexedDB.open(db_name, 1);
    request.onsuccess = function (event) {
        db = event.target.result;
        var almacenShops = db.transaction(["shops"], "readwrite");
        var delProd = almacenShops.objectStore("shops");
        var request = delProd.get(shop.cif);
        request.onsuccess = function (event) {
            var nShop = event.target.result;
            var i = nShop.products.findIndex(function (element) {
                return element.product.name === prod;
            });
            if (i != -1) {
                nShop.products.splice(i, 1);
                var deleted = delProd.put(nShop);

                console.log("Se ha eliminado un producto.");
                var product = store.getProduct(shop, prod);
                store.removeProduct(product);
                clearDivProducts();
                createProducts(shop);

            }
        }
    }
}

//creamos un nuevo producto tanto en el almacen como en el ERP
function createNewProd(shop) {

    var formProduct = document.getElementById("formProduct");
    var mainModal = document.getElementById("mainModalProd");
    var optionModalProducts = document.getElementById("options");
    var h4 = document.getElementById("tiend");
    h4.innerText = "Tienda: " + shop.name;

    clearModalformProd();
    var divSelect = document.createElement("div");
    divSelect.setAttribute("class", "form-group");
    divSelect.setAttribute("id", "divSelect");

    var labelSelect = document.createElement("label");
    labelSelect.setAttribute("for", "prod");
    labelSelect.innerText = "Producto ";
    var prodSelect = document.createElement("select");
    prodSelect.setAttribute("name", "producto");
    prodSelect.setAttribute("id", "prod");
    var optionProd = document.createElement("option");
    optionProd.setAttribute("value", "");
    optionProd.innerText = "";
    var optionProd1 = document.createElement("option");
    optionProd1.setAttribute("value", "1");
    optionProd1.innerText = "Monitores";
    var optionProd2 = document.createElement("option");
    optionProd2.setAttribute("value", "2");
    optionProd2.innerText = "Tarjeta Grafica";
    var optionProd3 = document.createElement("option");
    optionProd3.setAttribute("value", "3");
    optionProd3.innerText = "Ordenador";
    prodSelect.appendChild(optionProd);
    prodSelect.appendChild(optionProd1);
    prodSelect.appendChild(optionProd2);
    prodSelect.appendChild(optionProd3);
    divSelect.appendChild(labelSelect);
    divSelect.appendChild(prodSelect);
    mainModal.appendChild(divSelect);


    var divName = document.createElement("div");
    divName.setAttribute("class", "form-group");
    divName.setAttribute("id", "divName");
    var labelName = document.createElement("label");
    labelName.setAttribute("for", "nameProd");
    labelName.innerText = "Nombre";
    var inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "form-control");
    inputName.setAttribute("id", "nameProd");
    inputName.setAttribute("placeholder", "Nombre Producto");
    divName.appendChild(labelName);
    divName.appendChild(inputName);
    mainModal.appendChild(divName);

    var divPrice = document.createElement("div");
    divPrice.setAttribute("class", "form-group");
    divPrice.setAttribute("id", "divPrice");
    var labelPrice = document.createElement("label");
    labelPrice.setAttribute("for", "priceProd");
    labelPrice.innerText = "Precio";
    var inputPrice = document.createElement("input");
    inputPrice.setAttribute("type", "text");
    inputPrice.setAttribute("class", "form-control");
    inputPrice.setAttribute("id", "priceProd");
    inputPrice.setAttribute("placeholder", "Precio Producto");
    divPrice.appendChild(labelPrice);
    divPrice.appendChild(inputPrice);
    mainModal.appendChild(divPrice);
    var typeProd = document.getElementById("prod");

    typeProd.addEventListener("change", valorOptionProd(shop));
}

function valorOptionProd(shop) {

    return function () {
        //Recogemos el value del select
        var typeProd = document.getElementById("prod");
        var indice = typeProd.selectedIndex;
        var valor = typeProd.options[indice].value;
        createModalProduct(parseInt(valor), shop);
    }
}

function createModalProduct(prodSelect, shop) {
    var formProduct = document.getElementById("formProduct");
    var optionModalProducts = document.getElementById("options");
    if (prodSelect === 1) {
        clearModalOptionProduct();
        var divInchs = document.createElement("div");
        divInchs.setAttribute("class", "form-group");
        divInchs.setAttribute("id", "divInchs");
        var labelInchs = document.createElement("label");
        labelInchs.setAttribute("for", "inchsProd");
        labelInchs.innerText = "Pulgadas";
        var inputInchs = document.createElement("input");
        inputInchs.setAttribute("type", "text");
        inputInchs.setAttribute("class", "form-control");
        inputInchs.setAttribute("id", "inchsProd");
        inputInchs.setAttribute("placeholder", "Pulgadas");
        divInchs.appendChild(labelInchs);
        divInchs.appendChild(inputInchs);
        optionModalProducts.appendChild(divInchs);

        var divPattent = document.createElement("div");
        divPattent.setAttribute("class", "form-group");
        divPattent.setAttribute("id", "divPattent");
        var labelPattent = document.createElement("label");
        labelPattent.setAttribute("for", "pattentProd");
        labelPattent.innerText = "Marca";
        var inputPattent = document.createElement("input");
        inputPattent.setAttribute("type", "text");
        inputPattent.setAttribute("class", "form-control");
        inputPattent.setAttribute("id", "pattentProd");
        inputPattent.setAttribute("placeholder", "Marca Producto");
        divPattent.appendChild(labelPattent);
        divPattent.appendChild(inputPattent);
        optionModalProducts.appendChild(divPattent);
    }
    if (prodSelect === 2) {
        clearModalOptionProduct();
        var divType = document.createElement("div");
        divType.setAttribute("class", "form-group");
        divType.setAttribute("id", "divType");
        var labelType = document.createElement("label");
        labelType.setAttribute("for", "pattentProd");
        labelType.innerText = "Tipo";
        var inputType = document.createElement("input");
        inputType.setAttribute("type", "text");
        inputType.setAttribute("class", "form-control");
        inputType.setAttribute("id", "typeProd");
        inputType.setAttribute("placeholder", "Tipo Producto");
        divType.appendChild(labelType);
        divType.appendChild(inputType);
        optionModalProducts.appendChild(divType);
    }
    if (prodSelect === 3) {
        clearModalOptionProduct();
        var divRom = document.createElement("div");
        divRom.setAttribute("class", "form-group");
        divRom.setAttribute("id", "divRom");
        var labelRom = document.createElement("label");
        labelRom.setAttribute("for", "romProd");
        labelRom.innerText = "ROM";
        var inputRom = document.createElement("input");
        inputRom.setAttribute("type", "text");
        inputRom.setAttribute("class", "form-control");
        inputRom.setAttribute("id", "romProd");
        inputRom.setAttribute("placeholder", "ROM");
        divRom.appendChild(labelRom);
        divRom.appendChild(inputRom);
        optionModalProducts.appendChild(divRom);

        var divProcessor = document.createElement("div");
        divProcessor.setAttribute("class", "form-group");
        divProcessor.setAttribute("id", "divProcessor");
        var labelProcessor = document.createElement("label");
        labelProcessor.setAttribute("for", "processorProd");
        labelProcessor.innerText = "Procesador";
        var inputProcessor = document.createElement("input");
        inputProcessor.setAttribute("type", "text");
        inputProcessor.setAttribute("class", "form-control");
        inputProcessor.setAttribute("id", "processorProd");
        inputProcessor.setAttribute("placeholder", "Procesador");
        divProcessor.appendChild(labelProcessor);
        divProcessor.appendChild(inputProcessor);
        optionModalProducts.appendChild(divProcessor);
    }
    var divDescript = document.createElement("div");
    divDescript.setAttribute("class", "form-group");
    divDescript.setAttribute("id", "divDescript");
    var labelDescript = document.createElement("label");
    labelDescript.setAttribute("for", "processorProd");
    labelDescript.innerText = "Descripcion";
    var inputDescript = document.createElement("input");
    inputDescript.setAttribute("type", "text");
    inputDescript.setAttribute("class", "form-control");
    inputDescript.setAttribute("id", "descriptProd");
    inputDescript.setAttribute("placeholder", "Descripcion");
    divDescript.appendChild(labelDescript);
    divDescript.appendChild(inputDescript);
    optionModalProducts.appendChild(divDescript);

    var divSelect = document.createElement("div");
    divSelect.setAttribute("class", "form-group");
    divSelect.setAttribute("id", "divSelectCat");
    optionModalProducts.appendChild(divSelect);

    var labelSelect = document.createElement("label");
    labelSelect.setAttribute("for", "cat");
    labelSelect.innerText = "Categoria";
    var catSelect = document.createElement("select");
    catSelect.setAttribute("name", "categories");
    catSelect.setAttribute("class", "form-control");
    catSelect.setAttribute("id", "category");
    divSelect.appendChild(labelSelect);
    divSelect.appendChild(catSelect);
    var itr = store.categories;
    var item = itr.next();
    while (!item.done) {
        var cat = document.createElement("option");
        cat.setAttribute("value", item.value.title);
        cat.innerText = item.value.title;
        catSelect.appendChild(cat);
        item = itr.next();
    }
    var divStock = document.createElement("div");
    divStock.setAttribute("class", "form-group");
    divStock.setAttribute("id", "divStock");
    var labelStock = document.createElement("label");
    labelStock.setAttribute("for", "stockProd");
    labelStock.innerText = "Stock";
    var inputCat = document.createElement("input");
    inputCat.setAttribute("type", "number");
    inputCat.setAttribute("class", "form-control");
    inputCat.setAttribute("min", "1");
    inputCat.setAttribute("id", "stockProd");
    divStock.appendChild(labelStock);
    divStock.appendChild(inputCat);
    optionModalProducts.appendChild(divStock);
    var selectCat = document.getElementById("category");
    selectCat.onchange = function () {
        var indice = selectCat.selectedIndex;
        var valor = selectCat.options[indice].value;


    };
    var insertarProd = document.getElementById("insertarProd");
    insertarProd.addEventListener("click", function () {
        var name = document.getElementById("nameProd");
        if (name.value === "") {
            name.setAttribute("placeholder", "Introduce un Nombre");
            name.style.border = "1px solid rgb(255, 0, 0)";
            return false;
        }
        var price = document.getElementById("priceProd");
        if (price.value === "") {
            price.setAttribute("placeholder", "Introduce el Precio");
            price.style.border = "1px solid rgb(255, 0, 0)";
            return false;
        }
        if (prodSelect === 1) {
            var inchs = document.getElementById("inchsProd");
            if (inchs.value === "") {
                inchs.setAttribute("placeholder", "Introduce las Pulgadas");
                inchs.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var pattent = document.getElementById("pattentProd");
            if (pattent.value === "") {
                pattent.setAttribute("placeholder", "Introduce la Marca");
                pattent.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var prod = new Screens(name.value, price.value, inchs.value, pattent.value);
        }
        if (prodSelect === 2) {
            var type = document.getElementById("typeProd");
            if (type.value === "") {
                type.setAttribute("placeholder", "Introduce el Tipo");
                type.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var prod = new GraficCards(name.value, price.value, type.value);
        }
        if (prodSelect === 3) {
            var rom = document.getElementById("romProd");
            if (rom.value === "") {
                rom.setAttribute("placeholder", "Introduce la ROM");
                rom.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var processor = document.getElementById("processorProd");
            if (processor.value === "") {
                processor.setAttribute("placeholder", "Introduce el Procesador");
                processor.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var prod = new Computer(name.value, price.value, rom.value, processor.value);
        }
        var descript = document.getElementById("descriptProd");
        prod.descript = descript.value;
        prod.image = "./images/prox.png";
        var stock = document.getElementById("stockProd");
        var cat = store.getCategory(selectCat.value);

        /***
         * INDEXED DB
         */
        var db;
        var db_name = "StoreHouse13";
        var request = indexedDB.open(db_name, 1);
        request.onsuccess = function (event) {
            db = event.target.result;
            var almacenShops = db.transaction(["shops"], "readwrite");
            var newProd = almacenShops.objectStore("shops");
            var request = newProd.get(shop.cif);
            request.onsuccess = function (event) {
                var nShop = event.target.result;
                if (prodSelect === 1) {
                    var pro = {
                        product: {
                            name: name.value,
                            price: price.value,
                            inchs: inchs.value,
                            pattent: pattent.value,
                            tax: 0.21,
                            description: descript.value,
                            image: "./images/prox.png",
                            tProduct: "Screen"
                        },
                        categories: [{
                            title: cat.title,
                            description: cat.description
                        }],
                        stock: stock.value
                    };
                    var insertProd = nShop.products.push(pro);

                }
                if (prodSelect === 2) {
                    var pro = {
                        product: {
                            name: name.value,
                            price: price.value,
                            type: type.value,
                            tax: 0.21,
                            description: descript.value,
                            image: "./images/prox.png",
                            tProduct: "GraficCard"
                        },
                        categories: [{
                            title: cat.title,
                            description: cat.description
                        }],
                        stock: stock.value
                    };
                    var insertProd = nShop.products.push(pro);
                }
                if (prodSelect === 3) {
                    var pro = {
                        product: {
                            name: name.value,
                            price: price.value,
                            rom: rom.value,
                            processor: processor.value,
                            tax: 0.21,
                            description: descript.value,
                            image: "./images/prox.png",
                            tProduct: "Computer"
                        },
                        categories: [{
                            title: cat.title,
                            description: cat.description
                        }],
                        stock: stock.value
                    };
                    var insertProd = nShop.products.push(pro);
                }



                console.log("Producto Insertado");
                var insertProdu = newProd.put(nShop);
                store.addProduct(shop, prod, cat);
                store.addQuantityProductInShop(shop, prod, stock.value);
                clearDivProducts();
                clearModalOptionProduct();
                createProducts(shop);

                insertProdu.onerror = function (event) {
                    console.error(event);
                };
            }
        }


        insertarProd.setAttribute("data-dismiss", "modal");


    });

}
//Eliminamos un producto tanto en el almacen como en el ERP
function removeProd(prod, shop) {
    var prod = prod;
    var shop = shop;
    return function () {

        /***
         * INDEXED DB
         */
        var db;
        var db_name = "StoreHouse13";
        var request = indexedDB.open(db_name, 1);
        request.onsuccess = function (event) {
            db = event.target.result;
            var almacenShops = db.transaction(["shops"], "readwrite");
            var delProd = almacenShops.objectStore("shops");
            var request = delProd.get(shop.cif);
            request.onsuccess = function (event) {
                var nShop = event.target.result;
                var i = nShop.products.findIndex(function (element) {
                    return element.product.name == prod.name;
                });
                if (i != -1) {
                    nShop.products.splice(i, 1);
                    var deleted = delProd.put(nShop);

                    console.log("Se ha eliminado un producto.");
                    store.removeProduct(prod);
                    clearDivProducts();
                    createProducts(shop);
                }
            }
        }

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
        pStock.innerText = "Disponible en '" + store.wHouse + "': " + stock + " unidades";
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
            modif.addEventListener("click", modifCategory(categories[i]));
            delet.addEventListener("click", removeCat(shop, categories[i]));
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
            insertCategory.addEventListener("click", aniadirCat(shop));

        });
    }
}
//modificamos una categoria tanto en el almacen como en el ERP
function modifCategory(category) {
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
        insertCategory.addEventListener("click", function () {
            category.title = title.value;
            category.description = descript.value;
            var db;
            var db_name = "StoreHouse13";
            var request = indexedDB.open(db_name, 1);
            request.onsuccess = function (event) {
                db = event.target.result;
                var storeCats = db.transaction(["categories"], "readwrite").objectStore("categories");
                var oldCat = storeCats.get(title.value); //obtenemos la categoria especifica
                oldCat.onsuccess = function (event) {
                    var cat = oldCat.result;
                    cat.title = title.value;
                    cat.description = descript.value;
                    //debugger;
                    var modCat = storeCats.put(cat);
                    modCat.onsuccess = function (event) {
                        console.log("Categoria Modificada");
                    }
                }
            }
            insertCategory.setAttribute("data-dismiss", "modal");
        });

    }
}
//borramos una categoria. tanto en el almacen como en el ERP
function removeCat(shop, category) {
    var category = category;
    var shop = shop;
    return function () {
        var db;
        var db_name = "StoreHouse13";
        var request = indexedDB.open(db_name, 1);
        request.onsuccess = function (event) {
            db = event.target.result;
            var almacenShops = db.transaction(["shops"], "readwrite");
            var delProd = almacenShops.objectStore("shops");
            var request = delProd.get(shop.cif);
            request.onsuccess = function (event) {
                var nShop = event.target.result;
                var products = nShop.products;
                for (const i in products) {
                    var j = products[i].categories.findIndex(function (element) {
                        return element.title == category.title;
                    });

                    if (j != -1) {
                        products[i].categories.splice(i, 1);
                        var deleted = delProd.put(nShop);
                        store.removeCategory(shop, category);

                        clearMainCont();
                        createShopPopulate(shop);
                    }
                }
            }
        }
    }
}

//añadimos categorias tanto en el almacen como en el ERP.
function aniadirCat(shop) {
    var insertCategory = document.getElementById("insertarCat");
    var title = document.getElementById("Title").value;
    var descript = document.getElementById("descript").value;

    var db;
    var db_name = "StoreHouse13";
    var request = indexedDB.open(db_name, 1);
    request.onsuccess = function (event) {
        var newCat = { title: title, description: descript };
        db = event.target.result;
        var storeCat = db.transaction(["categories"], "readwrite");
        var categ = storeCat.objectStore("categories", { keyPath: "title" });
        var insertCat = categ.add(newCat);
        insertCat.onsuccess = function (event) {
            console.log("Categoria Añadida");
            var category = new Category(title);
            category.description = descript;
            store.addCategory(category);
            //menuCategoryShopPopulate(shop);
            clearInputsModalCategory();
        }
    }
    insertCategory.setAttribute("data-dismiss", "modal");
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

var menu = document.getElementById("menu");
var menuNav = document.createElement("nav");
menuNav.setAttribute("id", "menuPrincipal");
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
    var iniLiDrop = document.createElement("li");
    iniLiDrop.setAttribute("id", "menuDrop")
    var iniADrop = document.createElement("a");
    iniADrop.setAttribute("href", "#");
    iniADrop.innerText = "Tiendas";
    iniLiDrop.appendChild(iniADrop);
    menuUl.appendChild(iniLiDrop);
    iniLiDrop.addEventListener("mouseenter", menuDrop(iniLiDrop));
    iniLiDrop.addEventListener("mouseleave", removeMenuDrop);

    menuNav.appendChild(menuUl);
    menu.appendChild(menuNav);
    //cerrar ventanas
    var closeLi = document.createElement("li");
    closeLi.setAttribute("class", "pull-right");
    if (document.cookie.length > 0) {
        var guardarEstado = document.createElement("li");
        guardarEstado.setAttribute("class", "pull-right");
        guardarEstado.appendChild(guardar());
        menuUl.appendChild(guardarEstado);
    }
    var mapLi = document.createElement("li");
    mapLi.appendChild(createMap());
    menuUl.appendChild(mapLi);
    closeLi.appendChild(aCloseWindows());
    menuUl.appendChild(closeLi);

    iniA.addEventListener("click", iniPopulate);
}

function createMap() {
    var aMap = document.createElement("a");
    aMap.setAttribute("href", "#");
    aMap.setAttribute("id", "modalMap");
    aMap.innerText = "Mapa";
    aMap.addEventListener("click", mostrarMap);
    return aMap;
}

function mostrarMap() {
    var modalMap = document.getElementById("modalMap");
    modalMap.setAttribute("data-toggle", "modal");
    modalMap.setAttribute("data-target", "#maps");

    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.97601392352668, lng: -3.9300159735242914 },
        zoom: 12
    });


    var infoWindow = new google.maps.InfoWindow({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var marker = new google.maps.Marker({
                position: center,
                icon: "images/bluePointer.png",
                animation: google.maps.Animation.BOUNCE
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent('estamos aquí.');
            map.setCenter(pos);
            marker.setMap(map);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    var cont = 1;
    var db;
    var db_name = "StoreHouse13";
    var request = indexedDB.open(db_name, 1);
    request.onsuccess = function (event) {
        db = event.target.result;
        var shopTrans = db.transaction(["shops"]);
        var storeShop = shopTrans.objectStore("shops");
        storeShop.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {

                var shop = new google.maps.LatLng(cursor.value.shop.coords.latitud, cursor.value.shop.coords.longitud);
                var marker = new google.maps.Marker({
                    position: shop,
                    icon: "images/greenPointer.png",
                    map: map
                });
                var contentString = "<div id='content'>" +
                    "<h1>" + cursor.value.shop.name + "</h1>" +
                    "<img class='pull-right' src='images/shop" + cont + ".png' alt='tienda1' witdh=100px height=100px>" +
                    "<p><b>Telefono:</b> " + cursor.value.shop.phone + "</p>" +
                    "<p><b>Direccion:</b>" + cursor.value.shop.address + "</p>"
                    + "</div>";
                var infowindows = new google.maps.InfoWindow({
                    content: contentString
                });
                marker.addListener("click", function () {
                    infowindows.open(map, marker);
                });
                cont++;
                cursor.continue();
            }
        }
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: El servicio de localizacion ha fallado.' :
        'Error: El navegador no soporta esta aplicacion.');
}



function menuDrop(li) {
    var li = li;
    return function () {
        var divDrop = document.createElement("div");
        divDrop.setAttribute("id", "drop");
        divDrop.style.display = "block";
        li.appendChild(divDrop);
        var itr = store.shops;
        var item = itr.next();
        while (!item.done) {
            var menuA = document.createElement("a");
            menuA.setAttribute("href", "#");
            divDrop.appendChild(menuA);
            menuA.innerText = item.value.name;
            menuA.addEventListener("click", shopPopulate(item.value));

            item = itr.next();
        }

    }
}
function removeMenuDrop() {
    /*Funcion que remueve el menu desplegable mostrado */
    var divDrop = document.getElementById("drop");
    divDrop.style.display = "hidden";
    divDrop.parentElement.removeChild(divDrop);
}

//insertamos una tienda tanto en el almacen como en el ERP
function insertNewShop() {
    var divCif = document.getElementById("divCif");
    var divName = document.getElementById("divName");
    var cif = document.getElementById("cif").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var tel = document.getElementById("tel").value;
    //indexedDB
    var db;
    var db_name = "StoreHouse13";
    var request = indexedDB.open(db_name, 1);
    request.onsuccess = function (event) {// si conectamos...
        //creamos la estructura de la nueva tienda
        var tIDB = {
            shop:
                { cif: cif, name: name, phone: tel, address: address },
            products: []
        };
        db = event.target.result;
        //obtenemos un objeto con las tiendas en modo lectura escritura
        var shopTrans = db.transaction(["shops"], "readwrite");
        var storeShop = shopTrans.objectStore("shops", { keyPath: "shop.cif" });
        var correct = storeShop.add(tIDB); //añadimos la tienda al almacen
        correct.onsuccess = function () { //si se añade correctamente...
            console.log("Tienda creada Correctamente");
            var t = new Shop(cif, name);
            store.addShop(t);
            createStructure();
            clearInputsModalShop();
        }
    }
    insertShop.setAttribute("data-dismiss", "modal");
}

//Modificamos una tienda tanto en el almacen como en el ERP
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
            //abrimos el almacen
            var db;
            var db_name = "StoreHouse13";
            var request = indexedDB.open(db_name, 1);
            request.onsuccess = function (event) { //en caso correcto...
                db = event.target.result;
                //obtenemos un objeto con las tiendas en modo lectura escritura
                var storeShops = db.transaction(["shops"], "readwrite").objectStore("shops");
                var oldShop = storeShops.get(nCif.value); //obtenemos la tienda especifica
                oldShop.onsuccess = function (event) { //en el caso de acierto...
                    //Modificamos los resultados
                    var shop = oldShop.result;
                    shop.shop.name = name.value;
                    shop.shop.phone = tel.value;
                    shop.shop.address = address.value;
                    //añadimos los resultados al almacen
                    var modShop = storeShops.put(shop);
                    modShop.onsuccess = function (event) {
                        console.log("Tienda Modificada");
                        createStructure();
                    }

                }
            }
        });
        insertShop.setAttribute("data-dismiss", "modal");
    }
}
//Borramos una tienda tanto en el almacen como en el ERP
function deleteShop(cif) {
    var cif = cif;
    return function () {
        //abrimos el almacen
        var db;
        var db_name = "StoreHouse13";
        var request = indexedDB.open(db_name, 1);
        request.onsuccess = function (event) {
            db = event.target.result;
            //obtenemos un objeto con las tiendas en modo lectura escritura
            var request1 = db.transaction(["shops"], "readwrite").objectStore("shops");
            var remShop = request1.delete(cif); //eliminamos la tienda del almacen
            remShop.onsuccess = function (event) { //en el caso de acierto...
                var t = new Shop();
                t = store.getShop(cif);
                store.removeShop(t);
                createStructure();
            }
        }

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
function clearModalformProd() {
    var formProduct = document.getElementById("mainModalProd");
    var name = formProduct.children;
    while (name.length > 0) {
        formProduct.removeChild(name[0]);
    }
}
function clearModalOptionProduct() {
    var formOption = document.getElementById("options");
    var name = formOption.children;
    while (name.length > 0) {
        formOption.removeChild(name[0]);
    }
}
function clearModalInputs() {
    var inputs = document.getElementById("inputs");
    var name = formProduct.children;
    while (name.length > 0) {
        inputs.removeChild(name[0]);
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
function clearDivProducts() {
    var allProduct = document.getElementById("contentProducts");
    var divAllProds = allProduct.children;
    while (divAllProds.length > 0) {
        allProduct.removeChild(divAllProds[0]);
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
//window.onload = iniPopulate;
window.setTimeout(function () {
    iniPopulate();
    window.clearTimeout();
}, 300);


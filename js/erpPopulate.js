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
    // mod jquery
    var header = $("#nombreErp");
    var img = $('<img>', {src:"images/logo.png", alt:"logo"});
    header.append(img);
    checkUser(usu, passw);
    if (document.cookie.length > 0) {
        var conf = $('<a></a>', {href:"#", class:"configuration btn btn-lg pull-right"}).text("Configuracion");
        var closeSession = $('<a></a>', {href:"#", class:"closeSession pull-left"}).text("Cerrar Sesión");
        var usr = $('<span></span>', {href:"#", class:"usuario pull-left"}).text("Usuario: " + usu);
        header.append(conf);
        header.append(closeSession);
        header.append(usr);

        clearMainCont();
        $(".configuration").click(menuConf);
        // $(".configuration").click(function(ev){
        //     ev.preventDefault();
        //     menuConf()
        // })
        $(".closeSession").click(cleanCookie);
            
        
    } else {
        var user = $('<a></a>', {href:"#", id:"iniSesion", class:"btn btn-lg pull-right"}).text("Iniciar Sesion");
        header.append(user);
        $(document).on("click", "#iniSesion", function (ev) {
            ev.preventDefault();
            $('#myModal').modal();
        })
    }
    // fin mod
    

    createStructure();
    clearInputsModalLog();
}

function createStructure() {
    clearMainCont();
    var itr = store.shops;
    var item = itr.next();
    var i = 1;

    while (!item.done) {
        // mod jQuery
        var divShops = $('<div></div>',{class:"col-md-3 text-center shops", id:item.value.cif});
        var linksShops = $('<a></a>', {href:"#"});
        var imgShops = $('<img/>', {src:"./images/shop" + (i++) + ".png", alt:"tiendas"});
        var names = $('<h2></h2>').text(item.value.name);

        linksShops.append(imgShops);
        linksShops.append(names);
        divShops.append(linksShops);
        linksShops.click(shopPopulate(item.value));

        $("#main-content").append(divShops);
        item = itr.next();
        // fin mod
    }
}



function shopPopulate(shop) {
    var shop = shop;
    return function () {
        clearMainCont();
        shopsMenusPopulate(shop);
        menuCategoryShopPopulate(shop);
        createShopPopulate(shop);
    }
}

function createShopPopulate(shop) {
    var divAllProducts = $('<div></div>', {class:"col-md-9",id:"divAllProducts"});
    var rowProducts = $('<div></div>', {class:"row",id:"contentProducts"});
    divAllProducts.append(rowProducts);
    $("#main-content").append(divAllProducts);
    createProducts(shop);
}
function createProducts(shop) {
    var rowProducts = $("#contentProducts");
    var dropProducts = $("dropProduct");
    var itr = store.getShopProducts(shop);
    var item = itr.next();
    while (!item.done) {
        var divProduct = $('<div></div>', {class:"col-md-4 text-center allProduct"});
        var imgProduct = $('<img/>', {src: item.value.image,alt: "producto", id:item.value.name + "/" + shop.cif, draggable:"true"});
        var linkProduct = $('<a></a>', {href:"#"});
        var names = $('<h4></h4>').text(item.value.name);
        linkProduct.append(imgProduct);
        linkProduct.append(names);
        divProduct.append(linkProduct);
        rowProducts.append(divProduct);
        if (document.cookie.length > 0) {
            imgProduct.on("dragstart", function(event){               
                event.dataTransfer.setData("text", event.target.id);
            });
        }
        linkProduct.click(productShopPopulate(item.value, shop));

        if (document.cookie.length > 0) {
            var delet = $('<a></a>', { href:"#", class:"delete"});
            var spanDelet = $('<span></span>', {href:"#", class:"glyphicon glyphicon-fire"});

            delet.append(spanDelet);
            divProduct.append(delet);
            /*var delet = document.createElement("a");
            var spanDelet = document.createElement("span");
            delet.setAttribute("href", "#");
            delet.setAttribute("class", "delete");

            spanDelet.setAttribute("class", "glyphicon glyphicon-fire");*/
            delet.css("background-color","rgb(242, 69, 69)");
            delet.css("color","rgb(255, 255, 255)");
            delet.css("display","inline-block");
            delet.width("40px");
            delet.height("40px");
            delet.css("borderRadius","10px");
            spanDelet.css("paddingTop","10px");
            /*delet.style.color = "white";
            delet.style.display = "inline-block";
            delet.style.width = "40px";
            delet.style.height = "40px";
            delet.style.borderRadius = "10px";
            spanDelet.style.paddingTop = "10px";
            /*delet.appendChild(spanDelet);
            divProduct.appendChild(delet);
*/


            delet.click(removeProd(item.value, shop));
            dropProducts.on("dragover", allowDropProduct);
            dropProducts.on("drop", dropProduct);

        }
        item = itr.next();
    }
    if (document.cookie.length > 0) {
        var divProduct = $('<div></div>', {class:"col-md-4 text-center newShop", id:"newProd"}); 
        var imgProduct = $('<img/>', {src: "./images/aniadirTienda.png", alt: "nueva tienda"});
        var linksAddProducts = $('<a></a>', {href:"#", class: "newProduct"});
        linksAddProducts.attr("data-toggle", "modal");
        linksAddProducts.attr("data-target","#products");
        var names = $('<h4></h4>').text("Añadir");
      
        linksAddProducts.append(imgProduct);
        linksAddProducts.append(names);
        divProduct.append(linksAddProducts);
        rowProducts.append(divProduct);

        var mainModal = $('<div></div>', {id:"mainModalProd"});
        $("#formProduct").append(mainModal);
        var optionModalProducts = $('<div></div>', {id:"options"});
        $("#formProduct").append(optionModalProducts);
        linksAddProducts.click(createNewProd(shop));
    }
}

function removeProdDragDrop(data) {
    var data = data;
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

    var formProduct = $("#formProduct");
    var mainModal = $("#mainModalProd");
    var optionModalProducts = $("#options");
    var h4 = $("#tiend").text("Tienda"+shop.name);

    clearModalformProd();
    var divSelect = $('<div></div>', {class: "form-group", id:"divSelect"});
    var labelSelect = $('<label></label>', {for:"prod"}).text("Producto ");
    var prodSelect = $('<select></select>', {name:"producto", id:"prod"});
    var optionProd = $('<option></option>', {value:""});
    var optionProd1 = $('<option></option>', {value:"1"}).text("Monitores");
    var optionProd2 = $('<option></option>', {value:"2"}).text("Tarjeta Grafica");
    var optionProd3 = $('<option></option>', {value:"3"}).text("Ordenador");

    prodSelect.append(optionProd);
    prodSelect.append(optionProd1);
    prodSelect.append(optionProd2);
    prodSelect.append(optionProd3);
    divSelect.append(labelSelect);
    divSelect.append(prodSelect);
    mainModal.append(divSelect);
    var divName = $('<div></div>', {class: "form-group", id:"divName"});
    var labelName = $('<label></label>', {for:"nameProd"}).text("Nombre ");
    var inputName = $('<input>', {type:"text", class: "form-control", id: "nameProd", placeholder:"Nombre Producto"});
    divName.append(labelName);
    divName.append(inputName);
    mainModal.append(divName);
    
    var divPrice = $('<div></div>', {class: "form-group", id:"divPrice"});
    var labelPrice = $('<label></label>', {for:"priceProd"}).text("Precio ");
    var inputPrice = $('<input>', {type:"text", class: "form-control", id: "priceProd", placeholder:"Precio Producto"});
    divPrice.append(labelPrice);
    divPrice.append(inputPrice);
    mainModal.append(divPrice);
    var typeProd = $("#prod");

    typeProd.on('change', valorOptionProd(shop));
}

function valorOptionProd(shop) {

    return function () {
        //Recogemos el value del select
        console.log(this.value);
        createModalProduct(parseInt(this.value), shop);
    }
}

function createModalProduct(prodSelect, shop) {
    var formProduct = $("#formProduct");
    var optionModalProducts = $("#options");

    if (prodSelect === 1) {
        clearModalOptionProduct();
        var divInchs = $('<div></div>', {class: "form-group", id:"divInchs"});
        var labelInchs = $('<label></label>', {for:"inchsProd"}).text("Pulgadas ");
        var inputInchs = $('<input>', {type:"text", class: "form-control", id: "inchsProd", placeholder:"Pulgadas"});
        divInchs.append(labelInchs);
        divInchs.append(inputInchs);
        optionModalProducts.append(divInchs);

        var divPattent = $('<div></div>', {class: "form-group", id:"divPattent"});
        var labelPattent = $('<label></label>', {for:"pattentProd"}).text("Marca ");
        var inputPattent = $('<input>', {type:"text", class: "form-control", id: "pattentProd", placeholder:"Marca Producto"});
        divPattent.append(labelPattent);
        divPattent.append(inputPattent);
        optionModalProducts.append(divPattent);
    }
    if (prodSelect === 2) {
        clearModalOptionProduct();
        var divType = $('<div></div>', {class: "form-group", id:"divType"});
        var labelType = $('<label></label>', {for:"typeProd"}).text("Tipo ");
        var inputType = $('<input>', {type:"text", class: "form-control", id: "typeProd", placeholder:"Tipo Producto"});
        divType.append(labelType);
        divType.append(inputType);
        optionModalProducts.append(divType);
    }
    if (prodSelect === 3) {
        clearModalOptionProduct();
        var divRom = $('<div></div>', {class: "form-group", id:"divRom"});
        var labelRom = $('<label></label>', {for:"romProd"}).text("ROM ");
        var inputRom = $('<input>', {type:"text", class: "form-control", id: "romProd", placeholder:"ROM"});
        divRom.append(labelRom);
        divRom.append(inputRom);
        optionModalProducts.append(divRom);

        var divProcessor = $('<div></div>', {class: "form-group", id:"divProcessor"});
        var labelProcessor = $('<label></label>', {for:"divProcessor"}).text("Procesador ");
        var inputProcessor = $('<input>', {type:"text", class: "form-control", id: "processorProd", placeholder:"Procesador"});
        divProcessor.append(labelProcessor);
        divProcessor.append(inputProcessor);
        optionModalProducts.append(divProcessor);
    }

    var divDescript = $('<div></div>', {class: "form-group", id:"divDescript"});
    var labelDescript = $('<label></label>', {for:"descriptProd"}).text("Descripcion ");
    var inputDescript = $('<input>', {type:"text", class: "form-control", id: "descriptProd", placeholder:"Descripcion"});
    divDescript.append(labelDescript);
    divDescript.append(inputDescript);
    optionModalProducts.append(divDescript);

    var divSelect = $('<div></div>', {class: "form-group", id:"divSelectCat"});
    var labelSelect = $('<label></label>', {for:"cat"}).text("Categoria");
    var catSelect = $('<select></select>', {name:"cat", id:"category"});
    optionModalProducts.append(divSelect);
    divSelect.append(labelSelect);
    divSelect.append(catSelect);
    var itr = store.categories;
    var item = itr.next();
    while (!item.done) {
        var cat = $('<option></option>', {value:item.value.title}).text(item.value.title);
        catSelect.append(cat);
        item = itr.next();
    }
    var divStock = $('<div></div>', {class: "form-group", id:"divStock"});
    var labelStock = $('<label></label>', {for:"stockProd"}).text("Stock ");
    var inputShop = $('<input>', {type:"number", class: "form-control",min:1, id: "stockProd"});
    divStock.append(labelStock);
    divStock.append(inputShop);
    optionModalProducts.append(divStock);
    var selectCat = document.getElementById("category");
    selectCat.addEventListener("change", function () {
        var indice = selectCat.selectedIndex;
        var valor = selectCat.options[indice].value;

    });
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
            name.setAttribute("placeholder", "Introduce el Precio");
            price.css("border", "1px solid rgb(255, 0, 0)");
            return false;
        }
        if (prodSelect === 1) {
            var inchs = document.getElementById("inchsProd");
            if (inchs.value === "") {
                name.setAttribute("placeholder", "Introduce las Pulgadas");
                name.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var pattent = document.getElementById("pattentProd");
            if (pattent.value === "") {
                name.setAttribute("placeholder", "Introduce la Marca");
                name.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var prod = new Screens(name.value, price.value, inchs.value, pattent.value);
        }
        if (prodSelect === 2) {
            var type = document.getElementById("typeProd");
            if (type.value === "") {
                name.setAttribute("placeholder", "Introduce el Tipo");
                name.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var prod = new GraficCards(name.value, price.value, type.value);
        }
        if (prodSelect === 3) {
            var rom = document.getElementById("romProd");
            if (rom.value === "") {
                name.setAttribute("placeholder", "Introduce la ROM");
                name.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var processor = document.getElementById("processorProd");
            if (processor.value === "") {
                name.setAttribute("placeholder", "Introduce el Procesador");
                name.style.border = "1px solid rgb(255, 0, 0)";
                return false;
            }
            var prod = new Computer(name.value, price.value, rom.value, processor.value);
        }
        var descript =document.getElementById("descriptProd");
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
        debugger;
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
        var divProduct = $('<div></div>', {class:"col-md-9 product"});
        var divRow = $('<div></div>', {class:"row", id:pro.name});
        var divImg = $('<div></div>', {class:"col-md-6 img", id:pro.name});
        var divInfo = $('<div></div>', {class:"col-md-6 productInfo", id:pro.name});

        var pName = $('<p></p>', {name:pro.name}).text("Producto: " + pro.name + ".");
        var pPrice = $('<p></p>', {name:pro.price}).text("Precio: " + pro.price + " € (sin IVA).");

        divInfo.append(pName);
        divInfo.append(pPrice);

        if (pro instanceof Screens) {
            var pInchs = $('<p></p>', {name:pro.inchs}).text("Pulgadas: " + pro.inchs + ".");
            var pPattent = $('<p></p>', {name:pro.pattent}).text("Marca: " + pro.pattent + ".");
            divInfo.append(pInchs);
            divInfo.append(pPattent);
        }
        if (pro instanceof GraficCards) {
            var pType = $('<p></p>', {name:pro.type}).text("Tipo: " + pro.type + ".");
            divInfo.append(pType);
        }

        if (pro instanceof Computer) {
            var pRom = $('<p></p>', {name:pro.rom}).text("ROM: " + pro.rom + ".");
            var pProcessor = $('<p></p>', {name:pro.processor}).text("Procesador: " + pro.processor + ".");
            divInfo.append(pRom);
            divInfo.append(pProcessor);
        }
        var pStock = $('<p></p>', {name:stock}).text("Disponible: " + stock + " unidades.");
        var bBuy = $('<input>', {type:"submit", value:"Comprar", name:"comprar"}).text("Disponible: " + stock + " unidades.");

        divInfo.append(pStock);
        divInfo.append(bBuy);
        var imgProduct = $('<img/>', {src:pro.image, alt:pro.name});

        var divDescrip = $('<div></div>', {class: "col-md-9 description"});
        var pDescrip = $('<p></p>').text(product.description);
        var hDescr = $('<h2></h2>').text("Descripcion:");
        var global = $('<a></a>', {href: "#"}).text("Disponibilidad");
        var ficha = $('<a></a>', {href: "#", class:"ficha"}).text("Ver ficha");
        divDescrip.append(hDescr);
        divDescrip.append(pDescrip);
        divDescrip.append(global);
        divDescrip.append(ficha);
        divImg.append(imgProduct);
        divRow.append(divImg);
        divRow.append(divInfo);
        divRow.append(divDescrip);
        divProduct.append(divRow);
        $("#main-content").append(divProduct);
        global.click(globalProductPopulate(shop, pro));
        ficha.click(windowProduct(shop, pro));
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
        var deletProd = document.createElement("li");
        deletProd.setAttribute("class", "deleteProd pull-right");
        deletProd.setAttribute("id", "dropProduct");
        deletProd.appendChild(dropProd());
        menuUl.appendChild(deletProd);
    }
    var mapLi = document.createElement("li");
    mapLi.appendChild(createMap());
    menuUl.appendChild(mapLi);
    closeLi.appendChild(aCloseWindows());
    menuUl.appendChild(closeLi);

    iniA.addEventListener("click", iniPopulate);
}

function dropProd() {
    var aDelet = document.createElement("a");
    var spanDelet = document.createElement("span");
    spanDelet.setAttribute("class", "glyphicon glyphicon-trash");
    aDelet.setAttribute("class", "");
    aDelet.appendChild(spanDelet);
    return aDelet;
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
}, 500);


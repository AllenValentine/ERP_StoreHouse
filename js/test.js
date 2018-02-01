"use strict";

/**
 * TEST ERP STOREHOUSE
 */
function testERP() {
    var storeHouse = StoreHouse.getInstance();
    StoreHouse.wHouse = "El Almacen 13";
    
    console.log("-----Iniciando testeo------");
    console.log("....Creando PRODUCTOS....");
    var pro1 = new Screens("Samsung CF390",170 ,24 , "Samsung");
    pro1.description = "Resolucion de 1920x1080 con una curvatura de 1800R.\n El modo gaming optimiza al instante los colores y el contraste de la pantalla.";
    //console.log(pro1.toString());

    var pro2 = new GraficCards("ASUS RX550-4G Radeon", 122, "GDDR5" );
    pro2.description = "Familia de procesadores AMD con una resolucion maxima de 5120x2880, una memoria de 4GB y puertos HDMI, DVI-D y DisplayPort";
    //console.log(pro2.toString()); 
    
    var pro3 = new Computer("LENOVO", 700, "8GB", "Intel Core I7-7700K 4.2GHz");
    //console.log(pro3.toString());

    console.log("producto 1: " + pro1.name);
    console.log("Producto 2: " + pro2.name);
    console.log("Producto 3: " + pro3.name);

    console.log(pro1.name+" instanceof Product: "+(pro1 instanceof Product));
    console.log(pro2.name+" instanceof Screens: "+(pro1 instanceof Screens));
    console.log(pro3.name+" instanceof GraficCards: "+(pro1 instanceof GraficCards));
    
    var pro4 = new Screens("LG 34UM59-P",369 ,34 ,"LG" );
    pro4.description = "Disfruta de un juego uniforme sin ningun tipo de fragmentacion de la pantalla con FreeSyn actualizado\n y experimenta el mundo real.";
    //console.log(pro4.toString());
    console.log(pro4.name+" instanceof Computer: "+(pro1 instanceof Computer));
    console.log("");
    console.log("....Creando CATEGORIAS....");

    var cat1 = new Category("Monitores");
    cat1.description = "Los mejores monitores del mercado";
    var cat2 = new Category("Tarjetas Graficas");
    cat2.description = "Las tarjetas Graficas mas economicas";
    var cat3 = new Category("Ordenadores");
    cat3.description = "Los ordenadores mas completos";
    //console.log("Categoria 1: " + cat1.title + ", Creada");
    //console.log("Categoria 2: " + cat2.title + ", Creada");
    //console.log("Categoria 3: " + cat3.title + ", Creada");
    console.log("Añadimos las categorias al storeHouse");
    storeHouse.addCategory(cat1);
    storeHouse.addCategory(cat2);
    storeHouse.addCategory(cat3);
    console.log("Las categorias añadidas son: ");
    var itrC = storeHouse.categories;
    mostrarIterators(itrC);
    console.log("La categoria, defaultCategory, es una categoria que se crea por defecto");
    console.log("");
    console.log("....Creando TIENDAS....");
    var t1 = new Shop("1111111AAAAAAA", "LaTiendaEnTuCasa");
    var t2 = new Shop("2222222BBBBBBB", "MicroTiendasOnline");
    var t3 = new Shop("3333333CCCCCCC", "ComputersForUs");
    t1.phone = "666111222";
    t2.phone = "666333444";
    t3.phone = "666555777";
    t1.address = "Calle Tienda 1";
    t2.address = "Calle Tienda 2";
    t3.address = "Calle Tienda 3";
    console.log("Añadimos las tiendas al storeHouse");
    storeHouse.addShop(t1);
    storeHouse.addShop(t2);
    storeHouse.addShop(t3);
    console.log("Las tiendas añadidas son: ");
    var itrS = storeHouse.shops;
    mostrarIterators(itrS);

    console.log("");
    console.log("...Borrando...");
    console.log("Borrar: " + t3.name);
    storeHouse.removeShop(t3);
    console.log("Borrar: " + cat1.title);
    storeHouse.removeCategory(cat1);

    console.log("añadimos de nuevo lo borrado");
    storeHouse.addShop(t3);
    storeHouse.addCategory(cat1)
    
    console.log("");
    console.log("....Añadiendo Productos al StoreHouse...");
    storeHouse.addProduct(t1,pro1,cat1);
    storeHouse.addProduct(t1,pro1,cat2);
    storeHouse.addProduct(t1,pro2,cat2);
    storeHouse.addProduct(t1,pro3,cat3);
    storeHouse.addProduct(t2,pro3,cat1);
    storeHouse.addProduct(t2,pro1,cat2);
    storeHouse.addProduct(t2,pro4,cat3);
    storeHouse.addProduct(t1,pro4,cat2);
    console.log("En la tienda: " + t1.name);
    var itrT1 = storeHouse.getShopProducts(t1);
    mostrarIterators(itrT1);
    console.log("\nEn la tienda: " + t2.name);
    var itrT2 = storeHouse.getShopProducts(t2);
    mostrarIterators(itrT2);

    console.log("");
    
    console.log("...Añadiendo Stock a los productos de las tiendas...");
    storeHouse.addQuantityProductInShop(t1,pro1, 10);
    storeHouse.addQuantityProductInShop(t1,pro2, 5);
    storeHouse.addQuantityProductInShop(t1,pro3, 6);
    storeHouse.addQuantityProductInShop(t2,pro1, 10);
    storeHouse.addQuantityProductInShop(t2,pro3, 3);
    storeHouse.addQuantityProductInShop(t2,pro4, 20);
    storeHouse.addQuantityProductInShop(t2,pro4, 10);
    storeHouse.addQuantityProductInShop(t1,pro4, 10);
    
    console.log("");
    console.log("...Stock de los Productos...");

    console.log("En la tienda: " + t1.name);
    var itrTS1 = storeHouse.getStockProduct(t1);
    mostrarIteratorsStock(itrTS1);
    console.log("\nEn la tienda: " + t2.name);
    var itrTS2 = storeHouse.getStockProduct(t2);
    mostrarIteratorsStock(itrTS2);

    console.log("");
    console.log("...Mostramos Los Productos de una Tienda filtrado por una Categoria...");
    var itrFilt = storeHouse.getCategoryProducts(t1, cat2);
    mostrarIterators(itrFilt);

    console.log("");
    console.log("...Elminimamos un producto del ERPStoreHouse...");
    storeHouse.removeProduct(pro4);
    console.log("\nEn la tienda: " + t2.name);
    var itrT2 = storeHouse.getShopProducts(t2);
    console.log("El producto: " + pro4.name + " ha sido eliminado de las Tiendas");
    console.log(t2.name);
    mostrarIterators(itrT2);
    console.log(t1.name);
    var itrT2 = storeHouse.getShopProducts(t1);
    mostrarIterators(itrT2);

}

function mostrarIterators(itr) {
    var item = itr.next();
    while (!item.done) {
        console.log(item.value.toString());
        item= itr.next();
    }
}
function mostrarIteratorsStock(itr) {
    var item = itr.next();
    while (!item.done) {
        console.log(item.value.product.name + " Stock: " + item.value.stock);
        item= itr.next();
    }
}
window.onload = testERP;

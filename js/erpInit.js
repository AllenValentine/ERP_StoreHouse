"use strict";

function init() {
    /**
     * INICIAR EL ERP
     */

    var storeHouse = StoreHouse.getInstance();
    StoreHouse.wHouse = "El Almacen 13";

     /**CREAMOS LOS PRODUCTOS */
    var pro1 = new Screens("Samsung CF390",170 ,24 , "Samsung");
    pro1.description = "Resolucion de 1920x1080 con una curvatura de 1800R.\n El modo gaming optimiza al instante los colores y el contraste de la pantalla.";
    var pro2 = new Screens("Asus VS278H", 194, 27, "Asus");
    pro2.description = "Resolucion de 1920x1080 con un tiempo de respuesta de 1ms";

    var pro3 = new GraficCards("ASUS RX550-4G Radeon", 122, "GDDR5" );
    pro3.description = "Familia de procesadores AMD con una resolucion maxima de 5120x2880, una memoria de 4GB y puertos HDMI, DVI-D y DisplayPort";
    var pro4 = new GraficCards("Gigabyte GTX 1060 WINDFORCE OC", 259.90, "GDDR5");
    pro4.description = "Familia de procesadores NVIDIA con una resolucion maxima de 7680x4320px, una memoria de 4GB y puertos HDMI, DisplayPort y DVI-D";

    var pro5 = new Computer("LENOVO", 853, "8GB", "Intel Core I7-7700K 4.2GHz");
    pro5.description = "Ordenador de mesa, completo con un procesador potente";
    var pro6 = new Computer("MSI Aegis 3 7RB-044EU", 1299, "8GB", "Intel Core i7-7700");
    pro6.description = " Déjate transportar a una nueva dimensión en juegos virtuales con el PC gaming MSI Aegis 3 7RB-044EU y disfruta de un" + 
    + "rendimiento supremo como nunca lo has visto antes. Componentes de lujo y diseño espectacular aúnan fuerzas para que tengas una máquina perfecta.";
    
    pro1.image = "./images/samsungScreen.jpg";
    pro2.image = "./images/asusScreen.jpg";
    pro3.image = "./images/asusGraficCard.png";
    pro4.image = "./images/GigabyteGraficCard.png";
    pro5.image = "./images/lenovoComputer.png";
    pro6.image = "./images/msiComputer.jpg";

    /**CREAMOS LAS CATEGORIAS */
    var cat1 = new Category("Monitores");
    cat1.description = "Los mejores monitores del mercado";
    var cat2 = new Category("Tarjetas Graficas");
    cat2.description = "Las tarjetas Graficas mas economicas";
    var cat3 = new Category("Ordenadores");
    cat3.description = "Los ordenadores mas completos";
    var cat4 = new Category("Samsung");
    cat4.description = "Productos Samsung";
    var cat5 = new Category("Asus");
    cat5.description = "Productos Asus";
    var cat6 = new Category("Lenovo");
    cat6.description = "Productos Lenovo";
    var cat7 = new Category("MSI");
    cat7.description = "Productos MSI";

    /**CREAMOS LAS TIENDAS */
    var t1 = new Shop("1111111AAAAAAA", "LaTiendaEnTuCasa");
    var t2 = new Shop("2222222BBBBBBB", "MicroTiendasOnline");
    var t3 = new Shop("3333333CCCCCCC", "ComputersForUs");
    t1.phone = "666111222";
    t2.phone = "666333444";
    t3.phone = "666555777";
    t1.address = "Calle Tienda 1";
    t2.address = "Calle Tienda 2";
    t3.address = "Calle Tienda 3";

    /**AÑADIMOS LAS TIENDAS Y LAS CATEGORIAS AL STOREHOUSE */

    storeHouse.addCategory(cat1);
    storeHouse.addCategory(cat2);
    storeHouse.addCategory(cat3);
    storeHouse.addCategory(cat4);
    storeHouse.addCategory(cat5);
    storeHouse.addCategory(cat6);
    storeHouse.addCategory(cat7);

    storeHouse.addShop(t1);
    storeHouse.addShop(t2);
    storeHouse.addShop(t3);

    /**AÑADIMOS LOS PRODUCTOS A UNA TIENDA CON UNA CATEGORIA */

    storeHouse.addProduct(null,pro1,cat1);
    storeHouse.addProduct(null,pro2,cat1);
    storeHouse.addProduct(null,pro3,cat2);
    storeHouse.addProduct(null,pro4,cat2);
    storeHouse.addProduct(null,pro5,cat3);
    storeHouse.addProduct(null,pro6,cat7);
    storeHouse.addProduct(null,pro6,cat3);
    storeHouse.addProduct(null,pro1,cat4);
    storeHouse.addProduct(null,pro2,cat5);
    storeHouse.addProduct(null,pro3,cat5);

    storeHouse.addProduct(t1,pro1,cat1);
    storeHouse.addProduct(t1,pro1,cat4);
    storeHouse.addProduct(t1,pro2,cat1);
    storeHouse.addProduct(t1,pro2,cat5);
    storeHouse.addProduct(t1,pro3,cat2);
    storeHouse.addProduct(t1,pro3,cat5);
    storeHouse.addProduct(t1,pro4,cat2);
    
    storeHouse.addProduct(t2,pro1,cat1);
    storeHouse.addProduct(t2,pro2,cat1);
    storeHouse.addProduct(t2,pro4,cat2);
    storeHouse.addProduct(t2,pro5,cat3);
    storeHouse.addProduct(t2,pro5,cat6);
    
    storeHouse.addProduct(t3,pro1,cat1);
    storeHouse.addProduct(t3,pro2,cat5);
    storeHouse.addProduct(t3,pro5,cat3);
    storeHouse.addProduct(t3,pro6,cat3);
    storeHouse.addProduct(t3,pro6,cat7);
    /*
    console.log("En la tienda: " + t1.name);
    var itrT1 = storeHouse.getShopProducts(t1);
    mostrarIterators(itrT1);
    console.log("\nEn la tienda: " + t2.name);
    var itrT2 = storeHouse.getShopProducts(t2);
    mostrarIterators(itrT2);
    console.log("\nEn la tienda: " + t3.name);
    var itrT3 = storeHouse.getShopProducts(t3);
    mostrarIterators(itrT3);*/

    /**AÑADIMOS STOCK A LOS PRODUCTOS */

    storeHouse.addQuantityProductInShop(null, pro1, 17);
    storeHouse.addQuantityProductInShop(null, pro2, 6);
    storeHouse.addQuantityProductInShop(null, pro3, 12);
    storeHouse.addQuantityProductInShop(null, pro4, 9);
    storeHouse.addQuantityProductInShop(null, pro5, 10);
    storeHouse.addQuantityProductInShop(null, pro6, 3);


    storeHouse.addQuantityProductInShop(t1, pro1, 10);
    storeHouse.addQuantityProductInShop(t1, pro2, 7);
    storeHouse.addQuantityProductInShop(t1, pro3, 15);
    storeHouse.addQuantityProductInShop(t1, pro4, 3);
    storeHouse.addQuantityProductInShop(t2, pro1, 6);
    storeHouse.addQuantityProductInShop(t2, pro2, 16);
    storeHouse.addQuantityProductInShop(t2, pro4, 5);
    storeHouse.addQuantityProductInShop(t2, pro5, 23);
    storeHouse.addQuantityProductInShop(t3, pro1, 13);
    storeHouse.addQuantityProductInShop(t3, pro2, 9);
    storeHouse.addQuantityProductInShop(t3, pro5, 17);
    storeHouse.addQuantityProductInShop(t3, pro6, 12);

}
/**COMPROBACIONES */
/*function mostrarIterators(itr) {
    var item = itr.next();
    while (!item.done) {
        console.log(item.value.toString());
        item= itr.next();
    }
}

window.onload = init; */
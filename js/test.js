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
    console.log("las categorias añadidas son: ");
    var itr = storeHouse.categories;
    var item = itr.next();
    while (!item.done) {
        console.log(item.value.toString());
        item = itr.next();
    }
    console.log("La categoria, defaultCategory, es una categoria que se crea por defecto");

    





}
window.onload = testERP;

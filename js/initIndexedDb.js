"use-strict";
function initIDB() {
  /**
       * indexedDB
       */
  var storeHouse = StoreHouse.getInstance();
  storeHouse.wHouse = "El Almacen 13";
  var db;
  var db_name = "StoreHouse13";
  var request = indexedDB.open(db_name, 1);
  //en caso de error.
  request.onerror = function (event) {
    console.log(event.target.error.name);
    console.log(event.target.error.message);
  }
  //en el caso de que la bbdd este creada creamos la estructura del ERP.
  request.onsuccess = function (event) {
    db = event.target.result;
    var almacenCategories = db.transaction("categories").objectStore("categories");
    almacenCategories.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        var cat = new Category(cursor.value.title);
        cat.description = cursor.value.description;
        storeHouse.addCategory(cat);
        cursor.continue();
      } else {
        var almacenShops = db.transaction("shops").objectStore("shops");
        almacenShops.openCursor().onsuccess = function (event) {
          var cursor = event.target.result;
          if (cursor) {
            var shop = new Shop(cursor.value.shop.cif,
              cursor.value.shop.name);
            shop.phone = cursor.value.shop.phone;
            shop.address = cursor.value.shop.address;

            storeHouse.addShop(shop);

            var products = cursor.value.products;
            
            for (const i in products) {
              
              switch (products[i].product.tProduct) {
               
                case "Screen":
                  var pro = new Screens(
                    products[i].product.name,
                    products[i].product.price,
                    products[i].product.inchs,
                    products[i].product.pattent
                  );
                  pro.description = products[i].product.description,
                  pro.image = products[i].product.image
                  var categories = products[i].categories;
                  for (const j in categories) {
                    var cat = new Category(categories[j].title);
                    cat.description = categories[j].description;
                    storeHouse.addProduct(shop, pro, cat);
                    storeHouse.addQuantityProductInShop(shop, pro, products[i].stock);
                  }

                  break;
                case "GraficCards":
                  var pro = new GraficCards(
                    products[i].product.name,
                    products[i].product.price,
                    products[i].product.type
                  );
                  pro.description = products[i].product.description,
                  pro.image = products[i].product.image
                  var categories = products[i].categories;
                  for (const j in categories) {
                    var cat = new Category(categories[j].title);
                    cat.description = categories[j].description;
                    storeHouse.addProduct(shop, pro, cat);
                    storeHouse.addQuantityProductInShop(shop, pro, products[i].stock);
                  }

                  break;
                case "Computer":
                  var pro = new Computer(products[i].product.name,
                    products[i].product.price,
                    products[i].product.rom,
                    products[i].product.processor
                  );
                  pro.description = products[i].product.description,
                  pro.image = products[i].product.image
                  var categories = products[i].categories;
                  for (const j in categories) {
                    var cat = new Category(categories[j].title);
                    cat.description = categories[j].description;
                    storeHouse.addProduct(shop, pro, cat);
                    storeHouse.addQuantityProductInShop(shop, pro, products[i].stock);
                  }
                  break;
              }
            }
            cursor.continue();
          } else {

          }
        }
      }
    }
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
  //si la no esta creada se ejecuta el onupgradeneeded y creamos los almacenes de tiendas y categorias
  request.onupgradeneeded = function (event) {
    console.log("onupgradeNeeded");
    db = event.target.result;

    var storeShop = db.createObjectStore("shops", { keyPath: "shop.cif" });
    storeShop.createIndex("name", "shop.name", { unique: false });
    for (var i in shops) {
      storeShop.add(shops[i]);
    }
    var storeCategory = db.createObjectStore("categories", { keyPath: "title" });
    for (var i in categories) {
      storeCategory.add(categories[i]);
    }
  }

}


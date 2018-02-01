"use strict";

function ERPException() {
    this.name = "ERPException";
    this.message = "Error: ERP Generic Exception.";
}
ERPException.prototype = new BaseException(); //Heredamos de BaseException
ERPException.prototype.constructor = ERPException;

function ShopERPException() {
    this.name = "ShopERPException";
    this.message = "Error: The method needs a Shop parameter.";
}
ShopERPException.prototype = new ERPException(); //Heredamos de ERPException
ShopERPException.prototype.constructor = ShopERPException;

function ShopExistsERPException() {
    this.name = "ShopExistsERPException";
    this.message = "Error: The shop exists in the ERP .";
}
ShopExistsERPException.prototype = new ERPException(); //Heredamos de ERPException
ShopExistsERPException.prototype.constructor = ShopExistsERPException;


function ShopNotExistsERPException() {
    this.name = "ShopNotExistsERPException";
    this.message = "Error: The shop doesn't exists in the ERP .";
}
ShopNotExistsERPException.prototype = new ERPException(); //Heredamos de ERPException
ShopNotExistsERPException.prototype.constructor = ShopNotExistsERPException;

function DefaultShopERPException() {
    this.name = "DefaultShopERPException";
    this.message = "Error: The deafult Shop can't be removed.";
}
DefaultShopERPException.prototype = new ERPException(); //Heredamos de ERPException
DefaultShopERPException.prototype.constructor = DefaultShopERPException;

function CategoryERPException() {
    this.name = "CategoryERPException";
    this.message = "Error: The method needs a Category parameter.";
}
CategoryERPException.prototype = new ERPException(); //Heredamos de ERPException
CategoryERPException.prototype.constructor = CategoryERPException;

function CategoryExistsERPException() {
    this.name = "CategoryExistsERPException";
    this.message = "Error: The category exists in the ERP .";
}
CategoryExistsERPException.prototype = new ERPException(); //Heredamos de ERPException
CategoryExistsERPException.prototype.constructor = CategoryExistsERPException;

function CategoryNotExistsREPException() {
    this.name = "CategoryNotExistsREPException";
    this.message = "Error: The shop doesn't exists in the ERP .";
}
CategoryNotExistsREPException.prototype = new ERPException(); //Heredamos de ERPException
CategoryNotExistsREPException.prototype.constructor = CategoryNotExistsREPException;

function DefaultCategoryERPExpception() {
    this.name = "DefaultCategoryERPExpception";
    this.message = "Error: The deafult Category can't be removed.";
}
DefaultCategoryERPExpception.prototype = new ERPException(); //Heredamos de ERPException
DefaultCategoryERPExpception.prototype.constructor = DefaultCategoryERPExpception;

function ProductERPException() {
    this.name = "ProductERPException";
    this.message = "Error: The method needs a Product parameter";
}
ProductERPException.prototype = new ERPException(); //Heredamos de ERPException
ProductERPException.prototype.constructor = ProductERPException;

function ProductExistsERPException(category) {
    this.name = "ProductExistsERPException";
    this.message = "Error: The product exists in the category '" + category.title + "'.";
}
ProductExistsERPException.prototype = new ERPException(); //Heredamos de ERPException
ProductExistsERPException.prototype.constructor = ProductExistsERPException;

function ProductNotExistsERPException() {
    this.name = "ProductNotExistsERPException";
    this.message = "Error: The product doesn't exists in the ERP .";
}
ProductNotExistsERPException.prototype = new ERPException(); //Heredamos de ERPException
ProductNotExistsERPException.prototype.constructor = ProductNotExistsERPException;



var StoreHouse = (function () {  //La funcion anonima devuelve un método getInstance que permite obtener el objeto único
    var instantiated; //Objeto con la instancia unica  StoreHouse

    function init() { //Singleton

        //constructor
        function StoreHouse() {

            if (!(this instanceof StoreHouse)) {
                throw new InvalidAccessConstructorException();
            }
            /*Defnicion del atrinuto nombre de almacen */
            /**POSIBLE -> AÑADIR VARIABLE STOCKTOTAL para añadir todos los stocks del erp */
            var pr_Whouse = "Default";
            Object.defineProperty(this, 'wHouse', {
                get: function () {
                    return pr_Whouse;
                },
                set: function (wHouse = "Default") {
                    wHouse = wHouse.trim();
                    if (wHouse === 'undefined' || wHouse === 'Def') {
                        throw new EmptyValueException("wHouse");
                    }
                    pr_Whouse = wHouse;
                }
            });

            /* Definición del atributo shop como array para contener todos los autores del gestor. */
            var pr_shops = []; //array con las tiendas.
            //Devuelve un iterator de las tiendas del gestor
            Object.defineProperty(this, 'shops', {
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function () {
                            return nextIndex < pr_shops.length ?
                                { value: pr_shops[nextIndex++].shops, done: false } :
                                { done: true };
                        }
                    }
                }
            });
            
            //Añade una nueva tienda al gestor
            this.addShop = function (shop) {
                if (!(shop instanceof Shop)) {
                    throw new ShopERPException();
                }
                var position = getShopPosition(shop);
                if (position === -1) {
                    pr_shops.push(
                        {
                            shops: shop,
                            products: []    
                        }   
                    );
                } else {
                    throw new ShopExistsERPException();
                }
                return pr_shops.length;
            }
            
            //Eliminar una tienda
            this.removeShop = function (shop) {
                if (!(shop instanceof Shop)) {
                    throw new ShopERPException();
                }
                var position = getShopPosition(shop);
                if (position !== -1) {
                    if(shop.cif !== pr_defaultShop.cif){
                        pr_shops.splice(position, 1);
                    }else{
                        throw new DefaultShopERPException();
                    }
                }else{
                    throw new ShopNotExistsERPException()
                }
                return pr_shops.length;
            }

            //esta funcion devuelve la posicoin de la tienda en el array,o de las tiendas, o 1 si no existe
            function getShopPosition(shop){
                if (!(shop instanceof Shop)) {
                    throw new ShopERPException();
                }
                function compareElements(element) {
                    return (element.shops.cif === shop.cif);
                }
                return pr_shops.findIndex(compareElements);
            }

            //tienda por defecto
            var pr_defaultShop = new Shop("11111111AAAAAAAA", "almacen");
            this.addShop(pr_defaultShop);

            Object.defineProperty(this, 'defaultShop', {
                get: function () {
                    return pr_defaultShop;
                }
            });
            //definimos el atributo category como un array para tener todas las categorias
            var pr_categories = [];

            //iterador de categories
            Object.defineProperty(this, 'categories', {
                get: function () {
                    var nextIndex = 0;
                    return {
                        next: function(){
                            return nextIndex < pr_categories.length ?
                                {value: pr_categories[nextIndex++], done: false} : 
                                {done: true};
                        }
                    }
                }
            });

            function getCategoryPosition(category){
				if (!(category instanceof Category)) { 
					throw new CategoryERPException();
				}		

				function compareElements(element) {
				  return (element.title === category.title)
				}
				
				return pr_categories.findIndex(compareElements);		
			}

            //añade una nueva categoria al erp
            this.addCategory = function (category) {

                if(!(category instanceof Category)){
                    throw new CategoryERPException();
                }
                var position = getCategoryPosition(category);
                if(position === -1){
                    pr_categories.push(category);
                }else{
                    throw new CategoryExistsERPException();
                }
                return pr_categories.length;
            }
            //Cambiar, si se borra una categoria hay que cambiar esos productos a la de por defecto
            this.removeCategory = function (category) {
                if(!(category instanceof Category)){
                    throw new CategoryERPException();
                }
                var position = getCategoryPosition(category);
                if (position !== -1){
                    if(category.title !== pr_defaultCategory.title){
                        pr_categories.splice(position, 1);
                    }else{
                        throw new DefaultCategoryERPExpception();
                    }
                }else{
                    throw new CategoryNotExistsREPException();
                }
                return pr_categories.length;
            }

            //categoria por defecto
            var pr_defaultCategory = new Category("DefaultCategory");
            this.addCategory(pr_defaultCategory);

            Object.defineProperty(this, 'defaultCategory', {
                get: function () {
                    return pr_defaultCategory;
                }
            });

            // añadir producto a una tienda y su categoria
            this.addProduct = function (shop, product, category) {
                if(!(product instanceof Product)){
                    throw new ProductERPException();
                }
                if(category === null || category === 'undefined' || category === '') {
                    category = this.defaultCategory;
                }
                if(!(category instanceof Category)){
                    throw new CategoryERPException();
                }
                if(shop === null || shop === 'undefined' || shop === ''){
                    shop = this.defaultShop;
                }
                if(!(shop instanceof Shop)){
                    throw new ShopERPException();
                }

                //conseguimos la posicion de la categoria
                var categoryPosition = getCategoryPosition(category);
                if(categoryPosition === -1){
                    throw new CategoryNotExistsREPException;
                }

                //conseguimos la posicion de la tienda
                var shopPosition = getShopPosition(shop);
                if(shopPosition === -1){
                    throw new ShopNotExistsERPException;
                }
                
                //conseguimos la posicion del producto
                var productPosition = getProductPosition(product, pr_shops[shopPosition].products);

                var categoriesProduct = productCategory(shopPosition, productPosition);
                var esta = false;
                var i = 0;
                //Comprobacion de que al menos haya algun producto con categoria
                if(categoriesProduct !==  undefined){
                    var Totalcategories = categoriesProduct.categories.length-1;
                    while(Totalcategories >= 0){
                        //comprobamos que el producto ya tiene esa categoria
                        if(categoriesProduct.categories[i].title === category.title){
                            esta = true;
                        }
                        i++;
                        Totalcategories--;
                    }
                }
                //comprobamos si el producto no esta ya o si esta en esa tienda pero pertenece a otra tienda añadimos
                if(productPosition === -1 ){
                    pr_shops[shopPosition].products.push(
                        {
                            product: product,
                            categories: [category],
                            stock: 0
                        }
                    );
                //en el caso de que el producto ya este pero puede ser se le pueda asignar otra categoria    
                }else if(productPosition !== -1 && !esta){
                    pr_shops[shopPosition].products[productPosition].categories.push(category);
                }else{
                         throw new ProductExistsERPException(category);
                    }
                   
                
                return pr_shops[shopPosition].products.length;
            }

            //con un producto devuelve su posicion en la tienda
            function getProductPosition(product, shopProduct){
                if(!(product instanceof Product)){
                    throw new ProductERPException();
                }

                function compareElements(element) {
                    return (element.product.serialNumber == product.serialNumber);
                }
                
                return shopProduct.findIndex(compareElements);
            }
            //devuelve un objeto con las categorias del producto
            function productCategory(shop, product) {
                return pr_shops[shop].products[product];
                
            }

            //Obtenemos todos los productos de una categoria....
            this.getCategoryProducts = function (shop, category) {
                if(!(category instanceof Category)){
                    throw new CategoryERPException();
                }
                var shop = getShopPosition(shop);
                var i = 0;
                //devuelve un iterador de productos
                var nextIndex = 0;
                var nextCategory = 0;
                var totalCategories = 0;
                return {
                    next: function () {
                        //debugger;
                        if( nextIndex < pr_shops[shop].products.length && pr_shops[shop].products[nextIndex].categories.length >= ++totalCategories){
                            if( pr_shops[shop].products[nextIndex].categories[nextCategory].title === category.title ){
                                nextCategory=0;
                                totalCategories = 0;
                                return { value: pr_shops[shop].products[nextIndex++].product, done: false };
                            }else{
                                nextCategory++;
                                return { value:'', done: false };
                            }
                        }else{
                            return {done: true};
                        }   
                    }
            
                }
            }


            //elimina un producto  de todo el ERP
            this.removeProduct = function (product) {
                if(!(product instanceof Product)){
                    throw new ProductERPException();
                }
                var i = pr_shops.length - 1, position = -1;
                var eliminado = false;
                while(i >= 0 && position === -1 ){
                    position = getProductPosition(product, pr_shops[i].products);
                   
                    if(position !== -1){
                        pr_shops[i].products.splice(position, 1);
                        eliminado = true;
                    }
                    position = -1;
                    i--;
                }
                if(eliminado === false){
                    throw new ProductNotExistsERPException();
                }
            }
            
            var pr_stock = 0;
            //Añadimos candidad de stock a un producto
            this.addQuantityProductInShop = function(shop, product, stock){
                if(!(product instanceof Product)){
                    throw new ProductERPException();
                }
                
                if(!(shop instanceof Shop)){
                    throw new ShopERPException();
                }
                if (stock === null || stock === 'undefined' || stock === '' || stock < 0){
                    stock = pr_stock;
                }

                var shopPosition = getShopPosition(shop);
                var productPosition = getProductPosition(product, pr_shops[shopPosition].products);
                if(productPosition !== -1){
                    pr_shops[shopPosition].products[productPosition].stock += stock;
                }else{
                    throw new ProductNotExistsERPException();   
                }
            }

            //devuelve todos los productos de una determinada tienda
            this.getShopProducts = function (shop){
                if(!(shop instanceof Shop)){
                    throw new ShopERPException();
                }
                var shopPosition = getShopPosition(shop);
                if(shopPosition === -1){
                    throw new ShopNotExistsERPException();
                }
                var nextIndex = 0;
                return{
                    next: function () {
                        return nextIndex < pr_shops.length ?
                            { value: pr_shops[shopPosition].products[nextIndex++].product, done: false } :
                            { done: true };
                    }
                }
            }
                    
            

        }//FIN DEL CONSTRUCTOR storeHouse

        StoreHouse.prototype = {};
        StoreHouse.prototype.constructor = StoreHouse;

        var instance =  new StoreHouse(); //devolvemos el objeto para que sea una instancia unica
        Object.freeze(instance);
        return instance;
    } //fin Singleton
    return{
        //devuleve un objeto con el metodo getInstance
        getInstance: function (){
            if(!instantiated){//Si la variable instantiated es undefined, primera ejecución, ejecuta init.
                instantiated = init(); //instantiated contiene el objeto único
            }
            return instantiated;//Si ya está asignado devuelve la asignación.
        }
    };
})();
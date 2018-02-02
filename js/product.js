"use strict";

//clase abstracta, pruducto del cual heredaran los productos espedificos

(function () {
    var abstractLock = false;
    var serialNumber = 0;

    function Product(name, price) {
        //la funcion se invoca con el operador new
        if (!(this instanceof Product && !abstractLock)) {
            throw new InvalidAccessConstructorException();
        }

        name = typeof name !== 'undefined' ? name : "Unknown";
        price = typeof price !== 'undefined' ? Number(price).valueOf() : 0;
        if (Number.isNaN(price) || price < 0) {
            throw new InvalidValueException("price", price);
        }
        //propiedades de Product
        abstractLock = true;
        var pr_serialNumber = ++serialNumber;
        var pr_name = name;
        var pr_description = "";
        var pr_price = price;
        var pr_tax = 0.21;
        var pr_images = [];
        
        Object.defineProperty(this, 'serialNumber', {
            get: function () {
                return pr_serialNumber;
            }
        });

        Object.defineProperty(this, 'name', {
            get: function () {
                return pr_name;
            },
            set: function (value) {
                value = typeof value !== 'undefined' ? value : "Unknown";
                //comprobar si el nombre esta vacio??
                pr_name = value;
            }
        });

        Object.defineProperty(this, 'description', {
            get: function () {
                return pr_description;
            },
            set: function (value) {
                pr_description = value;
            }
        });

        Object.defineProperty(this, 'price', {
            get: function () {
                return pr_price;
            },
            set: function (value) {
                if (Number.isNaN(value) || value < 0) {
                    throw new InvalidValueException("price", value);
                }
                pr_price = value;
            }
        });
        //tasas definida o el usuario puede cambiarla?
        Object.defineProperty(this, 'tax', {
            get: function () {
                return pr_tax;
            }
        });

        //Devuelve un iterator de los autores del gestor
        Object.defineProperty(this, 'images', {
            get: function () {
                var nextIndex = 0;
                return {
                    next: function () {
                        return nextIndex < pr_images.length ?
                            { value: pr_images[nextIndex++], done: false } :
                            { done: true };
                    }
                }
            }
        });
        this.addImage = function(image){
            pr_images.push(image);
    }

    }
    Product.prototype = {};
    Product.prototype.constructor = Product;
    Product.prototype.toString = function () {
        return "Id: " + this.serialNumber + " Name: " + this.name + " Description: " + this.description +
            " Price: " + this.price + " Tax: " + this.tax;
    }

    //objeto pantalla que heredara de producto
    function Screens(name, price, inchs, pattent) {
        if (!(this instanceof Screens)) {
            throw new InvalidAccessConstructorException();
        }
        abstractLock = false;
        Product.call(this, name, price);
        if (typeof inchs === "undefined") {
            throw new EmptyValueException("inchs");
        }
        pattent = typeof pattent !== 'undefined' ? pattent : "Unknown";

        var pr_inchs = inchs;
         
        var pr_pattent = pattent;

        //getters y setters
        Object.defineProperty(this, 'inchs', {
            get: function () {
                return pr_inchs;
            },
            set: function (value) {
                if (typeof value === "undefined") {
                    throw new EmptyValueException("inchs");
                }
                pr_inchs = value;
            }
        });
        Object.defineProperty(this, 'pattent', {
            get: function () {
                return pr_pattent;
            },
            set: function (value) {
                value = typeof value !== 'undefined' ? value : "Unknown";
                pr_pattent = value;
            }
        });
    }

    Screens.prototype = Object.create(Product.prototype);
    Screens.prototype.constructor = Screens;
    Screens.prototype.toString = function () {
        return Product.prototype.toString.call(this) + "\ninchs: " + this.inchs + " pattent: " + this.pattent;
    }

    //objeto Tarjeta Grafica que heredara de producto
    function GraficCards(name, price, type) {
        if (!(this instanceof GraficCards)) {
            throw new InvalidAccessConstructorException();
        }
        abstractLock = false;
        Product.call(this, name, price);
        type = typeof type !== 'undefined' ? type : "Basic";
        var pr_type = type;

        Object.defineProperty(this, 'type', {
            get: function () {
                return pr_type;
            },
            set: function (value) {
                value = typeof value !== 'undefined' ? value : "Basic";
                pr_type = value;
            }
        });

    }
    GraficCards.prototype = Object.create(Product.prototype);
    GraficCards.prototype.constructor = GraficCards;
    GraficCards.prototype.toString = function () {
        return Product.prototype.toString.call(this) + "\ntype: " + this.type;
    }

    function Computer(name, price, rom, processor) {
        if (!(this instanceof Computer)) {
            throw new InvalidAccessConstructorException();
        }
        abstractLock = false;
        Product.call(this, name, price);
        if (typeof rom === "undefined") {
            throw new EmptyValueException("rom");
        }
        if (typeof processor === "undefined") {
            throw new EmptyValueException("processor");
        }
        var pr_rom = rom;
        var pr_processor = processor;
        //getters and setters
        Object.defineProperty(this, 'rom', {
            get: function () {
                return pr_rom;
            },
            set: function (value) {
                if (typeof value === "undefined") {
                    throw new EmptyValueException('rom');
                }
                pr_rom = value;
            }
        });

        Object.defineProperty(this, 'processor', {
            get: function () {
                return pr_processor;
            },
            set: function (value) {
                if (typeof value === "undefined") {
                    throw new EmptyValueException("processor");
                }
                pr_processor = value;
            }
        });
    }

    Computer.prototype = Object.create(Product.prototype);
    Computer.prototype.constructor = Computer;
    Computer.prototype.toString = function () {
        return Product.prototype.toString.call(this) + "\ntype: " + this.rom + " Processor: " + this.processor;
    }
    window.Product = Product;
    window.Screens = Screens;
    window.GraficCards = GraficCards;
    window.Computer = Computer;
})();
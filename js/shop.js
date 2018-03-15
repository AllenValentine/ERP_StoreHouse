"use strict";

//objeto para definir una tienda.

function Shop(cif, name) {
    if (!(this instanceof Shop)) {
        throw new InvalidAccessConstructorException();
    }
    //Para quitar espacios en blanco
    
    //Mas adelante si es posible ponerle expresiones regulares
    if (cif === 'undefined' || cif === '') {
        throw new EmptyValueException("cif");
    }
    if (name === 'undefined' || name === '') {
        throw new EmptyValueException("name");
    } 
    
    var pr_cif = cif;
    var pr_name = name;
    var pr_address = "";
    var pr_phone = "";
    //objeto Coords donde se ubica la tienda.
    var pr_coords = null;

    Object.defineProperty(this, 'cif', {
        get: function () {
            return pr_cif;
        },
        set: function(value){
            if (value === 'undefined' || value === '') {
                throw new EmptyValueException("cif");
            }
            pr_cif = value;
        }
    });

    Object.defineProperty(this, 'name', {
        get: function () {
            return pr_name;
        },
        set: function(value){
            if (value === 'undefined' || value === '') {
                throw new EmptyValueException("name");
            }
            pr_name = value;
        }
    });

    Object.defineProperty(this, 'address', {
        get: function () {
            return pr_address;
        },
        set: function(value){
            pr_address = value;
        }
    });

    Object.defineProperty(this, 'phone', {
        get: function () {
            return pr_phone;
        },
        set: function(value){
            pr_phone = value;
        }
    });

    Object.defineProperty(this, 'coords', {
        get: function () {
            return pr_coords;
        },
        set: function (value) {
            if (value === 'undefined' || value == null) {
                throw new EmptyValueException("coords");
            } 	
			if (!value instanceof Coords) {
                throw new InvalidValueException("coords", value);
            }
            pr_coords = value;
        }
    });
}

Shop.prototype = {};
Shop.prototype.constructor = Shop;

Shop.prototype.toString = function () {
    return "CIF: " + this.cif + " Name: " + this.name + " address: " + this.address + " Phone: " + this.phone;
}
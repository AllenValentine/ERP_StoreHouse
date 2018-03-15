"use strict";

//objeto para definir la categoria


//REPASAR BIEN!!


function Category(title = "Anon") {
    //La función se invoca con el operador new
    if (!(this instanceof Category)) {
        throw new InvalidAccessConstructorException();
    }

    title = title.trim();
    if (title === 'undefined' || title === 'Anon') {
        throw new EmptyValueException("title");
    }
    var pr_title = title;
    var pr_description = "";

    Object.defineProperty(this, 'title', {
        get: function () {
            return pr_title;
        },
        set: function (title = "Anonimous") {
            
            if (title === 'undefined' || title === 'Anon') {
                throw new EmptyValueException("title");
            }
            pr_title = title;
        }
    });

    Object.defineProperty(this, 'description', {
        get: function () {
            return pr_description;
        },
        set: function (value) {
            if (value === 'undefined') {
                throw new EmptyValueException("description");
            }
            pr_description = value;
        }
    });

    Category.prototype.toString = function () {
        return "Title: " + this.title + " Description: " + this.description ;
    }
    

}
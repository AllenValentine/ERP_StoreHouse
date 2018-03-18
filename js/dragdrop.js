"use strict";

function dropProduct(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    removeProdDragDrop(data);

}

function dragProduct(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function allowDropProduct(event) {

    event.preventDefault();
}
var eraserSize = 5;
var textSize = document.getElementById('text_size').value;
var fontStyle = "Arial";

//pencil and eraser size
var pencil_slider = document.getElementById("pencil_size");
pencil_slider.oninput = function() {
    ctx.lineWidth = this.value;
};

var eraser_slider = document.getElementById("eraser_size");
eraser_slider.oninput = function() {
    eraserSize = this.value;
    console.log("eraser" + eraserSize);
};

//text size and style
var text_slider = document.getElementById("text_size");
text_slider.oninput = function() {
    textSize = this.value;
    ctx.font = textSize + "px " + fontStyle;
};

function changeFont(value) {
    fontStyle = value;
    console.log(fontStyle);
    ctx.font = textSize + "px " + fontStyle;
}
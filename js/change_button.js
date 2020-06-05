var canvas = document.getElementById("myCanvas");
var ctx;

if (canvas != null) {
    ctx = canvas.getContext("2d");
} else {
    alert("error");
}

//button state
var pencilState = 0;
var textState = 0;
var eraserState = 0;

var modee = "pencil";

function changeMode(a) {
    modee = a;
    console.log(modee);
    if (a == "pencil") {
        if (pencilState == 0) {
            document.getElementById('pencil_size').style.display = "block";
            pencilState = 1;
        } else {
            document.getElementById('pencil_size').style.display = "none";
            pencilState = 0;
        }

        canvas.style.cursor = "url('mouse_icon/pencil.png'), crosshair";
    } else if (a == "text") {
        if (textState == 0) {
            document.getElementById('text_size').style.display = "block";
            document.getElementById('text_input').style.display = "block";
            document.getElementById('font').style.display = "block";
            textState = 1;
        } else {
            document.getElementById('text_size').style.display = "none";
            document.getElementById('text_input').style.display = "none";
            document.getElementById('font').style.display = "none";
            textState = 0;
        }
        canvas.style.cursor = "url('mouse_icon/text.png'), crosshair";
    } else if (a == "circle") {
        canvas.style.cursor = "crosshair";
    } else if (a == "square") {
        canvas.style.cursor = "crosshair";
    } else if (a == "triangle") {
        canvas.style.cursor = "crosshair";
    } else if (a == "eraser") {
        if (eraserState == 0) {
            document.getElementById('eraser_size').style.display = "block";
            eraserState = 1;
        } else {
            document.getElementById('eraser_size').style.display = "none";
            eraserState = 0;
        }
        canvas.style.cursor = "url('mouse_icon/eraser.png'), crosshair";
    } else if (a == "background") {
        canvas.style.cursor = "url('mouse_icon/fill.png'), progress";
    }
}
var canvas = document.getElementById("myCanvas");
var ctx;
var eraserSize = 5;
var textSize = document.getElementById('text_size').value;
var fontStyle = "Arial";

let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
let scene = ctx.getImageData(0, 0, canvas.width, canvas.height);
window.history.pushState(state, null); //put state in here
window.addEventListener('popstate', lastStep, false);
window.addEventListener('load', mode);

//button state
var pencilState = 0;
var textState = 0;
var eraserState = 0;

if (canvas != null) {
    ctx = canvas.getContext("2d");
} else {
    alert("error");
}
//mouse position
var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;

//mode
var modee = "pencil";
var hasTouchEvent = 'ontouchstart' in window ? true : false;
const downEvent = hasTouchEvent ? 'ontouchstart' : 'mousedown';
const moveEvent = hasTouchEvent ? 'touchmove' : 'mousemove';
const upEvent = hasTouchEvent ? 'touchend' : 'mouseup';
var isMouseActive = false;

//click button and come up the tool
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
    }
}

function mode() {
    canvas.addEventListener(downEvent, function(e) {
        if (modee == "text") {
            x1 = e.offsetX;
            y1 = e.offsetY;
            let input = "";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            document.getElementById("text_input").addEventListener('keyup', function(e) {
                console.log(e.keyCode);
                ctx.textBaseline = "middle";
                ctx.fillText(input, x1, y1);
                input = document.getElementById('text_input').value;
                ctx.fillText(input, x1, y1);

            })

        } else if (modee == "pencil") {
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            x1 = e.offsetX;
            y1 = e.offsetY;

        } else {
            scene = ctx.getImageData(0, 0, canvas.width, canvas.height);
            if (modee == "circle") {
                ctx.globalCompositeOperation = "source-over";
                isMouseActive = true;
                x1 = e.offsetX;
                y1 = e.offsetY;
            } else if (modee == "square") {

                ctx.globalCompositeOperation = "source-over";
                isMouseActive = true;
                x1 = e.offsetX;
                y1 = e.offsetY;

            } else if (modee == "triangle") {
                ctx.globalCompositeOperation = "source-over";
                isMouseActive = true;
                x1 = e.offsetX;
                y1 = e.offsetY;

            } else if (modee == "eraser") {
                ctx.globalCompositeOperation = "destination-out";
                isMouseActive = true;
                x1 = e.offsetX;
                y1 = e.offsetY;
            }
        }
    })

    canvas.addEventListener(moveEvent, function(e) {
        if (!isMouseActive) {
            return;
        }
        if (modee == "pencil") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            x1 = x2;
            y1 = y2;
        } else if (modee == "circle") {
            console.log(mode);
            ctx.beginPath();
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.arc(x1, y1, Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), 0, Math.PI * 2);
            ctx.fill();

        } else if (modee == "square") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        } else if (modee == "triangle") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + 2 * (x2 - x1) / 2, y2);
            ctx.lineTo(x1 - 2 * (x2 - x1) / 2, y2);
            ctx.fill();
        } else if (modee == "eraser") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.arc(x2, y2, eraserSize, Math.PI * 2, false);
            ctx.fill();
            x1 = x2;
            y1 = y2;
        }
    })

    canvas.addEventListener(upEvent, function(e) {
        isMouseActive = false;
        if (modee == "square") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        } else if (modee == "triangle") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + 2 * (x2 - x1) / 2, y2);
            ctx.lineTo(x1 - 2 * (x2 - x1) / 2, y2);
            ctx.fill();
        } else if (modee == "circle") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.arc(x1, y1, Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), 0, Math.PI * 2);
            ctx.fill();
        }
        state = ctx.getImageData(0, 0, canvas.width, canvas.height);
        window.history.pushState(state, null);

    })

}

//update the current canvas
function lastStep(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.state) {
        ctx.putImageData(e.state, 0, 0);
    }
}


//change size
var pencil_slider = document.getElementById("pencil_size");
pencil_slider.oninput = function() {
    ctx.lineWidth = this.value;
};

var eraser_slider = document.getElementById("eraser_size");
eraser_slider.oninput = function() {
    eraserSize = this.value;
    console.log("eraser" + eraserSize);
};

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
var canvas = document.getElementById("myCanvas");
var ctx;

if (canvas != null) {
    ctx = canvas.getContext("2d");
} else {
    alert("error");
}

let scene = ctx.getImageData(0, 0, canvas.width, canvas.height);

//mouse position
var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;

//mode
var hasTouchEvent = 'ontouchstart' in window ? true : false;
const downEvent = hasTouchEvent ? 'ontouchstart' : 'mousedown';
const moveEvent = hasTouchEvent ? 'touchmove' : 'mousemove';
const upEvent = hasTouchEvent ? 'touchend' : 'mouseup';
var isMouseActive = false;

//click button and come up the tool

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

        } else if (modee == "background") {
            ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

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
            if (isfill == 1) { //fill circle
                ctx.fill();
            } else {
                ctx.stroke();
            }

        } else if (modee == "square") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            if (isfill == 1) {
                ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
            } else {
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            }
        } else if (modee == "triangle") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + 2 * (x2 - x1) / 2, y2);
            ctx.lineTo(x1 - 2 * (x2 - x1) / 2, y2);
            if (isfill == 1) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
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
            if (isfill == 1) {
                ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
            } else {
                ctx.closePath();
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            }
        } else if (modee == "triangle") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + 2 * (x2 - x1) / 2, y2);
            ctx.lineTo(x1 - 2 * (x2 - x1) / 2, y2);
            if (isfill == 1) {
                ctx.fill();
            } else {
                ctx.closePath();
                ctx.stroke();
            }
        } else if (modee == "circle") {
            ctx.putImageData(scene, 0, 0);
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.arc(x1, y1, Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), 0, Math.PI * 2);
            if (isfill == 1) { //fill circle
                ctx.fill();
            } else {
                ctx.stroke();
            }
        } else {
            return;
        }
        state = ctx.getImageData(0, 0, canvas.width, canvas.height);
        window.history.pushState(state, null);

    })

}
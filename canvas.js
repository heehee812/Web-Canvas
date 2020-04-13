var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;
var modee = "pencil";
var hasTouchEvent = 'ontouchstart' in window ? true : false;
let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
window.history.pushState(state, null); //put state in here
window.addEventListener('popstate', lastStep, false);
window.addEventListener('load', mode);



const downEvent = hasTouchEvent ? 'ontouchstart' : 'mousedown';
const moveEvent = hasTouchEvent ? 'touchmove' : 'mousemove';
const upEvent = hasTouchEvent ? 'touchend' : 'mouseup';

var isMouseActive = false;

function changeMode(a) {
    modee = a;
    if (a == "pencil")
        document.getElementById('brushes').style.display = "block";
}

function mode() {
    canvas.addEventListener(downEvent, function(e) {
        console.log(modee);
        if (modee == "text") {
            canvas.style.cursor = "url('text.png'), crosshair";
            x1 = e.offsetX;
            y1 = e.offsetY;
            document.getElementById('text-input').style.display = "block";
            let input = "";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            document.getElementById("text-input").addEventListener('keyup', function(e) {
                console.log(e.keyCode);
                if (e.keyCode == 13) {
                    y1 += 36;
                } else {
                    ctx.fillStyle = "black";
                    ctx.textBaseline = "middle";
                    ctx.font = "36px 'Monserrat";
                    ctx.fillText(input, x1, y1);
                    input = document.getElementById('text-input').value;
                    ctx.fillText(input, x1, y1);
                }
            })

        } else if (modee == "pencil") {
            canvas.style.cursor = "url('pecil.png', crosshair)";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            x1 = e.offsetX;
            y1 = e.offsetY;
        } else if (modee == "circle") {
            canvas.style.cursor = "url('cross.png', pointer)";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            x1 = e.offsetX;
            y1 = e.offsetY;
        } else if (modee == "square") {
            canvas.style.cursor = "url('cross.png'), pointer";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            x1 = e.offsetX;
            y1 = e.offsetY;

        } else if (modee == "triangle") {
            canvas.style.cursor = "url('cross.png'), pointer";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            x1 = e.offsetX;
            y1 = e.offsetY;

        } else if (modee == "eraser") {
            canvas.style.cursor = "url('eraser.png')";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "destination-out";
            isMouseActive = true;
            x1 = e.offsetX;
            y1 = e.offsetY;
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
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.fillStyle = "#621708";
            ctx.beginPath();
            ctx.arc(x1, y1, Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), 0, Math.PI * 2);
            ctx.fill();
        } else if (modee == "square") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.fillStyle = "#941B0C";
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);

        } else if (modee == "triangle") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + (((x2 - x1) ** 2 + (y2 - y1) ** 2) ** (1 / 2)) ** (1 / Math.sqrt(3)), y2);
            ctx.lineTo(x1 - (((x2 - x1) ** 2 + (y2 - y1) ** 2) ** (1 / 2)) ** (1 / Math.sqrt(3)), y2);
            ctx.fillStyle = "#F6AA1C";
        } else if (modee == "eraser") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.arc(x2, y2, 20, Math.PI * 2, false);
            ctx.fill();
            x1 = x2;
            y1 = y2;
        }
    })

    canvas.addEventListener(upEvent, function(e) {
        isMouseActive = false;
        if (modee == "square") {
            ctx.fillRect(x1, y1, x2, y2);
        } else if (modee == "triangle") {
            ctx.fill();
        }
        state = ctx.getImageData(0, 0, canvas.width, canvas.height);
        window.history.pushState(state, null);

    })

}

function color() {
    document.getElementById('color-block').style.display = "block";
    let colorInput = document.querySelector('#color');
    let hexInput = document.querySelector('#hex');

    colorInput.addEventListener('input', () => {
        let color = color.value;
        hexInput.value = color;

        document.querySelector('h1').style.color = color;
    })
}

function reset() {
    var canvas = document.querySelector('#myCanvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function undo() {
    window.history.go(-1);
}

function redo() {
    window.history.go(1);
}

function lastStep(e) //clear the current canvas and get the last staep.
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.state) {
        ctx.putImageData(e.state, 0, 0);
    }
}

function download() {
    var link = document.createElement('a');
    link.download = 'myCanvasImage.png';
    link.href = canvas.toDataURL();
    link.click();
}

upload.onchange = function upload() {
    var img = new Image();

    img.onload = function() {
        canvas.width = this.width
        canvas.height = this.height
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
        URL.revokeObjectURL(src)
    }

    var file = this.files[0];
    var src = URL.createObjectURL(file);

    img.src = src;
}

var slider = document.getElementById("brushes");
slider.oninput = function() {
    ctx.lineWidth = this.value;
}
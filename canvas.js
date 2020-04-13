var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
var modee = "pencil";
var hasTouchEvent = 'ontouchstart' in window ? true : false;
let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
window.history.pushState(state, null);//put state in here
window.addEventListener('popstate', lastStep, false);
window.addEventListener('load', mode);



const downEvent = hasTouchEvent ? 'ontouchstart' : 'mousedown';
const moveEvent = hasTouchEvent ? 'touchmove' : 'mousemove';
const upEvent = hasTouchEvent ? 'touchend' : 'mouseup';

var isMouseActive = false;

function changeMode(a) {
    modee = a;
}

function mode() {
    canvas.addEventListener(downEvent, function (e) {
        console.log(modee);
        if (modee == "text") {
            x1 = e.offsetX;
            y1 = e.offsetY;
            document.getElementById('text-input').style.display = "block";
            let input = "";
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            document.getElementById("text-input").addEventListener('keyup', function (e) {
                console.log(e.keyCode);
                if (e.keyCode == 13) {
                    y1 += 36;
                }
                else {
                    ctx.fillStyle = "black";
                    ctx.textBaseline = "middle";
                    ctx.font = "36px 'Monserrat";
                    ctx.fillText(input, x1, y1);
                    input = document.getElementById('text-input').value;
                    ctx.fillText(input, x1, y1);
                }
            })

        }
        else if (modee == "pencil") {
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            x1 = e.offsetX;
            y1 = e.offsetY;
        }
        else if (modee == "circle") {
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            x1 = e.offsetX;
            y1 = e.offsetY;
        }
        else if (modee == "square") {
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "source-over";
            isMouseActive = true;
            x1 = e.offsetX;
            y1 = e.offsetY;
        }


        else if (modee == "eraser") {
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "destination-out";
            isMouseActive = true;
            x1 = e.offsetX;
            y1 = e.offsetY;
        }
    })

    canvas.addEventListener(moveEvent, function (e) {
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
        }
        else if (modee == "circle") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.fillStyle = "#621708";
            ctx.beginPath();
            ctx.arc(x1, y1, Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), 0, Math.PI * 2);
            ctx.fill();
        }
        else if (modee == "square") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.fillStyle = "#941B0C";
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        else if (modee == "eraser") {
            x2 = e.offsetX;
            y2 = e.offsetY;
            ctx.beginPath();
            ctx.arc(x2, y2, 20, Math.PI * 2, false);
            ctx.fill();
            x1 = x2;
            y1 = y2;
        }
    })

    canvas.addEventListener(upEvent, function (e) {
        isMouseActive = false;
        if(modee =="square")
        {
            ctx.fillRect(x1, y1, x2, y2);
        }
        state= ctx.getImageData(0, 0, canvas.width, canvas.height);
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

function lastStep(e)//clear the current canvas and get the last staep.
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.state) {
        ctx.putImageData(e.state, 0, 0);
    }
}


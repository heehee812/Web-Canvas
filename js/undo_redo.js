var canvas = document.getElementById("myCanvas");
var ctx;

let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
window.history.pushState(state, null); //put state in here
window.addEventListener('popstate', lastStep, false);
window.addEventListener('load', mode);

if (canvas != null) {
    ctx = canvas.getContext("2d");
} else {
    alert("error");
}

function undo() {
    window.history.go(-1);
}

function redo() {
    window.history.go(1);
}

//update the current canvas
function lastStep(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.state) {
        ctx.putImageData(e.state, 0, 0);
    }
}
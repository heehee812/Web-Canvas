var canvas = document.getElementById("myCanvas");
var ctx;

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

function lastStep(e) //clear the current canvas and get the last staep.
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.state) {
        ctx.putImageData(e.state, 0, 0);
    }
}
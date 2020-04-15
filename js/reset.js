function reset() {
    var canvas = document.querySelector('#myCanvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
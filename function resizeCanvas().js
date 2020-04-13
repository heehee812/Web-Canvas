function resizeCanvas()
{
    var canvas= document.getElementById('_2DCanvas');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
}
window.onresize= resizeCanvas;
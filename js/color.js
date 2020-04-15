var colorstrip = document.getElementById("color_strip");
var strip = colorstrip.getContext('2d');
strip_height = colorstrip.height;
strip_width = colorstrip.width;

var color_deep = document.getElementById('color_block');
var block = color_deep.getContext('2d');
block_height = color_deep.height;
block_width = color_deep.width;

strip.rect(0, 0, strip_width, strip_height);
block.rect(1, 1, block_width, block_height);

grad = strip.createLinearGradient(0, 0, 0, block_height);
grad.addColorStop(0, 'rgba(255, 0, 0, 1)');
grad.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grad.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grad.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grad.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grad.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grad.addColorStop(1, 'rgba(255, 0, 0, 1)');

//fill the gradient color in strip
strip.fillStyle = grad;
strip.fill();

rgbacolor = 'rgba(255,0,0,1)';
Gradient();
colorstrip.addEventListener('click', color_change, false); //strip listen click to change color in color_block
color_deep.addEventListener('click', deep, false); //color_block change deep to change label color

function Gradient() {
    block.fillStyle = rgbacolor;
    block.fillRect(0, 0, block_width, block_height); //step 1: 先填滿block

    //做白色漸層
    grad_white = strip.createLinearGradient(0, 0, block_height, 0);
    grad_white.addColorStop(0, 'rgba(255,255,255,1)');
    grad_white.addColorStop(1, 'rgba(255,255,255,0)');
    block.fillStyle = grad_white;
    block.fillRect(0, 0, block_width, block_height);

    //做黑色漸層
    grad_black = strip.createLinearGradient(0, 0, 0, block_height);
    grad_black.addColorStop(0, 'rgba(0,0,0,0)');
    grad_black.addColorStop(1, 'rgba(0,0,0,1)');
    block.fillStyle = grad_black;
    block.fillRect(0, 0, block_width, block_height);
}


function color_change(e) {
    mouse = {
        x: e.offsetX,
        y: e.offsetY
    };

    imgdata = strip.getImageData(mouse.x, mouse.y, 1, 1).data;
    rgbacolor = 'rgba(' + imgdata[0] + ',' + imgdata[1] + ',' + imgdata[2] + ',1)';
    Gradient();
}


function deep(e) {
    mouse = {
        x: e.offsetX,
        y: e.offsetY
    };
    imgdata = block.getImageData(mouse.x, mouse.y, 1, 1).data;
    rgbacolor = 'rgba(' + imgdata[0] + ',' + imgdata[1] + ',' + imgdata[2] + ',1)';
    var Label = document.getElementById('color_label');
    Label.style.backgroundColor = rgbacolor;
    ctx.strokeStyle = rgbacolor;
    ctx.fillStyle = rgbacolor;
}
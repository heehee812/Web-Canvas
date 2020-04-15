function download() {
    var link = document.createElement('a');
    link.download = 'myCanvasImage.png';
    link.href = canvas.toDataURL();
    link.click();
}
var uploadX = 0,
    uploadY = 0;
upload.onchange = function upload() {
    var img = new Image();
    img.onload = function() {
        if (this.width > canvas.width)
            this.width = canvas.width;
        if (this.height > canvas.height)
            this.height = canvas.height;
        ctx.drawImage(this, uploadX, uploadY, this.width, this.height)
        URL.revokeObjectURL(src);
        if (uploadX + this.width <= canvas.width) {
            uploadX = uploadX + this.width;
        } else {
            if (uploadY + this.height <= canvas.height) {
                uploadY = uploadY + this.height;
                uploadX = 0;
            } else {
                uploadX = 0;
                uploadY = 0;
            }
        }
    }
    var file = this.files[0];
    var src = URL.createObjectURL(file);

    img.src = src;
}
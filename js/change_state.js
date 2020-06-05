//shape state
var isfill = 1;

function fill() {
    isfill != isfill;
    if (isfill == 1) {
        isfill = 0;
        document.getElementById('fill').value = "stroke";
        document.getElementById('fill').style.borderColor = "#4E5166";
        document.getElementById('fill').style.backgroundColor = "white";

    } else {
        isfill = 1;
        document.getElementById('fill').value = "fill";
        document.getElementById('fill').style.backgroundColor = "#4E5166";


    }
}
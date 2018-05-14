
function restoreButtons(evt) {
    document.getElementById("VectorImage").src = "Icons/VectorWhite.png";
    document.getElementById("BrushImage").src = "Icons/BrushWhite.png";
    document.getElementById("EraserImage").src = "Icons/EraserWhite.png";
    document.getElementById("SelectionImage").src = "Icons/SelectionWhite.png";
    document.getElementById("MoveImage").src = "Icons/MoveWhite.png";

}


function selectPress(evt) {
    restoreButtons(evt);
    evt.currentTarget.src = ("Icons/SelectionBlue.png");
}

function movePress(evt) {
    restoreButtons(evt);
    evt.currentTarget.src = ("Icons/MoveBlue.png");
}

function NoodleOutlinePress(evt) {
    document.getElementById("NoodleOutline").src = "Icons/OutlineWhite.png";
    document.getElementById("NoodleBrush").src = "Icons/BrushWhite.png";
    evt.currentTarget.src = ("Icons/OutlineBlue.png");

}

function NoodleBrushPress(evt) {
    document.getElementById("NoodleOutline").src = "Icons/OutlineWhite.png";
    document.getElementById("NoodleBrush").src = "Icons/BrushWhite.png";
    evt.currentTarget.src = ("Icons/BrushBlue.png");

}


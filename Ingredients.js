

var page = 0;

function openKitchen(evt, curPage) {

    console.log('openKitchen', evt, curPage);
    page = curPage;


    var BowlCanvas = document.getElementById("BowlCanvas");
    var ctx = BowlCanvas.getContext("2d");
    var x = (BowlCanvas.width) / 2;
    var y = (BowlCanvas.height) / 2;
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    console.log('page' + curPage);
    document.getElementById('page' + curPage).style.display = "block";
    // var p =  document.getElementById('page' + curPage);
    // console.log(p);
    // p.className += " active";
    // console.log(p);
    evt.currentTarget.className += " active";

    if (page === 2) {
        console.log("val: " + document.getElementById('sourValue'));
        console.log("slider: " +document.getElementById('newSourSlider'));
    }
}


function singlePass(evt, sign) {
    if ((sign === 'next') && (page < 3)) {
        openKitchen(evt, page + 1);
    }
    if ((sign === 'prev') && (page > 1)) {
        openKitchen(evt, page - 1);
    }

}


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


/**
 * Created by amircohen on 28/04/2018.
 */
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     output.innerHTML = this.value;
// }

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

//
// function vectorPress(evt) {
//     restoreButtons(evt);
//     evt.currentTarget.src = ("Icons/VectorBlue.png");
// }

//
//
// function eraserPress(evt) {
//     restoreButtons(evt);
//     evt.currentTarget.src = ("Icons/EraserBlue.png");
// }

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

// function minPress(evt){
//     document.getElementById("min").src = "Icons/MinWhite.png";
//     document.getElementById("max").src = "Icons/MaxWhite.png";
//     evt.currentTarget.src = ("Icons/MinBlue.png");
// }
//
// function maxPress(evt){
//     document.getElementById("min").src = "Icons/MinWhite.png";
//     document.getElementById("max").src = "Icons/MaxWhite.png";
//     evt.currentTarget.src = ("Icons/MaxBlue.png");
// }

function myFunction() {
    var x = document.getElementById("SourSlider");
    // var defaultVal = x.defaultValue;
    var currentVal = x.value;
    document.getElementById("demo").innerHTML = "The default value was: " + currentVal
    //     + "<br>The new, current value is: " + currentVal;
    // if (defaultVal == currentVal) {
    //     document.getElementById("demo").innerHTML = "Default value and current value is the same: "
    //         + x.defaultValue + " and " + x.value
    //         + "<br>Slide up or down with the slider control to see the difference!";
    // } else {
    //     document.getElementById("demo").innerHTML = "The default value was: " + defaultVal
    //         + "<br>The new, current value is: " + currentVal;
    // }
}


// var SourSlider = document.getElementById("SourSlider");
// // Read the slider value.
//
// document.getElementById('readButton').addEventListener('click', function(){
//     alert( SourSlider.value() );
// });

function CreateNoodle() {
    var radius = parseInt(document.getElementById("textarea1").value);

    var BowlCanvas = document.getElementById("BowlCanvas");
    var noodle = BowlCanvas.getContext("2d");
    var x = (BowlCanvas.width) / 2;
    var y = (BowlCanvas.height) / 2;
    noodle.beginPath();
    noodle.arc(x, y, radius, 0, 2 * Math.PI);
    noodle.fillStyle = "#e9e5c9";
    noodle.fill();

}


// // var numOfCircles;
// var numOfCircles = 75;
// var numOfSpicy = 0;
// var numOfUmami = 0;
// var numOfHerbs = 0;
// var numOfSour = 0;
//
// // calcCircles();
//
//
// function brushPress(evt) {
//     restoreButtons(evt);
//     evt.currentTarget.src = ("Icons/BrushBlue.png");
//     var flavourTotal = 0;
//
//     var spicyVal = (document.getElementById("SpicySlider")).value;
//     var umamiVal = (document.getElementById("UmamiSlider")).value;
//     var herbsVal = (document.getElementById("HerbsSlider")).value;
//     var sourVal = (document.getElementById("SourSlider")).value;
//
//     if (spicyVal > 0) {
//         flavourTotal += 100;
//     }
//     if (umamiVal > 0) {
//         flavourTotal += 100;
//     }
//     if (herbsVal > 0) {
//         flavourTotal += 100;
//     }
//     if (sourVal > 0) {
//         flavourTotal += 100;
//     }
//
//     numOfSpicy = Math.floor((spicyVal / flavourTotal) * numOfCircles);
//     numOfUmami = Math.floor((umamiVal / flavourTotal) * numOfCircles);
//     numOfHerbs = Math.floor((herbsVal / flavourTotal) * numOfCircles);
//     numOfSour = Math.floor((sourVal / flavourTotal) * numOfCircles);
//
//     alert(numOfSpicy + "," + numOfUmami + ","  + numOfHerbs + "," + numOfSour + ",");
// }

// function spicyPress(){
//     document.getElementById("spicyLabel").style.background = "#FF3852";
//     document.getElementById("herbsLabel").style.background = "white";
//     document.getElementById("umamiLabel").style.background = "white";
//     document.getElementById("sourLabel").style.background = "white";
// }
//
// function umamiPress(){
//     document.getElementById("spicyLabel").style.background = "white";
//     document.getElementById("herbsLabel").style.background = "white";
//     document.getElementById("umamiLabel").style.background = "#AC50D3";
//     document.getElementById("sourLabel").style.background = "white";
// }
//
// function herbsPress(){
//     document.getElementById("spicyLabel").style.background = "white";
//     document.getElementById("herbsLabel").style.background = "#75E039";
//     document.getElementById("umamiLabel").style.background = "white";
//     document.getElementById("sourLabel").style.background = "white";
// }
//
// function sourPress(){
//     document.getElementById("spicyLabel").style.background = "white";
//     document.getElementById("herbsLabel").style.background = "white";
//     document.getElementById("umamiLabel").style.background = "white";
//     document.getElementById("sourLabel").style.background = "#E4E62E";
// }
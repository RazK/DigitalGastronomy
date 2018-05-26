// #a28275  omami
// #b6e079 sour
// #f97253 spicy
// #a9c0a9 herb
//	#f2d58b stoke circle
// #d3c9c9 border plate and backroung next/prex
// #8c8181 letter
// #fee9cc soup
// 	#eae5e5 unused page


// range bars:
//
// $(document).ready(function () {
//     init();
// });
//
// function init() {
//     // Init slider 1
//     var slider = document.getElementById('slider');
//     var classes = ['c-1-color', 'c-2-color', 'c-3-color'];
//
//     noUiSlider.create(slider, {
//         start: [20, 80],
//         connect: [true, true, true],
//         range: {
//             'min': [0],
//             'max': [100]
//         }
//     });

// var connect = slider.querySelectorAll('.noUi-connect');
//
// for (var i = 0; i < connect.length; i++) {
//     connect[i].classList.add(classes[i]);
// }
//
//
// // slider 2
// var tooltipSlider = document.getElementById('slider-tooltips');
//
// noUiSlider.create(tooltipSlider, {
//     start: [20, 80, 120],
//     tooltips: [ false, true, true ],
//     tooltips: [ false, true, true ],
//     range: {
//         'min': 0,
//         'max': 100
//
//     }
// });
// Init slider 2
// var slider2 = document.getElementById('slider2');
// slider2.setAttribute("class", "center");
//
// var classes2 = ['c-18deg-color', 'c-20deg-color', 'c-22deg-color', 'c-24deg-color', 'c-26deg-color'];
//
// noUiSlider.create(slider2, {
//     start: [20, 40, 60, 80],
//     connect: [true, true, true, true, true],
//     range: {
//         'min': [0],
//         'max': [100]
//     }
//
// });

// var connect2 = slider2.querySelectorAll('.noUi-connect');
//
// for (var i = 0; i < connect2.length; i++) {
//     connect2[i].classList.add(classes2[i]);
// }

// Init tabs
// $('.tabs').tabs();
// }


// canvas control:
//
// var w = window.innerWidth;
// var h = window.innerHeight;
// var side = w < h ? w : h;
// side = 0.5 * side;


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

//
// function drawC(event) {
//     console.log("clicked")
//     var canvas = document.getElementById("myCanvas");
//     if (canvas && canvas.getContext) {
//         var ctx = canvas.getContext("2d");
//         if (ctx) {
//             ctx.strokeStyle = "rgb(248,170,145)";
//             ctx.fillStyle = "rgb(255,125,131)";
//             ctx.lineWidth = 3;
//
//             ctx.beginPath();
//             ctx.arc(event.clientX, event.clientY, 10, 0, 2 * Math.PI);
//             ctx.fill();
//             ctx.stroke();
//         }
//     }
// }
//
//
// window.onload = function () {
//     var canvas = document.getElementById("canvas1");
//     canvas.width = side;
//     canvas.height = side;
// }
//

/**------------------------
 ---------------*/

const OMAMI = "#a28275";
const SOUR = "#b6e079";
const SPICY = "#f97253";
const HERBS = "#a9c0a9";
const STROKE = "#f2d58b";
const ORIGION = "#e8c880";

const DEVIATION = 5/8.0;
const PHI = (Math.sqrt(5)+1)/2 - 1;            // golden ratio
const GOLDEN_ANGLE = 2 * PHI * Math.PI;        // golden angle
var placeCirclesSpiral = function () {
    //console.log(imgData);
    _placedCirclesArr = [];
    var big_circ_rad = 20; // sizes: 20, 13, 9
    var med_circ_rad = 13; // sizes: 20, 13, 9
    var small_circ_rad = 9; // sizes: 20, 13, 9

    console.log(_placedCirclesArr);

    var canvas = document.getElementById("BowlCanvas");
    var canvas_min = 0.3 * Math.min(canvas.width, canvas.height)
    var targetArea = canvas_min * canvas_min * Math.PI;
    var curArea = 0;
    var testArea = curArea;
    var lastTestArea = curArea;

    // Calc target areas
    var big_target_area = Math.random() * targetArea;
    var med_target_area = Math.random() * (targetArea - big_target_area);
    var small_target_area = targetArea - big_target_area - med_target_area;

    // Init before spiraling
    var circ_i = 0;
    var cur_circ;
    let fudge = .87;
    let cx = 0.5 * _canvasProps.width
    let cy = 0.5 * _canvasProps.height

    // BIG CIRCLES
    // TODO: Potential bug - noodle percentage dictates less noodle than the area of center noodle (case unhandled)

    // Place big circles
    while (curArea + big_circ_rad * big_circ_rad * Math.PI <= big_target_area){
        cur_circ = _circles[circ_i];
        let angle = circ_i * GOLDEN_ANGLE;

        let sm_dia = 2 * big_circ_rad;
        let adj_sm_dia = sm_dia * fudge;

        curArea += big_circ_rad * big_circ_rad * Math.PI;
        let spiral_rad = Math.sqrt( curArea / Math.PI );

        cur_circ.x = cx + Math.cos(angle) * spiral_rad;
        cur_circ.y = cy + Math.sin(angle) * spiral_rad;
        cur_circ.size = big_circ_rad;

        _placedCirclesArr.push(cur_circle);

        circ_i += 1;
    }

    // MEDIUM CIRCLES

    // Place medium circles
    while (curArea + med_circ_rad * med_circ_rad * Math.PI <= big_target_area + med_target_area){ // add big + med targets so that med circles accommodate for big circles breaking before full
        cur_circ = _circles[circ_i];
        let angle = circ_i * GOLDEN_ANGLE;

        let sm_dia = 2 * med_circ_rad;
        let adj_sm_dia = sm_dia * fudge;

        curArea += med_circ_rad * med_circ_rad * Math.PI;
        let spiral_rad = Math.sqrt( curArea / Math.PI );

        cur_circ.x = cx + Math.cos(angle) * spiral_rad;
        cur_circ.y = cy + Math.sin(angle) * spiral_rad;
        cur_circ.size = med_circ_rad;

        _placedCirclesArr.push(cur_circle);

        circ_i += 1;
    }

    // SMALL CIRCLES

    // Place small circles
    while (curArea + small_circ_rad * small_circ_rad * Math.PI <= targetArea){ // add big + med targets so that med circles accommodate for big circles breaking before full
        cur_circ = _circles[circ_i];
        let angle = circ_i * GOLDEN_ANGLE;

        let sm_dia = 2 * small_circ_rad;
        let adj_sm_dia = sm_dia * fudge;

        curArea += small_circ_rad * small_circ_rad * Math.PI;
        let spiral_rad = Math.sqrt( curArea / Math.PI );

        cur_circ.x = cx + Math.cos(angle) * spiral_rad;
        cur_circ.y = cy + Math.sin(angle) * spiral_rad;
        cur_circ.size = small_circ_rad;

        _placedCirclesArr.push(cur_circle);

        circ_i += 1;
    }
};


var _canvasProps = {width: 300, height: 300};
var _options = {spacing: 1, numCircles: 1000, minSize: 3, maxSize: 7, higherAccuracy: false};
var _placedCirclesArr = [];
var tooltype = 'init';
var ip = "1111";
var spicyFactor = 0;
var umamiFactor = 0;
var herbsFactor = 0;
var sourFactor = 0;
var circleColor = ORIGION;
var flag = false;

var numOfSpicy = 0;
var numOfColoredSpicy = 0;
var numOfUmami = 0;
var numOfColoredUmami = 0;
var numOfHerbs = 0;
var numOfColoredHerbs = 0;
var numOfSour = 0;
var numOfColoredSour = 0;

var page = 0;
var anchorHighNum = 0
var numOfColoredHigh = 0


var _isFilled = function (imgData, imageWidth, x, y) {
    x = Math.round(x);
    y = Math.round(y);
    var a = imgData.data[((imageWidth * y) + x) * 4 + 3];
    return a > 0;
};

var _isCircleInside = function (imgData, imageWidth, x, y, r) {
    //if (!_isFilled(imgData, imageWidth, x, y)) return false;
    //--use 4 points around circle as good enough approximation
    if (!_isFilled(imgData, imageWidth, x, y - r)) return false;
    if (!_isFilled(imgData, imageWidth, x, y + r)) return false;
    if (!_isFilled(imgData, imageWidth, x + r, y)) return false;
    if (!_isFilled(imgData, imageWidth, x - r, y)) return false;
    if (_options.higherAccuracy) {
        //--use another 4 points between the others as better approximation
        var o = Math.cos(Math.PI / 4);
        if (!_isFilled(imgData, imageWidth, x + o, y + o)) return false;
        if (!_isFilled(imgData, imageWidth, x - o, y + o)) return false;
        if (!_isFilled(imgData, imageWidth, x - o, y - o)) return false;
        if (!_isFilled(imgData, imageWidth, x + o, y - o)) return false;
    }
    return true;
};

var _touchesPlacedCircle = function (x, y, r) {
    return _placedCirclesArr.some(function (circle) {
        return _dist(x, y, circle.x, circle.y) < circle.size + r + _options.spacing;//return true immediately if any match
    });
};

var _dist = function (x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
};

var placeCircles = function (imgData) {
    console.log(imgData);
    var i = _circles.length;
    _placedCirclesArr = [];
    console.log(_placedCirclesArr);

    while (i > 0) {
        i--;
        var circle = _circles[i];
        var safety = 1000;
        while (!circle.x && safety-- > 0) {
            var x = Math.random() * _canvasProps.width;
            var y = Math.random() * _canvasProps.height;
            if (_isCircleInside(imgData, _canvasProps.width, x, y, circle.size)) {
                if (!_touchesPlacedCircle(x, y, circle.size)) {
                    circle.x = x;
                    circle.y = y;
                    _placedCirclesArr.push(circle);

                }
            }
        }
    }

};

var randrange = function (min, max) {
    return (max - min) * Math.random() + min;
};

var placeCirclesCentered = function () {
    //console.log(imgData);
    _placedCirclesArr = [];
    console.log(_placedCirclesArr);

    var canvas_min = 0.3 * Math.min(_canvasProps.width, _canvasProps.height)
    var center_rad = (0.3 + 0.4 * Math.random()) * canvas_min
    var ring1_rad = (0.3 + 0.4 * Math.random()) * (canvas_min - center_rad)
    var ring2_rad = Math.min(0.8 * ring1_rad, ((0.3 + 0.4 * Math.random()) * (canvas_min - center_rad - ring1_rad)))

    // Center
    var circle = _circles[0];
    circle.x = 0.5 * _canvasProps.width;
    circle.y = 0.5 * _canvasProps.height
    circle.size = center_rad;
    _placedCirclesArr.push(circle);

    // Ring 1
    var level_1 = Math.round(6 + Math.random() * 12);
    for (var i = 1; i < 1 + level_1; i++) {
        var circle = _circles[i];
        var frac = i / level_1;
        var deg = frac * 2 * Math.PI;
        var x = _circles[0].x + Math.cos(deg) * (center_rad + ring1_rad + 2);
        var y = _circles[0].y + Math.sin(deg) * (center_rad + ring1_rad + 2);
        circle.size = ring1_rad;
        if (!_touchesPlacedCircle(x, y, circle.size)) {
            circle.x = x;
            circle.y = y;
            _placedCirclesArr.push(circle);
        }
    }

    // Ring 2
    var level_2 = Math.round(6 + Math.random() * 12);
    for (var i = 0; i < level_1; i++) {
        for (var j = 0; j < level_2; j++) {
            var circle = _circles[1 + level_1 + (i * level_2) + j];
            var ring1 = _circles[1 + i];
            var frac = j / level_2;
            var deg = -frac * 2 * Math.PI;
            var x = ring1.x + Math.cos(deg) * (ring1_rad + ring2_rad + 2);
            var y = ring1.y + Math.sin(deg) * (ring1_rad + ring2_rad + 2);
            circle.size = ring2_rad;
            if (!_touchesPlacedCircle(x, y, circle.size)) {
                circle.x = x;
                circle.y = y;
                _placedCirclesArr.push(circle);
            }
        }
    }

};


var placeCirclesCentered2 = function () {
    //console.log(imgData);
    _placedCirclesArr = [];
    console.log(_placedCirclesArr);

    var canvas = document.getElementById("BowlCanvas");
    var canvas_min = 0.3 * Math.min(canvas.width, canvas.height)
    var targetArea = canvas_min * canvas_min * Math.PI;
    var curArea = 0;
    var center_rad = randrange(0.3 * canvas_min, 0.8 * canvas_min);
    curArea += center_rad * center_rad * Math.PI
    var level_1 = 20;
    var testArea = curArea;
    var lastTestArea = curArea;
    var tooBig = false;
    while (!tooBig) {
        var ring1_rad = Math.min(canvas_min - center_rad, center_rad * Math.sin(Math.PI / level_1) / (1 - Math.sin(Math.PI / level_1)))
        testArea = curArea + (ring1_rad * ring1_rad) * Math.PI * level_1;
        if (testArea > targetArea) {
            tooBig = true;
        }
        lastTestArea = testArea;
        level_1 -= 1; // dec circles number --> inc total size
    }

    var level_2 = 10;
    curArea = lastTestArea;
    tooBig = false;
    while (!tooBig) {
        var ring2_rad = Math.min(canvas_min - center_rad, ring1_rad * Math.sin(Math.PI / level_2) / (1 - Math.sin(Math.PI / level_2)))
        testArea = curArea + (ring1_rad * ring1_rad) * Math.PI * level_2;
        if (testArea > targetArea) {
            tooBig = true;
        }
        level_1 -= 1; // dec circles number --> inc total size
    }

    // Center
    var circle = _circles[0];
    circle.x = 0.5 * _canvasProps.width;
    circle.y = 0.5 * _canvasProps.height
    circle.size = center_rad;
    _placedCirclesArr.push(circle);

    // Ring 1
    for (var i = 1; i < 1 + level_1; i++) {
        var circle = _circles[i];
        var frac = i / (level_1);
        var deg = frac * 2 * Math.PI;
        var x = _circles[0].x + Math.cos(deg) * (center_rad + ring1_rad + 2);
        var y = _circles[0].y + Math.sin(deg) * (center_rad + ring1_rad + 2);
        circle.size = ring1_rad;
        if (!_touchesPlacedCircle(x, y, circle.size)) {
            circle.x = x;
            circle.y = y;
            _placedCirclesArr.push(circle);
        }
    }

    // Ring 2
    for (var i = 0; i < level_1; i++) {
        for (var j = 0; j < level_2; j++) {
            var circle = _circles[1 + level_1 + (i * level_2) + j];
            var ring1 = _circles[1 + i];
            var frac = j / (level_2);
            var deg = -frac * 2 * Math.PI;
            var x = ring1.x + Math.cos(deg) * (ring1_rad + ring2_rad + 2);
            var y = ring1.y + Math.sin(deg) * (ring1_rad + ring2_rad + 2);
            circle.size = ring2_rad;
            if (!_touchesPlacedCircle(x, y, circle.size)) {
                circle.x = x;
                circle.y = y;
                _placedCirclesArr.push(circle);
            }
        }
    }

};


var _makeCircles = function () {
    var circles = [];
    // for (var i = 0; i < _options.numCircles; i++) {
    //     var circle = {
    //         color: _colors[Math.round(Math.random() * _colors.length)],
    //         size: _options.minSize + Math.random() * Math.random() * (_options.maxSize - _options.minSize) //do random twice to prefer more smaller ones
    //     };
    // for (var j = 0; j < 500; j++) {
    //     var circle = {
    //         color: _colors[Math.round(Math.random() * _colors.length)],
    //         size: 2 //do random twice to prefer more smaller ones
    //     };
    //     circles.push(circle);
    // }
    //
    for (var j = 0; j < 50; j++) {
        var circle = {
            color: ORIGION,
            size: 8 //do random twice to prefer more smaller ones
        };
        circles.push(circle);
    }

    for (var j = 0; j < 100; j++) {
        var circle = {
            color: ORIGION,
            size: 6 //do random twice to prefer more smaller ones
        };
        circles.push(circle);

        for (var j = 0; j < 300; j++) {
            var circle = {
                color: ORIGION,
                size: 4 //do random twice to prefer more smaller ones
            };
            circles.push(circle);
        }

    }


    circles.sort(function (a, b) {
        return a.size - b.size;
    });
    return circles;
};


var _drawCircles = function (ctx) {
    ctx.save();
    $.each(_circles, function (i, circle) {
        ctx.fillStyle = "#e8c880";
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#f2d58b";
        ctx.lineWidth = 3;
        ctx.stroke();


    });

    ctx.restore();
};

var _drawSvg = function (ctx, path, callback) {

    var img = new Image(ctx);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        callback();
    };
    // img.crossOrigin = "Anonymous";
    img.src = path;
};


var contain = function (mx, my) {
    console.log("mouse x: " + mx + " mouse y: " + my);

    for (var i = 0; i < _placedCirclesArr.length; i++) {
        // console.log("x: " + _placedCirclesArr[i].x + " y: " + _placedCirclesArr[i].y + " r: " + _placedCirclesArr[i].size);
        let dx = Math.abs(_placedCirclesArr[i].x - mx);
        let dy = Math.abs(_placedCirclesArr[i].y - my);
        let r = _placedCirclesArr[i].size;
        if (dx ** 2 + dy ** 2 <= r ** 2) {
            return i;
        }
    }
    return -1;
};


var _circles = _makeCircles();


function CanvasState(canvas) {
    // **** First some setup! ****

    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    // **** Keep track of state! ****

    this.valid = false; // when set to false, the canvas will redraw everything
    this.shapes = [];  // the collection of things to be drawn
    this.dragging = false; // Keep track of when we are dragging
    // the current selected object. In the future we could turn this into an array for multiple selection
    this.coor = [];
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;

    // **** Then events! ****

    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    var myState = this;

    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    }, false);


    function changeSpecificColor(id, color) {
        var ctx = canvas.getContext("2d");
        console.log(ctx);
        _placedCirclesArr[id].color = color;
        var circle = _placedCirclesArr[id];
        // ctx.strokeStyle = "rgb(248,170,145)";
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 0;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
    }


    // Up, down, and move are for dragging
    canvas.addEventListener('mousedown', function (e) {
        myState.dragging = true;
        myState.coor = [];


        // var mx = mouse.x;
        // var my = mouse.y;
        // var shapes = myState.shapes;
        // var l = shapes.length;
        // for (var i = l-1; i >= 0; i--) {
        //     if (shapes[i].contains(mx, my)) {
        //         var mySel = shapes[i];
        //         // Keep track of where in the object we clicked
        //         // so we can move it smoothly (see mousemove)
        //         myState.dragoffx = mx - mySel.x;
        //         myState.dragoffy = my - mySel.y;
        //         myState.dragging = true;
        //         myState.selection = mySel;
        //         myState.valid = false;
        //         return;
        //     }
        //
        // havent returned means we have failed to select anything.
        // If there was an object selected, we deselect it
        // if (myState.selection) {
        //     myState.selection = null;
        //     myState.valid = false; // Need to clear the old selection border
        // }
    }, true);
    canvas.addEventListener('mousemove', function (e) {
        if ((myState.dragging) && (tooltype === "vector")) {
            sleep(100);
            var mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            // myState.selection.x = mouse.x - myState.dragoffx;
            // myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false; // Something's dragging so we must redraw

            myState.coor.push(mouse.x);
            myState.coor.push(mouse.y);
            console.log(myState.coor);

        }
    }, true);
    canvas.addEventListener('mouseup', function (e) {
        if (tooltype === "vector") {
            // get 3 points
            let r = 25;
            let startPx = myState.coor[0];
            let startPy = myState.coor[1];

            let midId = Math.floor(myState.coor.length / 2);
            let midPx = myState.coor[midId];
            let midPy = myState.coor[midId + 1];

            let endPx = myState.coor[myState.coor.length - 2];
            let endPy = myState.coor[myState.coor.length - 1];

            let points = [startPx, startPy, midPx, midPy, endPx, endPy];

            console.log("startp: " + startPx);
            for (let c = 0; c < _placedCirclesArr.length; c++) {
                console.log(" enterd for ");
                for (let p = 0; p < points.length; p += 2) {
                    let dx = Math.abs(_placedCirclesArr[c].x - points[p]);
                    let dy = Math.abs(_placedCirclesArr[c].y - points[p + 1]);
                    console.log("p" + p);
                    if (dx ** 2 + dy ** 2 <= r ** 2) {
                        if ((circleColor === "#FF3852") && (_placedCirclesArr[c].color === "rgb(255,154,131)") && ((numOfSpicy - numOfColoredSpicy) > 0)) {
                            changeSpecificColor(c, circleColor);
                            console.log(circleColor);
                            numOfColoredSpicy += 1;

                            spicyFactor += ((document.getElementById("newSpicySlider").value) / 100) / numOfSpicy;
                            // $('#newSpicySlider').css('background-image',
                            //     '-webkit-gradient(linear, left top, right top, '
                            //     + 'color-stop(' + spicyFactor + ', #FF3852), '
                            //     + 'color-stop(' + spicyFactor + ', #ddd)'
                            //     + ')'
                            // );

                        }
                        if ((circleColor === "#AC50D3") && (_placedCirclesArr[c].color === "rgb(255,154,131)") && ((numOfUmami - numOfColoredUmami) > 0)) {
                            changeSpecificColor(c, circleColor);
                            console.log(circleColor);
                            numOfColoredUmami += 1;

                            umamiFactor += ((document.getElementById("newUmamiSlider").value) / 100) / numOfUmami;
                            // $('#newUmamiSlider').css('background-image',
                            //     '-webkit-gradient(linear, left top, right top, '
                            //     + 'color-stop(' + umamiFactor + ', #AC50D3), '
                            //     + 'color-stop(' + umamiFactor + ', #ddd)'
                            //     + ')'
                            // );

                        }
                        if ((circleColor === "#75E039") && (_placedCirclesArr[c].color === "rgb(255,154,131)") && ((numOfHerbs - numOfColoredHerbs) > 0)) {
                            changeSpecificColor(c, circleColor);
                            console.log(circleColor);
                            numOfColoredHerbs += 1;

                            // herbsFactor += ((document.getElementById("newHerbsSlider").value) / 100) / numOfHerbs;
                            // $('#newHerbsSlider').css('background-image',
                            //     '-webkit-gradient(linear, left top, right top, '
                            //     + 'color-stop(' + herbsFactor + ', #75E039), '
                            //     + 'color-stop(' + herbsFactor + ', #ddd)'
                            //     + ')'
                            // );

                        }
                        if ((circleColor === "#E4E62E") && (_placedCirclesArr[c].color === "rgb(255,154,131)") && ((numOfSour - numOfColoredSour) > 0)) {
                            console.log(circleColor);
                            changeSpecificColor(c, circleColor);
                            numOfColoredSour += 1;

                            // sourFactor += ((document.getElementById("newSourSlider").value) / 100) / numOfSour;
                            // $('#newSourSlider').css('background-image',
                            //     '-webkit-gradient(linear, left top, right top, '
                            //     + 'color-stop(' + sourFactor + ', #E4E62E), '
                            //     + 'color-stop(' + sourFactor + ', #ddd)'
                            //     + ')'
                            // );

                        }

                    }

                }
            }


        }


    });


    function replaceCircle(id, color) {

        console.log("replaceCircle");
        if (color === SPICY && ((numOfSpicy - numOfColoredSpicy) > 0)) {
            changeSpecificColor(id, color);
            numOfColoredSpicy += 1;


        }
        if (color === OMAMI && ((numOfUmami - numOfColoredUmami) > 0)) {
            changeSpecificColor(id, color);
            numOfColoredUmami += 1;


        }
        if (color === HERBS && ((numOfHerbs - numOfColoredHerbs) > 0)) {
            changeSpecificColor(id, color);
            numOfColoredHerbs += 1;

        }
        if (color === SOUR && ((numOfSour - numOfColoredSour) > 0)) {
            changeSpecificColor(id, color);
            numOfColoredSour += 1;
        }
    }


    function setHigh(id) {
        var ctx = canvas.getContext("2d");
        console.log(ctx);
        _placedCirclesArr[id].z = 5;
        var circle = _placedCirclesArr[id];





        console.log("pinicon");


        ctx.strokeStyle = "blue";
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        numOfColoredHigh++;


    }


    function setMax(id) {
        var ctx = canvas.getContext("2d");
        console.log(ctx);
        _placedCirclesArr[id].z = 2;
        var circle = _placedCirclesArr[id];
        console.log(circle);


        ctx.strokeStyle = "blue";
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();


    }

    function setOrigin(id) {
        var ctx = canvas.getContext("2d");
        let bar, val, hi, factor, fixedFactor;
        console.log(ctx);

        switch (_placedCirclesArr[id].color) {
            case OMAMI:
                numOfColoredUmami--;
                console.log("numOfColoredUmami" + numOfColoredUmami);
                //update bar:
                bar = document.getElementById("progBarOmami");
                val = document.getElementById("omamiVal");
                hi = $("#progBarOmami").height();
                console.log('hi: ' + hi);
                factor = umamiFactor / numOfUmami;
                break;

            case SPICY:
                numOfColoredSpicy--;
                bar = document.getElementById("progBarSpicy");
                val = document.getElementById("spicyVal");
                hi = $("#progBarSpicy").height();
                factor = spicyFactor / numOfSpicy;
                break;

            case HERBS:
                numOfColoredHerbs--;
                bar = document.getElementById("progBarHerbs");
                val = document.getElementById("herbsVal");
                hi = $("#progBarHerbs").height();
                factor = herbsFactor / numOfHerbs;
                break;

            case SOUR:
                numOfColoredSour--;
                bar = document.getElementById("progBarSour");
                val = document.getElementById("sourVal");
                hi = $("#progBarSour").height();
                factor = sourFactor / numOfSour;
                ;
                break;

        }
        fixedFactor = Math.ceil(factor);
        if (hi < 100) {
            hi += fixedFactor;
            bar.style.height = hi + '%';
            val.innerHTML = hi + '%';
            if (hi >= 95) {
                bar.style.borderBottomRightRadius = 5 + "px";
                bar.style.borderBottomLeftRadius = 5 + "px";
            }
        }

        _placedCirclesArr[id].color = ORIGION;
        var circle = _placedCirclesArr[id];
        console.log(circle);


        ctx.strokeStyle = STROKE;
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();


    }


    canvas.addEventListener('click', function (e) {
        if (tooltype === "vector") {

        }
        if (tooltype === "erase") {
            // update to original color
            console.log("erase");
            var mouse = myState.getMouse(e);
            var id = contain(mouse.x, mouse.y);
            if (id >= 0) {
                setOrigin(id);
            }
        }

        if (tooltype === "brush") {

            console.log("brush");
            var mouse = myState.getMouse(e);
            var id = contain(mouse.x, mouse.y);
            if (id >= 0) {

                replaceCircle(id, circleColor);
            }
        }

        if (tooltype === "high") {
            // update z val
            // update stoke
            console.log("high");
            var mouse = myState.getMouse(e);
            var id = contain(mouse.x, mouse.y);
            if ((id >= 0) && (numOfColoredHigh < anchorHighNum)) {
                setHigh(id);
                // tooltype = "min";
            }

        }

        if (tooltype === "max") {
            // update z val
            // update stoke
            // update z val
            // update stoke
            console.log("max");
            var mouse = myState.getMouse(e);
            var id = contain(mouse.x, mouse.y);
            if (id >= 0) {
                setMax(id);
                // tooltype = "min";
            }
        }


    }, true);


    return {}

}


CanvasState.prototype.getMouse = function (e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
}


function greedyFillColor(color, targetPercentage, isLeftoversEater=false) {

    // Knapsack algorithm
    // Sort circle by size
    // Remember original id
    var canvas = document.getElementById("BowlCanvas");
    var target = (0.3) * canvas.width * canvas.height * targetPercentage / 100;
    var sortableCircles = [];

    for (let i = 0; i < _placedCirclesArr.length; i++) {
        //_placedCirclesArr[i].color = "black";
        _placedCirclesArr[i].id = i;
        let obj = _placedCirclesArr[i];
        if (obj.color === '#e8c880') {
            sortableCircles.push(obj);
        }
    }


    // Sort tuples of {id, circle} by circle size
    var sortedCircles = sortableCircles.sort(function (a, b) {
        return b.size - a.size;
    });

    // Collect ids of largest circles still fitting the sack
    var colored = [];
    if (isLeftoversEater){
        var idcircle = sortedCircles[0];
        colored.push(idcircle.id);
        target -= (idcircle.size * idcircle.size * Math.PI);
        switch (color) {
            case OMAMI:
                numOfColoredUmami++;
                numOfUmami++;
                break;
            case SPICY:
                numOfColoredSpicy++;
                numOfSpicy++;
                break;
            case SOUR:
                numOfSour++;
                numOfColoredSour++;
                break;
            case HERBS:
                numOfColoredHerbs++;
                numOfHerbs++;
                break;
        }
    }
    $.each(sortedCircles, function (i, idcircle) {
        if ((idcircle.size * idcircle.size * Math.PI) < target) {
            colored.push(idcircle.id);
            target -= (idcircle.size * idcircle.size * Math.PI);
            switch (color) {
                case OMAMI:
                    numOfColoredUmami++;
                    numOfUmami++;
                    break;
                case SPICY:
                    numOfColoredSpicy++;
                    numOfSpicy++;
                    break;
                case SOUR:
                    numOfSour++;
                    numOfColoredSour++;
                    break;
                case HERBS:
                    numOfColoredHerbs++;
                    numOfHerbs++;
                    break;
            }
        }
    });

    // Color all selected circles
    $.each(colored, function (id, idcircle) {

        // ChangeSpecificColor
        var canvas = document.getElementById("BowlCanvas");
        var ctx = canvas.getContext("2d");
        console.log(ctx);
        _placedCirclesArr[idcircle].color = color;
        var circle = _placedCirclesArr[idcircle];
        // ctx.strokeStyle = "rgb(248,170,145)";
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 0;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
    })
}


var putNoodleRandom = function () {
    flag = true;
    $(function () {
        $canvas = $("#BowlCanvas")
        console.log($canvas);
        var ctx = $canvas[0].getContext('2d');
        _drawSvg(ctx, 'Try.svg', function () {
            var imgData = ctx.getImageData(0, 0, _canvasProps.width, _canvasProps.height);
            placeCircles(imgData);
            _drawCircles($canvas[0].getContext('2d'));
        });
    })
}


var putNoodleCentered = function () {
    $(function () {
        $canvas = $("#BowlCanvas")
        console.log($canvas);
        var ctx = $canvas[0].getContext('2d');
        //placeCirclesCentered2();
        placeCirclesSpiral();
        _drawCircles($canvas[0].getContext('2d'));
        //_drawSvg(ctx, 'Try.svg', function () {
        //    var imgData = ctx.getImageData(0, 0, _canvasProps.width, _canvasProps.height);
        //    placeCircles(imgData);
        //    _drawCircles($canvas[0].getContext('2d'));
        //});

    })

}


function initPlate() {

    var s = new CanvasState(document.getElementById("BowlCanvas"));
    document.querySelector("#newTimer")
    // var btn = document.querySelector("#random").addEventListener("click", putNoodleRandom, false);

}


initPlate();


//
// console.log(document.getElementById('s3').getAttribute('d'));
// sleep(1000);
// let c = "M10 250 Q 80 50, 95 300 T 180 80";
// document.getElementById('s3').setAttribute('d', c);
// console.log(document.getElementById('s3').getAttribute('d'));


//     $canvas.attr({"id": "canvas1"});
//     var $canvas2 = $('<canvas>').attr(_canvasProps).appendTo('main');
//     $canvas2.attr({"id": "canvas2"});
//     var ctx = $canvas[0].getContext('2d');
//     console.log('note.svg');
//     _drawSvg(ctx, 'note.svg', function () {
//         var imgData = ctx.getImageData(0, 0, _canvasProps.width, _canvasProps.height);
//         placeCircles(imgData);
//         _drawCircles($canvas2[0].getContext('2d'));
//     });
//     initPlate();
//
// });
// //


//
// function getMousePos(e) {
//     return {x: e.clientX, y: e.clientY};
// }
//
//
// document.onmousemove = function (e) {
//     var mousecoords = getMousePos(e);
//     // console.log("x: " + mousecoords.x + " y: " + mousecoords.y);
// };
//
// let coor = [];
//
//
// $(document).ready(function () {
//     $('<svg>').addEventListener("mousedown", function (e) { coor.push(getMousePos(e));}, true);
//
// });
//
//
// console.log(coor);
//
// jQuery(document).ready(function(){
//     // This button will increment the value
//     $('.qtyplus').click(function(e){
//         // Stop acting like a button
//         e.preventDefault();
//         // Get the field name
//         fieldName = $(this).attr('field');
//         // Get its current value
//         var currentVal = parseInt($('input[name='+fieldName+']').val());
//         // If is not undefined
//         if (!isNaN(currentVal)) {
//             // Increment
//             $('input[name='+fieldName+']').val(currentVal + 1);
//         } else {
//             // Otherwise put a 0 there
//             $('input[name='+fieldName+']').val(0);
//         }
//     });
//     // This button will decrement the value till 0
//     $(".qtyminus").click(function(e) {
//         // Stop acting like a button
//         e.preventDefault();
//         // Get the field name
//         fieldName = $(this).attr('field');
//         // Get its current value
//         var currentVal = parseInt($('input[name='+fieldName+']').val());
//         // If it isn't undefined or its greater than 0
//         if (!isNaN(currentVal) && currentVal > 0) {
//             // Decrement one
//             $('input[name='+fieldName+']').val(currentVal - 1);
//         } else {
//             // Otherwise put a 0 there
//             $('input[name='+fieldName+']').val(0);
//         }
//     });
// });


function minPress(evt) {
    document.getElementById("min").src = "Icons/MinWhite.png";
    document.getElementById("max").src = "Icons/MaxWhite.png";
    evt.currentTarget.src = ("Icons/MinBlue.png");
    tooltype = "min";

}


function maxPress(evt) {
    document.getElementById("min").src = "Icons/MinWhite.png";
    document.getElementById("max").src = "Icons/MaxWhite.png";
    evt.currentTarget.src = ("Icons/MaxBlue.png");
    tooltype = "max";

}

//
// function eraserPress(evt) {
//     restoreButtons(evt);
//     evt.currentTarget.src = ("Icons/EraserBlue.png");
//     tooltype = "erase";
//
// }

function eraserBut() {
    tooltype = "erase";
    console.log("erase presssed");
}

function brushbut(flavor) {
    tooltype = "brush";
    switch (flavor) {
        case OMAMI:
            circleColor = OMAMI;
            break;
        case SPICY:
            circleColor = SPICY;
            break;
        case SOUR:
            circleColor = SOUR;
            break;
        case HERBS:
            circleColor = HERBS
            break;
    }
    console.log("brush presssed");

}


function vectorPress(evt) {
    restoreButtons(evt);
    evt.currentTarget.src = ("Icons/VectorBlue.png");
    tooltype = "vector";
    var flavourTotal = 0;

    var spicyVal = (document.getElementById("newSpicySlider")).value;
    var umamiVal = (document.getElementById("newUmamiSlider")).value;
    var herbsVal = (document.getElementById("newHerbsSlider")).value;
    var sourVal = (document.getElementById("newSourSlider")).value;

    if (spicyVal > 0) {
        flavourTotal += parseInt(spicyVal);
        console.log("total:" + flavourTotal);
    }
    if (umamiVal > 0) {
        flavourTotal += parseInt(umamiVal);
        console.log("total:" + flavourTotal);

    }
    if (herbsVal > 0) {
        flavourTotal += parseInt(herbsVal);
        console.log("total:" + flavourTotal);

    }
    if (sourVal > 0) {
        flavourTotal += parseInt(sourVal);
        console.log("total:" + flavourTotal);

    }

    numOfSpicy = Math.floor((parseInt(spicyVal) / flavourTotal) * _placedCirclesArr.length);
    numOfUmami = Math.floor((parseInt(umamiVal) / flavourTotal) * _placedCirclesArr.length);
    numOfHerbs = Math.floor((parseInt(herbsVal) / flavourTotal) * _placedCirclesArr.length);
    numOfSour = Math.floor((parseInt(sourVal) / flavourTotal) * _placedCirclesArr.length);

    // alert(numOfSpicy + "," + numOfUmami + ","  + numOfHerbs + "," + numOfSour + ",");
}


function brushPress(evt) {
    tooltype = "brush";
    restoreButtons(evt);
    evt.currentTarget.src = ("Icons/BrushBlue.png");
    var flavourTotal = 0;

    var spicyVal = (document.getElementById("newSpicySlider")).value;
    var umamiVal = (document.getElementById("newUmamiSlider")).value;
    var herbsVal = (document.getElementById("newHerbsSlider")).value;
    var sourVal = (document.getElementById("newSourSlider")).value;

    if (spicyVal > 0) {
        flavourTotal += parseInt(spicyVal);
        console.log("total:" + flavourTotal);
    }
    if (umamiVal > 0) {
        flavourTotal += parseInt(umamiVal);
        console.log("total:" + flavourTotal);

    }
    if (herbsVal > 0) {
        flavourTotal += parseInt(herbsVal);
        console.log("total:" + flavourTotal);

    }
    if (sourVal > 0) {
        flavourTotal += parseInt(sourVal);
        console.log("total:" + flavourTotal);

    }

    numOfSpicy = Math.floor((parseInt(spicyVal) / flavourTotal) * _placedCirclesArr.length);
    numOfUmami = Math.floor((parseInt(umamiVal) / flavourTotal) * _placedCirclesArr.length);
    numOfHerbs = Math.floor((parseInt(herbsVal) / flavourTotal) * _placedCirclesArr.length);
    numOfSour = Math.floor((parseInt(sourVal) / flavourTotal) * _placedCirclesArr.length);

    // alert(numOfSpicy + "," + numOfUmami + ","  + numOfHerbs + "," + numOfSour + ",");
}

function printSoup() {
    console.log(_placedCirclesArr);
    var myJsonString = JSON.stringify(_placedCirclesArr);
    // console.log(myJsonString);


}



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


    if (page === 3) {
        greedyFillColor('#f97253', spicyFactor * 0.25); // spicy
        greedyFillColor("#a28275", umamiFactor * 0.25); // omami
        greedyFillColor("#a9c0a9", herbsFactor * 0.25); // herb
        greedyFillColor("#b6e079", sourFactor * 0.25, true); // sour
        var era = document.getElementById("erase");
        era.style.display = "block";
    }
    else {

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


// sliders control:


function spicyVal(val) {
    $('#spicyValue').text(val + "%");
    spicyFactor = val;
    $('#newSpicySlider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #f97253), '
        + 'color-stop(' + val / 100 + ', #ddd)'
        + ')'
    );
}


function umamiVal(val) {
    $('#umamivalue').text(val + "%");
    umamiFactor = val;
    $('#newUmamiSlider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #a28275), '
        + 'color-stop(' + val / 100 + ', #ddd)'
        + ')'
    );
}


function herbval(val) {

    $('#herbValue').text(val + "%");
    herbsFactor = val;

    $('#newHerbsSlider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #a9c0a9), '
        + 'color-stop(' + val / 100 + ', #ddd)'
        + ')'
    );
}


function sourVal(val) {
    $('#sourValue').text(val + "%");
    sourFactor = val;
    $('#newSourSlider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #b6e079), '
        + 'color-stop(' + val / 100 + ', #ddd)'
        + ')'
    );
}

function updateAnchorsHigh(operator) {
    console.log("in operator")


    if (operator === '-') {

        if (anchorHighNum > 0) {
            anchorHighNum--;
            document.getElementById("numHigh").innerHTML = anchorHighNum.toString();
        }
    }
    if (operator === '+') {
        if (anchorHighNum < _placedCirclesArr.length) {
            anchorHighNum++;
            document.getElementById("numHigh").innerHTML = anchorHighNum.toString();
        }
    }
    if (anchorHighNum > 0) {
        tooltype = "high";
    }

}


// colors:

// #a28275  omami
// #b6e079 sour
// #f97253 spicy
// #a9c0a9 herb
//	#f2d58b stoke circle
// #d3c9c9 border plate and backroung next/prex
// #8c8181 letter
// #fee9cc soup
// 	#eae5e5 unused page


/**------------------------
 * Global variable:
 ---------------*/

const OMAMI = "#a28275";
const SOUR = "#b6e079";
const SPICY = "#f97253";
const HERBS = "#a9c0a9";
const STROKE = "#f2d58b";
const ORIGION = "#e8c880";


var _canvasProps = {width: 300, height: 300};
var _options = {spacing: -2.5, numCircles: 1000, minSize: 3, maxSize: 7, higherAccuracy: false};
var _placedCirclesArr = [];
var tooltype = 'init';
var ip = "1111";
var soupFactor;
var spicyFactor = 0;
var umamiFactor = 0;
var herbsFactor = 0;
var sourFactor = 0;
var circleColor = ORIGION;
var flag = false;

var drawnFlag = false;

var numOfSpicy = 0;
var numOfColoredSpicy = 0;
var numOfUmami = 0;
var numOfColoredUmami = 0;
var numOfHerbs = 0;
var numOfColoredHerbs = 0;
var numOfSour = 0;
var numOfColoredSour = 0;

var page = 1;
var anchorHighNum = 0
var numOfColoredHigh = 0



// use to slow  operation
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


// use to get random number in any range:
var randrange = function (min, max) {
    return (max - min) * Math.random() + min;
};


/**
 *  Placed circle logic:
 */
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

// circled logic:
var placeCirclesCentered2 = function () {
    //console.log(imgData);
    _placedCirclesArr = [];
    console.log(_placedCirclesArr);

    let canvas = document.getElementById("BowlCanvas");
    let canvas_min = 0.3 * Math.min(canvas.width, canvas.height);
    let targetArea = canvas_min * canvas_min * Math.PI;
    let curArea = 0;
    let center_rad = randrange(0.3 * canvas_min, 0.8 * canvas_min);
    curArea += center_rad * center_rad * Math.PI;
    let level_1 = 15;
    let testArea = curArea;
    let lastTestArea = curArea;
    let tooBig = false;
    while (!tooBig) {
        var ring1_rad = Math.min(canvas_min - center_rad, center_rad * Math.sin(Math.PI / level_1) / (1 - Math.sin(Math.PI / level_1)));
        testArea = curArea + (ring1_rad * ring1_rad) * Math.PI * level_1;
        if (testArea > targetArea) {
            tooBig = true;
        }
        lastTestArea = testArea;
        level_1 -= 1; // dec circles number --> inc total size
    }

    let level_2 = 15;
    curArea = lastTestArea;
    tooBig = false;
    while (!tooBig) {
        var ring2_rad = Math.min(canvas_min - center_rad, ring1_rad * Math.sin(Math.PI / level_2) / (1 - Math.sin(Math.PI / level_2)));
        testArea = curArea + (ring1_rad * ring1_rad) * Math.PI * level_2;
        if (testArea > targetArea) {
            tooBig = true;
        }
        level_1 -= 1; // dec circles number --> inc total size
    }

    // Center
    var circle = _circles[0];
    circle.x = 0.5 * _canvasProps.width;
    circle.y = 0.5 * _canvasProps.height;
    circle.size = center_rad;
    _placedCirclesArr.push(circle);

    // Ring 1
    for (let i = 1; i < 1 + level_1; i++) {
        let circle = _circles[i];
        let frac = i / (level_1);
        let deg = frac * 2 * Math.PI;
        let x = _circles[0].x + Math.cos(deg) * (center_rad + ring1_rad + 2);
        let y = _circles[0].y + Math.sin(deg) * (center_rad + ring1_rad + 2);
        circle.size = ring1_rad;
        if (!_touchesPlacedCircle(x, y, circle.size)) {
            circle.x = x;
            circle.y = y;
            _placedCirclesArr.push(circle);
        }
    }

    // Ring 2
    for (let i = 0; i < level_1; i++) {
        for (let j = 0; j < level_2; j++) {
            let circle = _circles[1 + level_1 + (i * level_2) + j];
            let ring1 = _circles[1 + i];
            let frac = j / (level_2);
            let deg = -frac * 2 * Math.PI;
            let x = ring1.x + Math.cos(deg) * (ring1_rad + ring2_rad + 2);
            let y = ring1.y + Math.sin(deg) * (ring1_rad + ring2_rad + 2);
            circle.size = ring2_rad;
            if (!_touchesPlacedCircle(x, y, circle.size)) {
                circle.x = x;
                circle.y = y;
                _placedCirclesArr.push(circle);
            }
        }
    }

};

/**
 * create and draw single circle logic
 */
var _makeCircles = function () {
    let circles = [];

    for (let j = 0; j < 15; j++) {
        let circle1 = {
            color: ORIGION,
            size: 20 //do random twice to prefer more smaller ones
        };
        circles.push(circle1);


        let circle2 = {
            color: ORIGION,
            size: 9 //do random twice to prefer more smaller ones
        };
        circles.push(circle2);


        let circle3 = {
            color: ORIGION,
            size: 9 //do random twice to prefer more smaller ones
        };
        circles.push(circle3);
    }
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

var _drawPath = function (ctx, points, callback) {

    // let img = new Image(ctx);
    // img.onload = function () {
    //     ctx.drawImage(img, 0, 0);
    // };
    // img.src = path;
    ctx.fillStyle = "blue";
    /** set path */
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 200);
    ctx.lineTo(200, 200);
    ctx.lineTo(200, 100);
    ctx.closePath();
    // ctx.lineTo(200,200);

    /** render */
    ctx.fill();
    ctx.stroke();
    callback();

};


var _drawSvg = function (ctx, path, callback) {

    let img = new Image(ctx);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        callback();
    };
    img.src = path;
};


var contain = function (mx, my) {
    console.log("mouse x: " + mx + " mouse y: " + my);

    for (let i = 0; i < _placedCirclesArr.length; i++) {
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


/**
 *  canvas Obj
 *  It's property and method
 */
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
    this.coorVec = [];
    this.coorCreate = [];
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
        let ctx = canvas.getContext("2d");
        console.log(ctx);
        _placedCirclesArr[id].color = color;
        let circle = _placedCirclesArr[id];
        // ctx.strokeStyle = "rgb(248,170,145)";
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 0;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
    }


    canvas.addEventListener( 'touchmove', function (e) {
        if ((myState.dragging) && (tooltype === "vector"))  {
            // myState.coorVec = [];
            sleep(100);
            let mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            // myState.selection.x = mouse.x - myState.dragoffx;
            // myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false; // Something's dragging so we must redraw

            myState.coorVec.push(mouse.x);
            myState.coorVec.push(mouse.y);
            console.log(myState.coorVec);

        }
        if ((myState.dragging) && (tooltype === "create")) {
            // myState.coorCreate = [];
            // sleep(200);
            let mouse = myState.getMouse(e);
            myState.valid = false; // Something's dragging so we must redraw
            myState.coorCreate.push(mouse.x);
            myState.coorCreate.push(mouse.y);
            console.log("array create: " + myState.coorCreate);

        }



    }, true);


    canvas.addEventListener('touchend', function (e) {
        if (tooltype === "vector") {
            // get 3 points
            let r = 25;
            let startPx = myState.coorVec[0];
            let startPy = myState.coorVec[1];

            let midId = Math.floor(myState.coorVec.length / 2);
            let midPx = myState.coorVec[midId];
            let midPy = myState.coorVec[midId + 1];

            let endPx = myState.coorVec[myState.coorVec.length - 2];
            let endPy = myState.coorVec[myState.coorVec.length - 1];

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

                            spicyFactor += ((document.getElementById("spicySlider").value) / 100) / numOfSpicy;


                        }
                        if ((circleColor === "#AC50D3") && (_placedCirclesArr[c].color === "rgb(255,154,131)") && ((numOfUmami - numOfColoredUmami) > 0)) {
                            changeSpecificColor(c, circleColor);
                            console.log(circleColor);
                            numOfColoredUmami += 1;

                            umamiFactor += ((document.getElementById("omamiSlider").value) / 100) / numOfUmami;


                        }
                        if ((circleColor === "#75E039") && (_placedCirclesArr[c].color === "rgb(255,154,131)") && ((numOfHerbs - numOfColoredHerbs) > 0)) {
                            changeSpecificColor(c, circleColor);
                            console.log(circleColor);
                            numOfColoredHerbs += 1;


                        }
                        if ((circleColor === "#E4E62E") && (_placedCirclesArr[c].color === "rgb(255,154,131)") && ((numOfSour - numOfColoredSour) > 0)) {
                            console.log(circleColor);
                            changeSpecificColor(c, circleColor);
                            numOfColoredSour += 1;


                        }
                    }

                }
            }
        }
        if (tooltype === "create") {

            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fee9cc"; // notice: same as background canvas color
            console.log("array: " + myState.coorCreate);
            console.log("in mouseop create");
            ctx.moveTo(myState.coorCreate[0], myState.coorCreate[1]);
            for (let i = 2; i < myState.coorCreate.length-1; i+=2) {
                ctx.lineTo(myState.coorCreate[i], myState.coorCreate[i+1]);
            }
            ctx.closePath();

            ctx.fill();
            // ctx.stroke();
            let imgData = ctx.getImageData(0, 0, _canvasProps.width, _canvasProps.height);
            placeCircles(imgData);
            _drawCircles(ctx);

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

        console.log("setHigh");
        _placedCirclesArr[id].z = 5;
        var circle = _placedCirclesArr[id];

        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, img.width, img.height, circle.x - 10, circle.y - 38, 20, 40);
        }
        img.src = 'Images/imagefiles_location_map_pin_navy_blue5.png';

        // console.log("pinicon circle.x: " + circle.x + "circle.y: " + circle.y );


    }


    // function setMax(id) {
    //     var ctx = canvas.getContext("2d");
    //     console.log(ctx);
    //     _placedCirclesArr[id].z = 2;
    //     var circle = _placedCirclesArr[id];
    //     console.log(circle);
    //
    //
    //     ctx.strokeStyle = "blue";
    //     ctx.fillStyle = circle.color;
    //     ctx.lineWidth = 3;
    //
    //     ctx.beginPath();
    //     ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
    //     ctx.fill();
    //     ctx.stroke();
    //
    //
    // }

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
        let circle = _placedCirclesArr[id];
        console.log(circle);


        ctx.strokeStyle = STROKE;
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

    }



    canvas.addEventListener('touchstart', function (e) {
        if (tooltype === "create" ) {
            myState.dragging = true;
            myState.coorCoor = [];

        }


        if (tooltype === "vector") {
            myState.dragging = true;
            myState.coorVec = [];
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
            let mouse = myState.getMouse(e);
            let id = contain(mouse.x, mouse.y);
            if (id >= 0) {

                replaceCircle(id, circleColor);
            }
        }

        if (tooltype === "high") {
            // update z val
            // update stoke
            let mouse = myState.getMouse(e);
            let id = contain(mouse.x, mouse.y);
            // if ((id >= 0) && (0 < anchorHighNum)) {
            if ((id >= 0) && (numOfColoredHigh < anchorHighNum)) {

                console.log("click - high");


                setHigh(id);
                updateProgBar();

                // tooltype = "min";
            }

        }

        //     if (tooltype === "max") {
        //         // update z val
        //         // update stoke
        //         // update z val
        //         // update stoke
        //         console.log("max");
        //         let mouse = myState.getMouse(e);
        //         let id = contain(mouse.x, mouse.y);
        //         if (id >= 0) {
        //             setMax(id);
        //             // tooltype = "min";
        //         }
        //     }
        //
        // }, true);
    });
}

CanvasState.prototype.getMouse = function (e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
    var touchobj = e.changedTouches[0];

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

    mx = parseInt(touchobj.clientX - offsetX);
    my = parseInt(touchobj.clientY - offsetY);



    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
}


function greedyFillColor(color, targetPercentage, isLeftoversEater = false) {

    // Knapsack algorithm
    // Sort circle by size
    // Remember original id
    let canvas = document.getElementById("BowlCanvas");
    let target = (0.3) * canvas.width * canvas.height * targetPercentage / 100;
    let sortableCircles = [];

    for (let i = 0; i < _placedCirclesArr.length; i++) {
        //_placedCirclesArr[i].color = "black";
        _placedCirclesArr[i].id = i;
        let obj = _placedCirclesArr[i];
        if (obj.color === '#e8c880') {
            sortableCircles.push(obj);
        }
    }


    // Sort tuples of {id, circle} by circle size
    let sortedCircles = sortableCircles.sort(function (a, b) {
        return b.size - a.size;
    });

    // Collect ids of largest circles still fitting the sack
    let colored = [];
    if (isLeftoversEater) {
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
        let canvas = document.getElementById("BowlCanvas");
        let ctx = canvas.getContext("2d");
        console.log(ctx);
        _placedCirclesArr[idcircle].color = color;
        let circle = _placedCirclesArr[idcircle];
        // ctx.strokeStyle = "rgb(248,170,145)";
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 0;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
    })
}


var putNoodleEven = function () {
    flag = true;
    tooltype = "create";
};


var putNoodleRandom = function () {
    flag = true;
    $(function () {
        $canvas = $("#BowlCanvas")
        console.log($canvas);
        let ctx = $canvas[0].getContext('2d');
        _drawSvg(ctx, 'Try.svg', function () {
            let imgData = ctx.getImageData(0, 0, _canvasProps.width, _canvasProps.height);
            placeCircles(imgData);
            _drawCircles($canvas[0].getContext('2d'));
        });
    })
};


var putNoodleCentered = function () {
    $(function () {
        $canvas = $("#BowlCanvas");
        console.log($canvas);
        let ctx = $canvas[0].getContext('2d');
        placeCirclesCentered2();
        _drawCircles($canvas[0].getContext('2d'));
        //_drawSvg(ctx, 'Try.svg', function () {
        //    var imgData = ctx.getImageData(0, 0, _canvasProps.width, _canvasProps.height);
        //    placeCircles(imgData);
        //    _drawCircles($canvas[0].getContext('2d'));
        //});

    })
};


//
// function minPress(evt) {
//     document.getElementById("min").src = "Icons/MinWhite.png";
//     document.getElementById("max").src = "Icons/MaxWhite.png";
//     evt.currentTarget.src = ("Icons/MinBlue.png");
//     tooltype = "min";
//
// }
//
//
// function maxPress(evt) {
//     document.getElementById("min").src = "Icons/MinWhite.png";
//     document.getElementById("max").src = "Icons/MaxWhite.png";
//     evt.currentTarget.src = ("Icons/MaxBlue.png");
//     tooltype = "max";
//
// }


/**
 * Buttons Handlers:
 */

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
    let flavourTotal = 0;

    let spicyVal = (document.getElementById("spicySlider")).value;
    let umamiVal = (document.getElementById("omamiSlider")).value;
    let herbsVal = (document.getElementById("herbSlider")).value;
    let sourVal = (document.getElementById("sourSlider")).value;

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
    let flavourTotal = 0;

    let spicyVal = (document.getElementById("spicySlider")).value;
    let umamiVal = (document.getElementById("omamiSlider")).value;
    let herbsVal = (document.getElementById("herbSlider")).value;
    let sourVal = (document.getElementById("sourSlider")).value;

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
    console.log( "before: " +  _placedCirclesArr[0].x);
    for(let i = 0; i < _placedCirclesArr.length; i++) {
        _placedCirclesArr[i].x = (_placedCirclesArr[i].x - 150) / 20;
        _placedCirclesArr[i].y = (_placedCirclesArr[i].y - 150) / 20;
        _placedCirclesArr[i].size = (_placedCirclesArr[i].size) / 20;
    }

    console.log( "after: " +_placedCirclesArr[0].x);

    json_obj = {vessels: _placedCirclesArr.slice(0,15)};
    var myJsonString = JSON.stringify(json_obj);
    console.log(json_obj);



    xhr = new XMLHttpRequest();
    var url = "http://192.168.1.102:8888/data";
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // var json = JSON.parse(xhr.responseText);
            // console.log(json.email + ", " + json.name)
            console.log("ok");
        }
    }
    // var data = JSON.stringify({"email":"tomb@raider.com","name":"LaraCroft"});
    xhr.send(myJsonString);

    // $.post("192.168.1.102:8888/data",
    //     "hi",
    //     function(){
    //         alert("Data: ");
    //     }).then(response => console.log("GOOD"));

}

function openKitchen(curPage) {


    // console.log('openKitchen', evt, curPage);
    page = curPage;
    let i, tabcontent, tablinks;


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
    let p = document.getElementById('page' + curPage);
    console.log(p);
    p.style.display = "block";
    p.className += " active";
    // evt.currentTarget.className += " active";

    let l = document.getElementById('tablink' + curPage);
    l.className += ' active';

    let pass = document.getElementsByClassName("passPage");

    console.log(pass);
    if (page === 1) {
        pass[0].className += " disableBut";
        // tooltype = "create";
    }

    if (page !== 1) {
        console.log('page: ' + page);
        // pass[0].disabled = false;
        pass[0].className = pass[0].className.replace(" disableBut", "");
        console.log(pass[0]);
    }


    if (page === 3) {
        var era = document.getElementById("erase");
        era.style.display = "block";

        greedyFillColor('#f97253', spicyFactor * 0.25); // spicy
        greedyFillColor("#a28275", umamiFactor * 0.25); // omami
        greedyFillColor("#a9c0a9", herbsFactor * 0.25); // herb
        greedyFillColor("#b6e079", sourFactor * 0.25, true); // sour

    }

    if (page !== 3) {
        var era = document.getElementById("erase");
        era.style.display = "none";
    }

    let footers = document.getElementsByTagName('footer');
    if (page === 5) {
        footers[0].style = 'display: none;';
    }
    if (page !== 5) {
        footers[0].style = 'display: flex;';
    }
}


function singlePass(sign) {
    if ((sign === 'next') && (page < 5)) {
        openKitchen(page + 1);
    }
    if ((sign === 'prev') && (page > 1)) {
        openKitchen(page - 1);
    }

}


/**
 * Sliders Handlers:
 */

function strucVal(val) {
    $('#soupVal').text(val + "% \n SOUP");
    $('#noodleVal').text("  " + (100 - val) + "% \n NOODLE");

    sourFactor = val;
    $('#structure_slider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #fee9cc), '
        + 'color-stop(' + val / 100 + ', #e8c880)'
        + ')'
    );

}


function spicyVal(val) {
    $('#spicyValue').text(val + "%");
    spicyFactor = val;
    $('#spicySlider').css({
            'background-image':
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + val / 100 + ', #f97253), '
            + 'color-stop(' + val / 100 + ', #fff)'
            + ')',
            // 'border-image':
            // '-webkit-gradient(linear, left top, right top, '
            // + 'color-stop(' + val / 100 + ', #f97253), '
            // + 'color-stop(' + val / 100 + ', black)'
            // + ')',

        }
    );
}


function umamiVal(val) {
    $('#omamiValue').text(val + "%");
    umamiFactor = val;
    $('#omamiSlider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #a28275), '
        + 'color-stop(' + val / 100 + ', #fff)'
        + ')'
    );
}


function herbVal(val) {
    console.log("in herbsilder")

    $('#herbValue').text(val + "%");
    herbsFactor = val;

    $('#herbSlider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #a9c0a9), '
        + 'color-stop(' + val / 100 + ', #fff)'
        + ')'
    );
}


function sourVal(val) {
    $('#sourValue').text(val + "%");
    sourFactor = val;
    $('#sourSlider').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val / 100 + ', #b6e079), '
        + 'color-stop(' + val / 100 + ', #fff)'
        + ')'
    );
}

/**
 * Heights handlers:
 */



function updateAnchorsHigh(operator) {
    console.log("in operator: " + anchorHighNum);
    let containerHigh = document.getElementById("containerHigh");

    if (operator === '-') {

        if (anchorHighNum > 0) {
            anchorHighNum--;
            document.getElementById("numHigh").innerHTML = anchorHighNum.toString();
            containerHigh.removeChild(containerHigh.lastChild);
            console.log("in Minus: " + containerHigh);

        }
    }
    if (operator === '+') {
        if (anchorHighNum < _placedCirclesArr.length) {
            anchorHighNum++;
            document.getElementById("numHigh").innerHTML = anchorHighNum.toString();

            // add new units
            let progBarUnit = document.createElement('div');
            progBarUnit.setAttribute('class', 'progBarUnit');
            progBarUnit.style.width = (100 / (anchorHighNum)) + '%';

            // append it:
            containerHigh.appendChild(progBarUnit);
        }
    }
    if (anchorHighNum > 0) {
        tooltype = "high";
    }

    // update all units width
    for (let i = 0; i < containerHigh.children.length; i++) {
        console.log(containerHigh.children[i]);
        containerHigh.children[i].style.width = (100 / (anchorHighNum)) + '%';
    }


    // decorate the first and last units
    if (anchorHighNum === 1) {
        containerHigh.children[0].className += ' firstProgBarUnit lastProgBarUnit';
    }
    if (containerHigh.children.length > 1) {
        console.log(containerHigh.children);
        let unitName = containerHigh.children[containerHigh.children.length - 2].className.replace(' lastProgBarUnit', '');
        containerHigh.children[containerHigh.children.length - 2].className = unitName;
        containerHigh.children[containerHigh.children.length - 1].className += " lastProgBarUnit";
        console.log(containerHigh.children);
    }


}

function updateProgBar() {
    // get containerHigh elem
    let containerHigh = document.getElementById("containerHigh");
    console.log("in updateProg");
    containerHigh.removeChild(containerHigh.lastChild);
    // containerHigh.children[anchorHighNum].style.display = "none";
    numOfColoredHigh++;

}

window.onload = function () {
    // console.log('canvas: ' + document.getElementById("BowlCanvas"));
    let s = new CanvasState(document.getElementById("BowlCanvas"));
    openKitchen(1);
    // putNoodleCentered();
};
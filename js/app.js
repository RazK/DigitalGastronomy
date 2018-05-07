// range bars:
//
// $(document).ready(function () {
//     init();
// });
//
// function init() {
//     // Init slider 1
//     var slider = document.getElementById('slider');
//     var classes = ['c-18deg-color', 'c-20deg-color', 'c-22deg-color', 'c-24deg-color', 'c-26deg-color'];
//
//     noUiSlider.create(slider, {
//         start: [20, 80],
//         connect: [true, true, false],
//         range: {
//             'min': [0],
//             'max': [100]
//         }
//     });
//
//     var connect = slider.querySelectorAll('.noUi-connect');
//
//     for (var i = 0; i < connect.length; i++) {
//         connect[i].classList.add(classes[i]);
//     }
//
//     // Init slider 2
//     var slider2 = document.getElementById('slider2');
//     slider2.setAttribute("class", "center");
//
//     var classes2 = ['c-18deg-color', 'c-20deg-color', 'c-22deg-color', 'c-24deg-color', 'c-26deg-color'];
//
//     noUiSlider.create(slider2, {
//         start: [20, 40, 60, 80],
//         connect: [true, true, true, true, true],
//         range: {
//             'min': [0],
//             'max': [100]
//         }
//
//     });
//
//     var connect2 = slider2.querySelectorAll('.noUi-connect');
//
//     for (var i = 0; i < connect2.length; i++) {
//         connect2[i].classList.add(classes2[i]);
//     }
//
//     // Init tabs
//     $('.tabs').tabs();
// }


// canvas control:

var w = window.innerWidth;
var h = window.innerHeight;
var side = w < h ? w : h;
side = 0.5 * side;

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


window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    canvas.width = side;
    canvas.height = side;
}



/**------------------------
 ---------------*/

var _canvasProps = {width: 300, height: 300};
var _options = {spacing: 1, numCircles: 1000, minSize: 3, maxSize: 7, higherAccuracy: false};
var _placedCirclesArr = [];

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

var _placeCircles = function (imgData) {
    var i = _circles.length;
    _placedCirclesArr = [];
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
    // for (var j = 0; j < 300; j++) {
    //     var circle = {
    //         color: _colors[Math.round(Math.random() * _colors.length)],
    //         size: 3 //do random twice to prefer more smaller ones
    //     };
    //     circles.push(circle);
    // }

    // for (var j = 0; j < 50; j++) {
    //     var circle = {
    //         color: _colors[Math.round(Math.random() * _colors.length)],
    //         size: 5 //do random twice to prefer more smaller ones
    //     };
    //     circles.push(circle);
    // }

    for (var j = 0; j < 50; j++) {
        var circle = {
            color: _colors[Math.round(Math.random() * _colors.length)],
            size: 10 //do random twice to prefer more smaller ones
        };
        circles.push(circle);
    }

    circles.sort(function (a, b) {
        return a.size - b.size;
    });
    return circles;
};

//
// click_handler = function (e) {
//     var mouse =
//     var id = contain(mouse.x, mouse.y,);
//     if(id >= 0 ){
//         console.log(i);
//         // _placedCirclesArr[i].color = "green";
//     }
//
//
// };


var _drawCircles = function (ctx) {
    ctx.save();
    $.each(_circles, function (i, circle) {
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill()
    });

    ctx.restore();
    // ctx.addEventListener("click", click_handler(event) , false)


};

var _drawSvg = function (ctx, path, callback) {
    var img = new Image(ctx);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        callback();
    };
    img.src = path;
};


var contain = function (mx, my) {
    console.log("mouse x: " + mx + " mouse y: " + my);

    for (var i = 0; i < _placedCirclesArr.length; i++) {
        console.log("x: " + _placedCirclesArr[i].x + " y: " + _placedCirclesArr[i].y + " r: " + _placedCirclesArr[i].size);
        let dx = Math.abs(_placedCirclesArr[i].x - mx);
        let dy = Math.abs(_placedCirclesArr[i].y - my);
        let r = _placedCirclesArr[i].size;
        if (dx ** 2 + dy ** 2 <= r ** 2) {
            return i;
        }
    }
    return -1;
};


var _colors = ['#993300'];//, '#a5c916', '#00AA66', '#FF9900'];
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
    this.selection = null;
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


    function replaceCircle(id) {
        // var ctx = document.getElementById("canvas2");
        var ctx = canvas.getContext("2d");
        console.log(ctx);
        _placedCirclesArr[id].color = "green";
        var circle = _placedCirclesArr[id];
        console.log(circle);


        ctx.strokeStyle = "rgb(248,170,145)";
        ctx.fillStyle = circle.color;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();


    }


    canvas.addEventListener('click', function (e) {
        console.log("cliecked");
        var mouse = myState.getMouse(e);
        var id = contain(mouse.x, mouse.y);
        if (id >= 0) {
            replaceCircle(id);
        }
    }, true);
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


function initPlate() {

    var s = new CanvasState(document.getElementById("canvas2"));
}


$(document).ready(function () {
    var $canvas = $('<canvas>').attr(_canvasProps).appendTo('main');
    $canvas.attr({"id": "canvas1"});
    var $canvas2 = $('<canvas>').attr(_canvasProps).appendTo('main');
    $canvas2.attr({"id": "canvas2"});
    var ctx = $canvas[0].getContext('2d');
    _drawSvg(ctx, 'note.svg', function () {
        var imgData = ctx.getImageData(0, 0, _canvasProps.width, _canvasProps.height);
        _placeCircles(imgData);
        _drawCircles($canvas2[0].getContext('2d'));
    });
    initPlate();


});

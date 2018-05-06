// range bars:

$(document).ready(function () {
    init();
});

function init() {
    // Init slider 1
    var slider = document.getElementById('slider');
    var classes = ['c-18deg-color', 'c-20deg-color', 'c-22deg-color', 'c-24deg-color', 'c-26deg-color'];

    noUiSlider.create(slider, {
        start: [20, 80],
        connect: [true, true, false],
        range: {
            'min': [0],
            'max': [100]
        }
    });

    var connect = slider.querySelectorAll('.noUi-connect');

    for (var i = 0; i < connect.length; i++) {
        connect[i].classList.add(classes[i]);
    }

    // Init slider 2
    var slider2 = document.getElementById('slider2');
    slider2.setAttribute("class", "center");

    var classes2 = ['c-18deg-color', 'c-20deg-color', 'c-22deg-color', 'c-24deg-color', 'c-26deg-color'];

    noUiSlider.create(slider2, {
        start: [20, 40, 60, 80],
        connect: [true, true, true, true, true],
        range: {
            'min': [0],
            'max': [100]
        }

    });

    var connect2 = slider2.querySelectorAll('.noUi-connect');

    for (var i = 0; i < connect2.length; i++) {
        connect2[i].classList.add(classes2[i]);
    }

    // Init tabs
    $('.tabs').tabs();
}


// canvas control:

var w = window.innerWidth;
var h = window.innerHeight;
var side = w < h ? w : h;
side = 0.8 * side;

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


// By Simon Sarris
// www.simonsarris.com
// sarris@acm.org
//
// Last update December 2011
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// Constructor for Shape objects to hold data for all drawn objects.
// For now they will just be defined as rectangles.
function Shape(x, y, w, h, fill) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || "rgb(255,125,131)";
}

// Draws this shape to a given context
Shape.prototype.draw = function (ctx) {

//             ctx.lineWidth = 3;
//
//             ctx.beginPath();
//             ctx.arc(event.clientX, event.clientY, 10, 0, 2 * Math.PI);
//             ctx.fill();
//             ctx.stroke();
    ctx.strokeStyle = "rgb(248,170,145)";
    ctx.fillStyle = this.fill;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // ctx.fillRect(this.x, this.y, this.w, 2 * Math.PI);
}

// Determine if a point is inside the shape's bounds
Shape.prototype.contains = function (mx, my) {

    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
    return 10 >= Math.abs(mx - this.x) && 10 >= Math.abs(my - this.y);
}

function drawEven(canvas, anchors, noodleRatio){
    // center x,y = center of canvas
    center_x = canvas.width

    // radius = random with geometric distribution (


    // first_deg = random deg (0,359)


}

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
    // Up, down, and move are for dragging
    // canvas.addEventListener('mousedown', function (e) {
    //     var mouse = myState.getMouse(e);
    //     var mx = mouse.x;
    //     var my = mouse.y;
    //     var shapes = myState.shapes;
    //     var l = shapes.length;
    //     for (var i = l - 1; i >= 0; i--) {
    //         if (!shapes[i].contains(mx, my)) {
    //             var mySel = shapes[i];
    //             // Keep track of where in the object we clicked
    //             // so we can move it smoothly (see mousemove)
    //             myState.dragoffx = mx - mySel.x;
    //             myState.dragoffy = my - mySel.y;
    //             myState.dragging = true;
    //             myState.selection = mySel;
    //             myState.valid = false;
    //             return;
    //         }
    //
    //     }
    //     // havent returned means we have failed to select anything.
    //     // If there was an object selected, we deselect it
    //     if (myState.selection) {
    //         myState.selection = null;
    //         myState.valid = false; // Need to clear the old selection border
    //     }
    // }, true);
    // canvas.addEventListener('mousemove', function (e) {
    //     if (myState.dragging) {
    //         var mouse = myState.getMouse(e);
    //         // We don't want to drag the object by its top-left corner, we want to drag it
    //         // from where we clicked. Thats why we saved the offset and use it here
    //         myState.selection.x = mouse.x - myState.dragoffx;
    //         myState.selection.y = mouse.y - myState.dragoffy;
    //         myState.valid = false; // Something's dragging so we must redraw
    //     }
    // }, true);
    // canvas.addEventListener('mouseup', function (e) {
    //     myState.dragging = false;
    // }, true);
    // double click for making new shapes
    canvas.addEventListener('click', function (e) {
        console.log("cliecked");
        var mouse = myState.getMouse(e);
        myState.addShape(new Shape(mouse.x, mouse.y, 20, 20, '#CC0000'));
    }, true);

    // **** Options! ****

    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function () {
        myState.draw();
    }, myState.interval);
}

CanvasState.prototype.addShape = function (shape) {
    this.shapes.push(shape);
    this.valid = false;
}

CanvasState.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function () {
    // if our state is invalid, redraw and validate!
    if (!this.valid) {
        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();

        // ** Add stuff you want drawn in the background all the time here **

        // draw all shapes
        var l = shapes.length;
        for (var i = 0; i < l; i++) {
            var shape = shapes[i];
            // We can skip the drawing of elements that have moved off the screen:
            if (shape.x > this.width || shape.y > this.height ||
                shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
            shapes[i].draw(ctx);
        }

        // draw selection
        // right now this is just a stroke along the edge of the selected Shape
        if (this.selection != null) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            var mySel = this.selection;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }

        // ** Add stuff you want drawn on top all the time here **

        this.valid = true;
    }
}


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
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

// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
initPlate();

function initPlate() {

    var s = new CanvasState(document.getElementById("myCanvas"));
    s.addShape(new Shape(40, 40, 50, 50)); // The default is gray
    s.addShape(new Shape(60, 140, 40, 60));
// Lets make some partially transparent

}

// function draw(evt) {
//     var pos = getMousePos(canvas, evt);
//
//     context.fillStyle = "#000000";
//     context.fillRect (pos.x, pos.y, 4, 4);
// }


/**------------------------*/

// ===========================
// ancillary geometric classes
// ===========================
var Point = function (x, y)
{
    this.x = x;
    this.y = y;
}

Point.prototype = {
    dist: function (p) { return this.vect(p).norm(); },
    vect: function (p) { return new Point (p.x-this.x, p.y-this.y); },
    norm: function (p) { return Math.sqrt (this.x*this.x+this.y*this.y);},
    add : function (v) { return new Point (this.x + v.x, this.y + v.y);},
    mult: function (a) { return new Point (this.x * a, this.y * a);}
};
var Circle = function (radius, center)
{
    this.r = radius;
    this.c = center;
};

Circle.prototype = {
    surface:  function () { return Math.PI * this.r * this.r; },
    distance: function (circle) { return this.c.dist(circle.c) - this.r - circle.r; }
};


// =========================
// circle packer lives here!
// =========================
var Packer = function (circles, ratio)
{
    this.circles = circles;
    this.ratio   = ratio || 1;
    this.list = this.solve();
}

Packer.prototype = {
    // try to fit all circles into a rectangle of a given surface
    compute: function (surface)
    {
        // check if a circle is inside our rectangle
        function in_rect (radius, center)
        {
            if (center.x - radius < - w/2) return false;
            if (center.x + radius >   w/2) return false;
            if (center.y - radius < - h/2) return false;
            if (center.y + radius >   h/2) return false;
            return true;
        }

        // approximate a segment with an "infinite" radius circle
        function bounding_circle (x0, y0, x1, y1)
        {
            var xm = Math.abs ((x1-x0)*w);
            var ym = Math.abs ((y1-y0)*h);
            var m = xm > ym ? xm : ym;
            var theta = Math.asin(m/4/bounding_r);
            var r = bounding_r * Math.cos (theta);
            return new Circle (bounding_r,
                new Point (r*(y0-y1)/2+(x0+x1)*w/4,
                    r*(x1-x0)/2+(y0+y1)*h/4));
        }

        // return the corner placements for two circles
        function corner (radius, c1, c2)
        {
            var u = c1.c.vect(c2.c); // c1 to c2 vector
            var A = u.norm();
            if (A == 0) return [] // same centers
            u = u.mult(1/A); // c1 to c2 unary vector
            // compute c1 and c2 intersection coordinates in (u,v) base
            var B = c1.r+radius;
            var C = c2.r+radius;
            if (A > (B + C)) return []; // too far apart
            var x = (A + (B*B-C*C)/A)/2;
            var y = Math.sqrt (B*B - x*x);
            var base = c1.c.add (u.mult(x));

            var res = [];
            var p1 = new Point (base.x -u.y * y, base.y + u.x * y);
            var p2 = new Point (base.x +u.y * y, base.y - u.x * y);
            if (in_rect(radius, p1)) res.push(new Circle (radius, p1));
            if (in_rect(radius, p2)) res.push(new Circle (radius, p2));
            return res;
        }

        /////////////////////////////////////////////////////////////////

        // deduce starting dimensions from surface
        var bounding_r = Math.sqrt(surface) * 100; // "infinite" radius
        var w = this.w = Math.sqrt (surface * this.ratio);
        var h = this.h = this.w/this.ratio;

        // place our bounding circles
        var placed=[
            bounding_circle ( 1,  1,  1, -1),
            bounding_circle ( 1, -1, -1, -1),
            bounding_circle (-1, -1, -1,  1),
            bounding_circle (-1,  1,  1,  1)];

        // Initialize our rectangles list
        var unplaced = this.circles.slice(0); // clones the array
        while (unplaced.length > 0)
        {
            // compute all possible placements of the unplaced circles
            var lambda = {};
            var circle = {};
            for (var i = 0 ; i != unplaced.length ; i++)
            {
                var lambda_min = 1e10;
                lambda[i] = -1e10;
                // match current circle against all possible pairs of placed circles
                for (var j = 0   ; j < placed.length ; j++)
                    for (var k = j+1 ; k < placed.length ; k++)
                    {
                        // find corner placement
                        if (k > 3) {
                            zog=1;
                        }
                        var corners = corner (unplaced[i], placed[j], placed[k]);

                        // check each placement
                        for (var c = 0 ; c != corners.length ; c++)
                        {
                            // check for overlap and compute min distance
                            var d_min = 1e10;
                            for (var l = 0 ; l != placed.length ; l++)
                            {
                                // skip the two circles used for the placement
                                if (l==j || l==k) continue;

                                // compute distance from current circle
                                var d = placed[l].distance (corners[c]);
                                if (d < 0) break; // circles overlap

                                if (d < d_min) d_min = d;
                            }
                            if (l == placed.length) // no overlap
                            {
                                if (d_min < lambda_min)
                                {
                                    lambda_min = d_min;
                                    lambda[i] = 1- d_min/unplaced[i];
                                    circle[i] = corners[c];
                                }
                            }
                        }
                    }
            }

            // select the circle with maximal gain
            var lambda_max = -1e10;
            var i_max = -1;
            for (var i = 0 ; i != unplaced.length ; i++)
            {
                if (lambda[i] > lambda_max)
                {
                    lambda_max = lambda[i];
                    i_max = i;
                }
            }

            // failure if no circle fits
            if (i_max == -1) break;

            // place the selected circle
            unplaced.splice(i_max,1);
            placed.push (circle[i_max]);
        }

        // return all placed circles except the four bounding circles
        this.tmp_bounds = placed.splice (0, 4);
        return placed;
    },

    // find the smallest rectangle to fit all circles
    solve: function ()
    {
        // compute total surface of the circles
        var surface = 0;
        for (var i = 0 ; i != this.circles.length ; i++)
        {
            surface += Math.PI * Math.pow(this.circles[i],2);
        }

        // set a suitable precision
        var limit = surface/1000;

        var step = surface/2;
        var res = [];
        while (step > limit)
        {
            var placement = this.compute.call (this, surface);
            console.log ("placed",placement.length,"out of",this.circles.length,"for surface", surface);
            if (placement.length != this.circles.length)
            {
                surface += step;
            }
            else
            {
                res = placement;
                this.bounds = this.tmp_bounds;
                surface -= step;
            }
            step /= 2;
        }
        return res;
    }
};

// ====
// demo
// ====
function draw_result (packer)
{
    function draw_circle (circle)
    {
        ctx.beginPath();
        ctx.arc ((circle.c.x+dx)*zoom+mx, (circle.c.y+dy)*zoom+my, circle.r*zoom, 0, 2*Math.PI);
        ctx.closePath();
        // ctx.fill();
        ctx.stroke();
    }

    var canvas = document.getElementById ('canvas');
    var ctx = canvas.getContext("2d");
    canvas.width +=0; // clear canvas
    var margin_factor = 0.1;

    var mx = canvas.width * margin_factor / 2;
    var my = canvas.height* margin_factor / 2;
    var dx = packer.w/2;
    var dy = packer.h/2;
    var zx = canvas.width  * (1-margin_factor) / packer.w;
    var zy = canvas.height * (1-margin_factor) / packer.h;
    var zoom = zx < zy ? zx : zy;

    // draw all circles
    ctx.strokeStyle = 'black';
    ctx.fillStyle = "black";
    for (var i = 0 ; i != packer.list.length ; i++)
        draw_circle (packer.list[i]);

    // draw bounding circles
    ctx.strokeStyle = 'red';
    for (var i = 0 ; i != packer.bounds.length ; i++)
        draw_circle (packer.bounds[i]);

    // draw rectangle
    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    ctx.rect((-packer.w/2+dx)*zoom+mx, (-packer.h/2+dy)*zoom+my, packer.w*zoom, packer.h*zoom);
    ctx.closePath();
    ctx.stroke();
}

function draw ()
{
    var circles = parseInt  (document.getElementById('c').value);
    var ratio   = parseFloat(document.getElementById('r').value);
    var min_r   = parseInt  (document.getElementById('a').value);
    var max_r   = parseInt  (document.getElementById('b').value);
    var radiuses = [];
    for (var i = 0 ; i != circles ; i++)
        radiuses.push (Math.random() * (max_r-min_r) + min_r);
    var packer = new Packer (radiuses, ratio);
    draw_result(packer);
}

window.onload = draw;

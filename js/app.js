$(document).ready(function(){
    init();
});

function init() {
    // Init slider 1
    var slider = document.getElementById('slider');
    var classes = ['c-18deg-color', 'c-22deg-color', 'c-24deg-color', 'c-20deg-color', 'c-22deg-color'];

    noUiSlider.create(slider, {
        start: [ 20, 80],
        connect: [true, true, false],
        range: {
            'min': [ 0 ],
            'max': [ 100 ]
        }
    });

    var connect = slider.querySelectorAll('.noUi-connect');

    for ( var i = 0; i < connect.length; i++ ) {
        connect[i].classList.add(classes[i]);
    }

    // Init slider 2
    var slider2 = document.getElementById('slider2');
    var classes2 = ['c-18deg-color', 'c-22deg-color', 'c-24deg-color', 'c-20deg-color', 'c-22deg-color'];

    noUiSlider.create(slider2, {
        start: [ 20, 40, 60, 80],
        connect: [true, true, true, true, true],
        range: {
            'min': [ 0 ],
            'max': [ 100 ]
        }
    });

    var connect2 = slider2.querySelectorAll('.noUi-connect');

    for ( var i = 0; i < connect2.length; i++ ) {
        connect2[i].classList.add(classes2[i]);
    }

    // Init tabs
    $('.tabs').tabs();
}
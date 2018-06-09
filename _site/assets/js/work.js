$(document).on('ready', function () {

    "use strict";

    var win = $(window);

    // work section
    var mixerContainer = $('#work #change'),
        // portfolio (MIXITUP)
        mixer = mixitup(mixerContainer, {
            selectors: {
                control: '#work ul > li'
            }
        });

    $('#work ul li').on('click', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });


});

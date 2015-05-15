/* global utils, nav, viewport */

(function (doc) {
    'use strict';

    utils.react(doc.body, 'click', utils.externalLinks);
    utils.navSidebar();
    utils.stickyNav();

    // fire all functions on resize event here
    viewport.startResize(function () {
        // if (viewport.getType !== 'handheld') {
        //     if ( doc.getElementById('nav-main') && doc.getElementById('menu') ) {
        //         nav.hide();
        //     }
        // }
    });
}(document));
/* global document, location */

/**
 * Note:
 * This is purely for prototyping. A better solution to add state to the nav
 * would be with a server-side language.
 */
(function (doc) {
    'use strict';

    var nav, nav_items, len, pathname;

    if ( ! doc.getElementById('nav-main') ) {
        return;
    }

    nav = doc.getElementById('nav-main');
    nav_items = nav.getElementsByTagName('a');
    len = nav_items.length;

    while (len--) {
        pathname = nav_items[len].href.replace(location.origin, '');

        if (pathname === location.pathname) {
            nav_items[len].parentNode.classList.add('here');
        }
    }
}(document));
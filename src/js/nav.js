/* global document */
var nav = (function (doc, nav_id, menu_id) {
    'use strict';

    var nav, menu, body;

    if (!doc.getElementById(nav_id) || !doc.getElementById(menu_id)) {
        return;
    }

    nav  = doc.getElementById(nav_id);
    menu = doc.getElementById(menu_id);
    body = doc.body;

    menu.setAttribute('data-is-expanded', 'false');

    function toggleMenu(e) {
        e.preventDefault();

        if (menu.getAttribute('data-is-expanded') === 'false') {
            show();
        } else {
            hide();
        }
    }

    function show() {
        menu.setAttribute('data-is-expanded', 'true');
        nav.classList.add('expanded');
        body.style.paddingTop = nav.clientHeight + 'px';
    }

    function hide() {
        menu.setAttribute('data-is-expanded', 'false');
        nav.classList.remove('expanded');
        body.style.paddingTop = 0;
    }

    menu.addEventListener('click', toggleMenu, false);

    return {
        show: function () {
            show();
        },

        hide: function () {
            hide();
        }
    };
}(document, 'nav-main', 'menu'));
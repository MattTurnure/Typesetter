/* global Velocity, viewport */

var utils = (function (global, doc) {
    'use strict';

    return {
        react: function (node, action, func) {
            var behavior = action || 'click',
                fun      = func || function () {};

            if (typeof addEventListener === 'function') {
                node.addEventListener(behavior, fun, false);
            }
        },

        externalLinks: function (e) {
            if (e.target.rel === 'external') {
                e.preventDefault();
                open(e.target.href);
                return false;
            }

            return;
        },

        scrollToSection: function (id, cb) {
            var section;

            if (typeof Velocity !== 'function') {
                return;
            }

            section = doc.getElementById(id);

            Velocity.animate(section, 'scroll', {
                duration: 1500,
                easing: 'spring'
            });

            if (typeof cb === 'function') {
                cb(section);
            }
        },

        navSidebar: function () {
            var self = this, nav, items, str, id;

            if ( ! doc.getElementById('nav-sidebar') || typeof addEventListener !== 'function' ) {
                return;
            }

            nav = doc.getElementById('nav-sidebar');
            items = nav.getElementsByTagName('li');

            function removeHere() {
                var i = items.length;

                while (i--) {
                    items[i].classList.remove('here');
                }
            }

            nav.addEventListener('click', function (e) {
                if (e.target.nodeName === 'A') {
                    str = e.target.href;
                    id = str.split('#')[1];
                    self.scrollToSection(id, function () {
                        removeHere();
                        e.target.parentNode.classList.add('here');
                    });
                }
            }, false);
        },

        stickyNav: function () {
            var nav, body, pos;

            if ( ! doc.getElementById('nav-sidebar') || typeof addEventListener !== 'function' ) {
                return;
            }

            body = doc.body;
            nav = doc.getElementById('nav-sidebar');

            function getYPos(el) {
                var y = 0;

                while (el) {
                    y += (el.offsetTop - el.scrollTop + el.clientTop);
                    el = el.offsetParent;
                }
                return y;
            }

            pos = getYPos(nav);

            function dothething() {
                if (body.scrollTop >= pos) {
                    nav.classList.add('nav-fixed');
                } else {
                    nav.classList.remove('nav-fixed');
                }
            }

            window.addEventListener('scroll', dothething, false);
        }
    };
}(window, document));
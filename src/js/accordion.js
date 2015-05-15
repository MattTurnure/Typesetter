(function (global, doc) {
    'use strict';

    if (!doc.getElementsByClassName('accordion-group')) {
        return;
    }

    var controllers = doc.getElementsByClassName('accordion-controller'),
        clen        = controllers.length;

    makeIcons();

    while (clen--) {
        controllers[clen].setAttribute('data-expanded', 'false');
        registerAccordionControllers(controllers[clen]);
    }

    function registerAccordionControllers(obj) {
        var target = obj.parentNode.querySelector('.accordion-target');
        var icon;

        icon = obj.querySelector('.icon');

        obj.addEventListener('click', function () {
            toggle(this, target, icon);
        }, false); //expanded
    }

    function toggle(obj, target, icon) {
        if (obj.getAttribute('data-expanded') === 'false') {
            show.call(obj, target, icon);
        } else {
            hide.call(obj, target, icon);
        }
    }

    function show() {
        this.setAttribute('data-expanded', 'true');
        arguments[0].classList.add('expanded');
        arguments[1].classList.add('icon-expand-less');
        arguments[1].classList.remove('icon-expand-more');
    }

    function hide() {
        this.setAttribute('data-expanded', 'false');
        arguments[0].classList.remove('expanded');
        arguments[1].classList.remove('icon-expand-less');
        arguments[1].classList.add('icon-expand-more');
    }

    function makeIcons() {
        var i    = controllers.length,
            icon = doc.createElement('i');

        icon.className = 'icon-expand-more icon';

        while (i--) {
            controllers[i].appendChild(icon.cloneNode(true));
        }
    }
}(window, document));
var accordionTable = (function (global, doc) {
    'use strict';

    var child_rows = doc.getElementsByClassName('child-row'),
        tables     = doc.getElementsByTagName('table');

    function toggle() {
        if (this.parentNode.getAttribute('data-expanded') === 'false') {
            showHide(this, 'show');
        } else {
            showHide(this, 'hide');
        }
    }

    function showHide(obj, dir) {
        var icon = obj.querySelector('.icon'),
            id   = obj.parentNode.getAttribute('data-id'),
            c    = child_rows.length;

        // handle controller state
        if (dir === 'show') {
            icon.classList.remove('ss-navigatedown');
            icon.classList.add('ss-navigateup');
            obj.parentNode.setAttribute('data-expanded', 'true');
        } else {
            icon.classList.remove('ss-navigateup');
            icon.classList.add('ss-navigatedown');
            obj.parentNode.setAttribute('data-expanded', 'false');
        }

        // show/hide child rows
        while (c--) {
            if (child_rows[c].getAttribute('data-id') === id) {
                if (dir === 'show') {
                    child_rows[c].classList.add('expanded');
                } else {
                    child_rows[c].classList.remove('expanded');
                }
            }
        }
    }

    // Assign events that bind child rows to their respective parent rows
    function addEvents() {
        var tlen = tables.length,
            t    = 0,
            icon = doc.createElement('i'),
            parent_rows, id, plen, p, expand_controller;

        icon.className = 'ss-navigatedown icon';

        // loop through tables
        for (; t < tlen; t++) {
            parent_rows = tables[t].getElementsByClassName('parent-row');
            plen        = parent_rows.length;
            p           = 0;

            // loop through controllers
            for (; p < plen; p++) {
                // add icon
                expand_controller = parent_rows[p].querySelector('.expand-controller');
                expand_controller.appendChild(icon.cloneNode(true));

                // add data-expanded to parent of controller
                expand_controller.parentNode.setAttribute('data-expanded', 'false');

                // add event
                expand_controller.addEventListener('click', function () {
                    toggle.call(this); // call method binds this to the toggle function
                }, false);
            }
        }
    }

    return addEvents();

}(window, document));
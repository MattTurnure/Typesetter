/* global document */

(function (doc) {
    'use strict';

    var hasLines   = true,
        body       = doc.body,
        controls   = doc.createElement('button'),
        controlTxt = doc.createTextNode('Hide Lines');

    controls.className = 'toggle-lines';
    controls.appendChild(controlTxt);
    body.appendChild(controls);

    controls.addEventListener('click', toggle, false);

    function toggle() {
        if (hasLines) {
            hide();
        } else {
            show();
        }
    }

    function show() {
        hasLines = true;
        body.classList.remove('hide-lines');
        controls.innerHTML = 'Hide Lines';
    }

    function hide() {
        hasLines = false;
        body.classList.add('hide-lines');
        controls.innerHTML = 'Show Lines';
    }
}(document));

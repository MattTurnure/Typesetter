/* global document */

(function (doc) {
    'use strict';

    var controlPanel, main_controls, cp_toggle_btn, expanded;

    if ( ! doc.getElementById('control-panel') ) {
        return;
    }

    controlPanel  = {};
    main_controls = doc.getElementById('control-panel');
    cp_toggle_btn = doc.getElementById('cp-toggle');
    expanded      = false;

    controlPanel.toggle = function () {
        if (expanded === false) {
            expanded = true;
            controlPanel.show();
        } else {
            expanded = false;
            controlPanel.hide();
        }
    };

    controlPanel.show = function () {
        expanded = true;
        main_controls.classList.remove('js-dash-init');
    };

    controlPanel.hide = function () {
        expanded = false;
        main_controls.classList.add('js-dash-init');
    };

    cp_toggle_btn.addEventListener('click', controlPanel.toggle, false);

    // open control panel
    setTimeout(controlPanel.show, 500);
}(document));
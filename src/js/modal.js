(function (doc) {
    'use strict';

    var triggers = doc.getElementsByTagName('a'),
        tlen = triggers.length;

    while (tlen--) {
        if (triggers[tlen].getAttribute('data-modal-id')) {
            registerTrigger.call(triggers[tlen]);
        }
    }

    function makeOverlayButton() {
        var button = doc.createElement('span');

        button.className = 'ss-delete overlay-btn-close';

        return button;
    }

    function makeOverlay(obj, cb) {
        var frag              = doc.createDocumentFragment(),
            overlay           = doc.createElement('div'),
            content_container = overlay.cloneNode(true),
            id                = obj.getAttribute('data-modal-id'),
            content_obj       = doc.getElementById(id),
            button            = makeOverlayButton();

        overlay.className           = 'overlay';
        overlay.id                  = 'overlay-' + id;
        content_container.className = 'overlay-group';

        frag.appendChild(overlay);
        overlay.appendChild(button);
        content_container.innerHTML = content_obj.innerHTML;
        overlay.appendChild(content_container);
        doc.body.appendChild(frag);

        content_obj.parentNode.removeChild(content_obj);
        cb(overlay, button);
    }

    function registerTrigger() {
        var self = this;

        makeOverlay(this, function (overlay, button) {
            self.addEventListener('click', showOverlay, false);
            button.addEventListener('click', function () {
                hideOverlay(overlay);
            }, false);
        });
    }

    function showOverlay() {
        var id = this.getAttribute('data-modal-id'),
            target = doc.getElementById(id),
            overlay = doc.getElementById('overlay-' + id);

        event.preventDefault();
        overlay.classList.add('expanded');
    }

    function hideOverlay(overlay_obj) {
        overlay_obj.classList.remove('expanded');
    }
}(document));
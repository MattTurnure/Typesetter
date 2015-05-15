/* global document */
(function (doc) {
    'use strict';

    if (typeof addEventListener !== 'function' || typeof doc.body.classList !== 'object') {
        return;
    }

    var forms = doc.forms,
        flen  = forms.length,
        success_icon_classname = 'ss-check success-icon',
        error_icon_classname = 'ss-delete error-icon',
        rules = {
            required: /\S/,
            email: /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/,
            telephone: /^(\+\d+)?( |\-)?(\(?\d+\)?)?( |\-)?(\d+( |\-)?)*\d+$/,
            zip: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/i,

            dropdown: function (val) {
                'use strict';
                if ( val === 0 || val === '-1' || val === '0' || val === 'Select One' || val === 'Select Description') {
                    return false;
                } else {
                    return true;
                }
            },

            checkbox: function (val) {
                'use strict';
                if (val === false) {
                    return false;
                } else {
                    return true;
                }
            }
        }, errors = {
            required: 'Required field',
            email: 'Invalid email address',
            telephone: 'Invalid telephone number',
            zip: 'Invalid ZIP code',
            dropdown: 'Must select one',
            checkbox: 'Must agree to register'
        };

    while (flen--) {
        if (forms[flen].getAttribute('data-validate') === 'true') {
            register(forms[flen]);
        }
    }

    function register(form) {
        var field_ary = getRequiredFieldArray(form),
            len       = field_ary.length,
            i         = 0;

        for (; i < len; i++) {
            setSingleValidationTimer(field_ary[i]);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            checkFields(field_ary, function (result) {
                if (result === true) {
                    form.submit();
                }
            });
        }, false);
    }

    function setSingleValidationTimer(input_obj) {
        input_obj.addEventListener('blur', function () {
            checkThisField(input_obj);
        }, false);
    }

    function getRequiredFieldArray(form) {
        var fields       = form.elements,
            len          = fields.length,
            i            = 0,
            required_ary = [];

        for (i = 0; i < len; i++) {
            if (fields[i].getAttribute('data-rule') !== null) {
                required_ary.push(fields[i]);
            }
        }

        return required_ary;
    }

    function checkFields(field_ary, callback) {
        var len = field_ary.length,
            i = 0,
            input_obj,
            input_type,
            input_val,
            error_type,
            error_message,
            regex;

        if (typeof callback !== 'function') {
            return;
        }

        for (i = 0; i < len; i++) {
            input_obj     = field_ary[i];
            input_type    = input_obj.type.toLowerCase();
            error_type    = input_obj.getAttribute('data-rule');
            error_message = getValidationMessage(error_type);
            regex         = getValidationRegex(error_type);

            if (input_type === 'select-one') {
                input_val = input_obj.options[input_obj.selectedIndex].value;

                if (rules.dropdown(input_val) === false) {
                    addErrorClasses(input_obj);
                    setErrorMessage(input_obj, error_message);

                    input_obj.focus();

                    callback(false);
                    return;
                } else {
                    addSuccessClasses(input_obj);
                }
            } else if (input_type === 'checkbox') {
                input_val = input_obj.checked;

                if (rules.checkbox(input_val) === false) {
                    addErrorClasses(input_obj);
                    setErrorMessage(input_obj, error_message);

                    input_obj.focus();
                    callback(false);
                    return;
                } else {
                    addSuccessClasses(input_obj);
                }
            } else {
                input_val = input_obj.value;

                if (regex.test(input_val) === false) {
                    removeSuccessIcon(input_obj);
                    addErrorIcon(input_obj);
                    addErrorClasses(input_obj);
                    setErrorMessage(input_obj, error_message);

                    input_obj.focus();
                    input_obj.select();

                    callback(false);
                    return;
                } else {
                    addSuccessClasses(input_obj);
                    addSuccessIcon(input_obj);
                }
            }
        }

        callback(true);
    }

    function getValidationMessage(error_type) {
        var message;

        switch (error_type) {
            case 'required':
                message = errors.required;
                break;
            case 'email':
                message = errors.email;
                break;
            case 'telephone':
                message = errors.telephone;
                break;
            case 'zip':
                message = errors.zip;
                break;
            case 'dropdown':
                message = errors.dropdown;
                break;
            case 'checkbox':
                message = errors.checkbox;
                break;
            default:
                message = errors.required;
        }

        return message;
    }

    function getValidationRegex(error_type) {
        var regex;

        switch (error_type) {
            case 'required':
                regex = rules.required;
                break;
            case 'email':
                regex = rules.email;
                break;
            case 'telephone':
                regex = rules.telephone;
                break;
            case 'zip':
                regex = rules.zip;
                break;
            case 'dropdown':
                regex = rules.dropdown;
                break;
            case 'checkbox':
                regex = rules.checkbox;
                break;
            default:
                regex = rules.required;
        }

        return regex;
    }

    function checkThisField(input_obj) {
        var input_type    = input_obj.type.toLowerCase(),
            error_type    = input_obj.getAttribute('data-rule'),
            error_message = getValidationMessage(error_type),
            regex         = getValidationRegex(error_type),
            input_val;

        if (input_type === 'select-one') {
            input_val = input_obj.options[input_obj.selectedIndex].value;

            if (rules.dropdown(input_val) === false) {
                addErrorClasses(input_obj);
                setErrorMessage(input_obj, error_message);
            } else {
                addSuccessClasses(input_obj);
            }
        } else if (input_type === 'checkbox') {
            input_val = input_obj.checked;

            if (rules.checkbox(input_val) === false) {
                addErrorClasses(input_obj);
                setErrorMessage(input_obj, error_message);
            } else {
                addSuccessClasses(input_obj);
            }
        } else {
            input_val = input_obj.value;

            if (regex.test(input_val) === false) {
                removeSuccessIcon(input_obj);
                addErrorIcon(input_obj);
                addErrorClasses(input_obj);
                setErrorMessage(input_obj, error_message);
            } else {
                addSuccessClasses(input_obj);
                addSuccessIcon(input_obj);
            }
        }
    }

    function setErrorMessage(input_obj, message) {
        var error_obj       = doc.createElement('p'),
            id              = input_obj.id + '-error-message',
            error_txt       = doc.createTextNode(message),
            input_container = input_obj.parentNode,
            field_type      = input_obj.type.toLowerCase();

        error_obj.className = 'error-inline';

        // Check to see if error already exists
        if (doc.getElementById(id) === null) {
            error_obj.setAttribute('id', id);
            error_obj.appendChild(error_txt);
            input_container.appendChild(error_obj);
        }

        switch (field_type) {
            case 'select-one':
                input_obj.addEventListener('change', function () {
                    removeErrorMessage(id);
                    removeErrorClasses(input_obj);
                    removeErrorIcon(input_obj);
                }, false);
                break;
            case 'checkbox':
                input_obj.addEventListener('click', function () {
                    removeErrorMessage(id);
                    removeErrorClasses(input_obj);
                    removeErrorIcon(input_obj);
                }, false);
                break;
            default:
                input_obj.addEventListener('keydown', function () {
                    removeErrorMessage(id);
                    removeErrorClasses(input_obj);
                    removeErrorIcon(input_obj);
                }, false);
                break;
        }
    }

    function removeErrorMessage(id) {
        var error_obj = document.getElementById(id);

        if (error_obj !== null) {
            error_obj.parentNode.removeChild(error_obj);
        }
    }

    function addSuccessClasses(input_obj) {
        input_obj.classList.remove('error-input');
        input_obj.classList.add('success-input');
    }

    function addErrorClasses(input_obj) {
        input_obj.classList.add('error-input');
        input_obj.classList.remove('success-input');
    }

    function removeErrorClasses(input_obj) {
        input_obj.classList.remove('error-input');
    }

    function addSuccessIcon(input_obj) {
        var icon_success_id = input_obj.id + '-success',
            icon_success;

        removeErrorIcon(input_obj);

        if (!doc.getElementById(icon_success_id)) {
            icon_success = doc.createElement('i');
            icon_success.setAttribute('id', icon_success_id);
            icon_success.className = success_icon_classname;
            input_obj.parentNode.appendChild(icon_success);
        }
    }

    function removeSuccessIcon(input_obj) {
        var success_id = input_obj.id + '-success',
            success_obj;

        if (doc.getElementById(success_id)) {
            success_obj = doc.getElementById(success_id);
            success_obj.parentNode.removeChild(success_obj);
        }
    }

    function addErrorIcon(input_obj) {
        var icon_error_id = input_obj.id + '-error',
            icon_error;

        if (!doc.getElementById(icon_error_id)) {
            icon_error = doc.createElement('i');
            icon_error.setAttribute('id', icon_error_id);
            icon_error.className = error_icon_classname;
            input_obj.parentNode.appendChild(icon_error);
        }
    }

    function removeErrorIcon(input_obj) {
        var error_id = input_obj.id + '-error',
            error_obj;

        if (doc.getElementById(error_id)) {
            error_obj = doc.getElementById(error_id);
            error_obj.parentNode.removeChild(error_obj);
        }
    }
}(document));
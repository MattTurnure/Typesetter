(function(win, doc) {
    var debug=true;
    'use strict';

    if(!doc.getElementsByClassName('spinnerForm')){
        return;

    }

    var spinnerForms = doc.getElementsByClassName('spinnerForm'),
        formLen = spinnerForms.length,
        spinnerLocation;

    while(formLen --){
        if(spinnerForms[formLen].getAttribute("data-target")){
            spinnerLocation = spinnerForms[formLen].getAttribute("data-target");

            addAjaxSpinner(spinnerForms[formLen], doc.getElementById(spinnerLocation));
        }
        else{
            addAjaxSpinner(spinnerForms[formLen]);
        }
    }
    function addAjaxSpinner(form, target){

        if(!target) {
            var div = doc.createElement("div"),
                span = doc.createElement("span"),
                spinner = div.cloneNode(true),
                target;
            div.className = "loading js-fade-out";
            span.innerHTML = "Loading";
            div.appendChild(span);
            spinner.className = "spinner";
            div.appendChild(spinner);
            target = div;
            form.appendChild(div);
        }
        assignToggleListener(form, target);

    }
    function assignToggleListener(form, target){

        form.addEventListener('submit',function(){
            if(debug){
                //simulate a 2 second submission.
                event.preventDefault();
                target.classList.toggle("js-fade-out");
                setTimeout(function(){
                    target.classList.toggle("js-fade-out");
                }, 2000);
            }
            else{
                target.classList.toggle("js-fade-out");
            }
        });
    }


}(window, document));
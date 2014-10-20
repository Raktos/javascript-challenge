"use strict";

document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signup');

    //populate the state select
    var stateSelect = signupForm.elements['state'];
    var i;
    for(i = 0; i < usStates.length; ++i) {
        var option = document.createElement('option');
        option.innerHTML = usStates[i].name;
        option.value = usStates[i].code;
        stateSelect.appendChild(option);
    }

    //show or hide the occupation other box upon selection of "other..."
    var occupationSelect = signupForm.elements['occupation'];
    document.addEventListener('change', function() {
        var occupationIsOther = occupationSelect.value == 'other';
        signupForm.elements['occupationOther'].style.display = occupationIsOther ?  'block' : 'none';
    });

    //confirms the user would like to
    var exitButton = document.getElementById('cancelButton');
    exitButton.addEventListener('click', function() {
        if(window.confirm('Do you really want to leave?')) {
            window.location = 'https://google.com';
        }
    });

    //stop form from submitting and ask for validation
    signupForm.addEventListener('submit', function() {
        if (signupForm.preventDefault) {
            signupForm.preventDefault();
        }
        signupForm.returnValue = false;
        return false;
    });
});
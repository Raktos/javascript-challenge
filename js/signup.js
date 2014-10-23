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
    document.addEventListener('change', function() {
        var occupationIsOther = signupForm.elements['occupation'].value == 'other';
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
    signupForm.addEventListener('submit', function(evt) {
        try {

        } catch(exception) {

        }

        if (evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = false;
        return false;
    });

    //perform form validation
    function formValidate(form) {
        var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
        var formValid = true;

        //validate general required fields
        for (i = 0; i < requiredFields.length; ++i) {
            formValid &= fieldValidate(form.elements[requiredFields[i]]);
        }

        //validate other field of occupation is "other..."
        if(form.elements['occupation'].value == 'other') {
            formValid &= fieldValidate(form.elements['occupationOther']);
        }

        //validate zip
        formValid &= zipValidate(form.elements['zip']);
    }

    //perform field validation
    function fieldValidate(field) {
        var value = field.value.trim();
        var valid = value.length > 0;

        validationFeedback(valid, field);

        return valid;
    }

    //perform zip validation
    function zipValidate(field) {
         var valid = new RegExp('^\\d{5}$').test(field.value);

        validationFeedback(valid, field);

        return valid;
    }

    function validationFeedback(valid, field) {
        if(valid) {
            field.className = 'form-control';
        } else {
            field.className = 'form-control invalid-field';
        }
    }

    //TODO function ageValidate()

    //TODO function displayError()
});
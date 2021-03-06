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

    //confirms the user would like to leave
    var exitButton = document.getElementById('cancelButton');
    exitButton.addEventListener('click', function() {
        if(window.confirm('Do you really want to leave?')) {
            window.location = 'https://google.com';
        }
    });

    //ask for validation, stop form from submitting if invalid
    signupForm.addEventListener('submit', function(evt) {
        evt.returnValue = formValidate(this);
        if (!evt.returnValue && evt.preventDefault) {
            evt.preventDefault();
        }
        return evt.returnValue;
    });

    //perform form validation
    function formValidate(form) {
        var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
        var formValid = true;

        //validate general required fields
        for (i = 0; i < requiredFields.length; ++i) {
            formValid &= fieldValidate(form.elements[requiredFields[i]]);
        }

        //validate other field if occupation is "other..."
        if(form.elements['occupation'].value == 'other') {
            formValid &= fieldValidate(form.elements['occupationOther']);
        }

        //validate zip
        formValid &= zipValidate(form.elements['zip']);

        //validate age
        try{
            formValid &= ageValidate(form.elements['birthdate']);
        } catch(exception) {
            formValid = false;
            ageError(exception);
        }
        return formValid;
    }

    //perform field validation for a general field
    function fieldValidate(field) {
        var value = field.value.trim();
        var valid = value.length > 0;

        validationFeedback(valid, field);

        return valid;
    }

    //perform zip validation
    function zipValidate(zip) {
         var valid = new RegExp('^\\d{5}$').test(zip.value);

        validationFeedback(valid, zip);

        return valid;
    }

    //update the field's display for valid or invalid input
    function validationFeedback(valid, field) {
        if(valid) {
            field.className = 'form-control';
        } else {
            field.className = 'form-control invalid-field';
        }
    }

    //validate age is over 13
    function ageValidate(dobField) {
        if(13 > moment().diff(dobField.value, 'years')) {
            throw new Error('You must be 13 or older to register');
        } else {
            ageError('');
        }
        return true;
    }

    //displays error when under 13
    function ageError(error) {
        var msgElem = document.getElementById('birthdateMessage');
        msgElem.innerHTML = error;
    }
});
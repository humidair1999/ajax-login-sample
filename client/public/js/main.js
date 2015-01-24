(function() {
    var $formInputs = {
        usernameInput: $('#username-input'),
        passwordInput: $('#password-input'),
        seedInput: $('#seed-input'),
        submitInput: $('#submit-input')
    };

    var formInputsArr = [   $formInputs.usernameInput,
                            $formInputs.passwordInput,
                            $formInputs.submitInput];

    var toggleFormInputs = function(inputs, isDisabled) {
        $.each(inputs, function(index, element) {
            var $element = $(element);

            $element.prop('disabled', isDisabled);

            if (!isDisabled && $element.is($formInputs.usernameInput)) {
                $element.focus();
            }
        });
    };

    var generatePasswordHash = function(enteredPassword, uniqueSeed) {
        console.log(enteredPassword);
        console.log(md5(enteredPassword));
        console.log(md5(enteredPassword, uniqueSeed));

        return md5(enteredPassword, uniqueSeed);
    };

    var activateLoginForm = function() {
        toggleFormInputs(formInputsArr, false);

        $('#user-login-form').on('submit', function(evt) {
            var uniqueSeed = $formInputs.seedInput.val();

            evt.preventDefault();

            toggleFormInputs(formInputsArr, true);

            $.ajax({
                url: 'http://localhost:3000/api/v1/sessions/45',
                type: 'put',
                data: {
                    username: $formInputs.usernameInput.val(),
                    hash: generatePasswordHash($formInputs.passwordInput.val(), uniqueSeed),
                    seed: uniqueSeed
                }
            }).done(function() {
                console.log('LOGGED IN');
            }).fail(function() {
                console.log('FAILED');
            }).always(function() {
                setTimeout(function() {
                    toggleFormInputs(formInputsArr, false);
                }, 500);
            });
        });
    };
    
    var retrieveUniqueSeed = function() {
        $.ajax({
            url: 'http://localhost:3000/api/v1/sessions/seed',
            type: 'get'
        }).done(function(data) {
            console.log(data);

            setTimeout(function() {
                $formInputs.seedInput.val(data.seed);

                activateLoginForm();
            }, 500);
        }).fail(function() {
            console.log('error');
        });
    };

    retrieveUniqueSeed();
})();
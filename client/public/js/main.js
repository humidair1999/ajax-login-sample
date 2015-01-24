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

    // generate a hashed variant of the plaintext password
    var generatePasswordHash = function(enteredPassword) {
        var hashedPassword = new jsSHA(enteredPassword, 'TEXT');

        console.log('password: ', enteredPassword);
        console.log('hash: ', hashedPassword.getHash('SHA-1', 'HEX'));
        
        return hashedPassword.getHash('SHA-1', 'HEX');
    };

    // generate an HMAC hashed variant of the hashed password
    var generatePasswordHMAC = function(enteredPassword, uniqueSeed) {
        var doubleHashedPassword = new jsSHA(generatePasswordHash(enteredPassword), 'TEXT');

        console.log('seed: ', uniqueSeed);
        console.log('hmac: ', doubleHashedPassword.getHMAC(uniqueSeed, 'TEXT', 'SHA-1', 'HEX'));
        
        return doubleHashedPassword.getHMAC(uniqueSeed, 'TEXT', 'SHA-1', 'HEX');
    };

    var activateLoginForm = function() {
        toggleFormInputs(formInputsArr, false);

        $('#user-login-form').on('submit', function(evt) {
            var uniqueSeed = $formInputs.seedInput.val();

            evt.preventDefault();

            toggleFormInputs(formInputsArr, true);

            $.ajax({
                url: 'http://localhost:3000/api/v1/sessions',
                type: 'post',
                data: {
                    username: $formInputs.usernameInput.val(),
                    hash: generatePasswordHMAC($formInputs.passwordInput.val(), uniqueSeed),
                    seed: uniqueSeed
                }
            }).done(function(data) {
                console.log(data);
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

    $('#new-user-form').on('submit', function(evt) {
        evt.preventDefault();

        $.ajax({
            url: 'http://localhost:3000/api/v1/sessions/seed',
            type: 'post',
            data: {
                username: $('#new-username-input').val(),
                hash: generatePasswordHash($('#new-password-input').val())
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    })

    retrieveUniqueSeed();
})();
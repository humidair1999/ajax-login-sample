(function() {
    var formInputs = [  $('#username-input'),
                        $('#password-input'),
                        $('#submit-input')];

    var toggleFormInputs = function(inputs, isDisabled) {
        $.each(inputs, function(index, element) {
            var $element = $(element);

            $element.prop('disabled', isDisabled);

            if (!isDisabled && $element.attr('id') === 'username-input') {
                $element.focus();
            }
        });
    };

    var activateLoginForm = function() {
        toggleFormInputs(formInputs, false);

        $('#user-login-form').on('submit', function(evt) {
            var serializedFormInput = $(this).serializeArray(),
                formData = {};

            evt.preventDefault();

            for (var i in serializedFormInput) {
                formData[serializedFormInput[i].name] = serializedFormInput[i].value;
            }

            console.log(formData);

            console.log(md5(formData.password));
        });
    };
    
    var retrieveUniqueSeed = function() {
        $.ajax({
            url: 'http://localhost:3000/api/v1/sessions/seed',
            type: 'get'
        }).done(function(data) {
            console.log(data);

            setTimeout(function() {
                activateLoginForm();

                $('#seed-input').val(data.seed);
            }, 500);
        }).fail(function() {
            console.log('error');
        });
    };

    retrieveUniqueSeed();
})();
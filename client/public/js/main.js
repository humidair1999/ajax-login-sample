(function() {
    $.ajax({
        url: 'http://localhost:3000/api/v1/sessions/seed',
        type: 'get'
    }).done(function(data) {
        console.log(data);

        $('#unique-seed').val(data.seed);
    }).fail(function() {
        console.log('error');
    });

    $('#user-login-form').on('submit', function(evt) {
        var serializedFormInput = $(this).serializeArray(),
            formData = {};

        evt.preventDefault();

        for (var i in serializedFormInput) {
            formData[serializedFormInput[i].name] = serializedFormInput[i].value;
        }

        console.log(formData);
    });
})();
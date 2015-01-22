$('#user-login-form').on('submit', function(evt) {
    var serializedFormInput = $(this).serializeArray(),
        formData = {};

    evt.preventDefault();

    for (var i in serializedFormInput) {
        formData[serializedFormInput[i].name] = serializedFormInput[i].value;
    }

    console.log(formData);
});
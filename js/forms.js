function setupFormValidation(){
    var validator = new FormValidator('example_form', [{
        name: 'req',
        display: 'required',
        rules: 'required'
    }, {
        name: 'alphanumeric',
        rules: 'alpha_numeric'
    }, {
        name: 'password',
        rules: 'required'
    }, {
        name: 'password_confirm',
        display: 'password confirmation',
        rules: 'required|matches[password]'
    }, {
        name: 'email',
        rules: 'valid_email',
        depends: function() {
            return Math.random() > .5;
        }
    }, {
        name: 'minlength',
        display: 'min length',
        rules: 'min_length[8]'
    }], function(errors, event) {
        if (errors.length > 0) {
            console.log(errors);
        }
    });
}
setupFormValidation();

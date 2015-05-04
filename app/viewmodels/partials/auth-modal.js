define(['plugins/dialog'], function(dialog) {
    var AuthModal = function() { };
    AuthModal.prototype.attached = function(view, parent) {
        this.$view = view;
    };
    AuthModal.prototype.submit = function(form) {
        var username = $('#username-auth-input', this.$view).val();
        var password = $('#password-auth-input', this.$view).val();
        dialog.close(this, { 
            username: username,
            password: password
        });
    };
    return AuthModal;
});

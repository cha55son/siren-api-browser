define(['jquery', 'plugins/dialog'], function($, dialog) {
    var ErrorModal = function() { };
    ErrorModal.prototype.activate = function(options) {
        this.options = $.extend({
            title: 'Error',
            message: 'Error',
            error: 'Error'
        }, options);
    };
    return ErrorModal;
});

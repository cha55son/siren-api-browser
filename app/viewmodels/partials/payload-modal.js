define(['jquery', 'plugins/dialog'], function($, dialog) {
    var PayloadModal = function() { };
    PayloadModal.prototype.activate = function(options) {
        this.options = $.extend({
            title: '',
            payload: ''
        }, options);
    };
    return PayloadModal;
});

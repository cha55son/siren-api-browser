define([
    'durandal/system', 
    'plugins/dialog', 
    'durandal/app', 
    'durandal/viewEngine', 
    'knockout',
    'jquery'
], function(system, dialog, app, viewEngine, ko, $) {
    dialog.addContext('bootstrapModal', {
        addHost: function(dialogInstance) {
            var body = $('body'),
                host = $('<div class="modal fade"></div>');
            dialogInstance.options = $.extend({ 
                backdrop: true, // 'static' to prevent a click from dismissing the modal
                keyboard: true,
                show: true
            }, dialogInstance.owner.options || { });
            host.appendTo(body);
            dialogInstance.host = host.get(0);
            dialogInstance.modalHost = host;
        },
        removeHost: function(dialogInstance) {
            dialogInstance.modalHost.modal('hide');
        },
        attached: function(view, parent, context) {
            var dialogInstance = dialog.getDialog(context.model);
            dialogInstance.modalHost.modal(dialogInstance.options)
                .on('shown.bs.modal', function(e) {
                   context.model.onShown && context.model.onShown(); 
                }).on('hidden.bs.modal', function(e) {
                    dialogInstance.close();
                    dialogInstance.modalHost.remove();
                });
        }
    });
    return { 
        install: function() {
            app.showBootstrapDialog = function(obj, activationData) {
                return dialog.show(obj, activationData, 'bootstrapModal');
            };
            dialog.showBootstrapDialog = function(obj, activationData) {
                return dialog.show(obj, activationData, 'bootstrapModal');
            };
        }
    };
});

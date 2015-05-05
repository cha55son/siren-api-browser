define(['plugins/dialog', 'models/action'], function(dialog, Action) {
    var ActionModal = function() { };
    ActionModal.prototype.activate = function(options) {
        this.action = options.action || new Action();
    };
    ActionModal.prototype.attached = function(view, parent) {
        this.$view = view;
    };
    ActionModal.prototype.onShown = function() {
        $('input', this.$view).first().focus();
    };
    ActionModal.prototype.submit = function(form) {
        var $form = $(form);
        var params = { };
        $('input[name]', $form).each(function() {
            var $this = $(this);
            if ($this.attr('type').toLowerCase() === 'checkbox')
                params[$this.attr('name')] = $this.prop('checked');
            else
                params[$this.attr('name')] = $this.val() == '' ? undefined : $this.val();
        });
        dialog.close(this, params);
    };
    return ActionModal;
});

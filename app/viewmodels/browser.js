define([
    'jquery', 
    'knockout', 
    'durandal/app',
    'models/entity', 
    'viewmodels/shell'
], function($, ko, app, Entity, appShell) {
    // Leave these outside the class def.
    // so they persist across "pages".
    var username = undefined;
    var password = undefined;

    var Browser = function() {
        this.parent = appShell;
        this.entity = ko.observable(new Entity());
        this.wasComposed = false;
    };
    Browser.prototype.activate = function(url) {
        this.parent.url(url || this.parent.url());
        return this.query();
    };
    Browser.prototype.attached = function(view, parent) {
        this.$view = view;
    };
    Browser.prototype.compositionComplete = function() {
        this.parent.loading(false);
        this.wasComposed = true;
    };
    Browser.prototype.query = function(options) {
        var self = this;
        this.parent.loading(true);
        var props = $.extend({
            url: this.parent.url(),
            dataType: 'json',
            method: 'GET'
        }, options);
        if (username && password) {
            props.username = username;
            props.password = password;
            props.xhrFields = { withCredentials: true };
        }
        var deferred = $.Deferred();
        $.ajax(props).then(function(data, status) {
            self.entity(new Entity(data));
            if (self.entity().getSelfHref() !== self.parent.url()) {
                var url = self.entity().getSelfHref();
                self.parent.router.navigate(self.parent.getURL(url), { replace: true, trigger: false });
                self.parent.url(url);
            }
        }).fail(function(data) {
            // If the endpoint requires authentication prompt for it.
            if (data.status == 401 && data.statusText.toLowerCase().match(/unauthorized/i)) {
                app.showBootstrapDialog('viewmodels/partials/auth-modal').then(function(creds) {
                    if (!creds) return;
                    username = creds.username;
                    password = creds.password;
                    self.query();
                });
            } else {
                app.showBootstrapDialog('viewmodels/partials/error-modal', { 
                    title: 'An error occurred',
                    message: 'Failed to query/parse the Siren API. Check the response below.',
                    error: data.responseText
                });
            }
        }).always(function() {
            deferred.resolve(true);
            if (self.wasComposed)
                self.parent.loading(false);
        });
        return deferred;
    };
    Browser.prototype.actionForm = function(action) {
        var self = this;
        app.showBootstrapDialog('viewmodels/partials/action-modal', { action: action }).then(function(params) {
            if (!params) return;
            self.query({ 
                url: action.href, 
                method: action.method, 
                data: params 
            });
        });
    };
    Browser.prototype.showPayload = function(obj) {
        if (typeof obj.payload !== 'object') return;
        app.showBootstrapDialog('viewmodels/partials/payload-modal', { 
            title: obj.className,
            payload: obj.payload 
        });
    };
    return Browser;
});

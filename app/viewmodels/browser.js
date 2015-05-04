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
        this.url = '/';
        this.entity = ko.observable(new Entity());
    };
    Browser.prototype.activate = function(url) {
        this.url = url || this.url;
        return this.query();
    };
    Browser.prototype.attached = function(view, parent) {
        this.$view = view;
    };
    Browser.prototype.query = function() {
        var self = this;
        var options = {
            url: this.url,
            dataType: 'json'
        };
        if (username && password) {
            options.username = username;
            options.password = password;
            options.xhrFields = { withCredentials: true };
        }
        var deferred = $.Deferred();
        $.ajax(options).then(function(data, status) {
            self.entity(new Entity(data));
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
                app.showMessage("Failed to query/parse the Siren API. Check to ensure the Siren URL points to a valid API.", "Network Error");
            }
        }).always(function() {
            deferred.resolve(true);
        });
        return deferred;
    };
    Browser.prototype.visitURL = function(url) {
        appShell.router.navigate(this.getURL(url));
    };
    Browser.prototype.getURL = function(url) {
        return '#browser/' + encodeURIComponent(url);
    };
    Browser.prototype.submit = function(form) {
        this.visitURL($('#browser-page-form-url', this.$view).val());
    };
    Browser.prototype.actionForm = function(action) {

    };
    return Browser;
});

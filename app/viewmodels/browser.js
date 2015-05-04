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
        this.username = username;
        this.password = password;
        this.entity = ko.observable(new Entity());
    };
    Browser.prototype.activate = function(url) {
        this.url = url || this.url;
        return this.query();
    };
    Browser.prototype.attached = function(view, parent) {
        var self = this;
        self.$view = view;
        $('a', view).on('click', function(e) {
            e.preventDefault();
            self.visitURL($(e.target).attr('href'));
        });
    };
    Browser.prototype.query = function() {
        var self = this;
        var options = {
            url: this.url,
            dataType: 'json'
        };
        if (this.username && this.password) {
            options.username = this.username;
            options.password = this.password;
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
                    self.visitURL(self.url);
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
        appShell.router.navigate('#browser/' + encodeURIComponent(url));
    };
    Browser.prototype.submit = function(form) {
        this.visitURL($('#browser-page-form-url', this.$view).val());
    };
    return Browser;
});

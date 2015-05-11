define([
    'plugins/router', 
    'durandal/app', 
    'knockout'
], function(router, app, ko) {
    var Shell = function() { 
        this.router = router; 
        this.url = ko.observable('/api/');
        this.seconds = ko.observable('?');
        this.loading = ko.observable(false);
        this.loading.subscribe(function() {
            $(window).scrollTop(0);
        });
    };
    Shell.prototype.activate = function() {
        this.loading(true);
        this.router.map([
            { route: ['', 'browser/:url'], moduleId: 'viewmodels/browser' }
        ]).buildNavigationModel();
        return router.activate();
    };
    Shell.prototype.submit = function(form) {
        this.visitURL($('#shell-form-url', this.$view).val());
    };
    Shell.prototype.visitURL = function(url) {
        this.router.navigate(this.getURL(url));
    };
    Shell.prototype.getURL = function(url) {
        return '#browser/' + encodeURIComponent(url);
    };
    return new Shell();
});

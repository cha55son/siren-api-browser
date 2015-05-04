define(['plugins/router', 'durandal/app'], function(router, app) {
    return {
        router: router,
        activate: function() {
            router.map([
                { route: ['', 'browser/:url'], title: 'Siren API Browser', moduleId: 'viewmodels/browser' }
            ]).buildNavigationModel();
            return router.activate();
        }
    };
});

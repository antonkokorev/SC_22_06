function dirProfile() {

    (function () {
        angular.module('profileModule', [])
            .directive('profile', function ($location) {
                return {
                    restrict: 'AE',
                    scope:{},
                    templateUrl: that_.path+"modules/profile.html",//that_.profileView(),
                    controller:  profileController,
                    controllerAs: "profile"
                };
            });
        function profileController() {
            console.warn('profileController');

        }
    }());
}



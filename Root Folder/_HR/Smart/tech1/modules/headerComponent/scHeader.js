function dirHeader() {

    (function () {
        console.warn("dirHeader");
        angular.module('headerModule', [])

            .directive('scHeader', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/headerComponent/header.html",
                    controller: headerController,
                    controllerAs: "header"
                };
            });

        function headerController() {
            console.warn('profileController');
        }

    }());
}



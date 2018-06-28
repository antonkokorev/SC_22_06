function dirHeader() {

    (function () {
        console.warn("dirHeader");
        angular.module('scApp.header', [])

            .directive('dirHeader', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/headerComponent/scHeaderView.html",
                    controller: headerController,
                    controllerAs: "header"
                };
            });

        function headerController() {


        }
    }());
}



function dirIpr() {

    (function () {
        console.warn("dirIpr");
        angular.module('scApp.ipr', [])

            .directive('dirIpr', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/iprComponent/scIprView.html",
                    controller: iprController,
                    controllerAs: "ipr"
                };
            });

        function iprController() {

        }

    }());
}



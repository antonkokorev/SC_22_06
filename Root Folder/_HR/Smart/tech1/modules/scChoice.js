function dirChoice() {

    (function () {
        angular.module('choiceModule', [])
            .directive('choice', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/choice.html",
                    controller: choiceController,
                    controllerAs: "choice"
                };
            });

        function choiceController() {
            console.warn('choiceController');

        }
    }());
}



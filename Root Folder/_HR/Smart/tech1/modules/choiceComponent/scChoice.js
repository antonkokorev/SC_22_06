function dirChoice() {

    (function () {
        angular.module('choiceModule', [])
            .directive('choice', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/choiceComponent/choice.html",
                    controller: choiceController,
                    controllerAs: "choice"
                };
            });

        function choiceController($timeout,requestService, updateSwiper) {
            console.warn('choiceController');
            this.data = {};

            var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=dictNoCallback&user=";
            requestService.request(url).then((data) => {
                this.data = data;
                $timeout(function() {
                    updateSwiper();
                }, 0);
                console.log({"data": data})
            });

        }
    }());
}



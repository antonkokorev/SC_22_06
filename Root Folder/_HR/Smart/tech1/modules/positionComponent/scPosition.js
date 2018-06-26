function dirPosition() {

    (function () {
        console.warn("dirPosition");
        angular.module('positionModule', [])

            .directive('position', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/positionComponent/position.html",
                    controller: positionController,
                    controllerAs: "position"
                };
            });

        function positionController($scope, $timeout, requestService, updateSwiper, timelineService) {
            console.warn('positionController');

            var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=positionNoCallback&requestType=model&family=[30000047]&row=1_2&user=";
            requestService.request(url).then((data) => {
                this.data = data;
                $timeout(updateSwiper, 0);
                console.log({"data": data})
            });


            // Выбор позиций
            var choose_position = document.querySelectorAll(".choose-position");
            var chosen_position = document.querySelector(".chosen-positions");
            choose_position.forEach(function (item) {
                item.addEventListener(eventBr, function () {
                    if (item.classList.contains("disabled")) {
                        return;
                    }

                    var newItem = item.cloneNode(true);

                    // Запрещаем повторный клик
                    item.classList.add("disabled");

                    newItem.firstElementChild.classList.add("color-red");
                    newItem.addEventListener(eventBr, function () {
                        chosen_position.removeChild(newItem);
                        item.classList.remove("disabled");
                    });
                    chosen_position.appendChild(newItem);
                });
            });
        }
    }());
}



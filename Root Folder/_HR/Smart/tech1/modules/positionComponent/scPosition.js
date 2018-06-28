function dirPosition() {

    (function () {
        console.warn("dirPosition");
        angular.module('scApp.position', [])

            .directive('dirPosition', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {
                        positionData: "=positionmodeldata",
                        iGrade:"=grade"
                    },
                    templateUrl: that_.path + "modules/positionComponent/scPositionView.html",
                    controller: positionController,
                    controllerAs: "positionCtrl"
                };
            });

        function positionController($scope, requestService) {
            console.warn('positionController');
            $scope.likedPositions = [];


            this.likeCurrentPosition = (index, position) => {
                $scope.likedPositions.push(position);
                $scope.positionData[index].like = ($scope.positionData[index].like) ? false : true;
                console.log($scope.likedPositions);

            }

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

        3

    }());
}


